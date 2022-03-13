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

        var style = ""
        this.width > 0 ? style = "width: " + this.width + "px; " : style = "width: fit-content; "
        this.height > 0 ? style = style + "height: " + this.height + "px;" : style = style + "height: fit-content;"

        console.log("setting style: ", style)
        this.vueRoot.$el.setAttribute("style", style)

        let rect = this.vueRoot.$el.getBoundingClientRect()
        console.log("mounted has rect: ", rect)

        this.height = this.height > 0 ? this.height : Math.ceil(rect.height*1.1)
        this.width = this.width > 0 ? this.width : Math.ceil(rect.width*1.1)

        style = "width: " + this.width + "px; height: " + this.height + "px;"
        console.log("setting style: ", style)
        this.vueRoot.$el.setAttribute("style", style)
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