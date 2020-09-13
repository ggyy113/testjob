<template>
  <div class="cart">
    <van-sticky>
      <van-nav-bar
          :right-text="rightText"
          right-arrow
          @click-right="right"
      >
        <template #left>
          <van-row gutter="20">
            <van-col span="50"><h2><b>购物车</b></h2></van-col>
          </van-row>
        </template>
      </van-nav-bar>
    </van-sticky>
    <!-- 广告通知栏 -->
    <van-notice-bar color="#ff0000" background="#ffffff" mode="closeable"
                    left-icon="volume-o"
                    scrollable text="欢迎来到嫦娥影院进行购票">
    </van-notice-bar>

    <!-- 购物车信息 -->
    <div v-for="(cartVO,index) in cartVOList"
         :key="index">
      <van-cell-group>
        <van-swipe-cell>
          <van-cell
              :border="false"
          >
            <template #icon>
              <van-checkbox v-model="1==cartVO.isChecked" label-disabled @click="isChecked(cartVO.cartId)"/>
            </template>
            <template #title>
              <van-card
                  :num=cartVO.quantity

                  :thumb="movieImageUrl+cartVO.movieImg"
                  @click-thumb="toMovie(cartVO.movieId)"
              >
                <template #price>

                  <span class="span"><b>￥{{cartVO.moviePrice}}</b></span><br/>

                </template>
                <template #title>

                  <span><b>{{cartVO.movieName}}</b></span><br/>

                </template>
                <template #desc>
                  <van-tag mark type="warning">{{cartVO.hallName}}</van-tag>
                  <br />
                  <van-tag mark type="warning">当天第{{cartVO.timId}}场</van-tag>
                  <br />

                </template>
                <template #tags>

                  <van-tag plain type="success">放映时间：{{cartVO.startTime}}</van-tag>

                </template>
                <template #footer>

                  <van-button round plain type="primary" @click="select(cartVO.showMessage)" size="mini">前去选座</van-button>
                </template>
              </van-card>
            </template>
          </van-cell>
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" @click="delCart(cartVO.cartId)" />
          </template>
        </van-swipe-cell>

      </van-cell-group>
    </div>


    <br />
    <br />
    <br />
    <br />


    <van-cell  class="cell"   >
      <template #icon>
        <van-checkbox v-model="checked"  @click="checkAll">全选</van-checkbox>
      </template>
      <template #title>

      </template>
      <template #default>
        <div v-if="manageChange">
          <span class="allPrice-text"><b>合计:</b></span><span class="allPrice">￥{{totalPrice}}</span>
        </div>
        <div v-else>
          <van-button round plain type="danger" @click="clear()" size="mini">清空购物车</van-button>
          &nbsp;&nbsp;&nbsp;
          <van-button round type="danger" size="mini" @click="deleteCheckCart()">删 除</van-button>
        </div>
      </template>
    </van-cell>


  </div>


</template>

<script>

  import axios from 'axios'

  export default{

    data(){
      return{

        rightText: '管理',
        cartVOList: [],
        startDesc: '放映厅:',
        totalPrice: 0,
        checked: false,
        manageChange: true,
        movieImageUrl: this.$store.state.movieImageUrl

      }
    },
    //导入updateUserInfo()方法
    inject: ['updateUserInfo'],

    methods:{
      deleteCheckCart(){
        axios.get("/api/cart/deleteCheckCart").then(
          res=>{
            if(res.data.status==1){
              this.$toast(res.data.message);
              this.getCart()
              this.$store.state.cartQuantity = res.data.data.cartQuantity
              this.updateUserInfo()
            }else{
              this.$toast(res.data.message);
            }
          }
        )
      },
      clear(){
        axios.get("/api/cart/clear").then(
          res=>{
            if(res.data.status==1){
              this.$toast(res.data.message);
              this.getCart()
              this.$store.state.cartQuantity = res.data.data.cartQuantity
              this.updateUserInfo()
            }else{
              this.$toast(res.data.message);
            }
          }
        )
      },
      right(){
        this.manageChange = !this.manageChange
        if(this.manageChange){
          this.rightText='管理'

        }else{
          this.rightText='完成'
        }
        this.getCart()
      },
      checkAll(){
        const params = {
          params: {
            checkAllFlag : this.checked
          }
        }
        axios.get("/api/cart/checkAll",params).then(
          res=>{
            if(res.data.status==1){
              this.getCart()

              this.$store.state.cartQuantity = res.data.data.cartQuantity

              this.updateUserInfo()
            }else{
              this.$toast(res.data.message);
            }
          }
        )
      },

      toMovie(movieId){
        this.$router.push({
          path: '/MovieDetail',
          query: {
            movieId: movieId
          }
        })
      },
      select(showMessage){
        // alert("showMessage="+showMessage);
        this.$router.push({path: '/seatMap', query: {showMessage:showMessage}});
      },
      delCart(id){
        this.$dialog.confirm({
          title: '移除电影',
          message: '你是否确定将该电影移除购物车？',
        })
          .then(() => {
            // on confirm
            axios.get("/api/cart/delete/"+id).then(
              res=>{
                if(res.data.status==1){
                  this.$toast(res.data.message);
                  this.getCart()

                  this.$store.state.cartQuantity = res.data.data.cartQuantity

                  this.updateUserInfo()
                }else{
                  this.$toast(res.data.message);
                }
              }
            )
          })
          .catch(() => {
            // on cancel
            this.updateUserInfo()
          });
      },
      isChecked(cartId){
        const params = {
          params: {
            cartId: cartId,
            operationType: 3
          }
        }
        axios.get("/api/cart/update",params).then(
          res=>{
            if(res.data.status==1){

              this.getCart()
            }else{
              this.$toast(res.data.message);
            }
          }
        )
      },
      getCart(){
        axios.get("/api/cart/list").then(
          res => {
            this.cartVOList=[]
            if(res.data.status==1){
              this.cartVOList = res.data.data.cartVOList
              this.totalPrice=res.data.data.totalPrice

            }else{
              this.$toast(res.data.message)
            }
          })
      }

    },
    mounted(){
      if(this.$store.state.user==''){
        this.$toast("您未登陆请先去主页登陆");
        this.$router.push("/");

      }else{
        this.getCart()
      }


    }
  }
</script>

<style>
  .container{
    margin-bottom: 50px
  }
  .ads{
    color: red;
  }
  .delBtn{
    border-color: #FF0000;

  }
  .cell{
    position: fixed;
    bottom:3.125rem;
  }
  .delete-button {
    height: 100%;
  }
  .span{
    color:#FF0000;
  }
  .allPrice-text{
    color: black;
  }
  .allPrice{
    color:#FF0000;
  }

</style>
