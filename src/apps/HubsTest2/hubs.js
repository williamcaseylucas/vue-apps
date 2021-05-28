import App from "./AppHello.vue";
import { HubsApp } from "../HubsApp";

export class HubsTest2 extends HubsApp {
    constructor (width, height) {
        super(width, height, App)
    }
}

var init = function () {
    let app = new HubsTest2(2, 2.5)
    app.mount()
    return app
}

export default init