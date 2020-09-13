import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {tabbar:true, navbar:true}
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search/Search'),
    meta: {tabbar:true, navbar: true}
  },
  // {
  //   path: '/cinema',
  //   name: 'Cinema',
  //   component: () => import('@/views/cinema/Cinema'),
  //   meta: {tabbar:true}
  // },
  {
    path: '/MovieDetail',
    name:  'MovieDetail',
    // component: Detail
    component: () => import('../views/movie/MovieDetail.vue')
  },
  {
    path: '/Tim',
    name:  'Tim',
    // component: Detail
    component: () => import('../views/movie/Tim.vue')
  },
  {
    path: '/seatMap',
    name:  'SeatMap',
    // component: Detail
    component: () => import('../views/cart/SeatMap.vue')
  },
  {
    path: '/SearchDetaile',
    name:  'SearchDetaile',
    // component: Detail
    component: () => import('@/views/search/SearchDetaile.vue')
  },


  {
    path: '/comment',
    name:  'Comment',
    // component: Detail
    component: () => import('@/views/comment/Comment.vue')
  },


  {
    path: '/center',
    name: 'Center',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/center/Center'),
    meta: {tabbar:true}

  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/user/Login.vue')
  },
  {
    path: '/reg',
    name: 'Reg',
    component: () => import('@/views/user/Reg.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/cart/Cart'),
    meta: {tabbar:true}

  },











  {
    path: '/order',
    name: 'Order',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/order/Order'),
    meta: {tabbar:false},
  },
  {
    path: '/orderDetail',
    name: 'OrderDetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/order/OrderDetail'),
    meta: {tabbar:false}
  },
  {
    path: '/pay',
    name: 'Pay',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/order/Pay'),
    meta: {tabbar:false}
  },

  {
    path: '/payDetail',
    name: 'PayDetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/order/PayAmount'),
    meta: {tabbar:false}
  },
  {
    path: '/updatePsw',
    name: 'UpdatePsw',
    component: () => import('@/views/user/UpdatePsw.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
