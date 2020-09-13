<template>
  <div id="container">

    <van-nav-bar id="p-top"
                 left-arrow
                 @click-left="onClickLeft"
                 placeholder="true"
                 fixed="true">
      <template #right>
      </template>
    </van-nav-bar>

    <PayCard :language="order.language" :movieName="order.movieName"
             :piaoAmount="order.piaoAmount" :totalPrice="order.totalPrice"
             :dateInfo="order.dateInfo" :seat-info="order.seatInfo"
             :hall-name="order.hallName" :cinema-name="order.cinemaName"
             :movieImg="movieImageUrl+order.movieImg">
    </PayCard>
    <van-goods-action>
      <div style="width: 40%; text-align: left; color: red;
      font-weight: bold; font-size: 22px"><span style="font-size: 15px">{{'￥'}}</span>{{order.totalPrice}}
      </div>
      <van-goods-action-button
          type="warning"
          text="确认支付"
          :class="pay-style"
          @click="payAmount(order.orderNo)"
      />
    </van-goods-action>
  </div>
</template>

<script>

  import PayCard from "@/components/content/PayCard";
  import {payOrder} from "@/network/order";

  export default {
    name: "pay",
    components: {PayCard},
    data() {
      return {
        order: null,
        movieImageUrl: this.$store.state.movieImageUrl,
      }
    },

    methods: {
      onClickLeft() {
        this.$router.push('/order')
      },
      onClickIcon() {
        this.$toast('点击图标');
      },
      payAmount(orderNo) {
        this.$dialog.confirm({
          title: '确认付款',
        }).then(() => {
          // on confirm
          this.$router.push({
            path: '/payDetail',
            query: {totalPrice: this.order.totalPrice, orderNo: this.order.orderNo}
          })


          // payOrder(orderNo).then(
          //   res => {
          //     console.log(res);
          //     this.$toast(res.message);
          //     console.log("===========" + res.message);
          //     this.$router.push("/order");
          //   }
          // )
        }).catch(() => {
          // on cancel
        });
      },
    },

    mounted() {
      //接受该订单vo
      // console.log("this.$route.params.order");
      // console.log(this.$route.params.order);
      // this.order = this.$route.params;
      let list = decodeURIComponent(this.$route.query.obj);
      // console.log(JSON.parse(list));
      this.order = JSON.parse(list);
      console.log(this.order);
    }

  }
</script>

<style scoped>

  #container {
    background-color: cadetblue;
  }

  #p-top {
    background-color: cadetblue;
  }

  .pay-style {

  }
</style>