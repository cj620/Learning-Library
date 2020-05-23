let  sw = 20, //单位宽度
     sh = 20, //单位高度
     tr = 30, //行数
     td = 30; //列数
let snake = null        //蛇的实例

function Square(x,y,classname){        //方块类
  this.x = x*sw
  this.y = y*sh
  this.class = classname             //方块属性
  

  this.viewContent = document.createElement('div')       
  this.viewContent.className = this.class                  //将方块转换成dom对象
  this.parent = document.getElementById('snakewrap')       //找到方块安放的容器

}

Square.prototype.create = function(){
  this.viewContent.style.position = "absolute"        //创建方块方法
  this.viewContent.style.width = sw +'px'             //大小 坐标
  this.viewContent.style.height = sh +'px'
  this.viewContent.style.left = this.x+'px'
  this.viewContent.style.top = this.y +'px'

  this.parent.appendChild(this.viewContent)          //创建完之后，加入容器
}

Square.prototype.remove = function(){
  this.parent.removeChild(this.viewContent)
}


//🐍

function Snake(){
  this.head = null    //蛇头
  this.tail = null    //蛇尾
  this.pos = []       //蛇身
  this.directionNum = {}
}
Snake.prototype.init = function(){          //初始化
 let snakehead = new Square(2,0,'snakehead')
 snakehead.create()
this.head = snakehead       //存储蛇头信息
this.pos.push([2,0])        //把蛇头的位置存起来
 
//创建蛇身
let snakebody1 = new Square(1,0,'snakebody')
snakebody1.create()
this.pos.push([1,0])

let snakebody2 = new Square(0,0,'snakebody')
snakebody2.create()
this.tail = snakebody2
this.pos.push([0,0])

//形成链表关系

snakehead.last = null
snakehead.next = snakebody1

snakebody1.last = snakehead
snakebody1.next = snakebody2

snakebody2.last = snakebody1
snakebody2.next = null
}

snake= new Snake()
snake.init()