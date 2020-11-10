const path = require("path");
const glob = require("glob");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

/**
 * 多页面打包
 */
const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];

  const entryFiles = glob.sync(path.join(__dirname, "./src/pages/*/index.js"));
  entryFiles.map(entryFile => {
    const entryFileMatch = entryFile.match(/src\/pages\/(.*)\/index\.js$/);
    const pageName = entryFileMatch[1];
    entry[pageName] = entryFile;
    htmlWebpackPlugins.push(new HtmlWebpackPlugin({
      // template: `./src/pages/${pageName}/index.html`,
      template: `./src/pubilc/index.html`,
      filename: `${pageName}.html`,
      title: pageName,
      chunks: [pageName]
    }));
  });

  return { entry, htmlWebpackPlugins };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"), // 绝对路径
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
            // publicPath: "./images",
            limit: 1024 * 3, // 阈值 超过阈值的图片会独立文件，没有超过会处理成base64
          }
        }
      }
    ]
  },
  plugins: [
    ...htmlWebpackPlugins,
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new CleanWebpackPlugin()
  ]
};
