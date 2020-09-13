<template>
  <div id="app">


    <div v-if="!showWelcome" >
    <!--顶部导航栏-->
      <van-sticky>


    <van-nav-bar
        title="欢迎嫦娥二号影院"
        :right-text="rightText"
        :left-text="leftText"
        @click-left="left"
        @click-right="right" v-show="this.$route.meta.navbar">

      <template #right v-if="this.$store.state.user!=''">
        {{rightText}}
        <van-image :src="photoImageURL + userPhoto" round/>
      </template>
    </van-nav-bar>
      </van-sticky>
    <router-view ></router-view>
    <!-- 底部选项卡 -->
    <van-tabbar active-color="#07c160" inactive-color="#000" route v-show="$route.meta.tabbar">
      <van-tabbar-item icon="home-o" to="/">主页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/search">搜索</van-tabbar-item>
<!--      <van-tabbar-item icon="shopping-cart-o" to="/cinema">影院</van-tabbar-item>-->
      <van-tabbar-item icon="shopping-cart-o" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/center">我的</van-tabbar-item>
    </van-tabbar>
    </div>
    <div v-else>
      <img src="./assets/welcome2.jpg" width="100%" height="680px"/>
      <div class="skip" @click="skip">跳过
      </div>
      <div class="circle">
        <van-circle fill="white" v-model="currentRate" :rate="0" :speed="20" :text="text" size="40" stroke-width="100"/>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'app',
    data() {
      return {
        showWelcome: false,   //是否显示欢迎页
        restTime: 5,    	  //剩余时间
        timer: {},  	 	  //计时器对象
        cartQuantity: 0,
        leftText: '注册',
        rightText: '登录',
        currentRate: 100,
        photoImageURL: this.$store.state.photoImageURL, //用户头像图片路径
        userPhoto: '' ,  //用户头像的文件名
        active: 0,
      }
    },
    components: {

    },

    methods:{
      left(){
        if(this.leftText=="注册"){
          //跳转到注册页面
          this.$router.push("/reg")
        }else{
          //发送axios请求---注销处理
          axios.get("/api/user/logout").then(
            res => {
              console.log(res.data.data)
              if(res.data.status==1){
                //在state中清除当前用户对象
                this.$store.state.user = ''
                //在state中清除用户购物车中的商品种类数
                this.$store.state.cartQuantity = 0
                //更新主页中的用户信息
                this.updateUserInfo()
                //跳转到主页
                this.$router.push("/")
              }else{
                this.$toast(res.data.message);
              }

            }
          )
        }
      },

      right(){

        if(this.rightText=="登录"){
          //跳转到登录页面
          this.$router.push("/login")
        }
      },

      showTime(){
        //console.log("123")
        if(this.restTime>1){
          this.restTime--;
        }else{
          //关闭计时器
          clearInterval(this.timer);

          //跳转到主页
          this.showWelcome = false;
        }
      },

      skip(){
        //关闭计时器
        clearInterval(this.timer);

        //跳转到主页
        this.showWelcome = false;

      },
      updateUserInfo(){
        //更新购物车的商品种类数
        this.cartQuantity = this.$store.state.cartQuantity;

        if(this.$store.state.user==''){  //未登录
          this.leftText = "注册"
          this.rightText = "登录"
        }else{   //已登录
          this.leftText = "注销"
          this.rightText = this.$store.state.user.username

          this.userPhoto = this.$store.state.user.image

        }
      },
    },

    //对外公开updateUserInfo()方法
    provide(){
      return{
        updateUserInfo:this.updateUserInfo
      }
    },

    mounted() {
      this.timer = setInterval(this.showTime, 1000)
    },

    computed: {
      text() {
        return (this.currentRate/20).toFixed(0) + '秒';
      },
    },
  }
</script>

<style>
  @import "assets/css/base.css";

  /deep/ .van-ellipsis{
    color: green !important;
    font-size: 20px;
    font-weight: bold;
  }

  .skip{
    position: absolute;
    top: 20px;
    right: 70px;
    color: white
  }

  .circle{
    position: absolute;
    top: 10px;
    right: 20px;
  }
</style>
