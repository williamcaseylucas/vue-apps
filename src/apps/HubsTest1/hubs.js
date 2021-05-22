import App from "./AppText.vue";
import { HubsApp } from "../HubsApp";

export class HubsTest1 extends HubsApp {
    constructor (width, height) {
        super(width, height, App)

        // this.createWebLayer(App)
        // this.vueApp = createApp(App, {}).mount(this.appDiv);
        // this.webLayer3D = new WebLayer3D(this.vueApp.$el, {autoRefresh: true});
    }
}

var init = function () {
    return new HubsTest1(2, 2.25)
}

export default init
