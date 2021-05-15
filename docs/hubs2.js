import {c as createApp} from "./vendor.js";
import {_ as _sfc_main} from "./AppText.js";
import {y as yh} from "./ethereal.es.js";
import "./logo.js";
const cardDiv = document.createElement("div");
const cardVue = createApp(_sfc_main, {}).mount(cardDiv);
new yh(cardVue.$el);
