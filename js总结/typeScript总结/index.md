#typescript

### typescript 的基本类型

1.number 数字类型

 **example:**
 
 ```js
    let val: Number = 2
 ```

2.string 字符串
  **example:**
  
  ```js
     let val: String = '2'
  ```

3.Boolean 布尔类型
  **example:**
  
  ```js
     let val: Boolean = false
  ```
4.array 数组
  **example:**
  
  ```js
     let val: Array <Number> = [2,3] //只能数字
     leg val: number[] = [1,2,4,5] //数组里只能是全部数字
     
     // 类数组有自己的定义方式
     let args: IArguments = arguments;
  ```
5.Boolean 元祖
  **example:**
  
  ```js
     let x = [String, Number]
     x = ['val', 2]
     // 按定义顺序排序
  ```
6.enum 枚举
  **example:**
  
  ```js
     enum val {one = 3, two, three}
     let curVal: val = val.one
     console.log(curVal)  // curVal: 3

    let val : String | null | undefined = ''
    val = 2 
    // 创建变量可以多个变量属性
```
注意：假设第一行代码声明了变量 num 并=设置初始值为 2。 注意变量声明没有指定类型。因此，程序使用类型推断来确定变量的数据类型，第一次赋值为 2，num 设置为 number 类型。

7.interface 接口
  **example:**
  
  ```js
     interface Person {
         name: string;
         age: number;
         [val: string]: any
         // 可以定义左边可以设置是字符串还是数字
     }
     
     let tom: Person = {
              name: 'Tom',
              age: 25
          };

     interface Person {
              readonly name: string; // 只能创建的时候被赋值
              age?: number; // 这个字段可以没有
      }
          
     let tom: Person = {
                   name: 'Tom',
      };

      // class类中接口的使用
      interface ClockInterface {
        currentTime: Date;
      }

      class Clock implements ClockInterface {
          currentTime: Date;
          constructor(h: number, m: number) { }
      }

  ```
### typescript 的函数使用方法

```js
 // 传入的参数也可以设置类型 
 function func(one: Number = 2, two?:string): Number {
    conosle.log(two) // 默认输出undefined
    return one + two
 }
 func(1) // Nan 

 // 添加number就必须要有返回数字，不然会报错。 如果不想返回就把number换成void
 
 //es6的解构用法
 function fun (...rest: Number[]):Number {
    return rest
 }
 
 // 函数里的断言<>val || <类型>值
 
 function getLength(something: string | number): number {
     if ((<string>something).length) { // 不确定这边的值是number还是string. <string> 确定是string就可以获取长度
         return (<string>something).length;
     } else {
         return something.toString().length;
     }
 }
 
 // 返回一个数组
 
 function argArray(...something: Number[]): Array<number> {
          return something;
  }
  
  // 传入一个 为定义的参数
  
  function argArray<T>(...something: Number[], value: T): asy{
            // value属于为定义的属性类型
            return something;
    }
```

// ts的基本使用 
```ts
 function Throttling(callback:()=> void, time:number):()=> void {
     let recording: number | undefined = undefined
     return function ():void {
        if(<undefined>recording)clearTimeout(recording)
         
        recording = setTimeout(() => {
            callback()
        },time)
     
    }

}
```