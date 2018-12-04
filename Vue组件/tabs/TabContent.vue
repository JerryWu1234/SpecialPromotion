<script>
    export default {
        name: "TabContent",
        data () {
            return {
                text: ''
            }
        },
        props: {
            panne:{
                type:Array,
                required: true,
                default () {
                    return []
                }
            },
            curIndex:{
                type: [String, Number]
            }
        },

        render () {
            const contents = this.panne.map(pane => {
                return pane.active ? pane.$slots.default : null
            })
            return (
                <div class="tab-content">
                    {contents}
                </div>
            )
        }
    }
</script>
