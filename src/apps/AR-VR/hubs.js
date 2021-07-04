import App from "./App.vue";
import HubsAppProto from "../HubsApp";

class HubsApp extends HubsAppProto {
    constructor (width, height) {
        super(App,width, height)
        this.isInteractive = false;
    }
}

var init = function () {
    let app = new HubsApp(300, 250)
    app.mount()
    return app
}

export default init