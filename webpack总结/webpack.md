```js
// webpack初始化代码

```

<h1>webpack</h1>

<h4>初始化webpack</h>

1.初始化webpack npm init -y

2.安装项目依赖 npm i webpack webpack-cli

3.修改webpack中的package.json中的文件

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

<h3>webpack</h3>

CommonsChunkPlugin 将chunks相同的模块代码提取成公共Js

CleanWebpackPlugin 清理构建目录

ExtrctTextWebpackPlugin 将css从build文件里提取成一个独立的css文件

CopyWebpackPlugin 将文件或文件夹拷贝到构建目录

HtmlWebpackPlugin 创建HTML文件去承载输出的bundle

UglifyjsWebpackPlugin 压缩Js

ZipWebpackPlugin 将打包出的资源生成一个zip包


<h3>webpack 中的watch</h3>
```js
{
    watch: true,
    // 是否开启文件监听
    watchOptions: {
        ignored: /node_modules/,
        // 填写要忽略的文件夹或者文件
        aggregateTimeout: 300,
        // 监听后改变默认会在300秒后改变
        poll: 1000
        // 每次间隔1000毫秒检查一次文件是否有变化
    }
}
```

<H3>css压缩</h3>

OptimizeCSSAssetsPlugin // CSS压缩文件

压缩Js插件
terset-webpack-plugin 
```js
new TersetPlugin({
  include: /\.min\.js&\/
})
```