# 初识Webpack

## 安装

- 安装开发依赖

```
cnpm install webpack webpack-cli -D
```

- webpack-dev-server

```js
npx webpack-dev-server
```

并不是真实的打包文件，而是生成一个内存中的打包，可以用于项目预览

可以在json文件中配置运行脚本

- [hash]

可以唯一文件的输出名，防止文件被覆盖

```js
bundle.[hash:8].js   //设置八位的hash，让这个js文件唯一
```

## 1.基本配置

```js
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack'); //访问内置的插件
const path = require('path');  //node核心模块

const config = {
  mode: 'production',
  entry: './path/to/my/entry/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;
```

## 2.属性

### 1.mode

> 告知 webpack 使用相应模式的内置优化，不同的模式，会默认加载不同的插件。

- production 产品模式
- development 开发模式

```js
mode: 'production'
```

### 2.entry

> 打包的起点，文件的入口，对应的是文件路径

```js
entry: './path/to/my/entry/file.js'
```

### 3.output

> 打包后文件的输出位置

- `filename` 用于输出文件的文件名。
- 目标输出目录 `path` 的绝对路径。

```js
output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist')        //路径必须是绝对路径
  }
```

### 4.module

> 作用模块，module.rules数组中配置各种loader
>
> loader的执行顺序为从右至左
>
> use属性可以是一个数组，每个项为一个loader
>
> 每个项也可以是一个对象，这个对象有loader、option属性

```js
module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader','xxx-loader']
      },
    ]
  }
```

```js
{
    //图片loader
    //默认处理不了html中引入的图片
    test:/\.(JPG|png|gif|jpg)$/,
    loader:'url-loader',
    options:{
          //图片小于8kb，就会被base64处理成字符串
          //优点减少请求，缺点图片体积会变大
      limit: 8*1024,
          //问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片时commonjs
          //解析时会出问题，[object Module]
          //解决：关闭url-loader的es6模块化，使用commonjs解析
       esModule:false,
          //给图片进行重命名
          //限定hash值的前10位，[ext]为扩展名
       name:'[hash:10].[ext]'
  }
}
```



### 5.plugins

> 数组

> 插件，目的在于解决 loader无法实现的其他事。
>
> 每个插件是一个类

```js
plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
}
```

### 6.devServer

> 开发服务器的配置,可以配置端口或进度条之类的属性
>
> 自动化 ，编译、打开浏览器、刷新浏览器

```js
devServer:{
	port:3000,                           //端口
    compress:true,                        //启动gzip压缩
    contentBase:resolve(__dirname,'build'),//运行目录
    host:'localhost',						 //域名
    open:true,								//是否自启浏览器
    hot:true,								//启动HMR
    clientLogLevel:'none',      				//不要显示服务器日志
    quite:true								//除了一些基本启动信息，其他内容都不要显示
    watchOptions:{
        ignored:/node_modules/    			//忽略监视文件
    },
    overlay:false							//不要全屏的显示报错信息
    proxy:{									//解决开发环境下的跨域问题
    ...
    }
}
```

### 7.optimization

> 优化属性
>
> **开发环境不会使用优化属性**
>
> [视频解析](https://www.bilibili.com/video/BV1e7411j7T5?p=38)

```js
 optimization: {
     splitChunk:{
         chunks:'all',
         minSize:30*1024,       //分割chunk最小为30kb
         maxSize:0,				//最大没有限制
         minChunks:1,			//要提取的chunk最少被引用一次
         ...
     }
     minimizer:[   //设置plugin
       new XXXXXplugin({
        cache:true,           //开启缓存
        parallel:true,	      //开启多进程打包
        sourceMap:true		  //启动source-map
       })
     ]
  }
```

### 8.resolve

> 配置解析模块

```js
resolve:{
         配置解析模块路径别名
    alias:{
        $css:resolve(__dirname,'src/css')   //让$css来代替src下的css文件夹
    },
        //配置省略文件的后缀名
    extensions:['.js','.json','.css'],
        //告诉webpack解析模块是去找哪个目录 
    modules:[resolve(__dirname,'../../node_modules'),'node_modules']
}
```



## 3.常用插件

### 1.HTML插件

```js
cnpm install html-webpack-plugin -D
```

因为webpack打包只输出js文件，所以需要HTML插件处理HTML文件

```js
new HtmlWebpackPlugin({
    template:'./src/index.html',  //以下面html文件为模板，并自动引入打包输出的所有的资源
    filename:'index.html',        //输出的文件名
    minify:{
        removeAttributeQuotes:true, //去除引号
        collapseWhitespace:true,    //去除空格
    },
    hash:true                  //开启hash
})
```

### 2.抽离css插件

```js
cnpm install mini-css-extract-plugin -D
```

将css抽离成一个单独的文件

自带一个loader：MiniCssExtractPlugin.loader

在css-loader处理完，可以交给这个loader

```js
new MiniCssExtractPlugin({
    filename:'css/build.css'           //将抽离的css放到这个文件下
})
```

### 3.css压缩插件

```js
npm i -D optimize-css-assets-webpack-plugin   //webpack4使用  5有内置css压缩插件
```

新增导出对象的属性

```js
optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  }
```

### 4.js压缩插件

```js
cnpm i -D uglifyjs-webpack-plugin
```

js压缩需要一个插件： `uglifyjs-webpack-plugin`, 此插件需要一个前提就是：`mode: 'production'`.

```js
optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,         //缓存？
        parallel: true,		 //并发打包/
        sourceMap: true // set to true if you want JS source maps
      })
    ]
  } 
```



## 4.常用loader

- style-loader

将css插入HTML中

- css-loader
- less-loader/sass-loader

将less/sass转译成css

- postcss-loader

> 自动添加css3前缀 要放在css-loader之前
>
>  需要配合autoprefixer包,以及配置postcss.config.js文件

