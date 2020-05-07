<template>
    <fieldset>
        <legend>检索条件</legend>
        <el-form
        :model="params"
        :rules="rules"
        :inline="inline || true"
        :label-position="labelPosition || 'right'"
        :label-width="labelWidth || '120px'"
        :hide-required-asterisk="hideRequiredAsterisk"
        :show-message="showMessage"
        :inline-message="inlineMessage"
        :status-icon="statusIcon"
        :validate-on-rule-change="validateOnRuleChange || true"
        :size="size || 'mini'"
        :disabled="disabled"
        ref="dynamicValidateForm"
        >
            <el-form-item
            :key="index"
            v-for="(item, index) in formItemLists"
            :label="item.label"
            :label-width = "item.labelWidth || '120px'"
            :required="item.required"
            :rules ="item.rules || ''"
            :show-message="item.showMessage || true"
            :inline-message="item.inlineMessage || false"
            :size="item.size || 'mini'"
            :prop ="item.prop">
                <hbInput
                        v-if="item.itemType === 'input'"
                        @input="input"
                        v-bind="$attrs"
                        :item="item"
                        :value="params[item.prop]"
                        v-on="$listeners">
                    <slotHtml :item="item" :slotName="val" v-for="(val, index) in item.slot" :key="index" :slot="val"></slotHtml>
                </hbInput>
                <hbAutocomplete
                        v-if="item.itemType === 'autoComplete'"
                        v-bind="$attrs"
                        @input="input"
                        :value="params[item.prop]"
                        :item="item"
                        v-on="$listeners">
                    <slotHtml :item="item" :slotName="val" v-for="(val, index) in item.slot" :key="index" :slot="val"></slotHtml>
                </hbAutocomplete>
                <hbInputNumber
                        v-if="item.itemType === 'inputNumber'"
                        v-bind="$attrs"
                        @input="input"
                        :value="params[item.prop]"
                        :item="item"
                        v-on="$listeners">
                </hbInputNumber>
                <hbSelect
                        v-if="item.itemType === 'select'"
                        v-bind="$attrs"
                        @input="input"
                        :value="params[item.prop]"
                        :`item`="item"
                        v-on="$listeners">
                    <el-option
                            v-for="childItem in item.options"
                            :key="childItem.value"
                            :label="childItem.label"
                            :value="childItem.value"
                            :disabled="childItem.disabled">
                    </el-option>
                    <slotHtml :item="item" :slotName="val" v-for="(val, index) in item.slot" :key="index" :slot="val"></slotHtml>
                </hbSelect>
                <hbCascader
                        v-if="item.itemType === 'cascader'"
                        v-bind="$attrs"
                        @input="input"
                        :value="params[item.prop]"
                        :item="item"
                        v-on="$listeners">
                </hbCascader>
                <hbTimeSelect
                        v-if="item.itemType === 'timeSelect'"
                        v-bind="$attrs"
                        @input="input"
                        :value="params[item.prop]"
                        :item="item"
                        v-on="$listeners">
                </hbTimeSelect>
                <hbTimePicker
                        v-if="item.itemType === 'timePicker'"
                        v-bind="$attrs"
                        @input="input"
                        :value="params[item.prop]"
                        :item="item"
                        v-on="$listeners">
                </hbTimePicker>
                <hbDatePicker
                        v-if="item.itemType === 'datePicker'"
                        v-bind="$attrs"
                        @input="input"
                        :value="params[item.prop]"
                        :item="item"
                        v-on="$listeners">
                </hbDatePicker>
                <div v-if="item.itemType === 'button'" >
                    <slot :item = childThis :refName = "'dynamicValidateForm'" name="button">
                        <el-button
                                size="mini"
                                @click="submitForm('dynamicValidateForm')"
                                type="primary">
                            搜索
                        </el-button>
                        <el-button
                                @click="resetForm('dynamicValidateForm')"
                                size="mini"
                                type="primary">
                            重置
                        </el-button>
                    </slot>
                </div>
            </el-form-item>
        </el-form>
    </fieldset>
</template>

<script>
    import {IntermediateFun} from './intermediateFun'
    import {Input,Autocomplete, InputNumber,Select,Cascader, TimeSelect, TimePicker, DatePicker} from 'element-ui'
    // hoc高阶组件包裹el组件，可以添加额外的属性
    let hbInput = IntermediateFun(Input)
    let hbAutocomplete = IntermediateFun(Autocomplete)
    let hbInputNumber = IntermediateFun(InputNumber)
    let hbSelect = IntermediateFun(Select)
    let hbCascader = IntermediateFun(Cascader)
    let hbTimeSelect = IntermediateFun(TimeSelect)
    let hbTimePicker = IntermediateFun(TimePicker)
    let hbDatePicker = IntermediateFun(DatePicker)
    export default {
        provide () {
            return {
                item: this
            }
        },
        data(vm){
            // 初始化Model数据
            let params = this.formItemLists.reduce((a, v, i)=>{
                if(
                    v.itemType === 'cascader'
                ){
                    a[v.prop] = []
                } else if(!!v.prop){
                    a[v.prop] = ''
                }
                return a
            }, {})
            return{
                params,
                childThis:vm
            }
        },
        name: "index",
        // 支持el官方所有的属性
        props: [
            'rules',
            'inline',
            'labelPosition',
            'labelWidth',
            'hideRequiredAsterisk',
            'showMessage',
            'inlineMessage',
            'statusIcon',
            'validateOnRuleChange',
            'size',
            'disabled',
            'formItemLists'
        ],
        methods: {
            // 表单验证的提交按钮
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$emit('submitForm',valid)
                    } else {
                        this.$message.error('请检查您提交的表单内容')
                        return false;
                    }
                });
            },
            // 手动设置双向绑定
            input({event,attrs}){
                const {prop} = attrs
                this.params[prop] = event
            },
            // 重置搜索按钮
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        components:{
            hbInput,
            hbSelect,
            hbAutocomplete,
            hbInputNumber,
            hbCascader,
            hbTimeSelect,
            hbTimePicker,
            hbDatePicker,
            slotHtml: {
                inject:['item'],
                render(){
                    const items = this.item
                    const {slotName, item} = this.$attrs
                    let val = items.$scopedSlots[slotName]({
                        items: item
                    })
                    return <div item={item}>{val}</div>
                }
            }
        }
    }
</script>

<style scoped>
</style> 
