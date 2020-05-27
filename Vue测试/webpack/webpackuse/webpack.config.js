/*
webpack的配置文件
指示webpack需要干些什么，当运行webpack时，会加载里面的配置
所有的构建工具都是基于nodejs平台的，模块化采用commonjs
*/
//resolve用来拼接绝对路径的方法
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')             //加载html解析插件 这是以后构造函数


module.exports={
  //webpack配置
  //入口起点
  entry:'./src/index.js',
  //输出
  output:{
    //输出文件名
    filename:'build.js',
    //输出的路径
    path:resolve(__dirname,'build')           //__dirname代表项目文件的绝对路径   build时后面拼接的路径
  },


  //loader配置
  module:{
    rules:[
      //详细的loader配置
      {
        //匹配哪些文件
        test:/\.css$/,
        //使用哪些loader
        use:[
          'style-loader',
          'css-loader'
        ]
      },
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
      },
      {
        test:/\.html$/,
        //处理html文件的img图片，（负责引入img，从而能被url-loader进行处理）
        loader:'html-loader'
      },
      {
        //把前面处理了的资源排除掉，其他的统一进行处理
        exclude:/\.(css|js|html|less)$/,
        loader:'file-loader',
        options:{
          name:'[hash:10].[ext]'
        }
      }
    ]
  },
  //开发服务器DevServer，用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
  //特点：只会在内存中编译打包，不会有任何输出
  //启动devServer指令为，npx webpack-dev-server
  devServer:{
    //运行的目录
    contentBase:resolve(__dirname,'build'),       
    //启动gzip压缩
    compress:true, 
    //指定端口号
    port:3000

  },


  //插件配置
  plugins:[
    //详细的插件配置
    //html-webpack-plugin
    new HtmlWebpackPlugin({
      //以下面html文件为模板，并自动引入打包输出的所有的资源
      template:'./src/index.html'
    })
  ],

  //模式
  mode:'development'       //production
}