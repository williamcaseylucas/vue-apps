import { r as reactive, o as openBlock, c as createElementBlock, t as toDisplayString } from "./vendor.js";
var CenterTitle_vue_vue_type_style_index_0_scoped_true_lang = "\na[data-v-39aeb044] {\n  color: #42b983;\n}\n*[data-v-39aeb044] {\n    box-sizing: content-box;\n    line-height : normal;\n}\np[data-v-39aeb044] {\n    display: block;\n    margin-block-start: 1em;\n    margin-block-end: 1em;\n    margin-inline-start: 0px;\n    margin-inline-end: 0px;\n}\nh1[data-v-39aeb044] {\n    display: block;\n    font-size: 2em;\n    margin-block-start: 0.67em;\n    margin-block-end: 0.67em;\n    margin-inline-start: 0px;\n    margin-inline-end: 0px;\n    font-weight: bold;\n}\nbutton[data-v-39aeb044] {\n    /* width: 100px;\n    height: 30px; */\n    appearance: auto;\n    -webkit-writing-mode: horizontal-tb !important;\n    text-rendering: auto;\n    color: -internal-light-dark(black, white);\n    letter-spacing: normal;\n    word-spacing: normal;\n    text-transform: none;\n    text-indent: 0px;\n    text-shadow: none;\n    display: inline-block;\n    text-align: center;\n    align-items: flex-start;\n    cursor: default;\n    background-color: -internal-light-dark(rgb(239, 239, 239), rgb(59, 59, 59));\n    box-sizing: border-box;\n    margin: 0em;\n    font: 400 13.3333px Arial;\n    padding: 1px 6px;\n    border-width: 2px;\n    border-style: outset;\n    border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));\n    border-image: initial;\n    border-radius: 2px;\n}\n\n";
const _sfc_main = {
  props: {
    msg: String
  },
  setup(__props) {
    reactive({ count: 0 });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("h2", null, toDisplayString(__props.msg), 1);
    };
  }
};
_sfc_main.__scopeId = "data-v-39aeb044";
var room = "/* Now, our styles */\n\n#room {\n    font-family: Avenir, Helvetica, Arial, sans-serif;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    text-align: center;\n    color: #f2e6e5;\n    /* margin: 30px; */\n    border: 5px;\n    border-radius: 10px;\n    border-color: red;\n    position: absolute;\n    display: block;\n    background-color: black;\n  }\n\n  #room .spacer {\n    /* margin-left: 25px;\n    margin-right: 25px; */\n    margin: 25px;\n    }\n\n  #room .squareoff {\n    text-align: justify;\n    }\n  ";
export { _sfc_main as _ };
