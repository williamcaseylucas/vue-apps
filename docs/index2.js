import { W as WebApp$1 } from "./WebApp.js";
import { _ as _imports_0 } from "./logo.js";
import { p as pushScopeId, a as popScopeId, r as reactive, o as openBlock, c as createBlock, b as createVNode, t as toDisplayString, u as unref, F as Fragment, f as createTextVNode } from "./vendor.js";
/* empty css     */var HelloWorld_vue_vue_type_style_index_0_scoped_true_lang = "\n";
pushScopeId("data-v-492f8d2b");
const _hoisted_1$1 = /* @__PURE__ */ createVNode("p", null, [
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
const _hoisted_2$1 = /* @__PURE__ */ createVNode("p", null, [
  /* @__PURE__ */ createTextVNode(" Edit "),
  /* @__PURE__ */ createVNode("code", null, "components/HelloWorld.vue"),
  /* @__PURE__ */ createTextVNode(' to test hot module replacement while running project as "npm run dev". ')
], -1);
popScopeId();
const _sfc_main$1 = {
  expose: [],
  props: {
    msg: String
  },
  setup(__props) {
    const state = reactive({ count: 0 });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Fragment, null, [
        createVNode("h1", null, toDisplayString(__props.msg), 1),
        _hoisted_1$1,
        createVNode("button", {
          "xr-layer": "",
          onClick: _cache[1] || (_cache[1] = ($event) => unref(state).count++)
        }, "count is: " + toDisplayString(unref(state).count), 1),
        _hoisted_2$1
      ], 64);
    };
  }
};
_sfc_main$1.__scopeId = "data-v-492f8d2b";
var App_vue_vue_type_style_index_0_scoped_true_lang = "\n";
pushScopeId("data-v-3737d0ff");
const _hoisted_1 = { id: "top" };
const _hoisted_2 = /* @__PURE__ */ createVNode("img", {
  alt: "Vue logo",
  src: _imports_0
}, null, -1);
popScopeId();
const _sfc_main = {
  expose: [],
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock("div", _hoisted_1, [
        _hoisted_2,
        createVNode(_sfc_main$1, { msg: "Vue Component with Local Button Count" })
      ]);
    };
  }
};
_sfc_main.__scopeId = "data-v-3737d0ff";
class WebApp extends WebApp$1 {
  constructor() {
    super(_sfc_main, 500, 500);
  }
}
let app = new WebApp();
app.mount();
app.$el.style.border = "solid 0.1em";
