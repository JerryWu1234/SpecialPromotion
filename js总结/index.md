# js 心得

###js函数方法

#### 函数式对象

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

#### 函数中的 return

_1.函数中的 return 会中断下面的执行_

---

#### compositionstart compositionend compositionupdate 的区别

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

####  插件中不同环境的配置

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

#### 阻止 in 遍历到原型链到方法

```js
object.hasOwnProperty(name)
```

####箭头函数

箭头函数因为默认指向最外层作用域，在写带 this 作用域的函数时尽量用普通函数


####bind函数的写法

```js

const bind = (fn, context, ...arg) => (..args) => (fn.apply(context,[...arg,...args]))
```

####js的异步时间的

```js
宏任务：包括整体代码script，setTimeout，setInterval
微任务：Promise.then(非new Promise)，process.nextTick(node中)

事件循环，先执行宏任务，
其中同步任务立即执行，异步任务，
加载到对应的的Event Queue中(setTimeout等加入宏任务的Event Queue，Promise.then加入微任务的Event Queue)，
所有同步宏任务执行完毕后，如果发现微任务的Event Queue中有未执行的任务，会先执行其中的任务，这样算是完成了一次事件循环。
接下来查看宏任务的Event Queue中是否有未执行的任务，有的话，就开始第二轮事件循环，依此类推。
```

####Vue的props

父组件传给子组件值时（对象，数组），子组件修改数据父组件同时会修改。
传给子组件如果是字符串，数字类型，子组件修改需要用this.$emit('update:val')修改

---
---
---



###js DOM操作

####区分是移动端还是桌面

```js
const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ? 'Mobile'
    : 'Desktop';
```


####父Dom中是否包含子dom

```js

const elementContains = (parent, child) => parent !== child && parent.contains(child);

```

####获取指定css值

```js

const getStyle = (el,className) => getComputedStyle(el)[className]


```

#### 检验class是否存在

```js
    
    hasClass  =  (el, className) => el.classList.contains(className);
    
```

#### dom元素插入

```js

const insertAfter = (el,htmlString) => el.insertAdjacentHTML('afterend',htmlString)

```
```
<!-- beforebegin --> 
<p> 
<!-- afterbegin -->
foo
<!-- beforeend -->
</p>
<!-- afterend -->
```
insertAdjacentHTML函数的4个参数


####监听dom的变化

```js
const observeMutations = (element, callback, options) => {
  const observer = new MutationObserver(mutations => mutations.forEach(m => callback(m)));
  observer.observe(
    element,
    Object.assign(
      {
        childList: true, //观察目标节点的子节点的新增和删除。
        attributes: true, //观察目标节点的属性节点(新增或删除了某个属性,以及某个属性的属性值发生了变化)。
        attributeOldValue: true, // 在attributes属性已经设为true的前提下, 将发生变化的属性节点之前的属性值记录下来(记录到下面MutationRecord对象的oldValue属性中)
        characterData: true, // 如果目标节点为characterData节点(一种抽象接口,具体可以为文本节点,注释节点,以及处理指令节点)时,也要观察该节点的文本内容是否发生变化
        characterDataOldValue: true, // 在characterData属性已经设为true的前提下,将发生变化characterData节点之前的文本内容记录下来(记录到下面MutationRecord对象的oldValue属性中)
        subtree: true //观察目标节点的所有后代节点(观察目标节点所包含的整棵DOM树上的上述三种节点变化)
      },
      options
    )
  );
  return observer;
};

const obs = observeMutations(document, console.log); // Logs all mutations that happen on the page
obs.disconnect(); 
```
####指定子元素添加添加事件

```js
e.target.matches('a.btn')
```

####设置样式

```js

const setStyle = (el, className, val) => (el.style[className] = val)

```

#### 切换className

```js

const toggleClass = (el, className) => el.classList.toggle(className)

```

#### 页面渲染

1.局部变量访问比全局快
2.对象嵌套越深需要查找的时间越久，原型链亦是如此
3.操作DOM造成对重绘重排对代价非常高
3.避免使用in去遍历，因为会遍历原型上对方法
4.借助webpack等工具对静态资源进行优化


###页面关闭前的监听事件

浏览器有两个事件可以用来监听页面关闭，beforeunload和unload

##beforeunload
beforeunload是在文档和资源将要关闭的时候调用的， 这时候文档还是可见的，
并且在这个关闭的事件还是可以取消的。比如下面这种写法就会让用户导致在刷新或者关闭页面时候，
有个弹窗提醒用户是否关闭。

##unload
unload则是在页面已经正在被卸载时发生，此时文档所处的状态是：
1.所有资源仍存在（图片，iframe等）；
2.对于用户所有资源不可见；
3.界面交互无效（window.open, alert, confirm 等）；
4.错误不会停止卸载文档的过程。


```js
window.addEventListener("beforeunload", function (event) {
  // Cancel the event as stated by the standard.
  event.preventDefault();
  // Chrome requires returnValue to be set.
  event.returnValue = '';
});
```