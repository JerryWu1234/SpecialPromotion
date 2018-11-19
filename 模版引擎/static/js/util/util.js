/**
 * @Description     工具类封装了创建模版的方法
 **/
(function(win){
  
  const fragmentRE = new RegExp(/\{\{([a-zA-Z$_][a-zA-Z$_0-9\.]*)\}\}/, 'ig')
  
  let util = ''
  
  /**
   * @method createDom
   * @for NodeList
   * @return {html} dom元素
   * @desc 创建模板
   */
  
  function createDom () {
    return new Proxy({}, {
      get(target, property) {
        return function(attrs = {}, ...children) {
          const el = document.createElement(property)
          for (let prop of Object.keys(attrs)) {
            el.setAttribute(prop, attrs[prop])
          }
          for (let child of children) {
            if(!isArray(child)){
              if (typeof child === 'string') {
                child = document.createTextNode(child)
              }
              el.appendChild(child)
            }else{
              let val = replaceBariable(child,el)
              return parentDom(val)
            }
          }
          return el
        }
      }
    })
  }
  
  /**
   * @method isArray
   * @return {Boolean}
   * @desc 判断是否是数组
   */
  
  function isArray (val) {
    return Object.prototype.toString.call(val) === '[object Array]';
  }
  
  /**
   * @method replaceBariable
   * @return {html}
   * @desc 拼接html元素
   * @param{Array} data
   * @param{Object} el html对象
   */
  
  function replaceBariable(data,el){
    let dom = domToString(el)
    let template = ''
    data.forEach((item,index)=>{
      let val = replaceVal(dom,item,index)
      template = val + template
    })
    return template
  }
  
  /**
   * @method domToString
   * @return {string}
   * @desc 把html转化为string
   */
  
  function domToString (val) {
    let template = document.createElement('div')
    template.appendChild(val)
    let htmlText = template.innerHTML
    template = val = null; // 解除引用，以便于垃圾回收
    return htmlText;
  }
  
  /**
   * @method replaceVal
   * @return {string}
   * @desc 替换变量
   */
  
  function replaceVal(dom,item,index) {
    return dom.replace(fragmentRE,(val)=> {
      let newVal = val.slice(2,val.length - 2);
      if(newVal == 'index'){
        return index
      }
      if(newVal == 'item'){
        return item
      }
      return item[newVal]
    });
  }
  
  /**
   * @method parentDom
   * @return {html}
   * @desc 返回替换后的dom元素
   */
  
  function parentDom(val) {
    let template = document.createElement("div");
    template.innerHTML = val;
    return template;
  }
  /**
   * @desc 添加、删除、查找、替换等一些对class的操作
   */
  
  util = {
    hasClass(elements,cName) {
      return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ); // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断
    },
    
    addClass( elements,cName ){
      if( !this.hasClass( elements,cName ) ){
        elements.className += " " + cName
      }
    },
    
    removeClass( elements,cName ){
      if( this.hasClass( elements,cName ) ){
        elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" )," " ); // replace方法是替换
      }
    },
    
    delAndAddClass(dom,newName,name = newName){
      if(this.hasClass(dom,name)){
        this.removeClass(dom,name)
        this.addClass(dom,newName)
        return false
      }
    },
    
    switchClass(dom,newName,name){
      if(dom.nodeType === 1){
        this.delAndAddClass(dom,name,newName)
        let nodeList = Array.from(dom.childNodes)
        nodeList.forEach((item,index) => {
          this.switchClass(item,name,newName)
        },this)
      }
    },
    
    findAllDom(val){
      let alldom = val.parentNode.childNodes
      return Array.from(alldom).reverse()
    },
    isLocal(){
      return location.hostname === '127.0.0.1' || location.hostname === 'localhost'
    },
    makeStaticSiteUrl (url) {
      const STATICURL = {
        'd-app.hfjy.com': 'https://d-xue.hfjy.com/A',
        't-app.hfjy.com': 'https://t-xue.hfjy.com/K',
        'o-app.hfjy.com': 'https://o-xue.hfjy.com',
        'm-st.hfjy.com': 'https://s-xue.hfjy.com'
      }
      if (STATICURL[location.hostname]) {
        return `${STATICURL[location.hostname]}${url}`
      } else if (this.isLocal()) {
        return `${STATICURL['d-app.hfjy.com']}${url}`
      }else{
        return `${STATICURL['m-st.hfjy.com']}${url}`
      }
    },
  }
  util.createHtml = new createDom()
  win._ = util
  
})(window)