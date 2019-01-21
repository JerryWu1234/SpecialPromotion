// 通过reduce叠加
function countStr(str) {
    let arr = Array.from(str)
    for(let i = 0;i<arr.length;i++){
        let num = arr.reduce((total, item) => item === arr[i] && item !== '' ? total + 1 : total, 0)
        if(num > 3){
            return arr[i]
        }
    }
}
