<h1>Node</h1>



<h2>API-fs</h2>

withFileType属性

改变返回的数据类型

<h3>fs.unlink(url,err => {})<h3>

```js
// Promise 方式删除文件
function deleteFile (url, options) {
    return new Promise((resolve, reject) => {
        fs.unlink(url,options,(err) => {
            if(err) {
                reject(err)
            } else {
                resolve(true)
            }
        })
    })
} 
```

异步删除文件接口，错误会通过回调函数返回

<h3>fs.unlinkSync<h3>

```js
try{
    fs.unlinkSync(url)
    console.log('删除成功')
}catch (e) {
  
}
```
同步删除接口，可以用try捕获。

<h3>fs.readDir<h3>

```js
function lookDir (url, options) {
    return new Promise((resolve, reject) => {
        fs.readDir(url,options,(err) => {
            if(err) {
                reject(err)
            } else {
                resolve(true)
            }
        })
    })
} 
```
异步查询文件目录接口，错误会通过回调函数返回

<h3>fs.readDirSync<h3>

```js
try{
    fs.readDirSync(url, options)
    console.log('删除成功')
}catch (e) {
  
}
```

<h3>fs.createReadStream<h3>
流式读取文件内容
```js

let result = fs.createReadStream(url)
通过on方法绑定data时间
result.on(data,()=>{})
```
返回一个fs.ReadStream类包括一个data的事件

<h3>fs.appendFile<h3>

异步地将数据追加到文件，如果文件尚不存在则创建该文件

```js
function promise(url, data, options) {
    return new Promise((resolve, reject) => {
        fs.appendFile(url,data, options,(err) => {
            if(err){
                reject(err)
            } else {
                resolve(true)
            }
        })
    })
}
```
<h3>fs.appendFileSync<h3>

```js
try{
    fs.appendFileSync(url, data, options)
    console.log('删除成功')
}catch (e) {
  
}
```
同步地将数据添加到文件，如果文件不存在则创建该文件   

<h3>fs.copyFile<h3>
异步的文件内部内容拷贝
```js
fs.copyFile('源文件.txt', '目标文件.txt', (err) => {
  if (err) throw err;
  console.log('源文件已拷贝到目标文件');
});
```
<h3>fs.copyFileSync<h3>
// 同步的文件内容拷贝
fs.copyFileSync('源文件.txt', '目标文件.txt');

<h3>fs.statSync<h3>

```js
fs.statSync(url)
```
创建返回信息内容 fs.stats


<h3>fs.stat<h3>

```js
function promise(url, options) {
    return new Promise((resolve, reject) => {
        fs.statSync(url,data,(err) => {
            if(err){
                reject(err)
            } else {
                resolve(true)
            }
        })
    })
}
```
创建返回信息内容 fs.stats

<h3>fs.mkdir<h3>

```js
fs.mkdir(url,(err)=>{})
```
异步的创建目录

<h3>fs.mkdirSync<h3>

```js
fs.mkdirSync(url)
```
同步创建文件目录


<h3>fs.rename<h3>

```js
fs.rename(oldURL,newURL,()=>{})
```
//异步的文件重命名

<h3>fs.renameSync<h3>


```js
fs.rename(oldURL,newURL)
```
///同步的文件重命名

<h3>fs.truncate<h3>

```js
fs.truncate(url,number,(err)=>{})

```
异步直接截取文件内容

<h3>fs.truncateSync<h3>

```js
fs.truncateSync(url,number)
```
同步直接截取文件内容

<h3>fs.watch<h3>

```js
let val = fs.watch(url,options, function(item,val){})

```
监听文件的改动
会返回值，可以添加事件

<h2>path-api</h2>
模块提供用于处理文件路径和目录路径的实用工具

<h3>path.basenmae</h3>

```js
path.basename('/foo/bar/baz/asdf/quux.html');
// 返回: 'quux.html'

path.basename('/foo/bar/baz/asdf/quux.html', '.html');
// 返回: 'quux'
```

<h3>path.dirname</h3>

```js
path.dirname('/foo/bar/baz/asdf/quux');
// 返回: '/foo/bar/baz/asdf'
```

<h3>path.extname</h3>

```js
path.extname('index.html');
// 返回: '.html'

path.extname('index.coffee.md');
// 返回: '.md'

path.extname('index.');
// 返回: '.'

path.extname('index');
// 返回: ''

path.extname('.index');
// 返回: ''

path.extname('.index.md');
// 返回: '.md'
```
<h3>path.format(pathObject)</h3>
把pathObject对象合并成完整的路径

<h3>path.join([...paths])<h3>
多个str字符串合并成一个规范的路径

<h3>path.normalize(url)</h3>
格式化不规范的路径

<h3>path.parse</h3>
解析path路径

<h3>path.resolve<h3>

path.resolve([...path])

把多个参数合并成当前运行的绝对路径地址

<h3>path.sep</h3>
把路径解析成数组
```js
'foo/bar/baz'.split(path.sep);
// 返回: ['foo', 'bar', 'baz']
```

<h2>API-process</h2>

<h3>process.argv</h3>
返回一个数组

$ node process-args.js one two=three four
```js
0: /usr/local/bin/node
1: /Users/mjr/work/node/process-args.js
2: one
3: two=three
4: four
```
process.argv0 获取数组第0个

<h3>process.cwd()</h3>
返回当前工作的目录

