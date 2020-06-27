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
```

