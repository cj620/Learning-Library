import Axios from "axios";

export function request(config){          //对请求进行封装
  const instance = Axios.create({         //创建axios实例，并在内部设置默认值
    baseURL:'http://152.136.185.210:8000', //create方法返回的是一个promise对象
    timeout:5000
  })
  // console.log(instance(config) );   //create方法在检测到请求参数的时候，就会返回promise对象
  
  return instance(config)                 //将这个promise对象返回 
}