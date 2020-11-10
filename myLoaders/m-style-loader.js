/**
 * m-style-loader
 * @param {*} source 
 */
module.exports = function (source) {
  return `
    const styleTag = document.createElement("style");
    styleTag.innerHTML = ${source};
    document.head.appendChild(styleTag);
  `;
};