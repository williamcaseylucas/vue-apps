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

const _hoisted_1$U = { id: "room" };
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

pushScopeId("data-v-7010a190");
const _hoisted_1$S = { id: "room" };
const _hoisted_2$Q = /*#__PURE__*/createBaseVNode("img", {
  alt: "Vue logo",
  src: _imports_0$h
}, null, -1 /* HOISTED */);
const _hoisted_3$s = /*#__PURE__*/createTextVNode(" Edit code in ");
const _hoisted_4$l = /*#__PURE__*/createBaseVNode("code", null, "src/apps", -1 /* HOISTED */);
const _hoisted_5$g = /*#__PURE__*/createTextVNode(" to test hot module replacement while running project as \"npm run dev\". ");
const _hoisted_6$6 = [
  _hoisted_3$s,
  _hoisted_4$l,
  _hoisted_5$g
];
popScopeId();


var script$U = {
  setup(__props) {

const shared = inject('shared');

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$S, [
      _hoisted_2$Q,
      createVNode(script$V, { msg: "Vue Component with Local Button Count" }),
      createBaseVNode("p", {
        id: "edit",
        class: normalizeClass({ upclose: unref(shared).state.close }),
        "xr-layer": ""
      }, _hoisted_6$6, 2 /* CLASS */)
    ])
  ]))
}
}

};

script$U.__scopeId = "data-v-7010a190";

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
    constructor(params = {}) {
        super(script$U, 500, 500, params);
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
var init$S = function (params = {}) {
    let app = new HubsApp$S(params);
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
const _hoisted_3$r = /*#__PURE__*/createBaseVNode("div", { class: "displaytext" }, "AR allows us to extend our physical reality; VR creates for us a different reality.", -1 /* HOISTED */);

var script$P = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$P, [
    createVNode(script$T, { msg: "Reality Media" }),
    _hoisted_2$P,
    _hoisted_3$r
  ]))
}
}

};

class HubsApp$P extends HubsApp$U {
    constructor(width, height, params = {}) {
        super(script$P, width, height, params);
        //this.isInteractive = true;
    }
}
var init$P = function (params = {}) {
    let app = new HubsApp$P(300, 475, params);
    app.mount();
    return app;
};

var _imports_0$f = "https://resources.realitymedia.digital/vue-apps/dist/7af7b95b35fd7616.jpg";

const _hoisted_1$O = { id: "room" };
const _hoisted_2$O = { class: "spacer" };
const _hoisted_3$q = /*#__PURE__*/createBaseVNode("img", {
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
      _hoisted_3$q,
      _hoisted_4$k
    ]),
    _hoisted_5$f
  ]))
}
}

};

class HubsApp$O extends HubsApp$U {
    constructor(width, height, params = {}) {
        super(script$O, width, height, params);
        //this.isInteractive = true;
    }
}
var init$O = function (params = {}) {
    let app = new HubsApp$O(300, 475, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$N, width, height, params);
        //this.isInteractive = true;
    }
}
var init$N = function (params = {}) {
    let app = new HubsApp$N(300, 475, params);
    app.mount();
    return app;
};

var _imports_0$d = "https://resources.realitymedia.digital/vue-apps/dist/91fdfa811e752dc8.jpg";

const _hoisted_1$M = { id: "room" };
const _hoisted_2$M = { class: "spacer" };
const _hoisted_3$p = /*#__PURE__*/createBaseVNode("img", {
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
      _hoisted_3$p,
      _hoisted_4$j
    ])
  ]))
}
}

};

class HubsApp$M extends HubsApp$U {
    constructor(width, height, params = {}) {
        super(script$M, width, height, params);
        // this.isInteractive = true;
    }
}
var init$M = function (params = {}) {
    let app = new HubsApp$M(300, 475, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$L, width, height, params);
        //this.isInteractive = true;
    }
}
var init$L = function (params = {}) {
    let app = new HubsApp$L(300, 475, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$K, width, height, params);
        //this.isInteractive = true;
    }
}
var init$K = function (params = {}) {
    let app = new HubsApp$K(300, 475, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$J, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$J = function (params = {}) {
    let app = new HubsApp$J(300, 475, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$I, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$I = function (params = {}) {
    let app = new HubsApp$I(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$H = { id: "room" };
const _hoisted_2$H = /*#__PURE__*/createBaseVNode("div", { class: "postertitle" }, "AR & VR as reality media", -1 /* HOISTED */);
const _hoisted_3$o = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
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
  _hoisted_3$o
];

var script$H = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$H, _hoisted_4$i))
}
}

};

class HubsApp$H extends HubsApp$U {
    constructor(width, height, params = {}) {
        super(script$H, width, height, params);
        // this.isInteractive = true;
    }
}
var init$H = function (params = {}) {
    let app = new HubsApp$H(300, 475, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$G, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$G = function (params = {}) {
    let app = new HubsApp$G(300, 475, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$F, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$F = function (params = {}) {
    let app = new HubsApp$F(300, 475, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$E, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$E = function (params = {}) {
    let app = new HubsApp$E(300, 475, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$D, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$D = function (params = {}) {
    let app = new HubsApp$D(300, 475, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$C, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$C = function (params = {}) {
    let app = new HubsApp$C(300, 475, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$B, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$B = function (params = {}) {
    let app = new HubsApp$B(300, 475, params);
    app.mount();
    return app;
};

var _imports_0$b = "https://resources.realitymedia.digital/vue-apps/dist/190994370aebe395.png";

const _hoisted_1$A = { id: "room" };
const _hoisted_2$A = { class: "spacer" };
const _hoisted_3$n = /*#__PURE__*/createBaseVNode("img", {
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
        _hoisted_3$n,
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
    constructor(width, height, params = {}) {
        super(script$A, width, height, params);
    }
}
var init$A = function (params = {}) {
    let app = new HubsApp$A(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$z = { id: "room" };
const _hoisted_2$z = { class: "spacer" };
const _hoisted_3$m = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Pokemon Go (2016) is perhaps still the best-known AR game. The Pokemon franchise was already decades old, and this was certainly part of the answer for the AR game’s surprising impact. It was the first Pokemon game on a mobile phone and the first free Pokemon game on any platform. ", -1 /* HOISTED */);

var script$z = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$z, [
    createBaseVNode("div", _hoisted_2$z, [
      createVNode(script$T, { msg: "Pokemon Go" }),
      _hoisted_3$m
    ])
  ]))
}
}

};

class HubsApp$z extends HubsApp$U {
    constructor(width, height, params = {}) {
        super(script$z, width, height, params);
        //     this.isInteractive = true;
    }
}
var init$z = function (params = {}) {
    let app = new HubsApp$z(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$y = { id: "room" };
const _hoisted_2$y = { class: "spacer" };
const _hoisted_3$l = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Beat Saber is a VR rhythm game with a little Star Wars thrown in. The player uses lightsabers to keep the beat. ", -1 /* HOISTED */);

var script$y = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$y, [
    createBaseVNode("div", _hoisted_2$y, [
      createVNode(script$T, { msg: "Beat Saber" }),
      _hoisted_3$l
    ])
  ]))
}
}

};

class HubsApp$y extends HubsApp$U {
    constructor(width, height, params = {}) {
        super(script$y, width, height, params);
        // this.isInteractive = true;
    }
}
var init$y = function (params = {}) {
    let app = new HubsApp$y(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$x = { id: "room" };
const _hoisted_2$x = { class: "spacer" };
const _hoisted_3$k = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "In this AR version of the transmedia franchise GPS is used to determine your location in the world. Your location and the zombies appear in an enhanced Google Maps map on the phone screen. ", -1 /* HOISTED */);

var script$x = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$x, [
    createBaseVNode("div", _hoisted_2$x, [
      createVNode(script$T, { msg: "Walking Dead: Our World" }),
      _hoisted_3$k
    ])
  ]))
}
}

};

class HubsApp$x extends HubsApp$U {
    constructor(width, height, params = {}) {
        super(script$x, width, height, params);
        // this.isInteractive = true;
    }
}
var init$x = function (params = {}) {
    let app = new HubsApp$x(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$w = { id: "room" };
const _hoisted_2$w = { class: "spacer" };
const _hoisted_3$j = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Like video games and 360-degree video, VR art emphasizes immersion as the feature that makes the experience unique, as in a VR work by Christian Lemmerz entitled La Apparizione (2017). ", -1 /* HOISTED */);

var script$w = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$w, [
    createBaseVNode("div", _hoisted_2$w, [
      createVNode(script$T, { msg: "La Apparizione" }),
      _hoisted_3$j
    ])
  ]))
}
}

};

class HubsApp$w extends HubsApp$U {
    constructor(width, height, params = {}) {
        super(script$w, width, height, params);
        //this.isInteractive = true;
    }
}
var init$w = function (params = {}) {
    let app = new HubsApp$w(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$v = { id: "room" };
const _hoisted_2$v = { class: "spacer" };
const _hoisted_3$i = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Minecraft VR is a fully immersive, headset version of the sandbox game that already runs on computers, game consoles, and mobile devices. It is called a \"sandbox game\" because it provides an independent environment in which players can make their own structures and objects out of virtual, LEGO-like blocks. ", -1 /* HOISTED */);

var script$v = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$v, [
    createBaseVNode("div", _hoisted_2$v, [
      createVNode(script$T, { msg: "Minecraft VR" }),
      _hoisted_3$i
    ])
  ]))
}
}

};

class HubsApp$v extends HubsApp$U {
    constructor(width, height, params = {}) {
        super(script$v, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$v = function (params = {}) {
    let app = new HubsApp$v(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$u = { id: "room" };
const _hoisted_2$u = { class: "spacer headline" };

var script$u = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$u, [
    createBaseVNode("div", _hoisted_2$u, [
      createVNode(script$T, { msg: "AR & VR GAMES" })
    ])
  ]))
}
}

};

class HubsApp$u extends HubsApp$U {
    constructor(width, height, params = {}) {
        super(script$u, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$u = function (params = {}) {
    let app = new HubsApp$u(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$t = { id: "room" };
const _hoisted_2$t = { class: "spacer headline" };

var script$t = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$t, [
    createBaseVNode("div", _hoisted_2$t, [
      createVNode(script$T, { msg: "AR & VR ART" })
    ])
  ]))
}
}

};

class HubsApp$t extends HubsApp$U {
    constructor(width, height, params = {}) {
        super(script$t, width, height, params);
        //        this.isInteractive = true;
    }
}
var init$t = function (params = {}) {
    let app = new HubsApp$t(600, 475, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$s, width, height, params);
        //this.isInteractive = true;
    }
}
var init$s = function (params = {}) {
    let app = new HubsApp$s(500, 500, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$r, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$r = function (params = {}) {
    let app = new HubsApp$r(700, 500, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$q, width, height, params);
        //    this.isInteractive = true;
    }
}
var init$q = function (params = {}) {
    let app = new HubsApp$q(500, 500, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$p, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$p = function (params = {}) {
    let app = new HubsApp$p(700, 400, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$o, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$o = function (params = {}) {
    let app = new HubsApp$o(800, 200, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$n, width, height, params);
        //     this.isInteractive = true;
    }
}
var init$n = function (params = {}) {
    let app = new HubsApp$n(500, 500, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$m, width, height, params);
        //    this.isInteractive = true;
    }
}
var init$m = function (params = {}) {
    let app = new HubsApp$m(700, 400, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$l, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$l = function (params = {}) {
    let app = new HubsApp$l(700, 500, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$k, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$k = function (params = {}) {
    let app = new HubsApp$k(700, 400, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$j, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$j = function (params = {}) {
    let app = new HubsApp$j(700, 400, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$i, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$i = function (params = {}) {
    let app = new HubsApp$i(500, 500, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$h, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$h = function (params = {}) {
    let app = new HubsApp$h(436, 293, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$g, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$g = function (params = {}) {
    let app = new HubsApp$g(700, 400, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$f, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$f = function (params = {}) {
    let app = new HubsApp$f(400, 600, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$e, width, height, params);
        // this.isInteractive = true;
    }
}
var init$e = function (params = {}) {
    let app = new HubsApp$e(800, 400, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$d, width, height, params);
        // this.isInteractive = true;
    }
}
var init$d = function (params = {}) {
    let app = new HubsApp$d(600, 475, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$c, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$c = function (params = {}) {
    let app = new HubsApp$c(600, 475, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$b, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$b = function (params = {}) {
    let app = new HubsApp$b(800, 500, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$a, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$a = function (params = {}) {
    let app = new HubsApp$a(800, 500, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$9, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$9 = function (params = {}) {
    let app = new HubsApp$9(600, 475, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$8, width, height, params);
    }
}
var init$8 = function (params = {}) {
    let app = new HubsApp$8(500, 500, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$7, width, height, params);
    }
}
var init$7 = function (params = {}) {
    let app = new HubsApp$7(300, 100, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$6, width, height, params);
    }
}
var init$6 = function (params = {}) {
    let app = new HubsApp$6(600, 475, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$5, width, height, params);
    }
}
var init$5 = function (params = {}) {
    let app = new HubsApp$5(600, 475, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$4, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$4 = function (params = {}) {
    let app = new HubsApp$4(600, 800, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$3, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$3 = function (params = {}) {
    let app = new HubsApp$3(600, 800, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$2, width, height, params);
    }
}
var init$2 = function (params = {}) {
    let app = new HubsApp$2(800, 600, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script$1, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$1 = function (params = {}) {
    let app = new HubsApp$1(600, 800, params);
    app.mount();
    return app;
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
    constructor(width, height, params = {}) {
        super(script, width, height, params);
        //  this.isInteractive = true;
    }
}
var init = function (params = {}) {
    let app = new HubsApp(300, 200, params);
    app.mount();
    return app;
};

export { init$s as ARandPresence, init$A as Alyx, init$w as Apparizione, init$t as ArtBanner, init as AudioText, init$r as Aura, init$y as BeatSaber, init$O as Center1, init$N as Center2, init$M as Center3, init$L as Center4, init$K as Center5, init$J as Center6, init$I as Center7, init$p as Empathy, init$o as Empathy_title, init$d as Exit, init$u as GamesBanner, init$1 as HubsFeatures, init$2 as HubsPlatform, init$P as Map, init$m as Milk, init$l as Milk_pic, init$v as Minecraft, init$3 as MitPress, init$H as Monolith1, init$G as Monolith2, init$F as Monolith3, init$E as Monolith4, init$D as Monolith5, init$C as Monolith6, init$B as Monolith7, init$k as Nonnie, init$j as Nonnie_pic, init$c as Parthenon, init$8 as Pit, init$i as PitExperiment, init$7 as PitInstruction, init$h as Pit_pic, init$z as Pokemon, init$Q as PortalSubtitle, init$R as PortalTitle, init$g as Presence, init$n as Presence_map, init$a as Terracotta, init$b as TerracottaPic, init$f as Treehugger, init$e as Treehugger_pic, init$9 as Treehuggerpic2, init$x as WalkingDead, init$4 as Welcome, init$q as cybersickness, init$T as hubsTest1, init$S as hubsTest2, initializeEthereal, init$6 as pitSign1, init$5 as pitSign2, systemTick };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHVicy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Fzc2V0cy9sb2dvLnBuZyIsIi4uLy4uL3NyYy9jb21wb25lbnRzL05ldHdvcmtlZEhlbGxvV29ybGQudnVlIiwiLi4vLi4vc3JjL2FwcHMvVGVzdGluZy9IdWJzVGVzdDEvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Z1ZUFwcC50cyIsIi4uLy4uL3NyYy9hcHBzL0h1YnNBcHAudHMiLCIuLi8uLi9zcmMvYXBwcy9UZXN0aW5nL0h1YnNUZXN0MS9zaGFyZWQudHMiLCIuLi8uLi9zcmMvYXBwcy9UZXN0aW5nL0h1YnNUZXN0MS9odWJzLnRzIiwiLi4vLi4vc3JjL2NvbXBvbmVudHMvSGVsbG9Xb3JsZC52dWUiLCIuLi8uLi9zcmMvYXBwcy9UZXN0aW5nL0h1YnNUZXN0Mi9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvVGVzdGluZy9IdWJzVGVzdDIvc2hhcmVkLnRzIiwiLi4vLi4vc3JjL2FwcHMvVGVzdGluZy9IdWJzVGVzdDIvaHVicy50cyIsIi4uLy4uL3NyYy9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1BvcnRhbC9Qb3J0YWxUaXRsZS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUG9ydGFsL1BvcnRhbFRpdGxlL2h1YnMudHMiLCIuLi8uLi9zcmMvY29tcG9uZW50cy9DZW50ZXJTdWJ0aXRsZS52dWUiLCIuLi8uLi9zcmMvYXBwcy9Qb3J0YWwvUG9ydGFsU3VidGl0bGUvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1BvcnRhbC9Qb3J0YWxTdWJ0aXRsZS9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvcm90dW5kYS1tYXAucG5nIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyX01hcC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyX01hcC9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvbGFjaW90YXQtVlIuanBnIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyMV9JbnRyby9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyMV9JbnRyby9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvbGFjaW90YXQuanBnIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyMl9IaXN0b3J5L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXIyX0hpc3RvcnkvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL3VuY2FubnkuanBnIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyM18zRC1UcmFja2luZy9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyM18zRC1UcmFja2luZy9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvcGFydGhlbm9uLnBuZyIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjRfUHJlc2VuY2UvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjRfUHJlc2VuY2UvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjVfR2VucmVzL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXI1X0dlbnJlcy9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyNl9GdXR1cmUvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjZfRnV0dXJlL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXI3X1ByaXZhY3kvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjdfUHJpdmFjeS9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGgxX0ludHJvL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDFfSW50cm8vaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoMl9IaXN0b3J5L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDJfSGlzdG9yeS9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGgzXzNELVRyYWNraW5nL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDNfM0QtVHJhY2tpbmcvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoNF9QcmVzZW5jZS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGg0X1ByZXNlbmNlL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDVfR2VucmVzL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDVfR2VucmVzL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDZfRnV0dXJlL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDZfRnV0dXJlL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDdfUHJpdmFjeS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGg3X1ByaXZhY3kvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb201L0FseXgtc3BsYXNoLnBuZyIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L0FseXgvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L0FseXgvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L1Bva2Vtb24vQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L1Bva2Vtb24vaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L0JlYXRTYWJlci9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvQmVhdFNhYmVyL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNS9XYWxraW5nRGVhZC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvV2Fsa2luZ0RlYWQvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L0FwcGFyaXppb25lL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNS9BcHBhcml6aW9uZS9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvTWluZWNyYWZ0L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNS9NaW5lY3JhZnQvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L0dhbWVzQmFubmVyL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNS9HYW1lc0Jhbm5lci9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvQXJ0QmFubmVyL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNS9BcnRCYW5uZXIvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0FSYW5kUHJlc2VuY2UvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0FSYW5kUHJlc2VuY2UvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0F1cmEvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0F1cmEvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L2N5YmVyc2lja25lc3MvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L2N5YmVyc2lja25lc3MvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0VtcGF0aHkvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0VtcGF0aHkvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0VtcGF0aHlfdGl0bGUvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0VtcGF0aHlfdGl0bGUvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L3JpZ2h0YXJyb3cucG5nIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvUm9vbTYvdXBhcnJvdy5wbmciLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9Sb29tNi91cmFycm93LnBuZyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L21hcC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvbWFwL2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9Sb29tNi9sZmFycm93LnBuZyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L01pbGsvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L01pbGsvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L2Nsb3Vkb3ZlcnNpZHJhLmpwZyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L01pbGtfcGljL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9NaWxrX3BpYy9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvTm9ubmllL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9Ob25uaWUvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L25vbm5pZS5wbmciLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9Ob25uaWVfcGljL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9Ob25uaWVfcGljL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QaXRFeHBlcmltZW50L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QaXRFeHBlcmltZW50L2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9Sb29tNi9waXRWUi5wbmciLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QaXRfcGljL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QaXRfcGljL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QcmVzZW5jZS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvUHJlc2VuY2UvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1RyZWVodWdnZXIvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1RyZWVodWdnZXIvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L3RyZWVodWdnZXIucG5nIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvVHJlZWh1Z2dlcl9waWMvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1RyZWVodWdnZXJfcGljL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9FeGl0L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9FeGl0L2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QYXJ0aGVub24vQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1BhcnRoZW5vbi9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvUm9vbTYvdGVycmFjb3R0YS5qcGciLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9UZXJyYWNvdHRhUGljL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9UZXJyYWNvdHRhUGljL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9UZXJyYWNvdHRhL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9UZXJyYWNvdHRhL2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9Sb29tNi90cmVlaHVnZ2VyMi5qcGciLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9UcmVlaHVnZ2VyUGljMi9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvVHJlZWh1Z2dlclBpYzIvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb21fUGl0L1BpdC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbV9QaXQvUGl0L2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tX1BpdC9QaXRJbnN0cnVjdGlvbi9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbV9QaXQvUGl0SW5zdHJ1Y3Rpb24vaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb21fUGl0L3BpdFNpZ24xL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tX1BpdC9waXRTaWduMS9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbV9QaXQvcGl0U2lnbjIvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb21fUGl0L3BpdFNpZ24yL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL1dlbGNvbWUvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvV2VsY29tZS9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvT25ib2FyZGluZy9yZWFsaXR5TWVkaWFCb29rLmpwZyIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvTWl0UHJlc3MvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvTWl0UHJlc3MvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL09uYm9hcmRpbmcvTW96aWxsYUh1YnMuanBnIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9IdWJzUGxhdGZvcm0vQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvSHVic1BsYXRmb3JtL2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9PbmJvYXJkaW5nL2h1YnMtdXNlci1pbnRlcmZhY2UucG5nIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9IdWJzRmVhdHVyZXMvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvSHVic0ZlYXR1cmVzL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL0F1ZGlvVGV4dC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9BdWRpb1RleHQvaHVicy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvMWE2YWNlMzc3MTMzZjE0YS5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGgxIHhyLWxheWVyIGNsYXNzPVwiZmFkZVwiPnt7IG1zZyB9fTwvaDE+XG4gIDxwPlxuICAgIEhlcmUncyBzb21lIG1vcmUgdGV4dCBqdXN0IHRvIG1ha2UgdGhpbmdzIG5vdCBibGFuay5cbiAgPC9wPlxuXG4gIDxidXR0b24geHItbGF5ZXIgQGNsaWNrPVwic2hhcmVkLmluY3JlbWVudFwiPmNvdW50IGlzOiB7eyBzaGFyZWQuc3RhdGUuY291bnQgfX08L2J1dHRvbj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBpbmplY3QgfSBmcm9tICd2dWUnXG5cbmRlZmluZVByb3BzKHtcbiAgbXNnOiBTdHJpbmdcbn0pXG5cbmNvbnN0IHNoYXJlZCA9IGluamVjdCgnc2hhcmVkJylcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuYSB7XG4gIGNvbG9yOiAjYjU0MmI5O1xufVxuXG4uZmFkZSB7XG4gIGNvbG9yOiAjOTgwM2E1O1xuICAvKiB0cmFuc2l0aW9uOiBjb2xvciAxczsgKi9cbn1cblxuLmZhZGU6aG92ZXIge1xuICBjb2xvcjogI2E3OGUwNjtcbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gICAgICA8aW1nIGFsdD1cIlZ1ZSBsb2dvXCIgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2xvZ28ucG5nXCIgLz5cbiAgICAgIDxTb21lVGV4dCB2LWJpbmQ6bXNnPVwibWVzZ1wiIC8+XG4gICAgICA8IS0tIDxTb21lVGV4dCBtc2c9XCJOZXR3b3JrZWQgVnVlIENvbXBvbmVudCB3aXRoIFNoYXJlZCBCdXR0b24gQ291bnRcIiAvPiAtLT5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgaW5qZWN0IH0gZnJvbSAndnVlJ1xuaW1wb3J0IFNvbWVUZXh0IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvTmV0d29ya2VkSGVsbG9Xb3JsZC52dWUnXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuXG5sZXQgcGFyYW1zID0gaW5qZWN0KFwicGFyYW1zXCIpXG52YXIgbWVzZyA9IHBhcmFtcyAmJiBwYXJhbXMubWVzZyA/IHBhcmFtcy5tZXNnIDogXCJOZXR3b3JrZWQgVnVlIENvbXBvbmVudCB3aXRoIFNoYXJlZCBCdXR0b24gQ291bnRcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG48L3N0eWxlPlxuIiwiaW1wb3J0IHsgY3JlYXRlQXBwLCBBcHAsIENvbXBvbmVudCwgQ29tcG9uZW50UHVibGljSW5zdGFuY2UgfSBmcm9tIFwidnVlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZ1ZUFwcCB7XG4gICAgdGFrZU93bmVyc2hpcDogICgpID0+IGJvb2xlYW5cbiAgICBzZXRTaGFyZWREYXRhOiAob2JqZWN0OiB7fSkgPT4gYm9vbGVhblxuXG4gICAgd2lkdGg6IG51bWJlclxuICAgIGhlaWdodDogbnVtYmVyXG5cbiAgICB2dWVBcHA6IEFwcFxuICAgIHZ1ZVJvb3Q6IENvbXBvbmVudFB1YmxpY0luc3RhbmNlIHwgdW5kZWZpbmVkXG5cbiAgICBjb25zdHJ1Y3RvciAoQXBwOiBDb21wb25lbnQsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBjcmVhdGVPcHRpb25zOiBhbnkgPXt9KSB7XG4gICAgICAgIHRoaXMudGFrZU93bmVyc2hpcCA9IHRoaXMudGFrZU93bmVyc2hpcFByb3RvLmJpbmQodGhpcylcbiAgICAgICAgdGhpcy5zZXRTaGFyZWREYXRhID0gdGhpcy5zZXRTaGFyZWREYXRhUHJvdG8uYmluZCh0aGlzKVxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGhcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHRcblxuICAgICAgICB0aGlzLnZ1ZUFwcCA9IGNyZWF0ZUFwcChBcHAsIGNyZWF0ZU9wdGlvbnMpXG4gICAgfVxuXG4gICAgbW91bnQoKSB7XG4gICAgfVxuXG4gICAgLy8gZHVtbXkgZnVuY3Rpb25zLCBqdXN0IHRvIGxldCB1cyB1c2UgdGhlIHNhbWVcbiAgICAvLyBkYXRhIHN0b3JlIHdpdGggaHVicyBhbmQgdGhlIHdlYiB0ZXN0aW5nIHNldHVwXG4gICAgdGFrZU93bmVyc2hpcFByb3RvKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgc2V0U2hhcmVkRGF0YVByb3RvKG9iamVjdDoge30pIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufSIsImltcG9ydCB7IGNyZWF0ZUFwcCwgQXBwLCBDb21wb25lbnQsIENvbXBvbmVudFB1YmxpY0luc3RhbmNlIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgU2NlbmUsIEVudGl0eSB9IGZyb20gJ2FmcmFtZSdcbmltcG9ydCB7IEV0aGVyZWFsTGF5b3V0U3lzdGVtLCBXZWJMYXllcjNEIH0gZnJvbSBcImV0aGVyZWFsXCI7XG5pbXBvcnQgVnVlQXBwICBmcm9tIFwiLi9WdWVBcHBcIlxuXG4vLyBjcmVhdGUgaW5pdCBtZXRob2QgZm9yIGV0aGVyZWFsXG5pbXBvcnQgKiBhcyBldGhlcmVhbCBmcm9tICdldGhlcmVhbCdcbmltcG9ydCB7IGNyZWF0ZVByaW50ZXIsIFRoaXNFeHByZXNzaW9uLCBUaHJvd1N0YXRlbWVudCB9IGZyb20gXCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC9saWIvdHlwZXNjcmlwdFwiO1xuaW1wb3J0IHsgY3JlYXRlIH0gZnJvbSBcIm1hdGhqc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZUV0aGVyZWFsKCkge1xuICAgIEh1YnNBcHAuaW5pdGlhbGl6ZUV0aGVyZWFsKClcbn1cblxuLy9USFJFRS5PYmplY3QzRC5EZWZhdWx0TWF0cml4QXV0b1VwZGF0ZSA9IHRydWU7XG5cbmV4cG9ydCBmdW5jdGlvbiBzeXN0ZW1UaWNrKHRpbWU6IG51bWJlciwgZGVsdGFUaW1lOiBudW1iZXIpIHtcbiAgIEh1YnNBcHAuc3lzdGVtVGljayh0aW1lLCBkZWx0YVRpbWUpXG59XG5cbmZ1bmN0aW9uIGNvcHlDYW1lcmEoc291cmNlOiBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSwgdGFyZ2V0OiBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSkge1xuICAgIHNvdXJjZS51cGRhdGVNYXRyaXhXb3JsZCgpXG4gICAgLy9sZXQgb2xkTmFtZSA9IHRhcmdldC5uYW1lXG4gICAgLy90YXJnZXQuY29weShzb3VyY2UsIGZhbHNlKVxuICAgIC8vdGFyZ2V0Lm5hbWUgPSBvbGROYW1lXG5cbiAgICB0YXJnZXQuZm92ID0gc291cmNlLmZvdjtcbiAgICB0YXJnZXQuem9vbSA9IHNvdXJjZS56b29tO1xuXG4gICAgdGFyZ2V0Lm5lYXIgPSBzb3VyY2UubmVhcjtcbiAgICB0YXJnZXQuZmFyID0gc291cmNlLmZhcjtcblxuICAgIHRhcmdldC5hc3BlY3QgPSBzb3VyY2UuYXNwZWN0O1xuXG4gICAgLy8gdGFyZ2V0Lm1hdHJpeFdvcmxkSW52ZXJzZS5jb3B5KCBzb3VyY2UubWF0cml4V29ybGRJbnZlcnNlICk7XG4gICAgLy8gdGFyZ2V0LnByb2plY3Rpb25NYXRyaXguY29weSggc291cmNlLnByb2plY3Rpb25NYXRyaXggKTtcbiAgICAvLyB0YXJnZXQucHJvamVjdGlvbk1hdHJpeEludmVyc2UuY29weSggc291cmNlLnByb2plY3Rpb25NYXRyaXhJbnZlcnNlICk7XG5cbiAgICAvLyB0YXJnZXQudXAuY29weSggc291cmNlLnVwICk7XG5cbiAgICAvLyB0YXJnZXQubWF0cml4LmNvcHkoIHNvdXJjZS5tYXRyaXggKTtcbiAgICAvLyB0YXJnZXQubWF0cml4V29ybGQuY29weSggc291cmNlLm1hdHJpeFdvcmxkICk7XG5cbiAgICAvLyB0YXJnZXQubWF0cml4QXV0b1VwZGF0ZSA9IHNvdXJjZS5tYXRyaXhBdXRvVXBkYXRlO1xuICAgIC8vIHRhcmdldC5tYXRyaXhXb3JsZE5lZWRzVXBkYXRlID0gc291cmNlLm1hdHJpeFdvcmxkTmVlZHNVcGRhdGU7XG5cbiAgICBzb3VyY2UubWF0cml4V29ybGQuZGVjb21wb3NlKCB0YXJnZXQucG9zaXRpb24sIHRhcmdldC5xdWF0ZXJuaW9uLCB0YXJnZXQuc2NhbGUpXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHRhcmdldC5yb3RhdGlvbi5zZXRGcm9tUXVhdGVybmlvbiggdGFyZ2V0LnF1YXRlcm5pb24sIHVuZGVmaW5lZCwgZmFsc2UgKTtcbiAgICB0YXJnZXQudXBkYXRlTWF0cml4KClcbiAgICB0YXJnZXQudXBkYXRlTWF0cml4V29ybGQodHJ1ZSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHVic0FwcCBleHRlbmRzIFZ1ZUFwcCB7XG4gICAgc3RhdGljIHN5c3RlbTogRXRoZXJlYWxMYXlvdXRTeXN0ZW07XG4gICAgc3RhdGljIGV0aGVyZWFsQ2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKClcbiAgICBzdGF0aWMgcGxheWVyQ2FtZXJhOiBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYTtcblxuICAgIGlzRXRoZXJlYWw6IGJvb2xlYW5cbiAgICBpc0ludGVyYWN0aXZlOiBib29sZWFuXG4gICAgaXNOZXR3b3JrZWQ6IGJvb2xlYW5cbiAgICBpc1N0YXRpYzogYm9vbGVhblxuXG4gICAgcHJpdmF0ZSB1cGRhdGVUaW1lOiBudW1iZXJcbiAgICBwcml2YXRlIHJheWNhc3RlcjogVEhSRUUuUmF5Y2FzdGVyXG5cbiAgICBzaXplOiB7XG4gICAgICAgIHdpZHRoOiBudW1iZXIsXG4gICAgICAgIGhlaWdodDogbnVtYmVyXG4gICAgfVxuXG4gICAgLy90YWtlT3duZXJzaGlwOiAgKCkgPT4gYm9vbGVhblxuICAgIC8vc2V0U2hhcmVkRGF0YTogKG9iamVjdDoge30pID0+IGJvb2xlYW5cbiAgICAvL3dpZHRoOiBudW1iZXJcbiAgICAvL2hlaWdodDogbnVtYmVyXG4gICAgLy92dWVBcHA6IEFwcFxuICAgIC8vdnVlUm9vdDogQ29tcG9uZW50UHVibGljSW5zdGFuY2UgfCB1bmRlZmluZWQgXG5cbiAgICB3ZWJMYXllcjNEOiBXZWJMYXllcjNEIHwgdW5kZWZpbmVkXG4gICAgbmVlZHNVcGRhdGU6IGJvb2xlYW4gPSBmYWxzZVxuXG4gICAgaGVhZERpdjogRWxlbWVudFxuXG4gICAgc3RhdGljIGluaXRpYWxpemVFdGhlcmVhbCgpIHtcbiAgICAgICAgbGV0IHNjZW5lOiBTY2VuZSA9IHdpbmRvdy5BUFAuc2NlbmU7XG5cbiAgICAgICAgdGhpcy5ldGhlcmVhbENhbWVyYS5tYXRyaXhBdXRvVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgLy90aGlzLmV0aGVyZWFsQ2FtZXJhLnZpc2libGUgPSBmYWxzZTtcblxuICAgICAgICAvL3NjZW5lLnNldE9iamVjdDNEKFwiZXRoZXJlYWxDYW1lcmFcIiwgdGhpcy5ldGhlcmVhbENhbWVyYSlcblxuICAgICAgICB0aGlzLnBsYXllckNhbWVyYSA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpZXdpbmctY2FtZXJhXCIpIGFzIEVudGl0eSkuZ2V0T2JqZWN0M0QoXCJjYW1lcmFcIikgYXMgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmE7XG5cbiAgICAgICAgLy8ganVzdCBpbiBjYXNlIFwidmlld2luZy1jYW1lcmFcIiBpc24ndCBzZXQgdXAgeWV0IC4uLiB3aGljaCBpdCBcbiAgICAgICAgLy8gc2hvdWxkIGJlLCBidXQganVzdCB0byBiZSBjYXJlZnVsXG4gICAgICAgIHRoaXMuc3lzdGVtID0gZXRoZXJlYWwuY3JlYXRlTGF5b3V0U3lzdGVtKHRoaXMucGxheWVyQ2FtZXJhID8gdGhpcy5wbGF5ZXJDYW1lcmEgOiBzY2VuZS5jYW1lcmEpXG4gICAgICAgIHdpbmRvdy5ldGhTeXN0ZW0gPSB0aGlzLnN5c3RlbVxuXG4gICAgICAgIC8vIGNhbiBjdXN0b21pemUgZWFzaW5nIGV0Y1xuICAgICAgICAvLyBzeXN0ZW0udHJhbnNpdGlvbi5kdXJhdGlvbiA9IDEuNVxuICAgICAgICAvLyBzeXN0ZW0udHJhbnNpdGlvbi5kZWxheSA9IDBcbiAgICAgICAgLy8gc3lzdGVtLnRyYW5zaXRpb24ubWF4V2FpdCA9IDRcbiAgICAgICAgLy8gc3lzdGVtLnRyYW5zaXRpb24uZWFzaW5nID0gZXRoZXJlYWwuZWFzaW5nLmVhc2VPdXRcbiAgICB9XG5cbiAgICBzdGF0aWMgc3lzdGVtVGljayh0aW1lOiBudW1iZXIsIGRlbHRhVGltZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBzY2VuZSA9IHdpbmRvdy5BUFAuc2NlbmU7XG5cbiAgICAgICAgaWYgKCF0aGlzLnBsYXllckNhbWVyYSkge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJDYW1lcmEgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWV3aW5nLWNhbWVyYVwiKSBhcyBFbnRpdHkpLmdldE9iamVjdDNEKFwiY2FtZXJhXCIpIGFzIFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoIXRoaXMucGxheWVyQ2FtZXJhKSByZXR1cm47XG4gICAgXG4gICAgICAgIGNvcHlDYW1lcmEodGhpcy5wbGF5ZXJDYW1lcmEsIHRoaXMuZXRoZXJlYWxDYW1lcmEpXG5cbiAgICAgICAgaWYgKHRoaXMuZXRoZXJlYWxDYW1lcmEgIT0gdGhpcy5zeXN0ZW0udmlld05vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuc3lzdGVtLnZpZXdOb2RlID0gdGhpcy5ldGhlcmVhbENhbWVyYVxuICAgICAgICB9XG5cbiAgICAgICAgc2NlbmUucmVuZGVyZXIuZ2V0U2l6ZShIdWJzQXBwLnN5c3RlbS52aWV3UmVzb2x1dGlvbilcbiAgICAgICAgdGhpcy5zeXN0ZW0udmlld0ZydXN0dW0uc2V0RnJvbVBlcnNwZWN0aXZlUHJvamVjdGlvbk1hdHJpeCh0aGlzLmV0aGVyZWFsQ2FtZXJhLnByb2plY3Rpb25NYXRyaXgpXG5cbiAgICAgICAgLy8gdGljayBtZXRob2QgZm9yIGV0aGVyZWFsXG4gICAgICAgIHRoaXMuc3lzdGVtLnVwZGF0ZShkZWx0YVRpbWUsIHRpbWUpXG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IgKEFwcDogQ29tcG9uZW50LCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSwgY3JlYXRlT3B0aW9uczogYW55ID17fSkge1xuICAgICAgICBcblxuICAgICAgICBpZiAocGFyYW1zLndpZHRoICYmIHBhcmFtcy5oZWlnaHQgJiYgcGFyYW1zLndpZHRoID4gMCAmJiBwYXJhbXMuaGVpZ2h0ID4gMCkge1xuICAgICAgICAgICAgLy8gcmVzZXQgYm90aFxuICAgICAgICAgICAgd2lkdGggPSBwYXJhbXMud2lkdGggICBcbiAgICAgICAgICAgIGhlaWdodCA9IHBhcmFtcy5oZWlnaHRcbiAgICAgICAgfSBlbHNlIGlmICgocGFyYW1zLndpZHRoICYmIHBhcmFtcy53aWR0aCA+IDApIHx8IChwYXJhbXMuaGVpZ2h0ICYmIHBhcmFtcy5oZWlnaHQgPiAwKSkge1xuICAgICAgICAgICAgLy8gc2V0IG9uZSBhbmQgc2NhbGUgdGhlIG90aGVyXG4gICAgICAgICAgICBpZiAocGFyYW1zLndpZHRoICYmIHBhcmFtcy53aWR0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSAocGFyYW1zLndpZHRoIC8gd2lkdGgpICogaGVpZ2h0ICAgIFxuICAgICAgICAgICAgICAgIHdpZHRoID0gcGFyYW1zLndpZHRoICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGFyYW1zLmhlaWdodCAmJiBwYXJhbXMuaGVpZ2h0ID4gMCkge1xuICAgICAgICAgICAgICAgIHdpZHRoID0gKHBhcmFtcy5oZWlnaHQgLyBoZWlnaHQpICogaGVpZ2h0XG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gcGFyYW1zLmhlaWdodFxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBjcmVhdGVPcHRpb25zKVxuICAgICAgICB0aGlzLmlzRXRoZXJlYWwgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnZ1ZUFwcC5wcm92aWRlKCdwYXJhbXMnLCBwYXJhbXMpXG5cbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNOZXR3b3JrZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1N0YXRpYyA9IHRydWU7XG4gICAgICAgIHRoaXMudXBkYXRlVGltZSA9IDEwMFxuICAgICAgICB0aGlzLnJheWNhc3RlciA9IG5ldyBUSFJFRS5SYXljYXN0ZXIoKVxuICAgICAgICAvL3RoaXMud2lkdGggPSB3aWR0aFxuICAgICAgICAvL3RoaXMuaGVpZ2h0ID0gaGVpZ2h0XG4gICAgICAgIHRoaXMuc2l6ZSA9IHsgd2lkdGg6IHdpZHRoLzEwMDAsIGhlaWdodDogaGVpZ2h0LzEwMDB9XG4gICAgICAgIC8vdGhpcy50YWtlT3duZXJzaGlwID0gdGhpcy50YWtlT3duZXJzaGlwUHJvdG8uYmluZCh0aGlzKVxuICAgICAgICAvL3RoaXMuc2V0U2hhcmVkRGF0YSA9IHRoaXMuc2V0U2hhcmVkRGF0YVByb3RvLmJpbmQodGhpcylcblxuICAgICAgICB0aGlzLmhlYWREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICAgIC8vdGhpcy5oZWFkRGl2LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsXCJ3aWR0aDogMTAwJTtoZWlnaHQ6IDEwMCU7XCIpXG5cbiAgICAgICAgLy90aGlzLnZ1ZUFwcCA9IGNyZWF0ZUFwcChBcHAsIGNyZWF0ZU9wdGlvbnMpXG4gICAgfVxuXG4gICAgbW91bnQodXNlRXRoZXJlYWw/OiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuaXNFdGhlcmVhbCA9IHVzZUV0aGVyZWFsID09PSB0cnVlXG4gICAgICAgIFxuICAgICAgICB0aGlzLnZ1ZVJvb3QgPSB0aGlzLnZ1ZUFwcC5tb3VudCh0aGlzLmhlYWREaXYpO1xuICAgICAgICB0aGlzLnZ1ZVJvb3QuJGVsLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsXCJ3aWR0aDogXCIgKyB0aGlzLndpZHRoICsgXCJweDsgaGVpZ2h0OiBcIiArIHRoaXMuaGVpZ2h0ICsgXCJweDtcIilcblxuICAgICAgICAvLyAvLyBhZGQgYSBsaW5rIHRvIHRoZSBzaGFyZWQgY3NzXG4gICAgICAgIGxldCBsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIilcbiAgICAgICAgbC5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC9odWJzLmNzc1wiKVxuICAgICAgICBsLnNldEF0dHJpYnV0ZShcInJlbFwiLCBcInN0eWxlc2hlZXRcIilcbiAgICAgICAgbC5zZXRBdHRyaWJ1dGUoXCJjcm9zc29yaWdpblwiLFwiYW5vbnltb3VzXCIpXG4gICAgICAgIHRoaXMudnVlUm9vdC4kZWwuaW5zZXJ0QmVmb3JlKGwsIHRoaXMudnVlUm9vdC4kZWwuZmlyc3RDaGlsZClcblxuICAgICAgICAvLyBtb3ZlIHRoaXMgaW50byBtZXRob2RcbiAgICAgICAgdGhpcy53ZWJMYXllcjNEID0gbmV3IFdlYkxheWVyM0QodGhpcy52dWVSb290LiRlbCwge1xuICAgICAgICAgICAgYXV0b1JlZnJlc2g6IHRydWUsXG4gICAgICAgICAgICBvbkxheWVyQ3JlYXRlOiB1c2VFdGhlcmVhbCA/IFxuICAgICAgICAgICAgKGxheWVyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWRhcHRlciA9IEh1YnNBcHAuc3lzdGVtLmdldEFkYXB0ZXIobGF5ZXIpXG4gICAgICAgICAgICAgICAgYWRhcHRlci5vcGFjaXR5LmVuYWJsZWQgPSB0cnVlXG4gICAgICAgICAgICAgICAgYWRhcHRlci5vblVwZGF0ZSA9ICgpID0+IGxheWVyLnVwZGF0ZSgpXG4gICAgICAgICAgICB9IDpcbiAgICAgICAgICAgIChsYXllcikgPT4ge30sXG4gICAgICAgICAgICBvbkxheWVyUGFpbnQ6IChsYXllcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU3RhdGljKSB7IHRoaXMubmVlZHNVcGRhdGUgPSB0cnVlIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZXh0dXJlRW5jb2Rpbmc6IFRIUkVFLnNSR0JFbmNvZGluZyxcbiAgICAgICAgICAgIHJlbmRlck9yZGVyT2Zmc2V0OiAwXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldE5ldHdvcmtNZXRob2RzKHRha2VPd25lcnNoaXA6ICgpID0+IGJvb2xlYW4sIHNldFNoYXJlZERhdGE6ICh7fSkgPT4gYm9vbGVhbikge1xuICAgICAgICB0aGlzLnRha2VPd25lcnNoaXAgPSB0YWtlT3duZXJzaGlwO1xuICAgICAgICB0aGlzLnNldFNoYXJlZERhdGEgPSBzZXRTaGFyZWREYXRhO1xuICAgIH1cblxuICAgIC8vIGR1bW15IGZ1bmN0aW9ucywganVzdCB0byBhdm9pZCBlcnJvcnMgaWYgdGhleSBnZXQgY2FsbGVkIGJlZm9yZVxuICAgIC8vIG5ldHdvcmtpbmcgaXMgaW5pdGlhbGl6ZWQsIG9yIGNhbGxlZCB3aGVuIG5ldHdvcmtlZCBpcyBmYWxzZVxuICAgIC8vIHRha2VPd25lcnNoaXBQcm90bygpOiBib29sZWFuIHtcbiAgICAvLyAgICAgcmV0dXJuIHRydWU7XG4gICAgLy8gfVxuXG4gICAgLy8gc2V0U2hhcmVkRGF0YVByb3RvKG9iamVjdDoge30pIHtcbiAgICAvLyAgICAgcmV0dXJuIHRydWU7XG4gICAgLy8gfVxuXG4gICAgLy8gcmVjZWl2ZSBkYXRhIHVwZGF0ZXMuICBzaG91bGQgYmUgb3ZlcnJpZGRlbiBieSBzdWJjbGFzc2VzLCBhbHNvIHJlcXVlc3RzXG4gICAgLy8gdXBkYXRlIG5leHQgdGlja1xuICAgIHVwZGF0ZVNoYXJlZERhdGEoZGF0YU9iamVjdDoge30pIHtcbiAgICAgICAgdGhpcy5uZWVkc1VwZGF0ZSA9IHRydWVcbiAgICB9XG5cbiAgICBnZXRTaXplKCkge1xuICAgICAgICAvLyBpZiAoIXRoaXMuY29tcFN0eWxlcykge1xuICAgICAgICAvLyAgICAgdGhpcy5jb21wU3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy52dWVSb290LiRlbCk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gdmFyIHdpZHRoID0gdGhpcy5jb21wU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ3dpZHRoJylcbiAgICAgICAgLy8gd2lkdGggPSB3aWR0aCAmJiB3aWR0aC5sZW5ndGggPiAwID8gcGFyc2VGbG9hdCh3aWR0aCkgLyAxMDAwOiAxXG4gICAgICAgIC8vIHZhciBoZWlnaHQgPSB0aGlzLmNvbXBTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnaGVpZ2h0JylcbiAgICAgICAgLy8gaGVpZ2h0ID0gaGVpZ2h0ICYmIGhlaWdodC5sZW5ndGggPiAwID8gcGFyc2VGbG9hdChoZWlnaHQpIC8gMTAwMDogMVxuICAgICAgICAvLyB0aGlzLnNpemUgPSB7IHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHR9XG4gICAgICAgIGNvbnNvbGUubG9nIChcImRpdiBzaXplOiB7XCIgKyB0aGlzLnNpemUud2lkdGggKyBcIiwgXCIgKyB0aGlzLnNpemUuaGVpZ2h0ICsgXCJ9XCIpXG4gICAgICAgIHJldHVybiB0aGlzLnNpemVcbiAgICB9XG5cbiAgICAvLyByZWNlaXZlIGRhdGEgdXBkYXRlcy4gIHNob3VsZCBiZSBvdmVycmlkZGVuIGJ5IHN1YmNsYXNzZXNcbiAgICBnZXRTaGFyZWREYXRhKGRhdGFPYmplY3Q6IHt9KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImdldFNoYXJlZERhdGEgc2hvdWxkIGJlIG92ZXJyaWRkZW4gYnkgc3ViY2xhc3Nlc1wiKVxuICAgIH1cbiAgICBcbiAgICAvLyBvdmVycmlkZSB0byBjaGVjayBmb3IgeW91ciBvd24gM0Qgb2JqZWN0cyB0aGF0IGFyZW4ndCB3ZWJMYXllcnNcbiAgICBjbGlja2VkKGV2dDoge29iamVjdDNEOiBUSFJFRS5PYmplY3QzRH0pIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzSW50ZXJhY3RpdmUpIHsgcmV0dXJuIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG9iaiA9IGV2dC5vYmplY3QzRFxuICAgICAgICB0aGlzLnJheWNhc3Rlci5yYXkuc2V0KG9iai5wb3NpdGlvbiwgXG4gICAgICAgICAgICB0aGlzLndlYkxheWVyM0QhLmdldFdvcmxkRGlyZWN0aW9uKG5ldyBUSFJFRS5WZWN0b3IzKCkpLm5lZ2F0ZSgpKVxuICAgICAgICBjb25zdCBoaXQgPSB0aGlzLndlYkxheWVyM0QhLmhpdFRlc3QodGhpcy5yYXljYXN0ZXIucmF5KVxuICAgICAgICBpZiAoaGl0KSB7XG4gICAgICAgICAgaGl0LnRhcmdldC5jbGljaygpXG4gICAgICAgICAgaGl0LnRhcmdldC5mb2N1cygpXG4gICAgICAgICAgY29uc29sZS5sb2coJ2hpdCcsIGhpdC50YXJnZXQsIGhpdC5sYXllcilcbiAgICAgICAgfSAgIFxuICAgIH1cblxuICAgIGRyYWdTdGFydChldnQ6IHt9KSB7XG4gICAgICAgIC8vIG5vdGhpbmcgaGVyZSAuLi4gc3ViY2xhc3Mgc2hvdWxkIG92ZXJyaWRlXG4gICAgfVxuXG4gICAgZHJhZ0VuZCAoZXZ0OiB7fSkge1xuICAgICAgICAvLyBub3RoaW5nIGhlcmUgLi4uIHN1YmNsYXNzIHNob3VsZCBvdmVycmlkZVxuICAgIH1cblxuICAgIHBsYXkoKSB7XG4gICAgICAgIC8vIGlmIHdlIGNhbiBmaWd1cmUgb3V0IGhvdyB0byBwYXVzZSwgdGhlbiByZXN0YXJ0IGhlcmVcbiAgICB9XG5cbiAgICBwYXVzZSgpIHtcbiAgICAgICAgLy8gcGVyaGFwcyBmaWd1cmUgb3V0IGhvdyB0byBwYXVzZSB0aGUgVnVlIGNvbXBvbmVudD9cbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICAvLyBUT0RPOiBkZXN0cm95IHRoZSB2dWUgY29tcG9uZW50IGFuZCBhbnkgcmVzb3VyY2VzLCBldGMuLCBpdCBoYXNcbiAgICB9XG5cbiAgICB0aWNrKHRpbWU6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5pc0V0aGVyZWFsKSB7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBuZWVkc1VwZGF0ZSA9IHRoaXMubmVlZHNVcGRhdGVcbiAgICAgICAgICAgIHRoaXMubmVlZHNVcGRhdGUgPSBmYWxzZVxuICAgICAgICAgICAgaWYgKHRoaXMuaXNTdGF0aWMgJiYgdGhpcy51cGRhdGVUaW1lIDwgdGltZSkge1xuICAgICAgICAgICAgICAgIG5lZWRzVXBkYXRlID0gdHJ1ZVxuICAgICAgICAgICAgICAgIC8vIHdhaXQgYSBiaXQgYW5kIGRvIGl0IGFnYWluLiAgTWF5IGdldCByaWQgb2YgdGhpcyBzb21lIGRheSwgd2UnbGwgc2VlXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUaW1lID0gTWF0aC5yYW5kb20oKSAqIDIwMDAgKyAxMDAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNTdGF0aWMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRpbWUgPSB0aW1lXG4gICAgICAgICAgICAgICAgbmVlZHNVcGRhdGUgPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmVlZHNVcGRhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndlYkxheWVyM0QhLnVwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCB7IHJlYWN0aXZlLCByZWFkb25seSB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCBWdWVBcHAgZnJvbSBcIi4uLy4uL1Z1ZUFwcFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIGRhdGEge1xuICAgIGNvdW50OiBudW1iZXJcbn1cblxuZXhwb3J0IGNsYXNzIFN0b3JlIHtcbiAgICBfc3RhdGU6IGRhdGFcbiAgICBzdGF0ZTogZGF0YVxuICAgIGFwcDogVnVlQXBwXG4gICAgY29uc3RydWN0b3IoYXBwOiBWdWVBcHApIHtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSByZWFjdGl2ZSh7XG4gICAgICAgICAgICBjb3VudDogMFxuICAgICAgICB9KVxuICAgICAgICB0aGlzLmFwcCA9IGFwcFxuICAgICAgICB0aGlzLnN0YXRlID0gcmVhZG9ubHkodGhpcy5fc3RhdGUpXG4gICAgfSAgICBcblxuICAgIGluY3JlbWVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYXBwLnRha2VPd25lcnNoaXAoKSkge1xuICAgICAgICAgICAgdGhpcy5fc3RhdGUuY291bnQrKztcbiAgICAgICAgICAgIHRoaXMuYXBwLnNldFNoYXJlZERhdGEodGhpcy5zdGF0ZSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICB1cGRhdGVTaGFyZWREYXRhKGRhdGFPYmplY3Q6IGRhdGEpIHtcbiAgICAgICAgLy8gbmVlZCB0byB1cGRhdGUgdGhlIGVsZW1lbnRzIHdpdGhpbiB0aGUgc3RhdGUsIGJlY2F1c2Ugb3RoZXJ3aXNlXG4gICAgICAgIC8vIHRoZSBkYXRhIHdvbid0IGZsb3cgdG8gdGhlIGNvbXBvbmVudHNcbiAgICAgICAgdGhpcy5fc3RhdGUuY291bnQgPSBkYXRhT2JqZWN0LmNvdW50XG4gICAgfVxufSIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuaW1wb3J0IHtkYXRhIGFzIFNoYXJlZERhdGEsIFN0b3JlfSBmcm9tIFwiLi9zaGFyZWRcIlxuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBzaGFyZWQ6IFN0b3JlXG4gICAgXG4gICAgY29uc3RydWN0b3IgKHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCA0MDAsIDQ3NSwgcGFyYW1zKVxuXG4gICAgICAgIC8vIGNyZWF0ZSBvdXIgc2hhcmVkIGRhdGEgb2JqZWN0IHRoYXQgd2lsbFxuICAgICAgICAvLyBzaGFyZSBkYXRhIGJldHdlZW4gdnVlIGFuZCBodWJzXG4gICAgICAgIHRoaXMuc2hhcmVkID0gbmV3IFN0b3JlKHRoaXMpXG4gICAgICAgIHRoaXMudnVlQXBwLnByb3ZpZGUoJ3NoYXJlZCcsIHRoaXMuc2hhcmVkKVxuXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNOZXR3b3JrZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzU3RhdGljID0gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZVNoYXJlZERhdGEoZGF0YU9iamVjdDogU2hhcmVkRGF0YSkge1xuICAgICAgICBzdXBlci51cGRhdGVTaGFyZWREYXRhKGRhdGFPYmplY3QpXG4gICAgICAgIHRoaXMuc2hhcmVkLnVwZGF0ZVNoYXJlZERhdGEoZGF0YU9iamVjdClcbiAgICB9XG5cbiAgICBnZXRTaGFyZWREYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWQuc3RhdGU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdFxuIiwiPHRlbXBsYXRlPlxuICA8aDEgeHItbGF5ZXIgY2xhc3M9XCJmYWRlXCI+e3sgbXNnIH19PC9oMT5cblxuICA8cD5cbiAgICA8YSBocmVmPVwiaHR0cHM6Ly92aXRlanMuZGV2L2d1aWRlL2ZlYXR1cmVzLmh0bWxcIiB0YXJnZXQ9XCJfYmxhbmtcIj5cbiAgICAgIFZpdGUgRG9jdW1lbnRhdGlvbiBhbmQgVGhlbiBTb21lISBcbiAgICA8L2E+XG4gICAgfFxuICAgIDxhIGhyZWY9XCJodHRwczovL3YzLnZ1ZWpzLm9yZy9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5WdWUgMyBEb2N1bWVudGF0aW9uPC9hPlxuICA8L3A+XG5cbiAgPGJ1dHRvbiB4ci1sYXllciBAY2xpY2s9XCJzdGF0ZS5jb3VudCsrXCI+Y291bnQgaXM6IHt7IHN0YXRlLmNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgcmVhY3RpdmUgfSBmcm9tICd2dWUnXG5cbmRlZmluZVByb3BzKHtcbiAgbXNnOiBTdHJpbmdcbn0pXG5cbmNvbnN0IHN0YXRlID0gcmVhY3RpdmUoeyBjb3VudDogMCB9KVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5hIHtcbiAgY29sb3I6ICNiNTQyYjk7XG59XG5cbi5mYWRlIHtcbiAgY29sb3I6ICM5ODAzYTU7XG4gIC8qIHRyYW5zaXRpb246IGNvbG9yIDFzOyAqL1xufVxuXG4uZmFkZTpob3ZlciB7XG4gIGNvbG9yOiAjMDZhNzFiO1xufVxuPC9zdHlsZT5cblxuIiwiPHRlbXBsYXRlPlxuPGRpdj5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgICAgIDxpbWcgYWx0PVwiVnVlIGxvZ29cIiBzcmM9XCIuLi8uLi8uLi9hc3NldHMvbG9nby5wbmdcIiAvPlxuICAgICAgPEhlbGxvV29ybGQgbXNnPVwiVnVlIENvbXBvbmVudCB3aXRoIExvY2FsIEJ1dHRvbiBDb3VudFwiIC8+XG4gICAgICA8cCBpZD1cImVkaXRcIiB2LWJpbmQ6Y2xhc3M9XCJ7IHVwY2xvc2U6IHNoYXJlZC5zdGF0ZS5jbG9zZSB9XCIgeHItbGF5ZXI+XG4gICAgICAgIEVkaXQgY29kZSBpbiA8Y29kZT5zcmMvYXBwczwvY29kZT4gdG8gdGVzdCBob3QgbW9kdWxlIHJlcGxhY2VtZW50IHdoaWxlIHJ1bm5pbmcgcHJvamVjdCBhcyBcIm5wbSBydW4gZGV2XCIuXG4gICAgICA8L3A+XG5cbiAgPC9kaXY+XG48L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgSGVsbG9Xb3JsZCBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0hlbGxvV29ybGQudnVlJ1xuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcblxuaW1wb3J0IHsgaW5qZWN0IH0gZnJvbSAndnVlJ1xuXG5jb25zdCBzaGFyZWQgPSBpbmplY3QoJ3NoYXJlZCcpXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbiNlZGl0IHtcbiAgY29sb3I6ICNiZWE3ZDE7XG59XG5cbiNlZGl0LnVwY2xvc2Uge1xuICBjb2xvcjogI2NjMGEwYTtcbn1cbjwvc3R5bGU+XG4iLCJpbXBvcnQgeyByZWFjdGl2ZSwgcmVhZG9ubHkgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgVnVlQXBwIGZyb20gXCIuLi8uLi9WdWVBcHBcIjtcblxuZXhwb3J0IGludGVyZmFjZSBkYXRhIHtcbiAgICBjbG9zZTogYm9vbGVhblxufVxuXG5leHBvcnQgY2xhc3MgU3RvcmUge1xuICAgIF9zdGF0ZTogZGF0YVxuICAgIHN0YXRlOiBkYXRhXG4gICAgYXBwOiBWdWVBcHBcblxuICAgIGNvbnN0cnVjdG9yKGFwcDogVnVlQXBwKSB7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gcmVhY3RpdmUoe1xuICAgICAgICAgICAgY2xvc2U6IGZhbHNlXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuYXBwID0gYXBwXG4gICAgICAgIHRoaXMuc3RhdGUgPSByZWFkb25seSh0aGlzLl9zdGF0ZSlcbiAgICB9ICAgIFxuXG4gICAgc2V0Q2xvc2UoYzogYm9vbGVhbikge1xuICAgICAgICBpZiAodGhpcy5fc3RhdGUuY2xvc2UgIT0gYykge1xuICAgICAgICAgICAgdGhpcy5fc3RhdGUuY2xvc2UgPSBjO1xuICAgICAgICB9XG4gICAgfSBcbn1cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuaW1wb3J0IHtkYXRhIGFzIFNoYXJlZERhdGEsIFN0b3JlfSBmcm9tIFwiLi9zaGFyZWRcIlxuaW1wb3J0IHsgV2ViTGF5ZXIzRENvbnRlbnQgfSBmcm9tIFwiZXRoZXJlYWxcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgc2hhcmVkOiBTdG9yZVxuICAgIFxuICAgIGNvbnN0cnVjdG9yIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgNTAwLCA1MDAsIHBhcmFtcylcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnNoYXJlZCA9IG5ldyBTdG9yZSh0aGlzKVxuICAgICAgICB0aGlzLnZ1ZUFwcC5wcm92aWRlKCdzaGFyZWQnLCB0aGlzLnNoYXJlZClcbiAgICB9XG5cbiAgICBkb2NzOiBXZWJMYXllcjNEQ29udGVudCB8IHVuZGVmaW5lZFxuICAgIGJvdW5kc1NpemU6IFRIUkVFLlZlY3RvcjMgID0gbmV3IFRIUkVFLlZlY3RvcjMoKVxuICAgIGJvdW5kczogVEhSRUUuQm94MyA9IG5ldyBUSFJFRS5Cb3gzKClcblxuICAgIG1vdW50ICgpIHtcbiAgICAgICAgc3VwZXIubW91bnQodHJ1ZSkgLy8gdXNlIGV0aGVyZWFsXG5cbiAgICAgICAgdGhpcy5kb2NzID0gdGhpcy53ZWJMYXllcjNEIS5xdWVyeVNlbGVjdG9yKCcjZWRpdCcpXG4gICAgICAgIGlmICghdGhpcy5kb2NzKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJWdWUgYXBwIG5lZWRzICNlZGl0IGRpdlwiKVxuICAgICAgICAgICAgcmV0dXJuIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgYWRhcHRlciA9IEh1YnNBcHAuc3lzdGVtLmdldEFkYXB0ZXIodGhpcy5kb2NzKSBcbiAgICAgICAgYWRhcHRlci5vblVwZGF0ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYm91bmRzID0gYWRhcHRlci5tZXRyaWNzLnRhcmdldC52aXN1YWxCb3VuZHNcbiAgICAgICAgICAgIHRoaXMuYm91bmRzLmdldFNpemUodGhpcy5ib3VuZHNTaXplKVxuICAgICAgICAgICAgdmFyIHNpemUgPSBNYXRoLnNxcnQodGhpcy5ib3VuZHNTaXplLnggKiB0aGlzLmJvdW5kc1NpemUueCArIHRoaXMuYm91bmRzU2l6ZS55ICogdGhpcy5ib3VuZHNTaXplLnkpXG4gICAgICAgICAgICBpZiAodGhpcy5zaGFyZWQuc3RhdGUuY2xvc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNoYXJlZC5zZXRDbG9zZSAoc2l6ZSA8IDIxMClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGFyZWQuc2V0Q2xvc2UgKHNpemUgPCAxOTApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRvY3MhLnVwZGF0ZSgpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAocGFyYW1zKVxuICAgIGFwcC5tb3VudCgpIFxuXG4gICAgXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8aDI+e3sgbXNnIH19PC9oMj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBkZWZpbmVQcm9wcywgcmVhY3RpdmUgfSBmcm9tICd2dWUnXG5cbmRlZmluZVByb3BzKHtcbiAgbXNnOiBTdHJpbmdcbn0pXG5cbmNvbnN0IHN0YXRlID0gcmVhY3RpdmUoeyBjb3VudDogMCB9KVxuPC9zY3JpcHQ+IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8VGl0bGUgdi1iaW5kOm1zZz1cIm1lc2dcIiAvPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBpbmplY3QgfSBmcm9tICd2dWUnXG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG5cbmxldCBwYXJhbXMgPSBpbmplY3QoXCJwYXJhbXNcIilcbnZhciBtZXNnID0gcGFyYW1zICYmIHBhcmFtcy5tZXNzYWdlID8gcGFyYW1zLm1lc3NhZ2UgOiBcIlBPUlRBTCBUSVRMRVwiXG48L3NjcmlwdD5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgMTAwLCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxoND57eyBtc2cgfX08L2g0PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IGRlZmluZVByb3BzLCByZWFjdGl2ZSB9IGZyb20gJ3Z1ZSdcblxuZGVmaW5lUHJvcHMoe1xuICBtc2c6IFN0cmluZ1xufSlcblxuY29uc3Qgc3RhdGUgPSByZWFjdGl2ZSh7IGNvdW50OiAwIH0pXG48L3NjcmlwdD4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxUaXRsZSB2LWJpbmQ6bXNnPVwibWVzZ1wiIC8+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IGluamVjdCB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclN1YnRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcblxubGV0IHBhcmFtcyA9IGluamVjdChcInBhcmFtc1wiKVxudmFyIG1lc2cgPSBwYXJhbXMgJiYgcGFyYW1zLm1lc3NhZ2UgPyBwYXJhbXMubWVzc2FnZSA6IFwiUE9SVEFMIFNVQlRJVExFXCJcbjwvc2NyaXB0PlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCAxMDAsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC8zOGQ2ZDdhMWUwMmZjMmY5LnBuZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8VGl0bGUgbXNnPVwiUmVhbGl0eSBNZWRpYVwiIC8+XG5cdDxpbWcgc3JjPVwiLi4vLi4vYXNzZXRzL2ltYWdlcy9yb3R1bmRhLW1hcC5wbmdcIiB3aWR0aD1cIjI1MFwiID5cblx0PGRpdiBjbGFzcz1cImRpc3BsYXl0ZXh0XCI+QVIgYWxsb3dzIHVzIHRvIGV4dGVuZCBvdXIgcGh5c2ljYWwgcmVhbGl0eTsgVlIgY3JlYXRlcyBmb3IgdXMgYSBkaWZmZXJlbnQgcmVhbGl0eS48L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgLy90aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzdhZjdiOTViMzVmZDc2MTYuanBnXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPFRpdGxlIG1zZz1cIkFSICZhbXA7IFZSIGFzIHJlYWxpdHkgbWVkaWFcIiAvPlxuXHQ8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWFnZXMvbGFjaW90YXQtVlIuanBnXCIgd2lkdGg9XCIyNTBcIiA+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj4gRWFjaCByZWFsaXR5IG1lZGl1bSBtZWRpYXRlcyBhbmQgcmVtZWRpYXRlcy4gSXQgb2ZmZXJzIGEgbmV3IHJlcHJlc2VudGF0aW9uIG9mIHRoZSB3b3JsZCB0aGF0IHdlIGltcGxpY2l0bHkgY29tcGFyZSBcblx0XHR0byBvdXIgZXhwZXJpZW5jZSBvZiB0aGUgd29ybGQgaW4gaXRzZWxmLCBidXQgYWxzbyB0aHJvdWdoIG90aGVyIG1lZGlhLjwvZGl2PiBcbiAgPC9kaXY+XG4gICA8cD5cbiAgICA8YSBocmVmPVwiaHR0cHM6Ly9yZWFsaXR5bWVkaWEuZGlnaXRhbFwiIHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgU3RhcnQgYXQgdGhlIHJlYWxpdHkgbWVkaWEgc2l0ZS4gXG4gICAgPC9hPlxuICAgIHxcbiAgPC9wPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIC8vdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC83YWIzZDg2YWZkNDhkYmZiLmpwZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICAgIDxUaXRsZSBtc2c9XCJUaGUgTGFDaW90YXQgRWZmZWN0XCIgLz5cbiAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG5cdCAgPGltZyBzcmM9XCIuLi8uLi9hc3NldHMvaW1hZ2VzL2xhY2lvdGF0LmpwZ1wiIHdpZHRoPVwiMjUwXCI+XG5cdCAgPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPkZpbG0gYmVjYW1lIG9uZSBvZiB0aGUgbW9zdCBpbXBvcnRhbnQgcmVhbGl0eSBcbiAgICAgIG1lZGlhIG9mIHRoZSB0d2VudGlldGggY2VudHVyeSwgYW5kIGluIHNvbWUgd2F5cywgaXQgaXMgYSBmb3JlcnVubmVyIFxuICAgICAgb2YgdmlydHVhbCByZWFsaXR5LjwvZGl2PiAgXG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPiAgXG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgICAvL3RoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvOTFmZGZhODExZTc1MmRjOC5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cblx0PGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICAgIDxUaXRsZSBtc2c9XCIzLUQgR3JhcGhpY3MgJmFtcDsgVHJhY2tpbmdcIiAvPlxuXHQ8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWFnZXMvdW5jYW5ueS5qcGdcIiB3aWR0aD1cIjIwMFwiPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+My1EIGNvbXB1dGVyIGdyYXBoaWNzIGhlbHAgdG8gY29uc3RydWN0IHRoZSB2aXN1YWwgXG5cdFx0cmVhbGl0aWVzIG9mIEFSIGFuZCBWUiwgdGhhdCBpcyBwaG90b3JlYWxpc20uIFRoZSB1bmNhbm55IHZhbGxleS48L2Rpdj5cblx0PC9kaXY+XG5cdDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgIC8vIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvZGMwNWMwNDU0NmE2OWU2NC5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgICA8VGl0bGUgbXNnPVwiUHJlc2VuY2VcIiAvPlxuXHQgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj4gXG5cdCAgPGltZyBzcmM9XCIuLi8uLi9hc3NldHMvaW1hZ2VzL3BhcnRoZW5vbi5wbmdcIiB3aWR0aD1cIjI1MFwiPlxuXHQgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5QcmVzZW5jZSBpbiBWUiBpcyB1c3VhbGx5IGNvbmNlaXZlZCBvZiBhcyBmb3JnZXR0aW5nIHRoYXQgdGhlIG1lZGl1bSBpcyB0aGVyZS4gVGhlIGlkZWEgaXMgdGhhdCBpZiB0aGUgdXNlciBjYW4gYmUgZW50aWNlZCBpbnRvIGJlaGF2aW5nIGFzIGlmIHNoZSB3ZXJlIG5vdCBhd2FyZSBvZiBhbGwgdGhlIGNvbXBsZXggdGVjaG5vbG9neSwgdGhlbiBzaGUgZmVlbHMgcHJlc2VuY2UuPC9kaXY+ICBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgLy90aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICAgIDxUaXRsZSBtc2c9XCJHZW5yZXNcIiAvPlxuICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj4gXG5cdCAgPGltZyBzcmM9XCIuLi8uLi9hc3NldHMvaW1hZ2VzL3BhcnRoZW5vbi5wbmdcIiB3aWR0aD1cIjI1MFwiPlxuXHQgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5SZWFsaXR5IG1lZGlhIGFwcGxpY2F0aW9ucyBvZnRlbiBmdW5jdGlvbiBhcyBhZGRpdGlvbnMgdG8gZXN0YWJsaXNoZWQgZ2VucmVzLiBNb3N0IGN1cnJlbnQgQVIgYW5kIFZSIGFwcGxpY2F0aW9ucyBiZWhhdmUgbGlrZSBhcHBsaWNhdGlvbnMgb3IgYXJ0aWZhY3RzIHRoYXQgd2Uga25vdyBmcm9tIGVhcmxpZXIgbWVkaWEuPC9kaXY+ICBcbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgICAvL3RoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gICAgPFRpdGxlIG1zZz1cIlRoZSBGdXR1cmUgb2YgQVIgJmFtcDsgVlJcIiAvPlxuICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cblx0ICA8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWFnZXMvcGFydGhlbm9uLnBuZ1wiIHdpZHRoPVwiMjUwXCI+XG5cdCAgPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlZSIHdpbGwgY29udGludWUgdG8gY29uc3RydWN0IHNwZWNpYWwgcmVhbGl0aWVzLCBhcGFydCBmcm9tIHRoZSBldmVyeWRheS4gVlIgd29ybGRzIHdpbGwgY29udGludWUgdG8gYmUgbWV0YXBob3JpYyB3b3JsZHMuPC9kaXY+ICBcbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gICAgPFRpdGxlIG1zZz1cIlByaXZhY3kgYW5kIFB1YmxpYyBTcGFjZVwiIC8+XG4gICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuXHQgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5QZXJ2YXNpdmUsIGFsd2F5cy1vbiBBUiBhcHBsaWNhdGlvbnMgaGF2ZSB0aGUgcG90ZW50aWFsIHRvIHByb3ZpZGUgY29tcGFuaWVzIG9yIGdvdmVybm1lbnQgYXV0aG9yaXRpZXMgXG4gICAgICBldmVuIG1vcmUgaW5mb3JtYXRpb24gYW5kIHdpdGggbW9yZSBwcmVjaXNpb24gdGhhbiBvdXIgY3VycmVudCBtb2JpbGUgYXBwbGljYXRpb25zIGRvLCBcbiAgICAgIGJvdGggYnkgYWdncmVnYXRpbmcgb3VyIGhhYml0cyBhcyBjb25zdW1lcnMgYW5kIGJ5IGlkZW50aWZ5aW5nIHVzIGFzIGluZGl2aWR1YWxzLjwvZGl2PiAgXG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgLy8gICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICAgIFxuICAgIDxkaXYgY2xhc3M9XCJwb3N0ZXJ0aXRsZVwiPkFSICZhbXA7IFZSIGFzIHJlYWxpdHkgbWVkaWE8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZmx1c2hsZWZ0XCI+XG4gICAgICA8YnI+XG4gICAgICA8aDM+IFNvbWUgb2YgdGhlIGtleSBkaWZmZXJlbmNlcyBiZXR3ZWVuIOKAnGNsYXNzaWPigJ0gVlIgYW5kIEFSPC9oMz5cbiAgICAgIDxicj5cbiAgICAgIDxoMz4gRXh0ZW5kZWQgcmVhbGl0eSAoWFIpIGFuZCB0aGUgaW1tZXJzaXZlIHdlYiA8L2gzPlxuICAgICAgPGJyPlxuICAgICAgPGgzPiBXaGVyZSBBUiBhbmQgVlIgZml0IG9uIE1pbGdyYW0gYW5kIEtpc2hpbm/igJlzIHZpcnR1YWxpdHkgY29udGludXVtPC9oMz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgIC8vIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gICAgPFRpdGxlIG1zZz1cIlRoZSBIaXN0b3J5IG9mIFJlYWxpdHkgTWVkaWFcIiAvPlxuICAgICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmx1c2hsZWZ0XCI+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBTb21lIG9mIHRoZSBrZXkgZGlmZmVyZW5jZXMgYmV0d2VlbiDigJxjbGFzc2lj4oCdIFZSIGFuZCBBUjwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBFeHRlbmRlZCByZWFsaXR5IChYUikgYW5kIHRoZSBpbW1lcnNpdmUgd2ViIDwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBXaGVyZSBBUiBhbmQgVlIgZml0IG9uIE1pbGdyYW0gYW5kIEtpc2hpbm/igJlzIHZpcnR1YWxpdHkgY29udGludXVtPC9oMz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj4gXG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgICA8VGl0bGUgbXNnPVwiMy1EICZhbXA7IFRyYWNraW5nXCIgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsdXNobGVmdFwiPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gU29tZSBvZiB0aGUga2V5IGRpZmZlcmVuY2VzIGJldHdlZW4g4oCcY2xhc3NpY+KAnSBWUiBhbmQgQVI8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gRXh0ZW5kZWQgcmVhbGl0eSAoWFIpIGFuZCB0aGUgaW1tZXJzaXZlIHdlYiA8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gV2hlcmUgQVIgYW5kIFZSIGZpdCBvbiBNaWxncmFtIGFuZCBLaXNoaW5v4oCZcyB2aXJ0dWFsaXR5IGNvbnRpbnV1bTwvaDM+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+ICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gICAgPFRpdGxlIG1zZz1cIlByZXNlbmNlXCIgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsdXNobGVmdFwiPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gU29tZSBvZiB0aGUga2V5IGRpZmZlcmVuY2VzIGJldHdlZW4g4oCcY2xhc3NpY+KAnSBWUiBhbmQgQVI8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gRXh0ZW5kZWQgcmVhbGl0eSAoWFIpIGFuZCB0aGUgaW1tZXJzaXZlIHdlYiA8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gV2hlcmUgQVIgYW5kIFZSIGZpdCBvbiBNaWxncmFtIGFuZCBLaXNoaW5v4oCZcyB2aXJ0dWFsaXR5IGNvbnRpbnV1bTwvaDM+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+ICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gICAgPFRpdGxlIG1zZz1cIkdlbnJlc1wiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbHVzaGxlZnRcIj5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFNvbWUgb2YgdGhlIGtleSBkaWZmZXJlbmNlcyBiZXR3ZWVuIOKAnGNsYXNzaWPigJ0gVlIgYW5kIEFSPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IEV4dGVuZGVkIHJlYWxpdHkgKFhSKSBhbmQgdGhlIGltbWVyc2l2ZSB3ZWIgPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFdoZXJlIEFSIGFuZCBWUiBmaXQgb24gTWlsZ3JhbSBhbmQgS2lzaGlub+KAmXMgdmlydHVhbGl0eSBjb250aW51dW08L2gzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PiAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICAgIDxUaXRsZSBtc2c9XCJGdXR1cmVcIiAvPlxuICAgICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmx1c2hsZWZ0XCI+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBTb21lIG9mIHRoZSBrZXkgZGlmZmVyZW5jZXMgYmV0d2VlbiDigJxjbGFzc2lj4oCdIFZSIGFuZCBBUjwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBFeHRlbmRlZCByZWFsaXR5IChYUikgYW5kIHRoZSBpbW1lcnNpdmUgd2ViIDwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBXaGVyZSBBUiBhbmQgVlIgZml0IG9uIE1pbGdyYW0gYW5kIEtpc2hpbm/igJlzIHZpcnR1YWxpdHkgY29udGludXVtPC9oMz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj4gICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgICA8VGl0bGUgbXNnPVwiUHJpdmFjeVwiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbHVzaGxlZnRcIj5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFNvbWUgb2YgdGhlIGtleSBkaWZmZXJlbmNlcyBiZXR3ZWVuIOKAnGNsYXNzaWPigJ0gVlIgYW5kIEFSPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IEV4dGVuZGVkIHJlYWxpdHkgKFhSKSBhbmQgdGhlIGltbWVyc2l2ZSB3ZWIgPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFdoZXJlIEFSIGFuZCBWUiBmaXQgb24gTWlsZ3JhbSBhbmQgS2lzaGlub+KAmXMgdmlydHVhbGl0eSBjb250aW51dW08L2gzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PiAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzE5MDk5NDM3MGFlYmUzOTUucG5nXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNS9BbHl4LXNwbGFzaC5wbmdcIiB3aWR0aD1cIjQwMFwiID5cbiAgPGJyPjxicj5cbiAgPFRpdGxlIG1zZz1cIkhhbGZMaWZlOiBBbHl4XCIgLz5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPiBGaXJzdCBwZXJzb24gc2hvb3RlciBnYW1lcyBzdWNoIGFzICA8YSBocmVmPVwiaHR0cHM6Ly93d3cuaGFsZi1saWZlLmNvbS9lbi9hbHl4L1wiIHRhcmdldD1cIl9ibGFua1wiPkhhbGZMaWZlOiBBbHl4IDwvYT4gaGF2ZSBsb25nIHVzZWQgMy1EIGdyYXBoaWNzIHRvIGNyZWF0ZSBhbiBpbW1lcnNpdmUgZXhwZXJpZW5jZSBmb3IgbWlsbGlvbnMgb2YgcGxheWVycy4gQW5kIGZvciBkZWNhZGVzLCBcbiAgICBwbGF5ZXJzIG9uIGNvbXB1dGVycyBhbmQgZ2FtZSBjb25zb2xlcyBoYXZlIHllYXJuZWQgZm9yIHRydWUgVlIgc28gdGhhdCB0aGV5IGNvdWxkIGZhbGwgdGhyb3VnaCB0aGUgc2NyZWVuIGludG8gdGhlIHdvcmxkcyBvbiB0aGUgb3RoZXIgc2lkZS48L2Rpdj4gXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8VGl0bGUgbXNnPVwiUG9rZW1vbiBHb1wiIC8+XG5cdCAgPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlBva2Vtb24gR28gKDIwMTYpIGlzIHBlcmhhcHMgc3RpbGwgdGhlIGJlc3Qta25vd24gQVIgZ2FtZS4gXG4gICAgICBUaGUgUG9rZW1vbiBmcmFuY2hpc2Ugd2FzIGFscmVhZHkgZGVjYWRlcyBvbGQsIGFuZCB0aGlzIHdhcyBjZXJ0YWlubHkgcGFydCBvZiB0aGUgXG4gICAgICBhbnN3ZXIgZm9yIHRoZSBBUiBnYW1l4oCZcyBzdXJwcmlzaW5nIGltcGFjdC4gXG4gICAgICBJdCB3YXMgdGhlIGZpcnN0IFBva2Vtb24gZ2FtZSBvbiBhIG1vYmlsZSBwaG9uZSBhbmQgdGhlIGZpcnN0IGZyZWUgUG9rZW1vbiBnYW1lIG9uIGFueSBwbGF0Zm9ybS5cbiAgICA8L2Rpdj4gXG4gIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAvLyAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8VGl0bGUgbXNnPVwiQmVhdCBTYWJlclwiIC8+XG5cdCAgPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPkJlYXQgU2FiZXIgaXMgYSBWUiByaHl0aG0gZ2FtZSBcbiAgICAgIHdpdGggYSBsaXR0bGUgU3RhciBXYXJzIHRocm93biBpbi4gVGhlIHBsYXllciB1c2VzIGxpZ2h0c2FiZXJzIHRvIGtlZXAgdGhlIGJlYXQuIFxuICAgIDwvZGl2PiBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAvLyB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxUaXRsZSBtc2c9XCJXYWxraW5nIERlYWQ6IE91ciBXb3JsZFwiIC8+XG5cdCAgPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPkluIHRoaXMgQVIgdmVyc2lvbiBvZiB0aGUgdHJhbnNtZWRpYSBmcmFuY2hpc2VcbiAgICAgIEdQUyBpcyB1c2VkIHRvIGRldGVybWluZSB5b3VyIGxvY2F0aW9uIGluIHRoZSB3b3JsZC4gWW91ciBsb2NhdGlvbiBcbiAgICAgIGFuZCB0aGUgem9tYmllcyBhcHBlYXIgaW4gYW4gZW5oYW5jZWQgR29vZ2xlIE1hcHMgbWFwIG9uIHRoZSBwaG9uZSBzY3JlZW4uXG4gICAgPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgIC8vIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPFRpdGxlIG1zZz1cIkxhIEFwcGFyaXppb25lXCIgLz5cblx0ICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+TGlrZSB2aWRlbyBnYW1lcyBhbmQgMzYwLWRlZ3JlZSB2aWRlbywgXG4gICAgICBWUiBhcnQgZW1waGFzaXplcyBpbW1lcnNpb24gYXMgdGhlIGZlYXR1cmUgdGhhdCBtYWtlcyB0aGUgZXhwZXJpZW5jZSBcbiAgICAgIHVuaXF1ZSwgYXMgaW4gYSBWUiB3b3JrIGJ5IENocmlzdGlhbiBMZW1tZXJ6IGVudGl0bGVkIExhIEFwcGFyaXppb25lICgyMDE3KS5cbiAgICA8L2Rpdj4gXG4gIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIC8vdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8VGl0bGUgbXNnPVwiTWluZWNyYWZ0IFZSXCIgLz5cblx0ICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+TWluZWNyYWZ0IFZSIGlzIGEgZnVsbHkgaW1tZXJzaXZlLCBcbiAgICAgIGhlYWRzZXQgdmVyc2lvbiBvZiB0aGUgc2FuZGJveCBnYW1lIHRoYXQgYWxyZWFkeSBydW5zIG9uIGNvbXB1dGVycywgZ2FtZSBjb25zb2xlcywgYW5kIG1vYmlsZSBkZXZpY2VzLiBcbiAgICAgIEl0IGlzIGNhbGxlZCBhIFwic2FuZGJveCBnYW1lXCIgYmVjYXVzZSBpdCBwcm92aWRlcyBhbiBpbmRlcGVuZGVudCBlbnZpcm9ubWVudCBpbiB3aGljaCBcbiAgICAgIHBsYXllcnMgY2FuIG1ha2UgdGhlaXIgb3duIHN0cnVjdHVyZXMgYW5kIG9iamVjdHMgb3V0IG9mIHZpcnR1YWwsIExFR08tbGlrZSBibG9ja3MuXG4gICAgPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXIgaGVhZGxpbmVcIj5cbiAgPFRpdGxlIG1zZz1cIkFSICZhbXA7IFZSIEdBTUVTXCIgLz5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyIGhlYWRsaW5lXCI+XG4gIDxUaXRsZSBtc2c9XCJBUiAmYW1wOyBWUiBBUlRcIiAvPlxuICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuLy8gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDxUaXRsZSBtc2c9XCJQcmVzZW5jZVwiIC8+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5QcmVzZW5jZSBpcyB0aGUgYWJzZW5jZSBvZiBtZWRpYXRpb24uIElmIHRoZSB1c2VycyBjYW4gZm9yZ2V0IHRoYXQgdGhlIG1lZGl1bSBpcyB0aGVyZSwgdGhlbiB0aGV5IGZlZWwgcHJlc2VuY2UuIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIC8vdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNTAwLCA1MDAsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgPCEtLSA8VGl0bGUgbXNnPVwiQXVyYVwiIC8+IC0tPlxuICA8ZGl2IGNsYXNzPVwiaGVhZGxpbmVcIj5BdXJhPC9kaXY+XG4gIDxicj5cbiAgPGJyPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+XG4gICAgPHA+SW4gMTkzMHMsIFdhbHRlciBCZW5qYW1pbiBpbnRyb2R1Y2VkIHRoZSBjb25jZXB0IG9mIDxlbT5hdXJhPC9lbT4gaW4gVGhlIFdvcmsgb2YgQXJ0IGluIHRoZSBBZ2Ugb2YgTWVjaGFuaWNhbCBSZXByb2R1Y3Rpb24uIFxuICBBdXJhIGlzIHRoZSA8ZW0+aGVyZSBhbmQgbm93PC9lbT4gdGhhdCB3b3JrIHBvc3Nlc3NlcyBiZWNhdXNlIG9mIGl0cyB1bmlxdWUgaGlzdG9yeSBvZiBwcm9kdWN0aW9uIGFuZCB0cmFuc21pc3Npbm93b24uIDwvcD5cbiAgPHA+QVIgYXBwbGljYXRpb25zIGFyZSBub3QgcGVyZmVjdCByZXByb2R1Y3RpdmUgdGVjaG5vbG9naWVzLCBhcyBzb21lIGRyYXcgb24gdGhlIHBoeXNpY2FsIGFuZCBjdWx0dXJhbCB1bmlxdWVzbmVzcywgPGVtPnRoZSBoZXJlIGFuZCBub3c8L2VtPiBvZiBwYXJ0aWN1bGFyIHBsYWNlcyA8L3A+XG4gIDwvZGl2PiBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAvLyAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDcwMCwgNTAwLCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDxUaXRsZSBtc2c9XCJDeWJlcnNpY2tuZXNzIGFuZCB0aGUgbmVnYXR0aW9uIG9mIHByZXNlbmNlXCIgLz5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlxuICAgVGhlIHRlcm0gY3liZXJzaWNrbmVzcywgb3IgdmlzdWFsbHkgaW5kdWNlZCBtb3Rpb24gc2lja25lc3MsIGhhcyBiZWVuIGNvaW5lZCB0byBkZXNjcmliZSBzeW1wdG9tcyBpbmNsdWRpbmcgaGVhZGFjaGUsIG5hdXNlYSwgZXllIHN0cmFpbiwgZGl6emluZXNzLCBmYXRpZ3VlLCBvciBldmVuIHZvbWl0aW5nIHRoYXQgbWF5IG9jY3VyIGR1cmluZyBvciBhZnRlciBleHBvc3VyZSB0byBhIHZpcnR1YWwgZW52aXJvbm1lbnQuIEN5YmVyc2lja25lc3MgaXMgdmlzY2VyYWwgZXZpZGVuY2UgdGhhdCBWUiBpcyBub3QgdGhlIG1lZGl1bSB0byBlbmQgYWxsIG1lZGlhLiBDeWJlcnNpY2tuZXNzIHJlbWluZHMgdGhlIHN1c2NlcHRpYmxlIHVzZXIgb2YgdGhlIG1lZGl1bSBpbiBhIHBvd2VyZnVsIHdheS4gTmF1c2VhIHJlcGxhY2VzIGFzdG9uaXNobWVudC4gIFxuICA8L2Rpdj4gXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAvLyAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg1MDAsIDUwMCwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8VGl0bGUgbXNnPVwiUHJlc2VuY2UgYW5kIEVtcGF0aHlcIiAvPlxuICA8YnIvPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+UmVzZWFyY2hlcnMgaGF2ZSBsb25nIHB1cnN1ZWQgdGhlIGlkZWEgb2YgZW1vdGlvbmFsIHJlYWN0aW9ucyBzdWNoIGFzIGVtcGF0aHkgYXMgYSB0ZXN0IG9mIHByZXNlbmNlLiBcbiBWUiBpcyAgdW5kZXJzdG9vZCBhcyBnZXR0aW5nIHVzIGNsb3NlciB0byB0aGUgYXV0aGVudGljIG9yIHRoZSByZWFsLiBCdXQgZm9yZ2V0dGluZyB0aGUgbWVkaXVtIGlzIG5vdCBuZWNlc3NhcnkgZm9yIGEgc2Vuc2Ugb2YgcHJlc2VuY2UuIFByZXNlbmNlIGNhbiBiZSB1bmRlcnN0b29kIGluIGEgbW9yZSBudWFuY2VkIHdheSBhcyBhIGxpbWluYWwgem9uZSBiZXR3ZWVuIGZvcmdldHRpbmcgYW5kIGFja25vd2xlZGdpbmcgVlIgYXMgYSBtZWRpdW0uXG48L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDcwMCwgNDAwLCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDwhLS0gPFRpdGxlIG1zZz1cIlByZXNlbmNlIGFuZCBFbXBhdGh5XCIgLz4gLS0+XG4gIDxkaXYgY2xhc3M9XCJoZWFkbGluZVwiPlByZXNlbmNlIGFuZCBFbXBhdGh5PC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgLy8gICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg4MDAsIDIwMCwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzQ2ZDc3OTNmYTdhYjI0YWQucG5nXCIiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvYmViNjE4ZmZlMzc2OWJiNi5wbmdcIiIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC8xZTRiZGUzMTIzMjUxOTVmLnBuZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8IS0tIDxUaXRsZSBtc2c9XCJQaXQgRXhwZXJpbWVudFwiIC8+IC0tPlxuICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTYvcmlnaHRhcnJvdy5wbmdcIiB3aWR0aD1cIjkwXCIgc3R5bGU9XCJmbG9hdDogcmlnaHRcIj5cblx0PGRpdiBjbGFzcz1cInBvc3RlcnRpdGxlXCI+UHJlc2VuY2UgYW5kIEVtcGF0aHk8L2Rpdj5cbiAgPGJyIC8+XG4gICAgPGJyIC8+XG4gIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi91cGFycm93LnBuZ1wiIHdpZHRoPVwiOTBcIiBzdHlsZT1cImZsb2F0OiByaWdodFwiPlxuXHQ8ZGl2IGNsYXNzPVwicG9zdGVydGl0bGVcIj5NZWFzdXJpbmcgUHJlc2VuY2U8L2Rpdj5cbiAgICA8YnIgLz5cbiAgICAgIDxiciAvPlxuICAgIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi91cmFycm93LnBuZ1wiIHdpZHRoPVwiMTIwXCIgIHN0eWxlPVwiZmxvYXQ6IHJpZ2h0XCI+XG5cdDxkaXYgY2xhc3M9XCJwb3N0ZXJ0aXRsZVwiPkF1cmE8L2Rpdj5cbiAgIFxuXG5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgLy8gICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDUwMCwgNTAwLCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvNDkwNTc1NzM3NDkyMzI1OS5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1Jvb202L2xmYXJyb3cucG5nXCIgd2lkdGg9XCIyMFwiIHN0eWxlPVwiZmxvYXQ6IGxlZnQ7IG1hcmdpbjogMTBweFwiPlxuICA8VGl0bGUgbXNnPVwiVWx0aW1hdGUgRW1wYXRoeSBNYWNoaW5lXCIgLz5cbiAgPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPjM2MDxzcGFuPiYjMTc2Ozwvc3Bhbj4gZmlsbSBDbG91ZHMgT3ZlciBTaWRyYSBjcmVhdGVkIGJ5IENocmlzIE1pbGsgYW5kIEdhYm8gQXJvcmEgc2hvd3MgdGhlIGxpZmUgb2YgU3lyaWFuIHJlZnVnZWVzIGluIFphJ2F0YXJpIGNhbXAgaW4gSm9yZGFuLiBUaGUgY2FtZXJhIGZvbGxvd3MgMTIteWVhciBvbGQgU2lkcmEgaW4gaGVyIGV2ZXJ5ZGF5IGxpZmUsIGFsbG93aW5nIHRoZSB1c2VycyB0byBiZSBwcmVzZW50IHdpdGggU2lkcmEuIDwvZGl2PlxuICA8YnIgLz5cbiAgPGJsb2NrcXVvdGUgY2xhc3M9XCJzcXVhcmVvZmZcIj5cIldoZW4geW914oCZcmUgaW5zaWRlIG9mIHRoZSBoZWFkc2V0IC4gLiAuIHlvdSBzZWUgZnVsbCAzNjAgZGVncmVlcywgaW4gYWxsIGRpcmVjdGlvbnMuIEFuZCB3aGVuIHlvdeKAmXJlIHNpdHRpbmcgdGhlcmUgaW4gaGVyIHJvb20sIHdhdGNoaW5nIGhlciwgeW91J3JlIG5vdCB3YXRjaGluZyBpdCB0aHJvdWdoIGEgdGVsZXZpc2lvbiBzY3JlZW4sIHlvdeKAmXJlIG5vdCB3YXRjaGluZyBpdCB0aHJvdWdoIGEgd2luZG93LCB5b3XigJlyZSBzaXR0aW5nIHRoZXJlIHdpdGggaGVyLiBXaGVuIHlvdSBsb29rIGRvd24sIHlvdSdyZSBzaXR0aW5nIG9uIHRoZSBzYW1lIGdyb3VuZCB0aGF0IHNoZeKAmXMgc2l0dGluZyBvbi4gQW5kIGJlY2F1c2Ugb2YgdGhhdCwgeW91IGZlZWwgaGVyIGh1bWFuaXR5IGluIGEgZGVlcGVyIHdheS4gWW91IGVtcGF0aGl6ZSB3aXRoIGhlciBpbiBhIGRlZXBlciB3YXkuIChNaWxrIDIwMTUpXCI8L2Jsb2NrcXVvdGU+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAvLyAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg3MDAsIDQwMCwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0L2I0NjRkYmU5MGQ2MTMzYWIuanBnXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gICAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1Jvb202L2Nsb3Vkb3ZlcnNpZHJhLmpwZ1wiIHdpZHRoPVwiNzAwXCIgPlxuICA8IS0tIDxUaXRsZSBtc2c9XCJVbHRpbWF0ZSBFbXBhdGh5IE1hY2hpbmVcIiAvPiAtLT5cblxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgIC8vICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNzAwLCA1MDAsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgICA8IS0tIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi9ydGFycm93LnBuZ1wiIHdpZHRoPVwiNDAwXCIgPiAtLT5cbiAgPFRpdGxlIG1zZz1cIlRoZSBmdXR1cmUgb2YgbmV3cz9cIiAvPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+Tm9ubmllIGRlIGxhIFBlw7FhJ3MgPGEgaHJlZj1cImh0dHBzOi8vZW1iZWQudGVkLmNvbS90YWxrcy9ub25ueV9kZV9sYV9wZW5hX3RoZV9mdXR1cmVfb2ZfbmV3c192aXJ0dWFsX3JlYWxpdHlcIiB0YXJnZXQ9XCJfYmxhbmtcIj5UZWQgVGFsazwvYT4gY2FsbGVkICdUaGUgZnV0dXJlIG9mIG5ld3M/JycgIGludHJvZHVjZXMgYSBuZXcgZm9ybSBvZiBqb3VybmFsaXNtIHdoZXJlIFZpcnR1YWwgUmVhbGl0eSB0ZWNobm9sb2d5IGlzIHVzZWQgdG8gcHV0IGF1ZGllbmNlIGluc2lkZSB0aGUgc3Rvcmllcy4gSW4gaGVyIHdvcmssIHNoZSBjcmVhdGVkIFZSIHN0b3JpZXMgYWJvdXQgaW1wcmlzb25tZW50IGluIEd1YW50YW5hbW8gYW5kIGh1bmdlciBpbiBMb3MgQW5nZWxlcyB0byBpbmR1Y2UgZW1wYXRoeSBpbiB0aGUgYXVkaWVuY2UuPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNzAwLCA0MDAsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC9iMzkzM2ZmMzU5Zjk0OWJhLnBuZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICAgIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi9ub25uaWUucG5nXCIgd2lkdGg9XCI3MDBcIiA+XG5cbiAgPCEtLSA8VGl0bGUgbXNnPVwiVGhlIGZ1dHVyZSBvZiBuZXdzP1wiIC8+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5Ob25uaWUgZGUgbGEgUGXDsWEncyA8YSBocmVmPVwiaHR0cHM6Ly9lbWJlZC50ZWQuY29tL3RhbGtzL25vbm55X2RlX2xhX3BlbmFfdGhlX2Z1dHVyZV9vZl9uZXdzX3ZpcnR1YWxfcmVhbGl0eVwiIHRhcmdldD1cIl9ibGFua1wiPlRlZCBUYWxrPC9hPiBjYWxsZWQgJ1RoZSBmdXR1cmUgb2YgbmV3cz8nJyAgaW50cm9kdWNlcyBhIG5ldyBmb3JtIG9mIGpvdXJuYWxpc20gd2hlcmUgVmlydHVhbCBSZWFsaXR5IHRlY2hub2xvZ3kgaXMgdXNlZCB0byBwdXQgYXVkaWVuY2UgaW5zaWRlIHRoZSBzdG9yaWVzLiBJbiBoZXIgd29yaywgc2hlIGNyZWF0ZWQgVlIgc3RvcmllcyBhYm91dCBpbXByaXNvbm1lbnQgaW4gR3VhbnRhbmFtbyBhbmQgaHVuZ2VyIGluIExvcyBBbmdlbGVzIHRvIGluZHVjZSBlbXBhdGh5IGluIHRoZSBhdWRpZW5jZS48L2Rpdj4gIC0tPlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgIC8vICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNzAwLCA0MDAsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgICA8VGl0bGUgbXNnPVwiUGl0IEV4cGVyaW1lbnRcIiAvPlxuICBcdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5UaGUgcGl0IGV4cGVyaW1lbnQgaXMgYSB2aXJ0dWFsIGV4cGVyaWVtZW50IG9mdGVuIHVzZWQgdG8gZXZhbHVhdGUgdGhlIHNlbmNlIG9mIHByZXNlbmNlLiBUaGUgdXNlciBpcyBnaXZlbiBhIHRhc2sgdG8gZ3JhYiBhbiBvYmplY3Qgb24gcGxhbmsgYW5kIHRha2UgaXQgdG8gdGhlIG90aGVyIHNpZGUsIGNyb3NzaW5nIHRoZSBwaXQuIDwvZGl2PlxuXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg1MDAsIDUwMCwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzIxNzZkYzY2ZjVhMDI1NDYucG5nXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi9waXRWUi5wbmdcIiB3aWR0aD1cIjQzNlwiID5cbiAgPCEtLSA8VGl0bGUgbXNnPVwiUGl0IEV4cGVyaW1lbnRcIiAvPiAtLT5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDQzNiwgMjkzLCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDwhLS0gPFRpdGxlIG1zZz1cIlByZXNlbmNlXCIgLz4gLS0+XG4gIDxkaXYgY2xhc3M9XCJwb3N0ZXJ0aXRsZVwiPlByZXNlbmNlPC9kaXY+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5QcmVzZW5jZSBpcyBhIGtpbmQgb2YgYWJzZW5jZSwgdGhlIGFic2VuY2Ugb2YgbWVkaWF0aW9uLiBJZiB0aGUgdXNlcnMgY2FuIGZvcmdldCB0aGF0IHRoZSBtZWRpdW0gaXMgdGhlcmUsIHRoZW4gdGhleSBmZWVsIHByZXNlbmNlLiA8L2Rpdj5cbiAgXHQ8IS0tIDxkaXYgY2xhc3M9XCJwb3N0ZXJ0aXRsZVwiPlByZXNlbmNlIGlzIGEga2luZCBvZiBhYnNlbmNlLCB0aGUgYWJzZW5jZSBvZiBtZWRpYXRpb24uIElmIHRoZSB1c2VycyBjYW4gZm9yZ2V0IHRoYXQgdGhlIG1lZGl1bSBpcyB0aGVyZSwgdGhlbiB0aGV5IGZlZWwgcHJlc2VuY2UuIDwvZGl2PiAtLT5cbiAgICBcdDwhLS0gPGRpdiBjbGFzcz1cImhlYWRsaW5lXCI+UHJlc2VuY2UgaXMgdGhlIGFic2VuY2Ugb2YgbWVkaWF0aW9uLiBJZiB0aGUgdXNlcnMgY2FuIGZvcmdldCB0aGF0IHRoZSBtZWRpdW0gaXMgdGhlcmUsIHRoZW4gdGhleSBmZWVsIHByZXNlbmNlLiA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5QcmVzZW5jZSBpcyBhIGtpbmQgb2YgYWJzZW5jZSwgdGhlIGFic2VuY2Ugb2YgbWVkaWF0aW9uLiBJZiB0aGUgdXNlcnMgY2FuIGZvcmdldCB0aGF0IHRoZSBtZWRpdW0gaXMgdGhlcmUsIHRoZW4gdGhleSBmZWVsIHByZXNlbmNlLiA8L2Rpdj4gLS0+XG4gICAgICA8YnIgLz5cbiAgICAgIDxiciAvPlxuICAgICAgXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCIgc3R5bGU9XCJmb250LXN0eWxlOml0YWxpY1wiPlwiVlIgYW5kIEFSIGNhbm5vdCBkZWNlaXZlIHRoZWlyIHVzZXJzIGludG8gYmVsaWV2aW5nIHRoYXQgdGhleSBhcmUgaGF2aW5nIGEgbm9uLW1lZGlhdGVkIGV4cGVyaWVuY2UuIEJ1dCB0aGF0IGlzIG5vdCBuZWNlc3NhcnkgZm9yIGEgc2Vuc2Ugb2YgcHJlc2VuY2UuXCI8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG4gIFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg3MDAsIDQwMCwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8VGl0bGUgbXNnPVwiVHJlZWh1Z2dlcjogV2F3b25hXCIgLz5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlRyZWVodWdnZXI6IFdhd29uYSBWUiBleHBlcmllbmNlIHRyYW5zcG9ydHMgdGhlIHVzZXJzIHRvIHRoZSByZWQgZ2lhbnQgU2VxdW9pYSB0cmVlcyBmcm9tIHRoZSBTZXF1b2lhIE5hdGlvbmFsIFBhcmsuIEl0IHByb3ZpZGVzIGEgc2Vuc2Ugb2YgaW50aW1hY3kgd2l0aCB0aGUgdHJlZSAtIHdpdGggaXRzIGJhcmssIHdpdGggdGhlIGNlbGxzIHRoYXQgbWFrZSB1cCBpdHMgYmVpbmcuIFRoZSB2aXZpZG5lc3Mgb2YgdGhlIHdvcmsgaWxsdXN0cmF0ZXMgPGVtPnByZXNlbmNlPC9lbT4uIDwvZGl2PlxuICA8IS0tIEluIHRoaXMgZXhwZXJpZW5jZSwgdXNlcnMgZmluZCB0aGVtc2VsdmVzIG9uIHRoZSB0aHJlc2hvbGQgb2YgZm9yZ2V0dGluZyB0aGF0IHdlIGFyZSBoYXZpbmcgYSBWUiBleHBlcmllbmNlLiBCZWluZyBvbiB0aGF0IHRocmVzaG9sZCBpcyBhIHNlbmNlIG9mIHByZXNlbmNlIGluIGEgcmVhbGl0eSBtZWRpdW0uIC0tPlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNDAwLCA2MDAsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC8yNzNkZWM0N2VjNzYyMzBkLnBuZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICAgIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi90cmVlaHVnZ2VyLnBuZ1wiIHdpZHRoPVwiODAwXCIgPlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgLy8gdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoODAwLCA0MDAsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgPFRpdGxlIG1zZz1cIkJhY2sgdG8gdGhlIG1haW4gZXhoaWJpdGlvblwiIC8+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAvLyB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8IS0tIDxUaXRsZSBtc2c9XCJUaGUgZnV0dXJlIG9mIG5ld3M/XCIgLz4gLS0+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5QYXJ0aGVub24gbW9kZWwgZXhwbGFuYXRpb248L2Rpdj4gXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0L2E3ZDEyNDRjNGIyM2I3YjAuanBnXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gICAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1Jvb202L3RlcnJhY290dGEuanBnXCIgd2lkdGg9XCI4MDBcIiA+XG5cbiAgPCEtLSA8VGl0bGUgbXNnPVwiVGhlIGZ1dHVyZSBvZiBuZXdzP1wiIC8+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5Ob25uaWUgZGUgbGEgUGXDsWEncyA8YSBocmVmPVwiaHR0cHM6Ly9lbWJlZC50ZWQuY29tL3RhbGtzL25vbm55X2RlX2xhX3BlbmFfdGhlX2Z1dHVyZV9vZl9uZXdzX3ZpcnR1YWxfcmVhbGl0eVwiIHRhcmdldD1cIl9ibGFua1wiPlRlZCBUYWxrPC9hPiBjYWxsZWQgJ1RoZSBmdXR1cmUgb2YgbmV3cz8nJyAgaW50cm9kdWNlcyBhIG5ldyBmb3JtIG9mIGpvdXJuYWxpc20gd2hlcmUgVmlydHVhbCBSZWFsaXR5IHRlY2hub2xvZ3kgaXMgdXNlZCB0byBwdXQgYXVkaWVuY2UgaW5zaWRlIHRoZSBzdG9yaWVzLiBJbiBoZXIgd29yaywgc2hlIGNyZWF0ZWQgVlIgc3RvcmllcyBhYm91dCBpbXByaXNvbm1lbnQgaW4gR3VhbnRhbmFtbyBhbmQgaHVuZ2VyIGluIExvcyBBbmdlbGVzIHRvIGluZHVjZSBlbXBhdGh5IGluIHRoZSBhdWRpZW5jZS48L2Rpdj4gIC0tPlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgIC8vICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoODAwLCA1MDAsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPFRpdGxlIG1zZz1cIlRlcnJhY290dGEgV2FycmlvcnMgQVJcIiAvPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+XCJUaGUgRnJhbmtsaW4gSW5zdGl0dXRlIGlzIHVzaW5nIEFSIHRvIGVuaGFuY2UgdGhlaXIgVGVycmFjb3R0YSBXYXJyaW9yIGV4aGliaXRpb24gd2hpY2ggd2VyZSBkaXNwbGF5ZWQgaW4gUGhpbGFkZWxwaGlhIHVudGlsIE1hcmNoIDIwMTguIFRoZSBtdXNldW3igJlzIGFwcCwgcG93ZXJlZCBieSBXaWtpdHVkZSB0ZWNobm9sb2d5LCBhbGxvd3MgdmlzaXRvcnMgdG8gdXNlIHRoZWlyIHNtYXJ0cGhvbmUgdG8gc2NhbiBpdGVtcyBhbmQgdmlzdWFsaXplIHJpY2ggQVIgY29udGVudCB0byBsZWFybiBldmVuIG1vcmUgYWJvdXQgdGhlIGludHJpZ3VpbmcgaGlzdG9yeSBiZWhpbmQgdGhlIG1hZ25pZmljZW50IGNsYXkgc29sZGllcnMuXCI8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDgwMCwgNTAwLCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvYjJjNzcwMDk2NDRhN2Q0NS5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTYvdHJlZWh1Z2dlcjIuanBnXCIgd2lkdGg9XCI2MDBcIiA+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgLy8gICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8VGl0bGUgbXNnPVwiUGl0IEV4cGVyaW1lbnRcIiAvPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+VGhyb3VnaCB0aGUgdmlydHVhbCBwaXQgZXhwZXJpbWVudCwgc3ViamVjdHMgZXhwZXJpZW5jZSBhIGhpZ2hlciBzZW5zZSBvZiBwcmVzZW5jZS4gPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDUwMCwgNTAwLCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDxUaXRsZSBtc2c9XCJQaXQgRXhwZXJpbWVudCBJbnN0cnVjdGlvblwiIC8+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5Ucnkgd2Fsa2luZyBhY3Jvc3MgdGhlIHBpdCB3aXRob3V0IGxvc2luZyBiYWxhbmNlIG9yIGZhbGxpbmcuPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCAxMDAsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgPFRpdGxlIG1zZz1cIlZlcnkgY2FyZWZ1bGx5IHN0cmV0Y2ggeW91ciBhcm1zIG91dCBmb3IgYmFsYW5jZS5cIiAvPlxuXHQ8IS0tIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj4gRmlyc3QgcGVyc29uIHNob290ZXIgZ2FtZXMgc3VjaCBhcyAgPGEgaHJlZj1cImh0dHBzOi8vd3d3LmhhbGYtbGlmZS5jb20vZW4vYWx5eC9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5IYWxmTGlmZTogQWx5eCA8L2E+IGhhdmUgbG9uZyB1c2VkIDMtRCBncmFwaGljcyB0byBjcmVhdGUgYW4gaW1tZXJzaXZlIGV4cGVyaWVuY2UgZm9yIG1pbGxpb25zIG9mIHBsYXllcnMuIEFuZCBmb3IgZGVjYWRlcywgXG4gICAgcGxheWVycyBvbiBjb21wdXRlcnMgYW5kIGdhbWUgY29uc29sZXMgaGF2ZSB5ZWFybmVkIGZvciB0cnVlIFZSIHNvIHRoYXQgdGhleSBjb3VsZCBmYWxsIHRocm91Z2ggdGhlIHNjcmVlbiBpbnRvIHRoZSB3b3JsZHMgb24gdGhlIG90aGVyIHNpZGUuPC9kaXY+ICAtLT5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8VGl0bGUgbXNnPVwiV2hhdCBkbyB5b3Ugc2VlIG9uIHRoZSBmbG9vciByaWdodCBub3c/XCIgLz5cblx0PCEtLSA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+IEZpcnN0IHBlcnNvbiBzaG9vdGVyIGdhbWVzIHN1Y2ggYXMgIDxhIGhyZWY9XCJodHRwczovL3d3dy5oYWxmLWxpZmUuY29tL2VuL2FseXgvXCIgdGFyZ2V0PVwiX2JsYW5rXCI+SGFsZkxpZmU6IEFseXggPC9hPiBoYXZlIGxvbmcgdXNlZCAzLUQgZ3JhcGhpY3MgdG8gY3JlYXRlIGFuIGltbWVyc2l2ZSBleHBlcmllbmNlIGZvciBtaWxsaW9ucyBvZiBwbGF5ZXJzLiBBbmQgZm9yIGRlY2FkZXMsIFxuICAgIHBsYXllcnMgb24gY29tcHV0ZXJzIGFuZCBnYW1lIGNvbnNvbGVzIGhhdmUgeWVhcm5lZCBmb3IgdHJ1ZSBWUiBzbyB0aGF0IHRoZXkgY291bGQgZmFsbCB0aHJvdWdoIHRoZSBzY3JlZW4gaW50byB0aGUgd29ybGRzIG9uIHRoZSBvdGhlciBzaWRlLjwvZGl2PiAgLS0+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPCEtLSA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTUvQWx5eC1zcGxhc2gucG5nXCIgd2lkdGg9XCI0MDBcIiA+IC0tPlxuPFRpdGxlIG1zZz1cIldlbGNvbWUgdG8gUmVhbGl0eSBNZWRpYSFcIiAvPlxuPGJyPjxicj5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPiBUaGlzIGRpZ2l0YWwgYm9vayBpcyBhIGNvbXBsZW1lbnQgdG8gdGhlIHByaW50ZWQgYm9vayBSZWFsaXR5IE1lZGlhOiBBdWdtZW50ZWQgYW5kIFZpcnR1YWwgUmVhbGl0eSBwdWJsaXNoZWQgYnkgTUlUIFByZXNzLiBUaGUgZGlnaXRhbCB2ZXJzaW9uIHRha2VzIHR3byBmb3JtczogYSB3ZWJzaXRlIGFuZCBhIDNEIGltbWVyc2l2ZSBib29rLCB3aGljaCBhbGxvd3MgeW91IHRvIGdldCBpbnNpZGUgQVIgYW5kIFZSLCB0byBpbmhhYml0IHRoZXNlIHR3byBuZXcgcmVhbGl0eSBtZWRpYS4gWW91IGFyZSBub3cgc3RhbmRpbmcgaW4gdGhlIGVudHJ5IGhhbGwgdG8gdGhlIGltbWVyc2l2ZSBib29rLiBUaGlzIGhhbGwgcHJvdmlkZXMgaW5mb3JtYXRpb24gb24gaG93IHRvIOKAnHJlYWTigJ0gdGhlIGltbWVyc2l2ZSBib29rOiB0aGF0IGlzLCBob3cgdG8gbmF2aWdhdGUgdGhyb3VnaCBpdHMgZ2FsbGVyaWVzIGFuZCBleHBsb3JlIHRoZSBleGhpYml0cyBwcmVzZW50ZWQuIFdoZW4geW91IGFyZSByZWFkeSwgeW91IGNhbiB3YWxrIHRocm91Z2ggdGhlIHBvcnRhbCBhdCB0aGUgZmFyIGVuZCBvZiB0aGlzIGhhbGwgdG8gdGhlIHJvdHVuZGEsIGZyb20gd2hpY2ggeW91IGNhbiB2aXNpdCBhbGwgdGhlIGdhbGxlcmllcy4gPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLDgwMCwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzdhMjRhNmQzMDlkNDUzZjIuanBnXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9PbmJvYXJkaW5nL3JlYWxpdHlNZWRpYUJvb2suanBnXCIgd2lkdGg9XCI0MDBcIiA+XG4gIDxicj48YnI+XG4gIDxUaXRsZSBtc2c9XCJSZWFsaXR5IE1lZGlhXCIgLz5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlB1Ymxpc2hlZCBieSA8YSBocmVmPVwiaHR0cHM6Ly9taXRwcmVzcy5taXQuZWR1L2Jvb2tzL3JlYWxpdHktbWVkaWFcIj5NSVQgUHJlc3M8L2E+PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJvYmxpcXVlIHNxdWFyZW9mZlwiPkJ5IEpheSBEYXZpZCBCb2x0ZXIsIE1hcmlhIEVuZ2JlcmcgYW5kIEJsYWlyIE1hY0ludHlyZTwvZGl2PiBcbiAgPGJyPlxuICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmIHF1b3RlXCI+SG93IGF1Z21lbnRlZCByZWFsaXR5IGFuZCB2aXJ0dWFsIHJlYWxpdHkgYXJlIHRha2luZyB0aGVpciBwbGFjZXMgaW4gY29udGVtcG9yYXJ5IG1lZGlhIGN1bHR1cmUgYWxvbmdzaWRlIGZpbG0gYW5kIHRlbGV2aXNpb24uPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsODAwLCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvNWIxNGRhOTZlMjg4OWZmMi5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL09uYm9hcmRpbmcvTW96aWxsYUh1YnMuanBnXCIgd2lkdGg9XCI0MDBcIiA+XG4gIDxicj48YnI+XG4gIDxUaXRsZSBtc2c9XCJUaGUgSHVicyBQbGF0Zm9ybVwiIC8+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj4qUmVhbGl0eW1lZGlhKiBpcyBidWlsdCBvbiB0b3Agb2YgTW96aWxsYSdzIG9wZW4tc291cmNlIHBsYXRmb3JtLiBBbiBleHRlbnNpdmUgZ3VpZGUgdG8gdXNpbmcgTW96aWxsYSBIdWJzIGlzIGF2YWlsYWJsZSBhdCA8YSBocmVmPVwiaHR0cHM6Ly9odWJzLm1vemlsbGEuY29tL2RvY3MvaW50cm8taHVicy5odG1sXCIgdGFyZ2V0PVwiYmxhbmtcIj5pbiB0aGUgSHVicyB1c2VyIGRvY3VtZW50YXRpb248L2E+LiBIZXJlIGFyZSB0aGUgaGlnaGxpZ2h0czpcbiAgPGJyPjxicj5cbkJlZm9yZSBlbnRlcmluZywgeW91IGFyZSBpbiB0aGUgcm9vbSdzIGxvYmJ5LiBGcm9tIGhlcmUsIHlvdSBjYW4gc2VlIGFuZCBoZWFyIHdoYXQncyBnb2luZyBvbiBpbnNpZGUgdGhlIHJvb20sIGJ1dCB5b3UgY2FuIG9ubHkgaW50ZXJhY3Qgd2l0aCBvdGhlcnMgdXNpbmcgdGV4dCBjaGF0LiBcbjxicj48YnI+XG48ZGl2IGNsYXNzPVwia2V5UG9pbnRcIj5UbyBlbnRlciB0aGUgcm9vbTo8L2Rpdj5cbjxicj5cbi0gb24gYSBkZXNrdG9wIG9yIG1vYmlsZSBkZXZpY2UsIGZvbGxvdyB0aGUgcHJvbXB0cyB0byBzZWxlY3QgYSBuYW1lL2F2YXRhciBhbmQgZW5hYmxlIHRoZSBtaWMuXG48YnI+XG4tIG9uIGEgVlIgaGVhZHNldCwgaWYgeW91IG9wZW5lZCB0aGUgVVJMIG9uIHlvdXIgZGVza3RvcCBvciBzbWFydHBob25lLCBjaG9vc2UgXCJFbnRlciBvbiBTdGFuZGFsb25lIFZSXCIgdG8gY3JlYXRlIGEgY29kZSB0aGF0IG1ha2VzIGl0IGVhc3kgdG8gb3BlbiBvbiB5b3VyIHN0YW5kYWxvbmUgaGVhZHNldC4gT3BlbiB0aGUgYnJvd3NlciBpbiB5b3VyIFZSIGhlYWRzZXQsIG5hdmlnYXRlIHRvIGh1YnMubGluayBhbmQgZW50ZXIgdGhlIGNvZGUuXG48YnI+PGJyPlxuPGRpdiBjbGFzcz1cImtleVBvaW50XCI+VG8gbmF2aWdhdGUgaW4gSHViczo8L2Rpdj4gIFxuPGJyPlxuLU9uIGRlc2t0b3AgdXNlIHlvdXIgV0FTRCBvciBhcnJvdyBrZXlzIHRvIG1vdmUgYXJvdW5kLiBZb3UgY2FuIGFsc28gcHJlc3MgeW91ciByaWdodCBtb3VzZSBidXR0b24gdG8gdGVsZXBvcnQgdG8gYSBkaWZmZXJlbnQgbG9jYXRpb24uIFJvdGF0ZSB5b3VyIHZpZXcgdXNpbmcgdGhlIFEgYW5kIEUga2V5cywgb3IgaG9sZCBkb3duIHlvdXIgbGVmdCBtb3VzZSBidXR0b24gYW5kIGRyYWcuXG4tRm9yIFZSIGFuZCBtb2JpbGUgY29udHJvbHMsIHNlZSB0aGUgbGlzdCBvZiA8YSBocmVmPVwiaHR0cHM6Ly9odWJzLm1vemlsbGEuY29tL2RvY3MvaHVicy1jb250cm9scy5odG1sXCIgdGFyZ2V0PVwiYmxhbmtcIj5IdWJzIGNvbnRyb2xzLjwvYT5cbjwvZGl2PiBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg4MDAsIDYwMCwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzVkNDJiYzZiMmEwNzRjY2QucG5nXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG5cbjxUaXRsZSBtc2c9XCJGZWF0dXJlcyBpbiBIdWJzXCIgLz5cbjxicj5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPiBUaGUgZmlndXJlIGJlbG93IGluZGljYXRlcyBob3cgdG8gbXV0ZSB5b3VyIG1pY3JvcGhvbmUsIHRha2UgcGhvdG9zLCBzaGFyZSB5b3VyIHNjcmVlbiwgY3JlYXRlIG1lZGlhIG9iamVjdHMsIGFuZCBzbyBvbjogPC9kaXY+IFxuICAgIDxicj48YnI+XG4gICAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL09uYm9hcmRpbmcvaHVicy11c2VyLWludGVyZmFjZS5wbmdcIiB3aWR0aD1cIjQwMFwiID5cblxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cblxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsODAwLCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG48VGl0bGUgbXNnPVwiSG93IHRvIFVzZSB0aGUgQXVkaW8gUGFkc1wiIC8+XG48YnI+PGJyPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+U3RhbmRpbmcgb24gdGhlIEF1ZGlvIFBhZHMgd2lsbCBzdGFydCB0aGUgbmFycmF0aW9ucyBhYm91dCB0aGUgcm9vbSB5b3UgYXJlIGN1cnJlbnRseSBpbi48L2Rpdj4gXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDIwMCwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0Il0sIm5hbWVzIjpbIkh1YnNBcHAiLCJldGhlcmVhbC5jcmVhdGVMYXlvdXRTeXN0ZW0iLCJXZWJMYXllcjNEIiwiU3RvcmUiLCJIdWJzQXBwUHJvdG8iLCJBcHAiLCJpbml0Il0sIm1hcHBpbmdzIjoiOztBQUFBLG1CQUFlOzs7Ozs7Ozs7QUNXZjs7Ozs7OztBQUZjO0FBS1o7QUFDRjtBQUNBLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSC9COzs7O0FBTGM7QUFNZCxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFDO0FBQzdCLElBQUksSUFBSSxHQUFHLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEdBQUcsbURBQWtEOzs7Ozs7Ozs7Ozs7O01DYjlFLE1BQU07SUFDdkIsYUFBYSxDQUFnQjtJQUM3QixhQUFhLENBQXlCO0lBRXRDLEtBQUssQ0FBUTtJQUNiLE1BQU0sQ0FBUTtJQUVkLE1BQU0sQ0FBSztJQUNYLE9BQU8sQ0FBcUM7SUFFNUMsWUFBYSxHQUFjLEVBQUUsS0FBYSxFQUFFLE1BQWMsRUFBRSxnQkFBb0IsRUFBRTtRQUM5RSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDdkQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3ZELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1FBQ2xCLElBQUks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LE1BQU1BLFNBQVEsU0FBUUksU0FBWTtJQUM5QixZQUFhLEtBQWEsRUFBRSxNQUFjLEVBQUUsU0FBYyxFQUFFO1FBQ3hELEtBQUssQ0FBQ0MsUUFBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7S0FDcEM7Q0FDSjtJQUVHQyxNQUFJLEdBQUcsVUFBVSxTQUFjLEVBQUU7SUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSU4sU0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDdkMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ1gsT0FBTyxHQUFHLENBQUE7QUFDZDs7Ozs7Ozs7O0FDQWM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZkLE1BQU1BLFNBQVEsU0FBUUksU0FBWTtJQUM5QixZQUFhLEtBQWEsRUFBRSxNQUFjLEVBQUUsU0FBYyxFQUFFO1FBQ3hELEtBQUssQ0FBQ0MsUUFBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7S0FDcEM7Q0FDSjtJQUVHQyxNQUFJLEdBQUcsVUFBVSxTQUFjLEVBQUU7SUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSU4sU0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDdkMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ1gsT0FBTyxHQUFHLENBQUE7QUFDZDs7Ozs7Ozs7O0FDQWM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZkLE1BQU1BLFNBQVEsU0FBUUksU0FBWTtJQUM5QixZQUFhLEtBQWEsRUFBRSxNQUFjLEVBQUUsU0FBYyxFQUFFO1FBQ3hELEtBQUssQ0FBQ0MsUUFBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7S0FDcEM7Q0FDSjtJQUVHQyxNQUFJLEdBQUcsVUFBVSxTQUFjLEVBQUU7SUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSU4sU0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUE7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
