var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __require = typeof require !== "undefined" ? require : (x) => {
  throw new Error('Dynamic require of "' + x + '" is not supported');
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import "./NetworkedHelloWorld.js";
import { V as VueApp } from "./top.js";
import { j as jh, k as kh } from "./vendor.js";
import "./App.js";
import "./room.js";
import "./logo.js";
function copyCamera(source, target) {
  source.updateMatrixWorld();
  target.fov = source.fov;
  target.zoom = source.zoom;
  target.near = source.near;
  target.far = source.far;
  target.aspect = source.aspect;
  source.matrixWorld.decompose(target.position, target.quaternion, target.scale);
  target.rotation.setFromQuaternion(target.quaternion, void 0, false);
  target.updateMatrix();
  target.updateMatrixWorld(true);
}
const _HubsApp = class extends VueApp {
  constructor(App, width, height, createOptions = {}) {
    super(App, width, height, createOptions);
    __publicField(this, "isEthereal");
    __publicField(this, "isInteractive");
    __publicField(this, "isNetworked");
    __publicField(this, "isStatic");
    __publicField(this, "updateTime");
    __publicField(this, "raycaster");
    __publicField(this, "size");
    __publicField(this, "webLayer3D");
    __publicField(this, "needsUpdate", false);
    __publicField(this, "headDiv");
    this.isEthereal = false;
    this.isInteractive = false;
    this.isNetworked = false;
    this.isStatic = true;
    this.updateTime = 100;
    this.raycaster = new THREE.Raycaster();
    this.size = { width: width / 1e3, height: height / 1e3 };
    this.headDiv = document.createElement("div");
  }
  static initializeEthereal() {
    let scene = window.APP.scene;
    this.etherealCamera.matrixAutoUpdate = true;
    this.playerCamera = document.getElementById("viewing-camera").getObject3D("camera");
    this.system = jh(this.playerCamera ? this.playerCamera : scene.camera);
    window.ethSystem = this.system;
  }
  static systemTick(time, deltaTime) {
    let scene = window.APP.scene;
    if (!this.playerCamera) {
      this.playerCamera = document.getElementById("viewing-camera").getObject3D("camera");
    }
    if (!this.playerCamera)
      return;
    copyCamera(this.playerCamera, this.etherealCamera);
    if (this.etherealCamera != this.system.viewNode) {
      this.system.viewNode = this.etherealCamera;
    }
    scene.renderer.getSize(_HubsApp.system.viewResolution);
    this.system.viewFrustum.setFromPerspectiveProjectionMatrix(this.etherealCamera.projectionMatrix);
    this.system.update(deltaTime, time);
  }
  mount(useEthereal) {
    this.isEthereal = useEthereal === true;
    this.vueRoot = this.vueApp.mount(this.headDiv);
    this.vueRoot.$el.setAttribute("style", "width: " + this.width + "px; height: " + this.height + "px;");
    let l = document.createElement("link");
    l.setAttribute("href", "https://resources.realitymedia.digital/vue-apps/dist/hubs.css");
    l.setAttribute("rel", "stylesheet");
    l.setAttribute("crossorigin", "anonymous");
    this.vueRoot.$el.insertBefore(l, this.vueRoot.$el.firstChild);
    this.webLayer3D = new kh(this.vueRoot.$el, {
      autoRefresh: true,
      onLayerCreate: useEthereal ? (layer) => {
        const adapter = _HubsApp.system.getAdapter(layer);
        adapter.opacity.enabled = true;
        adapter.onUpdate = () => layer.update();
      } : (layer) => {
      },
      onLayerPaint: (layer) => {
        if (this.isStatic) {
          this.needsUpdate = true;
        }
      },
      textureEncoding: THREE.sRGBEncoding,
      renderOrderOffset: 0
    });
  }
  setNetworkMethods(takeOwnership, setSharedData) {
    this.takeOwnership = takeOwnership;
    this.setSharedData = setSharedData;
  }
  updateSharedData(dataObject) {
    this.needsUpdate = true;
  }
  getSize() {
    console.log("div size: {" + this.size.width + ", " + this.size.height + "}");
    return this.size;
  }
  getSharedData(dataObject) {
    throw new Error("getSharedData should be overridden by subclasses");
  }
  clicked(evt) {
    if (!this.isInteractive) {
      return;
    }
    const obj = evt.object3D;
    this.raycaster.ray.set(obj.position, this.webLayer3D.getWorldDirection(new THREE.Vector3()).negate());
    const hit = this.webLayer3D.hitTest(this.raycaster.ray);
    if (hit) {
      hit.target.click();
      hit.target.focus();
      console.log("hit", hit.target, hit.layer);
    }
  }
  dragStart(evt) {
  }
  dragEnd(evt) {
  }
  play() {
  }
  pause() {
  }
  destroy() {
  }
  tick(time) {
    if (this.isEthereal)
      ;
    else {
      var needsUpdate = this.needsUpdate;
      this.needsUpdate = false;
      if (this.isStatic && this.updateTime < time) {
        needsUpdate = true;
        this.updateTime = Math.random() * 2e3 + 1e3;
      }
      if (!this.isStatic) {
        this.updateTime = time;
        needsUpdate = true;
      }
      if (needsUpdate) {
        this.webLayer3D.update();
      }
    }
  }
};
let HubsApp = _HubsApp;
__publicField(HubsApp, "system");
__publicField(HubsApp, "etherealCamera", new THREE.PerspectiveCamera());
__publicField(HubsApp, "playerCamera");
