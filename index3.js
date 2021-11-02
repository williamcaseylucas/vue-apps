import "./modulepreload-polyfill.js";
import { W as WebApp$1 } from "./WebApp.js";
import { _ as _sfc_main$1 } from "./CenterTitle.js";
import "./top.js";
/* empty css      */import { c as createElementBlock, a as createVNode, b as createBaseVNode, o as openBlock } from "./vendor.js";
var _imports_0 = "/vue-apps/assets/rotunda-map.d49ee195.png";
const _hoisted_1 = { id: "room" };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("img", {
  src: _imports_0,
  width: "250"
}, null, -1);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("div", { class: "displaytext" }, "AR allows us to extend our physical reality; VR creates for us a different reality.", -1);
const _sfc_main = {
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_sfc_main$1, { msg: "Reality Media" }),
        _hoisted_2,
        _hoisted_3
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
