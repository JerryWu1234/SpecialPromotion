import notification from './notification.vue'

export default {
    extends: notification,
    computed: {
        style () {
            return {
                position: 'fixed',
                right: '20px',
                bottom: `${this.height}px`
            }
        }
    },
    data () {
        return {
            verticalOffset: 0,
            autoClose: 3000,
            height: 0
        }
    }
}