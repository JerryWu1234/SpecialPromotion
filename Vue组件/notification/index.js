import notification from './notification.vue'
import notify from './function'
notification.install = function (Vue) {
    Vue.component(notification.name,notification)
    Vue.prototype.$notify = notify
}
export default notification