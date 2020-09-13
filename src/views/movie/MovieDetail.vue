<template>
  <div class="container">

    <van-nav-bar
        title="上映场次和购票"
        right-text="分享"
        left-arrow
        @click-left="onClickLeft" fixed="true" placeholder
    />
    <my-title color="blue" title="电影详情"/>
    <!-- 电影详情 -->

    <div align="center" @click="toMovieComment">
      <div align="center">
        <van-image :src="movieImageURL+ movieVO.movieImg" width="200px" height="300px"></van-image>
      </div>
      <div align="center">
        {{movieVO.movieName}} {{movieVO.moviePrice}}元
      </div>
      <div align="center">
        时长{{movieVO.movieTime}}分【{{movieVO.movieLanguage}}】
      </div>
      <div align="center">
        导演：{{movieVO.movieDirctor}}演员：{{movieVO.movieStar}}
      </div>
      <div align="center">
        简介：{{movieVO.moviePlot}}
      </div>
    </div>


    <div v-for="(findTim,index) in showInfo">
      <van-cell center="true">
        <template #title>
          <h3><b>{{findTim.ts}}</b></h3>
          <span>{{endTime}}散场<font color="white">········</font>{{findTim.timId}}号厅</span>
        </template>
        <template #default>
          <span class="value"><b>￥{{movieVO.moviePrice}}</b></span><font color="white">·······</font><br/>
          <van-tag type="warning">剩余{{amount}}张</van-tag>
          <font color="white">····</font>
        </template>
        <template #extra>
          <span></span>
          <van-button plain size="mini" type="primary" @click="toCart(findTim.showMessage)">加入购物车</van-button>
        </template>
      </van-cell>
    </div>
    <br/>
    <br/>
    <br/>


  </div>
</template>

<script>
  import axios from 'axios';
  import MyTitle from '@/components/common/MyTitle.vue';

  export default {

    components: {    //步骤2---注册组件
      MyTitle,
    },
    data() {
      return {
        movieVO: {},
        //movieTime:'',
        movieId: 0,
        // movieDirctor:'',
        // movieStar:'',
        // movieLanguage:'',
        // movieTime:0,
        movieImageURL: this.$store.state.movieImageURL,   //商品图片路径
        showInfo: [],
        //moviePlot: '',    //提示信息

      }
    },

    inject: ['updateUserInfo'],
    //事件处理方法
    methods: {
      toCart(showMessage) {
        const params = {
          params: {
            showMessage: showMessage
          }
        }
        axios.get("/api/cart/add", params).then(
          res => {
            if (res.data.status == 1) {
              this.$store.state.cartQuantity = res.data.data.cartQuantity
              this.updateUserInfo()
            } else {
              this.$toast(res.data.message);
            }
          }
        )
        this.$router.push("/cart")
      },


      toMovieComment() {
        alert("电影评论");
      },
      onClickLeft() {
        this.$router.go(-1);
      }
    },

    mounted() {
      //接收路由参数---dianyingbianhao
      this.movieId = this.$route.query.movieId
      //console.movieId = this.$route.query.movieId
      //发送axios请求---获取电影详情
      console.log(this.movieId);
      axios.get("/api/movie/detail/" + this.movieId).then(
        res => {
          console.log(res.data.data)
          console.log(res.data)

          if (res.data.status == 1) {
            this.movieVO = res.data.data.movieVO;
            console.log(this.movieVO)
          } else {
            this.$toast(res.data.message);
          }
        }
      )
      const params = {
        params: {
          movieId: this.movieId
        }
      }
      axios.get("/api/movie/getDisplayById", params).then(
        res => {
          if (res.data.status == 1) {
            this.showInfo = res.data.data.showInfo
          } else {
            this.$toast(res.data.message);
          }
        }
      )
    }
  }
</script>

<style>
</style>
