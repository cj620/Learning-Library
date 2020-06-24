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