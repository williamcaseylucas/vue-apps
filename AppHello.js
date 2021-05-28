import {_ as _imports_0} from "./logo.js";
import {p as pushScopeId, d as popScopeId, r as reactive, o as openBlock, e as createBlock, f as createVNode, t as toDisplayString, u as unref, F as Fragment, g as createTextVNode} from "./vendor.js";
var HelloWorld_vue_vue_type_style_index_0_scoped_true_lang = "\na[data-v-f88e72d8] {\n  color: #42b983;\n}\n*[data-v-f88e72d8] {\n    box-sizing: content-box;\n}\np[data-v-f88e72d8] {\n    display: block;\n    margin-block-start: 1em;\n    margin-block-end: 1em;\n    margin-inline-start: 0px;\n    margin-inline-end: 0px;\n}\nh1[data-v-f88e72d8] {\n    display: block;\n    font-size: 2em;\n    margin-block-start: 0.67em;\n    margin-block-end: 0.67em;\n    margin-inline-start: 0px;\n    margin-inline-end: 0px;\n    font-weight: bold;\n}\n";
pushScopeId("data-v-f88e72d8");
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
  /* @__PURE__ */ createTextVNode(" to test hot module replacement. ")
], -1);
popScopeId();
const _sfc_main$1 = {
  expose: [],
  props: {
    msg: String
  },
  setup(__props) {
    const state = reactive({count: 0});
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Fragment, null, [
        createVNode("h1", null, toDisplayString(__props.msg), 1),
        _hoisted_1$1,
        createVNode("button", {
          onClick: _cache[1] || (_cache[1] = ($event) => unref(state).count++)
        }, "count is: " + toDisplayString(unref(state).count), 1),
        _hoisted_2$1
      ], 64);
    };
  }
};
_sfc_main$1.__scopeId = "data-v-f88e72d8";
var AppHello_vue_vue_type_style_index_0_scoped_true_lang = "\n#top[data-v-5bce6015] {\n  font-family: Avenir, Helvetica, Arial, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-align: center;\n  color: #50312c;\n  margin-top: 30px;\n\n  width: 400px; height: 500px;\n  position: absolute;\n\n  display: block;\n  background-color: white;\n}\n*[data-v-5bce6015] {\n    box-sizing: content-box;\n}\nimg[data-v-5bce6015] {\n    max-width: none;\n        display: inline;\n}\n";
pushScopeId("data-v-5bce6015");
const _hoisted_1 = {id: "top"};
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
        createVNode(_sfc_main$1, {msg: "Hello From the HelloWorld Component"})
      ]);
    };
  }
};
_sfc_main.__scopeId = "data-v-5bce6015";
export {_sfc_main as _};
