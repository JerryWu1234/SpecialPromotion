import Vue from 'vue'
import component from './func-notification'

let NotificationConstructor = Vue.extend(component)
let doms = [],domHeight = 16

let notify = (options) => {
    console.log(options)
    let Notification  = new NotificationConstructor({
        propsData: {...options}
    })
    Notification.$mount()
    doms.push(Notification)
    document.body.appendChild(Notification.$el)
    Notification.height = domHeight
    domHeight = domHeight + Notification.$el.offsetHeight + 16
    setTimeout(()=>{
        Notification.$nextTick(()=>{
            document.body.removeChild(Notification.$el)
            Notification.$destroy()
        })
    },2000)
    Notification.$on('close',($event) =>{
        Notification.visible = false
        let index = doms.findIndex((item)=> item._uid === $event._uid)
        doms.splice(index,1)
        if(doms.length < 1) return
        for(let i = index;i < doms.length;i++){
            doms[i].height = doms[i].height - (Notification.$el.offsetHeight + 16)
        }
    })
    Notification.$on('closed',() =>{
        Notification.visible = false
    })

}
export default notify