<template>
  <div>
    <div class="container main-contant py-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <h1 class="text-center mb-3 text-secondary">大失血拍賣 金流付款</h1>
          <section class="form-row align-items-center text-center">
            <div class="col">
              <div class="alert alert-success alert-rounded mb-0" role="alert">金流付款</div>
            </div>
          </section>
          <h5 class="py-3 mt-5 mb-2 text-center bg-light">資料填寫</h5>
          <form id="needs-validation">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="username">持卡人姓名</label>
                <input type="text" class="form-control" name="姓名" id="username" placeholder="姓名" />
                <span class="text-danger"></span>
              </div>
              <div class="form-group col-md-6">
                <label for="state">信用卡類型</label>
                <select
                  id="state"
                  name="信用卡類型"
                  class="form-control"
                  v-validate="'required'"
                  :class="{'is-invalid': errors.has('信用卡類型')}"
                >
                  <option value="銀聯卡">銀聯卡</option>
                </select>
                <span class="text-danger" v-if="errors.has('信用卡類型')">{{errors.first('信用卡類型')}}</span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md">
                <label for="inputZip">卡號</label>
                <input type="text" class="form-control" id="inputZip" name="卡號" placeholder="請輸入卡號" />
                <span class="text-danger"></span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="state">失效日期 月</label>
                <select
                  id="state"
                  name="月"
                  class="form-control"
                  v-validate="'required'"
                  :class="{'is-invalid': errors.has('月')}"
                  placeholder="月"
                >
                  <option value disabled selected>月</option>
                  <option v-for="month in 12" value="month" :key="month">{{ month }}</option>
                </select>
                <span class="text-danger" v-if="errors.has('月')">{{errors.first('月')}}</span>
              </div>
              <div class="form-group col-md-6">
                <label for="state">年</label>
                <select
                  id="state"
                  name="年"
                  class="form-control"
                  v-validate="'required'"
                  :class="{'is-invalid': errors.has('年')}"
                  placeholder="年"
                >
                  <option value disabled selected>年</option>
                  <option v-for="year in 20" value="year + 2019" :key="year">{{ year + 2019 }}</option>
                </select>
                <span class="text-danger" v-if="errors.has('年')">{{errors.first('年')}}</span>
              </div>
            </div>
            <div class="form-group col-md-6 padding-fix">
              <label for="inputAddress">安全碼</label>
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                name="安全碼"
                placeholder="請輸入安全碼"
              />
              <span class="text-danger"></span>
            </div>
            <div class="text-right">
              <router-link class="btn btn-secondary" to="/Product/Home">繼續選購</router-link>
              <button type="submit" class="btn btn-primary" @click.prevent="confirmOrder">確認付款</button>
              <!-- <a href="#" class="btn btn-primary">確認付款</a> -->
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions("cartsModules", ["CLEARCART"])
  }
};
</script>

<style scoped>
.padding-fix {
  padding-left: 0px;
}
</style>