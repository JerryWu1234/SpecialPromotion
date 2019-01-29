function initProtype(subType, superType) {
    var protoType = Object.create(superType.prototype)
    protoType.constructor = subType
    subType.prototype = protoType
}
function SuperType (name) {
    this.name = name
    this.colors = ['red','blue', 'green']
}

SuperType.prototype.sayName = function () {
    alert(this.name)
}

function SubType (name, age) {
    SuperType.call(this, name)
    this.age = age
}

initProtype(SubType, SuperType)

SubType.prototype.sayAge = function () {
    alert(this.age)
}

var instance = new SubType("Bob", 18);
instance.sayName();
instance.sayAge();
c
