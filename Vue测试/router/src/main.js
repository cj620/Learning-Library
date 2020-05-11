import Vue from 'vue'      
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({                   //在main中创建一个vue对象 在vue内部对app在内存中进行渲染 最后通过$mount将app挂载到页面上去
  render: h => h(App), 
  router,
}).$mount('#app')
