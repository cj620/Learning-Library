<template>
  <div>
    <h3>userpage</h3>
    <div>
      {{usercontent}}
      {{$route.params}}
    </div>
  </div>
</template>

<script>
export default {      //动态路由的工作流程：点击router-link,跳转to的地址，to的地址动态的拿到组件里的数据拼接成一个
                     //完成的地址，然后进入路由中配到到相应的组件，再渲染组件。
                     //在这个组件中，可以调用$route，获取路由的信息，完成信息的传递
  name:'user',
  computed:{
    usercontent(){
      return this.$route.params.userid      //$route表示当前路由
    }                                       //而$router代表的就是整个vue-router对象
  },
  created(){
    console.log("created");
    
  }
}
</script>

<style>

</style>