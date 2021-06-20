import { c as createApp } from "./vendor.js";
class WebApp {
  constructor(App, createOptions = {}) {
    this.takeOwnership = this.takeOwnershipProto.bind(this);
    this.setSharedData = this.setSharedDataProto.bind(this);
    this.vueApp = createApp(App, createOptions);
  }
  mount() {
    this.vueRoot = this.vueApp.mount("#app");
  }
  takeOwnershipProto() {
    return true;
  }
  setSharedDataProto(object) {
    return true;
  }
}
export { WebApp as W };
