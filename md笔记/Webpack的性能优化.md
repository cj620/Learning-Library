# Webpack的性能优化

> 开发环境性能优化：
>
> - 优化打包构建的速度
> - 优化代码调试

> 生产环境性能优化：
>
> - 优化打包构建的速度
> - 优化代码运行的性能

## 1.开发环境性能优化

### 1. HMR热模块替换

> hot module replacement
>
> 作用：
>
> 一个模块发生变化，只会重新打包这个模块，（而不是打包所有模块），极大的提升构建速度

```js
devServer:{
   hot:true    //开启HMR功能 当修改了webpack配置，必须重新启动webpack才会生效
}
```

> 样式文件：可以使用HMR功能，因为style-loader内部实现了（开发环境最好使用style-loader）
>
> js文件：默认不能使用HMR功能
>
> html文件：默认不能使用HMR功能，同时会导致问题，html文件不能热更新了

#### html解决方案

修改entry入口，将html文件引入(因为只有一个HTML文件，所以不需要HMR)

```js
entry:['./src/index.js','./src/index.html']
```

#### js文件解决方案

需要修改js代码，添加支持HMR功能的代码

注意：HMR功能对js的处理，只能处理非 入口js文件的其他文件

```js
import print from './print'
//一旦module.hot为true，说明开启了HMR功能-----》让HMR功能代码生效
if(module.hot){
  module.hot.accept('./print.js',function(){
 //方法会监听print.js文件的变化，就会重新打包print.js
 //会执行后面的回调函数
    print()
  })
}
```

### 2.source-map

> 一种提供源代码到构建后代码映射技术，如果构建后代码出错了，通过映射可以追踪源代码错误的地方

> 配置权衡
>
> 开发环境：速度快，调试更加友好
>
> ​       速度快（eval>inline>cheap>...）
>
> ​          eval-cheap-source-map
>
> ​          eval-source-map
>
> ​        调试更加友好
>
> ​           source-map
>
> ​		  cheap-module-source-map
>
> ​		  cheap-source-map
>
> 综上：速度快、调试更友好为------>eval-source-map / eval-cheap-module-source-map

> 生产环境：源代码隐藏，调试友好，代码体积
>
> 内联会使代码体积变大，故排除
>
> 综上：-----> source-map / cheap-module-source-map(快一点)

> **由上可得**
>
> 开发环境：eval-source-map
>
> 生产环境：source-map 

添加devtool属性

```js
devtool:'source-map'
```

devtool有以下设置

> 外部和内联的区别：
>
> 1.外部生成了文件，内联没有 
>
> 2.内联构建速度更快

- source-map(外部)

可以反馈错误代码准确信息，和源代码的错误位置

- inline-source-map（内联）

可以反馈错误代码准确信息，和源代码的错误位置

- hidden-source-map（外部）

反馈错误代码的错误原因，但是没有错误原因

不能追踪源代码的错误，只能提示到构建后代码的错误位置

- eval-source-map（内联）

每一个文件都生成了对应的source-map，都在eval

可以反馈错误代码准确信息，和源代码的错误位置，对js文件进行了hash化

- nosource-source-map

可以反馈错误代码准确信息，隐藏任何源代码信息

- cheap-source-map

可以反馈错误代码准确信息，和源代码的错误位置

只能精确到行

- cheap-module-source-map

可以反馈错误代码准确信息，和源代码的错误位置

module会将loader的source-map加进来

### 3.oneOf优化

> 一个数组,oneOf数组里的loader只会匹配一个
>
> 所以oneOf里面，不能存在处理同一文件的loader
>
> 这样一个文件的处理不需要一直匹配

```js
module:{
  rules:[
     test:/\.js$/,enforce:'pre',...},  //让它优先执行
     {
      oneOf:[
       {test:/\.js$/,...},
       {test:/\.css$/,...}
      ]
     }
    ]
  }
```

### 4.缓存

#### 1.babel缓存

在babel-loader中新增属性

可以让第二次打包构建速度更快

```js
{
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader',
        options:{
         //开启babel缓存，会读取之前的缓存
         cacheDirectory:true   
        }
}
```

#### 2.文件资源缓存

> hash:  每次webpack构建时会生成一个唯一的hash值
>
> **缺点**：因为js和css同时使用一个hash值，如果重新打包会导致所有缓存失效（可我却只改动一个文件）

> chunkhash:根据chunk生成的hash值，如果打包来源于同一个chunk，那么hash值就一样
>
> **缺点**：js和css的hash值还是一样，因为css是在js中被引入的，所以同属于一个chunk

> contenthash：根据文件的内容生成hash，不同文件的hash值一定不一样
>
> **优点**：让代码上线运行缓存更好使用

```js
 new MiniCssExtractPlugin({
      filename:'css/build.[hash:10].css'
    })

output:{
    filename:'js/build.[hash:10].js',
    path:resolve(__dirname,'build')
  }
```

### 5.tree shaking

> 去除无效代码
>
> 使用条件：1. 必须使用es6模块化 2. 开启production环境
>
> 作用：减少代码体积

在package.json中配置

```js
"sideEffects":false  //设置所有代码都可以进行tree shaking
                     //缺点：会把没使用到的文件全部去除
"sideEffects":["*.css","*.less"] //排除数组中的文件不被去除掉
```

### 6.code split(代码分割)

#### 1.多入口打包

> 有几个入口就输出几个bundle.js
>
> 可以在output设置输出文件名，来区分是哪个入口的文件
>
> [name].[contenthash:10].js

```js
entry:{
    index:'./src/index.js',
    test:'./src/test.js'
}
```

#### 2.optimization分割配置

> 1.可以将node_modules中代码单独打包一个chunk最终输出
>
> 2.自动分析多入口chunk中，有没有公共文件。如果有会打包成单独的chunk文件

```js
optimization:{
    splitChunks:{
        chunks:'all'
    }
}
```

另外可以通过js代码，让某个文件被单独打包成一个chunk

import动态导入语法：能让某个文件被单独打包

注释为取得名字

```js
import(/*webpackChunkName:test*'./test'/)
	.then(({mul,count}) =>{
	console.log("----")
	})
	.catch(()=>{
	console.log("----")
	})
```

### 7.lazy loading(懒加载)

> 正常加载：可以认为是并行加载，同时加载多个文件，没有顺序
>
> 懒加载：当文件需要时再加载，可能会造成卡顿
>
> 预加载（prefetch）:等其他资源加载完毕，浏览器空闲了，再偷偷加载资源（兼容性差）

```js
import(/*webpackChunkName:'test',webpackPrefetch:true*/'./test').then(res =>console.log(res));
```

### 8.PWA

> 渐进式网络开发应用程序（离线可访问）
>
> workbox ---> workbox-webpack-plugin

```js
cnpm i -D workbox-webpack-plugin
```

```js
plugins:[
  new WorkWebpackPlugin.GenerateSW({
     //生成一个serviceworker快速启动
     //删除旧的serviceworker
     //生成一个serviceworker配置文件
     clientsClaim:true,
     skipWaiting:true
  })
]
```

- 注册serviceworker
- 处理兼容性问题

```js
//在入口文件中
if('serviceworker' in navigator){
    window.addEventListener('load',() =>{
      navigator.serviceworker
        .register('/service-worker.js')
        .then(()=>console.log('sw注册成功了'))
        .catch(() =>{console.log('sw注册失败了')})
    })
}
```

> 这样会有几个问题
>
> 1. eslint不认识window、navigator全局变量
>
>    解决：需要修改package.json中的eslint配置
>
> 2. sw代码必须运行再服务器上，以下方式进行测试
>
>  -->node.js
>
> --> cnpm i serve -g
>
> serve -s build 启动服务器，将build目录下的所有 资源作为静态资源暴露出去

```js
"eslintConfig":{
    "env":{
        "browser":true   //支持浏览器端的全局变量
    }
}
```

### 9.多进程打包

> 加载thread-loader，一般给babel-loader使用
>
> babel-loader处理完交给thread-loader，开启多进程打包
>
> 缺点：进程启动大概600ms，进程通信也有开销
>
> 只有工作消耗时间比较长，才需要多	进程打包

```js
{
    loader:'thread-loader',
    options:{
      workers:2       //进程两个
    }
}
```

### 10.externals

> 拒绝一些包被打包进项目
>
> 可使用cdn引入

添加属性

```js
externals:{
    jquery:'jQuery' //拒绝jQuery打包进来
}
```

### 11.dll

> 使用dll技术，对某些库（第三方库：jquery、react、vue）进行单独打包
>
> 不想写了 看视频

[视频解析](https://www.bilibili.com/video/BV1e7411j7T5?p=30)