import App from "./App.vue";
import HubsAppProto from "../../HubsApp";
import Store from "./shared"
import loadStyles from './styles'

// import '../../../node_modules/reveal.js/dist/reveal.css';
// import '../../../node_modules/reveal.js/dist/theme/white.css';

class HubsApp extends HubsAppProto {
    constructor () {
        super(App, 400, 300)

        loadStyles();
        
        // create our shared data object that will
        // share data between vue and hubs
        this.shared = new Store(this)
        this.vueApp.provide('shared', this.shared)

        this.isInteractive = true;
        this.isNetworked = false;
        this.isStatic = false;

        console.log (JSON.stringify(this.shared.data))
    }
    
    updateSharedData(dataObject) {
        super.updateSharedData(dataObject)
        this.shared.updateSharedData(dataObject)
    }

    getSharedData() {
        return this.shared.state;
    }
}

var init = function () {
    let app = new HubsApp()
    app.mount()
    return app
}

export default init
