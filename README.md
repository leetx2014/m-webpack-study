## webpack demo

自己学习使用， demo 使用 webpack 4.x 版本（webpack@4.44.2 webpack-cli@3.3.12）
[Webpack](https://webpack.docschina.org/)

### 安装

```PowerShell
# webpack 基于 node 运行，因此需先安装 node 环境（https://nodejs.org/en/）

# 全局安装（不推荐，会将项目中 webpack 版本锁定，造成不同项目因 webpack 版本不同，导致冲突 & 构建失败）
$ npm install webpack webpack-cli -g

# 局部安装（在当前项目中安装，安装最新版时将版本取出即可）
npm i webpack@4.44.2 webpack-cli@3.3.12 -D
```

### 启动

```PowerShell
# 使用 npx
$ npx webpack

# 在 package.json 中配置 npm script，如 "build": "webpack"
$ npm run build
```

### 基本概念

webpack 支持零配置，也可使用默认配置文件：webpack.config.js 进行更多功能配置。

- `chunk` 指代码块
- `bundle` 产出文件
- `entry` 入口配置
- `output` 输出配置
- `mode` 打包构建的模式
- `module` 配置项目中不同类型模块的处理规则
- `loader` 扩展 webpack 支持多类型源代码转换的工具函数
- `plugin` webpack 功能扩展，如：打包优化，资源管理等
- `devtool` 控制是否生成，以及如何生成 source map
- `devServer` 配置 webpack-dev-server 行为的选项

### 基本使用









