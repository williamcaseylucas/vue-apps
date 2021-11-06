import { createApp, App, Component, ComponentPublicInstance } from "vue";
import VueApp from "./VueApp";

export default class WebApp extends VueApp {
    // takeOwnership:  () => boolean
    // setSharedData: (object: {}) => boolean

    // width: number
    // height: number

    // vueApp: App
    // vueRoot: ComponentPublicInstance | undefined
    constructor (App: Component, width: number, height: number, createOptions: any ={}) {

        super(App,width,height,createOptions)
        // this.takeOwnership = this.takeOwnershipProto.bind(this)
        // this.setSharedData = this.setSharedDataProto.bind(this)
        // this.width = width
        // this.height = height

        // this.vueApp = createApp(App, createOptions)
    }

    mount() {
        this.vueRoot = this.vueApp.mount("#app");
        this.vueRoot.$el.setAttribute("style","width: " + this.width + "px; height: " + this.height + "px;")
    }

    // dummy functions, just to let us use the same
    // data store with hubs and the web testing setup
    // takeOwnershipProto() {
    //     return true;
    // }
    // setSharedDataProto(object: {}) {
    //     return true;
    // }
}