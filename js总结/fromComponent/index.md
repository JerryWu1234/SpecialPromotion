#vue的hoc高阶组件
业务介绍：Vue+element Ui = 后端管理系统

优化element UI from表单组件在多个搜索条件时，代码臃肿的情况。

```vue
<HbForms
      :rules="rules"
      :formItemLists="formItemLists"
      @submitForm="functionc">
</HbForms>
export default {
    data() {
        return {
            rules: {
                one: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                ],
                two: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                three: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
            },
        },
        formItemLists: [
            {
                itemType:'inputNumber',
                prop:'one',
                label:'表单一',
                size: 'mini',
                width: 200,
                min: 20,
                step: 21,
                controlsPosition: "right",
                placeholder:'123452123',
            },
            {
                itemType:'input',
                prop:'namecvbvc',
                label:'表单二',
                width: 400,
            },
            {
                itemType:'autoComplete',
                prop:'names',
                label:'表单三',
                clearable: true,
            },
            {
                itemType:'button'
            },
        ]
    },
    methods: {
          functionc(valid){
          // 验证成功就会$emit('submitForm')
              console.log(valid)
          },
    }
}
```
![avatar](https://github.com/wulinsheng123/SpecialPromotion/blob/master/js%E6%80%BB%E7%BB%93/fromComponent/QQ20190520-162639-HD.gif)


支持element UI 全部属性

###部分代码：
```vue
<el-form-item
:key="index"
v-for="(item, index) in formItemLists"
:label="item.label"
:label-width = "item.labelWidth || '120px'"
:required="item.required"
:rules ="item.rules"
:show-message="item.showMessage || true"
:inline-message="item.inlineMessage || false"
:size="item.size || 'mini'"
:prop ="item.prop" >
<hbInput
    v-if="item.itemType === 'input'"
    @input="input" 
    :item="item"
    :value="params[item.prop]"
    v-on="$listeners">
<slotHtml :item="item" :slotName="val" v-for="(val, index) in item.slot" :key="index" :slot="val"></slotHtml>
</hbInput>
</el-form-item>

import {Input} from 'element-ui'

let hbInput = IntermediateFun(Input)

export default {
    provide () {
        return {
            item: this
        }
    },
    components:{
        hbInput,
        slotHtml: {
            inject:['item'],
            render(){
                const items = this.item

                const {slotName, item} = this.$attrs

                let val = items.$scopedSlots[slotName]({
                    items: item
                })
                return <div item={item}>{val}</div>

            }
        }
    }
}
```

start :

在组件上el-form-item通过v-for遍历数组formItemLists。

let hbInput = IntermediateFun(Input)中 "IntermediateFun" 是一个vue的HOC组件，不用手动传递props参数给element 组件。

"slotHtml" 组件接收到爷爷层传递过来的slot后，直接传递给elinput。

example :slotHtml的用法
```vue
<HbForms
      :rules="rules"
      :formItemLists="formItemLists"
      @submitForm="functionc">
      <el-button slot="append" icon="el-icon-search"></el-button>
</HbForms>
```
elinput表单就可以接收到slot-append属性

###核心HOC组件：

```js
export function IntermediateFun (WrappedComponent) {
    computed: {
         // 传递所有事件，同时增加双向绑定功能
        inputListeners: function () {
            let vm = this
            const {item} = this.$attrs
            // `Object.assign` 将所有的对象合并为一个新对象
            let funObj = {};
            for(let key in vm.$listeners){
                funObj[key]= vm.$listeners[key].bind(vm, vm.attrs)
            }
            return Object.assign({},
                // 我们从父级添加所有的监听器
                funObj,
                // 然后我们添加自定义监听器，
                // 或覆写一些监听器的行为
                {
                    // 这里确保组件配合 `v-model` 的工作
                    input: function (event) {
                        vm.$emit('input', {event,attrs: item})
                    }
                }
            )
        }
    },
    render (h) {
        const {item, value} = this.$attrs
        // 将 this.$slots 格式化为数组，因为 h 函数第三个参数是子节点，是一个数组
        const slots = Object.keys(this.$slots)
            .reduce((arr, key) => arr.concat(this.$slots[key]), []).map(vnode => {
                vnode.context = this._self
                return vnode
            })

        let newProps = Object.assign({...this.$props}, item, {value: value})
        return h(WrappedComponent, {
            on: this.inputListeners,
            attrs: this.attrs,
            props: newProps,
            style: item.width? `200px` : `${item.width}px`,
            $scopedSlots: this.$scopedSlots
        }, slots) // 将 slots 作为 h 函数的第三个参数
    }
}
```



通过$listeners属性连接所有$on,$emit事件，然后根据vue官网提供的input方法实现双向绑定。

IntermediateFun 方法可以从上层接收所有props和$on，然后直接传递给element ui组件,也可以初始化子组件默认值。


end:
```js
 submitForm(formName) {
    this.$refs[formName].validate((valid) => {
        if (valid) {
            this.$emit('submitForm',valid)
        } else {
            this.$message.error('请检查您提交的表单内容')
            return false;
        }
    });
},
```
最后表单验证通过$emit('submitForm',valid)通知上层该执行其他方法了。



