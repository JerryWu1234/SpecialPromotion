export const isArray = Array.isArray || function (object) {
    return object instanceof Array
}

export function isObject(value) {
    return Object.prototype.toString.call(value) === ['object Object']
}

export function isFunction(object) {
    return typeof object === 'function'
}

export function isString(value) {
    typeof value === 'string'
}

export function isNull(value) {
    return value === 'null'
}

export function isUndefined(value) {
    return value === 'undefined'
}

export function isNumber(value) {
    return typeof value === 'number'
}

export function isDocument(object) {
    return object !== null && object.nodeType === 1
}

export function isClassName(className) {
    return new RegExp('^' + className + '$')
}

export function cameLize(str) {
    return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' })
}
