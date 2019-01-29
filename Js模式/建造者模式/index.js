function hand () {
    this.name = '手臂'
}

hand.prototype.openHand = function () {
    console.log('手臂',this.name)
}

function leg () {
    this.name = '小腿'
}
leg.prototype.openLeg = function () {
    console.log(this.name)
}

function header () {
    this.name = '大脑'
}

function all () {
    let reslut = new header()
    reslut.hand = new hand()
    reslut.leg = new leg()
    return reslut
}

let obj = new all()
