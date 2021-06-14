import App from "./App.vue";
import HubsAppProto from "../HubsApp";

class HubsApp extends HubsAppProto {
    constructor (width, height) {
        super(width, height, App)
        this.isInteractive = true;
    }
}

var init = function () {
    let app = new HubsApp(2.5, 2.5)
    app.mount()
    return app
}

export default init