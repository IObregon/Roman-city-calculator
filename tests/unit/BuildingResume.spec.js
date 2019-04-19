import {mount, createLocalVue} from '@vue/test-utils'
import Vuetify from "vuetify"
import Vuex from 'vuex';
import BuildingResume from '@/components/BuildingResume.vue';

describe('BuildResume.vue', () => {
    it('renders one element for each clicked building', () => {
        let localVue = createLocalVue();
        localVue.use(Vuetify);
        localVue.use(Vuex);

        const boughtBuildings = [
            {
                name: 'Puente',
                price: 127.000,
                level: 0
            },
            {
                name: 'Arc',
                price: 42.139,
                level: 1
            },
            {
                name: 'Wall',
                price: 999.999,
                level: 2
            }
        ];
        const getters = {
            boughtBuildings: () => boughtBuildings
        };
        const store = new Vuex.Store({
            getters
        });

        const wrapper = mount(BuildingResume, {store, localVue});

        expect(wrapper.findAll('.v-list__tile').length).toBe(3);
    });

    it('renders two extra elements, one with the sum of all the prices and other with the remaining', () => {
        let localVue = createLocalVue();
        localVue.use(Vuetify);
        localVue.use(Vuex);

        const priceOne = 127.111;
        const priceTwo = 42.139;
        const priceThree = 999.999;
        const remaining = 100000;
        const boughtBuildings = [
            {
                name: 'Puente',
                price: priceOne,
                level: 0
            },
            {
                name: 'Arc',
                price: priceTwo,
                level: 1
            },
            {
                name: 'Wall',
                price: priceThree,
                level: 2
            }
        ];
        const getters = {
            boughtBuildings: () => boughtBuildings,
            boughtBuildingsPriceTotal: () => priceOne + priceThree + priceThree,
            remainingMoney: () => remaining
        };
        const store = new Vuex.Store({
            getters
        });

        const wrapper = mount(BuildingResume, {store, localVue});
        const lists = wrapper.findAll('.v-list__tile');

        expect(lists.length).toBe(5);
        expect(lists.at(lists.length - 2).html().includes(priceOne + priceThree + priceThree)).toBe(true);
        expect(lists.at(lists.length - 1).html().includes(remaining)).toBe(true);
    });
})