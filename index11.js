import "./modulepreload-polyfill.js";
import { W as WebApp$1 } from "./WebApp.js";
import "./room.js";
import "./top.js";
import { c as createElementBlock, o as openBlock, b as createBaseVNode } from "./vendor.js";
const _hoisted_1 = { id: "room" };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", { class: "postertitle" }, "AR & VR as reality media", -1);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("div", { class: "spacer" }, [
  /* @__PURE__ */ createBaseVNode("div", { class: "flushleft" }, [
    /* @__PURE__ */ createBaseVNode("br"),
    /* @__PURE__ */ createBaseVNode("h3", null, " Some of the key differences between \u201Cclassic\u201D VR and AR"),
    /* @__PURE__ */ createBaseVNode("br"),
    /* @__PURE__ */ createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /* @__PURE__ */ createBaseVNode("br"),
    /* @__PURE__ */ createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino\u2019s virtuality continuum")
  ])
], -1);
const _hoisted_4 = [
  _hoisted_2,
  _hoisted_3
];
const _sfc_main = {
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, _hoisted_4);
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
