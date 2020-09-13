<template>
  <div class="container">
    <van-nav-bar title="欢迎登录!" left-text="" left-arrow @click-left="onClickLeft"/>
    <van-divider dashed :style="{color:'blue',borderColor:'red'}"></van-divider>
    <van-field v-model="phone" label="手机号" placeholder="请输入手机号"/>
    <br>
    <van-field v-model="password" label="密码" placeholder="请输入密码" type="password"/>
    <br>
    <van-button type="primary" round class="btn" @click="login">登录</van-button>
  </div>
</template>

<script>

  import axios from 'axios'
  import MyTitle from '@/components/common/MyTitle.vue'    //步骤1---引入组件

  export default {

    components: {    //步骤2---注册组件
      MyTitle
    },

    //组件使用的数据
    data() {
      return {
        phone: '',    //手机号
        password: '',    //密码
        message: ''
      }
    },

    //导入updateUserInfo()方法
    inject: ['updateUserInfo'],

    methods: {
      onClickLeft() {
        this.$router.push('/');
      },
      login() {

        //构造get请求的参数
        const params = {
          params: {
            phone: this.phone,
            password: this.password
          }
        }

        //发送axios请求---登录处理
        //axios.get("http://localhost:8888/movie/user/login", params).then(
        axios.get("/api/user/login", params).then(
          res => {
            console.log(res.data.data);
            if (res.data.status == 1) {
              //this.$toast(res.data.message);
              //在state中保存当前用户对象
              this.$store.state.user = res.data.data.user
              //在state中保存用户购物车中的商品种类数
              this.$store.state.cartQuantity = res.data.data.cartQuantity
              //更新主页中的用户信息
              this.updateUserInfo()
              //跳转到主页
              this.$router.push("/")
            } else {
              this.$toast(res.data.message);
            }

          }
        )
      }
    },

    mounted() {
      //alert(this.$route.query.username);
      if (this.$route.query.username != undefined) {  //从注册页面跳转过来
        this.username = this.$route.query.username
      }
    }
  }
</script>

<style>
  .container {
    margin-bottom: 50px;
  }

  .btn {
    width: 200px;
    margin: 0 auto;
    display: block;
  }


</style>