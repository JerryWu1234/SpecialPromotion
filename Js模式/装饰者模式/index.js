let plan = function () {

}

plan.prototype.fire = function () {
    console.log('luach')
}

let MissileDecorator = function(func){
    this.plan = func
}

MissileDecorator.prototype.plan = function () {
    this.plan.fire()
    console.log('发射')
}

let plans = new plan()
let reslut = new MissileDecorator(plans)
reslut.plan()

//继承会导致超类和子类之间存在强耦合性，当超类改变时，子类也会随之改变；
// 超类的内部细节对于子类是可见的，继承常常被认为破坏了封装性；
