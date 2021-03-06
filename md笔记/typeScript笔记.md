# TypeScript笔记

## 1.Vscode自动编译.ts文件

1. 创建tsconfig.json文件  ，执行tsc --init生成配置文件
2. 修改“outDir”属性 属性值为编译后的js文件存放的目录
3. 点击终端  >>  运行任务  >>  typescript  >>  tsc：监视

## 2.typeScript中的数据类型

+ 布尔类型（boolean）

+ 数字类型（number）
+ 字符串类型（string）
+ 数组类型（array）
+ 元组类型（tuple）
+ 枚举类型（enum）
+ null和undefine
+ void类型
+ never类型

### 1.声明数组的两种方法

```typescript
//第一种
let arr:string[] = ["a","b","c"]
//第二种  使用泛型
let arr:Array<string> = [1,2,3]
```



### 2.元组类型（tuple）

> 可以指定数组中每个元素的类型

```typescript
let arr:[string,number,boolean]=["ts",1,false]
```

### 3.枚举类型（enum）

>相当于自定义一个类型

```typescript
enum flag{
    success=1,
    error=-1
}
let f:flag=flag.succees  
console.log(f)  //输出1
```

### 4.任意类型（any）

> 有些时候声明的变量不属于任何一种的基本数据类型，比如object、function。这个时候就需要使用any

```typescript
let box:any = document.getElementById('box')
box.style.color = 'red'
```

### 5.空类型（void）

> 表示没有任何类型，一般用于定义方法的时候。方法没有返回值

```typescript
function run():void{
    console.log('run')
}
run()                        //函数无返回值
```

### 6.never类型

> 代表从不会出现的值  是其他类型（null和undefine）的子类型
>
> 这意味着声明never的变量只能被never类型所赋值

```typescript
let a:undefine
a = undefine
let b:null
b = null
```

## 3.TypeScript中的函数

### 1.函数声明法

> 声明函数时，给这个函数指定类型。相当于预设了函数的返回值的类型

```typescript
function run():string{
    return 'cj'
}
```

> 匿名函数

```typescript
let fn = function():number{
    return 123
}
```

### 2.传参方法

> 可以在方法传参时，对参数进行类型声明

```typescript
function fn(name:string,age:number):string{
    return `${name}--${age}`
}
```

### 3.可选参数和默认参数

> 可选参数可以使用"?"来代表传或者不传 ，可选参数最好配置在参数列表的最后边
>
> 默认参数，代表如果有传参则使用新参，没有传参则使用默认参数

```typescript
function fn(name:string,age:number=20,sex?:boolean):string{
    return `${name}----${age}---${sex}`
}
```

### 4.三点运算符

> 能够接受新参，不限制参数的个数

```typescript
function fn(...result:number[]):number{
    let sum = 0 
    for (let i= 0;i<result.length;i++){
        sum +=result[i]
    }
    return sum
}
fn(1,2,3,4)
fn(1,2,3,4,5,6)
```

### 5.方法的重载和重写

> 与java中的定义类似

## 4.TypeScript中的类

### 1.构造类

```typescript
class Person{
    name:string  //属性
    constructor(name:string){   //构造函数实例化类时触发的方法
        this.name = name
    }
    getName():string{
        return this.name
    }
    setName(name:string):void{
        this.name = name
    }
}

let p = new Person('cj')
console.log(p.getName())  //cj
p.setName('gg')
console.log(p.getName())  //gg
```

### 2.类的继承

```typescript
class Person{
    name:string  //属性
    constructor(name:string){   //构造函数实例化类时触发的方法
        this.name = name
    }
    run():string{
        return `我是${this.name}`
    }
}

class GG extends Person{
    constructor(name:strng){
        super(name)   //初始化父类的构造函数
    }
}
let cj = new GG('changjian')
console.log(cj.run())    //我是changjian
```

###  3.类里面的修饰符

> 与java中定义相似

+ **public**  公有类型    在类里面、子类、类外面都可以访问
+ **protected ** 保护类型     在类里面、子类都可以访问
+ **private**    私有              只能在类里面访问

```typescript
public name:string
protected name:string
private name:string
```

### 4.static静态属性

> 与实例中的属性不同，静态属性可以理解为函数自己的私有的属性
>
> 静态方法和静态属性
>
> 静态方法不能直接调用类里面的属性，只能调用静态的属性

```typescript
class Person{
    static name="humen"
    static print(){
        console.log("我是"+Person.name)
    }
}
console.log(Person.name)    //human
console.log(Person.print()) //我是human
```

### 5.abstract抽象类

> 它是提供其他类继承的基类，不能直接被实例化 (不能直接new)
>
> 内部为抽象方法
>
> 抽象方法只能出现在抽象类中,抽象类也可以写非普通属性
>
> 如果继承了抽象类，那就必须实现其中的抽象方法

多态：父类定义一个方法不去实现，让继承它的子类去实现，每个子类有不同的表现

```typescript
abstract class Animal{
    public name:string
    constructor(name:string){
        this.name = name
    }
    abstract say():string
}

//子类dog
class Dog extends Animal{
    constructor(name:string){
        super(name)
    }
    say(){
        return 'wangwang'
    }
}

let d = new Dog('xiaogou')
d.say()   //wangwang
```

## 5.TypeScript中的接口interface

> TypeScript中的接口类似java中的定义，起到一种限制和规范的作用。
>
> 在这个基础上新增了更加灵活的接口类型，包括属性、函数、可索引和类等

### 1.对批量方法传参进行约束

```typescript
interface Fullname{   //对对象的约束 属性接口
    firstName:string
    secondName:string
}
function print(name:FullName){           //直接使用FullName进行约束
    console.log(name.firstName,name.secondName)
}
let obj = {
    age:20
    firstName:'c',
    secondName:'j',
}
print(obj) //c j
```

### 2.接口的可选属性

```typescript
interface Fullname{   
    firstName:string
    secondName?:string   //使用？ 来声明这个属性可传可不传
}
```

### 3.函数类型接口

> 对函数进行约束

```typescript
interface encrypt{
    (key:string,value:string):string
}
let md5:encrypt = function(key:string,value:string):string{
    return key+value
}
md5("c","j")  //cj
```

### 4.可索引接口

> 对对象和数组的约束

+ 数组的约束

```typescript
interface UserArr{
    [index:number]:string            //下标为number类，为数组
}
let arr:UserArr = ['c','j']
console.log(arr[0])   //c
```

+ 对象的约束

```typescript
interface UserObj{
    [index:string]:string             //下标为字符类，为对象
}
let obj:UserObj = {name:'cj',age:'23'}
console.log(obj.name,obj.age) //cj 23
```

### 5.类类型接口

> 对类的约束，与抽象类有点相似

```typescript
interface Animal{
    name:string
    eat(str:string):void
}
class Dog implements Animal{
    name:string
    constructor(name:string){
        this.name = name
    }
    eat(){
        console.log(this.name+'吃狗粮')
    }
}
let dog = new Dog('dahuang')
dog.eat()  //dahuang 吃狗粮
```

### 6.接口的扩展

> 接口可以继承接口

```typescript
interface Human{
    eat():void
}
interface Man extends Human{
    work():void
}
class Boy implements Man{
    eat(){}
    work(){}
}
```

## 6.泛型

### 1.函数泛型

> 解决类、接口、方法、的复用性，以及对待不特定数据类型的支持
>
> 要求：传入的参数和返回的参数一致
>
> T表示泛型，具体说明类型是调用这个方法的时候决定的

```typescript
function getData<T>(value:T):T{
    return value
}
getData<number>(123)
getData<string>('123')         
```

### 2. 类的泛型

> 在定义类的时候设置泛型，根据传入不同的类型，来决定不同的类型校验

```typescript
class Fclass<T>{
    fn(value:T):T{          //传入泛型 
        return value
    }
}  								   //拥有可选的类型校验
let m1 = new Fclass<number>()      //number泛型
let m2 = new Fclass<string>()      //string泛型
```

### 3.泛型接口

> 在接口中定义泛型

```typescript
//第一种写法
interface Fn{
    <T>(value:T):T
}
let Get:Fn = function<T>(value:T):T{
    return value
}
Get<string>('cj')   //cj

//第二种写法
interface Fn<T>{
    (value:T):T
}
let myGet:Get<string> = function Get<T>(value:T):T{
    return value
}
myGet('cj')       //cj
```

 ## 7.命名空间

> 在代码量比较大的情况下，为了避免各种变量名冲突，可将相似功能的函数、类 、接口放置到命名空间内。属于一种内部模块。
>
> 与模块的差别：
>
> 命名空间：内部模块，主要用于组织代码，避免命名冲突
>
> 模块：侧重代码的复用，一个模块里可以有多个命名空间

```typescript
namespace A{
    export class Dog{}         //命名空间相当于一个内部模块 需要使用export暴露出去
    export class Cat{}
}
namespace B{
    export class Dog{}
    export class Cat{}
}
let dog1 = new A.Dog()
let dog2 = new B.Dog()
```

## 8.装饰器

> 是一种特殊类型的声明，它能够附加到类声明、方法、属性或参数上，可以修改类的行为
>
> 有类修饰器、方法修饰器、属性装饰器、参数修饰器等等
>
> 装饰器的写法：普通装饰器（无法传参）、装饰器工厂（可传参）

### 1.类装饰器

> 装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数
>
> 如果装饰器返回一个函数，它会使用提供的构造函数来替换类的声明

+ params 代表装饰对象
+ 装饰器会混入装饰对象，并自执行

```typescript
//类装饰器 
function logClass(params:any){
    console.log(params)              //params就是装饰对象
    params.prototype.apiUrl = '动态属性'
}
//使用
@logClass    //装饰器自执行
class HttpClient{
    constructor(){
    }
}
```

+ 装饰器工厂，能够传入参数。
+ 在写装饰器的时候，会返回一个函数。
+ 这个函数的参数是装饰对象

```typescript
function logClass(params:any){
  return function(value:any){
  console.log(params);   //传入的参数
  console.log(value);    //装饰对象

}

}
//使用
@logClass('cj')    //装饰器自执行
class HttpClient{
  constructor(){
 }
}                
//输出cj
```

### 2.属性装饰器

> 属性装饰器表达式会在运行时当作表达式被调用，传入下列两个参数
>
> 1. 对于静态成员来说是类的构造器，对于实例成员是类的原型
> 2. 成员的名字

```typescript
function logProperty(params:any){
    return function(target:any,attr:any){
        console.log(target)    //被装饰类的原型   通过这个简介操作类
        console.log(attr)      //属性
        target[attr] = params  //将参数传给原型上的attr属性
    }
}
class HttpClient{
    @logProperty('cj')
    public url:any | undefine
    constructor(){}
    getData(){
        console.log(this.url)
    }
}
```

### 3.方法装饰器

> 它会被应用到方法的属性描述符上，可以用来监视、修改或替换方法的定义
>
> 方法装饰会在运行时传入三个参数
>
> 1. 对于静态成员来说，是类的构造函数，对实例对象来说是类的原型对象
> 2. 成员的名字
> 3. 成员的属性描述符

```typescript
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
      method.apply(this)          //让原方法也能执行
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
```

### 4.方法参数装饰器

> 可以使用参数装饰器为类的原型增加一些元素数据，有三个参数
>
> 1. 对于静态成员来说，是类的构造函数，对实例对象来说是类的原型对象
> 2. 方法的名字
> 3. 参数在参数列表中的索引

### 5.装饰器的执行顺序

> 属性——》方法——》方法参数——》类