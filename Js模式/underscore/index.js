void (function(win) {
    let root =
        (typeof self == 'object' && self.self == self && self) ||
        (typeof global == 'object' && global.global == global && global) ||
        this ||
        {}
    let proto = Array.prototype
    let _ = function(obj) {
        if (!(this instanceof _)) return new _(obj)
        this._outermost = obj
    }

    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (
            typeof module != 'undefined' &&
            !module.nodeType &&
            module.exports
        ) {
            exports = module.exports = _
        }
        exports._ = _
    } else {
        root._ = _
    }
    _.output = (arg, callback) => {
        if (Array.isArray(arg)) {
            for (let i = 0; i < arg.length; i++) {
                callback(i)
            }
        }
        if (_.isObject(arg)) {
            for (let x in arg) {
                if (arg.hasOwnProperty(x)) {
                    callback(x)
                }
            }
        } else {
            return false
        }
    }
    _.each = function(arg, callback) {
        if (Array.isArray(arg)) {
            arg.forEach((name, index) => {
                callback(name, index)
            })
        }
        if (_.isObject(arg)) {
            for (let key in arg) {
                if (arg.hasOwnProperty(key)) {
                    callback(key, arg[key])
                }
            }
        } else {
            return false
        }
    }
    _.isObject = val => {
        return Object.prototype.toString.call(val) === '[object Object]'
    }
    _isFunction = val => {
        return typeof val === 'function' || false
    }

    _.allfunc = val => {
        let name = []
        for (let key in val) {
            if (_isFunction(val[key])) name.push(key)
        }
        return name
    }
    _.chain = val => {
        let outermost = _(val)
        outermost._chain = true
        return outermost
    }

    let chainResult = (instance, obj) => {
        return instance._chain ? _(obj).chain() : obj
    }
    _.merge = val => {
        let allfun = _.allfunc(val)
        allfun.forEach(element => {
            _.prototype[element] = arg => {
                let args = [_._outermost, arg]
                return chainResult(_, _[element].apply(_, args))
            }
        })
    }

    _.merge(_)
    _.each(['push', 'shift', 'unshift', 'pop', 'splice', 'reverse'], function(
        val,
        index
    ) {
        _.prototype[val] = function(...arg) {
            let obj = this._outermost
            proto[val].apply(obj, arg)
            return chainResult(_, obj)
        }
    })
})(window)


