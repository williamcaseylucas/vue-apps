var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import {_ as _imports_0} from "./logo.js";
import {m as mapState, b as mapActions, p as pushScopeId, d as popScopeId, o as openBlock, e as createBlock, f as createVNode, t as toDisplayString, F as Fragment, w as withScopeId} from "./vendor.js";
var SomeText_vue_vue_type_style_index_0_scoped_true_lang = "\na[data-v-04325fd8] {\n  color: #b542b9;\n}\n*[data-v-04325fd8] {\n    line-height : normal;\n}\n.fade[data-v-04325fd8] {\n  color: #9803a5;\n  /* transition: color 1s; */\n}\n.fade[data-v-04325fd8]:hover {\n  color: #a78e06;\n}\np[data-v-04325fd8] {\n    display: block;\n    margin-block-start: 1em;\n    margin-block-end: 1em;\n    margin-inline-start: 0px;\n    margin-inline-end: 0px;\n}\nh1[data-v-04325fd8] {\n      /* text-align: center; */\n\n    display: block;\n    font-size: 2em;\n    margin-block-start: 0.67em;\n    margin-block-end: 0.67em;\n    margin-inline-start: 0px;\n    margin-inline-end: 0px;\n    font-weight: bold;\n}\nbutton[data-v-04325fd8] {\n    /* width: 100px;\n    height: 30px; */\n    appearance: auto;\n    -webkit-writing-mode: horizontal-tb !important;\n    text-rendering: auto;\n    color: -internal-light-dark(black, white);\n    letter-spacing: normal;\n    word-spacing: normal;\n    text-transform: none;\n    text-indent: 0px;\n    text-shadow: none;\n    display: inline-block;\n    text-align: center;\n    align-items: flex-start;\n    cursor: default;\n    background-color: -internal-light-dark(rgb(239, 239, 239), rgb(59, 59, 59));\n    box-sizing: border-box;\n    margin: 0em;\n    font: 400 13.3333px Arial;\n    padding: 1px 6px;\n    border-width: 2px;\n    border-style: outset;\n    border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));\n    border-image: initial;\n    border-radius: 2px;\n}\n\n/* button :hover {\n    background-color: -internal-light-dark(rgb(150, 150, 150), rgb(121, 121, 121));\n} */\n";
const _sfc_main$1 = {
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  computed: mapState({
    count: (state) => state.count,
    countAlias: "count"
  }),
  methods: __spreadProps(__spreadValues({}, mapActions([
    "increment"
  ])), {
    inc() {
      this.increment();
      console.log(this.count);
    }
  })
};
const _withId = /* @__PURE__ */ withScopeId();
pushScopeId("data-v-04325fd8");
const _hoisted_1$1 = {
  "xr-layer": "",
  class: "fade"
};
const _hoisted_2$1 = /* @__PURE__ */ createVNode("p", null, " Here's some more text just to make things not blank. ", -1);
popScopeId();
const _sfc_render = /* @__PURE__ */ _withId((_ctx, _cache, $props, $setup, $data, $options) => {
  return openBlock(), createBlock(Fragment, null, [
    createVNode("h1", _hoisted_1$1, toDisplayString($props.msg), 1),
    _hoisted_2$1,
    createVNode("button", {
      "xr-layer": "",
      onClick: _cache[1] || (_cache[1] = (...args) => $options.inc && $options.inc(...args))
    }, "count is: " + toDisplayString(_ctx.count), 1)
  ], 64);
});
_sfc_main$1.render = _sfc_render;
_sfc_main$1.__scopeId = "data-v-04325fd8";
var AppText_vue_vue_type_style_index_0_scoped_true_lang = "\n#top[data-v-5abdd922] {\n  font-family: Avenir, Helvetica, Arial, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-align: center;\n  color: #50312c;\n  margin-top: 30px;\n  border: 5;\n  border-radius: 10px;\n  border-color: red;\n  width: 400px; height: 450px;\n  position: absolute;\n\n  display: block;\n  background-color: white;\n}\n*[data-v-5abdd922] {\n    box-sizing: content-box;\n}\nimg[data-v-5abdd922] {\n    max-width: none;\n        display: inline;\n}\n";
pushScopeId("data-v-5abdd922");
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
_sfc_main.__scopeId = "data-v-5abdd922";
export {_sfc_main as _};
