import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//模块
const modulesA ={
  state:{name:'这是模块A里的name'},
  mutations:{},
  getters:{
    // foo7(state,getters,rootState){  //子module想要获取store中的state可以传入rootstate作为参数来代表
    //   return 
    // }
  },
  actions:{}
}

const store = new Vuex.Store({
  state:{                                //变量存储  状态的修改一定要通过mutations
    number:0,
    word:'hehe',
    info:{}
  },
  mutations:{                      //方法（同步）（异步操作不能被devtools监控）
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
    }
  },
  actions:{                             //action内部为异步方法，
    updataInfo(context,payload){        //第一个参数context（这里的contex可以看作store对象）是必须的，第二个参数是组件调用dispatch传入的第二个参数，
      return new Promise((resolve) =>{  
        setTimeout(() => {
          context.commit('foo4')        //约定要操作state，必须使用mutations中的方法，所以这里还是哟啊调用commit
          console.log(payload);
          resolve('111111')
        }, 1000);
      })
    }
  },
  getters:{                      //vuex中的计算属性  里面的方法第一个参数是state，第二参数默认是getters
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
  },  
  modules:{   //模块化 ，每个模块又相当于是一个新的store
    a:modulesA   //这个a相当于被放进来state中，调用的时候就不用.modules拿到a
  }                //另一个方面，a中的方法函数也不用区分在不在modules中，组件中调用commit时，会现在mutations中store中找，然后再去modules中的模块中找

})
export default store