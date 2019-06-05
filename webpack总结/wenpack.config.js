const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // css的提取
const OptimezeCssAssetsWebpackPlugin = require('optimeze-css-assets-webpack-plugin') // 优化css 压缩
const UglifyjsWebpackPlugin= require('Uglifyjs-webpack-plugin') // js的优化压缩
const webpack = require('webpack')
// 插件 expose-loader 暴露全局的loader
// externals 不把匹配的东西打包进去
modules.exports = {
    optimization: { // 优化项
        minimizer: [
            new UglifyjsWebpackPlugin({
                cache: true, // 是否用缓存
                parallel: true, // 是否并发打包
                sourceMap: true //源码映射

            }),
            new OptimezeCssAssetsWebpackPlugin()
        ]
    },
    devServer: { //开发服务器的配置
        port: 3000,
        progress: true,
        contentBase: './build',
        compress: true
    },
    mode: 'development',
    enter: './src/设计循环队列.js' ,
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'bulid'),
        publicPath: '' // 添加公共路径
    },
    plugins: [ // 插件
        //复制一个html主页
        new HtmlWebpackPlugin({
            template: './src/index',
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: true, // 移除双引号
                collapseWhitespace: true, // 折叠成一行
            },
            hash: true // 打包后带哈希
        }),
        // 提取css
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),
        new webpack.ProvidePlugin({ // 在每个模块引入jquery
            $:'jquery'
        })
    ],
    // style-loader 把css插入到head标签中
    // css-loader 解析 css
    // loader执行顺序是从右到左
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // { loader: 'style-loader' },
                    MiniCssExtractPlugin.loader, // 抽离成一个css文件然后加载
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'] // 预设转换es6语法
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit:200* 1024  //限制图片的大小
                        }
                    }
                ]
            }
        ]
    }
}
