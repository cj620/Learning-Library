let str:string='hello'
interface FullName{
  firstName:string
  secondName:string
}
function print(name:FullName){
  console.log(name.firstName,name.secondName)
}
let obj = {
  age:20,
  firstName:'c',
  secondName:'j'
}
print(obj)