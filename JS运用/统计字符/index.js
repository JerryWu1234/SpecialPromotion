// str输入的的数字，cnt要求去掉的位数，结果输出最大的最大的整数
function max(str,cnt) {
    str = Array.from(str.toString())
    if (str.length == cnt) {
        return '';
    }
    debugger
    for (let i = 0; i < 9 && cnt > 0; i ++){
        let index = str.indexOf(i.toString())
        debugger
        if(index != -1){
            str.splice(index, 1)
            debugger
            cnt--
        }
    }
    return str.join('')
}
