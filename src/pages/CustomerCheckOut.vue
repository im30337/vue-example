<template>
  <div class="my-5 row justify-content-center">
    <form class="col-md-6" @submit.prevent="payOrder">
      <table class="table">
        <thead>
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
        </thead>
        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td class="align-middle">{{ item.product.title }}</td>
            <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
            <td class="align-middle text-right">{{ item.final_total }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-right">總計</td>
            <td class="text-right">{{ order.total }}</td>
          </tr>
        </tfoot>
      </table>

      <table class="table">
        <tbody>
          <tr>
            <th width="100">Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>收件人電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td>
              <span v-if="!order.is_paid">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-right" v-if="order.is_paid === false">
        <button class="btn btn-danger">確認付款去</button>
        <i class="fas fa-spinner fa-spin" v-if="status.payCheckLoading"></i>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderId: "",
      order: {
        user: {}
      },
      status: {
        payCheckLoading: false
      }
    };
  },
  created() {
    console.log("route", this.$route);
    this.orderId = this.$route.params.orderId;
    this.getOrder(this.orderId);
  },
  methods: {
    getOrder(orderId) {
      const api = `${process.env.TERRYLAI_APIPATH}/api/${process.env.TERRYLAI_CUSTOMPATH}/order/${orderId}`;
      const vm = this;
      this.$http.get(api).then(response => {
        if (response.data.success) {
          console.log("response", response.data);
          vm.order = response.data.order;
        }
      });
    },
    payOrder() {
      const api = `${process.env.TERRYLAI_APIPATH}/api/${process.env.TERRYLAI_CUSTOMPATH}/pay/${this.orderId}`;
      const vm = this;
      this.status.payCheckLoading = true;
      this.$http.post(api).then(response => {
        if (response.data.success) {
          vm.status.payCheckLoading = false;
          console.log("response", response.data);
          vm.getOrder();
        }
      });
    }
  }
};
</script>

<style>
</style>