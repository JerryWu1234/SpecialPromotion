// str输入的的数字，cnt要求去掉的位数，结果输出最大的最大的整数
function insert(arr, item, index) {
    let arr1 = [].concat(arr)
    arr1.splice(index, 0, item)
    return arr1
}
