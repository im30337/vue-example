<template>
  <div>
    <div class="container main-content mb-3">
      <!-- <Loading :active.sync="isLoading"></Loading> -->
      <div class="row">
        <div class="col-md-3">
          <!-- 左側選單 (List group) -->
          <div class="list-group sticky-top">
            <a
              class="list-group-item list-group-item-action"
              href="#/Product/Home"
              @click.prevent="searchText = item"
              :class="{ 'active': item === searchText}"
              v-for="item in categories"
              :key="item"
            >
              <i class="fa fa-street-view" aria-hidden="true"></i>
              {{ item }}
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action"
              @click.prevent="searchText = ''"
              :class="{ 'active': searchText === ''}"
            >全部顯示</a>
          </div>
        </div>
        <!-- 子頁面 -->
        <div class="col-md-9">
          <div class="d-flex mb-4">
            <!-- Search bar -->
            <form class="form-inline my-3 my-lg-0">
              <div class="input-group">
                <input
                  class="form-control"
                  type="text"
                  v-model="searchText"
                  placeholder="Search"
                  aria-label="Search"
                />
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button" @click="searchText = ''">
                    <i class="fa fa-times"></i>
                  </button>
                </div>
              </div>
            </form>
            <button
              class="btn btn-outline-primary ml-auto"
              type="button"
              @click="GETPRODUCTS"
            >重新取得資料</button>
          </div>
          <!-- content -->
          <div class="tab-pane" id="list-gift">
            <div class="row align-items-stretch">
              <!-- 禮品 -->
              <div class="col-md-4 mb-4" v-for="(item) in filterData" :key="item.id">
                <div class="card border-0 box-shadow text-center h-100">
                  <img
                    class="card-img-top"
                    :src="item.image"
                    alt="Card image cap"
                    @click="getProductDetail(item.id)"
                  />
                  <div class="card-body" @click="getProductDetail(item.id)">
                    <h4 class="card-title">{{ item.title }}</h4>
                    <p class="card-text text-left">{{ item.content }}</p>
                  </div>
                  <div class="card-footer border-top-0 bg-white">
                    <button
                      class="btn btn-outline-secondary btn-block btn-sm"
                      @click="addtoCart(item.id)"
                    >
                      <i class="fa fa-cart-plus" aria-hidden="true"></i> 加到購物車
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      searchText: ""
    };
  },
  computed: {
    filterData() {
      const vm = this;
      if (vm.searchText) {
        return vm.products.filter(item => {
          const data = item.title
            .toLowerCase()
            .includes(vm.searchText.toLowerCase());
          return data;
        });
      }
      return this.products;
    },
    ...mapGetters("productsMoudules", ["products", "categories"])
  },
  methods: {
    getProductDetail(productId) {
      console.log("productId", productId);
      this.$router.push({ name: "ProductDetail", params: { productId } });
    },
    // getProducts() {
    //   this.$store.dispatch('GETPRODUCTS');
    //   // const vm = this;
    //   // const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
    //   // // vm.isLoading = true;
    //   // this.$store.commit("loadingSwitch", true);
    //   // this.$http.get(url).then(response => {
    //   //   vm.products = response.data.products;
    //   //   console.log("取得產品列表:", response);
    //   //   vm.getUnique();
    //   //   // vm.isLoading = false;
    //   //   this.$store.commit("loadingSwitch", false);
    //   // });
    // },
    addtoCart(id, qty = 1) {
      this.$store.dispatch("cartsModules/ADDTOCART", { product_id: id, qty });
      // const vm = this;
      // const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      // // vm.isLoading = true;
      // // this.$store.commit("loadingSwitch", true);
      // this.$store.dispatch("LOADING",true);
      // console.log('$router',this.$store);
      // const item = {
      //   product_id: id,
      //   qty
      // };
      // // vm.isLoading = true;
      // // this.$store.commit("loadingSwitch", true);
      // this.$store.dispatch("LOADING",true);
      // this.$http.post(url, { data: item }).then(response => {
      //   // vm.isLoading = false;
      //   // this.$store.commit("loadingSwitch", false);
      //   this.$store.dispatch("LOADING",false);
      //   console.log("加入購物車:", response);
      // });
    },
    ...mapActions("productsMoudules", ["GETPRODUCTS"])
    // getUnique() {
    //   const vm = this;
    //   const categories = new Set();
    //   vm.products.forEach(item => {
    //     categories.add(item.category);
    //   });
    //   vm.categories = Array.from(categories);
    // }
  },
  created() {
    this.GETPRODUCTS();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>