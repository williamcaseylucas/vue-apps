import WebAppProto from "../WebApp";
import App from './App.vue'
import Store from "./shared"
import loadStyles from './styles'

// import '../../../node_modules/reveal.js/dist/reveal.css';
// import '../../../node_modules/reveal.js/dist/theme/white.css';

class WebApp extends WebAppProto {
    constructor () {
        super(App, 400, 300)

        loadStyles()
        // create our shared data object that will
        // share data between vue and hubs
        this.shared = new Store(this)
        this.vueApp.provide('shared', this.shared)

        console.log (JSON.stringify(this.shared.data))
    }
}

let app = new WebApp()
app.mount()

app.vueRoot.$el.style.border = "solid 0.1em"