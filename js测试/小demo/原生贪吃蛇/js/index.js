let  sw = 20, //单位宽度
     sh = 20, //单位高度
     tr = 30, //行数
     td = 30; //列数
let snake = null,    //蛇的实例
     food = null,  //食物的实例
     game = null
    //  score = 0


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
  this.directionNum = {
    left:{
      x:-1,
      y:0
    },
    right:{
      x:1,
      y:0
    },
    top:{
      x:0,
      y:-1
    },
    down:{
      x:0,
      y:1
    }
  }
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

//默认蛇走的方向
this.direction = this.directionNum.right
}

//获取蛇头的下一个位置，并设置事件
Snake.prototype.getNextPos = function () {
  let nextPos = [
    this.head.x/sw+this.direction.x,            //蛇头要走的下一个位置
    this.head.y/sh+this.direction.y
  ]
  //运动判断
//下一个点是自己，代表撞到自己，游戏结束
let selfCollied = false
this.pos.forEach(function(value){
  if(value[0]==nextPos[0] && value[1]==nextPos[1]){
    selfCollied = true
  }
})
if(selfCollied){
  console.log("碰到自己了");
  this.strategies.die.call(this)
  return
}


//下一个点是围墙，  游戏结束

if(nextPos[0]<0 || nextPos[1]<0 || nextPos[0]>tr-1 || nextPos[1]>td-1){
  this.strategies.die.call(this)
  return
}


//下一个点是食物，长度加一
// this.strategies.eat.call(this)
if(food && food.pos[0]==nextPos[0] && food.pos[1]==nextPos[1]){
    this.strategies.eat.call(this)
  return
}

//下一个点什么都不是，蛇头移动加一
this.strategies.move.call(this)
}

//处理碰撞后的事情
Snake.prototype.strategies = {
  move:function(format){                    //format决定要不要删除尾部元素，传了就表示为吃，也就是不删除尾部元素
    //创建新的身体（在旧蛇头的位置
    let newBody = new Square(this.head.x/sw,this.head.y/sh,"snakebody")
    //跟新链表关系
    newBody.last = null
    newBody.next = this.head.next
    newBody.next.last = newBody

    
    this.head.remove()
    newBody.create()

    //创建新的蛇头
    let newHead = new Square(this.head.x/sw+this.direction.x,this.head.y/sh+this.direction.y,"snakehead")
    newHead.last = null
    newHead.next = newBody
    newBody.last = newHead
    newHead.create()

    //蛇身的每一块的坐标也要跟新
    this.pos.splice(0,0,[this.head.x/sw+this.direction.x,this.head.y/sh+this.direction.y])
    this.head = newHead




    if(!format){ //如果foemat为false，表示需要删除除了吃之外的操作
      this.tail.remove()
      this.tail = this.tail.last

      snake.pos.pop()
      
    }

  },
  eat:function(){
    this.strategies.move.call(this,true)
    game.score++
    createFood()

  },
  die:function(){
    console.log("die");
    game.over()
  }
} 



snake= new Snake()

function createFood(){
  //坐标
  let x = null
  let y = null
  let include = true

  while(include){
    x= Math.round(Math.random()*(td-1))   //Math.Round为四舍五入
    y= Math.round(Math.random()*(tr-1)) 

    snake.pos.forEach(function(value){
      if(x!=value[0]&&y!=value[1]){
        include = false
      }
    })
  }

  food = new Square(x,y,"food")
  food.pos = [x,y]           //存储食物的坐标

  let foodDom = document.querySelector('.food')
  if(foodDom){
    foodDom.style.left = x*sw+'px'
    foodDom.style.top = y*sh+'px'
  }else{
    food.create()
  }
}



//创建游戏逻辑

function Game(){
  this.timer = null
  this.score = 0
}
Game.prototype.init = function(){
  snake.init()
  // snake.getNextPos()
  createFood()
//添加键盘事件

  document.onkeydown = function(ev){     //键盘事件  左37 上38 右39 下40
    // console.log(ev);
    if(ev.keyCode == 37 && snake.direction != snake.directionNum.right){   //当蛇正在向左走的时候，方向不能变换为右，因为蛇身会重叠
      snake.direction = snake.directionNum.left
    }else if(ev.keyCode == 38 && snake.direction != snake.directionNum.down){
      snake.direction = snake.directionNum.top
    }else if(ev.keyCode ==39 && snake.direction != snake.directionNum.left){
      snake.direction = snake.directionNum.right
    }else if(ev.keyCode ==40 && snake.direction != snake.directionNum.top){
      snake.direction= snake.directionNum.down
      
    }
    
  }
  this.start()
}

Game.prototype.start = function(){ //开始游戏
  this.timer = setInterval(function(){
    snake.getNextPos()
  },50)
}
Game.prototype.pause = function(){
  clearInterval(this.timer)
}
Game.prototype.over = function(){
  clearInterval(this.timer)
  alert("得分为"+this.score)
  
//回到游戏最初状态
let snakeWrap = document.getElementById('snakewrap')
snakeWrap.innerHTML=''

snake = new Snake()
game = new Game()
let startBtnWrap = document.querySelector('.startBtn')
startBtnWrap.style.display = 'block'
}

//开始游戏
game = new Game()
let startBtn = document.querySelector('.startBtn button')
startBtn.onclick = function(){
  startBtn.parentNode.style.display = 'none'
  game.init()
}

let snakeWrap = document.getElementById('snakewrap')
let pauseBtn = document.querySelector('.pauseBtn button')
snakeWrap.onclick = function(){
  game.pause()
  pauseBtn.parentNode.style.display = 'block'
}

pauseBtn.onclick = function(){
  game.start()
  pauseBtn.parentNode.style.display = 'none'
}