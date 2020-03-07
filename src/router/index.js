import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    meta:{
      title:"Index"
    },
    component: () => import('@/pages/index'),
  },
  {
    path: '/province',
    meta:{
      title:"province"
    },
    component: () => import('@/pages/province'),
  },
  {
    path: '/world',
    meta:{
      title:"world"
    },
    component: () => import('@/pages/world'),
  },
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
