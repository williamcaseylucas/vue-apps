import "./modulepreload-polyfill.js";
import { W as WebApp$1 } from "./WebApp.js";
import { _ as _sfc_main$1 } from "./room.js";
import "./top.js";
import { c as createElementBlock, b as createBaseVNode, a as createVNode, g as createTextVNode, o as openBlock } from "./vendor.js";
var _imports_0 = "/vue-apps/assets/laciotat-VR.4c447795.jpg";
const _hoisted_1 = { id: "room" };
const _hoisted_2 = { class: "spacer" };
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("img", {
  src: _imports_0,
  width: "250"
}, null, -1);
const _hoisted_4 = /* @__PURE__ */ createBaseVNode("div", { class: "squareoff" }, " Each reality medium mediates and remediates. It offers a new representation of the world that we implicitly compare to our experience of the world in itself, but also through other media.", -1);
const _hoisted_5 = /* @__PURE__ */ createBaseVNode("p", null, [
  /* @__PURE__ */ createBaseVNode("a", {
    href: "https://realitymedia.digital",
    target: "_blank"
  }, " Start at the reality media site. "),
  /* @__PURE__ */ createTextVNode(" | ")
], -1);
const _sfc_main = {
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(_sfc_main$1, { msg: "AR & VR as reality media" }),
          _hoisted_3,
          _hoisted_4
        ]),
        _hoisted_5
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
