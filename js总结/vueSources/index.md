#VUE源码笔记

###Vue构造函数

1.stateMixin js中
不能对$data 和 $props进行设置，两个属性只有只读功能

```js

propsDef.set = function () {
      warn(`$props is readonly.`, this)
    }
// Vue.options初始化 

Vue.options = {
	components: {
		KeepAlive,
		Transition,
		TransitionGroup
	},
	directives: {
		model,
		show
	},
	filters: Object.create(null),
	_base: Vue

}

```

总结:初始化全局的api，把公共的方法添加到prototype上，把公共的指令和组件混合到vue.options上，
初始化一些变量、组件、公共方法

###以一个例子为线索

当new Vue(options)是会初始化执行 this._init()函数 并将options作为参数传递给_this.init

通过isVue判断是不是vue实例

Vue.extend()函数将父类和子类options里的数据混合了在一个options里面

config.optionMergeStrategies是指定合并的方式


###Vue 选项的规范化

vue 中DATA数据最终都被处理成一个返回对象的函数
为保证每个data副本的唯一性，避免数据相互之间的影响

合并对象核心函数是mergeData

mergeData 可以传入from 和 to两个参数，最终返回to，遍历from当to上也有from 的key时候会进行深度的递归遍历

###Vue的合并规则，

通过Vue.extend 合并的子组件最后都生成一个数组

```js
created: [
    function () {
      console.log('first')
    },
    function () {
      console.log('second')
    },
    function () {
      console.log('third')
    }
  ]
```
data数据合并的规则

```js
function mergeData (to: Object, from: ?Object): Object {
  // 没有 from 直接返回 to
  if (!from) return to
  let key, toVal, fromVal
  const keys = Object.keys(from)
  // 遍历 from 的 key
  for (let i = 0; i < keys.length; i++) {
    key = keys[i]
    toVal = to[key]
    fromVal = from[key]
    // 如果 from 对象中的 key 不在 to 对象中，则使用 set 函数为 to 对象设置 key 及相应的值
    if (!hasOwn(to, key)) {
      set(to, key, fromVal)
    // 如果 from 对象中的 key 也在 to 对象中，且这两个属性的值都是纯对象则递归进行深度合并
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal)
    }
    // 其他情况什么都不做
  }
  return to
}
//将 from上的数据合并到了to上，并进行深度递归

```

###Vue 的初始化之开篇

if(hasProxy)主要是为了检测是否支持proxy

初始化函数中 initLifecycle 指定$parent 、$root、 $children属性的值，让其关联。
初始化部分属性的值
```js
vm._watcher = null
  vm._inactive = null
  vm._directInactive = false
  vm._isMounted = false
  vm._isDestroyed = false
  vm._isBeingDestroyed = false
```
components 组价解析实际是通过Vue.extend

初始化完生命周期函数之后会初始化事件函数initEvents
并在实例上添加2个方法
```js
 vm._events = Object.create(null)
  vm._hasHookEvent = false
```