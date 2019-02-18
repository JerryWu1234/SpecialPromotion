function parent () {
    this.name = ''
}
parent.prototype.obtain = function () {
    console.log('sd')
}

function child() {
    parent.call(this)
}

child.prototype = Object.create(parent.prototype)
child.prototype.special = function () {
    console.log('额外增加的')
}

new child()
