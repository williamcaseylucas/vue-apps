import {createApp} from "vue";
import App from "./AppHello.vue";
import { WebLayer3D } from "../../../packages/ethereal/ethereal.es";

const cardDiv = document.createElement("div")
const cardVue = createApp(App, {}).mount(cardDiv);
const cardLayer = new WebLayer3D(cardVue.$el);

const data = {
    div: cardDiv,
    webLayer3D: cardLayer,
    width: 2,   // what we want the target size to be
    height: 2.25
}
export default data
