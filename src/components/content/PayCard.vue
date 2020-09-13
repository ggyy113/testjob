<template>
  <div id="pc">
    <div id="pc-left">
      <img :src="movieImg" alt="" width="65px" height="90px">
    </div>
    <div id="pc-right">
      <div id="r-1">
        <span id="pc-r-top-l" class="filmName">{{movieName}}</span>
        <span id="pc-r-top-r">{{piaoAmount+'张'}}&nbsp;&nbsp;{{'原价'+totalPrice}}</span>
      </div>
      <div class="pc-text" id="r-2">{{dateInfo}}&nbsp;{{language}}</div>
      <div class="pc-text">{{cinemaName}}</div>
      <div class="pc-text">{{hallName}}&nbsp;{{seatInfo}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PayCard",
    props: {
      movieImg: String,
      movieName: String,
      piaoAmount: String,
      totalPrice: String,
      dateInfo: String,
      cinemaName: String,
      hallName: String,
      seatInfo: String,
      language: String
    }
  }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
    font-size: 10px;
    /*color: black;*/
    color: white;
    /*background-color: cadetblue;*/
  }
  #pc {
    /*border: 1px black solid;*/
    margin: auto;
    width: 90%;
    /*background-color: cadetblue;*/
    padding-top: 3%;
    padding-bottom: 3%;

  }

  #pc-left {
    display: inline-block;
    vertical-align: middle;
  }

  #pc-right {
    display: inline-block;
    width: 75%;
    padding-left: 2%;
    vertical-align: middle;

  }


  #pc-r-top-r {
    float: right;

  }

  #pc-right > .pc-text {
    height: 25%;
    padding: 1%;
  }

  .filmName {
    font-weight: bold;
    font-size: 15px;
  }

  #r-2 {
    clear: left;
  }
  #r-1 {
    height: 25%;
    clear: left;
    /*border: 1px black solid;*/
  }
</style>