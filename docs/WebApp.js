import { e as createApp } from "./vendor.js";
class WebApp {
  constructor(App, width, height, createOptions = {}) {
    this.takeOwnership = this.takeOwnershipProto.bind(this);
    this.setSharedData = this.setSharedDataProto.bind(this);
    this.width = width;
    this.height = height;
    this.vueApp = createApp(App, createOptions);
  }
  mount() {
    this.vueRoot = this.vueApp.mount("#app");
    this.vueRoot.$el.setAttribute("style", "width: " + this.width + "px; height: " + this.height + "px;");
  }
  takeOwnershipProto() {
    return true;
  }
  setSharedDataProto(object) {
    return true;
  }
}
export { WebApp as W };
