import { p as pushScopeId, a as popScopeId, i as inject, c as createElementBlock, b as createBaseVNode, t as toDisplayString, u as unref, F as Fragment, o as openBlock, d as createVNode, e as createCommentVNode, f as createApp, j as jh, k as kh, r as reactive, g as readonly, h as createTextVNode, n as normalizeClass, l as createStaticVNode } from './vendor-426aefc4.js';

var _imports_0$i = "https://resources.realitymedia.digital/vue-apps/dist/1a6ace377133f14a.png";

pushScopeId("data-v-0a280960");
const _hoisted_1$$ = {
  "xr-layer": "",
  class: "fade"
};
const _hoisted_2$Z = /*#__PURE__*/createBaseVNode("p", null, " Here's some more text just to make things not blank. ", -1 /* HOISTED */);
popScopeId();


var script$11 = {
  props: {
  msg: String
},
  setup(__props) {



const shared = inject('shared');

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("h1", _hoisted_1$$, toDisplayString(__props.msg), 1 /* TEXT */),
    _hoisted_2$Z,
    createBaseVNode("button", {
      "xr-layer": "",
      onClick: _cache[0] || (_cache[0] = (...args) => (unref(shared).increment && unref(shared).increment(...args)))
    }, "count is: " + toDisplayString(unref(shared).state.count), 1 /* TEXT */)
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$11.__scopeId = "data-v-0a280960";

const _hoisted_1$_ = { id: "room" };
const _hoisted_2$Y = /*#__PURE__*/createBaseVNode("img", {
  alt: "Vue logo",
  src: _imports_0$i
}, null, -1 /* HOISTED */);


var script$10 = {
  setup(__props) {

let params = inject("params");
var mesg = params && params.mesg ? params.mesg : "Networked Vue Component with Shared Button Count";

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$_, [
    _hoisted_2$Y,
    createVNode(script$11, { msg: unref(mesg) }, null, 8 /* PROPS */, ["msg"]),
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
    HubsApp$_.initializeEthereal();
}
//THREE.Object3D.DefaultMatrixAutoUpdate = true;
function systemTick(time, deltaTime) {
    HubsApp$_.systemTick(time, deltaTime);
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
class HubsApp$_ extends VueApp {
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
        scene.renderer.getSize(HubsApp$_.system.viewResolution);
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
                    const adapter = HubsApp$_.system.getAdapter(layer);
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

class HubsApp$Z extends HubsApp$_ {
    shared;
    constructor(params = {}) {
        super(script$10, 400, 475, params);
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
var init$Z = function (params = {}) {
    let app = new HubsApp$Z(params);
    app.mount();
    return app;
};

pushScopeId("data-v-b474cdac");
const _hoisted_1$Z = {
  "xr-layer": "",
  class: "fade"
};
const _hoisted_2$X = /*#__PURE__*/createBaseVNode("p", null, [
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


var script$$ = {
  props: {
  msg: String
},
  setup(__props) {



const state = reactive({ count: 0 });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("h1", _hoisted_1$Z, toDisplayString(__props.msg), 1 /* TEXT */),
    _hoisted_2$X,
    createBaseVNode("button", {
      "xr-layer": "",
      onClick: _cache[0] || (_cache[0] = $event => (unref(state).count++))
    }, "count is: " + toDisplayString(unref(state).count), 1 /* TEXT */)
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$$.__scopeId = "data-v-b474cdac";

pushScopeId("data-v-7010a190");
const _hoisted_1$Y = { id: "room" };
const _hoisted_2$W = /*#__PURE__*/createBaseVNode("img", {
  alt: "Vue logo",
  src: _imports_0$i
}, null, -1 /* HOISTED */);
const _hoisted_3$u = /*#__PURE__*/createTextVNode(" Edit code in ");
const _hoisted_4$n = /*#__PURE__*/createBaseVNode("code", null, "src/apps", -1 /* HOISTED */);
const _hoisted_5$g = /*#__PURE__*/createTextVNode(" to test hot module replacement while running project as \"npm run dev\". ");
const _hoisted_6$6 = [
  _hoisted_3$u,
  _hoisted_4$n,
  _hoisted_5$g
];
popScopeId();


var script$_ = {
  setup(__props) {

const shared = inject('shared');

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$Y, [
      _hoisted_2$W,
      createVNode(script$$, { msg: "Vue Component with Local Button Count" }),
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

script$_.__scopeId = "data-v-7010a190";

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

class HubsApp$Y extends HubsApp$_ {
    shared;
    constructor(params = {}) {
        super(script$_, 500, 500, params);
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
        let adapter = HubsApp$Y.system.getAdapter(this.docs);
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
var init$Y = function (params = {}) {
    let app = new HubsApp$Y(params);
    app.mount();
    return app;
};

var script$Z = {
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

const _hoisted_1$X = { id: "room" };


var script$Y = {
  setup(__props) {

let params = inject("params");
var mesg = params && params.message ? params.message : "PORTAL TITLE";

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$X, [
    createVNode(script$Z, { msg: unref(mesg) }, null, 8 /* PROPS */, ["msg"])
  ]))
}
}

};

class HubsApp$X extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$Y, width, height, params);
    }
}
var init$X = function (params = {}) {
    let app = new HubsApp$X(300, 100, params);
    app.mount();
    return app;
};

var script$X = {
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

const _hoisted_1$W = { id: "room" };


var script$W = {
  setup(__props) {

let params = inject("params");
var mesg = params && params.message ? params.message : "PORTAL SUBTITLE";

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$W, [
    createVNode(script$X, { msg: unref(mesg) }, null, 8 /* PROPS */, ["msg"])
  ]))
}
}

};

class HubsApp$W extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$W, width, height, params);
    }
}
var init$W = function (params = {}) {
    let app = new HubsApp$W(300, 100, params);
    app.mount();
    return app;
};

var _imports_0$h = "https://resources.realitymedia.digital/vue-apps/dist/38d6d7a1e02fc2f9.png";

const _hoisted_1$V = { id: "room" };
const _hoisted_2$V = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$h,
  width: "250"
}, null, -1 /* HOISTED */);
const _hoisted_3$t = /*#__PURE__*/createBaseVNode("div", { class: "displaytext" }, "AR allows us to extend our physical reality; VR creates for us a different reality.", -1 /* HOISTED */);

var script$V = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$V, [
    createVNode(script$Z, { msg: "Reality Media" }),
    _hoisted_2$V,
    _hoisted_3$t
  ]))
}
}

};

class HubsApp$V extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$V, width, height, params);
        //this.isInteractive = true;
    }
}
var init$V = function (params = {}) {
    let app = new HubsApp$V(300, 475, params);
    app.mount();
    return app;
};

var _imports_0$g = "https://resources.realitymedia.digital/vue-apps/dist/7af7b95b35fd7616.jpg";

const _hoisted_1$U = { id: "room" };
const _hoisted_2$U = { class: "spacer" };
const _hoisted_3$s = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$g,
  width: "250"
}, null, -1 /* HOISTED */);
const _hoisted_4$m = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, " Each reality medium mediates and remediates. It offers a new representation of the world that we implicitly compare to our experience of the world in itself, but also through other media.", -1 /* HOISTED */);
const _hoisted_5$f = /*#__PURE__*/createBaseVNode("p", null, [
  /*#__PURE__*/createBaseVNode("a", {
    href: "https://realitymedia.digital",
    target: "_blank"
  }, " Start at the reality media site. "),
  /*#__PURE__*/createTextVNode(" | ")
], -1 /* HOISTED */);

var script$U = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$U, [
    createBaseVNode("div", _hoisted_2$U, [
      createVNode(script$Z, { msg: "AR & VR as reality media" }),
      _hoisted_3$s,
      _hoisted_4$m
    ]),
    _hoisted_5$f
  ]))
}
}

};

class HubsApp$U extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$U, width, height, params);
        this.isInteractive = true;
    }
}
var init$U = function (params = {}) {
    let app = new HubsApp$U(300, 475, params);
    app.mount();
    return app;
};

var _imports_0$f = "https://resources.realitymedia.digital/vue-apps/dist/7ab3d86afd48dbfb.jpg";

const _hoisted_1$T = { id: "room" };
const _hoisted_2$T = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$f,
    width: "250"
  }),
  /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Film became one of the most important reality media of the twentieth century, and in some ways, it is a forerunner of virtual reality.")
], -1 /* HOISTED */);

var script$T = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$T, [
    createVNode(script$Z, { msg: "The LaCiotat Effect" }),
    _hoisted_2$T
  ]))
}
}

};

class HubsApp$T extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$T, width, height, params);
        //this.isInteractive = true;
    }
}
var init$T = function (params = {}) {
    let app = new HubsApp$T(300, 475, params);
    app.mount();
    return app;
};

var _imports_0$e = "https://resources.realitymedia.digital/vue-apps/dist/91fdfa811e752dc8.jpg";

const _hoisted_1$S = { id: "room" };
const _hoisted_2$S = { class: "spacer" };
const _hoisted_3$r = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$e,
  width: "200"
}, null, -1 /* HOISTED */);
const _hoisted_4$l = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "3-D computer graphics help to construct the visual realities of AR and VR, that is photorealism. The uncanny valley.", -1 /* HOISTED */);

var script$S = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$S, [
    createBaseVNode("div", _hoisted_2$S, [
      createVNode(script$Z, { msg: "3-D Graphics & Tracking" }),
      _hoisted_3$r,
      _hoisted_4$l
    ])
  ]))
}
}

};

class HubsApp$S extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$S, width, height, params);
        // this.isInteractive = true;
    }
}
var init$S = function (params = {}) {
    let app = new HubsApp$S(300, 475, params);
    app.mount();
    return app;
};

var _imports_0$d = "https://resources.realitymedia.digital/vue-apps/dist/dc05c04546a69e64.png";

const _hoisted_1$R = { id: "room" };
const _hoisted_2$R = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$d,
    width: "250"
  }),
  /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Presence in VR is usually conceived of as forgetting that the medium is there. The idea is that if the user can be enticed into behaving as if she were not aware of all the complex technology, then she feels presence.")
], -1 /* HOISTED */);

var script$R = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$R, [
    createVNode(script$Z, { msg: "Presence" }),
    _hoisted_2$R
  ]))
}
}

};

class HubsApp$R extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$R, width, height, params);
        //this.isInteractive = true;
    }
}
var init$R = function (params = {}) {
    let app = new HubsApp$R(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$Q = { id: "room" };
const _hoisted_2$Q = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$d,
    width: "250"
  }),
  /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Reality media applications often function as additions to established genres. Most current AR and VR applications behave like applications or artifacts that we know from earlier media.")
], -1 /* HOISTED */);

var script$Q = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$Q, [
    createVNode(script$Z, { msg: "Genres" }),
    _hoisted_2$Q
  ]))
}
}

};

class HubsApp$Q extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$Q, width, height, params);
        //this.isInteractive = true;
    }
}
var init$Q = function (params = {}) {
    let app = new HubsApp$Q(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$P = { id: "room" };
const _hoisted_2$P = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$d,
    width: "250"
  }),
  /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "VR will continue to construct special realities, apart from the everyday. VR worlds will continue to be metaphoric worlds.")
], -1 /* HOISTED */);

var script$P = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$P, [
    createVNode(script$Z, { msg: "The Future of AR & VR" }),
    _hoisted_2$P
  ]))
}
}

};

class HubsApp$P extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$P, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$P = function (params = {}) {
    let app = new HubsApp$P(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$O = { id: "room" };
const _hoisted_2$O = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Pervasive, always-on AR applications have the potential to provide companies or government authorities even more information and with more precision than our current mobile applications do, both by aggregating our habits as consumers and by identifying us as individuals.")
], -1 /* HOISTED */);

var script$O = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$O, [
    createVNode(script$Z, { msg: "Privacy and Public Space" }),
    _hoisted_2$O
  ]))
}
}

};

class HubsApp$O extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$O, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$O = function (params = {}) {
    let app = new HubsApp$O(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$N = { id: "room" };
const _hoisted_2$N = /*#__PURE__*/createBaseVNode("div", { class: "postertitle" }, "AR & VR as reality media", -1 /* HOISTED */);
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
const _hoisted_4$k = [
  _hoisted_2$N,
  _hoisted_3$q
];

var script$N = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$N, _hoisted_4$k))
}
}

};

class HubsApp$N extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$N, width, height, params);
        // this.isInteractive = true;
    }
}
var init$N = function (params = {}) {
    let app = new HubsApp$N(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$M = { id: "room" };
const _hoisted_2$M = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$M = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$M, [
    createVNode(script$Z, { msg: "The History of Reality Media" }),
    _hoisted_2$M
  ]))
}
}

};

class HubsApp$M extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$M, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$M = function (params = {}) {
    let app = new HubsApp$M(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$L = { id: "room" };
const _hoisted_2$L = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$L = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$L, [
    createVNode(script$Z, { msg: "3-D & Tracking" }),
    _hoisted_2$L
  ]))
}
}

};

class HubsApp$L extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$L, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$L = function (params = {}) {
    let app = new HubsApp$L(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$K = { id: "room" };
const _hoisted_2$K = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$K = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$K, [
    createVNode(script$Z, { msg: "Presence" }),
    _hoisted_2$K
  ]))
}
}

};

class HubsApp$K extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$K, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$K = function (params = {}) {
    let app = new HubsApp$K(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$J = { id: "room" };
const _hoisted_2$J = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$J = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$J, [
    createVNode(script$Z, { msg: "Genres" }),
    _hoisted_2$J
  ]))
}
}

};

class HubsApp$J extends HubsApp$_ {
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
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$I = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$I, [
    createVNode(script$Z, { msg: "Future" }),
    _hoisted_2$I
  ]))
}
}

};

class HubsApp$I extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$I, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$I = function (params = {}) {
    let app = new HubsApp$I(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$H = { id: "room" };
const _hoisted_2$H = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$H = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$H, [
    createVNode(script$Z, { msg: "Privacy" }),
    _hoisted_2$H
  ]))
}
}

};

class HubsApp$H extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$H, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$H = function (params = {}) {
    let app = new HubsApp$H(300, 475, params);
    app.mount();
    return app;
};

var _imports_0$c = "https://resources.realitymedia.digital/vue-apps/dist/190994370aebe395.png";

const _hoisted_1$G = { id: "room" };
const _hoisted_2$G = { class: "spacer" };
const _hoisted_3$p = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$c,
  width: "400"
}, null, -1 /* HOISTED */);
const _hoisted_4$j = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$e = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_6$5 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createTextVNode(" First person shooter games such as "),
  /*#__PURE__*/createBaseVNode("a", {
    href: "https://www.half-life.com/en/alyx/",
    target: "_blank"
  }, "HalfLife: Alyx "),
  /*#__PURE__*/createTextVNode(" have long used 3-D graphics to create an immersive experience for millions of players. And for decades, players on computers and game consoles have yearned for true VR so that they could fall through the screen into the worlds on the other side.")
], -1 /* HOISTED */);

var script$G = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$G, [
      createBaseVNode("div", _hoisted_2$G, [
        _hoisted_3$p,
        _hoisted_4$j,
        _hoisted_5$e,
        createVNode(script$Z, { msg: "HalfLife: Alyx" }),
        _hoisted_6$5
      ])
    ])
  ]))
}
}

};

class HubsApp$G extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$G, width, height, params);
        this.isInteractive = true;
    }
}
var init$G = function (params = {}) {
    let app = new HubsApp$G(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$F = { id: "room" };
const _hoisted_2$F = { class: "spacer" };
const _hoisted_3$o = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Pokemon Go (2016) is perhaps still the best-known AR game. The Pokemon franchise was already decades old, and this was certainly part of the answer for the AR game’s surprising impact. It was the first Pokemon game on a mobile phone and the first free Pokemon game on any platform. ", -1 /* HOISTED */);

var script$F = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$F, [
    createBaseVNode("div", _hoisted_2$F, [
      createVNode(script$Z, { msg: "Pokemon Go" }),
      _hoisted_3$o
    ])
  ]))
}
}

};

class HubsApp$F extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$F, width, height, params);
        //     this.isInteractive = true;
    }
}
var init$F = function (params = {}) {
    let app = new HubsApp$F(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$E = { id: "room" };
const _hoisted_2$E = { class: "spacer" };
const _hoisted_3$n = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Beat Saber is a VR rhythm game with a little Star Wars thrown in. The player uses lightsabers to keep the beat. ", -1 /* HOISTED */);

var script$E = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$E, [
    createBaseVNode("div", _hoisted_2$E, [
      createVNode(script$Z, { msg: "Beat Saber" }),
      _hoisted_3$n
    ])
  ]))
}
}

};

class HubsApp$E extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$E, width, height, params);
        // this.isInteractive = true;
    }
}
var init$E = function (params = {}) {
    let app = new HubsApp$E(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$D = { id: "room" };
const _hoisted_2$D = { class: "spacer" };
const _hoisted_3$m = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "In this AR version of the transmedia franchise GPS is used to determine your location in the world. Your location and the zombies appear in an enhanced Google Maps map on the phone screen. ", -1 /* HOISTED */);

var script$D = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$D, [
    createBaseVNode("div", _hoisted_2$D, [
      createVNode(script$Z, { msg: "Walking Dead: Our World" }),
      _hoisted_3$m
    ])
  ]))
}
}

};

class HubsApp$D extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$D, width, height, params);
        // this.isInteractive = true;
    }
}
var init$D = function (params = {}) {
    let app = new HubsApp$D(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$C = { id: "room" };
const _hoisted_2$C = { class: "spacer" };
const _hoisted_3$l = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Like video games and 360-degree video, VR art emphasizes immersion as the feature that makes the experience unique, as in a VR work by Christian Lemmerz entitled La Apparizione (2017). ", -1 /* HOISTED */);

var script$C = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$C, [
    createBaseVNode("div", _hoisted_2$C, [
      createVNode(script$Z, { msg: "La Apparizione" }),
      _hoisted_3$l
    ])
  ]))
}
}

};

class HubsApp$C extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$C, width, height, params);
        //this.isInteractive = true;
    }
}
var init$C = function (params = {}) {
    let app = new HubsApp$C(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$B = { id: "room" };
const _hoisted_2$B = { class: "spacer" };
const _hoisted_3$k = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Minecraft VR is a fully immersive, headset version of the sandbox game that already runs on computers, game consoles, and mobile devices. It is called a \"sandbox game\" because it provides an independent environment in which players can make their own structures and objects out of virtual, LEGO-like blocks. ", -1 /* HOISTED */);

var script$B = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$B, [
    createBaseVNode("div", _hoisted_2$B, [
      createVNode(script$Z, { msg: "Minecraft VR" }),
      _hoisted_3$k
    ])
  ]))
}
}

};

class HubsApp$B extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$B, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$B = function (params = {}) {
    let app = new HubsApp$B(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$A = { id: "room" };
const _hoisted_2$A = { class: "spacer headline" };

var script$A = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$A, [
    createBaseVNode("div", _hoisted_2$A, [
      createVNode(script$Z, { msg: "AR & VR GAMES" })
    ])
  ]))
}
}

};

class HubsApp$A extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$A, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$A = function (params = {}) {
    let app = new HubsApp$A(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$z = { id: "room" };
const _hoisted_2$z = { class: "spacer headline" };

var script$z = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$z, [
    createBaseVNode("div", _hoisted_2$z, [
      createVNode(script$Z, { msg: "AR & VR ART" })
    ])
  ]))
}
}

};

class HubsApp$z extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$z, width, height, params);
        //        this.isInteractive = true;
    }
}
var init$z = function (params = {}) {
    let app = new HubsApp$z(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$y = { id: "room" };
const _hoisted_2$y = { class: "spacer" };
const _hoisted_3$j = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$i = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$d = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Presence is the absence of mediation. If the users can forget that the medium is there, then they feel presence. ", -1 /* HOISTED */);

var script$y = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$y, [
      createBaseVNode("div", _hoisted_2$y, [
        _hoisted_3$j,
        _hoisted_4$i,
        createVNode(script$Z, { msg: "Presence" }),
        _hoisted_5$d
      ])
    ])
  ]))
}
}

};

class HubsApp$y extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$y, width, height, params);
        //this.isInteractive = true;
    }
}
var init$y = function (params = {}) {
    let app = new HubsApp$y(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$x = /*#__PURE__*/createStaticVNode("<div id=\"room\"><div class=\"spacer\"><br><br><!-- &lt;Title msg=&quot;Aura&quot; /&gt; --><div class=\"headline\">Aura</div><br><br><div class=\"squareoff\"><p>In 1930s, Walter Benjamin introduced the concept of <em>aura</em> in The Work of Art in the Age of Mechanical Reproduction. Aura is the <em>here and now</em> that work possesses because of its unique history of production and transmissinowon. </p><p>AR applications are not perfect reproductive technologies, as some draw on the physical and cultural uniquesness, <em>the here and now</em> of particular places </p></div></div></div>", 1);
const _hoisted_2$x = [
  _hoisted_1$x
];

var script$x = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$x))
}
}

};

class HubsApp$x extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$x, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$x = function (params = {}) {
    let app = new HubsApp$x(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$w = { id: "room" };
const _hoisted_2$w = { class: "spacer" };
const _hoisted_3$i = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$h = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$c = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, " The term cybersickness, or visually induced motion sickness, has been coined to describe symptoms including headache, nausea, eye strain, dizziness, fatigue, or even vomiting that may occur during or after exposure to a virtual environment. Cybersickness is visceral evidence that VR is not the medium to end all media. Cybersickness reminds the susceptible user of the medium in a powerful way. Nausea replaces astonishment. ", -1 /* HOISTED */);

var script$w = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$w, [
      createBaseVNode("div", _hoisted_2$w, [
        _hoisted_3$i,
        _hoisted_4$h,
        createVNode(script$Z, { msg: "Cybersickness and the negattion of presence" }),
        _hoisted_5$c
      ])
    ])
  ]))
}
}

};

class HubsApp$w extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$w, width, height, params);
        //    this.isInteractive = true;
    }
}
var init$w = function (params = {}) {
    let app = new HubsApp$w(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$v = { id: "room" };
const _hoisted_2$v = { class: "spacer" };
const _hoisted_3$h = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$g = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$b = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_6$4 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Researchers have long pursued the idea of emotional reactions such as empathy as a test of presence. VR is understood as getting us closer to the authentic or the real. But forgetting the medium is not necessary for a sense of presence. Presence can be understood in a more nuanced way as a liminal zone between forgetting and acknowledging VR as a medium. ", -1 /* HOISTED */);

var script$v = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$v, [
      createBaseVNode("div", _hoisted_2$v, [
        _hoisted_3$h,
        _hoisted_4$g,
        createVNode(script$Z, { msg: "Presence and Empathy" }),
        _hoisted_5$b,
        _hoisted_6$4
      ])
    ])
  ]))
}
}

};

class HubsApp$v extends HubsApp$_ {
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

const _hoisted_1$u = /*#__PURE__*/createBaseVNode("div", { id: "room" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createCommentVNode(" <Title msg=\"Presence and Empathy\" /> "),
    /*#__PURE__*/createBaseVNode("div", { class: "headline" }, "Presence and Empathy")
  ])
], -1 /* HOISTED */);
const _hoisted_2$u = [
  _hoisted_1$u
];

var script$u = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$u))
}
}

};

class HubsApp$u extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$u, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$u = function (params = {}) {
    let app = new HubsApp$u(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$b = "https://resources.realitymedia.digital/vue-apps/dist/46d7793fa7ab24ad.png";

var _imports_1 = "https://resources.realitymedia.digital/vue-apps/dist/beb618ffe3769bb6.png";

var _imports_2 = "https://resources.realitymedia.digital/vue-apps/dist/1e4bde312325195f.png";

const _hoisted_1$t = /*#__PURE__*/createBaseVNode("div", { id: "room" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createCommentVNode(" <Title msg=\"Pit Experiment\" /> "),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$b,
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
const _hoisted_2$t = [
  _hoisted_1$t
];

var script$t = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$t))
}
}

};

class HubsApp$t extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$t, width, height, params);
        //     this.isInteractive = true;
    }
}
var init$t = function (params = {}) {
    let app = new HubsApp$t(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$a = "https://resources.realitymedia.digital/vue-apps/dist/4905757374923259.png";

const _hoisted_1$s = { id: "room" };
const _hoisted_2$s = { class: "spacer" };
const _hoisted_3$g = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$f = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$a = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$a,
  width: "20",
  style: {"float":"left","margin":"10px"}
}, null, -1 /* HOISTED */);
const _hoisted_6$3 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createTextVNode("360"),
  /*#__PURE__*/createBaseVNode("span", null, "°"),
  /*#__PURE__*/createTextVNode(" film Clouds Over Sidra created by Chris Milk and Gabo Arora shows the life of Syrian refugees in Za'atari camp in Jordan. The camera follows 12-year old Sidra in her everyday life, allowing the users to be present with Sidra. ")
], -1 /* HOISTED */);
const _hoisted_7$2 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_8 = /*#__PURE__*/createBaseVNode("blockquote", { class: "squareoff" }, "\"When you’re inside of the headset . . . you see full 360 degrees, in all directions. And when you’re sitting there in her room, watching her, you're not watching it through a television screen, you’re not watching it through a window, you’re sitting there with her. When you look down, you're sitting on the same ground that she’s sitting on. And because of that, you feel her humanity in a deeper way. You empathize with her in a deeper way. (Milk 2015)\"", -1 /* HOISTED */);

var script$s = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$s, [
      createBaseVNode("div", _hoisted_2$s, [
        _hoisted_3$g,
        _hoisted_4$f,
        _hoisted_5$a,
        createVNode(script$Z, { msg: "Ultimate Empathy Machine" }),
        _hoisted_6$3,
        _hoisted_7$2,
        _hoisted_8
      ])
    ])
  ]))
}
}

};

class HubsApp$s extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$s, width, height, params);
        //    this.isInteractive = true;
    }
}
var init$s = function (params = {}) {
    let app = new HubsApp$s(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$9 = "https://resources.realitymedia.digital/vue-apps/dist/b464dbe90d6133ab.jpg";

const _hoisted_1$r = /*#__PURE__*/createBaseVNode("div", { id: "room" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$9,
      width: "700"
    }),
    /*#__PURE__*/createCommentVNode(" <Title msg=\"Ultimate Empathy Machine\" /> ")
  ])
], -1 /* HOISTED */);
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

class HubsApp$r extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$r, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$r = function (params = {}) {
    let app = new HubsApp$r(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$q = { id: "room" };
const _hoisted_2$q = { class: "spacer" };
const _hoisted_3$f = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$e = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$9 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createTextVNode("Nonnie de la Peña's "),
  /*#__PURE__*/createBaseVNode("a", {
    href: "https://embed.ted.com/talks/nonny_de_la_pena_the_future_of_news_virtual_reality",
    target: "_blank"
  }, "Ted Talk"),
  /*#__PURE__*/createTextVNode(" called 'The future of news?'' introduces a new form of journalism where Virtual Reality technology is used to put audience inside the stories. In her work, she created VR stories about imprisonment in Guantanamo and hunger in Los Angeles to induce empathy in the audience.")
], -1 /* HOISTED */);

var script$q = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$q, [
      createBaseVNode("div", _hoisted_2$q, [
        _hoisted_3$f,
        _hoisted_4$e,
        createCommentVNode(" <img src=\"../../../assets/images/Room6/rtarrow.png\" width=\"400\" > "),
        createVNode(script$Z, { msg: "The future of news?" }),
        _hoisted_5$9
      ])
    ])
  ]))
}
}

};

class HubsApp$q extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$q, width, height, params);
        this.isInteractive = true;
    }
}
var init$q = function (params = {}) {
    let app = new HubsApp$q(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$8 = "https://resources.realitymedia.digital/vue-apps/dist/b3933ff359f949ba.png";

const _hoisted_1$p = /*#__PURE__*/createBaseVNode("div", { id: "room" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$8,
      width: "700"
    }),
    /*#__PURE__*/createCommentVNode(" <Title msg=\"The future of news?\" />\n\t<div class=\"squareoff\">Nonnie de la Peña's <a href=\"https://embed.ted.com/talks/nonny_de_la_pena_the_future_of_news_virtual_reality\" target=\"_blank\">Ted Talk</a> called 'The future of news?''  introduces a new form of journalism where Virtual Reality technology is used to put audience inside the stories. In her work, she created VR stories about imprisonment in Guantanamo and hunger in Los Angeles to induce empathy in the audience.</div>  ")
  ])
], -1 /* HOISTED */);
const _hoisted_2$p = [
  _hoisted_1$p
];

var script$p = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$p))
}
}

};

class HubsApp$p extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$p, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$p = function (params = {}) {
    let app = new HubsApp$p(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$o = { id: "room" };
const _hoisted_2$o = { class: "spacer" };
const _hoisted_3$e = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$d = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$8 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "The pit experiment is a virtual experiement often used to evaluate the sence of presence. The user is given a task to grab an object on plank and take it to the other side, crossing the pit. ", -1 /* HOISTED */);

var script$o = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$o, [
      createBaseVNode("div", _hoisted_2$o, [
        _hoisted_3$e,
        _hoisted_4$d,
        createVNode(script$Z, { msg: "Pit Experiment" }),
        _hoisted_5$8
      ])
    ])
  ]))
}
}

};

class HubsApp$o extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$o, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$o = function (params = {}) {
    let app = new HubsApp$o(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$7 = "https://resources.realitymedia.digital/vue-apps/dist/2176dc66f5a02546.png";

const _hoisted_1$n = /*#__PURE__*/createBaseVNode("div", { id: "room" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$7,
      width: "436"
    }),
    /*#__PURE__*/createCommentVNode(" <Title msg=\"Pit Experiment\" /> ")
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

class HubsApp$n extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$n, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$n = function (params = {}) {
    let app = new HubsApp$n(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$m = /*#__PURE__*/createStaticVNode("<div id=\"room\"><div class=\"spacer\"><br><br><!-- &lt;Title msg=&quot;Presence&quot; /&gt; --><div class=\"postertitle\">Presence</div><div class=\"squareoff\">Presence is a kind of absence, the absence of mediation. If the users can forget that the medium is there, then they feel presence. </div><!-- &lt;div class=&quot;postertitle&quot;&gt;Presence is a kind of absence, the absence of mediation. If the users can forget that the medium is there, then they feel presence. &lt;/div&gt; --><!-- &lt;div class=&quot;headline&quot;&gt;Presence is the absence of mediation. If the users can forget that the medium is there, then they feel presence. &lt;/div&gt;\n      &lt;div class=&quot;squareoff&quot;&gt;Presence is a kind of absence, the absence of mediation. If the users can forget that the medium is there, then they feel presence. &lt;/div&gt; --><br><br><div class=\"squareoff\" style=\"font-style:italic;\">&quot;VR and AR cannot deceive their users into believing that they are having a non-mediated experience. But that is not necessary for a sense of presence.&quot;</div></div></div>", 1);
const _hoisted_2$m = [
  _hoisted_1$m
];

var script$m = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$m))
}
}

};

class HubsApp$m extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$m, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$m = function (params = {}) {
    let app = new HubsApp$m(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$l = { id: "room" };
const _hoisted_2$l = { class: "spacer" };
const _hoisted_3$d = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$c = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$7 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createTextVNode("Treehugger: Wawona VR experience transports the users to the red giant Sequoia trees from the Sequoia National Park. It provides a sense of intimacy with the tree - with its bark, with the cells that make up its being. The vividness of the work illustrates "),
  /*#__PURE__*/createBaseVNode("em", null, "presence"),
  /*#__PURE__*/createTextVNode(". ")
], -1 /* HOISTED */);

var script$l = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$l, [
      createBaseVNode("div", _hoisted_2$l, [
        _hoisted_3$d,
        _hoisted_4$c,
        createVNode(script$Z, { msg: "Treehugger: Wawona" }),
        _hoisted_5$7,
        createCommentVNode(" In this experience, users find themselves on the threshold of forgetting that we are having a VR experience. Being on that threshold is a sence of presence in a reality medium. ")
      ])
    ])
  ]))
}
}

};

class HubsApp$l extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$l, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$l = function (params = {}) {
    let app = new HubsApp$l(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$6 = "https://resources.realitymedia.digital/vue-apps/dist/273dec47ec76230d.png";

const _hoisted_1$k = /*#__PURE__*/createBaseVNode("div", { id: "room" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$6,
      width: "800"
    })
  ])
], -1 /* HOISTED */);
const _hoisted_2$k = [
  _hoisted_1$k
];

var script$k = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$k))
}
}

};

class HubsApp$k extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$k, width, height, params);
        // this.isInteractive = true;
    }
}
var init$k = function (params = {}) {
    let app = new HubsApp$k(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$j = { id: "room" };
const _hoisted_2$j = { class: "spacer" };
const _hoisted_3$c = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$b = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);

var script$j = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$j, [
      createBaseVNode("div", _hoisted_2$j, [
        _hoisted_3$c,
        _hoisted_4$b,
        createVNode(script$Z, { msg: "Back to the main exhibition" })
      ])
    ])
  ]))
}
}

};

class HubsApp$j extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$j, width, height, params);
        // this.isInteractive = true;
    }
}
var init$j = function (params = {}) {
    let app = new HubsApp$j(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$i = /*#__PURE__*/createBaseVNode("div", { id: "room" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createCommentVNode(" <Title msg=\"The future of news?\" /> "),
    /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Parthenon model explanation")
  ])
], -1 /* HOISTED */);
const _hoisted_2$i = [
  _hoisted_1$i
];

var script$i = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$i))
}
}

};

class HubsApp$i extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$i, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$i = function (params = {}) {
    let app = new HubsApp$i(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$5 = "https://resources.realitymedia.digital/vue-apps/dist/a7d1244c4b23b7b0.jpg";

const _hoisted_1$h = /*#__PURE__*/createBaseVNode("div", { id: "room" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$5,
      width: "800"
    }),
    /*#__PURE__*/createCommentVNode(" <Title msg=\"The future of news?\" />\n\t<div class=\"squareoff\">Nonnie de la Peña's <a href=\"https://embed.ted.com/talks/nonny_de_la_pena_the_future_of_news_virtual_reality\" target=\"_blank\">Ted Talk</a> called 'The future of news?''  introduces a new form of journalism where Virtual Reality technology is used to put audience inside the stories. In her work, she created VR stories about imprisonment in Guantanamo and hunger in Los Angeles to induce empathy in the audience.</div>  ")
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

class HubsApp$h extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$h, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$h = function (params = {}) {
    let app = new HubsApp$h(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$g = { id: "room" };
const _hoisted_2$g = { class: "spacer" };
const _hoisted_3$b = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "\"The Franklin Institute is using AR to enhance their Terracotta Warrior exhibition which were displayed in Philadelphia until March 2018. The museum’s app, powered by Wikitude technology, allows visitors to use their smartphone to scan items and visualize rich AR content to learn even more about the intriguing history behind the magnificent clay soldiers.\"", -1 /* HOISTED */);

var script$g = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$g, [
      createBaseVNode("div", _hoisted_2$g, [
        createVNode(script$Z, { msg: "Terracotta Warriors AR" }),
        _hoisted_3$b
      ])
    ])
  ]))
}
}

};

class HubsApp$g extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$g, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$g = function (params = {}) {
    let app = new HubsApp$g(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$4 = "https://resources.realitymedia.digital/vue-apps/dist/b2c77009644a7d45.jpg";

const _hoisted_1$f = /*#__PURE__*/createBaseVNode("div", { id: "room" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$4,
      width: "600"
    })
  ])
], -1 /* HOISTED */);
const _hoisted_2$f = [
  _hoisted_1$f
];

var script$f = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$f))
}
}

};

class HubsApp$f extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$f, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$f = function (params = {}) {
    let app = new HubsApp$f(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$e = { id: "room" };
const _hoisted_2$e = { class: "spacer" };
const _hoisted_3$a = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$a = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$6 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Through the virtual pit experiment, subjects experience a higher sense of presence. ", -1 /* HOISTED */);

var script$e = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$e, [
      createBaseVNode("div", _hoisted_2$e, [
        _hoisted_3$a,
        _hoisted_4$a,
        createVNode(script$Z, { msg: "Pit Experiment" }),
        _hoisted_5$6
      ])
    ])
  ]))
}
}

};

class HubsApp$e extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$e, width, height, params);
    }
}
var init$e = function (params = {}) {
    let app = new HubsApp$e(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$d = { id: "room" };
const _hoisted_2$d = { class: "spacer" };
const _hoisted_3$9 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$9 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$5 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Try walking across the pit without losing balance or falling.", -1 /* HOISTED */);

var script$d = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$d, [
      createBaseVNode("div", _hoisted_2$d, [
        _hoisted_3$9,
        _hoisted_4$9,
        createVNode(script$Z, { msg: "Pit Experiment Instruction" }),
        _hoisted_5$5
      ])
    ])
  ]))
}
}

};

class HubsApp$d extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$d, width, height, params);
    }
}
var init$d = function (params = {}) {
    let app = new HubsApp$d(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$c = { id: "room" };
const _hoisted_2$c = { class: "spacer" };
const _hoisted_3$8 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$8 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);

var script$c = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$c, [
      createBaseVNode("div", _hoisted_2$c, [
        _hoisted_3$8,
        _hoisted_4$8,
        createVNode(script$Z, { msg: "Very carefully stretch your arms out for balance." }),
        createCommentVNode(" <div class=\"squareoff\"> First person shooter games such as  <a href=\"https://www.half-life.com/en/alyx/\" target=\"_blank\">HalfLife: Alyx </a> have long used 3-D graphics to create an immersive experience for millions of players. And for decades, \n    players on computers and game consoles have yearned for true VR so that they could fall through the screen into the worlds on the other side.</div>  ")
      ])
    ])
  ]))
}
}

};

class HubsApp$c extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$c, width, height, params);
    }
}
var init$c = function (params = {}) {
    let app = new HubsApp$c(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$b = { id: "room" };
const _hoisted_2$b = { class: "spacer" };
const _hoisted_3$7 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$7 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);

var script$b = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$b, [
      createBaseVNode("div", _hoisted_2$b, [
        _hoisted_3$7,
        _hoisted_4$7,
        createVNode(script$Z, { msg: "What do you see on the floor right now?" }),
        createCommentVNode(" <div class=\"squareoff\"> First person shooter games such as  <a href=\"https://www.half-life.com/en/alyx/\" target=\"_blank\">HalfLife: Alyx </a> have long used 3-D graphics to create an immersive experience for millions of players. And for decades, \n    players on computers and game consoles have yearned for true VR so that they could fall through the screen into the worlds on the other side.</div>  ")
      ])
    ])
  ]))
}
}

};

class HubsApp$b extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$b, width, height, params);
    }
}
var init$b = function (params = {}) {
    let app = new HubsApp$b(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$a = { id: "room" };
const _hoisted_2$a = { class: "spacer" };
const _hoisted_3$6 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$6 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$4 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createBaseVNode("i", null, "Reality Media"),
  /*#__PURE__*/createTextVNode(" is a project encompassing three writing spaces, three technologies for representing ideas: print, the web, and immersive VR. The printed page is a writing space with a tradition dating back to the fifteenth century (in Europe, much earlier in China). Obviously the web has a far shorter tradition, beginning around 1990. But in the thirty year since Tim Berners-Lee launched the first web server, the web has grown to rival print for many kinds of communication. The technologies for creating 3D graphic spaces in VR (and AR) actually predate the web. But only in the past 10 years have AR and VR become widely available media. The goal of RealityMedia is to demonstrate the potential range of AR and VR as communicative forms. ")
], -1 /* HOISTED */);

var script$a = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$a, [
      createBaseVNode("div", _hoisted_2$a, [
        createCommentVNode(" <img src=\"../../../assets/images/Room5/Alyx-splash.png\" width=\"400\" > "),
        createVNode(script$Z, { msg: "Welcome to Reality Media!" }),
        _hoisted_3$6,
        _hoisted_4$6,
        _hoisted_5$4
      ])
    ])
  ]))
}
}

};

class HubsApp$a extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$a, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$a = function (params = {}) {
    let app = new HubsApp$a(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$3 = "https://resources.realitymedia.digital/vue-apps/dist/7a24a6d309d453f2.jpg";

const _hoisted_1$9 = { id: "room" };
const _hoisted_2$9 = { class: "spacer" };
const _hoisted_3$5 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$5 = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$3,
  width: "300",
  style: {"float":"left","margin-right":"20px"}
}, null, -1 /* HOISTED */);
const _hoisted_5$3 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createBaseVNode("div", { style: {"margin-left":"30px"} }, [
    /*#__PURE__*/createTextVNode("Published by "),
    /*#__PURE__*/createBaseVNode("a", { href: "https://mitpress.mit.edu/books/reality-media" }, "MIT Press")
  ]),
  /*#__PURE__*/createBaseVNode("div", { class: "oblique" }, "By Jay David Bolter, Maria Engberg and Blair MacIntyre"),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("div", { class: "quote" }, "How augmented reality and virtual reality are taking their places in contemporary media culture alongside film and television.")
], -1 /* HOISTED */);

var script$9 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$9, [
      createBaseVNode("div", _hoisted_2$9, [
        createVNode(script$Z, { msg: "Reality Media" }),
        createCommentVNode(" <div style=\"width:auto\"></div> "),
        _hoisted_3$5,
        _hoisted_4$5,
        _hoisted_5$3
      ])
    ])
  ]))
}
}

};

class HubsApp$9 extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$9, width, height, params);
        this.isInteractive = true;
    }
}
var init$9 = function (params = {}) {
    let app = new HubsApp$9(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$8 = { id: "room" };
const _hoisted_2$8 = { class: "spacer" };
const _hoisted_3$4 = /*#__PURE__*/createBaseVNode("div", {
  class: "squareoff",
  style: {"width":"380px"}
}, [
  /*#__PURE__*/createTextVNode("Published by "),
  /*#__PURE__*/createBaseVNode("a", { href: "https://mitpress.mit.edu/books/reality-media" }, "MIT Press")
], -1 /* HOISTED */);
const _hoisted_4$4 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$2 = /*#__PURE__*/createBaseVNode("div", { class: "oblique squareoff" }, "By Jay David Bolter, Maria Engberg and Blair MacIntyre", -1 /* HOISTED */);
const _hoisted_6$2 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_7$1 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff quote" }, "\"How augmented reality and virtual reality are taking their places in contemporary media culture alongside film and television.\" ", -1 /* HOISTED */);

var script$8 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$8, [
      createBaseVNode("div", _hoisted_2$8, [
        createVNode(script$Z, { msg: "Book: Reality Media" }),
        _hoisted_3$4,
        _hoisted_4$4,
        _hoisted_5$2,
        _hoisted_6$2,
        _hoisted_7$1
      ])
    ])
  ]))
}
}

};

class HubsApp$8 extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$8, width, height, params);
        this.isInteractive = true;
    }
}
var init$8 = function (params = {}) {
    let app = new HubsApp$8(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$2 = "https://resources.realitymedia.digital/vue-apps/dist/5b14da96e2889ff2.jpg";

const _hoisted_1$7 = { id: "room" };
const _hoisted_2$7 = { class: "spacer" };
const _hoisted_3$3 = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$2,
  width: "400"
}, null, -1 /* HOISTED */);
const _hoisted_4$3 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$1 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
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
  /*#__PURE__*/createBaseVNode("br")
], -1 /* HOISTED */);

var script$7 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$7, [
      createBaseVNode("div", _hoisted_2$7, [
        _hoisted_3$3,
        _hoisted_4$3,
        _hoisted_5$1,
        createVNode(script$Z, { msg: "The Hubs Platform" }),
        _hoisted_6$1
      ])
    ])
  ]))
}
}

};

class HubsApp$7 extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$7, width, height, params);
        this.isInteractive = true;
    }
}
var init$7 = function (params = {}) {
    let app = new HubsApp$7(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$6 = /*#__PURE__*/createStaticVNode("<div id=\"room\"><div class=\"spacer\"><div class=\"squareoff\"><br><br><br><div class=\"keyPoint\">To enter the room:</div><br> - On a desktop or mobile device, follow the prompts to select a name/avatar and enable the mic. <br> - On a VR headset, if you opened the URL on your desktop or smartphone, choose &quot;Enter on Standalone VR&quot; to create a code that makes it easy to open on your standalone headset. Open the browser in your VR headset, navigate to hubs.link and enter the code. <br><br><div class=\"keyPoint\">To navigate in Hubs:</div><br> - On desktop use your WASD or arrow keys to move around. You can also press your right mouse button to teleport to a different location. Rotate your view using the Q and E keys, or hold down your left mouse button and drag. <br> - For VR and mobile controls, see the list of <a href=\"https://hubs.mozilla.com/docs/hubs-controls.html\" target=\"blank\">Hubs controls.</a></div></div></div>", 1);
const _hoisted_2$6 = [
  _hoisted_1$6
];

var script$6 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$6))
}
}

};

class HubsApp$6 extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$6, width, height, params);
        this.isInteractive = true;
    }
}
var init$6 = function (params = {}) {
    let app = new HubsApp$6(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$1 = "https://resources.realitymedia.digital/vue-apps/dist/5d42bc6b2a074ccd.png";

const _hoisted_1$5 = { id: "room" };
const _hoisted_2$5 = { class: "spacer" };
const _hoisted_3$2 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$2 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, " The figure below indicates how to mute your microphone, take photos, share your screen, create media objects, and so on: ", -1 /* HOISTED */);
const _hoisted_5 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_6 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_7 = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$1,
  width: "400"
}, null, -1 /* HOISTED */);

var script$5 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$5, [
      createBaseVNode("div", _hoisted_2$5, [
        createVNode(script$Z, { msg: "Features in Hubs" }),
        _hoisted_3$2,
        _hoisted_4$2,
        _hoisted_5,
        _hoisted_6,
        _hoisted_7
      ])
    ])
  ]))
}
}

};

class HubsApp$5 extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$5, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$5 = function (params = {}) {
    let app = new HubsApp$5(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$4 = { id: "room" };
const _hoisted_2$4 = { class: "spacer" };
const _hoisted_3$1 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$1 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);

var script$4 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$4, [
      createBaseVNode("div", _hoisted_2$4, [
        createCommentVNode(" <Title msg=\"How to Use the Audio Pads\" /> "),
        createVNode(script$Z, { msg: "Standing on the Audio Pads will start the narration about the room or the sound of the video clip." }),
        _hoisted_3$1,
        _hoisted_4$1,
        createCommentVNode(" <div class=\"squareoff\">Standing on the Audio Pads will start the narration about the room or the sound of the video clip.</div>  ")
      ])
    ])
  ]))
}
}

};

class HubsApp$4 extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$4, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$4 = function (params = {}) {
    let app = new HubsApp$4(600, 475, params);
    app.mount();
    return app;
};

var _imports_0 = "https://resources.realitymedia.digital/vue-apps/dist/82a911d289cd2836.png";

const _hoisted_1$3 = { id: "room" };
const _hoisted_2$3 = { class: "spacer" };
const _hoisted_3 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "keyPoint" }, "Visit the exhibit with friends"),
  /*#__PURE__*/createTextVNode(" Sharing the URL of the room you are currently in will allow others to join your experience. "),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("div", { class: "keyPoint" }, "Favorite your room"),
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0,
    width: "400"
  }),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createTextVNode(" Set your room as a favorite under the 'more' menu. Then, you can easily revisit the room from the list in the 'favorite rooms'. ")
], -1 /* HOISTED */);

var script$3 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$3, [
      createBaseVNode("div", _hoisted_2$3, [
        createVNode(script$Z, { msg: "Other ways to use the room" }),
        _hoisted_3,
        _hoisted_4
      ])
    ])
  ]))
}
}

};

class HubsApp$3 extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$3, width, height, params);
        //this.isInteractive = true;
    }
}
var init$3 = function (params = {}) {
    let app = new HubsApp$3(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$2 = /*#__PURE__*/createBaseVNode("div", { id: "room" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createCommentVNode(" <Title msg=\"Here is a map, which you will also find posted through the galleries\" />   "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("div", { class: "squareoff keyPoint" }, "Here is a map, which you will also find posted through the galleries")
  ])
], -1 /* HOISTED */);
const _hoisted_2$2 = [
  _hoisted_1$2
];

var script$2 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$2))
}
}

};

class HubsApp$2 extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$2, width, height, params);
        //this.isInteractive = true;
    }
}
var init$2 = function (params = {}) {
    let app = new HubsApp$2(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$1 = /*#__PURE__*/createBaseVNode("div", { id: "room" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
      /*#__PURE__*/createBaseVNode("br"),
      /*#__PURE__*/createBaseVNode("br"),
      /*#__PURE__*/createBaseVNode("br"),
      /*#__PURE__*/createBaseVNode("br"),
      /*#__PURE__*/createBaseVNode("br"),
      /*#__PURE__*/createTextVNode(" Each gallery in this “immersive book” corresponds to one or more chapters in the printed book and illustrates the themes of the printed chapter(s). (See the map on the far wall for the names/themes of the galleries.) For example, the gallery entitled “Presence” illustrates both presence and the related concept of aura and how computer scientists as well as filmmakers and designers have tried to evoke these reactions in visitors to their immersive applications. ")
    ])
  ])
], -1 /* HOISTED */);
const _hoisted_2$1 = [
  _hoisted_1$1
];

var script$1 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$1))
}
}

};

class HubsApp$1 extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script$1, width, height, params);
        //this.isInteractive = true;
    }
}
var init$1 = function (params = {}) {
    let app = new HubsApp$1(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1 = { id: "room" };
const _hoisted_2 = { class: "spacer" };

var script = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1, [
      createBaseVNode("div", _hoisted_2, [
        createVNode(script$Z, { msg: "Return back to the website" }),
        createCommentVNode(" <div class=\"squareoff\" style=\"font-size:45px\">Return back to the website</div> ")
      ])
    ])
  ]))
}
}

};

class HubsApp extends HubsApp$_ {
    constructor(width, height, params = {}) {
        super(script, width, height, params);
        //this.isInteractive = true;
    }
}
var init = function () {
    let app = new HubsApp(600, 475);
    app.mount();
    return app;
};

export { init$y as ARandPresence, init$G as Alyx, init$C as Apparizione, init$z as ArtBanner, init$4 as AudioText, init$x as Aura, init as Back, init$E as BeatSaber, init$U as Center1, init$T as Center2, init$S as Center3, init$R as Center4, init$Q as Center5, init$P as Center6, init$O as Center7, init$v as Empathy, init$u as Empathy_title, init$j as Exit, init$A as GamesBanner, init$5 as HubsFeatures, init$7 as HubsPlatform, init$6 as HubsPlatform2, init$V as Map, init$s as Milk, init$r as Milk_pic, init$B as Minecraft, init$9 as MitPress, init$8 as MitText, init$N as Monolith1, init$M as Monolith2, init$L as Monolith3, init$K as Monolith4, init$J as Monolith5, init$I as Monolith6, init$H as Monolith7, init$q as Nonnie, init$p as Nonnie_pic, init$1 as Overview, init$i as Parthenon, init$e as Pit, init$o as PitExperiment, init$d as PitInstruction, init$n as Pit_pic, init$F as Pokemon, init$W as PortalSubtitle, init$X as PortalTitle, init$m as Presence, init$t as Presence_map, init$3 as Sharing, init$g as Terracotta, init$h as TerracottaPic, init$l as Treehugger, init$k as Treehugger_pic, init$f as Treehuggerpic2, init$D as WalkingDead, init$a as Welcome, init$w as cybersickness, init$Z as hubsTest1, init$Y as hubsTest2, initializeEthereal, init$c as pitSign1, init$b as pitSign2, init$2 as rotundaMap, systemTick };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHVicy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Fzc2V0cy9sb2dvLnBuZyIsIi4uLy4uL3NyYy9jb21wb25lbnRzL05ldHdvcmtlZEhlbGxvV29ybGQudnVlIiwiLi4vLi4vc3JjL2FwcHMvVGVzdGluZy9IdWJzVGVzdDEvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Z1ZUFwcC50cyIsIi4uLy4uL3NyYy9hcHBzL0h1YnNBcHAudHMiLCIuLi8uLi9zcmMvYXBwcy9UZXN0aW5nL0h1YnNUZXN0MS9zaGFyZWQudHMiLCIuLi8uLi9zcmMvYXBwcy9UZXN0aW5nL0h1YnNUZXN0MS9odWJzLnRzIiwiLi4vLi4vc3JjL2NvbXBvbmVudHMvSGVsbG9Xb3JsZC52dWUiLCIuLi8uLi9zcmMvYXBwcy9UZXN0aW5nL0h1YnNUZXN0Mi9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvVGVzdGluZy9IdWJzVGVzdDIvc2hhcmVkLnRzIiwiLi4vLi4vc3JjL2FwcHMvVGVzdGluZy9IdWJzVGVzdDIvaHVicy50cyIsIi4uLy4uL3NyYy9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1BvcnRhbC9Qb3J0YWxUaXRsZS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUG9ydGFsL1BvcnRhbFRpdGxlL2h1YnMudHMiLCIuLi8uLi9zcmMvY29tcG9uZW50cy9DZW50ZXJTdWJ0aXRsZS52dWUiLCIuLi8uLi9zcmMvYXBwcy9Qb3J0YWwvUG9ydGFsU3VidGl0bGUvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1BvcnRhbC9Qb3J0YWxTdWJ0aXRsZS9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvcm90dW5kYS1tYXAucG5nIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyX01hcC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyX01hcC9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvbGFjaW90YXQtVlIuanBnIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyMV9JbnRyby9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyMV9JbnRyby9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvbGFjaW90YXQuanBnIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyMl9IaXN0b3J5L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXIyX0hpc3RvcnkvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL3VuY2FubnkuanBnIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyM18zRC1UcmFja2luZy9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyM18zRC1UcmFja2luZy9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvcGFydGhlbm9uLnBuZyIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjRfUHJlc2VuY2UvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjRfUHJlc2VuY2UvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjVfR2VucmVzL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXI1X0dlbnJlcy9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyNl9GdXR1cmUvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjZfRnV0dXJlL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXI3X1ByaXZhY3kvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjdfUHJpdmFjeS9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGgxX0ludHJvL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDFfSW50cm8vaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoMl9IaXN0b3J5L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDJfSGlzdG9yeS9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGgzXzNELVRyYWNraW5nL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDNfM0QtVHJhY2tpbmcvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoNF9QcmVzZW5jZS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGg0X1ByZXNlbmNlL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDVfR2VucmVzL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDVfR2VucmVzL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDZfRnV0dXJlL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDZfRnV0dXJlL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDdfUHJpdmFjeS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGg3X1ByaXZhY3kvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb201L0FseXgtc3BsYXNoLnBuZyIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L0FseXgvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L0FseXgvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L1Bva2Vtb24vQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L1Bva2Vtb24vaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L0JlYXRTYWJlci9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvQmVhdFNhYmVyL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNS9XYWxraW5nRGVhZC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvV2Fsa2luZ0RlYWQvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L0FwcGFyaXppb25lL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNS9BcHBhcml6aW9uZS9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvTWluZWNyYWZ0L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNS9NaW5lY3JhZnQvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L0dhbWVzQmFubmVyL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNS9HYW1lc0Jhbm5lci9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvQXJ0QmFubmVyL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNS9BcnRCYW5uZXIvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0FSYW5kUHJlc2VuY2UvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0FSYW5kUHJlc2VuY2UvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0F1cmEvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0F1cmEvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L2N5YmVyc2lja25lc3MvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L2N5YmVyc2lja25lc3MvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0VtcGF0aHkvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0VtcGF0aHkvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0VtcGF0aHlfdGl0bGUvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0VtcGF0aHlfdGl0bGUvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L3JpZ2h0YXJyb3cucG5nIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvUm9vbTYvdXBhcnJvdy5wbmciLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9Sb29tNi91cmFycm93LnBuZyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L21hcC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvbWFwL2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9Sb29tNi9sZmFycm93LnBuZyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L01pbGsvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L01pbGsvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L2Nsb3Vkb3ZlcnNpZHJhLmpwZyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L01pbGtfcGljL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9NaWxrX3BpYy9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvTm9ubmllL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9Ob25uaWUvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L25vbm5pZS5wbmciLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9Ob25uaWVfcGljL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9Ob25uaWVfcGljL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QaXRFeHBlcmltZW50L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QaXRFeHBlcmltZW50L2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9Sb29tNi9waXRWUi5wbmciLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QaXRfcGljL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QaXRfcGljL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QcmVzZW5jZS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvUHJlc2VuY2UvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1RyZWVodWdnZXIvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1RyZWVodWdnZXIvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L3RyZWVodWdnZXIucG5nIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvVHJlZWh1Z2dlcl9waWMvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1RyZWVodWdnZXJfcGljL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9FeGl0L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9FeGl0L2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QYXJ0aGVub24vQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1BhcnRoZW5vbi9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvUm9vbTYvdGVycmFjb3R0YS5qcGciLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9UZXJyYWNvdHRhUGljL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9UZXJyYWNvdHRhUGljL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9UZXJyYWNvdHRhL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9UZXJyYWNvdHRhL2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9Sb29tNi90cmVlaHVnZ2VyMi5qcGciLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9UcmVlaHVnZ2VyUGljMi9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvVHJlZWh1Z2dlclBpYzIvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb21fUGl0L1BpdC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbV9QaXQvUGl0L2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tX1BpdC9QaXRJbnN0cnVjdGlvbi9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbV9QaXQvUGl0SW5zdHJ1Y3Rpb24vaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb21fUGl0L3BpdFNpZ24xL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tX1BpdC9waXRTaWduMS9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbV9QaXQvcGl0U2lnbjIvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb21fUGl0L3BpdFNpZ24yL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL1dlbGNvbWUvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvV2VsY29tZS9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvT25ib2FyZGluZy9yZWFsaXR5TWVkaWFCb29rLmpwZyIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvTWl0UHJlc3MvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvTWl0UHJlc3MvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvTWl0VGV4dC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9NaXRUZXh0L2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9PbmJvYXJkaW5nL01vemlsbGFIdWJzLmpwZyIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvSHVic1BsYXRmb3JtL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL0h1YnNQbGF0Zm9ybS9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9IdWJzUGxhdGZvcm0yL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL0h1YnNQbGF0Zm9ybTIvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL09uYm9hcmRpbmcvaHVicy11c2VyLWludGVyZmFjZS5wbmciLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL0h1YnNGZWF0dXJlcy9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9IdWJzRmVhdHVyZXMvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvQXVkaW9UZXh0L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL0F1ZGlvVGV4dC9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvT25ib2FyZGluZy9mYXZvcml0ZS5wbmciLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL1NoYXJpbmcvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvU2hhcmluZy9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9yb3R1bmRhTWFwL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL3JvdHVuZGFNYXAvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvT3ZlcnZpZXcvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvT3ZlcnZpZXcvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvQmFjay9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9CYWNrL2h1YnMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzFhNmFjZTM3NzEzM2YxNGEucG5nXCIiLCI8dGVtcGxhdGU+XG4gIDxoMSB4ci1sYXllciBjbGFzcz1cImZhZGVcIj57eyBtc2cgfX08L2gxPlxuICA8cD5cbiAgICBIZXJlJ3Mgc29tZSBtb3JlIHRleHQganVzdCB0byBtYWtlIHRoaW5ncyBub3QgYmxhbmsuXG4gIDwvcD5cblxuICA8YnV0dG9uIHhyLWxheWVyIEBjbGljaz1cInNoYXJlZC5pbmNyZW1lbnRcIj5jb3VudCBpczoge3sgc2hhcmVkLnN0YXRlLmNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgaW5qZWN0IH0gZnJvbSAndnVlJ1xuXG5kZWZpbmVQcm9wcyh7XG4gIG1zZzogU3RyaW5nXG59KVxuXG5jb25zdCBzaGFyZWQgPSBpbmplY3QoJ3NoYXJlZCcpXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbmEge1xuICBjb2xvcjogI2I1NDJiOTtcbn1cblxuLmZhZGUge1xuICBjb2xvcjogIzk4MDNhNTtcbiAgLyogdHJhbnNpdGlvbjogY29sb3IgMXM7ICovXG59XG5cbi5mYWRlOmhvdmVyIHtcbiAgY29sb3I6ICNhNzhlMDY7XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICAgICAgPGltZyBhbHQ9XCJWdWUgbG9nb1wiIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9sb2dvLnBuZ1wiIC8+XG4gICAgICA8U29tZVRleHQgdi1iaW5kOm1zZz1cIm1lc2dcIiAvPlxuICAgICAgPCEtLSA8U29tZVRleHQgbXNnPVwiTmV0d29ya2VkIFZ1ZSBDb21wb25lbnQgd2l0aCBTaGFyZWQgQnV0dG9uIENvdW50XCIgLz4gLS0+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IGluamVjdCB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBTb21lVGV4dCBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL05ldHdvcmtlZEhlbGxvV29ybGQudnVlJ1xuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcblxubGV0IHBhcmFtcyA9IGluamVjdChcInBhcmFtc1wiKVxudmFyIG1lc2cgPSBwYXJhbXMgJiYgcGFyYW1zLm1lc2cgPyBwYXJhbXMubWVzZyA6IFwiTmV0d29ya2VkIFZ1ZSBDb21wb25lbnQgd2l0aCBTaGFyZWQgQnV0dG9uIENvdW50XCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuPC9zdHlsZT5cbiIsImltcG9ydCB7IGNyZWF0ZUFwcCwgQXBwLCBDb21wb25lbnQsIENvbXBvbmVudFB1YmxpY0luc3RhbmNlIH0gZnJvbSBcInZ1ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWdWVBcHAge1xuICAgIHRha2VPd25lcnNoaXA6ICAoKSA9PiBib29sZWFuXG4gICAgc2V0U2hhcmVkRGF0YTogKG9iamVjdDoge30pID0+IGJvb2xlYW5cblxuICAgIHdpZHRoOiBudW1iZXJcbiAgICBoZWlnaHQ6IG51bWJlclxuXG4gICAgdnVlQXBwOiBBcHBcbiAgICB2dWVSb290OiBDb21wb25lbnRQdWJsaWNJbnN0YW5jZSB8IHVuZGVmaW5lZFxuXG4gICAgY29uc3RydWN0b3IgKEFwcDogQ29tcG9uZW50LCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgY3JlYXRlT3B0aW9uczogYW55ID17fSkge1xuICAgICAgICB0aGlzLnRha2VPd25lcnNoaXAgPSB0aGlzLnRha2VPd25lcnNoaXBQcm90by5iaW5kKHRoaXMpXG4gICAgICAgIHRoaXMuc2V0U2hhcmVkRGF0YSA9IHRoaXMuc2V0U2hhcmVkRGF0YVByb3RvLmJpbmQodGhpcylcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0XG5cbiAgICAgICAgdGhpcy52dWVBcHAgPSBjcmVhdGVBcHAoQXBwLCBjcmVhdGVPcHRpb25zKVxuICAgIH1cblxuICAgIG1vdW50KCkge1xuICAgIH1cblxuICAgIC8vIGR1bW15IGZ1bmN0aW9ucywganVzdCB0byBsZXQgdXMgdXNlIHRoZSBzYW1lXG4gICAgLy8gZGF0YSBzdG9yZSB3aXRoIGh1YnMgYW5kIHRoZSB3ZWIgdGVzdGluZyBzZXR1cFxuICAgIHRha2VPd25lcnNoaXBQcm90bygpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHNldFNoYXJlZERhdGFQcm90byhvYmplY3Q6IHt9KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBjcmVhdGVBcHAsIEFwcCwgQ29tcG9uZW50LCBDb21wb25lbnRQdWJsaWNJbnN0YW5jZSB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IFNjZW5lLCBFbnRpdHkgfSBmcm9tICdhZnJhbWUnXG5pbXBvcnQgeyBFdGhlcmVhbExheW91dFN5c3RlbSwgV2ViTGF5ZXIzRCB9IGZyb20gXCJldGhlcmVhbFwiO1xuaW1wb3J0IFZ1ZUFwcCAgZnJvbSBcIi4vVnVlQXBwXCJcblxuLy8gY3JlYXRlIGluaXQgbWV0aG9kIGZvciBldGhlcmVhbFxuaW1wb3J0ICogYXMgZXRoZXJlYWwgZnJvbSAnZXRoZXJlYWwnXG5pbXBvcnQgeyBjcmVhdGVQcmludGVyLCBUaGlzRXhwcmVzc2lvbiwgVGhyb3dTdGF0ZW1lbnQgfSBmcm9tIFwibm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQvbGliL3R5cGVzY3JpcHRcIjtcbmltcG9ydCB7IGNyZWF0ZSB9IGZyb20gXCJtYXRoanNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemVFdGhlcmVhbCgpIHtcbiAgICBIdWJzQXBwLmluaXRpYWxpemVFdGhlcmVhbCgpXG59XG5cbi8vVEhSRUUuT2JqZWN0M0QuRGVmYXVsdE1hdHJpeEF1dG9VcGRhdGUgPSB0cnVlO1xuXG5leHBvcnQgZnVuY3Rpb24gc3lzdGVtVGljayh0aW1lOiBudW1iZXIsIGRlbHRhVGltZTogbnVtYmVyKSB7XG4gICBIdWJzQXBwLnN5c3RlbVRpY2sodGltZSwgZGVsdGFUaW1lKVxufVxuXG5mdW5jdGlvbiBjb3B5Q2FtZXJhKHNvdXJjZTogVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEsIHRhcmdldDogVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEpIHtcbiAgICBzb3VyY2UudXBkYXRlTWF0cml4V29ybGQoKVxuICAgIC8vbGV0IG9sZE5hbWUgPSB0YXJnZXQubmFtZVxuICAgIC8vdGFyZ2V0LmNvcHkoc291cmNlLCBmYWxzZSlcbiAgICAvL3RhcmdldC5uYW1lID0gb2xkTmFtZVxuXG4gICAgdGFyZ2V0LmZvdiA9IHNvdXJjZS5mb3Y7XG4gICAgdGFyZ2V0Lnpvb20gPSBzb3VyY2Uuem9vbTtcblxuICAgIHRhcmdldC5uZWFyID0gc291cmNlLm5lYXI7XG4gICAgdGFyZ2V0LmZhciA9IHNvdXJjZS5mYXI7XG5cbiAgICB0YXJnZXQuYXNwZWN0ID0gc291cmNlLmFzcGVjdDtcblxuICAgIC8vIHRhcmdldC5tYXRyaXhXb3JsZEludmVyc2UuY29weSggc291cmNlLm1hdHJpeFdvcmxkSW52ZXJzZSApO1xuICAgIC8vIHRhcmdldC5wcm9qZWN0aW9uTWF0cml4LmNvcHkoIHNvdXJjZS5wcm9qZWN0aW9uTWF0cml4ICk7XG4gICAgLy8gdGFyZ2V0LnByb2plY3Rpb25NYXRyaXhJbnZlcnNlLmNvcHkoIHNvdXJjZS5wcm9qZWN0aW9uTWF0cml4SW52ZXJzZSApO1xuXG4gICAgLy8gdGFyZ2V0LnVwLmNvcHkoIHNvdXJjZS51cCApO1xuXG4gICAgLy8gdGFyZ2V0Lm1hdHJpeC5jb3B5KCBzb3VyY2UubWF0cml4ICk7XG4gICAgLy8gdGFyZ2V0Lm1hdHJpeFdvcmxkLmNvcHkoIHNvdXJjZS5tYXRyaXhXb3JsZCApO1xuXG4gICAgLy8gdGFyZ2V0Lm1hdHJpeEF1dG9VcGRhdGUgPSBzb3VyY2UubWF0cml4QXV0b1VwZGF0ZTtcbiAgICAvLyB0YXJnZXQubWF0cml4V29ybGROZWVkc1VwZGF0ZSA9IHNvdXJjZS5tYXRyaXhXb3JsZE5lZWRzVXBkYXRlO1xuXG4gICAgc291cmNlLm1hdHJpeFdvcmxkLmRlY29tcG9zZSggdGFyZ2V0LnBvc2l0aW9uLCB0YXJnZXQucXVhdGVybmlvbiwgdGFyZ2V0LnNjYWxlKVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB0YXJnZXQucm90YXRpb24uc2V0RnJvbVF1YXRlcm5pb24oIHRhcmdldC5xdWF0ZXJuaW9uLCB1bmRlZmluZWQsIGZhbHNlICk7XG4gICAgdGFyZ2V0LnVwZGF0ZU1hdHJpeCgpXG4gICAgdGFyZ2V0LnVwZGF0ZU1hdHJpeFdvcmxkKHRydWUpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBWdWVBcHAge1xuICAgIHN0YXRpYyBzeXN0ZW06IEV0aGVyZWFsTGF5b3V0U3lzdGVtO1xuICAgIHN0YXRpYyBldGhlcmVhbENhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSgpXG4gICAgc3RhdGljIHBsYXllckNhbWVyYTogVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmE7XG5cbiAgICBpc0V0aGVyZWFsOiBib29sZWFuXG4gICAgaXNJbnRlcmFjdGl2ZTogYm9vbGVhblxuICAgIGlzTmV0d29ya2VkOiBib29sZWFuXG4gICAgaXNTdGF0aWM6IGJvb2xlYW5cblxuICAgIHByaXZhdGUgdXBkYXRlVGltZTogbnVtYmVyXG4gICAgcHJpdmF0ZSByYXljYXN0ZXI6IFRIUkVFLlJheWNhc3RlclxuXG4gICAgc2l6ZToge1xuICAgICAgICB3aWR0aDogbnVtYmVyLFxuICAgICAgICBoZWlnaHQ6IG51bWJlclxuICAgIH1cblxuICAgIC8vdGFrZU93bmVyc2hpcDogICgpID0+IGJvb2xlYW5cbiAgICAvL3NldFNoYXJlZERhdGE6IChvYmplY3Q6IHt9KSA9PiBib29sZWFuXG4gICAgLy93aWR0aDogbnVtYmVyXG4gICAgLy9oZWlnaHQ6IG51bWJlclxuICAgIC8vdnVlQXBwOiBBcHBcbiAgICAvL3Z1ZVJvb3Q6IENvbXBvbmVudFB1YmxpY0luc3RhbmNlIHwgdW5kZWZpbmVkIFxuXG4gICAgd2ViTGF5ZXIzRDogV2ViTGF5ZXIzRCB8IHVuZGVmaW5lZFxuICAgIG5lZWRzVXBkYXRlOiBib29sZWFuID0gZmFsc2VcblxuICAgIGhlYWREaXY6IEVsZW1lbnRcblxuICAgIHN0YXRpYyBpbml0aWFsaXplRXRoZXJlYWwoKSB7XG4gICAgICAgIGxldCBzY2VuZTogU2NlbmUgPSB3aW5kb3cuQVBQLnNjZW5lO1xuXG4gICAgICAgIHRoaXMuZXRoZXJlYWxDYW1lcmEubWF0cml4QXV0b1VwZGF0ZSA9IHRydWU7XG4gICAgICAgIC8vdGhpcy5ldGhlcmVhbENhbWVyYS52aXNpYmxlID0gZmFsc2U7XG5cbiAgICAgICAgLy9zY2VuZS5zZXRPYmplY3QzRChcImV0aGVyZWFsQ2FtZXJhXCIsIHRoaXMuZXRoZXJlYWxDYW1lcmEpXG5cbiAgICAgICAgdGhpcy5wbGF5ZXJDYW1lcmEgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWV3aW5nLWNhbWVyYVwiKSBhcyBFbnRpdHkpLmdldE9iamVjdDNEKFwiY2FtZXJhXCIpIGFzIFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhO1xuXG4gICAgICAgIC8vIGp1c3QgaW4gY2FzZSBcInZpZXdpbmctY2FtZXJhXCIgaXNuJ3Qgc2V0IHVwIHlldCAuLi4gd2hpY2ggaXQgXG4gICAgICAgIC8vIHNob3VsZCBiZSwgYnV0IGp1c3QgdG8gYmUgY2FyZWZ1bFxuICAgICAgICB0aGlzLnN5c3RlbSA9IGV0aGVyZWFsLmNyZWF0ZUxheW91dFN5c3RlbSh0aGlzLnBsYXllckNhbWVyYSA/IHRoaXMucGxheWVyQ2FtZXJhIDogc2NlbmUuY2FtZXJhKVxuICAgICAgICB3aW5kb3cuZXRoU3lzdGVtID0gdGhpcy5zeXN0ZW1cblxuICAgICAgICAvLyBjYW4gY3VzdG9taXplIGVhc2luZyBldGNcbiAgICAgICAgLy8gc3lzdGVtLnRyYW5zaXRpb24uZHVyYXRpb24gPSAxLjVcbiAgICAgICAgLy8gc3lzdGVtLnRyYW5zaXRpb24uZGVsYXkgPSAwXG4gICAgICAgIC8vIHN5c3RlbS50cmFuc2l0aW9uLm1heFdhaXQgPSA0XG4gICAgICAgIC8vIHN5c3RlbS50cmFuc2l0aW9uLmVhc2luZyA9IGV0aGVyZWFsLmVhc2luZy5lYXNlT3V0XG4gICAgfVxuXG4gICAgc3RhdGljIHN5c3RlbVRpY2sodGltZTogbnVtYmVyLCBkZWx0YVRpbWU6IG51bWJlcikge1xuICAgICAgICBsZXQgc2NlbmUgPSB3aW5kb3cuQVBQLnNjZW5lO1xuXG4gICAgICAgIGlmICghdGhpcy5wbGF5ZXJDYW1lcmEpIHtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQ2FtZXJhID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlld2luZy1jYW1lcmFcIikgYXMgRW50aXR5KS5nZXRPYmplY3QzRChcImNhbWVyYVwiKSBhcyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKCF0aGlzLnBsYXllckNhbWVyYSkgcmV0dXJuO1xuICAgIFxuICAgICAgICBjb3B5Q2FtZXJhKHRoaXMucGxheWVyQ2FtZXJhLCB0aGlzLmV0aGVyZWFsQ2FtZXJhKVxuXG4gICAgICAgIGlmICh0aGlzLmV0aGVyZWFsQ2FtZXJhICE9IHRoaXMuc3lzdGVtLnZpZXdOb2RlKSB7XG4gICAgICAgICAgICB0aGlzLnN5c3RlbS52aWV3Tm9kZSA9IHRoaXMuZXRoZXJlYWxDYW1lcmFcbiAgICAgICAgfVxuXG4gICAgICAgIHNjZW5lLnJlbmRlcmVyLmdldFNpemUoSHVic0FwcC5zeXN0ZW0udmlld1Jlc29sdXRpb24pXG4gICAgICAgIHRoaXMuc3lzdGVtLnZpZXdGcnVzdHVtLnNldEZyb21QZXJzcGVjdGl2ZVByb2plY3Rpb25NYXRyaXgodGhpcy5ldGhlcmVhbENhbWVyYS5wcm9qZWN0aW9uTWF0cml4KVxuXG4gICAgICAgIC8vIHRpY2sgbWV0aG9kIGZvciBldGhlcmVhbFxuICAgICAgICB0aGlzLnN5c3RlbS51cGRhdGUoZGVsdGFUaW1lLCB0aW1lKVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yIChBcHA6IENvbXBvbmVudCwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30sIGNyZWF0ZU9wdGlvbnM6IGFueSA9e30pIHtcbiAgICAgICAgXG5cbiAgICAgICAgaWYgKHBhcmFtcy53aWR0aCAmJiBwYXJhbXMuaGVpZ2h0ICYmIHBhcmFtcy53aWR0aCA+IDAgJiYgcGFyYW1zLmhlaWdodCA+IDApIHtcbiAgICAgICAgICAgIC8vIHJlc2V0IGJvdGhcbiAgICAgICAgICAgIHdpZHRoID0gcGFyYW1zLndpZHRoICAgXG4gICAgICAgICAgICBoZWlnaHQgPSBwYXJhbXMuaGVpZ2h0XG4gICAgICAgIH0gZWxzZSBpZiAoKHBhcmFtcy53aWR0aCAmJiBwYXJhbXMud2lkdGggPiAwKSB8fCAocGFyYW1zLmhlaWdodCAmJiBwYXJhbXMuaGVpZ2h0ID4gMCkpIHtcbiAgICAgICAgICAgIC8vIHNldCBvbmUgYW5kIHNjYWxlIHRoZSBvdGhlclxuICAgICAgICAgICAgaWYgKHBhcmFtcy53aWR0aCAmJiBwYXJhbXMud2lkdGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gKHBhcmFtcy53aWR0aCAvIHdpZHRoKSAqIGhlaWdodCAgICBcbiAgICAgICAgICAgICAgICB3aWR0aCA9IHBhcmFtcy53aWR0aCAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhcmFtcy5oZWlnaHQgJiYgcGFyYW1zLmhlaWdodCA+IDApIHtcbiAgICAgICAgICAgICAgICB3aWR0aCA9IChwYXJhbXMuaGVpZ2h0IC8gaGVpZ2h0KSAqIGhlaWdodFxuICAgICAgICAgICAgICAgIGhlaWdodCA9IHBhcmFtcy5oZWlnaHRcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgY3JlYXRlT3B0aW9ucylcbiAgICAgICAgdGhpcy5pc0V0aGVyZWFsID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy52dWVBcHAucHJvdmlkZSgncGFyYW1zJywgcGFyYW1zKVxuXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTmV0d29ya2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTdGF0aWMgPSB0cnVlO1xuICAgICAgICB0aGlzLnVwZGF0ZVRpbWUgPSAxMDBcbiAgICAgICAgdGhpcy5yYXljYXN0ZXIgPSBuZXcgVEhSRUUuUmF5Y2FzdGVyKClcbiAgICAgICAgLy90aGlzLndpZHRoID0gd2lkdGhcbiAgICAgICAgLy90aGlzLmhlaWdodCA9IGhlaWdodFxuICAgICAgICB0aGlzLnNpemUgPSB7IHdpZHRoOiB3aWR0aC8xMDAwLCBoZWlnaHQ6IGhlaWdodC8xMDAwfVxuICAgICAgICAvL3RoaXMudGFrZU93bmVyc2hpcCA9IHRoaXMudGFrZU93bmVyc2hpcFByb3RvLmJpbmQodGhpcylcbiAgICAgICAgLy90aGlzLnNldFNoYXJlZERhdGEgPSB0aGlzLnNldFNoYXJlZERhdGFQcm90by5iaW5kKHRoaXMpXG5cbiAgICAgICAgdGhpcy5oZWFkRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgICAvL3RoaXMuaGVhZERpdi5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLFwid2lkdGg6IDEwMCU7aGVpZ2h0OiAxMDAlO1wiKVxuXG4gICAgICAgIC8vdGhpcy52dWVBcHAgPSBjcmVhdGVBcHAoQXBwLCBjcmVhdGVPcHRpb25zKVxuICAgIH1cblxuICAgIG1vdW50KHVzZUV0aGVyZWFsPzogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmlzRXRoZXJlYWwgPSB1c2VFdGhlcmVhbCA9PT0gdHJ1ZVxuICAgICAgICBcbiAgICAgICAgdGhpcy52dWVSb290ID0gdGhpcy52dWVBcHAubW91bnQodGhpcy5oZWFkRGl2KTtcbiAgICAgICAgdGhpcy52dWVSb290LiRlbC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLFwid2lkdGg6IFwiICsgdGhpcy53aWR0aCArIFwicHg7IGhlaWdodDogXCIgKyB0aGlzLmhlaWdodCArIFwicHg7XCIpXG5cbiAgICAgICAgLy8gLy8gYWRkIGEgbGluayB0byB0aGUgc2hhcmVkIGNzc1xuICAgICAgICBsZXQgbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpXG4gICAgICAgIGwuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvaHVicy5jc3NcIilcbiAgICAgICAgbC5zZXRBdHRyaWJ1dGUoXCJyZWxcIiwgXCJzdHlsZXNoZWV0XCIpXG4gICAgICAgIGwuc2V0QXR0cmlidXRlKFwiY3Jvc3NvcmlnaW5cIixcImFub255bW91c1wiKVxuICAgICAgICB0aGlzLnZ1ZVJvb3QuJGVsLmluc2VydEJlZm9yZShsLCB0aGlzLnZ1ZVJvb3QuJGVsLmZpcnN0Q2hpbGQpXG5cbiAgICAgICAgLy8gbW92ZSB0aGlzIGludG8gbWV0aG9kXG4gICAgICAgIHRoaXMud2ViTGF5ZXIzRCA9IG5ldyBXZWJMYXllcjNEKHRoaXMudnVlUm9vdC4kZWwsIHtcbiAgICAgICAgICAgIGF1dG9SZWZyZXNoOiB0cnVlLFxuICAgICAgICAgICAgb25MYXllckNyZWF0ZTogdXNlRXRoZXJlYWwgPyBcbiAgICAgICAgICAgIChsYXllcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFkYXB0ZXIgPSBIdWJzQXBwLnN5c3RlbS5nZXRBZGFwdGVyKGxheWVyKVxuICAgICAgICAgICAgICAgIGFkYXB0ZXIub3BhY2l0eS5lbmFibGVkID0gdHJ1ZVxuICAgICAgICAgICAgICAgIGFkYXB0ZXIub25VcGRhdGUgPSAoKSA9PiBsYXllci51cGRhdGUoKVxuICAgICAgICAgICAgfSA6XG4gICAgICAgICAgICAobGF5ZXIpID0+IHt9LFxuICAgICAgICAgICAgb25MYXllclBhaW50OiAobGF5ZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1N0YXRpYykgeyB0aGlzLm5lZWRzVXBkYXRlID0gdHJ1ZSB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGV4dHVyZUVuY29kaW5nOiBUSFJFRS5zUkdCRW5jb2RpbmcsXG4gICAgICAgICAgICByZW5kZXJPcmRlck9mZnNldDogMFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXROZXR3b3JrTWV0aG9kcyh0YWtlT3duZXJzaGlwOiAoKSA9PiBib29sZWFuLCBzZXRTaGFyZWREYXRhOiAoe30pID0+IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy50YWtlT3duZXJzaGlwID0gdGFrZU93bmVyc2hpcDtcbiAgICAgICAgdGhpcy5zZXRTaGFyZWREYXRhID0gc2V0U2hhcmVkRGF0YTtcbiAgICB9XG5cbiAgICAvLyBkdW1teSBmdW5jdGlvbnMsIGp1c3QgdG8gYXZvaWQgZXJyb3JzIGlmIHRoZXkgZ2V0IGNhbGxlZCBiZWZvcmVcbiAgICAvLyBuZXR3b3JraW5nIGlzIGluaXRpYWxpemVkLCBvciBjYWxsZWQgd2hlbiBuZXR3b3JrZWQgaXMgZmFsc2VcbiAgICAvLyB0YWtlT3duZXJzaGlwUHJvdG8oKTogYm9vbGVhbiB7XG4gICAgLy8gICAgIHJldHVybiB0cnVlO1xuICAgIC8vIH1cblxuICAgIC8vIHNldFNoYXJlZERhdGFQcm90byhvYmplY3Q6IHt9KSB7XG4gICAgLy8gICAgIHJldHVybiB0cnVlO1xuICAgIC8vIH1cblxuICAgIC8vIHJlY2VpdmUgZGF0YSB1cGRhdGVzLiAgc2hvdWxkIGJlIG92ZXJyaWRkZW4gYnkgc3ViY2xhc3NlcywgYWxzbyByZXF1ZXN0c1xuICAgIC8vIHVwZGF0ZSBuZXh0IHRpY2tcbiAgICB1cGRhdGVTaGFyZWREYXRhKGRhdGFPYmplY3Q6IHt9KSB7XG4gICAgICAgIHRoaXMubmVlZHNVcGRhdGUgPSB0cnVlXG4gICAgfVxuXG4gICAgZ2V0U2l6ZSgpIHtcbiAgICAgICAgLy8gaWYgKCF0aGlzLmNvbXBTdHlsZXMpIHtcbiAgICAgICAgLy8gICAgIHRoaXMuY29tcFN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMudnVlUm9vdC4kZWwpO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIHZhciB3aWR0aCA9IHRoaXMuY29tcFN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKCd3aWR0aCcpXG4gICAgICAgIC8vIHdpZHRoID0gd2lkdGggJiYgd2lkdGgubGVuZ3RoID4gMCA/IHBhcnNlRmxvYXQod2lkdGgpIC8gMTAwMDogMVxuICAgICAgICAvLyB2YXIgaGVpZ2h0ID0gdGhpcy5jb21wU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ2hlaWdodCcpXG4gICAgICAgIC8vIGhlaWdodCA9IGhlaWdodCAmJiBoZWlnaHQubGVuZ3RoID4gMCA/IHBhcnNlRmxvYXQoaGVpZ2h0KSAvIDEwMDA6IDFcbiAgICAgICAgLy8gdGhpcy5zaXplID0geyB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0fVxuICAgICAgICBjb25zb2xlLmxvZyAoXCJkaXYgc2l6ZToge1wiICsgdGhpcy5zaXplLndpZHRoICsgXCIsIFwiICsgdGhpcy5zaXplLmhlaWdodCArIFwifVwiKVxuICAgICAgICByZXR1cm4gdGhpcy5zaXplXG4gICAgfVxuXG4gICAgLy8gcmVjZWl2ZSBkYXRhIHVwZGF0ZXMuICBzaG91bGQgYmUgb3ZlcnJpZGRlbiBieSBzdWJjbGFzc2VzXG4gICAgZ2V0U2hhcmVkRGF0YShkYXRhT2JqZWN0OiB7fSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJnZXRTaGFyZWREYXRhIHNob3VsZCBiZSBvdmVycmlkZGVuIGJ5IHN1YmNsYXNzZXNcIilcbiAgICB9XG4gICAgXG4gICAgLy8gb3ZlcnJpZGUgdG8gY2hlY2sgZm9yIHlvdXIgb3duIDNEIG9iamVjdHMgdGhhdCBhcmVuJ3Qgd2ViTGF5ZXJzXG4gICAgY2xpY2tlZChldnQ6IHtvYmplY3QzRDogVEhSRUUuT2JqZWN0M0R9KSB7XG4gICAgICAgIGlmICghdGhpcy5pc0ludGVyYWN0aXZlKSB7IHJldHVybiB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBvYmogPSBldnQub2JqZWN0M0RcbiAgICAgICAgdGhpcy5yYXljYXN0ZXIucmF5LnNldChvYmoucG9zaXRpb24sIFxuICAgICAgICAgICAgdGhpcy53ZWJMYXllcjNEIS5nZXRXb3JsZERpcmVjdGlvbihuZXcgVEhSRUUuVmVjdG9yMygpKS5uZWdhdGUoKSlcbiAgICAgICAgY29uc3QgaGl0ID0gdGhpcy53ZWJMYXllcjNEIS5oaXRUZXN0KHRoaXMucmF5Y2FzdGVyLnJheSlcbiAgICAgICAgaWYgKGhpdCkge1xuICAgICAgICAgIGhpdC50YXJnZXQuY2xpY2soKVxuICAgICAgICAgIGhpdC50YXJnZXQuZm9jdXMoKVxuICAgICAgICAgIGNvbnNvbGUubG9nKCdoaXQnLCBoaXQudGFyZ2V0LCBoaXQubGF5ZXIpXG4gICAgICAgIH0gICBcbiAgICB9XG5cbiAgICBkcmFnU3RhcnQoZXZ0OiB7fSkge1xuICAgICAgICAvLyBub3RoaW5nIGhlcmUgLi4uIHN1YmNsYXNzIHNob3VsZCBvdmVycmlkZVxuICAgIH1cblxuICAgIGRyYWdFbmQgKGV2dDoge30pIHtcbiAgICAgICAgLy8gbm90aGluZyBoZXJlIC4uLiBzdWJjbGFzcyBzaG91bGQgb3ZlcnJpZGVcbiAgICB9XG5cbiAgICBwbGF5KCkge1xuICAgICAgICAvLyBpZiB3ZSBjYW4gZmlndXJlIG91dCBob3cgdG8gcGF1c2UsIHRoZW4gcmVzdGFydCBoZXJlXG4gICAgfVxuXG4gICAgcGF1c2UoKSB7XG4gICAgICAgIC8vIHBlcmhhcHMgZmlndXJlIG91dCBob3cgdG8gcGF1c2UgdGhlIFZ1ZSBjb21wb25lbnQ/XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgLy8gVE9ETzogZGVzdHJveSB0aGUgdnVlIGNvbXBvbmVudCBhbmQgYW55IHJlc291cmNlcywgZXRjLiwgaXQgaGFzXG4gICAgfVxuXG4gICAgdGljayh0aW1lOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFdGhlcmVhbCkge1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgbmVlZHNVcGRhdGUgPSB0aGlzLm5lZWRzVXBkYXRlXG4gICAgICAgICAgICB0aGlzLm5lZWRzVXBkYXRlID0gZmFsc2VcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU3RhdGljICYmIHRoaXMudXBkYXRlVGltZSA8IHRpbWUpIHtcbiAgICAgICAgICAgICAgICBuZWVkc1VwZGF0ZSA9IHRydWVcbiAgICAgICAgICAgICAgICAvLyB3YWl0IGEgYml0IGFuZCBkbyBpdCBhZ2Fpbi4gIE1heSBnZXQgcmlkIG9mIHRoaXMgc29tZSBkYXksIHdlJ2xsIHNlZVxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVGltZSA9IE1hdGgucmFuZG9tKCkgKiAyMDAwICsgMTAwMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzU3RhdGljKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUaW1lID0gdGltZVxuICAgICAgICAgICAgICAgIG5lZWRzVXBkYXRlID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5lZWRzVXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53ZWJMYXllcjNEIS51cGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgeyByZWFjdGl2ZSwgcmVhZG9ubHkgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgVnVlQXBwIGZyb20gXCIuLi8uLi9WdWVBcHBcIjtcblxuZXhwb3J0IGludGVyZmFjZSBkYXRhIHtcbiAgICBjb3VudDogbnVtYmVyXG59XG5cbmV4cG9ydCBjbGFzcyBTdG9yZSB7XG4gICAgX3N0YXRlOiBkYXRhXG4gICAgc3RhdGU6IGRhdGFcbiAgICBhcHA6IFZ1ZUFwcFxuICAgIGNvbnN0cnVjdG9yKGFwcDogVnVlQXBwKSB7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gcmVhY3RpdmUoe1xuICAgICAgICAgICAgY291bnQ6IDBcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5hcHAgPSBhcHBcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHJlYWRvbmx5KHRoaXMuX3N0YXRlKVxuICAgIH0gICAgXG5cbiAgICBpbmNyZW1lbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLmFwcC50YWtlT3duZXJzaGlwKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlLmNvdW50Kys7XG4gICAgICAgICAgICB0aGlzLmFwcC5zZXRTaGFyZWREYXRhKHRoaXMuc3RhdGUpXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgdXBkYXRlU2hhcmVkRGF0YShkYXRhT2JqZWN0OiBkYXRhKSB7XG4gICAgICAgIC8vIG5lZWQgdG8gdXBkYXRlIHRoZSBlbGVtZW50cyB3aXRoaW4gdGhlIHN0YXRlLCBiZWNhdXNlIG90aGVyd2lzZVxuICAgICAgICAvLyB0aGUgZGF0YSB3b24ndCBmbG93IHRvIHRoZSBjb21wb25lbnRzXG4gICAgICAgIHRoaXMuX3N0YXRlLmNvdW50ID0gZGF0YU9iamVjdC5jb3VudFxuICAgIH1cbn0iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcbmltcG9ydCB7ZGF0YSBhcyBTaGFyZWREYXRhLCBTdG9yZX0gZnJvbSBcIi4vc2hhcmVkXCJcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgc2hhcmVkOiBTdG9yZVxuICAgIFxuICAgIGNvbnN0cnVjdG9yIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgNDAwLCA0NzUsIHBhcmFtcylcblxuICAgICAgICAvLyBjcmVhdGUgb3VyIHNoYXJlZCBkYXRhIG9iamVjdCB0aGF0IHdpbGxcbiAgICAgICAgLy8gc2hhcmUgZGF0YSBiZXR3ZWVuIHZ1ZSBhbmQgaHVic1xuICAgICAgICB0aGlzLnNoYXJlZCA9IG5ldyBTdG9yZSh0aGlzKVxuICAgICAgICB0aGlzLnZ1ZUFwcC5wcm92aWRlKCdzaGFyZWQnLCB0aGlzLnNoYXJlZClcblxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzTmV0d29ya2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc1N0YXRpYyA9IGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICB1cGRhdGVTaGFyZWREYXRhKGRhdGFPYmplY3Q6IFNoYXJlZERhdGEpIHtcbiAgICAgICAgc3VwZXIudXBkYXRlU2hhcmVkRGF0YShkYXRhT2JqZWN0KVxuICAgICAgICB0aGlzLnNoYXJlZC51cGRhdGVTaGFyZWREYXRhKGRhdGFPYmplY3QpXG4gICAgfVxuXG4gICAgZ2V0U2hhcmVkRGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkLnN0YXRlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcChwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXRcbiIsIjx0ZW1wbGF0ZT5cbiAgPGgxIHhyLWxheWVyIGNsYXNzPVwiZmFkZVwiPnt7IG1zZyB9fTwvaDE+XG5cbiAgPHA+XG4gICAgPGEgaHJlZj1cImh0dHBzOi8vdml0ZWpzLmRldi9ndWlkZS9mZWF0dXJlcy5odG1sXCIgdGFyZ2V0PVwiX2JsYW5rXCI+XG4gICAgICBWaXRlIERvY3VtZW50YXRpb24gYW5kIFRoZW4gU29tZSEgXG4gICAgPC9hPlxuICAgIHxcbiAgICA8YSBocmVmPVwiaHR0cHM6Ly92My52dWVqcy5vcmcvXCIgdGFyZ2V0PVwiX2JsYW5rXCI+VnVlIDMgRG9jdW1lbnRhdGlvbjwvYT5cbiAgPC9wPlxuXG4gIDxidXR0b24geHItbGF5ZXIgQGNsaWNrPVwic3RhdGUuY291bnQrK1wiPmNvdW50IGlzOiB7eyBzdGF0ZS5jb3VudCB9fTwvYnV0dG9uPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlYWN0aXZlIH0gZnJvbSAndnVlJ1xuXG5kZWZpbmVQcm9wcyh7XG4gIG1zZzogU3RyaW5nXG59KVxuXG5jb25zdCBzdGF0ZSA9IHJlYWN0aXZlKHsgY291bnQ6IDAgfSlcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuYSB7XG4gIGNvbG9yOiAjYjU0MmI5O1xufVxuXG4uZmFkZSB7XG4gIGNvbG9yOiAjOTgwM2E1O1xuICAvKiB0cmFuc2l0aW9uOiBjb2xvciAxczsgKi9cbn1cblxuLmZhZGU6aG92ZXIge1xuICBjb2xvcjogIzA2YTcxYjtcbn1cbjwvc3R5bGU+XG5cbiIsIjx0ZW1wbGF0ZT5cbjxkaXY+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gICAgICA8aW1nIGFsdD1cIlZ1ZSBsb2dvXCIgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2xvZ28ucG5nXCIgLz5cbiAgICAgIDxIZWxsb1dvcmxkIG1zZz1cIlZ1ZSBDb21wb25lbnQgd2l0aCBMb2NhbCBCdXR0b24gQ291bnRcIiAvPlxuICAgICAgPHAgaWQ9XCJlZGl0XCIgdi1iaW5kOmNsYXNzPVwieyB1cGNsb3NlOiBzaGFyZWQuc3RhdGUuY2xvc2UgfVwiIHhyLWxheWVyPlxuICAgICAgICBFZGl0IGNvZGUgaW4gPGNvZGU+c3JjL2FwcHM8L2NvZGU+IHRvIHRlc3QgaG90IG1vZHVsZSByZXBsYWNlbWVudCB3aGlsZSBydW5uaW5nIHByb2plY3QgYXMgXCJucG0gcnVuIGRldlwiLlxuICAgICAgPC9wPlxuXG4gIDwvZGl2PlxuPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IEhlbGxvV29ybGQgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9IZWxsb1dvcmxkLnZ1ZSdcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG5cbmltcG9ydCB7IGluamVjdCB9IGZyb20gJ3Z1ZSdcblxuY29uc3Qgc2hhcmVkID0gaW5qZWN0KCdzaGFyZWQnKVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG4jZWRpdCB7XG4gIGNvbG9yOiAjYmVhN2QxO1xufVxuXG4jZWRpdC51cGNsb3NlIHtcbiAgY29sb3I6ICNjYzBhMGE7XG59XG48L3N0eWxlPlxuIiwiaW1wb3J0IHsgcmVhY3RpdmUsIHJlYWRvbmx5IH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IFZ1ZUFwcCBmcm9tIFwiLi4vLi4vVnVlQXBwXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgZGF0YSB7XG4gICAgY2xvc2U6IGJvb2xlYW5cbn1cblxuZXhwb3J0IGNsYXNzIFN0b3JlIHtcbiAgICBfc3RhdGU6IGRhdGFcbiAgICBzdGF0ZTogZGF0YVxuICAgIGFwcDogVnVlQXBwXG5cbiAgICBjb25zdHJ1Y3RvcihhcHA6IFZ1ZUFwcCkge1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IHJlYWN0aXZlKHtcbiAgICAgICAgICAgIGNsb3NlOiBmYWxzZVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLmFwcCA9IGFwcFxuICAgICAgICB0aGlzLnN0YXRlID0gcmVhZG9ubHkodGhpcy5fc3RhdGUpXG4gICAgfSAgICBcblxuICAgIHNldENsb3NlKGM6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlLmNsb3NlICE9IGMpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlLmNsb3NlID0gYztcbiAgICAgICAgfVxuICAgIH0gXG59XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcbmltcG9ydCB7ZGF0YSBhcyBTaGFyZWREYXRhLCBTdG9yZX0gZnJvbSBcIi4vc2hhcmVkXCJcbmltcG9ydCB7IFdlYkxheWVyM0RDb250ZW50IH0gZnJvbSBcImV0aGVyZWFsXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIHNoYXJlZDogU3RvcmVcbiAgICBcbiAgICBjb25zdHJ1Y3RvciAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIDUwMCwgNTAwLCBwYXJhbXMpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5zaGFyZWQgPSBuZXcgU3RvcmUodGhpcylcbiAgICAgICAgdGhpcy52dWVBcHAucHJvdmlkZSgnc2hhcmVkJywgdGhpcy5zaGFyZWQpXG4gICAgfVxuXG4gICAgZG9jczogV2ViTGF5ZXIzRENvbnRlbnQgfCB1bmRlZmluZWRcbiAgICBib3VuZHNTaXplOiBUSFJFRS5WZWN0b3IzICA9IG5ldyBUSFJFRS5WZWN0b3IzKClcbiAgICBib3VuZHM6IFRIUkVFLkJveDMgPSBuZXcgVEhSRUUuQm94MygpXG5cbiAgICBtb3VudCAoKSB7XG4gICAgICAgIHN1cGVyLm1vdW50KHRydWUpIC8vIHVzZSBldGhlcmVhbFxuXG4gICAgICAgIHRoaXMuZG9jcyA9IHRoaXMud2ViTGF5ZXIzRCEucXVlcnlTZWxlY3RvcignI2VkaXQnKVxuICAgICAgICBpZiAoIXRoaXMuZG9jcykge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiVnVlIGFwcCBuZWVkcyAjZWRpdCBkaXZcIilcbiAgICAgICAgICAgIHJldHVybiBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGFkYXB0ZXIgPSBIdWJzQXBwLnN5c3RlbS5nZXRBZGFwdGVyKHRoaXMuZG9jcykgXG4gICAgICAgIGFkYXB0ZXIub25VcGRhdGUgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmJvdW5kcyA9IGFkYXB0ZXIubWV0cmljcy50YXJnZXQudmlzdWFsQm91bmRzXG4gICAgICAgICAgICB0aGlzLmJvdW5kcy5nZXRTaXplKHRoaXMuYm91bmRzU2l6ZSlcbiAgICAgICAgICAgIHZhciBzaXplID0gTWF0aC5zcXJ0KHRoaXMuYm91bmRzU2l6ZS54ICogdGhpcy5ib3VuZHNTaXplLnggKyB0aGlzLmJvdW5kc1NpemUueSAqIHRoaXMuYm91bmRzU2l6ZS55KVxuICAgICAgICAgICAgaWYgKHRoaXMuc2hhcmVkLnN0YXRlLmNsb3NlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGFyZWQuc2V0Q2xvc2UgKHNpemUgPCAyMTApXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hhcmVkLnNldENsb3NlIChzaXplIDwgMTkwKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kb2NzIS51cGRhdGUoKVxuICAgICAgICB9XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKHBhcmFtcylcbiAgICBhcHAubW91bnQoKSBcblxuICAgIFxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGgyPnt7IG1zZyB9fTwvaDI+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgZGVmaW5lUHJvcHMsIHJlYWN0aXZlIH0gZnJvbSAndnVlJ1xuXG5kZWZpbmVQcm9wcyh7XG4gIG1zZzogU3RyaW5nXG59KVxuXG5jb25zdCBzdGF0ZSA9IHJlYWN0aXZlKHsgY291bnQ6IDAgfSlcbjwvc2NyaXB0PiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPFRpdGxlIHYtYmluZDptc2c9XCJtZXNnXCIgLz5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgaW5qZWN0IH0gZnJvbSAndnVlJ1xuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuXG5sZXQgcGFyYW1zID0gaW5qZWN0KFwicGFyYW1zXCIpXG52YXIgbWVzZyA9IHBhcmFtcyAmJiBwYXJhbXMubWVzc2FnZSA/IHBhcmFtcy5tZXNzYWdlIDogXCJQT1JUQUwgVElUTEVcIlxuPC9zY3JpcHQ+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDEwMCwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8aDQ+e3sgbXNnIH19PC9oND5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBkZWZpbmVQcm9wcywgcmVhY3RpdmUgfSBmcm9tICd2dWUnXG5cbmRlZmluZVByb3BzKHtcbiAgbXNnOiBTdHJpbmdcbn0pXG5cbmNvbnN0IHN0YXRlID0gcmVhY3RpdmUoeyBjb3VudDogMCB9KVxuPC9zY3JpcHQ+IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8VGl0bGUgdi1iaW5kOm1zZz1cIm1lc2dcIiAvPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBpbmplY3QgfSBmcm9tICd2dWUnXG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJTdWJ0aXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG5cbmxldCBwYXJhbXMgPSBpbmplY3QoXCJwYXJhbXNcIilcbnZhciBtZXNnID0gcGFyYW1zICYmIHBhcmFtcy5tZXNzYWdlID8gcGFyYW1zLm1lc3NhZ2UgOiBcIlBPUlRBTCBTVUJUSVRMRVwiXG48L3NjcmlwdD5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgMTAwLCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvMzhkNmQ3YTFlMDJmYzJmOS5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPFRpdGxlIG1zZz1cIlJlYWxpdHkgTWVkaWFcIiAvPlxuXHQ8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWFnZXMvcm90dW5kYS1tYXAucG5nXCIgd2lkdGg9XCIyNTBcIiA+XG5cdDxkaXYgY2xhc3M9XCJkaXNwbGF5dGV4dFwiPkFSIGFsbG93cyB1cyB0byBleHRlbmQgb3VyIHBoeXNpY2FsIHJlYWxpdHk7IFZSIGNyZWF0ZXMgZm9yIHVzIGEgZGlmZmVyZW50IHJlYWxpdHkuPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIC8vdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC83YWY3Yjk1YjM1ZmQ3NjE2LmpwZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxUaXRsZSBtc2c9XCJBUiAmYW1wOyBWUiBhcyByZWFsaXR5IG1lZGlhXCIgLz5cblx0PGltZyBzcmM9XCIuLi8uLi9hc3NldHMvaW1hZ2VzL2xhY2lvdGF0LVZSLmpwZ1wiIHdpZHRoPVwiMjUwXCIgPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+IEVhY2ggcmVhbGl0eSBtZWRpdW0gbWVkaWF0ZXMgYW5kIHJlbWVkaWF0ZXMuIEl0IG9mZmVycyBhIG5ldyByZXByZXNlbnRhdGlvbiBvZiB0aGUgd29ybGQgdGhhdCB3ZSBpbXBsaWNpdGx5IGNvbXBhcmUgXG5cdFx0dG8gb3VyIGV4cGVyaWVuY2Ugb2YgdGhlIHdvcmxkIGluIGl0c2VsZiwgYnV0IGFsc28gdGhyb3VnaCBvdGhlciBtZWRpYS48L2Rpdj4gXG4gIDwvZGl2PlxuICAgPHA+XG4gICAgPGEgaHJlZj1cImh0dHBzOi8vcmVhbGl0eW1lZGlhLmRpZ2l0YWxcIiB0YXJnZXQ9XCJfYmxhbmtcIj5cbiAgICAgIFN0YXJ0IGF0IHRoZSByZWFsaXR5IG1lZGlhIHNpdGUuIFxuICAgIDwvYT5cbiAgICB8XG4gIDwvcD5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzdhYjNkODZhZmQ0OGRiZmIuanBnXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gICAgPFRpdGxlIG1zZz1cIlRoZSBMYUNpb3RhdCBFZmZlY3RcIiAvPlxuICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cblx0ICA8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWFnZXMvbGFjaW90YXQuanBnXCIgd2lkdGg9XCIyNTBcIj5cblx0ICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+RmlsbSBiZWNhbWUgb25lIG9mIHRoZSBtb3N0IGltcG9ydGFudCByZWFsaXR5IFxuICAgICAgbWVkaWEgb2YgdGhlIHR3ZW50aWV0aCBjZW50dXJ5LCBhbmQgaW4gc29tZSB3YXlzLCBpdCBpcyBhIGZvcmVydW5uZXIgXG4gICAgICBvZiB2aXJ0dWFsIHJlYWxpdHkuPC9kaXY+ICBcbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+ICBcbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIC8vdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC85MWZkZmE4MTFlNzUyZGM4LmpwZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuXHQ8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgPFRpdGxlIG1zZz1cIjMtRCBHcmFwaGljcyAmYW1wOyBUcmFja2luZ1wiIC8+XG5cdDxpbWcgc3JjPVwiLi4vLi4vYXNzZXRzL2ltYWdlcy91bmNhbm55LmpwZ1wiIHdpZHRoPVwiMjAwXCI+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj4zLUQgY29tcHV0ZXIgZ3JhcGhpY3MgaGVscCB0byBjb25zdHJ1Y3QgdGhlIHZpc3VhbCBcblx0XHRyZWFsaXRpZXMgb2YgQVIgYW5kIFZSLCB0aGF0IGlzIHBob3RvcmVhbGlzbS4gVGhlIHVuY2FubnkgdmFsbGV5LjwvZGl2PlxuXHQ8L2Rpdj5cblx0PC9kaXY+XG48L3RlbXBsYXRlPlxuXG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgLy8gdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC9kYzA1YzA0NTQ2YTY5ZTY0LnBuZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICAgIDxUaXRsZSBtc2c9XCJQcmVzZW5jZVwiIC8+XG5cdCAgPGRpdiBjbGFzcz1cInNwYWNlclwiPiBcblx0ICA8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWFnZXMvcGFydGhlbm9uLnBuZ1wiIHdpZHRoPVwiMjUwXCI+XG5cdCAgPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlByZXNlbmNlIGluIFZSIGlzIHVzdWFsbHkgY29uY2VpdmVkIG9mIGFzIGZvcmdldHRpbmcgdGhhdCB0aGUgbWVkaXVtIGlzIHRoZXJlLiBUaGUgaWRlYSBpcyB0aGF0IGlmIHRoZSB1c2VyIGNhbiBiZSBlbnRpY2VkIGludG8gYmVoYXZpbmcgYXMgaWYgc2hlIHdlcmUgbm90IGF3YXJlIG9mIGFsbCB0aGUgY29tcGxleCB0ZWNobm9sb2d5LCB0aGVuIHNoZSBmZWVscyBwcmVzZW5jZS48L2Rpdj4gIFxuICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgICAvL3RoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gICAgPFRpdGxlIG1zZz1cIkdlbnJlc1wiIC8+XG4gICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPiBcblx0ICA8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWFnZXMvcGFydGhlbm9uLnBuZ1wiIHdpZHRoPVwiMjUwXCI+XG5cdCAgPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlJlYWxpdHkgbWVkaWEgYXBwbGljYXRpb25zIG9mdGVuIGZ1bmN0aW9uIGFzIGFkZGl0aW9ucyB0byBlc3RhYmxpc2hlZCBnZW5yZXMuIE1vc3QgY3VycmVudCBBUiBhbmQgVlIgYXBwbGljYXRpb25zIGJlaGF2ZSBsaWtlIGFwcGxpY2F0aW9ucyBvciBhcnRpZmFjdHMgdGhhdCB3ZSBrbm93IGZyb20gZWFybGllciBtZWRpYS48L2Rpdj4gIFxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIC8vdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgICA8VGl0bGUgbXNnPVwiVGhlIEZ1dHVyZSBvZiBBUiAmYW1wOyBWUlwiIC8+XG4gICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuXHQgIDxpbWcgc3JjPVwiLi4vLi4vYXNzZXRzL2ltYWdlcy9wYXJ0aGVub24ucG5nXCIgd2lkdGg9XCIyNTBcIj5cblx0ICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+VlIgd2lsbCBjb250aW51ZSB0byBjb25zdHJ1Y3Qgc3BlY2lhbCByZWFsaXRpZXMsIGFwYXJ0IGZyb20gdGhlIGV2ZXJ5ZGF5LiBWUiB3b3JsZHMgd2lsbCBjb250aW51ZSB0byBiZSBtZXRhcGhvcmljIHdvcmxkcy48L2Rpdj4gIFxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgICA8VGl0bGUgbXNnPVwiUHJpdmFjeSBhbmQgUHVibGljIFNwYWNlXCIgLz5cbiAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG5cdCAgPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlBlcnZhc2l2ZSwgYWx3YXlzLW9uIEFSIGFwcGxpY2F0aW9ucyBoYXZlIHRoZSBwb3RlbnRpYWwgdG8gcHJvdmlkZSBjb21wYW5pZXMgb3IgZ292ZXJubWVudCBhdXRob3JpdGllcyBcbiAgICAgIGV2ZW4gbW9yZSBpbmZvcm1hdGlvbiBhbmQgd2l0aCBtb3JlIHByZWNpc2lvbiB0aGFuIG91ciBjdXJyZW50IG1vYmlsZSBhcHBsaWNhdGlvbnMgZG8sIFxuICAgICAgYm90aCBieSBhZ2dyZWdhdGluZyBvdXIgaGFiaXRzIGFzIGNvbnN1bWVycyBhbmQgYnkgaWRlbnRpZnlpbmcgdXMgYXMgaW5kaXZpZHVhbHMuPC9kaXY+ICBcbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAvLyAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gICAgXG4gICAgPGRpdiBjbGFzcz1cInBvc3RlcnRpdGxlXCI+QVIgJmFtcDsgVlIgYXMgcmVhbGl0eSBtZWRpYTwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJmbHVzaGxlZnRcIj5cbiAgICAgIDxicj5cbiAgICAgIDxoMz4gU29tZSBvZiB0aGUga2V5IGRpZmZlcmVuY2VzIGJldHdlZW4g4oCcY2xhc3NpY+KAnSBWUiBhbmQgQVI8L2gzPlxuICAgICAgPGJyPlxuICAgICAgPGgzPiBFeHRlbmRlZCByZWFsaXR5IChYUikgYW5kIHRoZSBpbW1lcnNpdmUgd2ViIDwvaDM+XG4gICAgICA8YnI+XG4gICAgICA8aDM+IFdoZXJlIEFSIGFuZCBWUiBmaXQgb24gTWlsZ3JhbSBhbmQgS2lzaGlub+KAmXMgdmlydHVhbGl0eSBjb250aW51dW08L2gzPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgLy8gdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgICA8VGl0bGUgbXNnPVwiVGhlIEhpc3Rvcnkgb2YgUmVhbGl0eSBNZWRpYVwiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbHVzaGxlZnRcIj5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFNvbWUgb2YgdGhlIGtleSBkaWZmZXJlbmNlcyBiZXR3ZWVuIOKAnGNsYXNzaWPigJ0gVlIgYW5kIEFSPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IEV4dGVuZGVkIHJlYWxpdHkgKFhSKSBhbmQgdGhlIGltbWVyc2l2ZSB3ZWIgPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFdoZXJlIEFSIGFuZCBWUiBmaXQgb24gTWlsZ3JhbSBhbmQgS2lzaGlub+KAmXMgdmlydHVhbGl0eSBjb250aW51dW08L2gzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PiBcbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICAgIDxUaXRsZSBtc2c9XCIzLUQgJmFtcDsgVHJhY2tpbmdcIiAvPlxuICAgICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmx1c2hsZWZ0XCI+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBTb21lIG9mIHRoZSBrZXkgZGlmZmVyZW5jZXMgYmV0d2VlbiDigJxjbGFzc2lj4oCdIFZSIGFuZCBBUjwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBFeHRlbmRlZCByZWFsaXR5IChYUikgYW5kIHRoZSBpbW1lcnNpdmUgd2ViIDwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBXaGVyZSBBUiBhbmQgVlIgZml0IG9uIE1pbGdyYW0gYW5kIEtpc2hpbm/igJlzIHZpcnR1YWxpdHkgY29udGludXVtPC9oMz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj4gICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgICA8VGl0bGUgbXNnPVwiUHJlc2VuY2VcIiAvPlxuICAgICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmx1c2hsZWZ0XCI+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBTb21lIG9mIHRoZSBrZXkgZGlmZmVyZW5jZXMgYmV0d2VlbiDigJxjbGFzc2lj4oCdIFZSIGFuZCBBUjwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBFeHRlbmRlZCByZWFsaXR5IChYUikgYW5kIHRoZSBpbW1lcnNpdmUgd2ViIDwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBXaGVyZSBBUiBhbmQgVlIgZml0IG9uIE1pbGdyYW0gYW5kIEtpc2hpbm/igJlzIHZpcnR1YWxpdHkgY29udGludXVtPC9oMz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj4gICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgICA8VGl0bGUgbXNnPVwiR2VucmVzXCIgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsdXNobGVmdFwiPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gU29tZSBvZiB0aGUga2V5IGRpZmZlcmVuY2VzIGJldHdlZW4g4oCcY2xhc3NpY+KAnSBWUiBhbmQgQVI8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gRXh0ZW5kZWQgcmVhbGl0eSAoWFIpIGFuZCB0aGUgaW1tZXJzaXZlIHdlYiA8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gV2hlcmUgQVIgYW5kIFZSIGZpdCBvbiBNaWxncmFtIGFuZCBLaXNoaW5v4oCZcyB2aXJ0dWFsaXR5IGNvbnRpbnV1bTwvaDM+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+ICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gICAgPFRpdGxlIG1zZz1cIkZ1dHVyZVwiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbHVzaGxlZnRcIj5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFNvbWUgb2YgdGhlIGtleSBkaWZmZXJlbmNlcyBiZXR3ZWVuIOKAnGNsYXNzaWPigJ0gVlIgYW5kIEFSPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IEV4dGVuZGVkIHJlYWxpdHkgKFhSKSBhbmQgdGhlIGltbWVyc2l2ZSB3ZWIgPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFdoZXJlIEFSIGFuZCBWUiBmaXQgb24gTWlsZ3JhbSBhbmQgS2lzaGlub+KAmXMgdmlydHVhbGl0eSBjb250aW51dW08L2gzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PiAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICAgIDxUaXRsZSBtc2c9XCJQcml2YWN5XCIgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsdXNobGVmdFwiPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gU29tZSBvZiB0aGUga2V5IGRpZmZlcmVuY2VzIGJldHdlZW4g4oCcY2xhc3NpY+KAnSBWUiBhbmQgQVI8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gRXh0ZW5kZWQgcmVhbGl0eSAoWFIpIGFuZCB0aGUgaW1tZXJzaXZlIHdlYiA8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gV2hlcmUgQVIgYW5kIFZSIGZpdCBvbiBNaWxncmFtIGFuZCBLaXNoaW5v4oCZcyB2aXJ0dWFsaXR5IGNvbnRpbnV1bTwvaDM+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+ICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvMTkwOTk0MzcwYWViZTM5NS5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1Jvb201L0FseXgtc3BsYXNoLnBuZ1wiIHdpZHRoPVwiNDAwXCIgPlxuICA8YnI+PGJyPlxuICA8VGl0bGUgbXNnPVwiSGFsZkxpZmU6IEFseXhcIiAvPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+IEZpcnN0IHBlcnNvbiBzaG9vdGVyIGdhbWVzIHN1Y2ggYXMgIDxhIGhyZWY9XCJodHRwczovL3d3dy5oYWxmLWxpZmUuY29tL2VuL2FseXgvXCIgdGFyZ2V0PVwiX2JsYW5rXCI+SGFsZkxpZmU6IEFseXggPC9hPiBoYXZlIGxvbmcgdXNlZCAzLUQgZ3JhcGhpY3MgdG8gY3JlYXRlIGFuIGltbWVyc2l2ZSBleHBlcmllbmNlIGZvciBtaWxsaW9ucyBvZiBwbGF5ZXJzLiBBbmQgZm9yIGRlY2FkZXMsIFxuICAgIHBsYXllcnMgb24gY29tcHV0ZXJzIGFuZCBnYW1lIGNvbnNvbGVzIGhhdmUgeWVhcm5lZCBmb3IgdHJ1ZSBWUiBzbyB0aGF0IHRoZXkgY291bGQgZmFsbCB0aHJvdWdoIHRoZSBzY3JlZW4gaW50byB0aGUgd29ybGRzIG9uIHRoZSBvdGhlciBzaWRlLjwvZGl2PiBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxUaXRsZSBtc2c9XCJQb2tlbW9uIEdvXCIgLz5cblx0ICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+UG9rZW1vbiBHbyAoMjAxNikgaXMgcGVyaGFwcyBzdGlsbCB0aGUgYmVzdC1rbm93biBBUiBnYW1lLiBcbiAgICAgIFRoZSBQb2tlbW9uIGZyYW5jaGlzZSB3YXMgYWxyZWFkeSBkZWNhZGVzIG9sZCwgYW5kIHRoaXMgd2FzIGNlcnRhaW5seSBwYXJ0IG9mIHRoZSBcbiAgICAgIGFuc3dlciBmb3IgdGhlIEFSIGdhbWXigJlzIHN1cnByaXNpbmcgaW1wYWN0LiBcbiAgICAgIEl0IHdhcyB0aGUgZmlyc3QgUG9rZW1vbiBnYW1lIG9uIGEgbW9iaWxlIHBob25lIGFuZCB0aGUgZmlyc3QgZnJlZSBQb2tlbW9uIGdhbWUgb24gYW55IHBsYXRmb3JtLlxuICAgIDwvZGl2PiBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgIC8vICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxUaXRsZSBtc2c9XCJCZWF0IFNhYmVyXCIgLz5cblx0ICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+QmVhdCBTYWJlciBpcyBhIFZSIHJoeXRobSBnYW1lIFxuICAgICAgd2l0aCBhIGxpdHRsZSBTdGFyIFdhcnMgdGhyb3duIGluLiBUaGUgcGxheWVyIHVzZXMgbGlnaHRzYWJlcnMgdG8ga2VlcCB0aGUgYmVhdC4gXG4gICAgPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgIC8vIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPFRpdGxlIG1zZz1cIldhbGtpbmcgRGVhZDogT3VyIFdvcmxkXCIgLz5cblx0ICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+SW4gdGhpcyBBUiB2ZXJzaW9uIG9mIHRoZSB0cmFuc21lZGlhIGZyYW5jaGlzZVxuICAgICAgR1BTIGlzIHVzZWQgdG8gZGV0ZXJtaW5lIHlvdXIgbG9jYXRpb24gaW4gdGhlIHdvcmxkLiBZb3VyIGxvY2F0aW9uIFxuICAgICAgYW5kIHRoZSB6b21iaWVzIGFwcGVhciBpbiBhbiBlbmhhbmNlZCBHb29nbGUgTWFwcyBtYXAgb24gdGhlIHBob25lIHNjcmVlbi5cbiAgICA8L2Rpdj4gXG4gIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgLy8gdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8VGl0bGUgbXNnPVwiTGEgQXBwYXJpemlvbmVcIiAvPlxuXHQgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5MaWtlIHZpZGVvIGdhbWVzIGFuZCAzNjAtZGVncmVlIHZpZGVvLCBcbiAgICAgIFZSIGFydCBlbXBoYXNpemVzIGltbWVyc2lvbiBhcyB0aGUgZmVhdHVyZSB0aGF0IG1ha2VzIHRoZSBleHBlcmllbmNlIFxuICAgICAgdW5pcXVlLCBhcyBpbiBhIFZSIHdvcmsgYnkgQ2hyaXN0aWFuIExlbW1lcnogZW50aXRsZWQgTGEgQXBwYXJpemlvbmUgKDIwMTcpLlxuICAgIDwvZGl2PiBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgLy90aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxUaXRsZSBtc2c9XCJNaW5lY3JhZnQgVlJcIiAvPlxuXHQgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5NaW5lY3JhZnQgVlIgaXMgYSBmdWxseSBpbW1lcnNpdmUsIFxuICAgICAgaGVhZHNldCB2ZXJzaW9uIG9mIHRoZSBzYW5kYm94IGdhbWUgdGhhdCBhbHJlYWR5IHJ1bnMgb24gY29tcHV0ZXJzLCBnYW1lIGNvbnNvbGVzLCBhbmQgbW9iaWxlIGRldmljZXMuIFxuICAgICAgSXQgaXMgY2FsbGVkIGEgXCJzYW5kYm94IGdhbWVcIiBiZWNhdXNlIGl0IHByb3ZpZGVzIGFuIGluZGVwZW5kZW50IGVudmlyb25tZW50IGluIHdoaWNoIFxuICAgICAgcGxheWVycyBjYW4gbWFrZSB0aGVpciBvd24gc3RydWN0dXJlcyBhbmQgb2JqZWN0cyBvdXQgb2YgdmlydHVhbCwgTEVHTy1saWtlIGJsb2Nrcy5cbiAgICA8L2Rpdj4gXG4gIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlciBoZWFkbGluZVwiPlxuICA8VGl0bGUgbXNnPVwiQVIgJmFtcDsgVlIgR0FNRVNcIiAvPlxuICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXIgaGVhZGxpbmVcIj5cbiAgPFRpdGxlIG1zZz1cIkFSICZhbXA7IFZSIEFSVFwiIC8+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4vLyAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgPFRpdGxlIG1zZz1cIlByZXNlbmNlXCIgLz5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlByZXNlbmNlIGlzIHRoZSBhYnNlbmNlIG9mIG1lZGlhdGlvbi4gSWYgdGhlIHVzZXJzIGNhbiBmb3JnZXQgdGhhdCB0aGUgbWVkaXVtIGlzIHRoZXJlLCB0aGVuIHRoZXkgZmVlbCBwcmVzZW5jZS4gPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgLy90aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8IS0tIDxUaXRsZSBtc2c9XCJBdXJhXCIgLz4gLS0+XG4gIDxkaXYgY2xhc3M9XCJoZWFkbGluZVwiPkF1cmE8L2Rpdj5cbiAgPGJyPlxuICA8YnI+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5cbiAgICA8cD5JbiAxOTMwcywgV2FsdGVyIEJlbmphbWluIGludHJvZHVjZWQgdGhlIGNvbmNlcHQgb2YgPGVtPmF1cmE8L2VtPiBpbiBUaGUgV29yayBvZiBBcnQgaW4gdGhlIEFnZSBvZiBNZWNoYW5pY2FsIFJlcHJvZHVjdGlvbi4gXG4gIEF1cmEgaXMgdGhlIDxlbT5oZXJlIGFuZCBub3c8L2VtPiB0aGF0IHdvcmsgcG9zc2Vzc2VzIGJlY2F1c2Ugb2YgaXRzIHVuaXF1ZSBoaXN0b3J5IG9mIHByb2R1Y3Rpb24gYW5kIHRyYW5zbWlzc2lub3dvbi4gPC9wPlxuICA8cD5BUiBhcHBsaWNhdGlvbnMgYXJlIG5vdCBwZXJmZWN0IHJlcHJvZHVjdGl2ZSB0ZWNobm9sb2dpZXMsIGFzIHNvbWUgZHJhdyBvbiB0aGUgcGh5c2ljYWwgYW5kIGN1bHR1cmFsIHVuaXF1ZXNuZXNzLCA8ZW0+dGhlIGhlcmUgYW5kIG5vdzwvZW0+IG9mIHBhcnRpY3VsYXIgcGxhY2VzIDwvcD5cbiAgPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgIC8vICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgPFRpdGxlIG1zZz1cIkN5YmVyc2lja25lc3MgYW5kIHRoZSBuZWdhdHRpb24gb2YgcHJlc2VuY2VcIiAvPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+XG4gICBUaGUgdGVybSBjeWJlcnNpY2tuZXNzLCBvciB2aXN1YWxseSBpbmR1Y2VkIG1vdGlvbiBzaWNrbmVzcywgaGFzIGJlZW4gY29pbmVkIHRvIGRlc2NyaWJlIHN5bXB0b21zIGluY2x1ZGluZyBoZWFkYWNoZSwgbmF1c2VhLCBleWUgc3RyYWluLCBkaXp6aW5lc3MsIGZhdGlndWUsIG9yIGV2ZW4gdm9taXRpbmcgdGhhdCBtYXkgb2NjdXIgZHVyaW5nIG9yIGFmdGVyIGV4cG9zdXJlIHRvIGEgdmlydHVhbCBlbnZpcm9ubWVudC4gQ3liZXJzaWNrbmVzcyBpcyB2aXNjZXJhbCBldmlkZW5jZSB0aGF0IFZSIGlzIG5vdCB0aGUgbWVkaXVtIHRvIGVuZCBhbGwgbWVkaWEuIEN5YmVyc2lja25lc3MgcmVtaW5kcyB0aGUgc3VzY2VwdGlibGUgdXNlciBvZiB0aGUgbWVkaXVtIGluIGEgcG93ZXJmdWwgd2F5LiBOYXVzZWEgcmVwbGFjZXMgYXN0b25pc2htZW50LiAgXG4gIDwvZGl2PiBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgIC8vICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDxUaXRsZSBtc2c9XCJQcmVzZW5jZSBhbmQgRW1wYXRoeVwiIC8+XG4gIDxici8+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5SZXNlYXJjaGVycyBoYXZlIGxvbmcgcHVyc3VlZCB0aGUgaWRlYSBvZiBlbW90aW9uYWwgcmVhY3Rpb25zIHN1Y2ggYXMgZW1wYXRoeSBhcyBhIHRlc3Qgb2YgcHJlc2VuY2UuIFxuIFZSIGlzICB1bmRlcnN0b29kIGFzIGdldHRpbmcgdXMgY2xvc2VyIHRvIHRoZSBhdXRoZW50aWMgb3IgdGhlIHJlYWwuIEJ1dCBmb3JnZXR0aW5nIHRoZSBtZWRpdW0gaXMgbm90IG5lY2Vzc2FyeSBmb3IgYSBzZW5zZSBvZiBwcmVzZW5jZS4gUHJlc2VuY2UgY2FuIGJlIHVuZGVyc3Rvb2QgaW4gYSBtb3JlIG51YW5jZWQgd2F5IGFzIGEgbGltaW5hbCB6b25lIGJldHdlZW4gZm9yZ2V0dGluZyBhbmQgYWNrbm93bGVkZ2luZyBWUiBhcyBhIG1lZGl1bS5cbjwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgPCEtLSA8VGl0bGUgbXNnPVwiUHJlc2VuY2UgYW5kIEVtcGF0aHlcIiAvPiAtLT5cbiAgPGRpdiBjbGFzcz1cImhlYWRsaW5lXCI+UHJlc2VuY2UgYW5kIEVtcGF0aHk8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAvLyAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvNDZkNzc5M2ZhN2FiMjRhZC5wbmdcIiIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC9iZWI2MThmZmUzNzY5YmI2LnBuZ1wiIiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzFlNGJkZTMxMjMyNTE5NWYucG5nXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDwhLS0gPFRpdGxlIG1zZz1cIlBpdCBFeHBlcmltZW50XCIgLz4gLS0+XG4gIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi9yaWdodGFycm93LnBuZ1wiIHdpZHRoPVwiOTBcIiBzdHlsZT1cImZsb2F0OiByaWdodFwiPlxuXHQ8ZGl2IGNsYXNzPVwicG9zdGVydGl0bGVcIj5QcmVzZW5jZSBhbmQgRW1wYXRoeTwvZGl2PlxuICA8YnIgLz5cbiAgICA8YnIgLz5cbiAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1Jvb202L3VwYXJyb3cucG5nXCIgd2lkdGg9XCI5MFwiIHN0eWxlPVwiZmxvYXQ6IHJpZ2h0XCI+XG5cdDxkaXYgY2xhc3M9XCJwb3N0ZXJ0aXRsZVwiPk1lYXN1cmluZyBQcmVzZW5jZTwvZGl2PlxuICAgIDxiciAvPlxuICAgICAgPGJyIC8+XG4gICAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1Jvb202L3VyYXJyb3cucG5nXCIgd2lkdGg9XCIxMjBcIiAgc3R5bGU9XCJmbG9hdDogcmlnaHRcIj5cblx0PGRpdiBjbGFzcz1cInBvc3RlcnRpdGxlXCI+QXVyYTwvZGl2PlxuICAgXG5cblxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAvLyAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC80OTA1NzU3Mzc0OTIzMjU5LnBuZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTYvbGZhcnJvdy5wbmdcIiB3aWR0aD1cIjIwXCIgc3R5bGU9XCJmbG9hdDogbGVmdDsgbWFyZ2luOiAxMHB4XCI+XG4gIDxUaXRsZSBtc2c9XCJVbHRpbWF0ZSBFbXBhdGh5IE1hY2hpbmVcIiAvPlxuICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+MzYwPHNwYW4+JiMxNzY7PC9zcGFuPiBmaWxtIENsb3VkcyBPdmVyIFNpZHJhIGNyZWF0ZWQgYnkgQ2hyaXMgTWlsayBhbmQgR2FibyBBcm9yYSBzaG93cyB0aGUgbGlmZSBvZiBTeXJpYW4gcmVmdWdlZXMgaW4gWmEnYXRhcmkgY2FtcCBpbiBKb3JkYW4uIFRoZSBjYW1lcmEgZm9sbG93cyAxMi15ZWFyIG9sZCBTaWRyYSBpbiBoZXIgZXZlcnlkYXkgbGlmZSwgYWxsb3dpbmcgdGhlIHVzZXJzIHRvIGJlIHByZXNlbnQgd2l0aCBTaWRyYS4gPC9kaXY+XG4gIDxiciAvPlxuICA8YmxvY2txdW90ZSBjbGFzcz1cInNxdWFyZW9mZlwiPlwiV2hlbiB5b3XigJlyZSBpbnNpZGUgb2YgdGhlIGhlYWRzZXQgLiAuIC4geW91IHNlZSBmdWxsIDM2MCBkZWdyZWVzLCBpbiBhbGwgZGlyZWN0aW9ucy4gQW5kIHdoZW4geW914oCZcmUgc2l0dGluZyB0aGVyZSBpbiBoZXIgcm9vbSwgd2F0Y2hpbmcgaGVyLCB5b3UncmUgbm90IHdhdGNoaW5nIGl0IHRocm91Z2ggYSB0ZWxldmlzaW9uIHNjcmVlbiwgeW914oCZcmUgbm90IHdhdGNoaW5nIGl0IHRocm91Z2ggYSB3aW5kb3csIHlvdeKAmXJlIHNpdHRpbmcgdGhlcmUgd2l0aCBoZXIuIFdoZW4geW91IGxvb2sgZG93biwgeW91J3JlIHNpdHRpbmcgb24gdGhlIHNhbWUgZ3JvdW5kIHRoYXQgc2hl4oCZcyBzaXR0aW5nIG9uLiBBbmQgYmVjYXVzZSBvZiB0aGF0LCB5b3UgZmVlbCBoZXIgaHVtYW5pdHkgaW4gYSBkZWVwZXIgd2F5LiBZb3UgZW1wYXRoaXplIHdpdGggaGVyIGluIGEgZGVlcGVyIHdheS4gKE1pbGsgMjAxNSlcIjwvYmxvY2txdW90ZT5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgIC8vICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvYjQ2NGRiZTkwZDYxMzNhYi5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTYvY2xvdWRvdmVyc2lkcmEuanBnXCIgd2lkdGg9XCI3MDBcIiA+XG4gIDwhLS0gPFRpdGxlIG1zZz1cIlVsdGltYXRlIEVtcGF0aHkgTWFjaGluZVwiIC8+IC0tPlxuXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgLy8gICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICAgIDwhLS0gPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1Jvb202L3J0YXJyb3cucG5nXCIgd2lkdGg9XCI0MDBcIiA+IC0tPlxuICA8VGl0bGUgbXNnPVwiVGhlIGZ1dHVyZSBvZiBuZXdzP1wiIC8+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5Ob25uaWUgZGUgbGEgUGXDsWEncyA8YSBocmVmPVwiaHR0cHM6Ly9lbWJlZC50ZWQuY29tL3RhbGtzL25vbm55X2RlX2xhX3BlbmFfdGhlX2Z1dHVyZV9vZl9uZXdzX3ZpcnR1YWxfcmVhbGl0eVwiIHRhcmdldD1cIl9ibGFua1wiPlRlZCBUYWxrPC9hPiBjYWxsZWQgJ1RoZSBmdXR1cmUgb2YgbmV3cz8nJyAgaW50cm9kdWNlcyBhIG5ldyBmb3JtIG9mIGpvdXJuYWxpc20gd2hlcmUgVmlydHVhbCBSZWFsaXR5IHRlY2hub2xvZ3kgaXMgdXNlZCB0byBwdXQgYXVkaWVuY2UgaW5zaWRlIHRoZSBzdG9yaWVzLiBJbiBoZXIgd29yaywgc2hlIGNyZWF0ZWQgVlIgc3RvcmllcyBhYm91dCBpbXByaXNvbm1lbnQgaW4gR3VhbnRhbmFtbyBhbmQgaHVuZ2VyIGluIExvcyBBbmdlbGVzIHRvIGluZHVjZSBlbXBhdGh5IGluIHRoZSBhdWRpZW5jZS48L2Rpdj4gXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC9iMzkzM2ZmMzU5Zjk0OWJhLnBuZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICAgIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi9ub25uaWUucG5nXCIgd2lkdGg9XCI3MDBcIiA+XG5cbiAgPCEtLSA8VGl0bGUgbXNnPVwiVGhlIGZ1dHVyZSBvZiBuZXdzP1wiIC8+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5Ob25uaWUgZGUgbGEgUGXDsWEncyA8YSBocmVmPVwiaHR0cHM6Ly9lbWJlZC50ZWQuY29tL3RhbGtzL25vbm55X2RlX2xhX3BlbmFfdGhlX2Z1dHVyZV9vZl9uZXdzX3ZpcnR1YWxfcmVhbGl0eVwiIHRhcmdldD1cIl9ibGFua1wiPlRlZCBUYWxrPC9hPiBjYWxsZWQgJ1RoZSBmdXR1cmUgb2YgbmV3cz8nJyAgaW50cm9kdWNlcyBhIG5ldyBmb3JtIG9mIGpvdXJuYWxpc20gd2hlcmUgVmlydHVhbCBSZWFsaXR5IHRlY2hub2xvZ3kgaXMgdXNlZCB0byBwdXQgYXVkaWVuY2UgaW5zaWRlIHRoZSBzdG9yaWVzLiBJbiBoZXIgd29yaywgc2hlIGNyZWF0ZWQgVlIgc3RvcmllcyBhYm91dCBpbXByaXNvbm1lbnQgaW4gR3VhbnRhbmFtbyBhbmQgaHVuZ2VyIGluIExvcyBBbmdlbGVzIHRvIGluZHVjZSBlbXBhdGh5IGluIHRoZSBhdWRpZW5jZS48L2Rpdj4gIC0tPlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgIC8vICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgICA8VGl0bGUgbXNnPVwiUGl0IEV4cGVyaW1lbnRcIiAvPlxuICBcdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5UaGUgcGl0IGV4cGVyaW1lbnQgaXMgYSB2aXJ0dWFsIGV4cGVyaWVtZW50IG9mdGVuIHVzZWQgdG8gZXZhbHVhdGUgdGhlIHNlbmNlIG9mIHByZXNlbmNlLiBUaGUgdXNlciBpcyBnaXZlbiBhIHRhc2sgdG8gZ3JhYiBhbiBvYmplY3Qgb24gcGxhbmsgYW5kIHRha2UgaXQgdG8gdGhlIG90aGVyIHNpZGUsIGNyb3NzaW5nIHRoZSBwaXQuIDwvZGl2PlxuXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzIxNzZkYzY2ZjVhMDI1NDYucG5nXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi9waXRWUi5wbmdcIiB3aWR0aD1cIjQzNlwiID5cbiAgPCEtLSA8VGl0bGUgbXNnPVwiUGl0IEV4cGVyaW1lbnRcIiAvPiAtLT5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDwhLS0gPFRpdGxlIG1zZz1cIlByZXNlbmNlXCIgLz4gLS0+XG4gIDxkaXYgY2xhc3M9XCJwb3N0ZXJ0aXRsZVwiPlByZXNlbmNlPC9kaXY+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5QcmVzZW5jZSBpcyBhIGtpbmQgb2YgYWJzZW5jZSwgdGhlIGFic2VuY2Ugb2YgbWVkaWF0aW9uLiBJZiB0aGUgdXNlcnMgY2FuIGZvcmdldCB0aGF0IHRoZSBtZWRpdW0gaXMgdGhlcmUsIHRoZW4gdGhleSBmZWVsIHByZXNlbmNlLiA8L2Rpdj5cbiAgXHQ8IS0tIDxkaXYgY2xhc3M9XCJwb3N0ZXJ0aXRsZVwiPlByZXNlbmNlIGlzIGEga2luZCBvZiBhYnNlbmNlLCB0aGUgYWJzZW5jZSBvZiBtZWRpYXRpb24uIElmIHRoZSB1c2VycyBjYW4gZm9yZ2V0IHRoYXQgdGhlIG1lZGl1bSBpcyB0aGVyZSwgdGhlbiB0aGV5IGZlZWwgcHJlc2VuY2UuIDwvZGl2PiAtLT5cbiAgICBcdDwhLS0gPGRpdiBjbGFzcz1cImhlYWRsaW5lXCI+UHJlc2VuY2UgaXMgdGhlIGFic2VuY2Ugb2YgbWVkaWF0aW9uLiBJZiB0aGUgdXNlcnMgY2FuIGZvcmdldCB0aGF0IHRoZSBtZWRpdW0gaXMgdGhlcmUsIHRoZW4gdGhleSBmZWVsIHByZXNlbmNlLiA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5QcmVzZW5jZSBpcyBhIGtpbmQgb2YgYWJzZW5jZSwgdGhlIGFic2VuY2Ugb2YgbWVkaWF0aW9uLiBJZiB0aGUgdXNlcnMgY2FuIGZvcmdldCB0aGF0IHRoZSBtZWRpdW0gaXMgdGhlcmUsIHRoZW4gdGhleSBmZWVsIHByZXNlbmNlLiA8L2Rpdj4gLS0+XG4gICAgICA8YnIgLz5cbiAgICAgIDxiciAvPlxuICAgICAgXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCIgc3R5bGU9XCJmb250LXN0eWxlOml0YWxpY1wiPlwiVlIgYW5kIEFSIGNhbm5vdCBkZWNlaXZlIHRoZWlyIHVzZXJzIGludG8gYmVsaWV2aW5nIHRoYXQgdGhleSBhcmUgaGF2aW5nIGEgbm9uLW1lZGlhdGVkIGV4cGVyaWVuY2UuIEJ1dCB0aGF0IGlzIG5vdCBuZWNlc3NhcnkgZm9yIGEgc2Vuc2Ugb2YgcHJlc2VuY2UuXCI8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG4gIFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8VGl0bGUgbXNnPVwiVHJlZWh1Z2dlcjogV2F3b25hXCIgLz5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlRyZWVodWdnZXI6IFdhd29uYSBWUiBleHBlcmllbmNlIHRyYW5zcG9ydHMgdGhlIHVzZXJzIHRvIHRoZSByZWQgZ2lhbnQgU2VxdW9pYSB0cmVlcyBmcm9tIHRoZSBTZXF1b2lhIE5hdGlvbmFsIFBhcmsuIEl0IHByb3ZpZGVzIGEgc2Vuc2Ugb2YgaW50aW1hY3kgd2l0aCB0aGUgdHJlZSAtIHdpdGggaXRzIGJhcmssIHdpdGggdGhlIGNlbGxzIHRoYXQgbWFrZSB1cCBpdHMgYmVpbmcuIFRoZSB2aXZpZG5lc3Mgb2YgdGhlIHdvcmsgaWxsdXN0cmF0ZXMgPGVtPnByZXNlbmNlPC9lbT4uIDwvZGl2PlxuICA8IS0tIEluIHRoaXMgZXhwZXJpZW5jZSwgdXNlcnMgZmluZCB0aGVtc2VsdmVzIG9uIHRoZSB0aHJlc2hvbGQgb2YgZm9yZ2V0dGluZyB0aGF0IHdlIGFyZSBoYXZpbmcgYSBWUiBleHBlcmllbmNlLiBCZWluZyBvbiB0aGF0IHRocmVzaG9sZCBpcyBhIHNlbmNlIG9mIHByZXNlbmNlIGluIGEgcmVhbGl0eSBtZWRpdW0uIC0tPlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC8yNzNkZWM0N2VjNzYyMzBkLnBuZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICAgIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi90cmVlaHVnZ2VyLnBuZ1wiIHdpZHRoPVwiODAwXCIgPlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgLy8gdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgPFRpdGxlIG1zZz1cIkJhY2sgdG8gdGhlIG1haW4gZXhoaWJpdGlvblwiIC8+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAvLyB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8IS0tIDxUaXRsZSBtc2c9XCJUaGUgZnV0dXJlIG9mIG5ld3M/XCIgLz4gLS0+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5QYXJ0aGVub24gbW9kZWwgZXhwbGFuYXRpb248L2Rpdj4gXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0L2E3ZDEyNDRjNGIyM2I3YjAuanBnXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gICAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1Jvb202L3RlcnJhY290dGEuanBnXCIgd2lkdGg9XCI4MDBcIiA+XG5cbiAgPCEtLSA8VGl0bGUgbXNnPVwiVGhlIGZ1dHVyZSBvZiBuZXdzP1wiIC8+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5Ob25uaWUgZGUgbGEgUGXDsWEncyA8YSBocmVmPVwiaHR0cHM6Ly9lbWJlZC50ZWQuY29tL3RhbGtzL25vbm55X2RlX2xhX3BlbmFfdGhlX2Z1dHVyZV9vZl9uZXdzX3ZpcnR1YWxfcmVhbGl0eVwiIHRhcmdldD1cIl9ibGFua1wiPlRlZCBUYWxrPC9hPiBjYWxsZWQgJ1RoZSBmdXR1cmUgb2YgbmV3cz8nJyAgaW50cm9kdWNlcyBhIG5ldyBmb3JtIG9mIGpvdXJuYWxpc20gd2hlcmUgVmlydHVhbCBSZWFsaXR5IHRlY2hub2xvZ3kgaXMgdXNlZCB0byBwdXQgYXVkaWVuY2UgaW5zaWRlIHRoZSBzdG9yaWVzLiBJbiBoZXIgd29yaywgc2hlIGNyZWF0ZWQgVlIgc3RvcmllcyBhYm91dCBpbXByaXNvbm1lbnQgaW4gR3VhbnRhbmFtbyBhbmQgaHVuZ2VyIGluIExvcyBBbmdlbGVzIHRvIGluZHVjZSBlbXBhdGh5IGluIHRoZSBhdWRpZW5jZS48L2Rpdj4gIC0tPlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgIC8vICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPFRpdGxlIG1zZz1cIlRlcnJhY290dGEgV2FycmlvcnMgQVJcIiAvPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+XCJUaGUgRnJhbmtsaW4gSW5zdGl0dXRlIGlzIHVzaW5nIEFSIHRvIGVuaGFuY2UgdGhlaXIgVGVycmFjb3R0YSBXYXJyaW9yIGV4aGliaXRpb24gd2hpY2ggd2VyZSBkaXNwbGF5ZWQgaW4gUGhpbGFkZWxwaGlhIHVudGlsIE1hcmNoIDIwMTguIFRoZSBtdXNldW3igJlzIGFwcCwgcG93ZXJlZCBieSBXaWtpdHVkZSB0ZWNobm9sb2d5LCBhbGxvd3MgdmlzaXRvcnMgdG8gdXNlIHRoZWlyIHNtYXJ0cGhvbmUgdG8gc2NhbiBpdGVtcyBhbmQgdmlzdWFsaXplIHJpY2ggQVIgY29udGVudCB0byBsZWFybiBldmVuIG1vcmUgYWJvdXQgdGhlIGludHJpZ3VpbmcgaGlzdG9yeSBiZWhpbmQgdGhlIG1hZ25pZmljZW50IGNsYXkgc29sZGllcnMuXCI8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvYjJjNzcwMDk2NDRhN2Q0NS5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTYvdHJlZWh1Z2dlcjIuanBnXCIgd2lkdGg9XCI2MDBcIiA+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgLy8gICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8VGl0bGUgbXNnPVwiUGl0IEV4cGVyaW1lbnRcIiAvPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+VGhyb3VnaCB0aGUgdmlydHVhbCBwaXQgZXhwZXJpbWVudCwgc3ViamVjdHMgZXhwZXJpZW5jZSBhIGhpZ2hlciBzZW5zZSBvZiBwcmVzZW5jZS4gPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDxUaXRsZSBtc2c9XCJQaXQgRXhwZXJpbWVudCBJbnN0cnVjdGlvblwiIC8+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5Ucnkgd2Fsa2luZyBhY3Jvc3MgdGhlIHBpdCB3aXRob3V0IGxvc2luZyBiYWxhbmNlIG9yIGZhbGxpbmcuPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgPFRpdGxlIG1zZz1cIlZlcnkgY2FyZWZ1bGx5IHN0cmV0Y2ggeW91ciBhcm1zIG91dCBmb3IgYmFsYW5jZS5cIiAvPlxuXHQ8IS0tIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj4gRmlyc3QgcGVyc29uIHNob290ZXIgZ2FtZXMgc3VjaCBhcyAgPGEgaHJlZj1cImh0dHBzOi8vd3d3LmhhbGYtbGlmZS5jb20vZW4vYWx5eC9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5IYWxmTGlmZTogQWx5eCA8L2E+IGhhdmUgbG9uZyB1c2VkIDMtRCBncmFwaGljcyB0byBjcmVhdGUgYW4gaW1tZXJzaXZlIGV4cGVyaWVuY2UgZm9yIG1pbGxpb25zIG9mIHBsYXllcnMuIEFuZCBmb3IgZGVjYWRlcywgXG4gICAgcGxheWVycyBvbiBjb21wdXRlcnMgYW5kIGdhbWUgY29uc29sZXMgaGF2ZSB5ZWFybmVkIGZvciB0cnVlIFZSIHNvIHRoYXQgdGhleSBjb3VsZCBmYWxsIHRocm91Z2ggdGhlIHNjcmVlbiBpbnRvIHRoZSB3b3JsZHMgb24gdGhlIG90aGVyIHNpZGUuPC9kaXY+ICAtLT5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8VGl0bGUgbXNnPVwiV2hhdCBkbyB5b3Ugc2VlIG9uIHRoZSBmbG9vciByaWdodCBub3c/XCIgLz5cblx0PCEtLSA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+IEZpcnN0IHBlcnNvbiBzaG9vdGVyIGdhbWVzIHN1Y2ggYXMgIDxhIGhyZWY9XCJodHRwczovL3d3dy5oYWxmLWxpZmUuY29tL2VuL2FseXgvXCIgdGFyZ2V0PVwiX2JsYW5rXCI+SGFsZkxpZmU6IEFseXggPC9hPiBoYXZlIGxvbmcgdXNlZCAzLUQgZ3JhcGhpY3MgdG8gY3JlYXRlIGFuIGltbWVyc2l2ZSBleHBlcmllbmNlIGZvciBtaWxsaW9ucyBvZiBwbGF5ZXJzLiBBbmQgZm9yIGRlY2FkZXMsIFxuICAgIHBsYXllcnMgb24gY29tcHV0ZXJzIGFuZCBnYW1lIGNvbnNvbGVzIGhhdmUgeWVhcm5lZCBmb3IgdHJ1ZSBWUiBzbyB0aGF0IHRoZXkgY291bGQgZmFsbCB0aHJvdWdoIHRoZSBzY3JlZW4gaW50byB0aGUgd29ybGRzIG9uIHRoZSBvdGhlciBzaWRlLjwvZGl2PiAgLS0+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPCEtLSA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTUvQWx5eC1zcGxhc2gucG5nXCIgd2lkdGg9XCI0MDBcIiA+IC0tPlxuPFRpdGxlIG1zZz1cIldlbGNvbWUgdG8gUmVhbGl0eSBNZWRpYSFcIiAvPlxuPGJyPjxicj5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPiA8aT5SZWFsaXR5IE1lZGlhPC9pPiBpcyBhIHByb2plY3QgZW5jb21wYXNzaW5nIHRocmVlIHdyaXRpbmcgc3BhY2VzLCB0aHJlZSB0ZWNobm9sb2dpZXMgZm9yIHJlcHJlc2VudGluZyBpZGVhczogcHJpbnQsIHRoZSB3ZWIsIGFuZCBpbW1lcnNpdmUgVlIuIFRoZSBwcmludGVkIHBhZ2UgaXMgYSB3cml0aW5nIHNwYWNlIHdpdGggYSB0cmFkaXRpb24gZGF0aW5nIGJhY2sgdG8gdGhlIGZpZnRlZW50aCBjZW50dXJ5IChpbiBFdXJvcGUsIG11Y2ggZWFybGllciBpbiBDaGluYSkuIE9idmlvdXNseSB0aGUgd2ViIGhhcyBhIGZhciBzaG9ydGVyIHRyYWRpdGlvbiwgYmVnaW5uaW5nIGFyb3VuZCAxOTkwLiBCdXQgaW4gdGhlIHRoaXJ0eSB5ZWFyIHNpbmNlIFRpbSBCZXJuZXJzLUxlZSBsYXVuY2hlZCB0aGUgZmlyc3Qgd2ViIHNlcnZlciwgdGhlIHdlYiBoYXMgZ3Jvd24gdG8gcml2YWwgcHJpbnQgZm9yIG1hbnkga2luZHMgb2YgY29tbXVuaWNhdGlvbi4gVGhlIHRlY2hub2xvZ2llcyBmb3IgY3JlYXRpbmcgM0QgZ3JhcGhpYyBzcGFjZXMgaW4gVlIgKGFuZCBBUikgYWN0dWFsbHkgcHJlZGF0ZSB0aGUgd2ViLiBCdXQgb25seSBpbiB0aGUgcGFzdCAxMCB5ZWFycyBoYXZlIEFSIGFuZCBWUiBiZWNvbWUgd2lkZWx5IGF2YWlsYWJsZSBtZWRpYS4gVGhlIGdvYWwgb2YgUmVhbGl0eU1lZGlhIGlzIHRvIGRlbW9uc3RyYXRlIHRoZSBwb3RlbnRpYWwgcmFuZ2Ugb2YgQVIgYW5kIFZSIGFzIGNvbW11bmljYXRpdmUgZm9ybXMuXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzdhMjRhNmQzMDlkNDUzZjIuanBnXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxUaXRsZSBtc2c9XCJSZWFsaXR5IE1lZGlhXCIgLz5cbiAgPCEtLSA8ZGl2IHN0eWxlPVwid2lkdGg6YXV0b1wiPjwvZGl2PiAtLT5cbiAgPGJyIC8+XG4gIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9PbmJvYXJkaW5nL3JlYWxpdHlNZWRpYUJvb2suanBnXCIgd2lkdGg9XCIzMDBcIiBzdHlsZT1cImZsb2F0OmxlZnQ7IG1hcmdpbi1yaWdodDoyMHB4XCI+XG5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPjxkaXYgc3R5bGU9XCJtYXJnaW4tbGVmdDozMHB4XCI+UHVibGlzaGVkIGJ5IDxhIGhyZWY9XCJodHRwczovL21pdHByZXNzLm1pdC5lZHUvYm9va3MvcmVhbGl0eS1tZWRpYVwiPk1JVCBQcmVzczwvYT48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cIm9ibGlxdWVcIj5CeSBKYXkgRGF2aWQgQm9sdGVyLCBNYXJpYSBFbmdiZXJnIGFuZCBCbGFpciBNYWNJbnR5cmU8L2Rpdj4gXG4gIDxicj5cbiAgPGRpdiBjbGFzcz1cInF1b3RlXCI+SG93IGF1Z21lbnRlZCByZWFsaXR5IGFuZCB2aXJ0dWFsIHJlYWxpdHkgYXJlIHRha2luZyB0aGVpciBwbGFjZXMgaW4gY29udGVtcG9yYXJ5IG1lZGlhIGN1bHR1cmUgYWxvbmdzaWRlIGZpbG0gYW5kIHRlbGV2aXNpb24uPC9kaXY+PC9kaXY+XG5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxUaXRsZSBtc2c9XCJCb29rOiBSZWFsaXR5IE1lZGlhXCIgLz5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiIHN0eWxlPVwid2lkdGg6MzgwcHhcIj5QdWJsaXNoZWQgYnkgPGEgaHJlZj1cImh0dHBzOi8vbWl0cHJlc3MubWl0LmVkdS9ib29rcy9yZWFsaXR5LW1lZGlhXCI+TUlUIFByZXNzPC9hPjwvZGl2PlxuICA8YnI+XG4gIDxkaXYgY2xhc3M9XCJvYmxpcXVlIHNxdWFyZW9mZlwiPkJ5IEpheSBEYXZpZCBCb2x0ZXIsIE1hcmlhIEVuZ2JlcmcgYW5kIEJsYWlyIE1hY0ludHlyZTwvZGl2PiBcbiAgPGJyPlxuICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmIHF1b3RlXCI+XCJIb3cgYXVnbWVudGVkIHJlYWxpdHkgYW5kIHZpcnR1YWwgcmVhbGl0eSBhcmUgdGFraW5nIHRoZWlyIHBsYWNlcyBpbiBjb250ZW1wb3JhcnkgbWVkaWEgY3VsdHVyZSBhbG9uZ3NpZGUgZmlsbSBhbmQgdGVsZXZpc2lvbi5cIiA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvNWIxNGRhOTZlMjg4OWZmMi5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL09uYm9hcmRpbmcvTW96aWxsYUh1YnMuanBnXCIgd2lkdGg9XCI0MDBcIiA+XG4gIDxicj48YnI+XG4gIDxUaXRsZSBtc2c9XCJUaGUgSHVicyBQbGF0Zm9ybVwiIC8+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj4qUmVhbGl0eW1lZGlhKiBpcyBidWlsdCBvbiB0b3Agb2YgTW96aWxsYSdzIG9wZW4tc291cmNlIHBsYXRmb3JtLiBBbiBleHRlbnNpdmUgZ3VpZGUgdG8gdXNpbmcgTW96aWxsYSBIdWJzIGlzIGF2YWlsYWJsZSBhdCA8YSBocmVmPVwiaHR0cHM6Ly9odWJzLm1vemlsbGEuY29tL2RvY3MvaW50cm8taHVicy5odG1sXCIgdGFyZ2V0PVwiYmxhbmtcIj5pbiB0aGUgSHVicyB1c2VyIGRvY3VtZW50YXRpb248L2E+LiBIZXJlIGFyZSB0aGUgaGlnaGxpZ2h0czpcbiAgPGJyPjxicj5cbkJlZm9yZSBlbnRlcmluZywgeW91IGFyZSBpbiB0aGUgcm9vbSdzIGxvYmJ5LiBGcm9tIGhlcmUsIHlvdSBjYW4gc2VlIGFuZCBoZWFyIHdoYXQncyBnb2luZyBvbiBpbnNpZGUgdGhlIHJvb20sIGJ1dCB5b3UgY2FuIG9ubHkgaW50ZXJhY3Qgd2l0aCBvdGhlcnMgdXNpbmcgdGV4dCBjaGF0LiBcbjxicj48YnI+XG48L2Rpdj4gXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+XG4gICAgICA8YnI+XG4gICAgICA8YnI+XG4gICAgICA8YnI+XG48ZGl2IGNsYXNzPVwia2V5UG9pbnRcIj5UbyBlbnRlciB0aGUgcm9vbTo8L2Rpdj5cbjxicj5cbi0gT24gYSBkZXNrdG9wIG9yIG1vYmlsZSBkZXZpY2UsIGZvbGxvdyB0aGUgcHJvbXB0cyB0byBzZWxlY3QgYSBuYW1lL2F2YXRhciBhbmQgZW5hYmxlIHRoZSBtaWMuXG48YnI+XG4tIE9uIGEgVlIgaGVhZHNldCwgaWYgeW91IG9wZW5lZCB0aGUgVVJMIG9uIHlvdXIgZGVza3RvcCBvciBzbWFydHBob25lLCBjaG9vc2UgXCJFbnRlciBvbiBTdGFuZGFsb25lIFZSXCIgdG8gY3JlYXRlIGEgY29kZSB0aGF0IG1ha2VzIGl0IGVhc3kgdG8gb3BlbiBvbiB5b3VyIHN0YW5kYWxvbmUgaGVhZHNldC4gT3BlbiB0aGUgYnJvd3NlciBpbiB5b3VyIFZSIGhlYWRzZXQsIG5hdmlnYXRlIHRvIGh1YnMubGluayBhbmQgZW50ZXIgdGhlIGNvZGUuXG48YnI+PGJyPlxuPGRpdiBjbGFzcz1cImtleVBvaW50XCI+VG8gbmF2aWdhdGUgaW4gSHViczo8L2Rpdj4gIFxuPGJyPlxuLSBPbiBkZXNrdG9wIHVzZSB5b3VyIFdBU0Qgb3IgYXJyb3cga2V5cyB0byBtb3ZlIGFyb3VuZC4gWW91IGNhbiBhbHNvIHByZXNzIHlvdXIgcmlnaHQgbW91c2UgYnV0dG9uIHRvIHRlbGVwb3J0IHRvIGEgZGlmZmVyZW50IGxvY2F0aW9uLiBSb3RhdGUgeW91ciB2aWV3IHVzaW5nIHRoZSBRIGFuZCBFIGtleXMsIG9yIGhvbGQgZG93biB5b3VyIGxlZnQgbW91c2UgYnV0dG9uIGFuZCBkcmFnLlxuPGJyPlxuLSBGb3IgVlIgYW5kIG1vYmlsZSBjb250cm9scywgc2VlIHRoZSBsaXN0IG9mIDxhIGhyZWY9XCJodHRwczovL2h1YnMubW96aWxsYS5jb20vZG9jcy9odWJzLWNvbnRyb2xzLmh0bWxcIiB0YXJnZXQ9XCJibGFua1wiPkh1YnMgY29udHJvbHMuPC9hPlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuXG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzVkNDJiYzZiMmEwNzRjY2QucG5nXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG5cbjxUaXRsZSBtc2c9XCJGZWF0dXJlcyBpbiBIdWJzXCIgLz5cbjxicj5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPiBUaGUgZmlndXJlIGJlbG93IGluZGljYXRlcyBob3cgdG8gbXV0ZSB5b3VyIG1pY3JvcGhvbmUsIHRha2UgcGhvdG9zLCBzaGFyZSB5b3VyIHNjcmVlbiwgY3JlYXRlIG1lZGlhIG9iamVjdHMsIGFuZCBzbyBvbjogPC9kaXY+IFxuICAgIDxicj48YnI+XG4gICAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL09uYm9hcmRpbmcvaHVicy11c2VyLWludGVyZmFjZS5wbmdcIiB3aWR0aD1cIjQwMFwiID5cblxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cblxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG48IS0tIDxUaXRsZSBtc2c9XCJIb3cgdG8gVXNlIHRoZSBBdWRpbyBQYWRzXCIgLz4gLS0+XG48VGl0bGUgbXNnPVwiU3RhbmRpbmcgb24gdGhlIEF1ZGlvIFBhZHMgd2lsbCBzdGFydCB0aGUgbmFycmF0aW9uIGFib3V0IHRoZSByb29tIG9yIHRoZSBzb3VuZCBvZiB0aGUgdmlkZW8gY2xpcC5cIiAvPlxuXG48YnI+PGJyPlxuXHQ8IS0tIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5TdGFuZGluZyBvbiB0aGUgQXVkaW8gUGFkcyB3aWxsIHN0YXJ0IHRoZSBuYXJyYXRpb24gYWJvdXQgdGhlIHJvb20gb3IgdGhlIHNvdW5kIG9mIHRoZSB2aWRlbyBjbGlwLjwvZGl2PiAgLS0+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzgyYTkxMWQyODljZDI4MzYucG5nXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG48VGl0bGUgbXNnPVwiT3RoZXIgd2F5cyB0byB1c2UgdGhlIHJvb21cIiAvPlxuPGJyPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+XG4gICAgPGRpdiBjbGFzcz1cImtleVBvaW50XCI+VmlzaXQgdGhlIGV4aGliaXQgd2l0aCBmcmllbmRzPC9kaXY+XG4gICAgU2hhcmluZyB0aGUgVVJMIG9mIHRoZSByb29tIHlvdSBhcmUgY3VycmVudGx5IGluIHdpbGwgYWxsb3cgb3RoZXJzIHRvIGpvaW4geW91ciBleHBlcmllbmNlLlxuICAgIDxiciAvPlxuICAgIDxiciAvPlxuICAgICAgPGRpdiBjbGFzcz1cImtleVBvaW50XCI+RmF2b3JpdGUgeW91ciByb29tPC9kaXY+XG4gICAgICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvT25ib2FyZGluZy9mYXZvcml0ZS5wbmdcIiB3aWR0aD1cIjQwMFwiID5cbiAgICAgIDxiciAvPlxuICAgU2V0IHlvdXIgcm9vbSBhcyBhIGZhdm9yaXRlIHVuZGVyIHRoZSAnbW9yZScgbWVudS4gVGhlbiwgeW91IGNhbiBlYXNpbHkgcmV2aXNpdCB0aGUgcm9vbSBmcm9tIHRoZSBsaXN0IGluIHRoZSAnZmF2b3JpdGUgcm9vbXMnLlxuICA8L2Rpdj4gXG4gIFxuICAgIFxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIC8vdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuPCEtLSA8VGl0bGUgbXNnPVwiSGVyZSBpcyBhIG1hcCwgd2hpY2ggeW91IHdpbGwgYWxzbyBmaW5kIHBvc3RlZCB0aHJvdWdoIHRoZSBnYWxsZXJpZXNcIiAvPiAgIC0tPlxuPGJyPlxuPGRpdiBjbGFzcz1cInNxdWFyZW9mZiBrZXlQb2ludFwiPkhlcmUgaXMgYSBtYXAsIHdoaWNoIHlvdSB3aWxsIGFsc28gZmluZCBwb3N0ZWQgdGhyb3VnaCB0aGUgZ2FsbGVyaWVzPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgLy90aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5cbjxicj48YnI+PGJyPjxicj48YnI+XG5FYWNoIGdhbGxlcnkgaW4gdGhpcyDigJxpbW1lcnNpdmUgYm9va+KAnSBjb3JyZXNwb25kcyB0byBvbmUgb3IgbW9yZSBjaGFwdGVycyBpbiB0aGUgcHJpbnRlZCBib29rIGFuZCBpbGx1c3RyYXRlcyB0aGUgdGhlbWVzIG9mIHRoZSBwcmludGVkIGNoYXB0ZXIocykuIChTZWUgdGhlIG1hcCBvbiB0aGUgZmFyIHdhbGwgZm9yIHRoZSBuYW1lcy90aGVtZXMgb2YgdGhlIGdhbGxlcmllcy4pIEZvciBleGFtcGxlLCB0aGUgZ2FsbGVyeSBlbnRpdGxlZCDigJxQcmVzZW5jZeKAnSBpbGx1c3RyYXRlcyBib3RoIHByZXNlbmNlIGFuZCB0aGUgcmVsYXRlZCBjb25jZXB0IG9mIGF1cmEgYW5kIGhvdyBjb21wdXRlciBzY2llbnRpc3RzIGFzIHdlbGwgYXMgZmlsbW1ha2VycyBhbmQgZGVzaWduZXJzIGhhdmUgdHJpZWQgdG8gZXZva2UgdGhlc2UgcmVhY3Rpb25zIGluIHZpc2l0b3JzIHRvIHRoZWlyIGltbWVyc2l2ZSBhcHBsaWNhdGlvbnMuIFxuIDwvZGl2PiBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgICAvL3RoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCw0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbjxUaXRsZSBtc2c9XCJSZXR1cm4gYmFjayB0byB0aGUgd2Vic2l0ZVwiIC8+ICBcbjwhLS0gPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiIHN0eWxlPVwiZm9udC1zaXplOjQ1cHhcIj5SZXR1cm4gYmFjayB0byB0aGUgd2Vic2l0ZTwvZGl2PiAtLT5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgICAvL3RoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiXSwibmFtZXMiOlsiSHVic0FwcCIsImV0aGVyZWFsLmNyZWF0ZUxheW91dFN5c3RlbSIsIldlYkxheWVyM0QiLCJTdG9yZSIsIkh1YnNBcHBQcm90byIsIkFwcCIsImluaXQiXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQWU7Ozs7Ozs7OztBQ1dmOzs7Ozs7O0FBRmM7QUFLWjtBQUNGO0FBQ0EsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIL0I7Ozs7QUFMYztBQU1kLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUM7QUFDN0IsSUFBSSxJQUFJLEdBQUcsTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksR0FBRyxtREFBa0Q7Ozs7Ozs7Ozs7Ozs7TUNiOUUsTUFBTTtJQUN2QixhQUFhLENBQWdCO0lBQzdCLGFBQWEsQ0FBeUI7SUFF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
