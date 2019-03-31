<template>
    <v-container grid-list-md>
        <v-layout column>
            <v-flex>
                <v-layout row wrap>
                    <v-flex xs12 lg4 v-for="item in items" v-bind:key="item.image">
                        <building :image="item.image" :priceOne="item.priceOne" :priceTwo="item.priceTwo" :priceThree="item.priceThree" :buildingName="item.buildingName"></building>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Building from "../components/Building"
export default {
    name: 'BuildingSelector',
    components: {
        Building
    },
    data() {
        return {
          items: this.$store.state.items
        }
    }
}
</script>
