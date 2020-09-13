<template>
  <div id="order">
    <van-nav-bar title="我的订单" left-text="返回"
                 left-arrow @click-left="toCenter"
                 placeholder="true"
                 fixed="true" @click-right="">
      <template #right>
        <van-icon name="search" size="18"/>
      </template>
    </van-nav-bar>
    <van-tabs v-model="active"  sticky="true" offset-top="46px">
      <van-tab title="全部" background="grey" color="#666666">
        <div v-if="allOrder.length == 0">
          <van-empty description="暂无订单"/>
        </div>
        <div v-else>
          <div v-for="order in o0.orderStatus0">
            <OrderCard :filmName="order.movieName" :imageUrl="movieImageUrl+order.movieImg"
                       :cinemaName="order.cinemaName" :startShowTime="order.startTime"
                       :amount="order.piaoAmount == null? '':order.piaoAmount"
                       :order="order" :totalPrice="order.totalPrice">
              <template v-slot:s-one>
                <van-count-down :time="order.timeRemaining" format="待付款,剩余mm分ss秒"
                                @finish="autoCancelOrder(order.orderNo)"/>
              </template>
              <template v-slot:s-two>
                <button class="btn"  @click="cancelCurrentOrder(order.orderNo)">取消订单</button>
              </template>
              <template v-slot:s-three>
                <button class="btn" @click="toPay(order)">付款</button>
              </template>
            </OrderCard>
          </div>
          <div v-for="order in o1.orderStatus1">
            <OrderCard :filmName="order.movieName" :imageUrl="movieImageUrl+order.movieImg"
                       :cinemaName="order.cinemaName" :startShowTime="order.startTime"
                       :amount="order.piaoAmount"
                       :order="order" :totalPrice="order.totalPrice">
              <template v-slot:s-three v-if="isDisabled(order.endTime)">
                <button class="btn">已失效</button>
              </template>
              <template v-slot:s-three v-else-if="order.orderStatus == 1">
                <button class="btn" @click="toUse">使用</button>
              </template>
            </OrderCard>
          </div>
          <div v-for="order in o2.orderStatus2">
            <OrderCard :filmName="order.movieName" :imageUrl="movieImageUrl+order.movieImg"
                       :cinemaName="order.cinemaName" :startShowTime="order.startTime"
                       :amount="order.piaoAmount"
                       :order="order" :totalPrice="order.totalPrice">
              <template v-slot:s-three>
                <button class="btn" @click="toComment(order.orderNo,order.movieId)">去评价</button>
              </template>
            </OrderCard>
          </div>
          <div v-for="order in o10.orderStatus10">
            <OrderCard :filmName="order.movieName" :imageUrl="movieImageUrl+order.movieImg"
                       :cinemaName="order.cinemaName" :startShowTime="order.startTime"
                       :amount="order.piaoAmount"
                       :order="order" :totalPrice="order.totalPrice">
              <template v-slot:s-one>
                <div align="right">已评价</div>
              </template>
            </OrderCard>
          </div>
        </div>
      </van-tab>
      <van-tab title="待付款" :badge="o0.count == 0? false:o0.count">
        <div v-if="o0.count == 0">
          <van-empty description="暂无订单"/>
        </div>
        <div v-else>
          <!--          //封装组件,遍历o0.orderStatus0，-->
          <div v-for="order in o0.orderStatus0">
            <OrderCard :filmName="order.movieName" :imageUrl="movieImageUrl+order.movieImg"
                       :cinemaName="order.cinemaName" :startShowTime="order.startTime"
                       :amount="order.piaoAmount"
                       :order="order" :totalPrice="order.totalPrice">
              <template v-slot:s-one>
                <van-count-down :time="order.timeRemaining" format="待付款,剩余mm分ss秒"
                                @finish="autoCancelOrder(order.orderNo)"/>
              </template>
              <template v-slot:s-two>
                <button class="btn"  @click="cancelCurrentOrder(order.orderNo)">取消订单</button>
              </template>
              <template v-slot:s-three>
                <button class="btn" @click="toPay(order)">付款</button>
              </template>
            </OrderCard>
          </div>
        </div>
      </van-tab>
      <van-tab title="待使用" :badge="o1.count == 0? false:o1.count">
        <div v-if="o1.count == 0">
          <van-empty description="暂无订单"/>
        </div>
        <div v-else>
          <div v-for="order in o1.orderStatus1">
            <OrderCard :filmName="order.movieName" :imageUrl="movieImageUrl+order.movieImg"
                       :cinemaName="order.cinemaName" :startShowTime="order.startTime"
                       :amount="order.piaoAmount"
                       :order="order" :totalPrice="order.totalPrice">
<!--              判断时间是否超出电影结束时间-->
              <template v-slot:s-three>
                <button class="btn" @click="toUse">使用</button>
              </template>
            </OrderCard>
          </div>
        </div>
      </van-tab>
      <van-tab title="待评价" :badge="o2.count == 0? false:o2.count">
        <div v-if="o2.count == 0">
          <van-empty description="暂无订单"/>
        </div>
        <div v-else>
          <div v-for="order in o2.orderStatus2">
            <OrderCard :filmName="order.movieName" :imageUrl="movieImageUrl+order.movieImg"
                       :cinemaName="order.cinemaName" :startShowTime="order.startTime"
                       :amount="order.piaoAmount"
                       :order="order" :totalPrice="order.totalPrice">
              <template v-slot:s-three>
                <button class="btn" @click="toComment(order.orderNo,order.movieId)">写影评</button>
              </template>
            </OrderCard>
          </div>
        </div>
      </van-tab>
      <van-tab title="退款售后">
        <van-empty description="您还没有退款订单"/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import OrderCard from "@/components/content/OrderCard";
  import {cancelOrder} from "@/network/order";
  import {getOrderInfo} from "@/network/order";
  import axios from 'axios';

  export default {
    name: "Order",
    components: {
      OrderCard
    },
    data() {
      return {
        movieImageUrl: '',
        active: 1,
        //全部订单
        allOrder: [],
        o0: {
          count: 0,
          //未付款订单
          orderStatus0: [],
        },

        o1: {
          count: 0,
          //已付款未使用订单
          orderStatus1: []
        },

        o2: {
          count: 0,
          //已使用的订单
          orderStatus2: []
        },
        o10: {
          orderStatus10: []
        }
      }
    },

    methods: {
      isDisabled(endTime) {
        // console.log(endTime);
        return new Date().getTime() -new Date(endTime).getTime()>0;
      },

      toCenter() {
        this.$router.push("/center");
      },

      toComment(orderNo, movieId) {
        // alert("去评价");
        console.log(order);
        this.$router.push({path:'/comment',query: {movieId: movieId, orderNo: orderNo}});
      },
      toUse(){
        // alert("使用");
        axios.get('/api/order')
      },
      toPay(order) {
        console.log(order)
        // this.$router.push({path: '/pay',params: { order:order}})
        let arr=JSON.stringify(order)
        this.$router.push({path: "/pay?obj="+encodeURIComponent(arr)})
      },

      autoCancelOrder(orderNo) {
        cancelOrder(orderNo).then(res => {
          console.log(res.data)
          this.$store.state.orderList = res.data.orderVos;
          this.setOrderInfo();
        }).catch(res => {
        });
      },
      cancelCurrentOrder(orderNo) {
        //拿到订单号
        //发送请求
        this.$dialog.confirm({
          title: '您是否要取消订单',
        }).then(() => {
          // on confirm
          cancelOrder(orderNo).then(res => {
            console.log(res.data)
            this.$store.state.orderList = res.data.orderVos;
            this.setOrderInfo();
          }).catch(res => {
          });
        }).catch(() => {
          // on cancel
        });

      },
      // 遍历订单添加数据
      setOrderInfo() {
        this.o0.orderStatus0 = [];
        this.o1.orderStatus1 = [];
        this.o2.orderStatus2 = [];
        this.o10.orderStatus10 = [];
        this.allOrder = [];
        this.o0.count = 0;
        this.o1.count = 0;
        this.o2.count = 0;
        this.allOrder = this.$store.state.orderList;
        console.log("=====allOrder.length====="+this.allOrder.length);
        // console.log(this.allOrder)
        var j;
        for (j = 0; j < this.allOrder.length; j++) {
          // console.log(this.allOrder[j]);
          if (this.allOrder[j].orderStatus === 0) {
            this.o0.count += 1;
            this.o0.orderStatus0.push(this.allOrder[j]);
            this.o0.timeRemaining = this.allOrder[j].timeRemaining;
          } else if (this.allOrder[j].orderStatus === 1) {
            this.o1.count++;
            this.o1.orderStatus1.push(this.allOrder[j]);
          } else if (this.allOrder[j].orderStatus === 2) {
            this.o2.count++;
            this.o2.orderStatus2.push(this.allOrder[j]);
          } else if (this.allOrder[j].orderStatus === 10){
            this.o10.orderStatus10.push(this.allOrder[j]);
          }else {

          }
        }
      }
    },

    mounted() {
      this.movieImageUrl = this.$store.state.movieImageURL;
      console.log(this.movieImageUrl);
      if (this.$store.state.user == '') {
        console.log("用户未登录");
        this.$router.push('/login');
      }else {
        getOrderInfo().then(res => {
          // console.log(res);
          this.$store.state.orderList = res.data.orderVos;
          this.setOrderInfo();
        }).catch(res => {
        })
      }
    }
  }
</script>

<style scoped>
  *{
    /*background-color: ;*/
  }
</style>