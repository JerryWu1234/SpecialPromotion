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