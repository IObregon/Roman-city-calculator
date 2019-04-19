<template>
    <v-list>
        <template v-for="building in boughtBuildings">
            <v-list-tile :key="building.name">
                <v-list-tile-content>
                    <v-list-tile-title v-html="building.name"></v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-list-tile-action-text>{{ building.price }}</v-list-tile-action-text>
                </v-list-tile-action>
            </v-list-tile>
        </template>
        <v-list-tile key="TOTAL" v-if="boughtBuildingsPriceTotal">
            <v-list-tile-content>
                <v-list-tile-title> TOTAL:</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
                <v-list-tile-action-text>{{ boughtBuildingsPriceTotal }}</v-list-tile-action-text>
            </v-list-tile-action>
        </v-list-tile>
        <v-list-tile key="REMAINING" v-if="boughtBuildingsPriceTotal">
            <v-list-tile-content>
                <v-list-tile-title> REMAINING:</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
                <v-list-tile-action-text>{{ remainingMoney }}</v-list-tile-action-text>
            </v-list-tile-action>
        </v-list-tile>
    </v-list>

</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'BuildingResume',
        data() {
            return {};
        },
        computed: mapGetters(['boughtBuildings', "boughtBuildingsPriceTotal", "remainingMoney"])
    }
</script>