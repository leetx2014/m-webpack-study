import css from './index.less';
import imgSrc from '../../images/webpackImg.jpeg'

console.log('====================================');
console.log('Index Page');
console.log('====================================');

const imgTag = new Image();
imgTag.src = imgSrc;
document.getElementById("app").appendChild(imgTag);
