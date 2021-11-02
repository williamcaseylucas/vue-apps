import { r as reactive, o as openBlock, c as createElementBlock, t as toDisplayString } from "./vendor.js";
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
export { _sfc_main as _ };
