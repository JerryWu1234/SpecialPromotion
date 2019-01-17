/**
 * @param state 0, 1, 2(pending, fulfilled, rejected)
 * **/
function noop() {}

let  LAST_ERROR = null

const IS_ERROR = {}

function getThen(obj) {
    try {
        return obj.then
    } catch (e) {
        LAST_ERROR = e
        return IS_ERROR
    }
}

function tryCallOne(fn, a) {
    try {
        return fn(a)
    } catch (e) {
        LAST_ERROR = e
        return IS_ERROR
    }

}

function tryCallTwo(fn, a, b) {
    try {
        return fn(a,b)
    } catch (e) {
        LAST_ERROR = e
        return IS_ERROR
    }

}

function reject(self, reason) {
    self._state = 2;
    self._value = reason;
}

function doResolve(promise, fn) {
    let done = false
    let res = tryCallTwo(fn,
            function(newVal){
                if(done) return
                done = true
                resolve(promise, newVal)
            },
            function(reason){
                if(done) return
                done = true
                reject(promise, reason)
            }
        )
    if(!done && res === IS_ERROR) {
        reject(promise, IS_ERROR)
    }
}

function resolve(self, newValue) {
    if(newValue === self){
        return reject(self,
            new TypeError('A promise cannot be resolved with itself.')
        )
    }
    if(newValue && (typeof newValue === 'function' || typeof newValue === 'object')) {
        let then = getThen(newValue)
        if(then === IS_ERROR) {
            return reject(self, LAST_ERROR)
        }
        if(then === self.then && newValue instanceof Promise){
            self._state = 3
            self._value = newValue
            finale(self)
            return
        }
        if(typeof newValue === 'function'){
            doResolve(then.bind(newValue), self)
            return
        }
    }
    self._value = newValue
    self._state = 1

}

function finale (self) {
    if (self._deferredState === 1) {
        debugger
        handle(self, self._deferreds);
        self._deferreds = null;
    }
    if (self._deferredState === 2) {
        for (let i = 0; i < self._deferreds.length; i++) {
            handle(self, self._deferreds[i]);
        }
        self._deferreds = null;
    }

}

Promise.resolve = function (val) {
    return new Promise(function(resolve){
        resolve(val)
    })
}
function Promise(fn) {
    if(typeof this !== 'Object') {
         new TypeError('Promises must be constructed via new')
    }
    if(typeof fn !== 'function'){
        throw new TypeError('promise contructor argument ar not function')
    }
    if(fn === noop){
         new TypeError('fn is not invalid function')
    }
    this._deferredState = 0
    this._state = 0
    this._value = null
    this._deferreds =  null
    doResolve(this, fn)
}

Promise.prototype.then = function(onFulfilld, onReject) {
    let res = new Promise(noop)
    handle(this, new Handler(onFulfilld, onReject, res))
    return res
}

function handle(self, deferred) {
    while (self._state === 3) {
        self = self._value;
    }
    if(self._state === 0) {
        if(self._deferredState === 0) {
            self._deferredState = 1
            self._deferreds = deferred
            return
        }
        if(self._deferredState === 1) {
            self._deferredState = 2
            self._deferreds = [self._deferreds, deferred]
            return
        }
        self._deferreds.push(deferred)
        return
    }
    handleResolve(self, deferred)
}

function handleResolve(self, deferred) {
    setTimeout(()=>{
        let cb = self._state === 1 ? deferred.onFulfilld : deferred.onReject
        if(cb === null){
            if(self._state === 1){
                resolve(deferred.promise, self._value)
            }else{
                reject(deferred.promise, self._value)
            }
            return
        }
        let result = tryCallOne(cb, self._value)
        if(result === IS_ERROR){
            reject(deferred.promise, LAST_ERROR)
        }else{
            resolve(deferred.promise, result)
        }
    })
}

function Handler(onFulfilld, onReject, promise) {
    this.onFulfilld = typeof onFulfilld === 'function' ? onFulfilld : null
    this.onReject = typeof onReject === 'function' ? onReject : null
    this.promise = promise
}
