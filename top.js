var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __require = typeof require !== "undefined" ? require : (x) => {
  throw new Error('Dynamic require of "' + x + '" is not supported');
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { e as createApp } from "./vendor.js";
class VueApp {
  constructor(App, width, height, createOptions = {}) {
    __publicField(this, "takeOwnership");
    __publicField(this, "setSharedData");
    __publicField(this, "width");
    __publicField(this, "height");
    __publicField(this, "vueApp");
    __publicField(this, "vueRoot");
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
var top = "/* http://meyerweb.com/eric/tools/css/reset/\n   v4.0 | 20180602\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmain, menu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, main, menu, nav, section {\n  display: block;\n}\n";
export { VueApp as V };
