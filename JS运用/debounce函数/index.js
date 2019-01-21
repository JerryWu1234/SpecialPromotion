const debounce = (fn,tm = 100) =>{
    let func = ''
    return function (...arg) {
        clearInterval(func)
        let func = setTimeout(() => fn.apply(this, arg), tm)
    }
}
