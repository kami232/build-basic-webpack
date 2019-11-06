/*
将第三方模块单独打包成一个静态文件，用于优化性能的配置
 */
const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: {
        lodash: ['lodash'],
        vue: ['vue']
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, '../lib'),
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            path: path.resolve(__dirname, '../lib/[name].manifest.json')
        })
    ]
};