import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        defaultButtons: [
            {
                // text: this.priceOne,
                disabled: false,
                color: 'orange'
            },
            {
                // text: this.priceTwo,
                disabled: true,
                color: ''
            },
            {
                // text: this.priceThree,
                disabled: true,
                color: ''
            },
        ],
        buildings: [
            {
                image: '/aqueduct.jpg',
                prices: ["100000"],
                buildingName: "Aqueduct",
                maxButtonNumber: 1,
                maxButtonsLines: 5
            },
            {
                image: '/arch.jpg',
                prices: ["20000", "5000", "5000"],
                buildingName: "Arch",
                maxButtonNumber: 3,
                maxButtonsLines: 5
            },
            {
                image: '/amphitheatre.jpg',
                prices: ["100000", "30000", "15000"],
                buildingName: "Amphitheatre",
                maxButtonNumber: 3,
                maxButtonsLines: 5
            },
            {
                image: '/theatre.jpg',
                prices: ["50000", "25000", "12500"],
                buildingName: "Theatre",
                maxButtonNumber: 3,
                maxButtonsLines: 5
            },
            {
                image: '/circus.jpg',
                prices: ["40000", "20000", "10000"],
                buildingName: "Circus",
                maxButtonNumber: 3,
                maxButtonsLines: 5
            },
            {
                image: '/baths.jpg',
                prices: ["80000", "40000", "20000"],
                buildingName: "Baths",
                maxButtonNumber: 3,
                maxButtonsLines: 5
            },
            {
                image: '/market.jpg',
                prices: ["10000", "5000", "2500"],
                buildingName: "Market",
                maxButtonNumber: 3,
                maxButtonsLines: 5
            },
            {
                image: '/forum.jpg',
                prices: ["20000", "10000", "5000"],
                buildingName: "Forum",
                maxButtonNumber: 3,
                maxButtonsLines: 5
            },
            {
                image: '/basilica.jpg',
                prices: ["40000", "20000", "7500"],
                buildingName: "Basilica",
                maxButtonNumber: 3,
                maxButtonsLines: 5
            },
            {
                image: '/curia.jpg',
                prices: ["15000", "7500", "3000"],
                buildingName: "Curia-Comitium",
                maxButtonNumber: 3,
                maxButtonsLines: 5
            },
            {
                image: '/temple.jpg',
                prices: ["40000", "20000", "10000"],
                buildingName: "Temple",
                maxButtonNumber: 3,
                maxButtonsLines: 5
            },
            {
                image: '/bridge.jpg',
                prices: ["15000"],
                buildingName: "Bridge",
                maxButtonNumber: 1,
                maxButtonsLines: 5
            },
            {
                image: '/road.jpg',
                prices: ["15000"],
                buildingName: "Road",
                maxButtonNumber: 1,
                maxButtonsLines: 1
            },
            {
                image: '/port.jpg',
                prices: ["80000"],
                buildingName: "Port",
                maxButtonNumber: 1,
                maxButtonsLines: 1
            },
            {
                image: '/wall.jpg',
                prices: ["100000"],
                buildingName: "Wall",
                maxButtonNumber: 1,
                maxButtonsLines: 1
            },
            {
                image: '/restructuration.jpg',
                prices: ["750000"],
                buildingName: "Restructuration of the street plan",
                maxButtonNumber: 1,
                maxButtonsLines: 1
            },
            {
                image: '/statue.jpg',
                prices: ["5000", "2500", "2500"],
                buildingName: "Statue",
                maxButtonNumber: 3,
                maxButtonsLines: 10
            }

        ],
        boughtBuildings: [],
        maxMoney: 0,
    },
    mutations: {
        buyBuilding(state, building) {
            const buildingToBuy = state.boughtBuildings.find((b) => b.key === building.name + building.line);
            if (buildingToBuy) {
                buildingToBuy.price += Number(building.price);
                buildingToBuy.level = building.number;
            } else {
                state.boughtBuildings.push({
                    name: building.name,
                    level: building.number,
                    price: +building.price,
                    line: building.line,
                    key: building.name + building.line
                });
            }
        },
        returnBuilding(state, building) {
            const buildingToBuy = state.boughtBuildings.find((b) => b.key === building.name + building.line);
            if (building && building.number === -1) {
                state.boughtBuildings = state.boughtBuildings.filter((b) => b.key !== building.name + building.line);
                return;
            }
            if (buildingToBuy && buildingToBuy.level > 0) {
                buildingToBuy.price -= Number(building.price);
                buildingToBuy.level = building.number - 1;
            } else {
                state.boughtBuildings = state.boughtBuildings.filter((b) => b.key !== building.name + building.line);
            }
        },
        updateMaxMoney(state, money) {
            state.maxMoney = money;
        },
    },
    actions: {
        buyBuilding: ({commit}, building) => commit('buyBuilding', building),
        returnBuilding: ({commit}, building) => commit('returnBuilding', building),
        updateMaxMoney: ({commit}, money) => commit('updateMaxMoney', money),
        createBuildingButtons: ({commit}) => commit('createBuildingButtons')
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
        },
        buildings: state => {
            return state.buildings.map(building => {
                let result = [];
                for (let i = 0; i < building.maxButtonsLines; i++) {
                    let result2 = [];
                    for (let j = 0; j < building.maxButtonNumber; j++) {
                        result2.push({...state.defaultButtons[j], text: building.prices[j], show: i === 0});
                    }
                    result.push(result2);
                }
                building.priceButtons = result;
                return building;
            })
        }
    }
})
