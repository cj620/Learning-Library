# 封装axios请求

## 1.为什么需要封装？

> 1.在项目中，如果对请三方的请求框架过于依赖，后期对项目的维护就会变得非常困难。
>
> 2.第三方的框架可靠性问题，假如某个框架停止维护，但是项目的请求又高度的依赖这个框架，就会导致项目出现大量的额问题无法解决。
>
> 3.避免对某些请求信息进行重复书写，比如某个项目的BaseUrl。可以简化请求体。
>
> 4.可以及时更换请求框架，可以直接在自己封装的框架中进行修改，不需要改动项目的代码。

## 2.对axios框架进行封装

> 单独建立一个js文件，导出封装好的方法

```js
import Axios from "axios"
export function request(config){}   
```

> 创建axios实例，并在实例内部设置默认值。

Axios的create方法如果有传参时，返回的时一个promise对象

```js
const instance = Axios.create({         //创建axios实例，并在内部设置默认值
    baseURL:'http://152.136.185.210:8000', //create方法返回的是一个promise对象
    timeout:5000						//设置超时时间
  })
    ...
return instance(config) 
```

> 请求拦截，对请求或者请求结果进行一定的处理

```js
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
```

> 这样一个简单的请求就已经封装完成了

## 3.完成封装

> 完整代码

```js
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
```

## 4.使用

> 1.先引入请求方法

```js
import {request}from '../src/network/request'
```

> 2.使用

+ 因为在请求实例中以及设置了默认的BaseUrl，所以这里设置url的时候，只需要进行拼接就可以了
+ 另外请求的方法默认是get，它时通过params进行传参的，而post是使用query
+ 由于axios的底层是用promise实现的，所以它返回的结果是一个promise对象。使用then方法拿到请求的结果。

```js
request({
  url:'/api/n3/home/data',
  params:{           
        type:'pop',
        page:1
      }
}).then(res =>{console.log(res);
})
```

