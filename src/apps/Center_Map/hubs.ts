import App from "./App.vue";
import HubsAppProto from "../HubsApp";

class HubsApp extends HubsAppProto {
    constructor (width: number, height: number, params: any = {}) {
        super(App, width, height, params)
        //this.isInteractive = true;
    }
}

var init = async function (params: any = {}) {
    let app = new HubsApp(300, 475, params)
    await app.mount()
    return app
}

export default init