const {resolve} =require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

process.env.NODE_ENV='production'

const commonCssLoader = [                 //将css的一系列处理抽离
  MiniCssExtractPlugin.loader,               
          'css-loader',
          {
            loader:'postcss-loader',
            options:{
              ident: 'postcss',
              plugins:() =>{
                require('postcss-preset-env')()
              }
            }
          }
]

module.exports ={
  entry:'./src/index.js',
  output:{
    filename:'js/build.js',
    path:resolve(__dirname,'build')
  },
  module:{
    rules:[
      //处理css文件
      {                         
        test:/\.css$/,
        use:[...commonCssLoader]
      },
      {                        //处理less文件
        test:/\.less$/,
        use:[...commonCssLoader,'less-loader']
      },
    
      //设置js语法检查
      //在packge.json中eslintConfig ---->airbnb
      {
        test:/\.js$/,
        exclude:/node_modules/,
        enforce:'pre',            //需要先执行
        loader:'eslint-loader',
        options:{
          fix:true
        }
      },
      //js兼容性处理
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader',
        options:{
          presets:[
            [            //指示babel做什么样的兼容处理
            '@babel/preset-env' ,  //只能转换基本语法
             {
              useBuiltIns:'usage', //按需加载 useBuiltIns
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
          ]
        }
      },
      
      // 图片处理
      {
        test:/\.(jpg|png|gif)$/,
        loader:'url-loader',
        options:{
          limit:8*1024,            //这个大小以下的使用url-loader
          name:'[hash:10].[ext]',  //设置hash名字，后缀
          outputPath:'imgs',        //输出路径
          esModule:false
        }
      },


      //处理html中的图片
      {
        test:/\.html$/,          
        loader:'html-loader'    //使用这个loader处理出来的图片使commonJs的规则，但是url-loader使用的是es6格式
      },                      //需要修改url-loader的配置

      //其他文件的处理
      {
        exclude:/\.(html|js|css|less|jpg|png|gif)$/,  //排除上面所有的处理过的文件
        loader:'file-loader',                         //file-loader 会原封不动的处理文件
        options:{
          outputPath:'media'
        }
      }


    ]
  },
  plugins:[
    //抽离css文件
    new MiniCssExtractPlugin({
      filename:'css/build.css'
    }),
    //压缩css文件
    new OptimizeCssAssetsWebpackPlugin({}),
    //处理html文件
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      minify:{  //压缩代码
        removeAttributeQuotes:true, //去除引号
        collapseWhitespace:true,    //去除空格
        removeComments:true         //移除注释
      }
    }),
  ],
  devServer:{
    //需要运行的目录 
    contentBase:resolve(__dirname,'build'),       
    //启动gzip压缩
    compress:true, 
    //指定端口号
    port:3000,
     //自动打开浏览器
    open:true   
  },
  mode:'development'
}