<template>
  <div id="odc">

    <div id="odc-top">
      <!--      插槽-->
      <van-cell :title="cinemaName" is-link @click="toCinema()"/>
    </div>
    <div id="odc-center">
        <div class="odc-text text-1">{{filmName}}</div>
        <div class="odc-text text-2">{{dateInfo}}&nbsp;{{language}}</div>
        <div class="odc-text">{{hallName}}&nbsp;{{seatInfo}}</div>
    </div>
    <div id="odc-bottom">
      <div v-if="orderStatus == '0'">
        <van-button type="primary" block color="orange" @click="toPay(order)">去付款</van-button>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "OrderDetail",
    props: {
      // filmName: String,
      cinemaName: String,
      hallName: String,
      filmName: String,
      dateInfo: String,
      language: String,
      seatInfo: String,
      order: Object,

      orderStatus: String

    },
    methods: {
      toCinema() {
      //  电影院名称和cinemaId
        this.$toast("去影院");
      //   this.$router.push()
      },

      toPay(order) {
        // console.log(order)
        let arr=JSON.stringify(order)
        this.$router.push({path: "/pay?obj="+encodeURIComponent(arr)})
      }
    }
  }
</script>

<style scoped>
  * {
    font-size: 15px;
  }

  #odc {
    margin-left: 5%;
    padding-top: 2%;
    width: 90%;
    border: 1px solid black;
    padding-left: 8px;
    padding-bottom: 4%;
    background-color: white;
  }


  #odc-top {
    height: 20%;
    position: relative;
    border-bottom: 1px lightblue solid;
  }


  #odc-center {
    clear: right;
    padding-bottom: 2px;
    padding-top: 6px;
  }

  .odc-text {

    /*border: 1px solid black;*/
    padding: 4px;
  }

  .t-left, .t-right {
    display: inline-block;
  }

  .text-1{
    font-weight: bold;
  }
  .text-2 {
    color: red;
  }

  #odc-bottom{
  }
</style>