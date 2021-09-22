var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __require = typeof require !== "undefined" ? require : (x) => {
  throw new Error('Dynamic require of "' + x + '" is not supported');
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import "./modulepreload-polyfill.js";
import { W as WebApp$1 } from "./WebApp.js";
import { _ as _imports_0 } from "./logo.js";
import { _ as _sfc_main$1 } from "./NetworkedHelloWorld.js";
import "./top.js";
import { c as createElementBlock, a as createVNode, b as createBaseVNode, o as openBlock, r as reactive, d as readonly } from "./vendor.js";
const _hoisted_1 = { id: "top" };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("img", {
  alt: "Vue logo",
  src: _imports_0
}, null, -1);
const _sfc_main = {
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _hoisted_2,
        createVNode(_sfc_main$1, { msg: "Networked Vue Component with Shared Button Count" })
      ]);
    };
  }
};
class Store {
  constructor(app2) {
    __publicField(this, "_state");
    __publicField(this, "state");
    __publicField(this, "app");
    this._state = reactive({
      count: 0
    });
    this.app = app2;
    this.state = readonly(this._state);
  }
  increment() {
    if (this.app.takeOwnership()) {
      this._state.count++;
      this.app.setSharedData(this.state);
    }
  }
  updateSharedData(dataObject) {
    this._state.count = dataObject.count;
  }
}
class WebApp extends WebApp$1 {
  constructor() {
    super(_sfc_main, 400, 475);
    __publicField(this, "shared");
    this.shared = new Store(this);
    this.vueApp.provide("shared", this.shared);
    console.log(JSON.stringify(this.shared.state));
  }
}
let app = new WebApp();
app.mount();
app.vueRoot.$el.style.border = "solid 0.1em";
