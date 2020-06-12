"use strict";
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
function get(params) {
    return function (target, methodName, desc) {
        console.log(target); //类的原型
        console.log(methodName); //方法名
        console.log(desc); //属性描述
        console.log(desc.value); //方法体
        //修改方法体
        var method = desc.value;
        desc.value = function () {
            console.log('xixixxi');
        }; //这里导致了原方法被覆盖
        method.call(this);
    };
}
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.prototype.getData = function () {
        console.log('ahah');
    };
    __decorate([
        get('cj')
    ], HttpClient.prototype, "getData", null);
    return HttpClient;
}());
var http = new HttpClient();
http.getData(); //xixixi
