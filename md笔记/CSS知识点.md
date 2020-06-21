# CSS知识点

## 1.CSS3新特性

- CSS3实现圆角（border-radius），阴影（box-shadow），
- 对文字加特效（text-shadow、），线性渐变（gradient），旋转（transform）
- transform:rotate(9deg) scale(0.85,0.90) translate(0px,-30px) skew(-9deg,0deg);// 旋转,缩放,定位,倾斜
- 增加了更多的CSS选择器  多背景 rgba 
- 在CSS3中唯一引入的伪元素是 `::selection`.
- 媒体查询，多栏布局
- border-image

## 2.设置元素浮动后，该元素的display值是多少？

自动变成  display:block;

`absolute`和`float`都会隐式改变display；

## 3.清除浮动的方法

- 直接给父盒子设置宽高
- 设置overflow：hidden，触发BFC
- 在父盒子底部添加一个空盒子，给空盒子设置clear：both
- 使用伪元素，给它设置clear：both

## 4.实现居中

- 子绝父相，给子盒子一个top、left都50%。已知宽高情况下，减去自身尺寸的一半。在不知宽高的情况下，使用transform的translate复位50%。
- 使用flex。给父盒子justify-content：center；align-item：center
- 子绝父相，margin设为0，边界值也设为0，将元素挤到中间
- 使用tablecell

## 5.新增伪类

- p:first-of-type 选择属于其父元素的首个 `` 元素的每个 `` 元素。
- p:last-of-type 选择属于其父元素的最后 `` 元素的每个 `` 元素。
- p:only-of-type 选择属于其父元素唯一的 `` 元素的每个 `` 元素。
- p:only-child  选择属于其父元素的唯一子元素的每个 `` 元素。
- p:nth-child(2) 选择属于其父元素的第二个子元素的每个 `` 元素。
- :enabled、:disabled 控制表单控件的禁用状态。
- :checked，单选框或复选框被选中。
- :after 在元素之前添加内容,也可以用来做清除浮动。
- :before 在元素之后添加内容
- :enabled
- :disabled 控制表单控件的禁用状态。
- :checked 单选框或复选框被选中。

## 6.伪类和伪元素

- 单冒号为伪类 类似类
- 双冒号为伪元素 类似元素

## 7.三栏布局，中间自适应

**1、绝对定位法**

左右两栏采用绝对定位，分别固定于页面的左右两侧，

中间的主体栏用左右margin值撑开距离。于是实现了三栏自适应布局。

**2、自身浮动法**

此方法代码最简单。应用了标签浮动跟随的特性。左栏左浮动，右栏右浮动，主体直接放后面，就实现了自适应。

**3、margin负值法**

当元素使用margin-left移动到最左边界时，继续移动的话，元素就会去到上一层的有边界

### 1.双飞翼布局（最优）

> 这里面left直接给margin-left: -100%就能到想要的位置，为什么呢？因为要注意一点，在这里，left父级盒子是宽度100%的，
>
> 不再是圣杯布局里面的留出来左右padding值的父级自适应宽度的盒子，这里面使用content盒子的左右margin值留出来的定宽，
>
> 所以直接就能把left盒子定到想要的位置
>
> 那么同理，right盒子也是因为这样，所以直接margin-left: -200px正好贴到父级盒子最右边，就能到想要的位置了。

```html
<div class="main">
    <div class="content-wrapper">
        <div class="content">content</div>   //双层结构，保证中间内容的优先显示
    </div>
    <aside class="left">left</aside>
    <aside class="right">right</aside>
</div>
<style>
    .left,
.right {
  float: left;
  height: 400px;
  line-height: 400px;
}

.content-wrapper {
  width: 100%;
  float: left;
}

.content {
  margin: 0 200px 0 150px;
  background-color: #f5c531;
  height: 400px;
  line-height: 400px;
}

.left {
  width: 150px;
  background-color: #a0c263;
  margin-left: -100%;
}

.right {
  background-color: #a0c263;
  width: 200px;
  margin-left: -200px;
}
</style>
```

### 2.圣杯布局

> 与双飞翼比，基本思路相似，但是缺少双层结构

### 3.BFC三栏

> 让左右两边浮动，中间使用overflow:hidden触发BFC模式，
>
> 形成独立渲染区域，不会被浮动元素覆盖

### 4.流体布局

>  左右模块各自向左右浮动，并设置中间模块的 margin 值使中间模块宽度自适应。
>
> 缺点就是主要内容无法最先加载，当页面内容较多时会影响用户体验。

## 8.响应式设计

> 面对不同分辨率设备灵活性强
>
> 能够快捷解决多设备显示适应问题
>
> 缺点：
>
> 兼容性比较差

- Meta标签

可以使用meta标签的viewport属性来设置。下面的代码告诉浏览器使用设备屏幕宽度作为内容的宽度，并且忽视初始的宽度设置。这段代码写在<head>里面

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

- media

通过监听屏幕实际尺寸，来达到不同的显示效果

```css
@media screen and (max-width: 300px) {
    body {
        background-color:lightblue;
    }
}
```

## 9.CSS中的权重优先级

- 内联—-1000
- id—-100
- 类—-10
- 标签/伪类—-1
- 通配符（*）—-0

优先级就近原则，同权重情况下样式定义最近者为准;

## 10.base64的优缺点

> 优点：
>
> 能够减小大图片的尺寸，同时还能够减少HTTP请求数量；HTTP请求是非常耗费服务器资源的；
>
> 缺点：
>
> 如果图片比较小，那么base64编码后的字符串会比图片本身还大

## 11.inline-block边距问题，有4px的边距，怎么解决？

> 主要是会多一个空格位置
>
> 去掉标签之间的空格；或者用注释也可以
>
> 用`font-size`来解决、父级添加`font-size:0`；然后本身再把`font-size`恢复下即可；

## 12.两种盒子模型

- 标准盒模型

​       在标准的盒子模型中，width指content部分的宽度

- IE盒模型

  在IE盒子模型中，width表示content+padding+border这三个部分的宽度

## 13.BFC

> 块格式化上下文， BFC 的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素

**触发**

- 1、浮动元素，float 除 none 以外的值
- 2、绝对定位元素，position（absolute，fixed）
- 3、display 为以下其中之一的值 inline-blocks，table-cells，table-captions
- 4、overflow 除了 visible 以外的值（hidden，auto，scroll）

**用处**

- 可以阻止边距折叠
- 可以包含内部元素的浮动
- 可以阻止元素被浮动覆盖

