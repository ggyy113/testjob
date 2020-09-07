import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {navshow:true}
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search/Search'),
    meta: {navshow:true}
  },
  {
    path: '/cinema',
    name: 'Cinema',
    component: () => import('@/views/cinema/Cinema'),
    meta: {navshow:true}
  },
  {
    path: '/center',
    name: 'Center',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/center/Center'),
    meta: {navshow:true}

  },
  {
    path: '/order',
    name: 'Order',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/order/Order'),
    meta: {navshow:false}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
