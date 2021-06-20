import { W as WebApp$1 } from "./WebApp.js";
import { g as ref, h as onMounted, $, p as pushScopeId, b as popScopeId, o as openBlock, d as createBlock, e as createVNode, F as Fragment, w as withScopeId, r as reactive, a as readonly } from "./vendor.js";
var App_vue_vue_type_style_index_0_scoped_true_lang = "\n#top[data-v-e5a378b8] {\n  font-family: Avenir, Helvetica, Arial, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-align: center;\n  color: #50312c;\n  margin-top: 30px;\n  border: 5;\n  border-radius: 10px;\n  border-color: red;\n  width: 400px; height: 300px;\n  position: absolute;\n\n  display: block;\n  background-color: white;\n}\n*[data-v-e5a378b8] {\n    box-sizing: content-box;\n}\nimg[data-v-e5a378b8] {\n    max-width: none;\n        display: inline;\n}\n";
const _sfc_main = {
  setup() {
    const root = ref(null);
    const reveal = ref(null);
    var deck = ref(null);
    onMounted(() => {
      deck.value = new $(reveal.value, {
        width: 400,
        height: 300,
        controls: true,
        controlsTutorial: false,
        progress: true,
        hash: false,
        respondToHashChanges: false,
        history: false,
        keyboard: false,
        keyboardConditional: "focused",
        overview: false,
        fragments: false,
        fragmentInURL: false,
        embedded: true,
        help: false,
        pause: false,
        showNotes: false,
        previewLinks: false,
        postMessage: false,
        focusBodyOnPageVisibilityChange: false,
        transition: "none",
        backgroundTransition: "none",
        viewDistance: 2,
        mobileViewDistance: 1
      });
      deck.value.initialize();
    });
    return {
      root,
      reveal,
      deck
    };
  }
};
const _withId = /* @__PURE__ */ withScopeId();
pushScopeId("data-v-e5a378b8");
const _hoisted_1 = /* @__PURE__ */ createVNode("link", {
  rel: "stylesheet",
  href: "/vue-apps/public/reveal/reveal.css"
}, null, -1);
const _hoisted_2 = /* @__PURE__ */ createVNode("link", {
  rel: "stylesheet",
  href: "/vue-apps/public/reveal/theme/white.css"
}, null, -1);
const _hoisted_3 = {
  ref: "root",
  id: "top"
};
const _hoisted_4 = {
  ref: "reveal",
  class: "reveal"
};
const _hoisted_5 = /* @__PURE__ */ createVNode("div", { class: "slides" }, [
  /* @__PURE__ */ createVNode("section", null, "Single Horizontal Slide 1"),
  /* @__PURE__ */ createVNode("section", null, "Single Horizontal Slide 2"),
  /* @__PURE__ */ createVNode("section", null, "Single Horizontal Slide 3")
], -1);
popScopeId();
const _sfc_render = /* @__PURE__ */ _withId((_ctx, _cache, $props, $setup, $data, $options) => {
  return openBlock(), createBlock(Fragment, null, [
    _hoisted_1,
    _hoisted_2,
    createVNode("div", _hoisted_3, [
      createVNode("div", _hoisted_4, [
        _hoisted_5
      ], 512)
    ], 512)
  ], 64);
});
_sfc_main.render = _sfc_render;
_sfc_main.__scopeId = "data-v-e5a378b8";
class Store {
  constructor(app2) {
    this._state = reactive({
      slide: 0
    });
    this.app = app2;
    this.state = readonly(this._state);
  }
  next() {
    if (this._state.slide == 2)
      return;
    if (this.app.takeOwnership()) {
      this._state.slide++;
      this.app.setSharedData(this.state);
    }
  }
  prev() {
    if (this._state.slide == 0)
      return;
    if (this.app.takeOwnership()) {
      this._state.slide--;
      this.app.setSharedData(this.state);
    }
  }
  updateSharedData(dataObject) {
    this._state.slide = dataObject.slide;
  }
}
class WebApp extends WebApp$1 {
  constructor() {
    super(_sfc_main);
    this.shared = new Store(this);
    this.vueApp.provide("shared", this.shared);
    console.log(JSON.stringify(this.shared.data));
  }
}
let app = new WebApp();
app.mount();
app.vueRoot.$el.style.border = "solid 0.1em";
