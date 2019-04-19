<template>
    <v-app>
        <v-content>
            <v-container grid-list-xl text-xs-center>
                <v-layout row wrap>
                    <v-flex lg3>
                        <v-text-field label="Money" solo type="number" v-model="maxMoney"></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12 lg9>
                        <building-selector></building-selector>
                    </v-flex>
                    <v-flex xs0 xl3>
                        <v-card dark color="purple">
                            <building-resume></building-resume>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import BuildingSelector from "./components/BuildingSelector"
    import BuildingResume from "./components/BuildingResume"

    export default {
        name: 'App',
        components: {BuildingSelector, BuildingResume},
        data() {
            return {}
        },
        computed: {
            maxMoney: {
                get() {
                    return this.$store.state.maxMoney
                },
                set(value) {
                    this.$store.commit('updateMaxMoney', value)
                }
            }
        }
    }
</script>
