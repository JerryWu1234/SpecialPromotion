<h1>移动web硬知识点</h1>

<h2>移动web的适配片</h2>
<h3>物理像素和css像素的联系</h3>
 1.物理像素和css像素展示之间的关系
 
 pc：1的css像素 = 1的物理像素
 
 移动端：1的css像素 = n倍的物理像素
 
 为能让移动端高清展示，所以移动端会用多个css像素展示一个物理像素

<h3>移动设备的视窗概念</h3>

1.layout viewport 布局视窗 Ps: 浏览器的初始视窗大小和浏览器厂商有关

2.Visual viewport 物理视窗 ps:可视区域大小

3.Ideal viewport 理想视窗

```html
// 理想视窗设置 
<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
```
device-width、device-height 定义视口的宽度，或高度

initial-scale 初始化缩放值

maximum-scale， minimum-scale 定义视口最大（最小）比例，他必须小于(大于)或等于maximum-scale(minimum-scale)的设置

user-scalable 定义是否允许用户手动缩放


 <h1>项目构建</h1>
 
 <h2>项目构建需要的插件</h2>
 1.webpack *npm install webpack*
 
 2.webpack-cli *npm install webpack-cli*

 3.webpack-dev-server *npm install webpack-dev-server*  //webpack服务
 
 4.html-webpack-plugin *npm install html-webpack-plugin* //html插件
 
 5.html-webpack-inline-source-plugin *npm install html-webpack-inline-source-plugin* 
 
 6.eslint *npm install eslint* 
 
 7.eslint-loader *npm install eslint-loader* 
 
 8.eslint-plugin-react *npm install eslint-plugin-react* 
 
 9.sass-resources-loader *npm install sass-resources-loader* // 提取样式
 
 10.react-hot-loader *npm install react-hot-loader*//react热更新
 
 
babel  es6插件
 ```js
"babel-core": "^6.26.0",
"babel-eslint": "^8.2.3",
"babel-loader": "^7.1.4",
"babel-plugin-react-hot-loader": "^3.0.0-beta.6",
"babel-preset-es2015": "^6.24.1",
"babel-preset-react": "^6.24.1",
"babel-preset-stage-0": "^6.24.1",
"babel-plugin-transform-async-to-generator": "^6.24.1",
"babel-plugin-transform-runtime": "^6.23.0",
```
react 相关插件
```js
//const Order = loadable({
//       loader: () => import(/* webpackChunkName: "order" */'../Order/Order'),
//      loading: Loading,
// });
// react懒加载的写法,主要用于优化
"react-loadable": "^5.5.0",
"react": "^16.2.0",
"react-dom": "^16.2.0",
"react-redux": "^5.0.7",
"redux": "^3.7.2",
"redux-thunk": "^2.2.0",
"react-router-dom": "^5.0.0",
"connected-react-router": "^6.3.2",
// react-router-dom 和 react-router-redux 路由的必备组件
```
 
style样式相关插件

```js
// 清除之前的html
"clean-webpack-plugin": "^2.0.1",
"style-loader": "^0.20.3",
"url-loader": "^1.0.1",
"sass-loader": "^6.0.7",
"sass-resources-loader": "^1.3.3",
"node-sass": "^4.7.2",
"css-loader": "^0.28.11",
"file-loader": "^1.1.11",
"mini-css-extract-plugin": "^0.6.0", //css抽离

```

<h3>滚动的知识</h3>

```js
scrollHeight  // 全部高度不管看见或者看不见
document.body.scrollHeight
// 整个body的全部高度

clientHeight //视口的高度
//获取html的高度
document.documentElement.clientHeight

scrollTop // 滚动高度
document.documentElement.scrollTop
// 获取html的滚动高度

scrollTop + clientHeight > scrollHeight //滚动条已经到底
```

<h3>react项目优化</h3>

1.利用loadable模块懒加载
利用"react-loadable": "^5.5.0",模块懒加载。

```js
// 懒加载组件的写法
const Order = loadable({
      loader: () => import(/* webpackChunkName: "order" */'../Order/Order'),
      loading: Loading,
 });
```
2.抽离js和css
```js
optimization: {
       splitChunks: {
           cacheGroups: {
               // 抽离node_modules里的js生成common.js
               common: {
                   test: /[\\/]node_modules[\\/]/,
                   chunks: "all",
                   name: 'common'
               }
           },


       }
    },
```

利用mini-css-extract-plugin抽离css模块

```js
// 放入plugin[]的数组中
new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: "[id],css"
})
```
