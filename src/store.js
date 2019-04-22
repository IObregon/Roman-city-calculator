import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        items: [
            {
                image: '/aqueduct.jpg',
                priceOne: "100000",
                priceTwo: "",
                priceThree: "",
                buildingName: "Aqueduct"
            },
            {
                image: '/arch.jpg',
                priceOne: "20000",
                priceTwo: "5000",
                priceThree: "5000",
                buildingName: "Arch"
            },
            {
                image: '/Amphitheatre.jpg',
                priceOne: "100000",
                priceTwo: "30000",
                priceThree: "15000",
                buildingName: "Amphitheatre"
            },
            {
                image: '/Theatre.jpg',
                priceOne: "50000",
                priceTwo: "25000",
                priceThree: "12500",
                buildingName: "Theatre"
            },
            {
                image: '/circus.jpg',
                priceOne: "40000",
                priceTwo: "20000",
                priceThree: "10000",
                buildingName: "Circus"
            },
            {
                image: '/baths.jpg',
                priceOne: "80000",
                priceTwo: "40000",
                priceThree: "20000",
                buildingName: "Baths"
            },
            {
                image: '/Market.jpg',
                priceOne: "10000",
                priceTwo: "5000",
                priceThree: "2500",
                buildingName: "Market"
            },
            {
                image: '/forum.jpg',
                priceOne: "20000",
                priceTwo: "10000",
                priceThree: "5000",
                buildingName: "Forum"
            },
            {
                image: '/basilica.jpg',
                priceOne: "40000",
                priceTwo: "20000",
                priceThree: "7500",
                buildingName: "Basilica"
            },
            {
                image: '/curia.jpg',
                priceOne: "15000",
                priceTwo: "7500",
                priceThree: "3000",
                buildingName: "Curia-Comitium"
            },
            {
                image: '/temple.jpg',
                priceOne: "40000",
                priceTwo: "20000",
                priceThree: "10000",
                buildingName: "Temple"
            },
            {
                image: '/bridge.jpg',
                priceOne: "15000",
                priceTwo: "",
                priceThree: "",
                buildingName: "Bridge"
            },
            {
                image: '/road.jpg',
                priceOne: "15000",
                priceTwo: "",
                priceThree: "",
                buildingName: "Road"
            },
            {
                image: '/port.jpg',
                priceOne: "80000",
                priceTwo: "",
                priceThree: "",
                buildingName: "Port"
            },
            {
                image: '/wall.jpg',
                priceOne: "100000",
                priceTwo: "",
                priceThree: "",
                buildingName: "Wall"
            },
            {
                image: '/restructuration.jpg',
                priceOne: "750000",
                priceTwo: "",
                priceThree: "",
                buildingName: "Restructuration of the street plan"
            },
            {
                image: '/statue.jpg',
                priceOne: "5000",
                priceTwo: "2500",
                priceThree: "2500",
                buildingName: "Statue"
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
