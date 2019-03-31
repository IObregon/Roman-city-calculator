<template>
    <v-app>
        <v-content>
            <v-container grid-list-xl text-xs-center>
                <v-layout row wrap>
                    <v-flex xs12 lg9>
                        <building-selector></building-selector>
                    </v-flex>
                    <v-flex xs0 xl3>
                        <v-card dark color="purple">
                            <v-card-text>xs10 offset-xs1</v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import BuildingSelector from "./components/BuildingSelector"
export default {
    name: 'App',
    components: { BuildingSelector },
    data() {
        return {
            //
        }
    }
}
</script>
