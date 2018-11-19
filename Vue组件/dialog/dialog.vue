<template>
    <div v-if="visible" class="xue-dialog">
        <svg style="position: absolute; width: 0; height: 0;">
            <defs>
                <symbol id="icon-close" viewBox="0 0 32 32">
                    <path d="M5,5 L28,28 M5,28 L28,5" style="fill: none; stroke: currentColor; stroke-width: 3;"></path>
                </symbol>
            </defs>
        </svg>
        <div v-if="modal" class="dialog-mask"></div>
        <div class="dialog-wrapper" ref="wrapper">
            <div class="dialog-header">
                <a v-if="showClose" @click="close">
                    <svg class="icon-svg close"><use xlink:href="#icon-close"></use></svg>
                </a>
                <slot name="header">
                    <div class="dialog-header">{{title}}</div>
                </slot>
            </div>
            <div class="dialog-body">
                <slot></slot>
            </div>
            <div class="dialog-footer">
                <slot name="footer">
                    <xue-button class="btn-outline-primary" @click="cancel">取消</xue-button>
                    <xue-button class="btn-primary" @click="confirm">确认</xue-button>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
    import XueButton from './Button'

    export default {
        components: {
            XueButton,
        },
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            title: String,
            modal: {
                type: Boolean,
                default: true
            },
            appendToBody: {
                type: Boolean,
                default: true
            },
            showClose: {
                type: Boolean,
                default: true
            },
            beforeClose: Function
        },
        methods: {
            close () {
                if (this.beforeClose) {
                    new Promise ((resolve, reject) => {
                        this.beforeClose(resolve)
                    }).then(() => {
                        this.$emit('update:visible', false)
                        this.$emit('close')
                    })
                } else {
                    this.$emit('update:visible', false)
                    this.$emit('close')
                }
            },
            cancel () {
                this.$emit('cancel')
                this.close()
            },
            confirm () {
                this.$emit('confirm')
                this.close()
            }
        }
    }
</script>

<style lang="less">
    .xue-dialog {
        .dialog-mask {
            position: fixed;
            z-index: 9999;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.5);
        }
        .dialog-wrapper {
            position: fixed;
            z-index: 9999;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            max-height: 98vh;
            background-color: #fff;
            border-radius: 4px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        }
        .dialog-header {
            padding: 5px 10px;
            .close {
                position: absolute;
                top: 10px;
                right: 15px;
                color: #ccc;
                font-size: 1.25em;
                cursor: pointer;
                &:hover {
                    color: red;
                }
            }
        }
        .dialog-body {
            min-width: 200px;
            max-width: 95vw;
            min-height: 60px;
            max-height: calc(98vh - 100px);
            overflow: auto;
        }
        .dialog-footer {
            padding: 15px;
            text-align: right;
        }
    }
</style>
