
<h1>基本类型</h1>
<h3>装箱转换</h3>

    基本类型number,string,boolean,symbol在对象中都有对应的类，装箱转换就是把基本类型转换为对应的对象。
    

<h3>拆箱转换</h3>

    在js标准中，规定了Toprimitive函数，它是对象类型的转换（即，拆箱转换）
    
    对象到string和number的转换都遵循 "先拆箱再转换"的规则。通过拆箱转换，把对象
    
    变成基本类型，再从基本类型转换为对应的string或者number。
    
    拆箱转换会尝试调用valueOf和tostring来获得拆箱后的基本类型。如果都不存在，或者没有返回基本类型，就返回类型错误
    
     var o = {
         valueOf : () => {console.log("valueOf"); return {}},
         toString : () => {console.log("toString"); return {}}
     }
     
         o * 2
         // 调用valueOf函数 步骤一
         // 调用toString函数 步骤二
         // TypeError 结束


     var o = {
        valueOf : () => {console.log("valueOf"); return {}},
        toString : () => {console.log("toString"); return {}}
     }

    o + ""
    // 调用toString函数 步骤一
    // 调用valueOf函数 步骤二
    // TypeError 结束
    
    ES还允许对象通过显示指定toprimitive symbol来覆盖原有的行为
    
    var o = {
            valueOf : () => {console.log("valueOf"); return {}},
            toString : () => {console.log("toString"); return {}}
        }
    
        o[Symbol.toPrimitive] = () => {console.log("toPrimitive"); return "hello"}
    
    
        console.log(o + "")
        // toPrimitive 调用toPrimitive函数
        // hello 直接输出了


valueOf 

undefined null 报错
其他类型会返回它本身