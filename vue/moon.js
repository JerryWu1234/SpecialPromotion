class Compiler {
    constructor(vm, el, data) {
        this.vm = vm;
        this.data = data
        this.el = this.isDocument(el) ? el : document.querySelector(el);
        const fatMat = this.node2Fatmat(this.el)
        this.compiler(fatMat)
        this.el.appendChild(fatMat)

    }
    isDocument(el) {
        return el.nodeType === 1
    }
    node2Fatmat(node) {
        const listS = document.createDocumentFragment();
        let first;
        while (first = node.firstChild) {
            listS.appendChild(first)
        }
        return listS
    }
    compiler(node) {
        node.childNodes.forEach((item, index) => {
            if(this.isDocument(item)){
                this.compilerElement(item)
                this.compiler(item)
            }else{
                this.compilerText(item)
            }
        })
    }

    compilerText(item) {
    // \
        // console.log(item.attributes)
        // console.log(item)
       // console.log(this.isText(item.textContent))
        const content = item.textContent
        const pat = new RegExp(/\{\{(.+?)\}\}/)
        if(pat.test(content)){
            CompilerUtil['text'](item, this.vm, content)
        }
    }
    compilerElement(item) {
        const attributes = item.attributes
        for(let i = 0; i < attributes.length; i++) {
            let {value, name} = attributes[i]
            if(this.isDirective(name)){
                const n = name.slice(2,name.length)
                CompilerUtil[n](value, this.vm, item)
            }
        }
    }
    isText(str) {
        const pat = new RegExp(/\{\{(.+?)\}\}/)
        return pat.test(str)
    }
    isDirective(str) {
        return str.startsWith('v-')
    }
}

const CompilerUtil = {
    model(value, vm, item){
        const currentVal = this.getVal(value,vm.$data)
        this.update['updateModel'](item, currentVal);
    },
    text(item, vm, content) {
        const  text = content.replace(/\{\{(.+?)\}\}/g, (...arg) => {
            return this.getVal(arg[1],vm.$data)
        })
        this.update['updateHtml'](item, text)
    },
    html() {},
    getVal(value, datas) {
       return value.split('.').reduce((data, item) => {
                return data[item]
        },datas)
    },
    update: {
        updateHtml(item, value) {
            item.textContent = value
        },
        updateModel(item, value) {
            item.value = value
        },
    }
}
class Observer {
    constructor(data, vm) {
        if(this.isObject(data)){
            this.observer(data, vm)
        }
    }
    defineReactive(key, value, data){
        Object.defineProperty(data, key, {
            get() {
                return value
            },
            set(newValue) {
                data[key] = newValue
            },
        })
    }
    observer(data, vm) {
        for(let key in data){
            if(data.hasOwnProperty(key)){
                if (this.isObject(data[key])) {
                    this.observer(data[key], vm)
                } else {
                    this.defineReactive(key, data[key], data)
                }
            }
        }

    }
    isObject(val) {
        return typeof val === 'object' && !(Array.isArray(val))
    }
}

class Watcher {
    
}
class Vue {
    constructor(options) {
        // 检测有没有 new
        if(!(this instanceof Vue)) return
        const {data, el} = options;
        this.$data = data;
        this.$el = el;
        new Compiler(this, this.$el, this.$data)
        new Observer(this.$data, this)
        console.log(this.$data)
    }
}

