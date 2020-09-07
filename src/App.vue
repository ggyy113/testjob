<template>
  <div id="app">

    <router-view ></router-view>
    <!-- 底部选项卡 -->
    <van-tabbar active-color="#07c160" inactive-color="#000" route v-show="$route.meta.navshow">
      <van-tabbar-item icon="home-o" to="/">主页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/search">搜索</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/cinema">影院</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/center">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    name: 'app',
    components: {

    }
  }
</script>

<style>
  @import "assets/css/base.css";
</style>
