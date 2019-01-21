// ES5语法
function sub (fn) {
    let arg = Array.from(arguments).slice(1)
    return function () {
        return  fn.apply(this,[...arg,...arguments])
    }
}
function currying (fn,length) {
    return function () {
        let extent = length || fn.length
        if(arguments.length < extent) {
            return currying(sub.apply(this,[fn,...arguments]),extent - arguments.length)
        }else{
            return fn.apply(this,arguments)
        }
    }

}
// ES6语法

// let currying_1 = (fn) =>
//     sub = (...arg) => {
//         return fn.length === arg.length ?
//             fn(...arg) : (args) => sub.bind(null,...arg,args)
//
//     }
//
