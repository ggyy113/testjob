<template>
  <div id="oc">
    <div id="order-top">
      <div id="t-left">
        <van-icon name="tv-o" size="20" color="red"/>
<!--        <img src="" alt="ico">-->
        <div id="d-filmName"><b>{{filmName}}</b></div>
      </div>
      <div id="t-right">
        <slot name="s-one"></slot>
      </div>
    </div>
    <div id="order-center">
      <div id="c-left"><img :src="imageUrl" alt="" width="60px" height="60px"></div>
      <div id="c-right">
        <div class="rt-line">
          <span>影院:</span>
          <span>&nbsp{{cinemaName}}</span>
        </div>
        <div class="rt-line">
          <span>场次:</span>
          <span>&nbsp{{startShowTime}}</span>
        </div>
        <div class="rt-line">
          <span>数量:</span>
          <span>&nbsp{{amount}}</span>
        </div>
        <div class="rt-line">
          <span>总价:</span>
          <span>&nbsp{{totalPrice}}</span>
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
      totalPrice: String

    }
  }
</script>

<style scoped>
  * {
    font-size: 10px;
    color: black;
  }

  #d-filmName{
    display: inline-block;
    text-align: center;
    height: 20px;
    /*padding-bottom: 5px;*/
  }
  #oc {
    height: 150px;
    width: 300px;
    border: 1px black solid;
    margin-left: 10px;
    border-radius: 10px;
    padding: 5px;
    margin-bottom: 5px;
  }

  #order-top {
    border-bottom: 1px solid;
    width: 280px;
    height: 30px;
  }

  #order-center {
    padding: 5px;
    width: 280px;
  }

  #t-left {
    display: inline-block;
    width: 100px;
  }

  #t-right {
    display: inline-block;
    text-align: right;
    padding-left: 60px;
    child-align: right;
  }

  #c-left {
    width: 60px;
    display: inline-block;
  }
  #c-right {
    display: inline-block;
    width: 200px;
  }

  .rt-line{
    padding: 5px;
    height: 15px;
  }

  #order-bottom {
    /*height: 50px;*/
    /*background-color: green;*/
    text-align: right;
    padding: 5px;
  }

  .btn {
    background-color: white;
    height: 24px;
    width: 60px;
    border: 1px solid;
    border-radius: 10px;
  }

</style>