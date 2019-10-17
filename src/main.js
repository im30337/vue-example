// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.min.css';
import 'bootstrap';
import VueI18n from 'vue-i18n'
import './veevalidate/veevalidate'
import EventBus from './bus'
import App from './App';
import router from './router';
import store from './store';
import currencyFilter from './filters/currency'

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VueI18n);
Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter)

axios.defaults.withCredentials = true
console.log('EventBus',EventBus);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  data() {
    return {
      bus: EventBus
    }
  },
  router,
  store,
  components: { App },
  template: '<App/>',
  /**測試將vuex中的state存到localStorage */
  // created() {
  //       //頁面載入時讀取localStorage
  //       localStorage.getItem("productListTemp") && this.$store.commit('adminProductList',Object.assign(this.$store.state.adminProductList,JSON.parse(localStorage.getItem("productListTemp"))));
    
  //       //在頁面重新整理時將vuex state裡的資料存進localStorage
  //       window.addEventListener("beforeunload",()=>{
  //           localStorage.setItem("productListTemp",JSON.stringify(this.$store.state.adminProductList))
  //       })
  // }
});
