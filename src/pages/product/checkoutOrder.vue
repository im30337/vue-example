<template>
  <div>
    <div class="container main-contant py-5">
      <h1 class="text-center mb-3 text-secondary">血拼大特賣 結帳</h1>
      <section class="form-row align-items-center text-center">
        <div class="col">
          <div class="alert alert-success alert-rounded mb-0" role="alert">1.輸入訂單資料</div>
        </div>
        <div class="col">
          <div class="alert alert-light alert-rounded mb-0" role="alert">2.金流付款</div>
        </div>
        <div class="col">
          <div class="alert alert-light alert-rounded mb-0" role="alert">3.完成</div>
        </div>
      </section>

      <section class="row justify-content-center mt-5">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header" id="headingOne">
              <h6 class="mb-0 d-flex align-items-center">
                <a data-toggle="collapse" href="#collapseOne">
                  顯示購物車細節
                  <i class="fa fa-angle-down" aria-hidden="true"></i>
                </a>
                <span class="h3 ml-auto mb-0">$ {{ cart.final_total }}</span>
              </h6>
            </div>
          </div>
          <div id="collapseOne" class="collapse mt-3">
            <table class="table table-sm">
              <thead>
                <tr>
                  <th width="30"></th>
                  <th width="100"></th>
                  <th>商品名稱</th>
                  <th width="100">數量</th>
                  <th width="80">小計</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cart.carts" :key="item.id">
                  <td class="align-middle text-center" @click="setDeleteTemp(item)">
                    <a
                      href="#removeModal"
                      class="text-muted"
                      data-toggle="modal"
                      data-title="刪除 金牌西裝 1 件"
                    >
                      <i class="fas fa-trash" aria-hidden="true"></i>
                    </a>
                  </td>
                  <td class="align-middle">
                    <img :src="item.product.image" class="img-fluid img-thumbnail" alt />
                  </td>
                  <td class="align-middle">{{ item.product.category }}</td>
                  <td class="align-middle">{{ item.qty }} {{ item.product.unit}}</td>
                  <td class="align-middle text-right">{{ item.total }}元</td>
                </tr>
                <tr>
                  <td colspan="4" class="text-right">運費</td>
                  <td class="text-right">
                    <strong>$0</strong>
                  </td>
                </tr>
                <tr>
                  <td colspan="4" class="text-right">合計</td>
                  <td class="text-right">
                    <strong>$ {{ cart.final_total }}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h5 class="py-3 mt-5 mb-2 text-center bg-light">訂購人資訊</h5>
          <form id="needs-validation">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="username">姓名</label>
                <input
                  type="text"
                  class="form-control"
                  name="姓名"
                  id="username"
                  placeholder="姓名"
                  v-model="form.name"
                  v-validate.continues="'required|onlyCN'"
                  :class="{'is-invalid': errors.has('姓名')}"
                />
                <span class="text-danger" v-if="errors.has('姓名')">{{errors.first('姓名')}}</span>
              </div>
              <div class="form-group col-md-6">
                <label for="email">Email</label>
                <input
                  type="email"
                  class="form-control"
                  name="email"
                  id="email"
                  placeholder="請輸入email"
                  v-model="form.email"
                  v-validate="'required|email'"
                  :class="{'is-invalid': errors.has('email')}"
                />
                <span class="text-danger" v-if="errors.has('email')">{{errors.first('email')}}</span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="state">國家</label>
                <select
                  id="state"
                  name="國家"
                  class="form-control"
                  v-model="form.country"
                  v-validate="'required'"
                  :class="{'is-invalid': errors.has('國家')}"
                >
                  <option value="台灣">台灣</option>
                </select>
                <span class="text-danger" v-if="errors.has('國家')">{{errors.first('國家')}}</span>
              </div>
              <div class="form-group col-md">
                <label for="city">城市</label>
                <select
                  name="城市"
                  id="city"
                  class="form-control"
                  v-model="form.city"
                  v-validate="'required'"
                  :class="{'is-invalid': errors.has('城市')}"
                >
                  <option value="台北市">台北市</option>
                  <option value="台南市">台南市</option>
                  <option value="高雄市">高雄市</option>
                </select>
                <span class="text-danger" v-if="errors.has('城市')">{{errors.first('城市')}}</span>
              </div>
              <div class="form-group col-md">
                <label for="inputZip">郵遞區號</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputZip"
                  name="郵遞區號"
                  placeholder="請輸入郵遞區號"
                  v-model="form.postalCode"
                  v-validate.immediate="'required|isPostalCode'"
                  :class="{'is-invalid': errors.has('郵遞區號')}"
                />
                <span class="text-danger" v-if="errors.has('郵遞區號')">{{errors.first('郵遞區號')}}</span>
              </div>
            </div>
            <div class="form-group">
              <label for="inputAddress">地址</label>
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                name="地址"
                placeholder="請輸入地址"
                v-model="form.address"
                v-validate="'required|alpha'"
                :class="{'is-invalid': errors.has('地址')}"
              />
              <span class="text-danger" v-if="errors.has('地址')">{{errors.first('地址')}}</span>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="state">付款方式</label>
                <select
                  id="state"
                  name="付款方式"
                  class="form-control"
                  v-model="form.paymentMethod"
                  v-validate="'required'"
                  :class="{'is-invalid': errors.has('付款方式')}"
                >
                  <option value="信用卡">信用卡</option>
                </select>
                <span class="text-danger" v-if="errors.has('付款方式')">{{errors.first('付款方式')}}</span>
              </div>
              <div class="form-group col-md-6">
                <label for="state">取件方式</label>
                <select
                  id="state"
                  name="取件方式"
                  class="form-control"
                  v-model="form.productDelivery"
                  v-validate="'required'"
                  :class="{'is-invalid': errors.has('取件方式')}"
                >
                  <option value="超商取貨">超商取貨</option>
                </select>
                <span class="text-danger" v-if="errors.has('取件方式')">{{errors.first('取件方式')}}</span>
              </div>
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">訂單備註</label>
              <textarea class="form-control" name id="exampleFormControlTextarea1" 
              rows="3"
              v-model="form.remarks"></textarea>
            </div>
            <div class="text-right">
              <router-link class="btn btn-secondary" to="/Product/Home">繼續選購</router-link>
              <button type="submit" class="btn btn-primary" @click.prevent="confirmOrder">確認付款</button>
              <!-- <a href="#" class="btn btn-primary">確認付款</a> -->
            </div>
          </form>
        </div>
      </section>
    </div>
    <!-- delete modal -->
    <div
      class="modal fade"
      id="removeModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">刪除商品</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>是否確認刪除商品</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">否</button>
            <button
              type="button"
              class="btn btn-outline-danger px-5"
              data-dismiss="modal"
              aria-label="Close"
              @click="deleteCommodity"
            >是</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      deleteCommodityTemp: {},
      form: {
        name: "",
        email: "",
        country: "",
        city: "",
        postalCode: null,
        address: "",
        paymentMethod:"",
        productDelivery:"",
        remarks:""
      }
    };
  },
  computed: {
    ...mapGetters(["isLoading"]),
    ...mapGetters("cartsModules", ["cart"])
  },
  methods: {
    setDeleteTemp(commodity) {
      this.deleteCommodityTemp = commodity;
    },
    deleteCommodity() {
      this.$store.dispatch(
        "cartsModules/REMOVECART",
        this.deleteCommodityTemp.id
      );
    },
    confirmOrder() {
      const vm = this;
      const order = this.form;
      this.$validator.validate().then(valid => {
        if (valid) {
          /**金流api處理 */
          vm.$router.push('/Product/paymentcheck')
        } else {
          console.log("欄位不完整");
        }
      });
    },
    ...mapActions("cartsModules", ["CLEARCART"])
  }
};
</script>

<style>
</style>