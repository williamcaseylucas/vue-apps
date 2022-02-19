import VueApp from "src/apps/VueApp";
import { reactive, readonly } from "vue";

export interface data {
    object: number,
    size: vec3
}

interface vec3 {
    x: number,
    y: number,
    z: number
}

export class Store {
    _state: data
    state: data
    app: VueApp
    objects: THREE.Object3D[]

    constructor(app: VueApp) {
        this._state = reactive({
            object: -1,
            size: { x: 1, y: 1, z: 1}
        })

        this.app = app
        this.state = readonly(this._state)

        this.objects = []
        if (window.AFRAME) {
            let scene = window.AFRAME.scenes[0].object3D
            for (let i = 1; i < 11; i++) {      
                let o = scene.getObjectByName("TestObject" + i)
                if (o) {
                    o.visible = false
                    this.objects.push(o)
                } 
            }
        }
        if (this.objects.length > 0) {
            this._state.object = 0
            this._copyVec3(this.objects[0].scale, this._state.size)
            this.objects[0].visible = true
        } else {
            this._state.object = -1
        }
    }    

    _copyVec3(from: vec3, to: vec3) {
        to.x = from.x
        to.y = from.y
        to.z = from.z
    }

    _nextObject() {
        if (this._state.object == -1) return -1

        this.objects[this._state.object].visible = false
        this._state.object++
        if (this._state.object >= this.objects.length) {
            this._state.object = 0
        }

        this.objects[this._state.object].visible = true;
        this._copyVec3(this.objects[this._state.object].scale, this._state.size);

        // update the portals when the object changes, just to demonstrate this
        // is possible.  Probably don't want to do this very often, since we don't need
        // or want the portals to reflect the up-to-date state of the scene
        if (window.AFRAME) {
            let scene = window.AFRAME.scenes[0]
            //@ts-ignore
            scene.emit('updatePortals') 
        }
    }

    _updateSize (size: vec3) {
        if (this._state.object >= 0) {
            this._copyVec3(size, this._state.size);

            // @ts-ignore
            this.objects[this._state.object].scale.copy(this._state.size)
            this.objects[this._state.object].updateMatrix();
        }
    }

    _larger() {
        if (this._state.object >= 0) {
            this.objects[this._state.object].scale.multiplyScalar(1.1);
            this.objects[this._state.object].updateMatrix();

            this._copyVec3(this.objects[this._state.object].scale, this._state.size);
        }
    }

    _smaller() {
        if (this._state.object >= 0) {
            this.objects[this._state.object].scale.multiplyScalar(1/1.1);
            this.objects[this._state.object].updateMatrix();

            this._copyVec3(this.objects[this._state.object].scale, this._state.size);
        }
    }

    // external routines called from vue
    nextObject() {
        if (this.app.takeOwnership()) {
            this._nextObject()
            this.app.setSharedData(this.state)
        }
    }

    larger() {
        if (this.app.takeOwnership()) {
            this._larger()
            this.app.setSharedData(this.state)
        }
    }

    smaller() {
        if (this.app.takeOwnership()) {
            this._smaller()
            this.app.setSharedData(this.state)
        }
    }

    getName() {
        if (this._state.object >= 0) {
            return this.objects[this._state.object].name
        } else {
            return "NO OBJECTS"
        }
    }

    updateSharedData(dataObject: data) {
        // need to update the elements within the state, because otherwise
        // the data won't flow to the components
        if (this._state.object != dataObject.object) {
            this.objects[this._state.object].visible = false
            this.objects[dataObject.object].visible = true
           this._state.object = dataObject.object
        }
        this._updateSize(dataObject.size)
    }
}