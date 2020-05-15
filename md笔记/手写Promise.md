# 手写Promise

## 1.最简实现Promise（20行）

[文章出处](https://juejin.im/post/5e6f4579f265da576429a907) 

**作者**：晨曦时梦见兮

> 这是一个成功回调

```js
function Promise(excutor) {   
  this.callbacks = [];

  function resolve(value) {
    setTimeout(() => {
      this.data = value;
      this.callbacks.forEach((callback) => callback(value));
    });
  }

  excutor(resolve.bind(this));
}

Promise.prototype.then = function (onResolved) {
  return new Promise((resolve) => {
    this.callbacks.push(() => {
      const result = onResolved(self.data);
      if (result instanceof Promise) {
        result.then(resolve);
      } else {
        resolve(result);
      }
    });
  });
};
```

### 如何实现

> 先实现Promise的构造函数。promise对象中，有回调队列[]，resolve()，以及一个执行器excutor

```js
function Promise(excutor) {
  var self = this;
  self.onResolvedCallback = [];   
  function resolve(value) {
    setTimeout(() => {    //制造异步函数
      self.data = value;
      self.onResolvedCallback.forEach((callback) => callback(value));//执行回调队列
    });
  }

  // 执行用户传入的函数
  excutor(resolve.bind(self));
}
```



> 有了构造函数，还需要一个then()方法就能实现链式调用了。

1. then()方法返回的是一个promise对象
2. 能获取到异步执行的结果

```js
Promise.prototype.then = function (onResolved) {
  // 保存上下文，哪个promise调用的then，就指向哪个promise。
  var self = this;

  // 一定要返回一个新的promise
  return new Promise((resolve) => {
    self.onResolvedCallback.push(function () {
      var result = onResolved(self.data);
      if (result instanceof Promise) {
          //  promise 用户会自己在定时器等异步逻辑里面去resolve
    // 此时这个then方法会被触发 新promise才被resolve 新promise的callbacks里的方法被执行
    // 注意新promise的callbacks并不是self.onResolvedCallback 而是新promise自身的       onResolvedCallback
        result.then(resolve);
      } else {
        resolve(result);
      }
    });
  });
};
```

  可以看到then方法，先拿到了调用then对象的上下文，然后又将新的promise对象的OnResolved()，放入自己的回调队列中。等待上一个promise执行完异步操作，来执行这个回调队列。

  这样又把新promise的OnResolved()给执行了，也就是说新的promise的状态是由上一个promise决定的。这样就形成了链式的样子。

## 2.完善Promise

### Promise的阉割模型

![alt](https://img2020.cnblogs.com/blog/1967420/202004/1967420-20200428163953325-1225104445.png)

```js
(function(window){
  //Promise构造函数
  //executor 执行器函数，同步执行 
  function Promise(executor){

    function resolve (value){}

    function reject(reason){}
    executor(resolve,reject)
  }
  //Promise原型对象上的then()
  //这个函数指定成功和失败的回调
  //返回一个新的promise对象
  Promise.prototype.then = function(onResolved,onRejected){
  }
  //原型对象上的catch方法
  //指定失败的回调
  //返回新的promise
  Promise.prototype.catch = function(onRejected){
  }
  //接下来是函数对象的方法 与原型对象上的方法有所不同 函数上的方法（通过动态赋值给构造函数的方法）不继承 ，也就是说实例对象上没有，不能调用
  //函数对象的resolve方法
  //返回一个指定结果的成功的promise
  Promise.resolve = function(value){
  }
  //函数对象上的reject方法
  Promise.reject = function(reason){
  }
  //函数对象上的all方法
  //返回一个promise 都成功才成功 有一个失败就全失败
  Promise.all = function(promises){ //promises是一个数组，里面装的是promise对象
  }
  //函数对象上的race方法
  //返回一个promise对象 其结果由第一个完成的promise来决定
  Promise.race = function(promises){ 
  }
  window.Promise = Promise
})(window)
```

### Promise构造函数

![alt](https://img2020.cnblogs.com/blog/1967420/202004/1967420-20200428164145749-145881735.png)

```js
 function Promise(executor){
//三种状态
const PENDING ="pending"
const RESOLVED = "resolved"
const REJECTED = "rejected"
    // 将promise对象保存起来
    const self = this
    self.status = 'PENDING'  //给promise指定初始状态值 初始值为PENDING 等待态
    self.data = undefined    //给promise指定一个储存结果数据的属性
    self.callbacks = []       //一个回调序列 存储已经指定的回调   结构为包含两个回调函数的对象{onResolved(){},onRejected(){}}
    function resolve (value){
      //只有是初始状态PENDING才能改变状态 所以要加一层判断
      if(self.status !== "PENDING"){
        return
      }
      //将状态改为RESOLVED
      self.status = RESOLVED
      //保存value数据
      self.data = value
      //如果有还未执行的call回调函数，立即异步执行回调函数onResolved  去回调序列里边找
      //由于需要异步执行 这里使用一下setTimeOut将这个回调函数放入宏队列里去
      if(self.callbacks.length > 1){
        setTimeout(() =>{            //放入宏队列，执行所有成功回调
          self.callbacks.forEach(callbacksObj => {
            callbacksObj.onResolved(value)
          });
        })
      }
    }
    function reject(reason){
      //只有是初始状态PENDING才能改变状态 所以要加一层判断
      if(self.status !== "PENDING"){
        return
      }
      //将状态改为REJECTED
      self.status = REJECTED
      //保存reason数据
      self.data = reason
      //如果有还未执行的call回调函数，立即异步执行回调函数onRejected  去回调序列里边找
      //由于需要异步执行 这里使用一下setTimeOut将这个回调函数放入宏队列里去
      if(self.callbacks.length > 1){
        setTimeout(() =>{            //放入宏队列，执行所有成功回调
          self.callbacks.forEach(callbacksObj => {
            callbacksObj.onRejected(reason)
          });
        })
      }
    }
    //立即同步执行executor
    try {                       //如果执行器抛出异常，也就是说既不会执行成功回调也不会执行失败回调 
      executor(resolve,reject)  //所以这里要去捕获一下异常 如果抛出异常，promise对象变为REJECTED状态
    } catch (error) {
      reject(error)             //执行reject() 使promise失败
    }
  }
```

### then()方法

```js
then(onResolved,onRejected) {
  //return一个新的promise
  return new MyPromise((resolve, reject) => {
    //把resolveFn重新包装一下,再push进resolve执行队列,这是为了能够获取回调的返回值进行分类讨论
    const onResolved = value => {
      try {
        //执行第一个(当前的)Promise的成功回调,并获取返回值
        let x = onResolved(value)
        //分类讨论返回值,如果是Promise,那么等待Promise状态变更,否则直接resolve
        //这里resolve之后，就能被下一个.then()的回调获取到返回值，从而实现链式调用
        x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
      } catch (error) {
        reject(error)
      }
    }
    //把后续then收集的依赖都push进当前Promise的成功回调队列中(_rejectQueue), 这是为了保证顺序调用
    this.callbacks.push(onResolved)

    //reject同理
    const onRejected  = error => {
      try {
        let x = onRejected(error)
        x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
      } catch (error) {
        reject(error)
      }
    }
    this._rejectQueue.push(onRejected)
  })
}
```

### 待续...