class events {
    constructor () {
        this.events = {}
    }
    emit (name, callback) {
        let events = this.events
        if(!events[name]){
            events[name] = []
        }
        events[name].push(callback)
    }
    onEvent (name,...val) {
        let events = this.events
        if(!events[name]){
            return false
        }
        events[name].forEach((item,index) =>{
            item.apply(this,val)
        })
    }
    remove (name,funName) {
        let events = this.events
        debugger
        if(!events[name]){
            return false
        }
        if(!funName){
            events[name].length = 0
        }else{
            events[name].forEach((item,index) =>{
                if(item.toString() === funName.toString()){
                    console.log(events[name])
                    events[name].splice(index,1)
                }
            })
        }

    }
}
