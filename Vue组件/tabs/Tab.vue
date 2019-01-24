<script>
    export default {
        name: "tab",
        props: {
            label: {
                type: String,
                default: 'tab'
            },
            index: {
                type: [String, Number],
                required: true
            }
        },
        computed: {
            active () {
                return this.$parent.curIndex === this.index ? true : false
            }
        },
        methods: {
            handleClick () {
                this.$parent.onChang(this.index)
            }
        },
        render () {
            let tab = this.$slots.label || <span>{this.label}</span>
            let className = {
                active: this.active,
                tab: true
            }
            return (
                <li class={className} onClick = {this.handleClick}>
                    {tab}
                </li>

            )
        },
        mounted () {
            this.$parent.panne.push(this)
        }
    }
</script>

<style lang="less" scoped>
    .tab{
        list-style: none;
        line-height: 40px;
        margin-right: 30px;
        position: relative;
        bottom: -2px;
        cursor: pointer;
        &.active{
            border-bottom: 2px solid blue;
        }
        &:last-child{
            margin-right: 0;
        }
    }
</style>
