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