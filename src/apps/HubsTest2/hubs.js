import App from "./App.vue";
import HubsAppProto from "../HubsApp";

class HubsApp extends HubsAppProto {
    constructor () {
        super(App, 500, 500)
        this.isInteractive = true;
    }
}

var init = function () {
    let app = new HubsApp()
    app.mount()
    return app
}

export default init