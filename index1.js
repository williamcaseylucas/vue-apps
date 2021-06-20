import { W as WebApp$1 } from "./WebApp.js";
import { _ as _sfc_main } from "./App.js";
import { r as reactive, a as readonly } from "./vendor.js";
import "./logo.js";
class Store {
  constructor(app2) {
    this._state = reactive({
      count: 0
    });
    this.app = app2;
    this.state = readonly(this._state);
  }
  increment() {
    if (this.app.takeOwnership()) {
      this._state.count++;
      this.app.setSharedData(this.state);
    }
  }
  updateSharedData(dataObject) {
    this._state.count = dataObject.count;
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
app.vueApp.$el.style.border = "solid 0.1em";
