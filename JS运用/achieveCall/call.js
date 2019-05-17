Function.prototype.calls = function(context, ...are){
    context = context || window
    context.fn = this
    let res = context.fn(...are)
    delete context.fn
    return res
}
Function.prototype.apply1 = function(context, are){
    context = context || window
    context.fn = this
    are = are || [];
    let res = context.fn(...are)
    delete context.fn
    return res
}