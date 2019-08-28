const path = require('path')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const SizePlugin = require('size-plugin');
const WebpackDashboard = require('webpack-dashboard/plugin')
module.exports = {
    mode: "none",
    entry: {
        'computer': './src/index.js',
        'computer.min': './src/index.js',
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname,'dist'),
        library: 'computer',
        libraryTarget: "umd2",
    },
    plugins: [
        new SizePlugin()
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin({
                include: /\.min\.js$/
            }),

        ]
    },

}
