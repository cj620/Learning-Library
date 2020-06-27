import './index.css';
import './dd.css';
import print from './print'

const a = [];
a.push('11');

if(module.hot){
  module.hot.accept('./print.js',function(){
    print()
  })
}