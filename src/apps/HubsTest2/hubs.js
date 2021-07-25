import App from "./App.vue";
import HubsAppProto from "../HubsApp";
import Store from "./shared"

class HubsApp extends HubsAppProto {
    constructor () {
        super(App, 500, 500)
        this.isInteractive = true;

        this.shared = new Store(this)
        this.vueApp.provide('shared', this.shared)
    }

    mount () {
        super.mount(true) // use ethereal

        this.docs = this.webLayer3D.querySelector('#edit')

        let adapter = HubsApp.system.getAdapter(this.docs) 
        this.boundsSize = new THREE.Vector3()
        adapter.onUpdate = () => {
            this.bounds = adapter.metrics.target.visualBounds
            this.bounds.getSize(this.boundsSize)
            this.size = Math.sqrt(this.boundsSize.x * this.boundsSize.x + this.boundsSize.y * this.boundsSize.y)
            if (this.shared.state.close) {
                this.shared.setClose (this.size < 210)
            } else {
                this.shared.setClose (this.size < 190)
            }
            this.docs.update()
        }
    }
}

var init = function () {
    let app = new HubsApp()
    app.mount() 

    
    return app
}

export default init