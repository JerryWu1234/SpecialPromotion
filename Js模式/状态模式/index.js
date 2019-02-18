class stateMode {
    _allState = {};
    actions () {
        return {
            up () {
                console.log('forward up')
            },
            down () {
                console.log('forward up')
            },
            left () {
                console.log('forward left')
            },
            right () {
                console.log('forward right')
            }
        }
    }
    record (...arg) {
        this._allState = {}
        for(let i = 0; i < arg.length; i++){
            this._allState[arg[i]] = true
        }
        return this
    }
    runing(){
        let actions = this.actions()
        for(let key in this._allState){
            if(this._allState.hasOwnProperty(key)){
                actions[key] && actions[key]()
            }
        }
        return this
    }
}

// 多个判断条件的优化操作
