<template>
  <div id="app">
    <router-link to="/home">home</router-link>
    <router-link to="/profile">profile</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>
