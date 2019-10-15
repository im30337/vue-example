<template>
  <div class="my-5 row justify-content-center">
    <form class="col-md-6" @submit.prevent="createOrder">
      <h2 class="text-center">訂單資料</h2>
      <div class="form-group">
        <label for="useremail">Email address</label>
        <input
          type="email"
          class="form-control"
          name="email"
          id="useremail"
          placeholder="請輸入email"
          v-model="form.user.email"
          v-validate="'required|email'"
          :class="{'is-invalid': errors.has('email')}"
        />
        <span class="text-danger" v-if="errors.has('email')">{{errors.first('email')}}</span>
      </div>
      <div class="form-group">
        <label for="username">收件人姓名</label>
        <input
          type="text"
          class="form-control"
          name="姓名"
          id="username"
          placeholder="請輸入姓名"
          v-model="form.user.name"
          v-validate.continues="'required|onlyCN'"
          :class="{'is-invalid': errors.has('姓名')}"
        />
        <span
          v-for="error in errors.collect('姓名')"
          class="text-danger"
          v-if="errors.has('姓名')"
        >{{error}}</span>
      </div>
      <div class="form-group">
        <label for="usertel">收件人電話</label>
        <input
          type="tel"
          class="form-control"
          name="電話"
          id="usertel"
          placeholder="請輸入電話"
          v-model="form.user.tel"
          v-validate.immediate="'required|isMobile'"
          :class="{'is-invalid': errors.has('電話')}"
        />
        <span class="text-danger" v-if="errors.has('電話')">{{errors.first('電話')}}</span>
      </div>
      <div class="form-group">
        <label for="useradderss">收件人地址</label>
        <input
          type="address"
          class="form-control"
          name="地址"
          id="useraddress"
          placeholder="請輸入地址"
          v-model="form.user.address"
          v-validate="'required|alpha'"
          :class="{'is-invalid': errors.has('地址')}"
        />
        <span class="text-danger" v-if="errors.has('地址')">{{errors.first('地址')}}</span>
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">留言</label>
        <textarea class="form-control" name id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>
      <button type="submit" class="btn btn-danger">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "veeValidateForm",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      NODE_ENV: process.env.NODE_ENV,
      HTTP_PATH: process.env.HTTP_PATH,
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      }
    };
  },
  methods: {
    createOrder() {
      const api = `${process.env.TERRYLAI_APIPATH}/api/${process.env.TERRYLAI_CUSTOMPATH}/order`;
      const vm = this;
      const order = this.form
      this.$validator.validate().then(valid => {
        if (valid) {
          // vm.$router.push(`/customer_checkout/-Lq4OZT-Lmpi8VaVtS_0`)
          console.log("order", order);
          this.$http.post(api, {data: order}).then(response => {
            console.log(response)
            if (response.data.success) {
              console.log("訂單已建立", response.data);
              vm.$router.push(`/customer_checkout/${response.data.orderId}`)
            }
          }).catch(err => {
            console.log('err', err)
          });
        } else {
          console.log("欄位不完整");
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// @import "@/assets/all.scss";
</style>
