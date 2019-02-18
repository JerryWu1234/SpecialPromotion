//暂时不考虑数组的情况
function deepExtend (obj) {
    let returnObj = {}
    let queueOut = [obj]
    let queueInner = [returnObj]
    while (queueOut.length > 0){
        let data = queueOut.shift()
        let item = queueInner.shift()
        for (let key in data) {
            if(typeof data[key] !== 'object'){
                item[key] = data[key]
            } else {
                queueOut.push(data[key])
                item[key] = {}
                queueInner.push(item[key])
            }
        }
    }
    return returnObj
}
