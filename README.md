# build-basic-webpack
基于webpack打包快速搭建简单项目

# 使用
打包使用：
1. 首先在 `webpack.dll.js` 文件下配置要独立打包的第三方模块。
2. 使用 `npm run build-dll` 命令打包第三方模块。
3. 使用 `npm run build` 命令打包项目

- 该配置默认使用了 `vue` 框架/ `sass`/ `eslint` / `lodash` 库



项目目录

```
|- dist 打包后的文件
|- build 配置文件
|- src
|	|-assets
|	|-components
|	|-pages
|	|-router
|	|-static
|	|-store
|	|-App.vue
|	|-index.html
|	|-main.js
|-.babelrc babel配置
|-.eslintrc.js eslint配置
|-postcss.config.js
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