import "./modulepreload-polyfill.js";
import { W as WebApp$1 } from "./WebApp.js";
import { _ as _sfc_main$1 } from "./CenterTitle.js";
import "./top.js";
/* empty css      */import { c as createElementBlock, a as createVNode, b as createBaseVNode, o as openBlock } from "./vendor.js";
var _imports_0 = "/vue-apps/assets/laciotat.587c0a3d.jpg";
const _hoisted_1 = { id: "room" };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", { class: "spacer" }, [
  /* @__PURE__ */ createBaseVNode("img", {
    src: _imports_0,
    width: "250"
  }),
  /* @__PURE__ */ createBaseVNode("div", { class: "squareoff" }, "Film became one of the most important reality media of the twentieth century, and in some ways, it is a forerunner of virtual reality.")
], -1);
const _sfc_main = {
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_sfc_main$1, { msg: "The LaCiotat Effect" }),
        _hoisted_2
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
