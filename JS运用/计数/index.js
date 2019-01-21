// str输入的的数字，cnt要求去掉的位数，结果输出最大的最大的整数
function count(arr, item) {
    //return arr.reduce((total,v)=> item === v ? total+1 : total, 0)
    return arr.reduce(function (total, v) {
        return item === v ? total + 1 : total
    }, 0)
}
