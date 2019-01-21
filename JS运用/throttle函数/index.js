const throttle = (fn, waitTime = 100) => {
    let firstExecution, lastFn, lastTime;
    return function(...args) {
        if ( !firstExecution ) {
            fn.apply(this, args)
            firstExecution = false
            lastTime =  new Date()
        } else {
            clearTimeout(lastFn)
            lastFn = setTimeout(() => {
                if((new Date() - lastTime) >= waitTime){
                    fn.apply(this, args)
                    lastTime = new Date()
                }
            }, Math.max((lastTime - (new Date() - lastTime)),0))
        }
    }
}
