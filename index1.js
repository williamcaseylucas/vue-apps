import {c as createStore, a as createApp} from "./vendor.js";
import {_ as _sfc_main} from "./AppTest1.js";
import "./logo.js";
const store = createStore({
  state() {
    return {
      count: 0
    };
  },
  mutations: {
    setCount(state, count) {
      state.count = count;
    }
  },
  actions: {
    increment(context) {
      context.commit("setCount", context.state.count + 1);
    }
  }
});
let app = createApp(_sfc_main);
app.use(store);
app.mount("#app");
app.$el.style.border = "solid 0.1em";
