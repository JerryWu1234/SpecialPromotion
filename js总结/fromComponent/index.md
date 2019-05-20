#vue的hoc高阶组件
业务介绍：Vue+element Ui = 后端管理系统

优化element UI from表单组件在多个搜索条件时代码臃肿的情况。

```vue
<HbForms
      :rules="rules"
      :formItemLists="formItemLists"
      @submitForm="functionc">
</HbForms>
export default {
    data() {
        return {
            rules: {
                one: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                ],
                two: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                three: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
            },
        },
        formItemLists: [
            {
                itemType:'inputNumber',
                prop:'one',
                label:'表单一',
                size: 'mini',
                width: 200,
                min: 20,
                step: 21,
                controlsPosition: "right",
                placeholder:'123452123',
            },
            {
                itemType:'input',
                prop:'namecvbvc',
                label:'表单二',
                width: 400,
            },
            {
                itemType:'autoComplete',
                prop:'names',
                label:'表单三',
                clearable: true,
            },
            {
                itemType:'button'
            },
        ]
    },
    methods: {
          functionc(valid){
          // 验证成功就会$emit('submitForm')
              console.log(valid)
          },
    }
}
```
![avatar](https://github.com/wulinsheng123/SpecialPromotion/blob/master/js%E6%80%BB%E7%BB%93/fromComponent/QQ20190520-162639-HD.gif)




