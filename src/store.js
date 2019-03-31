import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        items: [
            {
                image: '/aqueduct.jpg',
                priceOne: "100,000",
                priceTwo: "45,000",
                priceThree: "75,000",
                buildingName: "Aqueduct"
            },
            {
                image: '/arch.jpg',
                priceOne: "97,200",
                priceTwo: "51,123",
                priceThree: "99,999",
                buildingName: "Arch"
            }
        ],
        buttons: [
            {
                disabled: false,
                color: 'orange'
            },
            {
                disabled: true,
                color: ''
            },
            {
                disabled: true,
                color: ''
            }
        ]
    },
    mutations: {
        buildingButtonClick(state, {number}){
            state.buttons[number].color = 'green';
            state.buttons[number].disabled = true;
            state.buttons[number +1].color = 'orange';
            state.buttons[number +1].disabled = false;
        }
    },
    actions: {
        buildingButtonClick: ({commit}, number) => commit('buildingButtonClick', number)
    },
    getters: {
        color: (state) => (number) => {
            state;
            debugger;
            return state.buttons[number].color;
        }
    }
})
