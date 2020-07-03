<template>
  <div id="app">
    <h1>这里是APP</h1>
    <!-- to：链接 tag：标签  replace：不能返回  -->
    <router-link to="/home" tag="button" replace>home</router-link>  
    <router-link to="/profile" replace>profile</router-link>
    <button @click="btnClick">代码跳转</button>
    <router-link :to="'/user/'+userid"> 动态路由嵌套</router-link>
    <router-link :to="{path:'/query',query:{userid,age:18,name:'hehe'}}" tag="button">query跳转</router-link>
    <button @click="userClick">btn跳转</button>
    <button @click="queryClick">btn的query跳转</button>
    <hr/>
     <!-- keep-alive的属性 ： exclude：组件的name（排除这个组件的keep功能）   include相反-->
    <keep-alive exclude="user"><router-view></router-view></keep-alive>

  </div>
</template>

<script>
import {Button} from '../node_modules/cj-620/index'
export default {
  name: 'App',
  components:{
    'c-button':Button
  },
  data(){
    return{
      userid:'cj'
    }
  },
  methods:{
    btnClick(){
        this.$router.push('/home') //$router是‘vue-router所有组件’都有的一个属性
    },
    userClick(){
      this.$router.push('/user/'+this.userid)
    },
    queryClick(){
      this.$router.push({path:'/user',query:{age:18,name:'hehe'}})
    }
  }
}
</script>

<style>

</style>
