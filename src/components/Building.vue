<template>
    <v-card>
        <v-img :src="image" aspect-ratio="1.75"></v-img>
        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">{{buildingName}}</h3>
            </div>
        </v-card-title>
        <v-card-actions>
            <v-layout column>
                <v-flex xs3>
                    <template v-for="(button, index) in priceButtons">
                        <building-button :text="button.text" :position="index" :color="button.color"
                                         @click="buttonClick"></building-button>
                    </template>
                </v-flex>
            </v-layout>
        </v-card-actions>
    </v-card>
</template>

<script>
    import BuildingButton from './BuildingButton'

    export default {
        name: 'Building',
        components: {BuildingButton},
        props: ['image', 'priceOne', 'priceTwo', 'priceThree', 'buildingName'],
        data() {
            return {
                priceButtons: [
                    {
                        text: this.priceOne,
                        disabled: false,
                        color: 'orange'
                    },
                    {
                        text: this.priceTwo,
                        disabled: true,
                        color: ''
                    },
                    {
                        text: this.priceThree,
                        disabled: true,
                        color: ''
                    }]
            }
        },
        methods: {
            buttonClick(number) {
                if (number === this.priceButtons.length - 1) {
                    if (!this.priceButtons[number].disabled && this.priceButtons[number - 1].color === 'green') {
                        this.priceButtons[number].disabled = true;
                        this.priceButtons[number].color = 'green';
                        this.$store.dispatch('buyBuilding', {
                            name: this.buildingName,
                            number,
                            price: this.priceButtons[number].text
                        });
                    } else if (this.priceButtons[number].disabled && this.priceButtons[number - 1].color === 'green') {
                        this.priceButtons[number].disabled = false;
                        this.priceButtons[number].color = 'orange';
                        this.$store.dispatch('returnBuilding', {
                            name: this.buildingName,
                            number,
                            price: this.priceButtons[number].text
                        });
                    }
                } else {
                    if (!this.priceButtons[number].disabled && this.priceButtons[number + 1].disabled) {
                        this.priceButtons[number].disabled = true;
                        this.priceButtons[number].color = 'green';
                        this.priceButtons[number + 1].disabled = false;
                        this.priceButtons[number + 1].color = 'orange';
                        this.$store.dispatch('buyBuilding', {
                            name: this.buildingName,
                            number,
                            price: this.priceButtons[number].text
                        });
                    } else if (this.priceButtons[number].disabled && !this.priceButtons[number + 1].disabled) {
                        this.priceButtons[number].disabled = false;
                        this.priceButtons[number].color = 'orange';
                        this.priceButtons[number + 1].disabled = true;
                        this.priceButtons[number + 1].color = '';
                        this.$store.dispatch('returnBuilding', {
                            name: this.buildingName,
                            number,
                            price: this.priceButtons[number].text
                        });
                    }
                }
            }
        }
    }
</script>

<style>
</style>


