import {_ as _imports_0} from "./logo.js";
import {p as pushScopeId, b as popScopeId, r as reactive, o as openBlock, d as createBlock, e as createVNode, t as toDisplayString, u as unref, F as Fragment, f as createTextVNode} from "./vendor.js";
var HelloWorld_vue_vue_type_style_index_0_scoped_true_lang = "\na[data-v-fc4b85ee] {\n  color: #42b983;\n}\n*[data-v-fc4b85ee] {\n    box-sizing: content-box;\n    line-height : normal;\n}\np[data-v-fc4b85ee] {\n    display: block;\n    margin-block-start: 1em;\n    margin-block-end: 1em;\n    margin-inline-start: 0px;\n    margin-inline-end: 0px;\n}\nh1[data-v-fc4b85ee] {\n    display: block;\n    font-size: 2em;\n    margin-block-start: 0.67em;\n    margin-block-end: 0.67em;\n    margin-inline-start: 0px;\n    margin-inline-end: 0px;\n    font-weight: bold;\n}\nbutton[data-v-fc4b85ee] {\n    /* width: 100px;\n    height: 30px; */\n    appearance: auto;\n    -webkit-writing-mode: horizontal-tb !important;\n    text-rendering: auto;\n    color: -internal-light-dark(black, white);\n    letter-spacing: normal;\n    word-spacing: normal;\n    text-transform: none;\n    text-indent: 0px;\n    text-shadow: none;\n    display: inline-block;\n    text-align: center;\n    align-items: flex-start;\n    cursor: default;\n    background-color: -internal-light-dark(rgb(239, 239, 239), rgb(59, 59, 59));\n    box-sizing: border-box;\n    margin: 0em;\n    font: 400 13.3333px Arial;\n    padding: 1px 6px;\n    border-width: 2px;\n    border-style: outset;\n    border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));\n    border-image: initial;\n    border-radius: 2px;\n}\n\n";
pushScopeId("data-v-fc4b85ee");
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
    const state = reactive({count: 0});
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
_sfc_main$1.__scopeId = "data-v-fc4b85ee";
var App_vue_vue_type_style_index_0_scoped_true_lang = "\n#top[data-v-3a25e035] {\n  font-family: Avenir, Helvetica, Arial, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-align: center;\n  color: #50312c;\n  margin-top: 30px;\n\n  width: 500px; height: 500px;\n  position: absolute;\n\n  display: block;\n  background-color: white;\n}\n*[data-v-3a25e035] {\n    box-sizing: content-box;\n}\nimg[data-v-3a25e035] {\n    max-width: none;\n        display: inline;\n}\n";
pushScopeId("data-v-3a25e035");
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
        createVNode(_sfc_main$1, {msg: "Vue Component with Local Button Count"})
      ]);
    };
  }
};
_sfc_main.__scopeId = "data-v-3a25e035";
export {_sfc_main as _};
