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
