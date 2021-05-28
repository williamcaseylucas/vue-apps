import App from "./App.vue";
import HubsAppProto from "../HubsApp";
import Store from "./shared"

class HubsApp extends HubsAppProto {
    constructor (width, height) {
        super(width, height, App)

        // create our shared data object that will
        // share data between vue and hubs
        this.shared = new Store(this)
        this.vueApp.provide('shared', this.shared)

        this.isInteractive = true;
        this.isNetworked = true;
        
        console.log (JSON.stringify(this.shared.data))
    }
    
    updateSharedData(dataObject) {
        this.shared.updateSharedData(dataObject)
    }

    getSharedData() {
        return this.shared.state;
    }
}

var init = function () {
    let app = new HubsApp(2, 2.25)
    app.mount()
    return app
}

export default init
