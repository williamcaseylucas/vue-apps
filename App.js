import { _ as _imports_0 } from "./logo.js";
import { p as pushScopeId, b as popScopeId, i as inject, o as openBlock, c as createBlock, d as createVNode, t as toDisplayString, u as unref, F as Fragment } from "./vendor.js";
import "./top.js";
var NetworkedHelloWorld_vue_vue_type_style_index_0_scoped_true_lang = "\na[data-v-22fbac40] {\n  color: #b542b9;\n}\n.fade[data-v-22fbac40] {\n  color: #9803a5;\n  /* transition: color 1s; */\n}\n.fade[data-v-22fbac40]:hover {\n  color: #a78e06;\n}\n";
pushScopeId("data-v-22fbac40");
const _hoisted_1$1 = {
  "xr-layer": "",
  class: "fade"
};
const _hoisted_2$1 = /* @__PURE__ */ createVNode("p", null, " Here's some more text just to make things not blank. ", -1);
popScopeId();
const _sfc_main$1 = {
  props: {
    msg: String
  },
  setup(__props) {
    const shared = inject("shared");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Fragment, null, [
        createVNode("h1", _hoisted_1$1, toDisplayString(__props.msg), 1),
        _hoisted_2$1,
        createVNode("button", {
          "xr-layer": "",
          onClick: _cache[1] || (_cache[1] = (...args) => unref(shared).increment && unref(shared).increment(...args))
        }, "count is: " + toDisplayString(unref(shared).state.count), 1)
      ], 64);
    };
  }
};
_sfc_main$1.__scopeId = "data-v-22fbac40";
var App_vue_vue_type_style_index_0_scoped_true_lang = "\n";
pushScopeId("data-v-6b7e979c");
const _hoisted_1 = { id: "top" };
const _hoisted_2 = /* @__PURE__ */ createVNode("img", {
  alt: "Vue logo",
  src: _imports_0
}, null, -1);
popScopeId();
const _sfc_main = {
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock("div", _hoisted_1, [
        _hoisted_2,
        createVNode(_sfc_main$1, { msg: "Networked Vue Component with Shared Button Count" })
      ]);
    };
  }
};
_sfc_main.__scopeId = "data-v-6b7e979c";
export { _sfc_main as _ };
