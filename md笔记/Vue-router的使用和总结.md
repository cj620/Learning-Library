# Vue-router的使用和总结

## 1.初始化

> 在src下新建一个router文件夹，并在这个文件下建立一个index.js的入口文件。
>
> 在这个入口文件引入Vue、Vue-router必须要的模块
>
> 再使用Vue.use()将Vue-router挂载到Vue上去

```js
import Vue from 'vue'                              
import VueRouter from 'vue-router'
Vue.use(VueRouter)   //使用use()会默认调用Vue-router的install方法
```

> 创建路由实例以及导出

```js
const router = new VueRouter({
	...
})
export default router
```

> 这样一个路由就创建出来了

## 2.路由懒加载

> 要设置路由信息，需要对组件进行引入。

+ 普通的引入方式  

会将所有的组件加载进来，并且对项目打包的时候，会被打包进入同一个js文件中。会导致项目整体的加载速度变慢

```js
import home from '../components/home'
import profile from '../components/profile'
```

+ 懒加载

按照需求加载组件，组件在需要使用的时候对其进行加载，在打包的时候，会生成相应的js文件。

```js
const News = () =>import('../components/news')
const  Message = () =>import('../components/message')
const Query = ()=>import('../components/query')
```

## 3.导入路由信息

> 为了保持路由实例的简洁，在外面创建好映射关系，再导入到路由实例当中。

保存映射关系的对象

```js
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
```

> 导入到路由实例中

改变路由的模式，默认为#(hash哈希模式)，但是不够美观，再路由实例中改变模式为history模式，Url地址就会和正常的地址一样。

```js
const router = new VueRouter({
  routes,
  mode:'history'    
})
```

## 3.路由的使用

### 1.router-link和router-view

> router-link	使vue-router的一个内置组件。他有几个常用的属性to、tag、replace
>
> to： 为要跳转的位置 最终解析成一个a标签
>
> tag：设置组件的类型 比如参数为button，则这恶鬼组件会变成按钮的样式
>
> repalce：设置不能返回

```html
 <router-link to="/home" tag="button" replace>home</router-link>
```

> **router-view**同为vue-router的内置组件
>
> 它相当于一个占位符，用来显示路由跳转的内容

### 2.keep-alive

> vue-router的内置组件，属性有exclude和include
>
> 功能：对被包含再这个组件内的router-view进行缓存，当用户切换到另一个地址然后再切换回来的时候，这个组件还是保存原始状态。
>
> 测试发现，包裹再这个组件里面的时候，组件不会执行它的Destroy钩子函数，也就是说不会被销毁和重建。

### 3.路由的跳转

1. 通过router-link的to属性跳转

```html
<router-link to="/profile" replace>profile</router-link>
```

2. 代码跳转

再标签上绑定事件，通过this.$router.push('/profile')

```js
btnClick(){
        this.$router.push('/profile') //$router是‘vue-router所有组件’都有的一个属性
    }
```

3.