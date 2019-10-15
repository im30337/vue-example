<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div
            style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- <div class="h5">2,800 元</div> -->
              <div class="h5" v-if="!item.price">原價 {{ item.origin_price}}</div>
              <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
              <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="getProduct(item.id)"
            >
              <i class="fas fa-spinner fa-spin" v-if="status.detailLoadingItem === item.id"></i>
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addToCart(item.id,1)"
            >
              <i class="fas fa-spinner fa-spin" v-if="status.cartLoadingItem === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Cart Table -->
    <div class="table-section mt-5">
      <h2 class="mb-3">購物車詳情</h2>
      <table class="table cart-table">
        <thead>
          <tr class="text-center">
            <th colspan="2" scope="col">品名</th>
            <th scope="col" class="text-left">數量</th>
            <th scope="col" class="text-left">單價</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartData.carts" :key="item.id">
            <td scope="row">
              <button class="btn btn-outline-danger btn-sm" @click="deleteCart(item.id)">
                <i class="far fa-trash-alt"></i>
                <i class="fas fa-spinner fa-spin" v-if="status.deleteCartLoadingItem === item.id"></i>
              </button>
            </td>
            <td>{{ item.product.title }}</td>
            <td>{{ item.qty }}</td>
            <td>{{ item.final_total }}</td>
          </tr>
          <tr scope="row">
            <td colspan="3" class="text-right">總計</td>
            <td>{{ cartData.total }}</td>
          </tr>
          <tr scope="row">
            <td colspan="3" class="text-right">折扣價</td>
            <td>{{ cartData.final_total }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <veeValidateForm></veeValidateForm>
    <!-- Detail Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div
              style="height: 300px; background-size: cover; background-position: center"
              :style="{backgroundImage: `url(${product.imageUrl})`}"
              alt
            />
            <div class="mt-3">{{ product.content}}</div>
            <div>
              <span class="h5" v-if="!product.price">原價 {{ product.origin_price}}</span>
              <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
              <span class="h5" v-if="product.price">現在只要 {{ product.price }} 元</span>
            </div>
            <div class="input-group mb-3 mt-3">
              <select class="custom-select" id="inputGroupSelect01" v-model="product.num">
                <option v-for="number in 10" :value="number" :key="number">選購 {{ number }} 件</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <span>小計??元</span>
            <button
              type="button"
              class="btn btn-primary"
              @click="addToCart(product.id, product.num)"
            >
              <i class="fas fa-spinner fa-spin" v-if="status.cartLoadingItem === product.id"></i>加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import veeValidateForm from "../pages/veeValidateForm";
export default {
  components: {
    veeValidateForm
  },
  data() {
    return {
      products: [],
      product: {},
      cartData: [],
      status: {
        detailLoadingItem: "",
        cartLoadingItem: "",
        deleteCartLoadingItem: ""
      },
      isLoading: false
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.TERRYLAI_APIPATH}/api/${process.env.TERRYLAI_CUSTOMPATH}/products`;
      const vm = this;
      this.isLoading = true;
      this.$http.get(api).then(response => {
        if (response.data.success) {
          console.log("response", response.data);
          this.isLoading = false;
          vm.products = response.data.products;
        }
      });
    },
    getProduct(id) {
      const api = `${process.env.TERRYLAI_APIPATH}/api/${process.env.TERRYLAI_CUSTOMPATH}/product/${id}`;
      const vm = this;
      this.status.detailLoadingItem = id;
      this.$http.get(api).then(response => {
        if (response.data.success) {
          console.log("response", response.data);
          vm.product = Object.assign({}, response.data.product);
          $("#productModal").modal("show");
          this.status.detailLoadingItem = "";
        }
      });
    },
    addToCart(id, qty) {
      const api = `${process.env.TERRYLAI_APIPATH}/api/${process.env.TERRYLAI_CUSTOMPATH}/cart`;
      const vm = this;
      this.status.cartLoadingItem = id;
      const cart = {
        product_id: id,
        qty
      };
      console.log("cart", cart);
      this.$http
        .post(api, { data: cart })
        .then(response => {
          if (response.data.success) {
            console.log("response", response.data);
            this.status.cartLoadingItem = "";
            vm.getCart();
            $("#productModal").modal("hide");
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    getCart() {
      const api = `${process.env.TERRYLAI_APIPATH}/api/${process.env.TERRYLAI_CUSTOMPATH}/cart`;
      const vm = this;
      this.$http.get(api).then(response => {
        if (response.data.success) {
          console.log("response", response.data);
          vm.cartData = Object.assign({}, response.data.data);
        }
      });
    },
    deleteCart(id) {
      const api = `${process.env.TERRYLAI_APIPATH}/api/${process.env.TERRYLAI_CUSTOMPATH}/cart/${id}`;
      const vm = this;
      this.status.deleteCartLoadingItem = id;
      this.$http.delete(api).then(response => {
        if (response.data.success) {
          console.log("response", response.data);
          vm.getCart();
        }
      });
    }
  },
  created() {
    this.getProducts();
    this.getCart();
  }
};
</script>

<style scope>
.table-section {
  display: flex;
  flex-direction: column;
  align-items:center; 
}
.cart-table {
  width: 45%;
}
.th-wid {
  /* display: flex; */
  /* justify-content: end; */
  /* width: 33.33% */
}
</style>