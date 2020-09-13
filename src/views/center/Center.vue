<template>
  <div id="center">

    <div id="center-top">
      <h2>个人中心</h2>
      <div id="t-left">
        <van-image round width="5rem" height="5rem" :src="photoUrl+photo"/>
      </div>
      <div class="spans" id="t-right">{{name}}</div>
    </div>

    <van-cell title="我的订单" is-link to="/order"/>
    <br/>
    <div style="margin: 56px;">
      <van-button @click="toUpdatePswPage" round block type="info">
        修改密码
      </van-button>
      <br/>
      <van-button @click="logout" round block type="info" native-type="submit">
        退出登录
      </van-button>
      <br/>
    </div>


  </div>
</template>

<script>
  import {getOrderInfo} from '@/network/center';
  import axios from 'axios';

  export default {
    name: "Center",
    created() {
      // 当前登录的用户信息
      this.photo = this.$store.state.user.image;
      this.name = this.$store.state.user.username;
    },
    data() {
      return {
        photo: "",
        name: "",
        photoUrl: this.$store.state.photoImageURL,
        result: '',
      }
    },

    //导入updateUserInfo()方法
    inject: ['updateUserInfo'],
    methods: {
      toUpdatePswPage() {
        this.$router.push("/updatePsw")
      },
      logout() {
        // 发送请求将服务端的session销毁
        axios.get("/api/user/logout").then(
          res => {
            console.log(res.data.data)
            if (res.data.status == 1) {
              //在state中清除当前用户对象    清除掉客户端的用户对象
              this.$store.state.user = ''
              //在state中清除用户购物车中的商品种类数
              this.$store.state.cartQuantity = 0
              //跳转到主页
              this.$router.push("/login")
              //更新主页中的用户信息
              this.updateUserInfo()
            } else {
              this.$toast(res.data.message);
            }
          }
        )
      }
    },

    mounted() {
      if (this.$store.state.userInfo == '') {
        console.log("用户未登录");
        //设置头像和名字为未登录
        this.photo = '';
      } else {
        //设置头像和用户名


        //获取全部订单
        getOrderInfo().then(res => {
          this.$store.state.orderList = res.data.orderVos;
        }).catch(res => {
        })
      }

    }
  }


</script>

<style scoped>
  #center {
    padding-top: 15%;

  }

  #center-top {
    text-align: center;
  }

  #t-left {
    display: inline-block;
  }

  #t-right {
    display: inline-block;
  }

  .spans {
    display: inline-block;
    margin-top: 30px;
  }

  /* img{
       width: 200px;
       height: 200px;
       border-radius: 50%;
   } */


</style>