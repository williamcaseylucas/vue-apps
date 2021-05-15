import {c as createApp} from "./vendor.js";
import {_ as _sfc_main} from "./AppText.js";
import {W as WebLayer3D} from "./three-web-layer.js";
import "./logo.js";
const cardVue = createApp(_sfc_main, {}).mount(document.createElement("div"));
new WebLayer3D(cardVue.$el);
