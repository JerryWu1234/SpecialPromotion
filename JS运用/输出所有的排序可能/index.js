const pull = (arr) => {
    if(arr.length <= 2 ) return arr.length === 2 ? [arr, [arr[1],arr[0]]] : arr ;
    return arr.reduce((a, v ,i) =>
            a.concat(pull([...arr.slice(0,i),...arr.slice(i+1)]).map(val => [v,...val] ))
        ,[])
};
