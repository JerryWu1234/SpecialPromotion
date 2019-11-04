/**
 * async function fn(args){}
 *
 * function fn(args){
 *     return spawn(function*(){
 *
 *     })
 * }
 * **/

function spawn(genF) {
    return new Promise((resolve, reject) => {
        let gen = genF()
        function step(nextF) {
            let next
            try {
                next = nextF
            } catch (e) {
                return reject(e)
            }
            if(next.node) {
                resolve(next.value)
            }
            Promise.resolve(next.value).then(function(v){
                step(function() { return gen.next(v); });
            },function (e) {
                step(function() { return gen.throw(e) })
            })
        }
        step(function(){return gen.next(undefined)})
    })
}
