<template>
  <nav class="col-md-2 d-none d-md-block bg-light sidebar">
    <div class="sidebar-sticky">
      <ul class="nav flex-column">
        <li class="nav-item">
          <a class="nav-link" href="#">
            <span data-feather="home"></span>
            管理員
            <span class="sr-only">(current)</span>
          </a>
        </li>
        <li class="nav-item" @click="setActive('productList')">
          <router-link
            class="nav-link"
            :class="{'active': activeLink === 'productList'}"
            to="/admin/product"
          >
            <i class="fas fa-box-open"></i>
            產品列表
          </router-link>
        </li>
        <li class="nav-item" @click="setActive('orderList')">
          <router-link
            class="nav-link"
            :class="{'active': activeLink === 'orderList'}"
            to="/admin/orderlist"
          >
            <i class="fas fa-list-ul"></i>
            訂單列表
          </router-link>
        </li>
      </ul>

      <h6
        class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
      >
        <span>模擬功能</span>
        <a class="d-flex align-items-center text-muted" href="#">
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item" @click="setActive('simulateBill')">
          <router-link
            class="nav-link"
            :class="{'active': activeLink === 'simulateBill'}"
            to="/admin/customer_order"
          >模擬訂單</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      activeLink: ""
    };
  },
  methods: {
    setActive(linkName) {
      console.log("click");
      this.activeLink = linkName;
    }
  }
};
</script>

<style>
</style>