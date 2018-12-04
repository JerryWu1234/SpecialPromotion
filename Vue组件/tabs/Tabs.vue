<script>
    import TabContent from './TabContent.vue'
    export default {
        name: "tabs",
        props: {
            curIndex: {
                type: [String, Number],
                required: true
            }
        },
        components: {
            TabContent,
        },
        data () {
            return{
                panne: []
            }
        },
        methods: {
          onChang (val) {
              this.$emit('click',val)

          }
        },
        render () {
            return (
                <div class="tabs">
                    <ul class="tabs-header">
                        {this.$slots.default}
                    </ul>
                    <tab-content curIndex={this.curIndex} panne={this.panne}></tab-content>
                </div>
            )
        }
    }
</script>

<style lang="less" scoped>
    .tabs-header{
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        border-bottom: 2px solid #ededed;
    }
</style>