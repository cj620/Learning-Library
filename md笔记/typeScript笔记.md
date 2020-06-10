# typeScript笔记

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

## 3.函数的定义

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
    return "${name}--${age}"
}
```

### 3.可选参数和默认参数

> 可选参数可以使用"?"来代表传或者不传 ，可选参数最好配置在参数列表的最后边
>
> 默认参数，代表如果有传参则使用新参，没有传参则使用默认参数

```typescript
function fn(name:string,age:number=20,sex?:boolean):string{
    return "${name}----${age}---${sex}"
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

