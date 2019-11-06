# build-basic-webpack
基于webpack打包快速搭建简单项目

# 项目依赖
打包使用：
1. 首先在 `webpack.dll.js` 文件下配置要独立打包的第三方模块。
2. 使用 `npm run build-dll` 命令打包第三方模块。
3. 使用 `npm run build` 命令打包项目

- 该配置默认使用了 `vue` 框架/ `sass`/ `eslint` / `lodash` 库

```json
"devDependencies": {
    "@babel/core": "^7.6.4",
    "@babel/plugin-syntax-dynamic-import": "^7.2.0", // 异步加载
    "@babel/plugin-transform-runtime": "^7.6.2",
    "@babel/preset-env": "^7.6.3",
    "autoprefixer": "^9.7.1", // 自动添加css兼容前缀
    "babel-loader": "^8.0.6",
    "clean-webpack-plugin": "^3.0.0", // 删除打包文件
    "cross-env": "^6.0.3", // 区分环境统一
    "css-loader": "^3.2.0",
    "eslint": "^6.6.0", // 代码风格检查
    "eslint-loader": "^3.0.2",
    "eslint-plugin-vue": "^5.2.3",
    "file-loader": "^4.2.0",
    "html-webpack-plugin": "^3.2.0", // 生成html模板
    "mini-css-extract-plugin": "^0.8.0", // 提取css
    "node-sass": "^4.13.0", // sass
    "optimize-css-assets-webpack-plugin": "^5.0.3", // css压缩
    "postcss-loader": "^3.0.0", 
    "sass-loader": "^8.0.0",
    "style-loader": "^1.0.0",
    "terser-webpack-plugin": "^2.2.1", // js 压缩
    "url-loader": "^2.2.0",
    "vue": "^2.6.10",
    "vue-loader": "^15.7.2",
    "vue-template-compiler": "^2.6.10", 
    "webpack": "^4.41.2",
    "webpack-cli": "^3.3.10",
    "webpack-dev-server": "^3.9.0",
    "webpack-merge": "^4.2.2" // 合并webpack配置
  },
  "dependencies": {
    "@babel/runtime": "^7.6.3",
    "@babel/runtime-corejs2": "^7.6.3",
    "add-asset-html-webpack-plugin": "^3.1.3", // 添加静态资源
    "lodash": "^4.17.15" // ladash 库
  }
```

# 优化
## 打包分析

> 分析工具：http://webpack.github.com/analyse


需要打包的时候添加上`webpack --profile --json > stats.json` 生成分析文件

## webpack性能优化

1. Node、Npm、Yarn尽量使用新的。

2. 尽量少用loader。

3. plugins尽可能精简

4. resolve参数合理配置

5. 使用DllPlugin提高打包速度

   1. 单独为第三方模块写配置文件打包。
   2. `add-asset-html-webpack-plugin`插件为html文件添加静态资源。  
   3. 然后在json文件配置

   ```javascript
   new AddAssetHtmlWebpackPlugin({ // 添加静态文件
       filepath: path.resolve(__dirname, '生成的静态js文件地址')
   }),
   new webpack.DllReferencePlugin({
       // 打包第三方模块的时候，会到这个json中找映射关系，如果找到了就直接使用静态文件，否则就打包
       manifest: path.resolve(__dirname, '生成的json映射文件地址')
   })
   ```
6. 控制包的大小

7. thread-loader,parallel-webpack,happypack多进程打包

8. 合理使用sourceMap

9. 结合stats分析打包结果