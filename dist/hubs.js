import { p as pushScopeId, a as popScopeId, i as inject, c as createElementBlock, b as createBaseVNode, t as toDisplayString, u as unref, F as Fragment, o as openBlock, d as createVNode, e as createApp, j as jh, k as kh, r as reactive, f as readonly, g as createTextVNode, n as normalizeClass } from './vendor-3aa54ae8.js';

var _imports_0$5 = "https://resources.realitymedia.digital/vue-apps/dist/1a6ace377133f14a.png";

pushScopeId("data-v-0a280960");
const _hoisted_1$i = {
  "xr-layer": "",
  class: "fade"
};
const _hoisted_2$i = /*#__PURE__*/createBaseVNode("p", null, " Here's some more text just to make things not blank. ", -1 /* HOISTED */);
popScopeId();


var script$j = {
  props: {
  msg: String
},
  setup(__props) {



const shared = inject('shared');

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("h1", _hoisted_1$i, toDisplayString(__props.msg), 1 /* TEXT */),
    _hoisted_2$i,
    createBaseVNode("button", {
      "xr-layer": "",
      onClick: _cache[0] || (_cache[0] = (...args) => (unref(shared).increment && unref(shared).increment(...args)))
    }, "count is: " + toDisplayString(unref(shared).state.count), 1 /* TEXT */)
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$j.__scopeId = "data-v-0a280960";

const _hoisted_1$h = { id: "top" };
const _hoisted_2$h = /*#__PURE__*/createBaseVNode("img", {
  alt: "Vue logo",
  src: _imports_0$5
}, null, -1 /* HOISTED */);

var script$i = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$h, [
    _hoisted_2$h,
    createVNode(script$j, { msg: "Networked Vue Component with Shared Button Count" })
  ]))
}
}

};

class VueApp {
    takeOwnership;
    setSharedData;
    width;
    height;
    vueApp;
    vueRoot;
    constructor(App, width, height, createOptions = {}) {
        this.takeOwnership = this.takeOwnershipProto.bind(this);
        this.setSharedData = this.setSharedDataProto.bind(this);
        this.width = width;
        this.height = height;
        this.vueApp = createApp(App, createOptions);
    }
    mount() {
    }
    // dummy functions, just to let us use the same
    // data store with hubs and the web testing setup
    takeOwnershipProto() {
        return true;
    }
    setSharedDataProto(object) {
        return true;
    }
}

function initializeEthereal() {
    HubsApp$h.initializeEthereal();
}
//THREE.Object3D.DefaultMatrixAutoUpdate = true;
function systemTick(time, deltaTime) {
    HubsApp$h.systemTick(time, deltaTime);
}
function copyCamera(source, target) {
    source.updateMatrixWorld();
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
    source.matrixWorld.decompose(target.position, target.quaternion, target.scale);
    // @ts-ignore
    target.rotation.setFromQuaternion(target.quaternion, undefined, false);
    target.updateMatrix();
    target.updateMatrixWorld(true);
}
class HubsApp$h extends VueApp {
    static system;
    static etherealCamera = new THREE.PerspectiveCamera();
    static playerCamera;
    isEthereal;
    isInteractive;
    isNetworked;
    isStatic;
    updateTime;
    raycaster;
    size;
    //takeOwnership:  () => boolean
    //setSharedData: (object: {}) => boolean
    //width: number
    //height: number
    //vueApp: App
    //vueRoot: ComponentPublicInstance | undefined 
    webLayer3D;
    needsUpdate = false;
    headDiv;
    static initializeEthereal() {
        let scene = window.APP.scene;
        this.etherealCamera.matrixAutoUpdate = true;
        //this.etherealCamera.visible = false;
        //scene.setObject3D("etherealCamera", this.etherealCamera)
        this.playerCamera = document.getElementById("viewing-camera").getObject3D("camera");
        // just in case "viewing-camera" isn't set up yet ... which it 
        // should be, but just to be careful
        this.system = jh(this.playerCamera ? this.playerCamera : scene.camera);
        window.ethSystem = this.system;
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
        if (!this.playerCamera)
            return;
        copyCamera(this.playerCamera, this.etherealCamera);
        if (this.etherealCamera != this.system.viewNode) {
            this.system.viewNode = this.etherealCamera;
        }
        scene.renderer.getSize(HubsApp$h.system.viewResolution);
        this.system.viewFrustum.setFromPerspectiveProjectionMatrix(this.etherealCamera.projectionMatrix);
        // tick method for ethereal
        this.system.update(deltaTime, time);
    }
    constructor(App, width, height, createOptions = {}) {
        super(App, width, height, createOptions);
        this.isEthereal = false;
        this.isInteractive = false;
        this.isNetworked = false;
        this.isStatic = true;
        this.updateTime = 100;
        this.raycaster = new THREE.Raycaster();
        //this.width = width
        //this.height = height
        this.size = { width: width / 1000, height: height / 1000 };
        //this.takeOwnership = this.takeOwnershipProto.bind(this)
        //this.setSharedData = this.setSharedDataProto.bind(this)
        this.headDiv = document.createElement("div");
        //this.headDiv.setAttribute("style","width: 100%;height: 100%;")
        //this.vueApp = createApp(App, createOptions)
    }
    mount(useEthereal) {
        this.isEthereal = useEthereal === true;
        this.vueRoot = this.vueApp.mount(this.headDiv);
        this.vueRoot.$el.setAttribute("style", "width: " + this.width + "px; height: " + this.height + "px;");
        // // add a link to the shared css
        let l = document.createElement("link");
        l.setAttribute("href", "https://resources.realitymedia.digital/vue-apps/dist/hubs.css");
        l.setAttribute("rel", "stylesheet");
        l.setAttribute("crossorigin", "anonymous");
        this.vueRoot.$el.insertBefore(l, this.vueRoot.$el.firstChild);
        // move this into method
        this.webLayer3D = new kh(this.vueRoot.$el, {
            autoRefresh: true,
            onLayerCreate: useEthereal ?
                (layer) => {
                    const adapter = HubsApp$h.system.getAdapter(layer);
                    adapter.opacity.enabled = true;
                    adapter.onUpdate = () => layer.update();
                } :
                (layer) => { },
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
    // dummy functions, just to avoid errors if they get called before
    // networking is initialized, or called when networked is false
    // takeOwnershipProto(): boolean {
    //     return true;
    // }
    // setSharedDataProto(object: {}) {
    //     return true;
    // }
    // receive data updates.  should be overridden by subclasses, also requests
    // update next tick
    updateSharedData(dataObject) {
        this.needsUpdate = true;
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
        console.log("div size: {" + this.size.width + ", " + this.size.height + "}");
        return this.size;
    }
    // receive data updates.  should be overridden by subclasses
    getSharedData(dataObject) {
        throw new Error("getSharedData should be overridden by subclasses");
    }
    // override to check for your own 3D objects that aren't webLayers
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
            console.log('hit', hit.target, hit.layer);
        }
    }
    dragStart(evt) {
        // nothing here ... subclass should override
    }
    dragEnd(evt) {
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
        if (this.isEthereal) ;
        else {
            var needsUpdate = this.needsUpdate;
            this.needsUpdate = false;
            if (this.isStatic && this.updateTime < time) {
                needsUpdate = true;
                // wait a bit and do it again.  May get rid of this some day, we'll see
                this.updateTime = Math.random() * 2000 + 1000;
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
}

class Store$1 {
    _state;
    state;
    app;
    constructor(app) {
        this._state = reactive({
            count: 0
        });
        this.app = app;
        this.state = readonly(this._state);
    }
    increment() {
        if (this.app.takeOwnership()) {
            this._state.count++;
            this.app.setSharedData(this.state);
        }
    }
    updateSharedData(dataObject) {
        // need to update the elements within the state, because otherwise
        // the data won't flow to the components
        this._state.count = dataObject.count;
    }
}

class HubsApp$g extends HubsApp$h {
    shared;
    constructor() {
        super(script$i, 400, 475);
        // create our shared data object that will
        // share data between vue and hubs
        this.shared = new Store$1(this);
        this.vueApp.provide('shared', this.shared);
        this.isInteractive = true;
        this.isNetworked = true;
        this.isStatic = false;
    }
    updateSharedData(dataObject) {
        super.updateSharedData(dataObject);
        this.shared.updateSharedData(dataObject);
    }
    getSharedData() {
        return this.shared.state;
    }
}
var init$g = function () {
    let app = new HubsApp$g();
    app.mount();
    return app;
};

pushScopeId("data-v-b474cdac");
const _hoisted_1$g = {
  "xr-layer": "",
  class: "fade"
};
const _hoisted_2$g = /*#__PURE__*/createBaseVNode("p", null, [
  /*#__PURE__*/createBaseVNode("a", {
    href: "https://vitejs.dev/guide/features.html",
    target: "_blank"
  }, " Vite Documentation and Then Some! "),
  /*#__PURE__*/createTextVNode(" | "),
  /*#__PURE__*/createBaseVNode("a", {
    href: "https://v3.vuejs.org/",
    target: "_blank"
  }, "Vue 3 Documentation")
], -1 /* HOISTED */);
popScopeId();


var script$h = {
  props: {
  msg: String
},
  setup(__props) {



const state = reactive({ count: 0 });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("h1", _hoisted_1$g, toDisplayString(__props.msg), 1 /* TEXT */),
    _hoisted_2$g,
    createBaseVNode("button", {
      "xr-layer": "",
      onClick: _cache[0] || (_cache[0] = $event => (unref(state).count++))
    }, "count is: " + toDisplayString(unref(state).count), 1 /* TEXT */)
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$h.__scopeId = "data-v-b474cdac";

pushScopeId("data-v-6a11ec38");
const _hoisted_1$f = { id: "top" };
const _hoisted_2$f = /*#__PURE__*/createBaseVNode("img", {
  alt: "Vue logo",
  src: _imports_0$5
}, null, -1 /* HOISTED */);
const _hoisted_3$3 = /*#__PURE__*/createTextVNode(" Edit code in ");
const _hoisted_4$2 = /*#__PURE__*/createBaseVNode("code", null, "src/apps", -1 /* HOISTED */);
const _hoisted_5 = /*#__PURE__*/createTextVNode(" to test hot module replacement while running project as \"npm run dev\". ");
const _hoisted_6 = [
  _hoisted_3$3,
  _hoisted_4$2,
  _hoisted_5
];
popScopeId();


var script$g = {
  setup(__props) {

const shared = inject('shared');

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$f, [
    _hoisted_2$f,
    createVNode(script$h, { msg: "Vue Component with Local Button Count" }),
    createBaseVNode("p", {
      id: "edit",
      class: normalizeClass({ upclose: unref(shared).state.close }),
      "xr-layer": ""
    }, _hoisted_6, 2 /* CLASS */)
  ]))
}
}

};

script$g.__scopeId = "data-v-6a11ec38";

class Store {
    _state;
    state;
    app;
    constructor(app) {
        this._state = reactive({
            close: 0
        });
        this.app = app;
        this.state = readonly(this._state);
    }
    setClose(c) {
        if (this._state.close != c) {
            this._state.close = c;
        }
    }
}

class HubsApp$f extends HubsApp$h {
    shared;
    constructor() {
        super(script$g, 500, 500);
        this.isInteractive = true;
        this.shared = new Store(this);
        this.vueApp.provide('shared', this.shared);
    }
    docs;
    boundsSize = new THREE.Vector3();
    bounds = new THREE.Box3();
    mount() {
        super.mount(true); // use ethereal
        this.docs = this.webLayer3D.querySelector('#edit');
        if (!this.docs) {
            console.warn("Vue app needs #edit div");
            return;
        }
        let adapter = HubsApp$f.system.getAdapter(this.docs);
        adapter.onUpdate = () => {
            this.bounds = adapter.metrics.target.visualBounds;
            this.bounds.getSize(this.boundsSize);
            var size = Math.sqrt(this.boundsSize.x * this.boundsSize.x + this.boundsSize.y * this.boundsSize.y);
            if (this.shared.state.close) {
                this.shared.setClose(size < 210);
            }
            else {
                this.shared.setClose(size < 190);
            }
            this.docs.update();
        };
    }
}
var init$f = function () {
    let app = new HubsApp$f();
    app.mount();
    return app;
};

var _imports_0$4 = "https://resources.realitymedia.digital/vue-apps/dist/38d6d7a1e02fc2f9.png";

var script$f = {
  props: {
  msg: String
},
  setup(__props) {



reactive({ count: 0 });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("h2", null, toDisplayString(__props.msg), 1 /* TEXT */))
}
}

};

script$f.__scopeId = "data-v-ecd9120c";

const _hoisted_1$e = { id: "room" };
const _hoisted_2$e = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$4,
  width: "250"
}, null, -1 /* HOISTED */);
const _hoisted_3$2 = /*#__PURE__*/createBaseVNode("div", { class: "displaytext" }, "AR allows us to extend our physical reality; VR creates for us a different reality.", -1 /* HOISTED */);

var script$e = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$e, [
    createVNode(script$f, { msg: "Reality Media" }),
    _hoisted_2$e,
    _hoisted_3$2
  ]))
}
}

};

class HubsApp$e extends HubsApp$h {
    constructor (width, height) {
        super(script$e, width, height);
        // this.isInteractive = true;
    }
}

var init$e = function () {
    let app = new HubsApp$e(300, 475);
    app.mount();
    return app
};

var _imports_0$3 = "https://resources.realitymedia.digital/vue-apps/dist/7af7b95b35fd7616.jpg";

const _hoisted_1$d = { id: "room" };
const _hoisted_2$d = { class: "spacer" };
const _hoisted_3$1 = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$3,
  width: "250"
}, null, -1 /* HOISTED */);
const _hoisted_4$1 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, " Each reality medium mediates and remediates. It offers a new representation of the world that we implicitly compare to our experience of the world in itself, but also through other media.", -1 /* HOISTED */);

var script$d = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$d, [
    createBaseVNode("div", _hoisted_2$d, [
      createVNode(script$f, { msg: "AR & VR as reality media" }),
      _hoisted_3$1,
      _hoisted_4$1
    ])
  ]))
}
}

};

class HubsApp$d extends HubsApp$h {
    constructor (width, height) {
        super(script$d, width, height);
        // this.isInteractive = true;
    }
}

var init$d = function () {
    let app = new HubsApp$d(300, 475);
    app.mount();
    return app
};

var _imports_0$2 = "https://resources.realitymedia.digital/vue-apps/dist/7ab3d86afd48dbfb.jpg";

const _hoisted_1$c = { id: "room" };
const _hoisted_2$c = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$2,
    width: "250"
  }),
  /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Film became one of the most important reality media of the twentieth century, and in some ways, it is a forerunner of virtual reality.")
], -1 /* HOISTED */);

var script$c = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$c, [
    createVNode(script$f, { msg: "The LaCiotat Effect" }),
    _hoisted_2$c
  ]))
}
}

};

class HubsApp$c extends HubsApp$h {
    constructor (width, height) {
        super(script$c,width,height);
        // this.isInteractive = true;
    }
}

var init$c = function () {
    let app = new HubsApp$c(300, 475);
    app.mount();
    return app
};

var _imports_0$1 = "https://resources.realitymedia.digital/vue-apps/dist/91fdfa811e752dc8.jpg";

const _hoisted_1$b = { id: "room" };
const _hoisted_2$b = { class: "spacer" };
const _hoisted_3 = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$1,
  width: "200"
}, null, -1 /* HOISTED */);
const _hoisted_4 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "3-D computer graphics help to construct the visual realities of AR and VR, that is photorealism. The uncanny valley.", -1 /* HOISTED */);

var script$b = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$b, [
    createBaseVNode("div", _hoisted_2$b, [
      createVNode(script$f, { msg: "3-D Graphics & Tracking" }),
      _hoisted_3,
      _hoisted_4
    ])
  ]))
}
}

};

class HubsApp$b extends HubsApp$h {
    constructor (width, height) {
        super(script$b, width, height);
        //// this.isInteractive = true;
    }
}

var init$b = function () {
    let app = new HubsApp$b(300, 475);
    app.mount();
    return app
};

var _imports_0 = "https://resources.realitymedia.digital/vue-apps/dist/dc05c04546a69e64.png";

const _hoisted_1$a = { id: "room" };
const _hoisted_2$a = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0,
    width: "250"
  }),
  /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Presence in VR is usually conceived of as forgetting that the medium is there. The idea is that if the user can be enticed into behaving as if she were not aware of all the complex technology, then she feels presence.")
], -1 /* HOISTED */);

var script$a = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$a, [
    createVNode(script$f, { msg: "Presence" }),
    _hoisted_2$a
  ]))
}
}

};

class HubsApp$a extends HubsApp$h {
    constructor (width, height) {
        super(script$a,width,height);
        // this.isInteractive = true;
    }
}

var init$a = function () {
    let app = new HubsApp$a(300, 475);
    app.mount();
    return app
};

const _hoisted_1$9 = { id: "room" };
const _hoisted_2$9 = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0,
    width: "250"
  }),
  /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Reality media applications often function as additions to established genres. Most current AR and VR applications behave like applications or artifacts that we know from earlier media.")
], -1 /* HOISTED */);

var script$9 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$9, [
    createVNode(script$f, { msg: "Genres" }),
    _hoisted_2$9
  ]))
}
}

};

class HubsApp$9 extends HubsApp$h {
    constructor (width, height) {
        super(script$9,width,height);
        // this.isInteractive = true;
    }
}

var init$9 = function () {
    let app = new HubsApp$9(300, 475);
    app.mount();
    return app
};

const _hoisted_1$8 = { id: "room" };
const _hoisted_2$8 = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0,
    width: "250"
  }),
  /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "VR will continue to construct special realities, apart from the everyday. VR worlds will continue to be metaphoric worlds.")
], -1 /* HOISTED */);

var script$8 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$8, [
    createVNode(script$f, { msg: "The Future of AR & VR" }),
    _hoisted_2$8
  ]))
}
}

};

class HubsApp$8 extends HubsApp$h {
    constructor (width, height) {
        super(script$8,width,height);
        // this.isInteractive = true;
    }
}

var init$8 = function () {
    let app = new HubsApp$8(300, 475);
    app.mount();
    return app
};

const _hoisted_1$7 = { id: "room" };
const _hoisted_2$7 = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Pervasive, always-on AR applications have the potential to provide companies or government authorities even more information and with more precision than our current mobile applications do, both by aggregating our habits as consumers and by identifying us as individuals.")
], -1 /* HOISTED */);

var script$7 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$7, [
    createVNode(script$f, { msg: "Privacy and Public Space" }),
    _hoisted_2$7
  ]))
}
}

};

class HubsApp$7 extends HubsApp$h {
    constructor (width, height) {
        super(script$7,width,height);
        // this.isInteractive = true;
    }
}

var init$7 = function () {
    let app = new HubsApp$7(300, 475);
    app.mount();
    return app
};

const _hoisted_1$6 = { id: "room" };
const _hoisted_2$6 = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$6 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$6, [
    createVNode(script$f, { msg: "AR & VR as reality media" }),
    _hoisted_2$6
  ]))
}
}

};

class HubsApp$6 extends HubsApp$h {
    constructor (width, height) {
        super(script$6,width, height);
        // this.isInteractive = true;
    }
}

var init$6 = function () {
    let app = new HubsApp$6(300, 475);
    app.mount();
    return app
};

const _hoisted_1$5 = { id: "room" };
const _hoisted_2$5 = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$5 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$5, [
    createVNode(script$f, { msg: "The History of Reality Media" }),
    _hoisted_2$5
  ]))
}
}

};

class HubsApp$5 extends HubsApp$h {
    constructor (width, height) {
        super(script$5,width,height);
        // this.isInteractive = true;
    }
}

var init$5 = function () {
    let app = new HubsApp$5(300, 475);
    app.mount();
    return app
};

const _hoisted_1$4 = { id: "room" };
const _hoisted_2$4 = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$4 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$4, [
    createVNode(script$f, { msg: "3-D & Tracking" }),
    _hoisted_2$4
  ]))
}
}

};

class HubsApp$4 extends HubsApp$h {
    constructor (width, height) {
        super(script$4,width,height);
        // this.isInteractive = true;
    }
}

var init$4 = function () {
    let app = new HubsApp$4(300, 475);
    app.mount();
    return app
};

const _hoisted_1$3 = { id: "room" };
const _hoisted_2$3 = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$3 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$3, [
    createVNode(script$f, { msg: "Presence" }),
    _hoisted_2$3
  ]))
}
}

};

class HubsApp$3 extends HubsApp$h {
    constructor (width, height) {
        super(script$3,width,height);
        // this.isInteractive = true;
    }
}

var init$3 = function () {
    let app = new HubsApp$3(300, 475);
    app.mount();
    return app
};

const _hoisted_1$2 = { id: "room" };
const _hoisted_2$2 = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$2 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$2, [
    createVNode(script$f, { msg: "Genres" }),
    _hoisted_2$2
  ]))
}
}

};

class HubsApp$2 extends HubsApp$h {
    constructor (width, height) {
        super(script$2,width,height);
        // this.isInteractive = true;
    }
}

var init$2 = function () {
    let app = new HubsApp$2(300, 475);
    app.mount();
    return app
};

const _hoisted_1$1 = { id: "room" };
const _hoisted_2$1 = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$1 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$1, [
    createVNode(script$f, { msg: "Future" }),
    _hoisted_2$1
  ]))
}
}

};

class HubsApp$1 extends HubsApp$h {
    constructor (width, height) {
        super(script$1,width,height);
        // this.isInteractive = true;
    }
}

var init$1 = function () {
    let app = new HubsApp$1(300, 475);
    app.mount();
    return app
};

const _hoisted_1 = { id: "room" };
const _hoisted_2 = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(script$f, { msg: "Privacy" }),
    _hoisted_2
  ]))
}
}

};

class HubsApp extends HubsApp$h {
    constructor (width, height) {
        super(script,width,height);
        // this.isInteractive = true;
    }
}

var init = function () {
    let app = new HubsApp(300, 475);
    app.mount();
    return app
};

export { init$d as Center1, init$c as Center2, init$b as Center3, init$a as Center4, init$9 as Center5, init$8 as Center6, init$7 as Center7, init$e as Map, init$6 as Monolith1, init$5 as Monolith2, init$4 as Monolith3, init$3 as Monolith4, init$2 as Monolith5, init$1 as Monolith6, init as Monolith7, init$g as hubsTest1, init$f as hubsTest2, initializeEthereal, systemTick };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHVicy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Fzc2V0cy9sb2dvLnBuZyIsIi4uLy4uL3NyYy9jb21wb25lbnRzL05ldHdvcmtlZEhlbGxvV29ybGQudnVlIiwiLi4vLi4vc3JjL2FwcHMvSHVic1Rlc3QxL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9WdWVBcHAudHMiLCIuLi8uLi9zcmMvYXBwcy9IdWJzQXBwLnRzIiwiLi4vLi4vc3JjL2FwcHMvSHVic1Rlc3QxL3NoYXJlZC50cyIsIi4uLy4uL3NyYy9hcHBzL0h1YnNUZXN0MS9odWJzLnRzIiwiLi4vLi4vc3JjL2NvbXBvbmVudHMvSGVsbG9Xb3JsZC52dWUiLCIuLi8uLi9zcmMvYXBwcy9IdWJzVGVzdDIvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0h1YnNUZXN0Mi9zaGFyZWQudHMiLCIuLi8uLi9zcmMvYXBwcy9IdWJzVGVzdDIvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL3JvdHVuZGEtbWFwLnBuZyIsIi4uLy4uL3NyYy9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcl9NYXAvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcl9NYXAvaHVicy5qcyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL2xhY2lvdGF0LVZSLmpwZyIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjFfSW50cm8vQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjFfSW50cm8vaHVicy5qcyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL2xhY2lvdGF0LmpwZyIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjJfSGlzdG9yeS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyMl9IaXN0b3J5L2h1YnMuanMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy91bmNhbm55LmpwZyIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjNfM0QtVHJhY2tpbmcvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjNfM0QtVHJhY2tpbmcvaHVicy5qcyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL3BhcnRoZW5vbi5wbmciLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXI0X1ByZXNlbmNlL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXI0X1ByZXNlbmNlL2h1YnMuanMiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXI1X0dlbnJlcy9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyNV9HZW5yZXMvaHVicy5qcyIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjZfRnV0dXJlL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXI2X0Z1dHVyZS9odWJzLmpzIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyN19Qcml2YWN5L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXI3X1ByaXZhY3kvaHVicy5qcyIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoMV9JbnRyby9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGgxX0ludHJvL2h1YnMuanMiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDJfSGlzdG9yeS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGgyX0hpc3RvcnkvaHVicy5qcyIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoM18zRC1UcmFja2luZy9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGgzXzNELVRyYWNraW5nL2h1YnMuanMiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDRfUHJlc2VuY2UvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoNF9QcmVzZW5jZS9odWJzLmpzIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGg1X0dlbnJlcy9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGg1X0dlbnJlcy9odWJzLmpzIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGg2X0Z1dHVyZS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGg2X0Z1dHVyZS9odWJzLmpzIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGg3X1ByaXZhY3kvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoN19Qcml2YWN5L2h1YnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzFhNmFjZTM3NzEzM2YxNGEucG5nXCIiLCI8dGVtcGxhdGU+XG4gIDxoMSB4ci1sYXllciBjbGFzcz1cImZhZGVcIj57eyBtc2cgfX08L2gxPlxuICA8cD5cbiAgICBIZXJlJ3Mgc29tZSBtb3JlIHRleHQganVzdCB0byBtYWtlIHRoaW5ncyBub3QgYmxhbmsuXG4gIDwvcD5cblxuICA8YnV0dG9uIHhyLWxheWVyIEBjbGljaz1cInNoYXJlZC5pbmNyZW1lbnRcIj5jb3VudCBpczoge3sgc2hhcmVkLnN0YXRlLmNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgaW5qZWN0IH0gZnJvbSAndnVlJ1xuXG5kZWZpbmVQcm9wcyh7XG4gIG1zZzogU3RyaW5nXG59KVxuXG5jb25zdCBzaGFyZWQgPSBpbmplY3QoJ3NoYXJlZCcpXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbmEge1xuICBjb2xvcjogI2I1NDJiOTtcbn1cblxuLmZhZGUge1xuICBjb2xvcjogIzk4MDNhNTtcbiAgLyogdHJhbnNpdGlvbjogY29sb3IgMXM7ICovXG59XG5cbi5mYWRlOmhvdmVyIHtcbiAgY29sb3I6ICNhNzhlMDY7XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwidG9wXCI+XG4gICAgICA8aW1nIGFsdD1cIlZ1ZSBsb2dvXCIgc3JjPVwiLi4vLi4vYXNzZXRzL2xvZ28ucG5nXCIgLz5cbiAgICAgIDxTb21lVGV4dCBtc2c9XCJOZXR3b3JrZWQgVnVlIENvbXBvbmVudCB3aXRoIFNoYXJlZCBCdXR0b24gQ291bnRcIiAvPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgU29tZVRleHQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9OZXR3b3JrZWRIZWxsb1dvcmxkLnZ1ZSdcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuPC9zdHlsZT5cbiIsImltcG9ydCB7IGNyZWF0ZUFwcCwgQXBwLCBDb21wb25lbnQsIENvbXBvbmVudFB1YmxpY0luc3RhbmNlIH0gZnJvbSBcInZ1ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWdWVBcHAge1xuICAgIHRha2VPd25lcnNoaXA6ICAoKSA9PiBib29sZWFuXG4gICAgc2V0U2hhcmVkRGF0YTogKG9iamVjdDoge30pID0+IGJvb2xlYW5cblxuICAgIHdpZHRoOiBudW1iZXJcbiAgICBoZWlnaHQ6IG51bWJlclxuXG4gICAgdnVlQXBwOiBBcHBcbiAgICB2dWVSb290OiBDb21wb25lbnRQdWJsaWNJbnN0YW5jZSB8IHVuZGVmaW5lZFxuXG4gICAgY29uc3RydWN0b3IgKEFwcDogQ29tcG9uZW50LCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgY3JlYXRlT3B0aW9ucz17fSkge1xuICAgICAgICB0aGlzLnRha2VPd25lcnNoaXAgPSB0aGlzLnRha2VPd25lcnNoaXBQcm90by5iaW5kKHRoaXMpXG4gICAgICAgIHRoaXMuc2V0U2hhcmVkRGF0YSA9IHRoaXMuc2V0U2hhcmVkRGF0YVByb3RvLmJpbmQodGhpcylcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0XG5cbiAgICAgICAgdGhpcy52dWVBcHAgPSBjcmVhdGVBcHAoQXBwLCBjcmVhdGVPcHRpb25zKVxuICAgIH1cblxuICAgIG1vdW50KCkge1xuICAgIH1cblxuICAgIC8vIGR1bW15IGZ1bmN0aW9ucywganVzdCB0byBsZXQgdXMgdXNlIHRoZSBzYW1lXG4gICAgLy8gZGF0YSBzdG9yZSB3aXRoIGh1YnMgYW5kIHRoZSB3ZWIgdGVzdGluZyBzZXR1cFxuICAgIHRha2VPd25lcnNoaXBQcm90bygpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHNldFNoYXJlZERhdGFQcm90byhvYmplY3Q6IHt9KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBjcmVhdGVBcHAsIEFwcCwgQ29tcG9uZW50LCBDb21wb25lbnRQdWJsaWNJbnN0YW5jZSB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IFNjZW5lLCBFbnRpdHkgfSBmcm9tICdhZnJhbWUnXG5pbXBvcnQgeyBFdGhlcmVhbExheW91dFN5c3RlbSwgV2ViTGF5ZXIzRCB9IGZyb20gXCJldGhlcmVhbFwiO1xuaW1wb3J0IFZ1ZUFwcCAgZnJvbSBcIi4vVnVlQXBwXCJcblxuLy8gY3JlYXRlIGluaXQgbWV0aG9kIGZvciBldGhlcmVhbFxuaW1wb3J0ICogYXMgZXRoZXJlYWwgZnJvbSAnZXRoZXJlYWwnXG5pbXBvcnQgeyBjcmVhdGVQcmludGVyLCBUaGlzRXhwcmVzc2lvbiwgVGhyb3dTdGF0ZW1lbnQgfSBmcm9tIFwibm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQvbGliL3R5cGVzY3JpcHRcIjtcbmltcG9ydCB7IGNyZWF0ZSB9IGZyb20gXCJtYXRoanNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemVFdGhlcmVhbCgpIHtcbiAgICBIdWJzQXBwLmluaXRpYWxpemVFdGhlcmVhbCgpXG59XG5cbi8vVEhSRUUuT2JqZWN0M0QuRGVmYXVsdE1hdHJpeEF1dG9VcGRhdGUgPSB0cnVlO1xuXG5leHBvcnQgZnVuY3Rpb24gc3lzdGVtVGljayh0aW1lOiBudW1iZXIsIGRlbHRhVGltZTogbnVtYmVyKSB7XG4gICBIdWJzQXBwLnN5c3RlbVRpY2sodGltZSwgZGVsdGFUaW1lKVxufVxuXG5mdW5jdGlvbiBjb3B5Q2FtZXJhKHNvdXJjZTogVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEsIHRhcmdldDogVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEpIHtcbiAgICBzb3VyY2UudXBkYXRlTWF0cml4V29ybGQoKVxuICAgIC8vbGV0IG9sZE5hbWUgPSB0YXJnZXQubmFtZVxuICAgIC8vdGFyZ2V0LmNvcHkoc291cmNlLCBmYWxzZSlcbiAgICAvL3RhcmdldC5uYW1lID0gb2xkTmFtZVxuXG4gICAgdGFyZ2V0LmZvdiA9IHNvdXJjZS5mb3Y7XG4gICAgdGFyZ2V0Lnpvb20gPSBzb3VyY2Uuem9vbTtcblxuICAgIHRhcmdldC5uZWFyID0gc291cmNlLm5lYXI7XG4gICAgdGFyZ2V0LmZhciA9IHNvdXJjZS5mYXI7XG5cbiAgICB0YXJnZXQuYXNwZWN0ID0gc291cmNlLmFzcGVjdDtcblxuICAgIC8vIHRhcmdldC5tYXRyaXhXb3JsZEludmVyc2UuY29weSggc291cmNlLm1hdHJpeFdvcmxkSW52ZXJzZSApO1xuICAgIC8vIHRhcmdldC5wcm9qZWN0aW9uTWF0cml4LmNvcHkoIHNvdXJjZS5wcm9qZWN0aW9uTWF0cml4ICk7XG4gICAgLy8gdGFyZ2V0LnByb2plY3Rpb25NYXRyaXhJbnZlcnNlLmNvcHkoIHNvdXJjZS5wcm9qZWN0aW9uTWF0cml4SW52ZXJzZSApO1xuXG4gICAgLy8gdGFyZ2V0LnVwLmNvcHkoIHNvdXJjZS51cCApO1xuXG4gICAgLy8gdGFyZ2V0Lm1hdHJpeC5jb3B5KCBzb3VyY2UubWF0cml4ICk7XG4gICAgLy8gdGFyZ2V0Lm1hdHJpeFdvcmxkLmNvcHkoIHNvdXJjZS5tYXRyaXhXb3JsZCApO1xuXG4gICAgLy8gdGFyZ2V0Lm1hdHJpeEF1dG9VcGRhdGUgPSBzb3VyY2UubWF0cml4QXV0b1VwZGF0ZTtcbiAgICAvLyB0YXJnZXQubWF0cml4V29ybGROZWVkc1VwZGF0ZSA9IHNvdXJjZS5tYXRyaXhXb3JsZE5lZWRzVXBkYXRlO1xuXG4gICAgc291cmNlLm1hdHJpeFdvcmxkLmRlY29tcG9zZSggdGFyZ2V0LnBvc2l0aW9uLCB0YXJnZXQucXVhdGVybmlvbiwgdGFyZ2V0LnNjYWxlKVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB0YXJnZXQucm90YXRpb24uc2V0RnJvbVF1YXRlcm5pb24oIHRhcmdldC5xdWF0ZXJuaW9uLCB1bmRlZmluZWQsIGZhbHNlICk7XG4gICAgdGFyZ2V0LnVwZGF0ZU1hdHJpeCgpXG4gICAgdGFyZ2V0LnVwZGF0ZU1hdHJpeFdvcmxkKHRydWUpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBWdWVBcHAge1xuICAgIHN0YXRpYyBzeXN0ZW06IEV0aGVyZWFsTGF5b3V0U3lzdGVtO1xuICAgIHN0YXRpYyBldGhlcmVhbENhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSgpXG4gICAgc3RhdGljIHBsYXllckNhbWVyYTogVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmE7XG5cbiAgICBpc0V0aGVyZWFsOiBib29sZWFuXG4gICAgaXNJbnRlcmFjdGl2ZTogYm9vbGVhblxuICAgIGlzTmV0d29ya2VkOiBib29sZWFuXG4gICAgaXNTdGF0aWM6IGJvb2xlYW5cblxuICAgIHByaXZhdGUgdXBkYXRlVGltZTogbnVtYmVyXG4gICAgcHJpdmF0ZSByYXljYXN0ZXI6IFRIUkVFLlJheWNhc3RlclxuXG4gICAgc2l6ZToge1xuICAgICAgICB3aWR0aDogbnVtYmVyLFxuICAgICAgICBoZWlnaHQ6IG51bWJlclxuICAgIH1cblxuICAgIC8vdGFrZU93bmVyc2hpcDogICgpID0+IGJvb2xlYW5cbiAgICAvL3NldFNoYXJlZERhdGE6IChvYmplY3Q6IHt9KSA9PiBib29sZWFuXG4gICAgLy93aWR0aDogbnVtYmVyXG4gICAgLy9oZWlnaHQ6IG51bWJlclxuICAgIC8vdnVlQXBwOiBBcHBcbiAgICAvL3Z1ZVJvb3Q6IENvbXBvbmVudFB1YmxpY0luc3RhbmNlIHwgdW5kZWZpbmVkIFxuXG4gICAgd2ViTGF5ZXIzRDogV2ViTGF5ZXIzRCB8IHVuZGVmaW5lZFxuICAgIG5lZWRzVXBkYXRlOiBib29sZWFuID0gZmFsc2VcblxuICAgIGhlYWREaXY6IEVsZW1lbnRcblxuICAgIHN0YXRpYyBpbml0aWFsaXplRXRoZXJlYWwoKSB7XG4gICAgICAgIGxldCBzY2VuZTogU2NlbmUgPSB3aW5kb3cuQVBQLnNjZW5lO1xuXG4gICAgICAgIHRoaXMuZXRoZXJlYWxDYW1lcmEubWF0cml4QXV0b1VwZGF0ZSA9IHRydWU7XG4gICAgICAgIC8vdGhpcy5ldGhlcmVhbENhbWVyYS52aXNpYmxlID0gZmFsc2U7XG5cbiAgICAgICAgLy9zY2VuZS5zZXRPYmplY3QzRChcImV0aGVyZWFsQ2FtZXJhXCIsIHRoaXMuZXRoZXJlYWxDYW1lcmEpXG5cbiAgICAgICAgdGhpcy5wbGF5ZXJDYW1lcmEgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWV3aW5nLWNhbWVyYVwiKSBhcyBFbnRpdHkpLmdldE9iamVjdDNEKFwiY2FtZXJhXCIpIGFzIFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhO1xuXG4gICAgICAgIC8vIGp1c3QgaW4gY2FzZSBcInZpZXdpbmctY2FtZXJhXCIgaXNuJ3Qgc2V0IHVwIHlldCAuLi4gd2hpY2ggaXQgXG4gICAgICAgIC8vIHNob3VsZCBiZSwgYnV0IGp1c3QgdG8gYmUgY2FyZWZ1bFxuICAgICAgICB0aGlzLnN5c3RlbSA9IGV0aGVyZWFsLmNyZWF0ZUxheW91dFN5c3RlbSh0aGlzLnBsYXllckNhbWVyYSA/IHRoaXMucGxheWVyQ2FtZXJhIDogc2NlbmUuY2FtZXJhKVxuICAgICAgICB3aW5kb3cuZXRoU3lzdGVtID0gdGhpcy5zeXN0ZW1cblxuICAgICAgICAvLyBjYW4gY3VzdG9taXplIGVhc2luZyBldGNcbiAgICAgICAgLy8gc3lzdGVtLnRyYW5zaXRpb24uZHVyYXRpb24gPSAxLjVcbiAgICAgICAgLy8gc3lzdGVtLnRyYW5zaXRpb24uZGVsYXkgPSAwXG4gICAgICAgIC8vIHN5c3RlbS50cmFuc2l0aW9uLm1heFdhaXQgPSA0XG4gICAgICAgIC8vIHN5c3RlbS50cmFuc2l0aW9uLmVhc2luZyA9IGV0aGVyZWFsLmVhc2luZy5lYXNlT3V0XG4gICAgfVxuXG4gICAgc3RhdGljIHN5c3RlbVRpY2sodGltZTogbnVtYmVyLCBkZWx0YVRpbWU6IG51bWJlcikge1xuICAgICAgICBsZXQgc2NlbmUgPSB3aW5kb3cuQVBQLnNjZW5lO1xuXG4gICAgICAgIGlmICghdGhpcy5wbGF5ZXJDYW1lcmEpIHtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQ2FtZXJhID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlld2luZy1jYW1lcmFcIikgYXMgRW50aXR5KS5nZXRPYmplY3QzRChcImNhbWVyYVwiKSBhcyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKCF0aGlzLnBsYXllckNhbWVyYSkgcmV0dXJuO1xuICAgIFxuICAgICAgICBjb3B5Q2FtZXJhKHRoaXMucGxheWVyQ2FtZXJhLCB0aGlzLmV0aGVyZWFsQ2FtZXJhKVxuXG4gICAgICAgIGlmICh0aGlzLmV0aGVyZWFsQ2FtZXJhICE9IHRoaXMuc3lzdGVtLnZpZXdOb2RlKSB7XG4gICAgICAgICAgICB0aGlzLnN5c3RlbS52aWV3Tm9kZSA9IHRoaXMuZXRoZXJlYWxDYW1lcmFcbiAgICAgICAgfVxuXG4gICAgICAgIHNjZW5lLnJlbmRlcmVyLmdldFNpemUoSHVic0FwcC5zeXN0ZW0udmlld1Jlc29sdXRpb24pXG4gICAgICAgIHRoaXMuc3lzdGVtLnZpZXdGcnVzdHVtLnNldEZyb21QZXJzcGVjdGl2ZVByb2plY3Rpb25NYXRyaXgodGhpcy5ldGhlcmVhbENhbWVyYS5wcm9qZWN0aW9uTWF0cml4KVxuXG4gICAgICAgIC8vIHRpY2sgbWV0aG9kIGZvciBldGhlcmVhbFxuICAgICAgICB0aGlzLnN5c3RlbS51cGRhdGUoZGVsdGFUaW1lLCB0aW1lKVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yIChBcHA6IENvbXBvbmVudCwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGNyZWF0ZU9wdGlvbnM9e30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBjcmVhdGVPcHRpb25zKVxuICAgICAgICB0aGlzLmlzRXRoZXJlYWwgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc05ldHdvcmtlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU3RhdGljID0gdHJ1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVUaW1lID0gMTAwXG4gICAgICAgIHRoaXMucmF5Y2FzdGVyID0gbmV3IFRIUkVFLlJheWNhc3RlcigpXG4gICAgICAgIC8vdGhpcy53aWR0aCA9IHdpZHRoXG4gICAgICAgIC8vdGhpcy5oZWlnaHQgPSBoZWlnaHRcbiAgICAgICAgdGhpcy5zaXplID0geyB3aWR0aDogd2lkdGgvMTAwMCwgaGVpZ2h0OiBoZWlnaHQvMTAwMH1cbiAgICAgICAgLy90aGlzLnRha2VPd25lcnNoaXAgPSB0aGlzLnRha2VPd25lcnNoaXBQcm90by5iaW5kKHRoaXMpXG4gICAgICAgIC8vdGhpcy5zZXRTaGFyZWREYXRhID0gdGhpcy5zZXRTaGFyZWREYXRhUHJvdG8uYmluZCh0aGlzKVxuXG4gICAgICAgIHRoaXMuaGVhZERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgLy90aGlzLmhlYWREaXYuc2V0QXR0cmlidXRlKFwic3R5bGVcIixcIndpZHRoOiAxMDAlO2hlaWdodDogMTAwJTtcIilcblxuICAgICAgICAvL3RoaXMudnVlQXBwID0gY3JlYXRlQXBwKEFwcCwgY3JlYXRlT3B0aW9ucylcbiAgICB9XG5cbiAgICBtb3VudCh1c2VFdGhlcmVhbD86IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5pc0V0aGVyZWFsID0gdXNlRXRoZXJlYWwgPT09IHRydWVcbiAgICAgICAgXG4gICAgICAgIHRoaXMudnVlUm9vdCA9IHRoaXMudnVlQXBwLm1vdW50KHRoaXMuaGVhZERpdik7XG4gICAgICAgIHRoaXMudnVlUm9vdC4kZWwuc2V0QXR0cmlidXRlKFwic3R5bGVcIixcIndpZHRoOiBcIiArIHRoaXMud2lkdGggKyBcInB4OyBoZWlnaHQ6IFwiICsgdGhpcy5oZWlnaHQgKyBcInB4O1wiKVxuXG4gICAgICAgIC8vIC8vIGFkZCBhIGxpbmsgdG8gdGhlIHNoYXJlZCBjc3NcbiAgICAgICAgbGV0IGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKVxuICAgICAgICBsLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0L2h1YnMuY3NzXCIpXG4gICAgICAgIGwuc2V0QXR0cmlidXRlKFwicmVsXCIsIFwic3R5bGVzaGVldFwiKVxuICAgICAgICBsLnNldEF0dHJpYnV0ZShcImNyb3Nzb3JpZ2luXCIsXCJhbm9ueW1vdXNcIilcbiAgICAgICAgdGhpcy52dWVSb290LiRlbC5pbnNlcnRCZWZvcmUobCwgdGhpcy52dWVSb290LiRlbC5maXJzdENoaWxkKVxuXG4gICAgICAgIC8vIG1vdmUgdGhpcyBpbnRvIG1ldGhvZFxuICAgICAgICB0aGlzLndlYkxheWVyM0QgPSBuZXcgV2ViTGF5ZXIzRCh0aGlzLnZ1ZVJvb3QuJGVsLCB7XG4gICAgICAgICAgICBhdXRvUmVmcmVzaDogdHJ1ZSxcbiAgICAgICAgICAgIG9uTGF5ZXJDcmVhdGU6IHVzZUV0aGVyZWFsID8gXG4gICAgICAgICAgICAobGF5ZXIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBhZGFwdGVyID0gSHVic0FwcC5zeXN0ZW0uZ2V0QWRhcHRlcihsYXllcilcbiAgICAgICAgICAgICAgICBhZGFwdGVyLm9wYWNpdHkuZW5hYmxlZCA9IHRydWVcbiAgICAgICAgICAgICAgICBhZGFwdGVyLm9uVXBkYXRlID0gKCkgPT4gbGF5ZXIudXBkYXRlKClcbiAgICAgICAgICAgIH0gOlxuICAgICAgICAgICAgKGxheWVyKSA9PiB7fSxcbiAgICAgICAgICAgIG9uTGF5ZXJQYWludDogKGxheWVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTdGF0aWMpIHsgdGhpcy5uZWVkc1VwZGF0ZSA9IHRydWUgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRleHR1cmVFbmNvZGluZzogVEhSRUUuc1JHQkVuY29kaW5nLFxuICAgICAgICAgICAgcmVuZGVyT3JkZXJPZmZzZXQ6IDBcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0TmV0d29ya01ldGhvZHModGFrZU93bmVyc2hpcDogKCkgPT4gYm9vbGVhbiwgc2V0U2hhcmVkRGF0YTogKHt9KSA9PiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMudGFrZU93bmVyc2hpcCA9IHRha2VPd25lcnNoaXA7XG4gICAgICAgIHRoaXMuc2V0U2hhcmVkRGF0YSA9IHNldFNoYXJlZERhdGE7XG4gICAgfVxuXG4gICAgLy8gZHVtbXkgZnVuY3Rpb25zLCBqdXN0IHRvIGF2b2lkIGVycm9ycyBpZiB0aGV5IGdldCBjYWxsZWQgYmVmb3JlXG4gICAgLy8gbmV0d29ya2luZyBpcyBpbml0aWFsaXplZCwgb3IgY2FsbGVkIHdoZW4gbmV0d29ya2VkIGlzIGZhbHNlXG4gICAgLy8gdGFrZU93bmVyc2hpcFByb3RvKCk6IGJvb2xlYW4ge1xuICAgIC8vICAgICByZXR1cm4gdHJ1ZTtcbiAgICAvLyB9XG5cbiAgICAvLyBzZXRTaGFyZWREYXRhUHJvdG8ob2JqZWN0OiB7fSkge1xuICAgIC8vICAgICByZXR1cm4gdHJ1ZTtcbiAgICAvLyB9XG5cbiAgICAvLyByZWNlaXZlIGRhdGEgdXBkYXRlcy4gIHNob3VsZCBiZSBvdmVycmlkZGVuIGJ5IHN1YmNsYXNzZXMsIGFsc28gcmVxdWVzdHNcbiAgICAvLyB1cGRhdGUgbmV4dCB0aWNrXG4gICAgdXBkYXRlU2hhcmVkRGF0YShkYXRhT2JqZWN0OiB7fSkge1xuICAgICAgICB0aGlzLm5lZWRzVXBkYXRlID0gdHJ1ZVxuICAgIH1cblxuICAgIGdldFNpemUoKSB7XG4gICAgICAgIC8vIGlmICghdGhpcy5jb21wU3R5bGVzKSB7XG4gICAgICAgIC8vICAgICB0aGlzLmNvbXBTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLnZ1ZVJvb3QuJGVsKTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyB2YXIgd2lkdGggPSB0aGlzLmNvbXBTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnd2lkdGgnKVxuICAgICAgICAvLyB3aWR0aCA9IHdpZHRoICYmIHdpZHRoLmxlbmd0aCA+IDAgPyBwYXJzZUZsb2F0KHdpZHRoKSAvIDEwMDA6IDFcbiAgICAgICAgLy8gdmFyIGhlaWdodCA9IHRoaXMuY29tcFN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKCdoZWlnaHQnKVxuICAgICAgICAvLyBoZWlnaHQgPSBoZWlnaHQgJiYgaGVpZ2h0Lmxlbmd0aCA+IDAgPyBwYXJzZUZsb2F0KGhlaWdodCkgLyAxMDAwOiAxXG4gICAgICAgIC8vIHRoaXMuc2l6ZSA9IHsgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodH1cbiAgICAgICAgY29uc29sZS5sb2cgKFwiZGl2IHNpemU6IHtcIiArIHRoaXMuc2l6ZS53aWR0aCArIFwiLCBcIiArIHRoaXMuc2l6ZS5oZWlnaHQgKyBcIn1cIilcbiAgICAgICAgcmV0dXJuIHRoaXMuc2l6ZVxuICAgIH1cblxuICAgIC8vIHJlY2VpdmUgZGF0YSB1cGRhdGVzLiAgc2hvdWxkIGJlIG92ZXJyaWRkZW4gYnkgc3ViY2xhc3Nlc1xuICAgIGdldFNoYXJlZERhdGEoZGF0YU9iamVjdDoge30pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZ2V0U2hhcmVkRGF0YSBzaG91bGQgYmUgb3ZlcnJpZGRlbiBieSBzdWJjbGFzc2VzXCIpXG4gICAgfVxuICAgIFxuICAgIC8vIG92ZXJyaWRlIHRvIGNoZWNrIGZvciB5b3VyIG93biAzRCBvYmplY3RzIHRoYXQgYXJlbid0IHdlYkxheWVyc1xuICAgIGNsaWNrZWQoZXZ0OiB7b2JqZWN0M0Q6IFRIUkVFLk9iamVjdDNEfSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNJbnRlcmFjdGl2ZSkgeyByZXR1cm4gfVxuICAgICAgICBcbiAgICAgICAgY29uc3Qgb2JqID0gZXZ0Lm9iamVjdDNEXG4gICAgICAgIHRoaXMucmF5Y2FzdGVyLnJheS5zZXQob2JqLnBvc2l0aW9uLCBcbiAgICAgICAgICAgIHRoaXMud2ViTGF5ZXIzRCEuZ2V0V29ybGREaXJlY3Rpb24obmV3IFRIUkVFLlZlY3RvcjMoKSkubmVnYXRlKCkpXG4gICAgICAgIGNvbnN0IGhpdCA9IHRoaXMud2ViTGF5ZXIzRCEuaGl0VGVzdCh0aGlzLnJheWNhc3Rlci5yYXkpXG4gICAgICAgIGlmIChoaXQpIHtcbiAgICAgICAgICBoaXQudGFyZ2V0LmNsaWNrKClcbiAgICAgICAgICBoaXQudGFyZ2V0LmZvY3VzKClcbiAgICAgICAgICBjb25zb2xlLmxvZygnaGl0JywgaGl0LnRhcmdldCwgaGl0LmxheWVyKVxuICAgICAgICB9ICAgXG4gICAgfVxuXG4gICAgZHJhZ1N0YXJ0KGV2dDoge30pIHtcbiAgICAgICAgLy8gbm90aGluZyBoZXJlIC4uLiBzdWJjbGFzcyBzaG91bGQgb3ZlcnJpZGVcbiAgICB9XG5cbiAgICBkcmFnRW5kIChldnQ6IHt9KSB7XG4gICAgICAgIC8vIG5vdGhpbmcgaGVyZSAuLi4gc3ViY2xhc3Mgc2hvdWxkIG92ZXJyaWRlXG4gICAgfVxuXG4gICAgcGxheSgpIHtcbiAgICAgICAgLy8gaWYgd2UgY2FuIGZpZ3VyZSBvdXQgaG93IHRvIHBhdXNlLCB0aGVuIHJlc3RhcnQgaGVyZVxuICAgIH1cblxuICAgIHBhdXNlKCkge1xuICAgICAgICAvLyBwZXJoYXBzIGZpZ3VyZSBvdXQgaG93IHRvIHBhdXNlIHRoZSBWdWUgY29tcG9uZW50P1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIC8vIFRPRE86IGRlc3Ryb3kgdGhlIHZ1ZSBjb21wb25lbnQgYW5kIGFueSByZXNvdXJjZXMsIGV0Yy4sIGl0IGhhc1xuICAgIH1cblxuICAgIHRpY2sodGltZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRXRoZXJlYWwpIHtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIG5lZWRzVXBkYXRlID0gdGhpcy5uZWVkc1VwZGF0ZVxuICAgICAgICAgICAgdGhpcy5uZWVkc1VwZGF0ZSA9IGZhbHNlXG4gICAgICAgICAgICBpZiAodGhpcy5pc1N0YXRpYyAmJiB0aGlzLnVwZGF0ZVRpbWUgPCB0aW1lKSB7XG4gICAgICAgICAgICAgICAgbmVlZHNVcGRhdGUgPSB0cnVlXG4gICAgICAgICAgICAgICAgLy8gd2FpdCBhIGJpdCBhbmQgZG8gaXQgYWdhaW4uICBNYXkgZ2V0IHJpZCBvZiB0aGlzIHNvbWUgZGF5LCB3ZSdsbCBzZWVcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRpbWUgPSBNYXRoLnJhbmRvbSgpICogMjAwMCArIDEwMDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5pc1N0YXRpYykge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVGltZSA9IHRpbWVcbiAgICAgICAgICAgICAgICBuZWVkc1VwZGF0ZSA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZWVkc1VwZGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMud2ViTGF5ZXIzRCEudXBkYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHsgcmVhY3RpdmUsIHJlYWRvbmx5IH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IFZ1ZUFwcCBmcm9tIFwiLi4vVnVlQXBwXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgZGF0YSB7XG4gICAgY291bnQ6IG51bWJlclxufVxuXG5leHBvcnQgY2xhc3MgU3RvcmUge1xuICAgIF9zdGF0ZTogZGF0YVxuICAgIHN0YXRlOiBkYXRhXG4gICAgYXBwOiBWdWVBcHBcbiAgICBjb25zdHJ1Y3RvcihhcHA6IFZ1ZUFwcCkge1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IHJlYWN0aXZlKHtcbiAgICAgICAgICAgIGNvdW50OiAwXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuYXBwID0gYXBwXG4gICAgICAgIHRoaXMuc3RhdGUgPSByZWFkb25seSh0aGlzLl9zdGF0ZSlcbiAgICB9ICAgIFxuXG4gICAgaW5jcmVtZW50KCkge1xuICAgICAgICBpZiAodGhpcy5hcHAudGFrZU93bmVyc2hpcCgpKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZS5jb3VudCsrO1xuICAgICAgICAgICAgdGhpcy5hcHAuc2V0U2hhcmVkRGF0YSh0aGlzLnN0YXRlKVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZVNoYXJlZERhdGEoZGF0YU9iamVjdDogZGF0YSkge1xuICAgICAgICAvLyBuZWVkIHRvIHVwZGF0ZSB0aGUgZWxlbWVudHMgd2l0aGluIHRoZSBzdGF0ZSwgYmVjYXVzZSBvdGhlcndpc2VcbiAgICAgICAgLy8gdGhlIGRhdGEgd29uJ3QgZmxvdyB0byB0aGUgY29tcG9uZW50c1xuICAgICAgICB0aGlzLl9zdGF0ZS5jb3VudCA9IGRhdGFPYmplY3QuY291bnRcbiAgICB9XG59IiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5pbXBvcnQge2RhdGEgYXMgU2hhcmVkRGF0YSwgU3RvcmV9IGZyb20gXCIuL3NoYXJlZFwiXG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIHNoYXJlZDogU3RvcmVcbiAgICBcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHN1cGVyKEFwcCwgNDAwLCA0NzUpXG5cbiAgICAgICAgLy8gY3JlYXRlIG91ciBzaGFyZWQgZGF0YSBvYmplY3QgdGhhdCB3aWxsXG4gICAgICAgIC8vIHNoYXJlIGRhdGEgYmV0d2VlbiB2dWUgYW5kIGh1YnNcbiAgICAgICAgdGhpcy5zaGFyZWQgPSBuZXcgU3RvcmUodGhpcylcbiAgICAgICAgdGhpcy52dWVBcHAucHJvdmlkZSgnc2hhcmVkJywgdGhpcy5zaGFyZWQpXG5cbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc05ldHdvcmtlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNTdGF0aWMgPSBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgdXBkYXRlU2hhcmVkRGF0YShkYXRhT2JqZWN0OiBTaGFyZWREYXRhKSB7XG4gICAgICAgIHN1cGVyLnVwZGF0ZVNoYXJlZERhdGEoZGF0YU9iamVjdClcbiAgICAgICAgdGhpcy5zaGFyZWQudXBkYXRlU2hhcmVkRGF0YShkYXRhT2JqZWN0KVxuICAgIH1cblxuICAgIGdldFNoYXJlZERhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNoYXJlZC5zdGF0ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXRcbiIsIjx0ZW1wbGF0ZT5cbiAgPGgxIHhyLWxheWVyIGNsYXNzPVwiZmFkZVwiPnt7IG1zZyB9fTwvaDE+XG5cbiAgPHA+XG4gICAgPGEgaHJlZj1cImh0dHBzOi8vdml0ZWpzLmRldi9ndWlkZS9mZWF0dXJlcy5odG1sXCIgdGFyZ2V0PVwiX2JsYW5rXCI+XG4gICAgICBWaXRlIERvY3VtZW50YXRpb24gYW5kIFRoZW4gU29tZSEgXG4gICAgPC9hPlxuICAgIHxcbiAgICA8YSBocmVmPVwiaHR0cHM6Ly92My52dWVqcy5vcmcvXCIgdGFyZ2V0PVwiX2JsYW5rXCI+VnVlIDMgRG9jdW1lbnRhdGlvbjwvYT5cbiAgPC9wPlxuXG4gIDxidXR0b24geHItbGF5ZXIgQGNsaWNrPVwic3RhdGUuY291bnQrK1wiPmNvdW50IGlzOiB7eyBzdGF0ZS5jb3VudCB9fTwvYnV0dG9uPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlYWN0aXZlIH0gZnJvbSAndnVlJ1xuXG5kZWZpbmVQcm9wcyh7XG4gIG1zZzogU3RyaW5nXG59KVxuXG5jb25zdCBzdGF0ZSA9IHJlYWN0aXZlKHsgY291bnQ6IDAgfSlcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuYSB7XG4gIGNvbG9yOiAjYjU0MmI5O1xufVxuXG4uZmFkZSB7XG4gIGNvbG9yOiAjOTgwM2E1O1xuICAvKiB0cmFuc2l0aW9uOiBjb2xvciAxczsgKi9cbn1cblxuLmZhZGU6aG92ZXIge1xuICBjb2xvcjogIzA2YTcxYjtcbn1cbjwvc3R5bGU+XG5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInRvcFwiPlxuICAgICAgPGltZyBhbHQ9XCJWdWUgbG9nb1wiIHNyYz1cIi4uLy4uL2Fzc2V0cy9sb2dvLnBuZ1wiIC8+XG4gICAgICA8SGVsbG9Xb3JsZCBtc2c9XCJWdWUgQ29tcG9uZW50IHdpdGggTG9jYWwgQnV0dG9uIENvdW50XCIgLz5cbiAgICAgIDxwIGlkPVwiZWRpdFwiIHYtYmluZDpjbGFzcz1cInsgdXBjbG9zZTogc2hhcmVkLnN0YXRlLmNsb3NlIH1cIiB4ci1sYXllcj5cbiAgICAgICAgRWRpdCBjb2RlIGluIDxjb2RlPnNyYy9hcHBzPC9jb2RlPiB0byB0ZXN0IGhvdCBtb2R1bGUgcmVwbGFjZW1lbnQgd2hpbGUgcnVubmluZyBwcm9qZWN0IGFzIFwibnBtIHJ1biBkZXZcIi5cbiAgICAgIDwvcD5cblxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgSGVsbG9Xb3JsZCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0hlbGxvV29ybGQudnVlJ1xuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuXG5pbXBvcnQgeyBpbmplY3QgfSBmcm9tICd2dWUnXG5cbmNvbnN0IHNoYXJlZCA9IGluamVjdCgnc2hhcmVkJylcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuI2VkaXQge1xuICBjb2xvcjogIzAwMDAwMDtcbn1cblxuI2VkaXQudXBjbG9zZSB7XG4gIGNvbG9yOiAjYzAwMzAzO1xufVxuPC9zdHlsZT5cbiIsImltcG9ydCB7IHJlYWN0aXZlLCByZWFkb25seSB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCBWdWVBcHAgZnJvbSBcIi4uL1Z1ZUFwcFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIGRhdGEge1xuICAgIGNsb3NlOiBudW1iZXJcbn1cblxuZXhwb3J0IGNsYXNzIFN0b3JlIHtcbiAgICBfc3RhdGU6IGRhdGFcbiAgICBzdGF0ZTogZGF0YVxuICAgIGFwcDogVnVlQXBwXG5cbiAgICBjb25zdHJ1Y3RvcihhcHA6IFZ1ZUFwcCkge1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IHJlYWN0aXZlKHtcbiAgICAgICAgICAgIGNsb3NlOiAwXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuYXBwID0gYXBwXG4gICAgICAgIHRoaXMuc3RhdGUgPSByZWFkb25seSh0aGlzLl9zdGF0ZSlcbiAgICB9ICAgIFxuXG4gICAgc2V0Q2xvc2UoYykge1xuICAgICAgICBpZiAodGhpcy5fc3RhdGUuY2xvc2UgIT0gYykge1xuICAgICAgICAgICAgdGhpcy5fc3RhdGUuY2xvc2UgPSBjO1xuICAgICAgICB9XG4gICAgfSBcbn1cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuaW1wb3J0IHtkYXRhIGFzIFNoYXJlZERhdGEsIFN0b3JlfSBmcm9tIFwiLi9zaGFyZWRcIlxuaW1wb3J0IHsgV2ViTGF5ZXIzRENvbnRlbnQgfSBmcm9tIFwiZXRoZXJlYWxcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgc2hhcmVkOiBTdG9yZVxuICAgIFxuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgc3VwZXIoQXBwLCA1MDAsIDUwMClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnNoYXJlZCA9IG5ldyBTdG9yZSh0aGlzKVxuICAgICAgICB0aGlzLnZ1ZUFwcC5wcm92aWRlKCdzaGFyZWQnLCB0aGlzLnNoYXJlZClcbiAgICB9XG5cbiAgICBkb2NzOiBXZWJMYXllcjNEQ29udGVudCB8IHVuZGVmaW5lZFxuICAgIGJvdW5kc1NpemU6IFRIUkVFLlZlY3RvcjMgID0gbmV3IFRIUkVFLlZlY3RvcjMoKVxuICAgIGJvdW5kczogVEhSRUUuQm94MyA9IG5ldyBUSFJFRS5Cb3gzKClcblxuICAgIG1vdW50ICgpIHtcbiAgICAgICAgc3VwZXIubW91bnQodHJ1ZSkgLy8gdXNlIGV0aGVyZWFsXG5cbiAgICAgICAgdGhpcy5kb2NzID0gdGhpcy53ZWJMYXllcjNEIS5xdWVyeVNlbGVjdG9yKCcjZWRpdCcpXG4gICAgICAgIGlmICghdGhpcy5kb2NzKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJWdWUgYXBwIG5lZWRzICNlZGl0IGRpdlwiKVxuICAgICAgICAgICAgcmV0dXJuIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgYWRhcHRlciA9IEh1YnNBcHAuc3lzdGVtLmdldEFkYXB0ZXIodGhpcy5kb2NzKSBcbiAgICAgICAgYWRhcHRlci5vblVwZGF0ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYm91bmRzID0gYWRhcHRlci5tZXRyaWNzLnRhcmdldC52aXN1YWxCb3VuZHNcbiAgICAgICAgICAgIHRoaXMuYm91bmRzLmdldFNpemUodGhpcy5ib3VuZHNTaXplKVxuICAgICAgICAgICAgdmFyIHNpemUgPSBNYXRoLnNxcnQodGhpcy5ib3VuZHNTaXplLnggKiB0aGlzLmJvdW5kc1NpemUueCArIHRoaXMuYm91bmRzU2l6ZS55ICogdGhpcy5ib3VuZHNTaXplLnkpXG4gICAgICAgICAgICBpZiAodGhpcy5zaGFyZWQuc3RhdGUuY2xvc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNoYXJlZC5zZXRDbG9zZSAoc2l6ZSA8IDIxMClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGFyZWQuc2V0Q2xvc2UgKHNpemUgPCAxOTApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRvY3MhLnVwZGF0ZSgpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgpXG4gICAgYXBwLm1vdW50KCkgXG5cbiAgICBcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvMzhkNmQ3YTFlMDJmYzJmOS5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGgyPnt7IG1zZyB9fTwvaDI+XG5cbiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBkZWZpbmVQcm9wcywgcmVhY3RpdmUgfSBmcm9tICd2dWUnXG5cbmRlZmluZVByb3BzKHtcbiAgbXNnOiBTdHJpbmdcbn0pXG5cbmNvbnN0IHN0YXRlID0gcmVhY3RpdmUoeyBjb3VudDogMCB9KVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5hIHtcbiAgY29sb3I6ICM0MmI5ODM7XG59XG5cbioge1xuICAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xuICAgIGxpbmUtaGVpZ2h0IDogbm9ybWFsO1xufVxuXG5wIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBtYXJnaW4tYmxvY2stc3RhcnQ6IDFlbTtcbiAgICBtYXJnaW4tYmxvY2stZW5kOiAxZW07XG4gICAgbWFyZ2luLWlubGluZS1zdGFydDogMHB4O1xuICAgIG1hcmdpbi1pbmxpbmUtZW5kOiAwcHg7XG59XG5cbmgxIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBmb250LXNpemU6IDJlbTtcbiAgICBtYXJnaW4tYmxvY2stc3RhcnQ6IDAuNjdlbTtcbiAgICBtYXJnaW4tYmxvY2stZW5kOiAwLjY3ZW07XG4gICAgbWFyZ2luLWlubGluZS1zdGFydDogMHB4O1xuICAgIG1hcmdpbi1pbmxpbmUtZW5kOiAwcHg7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbmJ1dHRvbiB7XG4gICAgLyogd2lkdGg6IDEwMHB4O1xuICAgIGhlaWdodDogMzBweDsgKi9cbiAgICBhcHBlYXJhbmNlOiBhdXRvO1xuICAgIC13ZWJraXQtd3JpdGluZy1tb2RlOiBob3Jpem9udGFsLXRiICFpbXBvcnRhbnQ7XG4gICAgdGV4dC1yZW5kZXJpbmc6IGF1dG87XG4gICAgY29sb3I6IC1pbnRlcm5hbC1saWdodC1kYXJrKGJsYWNrLCB3aGl0ZSk7XG4gICAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcbiAgICB3b3JkLXNwYWNpbmc6IG5vcm1hbDtcbiAgICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgICB0ZXh0LWluZGVudDogMHB4O1xuICAgIHRleHQtc2hhZG93OiBub25lO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgIGJhY2tncm91bmQtY29sb3I6IC1pbnRlcm5hbC1saWdodC1kYXJrKHJnYigyMzksIDIzOSwgMjM5KSwgcmdiKDU5LCA1OSwgNTkpKTtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIG1hcmdpbjogMGVtO1xuICAgIGZvbnQ6IDQwMCAxMy4zMzMzcHggQXJpYWw7XG4gICAgcGFkZGluZzogMXB4IDZweDtcbiAgICBib3JkZXItd2lkdGg6IDJweDtcbiAgICBib3JkZXItc3R5bGU6IG91dHNldDtcbiAgICBib3JkZXItY29sb3I6IC1pbnRlcm5hbC1saWdodC1kYXJrKHJnYigxMTgsIDExOCwgMTE4KSwgcmdiKDEzMywgMTMzLCAxMzMpKTtcbiAgICBib3JkZXItaW1hZ2U6IGluaXRpYWw7XG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xufVxuXG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8VGl0bGUgbXNnPVwiUmVhbGl0eSBNZWRpYVwiIC8+XG5cdDxpbWcgc3JjPVwiLi4vLi4vYXNzZXRzL2ltYWdlcy9yb3R1bmRhLW1hcC5wbmdcIiB3aWR0aD1cIjI1MFwiID5cblx0PGRpdiBjbGFzcz1cImRpc3BsYXl0ZXh0XCI+QVIgYWxsb3dzIHVzIHRvIGV4dGVuZCBvdXIgcGh5c2ljYWwgcmVhbGl0eTsgVlIgY3JlYXRlcyBmb3IgdXMgYSBkaWZmZXJlbnQgcmVhbGl0eS48L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodClcbiAgICAgICAgLy8gdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC83YWY3Yjk1YjM1ZmQ3NjE2LmpwZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxUaXRsZSBtc2c9XCJBUiAmIFZSIGFzIHJlYWxpdHkgbWVkaWFcIiAvPlxuXHQ8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWFnZXMvbGFjaW90YXQtVlIuanBnXCIgd2lkdGg9XCIyNTBcIiA+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj4gRWFjaCByZWFsaXR5IG1lZGl1bSBtZWRpYXRlcyBhbmQgcmVtZWRpYXRlcy4gSXQgb2ZmZXJzIGEgbmV3IHJlcHJlc2VudGF0aW9uIG9mIHRoZSB3b3JsZCB0aGF0IHdlIGltcGxpY2l0bHkgY29tcGFyZSBcblx0XHR0byBvdXIgZXhwZXJpZW5jZSBvZiB0aGUgd29ybGQgaW4gaXRzZWxmLCBidXQgYWxzbyB0aHJvdWdoIG90aGVyIG1lZGlhLjwvZGl2PiBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodClcbiAgICAgICAgLy8gdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC83YWIzZDg2YWZkNDhkYmZiLmpwZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICAgIDxUaXRsZSBtc2c9XCJUaGUgTGFDaW90YXQgRWZmZWN0XCIgLz5cbiAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG5cdCAgPGltZyBzcmM9XCIuLi8uLi9hc3NldHMvaW1hZ2VzL2xhY2lvdGF0LmpwZ1wiIHdpZHRoPVwiMjUwXCI+XG5cdCAgPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPkZpbG0gYmVjYW1lIG9uZSBvZiB0aGUgbW9zdCBpbXBvcnRhbnQgcmVhbGl0eSBcbiAgICAgIG1lZGlhIG9mIHRoZSB0d2VudGlldGggY2VudHVyeSwgYW5kIGluIHNvbWUgd2F5cywgaXQgaXMgYSBmb3JlcnVubmVyIFxuICAgICAgb2YgdmlydHVhbCByZWFsaXR5LjwvZGl2PiAgXG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPiAgXG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLHdpZHRoLGhlaWdodClcbiAgICAgICAgLy8gdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC85MWZkZmE4MTFlNzUyZGM4LmpwZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuXHQ8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgPFRpdGxlIG1zZz1cIjMtRCBHcmFwaGljcyAmIFRyYWNraW5nXCIgLz5cblx0PGltZyBzcmM9XCIuLi8uLi9hc3NldHMvaW1hZ2VzL3VuY2FubnkuanBnXCIgd2lkdGg9XCIyMDBcIj5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPjMtRCBjb21wdXRlciBncmFwaGljcyBoZWxwIHRvIGNvbnN0cnVjdCB0aGUgdmlzdWFsIFxuXHRcdHJlYWxpdGllcyBvZiBBUiBhbmQgVlIsIHRoYXQgaXMgcGhvdG9yZWFsaXNtLiBUaGUgdW5jYW5ueSB2YWxsZXkuPC9kaXY+XG5cdDwvZGl2PlxuXHQ8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodClcbiAgICAgICAgLy8vLyB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1KVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0L2RjMDVjMDQ1NDZhNjllNjQucG5nXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gICAgPFRpdGxlIG1zZz1cIlByZXNlbmNlXCIgLz5cblx0ICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+IFxuXHQgIDxpbWcgc3JjPVwiLi4vLi4vYXNzZXRzL2ltYWdlcy9wYXJ0aGVub24ucG5nXCIgd2lkdGg9XCIyNTBcIj5cblx0ICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+UHJlc2VuY2UgaW4gVlIgaXMgdXN1YWxseSBjb25jZWl2ZWQgb2YgYXMgZm9yZ2V0dGluZyB0aGF0IHRoZSBtZWRpdW0gaXMgdGhlcmUuIFRoZSBpZGVhIGlzIHRoYXQgaWYgdGhlIHVzZXIgY2FuIGJlIGVudGljZWQgaW50byBiZWhhdmluZyBhcyBpZiBzaGUgd2VyZSBub3QgYXdhcmUgb2YgYWxsIHRoZSBjb21wbGV4IHRlY2hub2xvZ3ksIHRoZW4gc2hlIGZlZWxzIHByZXNlbmNlLjwvZGl2PiAgXG4gIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcihBcHAsd2lkdGgsaGVpZ2h0KVxuICAgICAgICAvLyB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1KVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICAgIDxUaXRsZSBtc2c9XCJHZW5yZXNcIiAvPlxuICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj4gXG5cdCAgPGltZyBzcmM9XCIuLi8uLi9hc3NldHMvaW1hZ2VzL3BhcnRoZW5vbi5wbmdcIiB3aWR0aD1cIjI1MFwiPlxuXHQgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5SZWFsaXR5IG1lZGlhIGFwcGxpY2F0aW9ucyBvZnRlbiBmdW5jdGlvbiBhcyBhZGRpdGlvbnMgdG8gZXN0YWJsaXNoZWQgZ2VucmVzLiBNb3N0IGN1cnJlbnQgQVIgYW5kIFZSIGFwcGxpY2F0aW9ucyBiZWhhdmUgbGlrZSBhcHBsaWNhdGlvbnMgb3IgYXJ0aWZhY3RzIHRoYXQgd2Uga25vdyBmcm9tIGVhcmxpZXIgbWVkaWEuPC9kaXY+ICBcbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLHdpZHRoLGhlaWdodClcbiAgICAgICAgLy8gdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgICA8VGl0bGUgbXNnPVwiVGhlIEZ1dHVyZSBvZiBBUiAmIFZSXCIgLz5cbiAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG5cdCAgPGltZyBzcmM9XCIuLi8uLi9hc3NldHMvaW1hZ2VzL3BhcnRoZW5vbi5wbmdcIiB3aWR0aD1cIjI1MFwiPlxuXHQgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5WUiB3aWxsIGNvbnRpbnVlIHRvIGNvbnN0cnVjdCBzcGVjaWFsIHJlYWxpdGllcywgYXBhcnQgZnJvbSB0aGUgZXZlcnlkYXkuIFZSIHdvcmxkcyB3aWxsIGNvbnRpbnVlIHRvIGJlIG1ldGFwaG9yaWMgd29ybGRzLjwvZGl2PiAgXG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCx3aWR0aCxoZWlnaHQpXG4gICAgICAgIC8vIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gICAgPFRpdGxlIG1zZz1cIlByaXZhY3kgYW5kIFB1YmxpYyBTcGFjZVwiIC8+XG4gICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuXHQgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5QZXJ2YXNpdmUsIGFsd2F5cy1vbiBBUiBhcHBsaWNhdGlvbnMgaGF2ZSB0aGUgcG90ZW50aWFsIHRvIHByb3ZpZGUgY29tcGFuaWVzIG9yIGdvdmVybm1lbnQgYXV0aG9yaXRpZXMgXG4gICAgICBldmVuIG1vcmUgaW5mb3JtYXRpb24gYW5kIHdpdGggbW9yZSBwcmVjaXNpb24gdGhhbiBvdXIgY3VycmVudCBtb2JpbGUgYXBwbGljYXRpb25zIGRvLCBcbiAgICAgIGJvdGggYnkgYWdncmVnYXRpbmcgb3VyIGhhYml0cyBhcyBjb25zdW1lcnMgYW5kIGJ5IGlkZW50aWZ5aW5nIHVzIGFzIGluZGl2aWR1YWxzLjwvZGl2PiAgXG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCx3aWR0aCxoZWlnaHQpXG4gICAgICAgIC8vIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gICAgXG4gICAgPFRpdGxlIG1zZz1cIkFSICYgVlIgYXMgcmVhbGl0eSBtZWRpYVwiIC8+XG4gICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICAgICAgPGRpdiBjbGFzcz1cImZsdXNobGVmdFwiPlxuICAgICAgPGJyPlxuICAgICAgPGgzPiBTb21lIG9mIHRoZSBrZXkgZGlmZmVyZW5jZXMgYmV0d2VlbiDigJxjbGFzc2lj4oCdIFZSIGFuZCBBUjwvaDM+XG4gICAgICA8YnI+XG4gICAgICA8aDM+IEV4dGVuZGVkIHJlYWxpdHkgKFhSKSBhbmQgdGhlIGltbWVyc2l2ZSB3ZWIgPC9oMz5cbiAgICAgIDxicj5cbiAgICAgIDxoMz4gV2hlcmUgQVIgYW5kIFZSIGZpdCBvbiBNaWxncmFtIGFuZCBLaXNoaW5v4oCZcyB2aXJ0dWFsaXR5IGNvbnRpbnV1bTwvaDM+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCx3aWR0aCwgaGVpZ2h0KVxuICAgICAgICAvLyB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1KVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICAgIDxUaXRsZSBtc2c9XCJUaGUgSGlzdG9yeSBvZiBSZWFsaXR5IE1lZGlhXCIgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsdXNobGVmdFwiPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gU29tZSBvZiB0aGUga2V5IGRpZmZlcmVuY2VzIGJldHdlZW4g4oCcY2xhc3NpY+KAnSBWUiBhbmQgQVI8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gRXh0ZW5kZWQgcmVhbGl0eSAoWFIpIGFuZCB0aGUgaW1tZXJzaXZlIHdlYiA8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gV2hlcmUgQVIgYW5kIFZSIGZpdCBvbiBNaWxncmFtIGFuZCBLaXNoaW5v4oCZcyB2aXJ0dWFsaXR5IGNvbnRpbnV1bTwvaDM+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+IFxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLHdpZHRoLGhlaWdodClcbiAgICAgICAgLy8gdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgICA8VGl0bGUgbXNnPVwiMy1EICYgVHJhY2tpbmdcIiAvPlxuICAgICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmx1c2hsZWZ0XCI+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBTb21lIG9mIHRoZSBrZXkgZGlmZmVyZW5jZXMgYmV0d2VlbiDigJxjbGFzc2lj4oCdIFZSIGFuZCBBUjwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBFeHRlbmRlZCByZWFsaXR5IChYUikgYW5kIHRoZSBpbW1lcnNpdmUgd2ViIDwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBXaGVyZSBBUiBhbmQgVlIgZml0IG9uIE1pbGdyYW0gYW5kIEtpc2hpbm/igJlzIHZpcnR1YWxpdHkgY29udGludXVtPC9oMz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj4gICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcihBcHAsd2lkdGgsaGVpZ2h0KVxuICAgICAgICAvLyB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1KVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICAgIDxUaXRsZSBtc2c9XCJQcmVzZW5jZVwiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbHVzaGxlZnRcIj5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFNvbWUgb2YgdGhlIGtleSBkaWZmZXJlbmNlcyBiZXR3ZWVuIOKAnGNsYXNzaWPigJ0gVlIgYW5kIEFSPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IEV4dGVuZGVkIHJlYWxpdHkgKFhSKSBhbmQgdGhlIGltbWVyc2l2ZSB3ZWIgPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFdoZXJlIEFSIGFuZCBWUiBmaXQgb24gTWlsZ3JhbSBhbmQgS2lzaGlub+KAmXMgdmlydHVhbGl0eSBjb250aW51dW08L2gzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PiAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCx3aWR0aCxoZWlnaHQpXG4gICAgICAgIC8vIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gICAgPFRpdGxlIG1zZz1cIkdlbnJlc1wiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbHVzaGxlZnRcIj5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFNvbWUgb2YgdGhlIGtleSBkaWZmZXJlbmNlcyBiZXR3ZWVuIOKAnGNsYXNzaWPigJ0gVlIgYW5kIEFSPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IEV4dGVuZGVkIHJlYWxpdHkgKFhSKSBhbmQgdGhlIGltbWVyc2l2ZSB3ZWIgPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFdoZXJlIEFSIGFuZCBWUiBmaXQgb24gTWlsZ3JhbSBhbmQgS2lzaGlub+KAmXMgdmlydHVhbGl0eSBjb250aW51dW08L2gzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PiAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCx3aWR0aCxoZWlnaHQpXG4gICAgICAgIC8vIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gICAgPFRpdGxlIG1zZz1cIkZ1dHVyZVwiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbHVzaGxlZnRcIj5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFNvbWUgb2YgdGhlIGtleSBkaWZmZXJlbmNlcyBiZXR3ZWVuIOKAnGNsYXNzaWPigJ0gVlIgYW5kIEFSPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IEV4dGVuZGVkIHJlYWxpdHkgKFhSKSBhbmQgdGhlIGltbWVyc2l2ZSB3ZWIgPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFdoZXJlIEFSIGFuZCBWUiBmaXQgb24gTWlsZ3JhbSBhbmQgS2lzaGlub+KAmXMgdmlydHVhbGl0eSBjb250aW51dW08L2gzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PiAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCx3aWR0aCxoZWlnaHQpXG4gICAgICAgIC8vIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gICAgPFRpdGxlIG1zZz1cIlByaXZhY3lcIiAvPlxuICAgICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmx1c2hsZWZ0XCI+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBTb21lIG9mIHRoZSBrZXkgZGlmZmVyZW5jZXMgYmV0d2VlbiDigJxjbGFzc2lj4oCdIFZSIGFuZCBBUjwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBFeHRlbmRlZCByZWFsaXR5IChYUikgYW5kIHRoZSBpbW1lcnNpdmUgd2ViIDwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBXaGVyZSBBUiBhbmQgVlIgZml0IG9uIE1pbGdyYW0gYW5kIEtpc2hpbm/igJlzIHZpcnR1YWxpdHkgY29udGludXVtPC9oMz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj4gICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcihBcHAsd2lkdGgsaGVpZ2h0KVxuICAgICAgICAvLyB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1KVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0Il0sIm5hbWVzIjpbIkh1YnNBcHAiLCJldGhlcmVhbC5jcmVhdGVMYXlvdXRTeXN0ZW0iLCJXZWJMYXllcjNEIiwiU3RvcmUiLCJIdWJzQXBwUHJvdG8iLCJBcHAiLCJpbml0Il0sIm1hcHBpbmdzIjoiOztBQUFBLG1CQUFlOzs7Ozs7Ozs7QUNXZjs7Ozs7OztBQUZjO0FBS1o7QUFDRjtBQUNBLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVGpCOzs7Ozs7Ozs7Ozs7TUNMTyxNQUFNO0lBQ3ZCLGFB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
