import "./modulepreload-polyfill.js";
import { W as WebApp$1 } from "./WebApp.js";
import { _ as _sfc_main$1 } from "./room.js";
import "./top.js";
import { c as createElementBlock, b as createBaseVNode, a as createVNode, o as openBlock } from "./vendor.js";
var _imports_0 = "/vue-apps/assets/uncanny.2d827497.jpg";
const _hoisted_1 = { id: "room" };
const _hoisted_2 = { class: "spacer" };
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("img", {
  src: _imports_0,
  width: "200"
}, null, -1);
const _hoisted_4 = /* @__PURE__ */ createBaseVNode("div", { class: "squareoff" }, "3-D computer graphics help to construct the visual realities of AR and VR, that is photorealism. The uncanny valley.", -1);
const _sfc_main = {
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(_sfc_main$1, { msg: "3-D Graphics & Tracking" }),
          _hoisted_3,
          _hoisted_4
        ])
      ]);
    };
  }
};
class WebApp extends WebApp$1 {
  constructor() {
    super(_sfc_main, 300, 475);
  }
}
let app = new WebApp();
app.mount();
app.$el.style.border = "solid 0.1em";
