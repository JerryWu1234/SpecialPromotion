# js 心得

## 函数式对象

```js
let func = function() {
  this.name = 1
}
func.name = 2
```

`console.log(func.name)`优先会输出 2
输出`console.log(func)`不会是一个对象而是一个函数
for(let x of func) 会报错，只能用 in 去循环
例：

```
function() {
  this.name = 1
}
```

---

## 函数中的 return

_1.函数中的 return 会中断下面的执行_

---

## compositionstart compositionend compositionupdate 的区别

 事件触发于一段文字的输入之前

```js
//事件触发于一段文字的输入之前
addEventListener('compositionstart', event => {})

//事件触发于一段文字的输入中间
addEventListener('compositionupdate', event => {})

//事件触发于一段文字的输入结束
addEventListener('compositionend', event => {})
```

`event.data`当前拼音收入的文字
`event.type`当前触发的哪个事件

##  插件中不同环境的配置

不同环境下的  全局变量

```js
var root =
  (typeof self == 'object' && self.self == self && self) ||
  (typeof global == 'object' && global.global == global && global) ||
  this ||
  {}
// root = this
```

 不同规范下的导出的方式

```js
if (typeof exports != 'undefined' && !exports.nodeType) {
  if (typeof module != 'undefined' && !module.nodeType && module.exports) {
    exports = module.exports = _
  }
  exports._ = _
} else {
  root._ = _
}
```

---

## 阻止 in 遍历到原型链到方法

```js
object.hasOwnProperty(name)
```

##箭头函数

箭头函数因为默认指向最外层作用域，在写带 this 作用域的函数时尽量用普通函数
