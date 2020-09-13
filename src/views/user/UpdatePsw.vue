<template>
  <div class="container">
    <my-title color="red" title="修改密码"/>
    <van-field
        v-model="value1"
        name="oldPsw"
        placeholder="请输入旧密码" type="password"
    />
    <van-field
        v-model="value2"
        name="newPsw"
        placeholder="请输入新密码" type="password"
    />
    <van-field
        v-model="value3"
        name="newPsw2"
        placeholder="再次确认新密码" type="password"
    />
    <div style="margin: 36px;">
      <van-button round block type="info" @click="updatePsw">
        修改
      </van-button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import MyTitle from '@/components/common/MyTitle.vue'    //步骤1---引入组件
  export default{

    components:{    //步骤2---注册组件
      MyTitle
    },

    //组件使用的数据
    data(){
      return{
        value1:"",
        value2:"",
        value3:""
      }
    },

    //导入updateUserInfo()方法
    inject: ['updateUserInfo'],

    methods:{
      updatePsw(){
        if(null == this.value1 || this.value1.length == 0){
          this.$toast("请输入旧密码");
          return;
        }
        if(null == this.value2 || this.value2.length == 0){
          this.$toast("请输入新密码");
          return;
        }
        if(null == this.value3 || this.value3.length == 0){
          this.$toast("请再次输入新密码");
          return;
        }
        // 新密码两次需要一致
        if(this.value2 != this.value3){
          this.$toast("两次密码必须一致");
          return;
        }
        // 旧密码和新密码不能一致
        if(this.value1 == this.value2){
          this.$toast("旧密码和新密码不能一致");
          return;
        }
        // 判断旧密码是否正确
        // 拿到当前前端登录的用户
        if(this.$store.state.user.password != this.value1){
          this.$toast("旧密码不正确");
          return;
        }

        // 执行修改密码的操作
        /* const params = new URLSearchParams();
        params.append("newPsw",this.value2); */
        /* const params = {
           params: {
                 value2: this.value2,
           }
        } */
        //构造post请求的参数
        const params = new URLSearchParams();
        params.append('newPsw', this.value2);

        alert(this.value2);
        axios.post("/api/user/updatePsw",params).then(

          res=>{
            console.log(res);
            if(res.data.status == 1){
              this.$toast(res.data.message);


              //发送axios请求---注销处理
              axios.get("/api/user/logout").then(

                res => {

                  console.log(res.data.data)

                  if(res.data.status==1){

                    //在state中清除当前用户对象
                    this.$store.state.user = ''

                    //在state中清除用户购物车中的商品种类数
                    this.$store.state.cartQuantity = 0


                    //跳转到主页
                    this.$router.push("/")

                    //更新主页中的用户信息
                    this.updateUserInfo()

                  }else{
                    this.$toast(res.data.message);
                  }

                }
              )

            }
          })
      }
    },
    mounted(){

    }
  }
</script>

<style>
  .container{
    margin-bottom: 50px;
  }
</style>