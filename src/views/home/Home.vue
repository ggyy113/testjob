<template>
  <div id="home">
    <div align="center">
      <!-- 顶端垂直滚动内容 -->
      <van-notice-bar left-icon="volume-o" :scrollable="false">
        <van-swipe
            vertical
            class="notice-swipe"
            :autoplay="3000"
            :show-indicators="false"
        >
          <van-swipe-item>最新电影已经上线，大家观影愉快</van-swipe-item>
          <van-swipe-item>《肖申克的救赎》火爆来袭</van-swipe-item>
          <van-swipe-item>《盗梦空间》——梦境世界等你来探</van-swipe-item>
        </van-swipe>
      </van-notice-bar>

      <!-- 顶端轮播图-->
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image" width="250" height="260"/>
        </van-swipe-item>
      </van-swipe>

      <!-- 标签 -->
      <van-tabs v-model="active">
        <van-tab title="正在热映">
          <van-grid :column-num="3">
            <van-grid-item v-for="(movie, index) in movieTopList" :key="index">
              <div align="center" @click="toDetail(movie.movieId)">
                <img :src="movieImageURL + movie.movieImg" alt="" round width="50px" height="70px">
                <div align="center">{{movie.movieName}}</div>
              </div>
            </van-grid-item>
          </van-grid>

        </van-tab>
        <van-tab title="即将上映">
          <!-- 宫格 -->
          <van-grid :column-num="3">
            <van-grid-item v-for="(movie, index) in movieNewList" :key="index">
              <div align="center" @click="toDetail(movie.movieId)">
                <img :src="movieImageURL + movie.movieImg" alt="" round width="50px" height="70px">
                <div align="center">{{movie.movieName}}</div>
              </div>
            </van-grid-item>
          </van-grid>
        </van-tab>
      </van-tabs>


    </div>

    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
  </div>
</template>

<script>
  import axios from 'axios'
  import img4 from '@/assets/img/4.jpg'
  import img8 from '@/assets/img/8.jpg'
  import img9 from '@/assets/img/9.jpg'
  import img10 from '@/assets/img/10.jpg'

  export default {
    name: "Home",
    data() {
      return {
        images: [img4, img8, img9, img10],
        movieTopList: [],
        movieNewList: [],
        active: 2,
        movieImageURL: this.$store.state.movieImageURL,
      }
    },

    methods: {

      //跳转到电影详情页
      toDetail(movieId) {
        //alert(movieId);
        this.$router.push({path: '/MovieDetail', query: {movieId: movieId}})
      }
    },

    mounted() {
      //发送axios请求---获取热映列表
      axios.get("/api/movie/topList").then(
        res => {
          console.log(res.data.data)
          if (res.data.status == 1) {
            this.movieTopList = res.data.data.movieTopList;
          } else {
            this.$toast(res.data.message);
          }
        }
      )
      //发送axios请求---获取即将上映列表
      axios.get("/api/movie/newList").then(
        res => {
          console.log(res.data.data)
          if (res.data.status == 1) {
            this.movieNewList = res.data.data.movieNewList;
          } else {
            this.$toast(res.data.message);
          }
        }
      )
    }
  }
</script>

<style scoped>

  .notice-swipe {
    height: 40px;
    line-height: 40px;
  }

  #home {
    width: 100%;
    height: 100%;
  }
</style>