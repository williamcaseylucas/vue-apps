import {createApp} from "vue";

export default class WebApp {
    constructor (App, createOptions={}) {
        this.takeOwnership = this.takeOwnershipProto.bind(this)
        this.setSharedData = this.setSharedDataProto.bind(this)

        this.vueApp = createApp(App, createOptions)
    }

    mount() {
        this.vueRoot = this.vueApp.mount("#app");
    }

    // dummy functions, just to let us use the same
    // data store with hubs and the web testing setup
    takeOwnershipProto() {
        return true;
    }
    setSharedDataProto(object) {
        return true;
    }
}