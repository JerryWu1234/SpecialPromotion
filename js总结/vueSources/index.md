#VUE源码笔记

执行过程
new Vue()


###1._init(options)

   初始化数据，执行生命钩子函数的create 函数，初始化Vue原型链上的属性
```js
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')

```
####options初始化
    //通过mergeOptions函数初始化后的options对象
        Vue.options = {
            components: {
                KeepAlive
                Transition,
                TransitionGroup
            },
            directives:{
                model,
                show
            },
            filters: Object.create(null),
            _base: Vue
        }
    ————————————————————————————————————————————————————
    初始化options 添加options上的初始化属性

    对props mixin写法进行统一的规范处理
 
    vue.extend函数的合并到一个对象上

    $props,$data添加get和set依赖 
 
   
    
    options中的data经过mergeData(to,from)函数处理后从始至终都会返回一个函数。mergeData函数将from合并到to上并返回to
    
    利用vue.extend合并watch，父子组件同时有watch 会将它合并成数组
    
    对于 props、methods、inject、computed 选项，父选项始终可用，但是子选项会覆盖同名的父选项字段。
    
    对于 provide 选项，其合并策略使用与 data 选项相同的 mergeDataOrFn 函数。
    
    以上没有提及到的选项都将使默认选项 defaultStrat。
    
    默认合并策略函数 defaultStrat 的策略是：只要子选项不是 undefined 就使用子选项，否则使用父选项。
####initLifecycle

    export function initLifecycle (vm: Component) {
      // 定义 options，它是 vm.$options 的引用，后面的代码使用的都是 options 常量
      const options = vm.$options
    
      // locate first non-abstract parent
      let parent = options.parent
      if (parent && !options.abstract) {
        while (parent.$options.abstract && parent.$parent) {
          parent = parent.$parent
        }
        parent.$children.push(vm)
      }
    
      vm.$parent = parent
      vm.$root = parent ? parent.$root : vm
    
      vm.$children = []
      vm.$refs = {}
    
      vm._watcher = null
      vm._inactive = null
      vm._directInactive = false
      vm._isMounted = false
      vm._isDestroyed = false
      vm._isBeingDestroyed = false
    }
    初始化执行vm._self = vm
    
     prototype上添加 _update，$forceUpdate,$destroy
    
    初始化函数中 initLifecycle 指定$parent 、$root、 $children属性的值，让其关联。
    
    abstract属性是抽象的意思，不会渲染成DOM
      
#### initEvent
    初始化
    
    vm._events = Object.create(null)
    vm._hasHookEvent = false
    // init parent attached events
    const listeners = vm.$options._parentListeners
      
    prototype上添加$on,$once,$off,$emit 
    
####initState
    
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')
    
    export function initState (vm: Component) {
      vm._watchers = []
      const opts = vm.$options
      if (opts.props) initProps(vm, opts.props)
      if (opts.methods) initMethods(vm, opts.methods)
      if (opts.data) {
        initData(vm)
      } else {
        observe(vm._data = {}, true /* asRootData */)
      }
      if (opts.computed) initComputed(vm, opts.computed)
      if (opts.watch && opts.watch !== nativeWatch) {
        initWatch(vm, opts.watch)
      }
    }
    
    初始化props,data computer 等属性，检查Key值是否有冲突
    
    proxy 代理可以让data数据可以直接被访问
    
    export function proxy (target: Object, sourceKey: string, key: string) {
      sharedPropertyDefinition.get = function proxyGetter () {
        return this[sourceKey][key]
      }
      sharedPropertyDefinition.set = function proxySetter (val) {
        this[sourceKey][key] = val
      }
      Object.defineProperty(target, key, sharedPropertyDefinition)
    }
    
    数组收集依赖处理方法，
    1.重新包裹数组函数
    2.兼容IE使用getOwnPropertyNames更改key名
    
    对新增的数据添加新增观察关系
###2.this.stateMixin
    

###3.this.eventsMixin
       
   

###4.this.lifecycleMixin
    
  

###5.this.renderMixin
   