<template>
  <div id="comment">
    <!-- 导航栏-->
    <div>
      <van-nav-bar
          title="电影名字" left-text="返回" right-text="发布" left-arrow
          @click-left="toSearch" @click-right="sendComment"
      />
    </div>
    <!-- 输入评论区域 -->
    <div>
      <van-field name="rate" label="评分">
        <template #input>
          <van-rate v-model="value"/>
        </template>
      </van-field>
      <van-cell-group>
        <van-field
            v-model="message" rows="2" autosize label="评论"
            type="textarea" placeholder="请输入评论（最多输入80字）" show-word-limit/>
      </van-cell-group>

    </div>
  </div>
</template>

<script>
  import {Toast} from 'vant';
  import axios from 'axios';
  export default {
    name: "comment",

    data() {
      return {
        //星星默认颗数
        value: 3,
        maxlength: 0,
        message: '',
        movieId: 0,
        orderNo: String
      };
    },

    methods: {
      toSearch() {
        this.$router.push("/search");
      },
      sendComment() {
        Toast.success('发布成功');
        const params = new URLSearchParams();
        params.append('movieId', this.movieId);
        params.append('content', this.message);
        params.append('score', this.value);
        params.append('orderNo', this.orderNo);


        axios.post('/api/comment/addComment',params).then(

          res => {
            if (res.data.data.status == 1) {
              this.$toast("评论成功");
            }
          }
        )
      },

    },

    mounted() {
      // alert(this.$route.query.movieId);
      // alert(this.$route.query.orderNo);
      this.movieId = this.$route.query.movieId;
      this.orderNo = this.$route.query.orderNo;
    }
  }
</script>

<style scoped>
</style>