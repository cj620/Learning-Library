// let str:string='hello'
// interface FullName{
//   firstName:string
//   secondName:string
// }
// function print(name:FullName){
//   console.log(name.firstName,name.secondName)
// }
// let obj = {
//   age:20,
//   firstName:'c',
//   secondName:'j'
// }
// print(obj)
// function logClass(params:any){
//   return function(value:any){
//       console.log(params);   //传入的参数
//       console.log(value);    //装饰对象
      
      
//   }
   
// }
// //使用
// @logClass('cj')    //装饰器自执行
// class HttpClient{
//    constructor(){
//    }
// }
// function logProperty(params:any){
//   return function(target:any,attr:any){
//       console.log(target)
//       console.log(attr)
//       target[attr] = params
      
//   }
// }
// class HttpClient{
//   @logProperty('cj')
//   public url:any | undefined
//   constructor(){}
//   getData(){
//       console.log(this.url)
//   }
// }
// let http = new HttpClient()
// http.getData()

function get(params:any){
  return function(target:any,methodName:any,desc:any){
      console.log(target);      //类的原型
      console.log(methodName);  //方法名
      console.log(desc);        //属性描述
      console.log(desc.value); //方法体
      //修改方法体
      let method = desc.value
      desc.value = function(){
          console.log('xixixxi');
      }                           //这里导致了原方法被覆盖
      method.call(this)
  }
}
class HttpClient{
  constructor(){
  }
  @get('cj')
  getData(){
    console.log('ahah');
    
  }
}
let http = new HttpClient()
http.getData()   //xixixi