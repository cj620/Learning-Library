# 初识React

## 1.特点

1. 声明式的设计
2. 高效，采用虚拟dom来实现dom的渲染，最大限度的减少dom操作。
3. 灵活，跟其他库可以灵活搭配使用。
4. JSX，俗称js里面写HTML，javascript语法扩展
5. 组件化，模块化。代码容易复用，2016年之前，大型项目非常喜欢用React
6. 单项数据流，没有实现数据的双向绑定，数据--->视图--->事件--->数据 

## 2.创建项目

> 使用脚手架creat-react-app创建项目

```js
cnpm i -g create-react-app
```

```js
create-react-app project(项目名称)
```

## 3.React元素渲染

```jsx
let h1 = <h1>helloworld<h1/>  //使用jsx语法，可以创建js元素对象
        					  //注意：jsx元素对象，或者组件对象，必须只有一个根元素
ReactDOM.render(h1,document.getElementById('root'))  //将h1渲染到root上	
```

## 4.React JSX

> 优点：
>
> 1. JSX执行更快，编译为JavaScript代码式进行优化
> 2. 类型更安全，编译过程如果出错就不能编译，及时发现错误
> 3. JSX编写模板更加简单快速
>
> 注意：
>
> 1. JSX必须要有根节点
> 2. 正常的普通HTML元素要小写，如果大写，则默认认为是组件

### 1.JSX表达式

1. 由HTML元素构成
2. 中间如果需要插入变量用{}
3. {}中间可以使用表达式
4. {}中间表达式中可以使用JSX对象
5. 属性和HTML内容一样都是用{}插入内容

### 2.JSX_style

1. class,style,不可以存在多个class属性

```jsx
<div class='abc' calss={'active'}></div>    //错误的表示
```

2. style样式中，如果存在多个单词的属性组合，第二个单词开始，首字母大写，或者用引号。否则报错

```jsx
let Excss = {
    borderBottom:'1px solid red',   //驼峰
    'margin-left':'1px'				//字符串方式
}
```

##  5.React组件

> 函数式组件：函数式比较简单，一般用于静态没有交互事件内容的组件页面。

> 类组件：一般又称为动态组件，那么一般会有交互或数据修改的操作

### 1.函数式组件

```jsx
function cpn(props){           //组件
    console.log(props.name)    //cj	
  return (
  	<div>
      <h1>函数式组件</h1>  
    </div>
  )
}

ReactDOM.render(<cpn name='cj' />,document.qeurySelector('#root '))   //渲染	
```

### 2.类组件

```jsx
class cpn extends React.Component{
  constructor(props){
    //数据的初始化
    super(props)
    this.state={   //x相当于data
      time:new Date().toLocaleTimeString(),
      name:'cj'
    }
  }
  render(){      //render方法来渲染视图
    return (
      <div>
      	<h1>类组件</h1>
      </div>
    )
  }
}
ReactDOM.render(<cpn/>,document.qeurySelector('#root '))   //渲染		
```

## 6 React State

> 相当于VUE的data但是使用方式跟VUE不同

> 不要直接修改state的数据，最好使用setState，这样才能够渲染到页面上
>
> 因为通过this.setState修改完数据后，并不会立即修改DOM里面的内容
>
> React会在这个函数内容所有设置的状态改变后，统一对比虚拟DOM，然后再统一修改，提升性能
>
> 与小程序类似

```jsx
//
componentDidMount(){
  setInterval(()=>{
    this.setState({   //修改数据
      time:new Date().toLocaleTimeString()
    })
  },1000)
}
```

