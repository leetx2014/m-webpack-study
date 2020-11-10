const less = require("less");

/**
 * m-less-loader
 * @param {*} source .less 文件内容
 */
module.exports = function (source) {
  // 通过 less 进行语法转译，返回转译后的 css 对象给 css-loader 处理
  less.render(source, (err, output) => {
    const { css } = output;
    this.callback(err, css);
  })
};