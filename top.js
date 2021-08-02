import { e as createApp } from "./vendor.js";
class VueApp {
  constructor(App, width, height, createOptions = {}) {
    this.takeOwnership = this.takeOwnershipProto.bind(this);
    this.setSharedData = this.setSharedDataProto.bind(this);
    this.width = width;
    this.height = height;
    this.vueApp = createApp(App, createOptions);
  }
  mount() {
  }
  takeOwnershipProto() {
    return true;
  }
  setSharedDataProto(object) {
    return true;
  }
}
var top = "/* http://meyerweb.com/eric/tools/css/reset/\n   v4.0 | 20180602\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmain, menu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, main, menu, nav, section {\n  display: block;\n}\n\n/* Now, our styles */\n\n#top {\n    font-family: Avenir, Helvetica, Arial, sans-serif;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    text-align: center;\n    color: #50312c;\n    margin: 30px;\n    border: 5;\n    border-radius: 10px;\n    border-color: red;\n    position: absolute;\n  \n    display: block;\n    background-color: white;\n  }\n\n  * {\n    line-height : normal;\n    box-sizing: content-box;\n  }\n\n  img {\n    max-width: none;\n    display: inline;\n  }\n\n  a {\n    color: #42b983;\n  }\n  \n  p {\n      display: block;\n      margin-block-start: 1em;\n      margin-block-end: 1em;\n      margin-inline-start: 0px;\n      margin-inline-end: 0px;\n  }\n  \n  h1 {\n      display: block;\n      font-size: 2em;\n      margin-block-start: 0.67em;\n      margin-block-end: 0.67em;\n      margin-inline-start: 0px;\n      margin-inline-end: 0px;\n      font-weight: bold;\n  }\n  \n  button {\n      width: auto;\n      height: auto;\n      appearance: auto;\n      -webkit-writing-mode: horizontal-tb !important;\n      text-rendering: auto;\n      color: -internal-light-dark(black, white);\n      letter-spacing: normal;\n      word-spacing: normal;\n      text-transform: none;\n      text-indent: 0px;\n      text-shadow: none;\n      display: inline-block;\n      text-align: center;\n      align-items: flex-start;\n      cursor: default;\n      background-color: -internal-light-dark(rgb(239, 239, 239), rgb(59, 59, 59));\n      box-sizing: border-box;\n      margin: 0em;\n      font: 400 13.3333px Arial;\n      padding: 1px 6px;\n      border-width: 2px;\n      border-style: outset;\n      border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));\n      border-image: initial;\n      border-radius: 2px;\n  }\n  \n  /* button :hover {\n    background-color: -internal-light-dark(rgb(150, 150, 150), rgb(121, 121, 121));\n} */\n";
export { VueApp as V };
