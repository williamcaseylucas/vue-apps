import {_ as _imports_0} from "./logo.js";
import {p as pushScopeId, a as popScopeId, r as reactive, o as openBlock, b as createBlock, d as createVNode, t as toDisplayString, u as unref, F as Fragment} from "./vendor.js";
var SomeText_vue_vue_type_style_index_0_scoped_true_lang = "\na[data-v-50c804dc] {\n  color: #b542b9;\n}\n*[data-v-50c804dc] {\n    line-height : normal;\n}\np[data-v-50c804dc] {\n    display: block;\n    margin-block-start: 1em;\n    margin-block-end: 1em;\n    margin-inline-start: 0px;\n    margin-inline-end: 0px;\n}\nh1[data-v-50c804dc] {\n    display: block;\n    font-size: 2em;\n    margin-block-start: 0.67em;\n    margin-block-end: 0.67em;\n    margin-inline-start: 0px;\n    margin-inline-end: 0px;\n    font-weight: bold;\n}\nbutton[data-v-50c804dc] {\n    appearance: auto;\n    -webkit-writing-mode: horizontal-tb !important;\n    text-rendering: auto;\n    color: -internal-light-dark(black, white);\n    letter-spacing: normal;\n    word-spacing: normal;\n    text-transform: none;\n    text-indent: 0px;\n    text-shadow: none;\n    display: inline-block;\n    text-align: center;\n    align-items: flex-start;\n    cursor: default;\n    background-color: -internal-light-dark(rgb(239, 239, 239), rgb(59, 59, 59));\n    box-sizing: border-box;\n    margin: 0em;\n    font: 400 13.3333px Arial;\n    padding: 1px 6px;\n    border-width: 2px;\n    border-style: outset;\n    border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));\n    border-image: initial;\n    border-radius: 2px;\n}\n";
pushScopeId("data-v-50c804dc");
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
_sfc_main$1.__scopeId = "data-v-50c804dc";
var AppText_vue_vue_type_style_index_0_scoped_true_lang = "\n#top[data-v-4e6b9bdb] {\n  font-family: Avenir, Helvetica, Arial, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-align: center;\n  color: #50312c;\n  margin-top: 30px;\n\n  width: 400px; height: 450px;\n  position: absolute;\n\n  display: block;\n  background-color: white;\n}\n*[data-v-4e6b9bdb] {\n    box-sizing: content-box;\n}\nimg[data-v-4e6b9bdb] {\n    max-width: none;\n        display: inline;\n}\n";
pushScopeId("data-v-4e6b9bdb");
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
_sfc_main.__scopeId = "data-v-4e6b9bdb";
export {_sfc_main as _};
