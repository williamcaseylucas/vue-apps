import "./modulepreload-polyfill.js";
import { W as WebApp$1 } from "./WebApp.js";
import { _ as _imports_0 } from "./parthenon.js";
import { _ as _sfc_main$1 } from "./room.js";
import "./top.js";
import { c as createElementBlock, a as createVNode, b as createBaseVNode, o as openBlock } from "./vendor.js";
const _hoisted_1 = { id: "room" };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", { class: "spacer" }, [
  /* @__PURE__ */ createBaseVNode("img", {
    src: _imports_0,
    width: "250"
  }),
  /* @__PURE__ */ createBaseVNode("div", { class: "squareoff" }, "Presence in VR is usually conceived of as forgetting that the medium is there. The idea is that if the user can be enticed into behaving as if she were not aware of all the complex technology, then she feels presence.")
], -1);
const _sfc_main = {
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_sfc_main$1, { msg: "Presence" }),
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
