import {createApp} from "vue";
import App from "./AppText.vue";
import { WebLayer3D } from "../../../packages/ethereal/ethereal.es";
import { HubsApp } from "../HubsApp";

export class HubsTest1 extends HubsApp {
    constructor (styles, width, height) {
        super(styles, width, height)

        this.vueApp = createApp(App, {}).mount(this.appDiv);
        this.webLayer3D = new WebLayer3D(this.headDiv, {autoRefresh: true});
    }
}

var init = function (styles) {
    return new HubsTest1(styles, 2, 2.25)
}

export default init
