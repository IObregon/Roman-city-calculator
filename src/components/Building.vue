<template>
    <v-card>
        <v-img :src="building.image" aspect-ratio="1.75"></v-img>
        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">{{building.buildingName}}</h3>
            </div>
        </v-card-title>
        <v-card-actions>
            <v-layout column>
                <v-flex xs3>
                    <template v-for="(buttonLine, line) in building.priceButtons">
                        <template v-for="(button, index) in buttonLine">
                            <building-button :text="button.text" :position="index" :line="line"
                                             :color.sync="button.color"
                                             @click="buttonClick" v-show="button.show"
                                             v-bind:key="button.text + line + index"></building-button>
                        </template>
                        <br v-bind:key="line + 'a'"/>
                        <br v-bind:key="line + 'b'"/>
                    </template>
                </v-flex>
            </v-layout>
        </v-card-actions>
    </v-card>
</template>

<script>
    import BuildingButton from './BuildingButton'
    import {mapGetters} from 'vuex'

    export default {
        name: 'Building',
        components: {BuildingButton},
        props: ['building'],
        data() {
            return {
                buttons: this.building.priceButtons
            }
        },
        methods: {
            buttonClick(position, line) {
                const copyButtons = {...this.buttons}
                if (position === this.buttons[line].length - 1) {
                    if (!this.buttons[line][position].disabled) {
                        if (this.remainingMoney > +this.buttons[line][position].text) {
                            copyButtons[line][position].disabled = true;
                            copyButtons[line][position].color = 'green';
                            this.$store.dispatch('buyBuilding', {
                                name: this.building.buildingName,
                                number: position,
                                price: copyButtons[line][position].text,
                                line
                            });
                        }
                    } else if (this.buttons[line][position].disabled) {
                        copyButtons[line][position].disabled = false;
                        copyButtons[line][position].color = 'orange';
                        this.$store.dispatch('returnBuilding', {
                            name: this.building.buildingName,
                            number: position,
                            price: copyButtons[line][position].text,
                            line
                        });
                    }
                } else {
                    if (!this.buttons[line][position].disabled && this.buttons[line][position + 1].disabled) {
                        if (this.remainingMoney > +this.buttons[line][position].text) {
                            copyButtons[line][position].disabled = true;
                            copyButtons[line][position].color = 'green';
                            copyButtons[line][position + 1].disabled = false;
                            copyButtons[line][position + 1].color = 'orange';
                            this.$store.dispatch('buyBuilding', {
                                name: this.building.buildingName,
                                number: position,
                                price: copyButtons[line][position].text,
                                line
                            });
                        }
                    } else if (this.buttons[line][position].disabled && !this.buttons[line][position + 1].disabled) {
                        copyButtons[line][position].disabled = false;
                        copyButtons[line][position].color = 'orange';
                        copyButtons[line][position + 1].disabled = true;
                        copyButtons[line][position + 1].color = '';
                        this.$store.dispatch('returnBuilding', {
                            name: this.building.buildingName,
                            number: position,
                            price: copyButtons[line][position].text,
                            line
                        });
                    }
                    this.$set(this.buttons, copyButtons);
                }
                if (position === 0 && !this.buttons[line][position].disabled) {
                    this.notShowNextLine(line, position, copyButtons);
                } else {
                    this.showNextLine(line);
                }
                this.$forceUpdate();
            },
            showNextLine(line) {
                if (this.buttons[line + 1]) {
                    this.buttons[line + 1] = this.buttons[line + 1].map(b => {
                        return {...b, show: true};
                    })
                }
            },
            notShowNextLine(line, position, copyButtons) {
                if (this.buttons[line + 1]) {
                    for (let i = 1; i < this.buttons.length - line; i++) {
                        this.$store.dispatch('returnBuilding', {
                            name: this.building.buildingName,
                            number: -1,
                            price: copyButtons[line + i][position].text,
                            line: line + i
                        });
                        this.buttons[line + i] = this.buttons[line + i].map(b => {
                            return {...b, show: false, color: '', disabled: true};
                        });
                        this.buttons[line + i][0].color = "orange";
                        this.buttons[line + i][0].disabled = false;
                    }
                }
            }
        },
        computed: {
            ...mapGetters(['remainingMoney'])
        }
    }
</script>

<style>
</style>


