import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import moduleA from './modules/moduleA'
Vue.use(Vuex)
const state ={  //变量存储  状态的修改一定要通过mutations
  number:0,
    word:'hehe',
    info:{}
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