import {isClassName, cameLize, isObject} from "./isType";

const ieVersion = Number(document.documentMode);

export const on = (function () {
    if (document.addEventListener) {
        return function (dom, Event, fn, Bool) {
            if (!dom && !Event && !fn) return
            dom.addEventListener(Event, (event) => {
                fn.call(this, event)
            }, Bool)
        }
    } else {
        return function (dom, Event, fn, Bool) {
            if (!dom && !Event && !fn) return
            dom.attachEvent(`on${Event}`, (event) => {
                if (Bool) {
                    event.cancelBubble = true
                }
                fn.call(this, event)
            })
        }
    }
})()

export const off = (function () {
    if (document.removeEventListener) {
        return function (dom, Event, fn) {
            if (!dom && !Event) return
            dom.removeEventListener(Event, fn, false)
        }
    } else {
        return function (dom, Event, fn) {
            if (!dom && !Event) return
            dom.detachEvent(`on${Event}`, fn)
        }
    }
})()

// export function hasClass(dom, className) {
//     // let state = false
//     // const nameList = dom.className.split(" ")
//     // const lengthTotal = nameList.length
//     // for(let i = 0; i < lengthTotal; i++){
//     //    if(nameList[i] !== '' && nameList[i].match('^'+className+'$') !== null) {
//     //        return state = true
//     //    }
//     // }
//     // return state

//         const nameList = dom.className.split(" ")
//         return nameList.some(function (val) {
//             if(val !== '') {
//                 return this.test(val)
//             }
//         }, new RegExp('^'+className+'$'))
//     }
//
// }
export const hasClass = (function () {
    if (document.classList) {
        return function (dom, className) {
            return dom.classList.contains(className)
        }
    } else {
        return function (dom, className) {
            const nameList = dom.className.split(" ")
            return nameList.some(function (val) {
                if (val !== " ") {
                    return this.test(val)
                }
            }, isClassName(className))
        }
    }
})()

export const addClass = (function () {
    if (document.classList) {
        return function (dom, className) {
            if (!(hasClass(dom, className))) {
                dom.classList.add(className)
            }
        }
    } else {
        return function (dom, className) {
            const nameList = dom.className.split(" ")
            nameList.push(className)
            dom.className = nameList.join(" ")
        }
    }
})()

export const removeClass = (function () {
    if (document.classList) {
        return function (dom, className) {
            if (!(hasClass(dom, className))) {
                dom.classList.remove(className)
            }
        }
    } else {
        return function (dom, className) {
            const nameList = dom.className.split(" ")
            const matchStr = isClassName(className)
            dom.className = (nameList.reduce((a, v, i) => {
                if (!(matchStr.test(v))) {
                    a.push(v)
                    return a
                }
                return a
            }, [])).join(" ")
        }
    }
})()

export function css(dom, property, value = undefined) {
    if (arguments.length < 3 && isObject(property)) {
        return getStyle(dom, property)
    }
    setStyle(dom, property, value)
}

function getStyle(dom, property) {
    property = cameLize(property)
    if (property === 'float') {
        property = 'cssFloat';
    }
    try {
        const computed = document.defaultView.getComputedStyle(dom, '')
        return dom.style[property] || computed ? computed.getPropertyValue(property) : null
    } catch (e) {
        return dom.style[property]
    }
}

function setStyle(dom, property, value) {
    if (typeof property === 'object') {
        for (let prop in property) {
            if (property.hasOwnProperty(prop)) {
                setStyle(dom, prop, property[prop])
            }
        }
    } else {
        property = cameLize(property)
        if (property === 'opacity') {
            dom.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
        } else {
            dom.style[property] = value;

        }
    }
}

export function getDom(name) {
    return document.querySelector(name)
}
