import App from "./AppHello.vue";
import { HubsApp } from "../HubsApp";

export class HubsTest2 extends HubsApp {
    constructor (width, height) {
        super(width, height, App)

        // this.vueApp = createApp(App, {}).mount(this.appDiv);
        // this.webLayer3D = new WebLayer3D(this.vueApp.$el, {autoRefresh: true});
    }
}

var init = function () {
    return new HubsTest2(2, 2.5)
}

export default init