/**
 * webpack 生产环境下配置
 */
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");

const prodConfig = {
    plugins: [
        new CleanWebpackPlugin()
    ],
    optimization: {
        minimizer: [
            new TerserJSPlugin({}),
            new OptimizeCSSAssetsPlugin({})
        ],
        // splitChunks: {
        //     cacheGroups: {
        //         styles: {
        //             name: 'main',
        //             test: /\.scss$/,
        //             chunks: 'all',
        //             enforce: true,
        //         },
        //     }
        // }
    },
};

module.exports = merge(baseConfig, prodConfig);