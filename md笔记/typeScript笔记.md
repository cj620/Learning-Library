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

## 5.TypeScript中的接口

> TypeScript中的接口类似java中的定义，起到一种限制和规范的作用。
>
> 在这个基础上新增了更加灵活的接口类型，包括属性、函数、可索引和类等