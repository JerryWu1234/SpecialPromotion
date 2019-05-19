##DOM Tree Api

### 查找Tree的位置

#### parentNode

    parentNode 属性可返回某节点的父节点。
    如果指定的节点没有父节点则返回 null 。
    
example :
```js
document.getElementById("item1").parentNode;
    
```

#### childNodes

    childNodes 属性返回节点的子节点集合，以 NodeList 对象。
    
example :
```js
document.body.childNodes;
```    

#### firstChild
    firstChild 属性返回被选节点的第一个子节点。
    如果选定的节点没有子节点，则该属性返回 NULL。
example :
```js
    document.firstChild;
```    
#### lastChild
    lastChild 属性可返回文档的最后一个子节点。
example :
```js
document.getElementById("myList").lastChild;
```   
   
#### nextSibling
    nextSibling 属性可返回某个元素之后紧跟的节点（处于同一树层级中）。
    
    返回节点以节点对象返回。
    
    如果元素紧跟后面没有节点则返回 null.
example :
```js
document.getElementById("item1").nextSibling;
``` 

#### previousSibling
    previousSibling 属性可返回某节点之前紧跟的节点（处于同一树层级）
    
    返回节点以节点对象返回。
    
    如果没有此节点，那么该属性返回 null。
    
    example :
    ```js
        document.getElementById("item2").previousSibling;
    ``` 
### 操作dom tree API

#### appendChild 
    appendChild() 方法可向节点的子节点列表的末尾添加新的子节点。   
    
    如果文档树中已经存在了 newchild，它将从文档树中删除，然后重新插入它的新位置。
    
    如果 newchild 是 DocumentFragment 节点，则不会直接插入它，而是把它的子节点按序插入当前节点的 childNodes[] 数组的末尾。
example :
```js
document.getElementById("myList").appendChild(newListItem);
```
#### insertBefore
    insertBefore() 方法可在已有的子节点前插入一个新的子节点。
    
    如果你想创建一个新的文本列表项，在 LI 元素后你应该添加元素的文本节点，然后在列表中添加 LI元素。
    
    你也可以使用 insertBefore 方法来 插入/移除 已存在的元素。
example :
```js
document.getElementById("myList").insertBefore(newItem, existingItem);
```
#### removeChild
    removeChild() 方法可从子节点列表中删除某个节点。
    
    如删除成功，此方法可返回被删除的节点，如失败，则返回 NULL
example :
```js
let list = document.getElementById("myList");

list.removeChild(list.childNodes[0]);
```
#### replaceChild
    eplaceChild() 方法可将某个子节点替换为另一个。
    
    新节点可以是文本中已存在的，或者是你新创建的。
    
    
example :
```js
document.getElementById("myList").replaceChild(newnode,oldnode);
```
### other APi

#### compareDocumentPosition 

    比较当前节点与指定节点的文档位置
    可能的返回值：
    
    查看以上实例，返回值可能是：
    
    1：没有关系，这两个节点不属于同一个文档。
    
    2： 第一节点（P1）位于第二个节点后（P2）。
    
    4：第一节点（P1）定位在第二节点（P2）前。
    
    8： 第一节点（P1）位于第二节点内（P2）。
    
    16： 第二节点（P2）位于第一节点内（P1）。
    
    32:没有关系的，或是两个节点在同一元素的两个属性。
example :
```js
let p1=document.getElementById("p1");
let p2=document.getElementById("p2");
p1.compareDocumentPosition(p2);
```

#### cloneNode
    cloneNode() 方法可创建指定的节点的精确拷贝。
    
    cloneNode() 方法 拷贝所有属性和值。
    
    该方法将复制并返回调用它的节点的副本。如果传递给它的参数是 true，它还将递归复制当前节点的所有子孙节点。否则，它只复制当前节点。
    
example :
```js
let node=document.getElementById("myList2").lastChild.cloneNode(true);
document.getElementById("myList1").appendChild(node);
```

### 添加属性api

#### getAttribute

    getAttribute() 方法通过名称获取属性的值。
    
example :
```js
document.getElementsByTagName("a")[0].getAttribute("target");
```

#### setAttribute
    setAttribute() 方法创建或改变某个新属性。
    
    如果指定属性已经存在,则只设置该值。
    
example :
```js
document.getElementsByTagName("INPUT")[0].setAttribute("type","button");
```

#### removeAttribute
    removeAttribute() 方法删除指定的属性
example :
```js
document.getElementsByTagName("H1")[0].removeAttribute("style");

```
#### hasAttibute
    如果当前元素节点拥有指定属性，则返回 true，否则返回 false。
    
     example :
     ```js
     document.getElementsByTagName("H1")[0].hasAttibute("style");
     
     ```   
#### getAttributeNode
    getAttribute() 方法返回指定属性名的属性值，以 Attr 对象
 example :
 ```js
 document.getElementsByTagName("a")[0].getAttributeNode("target");
 
 ```  
#### setAttributeNode
    setAttributeNode() 方法返回指定属性名的属性值，以 Attr 对象
 example :
 ```js
 document.getElementsByTagName("a")[0].setAttributeNode("target");
 
 ``` 
### 创建DOM APi

#### createElement
    createElement() 方法通过指定名称创建一个元素
 example :
 ```js
let btn = document.createElement("BUTTON");
 ``` 
    
#### createTextNode 
    createTextNode() 可创建文本节点
 example :
 ```js
let h = document.createElement("H1")
let t = document.createTextNode("Hello World");
h.appendChild(t);
 ``` 

#### createcomment
    createComment() 方法可创建注释节点。
 example :
 ```js
let c = document.createComment("My personal comments");
document.body.appendChild(c);
 ```

#### createDocumentFragment 
    createdocumentfragment()方法创建了一虚拟的节点对象，节点对象包含所有属性和方法
    
example :
```js
var d=document.createDocumentFragment();
d.appendChild(document.getElementsByTagName("LI")[0]);
d.childNodes[0].childNodes[0].nodeValue="Milk";
document.getElementsByTagName("UL")[0].appendChild(d);
``` 