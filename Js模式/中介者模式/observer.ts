interface parameter {
    name: string;
    backCall?: () => {};
}
let observer = (function(){
    let obj = {}
    return {
        add(parameter): void {
            let val: Array<any> | undefined = obj[parameter.name]
            if(<Array<any>>val){
                val.push(parameter.backCall)
            }else{
                obj[parameter.name] = []
                obj[parameter.name].push(parameter.backCall)
            }
            // <Array<any>>val ? obj[parameter.name].push(parameter.backCall) : obj[parameter.name] = [], obj[parameter.name].push(parameter.backCall)
        },
        run(runComman:string): void{
            let val: Array<any> | undefined = obj[runComman]
            if(<Array<any>>val){
                for(let key of val){
                    key()
                }
            }

        }
    }
})()

