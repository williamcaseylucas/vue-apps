import App from "./App.vue";
import HubsAppProto from "../HubsApp";

class HubsApp extends HubsAppProto {

    constructor (width: number, height: number, public params: any = {}) {
        super(App, width, height, params)
        //  this.isInteractive = true;
    }

    // change the label of the node
    async setLabel(text: string, color: string) {
        this.params.text = text
        this.params.color = color

        // return a promise that resolves when the label is set
        // and updated
        return this.waitForReady()
    }
}

var init = function(params: any = {}) {
    let app = new HubsApp(0, 0, params)
    app.mount()
    return app
}

export default init