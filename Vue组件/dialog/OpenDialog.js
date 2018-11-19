import Vue from 'vue'
import Dialog from './Dialog'

export function openDialog ({options, slots, slotData = {}, callback}) {
    const _options = Object.assign({}, options)
    const beforeCreate = function () {
        if (typeof slots === 'string') { slots = {default: slots} }
        // compile slots to vNodes
        Object.keys(slots).forEach(key => {
            const renderer = Vue.compile(slots[key])
            const slotCtx = {
                data () {
                    return typeof slotData === 'function' ? slotData.call(this) : slotData
                },
                render: renderer.render,
                staticRenderFns: renderer.staticRenderFns,
                components: options.components || {}
            }
            slots[key] = [this.$createElement(slotCtx)]
        })
        Object.assign(this.$slots, slots)
    }
    if (_options.beforeCreate) {
        _options.beforeCreate = [_options.beforeCreate, beforeCreate]
    } else {
        _options.beforeCreate = beforeCreate
    }
    if (!_options.propsData) {
        _options.propsData = {visible: true}
    } else if (_options.propsData.visible === undefined) {
        _options.propsData.visible = true
    }

    const vm = new (Vue.extend(Dialog))(_options)
    callback && callback(vm)

    return new Promise((resolve, reject) => {
        const zIndex = Array.from(document.all)
            .map(e => +window.getComputedStyle(e).zIndex || 0)
            .reduce((acc, val) => val > 999 ? acc : Math.max(acc, val), 9)
        vm.$mount()
        vm.$el.zIndex = zIndex
        document.body.appendChild(vm.$el)

        const detach = () => {
            vm.$destroy()
            vm.$el.parentNode.removeChild(vm.$el)
        }

        vm.$on('confirm', e => { detach(); vm.$nextTick(() => resolve(e)) })
        vm.$on('close', e => { detach(); vm.$nextTick(() => resolve(e)) })
        vm.$on('cancel', e => { detach(); vm.$nextTick(() => resolve(e)) })
        vm.$on('yes', e => { detach(); vm.$nextTick(() => resolve(e)) })
        vm.$on('no', e => { detach(); vm.$nextTick(() => reject(e)) })
    })
}
