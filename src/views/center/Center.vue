<template>
  <div id="center">
    <div>
      <span>
        <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" size="40"/>
        <span id="uspan"><b>用户名</b> <br> <span id="vip-grade">会员等级</span></span>
      </span>
      <span> </span>
    </div>
    <van-cell title="我的订单" is-link to="/order" />
    这是我的 <br>
    这是我的 <br>
    这是我的 <br>
    这是我的 <br>
    这是我的 <br>
    这是我的 <br>
    这是我的 <br>
    这是我的 <br>
    这是我的 <br>
    这是我的 <br>
    这是我的 <br>
    这是我的 <br>
    这是我的 <br>
    这是我的 <br>
    这是我的 <br>
    这是我的 <br>
    这是我的 <br>
    这是我的 <br>
    这是我的 <br>
    这是我的 <br>
    这是我的 <br>
    这是我的 <br>
    这是我的 <br>
    这是我的 <br>
    这是我的 <br>
    这是我的 <br>
    这是我的 <br>
    这是我的
    这是我的



  </div>
</template>

<script>
  import {getOrderInfo} from '@/network/center';

  export default {
    name: "Center",
    data() {
      return {
        result: '',
      }
    },

    methods: {

    },

    mounted() {
      if (this.$store.state.userInfo == '') {
        console.log("用户未登录");
      }else {
        getOrderInfo().then(res => {
          this.$store.state.orderList = res.data.orderVos;
        }).catch(res => {
        })
      }

    }
  }


</script>

<style scoped>

  #uspan{
    height: 40px;
    /*float: left;*/
  }

  #vip-grade{
    font-size: 8px;
  }
</style>