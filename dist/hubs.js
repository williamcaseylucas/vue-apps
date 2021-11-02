import { p as pushScopeId, a as popScopeId, i as inject, c as createElementBlock, b as createBaseVNode, t as toDisplayString, u as unref, F as Fragment, o as openBlock, d as createVNode, e as createCommentVNode, f as createApp, j as jh, k as kh, r as reactive, g as readonly, h as createTextVNode, n as normalizeClass, l as createStaticVNode } from './vendor-426aefc4.js';

var _imports_0$h = "https://resources.realitymedia.digital/vue-apps/dist/1a6ace377133f14a.png";

pushScopeId("data-v-0a280960");
const _hoisted_1$V = {
  "xr-layer": "",
  class: "fade"
};
const _hoisted_2$T = /*#__PURE__*/createBaseVNode("p", null, " Here's some more text just to make things not blank. ", -1 /* HOISTED */);
popScopeId();


var script$X = {
  props: {
  msg: String
},
  setup(__props) {



const shared = inject('shared');

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("h1", _hoisted_1$V, toDisplayString(__props.msg), 1 /* TEXT */),
    _hoisted_2$T,
    createBaseVNode("button", {
      "xr-layer": "",
      onClick: _cache[0] || (_cache[0] = (...args) => (unref(shared).increment && unref(shared).increment(...args)))
    }, "count is: " + toDisplayString(unref(shared).state.count), 1 /* TEXT */)
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$X.__scopeId = "data-v-0a280960";

const _hoisted_1$U = { id: "top" };
const _hoisted_2$S = /*#__PURE__*/createBaseVNode("img", {
  alt: "Vue logo",
  src: _imports_0$h
}, null, -1 /* HOISTED */);


var script$W = {
  setup(__props) {

let params = inject("params");
var mesg = params && params.mesg ? params.mesg : "Networked Vue Component with Shared Button Count";

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$U, [
    _hoisted_2$S,
    createVNode(script$X, { msg: unref(mesg) }, null, 8 /* PROPS */, ["msg"]),
    createCommentVNode(" <SomeText msg=\"Networked Vue Component with Shared Button Count\" /> ")
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
    HubsApp$U.initializeEthereal();
}
//THREE.Object3D.DefaultMatrixAutoUpdate = true;
function systemTick(time, deltaTime) {
    HubsApp$U.systemTick(time, deltaTime);
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
class HubsApp$U extends VueApp {
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
        scene.renderer.getSize(HubsApp$U.system.viewResolution);
        this.system.viewFrustum.setFromPerspectiveProjectionMatrix(this.etherealCamera.projectionMatrix);
        // tick method for ethereal
        this.system.update(deltaTime, time);
    }
    constructor(App, width, height, params = {}, createOptions = {}) {
        if (params.width && params.height && params.width > 0 && params.height > 0) {
            // reset both
            width = params.width;
            height = params.height;
        }
        else if ((params.width && params.width > 0) || (params.height && params.height > 0)) {
            // set one and scale the other
            if (params.width && params.width > 0) {
                height = (params.width / width) * height;
                width = params.width;
            }
            if (params.height && params.height > 0) {
                width = (params.height / height) * height;
                height = params.height;
            }
        }
        super(App, width, height, createOptions);
        this.isEthereal = false;
        this.vueApp.provide('params', params);
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
                    const adapter = HubsApp$U.system.getAdapter(layer);
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

class HubsApp$T extends HubsApp$U {
    shared;
    constructor(params = {}) {
        super(script$W, 400, 475, params);
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
var init$T = function (params = {}) {
    let app = new HubsApp$T(params);
    app.mount();
    return app;
};

pushScopeId("data-v-b474cdac");
const _hoisted_1$T = {
  "xr-layer": "",
  class: "fade"
};
const _hoisted_2$R = /*#__PURE__*/createBaseVNode("p", null, [
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


var script$V = {
  props: {
  msg: String
},
  setup(__props) {



const state = reactive({ count: 0 });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("h1", _hoisted_1$T, toDisplayString(__props.msg), 1 /* TEXT */),
    _hoisted_2$R,
    createBaseVNode("button", {
      "xr-layer": "",
      onClick: _cache[0] || (_cache[0] = $event => (unref(state).count++))
    }, "count is: " + toDisplayString(unref(state).count), 1 /* TEXT */)
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$V.__scopeId = "data-v-b474cdac";

pushScopeId("data-v-6a11ec38");
const _hoisted_1$S = { id: "top" };
const _hoisted_2$Q = /*#__PURE__*/createBaseVNode("img", {
  alt: "Vue logo",
  src: _imports_0$h
}, null, -1 /* HOISTED */);
const _hoisted_3$u = /*#__PURE__*/createTextVNode(" Edit code in ");
const _hoisted_4$l = /*#__PURE__*/createBaseVNode("code", null, "src/apps", -1 /* HOISTED */);
const _hoisted_5$g = /*#__PURE__*/createTextVNode(" to test hot module replacement while running project as \"npm run dev\". ");
const _hoisted_6$6 = [
  _hoisted_3$u,
  _hoisted_4$l,
  _hoisted_5$g
];
popScopeId();


var script$U = {
  setup(__props) {

const shared = inject('shared');

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$S, [
    _hoisted_2$Q,
    createVNode(script$V, { msg: "Vue Component with Local Button Count" }),
    createBaseVNode("p", {
      id: "edit",
      class: normalizeClass({ upclose: unref(shared).state.close }),
      "xr-layer": ""
    }, _hoisted_6$6, 2 /* CLASS */)
  ]))
}
}

};

script$U.__scopeId = "data-v-6a11ec38";

class Store {
    _state;
    state;
    app;
    constructor(app) {
        this._state = reactive({
            close: false
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

class HubsApp$S extends HubsApp$U {
    shared;
    constructor() {
        super(script$U, 500, 500);
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
        let adapter = HubsApp$S.system.getAdapter(this.docs);
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
var init$S = function () {
    let app = new HubsApp$S();
    app.mount();
    return app;
};

var script$T = {
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

const _hoisted_1$R = { id: "room" };


var script$S = {
  setup(__props) {

let params = inject("params");
var mesg = params && params.message ? params.message : "PORTAL TITLE";

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$R, [
    createVNode(script$T, { msg: unref(mesg) }, null, 8 /* PROPS */, ["msg"])
  ]))
}
}

};

class HubsApp$R extends HubsApp$U {
    constructor(width, height, params = {}) {
        super(script$S, width, height, params);
    }
}
var init$R = function (params = {}) {
    let app = new HubsApp$R(300, 100, params);
    app.mount();
    return app;
};

var script$R = {
  props: {
  msg: String
},
  setup(__props) {



reactive({ count: 0 });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("h4", null, toDisplayString(__props.msg), 1 /* TEXT */))
}
}

};

const _hoisted_1$Q = { id: "room" };


var script$Q = {
  setup(__props) {

let params = inject("params");
var mesg = params && params.message ? params.message : "PORTAL SUBTITLE";

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$Q, [
    createVNode(script$R, { msg: unref(mesg) }, null, 8 /* PROPS */, ["msg"])
  ]))
}
}

};

class HubsApp$Q extends HubsApp$U {
    constructor(width, height, params = {}) {
        super(script$Q, width, height, params);
    }
}
var init$Q = function (params = {}) {
    let app = new HubsApp$Q(300, 100, params);
    app.mount();
    return app;
};

var _imports_0$g = "https://resources.realitymedia.digital/vue-apps/dist/38d6d7a1e02fc2f9.png";

const _hoisted_1$P = { id: "room" };
const _hoisted_2$P = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$g,
  width: "250"
}, null, -1 /* HOISTED */);
const _hoisted_3$t = /*#__PURE__*/createBaseVNode("div", { class: "displaytext" }, "AR allows us to extend our physical reality; VR creates for us a different reality.", -1 /* HOISTED */);

var script$P = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$P, [
    createVNode(script$T, { msg: "Reality Media" }),
    _hoisted_2$P,
    _hoisted_3$t
  ]))
}
}

};

class HubsApp$P extends HubsApp$U {
    constructor (width, height) {
        super(script$P, width, height);
        this.isInteractive = true;
    }
}

var init$P = function () {
    let app = new HubsApp$P(300, 475);
    app.mount();
    return app
};

var _imports_0$f = "https://resources.realitymedia.digital/vue-apps/dist/7af7b95b35fd7616.jpg";

const _hoisted_1$O = { id: "room" };
const _hoisted_2$O = { class: "spacer" };
const _hoisted_3$s = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$f,
  width: "250"
}, null, -1 /* HOISTED */);
const _hoisted_4$k = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, " Each reality medium mediates and remediates. It offers a new representation of the world that we implicitly compare to our experience of the world in itself, but also through other media.", -1 /* HOISTED */);
const _hoisted_5$f = /*#__PURE__*/createBaseVNode("p", null, [
  /*#__PURE__*/createBaseVNode("a", {
    href: "https://realitymedia.digital",
    target: "_blank"
  }, " Start at the reality media site. "),
  /*#__PURE__*/createTextVNode(" | ")
], -1 /* HOISTED */);

var script$O = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$O, [
    createBaseVNode("div", _hoisted_2$O, [
      createVNode(script$T, { msg: "AR & VR as reality media" }),
      _hoisted_3$s,
      _hoisted_4$k
    ]),
    _hoisted_5$f
  ]))
}
}

};

class HubsApp$O extends HubsApp$U {
    constructor (width, height) {
        super(script$O, width, height);
        this.isInteractive = true;
    }
}

var init$O = function () {
    let app = new HubsApp$O(300, 475);
    app.mount();
    return app
};

var _imports_0$e = "https://resources.realitymedia.digital/vue-apps/dist/7ab3d86afd48dbfb.jpg";

const _hoisted_1$N = { id: "room" };
const _hoisted_2$N = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$e,
    width: "250"
  }),
  /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Film became one of the most important reality media of the twentieth century, and in some ways, it is a forerunner of virtual reality.")
], -1 /* HOISTED */);

var script$N = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$N, [
    createVNode(script$T, { msg: "The LaCiotat Effect" }),
    _hoisted_2$N
  ]))
}
}

};

class HubsApp$N extends HubsApp$U {
    constructor (width, height) {
        super(script$N,width,height);
        this.isInteractive = true;
    }
}

var init$N = function () {
    let app = new HubsApp$N(300, 475);
    app.mount();
    return app
};

var _imports_0$d = "https://resources.realitymedia.digital/vue-apps/dist/91fdfa811e752dc8.jpg";

const _hoisted_1$M = { id: "room" };
const _hoisted_2$M = { class: "spacer" };
const _hoisted_3$r = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$d,
  width: "200"
}, null, -1 /* HOISTED */);
const _hoisted_4$j = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "3-D computer graphics help to construct the visual realities of AR and VR, that is photorealism. The uncanny valley.", -1 /* HOISTED */);

var script$M = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$M, [
    createBaseVNode("div", _hoisted_2$M, [
      createVNode(script$T, { msg: "3-D Graphics & Tracking" }),
      _hoisted_3$r,
      _hoisted_4$j
    ])
  ]))
}
}

};

class HubsApp$M extends HubsApp$U {
    constructor (width, height) {
        super(script$M, width, height);
        this.isInteractive = true;
    }
}

var init$M = function () {
    let app = new HubsApp$M(300, 475);
    app.mount();
    return app
};

var _imports_0$c = "https://resources.realitymedia.digital/vue-apps/dist/dc05c04546a69e64.png";

const _hoisted_1$L = { id: "room" };
const _hoisted_2$L = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$c,
    width: "250"
  }),
  /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Presence in VR is usually conceived of as forgetting that the medium is there. The idea is that if the user can be enticed into behaving as if she were not aware of all the complex technology, then she feels presence.")
], -1 /* HOISTED */);

var script$L = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$L, [
    createVNode(script$T, { msg: "Presence" }),
    _hoisted_2$L
  ]))
}
}

};

class HubsApp$L extends HubsApp$U {
    constructor (width, height) {
        super(script$L,width,height);
        this.isInteractive = true;
    }
}

var init$L = function () {
    let app = new HubsApp$L(300, 475);
    app.mount();
    return app
};

const _hoisted_1$K = { id: "room" };
const _hoisted_2$K = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$c,
    width: "250"
  }),
  /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Reality media applications often function as additions to established genres. Most current AR and VR applications behave like applications or artifacts that we know from earlier media.")
], -1 /* HOISTED */);

var script$K = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$K, [
    createVNode(script$T, { msg: "Genres" }),
    _hoisted_2$K
  ]))
}
}

};

class HubsApp$K extends HubsApp$U {
    constructor (width, height) {
        super(script$K,width,height);
        this.isInteractive = true;
    }
}

var init$K = function () {
    let app = new HubsApp$K(300, 475);
    app.mount();
    return app
};

const _hoisted_1$J = { id: "room" };
const _hoisted_2$J = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$c,
    width: "250"
  }),
  /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "VR will continue to construct special realities, apart from the everyday. VR worlds will continue to be metaphoric worlds.")
], -1 /* HOISTED */);

var script$J = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$J, [
    createVNode(script$T, { msg: "The Future of AR & VR" }),
    _hoisted_2$J
  ]))
}
}

};

class HubsApp$J extends HubsApp$U {
    constructor (width, height) {
        super(script$J,width,height);
        this.isInteractive = true;
    }
}

var init$J = function () {
    let app = new HubsApp$J(300, 475);
    app.mount();
    return app
};

const _hoisted_1$I = { id: "room" };
const _hoisted_2$I = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Pervasive, always-on AR applications have the potential to provide companies or government authorities even more information and with more precision than our current mobile applications do, both by aggregating our habits as consumers and by identifying us as individuals.")
], -1 /* HOISTED */);

var script$I = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$I, [
    createVNode(script$T, { msg: "Privacy and Public Space" }),
    _hoisted_2$I
  ]))
}
}

};

class HubsApp$I extends HubsApp$U {
    constructor (width, height) {
        super(script$I,width,height);
        this.isInteractive = true;
    }
}

var init$I = function () {
    let app = new HubsApp$I(300, 475);
    app.mount();
    return app
};

const _hoisted_1$H = { id: "room" };
const _hoisted_2$H = /*#__PURE__*/createBaseVNode("div", { class: "postertitle" }, "AR & VR as reality media", -1 /* HOISTED */);
const _hoisted_3$q = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);
const _hoisted_4$i = [
  _hoisted_2$H,
  _hoisted_3$q
];

var script$H = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$H, _hoisted_4$i))
}
}

};

class HubsApp$H extends HubsApp$U {
    constructor (width, height) {
        super(script$H,width, height);
        this.isInteractive = true;
    }
}

var init$H = function () {
    let app = new HubsApp$H(300, 475);
    app.mount();
    return app
};

const _hoisted_1$G = { id: "room" };
const _hoisted_2$G = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$G = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$G, [
    createVNode(script$T, { msg: "The History of Reality Media" }),
    _hoisted_2$G
  ]))
}
}

};

class HubsApp$G extends HubsApp$U {
    constructor (width, height) {
        super(script$G,width,height);
        this.isInteractive = true;
    }
}

var init$G = function () {
    let app = new HubsApp$G(300, 475);
    app.mount();
    return app
};

const _hoisted_1$F = { id: "room" };
const _hoisted_2$F = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$F = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$F, [
    createVNode(script$T, { msg: "3-D & Tracking" }),
    _hoisted_2$F
  ]))
}
}

};

class HubsApp$F extends HubsApp$U {
    constructor (width, height) {
        super(script$F,width,height);
        this.isInteractive = true;
    }
}

var init$F = function () {
    let app = new HubsApp$F(300, 475);
    app.mount();
    return app
};

const _hoisted_1$E = { id: "room" };
const _hoisted_2$E = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$E = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$E, [
    createVNode(script$T, { msg: "Presence" }),
    _hoisted_2$E
  ]))
}
}

};

class HubsApp$E extends HubsApp$U {
    constructor (width, height) {
        super(script$E,width,height);
        this.isInteractive = true;
    }
}

var init$E = function () {
    let app = new HubsApp$E(300, 475);
    app.mount();
    return app
};

const _hoisted_1$D = { id: "room" };
const _hoisted_2$D = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$D = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$D, [
    createVNode(script$T, { msg: "Genres" }),
    _hoisted_2$D
  ]))
}
}

};

class HubsApp$D extends HubsApp$U {
    constructor (width, height) {
        super(script$D,width,height);
        this.isInteractive = true;
    }
}

var init$D = function () {
    let app = new HubsApp$D(300, 475);
    app.mount();
    return app
};

const _hoisted_1$C = { id: "room" };
const _hoisted_2$C = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$C = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$C, [
    createVNode(script$T, { msg: "Future" }),
    _hoisted_2$C
  ]))
}
}

};

class HubsApp$C extends HubsApp$U {
    constructor (width, height) {
        super(script$C,width,height);
        this.isInteractive = true;
    }
}

var init$C = function () {
    let app = new HubsApp$C(300, 475);
    app.mount();
    return app
};

const _hoisted_1$B = { id: "room" };
const _hoisted_2$B = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$B = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$B, [
    createVNode(script$T, { msg: "Privacy" }),
    _hoisted_2$B
  ]))
}
}

};

class HubsApp$B extends HubsApp$U {
    constructor (width, height) {
        super(script$B,width,height);
        this.isInteractive = true;
    }
}

var init$B = function () {
    let app = new HubsApp$B(300, 475);
    app.mount();
    return app
};

var _imports_0$b = "https://resources.realitymedia.digital/vue-apps/dist/190994370aebe395.png";

const _hoisted_1$A = { id: "room" };
const _hoisted_2$A = { class: "spacer" };
const _hoisted_3$p = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$b,
  width: "400"
}, null, -1 /* HOISTED */);
const _hoisted_4$h = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$e = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_6$5 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createTextVNode(" First person shooter games such as "),
  /*#__PURE__*/createBaseVNode("a", {
    href: "https://www.half-life.com/en/alyx/",
    target: "_blank"
  }, "HalfLife: Alyx "),
  /*#__PURE__*/createTextVNode(" have long used 3-D graphics to create an immersive experience for millions of players. And for decades, players on computers and game consoles have yearned for true VR so that they could fall through the screen into the worlds on the other side.")
], -1 /* HOISTED */);

var script$A = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$A, [
      createBaseVNode("div", _hoisted_2$A, [
        _hoisted_3$p,
        _hoisted_4$h,
        _hoisted_5$e,
        createVNode(script$T, { msg: "HalfLife: Alyx" }),
        _hoisted_6$5
      ])
    ])
  ]))
}
}

};

class HubsApp$A extends HubsApp$U {
    constructor (width, height) {
        super(script$A, width, height);
        this.isInteractive = true;
    }
}

var init$A = function () {
    let app = new HubsApp$A(600, 475);
    app.mount();
    return app
};

const _hoisted_1$z = { id: "room" };
const _hoisted_2$z = { class: "spacer" };
const _hoisted_3$o = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Pokemon Go (2016) is perhaps still the best-known AR game. The Pokemon franchise was already decades old, and this was certainly part of the answer for the AR game’s surprising impact. It was the first Pokemon game on a mobile phone and the first free Pokemon game on any platform. ", -1 /* HOISTED */);

var script$z = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$z, [
    createBaseVNode("div", _hoisted_2$z, [
      createVNode(script$T, { msg: "Pokemon Go" }),
      _hoisted_3$o
    ])
  ]))
}
}

};

class HubsApp$z extends HubsApp$U {
    constructor (width, height) {
        super(script$z, width, height);
        this.isInteractive = true;
    }
}

var init$z = function () {
    let app = new HubsApp$z(600, 475);
    app.mount();
    return app
};

const _hoisted_1$y = { id: "room" };
const _hoisted_2$y = { class: "spacer" };
const _hoisted_3$n = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Beat Saber is a VR rhythm game with a little Star Wars thrown in. The player uses lightsabers to keep the beat. ", -1 /* HOISTED */);

var script$y = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$y, [
    createBaseVNode("div", _hoisted_2$y, [
      createVNode(script$T, { msg: "Beat Saber" }),
      _hoisted_3$n
    ])
  ]))
}
}

};

class HubsApp$y extends HubsApp$U {
    constructor (width, height) {
        super(script$y, width, height);
        this.isInteractive = true;
    }
}

var init$y = function () {
    let app = new HubsApp$y(600, 475);
    app.mount();
    return app
};

const _hoisted_1$x = { id: "room" };
const _hoisted_2$x = { class: "spacer" };
const _hoisted_3$m = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "In this AR version of the transmedia franchise GPS is used to determine your location in the world. Your location and the zombies appear in an enhanced Google Maps map on the phone screen. ", -1 /* HOISTED */);

var script$x = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$x, [
    createBaseVNode("div", _hoisted_2$x, [
      createVNode(script$T, { msg: "Walking Dead: Our World" }),
      _hoisted_3$m
    ])
  ]))
}
}

};

class HubsApp$x extends HubsApp$U {
    constructor (width, height) {
        super(script$x, width, height);
        this.isInteractive = true;
    }
}

var init$x = function () {
    let app = new HubsApp$x(600, 475);
    app.mount();
    return app
};

const _hoisted_1$w = { id: "room" };
const _hoisted_2$w = { class: "spacer" };
const _hoisted_3$l = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Like video games and 360-degree video, VR art emphasizes immersion as the feature that makes the experience unique, as in a VR work by Christian Lemmerz entitled La Apparizione (2017). ", -1 /* HOISTED */);

var script$w = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$w, [
    createBaseVNode("div", _hoisted_2$w, [
      createVNode(script$T, { msg: "La Apparizione" }),
      _hoisted_3$l
    ])
  ]))
}
}

};

class HubsApp$w extends HubsApp$U {
    constructor (width, height) {
        super(script$w, width, height);
        this.isInteractive = true;
    }
}

var init$w = function () {
    let app = new HubsApp$w(600, 475);
    app.mount();
    return app
};

const _hoisted_1$v = { id: "room" };
const _hoisted_2$v = { class: "spacer" };
const _hoisted_3$k = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Minecraft VR is a fully immersive, headset version of the sandbox game that already runs on computers, game consoles, and mobile devices. It is called a \"sandbox game\" because it provides an independent environment in which players can make their own structures and objects out of virtual, LEGO-like blocks. ", -1 /* HOISTED */);

var script$v = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$v, [
    createBaseVNode("div", _hoisted_2$v, [
      createVNode(script$T, { msg: "Minecraft VR" }),
      _hoisted_3$k
    ])
  ]))
}
}

};

class HubsApp$v extends HubsApp$U {
    constructor (width, height) {
        super(script$v, width, height);
        this.isInteractive = true;
    }
}

var init$v = function () {
    let app = new HubsApp$v(600, 475);
    app.mount();
    return app
};

const _hoisted_1$u = { id: "room" };
const _hoisted_2$u = /*#__PURE__*/createBaseVNode("div", { class: "spacer headline" }, " AR & VR GAMES ", -1 /* HOISTED */);
const _hoisted_3$j = [
  _hoisted_2$u
];

var script$u = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$u, _hoisted_3$j))
}
}

};

class HubsApp$u extends HubsApp$U {
    constructor (width, height) {
        super(script$u, width, height);
        this.isInteractive = true;
    }
}

var init$u = function () {
    let app = new HubsApp$u(600, 475);
    app.mount();
    return app
};

const _hoisted_1$t = { id: "room" };
const _hoisted_2$t = /*#__PURE__*/createBaseVNode("div", { class: "spacer headline" }, " AR & VR ART ", -1 /* HOISTED */);
const _hoisted_3$i = [
  _hoisted_2$t
];

var script$t = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$t, _hoisted_3$i))
}
}

};

class HubsApp$t extends HubsApp$U {
    constructor (width, height) {
        super(script$t, width, height);
        this.isInteractive = true;
    }
}

var init$t = function () {
    let app = new HubsApp$t(600, 475);
    app.mount();
    return app
};

const _hoisted_1$s = { id: "room" };
const _hoisted_2$s = { class: "spacer" };
const _hoisted_3$h = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$g = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$d = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Presence is the absence of mediation. If the users can forget that the medium is there, then they feel presence. ", -1 /* HOISTED */);

var script$s = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$s, [
      createBaseVNode("div", _hoisted_2$s, [
        _hoisted_3$h,
        _hoisted_4$g,
        createVNode(script$T, { msg: "Presence" }),
        _hoisted_5$d
      ])
    ])
  ]))
}
}

};

class HubsApp$s extends HubsApp$U {
    constructor (width, height) {
        super(script$s, width, height);
        this.isInteractive = true;
    }
}

var init$s = function () {
    let app = new HubsApp$s(500, 500);
    app.mount();
    return app
};

const _hoisted_1$r = /*#__PURE__*/createStaticVNode("<div id=\"room\"><div class=\"spacer\"><br><br><!-- &lt;Title msg=&quot;Aura&quot; /&gt; --><div class=\"headline\">Aura</div><br><br><div class=\"squareoff\"><p>In 1930s, Walter Benjamin introduced the concept of <em>aura</em> in The Work of Art in the Age of Mechanical Reproduction. Aura is the <em>here and now</em> that work possesses because of its unique history of production and transmissinowon. </p><p>AR applications are not perfect reproductive technologies, as some draw on the physical and cultural uniquesness, <em>the here and now</em> of particular places </p></div></div></div>", 1);
const _hoisted_2$r = [
  _hoisted_1$r
];

var script$r = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$r))
}
}

};

class HubsApp$r extends HubsApp$U {
    constructor (width, height) {
        super(script$r, width, height);
        this.isInteractive = true;
    }
}

var init$r = function () {
    let app = new HubsApp$r(700, 500);
    app.mount();
    return app
};

const _hoisted_1$q = { id: "room" };
const _hoisted_2$q = { class: "spacer" };
const _hoisted_3$g = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$f = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$c = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, " The term cybersickness, or visually induced motion sickness, has been coined to describe symptoms including headache, nausea, eye strain, dizziness, fatigue, or even vomiting that may occur during or after exposure to a virtual environment. Cybersickness is visceral evidence that VR is not the medium to end all media. Cybersickness reminds the susceptible user of the medium in a powerful way. Nausea replaces astonishment. ", -1 /* HOISTED */);

var script$q = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$q, [
      createBaseVNode("div", _hoisted_2$q, [
        _hoisted_3$g,
        _hoisted_4$f,
        createVNode(script$T, { msg: "Cybersickness and the negattion of presence" }),
        _hoisted_5$c
      ])
    ])
  ]))
}
}

};

class HubsApp$q extends HubsApp$U {
    constructor (width, height) {
        super(script$q, width, height);
        this.isInteractive = true;
    }
}

var init$q = function () {
    let app = new HubsApp$q(500, 500);
    app.mount();
    return app
};

const _hoisted_1$p = { id: "room" };
const _hoisted_2$p = { class: "spacer" };
const _hoisted_3$f = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$e = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$b = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_6$4 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Researchers have long pursued the idea of emotional reactions such as empathy as a test of presence. VR is understood as getting us closer to the authentic or the real. But forgetting the medium is not necessary for a sense of presence. Presence can be understood in a more nuanced way as a liminal zone between forgetting and acknowledging VR as a medium. ", -1 /* HOISTED */);

var script$p = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$p, [
      createBaseVNode("div", _hoisted_2$p, [
        _hoisted_3$f,
        _hoisted_4$e,
        createVNode(script$T, { msg: "Presence and Empathy" }),
        _hoisted_5$b,
        _hoisted_6$4
      ])
    ])
  ]))
}
}

};

class HubsApp$p extends HubsApp$U {
    constructor (width, height) {
        super(script$p, width, height);
        this.isInteractive = true;
    }
}

var init$p = function () {
    let app = new HubsApp$p(700, 400);
    app.mount();
    return app
};

const _hoisted_1$o = /*#__PURE__*/createBaseVNode("div", { id: "room" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createCommentVNode(" <Title msg=\"Presence and Empathy\" /> "),
    /*#__PURE__*/createBaseVNode("div", { class: "headline" }, "Presence and Empathy")
  ])
], -1 /* HOISTED */);
const _hoisted_2$o = [
  _hoisted_1$o
];

var script$o = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$o))
}
}

};

class HubsApp$o extends HubsApp$U {
    constructor (width, height) {
        super(script$o, width, height);
        this.isInteractive = true;
    }
}

var init$o = function () {
    let app = new HubsApp$o(800, 200);
    app.mount();
    return app
};

var _imports_0$a = "https://resources.realitymedia.digital/vue-apps/dist/46d7793fa7ab24ad.png";

var _imports_1 = "https://resources.realitymedia.digital/vue-apps/dist/beb618ffe3769bb6.png";

var _imports_2 = "https://resources.realitymedia.digital/vue-apps/dist/1e4bde312325195f.png";

const _hoisted_1$n = /*#__PURE__*/createBaseVNode("div", { id: "room" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createCommentVNode(" <Title msg=\"Pit Experiment\" /> "),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$a,
      width: "90",
      style: {"float":"right"}
    }),
    /*#__PURE__*/createBaseVNode("div", { class: "postertitle" }, "Presence and Empathy"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_1,
      width: "90",
      style: {"float":"right"}
    }),
    /*#__PURE__*/createBaseVNode("div", { class: "postertitle" }, "Measuring Presence"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_2,
      width: "120",
      style: {"float":"right"}
    }),
    /*#__PURE__*/createBaseVNode("div", { class: "postertitle" }, "Aura")
  ])
], -1 /* HOISTED */);
const _hoisted_2$n = [
  _hoisted_1$n
];

var script$n = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$n))
}
}

};

class HubsApp$n extends HubsApp$U {
    constructor (width, height) {
        super(script$n, width, height);
        this.isInteractive = true;
    }
}

var init$n = function () {
    let app = new HubsApp$n(500, 500);
    app.mount();
    return app
};

var _imports_0$9 = "https://resources.realitymedia.digital/vue-apps/dist/4905757374923259.png";

const _hoisted_1$m = { id: "room" };
const _hoisted_2$m = { class: "spacer" };
const _hoisted_3$e = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$d = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$a = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$9,
  width: "20",
  style: {"float":"left","margin":"10px"}
}, null, -1 /* HOISTED */);
const _hoisted_6$3 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createTextVNode("360"),
  /*#__PURE__*/createBaseVNode("span", null, "°"),
  /*#__PURE__*/createTextVNode(" film Clouds Over Sidra created by Chris Milk and Gabo Arora shows the life of Syrian refugees in Za'atari camp in Jordan. The camera follows 12-year old Sidra in her everyday life, allowing the users to be present with Sidra. ")
], -1 /* HOISTED */);
const _hoisted_7$2 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_8$1 = /*#__PURE__*/createBaseVNode("blockquote", { class: "squareoff" }, "\"When you’re inside of the headset . . . you see full 360 degrees, in all directions. And when you’re sitting there in her room, watching her, you're not watching it through a television screen, you’re not watching it through a window, you’re sitting there with her. When you look down, you're sitting on the same ground that she’s sitting on. And because of that, you feel her humanity in a deeper way. You empathize with her in a deeper way. (Milk 2015)\"", -1 /* HOISTED */);

var script$m = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$m, [
      createBaseVNode("div", _hoisted_2$m, [
        _hoisted_3$e,
        _hoisted_4$d,
        _hoisted_5$a,
        createVNode(script$T, { msg: "Ultimate Empathy Machine" }),
        _hoisted_6$3,
        _hoisted_7$2,
        _hoisted_8$1
      ])
    ])
  ]))
}
}

};

class HubsApp$m extends HubsApp$U {
    constructor (width, height) {
        super(script$m, width, height);
        this.isInteractive = true;
    }
}

var init$m = function () {
    let app = new HubsApp$m(700, 400);
    app.mount();
    return app
};

var _imports_0$8 = "https://resources.realitymedia.digital/vue-apps/dist/b464dbe90d6133ab.jpg";

const _hoisted_1$l = /*#__PURE__*/createBaseVNode("div", { id: "room" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$8,
      width: "700"
    }),
    /*#__PURE__*/createCommentVNode(" <Title msg=\"Ultimate Empathy Machine\" /> ")
  ])
], -1 /* HOISTED */);
const _hoisted_2$l = [
  _hoisted_1$l
];

var script$l = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$l))
}
}

};

class HubsApp$l extends HubsApp$U {
    constructor (width, height) {
        super(script$l, width, height);
        this.isInteractive = true;
    }
}

var init$l = function () {
    let app = new HubsApp$l(700, 500);
    app.mount();
    return app
};

const _hoisted_1$k = { id: "room" };
const _hoisted_2$k = { class: "spacer" };
const _hoisted_3$d = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$c = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$9 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createTextVNode("Nonnie de la Peña's "),
  /*#__PURE__*/createBaseVNode("a", {
    href: "https://embed.ted.com/talks/nonny_de_la_pena_the_future_of_news_virtual_reality",
    target: "_blank"
  }, "Ted Talk"),
  /*#__PURE__*/createTextVNode(" called 'The future of news?'' introduces a new form of journalism where Virtual Reality technology is used to put audience inside the stories. In her work, she created VR stories about imprisonment in Guantanamo and hunger in Los Angeles to induce empathy in the audience.")
], -1 /* HOISTED */);

var script$k = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$k, [
      createBaseVNode("div", _hoisted_2$k, [
        _hoisted_3$d,
        _hoisted_4$c,
        createCommentVNode(" <img src=\"../../../assets/images/Room6/rtarrow.png\" width=\"400\" > "),
        createVNode(script$T, { msg: "The future of news?" }),
        _hoisted_5$9
      ])
    ])
  ]))
}
}

};

class HubsApp$k extends HubsApp$U {
    constructor (width, height) {
        super(script$k, width, height);
        this.isInteractive = true;
    }
}

var init$k = function () {
    let app = new HubsApp$k(700, 400);
    app.mount();
    return app
};

var _imports_0$7 = "https://resources.realitymedia.digital/vue-apps/dist/b3933ff359f949ba.png";

const _hoisted_1$j = /*#__PURE__*/createBaseVNode("div", { id: "room" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$7,
      width: "700"
    }),
    /*#__PURE__*/createCommentVNode(" <Title msg=\"The future of news?\" />\n\t<div class=\"squareoff\">Nonnie de la Peña's <a href=\"https://embed.ted.com/talks/nonny_de_la_pena_the_future_of_news_virtual_reality\" target=\"_blank\">Ted Talk</a> called 'The future of news?''  introduces a new form of journalism where Virtual Reality technology is used to put audience inside the stories. In her work, she created VR stories about imprisonment in Guantanamo and hunger in Los Angeles to induce empathy in the audience.</div>  ")
  ])
], -1 /* HOISTED */);
const _hoisted_2$j = [
  _hoisted_1$j
];

var script$j = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$j))
}
}

};

class HubsApp$j extends HubsApp$U {
    constructor (width, height) {
        super(script$j, width, height);
        this.isInteractive = true;
    }
}

var init$j = function () {
    let app = new HubsApp$j(700, 400);
    app.mount();
    return app
};

const _hoisted_1$i = { id: "room" };
const _hoisted_2$i = { class: "spacer" };
const _hoisted_3$c = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$b = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$8 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "The pit experiment is a virtual experiement often used to evaluate the sence of presence. The user is given a task to grab an object on plank and take it to the other side, crossing the pit. ", -1 /* HOISTED */);

var script$i = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$i, [
      createBaseVNode("div", _hoisted_2$i, [
        _hoisted_3$c,
        _hoisted_4$b,
        createVNode(script$T, { msg: "Pit Experiment" }),
        _hoisted_5$8
      ])
    ])
  ]))
}
}

};

class HubsApp$i extends HubsApp$U {
    constructor (width, height) {
        super(script$i, width, height);
        this.isInteractive = true;
    }
}

var init$i = function () {
    let app = new HubsApp$i(500, 500);
    app.mount();
    return app
};

var _imports_0$6 = "https://resources.realitymedia.digital/vue-apps/dist/2176dc66f5a02546.png";

const _hoisted_1$h = /*#__PURE__*/createBaseVNode("div", { id: "room" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$6,
      width: "436"
    }),
    /*#__PURE__*/createCommentVNode(" <Title msg=\"Pit Experiment\" /> ")
  ])
], -1 /* HOISTED */);
const _hoisted_2$h = [
  _hoisted_1$h
];

var script$h = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$h))
}
}

};

class HubsApp$h extends HubsApp$U {
    constructor (width, height) {
        super(script$h, width, height);
        this.isInteractive = true;
    }
}

var init$h = function () {
    let app = new HubsApp$h(436, 293);
    app.mount();
    return app
};

const _hoisted_1$g = /*#__PURE__*/createStaticVNode("<div id=\"room\"><div class=\"spacer\"><br><br><!-- &lt;Title msg=&quot;Presence&quot; /&gt; --><div class=\"postertitle\">Presence</div><div class=\"squareoff\">Presence is a kind of absence, the absence of mediation. If the users can forget that the medium is there, then they feel presence. </div><!-- &lt;div class=&quot;postertitle&quot;&gt;Presence is a kind of absence, the absence of mediation. If the users can forget that the medium is there, then they feel presence. &lt;/div&gt; --><!-- &lt;div class=&quot;headline&quot;&gt;Presence is the absence of mediation. If the users can forget that the medium is there, then they feel presence. &lt;/div&gt;\n      &lt;div class=&quot;squareoff&quot;&gt;Presence is a kind of absence, the absence of mediation. If the users can forget that the medium is there, then they feel presence. &lt;/div&gt; --><br><br><div class=\"squareoff\" style=\"font-style:italic;\">&quot;VR and AR cannot deceive their users into believing that they are having a non-mediated experience. But that is not necessary for a sense of presence.&quot;</div></div></div>", 1);
const _hoisted_2$g = [
  _hoisted_1$g
];

var script$g = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$g))
}
}

};

class HubsApp$g extends HubsApp$U {
    constructor (width, height) {
        super(script$g, width, height);
        this.isInteractive = true;
    }
}

var init$g = function () {
    let app = new HubsApp$g(700, 400);
    app.mount();
    return app
};

const _hoisted_1$f = { id: "room" };
const _hoisted_2$f = { class: "spacer" };
const _hoisted_3$b = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$a = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$7 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createTextVNode("Treehugger: Wawona VR experience transports the users to the red giant Sequoia trees from the Sequoia National Park. It provides a sense of intimacy with the tree - with its bark, with the cells that make up its being. The vividness of the work illustrates "),
  /*#__PURE__*/createBaseVNode("em", null, "presence"),
  /*#__PURE__*/createTextVNode(". ")
], -1 /* HOISTED */);

var script$f = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$f, [
      createBaseVNode("div", _hoisted_2$f, [
        _hoisted_3$b,
        _hoisted_4$a,
        createVNode(script$T, { msg: "Treehugger: Wawona" }),
        _hoisted_5$7,
        createCommentVNode(" In this experience, users find themselves on the threshold of forgetting that we are having a VR experience. Being on that threshold is a sence of presence in a reality medium. ")
      ])
    ])
  ]))
}
}

};

class HubsApp$f extends HubsApp$U {
    constructor (width, height) {
        super(script$f, width, height);
        this.isInteractive = true;
    }
}

var init$f = function () {
    let app = new HubsApp$f(400, 600);
    app.mount();
    return app
};

var _imports_0$5 = "https://resources.realitymedia.digital/vue-apps/dist/273dec47ec76230d.png";

const _hoisted_1$e = /*#__PURE__*/createBaseVNode("div", { id: "room" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$5,
      width: "800"
    })
  ])
], -1 /* HOISTED */);
const _hoisted_2$e = [
  _hoisted_1$e
];

var script$e = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$e))
}
}

};

class HubsApp$e extends HubsApp$U {
    constructor (width, height) {
        super(script$e, width, height);
        this.isInteractive = true;
    }
}

var init$e = function () {
    let app = new HubsApp$e(800, 400);
    app.mount();
    return app
};

const _hoisted_1$d = { id: "room" };
const _hoisted_2$d = { class: "spacer" };
const _hoisted_3$a = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$9 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);

var script$d = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$d, [
      createBaseVNode("div", _hoisted_2$d, [
        _hoisted_3$a,
        _hoisted_4$9,
        createVNode(script$T, { msg: "Back to the main exhibition" })
      ])
    ])
  ]))
}
}

};

class HubsApp$d extends HubsApp$U {
    constructor (width, height) {
        super(script$d, width, height);
        this.isInteractive = true;
    }
}

var init$d = function () {
    let app = new HubsApp$d(600, 475);
    app.mount();
    return app
};

const _hoisted_1$c = /*#__PURE__*/createBaseVNode("div", { id: "room" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createCommentVNode(" <Title msg=\"The future of news?\" /> "),
    /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Parthenon model explanation")
  ])
], -1 /* HOISTED */);
const _hoisted_2$c = [
  _hoisted_1$c
];

var script$c = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$c))
}
}

};

class HubsApp$c extends HubsApp$U {
    constructor (width, height) {
        super(script$c, width, height);
        this.isInteractive = true;
    }
}

var init$c = function () {
    let app = new HubsApp$c(600, 475);
    app.mount();
    return app
};

var _imports_0$4 = "https://resources.realitymedia.digital/vue-apps/dist/a7d1244c4b23b7b0.jpg";

const _hoisted_1$b = /*#__PURE__*/createBaseVNode("div", { id: "room" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$4,
      width: "800"
    }),
    /*#__PURE__*/createCommentVNode(" <Title msg=\"The future of news?\" />\n\t<div class=\"squareoff\">Nonnie de la Peña's <a href=\"https://embed.ted.com/talks/nonny_de_la_pena_the_future_of_news_virtual_reality\" target=\"_blank\">Ted Talk</a> called 'The future of news?''  introduces a new form of journalism where Virtual Reality technology is used to put audience inside the stories. In her work, she created VR stories about imprisonment in Guantanamo and hunger in Los Angeles to induce empathy in the audience.</div>  ")
  ])
], -1 /* HOISTED */);
const _hoisted_2$b = [
  _hoisted_1$b
];

var script$b = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$b))
}
}

};

class HubsApp$b extends HubsApp$U {
    constructor (width, height) {
        super(script$b, width, height);
        this.isInteractive = true;
    }
}

var init$b = function () {
    let app = new HubsApp$b(800, 500);
    app.mount();
    return app
};

const _hoisted_1$a = { id: "room" };
const _hoisted_2$a = { class: "spacer" };
const _hoisted_3$9 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "\"The Franklin Institute is using AR to enhance their Terracotta Warrior exhibition which were displayed in Philadelphia until March 2018. The museum’s app, powered by Wikitude technology, allows visitors to use their smartphone to scan items and visualize rich AR content to learn even more about the intriguing history behind the magnificent clay soldiers.\"", -1 /* HOISTED */);

var script$a = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$a, [
      createBaseVNode("div", _hoisted_2$a, [
        createVNode(script$T, { msg: "Terracotta Warriors AR" }),
        _hoisted_3$9
      ])
    ])
  ]))
}
}

};

class HubsApp$a extends HubsApp$U {
    constructor (width, height) {
        super(script$a, width, height);
        this.isInteractive = true;
    }
}

var init$a = function () {
    let app = new HubsApp$a(800, 500);
    app.mount();
    return app
};

var _imports_0$3 = "https://resources.realitymedia.digital/vue-apps/dist/b2c77009644a7d45.jpg";

const _hoisted_1$9 = /*#__PURE__*/createBaseVNode("div", { id: "room" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$3,
      width: "600"
    })
  ])
], -1 /* HOISTED */);
const _hoisted_2$9 = [
  _hoisted_1$9
];

var script$9 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$9))
}
}

};

class HubsApp$9 extends HubsApp$U {
    constructor (width, height) {
        super(script$9, width, height);
        this.isInteractive = true;
    }
}

var init$9 = function () {
    let app = new HubsApp$9(600, 475);
    app.mount();
    return app
};

const _hoisted_1$8 = { id: "room" };
const _hoisted_2$8 = { class: "spacer" };
const _hoisted_3$8 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$8 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$6 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Through the virtual pit experiment, subjects experience a higher sense of presence. ", -1 /* HOISTED */);

var script$8 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$8, [
      createBaseVNode("div", _hoisted_2$8, [
        _hoisted_3$8,
        _hoisted_4$8,
        createVNode(script$T, { msg: "Pit Experiment" }),
        _hoisted_5$6
      ])
    ])
  ]))
}
}

};

class HubsApp$8 extends HubsApp$U {
    constructor (width, height) {
        super(script$8, width, height);
        this.isInteractive = true;
    }
}

var init$8 = function () {
    let app = new HubsApp$8(500, 500);
    app.mount();
    return app
};

const _hoisted_1$7 = { id: "room" };
const _hoisted_2$7 = { class: "spacer" };
const _hoisted_3$7 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$7 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$5 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Try walking across the pit without losing balance or falling.", -1 /* HOISTED */);

var script$7 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$7, [
      createBaseVNode("div", _hoisted_2$7, [
        _hoisted_3$7,
        _hoisted_4$7,
        createVNode(script$T, { msg: "Pit Experiment Instruction" }),
        _hoisted_5$5
      ])
    ])
  ]))
}
}

};

class HubsApp$7 extends HubsApp$U {
    constructor (width, height) {
        super(script$7, width, height);
        this.isInteractive = true;
    }
}

var init$7 = function () {
    let app = new HubsApp$7(500, 500);
    app.mount();
    return app
};

const _hoisted_1$6 = { id: "room" };
const _hoisted_2$6 = { class: "spacer" };
const _hoisted_3$6 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$6 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);

var script$6 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$6, [
      createBaseVNode("div", _hoisted_2$6, [
        _hoisted_3$6,
        _hoisted_4$6,
        createVNode(script$T, { msg: "Very carefully stretch your arms out for balance." }),
        createCommentVNode(" <div class=\"squareoff\"> First person shooter games such as  <a href=\"https://www.half-life.com/en/alyx/\" target=\"_blank\">HalfLife: Alyx </a> have long used 3-D graphics to create an immersive experience for millions of players. And for decades, \n    players on computers and game consoles have yearned for true VR so that they could fall through the screen into the worlds on the other side.</div>  ")
      ])
    ])
  ]))
}
}

};

class HubsApp$6 extends HubsApp$U {
    constructor (width, height) {
        super(script$6, width, height);
        this.isInteractive = true;
    }
}

var init$6 = function () {
    let app = new HubsApp$6(600, 475);
    app.mount();
    return app
};

const _hoisted_1$5 = { id: "room" };
const _hoisted_2$5 = { class: "spacer" };
const _hoisted_3$5 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$5 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);

var script$5 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$5, [
      createBaseVNode("div", _hoisted_2$5, [
        _hoisted_3$5,
        _hoisted_4$5,
        createVNode(script$T, { msg: "What do you see on the floor right now?" }),
        createCommentVNode(" <div class=\"squareoff\"> First person shooter games such as  <a href=\"https://www.half-life.com/en/alyx/\" target=\"_blank\">HalfLife: Alyx </a> have long used 3-D graphics to create an immersive experience for millions of players. And for decades, \n    players on computers and game consoles have yearned for true VR so that they could fall through the screen into the worlds on the other side.</div>  ")
      ])
    ])
  ]))
}
}

};

class HubsApp$5 extends HubsApp$U {
    constructor (width, height) {
        super(script$5, width, height);
        this.isInteractive = true;
    }
}

var init$5 = function () {
    let app = new HubsApp$5(600, 475);
    app.mount();
    return app
};

const _hoisted_1$4 = { id: "room" };
const _hoisted_2$4 = { class: "spacer" };
const _hoisted_3$4 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$4 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$4 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, " This digital book is a complement to the printed book Reality Media: Augmented and Virtual Reality published by MIT Press. The digital version takes two forms: a website and a 3D immersive book, which allows you to get inside AR and VR, to inhabit these two new reality media. You are now standing in the entry hall to the immersive book. This hall provides information on how to “read” the immersive book: that is, how to navigate through its galleries and explore the exhibits presented. When you are ready, you can walk through the portal at the far end of this hall to the rotunda, from which you can visit all the galleries. ", -1 /* HOISTED */);

var script$4 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$4, [
      createBaseVNode("div", _hoisted_2$4, [
        createCommentVNode(" <img src=\"../../../assets/images/Room5/Alyx-splash.png\" width=\"400\" > "),
        createVNode(script$T, { msg: "Welcome to Reality Media!" }),
        _hoisted_3$4,
        _hoisted_4$4,
        _hoisted_5$4
      ])
    ])
  ]))
}
}

};

class HubsApp$4 extends HubsApp$U {
    constructor (width, height) {
        super(script$4, width, height);
        this.isInteractive = true;
    }
}

var init$4 = function () {
    let app = new HubsApp$4(600, 800);
    app.mount();
    return app
};

var _imports_0$2 = "https://resources.realitymedia.digital/vue-apps/dist/7a24a6d309d453f2.jpg";

const _hoisted_1$3 = { id: "room" };
const _hoisted_2$3 = { class: "spacer" };
const _hoisted_3$3 = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$2,
  width: "400"
}, null, -1 /* HOISTED */);
const _hoisted_4$3 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$3 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_6$2 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createTextVNode("Published by "),
  /*#__PURE__*/createBaseVNode("a", { href: "https://mitpress.mit.edu/books/reality-media" }, "MIT Press")
], -1 /* HOISTED */);
const _hoisted_7$1 = /*#__PURE__*/createBaseVNode("div", { class: "oblique squareoff" }, "By Jay David Bolter, Maria Engberg and Blair MacIntyre", -1 /* HOISTED */);
const _hoisted_8 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_9 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff quote" }, "How augmented reality and virtual reality are taking their places in contemporary media culture alongside film and television.", -1 /* HOISTED */);

var script$3 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$3, [
      createBaseVNode("div", _hoisted_2$3, [
        _hoisted_3$3,
        _hoisted_4$3,
        _hoisted_5$3,
        createVNode(script$T, { msg: "Reality Media" }),
        _hoisted_6$2,
        _hoisted_7$1,
        _hoisted_8,
        _hoisted_9
      ])
    ])
  ]))
}
}

};

class HubsApp$3 extends HubsApp$U {
    constructor (width, height) {
        super(script$3, width, height);
        this.isInteractive = true;
    }
}

var init$3 = function () {
    let app = new HubsApp$3(600, 800);
    app.mount();
    return app
};

var _imports_0$1 = "https://resources.realitymedia.digital/vue-apps/dist/5b14da96e2889ff2.jpg";

const _hoisted_1$2 = { id: "room" };
const _hoisted_2$2 = { class: "spacer" };
const _hoisted_3$2 = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$1,
  width: "400"
}, null, -1 /* HOISTED */);
const _hoisted_4$2 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$2 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_6$1 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createTextVNode("*Realitymedia* is built on top of Mozilla's open-source platform. An extensive guide to using Mozilla Hubs is available at "),
  /*#__PURE__*/createBaseVNode("a", {
    href: "https://hubs.mozilla.com/docs/intro-hubs.html",
    target: "blank"
  }, "in the Hubs user documentation"),
  /*#__PURE__*/createTextVNode(". Here are the highlights: "),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createTextVNode(" Before entering, you are in the room's lobby. From here, you can see and hear what's going on inside the room, but you can only interact with others using text chat. "),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("div", { class: "keyPoint" }, "To enter the room:"),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createTextVNode(" - on a desktop or mobile device, follow the prompts to select a name/avatar and enable the mic. "),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createTextVNode(" - on a VR headset, if you opened the URL on your desktop or smartphone, choose \"Enter on Standalone VR\" to create a code that makes it easy to open on your standalone headset. Open the browser in your VR headset, navigate to hubs.link and enter the code. "),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("div", { class: "keyPoint" }, "To navigate in Hubs:"),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createTextVNode(" -On desktop use your WASD or arrow keys to move around. You can also press your right mouse button to teleport to a different location. Rotate your view using the Q and E keys, or hold down your left mouse button and drag. -For VR and mobile controls, see the list of "),
  /*#__PURE__*/createBaseVNode("a", {
    href: "https://hubs.mozilla.com/docs/hubs-controls.html",
    target: "blank"
  }, "Hubs controls.")
], -1 /* HOISTED */);

var script$2 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$2, [
      createBaseVNode("div", _hoisted_2$2, [
        _hoisted_3$2,
        _hoisted_4$2,
        _hoisted_5$2,
        createVNode(script$T, { msg: "The Hubs Platform" }),
        _hoisted_6$1
      ])
    ])
  ]))
}
}

};

class HubsApp$2 extends HubsApp$U {
    constructor (width, height) {
        super(script$2, width, height);
        this.isInteractive = true;
    }
}

var init$2 = function () {
    let app = new HubsApp$2(600, 800);
    app.mount();
    return app
};

var _imports_0 = "https://resources.realitymedia.digital/vue-apps/dist/5d42bc6b2a074ccd.png";

const _hoisted_1$1 = { id: "room" };
const _hoisted_2$1 = { class: "spacer" };
const _hoisted_3$1 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$1 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, " The figure below indicates how to mute your microphone, take photos, share your screen, create media objects, and so on: ", -1 /* HOISTED */);
const _hoisted_5$1 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_6 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_7 = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0,
  width: "400"
}, null, -1 /* HOISTED */);

var script$1 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$1, [
      createBaseVNode("div", _hoisted_2$1, [
        createVNode(script$T, { msg: "Features in Hubs" }),
        _hoisted_3$1,
        _hoisted_4$1,
        _hoisted_5$1,
        _hoisted_6,
        _hoisted_7
      ])
    ])
  ]))
}
}

};

class HubsApp$1 extends HubsApp$U {
    constructor (width, height) {
        super(script$1, width, height);
        this.isInteractive = true;
    }
}

var init$1 = function () {
    let app = new HubsApp$1(600, 800);
    app.mount();
    return app
};

const _hoisted_1 = { id: "room" };
const _hoisted_2 = { class: "spacer" };
const _hoisted_3 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Standing on the Audio Pads will start the narrations about the room you are currently in.", -1 /* HOISTED */);

var script = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1, [
      createBaseVNode("div", _hoisted_2, [
        createVNode(script$T, { msg: "How to Use the Audio Pads" }),
        _hoisted_3,
        _hoisted_4,
        _hoisted_5
      ])
    ])
  ]))
}
}

};

class HubsApp extends HubsApp$U {
    constructor (width, height) {
        super(script, width, height);
        this.isInteractive = true;
    }
}

var init = function () {
    let app = new HubsApp(400, 200);
    app.mount();
    return app
};

export { init$s as ARandPresence, init$A as Alyx, init$w as Apparizione, init$t as ArtBanner, init as AudioText, init$r as Aura, init$y as BeatSaber, init$O as Center1, init$N as Center2, init$M as Center3, init$L as Center4, init$K as Center5, init$J as Center6, init$I as Center7, init$p as Empathy, init$o as Empathy_title, init$d as Exit, init$u as GamesBanner, init$1 as HubsFeatures, init$2 as HubsPlatform, init$P as Map, init$m as Milk, init$l as Milk_pic, init$v as Minecraft, init$3 as MitPress, init$H as Monolith1, init$G as Monolith2, init$F as Monolith3, init$E as Monolith4, init$D as Monolith5, init$C as Monolith6, init$B as Monolith7, init$k as Nonnie, init$j as Nonnie_pic, init$c as Parthenon, init$8 as Pit, init$i as PitExperiment, init$7 as PitInstruction, init$h as Pit_pic, init$z as Pokemon, init$Q as PortalSubtitle, init$R as PortalTitle, init$g as Presence, init$n as Presence_map, init$a as Terracotta, init$b as TerracottaPic, init$f as Treehugger, init$e as Treehugger_pic, init$9 as Treehuggerpic2, init$x as WalkingDead, init$4 as Welcome, init$q as cybersickness, init$T as hubsTest1, init$S as hubsTest2, initializeEthereal, init$6 as pitSign1, init$5 as pitSign2, systemTick };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHVicy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Fzc2V0cy9sb2dvLnBuZyIsIi4uLy4uL3NyYy9jb21wb25lbnRzL05ldHdvcmtlZEhlbGxvV29ybGQudnVlIiwiLi4vLi4vc3JjL2FwcHMvSHVic1Rlc3QxL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9WdWVBcHAudHMiLCIuLi8uLi9zcmMvYXBwcy9IdWJzQXBwLnRzIiwiLi4vLi4vc3JjL2FwcHMvSHVic1Rlc3QxL3NoYXJlZC50cyIsIi4uLy4uL3NyYy9hcHBzL0h1YnNUZXN0MS9odWJzLnRzIiwiLi4vLi4vc3JjL2NvbXBvbmVudHMvSGVsbG9Xb3JsZC52dWUiLCIuLi8uLi9zcmMvYXBwcy9IdWJzVGVzdDIvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0h1YnNUZXN0Mi9zaGFyZWQudHMiLCIuLi8uLi9zcmMvYXBwcy9IdWJzVGVzdDIvaHVicy50cyIsIi4uLy4uL3NyYy9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1BvcnRhbFRpdGxlL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Qb3J0YWxUaXRsZS9odWJzLnRzIiwiLi4vLi4vc3JjL2NvbXBvbmVudHMvQ2VudGVyU3VidGl0bGUudnVlIiwiLi4vLi4vc3JjL2FwcHMvUG9ydGFsU3VidGl0bGUvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1BvcnRhbFN1YnRpdGxlL2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9yb3R1bmRhLW1hcC5wbmciLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXJfTWFwL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXJfTWFwL2h1YnMuanMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9sYWNpb3RhdC1WUi5qcGciLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXIxX0ludHJvL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXIxX0ludHJvL2h1YnMuanMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9sYWNpb3RhdC5qcGciLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXIyX0hpc3RvcnkvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjJfSGlzdG9yeS9odWJzLmpzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvdW5jYW5ueS5qcGciLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXIzXzNELVRyYWNraW5nL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXIzXzNELVRyYWNraW5nL2h1YnMuanMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9wYXJ0aGVub24ucG5nIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyNF9QcmVzZW5jZS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyNF9QcmVzZW5jZS9odWJzLmpzIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyNV9HZW5yZXMvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjVfR2VucmVzL2h1YnMuanMiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXI2X0Z1dHVyZS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyNl9GdXR1cmUvaHVicy5qcyIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjdfUHJpdmFjeS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyN19Qcml2YWN5L2h1YnMuanMiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDFfSW50cm8vQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoMV9JbnRyby9odWJzLmpzIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGgyX0hpc3RvcnkvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoMl9IaXN0b3J5L2h1YnMuanMiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDNfM0QtVHJhY2tpbmcvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoM18zRC1UcmFja2luZy9odWJzLmpzIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGg0X1ByZXNlbmNlL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDRfUHJlc2VuY2UvaHVicy5qcyIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoNV9HZW5yZXMvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoNV9HZW5yZXMvaHVicy5qcyIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoNl9GdXR1cmUvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoNl9GdXR1cmUvaHVicy5qcyIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoN19Qcml2YWN5L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDdfUHJpdmFjeS9odWJzLmpzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvUm9vbTUvQWx5eC1zcGxhc2gucG5nIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvQWx5eC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvQWx5eC9odWJzLmpzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvUG9rZW1vbi9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvUG9rZW1vbi9odWJzLmpzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvQmVhdFNhYmVyL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNS9CZWF0U2FiZXIvaHVicy5qcyIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L1dhbGtpbmdEZWFkL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNS9XYWxraW5nRGVhZC9odWJzLmpzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvQXBwYXJpemlvbmUvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L0FwcGFyaXppb25lL2h1YnMuanMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNS9NaW5lY3JhZnQvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L01pbmVjcmFmdC9odWJzLmpzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvR2FtZXNCYW5uZXIvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L0dhbWVzQmFubmVyL2h1YnMuanMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNS9BcnRCYW5uZXIvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L0FydEJhbm5lci9odWJzLmpzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvQVJhbmRQcmVzZW5jZS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvQVJhbmRQcmVzZW5jZS9odWJzLmpzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvQXVyYS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvQXVyYS9odWJzLmpzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvY3liZXJzaWNrbmVzcy9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvY3liZXJzaWNrbmVzcy9odWJzLmpzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvRW1wYXRoeS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvRW1wYXRoeS9odWJzLmpzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvRW1wYXRoeV90aXRsZS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvRW1wYXRoeV90aXRsZS9odWJzLmpzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvUm9vbTYvcmlnaHRhcnJvdy5wbmciLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9Sb29tNi91cGFycm93LnBuZyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L3VyYXJyb3cucG5nIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvbWFwL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9tYXAvaHVicy5qcyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L2xmYXJyb3cucG5nIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvTWlsay9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvTWlsay9odWJzLmpzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvUm9vbTYvY2xvdWRvdmVyc2lkcmEuanBnIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvTWlsa19waWMvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L01pbGtfcGljL2h1YnMuanMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9Ob25uaWUvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L05vbm5pZS9odWJzLmpzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvUm9vbTYvbm9ubmllLnBuZyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L05vbm5pZV9waWMvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L05vbm5pZV9waWMvaHVicy5qcyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1BpdEV4cGVyaW1lbnQvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1BpdEV4cGVyaW1lbnQvaHVicy5qcyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L3BpdFZSLnBuZyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1BpdF9waWMvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1BpdF9waWMvaHVicy5qcyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1ByZXNlbmNlL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QcmVzZW5jZS9odWJzLmpzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvVHJlZWh1Z2dlci9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvVHJlZWh1Z2dlci9odWJzLmpzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvUm9vbTYvdHJlZWh1Z2dlci5wbmciLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9UcmVlaHVnZ2VyX3BpYy9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvVHJlZWh1Z2dlcl9waWMvaHVicy5qcyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0V4aXQvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0V4aXQvaHVicy5qcyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1BhcnRoZW5vbi9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvUGFydGhlbm9uL2h1YnMuanMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9Sb29tNi90ZXJyYWNvdHRhLmpwZyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1RlcnJhY290dGFQaWMvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1RlcnJhY290dGFQaWMvaHVicy5qcyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1RlcnJhY290dGEvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1RlcnJhY290dGEvaHVicy5qcyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L3RyZWVodWdnZXIyLmpwZyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1RyZWVodWdnZXJQaWMyL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9UcmVlaHVnZ2VyUGljMi9odWJzLmpzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbV9QaXQvUGl0L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tX1BpdC9QaXQvaHVicy5qcyIsIi4uLy4uL3NyYy9hcHBzL1Jvb21fUGl0L1BpdEluc3RydWN0aW9uL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tX1BpdC9QaXRJbnN0cnVjdGlvbi9odWJzLmpzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbV9QaXQvcGl0U2lnbjEvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb21fUGl0L3BpdFNpZ24xL2h1YnMuanMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tX1BpdC9waXRTaWduMi9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbV9QaXQvcGl0U2lnbjIvaHVicy5qcyIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvV2VsY29tZS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9XZWxjb21lL2h1YnMuanMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9PbmJvYXJkaW5nL3JlYWxpdHlNZWRpYUJvb2suanBnIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9NaXRQcmVzcy9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9NaXRQcmVzcy9odWJzLmpzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvT25ib2FyZGluZy9Nb3ppbGxhSHVicy5qcGciLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL0h1YnNQbGF0Zm9ybS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9IdWJzUGxhdGZvcm0vaHVicy5qcyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL09uYm9hcmRpbmcvaHVicy11c2VyLWludGVyZmFjZS5wbmciLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL0h1YnNGZWF0dXJlcy9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9IdWJzRmVhdHVyZXMvaHVicy5qcyIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvQXVkaW9UZXh0L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL0F1ZGlvVGV4dC9odWJzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC8xYTZhY2UzNzcxMzNmMTRhLnBuZ1wiIiwiPHRlbXBsYXRlPlxuICA8aDEgeHItbGF5ZXIgY2xhc3M9XCJmYWRlXCI+e3sgbXNnIH19PC9oMT5cbiAgPHA+XG4gICAgSGVyZSdzIHNvbWUgbW9yZSB0ZXh0IGp1c3QgdG8gbWFrZSB0aGluZ3Mgbm90IGJsYW5rLlxuICA8L3A+XG5cbiAgPGJ1dHRvbiB4ci1sYXllciBAY2xpY2s9XCJzaGFyZWQuaW5jcmVtZW50XCI+Y291bnQgaXM6IHt7IHNoYXJlZC5zdGF0ZS5jb3VudCB9fTwvYnV0dG9uPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IGluamVjdCB9IGZyb20gJ3Z1ZSdcblxuZGVmaW5lUHJvcHMoe1xuICBtc2c6IFN0cmluZ1xufSlcblxuY29uc3Qgc2hhcmVkID0gaW5qZWN0KCdzaGFyZWQnKVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5hIHtcbiAgY29sb3I6ICNiNTQyYjk7XG59XG5cbi5mYWRlIHtcbiAgY29sb3I6ICM5ODAzYTU7XG4gIC8qIHRyYW5zaXRpb246IGNvbG9yIDFzOyAqL1xufVxuXG4uZmFkZTpob3ZlciB7XG4gIGNvbG9yOiAjYTc4ZTA2O1xufVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInRvcFwiPlxuICAgICAgPGltZyBhbHQ9XCJWdWUgbG9nb1wiIHNyYz1cIi4uLy4uL2Fzc2V0cy9sb2dvLnBuZ1wiIC8+XG4gICAgICA8U29tZVRleHQgdi1iaW5kOm1zZz1cIm1lc2dcIiAvPlxuICAgICAgPCEtLSA8U29tZVRleHQgbXNnPVwiTmV0d29ya2VkIFZ1ZSBDb21wb25lbnQgd2l0aCBTaGFyZWQgQnV0dG9uIENvdW50XCIgLz4gLS0+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IGluamVjdCB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBTb21lVGV4dCBmcm9tICcuLi8uLi9jb21wb25lbnRzL05ldHdvcmtlZEhlbGxvV29ybGQudnVlJ1xuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuXG5sZXQgcGFyYW1zID0gaW5qZWN0KFwicGFyYW1zXCIpXG52YXIgbWVzZyA9IHBhcmFtcyAmJiBwYXJhbXMubWVzZyA/IHBhcmFtcy5tZXNnIDogXCJOZXR3b3JrZWQgVnVlIENvbXBvbmVudCB3aXRoIFNoYXJlZCBCdXR0b24gQ291bnRcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG48L3N0eWxlPlxuIiwiaW1wb3J0IHsgY3JlYXRlQXBwLCBBcHAsIENvbXBvbmVudCwgQ29tcG9uZW50UHVibGljSW5zdGFuY2UgfSBmcm9tIFwidnVlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZ1ZUFwcCB7XG4gICAgdGFrZU93bmVyc2hpcDogICgpID0+IGJvb2xlYW5cbiAgICBzZXRTaGFyZWREYXRhOiAob2JqZWN0OiB7fSkgPT4gYm9vbGVhblxuXG4gICAgd2lkdGg6IG51bWJlclxuICAgIGhlaWdodDogbnVtYmVyXG5cbiAgICB2dWVBcHA6IEFwcFxuICAgIHZ1ZVJvb3Q6IENvbXBvbmVudFB1YmxpY0luc3RhbmNlIHwgdW5kZWZpbmVkXG5cbiAgICBjb25zdHJ1Y3RvciAoQXBwOiBDb21wb25lbnQsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBjcmVhdGVPcHRpb25zOiBhbnkgPXt9KSB7XG4gICAgICAgIHRoaXMudGFrZU93bmVyc2hpcCA9IHRoaXMudGFrZU93bmVyc2hpcFByb3RvLmJpbmQodGhpcylcbiAgICAgICAgdGhpcy5zZXRTaGFyZWREYXRhID0gdGhpcy5zZXRTaGFyZWREYXRhUHJvdG8uYmluZCh0aGlzKVxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGhcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHRcblxuICAgICAgICB0aGlzLnZ1ZUFwcCA9IGNyZWF0ZUFwcChBcHAsIGNyZWF0ZU9wdGlvbnMpXG4gICAgfVxuXG4gICAgbW91bnQoKSB7XG4gICAgfVxuXG4gICAgLy8gZHVtbXkgZnVuY3Rpb25zLCBqdXN0IHRvIGxldCB1cyB1c2UgdGhlIHNhbWVcbiAgICAvLyBkYXRhIHN0b3JlIHdpdGggaHVicyBhbmQgdGhlIHdlYiB0ZXN0aW5nIHNldHVwXG4gICAgdGFrZU93bmVyc2hpcFByb3RvKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgc2V0U2hhcmVkRGF0YVByb3RvKG9iamVjdDoge30pIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufSIsImltcG9ydCB7IGNyZWF0ZUFwcCwgQXBwLCBDb21wb25lbnQsIENvbXBvbmVudFB1YmxpY0luc3RhbmNlIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgU2NlbmUsIEVudGl0eSB9IGZyb20gJ2FmcmFtZSdcbmltcG9ydCB7IEV0aGVyZWFsTGF5b3V0U3lzdGVtLCBXZWJMYXllcjNEIH0gZnJvbSBcImV0aGVyZWFsXCI7XG5pbXBvcnQgVnVlQXBwICBmcm9tIFwiLi9WdWVBcHBcIlxuXG4vLyBjcmVhdGUgaW5pdCBtZXRob2QgZm9yIGV0aGVyZWFsXG5pbXBvcnQgKiBhcyBldGhlcmVhbCBmcm9tICdldGhlcmVhbCdcbmltcG9ydCB7IGNyZWF0ZVByaW50ZXIsIFRoaXNFeHByZXNzaW9uLCBUaHJvd1N0YXRlbWVudCB9IGZyb20gXCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC9saWIvdHlwZXNjcmlwdFwiO1xuaW1wb3J0IHsgY3JlYXRlIH0gZnJvbSBcIm1hdGhqc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZUV0aGVyZWFsKCkge1xuICAgIEh1YnNBcHAuaW5pdGlhbGl6ZUV0aGVyZWFsKClcbn1cblxuLy9USFJFRS5PYmplY3QzRC5EZWZhdWx0TWF0cml4QXV0b1VwZGF0ZSA9IHRydWU7XG5cbmV4cG9ydCBmdW5jdGlvbiBzeXN0ZW1UaWNrKHRpbWU6IG51bWJlciwgZGVsdGFUaW1lOiBudW1iZXIpIHtcbiAgIEh1YnNBcHAuc3lzdGVtVGljayh0aW1lLCBkZWx0YVRpbWUpXG59XG5cbmZ1bmN0aW9uIGNvcHlDYW1lcmEoc291cmNlOiBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSwgdGFyZ2V0OiBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSkge1xuICAgIHNvdXJjZS51cGRhdGVNYXRyaXhXb3JsZCgpXG4gICAgLy9sZXQgb2xkTmFtZSA9IHRhcmdldC5uYW1lXG4gICAgLy90YXJnZXQuY29weShzb3VyY2UsIGZhbHNlKVxuICAgIC8vdGFyZ2V0Lm5hbWUgPSBvbGROYW1lXG5cbiAgICB0YXJnZXQuZm92ID0gc291cmNlLmZvdjtcbiAgICB0YXJnZXQuem9vbSA9IHNvdXJjZS56b29tO1xuXG4gICAgdGFyZ2V0Lm5lYXIgPSBzb3VyY2UubmVhcjtcbiAgICB0YXJnZXQuZmFyID0gc291cmNlLmZhcjtcblxuICAgIHRhcmdldC5hc3BlY3QgPSBzb3VyY2UuYXNwZWN0O1xuXG4gICAgLy8gdGFyZ2V0Lm1hdHJpeFdvcmxkSW52ZXJzZS5jb3B5KCBzb3VyY2UubWF0cml4V29ybGRJbnZlcnNlICk7XG4gICAgLy8gdGFyZ2V0LnByb2plY3Rpb25NYXRyaXguY29weSggc291cmNlLnByb2plY3Rpb25NYXRyaXggKTtcbiAgICAvLyB0YXJnZXQucHJvamVjdGlvbk1hdHJpeEludmVyc2UuY29weSggc291cmNlLnByb2plY3Rpb25NYXRyaXhJbnZlcnNlICk7XG5cbiAgICAvLyB0YXJnZXQudXAuY29weSggc291cmNlLnVwICk7XG5cbiAgICAvLyB0YXJnZXQubWF0cml4LmNvcHkoIHNvdXJjZS5tYXRyaXggKTtcbiAgICAvLyB0YXJnZXQubWF0cml4V29ybGQuY29weSggc291cmNlLm1hdHJpeFdvcmxkICk7XG5cbiAgICAvLyB0YXJnZXQubWF0cml4QXV0b1VwZGF0ZSA9IHNvdXJjZS5tYXRyaXhBdXRvVXBkYXRlO1xuICAgIC8vIHRhcmdldC5tYXRyaXhXb3JsZE5lZWRzVXBkYXRlID0gc291cmNlLm1hdHJpeFdvcmxkTmVlZHNVcGRhdGU7XG5cbiAgICBzb3VyY2UubWF0cml4V29ybGQuZGVjb21wb3NlKCB0YXJnZXQucG9zaXRpb24sIHRhcmdldC5xdWF0ZXJuaW9uLCB0YXJnZXQuc2NhbGUpXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHRhcmdldC5yb3RhdGlvbi5zZXRGcm9tUXVhdGVybmlvbiggdGFyZ2V0LnF1YXRlcm5pb24sIHVuZGVmaW5lZCwgZmFsc2UgKTtcbiAgICB0YXJnZXQudXBkYXRlTWF0cml4KClcbiAgICB0YXJnZXQudXBkYXRlTWF0cml4V29ybGQodHJ1ZSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHVic0FwcCBleHRlbmRzIFZ1ZUFwcCB7XG4gICAgc3RhdGljIHN5c3RlbTogRXRoZXJlYWxMYXlvdXRTeXN0ZW07XG4gICAgc3RhdGljIGV0aGVyZWFsQ2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKClcbiAgICBzdGF0aWMgcGxheWVyQ2FtZXJhOiBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYTtcblxuICAgIGlzRXRoZXJlYWw6IGJvb2xlYW5cbiAgICBpc0ludGVyYWN0aXZlOiBib29sZWFuXG4gICAgaXNOZXR3b3JrZWQ6IGJvb2xlYW5cbiAgICBpc1N0YXRpYzogYm9vbGVhblxuXG4gICAgcHJpdmF0ZSB1cGRhdGVUaW1lOiBudW1iZXJcbiAgICBwcml2YXRlIHJheWNhc3RlcjogVEhSRUUuUmF5Y2FzdGVyXG5cbiAgICBzaXplOiB7XG4gICAgICAgIHdpZHRoOiBudW1iZXIsXG4gICAgICAgIGhlaWdodDogbnVtYmVyXG4gICAgfVxuXG4gICAgLy90YWtlT3duZXJzaGlwOiAgKCkgPT4gYm9vbGVhblxuICAgIC8vc2V0U2hhcmVkRGF0YTogKG9iamVjdDoge30pID0+IGJvb2xlYW5cbiAgICAvL3dpZHRoOiBudW1iZXJcbiAgICAvL2hlaWdodDogbnVtYmVyXG4gICAgLy92dWVBcHA6IEFwcFxuICAgIC8vdnVlUm9vdDogQ29tcG9uZW50UHVibGljSW5zdGFuY2UgfCB1bmRlZmluZWQgXG5cbiAgICB3ZWJMYXllcjNEOiBXZWJMYXllcjNEIHwgdW5kZWZpbmVkXG4gICAgbmVlZHNVcGRhdGU6IGJvb2xlYW4gPSBmYWxzZVxuXG4gICAgaGVhZERpdjogRWxlbWVudFxuXG4gICAgc3RhdGljIGluaXRpYWxpemVFdGhlcmVhbCgpIHtcbiAgICAgICAgbGV0IHNjZW5lOiBTY2VuZSA9IHdpbmRvdy5BUFAuc2NlbmU7XG5cbiAgICAgICAgdGhpcy5ldGhlcmVhbENhbWVyYS5tYXRyaXhBdXRvVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgLy90aGlzLmV0aGVyZWFsQ2FtZXJhLnZpc2libGUgPSBmYWxzZTtcblxuICAgICAgICAvL3NjZW5lLnNldE9iamVjdDNEKFwiZXRoZXJlYWxDYW1lcmFcIiwgdGhpcy5ldGhlcmVhbENhbWVyYSlcblxuICAgICAgICB0aGlzLnBsYXllckNhbWVyYSA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpZXdpbmctY2FtZXJhXCIpIGFzIEVudGl0eSkuZ2V0T2JqZWN0M0QoXCJjYW1lcmFcIikgYXMgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmE7XG5cbiAgICAgICAgLy8ganVzdCBpbiBjYXNlIFwidmlld2luZy1jYW1lcmFcIiBpc24ndCBzZXQgdXAgeWV0IC4uLiB3aGljaCBpdCBcbiAgICAgICAgLy8gc2hvdWxkIGJlLCBidXQganVzdCB0byBiZSBjYXJlZnVsXG4gICAgICAgIHRoaXMuc3lzdGVtID0gZXRoZXJlYWwuY3JlYXRlTGF5b3V0U3lzdGVtKHRoaXMucGxheWVyQ2FtZXJhID8gdGhpcy5wbGF5ZXJDYW1lcmEgOiBzY2VuZS5jYW1lcmEpXG4gICAgICAgIHdpbmRvdy5ldGhTeXN0ZW0gPSB0aGlzLnN5c3RlbVxuXG4gICAgICAgIC8vIGNhbiBjdXN0b21pemUgZWFzaW5nIGV0Y1xuICAgICAgICAvLyBzeXN0ZW0udHJhbnNpdGlvbi5kdXJhdGlvbiA9IDEuNVxuICAgICAgICAvLyBzeXN0ZW0udHJhbnNpdGlvbi5kZWxheSA9IDBcbiAgICAgICAgLy8gc3lzdGVtLnRyYW5zaXRpb24ubWF4V2FpdCA9IDRcbiAgICAgICAgLy8gc3lzdGVtLnRyYW5zaXRpb24uZWFzaW5nID0gZXRoZXJlYWwuZWFzaW5nLmVhc2VPdXRcbiAgICB9XG5cbiAgICBzdGF0aWMgc3lzdGVtVGljayh0aW1lOiBudW1iZXIsIGRlbHRhVGltZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBzY2VuZSA9IHdpbmRvdy5BUFAuc2NlbmU7XG5cbiAgICAgICAgaWYgKCF0aGlzLnBsYXllckNhbWVyYSkge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJDYW1lcmEgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWV3aW5nLWNhbWVyYVwiKSBhcyBFbnRpdHkpLmdldE9iamVjdDNEKFwiY2FtZXJhXCIpIGFzIFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoIXRoaXMucGxheWVyQ2FtZXJhKSByZXR1cm47XG4gICAgXG4gICAgICAgIGNvcHlDYW1lcmEodGhpcy5wbGF5ZXJDYW1lcmEsIHRoaXMuZXRoZXJlYWxDYW1lcmEpXG5cbiAgICAgICAgaWYgKHRoaXMuZXRoZXJlYWxDYW1lcmEgIT0gdGhpcy5zeXN0ZW0udmlld05vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuc3lzdGVtLnZpZXdOb2RlID0gdGhpcy5ldGhlcmVhbENhbWVyYVxuICAgICAgICB9XG5cbiAgICAgICAgc2NlbmUucmVuZGVyZXIuZ2V0U2l6ZShIdWJzQXBwLnN5c3RlbS52aWV3UmVzb2x1dGlvbilcbiAgICAgICAgdGhpcy5zeXN0ZW0udmlld0ZydXN0dW0uc2V0RnJvbVBlcnNwZWN0aXZlUHJvamVjdGlvbk1hdHJpeCh0aGlzLmV0aGVyZWFsQ2FtZXJhLnByb2plY3Rpb25NYXRyaXgpXG5cbiAgICAgICAgLy8gdGljayBtZXRob2QgZm9yIGV0aGVyZWFsXG4gICAgICAgIHRoaXMuc3lzdGVtLnVwZGF0ZShkZWx0YVRpbWUsIHRpbWUpXG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IgKEFwcDogQ29tcG9uZW50LCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSwgY3JlYXRlT3B0aW9uczogYW55ID17fSkge1xuICAgICAgICBcblxuICAgICAgICBpZiAocGFyYW1zLndpZHRoICYmIHBhcmFtcy5oZWlnaHQgJiYgcGFyYW1zLndpZHRoID4gMCAmJiBwYXJhbXMuaGVpZ2h0ID4gMCkge1xuICAgICAgICAgICAgLy8gcmVzZXQgYm90aFxuICAgICAgICAgICAgd2lkdGggPSBwYXJhbXMud2lkdGggICBcbiAgICAgICAgICAgIGhlaWdodCA9IHBhcmFtcy5oZWlnaHRcbiAgICAgICAgfSBlbHNlIGlmICgocGFyYW1zLndpZHRoICYmIHBhcmFtcy53aWR0aCA+IDApIHx8IChwYXJhbXMuaGVpZ2h0ICYmIHBhcmFtcy5oZWlnaHQgPiAwKSkge1xuICAgICAgICAgICAgLy8gc2V0IG9uZSBhbmQgc2NhbGUgdGhlIG90aGVyXG4gICAgICAgICAgICBpZiAocGFyYW1zLndpZHRoICYmIHBhcmFtcy53aWR0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSAocGFyYW1zLndpZHRoIC8gd2lkdGgpICogaGVpZ2h0ICAgIFxuICAgICAgICAgICAgICAgIHdpZHRoID0gcGFyYW1zLndpZHRoICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGFyYW1zLmhlaWdodCAmJiBwYXJhbXMuaGVpZ2h0ID4gMCkge1xuICAgICAgICAgICAgICAgIHdpZHRoID0gKHBhcmFtcy5oZWlnaHQgLyBoZWlnaHQpICogaGVpZ2h0XG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gcGFyYW1zLmhlaWdodFxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBjcmVhdGVPcHRpb25zKVxuICAgICAgICB0aGlzLmlzRXRoZXJlYWwgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnZ1ZUFwcC5wcm92aWRlKCdwYXJhbXMnLCBwYXJhbXMpXG5cbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNOZXR3b3JrZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1N0YXRpYyA9IHRydWU7XG4gICAgICAgIHRoaXMudXBkYXRlVGltZSA9IDEwMFxuICAgICAgICB0aGlzLnJheWNhc3RlciA9IG5ldyBUSFJFRS5SYXljYXN0ZXIoKVxuICAgICAgICAvL3RoaXMud2lkdGggPSB3aWR0aFxuICAgICAgICAvL3RoaXMuaGVpZ2h0ID0gaGVpZ2h0XG4gICAgICAgIHRoaXMuc2l6ZSA9IHsgd2lkdGg6IHdpZHRoLzEwMDAsIGhlaWdodDogaGVpZ2h0LzEwMDB9XG4gICAgICAgIC8vdGhpcy50YWtlT3duZXJzaGlwID0gdGhpcy50YWtlT3duZXJzaGlwUHJvdG8uYmluZCh0aGlzKVxuICAgICAgICAvL3RoaXMuc2V0U2hhcmVkRGF0YSA9IHRoaXMuc2V0U2hhcmVkRGF0YVByb3RvLmJpbmQodGhpcylcblxuICAgICAgICB0aGlzLmhlYWREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICAgIC8vdGhpcy5oZWFkRGl2LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsXCJ3aWR0aDogMTAwJTtoZWlnaHQ6IDEwMCU7XCIpXG5cbiAgICAgICAgLy90aGlzLnZ1ZUFwcCA9IGNyZWF0ZUFwcChBcHAsIGNyZWF0ZU9wdGlvbnMpXG4gICAgfVxuXG4gICAgbW91bnQodXNlRXRoZXJlYWw/OiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuaXNFdGhlcmVhbCA9IHVzZUV0aGVyZWFsID09PSB0cnVlXG4gICAgICAgIFxuICAgICAgICB0aGlzLnZ1ZVJvb3QgPSB0aGlzLnZ1ZUFwcC5tb3VudCh0aGlzLmhlYWREaXYpO1xuICAgICAgICB0aGlzLnZ1ZVJvb3QuJGVsLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsXCJ3aWR0aDogXCIgKyB0aGlzLndpZHRoICsgXCJweDsgaGVpZ2h0OiBcIiArIHRoaXMuaGVpZ2h0ICsgXCJweDtcIilcblxuICAgICAgICAvLyAvLyBhZGQgYSBsaW5rIHRvIHRoZSBzaGFyZWQgY3NzXG4gICAgICAgIGxldCBsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIilcbiAgICAgICAgbC5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC9odWJzLmNzc1wiKVxuICAgICAgICBsLnNldEF0dHJpYnV0ZShcInJlbFwiLCBcInN0eWxlc2hlZXRcIilcbiAgICAgICAgbC5zZXRBdHRyaWJ1dGUoXCJjcm9zc29yaWdpblwiLFwiYW5vbnltb3VzXCIpXG4gICAgICAgIHRoaXMudnVlUm9vdC4kZWwuaW5zZXJ0QmVmb3JlKGwsIHRoaXMudnVlUm9vdC4kZWwuZmlyc3RDaGlsZClcblxuICAgICAgICAvLyBtb3ZlIHRoaXMgaW50byBtZXRob2RcbiAgICAgICAgdGhpcy53ZWJMYXllcjNEID0gbmV3IFdlYkxheWVyM0QodGhpcy52dWVSb290LiRlbCwge1xuICAgICAgICAgICAgYXV0b1JlZnJlc2g6IHRydWUsXG4gICAgICAgICAgICBvbkxheWVyQ3JlYXRlOiB1c2VFdGhlcmVhbCA/IFxuICAgICAgICAgICAgKGxheWVyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWRhcHRlciA9IEh1YnNBcHAuc3lzdGVtLmdldEFkYXB0ZXIobGF5ZXIpXG4gICAgICAgICAgICAgICAgYWRhcHRlci5vcGFjaXR5LmVuYWJsZWQgPSB0cnVlXG4gICAgICAgICAgICAgICAgYWRhcHRlci5vblVwZGF0ZSA9ICgpID0+IGxheWVyLnVwZGF0ZSgpXG4gICAgICAgICAgICB9IDpcbiAgICAgICAgICAgIChsYXllcikgPT4ge30sXG4gICAgICAgICAgICBvbkxheWVyUGFpbnQ6IChsYXllcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU3RhdGljKSB7IHRoaXMubmVlZHNVcGRhdGUgPSB0cnVlIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZXh0dXJlRW5jb2Rpbmc6IFRIUkVFLnNSR0JFbmNvZGluZyxcbiAgICAgICAgICAgIHJlbmRlck9yZGVyT2Zmc2V0OiAwXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldE5ldHdvcmtNZXRob2RzKHRha2VPd25lcnNoaXA6ICgpID0+IGJvb2xlYW4sIHNldFNoYXJlZERhdGE6ICh7fSkgPT4gYm9vbGVhbikge1xuICAgICAgICB0aGlzLnRha2VPd25lcnNoaXAgPSB0YWtlT3duZXJzaGlwO1xuICAgICAgICB0aGlzLnNldFNoYXJlZERhdGEgPSBzZXRTaGFyZWREYXRhO1xuICAgIH1cblxuICAgIC8vIGR1bW15IGZ1bmN0aW9ucywganVzdCB0byBhdm9pZCBlcnJvcnMgaWYgdGhleSBnZXQgY2FsbGVkIGJlZm9yZVxuICAgIC8vIG5ldHdvcmtpbmcgaXMgaW5pdGlhbGl6ZWQsIG9yIGNhbGxlZCB3aGVuIG5ldHdvcmtlZCBpcyBmYWxzZVxuICAgIC8vIHRha2VPd25lcnNoaXBQcm90bygpOiBib29sZWFuIHtcbiAgICAvLyAgICAgcmV0dXJuIHRydWU7XG4gICAgLy8gfVxuXG4gICAgLy8gc2V0U2hhcmVkRGF0YVByb3RvKG9iamVjdDoge30pIHtcbiAgICAvLyAgICAgcmV0dXJuIHRydWU7XG4gICAgLy8gfVxuXG4gICAgLy8gcmVjZWl2ZSBkYXRhIHVwZGF0ZXMuICBzaG91bGQgYmUgb3ZlcnJpZGRlbiBieSBzdWJjbGFzc2VzLCBhbHNvIHJlcXVlc3RzXG4gICAgLy8gdXBkYXRlIG5leHQgdGlja1xuICAgIHVwZGF0ZVNoYXJlZERhdGEoZGF0YU9iamVjdDoge30pIHtcbiAgICAgICAgdGhpcy5uZWVkc1VwZGF0ZSA9IHRydWVcbiAgICB9XG5cbiAgICBnZXRTaXplKCkge1xuICAgICAgICAvLyBpZiAoIXRoaXMuY29tcFN0eWxlcykge1xuICAgICAgICAvLyAgICAgdGhpcy5jb21wU3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy52dWVSb290LiRlbCk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gdmFyIHdpZHRoID0gdGhpcy5jb21wU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ3dpZHRoJylcbiAgICAgICAgLy8gd2lkdGggPSB3aWR0aCAmJiB3aWR0aC5sZW5ndGggPiAwID8gcGFyc2VGbG9hdCh3aWR0aCkgLyAxMDAwOiAxXG4gICAgICAgIC8vIHZhciBoZWlnaHQgPSB0aGlzLmNvbXBTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnaGVpZ2h0JylcbiAgICAgICAgLy8gaGVpZ2h0ID0gaGVpZ2h0ICYmIGhlaWdodC5sZW5ndGggPiAwID8gcGFyc2VGbG9hdChoZWlnaHQpIC8gMTAwMDogMVxuICAgICAgICAvLyB0aGlzLnNpemUgPSB7IHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHR9XG4gICAgICAgIGNvbnNvbGUubG9nIChcImRpdiBzaXplOiB7XCIgKyB0aGlzLnNpemUud2lkdGggKyBcIiwgXCIgKyB0aGlzLnNpemUuaGVpZ2h0ICsgXCJ9XCIpXG4gICAgICAgIHJldHVybiB0aGlzLnNpemVcbiAgICB9XG5cbiAgICAvLyByZWNlaXZlIGRhdGEgdXBkYXRlcy4gIHNob3VsZCBiZSBvdmVycmlkZGVuIGJ5IHN1YmNsYXNzZXNcbiAgICBnZXRTaGFyZWREYXRhKGRhdGFPYmplY3Q6IHt9KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImdldFNoYXJlZERhdGEgc2hvdWxkIGJlIG92ZXJyaWRkZW4gYnkgc3ViY2xhc3Nlc1wiKVxuICAgIH1cbiAgICBcbiAgICAvLyBvdmVycmlkZSB0byBjaGVjayBmb3IgeW91ciBvd24gM0Qgb2JqZWN0cyB0aGF0IGFyZW4ndCB3ZWJMYXllcnNcbiAgICBjbGlja2VkKGV2dDoge29iamVjdDNEOiBUSFJFRS5PYmplY3QzRH0pIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzSW50ZXJhY3RpdmUpIHsgcmV0dXJuIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG9iaiA9IGV2dC5vYmplY3QzRFxuICAgICAgICB0aGlzLnJheWNhc3Rlci5yYXkuc2V0KG9iai5wb3NpdGlvbiwgXG4gICAgICAgICAgICB0aGlzLndlYkxheWVyM0QhLmdldFdvcmxkRGlyZWN0aW9uKG5ldyBUSFJFRS5WZWN0b3IzKCkpLm5lZ2F0ZSgpKVxuICAgICAgICBjb25zdCBoaXQgPSB0aGlzLndlYkxheWVyM0QhLmhpdFRlc3QodGhpcy5yYXljYXN0ZXIucmF5KVxuICAgICAgICBpZiAoaGl0KSB7XG4gICAgICAgICAgaGl0LnRhcmdldC5jbGljaygpXG4gICAgICAgICAgaGl0LnRhcmdldC5mb2N1cygpXG4gICAgICAgICAgY29uc29sZS5sb2coJ2hpdCcsIGhpdC50YXJnZXQsIGhpdC5sYXllcilcbiAgICAgICAgfSAgIFxuICAgIH1cblxuICAgIGRyYWdTdGFydChldnQ6IHt9KSB7XG4gICAgICAgIC8vIG5vdGhpbmcgaGVyZSAuLi4gc3ViY2xhc3Mgc2hvdWxkIG92ZXJyaWRlXG4gICAgfVxuXG4gICAgZHJhZ0VuZCAoZXZ0OiB7fSkge1xuICAgICAgICAvLyBub3RoaW5nIGhlcmUgLi4uIHN1YmNsYXNzIHNob3VsZCBvdmVycmlkZVxuICAgIH1cblxuICAgIHBsYXkoKSB7XG4gICAgICAgIC8vIGlmIHdlIGNhbiBmaWd1cmUgb3V0IGhvdyB0byBwYXVzZSwgdGhlbiByZXN0YXJ0IGhlcmVcbiAgICB9XG5cbiAgICBwYXVzZSgpIHtcbiAgICAgICAgLy8gcGVyaGFwcyBmaWd1cmUgb3V0IGhvdyB0byBwYXVzZSB0aGUgVnVlIGNvbXBvbmVudD9cbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICAvLyBUT0RPOiBkZXN0cm95IHRoZSB2dWUgY29tcG9uZW50IGFuZCBhbnkgcmVzb3VyY2VzLCBldGMuLCBpdCBoYXNcbiAgICB9XG5cbiAgICB0aWNrKHRpbWU6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5pc0V0aGVyZWFsKSB7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBuZWVkc1VwZGF0ZSA9IHRoaXMubmVlZHNVcGRhdGVcbiAgICAgICAgICAgIHRoaXMubmVlZHNVcGRhdGUgPSBmYWxzZVxuICAgICAgICAgICAgaWYgKHRoaXMuaXNTdGF0aWMgJiYgdGhpcy51cGRhdGVUaW1lIDwgdGltZSkge1xuICAgICAgICAgICAgICAgIG5lZWRzVXBkYXRlID0gdHJ1ZVxuICAgICAgICAgICAgICAgIC8vIHdhaXQgYSBiaXQgYW5kIGRvIGl0IGFnYWluLiAgTWF5IGdldCByaWQgb2YgdGhpcyBzb21lIGRheSwgd2UnbGwgc2VlXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUaW1lID0gTWF0aC5yYW5kb20oKSAqIDIwMDAgKyAxMDAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNTdGF0aWMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRpbWUgPSB0aW1lXG4gICAgICAgICAgICAgICAgbmVlZHNVcGRhdGUgPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmVlZHNVcGRhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndlYkxheWVyM0QhLnVwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCB7IHJlYWN0aXZlLCByZWFkb25seSB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCBWdWVBcHAgZnJvbSBcIi4uL1Z1ZUFwcFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIGRhdGEge1xuICAgIGNvdW50OiBudW1iZXJcbn1cblxuZXhwb3J0IGNsYXNzIFN0b3JlIHtcbiAgICBfc3RhdGU6IGRhdGFcbiAgICBzdGF0ZTogZGF0YVxuICAgIGFwcDogVnVlQXBwXG4gICAgY29uc3RydWN0b3IoYXBwOiBWdWVBcHApIHtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSByZWFjdGl2ZSh7XG4gICAgICAgICAgICBjb3VudDogMFxuICAgICAgICB9KVxuICAgICAgICB0aGlzLmFwcCA9IGFwcFxuICAgICAgICB0aGlzLnN0YXRlID0gcmVhZG9ubHkodGhpcy5fc3RhdGUpXG4gICAgfSAgICBcblxuICAgIGluY3JlbWVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYXBwLnRha2VPd25lcnNoaXAoKSkge1xuICAgICAgICAgICAgdGhpcy5fc3RhdGUuY291bnQrKztcbiAgICAgICAgICAgIHRoaXMuYXBwLnNldFNoYXJlZERhdGEodGhpcy5zdGF0ZSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICB1cGRhdGVTaGFyZWREYXRhKGRhdGFPYmplY3Q6IGRhdGEpIHtcbiAgICAgICAgLy8gbmVlZCB0byB1cGRhdGUgdGhlIGVsZW1lbnRzIHdpdGhpbiB0aGUgc3RhdGUsIGJlY2F1c2Ugb3RoZXJ3aXNlXG4gICAgICAgIC8vIHRoZSBkYXRhIHdvbid0IGZsb3cgdG8gdGhlIGNvbXBvbmVudHNcbiAgICAgICAgdGhpcy5fc3RhdGUuY291bnQgPSBkYXRhT2JqZWN0LmNvdW50XG4gICAgfVxufSIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuaW1wb3J0IHtkYXRhIGFzIFNoYXJlZERhdGEsIFN0b3JlfSBmcm9tIFwiLi9zaGFyZWRcIlxuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBzaGFyZWQ6IFN0b3JlXG4gICAgXG4gICAgY29uc3RydWN0b3IgKHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCA0MDAsIDQ3NSwgcGFyYW1zKVxuXG4gICAgICAgIC8vIGNyZWF0ZSBvdXIgc2hhcmVkIGRhdGEgb2JqZWN0IHRoYXQgd2lsbFxuICAgICAgICAvLyBzaGFyZSBkYXRhIGJldHdlZW4gdnVlIGFuZCBodWJzXG4gICAgICAgIHRoaXMuc2hhcmVkID0gbmV3IFN0b3JlKHRoaXMpXG4gICAgICAgIHRoaXMudnVlQXBwLnByb3ZpZGUoJ3NoYXJlZCcsIHRoaXMuc2hhcmVkKVxuXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNOZXR3b3JrZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzU3RhdGljID0gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZVNoYXJlZERhdGEoZGF0YU9iamVjdDogU2hhcmVkRGF0YSkge1xuICAgICAgICBzdXBlci51cGRhdGVTaGFyZWREYXRhKGRhdGFPYmplY3QpXG4gICAgICAgIHRoaXMuc2hhcmVkLnVwZGF0ZVNoYXJlZERhdGEoZGF0YU9iamVjdClcbiAgICB9XG5cbiAgICBnZXRTaGFyZWREYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWQuc3RhdGU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdFxuIiwiPHRlbXBsYXRlPlxuICA8aDEgeHItbGF5ZXIgY2xhc3M9XCJmYWRlXCI+e3sgbXNnIH19PC9oMT5cblxuICA8cD5cbiAgICA8YSBocmVmPVwiaHR0cHM6Ly92aXRlanMuZGV2L2d1aWRlL2ZlYXR1cmVzLmh0bWxcIiB0YXJnZXQ9XCJfYmxhbmtcIj5cbiAgICAgIFZpdGUgRG9jdW1lbnRhdGlvbiBhbmQgVGhlbiBTb21lISBcbiAgICA8L2E+XG4gICAgfFxuICAgIDxhIGhyZWY9XCJodHRwczovL3YzLnZ1ZWpzLm9yZy9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5WdWUgMyBEb2N1bWVudGF0aW9uPC9hPlxuICA8L3A+XG5cbiAgPGJ1dHRvbiB4ci1sYXllciBAY2xpY2s9XCJzdGF0ZS5jb3VudCsrXCI+Y291bnQgaXM6IHt7IHN0YXRlLmNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgcmVhY3RpdmUgfSBmcm9tICd2dWUnXG5cbmRlZmluZVByb3BzKHtcbiAgbXNnOiBTdHJpbmdcbn0pXG5cbmNvbnN0IHN0YXRlID0gcmVhY3RpdmUoeyBjb3VudDogMCB9KVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5hIHtcbiAgY29sb3I6ICNiNTQyYjk7XG59XG5cbi5mYWRlIHtcbiAgY29sb3I6ICM5ODAzYTU7XG4gIC8qIHRyYW5zaXRpb246IGNvbG9yIDFzOyAqL1xufVxuXG4uZmFkZTpob3ZlciB7XG4gIGNvbG9yOiAjMDZhNzFiO1xufVxuPC9zdHlsZT5cblxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwidG9wXCI+XG4gICAgICA8aW1nIGFsdD1cIlZ1ZSBsb2dvXCIgc3JjPVwiLi4vLi4vYXNzZXRzL2xvZ28ucG5nXCIgLz5cbiAgICAgIDxIZWxsb1dvcmxkIG1zZz1cIlZ1ZSBDb21wb25lbnQgd2l0aCBMb2NhbCBCdXR0b24gQ291bnRcIiAvPlxuICAgICAgPHAgaWQ9XCJlZGl0XCIgdi1iaW5kOmNsYXNzPVwieyB1cGNsb3NlOiBzaGFyZWQuc3RhdGUuY2xvc2UgfVwiIHhyLWxheWVyPlxuICAgICAgICBFZGl0IGNvZGUgaW4gPGNvZGU+c3JjL2FwcHM8L2NvZGU+IHRvIHRlc3QgaG90IG1vZHVsZSByZXBsYWNlbWVudCB3aGlsZSBydW5uaW5nIHByb2plY3QgYXMgXCJucG0gcnVuIGRldlwiLlxuICAgICAgPC9wPlxuXG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBIZWxsb1dvcmxkIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSGVsbG9Xb3JsZC52dWUnXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5cbmltcG9ydCB7IGluamVjdCB9IGZyb20gJ3Z1ZSdcblxuY29uc3Qgc2hhcmVkID0gaW5qZWN0KCdzaGFyZWQnKVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG4jZWRpdCB7XG4gIGNvbG9yOiAjMDAwMDAwO1xufVxuXG4jZWRpdC51cGNsb3NlIHtcbiAgY29sb3I6ICNjMDAzMDM7XG59XG48L3N0eWxlPlxuIiwiaW1wb3J0IHsgcmVhY3RpdmUsIHJlYWRvbmx5IH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IFZ1ZUFwcCBmcm9tIFwiLi4vVnVlQXBwXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgZGF0YSB7XG4gICAgY2xvc2U6IGJvb2xlYW5cbn1cblxuZXhwb3J0IGNsYXNzIFN0b3JlIHtcbiAgICBfc3RhdGU6IGRhdGFcbiAgICBzdGF0ZTogZGF0YVxuICAgIGFwcDogVnVlQXBwXG5cbiAgICBjb25zdHJ1Y3RvcihhcHA6IFZ1ZUFwcCkge1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IHJlYWN0aXZlKHtcbiAgICAgICAgICAgIGNsb3NlOiBmYWxzZVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLmFwcCA9IGFwcFxuICAgICAgICB0aGlzLnN0YXRlID0gcmVhZG9ubHkodGhpcy5fc3RhdGUpXG4gICAgfSAgICBcblxuICAgIHNldENsb3NlKGM6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlLmNsb3NlICE9IGMpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlLmNsb3NlID0gYztcbiAgICAgICAgfVxuICAgIH0gXG59XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcbmltcG9ydCB7ZGF0YSBhcyBTaGFyZWREYXRhLCBTdG9yZX0gZnJvbSBcIi4vc2hhcmVkXCJcbmltcG9ydCB7IFdlYkxheWVyM0RDb250ZW50IH0gZnJvbSBcImV0aGVyZWFsXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIHNoYXJlZDogU3RvcmVcbiAgICBcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHN1cGVyKEFwcCwgNTAwLCA1MDApXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5zaGFyZWQgPSBuZXcgU3RvcmUodGhpcylcbiAgICAgICAgdGhpcy52dWVBcHAucHJvdmlkZSgnc2hhcmVkJywgdGhpcy5zaGFyZWQpXG4gICAgfVxuXG4gICAgZG9jczogV2ViTGF5ZXIzRENvbnRlbnQgfCB1bmRlZmluZWRcbiAgICBib3VuZHNTaXplOiBUSFJFRS5WZWN0b3IzICA9IG5ldyBUSFJFRS5WZWN0b3IzKClcbiAgICBib3VuZHM6IFRIUkVFLkJveDMgPSBuZXcgVEhSRUUuQm94MygpXG5cbiAgICBtb3VudCAoKSB7XG4gICAgICAgIHN1cGVyLm1vdW50KHRydWUpIC8vIHVzZSBldGhlcmVhbFxuXG4gICAgICAgIHRoaXMuZG9jcyA9IHRoaXMud2ViTGF5ZXIzRCEucXVlcnlTZWxlY3RvcignI2VkaXQnKVxuICAgICAgICBpZiAoIXRoaXMuZG9jcykge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiVnVlIGFwcCBuZWVkcyAjZWRpdCBkaXZcIilcbiAgICAgICAgICAgIHJldHVybiBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGFkYXB0ZXIgPSBIdWJzQXBwLnN5c3RlbS5nZXRBZGFwdGVyKHRoaXMuZG9jcykgXG4gICAgICAgIGFkYXB0ZXIub25VcGRhdGUgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmJvdW5kcyA9IGFkYXB0ZXIubWV0cmljcy50YXJnZXQudmlzdWFsQm91bmRzXG4gICAgICAgICAgICB0aGlzLmJvdW5kcy5nZXRTaXplKHRoaXMuYm91bmRzU2l6ZSlcbiAgICAgICAgICAgIHZhciBzaXplID0gTWF0aC5zcXJ0KHRoaXMuYm91bmRzU2l6ZS54ICogdGhpcy5ib3VuZHNTaXplLnggKyB0aGlzLmJvdW5kc1NpemUueSAqIHRoaXMuYm91bmRzU2l6ZS55KVxuICAgICAgICAgICAgaWYgKHRoaXMuc2hhcmVkLnN0YXRlLmNsb3NlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGFyZWQuc2V0Q2xvc2UgKHNpemUgPCAyMTApXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hhcmVkLnNldENsb3NlIChzaXplIDwgMTkwKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kb2NzIS51cGRhdGUoKVxuICAgICAgICB9XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoKVxuICAgIGFwcC5tb3VudCgpIFxuXG4gICAgXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8aDI+e3sgbXNnIH19PC9oMj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBkZWZpbmVQcm9wcywgcmVhY3RpdmUgfSBmcm9tICd2dWUnXG5cbmRlZmluZVByb3BzKHtcbiAgbXNnOiBTdHJpbmdcbn0pXG5cbmNvbnN0IHN0YXRlID0gcmVhY3RpdmUoeyBjb3VudDogMCB9KVxuPC9zY3JpcHQ+IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8VGl0bGUgdi1iaW5kOm1zZz1cIm1lc2dcIiAvPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBpbmplY3QgfSBmcm9tICd2dWUnXG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG5cbmxldCBwYXJhbXMgPSBpbmplY3QoXCJwYXJhbXNcIilcbnZhciBtZXNnID0gcGFyYW1zICYmIHBhcmFtcy5tZXNzYWdlID8gcGFyYW1zLm1lc3NhZ2UgOiBcIlBPUlRBTCBUSVRMRVwiXG48L3NjcmlwdD5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgMTAwLCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxoND57eyBtc2cgfX08L2g0PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IGRlZmluZVByb3BzLCByZWFjdGl2ZSB9IGZyb20gJ3Z1ZSdcblxuZGVmaW5lUHJvcHMoe1xuICBtc2c6IFN0cmluZ1xufSlcblxuY29uc3Qgc3RhdGUgPSByZWFjdGl2ZSh7IGNvdW50OiAwIH0pXG48L3NjcmlwdD4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxUaXRsZSB2LWJpbmQ6bXNnPVwibWVzZ1wiIC8+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IGluamVjdCB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclN1YnRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcblxubGV0IHBhcmFtcyA9IGluamVjdChcInBhcmFtc1wiKVxudmFyIG1lc2cgPSBwYXJhbXMgJiYgcGFyYW1zLm1lc3NhZ2UgPyBwYXJhbXMubWVzc2FnZSA6IFwiUE9SVEFMIFNVQlRJVExFXCJcbjwvc2NyaXB0PlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCAxMDAsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC8zOGQ2ZDdhMWUwMmZjMmY5LnBuZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8VGl0bGUgbXNnPVwiUmVhbGl0eSBNZWRpYVwiIC8+XG5cdDxpbWcgc3JjPVwiLi4vLi4vYXNzZXRzL2ltYWdlcy9yb3R1bmRhLW1hcC5wbmdcIiB3aWR0aD1cIjI1MFwiID5cblx0PGRpdiBjbGFzcz1cImRpc3BsYXl0ZXh0XCI+QVIgYWxsb3dzIHVzIHRvIGV4dGVuZCBvdXIgcGh5c2ljYWwgcmVhbGl0eTsgVlIgY3JlYXRlcyBmb3IgdXMgYSBkaWZmZXJlbnQgcmVhbGl0eS48L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC83YWY3Yjk1YjM1ZmQ3NjE2LmpwZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxUaXRsZSBtc2c9XCJBUiAmIFZSIGFzIHJlYWxpdHkgbWVkaWFcIiAvPlxuXHQ8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWFnZXMvbGFjaW90YXQtVlIuanBnXCIgd2lkdGg9XCIyNTBcIiA+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj4gRWFjaCByZWFsaXR5IG1lZGl1bSBtZWRpYXRlcyBhbmQgcmVtZWRpYXRlcy4gSXQgb2ZmZXJzIGEgbmV3IHJlcHJlc2VudGF0aW9uIG9mIHRoZSB3b3JsZCB0aGF0IHdlIGltcGxpY2l0bHkgY29tcGFyZSBcblx0XHR0byBvdXIgZXhwZXJpZW5jZSBvZiB0aGUgd29ybGQgaW4gaXRzZWxmLCBidXQgYWxzbyB0aHJvdWdoIG90aGVyIG1lZGlhLjwvZGl2PiBcbiAgPC9kaXY+XG4gICA8cD5cbiAgICA8YSBocmVmPVwiaHR0cHM6Ly9yZWFsaXR5bWVkaWEuZGlnaXRhbFwiIHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgU3RhcnQgYXQgdGhlIHJlYWxpdHkgbWVkaWEgc2l0ZS4gXG4gICAgPC9hPlxuICAgIHxcbiAgPC9wPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvN2FiM2Q4NmFmZDQ4ZGJmYi5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgICA8VGl0bGUgbXNnPVwiVGhlIExhQ2lvdGF0IEVmZmVjdFwiIC8+XG4gICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuXHQgIDxpbWcgc3JjPVwiLi4vLi4vYXNzZXRzL2ltYWdlcy9sYWNpb3RhdC5qcGdcIiB3aWR0aD1cIjI1MFwiPlxuXHQgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5GaWxtIGJlY2FtZSBvbmUgb2YgdGhlIG1vc3QgaW1wb3J0YW50IHJlYWxpdHkgXG4gICAgICBtZWRpYSBvZiB0aGUgdHdlbnRpZXRoIGNlbnR1cnksIGFuZCBpbiBzb21lIHdheXMsIGl0IGlzIGEgZm9yZXJ1bm5lciBcbiAgICAgIG9mIHZpcnR1YWwgcmVhbGl0eS48L2Rpdj4gIFxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT4gIFxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCx3aWR0aCxoZWlnaHQpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvOTFmZGZhODExZTc1MmRjOC5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cblx0PGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICAgIDxUaXRsZSBtc2c9XCIzLUQgR3JhcGhpY3MgJiBUcmFja2luZ1wiIC8+XG5cdDxpbWcgc3JjPVwiLi4vLi4vYXNzZXRzL2ltYWdlcy91bmNhbm55LmpwZ1wiIHdpZHRoPVwiMjAwXCI+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj4zLUQgY29tcHV0ZXIgZ3JhcGhpY3MgaGVscCB0byBjb25zdHJ1Y3QgdGhlIHZpc3VhbCBcblx0XHRyZWFsaXRpZXMgb2YgQVIgYW5kIFZSLCB0aGF0IGlzIHBob3RvcmVhbGlzbS4gVGhlIHVuY2FubnkgdmFsbGV5LjwvZGl2PlxuXHQ8L2Rpdj5cblx0PC9kaXY+XG48L3RlbXBsYXRlPlxuXG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvZGMwNWMwNDU0NmE2OWU2NC5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgICA8VGl0bGUgbXNnPVwiUHJlc2VuY2VcIiAvPlxuXHQgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj4gXG5cdCAgPGltZyBzcmM9XCIuLi8uLi9hc3NldHMvaW1hZ2VzL3BhcnRoZW5vbi5wbmdcIiB3aWR0aD1cIjI1MFwiPlxuXHQgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5QcmVzZW5jZSBpbiBWUiBpcyB1c3VhbGx5IGNvbmNlaXZlZCBvZiBhcyBmb3JnZXR0aW5nIHRoYXQgdGhlIG1lZGl1bSBpcyB0aGVyZS4gVGhlIGlkZWEgaXMgdGhhdCBpZiB0aGUgdXNlciBjYW4gYmUgZW50aWNlZCBpbnRvIGJlaGF2aW5nIGFzIGlmIHNoZSB3ZXJlIG5vdCBhd2FyZSBvZiBhbGwgdGhlIGNvbXBsZXggdGVjaG5vbG9neSwgdGhlbiBzaGUgZmVlbHMgcHJlc2VuY2UuPC9kaXY+ICBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCx3aWR0aCxoZWlnaHQpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gICAgPFRpdGxlIG1zZz1cIkdlbnJlc1wiIC8+XG4gICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPiBcblx0ICA8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWFnZXMvcGFydGhlbm9uLnBuZ1wiIHdpZHRoPVwiMjUwXCI+XG5cdCAgPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlJlYWxpdHkgbWVkaWEgYXBwbGljYXRpb25zIG9mdGVuIGZ1bmN0aW9uIGFzIGFkZGl0aW9ucyB0byBlc3RhYmxpc2hlZCBnZW5yZXMuIE1vc3QgY3VycmVudCBBUiBhbmQgVlIgYXBwbGljYXRpb25zIGJlaGF2ZSBsaWtlIGFwcGxpY2F0aW9ucyBvciBhcnRpZmFjdHMgdGhhdCB3ZSBrbm93IGZyb20gZWFybGllciBtZWRpYS48L2Rpdj4gIFxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcihBcHAsd2lkdGgsaGVpZ2h0KVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1KVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICAgIDxUaXRsZSBtc2c9XCJUaGUgRnV0dXJlIG9mIEFSICYgVlJcIiAvPlxuICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cblx0ICA8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWFnZXMvcGFydGhlbm9uLnBuZ1wiIHdpZHRoPVwiMjUwXCI+XG5cdCAgPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlZSIHdpbGwgY29udGludWUgdG8gY29uc3RydWN0IHNwZWNpYWwgcmVhbGl0aWVzLCBhcGFydCBmcm9tIHRoZSBldmVyeWRheS4gVlIgd29ybGRzIHdpbGwgY29udGludWUgdG8gYmUgbWV0YXBob3JpYyB3b3JsZHMuPC9kaXY+ICBcbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLHdpZHRoLGhlaWdodClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgICA8VGl0bGUgbXNnPVwiUHJpdmFjeSBhbmQgUHVibGljIFNwYWNlXCIgLz5cbiAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG5cdCAgPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlBlcnZhc2l2ZSwgYWx3YXlzLW9uIEFSIGFwcGxpY2F0aW9ucyBoYXZlIHRoZSBwb3RlbnRpYWwgdG8gcHJvdmlkZSBjb21wYW5pZXMgb3IgZ292ZXJubWVudCBhdXRob3JpdGllcyBcbiAgICAgIGV2ZW4gbW9yZSBpbmZvcm1hdGlvbiBhbmQgd2l0aCBtb3JlIHByZWNpc2lvbiB0aGFuIG91ciBjdXJyZW50IG1vYmlsZSBhcHBsaWNhdGlvbnMgZG8sIFxuICAgICAgYm90aCBieSBhZ2dyZWdhdGluZyBvdXIgaGFiaXRzIGFzIGNvbnN1bWVycyBhbmQgYnkgaWRlbnRpZnlpbmcgdXMgYXMgaW5kaXZpZHVhbHMuPC9kaXY+ICBcbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLHdpZHRoLGhlaWdodClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgICBcbiAgICA8ZGl2IGNsYXNzPVwicG9zdGVydGl0bGVcIj5BUiAmIFZSIGFzIHJlYWxpdHkgbWVkaWE8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZmx1c2hsZWZ0XCI+XG4gICAgICA8YnI+XG4gICAgICA8aDM+IFNvbWUgb2YgdGhlIGtleSBkaWZmZXJlbmNlcyBiZXR3ZWVuIOKAnGNsYXNzaWPigJ0gVlIgYW5kIEFSPC9oMz5cbiAgICAgIDxicj5cbiAgICAgIDxoMz4gRXh0ZW5kZWQgcmVhbGl0eSAoWFIpIGFuZCB0aGUgaW1tZXJzaXZlIHdlYiA8L2gzPlxuICAgICAgPGJyPlxuICAgICAgPGgzPiBXaGVyZSBBUiBhbmQgVlIgZml0IG9uIE1pbGdyYW0gYW5kIEtpc2hpbm/igJlzIHZpcnR1YWxpdHkgY29udGludXVtPC9oMz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLHdpZHRoLCBoZWlnaHQpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gICAgPFRpdGxlIG1zZz1cIlRoZSBIaXN0b3J5IG9mIFJlYWxpdHkgTWVkaWFcIiAvPlxuICAgICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmx1c2hsZWZ0XCI+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBTb21lIG9mIHRoZSBrZXkgZGlmZmVyZW5jZXMgYmV0d2VlbiDigJxjbGFzc2lj4oCdIFZSIGFuZCBBUjwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBFeHRlbmRlZCByZWFsaXR5IChYUikgYW5kIHRoZSBpbW1lcnNpdmUgd2ViIDwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBXaGVyZSBBUiBhbmQgVlIgZml0IG9uIE1pbGdyYW0gYW5kIEtpc2hpbm/igJlzIHZpcnR1YWxpdHkgY29udGludXVtPC9oMz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj4gXG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcihBcHAsd2lkdGgsaGVpZ2h0KVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1KVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICAgIDxUaXRsZSBtc2c9XCIzLUQgJiBUcmFja2luZ1wiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbHVzaGxlZnRcIj5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFNvbWUgb2YgdGhlIGtleSBkaWZmZXJlbmNlcyBiZXR3ZWVuIOKAnGNsYXNzaWPigJ0gVlIgYW5kIEFSPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IEV4dGVuZGVkIHJlYWxpdHkgKFhSKSBhbmQgdGhlIGltbWVyc2l2ZSB3ZWIgPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFdoZXJlIEFSIGFuZCBWUiBmaXQgb24gTWlsZ3JhbSBhbmQgS2lzaGlub+KAmXMgdmlydHVhbGl0eSBjb250aW51dW08L2gzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PiAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCx3aWR0aCxoZWlnaHQpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gICAgPFRpdGxlIG1zZz1cIlByZXNlbmNlXCIgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsdXNobGVmdFwiPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gU29tZSBvZiB0aGUga2V5IGRpZmZlcmVuY2VzIGJldHdlZW4g4oCcY2xhc3NpY+KAnSBWUiBhbmQgQVI8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gRXh0ZW5kZWQgcmVhbGl0eSAoWFIpIGFuZCB0aGUgaW1tZXJzaXZlIHdlYiA8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gV2hlcmUgQVIgYW5kIFZSIGZpdCBvbiBNaWxncmFtIGFuZCBLaXNoaW5v4oCZcyB2aXJ0dWFsaXR5IGNvbnRpbnV1bTwvaDM+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+ICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLHdpZHRoLGhlaWdodClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgICA8VGl0bGUgbXNnPVwiR2VucmVzXCIgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsdXNobGVmdFwiPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gU29tZSBvZiB0aGUga2V5IGRpZmZlcmVuY2VzIGJldHdlZW4g4oCcY2xhc3NpY+KAnSBWUiBhbmQgQVI8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gRXh0ZW5kZWQgcmVhbGl0eSAoWFIpIGFuZCB0aGUgaW1tZXJzaXZlIHdlYiA8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gV2hlcmUgQVIgYW5kIFZSIGZpdCBvbiBNaWxncmFtIGFuZCBLaXNoaW5v4oCZcyB2aXJ0dWFsaXR5IGNvbnRpbnV1bTwvaDM+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+ICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLHdpZHRoLGhlaWdodClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgICA8VGl0bGUgbXNnPVwiRnV0dXJlXCIgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsdXNobGVmdFwiPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gU29tZSBvZiB0aGUga2V5IGRpZmZlcmVuY2VzIGJldHdlZW4g4oCcY2xhc3NpY+KAnSBWUiBhbmQgQVI8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gRXh0ZW5kZWQgcmVhbGl0eSAoWFIpIGFuZCB0aGUgaW1tZXJzaXZlIHdlYiA8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gV2hlcmUgQVIgYW5kIFZSIGZpdCBvbiBNaWxncmFtIGFuZCBLaXNoaW5v4oCZcyB2aXJ0dWFsaXR5IGNvbnRpbnV1bTwvaDM+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+ICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLHdpZHRoLGhlaWdodClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgICA8VGl0bGUgbXNnPVwiUHJpdmFjeVwiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbHVzaGxlZnRcIj5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFNvbWUgb2YgdGhlIGtleSBkaWZmZXJlbmNlcyBiZXR3ZWVuIOKAnGNsYXNzaWPigJ0gVlIgYW5kIEFSPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IEV4dGVuZGVkIHJlYWxpdHkgKFhSKSBhbmQgdGhlIGltbWVyc2l2ZSB3ZWIgPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFdoZXJlIEFSIGFuZCBWUiBmaXQgb24gTWlsZ3JhbSBhbmQgS2lzaGlub+KAmXMgdmlydHVhbGl0eSBjb250aW51dW08L2gzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PiAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCx3aWR0aCxoZWlnaHQpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvMTkwOTk0MzcwYWViZTM5NS5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1Jvb201L0FseXgtc3BsYXNoLnBuZ1wiIHdpZHRoPVwiNDAwXCIgPlxuICA8YnI+PGJyPlxuICA8VGl0bGUgbXNnPVwiSGFsZkxpZmU6IEFseXhcIiAvPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+IEZpcnN0IHBlcnNvbiBzaG9vdGVyIGdhbWVzIHN1Y2ggYXMgIDxhIGhyZWY9XCJodHRwczovL3d3dy5oYWxmLWxpZmUuY29tL2VuL2FseXgvXCIgdGFyZ2V0PVwiX2JsYW5rXCI+SGFsZkxpZmU6IEFseXggPC9hPiBoYXZlIGxvbmcgdXNlZCAzLUQgZ3JhcGhpY3MgdG8gY3JlYXRlIGFuIGltbWVyc2l2ZSBleHBlcmllbmNlIGZvciBtaWxsaW9ucyBvZiBwbGF5ZXJzLiBBbmQgZm9yIGRlY2FkZXMsIFxuICAgIHBsYXllcnMgb24gY29tcHV0ZXJzIGFuZCBnYW1lIGNvbnNvbGVzIGhhdmUgeWVhcm5lZCBmb3IgdHJ1ZSBWUiBzbyB0aGF0IHRoZXkgY291bGQgZmFsbCB0aHJvdWdoIHRoZSBzY3JlZW4gaW50byB0aGUgd29ybGRzIG9uIHRoZSBvdGhlciBzaWRlLjwvZGl2PiBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0KVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1KVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxUaXRsZSBtc2c9XCJQb2tlbW9uIEdvXCIgLz5cblx0ICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+UG9rZW1vbiBHbyAoMjAxNikgaXMgcGVyaGFwcyBzdGlsbCB0aGUgYmVzdC1rbm93biBBUiBnYW1lLiBcbiAgICAgIFRoZSBQb2tlbW9uIGZyYW5jaGlzZSB3YXMgYWxyZWFkeSBkZWNhZGVzIG9sZCwgYW5kIHRoaXMgd2FzIGNlcnRhaW5seSBwYXJ0IG9mIHRoZSBcbiAgICAgIGFuc3dlciBmb3IgdGhlIEFSIGdhbWXigJlzIHN1cnByaXNpbmcgaW1wYWN0LiBcbiAgICAgIEl0IHdhcyB0aGUgZmlyc3QgUG9rZW1vbiBnYW1lIG9uIGEgbW9iaWxlIHBob25lIGFuZCB0aGUgZmlyc3QgZnJlZSBQb2tlbW9uIGdhbWUgb24gYW55IHBsYXRmb3JtLlxuICAgIDwvZGl2PiBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8VGl0bGUgbXNnPVwiQmVhdCBTYWJlclwiIC8+XG5cdCAgPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPkJlYXQgU2FiZXIgaXMgYSBWUiByaHl0aG0gZ2FtZSBcbiAgICAgIHdpdGggYSBsaXR0bGUgU3RhciBXYXJzIHRocm93biBpbi4gVGhlIHBsYXllciB1c2VzIGxpZ2h0c2FiZXJzIHRvIGtlZXAgdGhlIGJlYXQuIFxuICAgIDwvZGl2PiBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8VGl0bGUgbXNnPVwiV2Fsa2luZyBEZWFkOiBPdXIgV29ybGRcIiAvPlxuXHQgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5JbiB0aGlzIEFSIHZlcnNpb24gb2YgdGhlIHRyYW5zbWVkaWEgZnJhbmNoaXNlXG4gICAgICBHUFMgaXMgdXNlZCB0byBkZXRlcm1pbmUgeW91ciBsb2NhdGlvbiBpbiB0aGUgd29ybGQuIFlvdXIgbG9jYXRpb24gXG4gICAgICBhbmQgdGhlIHpvbWJpZXMgYXBwZWFyIGluIGFuIGVuaGFuY2VkIEdvb2dsZSBNYXBzIG1hcCBvbiB0aGUgcGhvbmUgc2NyZWVuLlxuICAgIDwvZGl2PiBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8VGl0bGUgbXNnPVwiTGEgQXBwYXJpemlvbmVcIiAvPlxuXHQgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5MaWtlIHZpZGVvIGdhbWVzIGFuZCAzNjAtZGVncmVlIHZpZGVvLCBcbiAgICAgIFZSIGFydCBlbXBoYXNpemVzIGltbWVyc2lvbiBhcyB0aGUgZmVhdHVyZSB0aGF0IG1ha2VzIHRoZSBleHBlcmllbmNlIFxuICAgICAgdW5pcXVlLCBhcyBpbiBhIFZSIHdvcmsgYnkgQ2hyaXN0aWFuIExlbW1lcnogZW50aXRsZWQgTGEgQXBwYXJpemlvbmUgKDIwMTcpLlxuICAgIDwvZGl2PiBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8VGl0bGUgbXNnPVwiTWluZWNyYWZ0IFZSXCIgLz5cblx0ICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+TWluZWNyYWZ0IFZSIGlzIGEgZnVsbHkgaW1tZXJzaXZlLCBcbiAgICAgIGhlYWRzZXQgdmVyc2lvbiBvZiB0aGUgc2FuZGJveCBnYW1lIHRoYXQgYWxyZWFkeSBydW5zIG9uIGNvbXB1dGVycywgZ2FtZSBjb25zb2xlcywgYW5kIG1vYmlsZSBkZXZpY2VzLiBcbiAgICAgIEl0IGlzIGNhbGxlZCBhIFwic2FuZGJveCBnYW1lXCIgYmVjYXVzZSBpdCBwcm92aWRlcyBhbiBpbmRlcGVuZGVudCBlbnZpcm9ubWVudCBpbiB3aGljaCBcbiAgICAgIHBsYXllcnMgY2FuIG1ha2UgdGhlaXIgb3duIHN0cnVjdHVyZXMgYW5kIG9iamVjdHMgb3V0IG9mIHZpcnR1YWwsIExFR08tbGlrZSBibG9ja3MuXG4gICAgPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0KVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1KVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyIGhlYWRsaW5lXCI+XG4gIEFSICYgVlIgR0FNRVNcbiAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlciBoZWFkbGluZVwiPlxuICBBUiAmIFZSIEFSVFxuICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0KVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1KVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8VGl0bGUgbXNnPVwiUHJlc2VuY2VcIiAvPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+UHJlc2VuY2UgaXMgdGhlIGFic2VuY2Ugb2YgbWVkaWF0aW9uLiBJZiB0aGUgdXNlcnMgY2FuIGZvcmdldCB0aGF0IHRoZSBtZWRpdW0gaXMgdGhlcmUsIHRoZW4gdGhleSBmZWVsIHByZXNlbmNlLiA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0KVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDUwMCwgNTAwKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8IS0tIDxUaXRsZSBtc2c9XCJBdXJhXCIgLz4gLS0+XG4gIDxkaXYgY2xhc3M9XCJoZWFkbGluZVwiPkF1cmE8L2Rpdj5cbiAgPGJyPlxuICA8YnI+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5cbiAgICA8cD5JbiAxOTMwcywgV2FsdGVyIEJlbmphbWluIGludHJvZHVjZWQgdGhlIGNvbmNlcHQgb2YgPGVtPmF1cmE8L2VtPiBpbiBUaGUgV29yayBvZiBBcnQgaW4gdGhlIEFnZSBvZiBNZWNoYW5pY2FsIFJlcHJvZHVjdGlvbi4gXG4gIEF1cmEgaXMgdGhlIDxlbT5oZXJlIGFuZCBub3c8L2VtPiB0aGF0IHdvcmsgcG9zc2Vzc2VzIGJlY2F1c2Ugb2YgaXRzIHVuaXF1ZSBoaXN0b3J5IG9mIHByb2R1Y3Rpb24gYW5kIHRyYW5zbWlzc2lub3dvbi4gPC9wPlxuICA8cD5BUiBhcHBsaWNhdGlvbnMgYXJlIG5vdCBwZXJmZWN0IHJlcHJvZHVjdGl2ZSB0ZWNobm9sb2dpZXMsIGFzIHNvbWUgZHJhdyBvbiB0aGUgcGh5c2ljYWwgYW5kIGN1bHR1cmFsIHVuaXF1ZXNuZXNzLCA8ZW0+dGhlIGhlcmUgYW5kIG5vdzwvZW0+IG9mIHBhcnRpY3VsYXIgcGxhY2VzIDwvcD5cbiAgPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNzAwLCA1MDApXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDxUaXRsZSBtc2c9XCJDeWJlcnNpY2tuZXNzIGFuZCB0aGUgbmVnYXR0aW9uIG9mIHByZXNlbmNlXCIgLz5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlxuICAgVGhlIHRlcm0gY3liZXJzaWNrbmVzcywgb3IgdmlzdWFsbHkgaW5kdWNlZCBtb3Rpb24gc2lja25lc3MsIGhhcyBiZWVuIGNvaW5lZCB0byBkZXNjcmliZSBzeW1wdG9tcyBpbmNsdWRpbmcgaGVhZGFjaGUsIG5hdXNlYSwgZXllIHN0cmFpbiwgZGl6emluZXNzLCBmYXRpZ3VlLCBvciBldmVuIHZvbWl0aW5nIHRoYXQgbWF5IG9jY3VyIGR1cmluZyBvciBhZnRlciBleHBvc3VyZSB0byBhIHZpcnR1YWwgZW52aXJvbm1lbnQuIEN5YmVyc2lja25lc3MgaXMgdmlzY2VyYWwgZXZpZGVuY2UgdGhhdCBWUiBpcyBub3QgdGhlIG1lZGl1bSB0byBlbmQgYWxsIG1lZGlhLiBDeWJlcnNpY2tuZXNzIHJlbWluZHMgdGhlIHN1c2NlcHRpYmxlIHVzZXIgb2YgdGhlIG1lZGl1bSBpbiBhIHBvd2VyZnVsIHdheS4gTmF1c2VhIHJlcGxhY2VzIGFzdG9uaXNobWVudC4gIFxuICA8L2Rpdj4gXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg1MDAsIDUwMClcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgPFRpdGxlIG1zZz1cIlByZXNlbmNlIGFuZCBFbXBhdGh5XCIgLz5cbiAgPGJyLz5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlJlc2VhcmNoZXJzIGhhdmUgbG9uZyBwdXJzdWVkIHRoZSBpZGVhIG9mIGVtb3Rpb25hbCByZWFjdGlvbnMgc3VjaCBhcyBlbXBhdGh5IGFzIGEgdGVzdCBvZiBwcmVzZW5jZS4gXG4gVlIgaXMgIHVuZGVyc3Rvb2QgYXMgZ2V0dGluZyB1cyBjbG9zZXIgdG8gdGhlIGF1dGhlbnRpYyBvciB0aGUgcmVhbC4gQnV0IGZvcmdldHRpbmcgdGhlIG1lZGl1bSBpcyBub3QgbmVjZXNzYXJ5IGZvciBhIHNlbnNlIG9mIHByZXNlbmNlLiBQcmVzZW5jZSBjYW4gYmUgdW5kZXJzdG9vZCBpbiBhIG1vcmUgbnVhbmNlZCB3YXkgYXMgYSBsaW1pbmFsIHpvbmUgYmV0d2VlbiBmb3JnZXR0aW5nIGFuZCBhY2tub3dsZWRnaW5nIFZSIGFzIGEgbWVkaXVtLlxuPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg3MDAsIDQwMClcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgPCEtLSA8VGl0bGUgbXNnPVwiUHJlc2VuY2UgYW5kIEVtcGF0aHlcIiAvPiAtLT5cbiAgPGRpdiBjbGFzcz1cImhlYWRsaW5lXCI+UHJlc2VuY2UgYW5kIEVtcGF0aHk8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0KVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDgwMCwgMjAwKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzQ2ZDc3OTNmYTdhYjI0YWQucG5nXCIiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvYmViNjE4ZmZlMzc2OWJiNi5wbmdcIiIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC8xZTRiZGUzMTIzMjUxOTVmLnBuZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8IS0tIDxUaXRsZSBtc2c9XCJQaXQgRXhwZXJpbWVudFwiIC8+IC0tPlxuICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTYvcmlnaHRhcnJvdy5wbmdcIiB3aWR0aD1cIjkwXCIgc3R5bGU9XCJmbG9hdDogcmlnaHRcIj5cblx0PGRpdiBjbGFzcz1cInBvc3RlcnRpdGxlXCI+UHJlc2VuY2UgYW5kIEVtcGF0aHk8L2Rpdj5cbiAgPGJyIC8+XG4gICAgPGJyIC8+XG4gIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi91cGFycm93LnBuZ1wiIHdpZHRoPVwiOTBcIiBzdHlsZT1cImZsb2F0OiByaWdodFwiPlxuXHQ8ZGl2IGNsYXNzPVwicG9zdGVydGl0bGVcIj5NZWFzdXJpbmcgUHJlc2VuY2U8L2Rpdj5cbiAgICA8YnIgLz5cbiAgICAgIDxiciAvPlxuICAgIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi91cmFycm93LnBuZ1wiIHdpZHRoPVwiMTIwXCIgIHN0eWxlPVwiZmxvYXQ6IHJpZ2h0XCI+XG5cdDxkaXYgY2xhc3M9XCJwb3N0ZXJ0aXRsZVwiPkF1cmE8L2Rpdj5cbiAgIFxuXG5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0KVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDUwMCwgNTAwKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzQ5MDU3NTczNzQ5MjMyNTkucG5nXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi9sZmFycm93LnBuZ1wiIHdpZHRoPVwiMjBcIiBzdHlsZT1cImZsb2F0OiBsZWZ0OyBtYXJnaW46IDEwcHhcIj5cbiAgPFRpdGxlIG1zZz1cIlVsdGltYXRlIEVtcGF0aHkgTWFjaGluZVwiIC8+XG4gIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj4zNjA8c3Bhbj4mIzE3Njs8L3NwYW4+IGZpbG0gQ2xvdWRzIE92ZXIgU2lkcmEgY3JlYXRlZCBieSBDaHJpcyBNaWxrIGFuZCBHYWJvIEFyb3JhIHNob3dzIHRoZSBsaWZlIG9mIFN5cmlhbiByZWZ1Z2VlcyBpbiBaYSdhdGFyaSBjYW1wIGluIEpvcmRhbi4gVGhlIGNhbWVyYSBmb2xsb3dzIDEyLXllYXIgb2xkIFNpZHJhIGluIGhlciBldmVyeWRheSBsaWZlLCBhbGxvd2luZyB0aGUgdXNlcnMgdG8gYmUgcHJlc2VudCB3aXRoIFNpZHJhLiA8L2Rpdj5cbiAgPGJyIC8+XG4gIDxibG9ja3F1b3RlIGNsYXNzPVwic3F1YXJlb2ZmXCI+XCJXaGVuIHlvdeKAmXJlIGluc2lkZSBvZiB0aGUgaGVhZHNldCAuIC4gLiB5b3Ugc2VlIGZ1bGwgMzYwIGRlZ3JlZXMsIGluIGFsbCBkaXJlY3Rpb25zLiBBbmQgd2hlbiB5b3XigJlyZSBzaXR0aW5nIHRoZXJlIGluIGhlciByb29tLCB3YXRjaGluZyBoZXIsIHlvdSdyZSBub3Qgd2F0Y2hpbmcgaXQgdGhyb3VnaCBhIHRlbGV2aXNpb24gc2NyZWVuLCB5b3XigJlyZSBub3Qgd2F0Y2hpbmcgaXQgdGhyb3VnaCBhIHdpbmRvdywgeW914oCZcmUgc2l0dGluZyB0aGVyZSB3aXRoIGhlci4gV2hlbiB5b3UgbG9vayBkb3duLCB5b3UncmUgc2l0dGluZyBvbiB0aGUgc2FtZSBncm91bmQgdGhhdCBzaGXigJlzIHNpdHRpbmcgb24uIEFuZCBiZWNhdXNlIG9mIHRoYXQsIHlvdSBmZWVsIGhlciBodW1hbml0eSBpbiBhIGRlZXBlciB3YXkuIFlvdSBlbXBhdGhpemUgd2l0aCBoZXIgaW4gYSBkZWVwZXIgd2F5LiAoTWlsayAyMDE1KVwiPC9ibG9ja3F1b3RlPlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNzAwLCA0MDApXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvYjQ2NGRiZTkwZDYxMzNhYi5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTYvY2xvdWRvdmVyc2lkcmEuanBnXCIgd2lkdGg9XCI3MDBcIiA+XG4gIDwhLS0gPFRpdGxlIG1zZz1cIlVsdGltYXRlIEVtcGF0aHkgTWFjaGluZVwiIC8+IC0tPlxuXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg3MDAsIDUwMClcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgICA8IS0tIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi9ydGFycm93LnBuZ1wiIHdpZHRoPVwiNDAwXCIgPiAtLT5cbiAgPFRpdGxlIG1zZz1cIlRoZSBmdXR1cmUgb2YgbmV3cz9cIiAvPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+Tm9ubmllIGRlIGxhIFBlw7FhJ3MgPGEgaHJlZj1cImh0dHBzOi8vZW1iZWQudGVkLmNvbS90YWxrcy9ub25ueV9kZV9sYV9wZW5hX3RoZV9mdXR1cmVfb2ZfbmV3c192aXJ0dWFsX3JlYWxpdHlcIiB0YXJnZXQ9XCJfYmxhbmtcIj5UZWQgVGFsazwvYT4gY2FsbGVkICdUaGUgZnV0dXJlIG9mIG5ld3M/JycgIGludHJvZHVjZXMgYSBuZXcgZm9ybSBvZiBqb3VybmFsaXNtIHdoZXJlIFZpcnR1YWwgUmVhbGl0eSB0ZWNobm9sb2d5IGlzIHVzZWQgdG8gcHV0IGF1ZGllbmNlIGluc2lkZSB0aGUgc3Rvcmllcy4gSW4gaGVyIHdvcmssIHNoZSBjcmVhdGVkIFZSIHN0b3JpZXMgYWJvdXQgaW1wcmlzb25tZW50IGluIEd1YW50YW5hbW8gYW5kIGh1bmdlciBpbiBMb3MgQW5nZWxlcyB0byBpbmR1Y2UgZW1wYXRoeSBpbiB0aGUgYXVkaWVuY2UuPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNzAwLCA0MDApXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvYjM5MzNmZjM1OWY5NDliYS5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTYvbm9ubmllLnBuZ1wiIHdpZHRoPVwiNzAwXCIgPlxuXG4gIDwhLS0gPFRpdGxlIG1zZz1cIlRoZSBmdXR1cmUgb2YgbmV3cz9cIiAvPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+Tm9ubmllIGRlIGxhIFBlw7FhJ3MgPGEgaHJlZj1cImh0dHBzOi8vZW1iZWQudGVkLmNvbS90YWxrcy9ub25ueV9kZV9sYV9wZW5hX3RoZV9mdXR1cmVfb2ZfbmV3c192aXJ0dWFsX3JlYWxpdHlcIiB0YXJnZXQ9XCJfYmxhbmtcIj5UZWQgVGFsazwvYT4gY2FsbGVkICdUaGUgZnV0dXJlIG9mIG5ld3M/JycgIGludHJvZHVjZXMgYSBuZXcgZm9ybSBvZiBqb3VybmFsaXNtIHdoZXJlIFZpcnR1YWwgUmVhbGl0eSB0ZWNobm9sb2d5IGlzIHVzZWQgdG8gcHV0IGF1ZGllbmNlIGluc2lkZSB0aGUgc3Rvcmllcy4gSW4gaGVyIHdvcmssIHNoZSBjcmVhdGVkIFZSIHN0b3JpZXMgYWJvdXQgaW1wcmlzb25tZW50IGluIEd1YW50YW5hbW8gYW5kIGh1bmdlciBpbiBMb3MgQW5nZWxlcyB0byBpbmR1Y2UgZW1wYXRoeSBpbiB0aGUgYXVkaWVuY2UuPC9kaXY+ICAtLT5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0KVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDcwMCwgNDAwKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICAgIDxUaXRsZSBtc2c9XCJQaXQgRXhwZXJpbWVudFwiIC8+XG4gIFx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlRoZSBwaXQgZXhwZXJpbWVudCBpcyBhIHZpcnR1YWwgZXhwZXJpZW1lbnQgb2Z0ZW4gdXNlZCB0byBldmFsdWF0ZSB0aGUgc2VuY2Ugb2YgcHJlc2VuY2UuIFRoZSB1c2VyIGlzIGdpdmVuIGEgdGFzayB0byBncmFiIGFuIG9iamVjdCBvbiBwbGFuayBhbmQgdGFrZSBpdCB0byB0aGUgb3RoZXIgc2lkZSwgY3Jvc3NpbmcgdGhlIHBpdC4gPC9kaXY+XG5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0KVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDUwMCwgNTAwKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzIxNzZkYzY2ZjVhMDI1NDYucG5nXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi9waXRWUi5wbmdcIiB3aWR0aD1cIjQzNlwiID5cbiAgPCEtLSA8VGl0bGUgbXNnPVwiUGl0IEV4cGVyaW1lbnRcIiAvPiAtLT5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0KVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDQzNiwgMjkzKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8IS0tIDxUaXRsZSBtc2c9XCJQcmVzZW5jZVwiIC8+IC0tPlxuICA8ZGl2IGNsYXNzPVwicG9zdGVydGl0bGVcIj5QcmVzZW5jZTwvZGl2PlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+UHJlc2VuY2UgaXMgYSBraW5kIG9mIGFic2VuY2UsIHRoZSBhYnNlbmNlIG9mIG1lZGlhdGlvbi4gSWYgdGhlIHVzZXJzIGNhbiBmb3JnZXQgdGhhdCB0aGUgbWVkaXVtIGlzIHRoZXJlLCB0aGVuIHRoZXkgZmVlbCBwcmVzZW5jZS4gPC9kaXY+XG4gIFx0PCEtLSA8ZGl2IGNsYXNzPVwicG9zdGVydGl0bGVcIj5QcmVzZW5jZSBpcyBhIGtpbmQgb2YgYWJzZW5jZSwgdGhlIGFic2VuY2Ugb2YgbWVkaWF0aW9uLiBJZiB0aGUgdXNlcnMgY2FuIGZvcmdldCB0aGF0IHRoZSBtZWRpdW0gaXMgdGhlcmUsIHRoZW4gdGhleSBmZWVsIHByZXNlbmNlLiA8L2Rpdj4gLS0+XG4gICAgXHQ8IS0tIDxkaXYgY2xhc3M9XCJoZWFkbGluZVwiPlByZXNlbmNlIGlzIHRoZSBhYnNlbmNlIG9mIG1lZGlhdGlvbi4gSWYgdGhlIHVzZXJzIGNhbiBmb3JnZXQgdGhhdCB0aGUgbWVkaXVtIGlzIHRoZXJlLCB0aGVuIHRoZXkgZmVlbCBwcmVzZW5jZS4gPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+UHJlc2VuY2UgaXMgYSBraW5kIG9mIGFic2VuY2UsIHRoZSBhYnNlbmNlIG9mIG1lZGlhdGlvbi4gSWYgdGhlIHVzZXJzIGNhbiBmb3JnZXQgdGhhdCB0aGUgbWVkaXVtIGlzIHRoZXJlLCB0aGVuIHRoZXkgZmVlbCBwcmVzZW5jZS4gPC9kaXY+IC0tPlxuICAgICAgPGJyIC8+XG4gICAgICA8YnIgLz5cbiAgICAgIFx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiIHN0eWxlPVwiZm9udC1zdHlsZTppdGFsaWNcIj5cIlZSIGFuZCBBUiBjYW5ub3QgZGVjZWl2ZSB0aGVpciB1c2VycyBpbnRvIGJlbGlldmluZyB0aGF0IHRoZXkgYXJlIGhhdmluZyBhIG5vbi1tZWRpYXRlZCBleHBlcmllbmNlLiBCdXQgdGhhdCBpcyBub3QgbmVjZXNzYXJ5IGZvciBhIHNlbnNlIG9mIHByZXNlbmNlLlwiPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuICBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNzAwLCA0MDApXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDxUaXRsZSBtc2c9XCJUcmVlaHVnZ2VyOiBXYXdvbmFcIiAvPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+VHJlZWh1Z2dlcjogV2F3b25hIFZSIGV4cGVyaWVuY2UgdHJhbnNwb3J0cyB0aGUgdXNlcnMgdG8gdGhlIHJlZCBnaWFudCBTZXF1b2lhIHRyZWVzIGZyb20gdGhlIFNlcXVvaWEgTmF0aW9uYWwgUGFyay4gSXQgcHJvdmlkZXMgYSBzZW5zZSBvZiBpbnRpbWFjeSB3aXRoIHRoZSB0cmVlIC0gd2l0aCBpdHMgYmFyaywgd2l0aCB0aGUgY2VsbHMgdGhhdCBtYWtlIHVwIGl0cyBiZWluZy4gVGhlIHZpdmlkbmVzcyBvZiB0aGUgd29yayBpbGx1c3RyYXRlcyA8ZW0+cHJlc2VuY2U8L2VtPi4gPC9kaXY+XG4gIDwhLS0gSW4gdGhpcyBleHBlcmllbmNlLCB1c2VycyBmaW5kIHRoZW1zZWx2ZXMgb24gdGhlIHRocmVzaG9sZCBvZiBmb3JnZXR0aW5nIHRoYXQgd2UgYXJlIGhhdmluZyBhIFZSIGV4cGVyaWVuY2UuIEJlaW5nIG9uIHRoYXQgdGhyZXNob2xkIGlzIGEgc2VuY2Ugb2YgcHJlc2VuY2UgaW4gYSByZWFsaXR5IG1lZGl1bS4gLS0+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg0MDAsIDYwMClcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC8yNzNkZWM0N2VjNzYyMzBkLnBuZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICAgIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi90cmVlaHVnZ2VyLnBuZ1wiIHdpZHRoPVwiODAwXCIgPlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoODAwLCA0MDApXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDxUaXRsZSBtc2c9XCJCYWNrIHRvIHRoZSBtYWluIGV4aGliaXRpb25cIiAvPlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDwhLS0gPFRpdGxlIG1zZz1cIlRoZSBmdXR1cmUgb2YgbmV3cz9cIiAvPiAtLT5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlBhcnRoZW5vbiBtb2RlbCBleHBsYW5hdGlvbjwvZGl2PiBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0KVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1KVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0L2E3ZDEyNDRjNGIyM2I3YjAuanBnXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gICAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1Jvb202L3RlcnJhY290dGEuanBnXCIgd2lkdGg9XCI4MDBcIiA+XG5cbiAgPCEtLSA8VGl0bGUgbXNnPVwiVGhlIGZ1dHVyZSBvZiBuZXdzP1wiIC8+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5Ob25uaWUgZGUgbGEgUGXDsWEncyA8YSBocmVmPVwiaHR0cHM6Ly9lbWJlZC50ZWQuY29tL3RhbGtzL25vbm55X2RlX2xhX3BlbmFfdGhlX2Z1dHVyZV9vZl9uZXdzX3ZpcnR1YWxfcmVhbGl0eVwiIHRhcmdldD1cIl9ibGFua1wiPlRlZCBUYWxrPC9hPiBjYWxsZWQgJ1RoZSBmdXR1cmUgb2YgbmV3cz8nJyAgaW50cm9kdWNlcyBhIG5ldyBmb3JtIG9mIGpvdXJuYWxpc20gd2hlcmUgVmlydHVhbCBSZWFsaXR5IHRlY2hub2xvZ3kgaXMgdXNlZCB0byBwdXQgYXVkaWVuY2UgaW5zaWRlIHRoZSBzdG9yaWVzLiBJbiBoZXIgd29yaywgc2hlIGNyZWF0ZWQgVlIgc3RvcmllcyBhYm91dCBpbXByaXNvbm1lbnQgaW4gR3VhbnRhbmFtbyBhbmQgaHVuZ2VyIGluIExvcyBBbmdlbGVzIHRvIGluZHVjZSBlbXBhdGh5IGluIHRoZSBhdWRpZW5jZS48L2Rpdj4gIC0tPlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoODAwLCA1MDApXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxUaXRsZSBtc2c9XCJUZXJyYWNvdHRhIFdhcnJpb3JzIEFSXCIgLz5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlwiVGhlIEZyYW5rbGluIEluc3RpdHV0ZSBpcyB1c2luZyBBUiB0byBlbmhhbmNlIHRoZWlyIFRlcnJhY290dGEgV2FycmlvciBleGhpYml0aW9uIHdoaWNoIHdlcmUgZGlzcGxheWVkIGluIFBoaWxhZGVscGhpYSB1bnRpbCBNYXJjaCAyMDE4LiBUaGUgbXVzZXVt4oCZcyBhcHAsIHBvd2VyZWQgYnkgV2lraXR1ZGUgdGVjaG5vbG9neSwgYWxsb3dzIHZpc2l0b3JzIHRvIHVzZSB0aGVpciBzbWFydHBob25lIHRvIHNjYW4gaXRlbXMgYW5kIHZpc3VhbGl6ZSByaWNoIEFSIGNvbnRlbnQgdG8gbGVhcm4gZXZlbiBtb3JlIGFib3V0IHRoZSBpbnRyaWd1aW5nIGhpc3RvcnkgYmVoaW5kIHRoZSBtYWduaWZpY2VudCBjbGF5IHNvbGRpZXJzLlwiPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg4MDAsIDUwMClcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC9iMmM3NzAwOTY0NGE3ZDQ1LmpwZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICAgIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi90cmVlaHVnZ2VyMi5qcGdcIiB3aWR0aD1cIjYwMFwiID5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0KVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1KVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8VGl0bGUgbXNnPVwiUGl0IEV4cGVyaW1lbnRcIiAvPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+VGhyb3VnaCB0aGUgdmlydHVhbCBwaXQgZXhwZXJpbWVudCwgc3ViamVjdHMgZXhwZXJpZW5jZSBhIGhpZ2hlciBzZW5zZSBvZiBwcmVzZW5jZS4gPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNTAwLCA1MDApXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDxUaXRsZSBtc2c9XCJQaXQgRXhwZXJpbWVudCBJbnN0cnVjdGlvblwiIC8+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5Ucnkgd2Fsa2luZyBhY3Jvc3MgdGhlIHBpdCB3aXRob3V0IGxvc2luZyBiYWxhbmNlIG9yIGZhbGxpbmcuPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg1MDAsIDUwMClcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgPFRpdGxlIG1zZz1cIlZlcnkgY2FyZWZ1bGx5IHN0cmV0Y2ggeW91ciBhcm1zIG91dCBmb3IgYmFsYW5jZS5cIiAvPlxuXHQ8IS0tIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj4gRmlyc3QgcGVyc29uIHNob290ZXIgZ2FtZXMgc3VjaCBhcyAgPGEgaHJlZj1cImh0dHBzOi8vd3d3LmhhbGYtbGlmZS5jb20vZW4vYWx5eC9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5IYWxmTGlmZTogQWx5eCA8L2E+IGhhdmUgbG9uZyB1c2VkIDMtRCBncmFwaGljcyB0byBjcmVhdGUgYW4gaW1tZXJzaXZlIGV4cGVyaWVuY2UgZm9yIG1pbGxpb25zIG9mIHBsYXllcnMuIEFuZCBmb3IgZGVjYWRlcywgXG4gICAgcGxheWVycyBvbiBjb21wdXRlcnMgYW5kIGdhbWUgY29uc29sZXMgaGF2ZSB5ZWFybmVkIGZvciB0cnVlIFZSIHNvIHRoYXQgdGhleSBjb3VsZCBmYWxsIHRocm91Z2ggdGhlIHNjcmVlbiBpbnRvIHRoZSB3b3JsZHMgb24gdGhlIG90aGVyIHNpZGUuPC9kaXY+ICAtLT5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0KVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1KVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8VGl0bGUgbXNnPVwiV2hhdCBkbyB5b3Ugc2VlIG9uIHRoZSBmbG9vciByaWdodCBub3c/XCIgLz5cblx0PCEtLSA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+IEZpcnN0IHBlcnNvbiBzaG9vdGVyIGdhbWVzIHN1Y2ggYXMgIDxhIGhyZWY9XCJodHRwczovL3d3dy5oYWxmLWxpZmUuY29tL2VuL2FseXgvXCIgdGFyZ2V0PVwiX2JsYW5rXCI+SGFsZkxpZmU6IEFseXggPC9hPiBoYXZlIGxvbmcgdXNlZCAzLUQgZ3JhcGhpY3MgdG8gY3JlYXRlIGFuIGltbWVyc2l2ZSBleHBlcmllbmNlIGZvciBtaWxsaW9ucyBvZiBwbGF5ZXJzLiBBbmQgZm9yIGRlY2FkZXMsIFxuICAgIHBsYXllcnMgb24gY29tcHV0ZXJzIGFuZCBnYW1lIGNvbnNvbGVzIGhhdmUgeWVhcm5lZCBmb3IgdHJ1ZSBWUiBzbyB0aGF0IHRoZXkgY291bGQgZmFsbCB0aHJvdWdoIHRoZSBzY3JlZW4gaW50byB0aGUgd29ybGRzIG9uIHRoZSBvdGhlciBzaWRlLjwvZGl2PiAgLS0+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPCEtLSA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTUvQWx5eC1zcGxhc2gucG5nXCIgd2lkdGg9XCI0MDBcIiA+IC0tPlxuPFRpdGxlIG1zZz1cIldlbGNvbWUgdG8gUmVhbGl0eSBNZWRpYSFcIiAvPlxuPGJyPjxicj5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPiBUaGlzIGRpZ2l0YWwgYm9vayBpcyBhIGNvbXBsZW1lbnQgdG8gdGhlIHByaW50ZWQgYm9vayBSZWFsaXR5IE1lZGlhOiBBdWdtZW50ZWQgYW5kIFZpcnR1YWwgUmVhbGl0eSBwdWJsaXNoZWQgYnkgTUlUIFByZXNzLiBUaGUgZGlnaXRhbCB2ZXJzaW9uIHRha2VzIHR3byBmb3JtczogYSB3ZWJzaXRlIGFuZCBhIDNEIGltbWVyc2l2ZSBib29rLCB3aGljaCBhbGxvd3MgeW91IHRvIGdldCBpbnNpZGUgQVIgYW5kIFZSLCB0byBpbmhhYml0IHRoZXNlIHR3byBuZXcgcmVhbGl0eSBtZWRpYS4gWW91IGFyZSBub3cgc3RhbmRpbmcgaW4gdGhlIGVudHJ5IGhhbGwgdG8gdGhlIGltbWVyc2l2ZSBib29rLiBUaGlzIGhhbGwgcHJvdmlkZXMgaW5mb3JtYXRpb24gb24gaG93IHRvIOKAnHJlYWTigJ0gdGhlIGltbWVyc2l2ZSBib29rOiB0aGF0IGlzLCBob3cgdG8gbmF2aWdhdGUgdGhyb3VnaCBpdHMgZ2FsbGVyaWVzIGFuZCBleHBsb3JlIHRoZSBleGhpYml0cyBwcmVzZW50ZWQuIFdoZW4geW91IGFyZSByZWFkeSwgeW91IGNhbiB3YWxrIHRocm91Z2ggdGhlIHBvcnRhbCBhdCB0aGUgZmFyIGVuZCBvZiB0aGlzIGhhbGwgdG8gdGhlIHJvdHVuZGEsIGZyb20gd2hpY2ggeW91IGNhbiB2aXNpdCBhbGwgdGhlIGdhbGxlcmllcy4gPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA4MDApXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvN2EyNGE2ZDMwOWQ0NTNmMi5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL09uYm9hcmRpbmcvcmVhbGl0eU1lZGlhQm9vay5qcGdcIiB3aWR0aD1cIjQwMFwiID5cbiAgPGJyPjxicj5cbiAgPFRpdGxlIG1zZz1cIlJlYWxpdHkgTWVkaWFcIiAvPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+UHVibGlzaGVkIGJ5IDxhIGhyZWY9XCJodHRwczovL21pdHByZXNzLm1pdC5lZHUvYm9va3MvcmVhbGl0eS1tZWRpYVwiPk1JVCBQcmVzczwvYT48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cIm9ibGlxdWUgc3F1YXJlb2ZmXCI+QnkgSmF5IERhdmlkIEJvbHRlciwgTWFyaWEgRW5nYmVyZyBhbmQgQmxhaXIgTWFjSW50eXJlPC9kaXY+IFxuICA8YnI+XG4gIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmYgcXVvdGVcIj5Ib3cgYXVnbWVudGVkIHJlYWxpdHkgYW5kIHZpcnR1YWwgcmVhbGl0eSBhcmUgdGFraW5nIHRoZWlyIHBsYWNlcyBpbiBjb250ZW1wb3JhcnkgbWVkaWEgY3VsdHVyZSBhbG9uZ3NpZGUgZmlsbSBhbmQgdGVsZXZpc2lvbi48L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0KVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgODAwKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzViMTRkYTk2ZTI4ODlmZjIuanBnXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9PbmJvYXJkaW5nL01vemlsbGFIdWJzLmpwZ1wiIHdpZHRoPVwiNDAwXCIgPlxuICA8YnI+PGJyPlxuICA8VGl0bGUgbXNnPVwiVGhlIEh1YnMgUGxhdGZvcm1cIiAvPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+KlJlYWxpdHltZWRpYSogaXMgYnVpbHQgb24gdG9wIG9mIE1vemlsbGEncyBvcGVuLXNvdXJjZSBwbGF0Zm9ybS4gQW4gZXh0ZW5zaXZlIGd1aWRlIHRvIHVzaW5nIE1vemlsbGEgSHVicyBpcyBhdmFpbGFibGUgYXQgPGEgaHJlZj1cImh0dHBzOi8vaHVicy5tb3ppbGxhLmNvbS9kb2NzL2ludHJvLWh1YnMuaHRtbFwiIHRhcmdldD1cImJsYW5rXCI+aW4gdGhlIEh1YnMgdXNlciBkb2N1bWVudGF0aW9uPC9hPi4gSGVyZSBhcmUgdGhlIGhpZ2hsaWdodHM6XG4gIDxicj48YnI+XG5CZWZvcmUgZW50ZXJpbmcsIHlvdSBhcmUgaW4gdGhlIHJvb20ncyBsb2JieS4gRnJvbSBoZXJlLCB5b3UgY2FuIHNlZSBhbmQgaGVhciB3aGF0J3MgZ29pbmcgb24gaW5zaWRlIHRoZSByb29tLCBidXQgeW91IGNhbiBvbmx5IGludGVyYWN0IHdpdGggb3RoZXJzIHVzaW5nIHRleHQgY2hhdC4gXG48YnI+PGJyPlxuPGRpdiBjbGFzcz1cImtleVBvaW50XCI+VG8gZW50ZXIgdGhlIHJvb206PC9kaXY+XG48YnI+XG4tIG9uIGEgZGVza3RvcCBvciBtb2JpbGUgZGV2aWNlLCBmb2xsb3cgdGhlIHByb21wdHMgdG8gc2VsZWN0IGEgbmFtZS9hdmF0YXIgYW5kIGVuYWJsZSB0aGUgbWljLlxuPGJyPlxuLSBvbiBhIFZSIGhlYWRzZXQsIGlmIHlvdSBvcGVuZWQgdGhlIFVSTCBvbiB5b3VyIGRlc2t0b3Agb3Igc21hcnRwaG9uZSwgY2hvb3NlIFwiRW50ZXIgb24gU3RhbmRhbG9uZSBWUlwiIHRvIGNyZWF0ZSBhIGNvZGUgdGhhdCBtYWtlcyBpdCBlYXN5IHRvIG9wZW4gb24geW91ciBzdGFuZGFsb25lIGhlYWRzZXQuIE9wZW4gdGhlIGJyb3dzZXIgaW4geW91ciBWUiBoZWFkc2V0LCBuYXZpZ2F0ZSB0byBodWJzLmxpbmsgYW5kIGVudGVyIHRoZSBjb2RlLlxuPGJyPjxicj5cbjxkaXYgY2xhc3M9XCJrZXlQb2ludFwiPlRvIG5hdmlnYXRlIGluIEh1YnM6PC9kaXY+ICBcbjxicj5cbi1PbiBkZXNrdG9wIHVzZSB5b3VyIFdBU0Qgb3IgYXJyb3cga2V5cyB0byBtb3ZlIGFyb3VuZC4gWW91IGNhbiBhbHNvIHByZXNzIHlvdXIgcmlnaHQgbW91c2UgYnV0dG9uIHRvIHRlbGVwb3J0IHRvIGEgZGlmZmVyZW50IGxvY2F0aW9uLiBSb3RhdGUgeW91ciB2aWV3IHVzaW5nIHRoZSBRIGFuZCBFIGtleXMsIG9yIGhvbGQgZG93biB5b3VyIGxlZnQgbW91c2UgYnV0dG9uIGFuZCBkcmFnLlxuLUZvciBWUiBhbmQgbW9iaWxlIGNvbnRyb2xzLCBzZWUgdGhlIGxpc3Qgb2YgPGEgaHJlZj1cImh0dHBzOi8vaHVicy5tb3ppbGxhLmNvbS9kb2NzL2h1YnMtY29udHJvbHMuaHRtbFwiIHRhcmdldD1cImJsYW5rXCI+SHVicyBjb250cm9scy48L2E+XG48L2Rpdj4gXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDgwMClcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC81ZDQyYmM2YjJhMDc0Y2NkLnBuZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuXG48VGl0bGUgbXNnPVwiRmVhdHVyZXMgaW4gSHVic1wiIC8+XG48YnI+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj4gVGhlIGZpZ3VyZSBiZWxvdyBpbmRpY2F0ZXMgaG93IHRvIG11dGUgeW91ciBtaWNyb3Bob25lLCB0YWtlIHBob3Rvcywgc2hhcmUgeW91ciBzY3JlZW4sIGNyZWF0ZSBtZWRpYSBvYmplY3RzLCBhbmQgc28gb246IDwvZGl2PiBcbiAgICA8YnI+PGJyPlxuICAgIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9PbmJvYXJkaW5nL2h1YnMtdXNlci1pbnRlcmZhY2UucG5nXCIgd2lkdGg9XCI0MDBcIiA+XG5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA4MDApXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG48VGl0bGUgbXNnPVwiSG93IHRvIFVzZSB0aGUgQXVkaW8gUGFkc1wiIC8+XG48YnI+PGJyPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+U3RhbmRpbmcgb24gdGhlIEF1ZGlvIFBhZHMgd2lsbCBzdGFydCB0aGUgbmFycmF0aW9ucyBhYm91dCB0aGUgcm9vbSB5b3UgYXJlIGN1cnJlbnRseSBpbi48L2Rpdj4gXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg0MDAsIDIwMClcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCJdLCJuYW1lcyI6WyJIdWJzQXBwIiwiZXRoZXJlYWwuY3JlYXRlTGF5b3V0U3lzdGVtIiwiV2ViTGF5ZXIzRCIsIlN0b3JlIiwiSHVic0FwcFByb3RvIiwiQXBwIiwiaW5pdCJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQkFBZTs7Ozs7Ozs7O0FDV2Y7Ozs7Ozs7QUFGYztBQUtaO0FBQ0Y7QUFDQSxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ovQjs7OztBQUpjO0FBS2QsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBQztBQUM3QixJQUFJLElBQUksR0FBRyxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxHQUFHLG1EQUFrRDs7Ozs7Ozs7Ozs7OztNQ1o5RSxNQUFNO0lBQ3ZCLGFBQWEsQ0FBZ0I7SUFDN0IsYUFBYSxDQUF5QjtJQUV0QyxLQUFLLENBQVE7SUFDYixNQUFNLENBQVE7SUFFZCxNQUFNLENBQUs7SUFDWCxPQUFPLENBQXFDO0lBRTVDLFlBQWEsR0FBYyxFQUFFLEtBQWEsRUFBRSxNQUFjLEVBQUUsZ0JBQW9CLEVBQUU7UUFDOUUsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3ZELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN2RCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtRQUVwQixJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FB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
