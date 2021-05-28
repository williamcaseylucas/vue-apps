import App from "./AppTest2.vue";
import { HubsApp } from "../HubsApp";

export class HubsTest2 extends HubsApp {
    constructor (width, height) {
        super(width, height, App)
        this.isInteractive = true;
    }
}

var init = function () {
    let app = new HubsTest2(2.5, 2.5)
    app.mount()
    return app
}

export default init