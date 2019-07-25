<h1>JavaScript</h1>
<h2>方法APi</h2>
<h4>数组API</h4>

<h5>Array.from()类数组转数组,字符串转数组</h5>

```js

Array.from({0:'a',1:'2',length:2}) //返回类数组

Array.from('arg')
// [a,r,g]

// achieve process 
if(Array.from){
    Array.from = function() {
      const toStr = Object.prototype.toString()
      const isCallable = (fn) => typeof fn === 'function' || toStr.call(fn) === ['object Function'];
      function toItem(arrayLike) {
          if(arrayLike.size > 0 || arrayLike.values){
              let values = arrayLike.values()
              let it = values.next()
              const o = []
              while (!it.done) {
                  o.push(it.value)
                  it = values.next()
              }
              return o
          }
          return Object(arrayLike)
      }
      return function(arrayLike) {
          const C = this;
          const item = toItem(arrayLike)
          const mapFn = arguments.length > 1 ? arguments[1]: void undefined;
          let T;
          if(typeof mapFn !== "undefined"){
               if (!isCallable(mapFn)) {
                 throw new TypeError('Array.from: when provided, the second argument must be a function');
               }
               if(arguments.length > 2){
                   T = arguments[2]
               }
          }
          const lengthNum = arrayLike.length
          const A = isCallable(C) ? Object(new C(lengthNum)) : new Array(lengthNum);
          let k = 0
          let kValue ;
          while (k < lengthNum) {
              kValue = items[k]
              if(mapFn){
                  A[k] = typeof T === "undefined" ? mapFn(kValue, k) : mapFn.call(T, kValue, k)
              } else {
                  A[k] = kValue;
              }
              k++
          };
          A.length = lengthNum;
          return A
      };
    }
}   
```

<h5>Array.of() 类数组转换</h5>

```js
function instance() {
    Array.of(arguments)
}
  
// achieve process 

if(!Array.of) {
    Array.of = function () {
        return Array.prototype.slice.call(arguments)
    }
}
```
<h5>Array.concat</h5>
```js
[].concat([])
```

<h5>Array.copyWithin</h5>不会改变原来的长度

```js
const instance = ['a','b','c','d']
instance.copyWithin(0, 1, 3)
// ['a','a','a','a']
```

<h5>Array.entries()返回新的Iterator对象</h5>

```js
let instance = [1,2,3,4]
let newArray = instance.entries()
```
