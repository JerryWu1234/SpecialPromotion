export function IntermediateFun (WrappedComponent) {
    return {
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
        // 渲染函数，同时传递自己需要的额外属性
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
}