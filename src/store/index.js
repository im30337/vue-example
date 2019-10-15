import Vue from 'vue';
import Vuex from 'vuex';

import productsMoudules from './products.js'
import cartsModules from './carts.js'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLoading: false,
        adminProductList: []
    },
    mutations: {
        loadingSwitch(state, bool) {
            state.isLoading = bool;
            console.log("state", state);
        },
        adminProductList(state, payload) {
            state.adminProductList = payload
        }
    },
    actions: {
    },
    getters: {
        isLoading(state) {
            return state.isLoading;
        }
    },
    modules: {
        productsMoudules,
        cartsModules
    }
});
