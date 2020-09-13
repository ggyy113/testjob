<template>
  <div class="container">
    <my-title color="blue" title="用户注册"/>
    <van-field v-model="username" required label="用户名" placeholder="请输入用户名"/>
    <van-field v-model="phone" required label="手机号" type="digit" placeholder="请输入常用手机号"/>
    <van-field v-model="email" required label="邮箱" placeholder="请输入常用邮箱"/>
    <van-field v-model="password" required label="密码" placeholder="请输入密码"/>
    <van-field v-model="password2" label="确认密码" placeholder="请再次输入密码"/>
    <van-field v-model="valCode" label="验证码" placeholder="请输入验证码"/>

    <div align="center">
      <table>
        <tr>
          <td>
            <img id="imageValCode" src="/api/valCode" width="80" height="25" onclick="this.src = this.src + '?'"/>
          </td>
          <td>
            <van-button type="danger" round class="sbtn"
                        onclick="document.getElementById('imageValCode').src = document.getElementById('imageValCode').src + '?'">
              看不清，换一张
            </van-button>
          </td>
        </tr>
      </table>
    </div>
    <van-button type="primary" round class="btn" @click="reg">注册</van-button>

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
        username: '',
        phone: '',
        email: '',
        password: '',
        //photo: '',
        valCode: '',
        password2: ''
      }
    },

    methods: {

      reg() {

        //构造post请求的参数
        const params = new URLSearchParams();
        params.append('username', this.username);
        params.append('password', this.password);
        params.append('phone', this.phone);
        params.append('email', this.email);
        params.append('valCode', this.valCode);

        //发送axios请求---注册处理
        axios.post("/api/user/reg", params).then(
          //axios.post("http://localhost:8888/movie/user/reg", params).then(
          res => {
            console.log(res.data.data)
            if (res.data.status == 1) {
              //跳转到登录页面
              this.$router.push({path: "/login", query: {username: this.username}})
            } else {
              this.$toast(res.data.message);
            }
          }
        )
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