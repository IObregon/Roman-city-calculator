import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        items: [
            {
                image: '/aqueduct.jpg',
                priceOne: "100000",
                priceTwo: "45000",
                priceThree: "75000",
                buildingName: "Aqueduct"
            },
            {
                image: '/arch.jpg',
                priceOne: "97200",
                priceTwo: "51123",
                priceThree: "99999",
                buildingName: "Arch"
            },
            {
                image: '/arch.jpg',
                priceOne: "97200",
                priceTwo: "51123",
                priceThree: "99999",
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
        ],
        boughtBuildings: [
        ],
        maxMoney: 0
    },
    mutations: {
        buyBuilding(state, building) {
            const buildingToBuy = state.boughtBuildings.find((b) => b.name === building.name);
            if (buildingToBuy) {
                buildingToBuy.price += Number(building.price);
                buildingToBuy.level = building.number;
            } else {
                state.boughtBuildings.push({
                    name: building.name,
                    level: building.number,
                    price: +building.price
                });
            }
        },
        returnBuilding(state, building) {
            const buildingToBuy = state.boughtBuildings.find((b) => b.name === building.name);
            if (buildingToBuy && buildingToBuy.level > 0) {
                buildingToBuy.price -= Number(building.price);
                buildingToBuy.level = building.number - 1;
            } else {
                state.boughtBuildings = state.boughtBuildings.filter((b) => b.name !== building.name);
            }
        },
        updateMaxMoney(state, money){
            state.maxMoney = money;
        }
    },
    actions: {
        buyBuilding: ({commit}, building) => commit('buyBuilding', building),
        returnBuilding: ({commit}, building) => commit('returnBuilding', building),
        updateMaxMoney: ({commit}, money) => commit('updateMaxMoney', money)
    },
    getters: {
        color: (state) => (number) => {
            return state.buttons[number].color;
        },
        boughtBuildings: state => {
            return state.boughtBuildings
        },
        boughtBuildingsPriceTotal: state => {
            const total = state.boughtBuildings.reduce((total, {price}) => {
                return total + price;
            }, 0);
            return total;
        },
        remainingMoney: (state, getters) => {
            return state.maxMoney - getters.boughtBuildingsPriceTotal;
        }
    }
})
