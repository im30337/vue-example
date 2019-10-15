<template>
  <div>
    <Navbar></Navbar>
    <Alert></Alert>
    <div class="container-fluid">
      <div class="row">
        <Sidebar></Sidebar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./dashboard/navbar";
import Sidebar from "./dashboard/sidebar";
import Alert from '../components/AlertMessage'
export default {
  name: "Dashboard",
  components: { Navbar, Sidebar, Alert }
};
</script>

<style>
</style>