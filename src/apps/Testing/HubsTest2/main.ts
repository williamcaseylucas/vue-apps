import WebAppProto from "../../WebApp";
import App from './App.vue'
import {data as SharedData, Store} from "./shared"

class WebApp extends WebAppProto {
    shared: Store

    constructor () {
        super(App, 500, 500)

        this.shared = new Store(this)
        this.vueApp.provide('shared', this.shared)

        console.log (JSON.stringify(this.shared.state))
    }
}

let app = new WebApp()
await app.mount()

app.vueRoot!.$el.style.border = "solid 0.1em"