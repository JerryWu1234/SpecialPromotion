export const on = (function(){
    if(document.addEventListener){
        return function(element, event, handle){
            element.addEventListener(event, handle, false)
        }
    }else{
        return function (element, event, handle) {
            element.attachEvent('on' + event, handle)
        }
    }
})()

export const off = (function(){
    if(document.removeEventListener){
        return function(element, event, handle){
            element.removeEventListener(event, handle, false)
        }
    }else{
        return function (element, event, handle) {
            element.detachEvent('on' + event, handle)
        }
    }
})()


//优化复复杂底层接口复杂性，也可以解决浏览器兼容性问题
