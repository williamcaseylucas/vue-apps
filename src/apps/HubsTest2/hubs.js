import {createApp} from "vue";
import App from "./AppHello.vue";
import { WebLayer3D } from "../../../packages/ethereal/ethereal.es";
import { HubsApp } from "../HubsApp";

export class HubsTest2 extends HubsApp {
    constructor (styles, width, height) {
        super(styles, width, height)

        this.vueApp = createApp(App, {}).mount(this.appDiv);
        this.webLayer3D = new WebLayer3D(this.headDiv, {autoRefresh: true});
    }
}

var init = function (styles) {
    return new HubsTest2(styles, 2, 2.5)
}

export default init
