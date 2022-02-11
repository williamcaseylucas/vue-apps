import WebAppProto from "../../WebApp";
import App from './App.vue'

class WebApp extends WebAppProto {
    constructor () {
        super(App, 300, 100)
    }
}

let app = new WebApp()
await app.mount()

app.vueRoot!.$el.style.border = "solid 0.1em"