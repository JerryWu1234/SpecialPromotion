let memory = fun => {
    let memory = (...arg) => {
        let obj = memory.obj
        if (!obj[arg]) {
            obj[arg] = fun.apply(this, arg)
        }
        return obj[arg]
    }
    memory.obj = {}
    return memory
}
