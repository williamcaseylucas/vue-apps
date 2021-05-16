import {_ as _imports_0} from "./logo.js";
import {p as pushScopeId, a as popScopeId, r as reactive, o as openBlock, b as createBlock, d as createVNode, t as toDisplayString, u as unref, F as Fragment} from "./vendor.js";
var SomeText_vue_vue_type_style_index_0_scoped_true_lang = "\na[data-v-20a5fcc1] {\n  color: #b542b9;\n}\n";
pushScopeId("data-v-20a5fcc1");
const _hoisted_1$1 = /* @__PURE__ */ createVNode("p", null, " Here's some more text just to make things not blank. ", -1);
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
        }, "count is: " + toDisplayString(unref(state).count), 1)
      ], 64);
    };
  }
};
_sfc_main$1.__scopeId = "data-v-20a5fcc1";
var AppText_vue_vue_type_style_index_0_scoped_true_lang = "\n#top[data-v-5fab10e2] {\n  font-family: Avenir, Helvetica, Arial, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-align: center;\n  color: #50312c;\n  margin-top: 30px;\n\n  width: 400px; height: 450px;\n  position: absolute;\n}\n";
pushScopeId("data-v-5fab10e2");
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
        createVNode(_sfc_main$1, {msg: "Some Text We passed to the SomeText Component"})
      ]);
    };
  }
};
_sfc_main.__scopeId = "data-v-5fab10e2";
export {_sfc_main as _};
