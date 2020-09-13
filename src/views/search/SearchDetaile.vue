<template xmlns:MyTitle="http://www.w3.org/1999/xlink">
  <div class="container">
    <my-title color="blue" title="为您搜到以下电影" />

    </MyTitle>
    <van-grid :column-num="3">
      <van-grid-item v-for="(movie, index) in movieList" :key="index">
        <div align="center" @click="toDetail(movie.movieId)">

          <img :src="movieImageURL + movie.movieImg" alt="" round width="150px" height="200px">
          <div align="center">{{movie.movieName}}</div>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
  import axios from 'axios';
  import MyTitle from '@/components/common/MyTitle.vue';


  export default {
    components: {
      MyTitle
    },
    //这里写页面的JS代码

    //组件使用的数据
    data() {
      return {
        movieList: null,
        movieImageURL: this.$store.state.movieImageURL, //图片地址
      }
    },

    //事件处理方法
    methods: {


      //跳转到电影详情页
      toDetail(movieId) {
        this.$router.push({
          path: '/MovieDetail',
          query: {
            movieId: movieId
          }
        })
      },
    },

    mounted() {
      this.movieList = this.$route.query.movieList
      console.log(this.movieList)
    }
  }
</script>

<style>
</style>
