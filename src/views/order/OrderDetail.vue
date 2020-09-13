<template>
  <div id="od">
    <van-nav-bar class="box box-active"
                 title="电影票详情"
                 left-arrow
                 @click-left="onClickLeft"
                 placeholder="true"
                 fixed="true"
    />
    <div id="center">
      <OrderDetailCard :filmName="order.movieName" :dateInfo="order.dateInfo"
                       :language="order.language" :hallName="order.hallName"
                       :seatInfo="order.seatInfo" :cinemaName="order.cinemaName"
                       :orderStatus="order.orderStatus" :order="order">
      </OrderDetailCard>
    </div>



  </div>
</template>

<script>
  import OrderDetailCard from "@/components/content/OrderDetailCard";

  export default {
    name: "OrderDetail",
    components: {
      OrderDetailCard
    },
    data() {
      return {
        movieImageUrl: '',
        order: null
      }
    },
    methods: {
      onClickLeft() {
        this.$router.push('/order')
      }
    },
    mounted() {
      let list = decodeURIComponent(this.$route.query.obj);
      // console.log(JSON.parse(list));
      this.order = JSON.parse(list);

    }
  }
</script>

<style scoped>

  #center {
    width: 100%;
    background-color: darkgrey;
    /*height: 500px;*/
    padding-top: 5%;
    padding-bottom: 5%;
  }
</style>