function contain(id,parent) {
    this.array = [];
    this.parent = parent;
    this.element = null;
    this.id = id
    this.init()
}
contain.prototype = {
    init () {
        this.element = document.createElement('ul');
        this.element.id = this.id;
        this.element.className = 'new-container';
    },
    add (child) {
        this.array.push(child)
        this.element.appendChild(child.getElement())
        return this
    },
    getElement () {
      return this.element
    },
    show () {
        this.parent.appendChild(this.element);
    }
}

function IconNews(text, href, type) {
    this.text = text || '';
    this.href = href || '#';
    this.type = type || 'video';
    this.element = null;
    this.init();
};


IconNews.prototype = {
    init () {
        this.element = document.createElement('a');
        this.element.innerHTML = this.text;
        this.element.href = this.href;
    },
    add () {

    },
    getElement () {
        return this.element;
    }
}

function Item (classname) {
    this.classname = classname || '';
    this.element = null;
    this.children = []
    this.init();

};

Item.prototype = {
    init () {
        this.element = document.createElement('li');
        this.element.className = this.classname;
    },
    add (child) {
        this.children.push(child);
        this.element.appendChild(child.getElement());
        return this;
    },
    getElement () {
        return this.element;
    }
}


//es6的写法
let dom = new Proxy({},{
    get(target, property, receiver) {
        return function (attr = {}, ...chlidren) {
            let dom = document.createElement(property)
            for(let key of Object.keys(attr)){
                dom.setAttribute(key,attr[key])
            }
            for(let item of chlidren){
                if(typeof item === 'string') {
                    let chlid = document.createTextNode(item)
                    dom.appendChild(chlid)
                } else {
                    dom.appendChild(item)
                }
            }
            return dom
        }
    }
})

