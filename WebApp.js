import { V as VueApp } from "./top.js";
class WebApp extends VueApp {
  constructor(App, width, height, createOptions = {}) {
    super(App, width, height, createOptions);
  }
  mount() {
    this.vueRoot = this.vueApp.mount("#app");
    this.vueRoot.$el.setAttribute("style", "width: " + this.width + "px; height: " + this.height + "px;");
  }
}
export { WebApp as W };
