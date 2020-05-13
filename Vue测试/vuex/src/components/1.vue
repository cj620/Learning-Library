<template>
  <div>
    <h3>firstpage</h3>
    <button @click="increment">组件1</button>

  </div>
</template>

<script>
export default {
methods:{
  increment(){
    this.$store.commit('increment')     //在组件中要修改state数据，可以用commit传入方法字符串，去执行mutations的方法
  }
}
}
</script>

<style>

</style>