# Vuex

## 概念

Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。可以理解为一个保存公共变量和方法的对象。他有五个属性：State、Getter、Mutations、Action、Modules。

![vuex](https://vuex.vuejs.org/vuex.png)

> 由图，要改变state内的状态值，最好经过mutations。因为mutations的对数据的操作，会被`Devtools`监控，这样能避免许多不必要的麻烦。

## 初始化

1. 先使用安装Vuex的npm包，在src文件下创建一个store的文件夹，再在store文件夹下创建index.js作为入口文件。
2. 在入口文件中，对vuex进行挂载。

```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
```



3. 创建Vuex的实例对象，并导出

```js
const store = new Vue.Store({
    ...
})
export default store
```

## 目录结构

> 为了降低代码的耦合，在store文件夹下创建以下js文件。将State、Getter、Mutations、Action、Modules分割为不同的js模块，方便管理

```bash
── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```

> 再在入口文件中进行引入,这样入口文件就整理好了

```js
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import moduleA from './modules/moduleA'
Vue.use(Vuex)
const state ={  //变量存储  状态的修改一定要通过mutations
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,  
  modules:{   //模块化 ，每个模块又相当于是一个新的store
    a:moduleA   //这个a相当于被放进来state中，调用的时候就不用.modules拿到a
  }                //另一个方面，a中的方法函数也不用区分在不在modules中，组件中调用commit时，会现在mutations中store中找，然后再去modules中的模块中找
})
export default store
```

## State

> 存储公共的状态值，可以理解为全局的变量。
>
> 因为store被挂载在Vue对象上，所有的组件都可以对其进行操作，可以使用$store.state来获取state内部的变量。
>
> 约定要改变state中的值，必须通过mutations中的同步方法，可以使用Devtools进行监控

```html
<div>{$store.state.number}}</div>  //在组件内，获取state中的number值
```

## Mutations

> 改变state中数据的唯一途径
>
> 内部为同步函数

```js
//mutations.js

import Vue from 'vue'
export default {                      //方法（同步）（异步操作不能被devtools监控）
  increment(state){             //对state的操作，最好放在mutations里面，以便于用devtools进行监听，解决不必要的麻烦
    state.number++
  },
  // increment5(state,count){    //接受参数，在commit后携带的参数
  //   state.number+=count
  // }
  increment5(state,payload){   //特殊的提交风格，第二个参数变成一个对象
    state.number+=payload.count
  },
  foo4(state){
    Vue.set(state.info,'adress','beijin')    //使用set方法，这样添加的数据就可以有数据响应能力（能在界面上及时显示） 
    // Vue.delete(state.info,'adress')       //响应式的删除某个数据
  },
  foo5(state){
    Vue.delete(state.info,'adress')
  }
}
```

> 组件中调用mutations

```js
this.$store.commit('foo4',payload)  //可以携带相应的参数
```

## Getters

> 相当于Vue中的计算属性
>
> 一般标签中的属性需要经过发杂的计算或判断才能得到具体的值，则可以使用计算属性
>
> 使用返回函数的方式，可以实现计算属性进行传参

```js
export default{                      //vuex中的计算属性  里面的方法第一个参数是state，第二参数默认是getters
  foo1(state){
    return state.word+'xixi'
  },
  foo2(state,getters){           //如果计算属性还要用到其他的计算属性，则可以把getters当作参数 在内部使用
    return getters.foo1+'gaga'
  },
  foo3(state){                   //如果想让计算属性可以传参数的话，可以返回一个可以携带参数func
    return function(word){
      return state.word+word
    }
  },
}
```

> 在组件中使用Getters

```html
  <div>{{$store.getters.foo1}}</div>
  <div>{{$store.getters.foo2}}</div>
  <div>{{$store.getters.foo3('ooooo')}}</div>
```

## Actions

> Actions内部为异步方法
>
> 组件想要调用actions，要使用dispatch方法
>
> actions修改state中值时，需要调用commit方法，来执行mutations中的方法

```js
//action.js
export default {                             //action内部为异步方法，
  updataInfo(context,payload){        //第一个参数context（这里的contex可以看作store对象）是必须的，第二个参数是组件调用dispatch传入的第二个参数，
    return new Promise((resolve) =>{  
      setTimeout(() => {
        context.commit('foo4')        //约定要操作state，必须使用mutations中的方法，所以这里还是哟啊调用commit
        resolve(payload)
      }, 1000);
    })
  },
  deleInfo(context,payload){
    return new Promise((resolve) =>{
     setTimeout(()=>{
      context.commit('foo5')
      resolve(payload)
     },1000)
    })
  }
}
```

> 在组件中使用,调用actions中的异步方法去执行mutations中的方法，间接的修改状态值

```js
this.$store.dispatch('deleInfo','删除成功').then(res =>{console.log(res);
```

## modules

> 这是一个模块属性，内部是其他的模块
>
> 每个模块相当于新的store 拥有State、Getter、Mutations、Action这些属性。
>
> 需要在src文件夹下新建一个modules文件夹，这个文件放置它的所有模块的js文件
>
> 组件在使用模块中的属性时，先会在store属性查找，再在模块中查找

```js
//modulesA.js
export default {
  state:{name:'这是模块A里的name'},
  mutations:{},
  getters:{
    // foo7(state,getters,rootState){  //子module想要获取store中的state可以传入rootstate作为参数来代表
    //   return 
    // }
  },
  actions:{}
}
```

> 获取modulesA中的name属性
>
> 可以忽略modules属性直接使用

```html
 <div>{{$store.state.a.name}}</div>
```

