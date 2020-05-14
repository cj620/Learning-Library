export default {                             //action内部为异步方法，
  updataInfo(context,payload){        //第一个参数context（这里的contex可以看作store对象）是必须的，第二个参数是组件调用dispatch传入的第二个参数，
    return new Promise((resolve) =>{  
      setTimeout(() => {
        context.commit('foo4')        //约定要操作state，必须使用mutations中的方法，所以这里还是哟啊调用commit
        resolve(payload)
      }, 1000);
    })
  },
  deleInfo(context,payload){
    return new Promise((resolve) =>{
     setTimeout(()=>{
      context.commit('foo5')
      resolve(payload)
      
     },1000)
    })
  }
}