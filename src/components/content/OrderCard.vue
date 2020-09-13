<template>
  <div id="oc">
    <div id="order-top" @click="toOrderDetail(order)">
      <div id="t-left">
        <van-icon name="tv-o" size="20" color="red"/>
        <!--        <img src="" alt="ico">-->
        <div class="d-filmName"><b>{{filmName}}</b></div>
      </div>
      <div id="t-right">
        <div class="d-filmName">
          <slot name="s-one"></slot>
        </div>
      </div>
    </div>
    <div id="order-center" @click="toOrderDetail(order)">
      <div id="c-left"><img :src="imageUrl" alt="" width="60px" ></div>
      <div id="c-right">
        <div class="rt-line">
          <span>影院:</span>
          <span>&nbsp;{{cinemaName}}</span>
        </div>
        <div class="rt-line">
          <span>场次:</span>
          <span>&nbsp;{{startShowTime}}</span>
        </div>
        <div class="rt-line">
          <span>数量:</span>
          <span>&nbsp;{{amount}}</span>
        </div>
        <div class="rt-line">
          <span>总价:</span>
          <span>&nbsp;{{totalPrice}}</span>
        </div>
      </div>
    </div>
    <div id="order-bottom">
      <slot name="s-two"></slot>&nbsp;
      <slot name="s-three"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "OrderCard",
    props:{
      timeRemaining: String,
      filmName: String,
      imageUrl: String,
      cinemaName:String,
      startShowTime: String,
      amount:String,
      totalPrice: String,
      order: Object

    },
    methods: {
      toOrderDetail(order){
        // console.log(order)
        let arr=JSON.stringify(order)
        this.$router.push({path: "/orderDetail?obj="+encodeURIComponent(arr)})
      }
    }
  }
</script>

<style scoped>
  * {
    font-size: 12px;
    color: black;
  }

  .d-filmName{
    display: inline-block;
    vertical-align: middle;
    height: 20px;
    margin-bottom: 6px;

  }

  #oc {
    border: 1px black solid;
    border-radius: 10px;
    padding-left: 3px;
    margin: auto;
    margin-bottom: 5px;
    background-color: white;
  }
  #oc, #order-top, #order-center, #order-bottom {
    margin-left: 3%;
    width: 94%;
  }

  #order-top {
    margin-top: 4px;
    height: 30px;
    border-bottom: 1px black solid;
  }

  #order-center {
    margin-bottom: 2px;
    padding: 5px;
  }

  #order-bottom {
    text-align: right;
    padding-bottom: 5px;
  }

  #t-left {
    float: left;
    margin-left: 3px;
    display: inline-block;
    /*width: 100px;*/
  }

  #t-right {
    float: right;
    display: inline-block;
    text-align: right;
    padding-left: 60px;
    vertical-align: middle;

  }
  #c-left {
    width: 24%;
    display: inline-block;
  }

  #c-right {
    display: inline-block;
    width: 72%;
  }

  .rt-line{
    padding: 5px;
  }

  .btn {
    background-color: white;
    display: inline-block;
    height: 24px;
    width: 60px;
    border: 1px black solid;
    border-radius: 10px;
  }

</style>