import axios from 'axios'

export default {
    namespaced: true,
    state: {
        products: [],
        categories: [],
        currentProductDetail: {}
    },
    mutations: {
        product(state, payload) {
            state.products = payload;
        },
        getUnique(state, payload) {
            const categories = new Set();
            payload.forEach(item => {
                categories.add(item.category);
            });
            state.categories = Array.from(categories);
        }
    },
    actions: {
        GETPRODUCTS(context) {
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
            context.commit("loadingSwitch", true, {root: true});
            axios.get(url).then(response => {
                console.log("取得產品列表:", response);
                context.commit('product', response.data.products);
                context.commit('getUnique', response.data.products);
                context.commit("loadingSwitch", false, {root: true});
            });
        }
    },
    getters: {
        products(state) {
            return state.products;
        },
        categories(state) {
            return state.categories;
        }
    }

}