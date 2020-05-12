<template>
  <div>
    <h3>profile</h3>
    <news/>
    <div slot="news">hahahah</div>
  </div>
</template>

<script>
const news =() =>import('./news')
export default {
name:'profile',
components:{
  news
}
}
</script>

<style>

</style>