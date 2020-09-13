<template>
  <div class="container">

    <van-nav-bar title="欢迎选座" left-arrow @click-left="onClickLeft"/>

    <div></div>
    <!--    {{showMessage}}-->
    <!--    {{seatMap}}-->

    <!--    <div id="seat-map" class="" v-for="(row,indexI) in seatMap" :key="indexI" v-model="seatMap">-->
    <!--&lt;!&ndash;      div&ndash;&gt;-->
    <!--      <span v-for="(col,indexJ) in row" :key="indexJ" v-model="seatMap" class="item">-->
    <!--&lt;!&ndash;        <img src="" alt="" width="10px" height="1opx" :class="{'red': col==1}">&ndash;&gt;-->
    <!--        <van-icon v-if="col==0" name="location-o"/>-->
    <!--        <van-icon v-if="col == 1" name="location-o" class="red"/>-->
    <!--      </span>-->
    <!--    </div>-->

    <van-field v-model="rowText" label="座位的行"/>

    <van-field v-model="colText" label="座位的列"/>
    <!-- 允许输入正整数，调起纯数字键盘 -->
    <van-field v-model="showMessage" label="场次Id"/>
    <!-- 允许输入数字，调起带符号的纯数字键盘 -->


    <br>
    <br>
    <br>
    <br>
    <br>
    <van-button round="" type="primary" size="large" @click="toAddOrder()">下订单</van-button>

  </div>


</template>

<script>

  import {getSeatByShowMessage} from '@/network/Seat';
  import axios from 'axios';

  export default {
    name: "SeatMap",

    data() {
      return {
        rowText: 0,
        colText: 0,
        showMessage: 0,
        selectedSeatList: [],
        seatMap: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],

      }
    },

    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },

      toAddOrder() {
        var data = JSON.stringify([{"showMessage": this.showMessage, "seatRow": this.rowText, "seatCol": this.colText},
        ]);

        var config = {
          method: 'post',
          url: '/api/order/addOrder',
          headers: {
            'Content-Type': 'application/json',
          },
          data : data
        };

        axios(config)
          .then(function (response) {
            // alert("dwa");
            this.$toast("选座成功");
            this.$router.push('/center');
            // console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            this.$toast("此座备选");
            // this.$router.push('/');
            console.log(error);
          });
      },
    },
    mounted() {
      this.showMessage = this.$route.query.showMessage;
      console.log(this.showMessage);
      getSeatByShowMessage(this.showMessage).then(res => {
        let seatDetail = res.data.seatDetail;
        console.log(res.data.seatDetail);
        for (let seat of seatDetail) {
          Vue.$set(seat.row - 1, seat.col - 1, 1);
          // this.seatMap[seat.row - 1][seat.col - 1] = 1;
        }
        console.log(this.seatMap);
      }).catch(

      )

    }
  }
</script>

<style>

  #seat-map {

  }

  .item {
    height: 10px;
    width: 10px;
    margin: 5px;
  }

  .red {
    color: #FF0000;
  }

</style>
