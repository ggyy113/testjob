<template>
  <div id="mc">
    <div id="mc-top">
      <div></div>
    </div>
    <div id="mc-center">
      <div id="mc-c-left">
        <van-image width="100" height="100" :src="userIcon" round width="100%" height="100%"/>
      </div>
      <div id="mc-c-right">
        <div>{{username}}</div>
        <div>Lv1会员</div>
      </div>
    </div>
    <div id="mc-bottom"></div>
  </div>
</template>

<script>
  export default {
    name: "UserCard",
    props: {
      userIcon: String,
      username: String,

    }
  }
</script>

<style scoped>

  *{
    background-color: red;
    color: white;
    font-size: 10px;
  }

  #mc-c-left{

  }

  #mc-c-right{

  }

</style>