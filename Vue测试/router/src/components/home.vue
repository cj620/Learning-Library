<template>
  <div>
    <h3>homepage</h3>
  <router-link to="/home/news" tag="button">新闻</router-link>
  <router-link to="/home/message" tag="button">信息</router-link>
  <router-view></router-view>
  </div>
</template>

<script>
export default {
name:'home',
created(){
  console.log("+++++++");
  
}
}
</script>

<style>

</style>