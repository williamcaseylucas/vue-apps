import App from "./App.vue";
import HubsAppProto from "../../HubsApp";
import {data as SharedData, Store} from "./shared"
import { WebLayer3D } from "@etherealjs/web-layer/three";

class HubsApp extends HubsAppProto {
    shared: Store
    
    constructor (params: any = {}) {
        super(App, 500, 500, params)
        this.isInteractive = true;

        this.shared = new Store(this)
        this.vueApp.provide('shared', this.shared)
    }

    docs: WebLayer3D | undefined
    boundsSize: THREE.Vector3  = new THREE.Vector3()
    bounds: THREE.Box3 = new THREE.Box3()

    mount () {
        super.mount(true) // use ethereal

        this.docs = this.webLayer3D!.querySelector('#edit')
        if (!this.docs) {
            console.warn("Vue app needs #edit div")
            return 
        }
        
        // let adapter = HubsApp.system.getAdapter(this.docs) 
        // adapter.onUpdate = () => {
        //     this.bounds = adapter.metrics.target.visualBounds
        //     this.bounds.getSize(this.boundsSize)
        //     var size = Math.sqrt(this.boundsSize.x * this.boundsSize.x + this.boundsSize.y * this.boundsSize.y)
        //     if (this.shared.state.close) {
        //         this.shared.setClose (size < 210)
        //     } else {
        //         this.shared.setClose (size < 190)
        //     }
        //     this.docs!.update()
        // }
    }
}

var init = function(params: any = {}) {
    let app = new HubsApp(params)
    app.mount() 

    
    return app
}

export default init