import WebAppProto from "../WebApp";
import App from './App.vue'
import Store from "./shared"

class WebApp extends WebAppProto {
    constructor () {
        super(App)

        // create our shared data object that will
        // share data between vue and hubs
        this.shared = new Store(this)
        this.vueApp.provide('shared', this.shared)

        console.log (JSON.stringify(this.shared.data))
    }
}

let app = new WebApp()
app.mount()

app.$el.style.border = "solid 0.1em"