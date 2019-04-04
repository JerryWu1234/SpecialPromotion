<h1>移动web硬知识点</h2>

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
 
 5.babel  es6插件
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
6.react 相关插件
```js
"react": "^16.2.0",
"react-dom": "^16.2.0",
"react-redux": "^5.0.7",
"redux": "^3.7.2",
"redux-thunk": "^2.2.0"
```
 
7.style样式相关插件

```js
"style-loader": "^0.20.3",
"url-loader": "^1.0.1",
"sass-loader": "^6.0.7",
"sass-resources-loader": "^1.3.3",
"node-sass": "^4.7.2",
"css-loader": "^0.28.11",
"file-loader": "^1.1.11"
```
