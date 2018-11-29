<template>
    <div>
        <button
        @click="handleClick"
        :disabled="disabled"
        class="vue-button"
        :style="{
        width: `${buttonWidth}px`,
        height:`${buttonHeight}px`,
        lineHeight:`${buttonHeight}px`
        }"
        :class="[
            {'is-disabled' : disabled }
        ]"
        >
            <i v-if="loading">加载中...</i>
            <span v-if="!loading && $slots.default ">
                <slot></slot>
            </span>
        </button>
    </div>
</template>

<script>
    export default {
        name: "vue-button",
        props: {
            disabled: Boolean,
            loading: Boolean,
            buttonWidth: {
                type: Number,
                default () {
                    return 120
                }
            },
            buttonHeight: {
                type: Number,
                default () {
                    return 40
                }
            },
        },
        methods: {
            handleClick (evt) {
                this.$emit('click', evt);
            }
        }
    }
</script>

<style lang="less">
    .vue-button{
        height: 200px;
        width: 200px;
        background: #409eff;
        border: none;
        cursor: pointer;
        color: #fff;
        font-size: 14px;
        border-radius: 5px;
        text-align: center;
    }
    .is-disabled{
        cursor: not-allowed;
    }
</style>