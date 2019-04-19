import {mount, createLocalVue} from '@vue/test-utils'
import Vuetify from "vuetify"
import Vuex from 'vuex'
import Building from '@/components/Building.vue'
import BuildingButton from '@/components/BuildingButton.vue';

describe('Building.vue', () => {
    const priceOne = "75,000";
    const priceTwo = "100,000";
    const priceThree = "45,000";
    const buildingName = 'BuildingName';

    let wrapper;
    let localVue;
    const mockStore = {dispatch: jest.fn()};

    beforeEach(() => {
        localVue = createLocalVue();
        localVue.use(Vuetify);
        localVue.use(Vuex);

        wrapper = mount(Building, {
            mocks: {
                $store: mockStore
            },
            localVue: localVue,
            propsData: {priceOne, priceTwo, priceThree, buildingName}
        });

    });

    it('renders the building name when passed', () => {
        const header = wrapper.findAll('.headline');
        expect(header.at(0).text()).toMatch(buildingName);
    });

    it('renders the building prices when passed', () => {


        const buttons = wrapper.findAll('button');
        expect(buttons.length).toBe(3);
    });

    it('only the first price button is enabled when created', () => {
        expect(wrapper.vm.$data.priceButtons[0].disabled).toBe(false);
        expect(wrapper.vm.$data.priceButtons[1].disabled).toBe(true);
        expect(wrapper.vm.$data.priceButtons[2].disabled).toBe(true);
    });

    it('after clicking the first button it changes its color to green and the second one is activated', done => {
        const priceButtons = wrapper.findAll(BuildingButton);
        priceButtons.at(0).trigger('click');

        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.$data.priceButtons[0].color).toBe('green');
            expect(wrapper.vm.$data.priceButtons[0].disabled).toBe(true);
            expect(wrapper.vm.$data.priceButtons[1].disabled).toBe(false);
            expect(wrapper.vm.$data.priceButtons[2].disabled).toBe(true);
            done();
        });
    });

    it('after clicking the second button it changes its color to green and the thrid one is activated', done => {
        const priceButtons = wrapper.findAll(BuildingButton);
        priceButtons.at(0).trigger('click');

        wrapper.vm.$nextTick(() => {
            priceButtons.at(1).trigger('click');
            wrapper.vm.$nextTick(() => {
                expect(wrapper.vm.$data.priceButtons[1].color).toBe('green');
                expect(wrapper.vm.$data.priceButtons[1].disabled).toBe(true);
                expect(wrapper.vm.$data.priceButtons[2].disabled).toBe(false);
                expect(wrapper.vm.$data.priceButtons[0].disabled).toBe(true);
                done();
            });
        });
    });

    it('after clicking the third button, all buttons are disabled', done => {
        const priceButtons = wrapper.findAll(BuildingButton);
        priceButtons.at(0).trigger('click');

        wrapper.vm.$nextTick(() => {
            priceButtons.at(1).trigger('click');
            wrapper.vm.$nextTick(() => {
                priceButtons.at(2).trigger('click');
                wrapper.vm.$nextTick(() => {
                    expect(wrapper.vm.$data.priceButtons[2].color).toBe('green');
                    expect(wrapper.vm.$data.priceButtons[2].disabled).toBe(true);
                    expect(wrapper.vm.$data.priceButtons[0].disabled).toBe(true);
                    expect(wrapper.vm.$data.priceButtons[1].disabled).toBe(true);
                    done();
                });
            });
        });
    });

    it('after clicking the third button, if clicked again it is enabled back', done => {
        wrapper.setData({
            priceButtons: [{
                color: 'green',
                disabled: true
            }, {
                color: 'green',
                disabled: true
            }, {
                color: 'green',
                disabled: true
            }]
        });

        const priceButtons = wrapper.findAll(BuildingButton);
        priceButtons.at(2).trigger('click');

        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.$data.priceButtons[2].color).toBe('orange');
            expect(wrapper.vm.$data.priceButtons[2].disabled).toBe(false);
            done();
        });
    });

    it('after clicking the second button, if clicked again it is enabled back', done => {

        wrapper.setData({
            priceButtons: [{
                color: 'green',
                disabled: true
            }, {
                color: 'green',
                disabled: true
            }, {
                color: 'orange',
                disabled: false
            }]
        });

        const priceButtons = wrapper.findAll(BuildingButton);
        priceButtons.at(1).trigger('click');

        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.$data.priceButtons[2].color).toBe('');
            expect(wrapper.vm.$data.priceButtons[2].disabled).toBe(true);
            expect(wrapper.vm.$data.priceButtons[1].color).toBe('orange');
            expect(wrapper.vm.$data.priceButtons[1].disabled).toBe(false);
            done();
        });
    });

    it('after clicking the second first, if clicked again it is enabled back', done => {
        wrapper.setData({
            priceButtons: [{
                color: 'green',
                disabled: true
            }, {
                color: 'orange',
                disabled: false
            }, {
                color: '',
                disabled: false
            }]
        });

        const priceButtons = wrapper.findAll(BuildingButton);
        priceButtons.at(0).trigger('click');

        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.$data.priceButtons[1].color).toBe('');
            expect(wrapper.vm.$data.priceButtons[1].disabled).toBe(true);
            expect(wrapper.vm.$data.priceButtons[0].color).toBe('orange');
            expect(wrapper.vm.$data.priceButtons[0].disabled).toBe(false);
            done();
        });
    });

    it('When first button is clicked the first time buyBuilding action is called', (done) => {
        wrapper.setData({
            priceButtons: [{
                color: 'orange',
                disabled: false
            }, {
                color: '',
                disabled: true
            }, {
                color: '',
                disabled: true
            }]
        });

        const priceButtons = wrapper.findAll(BuildingButton);
        priceButtons.at(0).trigger('click');

        wrapper.vm.$nextTick(() => {
            expect(mockStore.dispatch).toHaveBeenCalled();
            expect(mockStore.dispatch).toHaveBeenCalledWith('buyBuilding', {
                name: buildingName,
                number: 0,
                price: priceOne
            });
            done();
        });
    });

    it('When first button is clicked the second time returnBuilding action is called', (done) => {
        wrapper.setData({
            priceButtons: [{
                color: 'green',
                disabled: true,
                text: priceOne
            }, {
                color: 'orange',
                disabled: false
            }, {
                color: '',
                disabled: true
            }]
        });

        const priceButtons = wrapper.findAll(BuildingButton);
        priceButtons.at(0).trigger('click');

        wrapper.vm.$nextTick(() => {
            expect(mockStore.dispatch).toHaveBeenCalled();
            expect(mockStore.dispatch).toHaveBeenCalledWith('returnBuilding', {
                name: buildingName,
                number: 0,
                price: priceOne
            });
            done();
        });
    })

});