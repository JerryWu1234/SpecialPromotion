const once = fn => {
    let state = true
    return function (...arg) {
        if(!state) return
        fn.apply(this,arg)
        state = false
    }
}
