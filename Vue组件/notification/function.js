import Vue from 'vue'
import component from './func-notification'

let NotificationConstructor = Vue.extend(component)
let doms = [],domHeight = 16

let removeEvent = (doms, event) => {
    let index = doms.findIndex((item)=> item._uid === event._uid)
    doms.splice(index,1)
    if(doms.length < 1) return
    for(let i = index;i < doms.length;i++){
        doms[i].height = doms[i].height - (event.$el.offsetHeight + 16)
    }
    domHeight = 16 + ((doms.length) * (event.$el.offsetHeight + 16))
}
let notify = (options) => {
    let Notification  = new NotificationConstructor({
        propsData: {...options}
    })
    Notification.$mount()
    doms.push(Notification)
    document.body.appendChild(Notification.$el)
    Notification.height = domHeight
    domHeight = domHeight + (Notification.$el.offsetHeight + 16)

    setTimeout(()=>{
        removeEvent(doms,Notification)
        if(doms.length < 1) domHeight = 16
        document.body.removeChild(Notification.$el)
        Notification.$destroy()
    },3000)
    Notification.$on('close',($event) =>{
        Notification.visible = false
        removeEvent(doms,$event)
    })
    Notification.$on('closed',() =>{
        Notification.visible = false
    })

}
export default notify
