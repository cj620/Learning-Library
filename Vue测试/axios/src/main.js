import Vue from 'vue'
import App from './App.vue'
// import axios from 'axios'
import {request}from '../src/network/request'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

// //设置全局默认值，抽离重复的代码 
// axios.defaults.baseURL='http://152.136.185.210:8000'
// axios.defaults.timeout = 5000          //设置请求超时的时间
// // axios.defaults.header.post['Content-Type']='application/x-www-form-uriencoded'  //设置响应头
// axios({
//   url:'/api/n3/home/data',
//   params:{           //get对应params  ，post对应data
//     type:'pop',
//     page:1
//   }
// }).then(res =>{console.log(res);
// })
request({
  url:'/api/n3/home/data',
  params:{           
        type:'pop',
        page:1
      }
}).then(res =>{console.log(res);
})
