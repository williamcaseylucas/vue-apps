import { p as pushScopeId, f as popScopeId, i as inject, o as openBlock, c as createElementBlock, b as createBaseVNode, t as toDisplayString, u as unref, F as Fragment } from "./vendor.js";
var NetworkedHelloWorld_vue_vue_type_style_index_0_scoped_true_lang = "\na[data-v-22fbac40] {\n  color: #b542b9;\n}\n.fade[data-v-22fbac40] {\n  color: #9803a5;\n  /* transition: color 1s; */\n}\n.fade[data-v-22fbac40]:hover {\n  color: #a78e06;\n}\n";
pushScopeId("data-v-22fbac40");
const _hoisted_1 = {
  "xr-layer": "",
  class: "fade"
};
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("p", null, " Here's some more text just to make things not blank. ", -1);
popScopeId();
const _sfc_main = {
  props: {
    msg: String
  },
  setup(__props) {
    const shared = inject("shared");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("h1", _hoisted_1, toDisplayString(__props.msg), 1),
        _hoisted_2,
        createBaseVNode("button", {
          "xr-layer": "",
          onClick: _cache[0] || (_cache[0] = (...args) => unref(shared).increment && unref(shared).increment(...args))
        }, "count is: " + toDisplayString(unref(shared).state.count), 1)
      ], 64);
    };
  }
};
_sfc_main.__scopeId = "data-v-22fbac40";
export { _sfc_main as _ };
