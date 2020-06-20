# Vue的知识点解析

## 1.Diff算法

> 由于在浏览器中操作DOM的代价是非常“昂贵”的，所以才在Vue引入了Virtual DOM，Virtual DOM是对真实DOM的一种抽象描述
>
> 即使使用了Virtual DOM来进行真实DOM的渲染，在页面更新的时候，也不能全量地将整颗Virtual DOM进行渲染，而是去渲染改变的部分，这时候就需要一个计算Virtual DOM树改变部分的算法了，这个算法就是Diff算法。

## 2.v-for为什么要使用key？

> vue中列表循环需加:key="唯一标识" 唯一标识可以是item里面id index等，因为vue组件高度复用增加Key可以标识组件的唯一性，为了更好地区别各个组件 key的作用主要是为了高效的更新虚拟DOM

- 首先讲一下diff算法的处理方法，对操作前后的dom树同一层的节点进行对比，一层一层对比

![](https://upload-images.jianshu.io/upload_images/3973616-cbe6ef9bad920f51.png?imageMogr2/auto-orient/strip|imageView2/2/w/576/format/webp)

- 当某一层有很多相同的节点时，也就是列表节点时，Diff算法的更新过程默认情况下也是遵循以上原则。比如一下这个情况：

![](https://upload-images.jianshu.io/upload_images/3973616-6d930e85939f0a3e.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/477/format/webp)

- 我们希望可以在B和C之间加一个F，Diff算法默认执行起来是这样的：

![](https://upload-images.jianshu.io/upload_images/3973616-c93a83cb2203fa54.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/572/format/webp)

- 即把C更新成F，D更新成C，E更新成D，最后再插入E，是不是很没有效率？

  所以我们需要使用key来给每个节点做一个唯一标识，Diff算法就可以正确的识别此节点，找到正确的位置区插入新的节点。

  ![](https://upload-images.jianshu.io/upload_images/3973616-25f6c171772b50b6.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/452/format/webp)

## 3.Vue.js 中常见性能优化

> 1. 编码优化:
>
> 2. `Vue`加载性能优化
>
> 3. 用户体验
>
> 4. `SEO`优化
>
> 5. 打包优化
>
> 6. 缓存，压缩

1.编码优化

- 1.不要将所有的数据都放在data中，data中的数据都会增加getter和setter，会收集对应的watcher
- 2.`vue` 在 v-for 时给每项元素绑定事件需要用事件代理
- 3.`SPA`页面采用keep-alive缓存组件
- 4.拆分组件( 提高复用性、增加代码的可维护性,减少不必要的渲染 )
- 5.`v-if` 当值为false时内部指令不会执行,具有阻断功能，很多情况下使用v-if替代v-show
- 6.`key`保证唯一性 ( 默认`vue`会采用就地复用策略 )
- 7.`Object.freeze` 冻结数据
- 8.合理使用路由懒加载、异步组件
- 9.尽量采用runtime运行时版本
- 10.数据持久化的问题 （防抖、节流）

2.vue性能加载优化

- 第三方模块按需导入 (`babel-plugin-component`)
- 滚动到可视区域动态加载 ( https://tangbc.github.io/vue-virtual-scroll-list )
- 图片懒加载 (https://github.com/hilongjw/vue-lazyload.git)

3.用户体验

- `app-skeleton`骨架屏
- `app-shell`app壳
- `pwa`

## 4.Vue3.0的改进？

- `Vue3`采用了TS来编写
- 支持 `Composition API`
- `Vue3`中响应式数据原理改成`proxy`
- `vdom`的对比算法更新，只更新`vdom`的绑定了动态数据的部分

## 5.谈谈你对 Vue.js 中 keep-alive 的了解

keep-alive可以实现组件的缓存，当组件切换时不会对当前组件进行卸载,常用的2个属性`include`/`exclude`,2个生命周期actievated,deactivated

## 6.Vue的生命周期内部可以做什么事情？

- `created` 实例已经创建完成，因为它是最早触发的原因可以进行一些数据，资源的请求。
- `mounted` 实例已经挂载完成，可以进行一些DOM操作
- `beforeUpdate` 可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
- `updated` 可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态，因为这可能会导致更新无限循环。 该钩子在服务器端渲染期间不被调用。
- `destroyed` 可以执行一些优化操作,清空定时器，解除绑定事件

## 7.描述组件渲染和更新过程

渲染组件时，会通过`Vue.extend`方法构建子组件的构造函数，并进行实例化。最终手动调用`$mount()`进行挂载。更新组件时会进行`patchVnode`流程.核心就是diff算法

## 8.`Vue`父子组件生命周期调用顺序

- 加载渲染过程

> 父beforeCreate -> 父created -> 父beforeMount -> 子beforeCreate -> 子created -> 子beforeMount -> 子mounted -> 父mounted

- 子组件更新过程

> 父beforeUpdate -> 子beforeUpdate -> 子updated -> 父updated

## 9.Vue.js 组件如何通信以及有哪些方式?

- 父子间通信 父->子通过`props`、子-> 父`$on、$emit`
- 获取父子组件实例的方式`$parent、$children`
- 在父组件中提供数据子组件进行消费 `Provide、inject`
- `Ref`获取实例的方式调用组件的属性或者方法
- `Event Bus` 实现跨组件通信
- `Vuex`状态管理实现通信

## 1.`Vue-Router`中导航守卫有哪些？

完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用离开守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数。