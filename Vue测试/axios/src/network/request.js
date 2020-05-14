import Axios from "axios";

export function request(config){          //对请求进行封装
  const instance = Axios.create({         //创建axios实例，并在内部设置默认值
    baseURL:'http://152.136.185.210:8000', //create方法返回的是一个promise对象
    timeout:5000
  })
  // console.log(instance(config) );   //create方法在检测到请求参数的时候，就会返回promise对象
  
//  拦截器    可以拦截住请求  然后可以对拦截的东西进行操作   拦截发出去的请求  拦截服务器响应的结果
//请求拦截
instance.interceptors.request.use(config =>{
  console.log(config);
  //1. 比如config中的一些信息，不符合服务器的要求，对config进行动态修改 ，如请求头，请求体之类的
  //2.比如每次发送请求时，在界面上显示loading图标，然后再响应拦截中清除
  //某些网络请求（比如登入的token），必须携带一些特殊信息
  return config                      //请求成功一定要将请求返回出去，因为请求被拦截了
},
err =>{
  console.log(err);
})

//响应拦截  
instance.interceptors.response.use(res =>{     //响应拦截对服务器的数据进行处理， 可以去除一些结果不需要的数据
  return res.data                              //这里只取响应数据的data结果
},err =>{
  console.log(err);
  
})





  return instance(config)                 //将这个promise对象返回 
}