import "./App.js";
import { g as createLayoutSystem, W as WebLayer3D, p as pushScopeId, b as popScopeId } from "./vendor.js";
import { V as VueApp } from "./top.js";
import "./App2.js";
import "./App3.js";
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
    this.needsUpdate = false;
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
    this.system = createLayoutSystem(this.playerCamera ? this.playerCamera : scene.camera);
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
    this.webLayer3D = new WebLayer3D(this.vueRoot.$el, {
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
HubsApp.etherealCamera = new THREE.PerspectiveCamera();
var App_vue_vue_type_style_index_0_scoped_true_lang$d = "\n\n";
pushScopeId("data-v-8bbf9448");
popScopeId();
var App_vue_vue_type_style_index_0_scoped_true_lang$c = "\n\n";
pushScopeId("data-v-2f8a1568");
popScopeId();
var App_vue_vue_type_style_index_0_scoped_true_lang$b = "\n\n";
pushScopeId("data-v-48533ae5");
popScopeId();
var App_vue_vue_type_style_index_0_scoped_true_lang$a = "\n\n";
pushScopeId("data-v-62245168");
popScopeId();
var App_vue_vue_type_style_index_0_scoped_true_lang$9 = "\n\n";
pushScopeId("data-v-88d0b02e");
popScopeId();
var App_vue_vue_type_style_index_0_scoped_true_lang$8 = "\n\n";
pushScopeId("data-v-17011da7");
popScopeId();
var App_vue_vue_type_style_index_0_scoped_true_lang$7 = "\n\n";
pushScopeId("data-v-e88e8c04");
popScopeId();
var App_vue_vue_type_style_index_0_scoped_true_lang$6 = "\n\n";
pushScopeId("data-v-72718009");
popScopeId();
var App_vue_vue_type_style_index_0_scoped_true_lang$5 = "\n\n";
pushScopeId("data-v-aadf164e");
popScopeId();
var App_vue_vue_type_style_index_0_scoped_true_lang$4 = "\n\n";
pushScopeId("data-v-28844930");
popScopeId();
var App_vue_vue_type_style_index_0_scoped_true_lang$3 = "\n\n";
pushScopeId("data-v-bb3eadc6");
popScopeId();
var App_vue_vue_type_style_index_0_scoped_true_lang$2 = "\n\n";
pushScopeId("data-v-4ea20f04");
popScopeId();
var App_vue_vue_type_style_index_0_scoped_true_lang$1 = "\n\n";
pushScopeId("data-v-641fb642");
popScopeId();
var App_vue_vue_type_style_index_0_scoped_true_lang = "\n\n";
pushScopeId("data-v-c4d0e768");
popScopeId();
