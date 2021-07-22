import { _ as _imports_0 } from "./logo.js";
import { p as pushScopeId, b as popScopeId, r as reactive, o as openBlock, d as createBlock, e as createVNode, t as toDisplayString, u as unref, F as Fragment, f as createTextVNode, i as inject } from "./vendor.js";
/* empty css     */var HelloWorld_vue_vue_type_style_index_0_scoped_true_lang = "\na[data-v-051ea7d4] {\n  color: #b542b9;\n}\n.fade[data-v-051ea7d4] {\n  color: #9803a5;\n  /* transition: color 1s; */\n}\n.fade[data-v-051ea7d4]:hover {\n  color: #06a71b;\n}\n";
pushScopeId("data-v-051ea7d4");
const _hoisted_1$1 = {
  "xr-layer": "",
  class: "fade"
};
const _hoisted_2$1 = /* @__PURE__ */ createVNode("p", null, [
  /* @__PURE__ */ createVNode("a", {
    href: "https://vitejs.dev/guide/features.html",
    target: "_blank"
  }, " Vite Documentation and Then Some! "),
  /* @__PURE__ */ createTextVNode(" | "),
  /* @__PURE__ */ createVNode("a", {
    href: "https://v3.vuejs.org/",
    target: "_blank"
  }, "Vue 3 Documentation")
], -1);
popScopeId();
const _sfc_main$1 = {
  props: {
    msg: String
  },
  setup(__props) {
    const state = reactive({ count: 0 });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Fragment, null, [
        createVNode("h1", _hoisted_1$1, toDisplayString(__props.msg), 1),
        _hoisted_2$1,
        createVNode("button", {
          "xr-layer": "",
          onClick: _cache[1] || (_cache[1] = ($event) => unref(state).count++)
        }, "count is: " + toDisplayString(unref(state).count), 1)
      ], 64);
    };
  }
};
_sfc_main$1.__scopeId = "data-v-051ea7d4";
var App_vue_vue_type_style_index_0_scoped_true_lang = "\n#edit[data-v-1e7ebfa2] {\n  color: #000000;\n}\n#edit.upclose[data-v-1e7ebfa2] {\n  color: #c00303;\n}\n";
pushScopeId("data-v-1e7ebfa2");
const _hoisted_1 = { id: "top" };
const _hoisted_2 = /* @__PURE__ */ createVNode("img", {
  alt: "Vue logo",
  src: _imports_0
}, null, -1);
const _hoisted_3 = /* @__PURE__ */ createTextVNode(" Edit code in ");
const _hoisted_4 = /* @__PURE__ */ createVNode("code", null, "src/apps", -1);
const _hoisted_5 = /* @__PURE__ */ createTextVNode(' to test hot module replacement while running project as "npm run dev". ');
popScopeId();
const _sfc_main = {
  setup(__props) {
    const shared = inject("shared");
    return (_ctx, _cache) => {
      return openBlock(), createBlock("div", _hoisted_1, [
        _hoisted_2,
        createVNode(_sfc_main$1, { msg: "Vue Component with Local Button Count" }),
        createVNode("p", {
          id: "edit",
          class: { upclose: unref(shared).state.close },
          "xr-layer": ""
        }, [
          _hoisted_3,
          _hoisted_4,
          _hoisted_5
        ], 2)
      ]);
    };
  }
};
_sfc_main.__scopeId = "data-v-1e7ebfa2";
export { _sfc_main as _ };
