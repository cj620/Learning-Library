#  实现call、apply、bind

## 1.实现call()

	>  `call()` 方法使用一个指定的this值和单独给出的一个或多个参数来调用一个函数语法：`function.call(thisArg, arg1, arg2, ...)`

`call()`的原理比较简单，由于函数的this指向它的直接调用者，我们变更调用者即完成this指向的变更：

```js
//变更函数调用者示例
function foo() {
    console.log(this.name)
}

// 测试
const obj = {
    name: 'cj'
}
obj.foo = foo   // 变更foo的调用者
obj.foo()       // 'cj'

```

基于以上原理, 我们两句代码就能实现call()

```js
Function.prototype.myCall = function(thisArg, ...args) {
    thisArg.fn = this              // this指向调用call的对象,即我们要改变this指向的函数
    return thisArg.fn(...args)     // 执行函数并return其执行结果
}

```

但是我们有一些细节需要处理：

```js
Function.prototype.myCall = function(thisArg, ...args) {
    const fn = Symbol('fn')        // 声明一个独有的Symbol属性, 防止fn覆盖已有属性
    thisArg = thisArg || window    // 若没有传入this, 默认绑定window对象
    thisArg[fn] = this              // this指向调用call的对象,即我们要改变this指向的函数
    const result = thisArg[fn](...args)  // 执行当前函数
    delete thisArg[fn]              // 删除我们声明的fn属性
    return result                  // 返回函数执行结果
}

//测试
foo.myCall(obj)     // 输出'cj'
```



## 2. 实现apply()

> `apply() `方法调用一个具有给定`this`值的函数，以及作为一个数组（或类似数组对象）提供的参数。
> 语法：`func.apply(thisArg, [argsArray])`

`apply()`和`call()`类似，区别在于call()接收参数列表，而apply()接收一个参数数组，所以我们在call()的实现上简单改一下入参形式即可

```js
Function.prototype.myApply = function(thisArg, args) {
    const fn = Symbol('fn')        // 声明一个独有的Symbol属性, 防止fn覆盖已有属性
    thisArg = thisArg || window    // 若没有传入this, 默认绑定window对象
    thisArg[fn] = this              // this指向调用call的对象,即我们要改变this指向的函数
    const result = thisArg[fn](...args)  // 执行当前函数（此处说明一下：虽然apply()接收的是一个数组，但在调用原函数时，依然要展开参数数组。可以对照原生apply()，原函数接收到展开的参数数组）
    delete thisArg[fn]              // 删除我们声明的fn属性
    return result                  // 返回函数执行结果
}

//测试
foo.myApply(obj, [])     // 输出'cj'
```

## 3. 实现bind()

> `bind()` 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
>  语法: `function.bind(thisArg, arg1, arg2, ...)`

从用法上看，似乎给call/apply包一层function就实现了`bind()`：

```js
Function.prototype.myBind = function(thisArg, ...args) {
    return () => {
        this.apply(thisArg, args)
    }
}
```

但我们忽略了三点：

1. bind()除了this还接收其他参数，bind()返回的函数也接收参数，这两部分的参数都要传给返回的函数
2. new会改变this指向：如果bind绑定后的函数被new了，那么this指向会发生改变，指向当前函数的实例
3. 没有保留原函数在原型链上的属性和方法

```js
Function.prototype.myBind = function (thisArg, ...args) {
    var self = this
    // new优先级
    var fbound = function () {
        self.apply(this instanceof self ? this : thisArg, args.concat(Array.prototype.slice.call(arguments)))
    }
    // 继承原型上的属性和方法
    fbound.prototype = Object.create(self.prototype);

    return fbound;
}

//测试
const obj = { name: 'cj' }
function foo() {
    console.log(this.name)
    console.log(arguments)
}

foo.myBind(obj, 'a', 'b', 'c')()    //输出cj ['a', 'b', 'c']
```

