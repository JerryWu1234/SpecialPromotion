//提前执行
Function.prototype.before = function (fn) {
    let self = this
    return function () {
        fn.apply(this, arguments)
        return self.apply(this, arguments)
    }
}
//延后执行
Function.prototype.after = function (fn) {
    let self = this
    return function () {
        let val = self.apply(this, arguments)
        fn.apply(this,arguments)
        return val
    }
}
