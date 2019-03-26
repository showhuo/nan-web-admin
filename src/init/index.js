import 'babel-polyfill'
import './bluebird'
import './unhandledrejection'
import 'normalize.css'

window.onload = function() {
  /*375代表设计师给的设计稿的宽度，你的设计稿是多少，就写多少;10代表换算比例，这里写10是
      为了以后好算,比如，你测量的一个宽度是10px,就可以写为1rem,以及1px=0.1rem等等*/
  getRem(1920, 10)
}
// 这里最好使用节流函数 throttle 包装
window.onresize = function() {
  getRem(1920, 10)
}
function getRem(pwidth, prem) {
  var html = document.getElementsByTagName('html')[0]
  var oWidth = document.body.clientWidth || document.documentElement.clientWidth
  html.style.fontSize = (oWidth / pwidth) * prem + 'px'
}
