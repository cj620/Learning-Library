# Webpack处理方式

## 1.处理HTML

> 配置minify 可以对html进行压缩

```js
cnpm install html-webpack-plugin -D
```

因为webpack打包只输出js文件，所以需要HTML插件处理HTML文件

```js
new HtmlWebpackPlugin({
    template:'./src/index.html',  //以下面html文件为模板，并自动引入打包输出的所有的资源
    filename:'index.html',        //输出的文件名
    minify:{ //压缩代码
        removeAttributeQuotes:true, //去除引号
        collapseWhitespace:true,    //去除空格
        removeComments:true         //移除注释
    },
    hash:true                  //开启hash
})
```

## 2.处理css 

### 1.抽离css

```js
cnpm install mini-css-extract-plugin -D
```

先将css抽离成一个单独的文件

插件自带一个loader：MiniCssExtractPlugin.loader

在css-loader处理完，可以交给这个loader

```js
new MiniCssExtractPlugin({
    filename:'css/build.css'           //将抽离的css放到这个文件下
})
```

### 2.压缩css

```js
cnpm i -D optimize-css-assets-webpack-plugin   //webpack4使用  5有内置css压缩插件
```

新增导出对象的属性optimization，这个属性只在产品模式下有用

```js
optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  }
```

或者直接在plugins中new出来

```js
plugins:[
    new OptimizeCSSAssetsPlugin({})
]
```



### 3.css兼容处理（一）

> 使用插件postcss-loader
>
> 自动添加css3前缀 要放在css-loader之前
>
> 需要配合autoprefixer包,以及配置postcss.config.js文件

```js
//postcss.config.js
module.exports = {
    plugins:[require('autoprefixer')]
}
```

### 4.css兼容处理（二）

> 需要修改postcss-loader的设置
>
> 配合postcss的插件post-preset-env

```js
cnpm i -D post-preset-env
```

```js
{
  loader:'postcss-loader',
  options:{
      ident:'postcss',
      plugins:()=>[
          require('postcss-preset-env')()  //postcss插件
      ]
  }
}
```

然后需要再package.json文件中配置browserlist,通过配置加载指定的兼容性样式

```js
{
  "browserlist":{
   //开发环境  》》》需要设置node环境变量：process.env.NODE_ENV=development
    "development":[
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ],
   //生产环境  默认就是生产环境
    "production":[
      ">0.2%",
      "not dead",
      "not op_mini all"
    ]
  }
}
```

如果想设置开发环境，在导出对象外面设置  

```js
process.env.NODE_ENV=development
```

##  3.处理js 

### 1.兼容性处理

> 1. 基本兼容性处理---->@babel/preset-env  只能转换基本语法，高级语法如promise不能转换

> 2. 完全兼容性处理---->@babel/polyfill   将所有的兼容性问题都处理了，体积太大，但是我只想解决部分的

> 3. 按需做兼容性处理---->corejs

#### 1.基本兼容

安装转译的loader 和核心模块包    

```js
cnpm i -D babel-loader @babel/core @babel/preset-env
```

```js
rules:[
 {
    test:/\.js$/,
    exclude:/node_modules/,
    use:{
      loader:'babel-loader',  //使用babel-loader，将es6-es5
      options:{
      presets:[
        '@babel/preset-env'  //指示babel做什么样的兼容处理 只能转换基本语法
       ],
    plugins:[]
    }
   }
  }
]
```

如果需要处理如class或装饰器之类的语法，需要在上面的的plugins中加入小插件

#### 2.完全兼容

```js
cnpm -i --save @babel/polyfill       
```

```js
//在js文件中引入
require '@babel/polyfill'
'aaa'.includes('a')  
```

#### 3.按需兼容

> 既然按需兼容，那就不使用上面的@babel/polyfill

```js
rules:[
 {
    test:/\.js$/,
    exclude:/node_modules/,
    use:{
      loader:'babel-loader',  //使用babel-loader，将es6-es5
      options:{
      presets:[                //指示babel做什么样的兼容处理
        '@babel/preset-env' ,  //只能转换基本语法
         {
          useBuildIns:'usage', //按需加载
          corejs:{
            version:3          //指定core-js的版本
          },
          targets:{            //指定兼容性做到哪个版本的浏览器
            chrome:'60',
            firefox:'60',
            ie:'9',
            safari:'10',
            edge:'17'
          }
         }
       ],
    plugins:[]
    }
   }
  }
]
```

### 2.压缩js代码

> 在production生产模式下，会自行压缩js 不需要以下操作
>
> 因为生产模式默认加载了uglifyjs-webpack-plugin

```js
npm i -D uglifyjs-webpack-plugin
```

js压缩需要一个插件： `uglifyjs-webpack-plugin`, 此插件需要一个前提就是：`mode: 'production'`.

```js
optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,         //缓存？
        parallel: true,		 //并发打包?
        sourceMap: true // set to true if you want JS source maps
      })
    ]
  }
```

## 3.图片处理

- 设置输出路径 outputPath:'assets'   打包后的位置 assets目录下

- publicPath:'/img/'                              给输出的文件加上路径前缀

  

> 图片来源
>
> 1. js中引用图片
>
> 2. 在css中的background（‘url’）
>
> 3. HTML中的img标签引入

### 1.解析图片loader

```js
cnpm i -D url-loader file-loader
```

直接使用url-loader来解析图片,但是它依赖于file-loader

```js
rules: [
  {
    //图片loader
    //默认处理不了html中引入的图片
    test:/\.(JPG|png|gif|jpg)$/,
    loader:'url-loader',              //被处理为base64的图片
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
]
```

### 2.解析HTML中的图片

> 使用img标签引入的图片，不能被解析。这个时候需要对html进行处理
>
> 使用   html-loader

```js
{
  test:/\.html$/
  use:'html-loader'    //使html中的图片可以被url-loader解析
}
```

## 4.处理其他资源

> 前面已经处理好了js/css/html资源，还需要对其他资源进行处理
>
> 使用file-loader 处理

```js
{
  exclude:/\.(css|js|html)$/        //排除css js html文件
  loader:'file-loader'
  options:{
          name:'[hash:10].[ext]',
        }
}
```

## 5.开发服务器配置

启动指令： 

```js
npx webpack-dev-server
```

只会在内存中打包，不会对项目有任何影响

```js
devServer:{
    //需要运行的目录 
    contentBase:resolve(__dirname,'build'),       
    //启动gzip压缩
    compress:true, 
    //指定端口号
    port:3000,
     //自动打开浏览器
    open:true   
  }
```

## 6.语法检查 eslint

> 语法检查 eslint-loader  eslint     **注意只检查自己的代码，排除node_modules**   
>
> 设置检查规则：
>
> 在 package.json中eslintconfig中设置
>
> airbnb   》》》》 eslint-config-airbnb-base   eslint-plugin-import eslint

```js
cnpm i -D eslint-loader eslint
```

```js
{
  test:/\.js$/,
  exclude: /node_modules/,
  loader:'eslint-loader',
  options:{
      fix:true  //是否自动修复语法不当
  }
}
```

在package.json中

```js
cnpm i -D  eslint-config-airbnb-base   eslint-plugin-import eslint
```

```js
"eslintConfig":{
  "extends":"airbnb-base"   //airbnb-base 来源于上面模块的依赖组合
}
```

## 7.关于执行顺序

> 正常来讲，一个文件只能被一个loader处理，
>
> 当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序
>
> 配置方式，在loader中配置：
>
> enforce:'pre'  优先执行

### 1.js处理顺序

> 先执行eslint 再执行babel