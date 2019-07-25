const debounce = (fn,tm = 100) =>{
    let func = ''
    return function (...arg) {
        clearInterval(func)
         func = setTimeout(() => fn.apply(this, arg), tm)
    }
}
