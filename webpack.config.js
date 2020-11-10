// webpack 基于 node 运行，因此可以直接使用
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"), // 绝对路径
  },
  mode: "development",
  devtool: "inline-source-map", //source-map inline-source-map cheap-source-map
  devServer: {
    contentBase: "./dist",
    open: true,
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:9092"
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "images/",
            publicPath: "../images",
            limit: 1024 * 3, // 阈值 超过阈值的图片会独立文件，没有超过会处理成base64
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "MyApp",
      template: "./src/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    })
  ]
};
