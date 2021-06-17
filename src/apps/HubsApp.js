import {createApp} from "vue";
import { WebLayer3D } from "../../packages/ethereal/ethereal.es";

export default class HubsApp {
    constructor (App, createOptions={}) {
        this.isInteractive = false;
        this.isNetworked = false;
        this.isStatic = true;

        this.takeOwnership = this.takeOwnershipProto.bind(this)
        this.setSharedData = this.setSharedDataProto.bind(this)

        this.headDiv = document.createElement("div")
        this.appDiv  = document.createElement("div")
    
        // this.headDiv.style.position = "absolute";
        // this.headDiv.style.left = -10000+'px';
        // this.headDiv.style.top = 0+'px';
        
        this.headDiv.appendChild(this.appDiv)
        // document.body.appendChild(this.headDiv)

        this.vueApp = createApp(App, createOptions)
    }

    mount() {
        this.vueRoot = this.vueApp.mount(this.appDiv);
        this.webLayer3D = new WebLayer3D(this.vueRoot.$el, {
            autoRefresh: true,
            onLayerCreate: (layer) => {
                // nothing yet
            },
            onAfterRasterize(layer) {
                   // nothing yet
            },
            textureEncoding: THREE.sRGBEncoding,
            renderOrderOffset: 0  // -1000
        });

        if (this.isInteractive) {
            // for interaction
            this.raycaster = new THREE.Raycaster()
        }
    }

    setNetworkMethods(takeOwnership, setSharedData) {
        this.takeOwnership = takeOwnership;
        this.setSharedData = setSharedData;
    }

    // dummy functions, just to avoid errors if they get called before
    // networking is initialized, or called when networked is false
    takeOwnershipProto() {
        return true;
    }
    setSharedDataProto(object) {
        return true;
    }

    // receive data updates.  should be overridden by subclasses
    updateSharedData(dataObject) {
        raise("updateData should be overridden by subclasses")
    }

    // receive data updates.  should be overridden by subclasses
    getSharedData(dataObject) {
        raise("getSharedData should be overridden by subclasses")
    }
    
    // override to check for your own 3D objects that aren't webLayers
    clicked(evt) {
        if (!this.isInteractive) { return }
        
        const obj = evt.object3D
        this.raycaster.ray.set(obj.position, 
            this.webLayer3D.getWorldDirection(new THREE.Vector3()).negate())
        const hit = this.webLayer3D.hitTest(this.raycaster.ray)
        if (hit) {
          hit.target.click()
          hit.target.focus()
          console.log('hit', hit.target, hit.layer)
        }   
    }

    dragStart(evt) {
        // nothing here ... subclass should override
    }

    dragEnd (evt) {
        // nothing here ... subclass should override
    }

    play() {
        // if we can figure out how to pause, then restart here
    }

    pause() {
        // perhaps figure out how to pause the Vue component?
    }

    destroy() {
        // TODO: destroy the vue component and any resources, etc., it has
    }
}