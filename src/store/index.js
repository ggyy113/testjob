import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    orderList: [],
    //后台电影图片
    movieImageUrl: 'http://localhost:8888/image/movieImg/',
    movieImageURL: 'http://localhost:8888/image/movieImg/',
    //用户头像
    photoImageURL: 'http://localhost:8888/image/photoImg/',
    payImageUrl: 'http://localhost:8888/image/',
    user:'',		//当前登录用户对象
    cartQuantity: 0,		//当前用户购物车中商品种类数


  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
