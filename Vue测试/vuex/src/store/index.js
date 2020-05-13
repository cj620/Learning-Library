import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{                                //变量存储  
    number:0,
    word:'hehe'
  },
  mutations:{                      //方法
    increment(state){             //对state的操作，最好放在mutations里面，以便于用devtools进行监听，解决不必要的麻烦
      state.number++
    }
  },
  actions:{},
  getters:{                      //vuex中的计算属性  里面的方法第一个参数是state，第二参数默认是getters
    foo1(state){
      return state.word+'xixi'
    },
    foo2(state,getters){           //如果计算属性还要用到其他的计算属性，则可以把getters当作参数 在内部使用
      return getters.foo1+'gaga'
    }
  },                  

})
export default store