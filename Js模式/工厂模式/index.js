const Factory1 = function (name, val) {
    if(this instanceof Factory){
        this[name](val)
    }else {
        return new Factory(name, val)
    }
}
Factory.prototype = {
    javascript (val) {
        console.log(`${val}javascript`)
    },
    nodejs (val) {
        console.log(`${val}nodejs`)
    }
}

const Factory2 = function () {
    this.obj = {}
    this.obj.javascript = function() {
        console.log('javascript')
    }
    return this.obj
}
