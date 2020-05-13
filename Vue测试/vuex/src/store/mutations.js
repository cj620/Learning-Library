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
  }
}