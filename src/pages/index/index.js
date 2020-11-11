import css from "./index.less";
import imgSrc from "../../images/webpackImg.jpeg";

import counter from "./counter";
import number from "./number";

console.log("====================================");
console.log("Index Page");
console.log("====================================");

const imgTag = new Image();
imgTag.src = imgSrc;
document.getElementById("app").appendChild(imgTag);

const btn = document.createElement("button");
btn.innerHTML = "新增";
document.body.appendChild(btn);

btn.onclick = function () {
  const div = document.createElement("div");
  div.innerHTML = "item";
  document.body.appendChild(div);
};


counter();
number();

if (module.hot) {
  module.hot.accept("./number", function() {
    document.body.removeChild(document.getElementById("number"));
    number();
  });
}
