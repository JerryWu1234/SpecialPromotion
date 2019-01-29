<h1>webpack</h1>

<h4>初始化webpack</h>

1.初始化webpack npm init -y

2.安装项目依赖 npm i webpack webpack-cli

3.修改webpack中的package.json中的文件

webpack 必备的包

[webpack],[webpack-cli],[css-style],[html-webpack-plugin],[sytle-loader],[less-loader],[file-loader]

[clean-webpack-plugin]
```js

"build": "webpack"

```

<h4>webpack打包内容</h>

改变打包的方式

```js
 // 开发环境
  webpack --config webpack.dev.js
  //生产环境
  webpack --config webpack.prod.js"
```

```js
// []中表示变量 PS:name，hash
// __dirname表示绝对文件位置
output: {
   fliename: '[name].[hash].js',
   path: __dirname + '/dist'
} 
```
