import Vue from 'vue'                              
import VueRouter from 'vue-router'
import home from '../components/home'
import profile from '../components/profile'
// import user from '../components/user'

const user = ()=>import('../components/user')   //路由的懒加载 在需要组件的时候再进行加载  
                                                //在打包的时候，就会形成独立的js模块，防止主业务的js文件过大

const News = () =>import('../components/news')
const  Message = () =>import('../components/message')
const Query = ()=>import('../components/query')


Vue.use(VueRouter)   //使用use，VueRouter会执行它的install方法

const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component: home,
    meta:{title:'home'},
    // beforeEnter:(to,from,next) =>{                  路由独享的守卫  当然还有组件守卫
    //   console.log(to,from)
    //   next()
    // },
    children:[{
      path:'news',
      component:News
    },
  {
    path:'message',
    component:Message
  }]
  },
  { 
    path:'/profile',
    component: profile,
    meta:{title:'profile'}
  },
  {
    path:'/user/:userid',
    component:user,
    meta:{title:'home'}
  },
  {
    path:'/query',
    component:Query,
    meta:{title:'query'}
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})

//前置钩子（hook）守卫（guard）
router.beforeEach((to,from,next) =>{        //导航守卫   监听路由跳转 执行这个回调函数   to是被跳转页，from是跳转页，next是一个函数，一定要调用，才能进行下一步
  // console.log(to);
  // console.log(from);
  // console.log(next);
                                          // meta是元数据，由于路由的嵌套，所以去catched中拿meta
  document.title = to.meta.title

  next()
})

//后置钩子
// router.afterEach((to,from) =>{
//   console.log(to);
//   console.log(from);
  
  
  
// })


     //导出封装了路由映射的路由对象