import axios from 'axios'

export default {
    namespaced: true,
    state: {
        cart: {
            carts: [],
            final_total: 0,
            total: 0
        },
    },
    mutations: {
        cart(state, payload) {
            let cartTemp = state.cart;
            ({
                carts: cartTemp.carts,
                final_total: cartTemp.final_total,
                total: cartTemp.total
            } = payload);
        }
    },
    actions: {
        ADDTOCART(context, item) {
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            context.commit("loadingSwitch", true, { root: true });
            axios.post(url, { data: item }).then(response => {
                context.dispatch('GETCART');
                context.commit("loadingSwitch", false, { root: true });
                console.log("加入購物車:", response);
            });
        },
        GETCART(context) {
            context.commit("loadingSwitch", true, { root: true });
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            axios.get(url).then(response => {
                if (response.data.data.carts) {
                    context.commit('cart', response.data.data);
                }
                context.commit("loadingSwitch", false, { root: true });
                console.log("取得購物車", response.data.data);
            });
        },
        REMOVECART(context, id) {
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
            context.commit("loadingSwitch", true, { root: true });
            axios.delete(url).then(response => {
                context.commit("loadingSwitch", false, { root: true });
                context.dispatch('GETCART');
                console.log("刪除購物車項目", response);
            });
        },
        CLEARCART(context) {
            /**清空購物車 */
            alert('清空購物車請求已送出')
        }
    },
    getters: {
        cart(state) {
            return state.cart
        }
    }
}