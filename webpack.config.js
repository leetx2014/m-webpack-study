// webpack 基于 node 运行，因此可以直接使用
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"), // 绝对路径
  },
  mode: "development",
  resolveLoader: {
    modules: ["node_modules", "myLoaders"]
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          "m-style-loader",
          "m-css-loader",
          "m-less-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "MyApp",
      template: "./src/index.html",
      filename: "index.html",
    })
  ]
};
