import {createApp} from "vue";
import { WebLayer3D } from "../../packages/ethereal/ethereal.es";

export class HubsApp {
    constructor (width, height, App) {
        this.headDiv = document.createElement("div")
        this.appDiv  = document.createElement("div")
    
        // this.headDiv.style.position = "absolute";
        // this.headDiv.style.left = -10000+'px';
        // this.headDiv.style.top = 0+'px';
        
        this.headDiv.appendChild(this.appDiv)
        // document.body.appendChild(this.headDiv)

        this.width = width
        this.height = height

        this.vueApp = createApp(App, {}).mount(this.appDiv);
        this.webLayer3D = new WebLayer3D(this.vueApp.$el, {
            autoRefresh: true,
            onLayerCreate: (layer) => {
                // nothing yet
            },
            onAfterRasterize(layer) {
                   // nothing yet
            },
            textureEncoding: THREE.sRGBEncoding,
            renderOrderOffset: -1000
        });
    }
}