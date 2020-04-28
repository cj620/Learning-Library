
//promise的简单实现

(function(window){

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

  Promise.prototype.then = function(onResolved,onRejected){
    const self = this  //区分一下其他this ，self代表promise对象

    //假设当前状态为PENDING ，那么先为这个promise指定回调函数，把这两个函数放入回调队列
    self.callbacks.push({
      onResolved,           //函数队列存储的对象，所以要用对象体包起来
      onRejected
    })
  }

  Promise.prototype.catch = function(onRejected){
  }



  Promise.resolve = function(value){
  }

  Promise.reject = function(reason){
  }

  Promise.all = function(promises){ 
  }

  Promise.race = function(promises){ 
  }

  window.Promise = Promise
})(window)