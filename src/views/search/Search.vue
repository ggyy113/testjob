<template>
  <div id="search">

    <!-- 分割线 -->
    <van-divider>可以搜索你想看的电影哦</van-divider>
    <!-- 搜索电影名模糊查询 -->
    <van-search v-model="name" placeholder="请输入搜索关键词" @search="search(name)"/>
    <!-- 电影类型查询电影 -->

    <van-tabs v-model="active" @click="findTypeList">

      <van-tab title="全部电影" name="0">
        <van-grid :column-num="3">
          <van-grid-item v-for="(movie, index) in AllList" :key="index">
            <div align="center" @click="toDetail(movie.movieId)">
              <img :src="movieImageURL + movie.movieImg" alt="" round width="50px" height="70px">
              <div align="center">{{movie.movieName}}</div>
            </div>
          </van-grid-item>
        </van-grid>
      </van-tab>

      <van-tab title="爱情" name="1">
        <!-- 宫格 -->
        <van-grid :column-num="3">
          <van-grid-item v-for="(movie, index) in movieNameList" :key="index">
            <div align="center" @click="toDetail(movie.movieId)">
              <img :src="movieImageURL + movie.movieImg" alt="" round width="50px" height="70px">
              <div align="center">{{movie.movieName}}</div>
            </div>
          </van-grid-item>
        </van-grid>

      </van-tab>

      <van-tab title="动作" name="2">
        <!-- 宫格	-->
        <!-- <div v-for="(mv,index) in movieNameList" :key="index">
          er{{mv.movieId}}
        </div> -->
        <van-grid :column-num="3">
          <van-grid-item v-for="(movie, index) in movieNameList" :key="index">
            <div align="center" @click="toDetail(movie.movieId)">
              <img :src="movieImageURL + movie.movieImg" alt="" round width="50px" height="70px">
              <div align="center">{{movie.movieName}}</div>
            </div>
          </van-grid-item>
        </van-grid>
      </van-tab>

      <van-tab title="灾难" name="3">
        <!-- 宫格 -->
        <van-grid :column-num="3">
          <van-grid-item v-for="(movie, index) in movieNameList" :key="index">
            <div align="center" @click="toDetail(movie.movieId)">
              <img :src="movieImageURL + movie.movieImg" alt="" round width="50px" height="70px">
              <div align="center">{{movie.movieName}}</div>
            </div>
          </van-grid-item>
        </van-grid>
      </van-tab>


      <van-tab title="战争" name="4">
        <!-- 宫格 -->
        <van-grid :column-num="3">
          <van-grid-item v-for="(movie, index) in movieNameList" :key="index">
            <div align="center" @click="toDetail(movie.movieId)">
              <img :src="movieImageURL + movie.movieImg" alt="" round width="50px" height="70px">
              <div align="center">{{movie.movieName}}</div>
            </div>
          </van-grid-item>
        </van-grid>
      </van-tab>

      <van-tab title="犯罪" name="5">
        <!-- 宫格 -->
        <van-grid :column-num="3">
          <van-grid-item v-for="(movie, index) in movieNameList" :key="index">
            <div align="center" @click="toDetail(movie.movieId)">
              <img :src="movieImageURL + movie.movieImg" alt="" round width="50px" height="70px">
              <div align="center">{{movie.movieName}}</div>
            </div>
          </van-grid-item>
        </van-grid>
      </van-tab>

      <van-tab title="动画" name="6">
        <!-- 宫格 -->
        <van-grid :column-num="3">
          <van-grid-item v-for="(movie, index) in movieNameList" :key="index">
            <div align="center" @click="toDetail(movie.movieId)">
              <img :src="movieImageURL + movie.movieImg" alt="" round width="50px" height="70px">
              <div align="center">{{movie.movieName}}</div>
            </div>
          </van-grid-item>
        </van-grid>
      </van-tab>

      <van-tab title="剧情" name="7">
        <!-- 宫格 -->
        <van-grid :column-num="3">
          <van-grid-item v-for="(movie, index) in movieNameList" :key="index">
            <div align="center" @click="toDetail(movie.movieId)">

              <img :src="movieImageURL + movie.movieImg" alt="" round width="50px" height="70px">
              <div align="center">{{movie.movieName}}</div>
            </div>
          </van-grid-item>
        </van-grid>
      </van-tab>
    </van-tabs>


    <van-divider>猜您喜欢</van-divider>
    <div align="center" @click="toDetail(movie.movieId)"></div>

    <!-- 宫格 猜你喜欢 -->
    <van-grid :column-num="3">
      <van-grid-item v-for="(movie, index) in movieRecommendList" :key="index">
        <div align="center" @click="toDetail(movie.movieId)">
          <img :src="movieImageURL + movie.movieImg" alt="" round width="50px" height="70px">
          <div align="center">{{movie.movieName}}</div>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "Search",

    data() {
      return {
        active: 0,
        movieName: '', //搜索电影名的关键字
        movieRecommendList: {}, //推荐关键字
        movieImageURL: this.$store.state.movieImageURL, //图片地址
        movieList: null, //模糊查询关键字
        AllList: {}, //所有电影关键字
        movieNameList: {}, //各个类型关键字
        movieId: '',

      }
    },

    //事件处理方法
    methods: {
      search(name) {
        //发送axios请求---进行电影名模糊查询
        const params = {
          params: {
            movieName: this.name,
          }
        }
        axios.get("/api/movie/name", params).then(
          res => {
            console.log(res.data.data)
            if (res.data.status == 1) {
              this.movieList = res.data.data.movieList;
              this.$router.push({
                path: '/SearchDetaile',
                query: {
                  movieList: this.movieList
                }
              })
            } else {
              this.$toast(res.data.message);
            }
          }
        )
      },

      //跳转到电影详情页
      toDetail(movieId) {
        this.$router.push({
          path: '/MovieDetail',
          query: {
            movieId: movieId
          }
        })
      },

      findTypeList() {
        const params = {
          params: {
            typeId: this.active,
          }
        }

        axios.get('/api/movie/movieNameList', params).then(
          res => {
            console.log(res.data.data.movieNameList)
            this.movieNameList = {}
            this.movieNameList = res.data.data.movieNameList
          }
        ).catch(
          res => {
            console.log("请求失败")
          }
        )

      }

    },
    mounted() {
      //发送axios请求---获取推荐列表
      axios.get("/api/movie/recommendList").then(
        res => {
          console.log(res.data.data)
          if (res.data.status == 1) {
            this.movieRecommendList = res.data.data.movieRecommendList;
          } else {
            this.$toast(res.data.message);
          }
        }
      )

      //发送axios请求---获取所有电影
      axios.get("/api/movie/allList").then(
        res => {
          console.log(res.data.data)
          if (res.data.status == 1) {
            this.AllList = res.data.data.AllList;
          } else {
            this.$toast(res.data.message);
          }
        }
      )

    }
  }
</script>

<style scoped>

</style>