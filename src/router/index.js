import Vue from 'vue';
import Router from 'vue-router';
import Axios from 'axios';
import Home from '@/components/Home';
// import VeeValidateForm from '@/pages/VeeValidateForm'
import PugTest from '@/pages/PugTest'
import Login from '@/pages/Login'
import Product from '@/pages/product/Product'
import Dashboard from '@/pages/Dashboard'
import Adminproduct from '@/pages/Adminproduct'
import CustomerOrder from '@/pages/CustomerOrder'
import CustomerCheckOut from '@/pages/CustomerCheckOut'
import OrderList from '@/pages/OrderList'
import ProductDetail from '@/pages/product/Productdetail'
import CheckOutOrder from '@/pages/product/checkoutOrder'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/Login'
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'AdminDashboard',
      component: Dashboard,
      children: [
        {
          path: 'product',
          name: 'Adminproduct',
          component: Adminproduct,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'orderlist',
          name: 'OrderList',
          component: OrderList,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'customer_order',
          name: 'CustomerOrder',
          component: CustomerOrder
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'CustomerCheckOut',
          component: CustomerCheckOut
        }
      ]
    },
    {
      path: '/Product',
      name: 'Product',
      component: Product,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'Home',
          name: 'Home',
          component: Home
        },
        {
          path: 'productdetail/:productId',
          name: 'ProductDetail',
          component: ProductDetail
        },
        {
          path: 'checkoutorder',
          name: 'CheckOutOrder',
          component: CheckOutOrder
        },
        // {
        //   path: 'PugTest',
        //   name: 'PugTest',
        //   component: PugTest,
        //   meta: {
        //     requiresAuth: true
        //   }
        // }
      ]
    }
  ],

});
//路由守衛
router.beforeEach((to, from, next) => {
  console.log('to', to)
  if (to.meta.requiresAuth) {
    const api = `${process.env.TERRYLAI_APIPATH}/api/user/check`;
    Axios.post(api).then(function (response) {
      console.log('response', response.data);
      response.data.success ? next() : next({ path: '/Login' })
    })
  } else {
    next()
  }
})

router.afterEach(function (transition) {
  console.log('transition', transition);
})

export default router
