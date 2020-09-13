<template>
  <div class="container">
    <van-nav-bar
        left-arrow
        @click-left="onClickLeft">
      <template #title>
        <h3>我的订单</h3>
      </template>
    </van-nav-bar>

    <div align="center" class="order">
      <h1>￥{{this.price}}.00</h1>
      <span>嫦娥影院-订单编号:{{this.orderNo}}</span>
    </div>



    <div class="image"  >
      <van-image v-if="showFlag" :src="payImageUrl+url" />
    </div>
    <van-button class="queryStatus" v-if="showFlag" round="" type="primary" @click="queryStatus">支付完成请点击</van-button>

    <van-button class="pay" v-if="!showFlag" round type="primary" size="large" @click="isPay">确认支付</van-button>
    <van-button class="pay" disabled="" v-if="showFlag" round type="primary" size="large" @click="isPay">确认支付</van-button>

  </div>
</template>

<script>

  import axios from 'axios'

  export default{

    data(){
      return{
        price: 0,
        orderNo:'',
        showFlag: false,
        url: '',
        payImageUrl: this.$store.state.payImageUrl,

      }
    },

    methods:{
      queryStatus(){
        axios.get('/api/pay/queryStatus', {params: {orderNo: this.orderNo}}).then(
          res => {
            if (res.data.status == 1) {

              this.$toast("支付成功");
              this.$router.push('/')
            } else {
              this.$toast(res.data.message);
            }

          }
        )
      },
      onClickLeft() {
        this.$router.go(-1)
      },
      isPay(){
        this.$dialog.confirm({
          title: '确认支付',
          message: '你是否要立即使用支付宝付款',
        })
          .then(() => {
            const params = {
              params: {
                orderNo : this.orderNo,
                totalPrice: this.price,
              }
            }
            axios.get("/api/pay/addPay/",params).then(
              res=>{
                if(res.data.status==1){
                  this.url=res.data.data.url
                  this.showFlag=true
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
      }

    },
    mounted() {
      this.price = this.$route.query.totalPrice;
      this.orderNo = this.$route.query.orderNo;
    }
  }
</script>

<style>
  .container{
    margin-bottom: 50px
  }
  .order{
    position: absolute;
    top: 15%;
    left: 10%;
  }
  .pay{
    position: absolute;
    bottom: 60px;
  }
  .image{
    position: absolute;
    bottom: 250px;
    left: 15%;
  }.queryStatus{
     position: absolute;
     bottom: 25%;
     left: 32%;

   }

</style>

