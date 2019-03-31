<template>
    <v-btn ref="button" :color="color" @click="click">{{text}}
        <v-icon>fas fa-coins</v-icon>
    </v-btn>
</template>

<script>

    export default {
        name: 'BuildingButton',
        props: {
            text: {
                type: String,
                required: true
            },
            position: {
                type: Number,
                required: true
            },
            color: {
                type: String,
                required: true
            }
        },
        data() {
            return {};
        },
        methods: {
            click() {
                this.$emit('click', this.position);
            }
        }
    }
</script>