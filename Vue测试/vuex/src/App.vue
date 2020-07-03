<template>
  <div id="app">
    hh
  <vue1/>
  <vue2/>
  <div>{{$store.state.number}}</div>
  <div>{{$store.state.word}}</div>
  <div>{{$store.getters.foo1}}</div>
  <div>{{$store.getters.foo2}}</div>
  <div>{{$store.getters.foo3('ooooo')}}</div>
  <button @click="add5(5)">+5</button>
  <div>{{$store.state.info}}</div>
  <button @click="infoClick">infoClick</button>
  <button @click="updataInfo">异步添加</button>
  <button @click="deleInfo">异步删除</button>
  <div>{{$store.state.a.name}}</div>
  <c-button icon="loading">1213213</c-button>
  <Button>jjj</Button>
  </div>
</template>

<script>
import vue1 from './components/1'
import vue2 from './components/2'
import{Button}from 'cj-620/index'

export default {
  name: 'App',
  components: {
    vue1,
    vue2,
    "c-button":Button
  },
  methods:{
    add5(count){
      //普通的提交风格
      // this.$store.commit('increment5',count) //如果方法携带参数，则在commit的第二个参数位置传递过去
      //特殊的提交封装
      this.$store.commit({   //以这个风格传递，increment5的第二个参数变成了一个对象
        type:'increment5',
        count
      })
    },
    infoClick(){
      this.$store.commit('foo4')
    },
    updataInfo(){       //使用action的异步函数时， 要使用dispatch来调用 
      this.$store.dispatch('updataInfo','添加响应数据').then(res =>{console.log(res);
      })
    },
    deleInfo(){
     this.$store.dispatch('deleInfo','删除成功').then(res =>{console.log(res);
     })
    }
  }
}
</script>

<style>
</style>
