// 读取配置
const options = require("./webpack.config");

// 引入 webpack
const webpack = require("./lib/webpack");

// 接收配置 & 启动入口函数
new webpack(options).run();
