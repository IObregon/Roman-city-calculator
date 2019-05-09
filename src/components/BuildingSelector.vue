<template>
    <v-container grid-list-md>
        <v-layout column>
            <v-flex>
                <v-layout row wrap>
                    <v-flex xs12 lg4 v-for="item in buildings" v-bind:key="item.image">
                        <building :building="item"></building>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import Building from "../components/Building"
    import {mapGetters} from 'vuex'

    export default {
        name: 'BuildingSelector',
        components: {
            Building
        },
        data() {
            return {

            }
        },
        computed: {
            ...mapGetters(['buildings'])
        }
    }
</script>
