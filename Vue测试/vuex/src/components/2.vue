<template>
  <div>
    <h3>page2</h3>
    <button @click="increment">组件2</button>
  </div>
  
</template>

<script>
export default {
methods:{
  increment(){
    this.$store.state.number --
  }
}
}
</script>

<style>

</style>