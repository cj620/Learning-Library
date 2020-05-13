<template>
  <div id="app">
    hh
  <vue1/>
  <vue2/>
  <div>{{$store.state.number}}</div>
  <div>{{$store.state.word}}</div>
  <div>{{$store.getters.foo1}}</div>
  <div>{{$store.getters.foo2}}</div>
  </div>
</template>

<script>
import vue1 from './components/1'
import vue2 from './components/2'

export default {
  name: 'App',
  components: {
    vue1,
    vue2
  },
}
</script>

<style>
</style>
