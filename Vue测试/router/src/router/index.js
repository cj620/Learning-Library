import Vue from 'vue'                              
import VueRouter from 'vue-router'
import home from '../components/home'
import profile from '../components/profile'

Vue.use(VueRouter)   //把路由挂载到vue对象里

const routes = [
  {
    path:'/home',
    component: home
  },
  { 
    path:'/profile',
    component: profile
  }
]

const router = new VueRouter({
  routes
})


export default router   //导出封装了路由映射的路由对象