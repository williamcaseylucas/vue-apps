import {createApp} from "vue";
import { WebLayer3D } from "ethereal";

// create init method for ethereal
import * as ethereal from 'ethereal'

export function initializeEthereal() {
    HubsApp.initializeEthereal()
}

//THREE.Object3D.DefaultMatrixAutoUpdate = true;

export function systemTick(time, deltaTime) {
   HubsApp.systemTick(time, deltaTime)
}

function copyCamera(source, target) {
    source.updateMatrixWorld()
    //let oldName = target.name
    //target.copy(source, false)
    //target.name = oldName

    target.fov = source.fov;
    target.zoom = source.zoom;

    target.near = source.near;
    target.far = source.far;

    target.aspect = source.aspect;

    // target.matrixWorldInverse.copy( source.matrixWorldInverse );
    // target.projectionMatrix.copy( source.projectionMatrix );
    // target.projectionMatrixInverse.copy( source.projectionMatrixInverse );

    // target.up.copy( source.up );

    // target.matrix.copy( source.matrix );
    // target.matrixWorld.copy( source.matrixWorld );

    // target.matrixAutoUpdate = source.matrixAutoUpdate;
    // target.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;

    source.matrixWorld.decompose( target.position, target.quaternion, target.scale)
    target.rotation.setFromQuaternion( target.quaternion, undefined, false );
    target.updateMatrix()
    target.updateMatrixWorld(true)
}

export default class HubsApp {
    static system;
    static etherealCamera = new THREE.PerspectiveCamera()
    static playerCamera;

    static initializeEthereal() {
        let scene = window.APP.scene;

        this.etherealCamera.matrixAutoUpdate = true;
        //this.etherealCamera.visible = false;

        //scene.setObject3D("etherealCamera", this.etherealCamera)

        this.playerCamera = document.getElementById("viewing-camera").getObject3D("camera");

        // just in case "viewing-camera" isn't set up yet ... which it 
        // should be, but just to be careful
        this.system = ethereal.createLayoutSystem(this.playerCamera ? this.playerCamera : scene.camera)
        window.ethSystem = this.system

        // can customize easing etc
        // system.transition.duration = 1.5
        // system.transition.delay = 0
        // system.transition.maxWait = 4
        // system.transition.easing = ethereal.easing.easeOut
    }

    static systemTick(time, deltaTime) {
        let scene = window.APP.scene;

        if (!this.playerCamera) {
            this.playerCamera = document.getElementById("viewing-camera").getObject3D("camera");
        }
        
        if (!this.playerCamera) return;
    
        copyCamera(this.playerCamera, this.etherealCamera)

        if (this.etherealCamera != this.system.viewNode) {
            this.system.viewNode = this.etherealCamera
        }

        scene.renderer.getSize(HubsApp.system.viewResolution)
        //this.system.viewFrustum.setFromPerspectiveProjectionMatrix(this.system.viewNode.projectionMatrix)

        // tick method for ethereal
        this.system.update(deltaTime, time)
    }

    constructor (App, width, height, createOptions={}) {
        this.isEthereal = false;

        this.isInteractive = false;
        this.isNetworked = false;
        this.isStatic = true;
        this.updateTime = 100
        this.raycaster = new THREE.Raycaster()
        this.width = width
        this.height = height
        this.size = { width: width/1000, height: height/1000}
        this.takeOwnership = this.takeOwnershipProto.bind(this)
        this.setSharedData = this.setSharedDataProto.bind(this)

        this.headDiv = document.createElement("div")
        //this.headDiv.setAttribute("style","width: 100%;height: 100%;")

        this.vueApp = createApp(App, createOptions)
    }

    mount(useEthereal) {
        this.isEthereal = useEthereal === true
        
        this.vueRoot = this.vueApp.mount(this.headDiv);
        this.vueRoot.$el.setAttribute("style","width: " + this.width + "px; height: " + this.height + "px;")

        // // add a link to the shared css
        let l = document.createElement("link")
        l.setAttribute("href", "https://resources.realitymedia.digital/vue-apps/dist/hubs.css")
        l.setAttribute("rel", "stylesheet")
        l.setAttribute("crossorigin","anonymous")
        this.vueRoot.$el.insertBefore(l, this.vueRoot.$el.firstChild)

        // move this into method
        this.webLayer3D = new WebLayer3D(this.vueRoot.$el, {
            autoRefresh: true,
            onLayerCreate: useEthereal ? 
            (layer) => {
                const adapter = HubsApp.system.getAdapter(layer)
                adapter.opacity.enabled = true
                adapter.onUpdate = () => layer.update()
            } :
            (layer) => {},
            onLayerPaint: (layer) => {
                if (this.isStatic) { this.needsUpdate = true }
            },
            textureEncoding: THREE.sRGBEncoding,
            renderOrderOffset: 0
        });
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

    // receive data updates.  should be overridden by subclasses, also requests
    // update next tick
    updateSharedData(dataObject) {
        this.needsUpdate = true
    }

    getSize() {
        // if (!this.compStyles) {
        //     this.compStyles = window.getComputedStyle(this.vueRoot.$el);
        // }
        // var width = this.compStyles.getPropertyValue('width')
        // width = width && width.length > 0 ? parseFloat(width) / 1000: 1
        // var height = this.compStyles.getPropertyValue('height')
        // height = height && height.length > 0 ? parseFloat(height) / 1000: 1
        // this.size = { width: width, height: height}
        console.log ("div size: {" + this.size.width + ", " + this.size.height + "}")
        return this.size
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

    tick(time) {
        if (this.isEthereal) {

        } else {
            var needsUpdate = this.needsUpdate
            this.needsUpdate = false
            if (this.isStatic && this.updateTime < time) {
                needsUpdate = true
                // wait a bit and do it again.  May get rid of this some day, we'll see
                this.updateTime = Math.random() * 2000 + 1000;
            }

            if (!this.isStatic) {
                this.updateTime = time
                needsUpdate = true
            }
            if (needsUpdate) {
                this.webLayer3D.update(true);
            }
        }
    }
}