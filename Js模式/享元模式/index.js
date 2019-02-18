//雇佣模特
var HireModel = function(sex){
    //内部状态是性别
    this.sex = sex;
};
HireModel.prototype.wearClothes = function(clothes){
    console.log(this.sex+"穿了"+clothes);
};

//工厂模式，负责造出男女两个模特
var ModelFactory = (function(){
    var cacheObj = {};
    return {
        create:function(sex){
            //根据sex分组
            if(cacheObj[sex]){
                return cacheObj[sex];
            } else {
                cacheObj[sex] = new HireModel(sex);
                return cacheObj[sex];
            }
        }
    };
})();
//模特管理
var ModelManager = (function(){
    //容器存储：1.共享对象 2.外部状态
    var vessel = {};
    return {
        add:function(sex,clothes,id){
            //造出共享元素:模特
            var model = ModelFactory.create(sex);
            //以id为键存储所有状态
            vessel[id] = {
                model:model,
                clothes:clothes
            };
        },
        wear:function(){
            for(var key in vessel){
                //调用雇佣模特类中的穿衣服方法。
                vessel[key]['model'].wearClothes(vessel[key]['clothes']);
            }
        }
    };
})();
/*******通过运行时间测试性能**********/
for(var i=0;i<100;i++){
    ModelManager.add('male','第'+i+'款男衣服',i);
    ModelManager.add('female','第'+i+'款女衣服',i);
}
ModelManager.wear();
// 享元模式可以简单的理解为 单例模式 + 工厂模式 + 管理器 , 管理器对外部状态进行管理组合成完整的对象

// 享元模式 加 地址池
const books = new Array(10000).fill(0).map((v, index) => {
    return Math.random() > 0.5 ? {
        name: `计算机科学${index}`,
        category: '技术类'
    } : {
        name: `傲慢与偏见${index}`,
        category: '文学类类'
    }
})
const contains = document.createElement('div')
let containsCore = document.createElement('div')
contains.style.cssText = `height:400px;background:#f2f2f2;width:300px;overflow-y: auto`
containsCore.style.cssText = `height:${books.length}px;background:#f2f2f2;width:300px;position: relative;`
contains.appendChild(containsCore)
document.body.appendChild(contains)

function load(front,end){
    books.slice(front,end).forEach((item,index)=>{
        let dom = flyweightBookFactory(item)
        let div = divFactory(containsCore)
        div.create(item, index + front, function(){
            dom.print()
        })
    })
}

let flyweightBookFactory = (function(){
    let moder = {}
    return function(item){
        if(moder[item.name]){
            return moder[item.name]
        }else{
            moder[item.name] = new createDom(item)
            return moder[item.name]
        }
    }
})()
class createDom {
    constructor (item) {
        this.name = item.name
        this.category = item.category
    }
    print () {
        console.log(this.name,this.category)
    }
}
let divFactory = (function(){
    let alldata = []
    return function (containsCore) {
        let div
        if(alldata.length <= 10){
            div = new Div()
            alldata.push(div)
        } else {
            div = alldata.shift()
            alldata.push(div)
        }
        div.device(containsCore)
        return div
    }

})()

class Div {
    constructor(){
        this.dom = document.createElement('div')
    }
    create(item, index, onclick){
        this.dom.style.cssText = `height:40px;width:100%;background:red;position: absolute;top:${index*40}px`
        this.dom.innerHTML = `${item.name}`
        this.dom.onclick = onclick
    }
    device(containsCore){
        containsCore.appendChild(this.dom)
    }
}
load(0, 10)
let current = 0;
contains.addEventListener('scroll',(event) => {
    let total = contains.scrollTop / 40 | 0
    if(current !== total) {
        load(total,total + 10)
        current = total
    }
})

// 地址池利用重复利用的思想
