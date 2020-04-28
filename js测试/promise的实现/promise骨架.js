
//promise的基本骨架

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