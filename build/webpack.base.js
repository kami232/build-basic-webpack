/*
webpack 基础配置
 */
const path = require('path');
const fs = require('fs');
const os = require('os');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const WebpackBar = require('webpackbar');

const devMode = process.env.NODE_ENV !== 'production';

// webpack 插件
const plugins = [
    new WebpackBar(),
    new HappyPack({
        id: 'js',
        loaders: [
            'babel-loader',
            {
                loader: 'eslint-loader',
                options: {
                    formatter: require('eslint-friendly-formatter'),
                    fix: true
                }
            }
        ],
        threadPool: happyThreadPool,
        verbose: true,
    }),
    new HtmlWebpackPlugin({
        template: 'src/index.html' // 指定模板
    }),
    new MiniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name].[hash:8].css',
        chunkFilename: devMode ? '[name].chunk.css' : '[name].[hash:8].chunk.css'
    }),
    new VueLoaderPlugin()
];

const dllFiles = fs.readdirSync(path.resolve(__dirname, '../lib'));
dllFiles.forEach(file => {
    if (/.*\.dll.js/.test(file)) {
        plugins.push(
          new AddAssetHtmlWebpackPlugin({
              filepath: path.resolve(__dirname, '../lib', file)
          })
        );
    }
    if (/.*\.manifest.json/.test(file)) {
        plugins.push(
          new webpack.DllReferencePlugin({
              manifest: path.resolve(__dirname, '../lib', file)
          })
        );
    }
});

module.exports = {
    mode: devMode ? 'development' : 'production',
    devtool: devMode ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
    entry: {
        main: './src/main.js',
    },
    output: {
        filename: devMode ? 'js/[name].js' : 'js/[name].[contenthash:8].js',
        chunkFilename: devMode ? 'js/[name].js' : 'js/[name].[contenthash:8].js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.(sc|sa|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: devMode,
                            reloadAll: devMode,
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: true
                        }
                    },
                    'sass-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash].[ext]',
                        outputPath: 'images/',
                        limit: 10480
                    }
                }
            },
            {
                test: /\.(eot|ttf|svg|woff2|woff)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'fonts/',
                    }
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'happypack/loader?id=js',
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                use: [
                    'vue-loader'
                ]
            }
        ]
    },
    plugins: plugins,
    optimization: {
        minimize: !devMode,
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: { // 组
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    resolve: {
        extensions: ['.js', '.vue', '.jsx'],
        alias: {
            // 配置路径别名
        }
    }
};