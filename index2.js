import { W as WebApp$1 } from "./WebApp.js";
import { _ as _sfc_main } from "./App2.js";
import "./top.js";
import "./vendor.js";
import "./logo.js";
class WebApp extends WebApp$1 {
  constructor() {
    super(_sfc_main, 500, 500);
  }
}
let app = new WebApp();
app.mount();
app.vueRoot.$el.style.border = "solid 0.1em";
