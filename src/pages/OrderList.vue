<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <table class="table">
      <thead>
        <th>購買時間</th>
        <th>Email</th>
        <th>購買款項</th>
        <th>應付金額</th>
        <th>是否付款</th>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td>{{item.create_at}}</td>
          <td v-if="item.user">{{ item.user.email }}</td>
          <td v-else>沒有用戶資訊</td>
          <td style="display:flex;flex-direction: column;">
            <span v-for="commodity in item.products" :key="commodity.id">
              {{ getProductName(commodity.product_id) }}
              : {{commodity.qty}} 件
            </span>
          </td>
          <td>{{item.total}}</td>
          <td>{{item.is_paid ? "是" : "否"}}</td>
        </tr>
      </tbody>
      <tfoot></tfoot>
    </table>
  </div>
</template>

<script>
import { isReferencedMemberExpression } from "babel-types";
export default {
  data() {
    return {
      orders: [],
      isLoading: false
    };
  },
  computed: {
    getProductName() {
      return function(id) {
        const productList = this.$store.state.adminProductList;
        const result = productList.filter(function(item) {
          return item.id === id;
        });
        return result[0].title;
        // console.log('result', result)
      };
    }
  },
  created() {
    this.getOrderList();
  },
  methods: {
    getOrderList(page = 1) {
      const api = `${process.env.TERRYLAI_APIPATH}/api/${process.env.TERRYLAI_CUSTOMPATH}/admin/orders?page=${page}`;
      const vm = this;
      this.isLoading = true;
      this.$http.get(api).then(response => {
        if (response.data.success) {
          console.log("response", response.data);
          vm.orders = response.data.orders;
          vm.isLoading = false;
        }
      });
    }
    // getProductName(id) {
    //   const productList = this.$store.state.adminProductList
    //   const result = productList.filter(function(item) {
    //     return item.id === id
    //   })
    //   return result[0].title
    //   // console.log('result', result)
    // }
  }
};
</script>

<style>
</style>