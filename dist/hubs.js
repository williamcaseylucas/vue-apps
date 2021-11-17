import { p as pushScopeId, a as popScopeId, i as inject, c as createElementBlock, b as createBaseVNode, t as toDisplayString, u as unref, F as Fragment, o as openBlock, d as createVNode, e as createCommentVNode, f as createApp, j as jh, k as kh, r as reactive, g as readonly, h as createTextVNode, n as normalizeClass, l as createStaticVNode } from './vendor-426aefc4.js';

var _imports_0$j = "https://resources.realitymedia.digital/vue-apps/dist/1a6ace377133f14a.png";

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

const _hoisted_1$_ = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$Y = /*#__PURE__*/createBaseVNode("img", {
  alt: "Vue logo",
  src: _imports_0$j
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

pushScopeId("data-v-91ee6202");
const _hoisted_1$Y = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$W = /*#__PURE__*/createBaseVNode("img", {
  alt: "Vue logo",
  src: _imports_0$j
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

script$_.__scopeId = "data-v-91ee6202";

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

const _hoisted_1$X = {
  id: "room",
  class: "darkwall"
};


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

const _hoisted_1$W = {
  id: "room",
  class: "darkwall"
};


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

var _imports_0$i = "https://resources.realitymedia.digital/vue-apps/dist/38d6d7a1e02fc2f9.png";

const _hoisted_1$V = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$V = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$i,
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

var _imports_0$h = "https://resources.realitymedia.digital/vue-apps/dist/7af7b95b35fd7616.jpg";

const _hoisted_1$U = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$U = { class: "spacer" };
const _hoisted_3$s = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$h,
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

var _imports_0$g = "https://resources.realitymedia.digital/vue-apps/dist/7ab3d86afd48dbfb.jpg";

const _hoisted_1$T = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$T = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$g,
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

var _imports_0$f = "https://resources.realitymedia.digital/vue-apps/dist/91fdfa811e752dc8.jpg";

const _hoisted_1$S = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$S = { class: "spacer" };
const _hoisted_3$r = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$f,
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

var _imports_0$e = "https://resources.realitymedia.digital/vue-apps/dist/dc05c04546a69e64.png";

const _hoisted_1$R = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$R = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$e,
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

const _hoisted_1$Q = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$Q = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$e,
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

const _hoisted_1$P = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$P = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$e,
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

const _hoisted_1$O = {
  id: "room",
  class: "darkwall"
};
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

const _hoisted_1$N = {
  id: "room",
  class: "darkwall"
};
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

const _hoisted_1$M = {
  id: "room",
  class: "darkwall"
};
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

const _hoisted_1$L = {
  id: "room",
  class: "darkwall"
};
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

const _hoisted_1$K = {
  id: "room",
  class: "darkwall"
};
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

const _hoisted_1$J = {
  id: "room",
  class: "darkwall"
};
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

const _hoisted_1$I = {
  id: "room",
  class: "darkwall"
};
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

const _hoisted_1$H = {
  id: "room",
  class: "darkwall"
};
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

var _imports_0$d = "https://resources.realitymedia.digital/vue-apps/dist/190994370aebe395.png";

const _hoisted_1$G = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$G = { class: "spacer" };
const _hoisted_3$p = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$d,
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

const _hoisted_1$F = {
  id: "room",
  class: "darkwall"
};
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

const _hoisted_1$E = {
  id: "room",
  class: "darkwall"
};
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

const _hoisted_1$D = {
  id: "room",
  class: "darkwall"
};
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

const _hoisted_1$C = {
  id: "room",
  class: "darkwall"
};
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

const _hoisted_1$B = {
  id: "room",
  class: "darkwall"
};
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

const _hoisted_1$A = {
  id: "room",
  class: "darkwall"
};
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

const _hoisted_1$z = {
  id: "room",
  class: "darkwall"
};
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

const _hoisted_1$y = {
  id: "room",
  class: "darkwall"
};
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

const _hoisted_1$x = /*#__PURE__*/createStaticVNode("<div id=\"room\" class=\"darkwall\"><div class=\"spacer\"><br><br><!-- &lt;Title msg=&quot;Aura&quot; /&gt; --><div class=\"headline\">Aura</div><br><br><div class=\"squareoff\"><p>In 1930s, Walter Benjamin introduced the concept of <em>aura</em> in The Work of Art in the Age of Mechanical Reproduction. Aura is the <em>here and now</em> that work possesses because of its unique history of production and transmissinowon. </p><p>AR applications are not perfect reproductive technologies, as some draw on the physical and cultural uniquesness, <em>the here and now</em> of particular places </p></div></div></div>", 1);
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

const _hoisted_1$w = {
  id: "room",
  class: "darkwall"
};
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

const _hoisted_1$v = {
  id: "room",
  class: "darkwall"
};
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

const _hoisted_1$u = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
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

var _imports_0$c = "https://resources.realitymedia.digital/vue-apps/dist/46d7793fa7ab24ad.png";

var _imports_1 = "https://resources.realitymedia.digital/vue-apps/dist/beb618ffe3769bb6.png";

var _imports_2 = "https://resources.realitymedia.digital/vue-apps/dist/1e4bde312325195f.png";

const _hoisted_1$t = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createCommentVNode(" <Title msg=\"Pit Experiment\" /> "),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$c,
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

var _imports_0$b = "https://resources.realitymedia.digital/vue-apps/dist/4905757374923259.png";

const _hoisted_1$s = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$s = { class: "spacer" };
const _hoisted_3$g = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$f = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$a = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$b,
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

var _imports_0$a = "https://resources.realitymedia.digital/vue-apps/dist/b464dbe90d6133ab.jpg";

const _hoisted_1$r = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$a,
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

const _hoisted_1$q = {
  id: "room",
  class: "darkwall"
};
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

var _imports_0$9 = "https://resources.realitymedia.digital/vue-apps/dist/b3933ff359f949ba.png";

const _hoisted_1$p = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$9,
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

const _hoisted_1$o = {
  id: "room",
  class: "darkwall"
};
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

var _imports_0$8 = "https://resources.realitymedia.digital/vue-apps/dist/2176dc66f5a02546.png";

const _hoisted_1$n = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$8,
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

const _hoisted_1$m = /*#__PURE__*/createStaticVNode("<div id=\"room\" class=\"darkwall\"><div class=\"spacer\"><br><br><!-- &lt;Title msg=&quot;Presence&quot; /&gt; --><div class=\"postertitle\">Presence</div><div class=\"squareoff\">Presence is a kind of absence, the absence of mediation. If the users can forget that the medium is there, then they feel presence. </div><!-- &lt;div class=&quot;postertitle&quot;&gt;Presence is a kind of absence, the absence of mediation. If the users can forget that the medium is there, then they feel presence. &lt;/div&gt; --><!-- &lt;div class=&quot;headline&quot;&gt;Presence is the absence of mediation. If the users can forget that the medium is there, then they feel presence. &lt;/div&gt;\n      &lt;div class=&quot;squareoff&quot;&gt;Presence is a kind of absence, the absence of mediation. If the users can forget that the medium is there, then they feel presence. &lt;/div&gt; --><br><br><div class=\"squareoff\" style=\"font-style:italic;\">&quot;VR and AR cannot deceive their users into believing that they are having a non-mediated experience. But that is not necessary for a sense of presence.&quot;</div></div></div>", 1);
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

const _hoisted_1$l = {
  id: "room",
  class: "darkwall"
};
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

var _imports_0$7 = "https://resources.realitymedia.digital/vue-apps/dist/273dec47ec76230d.png";

const _hoisted_1$k = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$7,
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

const _hoisted_1$j = {
  id: "room",
  class: "darkwall"
};
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

const _hoisted_1$i = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
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

var _imports_0$6 = "https://resources.realitymedia.digital/vue-apps/dist/a7d1244c4b23b7b0.jpg";

const _hoisted_1$h = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$6,
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

const _hoisted_1$g = {
  id: "room",
  class: "darkwall"
};
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

var _imports_0$5 = "https://resources.realitymedia.digital/vue-apps/dist/b2c77009644a7d45.jpg";

const _hoisted_1$f = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$5,
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

const _hoisted_1$e = {
  id: "room",
  class: "darkwall"
};
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

const _hoisted_1$d = {
  id: "room",
  class: "darkwall"
};
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

const _hoisted_1$c = {
  id: "room",
  class: "darkwall"
};
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

const _hoisted_1$b = {
  id: "room",
  class: "darkwall"
};
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

const _hoisted_1$a = {
  id: "room",
  class: "darkwall"
};
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

var _imports_0$4 = "https://resources.realitymedia.digital/vue-apps/dist/7a24a6d309d453f2.jpg";

const _hoisted_1$9 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$9 = { class: "spacer" };
const _hoisted_3$5 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$5 = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$4,
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

const _hoisted_1$8 = {
  id: "room",
  class: "darkwall"
};
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

var _imports_0$3 = "https://resources.realitymedia.digital/vue-apps/dist/5b14da96e2889ff2.jpg";

const _hoisted_1$7 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$7 = { class: "spacer" };
const _hoisted_3$3 = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$3,
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

const _hoisted_1$6 = /*#__PURE__*/createStaticVNode("<div id=\"room\" class=\"darkwall\"><div class=\"spacer\"><div class=\"squareoff\"><br><br><br><div class=\"keyPoint\">To enter the room:</div><br> - On a desktop or mobile device, follow the prompts to select a name/avatar and enable the mic. <br> - On a VR headset, if you opened the URL on your desktop or smartphone, choose &quot;Enter on Standalone VR&quot; to create a code that makes it easy to open on your standalone headset. Open the browser in your VR headset, navigate to hubs.link and enter the code. <br><br><div class=\"keyPoint\">To navigate in Hubs:</div><br> - On desktop use your WASD or arrow keys to move around. You can also press your right mouse button to teleport to a different location. Rotate your view using the Q and E keys, or hold down your left mouse button and drag. <br> - For VR and mobile controls, see the list of <a href=\"https://hubs.mozilla.com/docs/hubs-controls.html\" target=\"blank\">Hubs controls.</a></div></div></div>", 1);
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

var _imports_0$2 = "https://resources.realitymedia.digital/vue-apps/dist/5d42bc6b2a074ccd.png";

const _hoisted_1$5 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$5 = { class: "spacer" };
const _hoisted_3$2 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$2 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, " The figure below indicates how to mute your microphone, take photos, share your screen, create media objects, and so on: ", -1 /* HOISTED */);
const _hoisted_5 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_6 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_7 = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$2,
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

const _hoisted_1$4 = {
  id: "room",
  class: "darkwall"
};
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

var _imports_0$1 = "https://resources.realitymedia.digital/vue-apps/dist/82a911d289cd2836.png";

const _hoisted_1$3 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$3 = { class: "spacer" };
const _hoisted_3 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "keyPoint" }, "Visit the exhibit with friends"),
  /*#__PURE__*/createTextVNode(" Sharing the URL of the room you are currently in will allow others to join your experience. "),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("div", { class: "keyPoint" }, "Favorite your room"),
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$1,
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

var _imports_0 = "https://resources.realitymedia.digital/vue-apps/dist/013b754af9ebcd32.png";

const _hoisted_1$2 = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createCommentVNode(" <Title msg=\"Here is a map, which you will also find posted through the galleries\" />   "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("div", { class: "keyPoint" }, "Here is a map, which you will also find posted through the galleries"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0,
      width: "400"
    })
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

const _hoisted_1$1 = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
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

const _hoisted_1 = {
  id: "room",
  class: "darkwall"
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHVicy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Fzc2V0cy9sb2dvLnBuZyIsIi4uLy4uL3NyYy9jb21wb25lbnRzL05ldHdvcmtlZEhlbGxvV29ybGQudnVlIiwiLi4vLi4vc3JjL2FwcHMvVGVzdGluZy9IdWJzVGVzdDEvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Z1ZUFwcC50cyIsIi4uLy4uL3NyYy9hcHBzL0h1YnNBcHAudHMiLCIuLi8uLi9zcmMvYXBwcy9UZXN0aW5nL0h1YnNUZXN0MS9zaGFyZWQudHMiLCIuLi8uLi9zcmMvYXBwcy9UZXN0aW5nL0h1YnNUZXN0MS9odWJzLnRzIiwiLi4vLi4vc3JjL2NvbXBvbmVudHMvSGVsbG9Xb3JsZC52dWUiLCIuLi8uLi9zcmMvYXBwcy9UZXN0aW5nL0h1YnNUZXN0Mi9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvVGVzdGluZy9IdWJzVGVzdDIvc2hhcmVkLnRzIiwiLi4vLi4vc3JjL2FwcHMvVGVzdGluZy9IdWJzVGVzdDIvaHVicy50cyIsIi4uLy4uL3NyYy9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1BvcnRhbC9Qb3J0YWxUaXRsZS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUG9ydGFsL1BvcnRhbFRpdGxlL2h1YnMudHMiLCIuLi8uLi9zcmMvY29tcG9uZW50cy9DZW50ZXJTdWJ0aXRsZS52dWUiLCIuLi8uLi9zcmMvYXBwcy9Qb3J0YWwvUG9ydGFsU3VidGl0bGUvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1BvcnRhbC9Qb3J0YWxTdWJ0aXRsZS9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvcm90dW5kYS1tYXAucG5nIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyX01hcC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyX01hcC9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvbGFjaW90YXQtVlIuanBnIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyMV9JbnRyby9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyMV9JbnRyby9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvbGFjaW90YXQuanBnIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyMl9IaXN0b3J5L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXIyX0hpc3RvcnkvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL3VuY2FubnkuanBnIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyM18zRC1UcmFja2luZy9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyM18zRC1UcmFja2luZy9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvcGFydGhlbm9uLnBuZyIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjRfUHJlc2VuY2UvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjRfUHJlc2VuY2UvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjVfR2VucmVzL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXI1X0dlbnJlcy9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyNl9GdXR1cmUvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjZfRnV0dXJlL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXI3X1ByaXZhY3kvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjdfUHJpdmFjeS9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGgxX0ludHJvL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDFfSW50cm8vaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoMl9IaXN0b3J5L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDJfSGlzdG9yeS9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGgzXzNELVRyYWNraW5nL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDNfM0QtVHJhY2tpbmcvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoNF9QcmVzZW5jZS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGg0X1ByZXNlbmNlL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDVfR2VucmVzL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDVfR2VucmVzL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDZfRnV0dXJlL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDZfRnV0dXJlL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDdfUHJpdmFjeS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGg3X1ByaXZhY3kvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb201L0FseXgtc3BsYXNoLnBuZyIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L0FseXgvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L0FseXgvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L1Bva2Vtb24vQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L1Bva2Vtb24vaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L0JlYXRTYWJlci9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvQmVhdFNhYmVyL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNS9XYWxraW5nRGVhZC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvV2Fsa2luZ0RlYWQvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L0FwcGFyaXppb25lL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNS9BcHBhcml6aW9uZS9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvTWluZWNyYWZ0L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNS9NaW5lY3JhZnQvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L0dhbWVzQmFubmVyL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNS9HYW1lc0Jhbm5lci9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvQXJ0QmFubmVyL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNS9BcnRCYW5uZXIvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0FSYW5kUHJlc2VuY2UvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0FSYW5kUHJlc2VuY2UvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0F1cmEvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0F1cmEvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L2N5YmVyc2lja25lc3MvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L2N5YmVyc2lja25lc3MvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0VtcGF0aHkvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0VtcGF0aHkvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0VtcGF0aHlfdGl0bGUvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0VtcGF0aHlfdGl0bGUvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L3JpZ2h0YXJyb3cucG5nIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvUm9vbTYvdXBhcnJvdy5wbmciLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9Sb29tNi91cmFycm93LnBuZyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L21hcC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvbWFwL2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9Sb29tNi9sZmFycm93LnBuZyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L01pbGsvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L01pbGsvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L2Nsb3Vkb3ZlcnNpZHJhLmpwZyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L01pbGtfcGljL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9NaWxrX3BpYy9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvTm9ubmllL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9Ob25uaWUvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L25vbm5pZS5wbmciLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9Ob25uaWVfcGljL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9Ob25uaWVfcGljL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QaXRFeHBlcmltZW50L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QaXRFeHBlcmltZW50L2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9Sb29tNi9waXRWUi5wbmciLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QaXRfcGljL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QaXRfcGljL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QcmVzZW5jZS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvUHJlc2VuY2UvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1RyZWVodWdnZXIvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1RyZWVodWdnZXIvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L3RyZWVodWdnZXIucG5nIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvVHJlZWh1Z2dlcl9waWMvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1RyZWVodWdnZXJfcGljL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9FeGl0L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9FeGl0L2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QYXJ0aGVub24vQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1BhcnRoZW5vbi9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvUm9vbTYvdGVycmFjb3R0YS5qcGciLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9UZXJyYWNvdHRhUGljL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9UZXJyYWNvdHRhUGljL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9UZXJyYWNvdHRhL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9UZXJyYWNvdHRhL2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9Sb29tNi90cmVlaHVnZ2VyMi5qcGciLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9UcmVlaHVnZ2VyUGljMi9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvVHJlZWh1Z2dlclBpYzIvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb21fUGl0L1BpdC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbV9QaXQvUGl0L2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tX1BpdC9QaXRJbnN0cnVjdGlvbi9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbV9QaXQvUGl0SW5zdHJ1Y3Rpb24vaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb21fUGl0L3BpdFNpZ24xL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tX1BpdC9waXRTaWduMS9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbV9QaXQvcGl0U2lnbjIvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb21fUGl0L3BpdFNpZ24yL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL1dlbGNvbWUvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvV2VsY29tZS9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvT25ib2FyZGluZy9yZWFsaXR5TWVkaWFCb29rLmpwZyIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvTWl0UHJlc3MvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvTWl0UHJlc3MvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvTWl0VGV4dC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9NaXRUZXh0L2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9PbmJvYXJkaW5nL01vemlsbGFIdWJzLmpwZyIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvSHVic1BsYXRmb3JtL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL0h1YnNQbGF0Zm9ybS9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9IdWJzUGxhdGZvcm0yL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL0h1YnNQbGF0Zm9ybTIvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL09uYm9hcmRpbmcvaHVicy11c2VyLWludGVyZmFjZS5wbmciLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL0h1YnNGZWF0dXJlcy9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9IdWJzRmVhdHVyZXMvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvQXVkaW9UZXh0L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL0F1ZGlvVGV4dC9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvT25ib2FyZGluZy9mYXZvcml0ZS5wbmciLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL1NoYXJpbmcvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvU2hhcmluZy9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvT25ib2FyZGluZy9NYXBfdHJhbnNwYXJlbnQucG5nIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9yb3R1bmRhTWFwL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL3JvdHVuZGFNYXAvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvT3ZlcnZpZXcvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvT3ZlcnZpZXcvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvQmFjay9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9CYWNrL2h1YnMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzFhNmFjZTM3NzEzM2YxNGEucG5nXCIiLCI8dGVtcGxhdGU+XG4gIDxoMSB4ci1sYXllciBjbGFzcz1cImZhZGVcIj57eyBtc2cgfX08L2gxPlxuICA8cD5cbiAgICBIZXJlJ3Mgc29tZSBtb3JlIHRleHQganVzdCB0byBtYWtlIHRoaW5ncyBub3QgYmxhbmsuXG4gIDwvcD5cblxuICA8YnV0dG9uIHhyLWxheWVyIEBjbGljaz1cInNoYXJlZC5pbmNyZW1lbnRcIj5jb3VudCBpczoge3sgc2hhcmVkLnN0YXRlLmNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgaW5qZWN0IH0gZnJvbSAndnVlJ1xuXG5kZWZpbmVQcm9wcyh7XG4gIG1zZzogU3RyaW5nXG59KVxuXG5jb25zdCBzaGFyZWQgPSBpbmplY3QoJ3NoYXJlZCcpXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbmEge1xuICBjb2xvcjogI2I1NDJiOTtcbn1cblxuLmZhZGUge1xuICBjb2xvcjogIzk4MDNhNTtcbiAgLyogdHJhbnNpdGlvbjogY29sb3IgMXM7ICovXG59XG5cbi5mYWRlOmhvdmVyIHtcbiAgY29sb3I6ICNhNzhlMDY7XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgICAgIDxpbWcgYWx0PVwiVnVlIGxvZ29cIiBzcmM9XCIuLi8uLi8uLi9hc3NldHMvbG9nby5wbmdcIiAvPlxuICAgICAgPFNvbWVUZXh0IHYtYmluZDptc2c9XCJtZXNnXCIgLz5cbiAgICAgIDwhLS0gPFNvbWVUZXh0IG1zZz1cIk5ldHdvcmtlZCBWdWUgQ29tcG9uZW50IHdpdGggU2hhcmVkIEJ1dHRvbiBDb3VudFwiIC8+IC0tPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBpbmplY3QgfSBmcm9tICd2dWUnXG5pbXBvcnQgU29tZVRleHQgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9OZXR3b3JrZWRIZWxsb1dvcmxkLnZ1ZSdcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG5cbmxldCBwYXJhbXMgPSBpbmplY3QoXCJwYXJhbXNcIilcbnZhciBtZXNnID0gcGFyYW1zICYmIHBhcmFtcy5tZXNnID8gcGFyYW1zLm1lc2cgOiBcIk5ldHdvcmtlZCBWdWUgQ29tcG9uZW50IHdpdGggU2hhcmVkIEJ1dHRvbiBDb3VudFwiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgeyBjcmVhdGVBcHAsIEFwcCwgQ29tcG9uZW50LCBDb21wb25lbnRQdWJsaWNJbnN0YW5jZSB9IGZyb20gXCJ2dWVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVnVlQXBwIHtcbiAgICB0YWtlT3duZXJzaGlwOiAgKCkgPT4gYm9vbGVhblxuICAgIHNldFNoYXJlZERhdGE6IChvYmplY3Q6IHt9KSA9PiBib29sZWFuXG5cbiAgICB3aWR0aDogbnVtYmVyXG4gICAgaGVpZ2h0OiBudW1iZXJcblxuICAgIHZ1ZUFwcDogQXBwXG4gICAgdnVlUm9vdDogQ29tcG9uZW50UHVibGljSW5zdGFuY2UgfCB1bmRlZmluZWRcblxuICAgIGNvbnN0cnVjdG9yIChBcHA6IENvbXBvbmVudCwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGNyZWF0ZU9wdGlvbnM6IGFueSA9e30pIHtcbiAgICAgICAgdGhpcy50YWtlT3duZXJzaGlwID0gdGhpcy50YWtlT3duZXJzaGlwUHJvdG8uYmluZCh0aGlzKVxuICAgICAgICB0aGlzLnNldFNoYXJlZERhdGEgPSB0aGlzLnNldFNoYXJlZERhdGFQcm90by5iaW5kKHRoaXMpXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aFxuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodFxuXG4gICAgICAgIHRoaXMudnVlQXBwID0gY3JlYXRlQXBwKEFwcCwgY3JlYXRlT3B0aW9ucylcbiAgICB9XG5cbiAgICBtb3VudCgpIHtcbiAgICB9XG5cbiAgICAvLyBkdW1teSBmdW5jdGlvbnMsIGp1c3QgdG8gbGV0IHVzIHVzZSB0aGUgc2FtZVxuICAgIC8vIGRhdGEgc3RvcmUgd2l0aCBodWJzIGFuZCB0aGUgd2ViIHRlc3Rpbmcgc2V0dXBcbiAgICB0YWtlT3duZXJzaGlwUHJvdG8oKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBzZXRTaGFyZWREYXRhUHJvdG8ob2JqZWN0OiB7fSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59IiwiaW1wb3J0IHsgY3JlYXRlQXBwLCBBcHAsIENvbXBvbmVudCwgQ29tcG9uZW50UHVibGljSW5zdGFuY2UgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyBTY2VuZSwgRW50aXR5IH0gZnJvbSAnYWZyYW1lJ1xuaW1wb3J0IHsgRXRoZXJlYWxMYXlvdXRTeXN0ZW0sIFdlYkxheWVyM0QgfSBmcm9tIFwiZXRoZXJlYWxcIjtcbmltcG9ydCBWdWVBcHAgIGZyb20gXCIuL1Z1ZUFwcFwiXG5cbi8vIGNyZWF0ZSBpbml0IG1ldGhvZCBmb3IgZXRoZXJlYWxcbmltcG9ydCAqIGFzIGV0aGVyZWFsIGZyb20gJ2V0aGVyZWFsJ1xuaW1wb3J0IHsgY3JlYXRlUHJpbnRlciwgVGhpc0V4cHJlc3Npb24sIFRocm93U3RhdGVtZW50IH0gZnJvbSBcIm5vZGVfbW9kdWxlcy90eXBlc2NyaXB0L2xpYi90eXBlc2NyaXB0XCI7XG5pbXBvcnQgeyBjcmVhdGUgfSBmcm9tIFwibWF0aGpzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplRXRoZXJlYWwoKSB7XG4gICAgSHVic0FwcC5pbml0aWFsaXplRXRoZXJlYWwoKVxufVxuXG4vL1RIUkVFLk9iamVjdDNELkRlZmF1bHRNYXRyaXhBdXRvVXBkYXRlID0gdHJ1ZTtcblxuZXhwb3J0IGZ1bmN0aW9uIHN5c3RlbVRpY2sodGltZTogbnVtYmVyLCBkZWx0YVRpbWU6IG51bWJlcikge1xuICAgSHVic0FwcC5zeXN0ZW1UaWNrKHRpbWUsIGRlbHRhVGltZSlcbn1cblxuZnVuY3Rpb24gY29weUNhbWVyYShzb3VyY2U6IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhLCB0YXJnZXQ6IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKSB7XG4gICAgc291cmNlLnVwZGF0ZU1hdHJpeFdvcmxkKClcbiAgICAvL2xldCBvbGROYW1lID0gdGFyZ2V0Lm5hbWVcbiAgICAvL3RhcmdldC5jb3B5KHNvdXJjZSwgZmFsc2UpXG4gICAgLy90YXJnZXQubmFtZSA9IG9sZE5hbWVcblxuICAgIHRhcmdldC5mb3YgPSBzb3VyY2UuZm92O1xuICAgIHRhcmdldC56b29tID0gc291cmNlLnpvb207XG5cbiAgICB0YXJnZXQubmVhciA9IHNvdXJjZS5uZWFyO1xuICAgIHRhcmdldC5mYXIgPSBzb3VyY2UuZmFyO1xuXG4gICAgdGFyZ2V0LmFzcGVjdCA9IHNvdXJjZS5hc3BlY3Q7XG5cbiAgICAvLyB0YXJnZXQubWF0cml4V29ybGRJbnZlcnNlLmNvcHkoIHNvdXJjZS5tYXRyaXhXb3JsZEludmVyc2UgKTtcbiAgICAvLyB0YXJnZXQucHJvamVjdGlvbk1hdHJpeC5jb3B5KCBzb3VyY2UucHJvamVjdGlvbk1hdHJpeCApO1xuICAgIC8vIHRhcmdldC5wcm9qZWN0aW9uTWF0cml4SW52ZXJzZS5jb3B5KCBzb3VyY2UucHJvamVjdGlvbk1hdHJpeEludmVyc2UgKTtcblxuICAgIC8vIHRhcmdldC51cC5jb3B5KCBzb3VyY2UudXAgKTtcblxuICAgIC8vIHRhcmdldC5tYXRyaXguY29weSggc291cmNlLm1hdHJpeCApO1xuICAgIC8vIHRhcmdldC5tYXRyaXhXb3JsZC5jb3B5KCBzb3VyY2UubWF0cml4V29ybGQgKTtcblxuICAgIC8vIHRhcmdldC5tYXRyaXhBdXRvVXBkYXRlID0gc291cmNlLm1hdHJpeEF1dG9VcGRhdGU7XG4gICAgLy8gdGFyZ2V0Lm1hdHJpeFdvcmxkTmVlZHNVcGRhdGUgPSBzb3VyY2UubWF0cml4V29ybGROZWVkc1VwZGF0ZTtcblxuICAgIHNvdXJjZS5tYXRyaXhXb3JsZC5kZWNvbXBvc2UoIHRhcmdldC5wb3NpdGlvbiwgdGFyZ2V0LnF1YXRlcm5pb24sIHRhcmdldC5zY2FsZSlcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgdGFyZ2V0LnJvdGF0aW9uLnNldEZyb21RdWF0ZXJuaW9uKCB0YXJnZXQucXVhdGVybmlvbiwgdW5kZWZpbmVkLCBmYWxzZSApO1xuICAgIHRhcmdldC51cGRhdGVNYXRyaXgoKVxuICAgIHRhcmdldC51cGRhdGVNYXRyaXhXb3JsZCh0cnVlKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWJzQXBwIGV4dGVuZHMgVnVlQXBwIHtcbiAgICBzdGF0aWMgc3lzdGVtOiBFdGhlcmVhbExheW91dFN5c3RlbTtcbiAgICBzdGF0aWMgZXRoZXJlYWxDYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoKVxuICAgIHN0YXRpYyBwbGF5ZXJDYW1lcmE6IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhO1xuXG4gICAgaXNFdGhlcmVhbDogYm9vbGVhblxuICAgIGlzSW50ZXJhY3RpdmU6IGJvb2xlYW5cbiAgICBpc05ldHdvcmtlZDogYm9vbGVhblxuICAgIGlzU3RhdGljOiBib29sZWFuXG5cbiAgICBwcml2YXRlIHVwZGF0ZVRpbWU6IG51bWJlclxuICAgIHByaXZhdGUgcmF5Y2FzdGVyOiBUSFJFRS5SYXljYXN0ZXJcblxuICAgIHNpemU6IHtcbiAgICAgICAgd2lkdGg6IG51bWJlcixcbiAgICAgICAgaGVpZ2h0OiBudW1iZXJcbiAgICB9XG5cbiAgICAvL3Rha2VPd25lcnNoaXA6ICAoKSA9PiBib29sZWFuXG4gICAgLy9zZXRTaGFyZWREYXRhOiAob2JqZWN0OiB7fSkgPT4gYm9vbGVhblxuICAgIC8vd2lkdGg6IG51bWJlclxuICAgIC8vaGVpZ2h0OiBudW1iZXJcbiAgICAvL3Z1ZUFwcDogQXBwXG4gICAgLy92dWVSb290OiBDb21wb25lbnRQdWJsaWNJbnN0YW5jZSB8IHVuZGVmaW5lZCBcblxuICAgIHdlYkxheWVyM0Q6IFdlYkxheWVyM0QgfCB1bmRlZmluZWRcbiAgICBuZWVkc1VwZGF0ZTogYm9vbGVhbiA9IGZhbHNlXG5cbiAgICBoZWFkRGl2OiBFbGVtZW50XG5cbiAgICBzdGF0aWMgaW5pdGlhbGl6ZUV0aGVyZWFsKCkge1xuICAgICAgICBsZXQgc2NlbmU6IFNjZW5lID0gd2luZG93LkFQUC5zY2VuZTtcblxuICAgICAgICB0aGlzLmV0aGVyZWFsQ2FtZXJhLm1hdHJpeEF1dG9VcGRhdGUgPSB0cnVlO1xuICAgICAgICAvL3RoaXMuZXRoZXJlYWxDYW1lcmEudmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgICAgIC8vc2NlbmUuc2V0T2JqZWN0M0QoXCJldGhlcmVhbENhbWVyYVwiLCB0aGlzLmV0aGVyZWFsQ2FtZXJhKVxuXG4gICAgICAgIHRoaXMucGxheWVyQ2FtZXJhID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlld2luZy1jYW1lcmFcIikgYXMgRW50aXR5KS5nZXRPYmplY3QzRChcImNhbWVyYVwiKSBhcyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYTtcblxuICAgICAgICAvLyBqdXN0IGluIGNhc2UgXCJ2aWV3aW5nLWNhbWVyYVwiIGlzbid0IHNldCB1cCB5ZXQgLi4uIHdoaWNoIGl0IFxuICAgICAgICAvLyBzaG91bGQgYmUsIGJ1dCBqdXN0IHRvIGJlIGNhcmVmdWxcbiAgICAgICAgdGhpcy5zeXN0ZW0gPSBldGhlcmVhbC5jcmVhdGVMYXlvdXRTeXN0ZW0odGhpcy5wbGF5ZXJDYW1lcmEgPyB0aGlzLnBsYXllckNhbWVyYSA6IHNjZW5lLmNhbWVyYSlcbiAgICAgICAgd2luZG93LmV0aFN5c3RlbSA9IHRoaXMuc3lzdGVtXG5cbiAgICAgICAgLy8gY2FuIGN1c3RvbWl6ZSBlYXNpbmcgZXRjXG4gICAgICAgIC8vIHN5c3RlbS50cmFuc2l0aW9uLmR1cmF0aW9uID0gMS41XG4gICAgICAgIC8vIHN5c3RlbS50cmFuc2l0aW9uLmRlbGF5ID0gMFxuICAgICAgICAvLyBzeXN0ZW0udHJhbnNpdGlvbi5tYXhXYWl0ID0gNFxuICAgICAgICAvLyBzeXN0ZW0udHJhbnNpdGlvbi5lYXNpbmcgPSBldGhlcmVhbC5lYXNpbmcuZWFzZU91dFxuICAgIH1cblxuICAgIHN0YXRpYyBzeXN0ZW1UaWNrKHRpbWU6IG51bWJlciwgZGVsdGFUaW1lOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHNjZW5lID0gd2luZG93LkFQUC5zY2VuZTtcblxuICAgICAgICBpZiAoIXRoaXMucGxheWVyQ2FtZXJhKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXllckNhbWVyYSA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpZXdpbmctY2FtZXJhXCIpIGFzIEVudGl0eSkuZ2V0T2JqZWN0M0QoXCJjYW1lcmFcIikgYXMgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmE7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICghdGhpcy5wbGF5ZXJDYW1lcmEpIHJldHVybjtcbiAgICBcbiAgICAgICAgY29weUNhbWVyYSh0aGlzLnBsYXllckNhbWVyYSwgdGhpcy5ldGhlcmVhbENhbWVyYSlcblxuICAgICAgICBpZiAodGhpcy5ldGhlcmVhbENhbWVyYSAhPSB0aGlzLnN5c3RlbS52aWV3Tm9kZSkge1xuICAgICAgICAgICAgdGhpcy5zeXN0ZW0udmlld05vZGUgPSB0aGlzLmV0aGVyZWFsQ2FtZXJhXG4gICAgICAgIH1cblxuICAgICAgICBzY2VuZS5yZW5kZXJlci5nZXRTaXplKEh1YnNBcHAuc3lzdGVtLnZpZXdSZXNvbHV0aW9uKVxuICAgICAgICB0aGlzLnN5c3RlbS52aWV3RnJ1c3R1bS5zZXRGcm9tUGVyc3BlY3RpdmVQcm9qZWN0aW9uTWF0cml4KHRoaXMuZXRoZXJlYWxDYW1lcmEucHJvamVjdGlvbk1hdHJpeClcblxuICAgICAgICAvLyB0aWNrIG1ldGhvZCBmb3IgZXRoZXJlYWxcbiAgICAgICAgdGhpcy5zeXN0ZW0udXBkYXRlKGRlbHRhVGltZSwgdGltZSlcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvciAoQXBwOiBDb21wb25lbnQsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9LCBjcmVhdGVPcHRpb25zOiBhbnkgPXt9KSB7XG4gICAgICAgIFxuXG4gICAgICAgIGlmIChwYXJhbXMud2lkdGggJiYgcGFyYW1zLmhlaWdodCAmJiBwYXJhbXMud2lkdGggPiAwICYmIHBhcmFtcy5oZWlnaHQgPiAwKSB7XG4gICAgICAgICAgICAvLyByZXNldCBib3RoXG4gICAgICAgICAgICB3aWR0aCA9IHBhcmFtcy53aWR0aCAgIFxuICAgICAgICAgICAgaGVpZ2h0ID0gcGFyYW1zLmhlaWdodFxuICAgICAgICB9IGVsc2UgaWYgKChwYXJhbXMud2lkdGggJiYgcGFyYW1zLndpZHRoID4gMCkgfHwgKHBhcmFtcy5oZWlnaHQgJiYgcGFyYW1zLmhlaWdodCA+IDApKSB7XG4gICAgICAgICAgICAvLyBzZXQgb25lIGFuZCBzY2FsZSB0aGUgb3RoZXJcbiAgICAgICAgICAgIGlmIChwYXJhbXMud2lkdGggJiYgcGFyYW1zLndpZHRoID4gMCkge1xuICAgICAgICAgICAgICAgIGhlaWdodCA9IChwYXJhbXMud2lkdGggLyB3aWR0aCkgKiBoZWlnaHQgICAgXG4gICAgICAgICAgICAgICAgd2lkdGggPSBwYXJhbXMud2lkdGggICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXJhbXMuaGVpZ2h0ICYmIHBhcmFtcy5oZWlnaHQgPiAwKSB7XG4gICAgICAgICAgICAgICAgd2lkdGggPSAocGFyYW1zLmhlaWdodCAvIGhlaWdodCkgKiBoZWlnaHRcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSBwYXJhbXMuaGVpZ2h0XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIGNyZWF0ZU9wdGlvbnMpXG4gICAgICAgIHRoaXMuaXNFdGhlcmVhbCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMudnVlQXBwLnByb3ZpZGUoJ3BhcmFtcycsIHBhcmFtcylcblxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc05ldHdvcmtlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU3RhdGljID0gdHJ1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVUaW1lID0gMTAwXG4gICAgICAgIHRoaXMucmF5Y2FzdGVyID0gbmV3IFRIUkVFLlJheWNhc3RlcigpXG4gICAgICAgIC8vdGhpcy53aWR0aCA9IHdpZHRoXG4gICAgICAgIC8vdGhpcy5oZWlnaHQgPSBoZWlnaHRcbiAgICAgICAgdGhpcy5zaXplID0geyB3aWR0aDogd2lkdGgvMTAwMCwgaGVpZ2h0OiBoZWlnaHQvMTAwMH1cbiAgICAgICAgLy90aGlzLnRha2VPd25lcnNoaXAgPSB0aGlzLnRha2VPd25lcnNoaXBQcm90by5iaW5kKHRoaXMpXG4gICAgICAgIC8vdGhpcy5zZXRTaGFyZWREYXRhID0gdGhpcy5zZXRTaGFyZWREYXRhUHJvdG8uYmluZCh0aGlzKVxuXG4gICAgICAgIHRoaXMuaGVhZERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgLy90aGlzLmhlYWREaXYuc2V0QXR0cmlidXRlKFwic3R5bGVcIixcIndpZHRoOiAxMDAlO2hlaWdodDogMTAwJTtcIilcblxuICAgICAgICAvL3RoaXMudnVlQXBwID0gY3JlYXRlQXBwKEFwcCwgY3JlYXRlT3B0aW9ucylcbiAgICB9XG5cbiAgICBtb3VudCh1c2VFdGhlcmVhbD86IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5pc0V0aGVyZWFsID0gdXNlRXRoZXJlYWwgPT09IHRydWVcbiAgICAgICAgXG4gICAgICAgIHRoaXMudnVlUm9vdCA9IHRoaXMudnVlQXBwLm1vdW50KHRoaXMuaGVhZERpdik7XG4gICAgICAgIHRoaXMudnVlUm9vdC4kZWwuc2V0QXR0cmlidXRlKFwic3R5bGVcIixcIndpZHRoOiBcIiArIHRoaXMud2lkdGggKyBcInB4OyBoZWlnaHQ6IFwiICsgdGhpcy5oZWlnaHQgKyBcInB4O1wiKVxuXG4gICAgICAgIC8vIC8vIGFkZCBhIGxpbmsgdG8gdGhlIHNoYXJlZCBjc3NcbiAgICAgICAgbGV0IGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKVxuICAgICAgICBsLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0L2h1YnMuY3NzXCIpXG4gICAgICAgIGwuc2V0QXR0cmlidXRlKFwicmVsXCIsIFwic3R5bGVzaGVldFwiKVxuICAgICAgICBsLnNldEF0dHJpYnV0ZShcImNyb3Nzb3JpZ2luXCIsXCJhbm9ueW1vdXNcIilcbiAgICAgICAgdGhpcy52dWVSb290LiRlbC5pbnNlcnRCZWZvcmUobCwgdGhpcy52dWVSb290LiRlbC5maXJzdENoaWxkKVxuXG4gICAgICAgIC8vIG1vdmUgdGhpcyBpbnRvIG1ldGhvZFxuICAgICAgICB0aGlzLndlYkxheWVyM0QgPSBuZXcgV2ViTGF5ZXIzRCh0aGlzLnZ1ZVJvb3QuJGVsLCB7XG4gICAgICAgICAgICBhdXRvUmVmcmVzaDogdHJ1ZSxcbiAgICAgICAgICAgIG9uTGF5ZXJDcmVhdGU6IHVzZUV0aGVyZWFsID8gXG4gICAgICAgICAgICAobGF5ZXIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBhZGFwdGVyID0gSHVic0FwcC5zeXN0ZW0uZ2V0QWRhcHRlcihsYXllcilcbiAgICAgICAgICAgICAgICBhZGFwdGVyLm9wYWNpdHkuZW5hYmxlZCA9IHRydWVcbiAgICAgICAgICAgICAgICBhZGFwdGVyLm9uVXBkYXRlID0gKCkgPT4gbGF5ZXIudXBkYXRlKClcbiAgICAgICAgICAgIH0gOlxuICAgICAgICAgICAgKGxheWVyKSA9PiB7fSxcbiAgICAgICAgICAgIG9uTGF5ZXJQYWludDogKGxheWVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTdGF0aWMpIHsgdGhpcy5uZWVkc1VwZGF0ZSA9IHRydWUgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRleHR1cmVFbmNvZGluZzogVEhSRUUuc1JHQkVuY29kaW5nLFxuICAgICAgICAgICAgcmVuZGVyT3JkZXJPZmZzZXQ6IDBcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0TmV0d29ya01ldGhvZHModGFrZU93bmVyc2hpcDogKCkgPT4gYm9vbGVhbiwgc2V0U2hhcmVkRGF0YTogKHt9KSA9PiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMudGFrZU93bmVyc2hpcCA9IHRha2VPd25lcnNoaXA7XG4gICAgICAgIHRoaXMuc2V0U2hhcmVkRGF0YSA9IHNldFNoYXJlZERhdGE7XG4gICAgfVxuXG4gICAgLy8gZHVtbXkgZnVuY3Rpb25zLCBqdXN0IHRvIGF2b2lkIGVycm9ycyBpZiB0aGV5IGdldCBjYWxsZWQgYmVmb3JlXG4gICAgLy8gbmV0d29ya2luZyBpcyBpbml0aWFsaXplZCwgb3IgY2FsbGVkIHdoZW4gbmV0d29ya2VkIGlzIGZhbHNlXG4gICAgLy8gdGFrZU93bmVyc2hpcFByb3RvKCk6IGJvb2xlYW4ge1xuICAgIC8vICAgICByZXR1cm4gdHJ1ZTtcbiAgICAvLyB9XG5cbiAgICAvLyBzZXRTaGFyZWREYXRhUHJvdG8ob2JqZWN0OiB7fSkge1xuICAgIC8vICAgICByZXR1cm4gdHJ1ZTtcbiAgICAvLyB9XG5cbiAgICAvLyByZWNlaXZlIGRhdGEgdXBkYXRlcy4gIHNob3VsZCBiZSBvdmVycmlkZGVuIGJ5IHN1YmNsYXNzZXMsIGFsc28gcmVxdWVzdHNcbiAgICAvLyB1cGRhdGUgbmV4dCB0aWNrXG4gICAgdXBkYXRlU2hhcmVkRGF0YShkYXRhT2JqZWN0OiB7fSkge1xuICAgICAgICB0aGlzLm5lZWRzVXBkYXRlID0gdHJ1ZVxuICAgIH1cblxuICAgIGdldFNpemUoKSB7XG4gICAgICAgIC8vIGlmICghdGhpcy5jb21wU3R5bGVzKSB7XG4gICAgICAgIC8vICAgICB0aGlzLmNvbXBTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLnZ1ZVJvb3QuJGVsKTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyB2YXIgd2lkdGggPSB0aGlzLmNvbXBTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnd2lkdGgnKVxuICAgICAgICAvLyB3aWR0aCA9IHdpZHRoICYmIHdpZHRoLmxlbmd0aCA+IDAgPyBwYXJzZUZsb2F0KHdpZHRoKSAvIDEwMDA6IDFcbiAgICAgICAgLy8gdmFyIGhlaWdodCA9IHRoaXMuY29tcFN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKCdoZWlnaHQnKVxuICAgICAgICAvLyBoZWlnaHQgPSBoZWlnaHQgJiYgaGVpZ2h0Lmxlbmd0aCA+IDAgPyBwYXJzZUZsb2F0KGhlaWdodCkgLyAxMDAwOiAxXG4gICAgICAgIC8vIHRoaXMuc2l6ZSA9IHsgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodH1cbiAgICAgICAgY29uc29sZS5sb2cgKFwiZGl2IHNpemU6IHtcIiArIHRoaXMuc2l6ZS53aWR0aCArIFwiLCBcIiArIHRoaXMuc2l6ZS5oZWlnaHQgKyBcIn1cIilcbiAgICAgICAgcmV0dXJuIHRoaXMuc2l6ZVxuICAgIH1cblxuICAgIC8vIHJlY2VpdmUgZGF0YSB1cGRhdGVzLiAgc2hvdWxkIGJlIG92ZXJyaWRkZW4gYnkgc3ViY2xhc3Nlc1xuICAgIGdldFNoYXJlZERhdGEoZGF0YU9iamVjdDoge30pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZ2V0U2hhcmVkRGF0YSBzaG91bGQgYmUgb3ZlcnJpZGRlbiBieSBzdWJjbGFzc2VzXCIpXG4gICAgfVxuICAgIFxuICAgIC8vIG92ZXJyaWRlIHRvIGNoZWNrIGZvciB5b3VyIG93biAzRCBvYmplY3RzIHRoYXQgYXJlbid0IHdlYkxheWVyc1xuICAgIGNsaWNrZWQoZXZ0OiB7b2JqZWN0M0Q6IFRIUkVFLk9iamVjdDNEfSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNJbnRlcmFjdGl2ZSkgeyByZXR1cm4gfVxuICAgICAgICBcbiAgICAgICAgY29uc3Qgb2JqID0gZXZ0Lm9iamVjdDNEXG4gICAgICAgIHRoaXMucmF5Y2FzdGVyLnJheS5zZXQob2JqLnBvc2l0aW9uLCBcbiAgICAgICAgICAgIHRoaXMud2ViTGF5ZXIzRCEuZ2V0V29ybGREaXJlY3Rpb24obmV3IFRIUkVFLlZlY3RvcjMoKSkubmVnYXRlKCkpXG4gICAgICAgIGNvbnN0IGhpdCA9IHRoaXMud2ViTGF5ZXIzRCEuaGl0VGVzdCh0aGlzLnJheWNhc3Rlci5yYXkpXG4gICAgICAgIGlmIChoaXQpIHtcbiAgICAgICAgICBoaXQudGFyZ2V0LmNsaWNrKClcbiAgICAgICAgICBoaXQudGFyZ2V0LmZvY3VzKClcbiAgICAgICAgICBjb25zb2xlLmxvZygnaGl0JywgaGl0LnRhcmdldCwgaGl0LmxheWVyKVxuICAgICAgICB9ICAgXG4gICAgfVxuXG4gICAgZHJhZ1N0YXJ0KGV2dDoge30pIHtcbiAgICAgICAgLy8gbm90aGluZyBoZXJlIC4uLiBzdWJjbGFzcyBzaG91bGQgb3ZlcnJpZGVcbiAgICB9XG5cbiAgICBkcmFnRW5kIChldnQ6IHt9KSB7XG4gICAgICAgIC8vIG5vdGhpbmcgaGVyZSAuLi4gc3ViY2xhc3Mgc2hvdWxkIG92ZXJyaWRlXG4gICAgfVxuXG4gICAgcGxheSgpIHtcbiAgICAgICAgLy8gaWYgd2UgY2FuIGZpZ3VyZSBvdXQgaG93IHRvIHBhdXNlLCB0aGVuIHJlc3RhcnQgaGVyZVxuICAgIH1cblxuICAgIHBhdXNlKCkge1xuICAgICAgICAvLyBwZXJoYXBzIGZpZ3VyZSBvdXQgaG93IHRvIHBhdXNlIHRoZSBWdWUgY29tcG9uZW50P1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIC8vIFRPRE86IGRlc3Ryb3kgdGhlIHZ1ZSBjb21wb25lbnQgYW5kIGFueSByZXNvdXJjZXMsIGV0Yy4sIGl0IGhhc1xuICAgIH1cblxuICAgIHRpY2sodGltZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRXRoZXJlYWwpIHtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIG5lZWRzVXBkYXRlID0gdGhpcy5uZWVkc1VwZGF0ZVxuICAgICAgICAgICAgdGhpcy5uZWVkc1VwZGF0ZSA9IGZhbHNlXG4gICAgICAgICAgICBpZiAodGhpcy5pc1N0YXRpYyAmJiB0aGlzLnVwZGF0ZVRpbWUgPCB0aW1lKSB7XG4gICAgICAgICAgICAgICAgbmVlZHNVcGRhdGUgPSB0cnVlXG4gICAgICAgICAgICAgICAgLy8gd2FpdCBhIGJpdCBhbmQgZG8gaXQgYWdhaW4uICBNYXkgZ2V0IHJpZCBvZiB0aGlzIHNvbWUgZGF5LCB3ZSdsbCBzZWVcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRpbWUgPSBNYXRoLnJhbmRvbSgpICogMjAwMCArIDEwMDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5pc1N0YXRpYykge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVGltZSA9IHRpbWVcbiAgICAgICAgICAgICAgICBuZWVkc1VwZGF0ZSA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZWVkc1VwZGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMud2ViTGF5ZXIzRCEudXBkYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHsgcmVhY3RpdmUsIHJlYWRvbmx5IH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IFZ1ZUFwcCBmcm9tIFwiLi4vLi4vVnVlQXBwXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgZGF0YSB7XG4gICAgY291bnQ6IG51bWJlclxufVxuXG5leHBvcnQgY2xhc3MgU3RvcmUge1xuICAgIF9zdGF0ZTogZGF0YVxuICAgIHN0YXRlOiBkYXRhXG4gICAgYXBwOiBWdWVBcHBcbiAgICBjb25zdHJ1Y3RvcihhcHA6IFZ1ZUFwcCkge1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IHJlYWN0aXZlKHtcbiAgICAgICAgICAgIGNvdW50OiAwXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuYXBwID0gYXBwXG4gICAgICAgIHRoaXMuc3RhdGUgPSByZWFkb25seSh0aGlzLl9zdGF0ZSlcbiAgICB9ICAgIFxuXG4gICAgaW5jcmVtZW50KCkge1xuICAgICAgICBpZiAodGhpcy5hcHAudGFrZU93bmVyc2hpcCgpKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZS5jb3VudCsrO1xuICAgICAgICAgICAgdGhpcy5hcHAuc2V0U2hhcmVkRGF0YSh0aGlzLnN0YXRlKVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZVNoYXJlZERhdGEoZGF0YU9iamVjdDogZGF0YSkge1xuICAgICAgICAvLyBuZWVkIHRvIHVwZGF0ZSB0aGUgZWxlbWVudHMgd2l0aGluIHRoZSBzdGF0ZSwgYmVjYXVzZSBvdGhlcndpc2VcbiAgICAgICAgLy8gdGhlIGRhdGEgd29uJ3QgZmxvdyB0byB0aGUgY29tcG9uZW50c1xuICAgICAgICB0aGlzLl9zdGF0ZS5jb3VudCA9IGRhdGFPYmplY3QuY291bnRcbiAgICB9XG59IiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5pbXBvcnQge2RhdGEgYXMgU2hhcmVkRGF0YSwgU3RvcmV9IGZyb20gXCIuL3NoYXJlZFwiXG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIHNoYXJlZDogU3RvcmVcbiAgICBcbiAgICBjb25zdHJ1Y3RvciAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIDQwMCwgNDc1LCBwYXJhbXMpXG5cbiAgICAgICAgLy8gY3JlYXRlIG91ciBzaGFyZWQgZGF0YSBvYmplY3QgdGhhdCB3aWxsXG4gICAgICAgIC8vIHNoYXJlIGRhdGEgYmV0d2VlbiB2dWUgYW5kIGh1YnNcbiAgICAgICAgdGhpcy5zaGFyZWQgPSBuZXcgU3RvcmUodGhpcylcbiAgICAgICAgdGhpcy52dWVBcHAucHJvdmlkZSgnc2hhcmVkJywgdGhpcy5zaGFyZWQpXG5cbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc05ldHdvcmtlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNTdGF0aWMgPSBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgdXBkYXRlU2hhcmVkRGF0YShkYXRhT2JqZWN0OiBTaGFyZWREYXRhKSB7XG4gICAgICAgIHN1cGVyLnVwZGF0ZVNoYXJlZERhdGEoZGF0YU9iamVjdClcbiAgICAgICAgdGhpcy5zaGFyZWQudXBkYXRlU2hhcmVkRGF0YShkYXRhT2JqZWN0KVxuICAgIH1cblxuICAgIGdldFNoYXJlZERhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNoYXJlZC5zdGF0ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAocGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0XG4iLCI8dGVtcGxhdGU+XG4gIDxoMSB4ci1sYXllciBjbGFzcz1cImZhZGVcIj57eyBtc2cgfX08L2gxPlxuXG4gIDxwPlxuICAgIDxhIGhyZWY9XCJodHRwczovL3ZpdGVqcy5kZXYvZ3VpZGUvZmVhdHVyZXMuaHRtbFwiIHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgVml0ZSBEb2N1bWVudGF0aW9uIGFuZCBUaGVuIFNvbWUhIFxuICAgIDwvYT5cbiAgICB8XG4gICAgPGEgaHJlZj1cImh0dHBzOi8vdjMudnVlanMub3JnL1wiIHRhcmdldD1cIl9ibGFua1wiPlZ1ZSAzIERvY3VtZW50YXRpb248L2E+XG4gIDwvcD5cblxuICA8YnV0dG9uIHhyLWxheWVyIEBjbGljaz1cInN0YXRlLmNvdW50KytcIj5jb3VudCBpczoge3sgc3RhdGUuY291bnQgfX08L2J1dHRvbj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWFjdGl2ZSB9IGZyb20gJ3Z1ZSdcblxuZGVmaW5lUHJvcHMoe1xuICBtc2c6IFN0cmluZ1xufSlcblxuY29uc3Qgc3RhdGUgPSByZWFjdGl2ZSh7IGNvdW50OiAwIH0pXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbmEge1xuICBjb2xvcjogI2I1NDJiOTtcbn1cblxuLmZhZGUge1xuICBjb2xvcjogIzk4MDNhNTtcbiAgLyogdHJhbnNpdGlvbjogY29sb3IgMXM7ICovXG59XG5cbi5mYWRlOmhvdmVyIHtcbiAgY29sb3I6ICMwNmE3MWI7XG59XG48L3N0eWxlPlxuXG4iLCI8dGVtcGxhdGU+XG48ZGl2PlxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgICAgIDxpbWcgYWx0PVwiVnVlIGxvZ29cIiBzcmM9XCIuLi8uLi8uLi9hc3NldHMvbG9nby5wbmdcIiAvPlxuICAgICAgPEhlbGxvV29ybGQgbXNnPVwiVnVlIENvbXBvbmVudCB3aXRoIExvY2FsIEJ1dHRvbiBDb3VudFwiIC8+XG4gICAgICA8cCBpZD1cImVkaXRcIiB2LWJpbmQ6Y2xhc3M9XCJ7IHVwY2xvc2U6IHNoYXJlZC5zdGF0ZS5jbG9zZSB9XCIgeHItbGF5ZXI+XG4gICAgICAgIEVkaXQgY29kZSBpbiA8Y29kZT5zcmMvYXBwczwvY29kZT4gdG8gdGVzdCBob3QgbW9kdWxlIHJlcGxhY2VtZW50IHdoaWxlIHJ1bm5pbmcgcHJvamVjdCBhcyBcIm5wbSBydW4gZGV2XCIuXG4gICAgICA8L3A+XG5cbiAgPC9kaXY+XG48L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgSGVsbG9Xb3JsZCBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0hlbGxvV29ybGQudnVlJ1xuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcblxuaW1wb3J0IHsgaW5qZWN0IH0gZnJvbSAndnVlJ1xuXG5jb25zdCBzaGFyZWQgPSBpbmplY3QoJ3NoYXJlZCcpXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbiNlZGl0IHtcbiAgY29sb3I6ICNiZWE3ZDE7XG59XG5cbiNlZGl0LnVwY2xvc2Uge1xuICBjb2xvcjogI2NjMGEwYTtcbn1cbjwvc3R5bGU+XG4iLCJpbXBvcnQgeyByZWFjdGl2ZSwgcmVhZG9ubHkgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgVnVlQXBwIGZyb20gXCIuLi8uLi9WdWVBcHBcIjtcblxuZXhwb3J0IGludGVyZmFjZSBkYXRhIHtcbiAgICBjbG9zZTogYm9vbGVhblxufVxuXG5leHBvcnQgY2xhc3MgU3RvcmUge1xuICAgIF9zdGF0ZTogZGF0YVxuICAgIHN0YXRlOiBkYXRhXG4gICAgYXBwOiBWdWVBcHBcblxuICAgIGNvbnN0cnVjdG9yKGFwcDogVnVlQXBwKSB7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gcmVhY3RpdmUoe1xuICAgICAgICAgICAgY2xvc2U6IGZhbHNlXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuYXBwID0gYXBwXG4gICAgICAgIHRoaXMuc3RhdGUgPSByZWFkb25seSh0aGlzLl9zdGF0ZSlcbiAgICB9ICAgIFxuXG4gICAgc2V0Q2xvc2UoYzogYm9vbGVhbikge1xuICAgICAgICBpZiAodGhpcy5fc3RhdGUuY2xvc2UgIT0gYykge1xuICAgICAgICAgICAgdGhpcy5fc3RhdGUuY2xvc2UgPSBjO1xuICAgICAgICB9XG4gICAgfSBcbn1cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuaW1wb3J0IHtkYXRhIGFzIFNoYXJlZERhdGEsIFN0b3JlfSBmcm9tIFwiLi9zaGFyZWRcIlxuaW1wb3J0IHsgV2ViTGF5ZXIzRENvbnRlbnQgfSBmcm9tIFwiZXRoZXJlYWxcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgc2hhcmVkOiBTdG9yZVxuICAgIFxuICAgIGNvbnN0cnVjdG9yIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgNTAwLCA1MDAsIHBhcmFtcylcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnNoYXJlZCA9IG5ldyBTdG9yZSh0aGlzKVxuICAgICAgICB0aGlzLnZ1ZUFwcC5wcm92aWRlKCdzaGFyZWQnLCB0aGlzLnNoYXJlZClcbiAgICB9XG5cbiAgICBkb2NzOiBXZWJMYXllcjNEQ29udGVudCB8IHVuZGVmaW5lZFxuICAgIGJvdW5kc1NpemU6IFRIUkVFLlZlY3RvcjMgID0gbmV3IFRIUkVFLlZlY3RvcjMoKVxuICAgIGJvdW5kczogVEhSRUUuQm94MyA9IG5ldyBUSFJFRS5Cb3gzKClcblxuICAgIG1vdW50ICgpIHtcbiAgICAgICAgc3VwZXIubW91bnQodHJ1ZSkgLy8gdXNlIGV0aGVyZWFsXG5cbiAgICAgICAgdGhpcy5kb2NzID0gdGhpcy53ZWJMYXllcjNEIS5xdWVyeVNlbGVjdG9yKCcjZWRpdCcpXG4gICAgICAgIGlmICghdGhpcy5kb2NzKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJWdWUgYXBwIG5lZWRzICNlZGl0IGRpdlwiKVxuICAgICAgICAgICAgcmV0dXJuIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgYWRhcHRlciA9IEh1YnNBcHAuc3lzdGVtLmdldEFkYXB0ZXIodGhpcy5kb2NzKSBcbiAgICAgICAgYWRhcHRlci5vblVwZGF0ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYm91bmRzID0gYWRhcHRlci5tZXRyaWNzLnRhcmdldC52aXN1YWxCb3VuZHNcbiAgICAgICAgICAgIHRoaXMuYm91bmRzLmdldFNpemUodGhpcy5ib3VuZHNTaXplKVxuICAgICAgICAgICAgdmFyIHNpemUgPSBNYXRoLnNxcnQodGhpcy5ib3VuZHNTaXplLnggKiB0aGlzLmJvdW5kc1NpemUueCArIHRoaXMuYm91bmRzU2l6ZS55ICogdGhpcy5ib3VuZHNTaXplLnkpXG4gICAgICAgICAgICBpZiAodGhpcy5zaGFyZWQuc3RhdGUuY2xvc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNoYXJlZC5zZXRDbG9zZSAoc2l6ZSA8IDIxMClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGFyZWQuc2V0Q2xvc2UgKHNpemUgPCAxOTApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRvY3MhLnVwZGF0ZSgpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAocGFyYW1zKVxuICAgIGFwcC5tb3VudCgpIFxuXG4gICAgXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8aDI+e3sgbXNnIH19PC9oMj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBkZWZpbmVQcm9wcywgcmVhY3RpdmUgfSBmcm9tICd2dWUnXG5cbmRlZmluZVByb3BzKHtcbiAgbXNnOiBTdHJpbmdcbn0pXG5cbmNvbnN0IHN0YXRlID0gcmVhY3RpdmUoeyBjb3VudDogMCB9KVxuPC9zY3JpcHQ+IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPFRpdGxlIHYtYmluZDptc2c9XCJtZXNnXCIgLz5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgaW5qZWN0IH0gZnJvbSAndnVlJ1xuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuXG5sZXQgcGFyYW1zID0gaW5qZWN0KFwicGFyYW1zXCIpXG52YXIgbWVzZyA9IHBhcmFtcyAmJiBwYXJhbXMubWVzc2FnZSA/IHBhcmFtcy5tZXNzYWdlIDogXCJQT1JUQUwgVElUTEVcIlxuPC9zY3JpcHQ+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDEwMCwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8aDQ+e3sgbXNnIH19PC9oND5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBkZWZpbmVQcm9wcywgcmVhY3RpdmUgfSBmcm9tICd2dWUnXG5cbmRlZmluZVByb3BzKHtcbiAgbXNnOiBTdHJpbmdcbn0pXG5cbmNvbnN0IHN0YXRlID0gcmVhY3RpdmUoeyBjb3VudDogMCB9KVxuPC9zY3JpcHQ+IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPFRpdGxlIHYtYmluZDptc2c9XCJtZXNnXCIgLz5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgaW5qZWN0IH0gZnJvbSAndnVlJ1xuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyU3VidGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuXG5sZXQgcGFyYW1zID0gaW5qZWN0KFwicGFyYW1zXCIpXG52YXIgbWVzZyA9IHBhcmFtcyAmJiBwYXJhbXMubWVzc2FnZSA/IHBhcmFtcy5tZXNzYWdlIDogXCJQT1JUQUwgU1VCVElUTEVcIlxuPC9zY3JpcHQ+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDEwMCwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzM4ZDZkN2ExZTAyZmMyZjkucG5nXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8VGl0bGUgbXNnPVwiUmVhbGl0eSBNZWRpYVwiIC8+XG5cdDxpbWcgc3JjPVwiLi4vLi4vYXNzZXRzL2ltYWdlcy9yb3R1bmRhLW1hcC5wbmdcIiB3aWR0aD1cIjI1MFwiID5cblx0PGRpdiBjbGFzcz1cImRpc3BsYXl0ZXh0XCI+QVIgYWxsb3dzIHVzIHRvIGV4dGVuZCBvdXIgcGh5c2ljYWwgcmVhbGl0eTsgVlIgY3JlYXRlcyBmb3IgdXMgYSBkaWZmZXJlbnQgcmVhbGl0eS48L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgLy90aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzdhZjdiOTViMzVmZDc2MTYuanBnXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxUaXRsZSBtc2c9XCJBUiAmYW1wOyBWUiBhcyByZWFsaXR5IG1lZGlhXCIgLz5cblx0PGltZyBzcmM9XCIuLi8uLi9hc3NldHMvaW1hZ2VzL2xhY2lvdGF0LVZSLmpwZ1wiIHdpZHRoPVwiMjUwXCIgPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+IEVhY2ggcmVhbGl0eSBtZWRpdW0gbWVkaWF0ZXMgYW5kIHJlbWVkaWF0ZXMuIEl0IG9mZmVycyBhIG5ldyByZXByZXNlbnRhdGlvbiBvZiB0aGUgd29ybGQgdGhhdCB3ZSBpbXBsaWNpdGx5IGNvbXBhcmUgXG5cdFx0dG8gb3VyIGV4cGVyaWVuY2Ugb2YgdGhlIHdvcmxkIGluIGl0c2VsZiwgYnV0IGFsc28gdGhyb3VnaCBvdGhlciBtZWRpYS48L2Rpdj4gXG4gIDwvZGl2PlxuICAgPHA+XG4gICAgPGEgaHJlZj1cImh0dHBzOi8vcmVhbGl0eW1lZGlhLmRpZ2l0YWxcIiB0YXJnZXQ9XCJfYmxhbmtcIj5cbiAgICAgIFN0YXJ0IGF0IHRoZSByZWFsaXR5IG1lZGlhIHNpdGUuIFxuICAgIDwvYT5cbiAgICB8XG4gIDwvcD5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzdhYjNkODZhZmQ0OGRiZmIuanBnXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICAgIDxUaXRsZSBtc2c9XCJUaGUgTGFDaW90YXQgRWZmZWN0XCIgLz5cbiAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG5cdCAgPGltZyBzcmM9XCIuLi8uLi9hc3NldHMvaW1hZ2VzL2xhY2lvdGF0LmpwZ1wiIHdpZHRoPVwiMjUwXCI+XG5cdCAgPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPkZpbG0gYmVjYW1lIG9uZSBvZiB0aGUgbW9zdCBpbXBvcnRhbnQgcmVhbGl0eSBcbiAgICAgIG1lZGlhIG9mIHRoZSB0d2VudGlldGggY2VudHVyeSwgYW5kIGluIHNvbWUgd2F5cywgaXQgaXMgYSBmb3JlcnVubmVyIFxuICAgICAgb2YgdmlydHVhbCByZWFsaXR5LjwvZGl2PiAgXG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPiAgXG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgICAvL3RoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvOTFmZGZhODExZTc1MmRjOC5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG5cdDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgICA8VGl0bGUgbXNnPVwiMy1EIEdyYXBoaWNzICZhbXA7IFRyYWNraW5nXCIgLz5cblx0PGltZyBzcmM9XCIuLi8uLi9hc3NldHMvaW1hZ2VzL3VuY2FubnkuanBnXCIgd2lkdGg9XCIyMDBcIj5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPjMtRCBjb21wdXRlciBncmFwaGljcyBoZWxwIHRvIGNvbnN0cnVjdCB0aGUgdmlzdWFsIFxuXHRcdHJlYWxpdGllcyBvZiBBUiBhbmQgVlIsIHRoYXQgaXMgcGhvdG9yZWFsaXNtLiBUaGUgdW5jYW5ueSB2YWxsZXkuPC9kaXY+XG5cdDwvZGl2PlxuXHQ8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAvLyB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0L2RjMDVjMDQ1NDZhNjllNjQucG5nXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICAgIDxUaXRsZSBtc2c9XCJQcmVzZW5jZVwiIC8+XG5cdCAgPGRpdiBjbGFzcz1cInNwYWNlclwiPiBcblx0ICA8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWFnZXMvcGFydGhlbm9uLnBuZ1wiIHdpZHRoPVwiMjUwXCI+XG5cdCAgPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlByZXNlbmNlIGluIFZSIGlzIHVzdWFsbHkgY29uY2VpdmVkIG9mIGFzIGZvcmdldHRpbmcgdGhhdCB0aGUgbWVkaXVtIGlzIHRoZXJlLiBUaGUgaWRlYSBpcyB0aGF0IGlmIHRoZSB1c2VyIGNhbiBiZSBlbnRpY2VkIGludG8gYmVoYXZpbmcgYXMgaWYgc2hlIHdlcmUgbm90IGF3YXJlIG9mIGFsbCB0aGUgY29tcGxleCB0ZWNobm9sb2d5LCB0aGVuIHNoZSBmZWVscyBwcmVzZW5jZS48L2Rpdj4gIFxuICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgICAvL3RoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICAgIDxUaXRsZSBtc2c9XCJHZW5yZXNcIiAvPlxuICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj4gXG5cdCAgPGltZyBzcmM9XCIuLi8uLi9hc3NldHMvaW1hZ2VzL3BhcnRoZW5vbi5wbmdcIiB3aWR0aD1cIjI1MFwiPlxuXHQgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5SZWFsaXR5IG1lZGlhIGFwcGxpY2F0aW9ucyBvZnRlbiBmdW5jdGlvbiBhcyBhZGRpdGlvbnMgdG8gZXN0YWJsaXNoZWQgZ2VucmVzLiBNb3N0IGN1cnJlbnQgQVIgYW5kIFZSIGFwcGxpY2F0aW9ucyBiZWhhdmUgbGlrZSBhcHBsaWNhdGlvbnMgb3IgYXJ0aWZhY3RzIHRoYXQgd2Uga25vdyBmcm9tIGVhcmxpZXIgbWVkaWEuPC9kaXY+ICBcbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgICAvL3RoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICAgIDxUaXRsZSBtc2c9XCJUaGUgRnV0dXJlIG9mIEFSICZhbXA7IFZSXCIgLz5cbiAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG5cdCAgPGltZyBzcmM9XCIuLi8uLi9hc3NldHMvaW1hZ2VzL3BhcnRoZW5vbi5wbmdcIiB3aWR0aD1cIjI1MFwiPlxuXHQgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5WUiB3aWxsIGNvbnRpbnVlIHRvIGNvbnN0cnVjdCBzcGVjaWFsIHJlYWxpdGllcywgYXBhcnQgZnJvbSB0aGUgZXZlcnlkYXkuIFZSIHdvcmxkcyB3aWxsIGNvbnRpbnVlIHRvIGJlIG1ldGFwaG9yaWMgd29ybGRzLjwvZGl2PiAgXG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgICA8VGl0bGUgbXNnPVwiUHJpdmFjeSBhbmQgUHVibGljIFNwYWNlXCIgLz5cbiAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG5cdCAgPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlBlcnZhc2l2ZSwgYWx3YXlzLW9uIEFSIGFwcGxpY2F0aW9ucyBoYXZlIHRoZSBwb3RlbnRpYWwgdG8gcHJvdmlkZSBjb21wYW5pZXMgb3IgZ292ZXJubWVudCBhdXRob3JpdGllcyBcbiAgICAgIGV2ZW4gbW9yZSBpbmZvcm1hdGlvbiBhbmQgd2l0aCBtb3JlIHByZWNpc2lvbiB0aGFuIG91ciBjdXJyZW50IG1vYmlsZSBhcHBsaWNhdGlvbnMgZG8sIFxuICAgICAgYm90aCBieSBhZ2dyZWdhdGluZyBvdXIgaGFiaXRzIGFzIGNvbnN1bWVycyBhbmQgYnkgaWRlbnRpZnlpbmcgdXMgYXMgaW5kaXZpZHVhbHMuPC9kaXY+ICBcbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAvLyAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICAgIFxuICAgIDxkaXYgY2xhc3M9XCJwb3N0ZXJ0aXRsZVwiPkFSICZhbXA7IFZSIGFzIHJlYWxpdHkgbWVkaWE8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZmx1c2hsZWZ0XCI+XG4gICAgICA8YnI+XG4gICAgICA8aDM+IFNvbWUgb2YgdGhlIGtleSBkaWZmZXJlbmNlcyBiZXR3ZWVuIOKAnGNsYXNzaWPigJ0gVlIgYW5kIEFSPC9oMz5cbiAgICAgIDxicj5cbiAgICAgIDxoMz4gRXh0ZW5kZWQgcmVhbGl0eSAoWFIpIGFuZCB0aGUgaW1tZXJzaXZlIHdlYiA8L2gzPlxuICAgICAgPGJyPlxuICAgICAgPGgzPiBXaGVyZSBBUiBhbmQgVlIgZml0IG9uIE1pbGdyYW0gYW5kIEtpc2hpbm/igJlzIHZpcnR1YWxpdHkgY29udGludXVtPC9oMz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgIC8vIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICAgIDxUaXRsZSBtc2c9XCJUaGUgSGlzdG9yeSBvZiBSZWFsaXR5IE1lZGlhXCIgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsdXNobGVmdFwiPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gU29tZSBvZiB0aGUga2V5IGRpZmZlcmVuY2VzIGJldHdlZW4g4oCcY2xhc3NpY+KAnSBWUiBhbmQgQVI8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gRXh0ZW5kZWQgcmVhbGl0eSAoWFIpIGFuZCB0aGUgaW1tZXJzaXZlIHdlYiA8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gV2hlcmUgQVIgYW5kIFZSIGZpdCBvbiBNaWxncmFtIGFuZCBLaXNoaW5v4oCZcyB2aXJ0dWFsaXR5IGNvbnRpbnV1bTwvaDM+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+IFxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICAgIDxUaXRsZSBtc2c9XCIzLUQgJmFtcDsgVHJhY2tpbmdcIiAvPlxuICAgICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmx1c2hsZWZ0XCI+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBTb21lIG9mIHRoZSBrZXkgZGlmZmVyZW5jZXMgYmV0d2VlbiDigJxjbGFzc2lj4oCdIFZSIGFuZCBBUjwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBFeHRlbmRlZCByZWFsaXR5IChYUikgYW5kIHRoZSBpbW1lcnNpdmUgd2ViIDwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBXaGVyZSBBUiBhbmQgVlIgZml0IG9uIE1pbGdyYW0gYW5kIEtpc2hpbm/igJlzIHZpcnR1YWxpdHkgY29udGludXVtPC9oMz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj4gICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gICAgPFRpdGxlIG1zZz1cIlByZXNlbmNlXCIgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsdXNobGVmdFwiPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gU29tZSBvZiB0aGUga2V5IGRpZmZlcmVuY2VzIGJldHdlZW4g4oCcY2xhc3NpY+KAnSBWUiBhbmQgQVI8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gRXh0ZW5kZWQgcmVhbGl0eSAoWFIpIGFuZCB0aGUgaW1tZXJzaXZlIHdlYiA8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gV2hlcmUgQVIgYW5kIFZSIGZpdCBvbiBNaWxncmFtIGFuZCBLaXNoaW5v4oCZcyB2aXJ0dWFsaXR5IGNvbnRpbnV1bTwvaDM+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+ICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICAgIDxUaXRsZSBtc2c9XCJHZW5yZXNcIiAvPlxuICAgICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmx1c2hsZWZ0XCI+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBTb21lIG9mIHRoZSBrZXkgZGlmZmVyZW5jZXMgYmV0d2VlbiDigJxjbGFzc2lj4oCdIFZSIGFuZCBBUjwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBFeHRlbmRlZCByZWFsaXR5IChYUikgYW5kIHRoZSBpbW1lcnNpdmUgd2ViIDwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBXaGVyZSBBUiBhbmQgVlIgZml0IG9uIE1pbGdyYW0gYW5kIEtpc2hpbm/igJlzIHZpcnR1YWxpdHkgY29udGludXVtPC9oMz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj4gICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gICAgPFRpdGxlIG1zZz1cIkZ1dHVyZVwiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbHVzaGxlZnRcIj5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFNvbWUgb2YgdGhlIGtleSBkaWZmZXJlbmNlcyBiZXR3ZWVuIOKAnGNsYXNzaWPigJ0gVlIgYW5kIEFSPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IEV4dGVuZGVkIHJlYWxpdHkgKFhSKSBhbmQgdGhlIGltbWVyc2l2ZSB3ZWIgPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFdoZXJlIEFSIGFuZCBWUiBmaXQgb24gTWlsZ3JhbSBhbmQgS2lzaGlub+KAmXMgdmlydHVhbGl0eSBjb250aW51dW08L2gzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PiAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgICA8VGl0bGUgbXNnPVwiUHJpdmFjeVwiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbHVzaGxlZnRcIj5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFNvbWUgb2YgdGhlIGtleSBkaWZmZXJlbmNlcyBiZXR3ZWVuIOKAnGNsYXNzaWPigJ0gVlIgYW5kIEFSPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IEV4dGVuZGVkIHJlYWxpdHkgKFhSKSBhbmQgdGhlIGltbWVyc2l2ZSB3ZWIgPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFdoZXJlIEFSIGFuZCBWUiBmaXQgb24gTWlsZ3JhbSBhbmQgS2lzaGlub+KAmXMgdmlydHVhbGl0eSBjb250aW51dW08L2gzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PiAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzE5MDk5NDM3MGFlYmUzOTUucG5nXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTUvQWx5eC1zcGxhc2gucG5nXCIgd2lkdGg9XCI0MDBcIiA+XG4gIDxicj48YnI+XG4gIDxUaXRsZSBtc2c9XCJIYWxmTGlmZTogQWx5eFwiIC8+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj4gRmlyc3QgcGVyc29uIHNob290ZXIgZ2FtZXMgc3VjaCBhcyAgPGEgaHJlZj1cImh0dHBzOi8vd3d3LmhhbGYtbGlmZS5jb20vZW4vYWx5eC9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5IYWxmTGlmZTogQWx5eCA8L2E+IGhhdmUgbG9uZyB1c2VkIDMtRCBncmFwaGljcyB0byBjcmVhdGUgYW4gaW1tZXJzaXZlIGV4cGVyaWVuY2UgZm9yIG1pbGxpb25zIG9mIHBsYXllcnMuIEFuZCBmb3IgZGVjYWRlcywgXG4gICAgcGxheWVycyBvbiBjb21wdXRlcnMgYW5kIGdhbWUgY29uc29sZXMgaGF2ZSB5ZWFybmVkIGZvciB0cnVlIFZSIHNvIHRoYXQgdGhleSBjb3VsZCBmYWxsIHRocm91Z2ggdGhlIHNjcmVlbiBpbnRvIHRoZSB3b3JsZHMgb24gdGhlIG90aGVyIHNpZGUuPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxUaXRsZSBtc2c9XCJQb2tlbW9uIEdvXCIgLz5cblx0ICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+UG9rZW1vbiBHbyAoMjAxNikgaXMgcGVyaGFwcyBzdGlsbCB0aGUgYmVzdC1rbm93biBBUiBnYW1lLiBcbiAgICAgIFRoZSBQb2tlbW9uIGZyYW5jaGlzZSB3YXMgYWxyZWFkeSBkZWNhZGVzIG9sZCwgYW5kIHRoaXMgd2FzIGNlcnRhaW5seSBwYXJ0IG9mIHRoZSBcbiAgICAgIGFuc3dlciBmb3IgdGhlIEFSIGdhbWXigJlzIHN1cnByaXNpbmcgaW1wYWN0LiBcbiAgICAgIEl0IHdhcyB0aGUgZmlyc3QgUG9rZW1vbiBnYW1lIG9uIGEgbW9iaWxlIHBob25lIGFuZCB0aGUgZmlyc3QgZnJlZSBQb2tlbW9uIGdhbWUgb24gYW55IHBsYXRmb3JtLlxuICAgIDwvZGl2PiBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgIC8vICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8VGl0bGUgbXNnPVwiQmVhdCBTYWJlclwiIC8+XG5cdCAgPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPkJlYXQgU2FiZXIgaXMgYSBWUiByaHl0aG0gZ2FtZSBcbiAgICAgIHdpdGggYSBsaXR0bGUgU3RhciBXYXJzIHRocm93biBpbi4gVGhlIHBsYXllciB1c2VzIGxpZ2h0c2FiZXJzIHRvIGtlZXAgdGhlIGJlYXQuIFxuICAgIDwvZGl2PiBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAvLyB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8VGl0bGUgbXNnPVwiV2Fsa2luZyBEZWFkOiBPdXIgV29ybGRcIiAvPlxuXHQgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5JbiB0aGlzIEFSIHZlcnNpb24gb2YgdGhlIHRyYW5zbWVkaWEgZnJhbmNoaXNlXG4gICAgICBHUFMgaXMgdXNlZCB0byBkZXRlcm1pbmUgeW91ciBsb2NhdGlvbiBpbiB0aGUgd29ybGQuIFlvdXIgbG9jYXRpb24gXG4gICAgICBhbmQgdGhlIHpvbWJpZXMgYXBwZWFyIGluIGFuIGVuaGFuY2VkIEdvb2dsZSBNYXBzIG1hcCBvbiB0aGUgcGhvbmUgc2NyZWVuLlxuICAgIDwvZGl2PiBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAvLyB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8VGl0bGUgbXNnPVwiTGEgQXBwYXJpemlvbmVcIiAvPlxuXHQgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5MaWtlIHZpZGVvIGdhbWVzIGFuZCAzNjAtZGVncmVlIHZpZGVvLCBcbiAgICAgIFZSIGFydCBlbXBoYXNpemVzIGltbWVyc2lvbiBhcyB0aGUgZmVhdHVyZSB0aGF0IG1ha2VzIHRoZSBleHBlcmllbmNlIFxuICAgICAgdW5pcXVlLCBhcyBpbiBhIFZSIHdvcmsgYnkgQ2hyaXN0aWFuIExlbW1lcnogZW50aXRsZWQgTGEgQXBwYXJpemlvbmUgKDIwMTcpLlxuICAgIDwvZGl2PiBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgLy90aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8VGl0bGUgbXNnPVwiTWluZWNyYWZ0IFZSXCIgLz5cblx0ICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+TWluZWNyYWZ0IFZSIGlzIGEgZnVsbHkgaW1tZXJzaXZlLCBcbiAgICAgIGhlYWRzZXQgdmVyc2lvbiBvZiB0aGUgc2FuZGJveCBnYW1lIHRoYXQgYWxyZWFkeSBydW5zIG9uIGNvbXB1dGVycywgZ2FtZSBjb25zb2xlcywgYW5kIG1vYmlsZSBkZXZpY2VzLiBcbiAgICAgIEl0IGlzIGNhbGxlZCBhIFwic2FuZGJveCBnYW1lXCIgYmVjYXVzZSBpdCBwcm92aWRlcyBhbiBpbmRlcGVuZGVudCBlbnZpcm9ubWVudCBpbiB3aGljaCBcbiAgICAgIHBsYXllcnMgY2FuIG1ha2UgdGhlaXIgb3duIHN0cnVjdHVyZXMgYW5kIG9iamVjdHMgb3V0IG9mIHZpcnR1YWwsIExFR08tbGlrZSBibG9ja3MuXG4gICAgPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyIGhlYWRsaW5lXCI+XG4gIDxUaXRsZSBtc2c9XCJBUiAmYW1wOyBWUiBHQU1FU1wiIC8+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXIgaGVhZGxpbmVcIj5cbiAgPFRpdGxlIG1zZz1cIkFSICZhbXA7IFZSIEFSVFwiIC8+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4vLyAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDxUaXRsZSBtc2c9XCJQcmVzZW5jZVwiIC8+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5QcmVzZW5jZSBpcyB0aGUgYWJzZW5jZSBvZiBtZWRpYXRpb24uIElmIHRoZSB1c2VycyBjYW4gZm9yZ2V0IHRoYXQgdGhlIG1lZGl1bSBpcyB0aGVyZSwgdGhlbiB0aGV5IGZlZWwgcHJlc2VuY2UuIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIC8vdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDwhLS0gPFRpdGxlIG1zZz1cIkF1cmFcIiAvPiAtLT5cbiAgPGRpdiBjbGFzcz1cImhlYWRsaW5lXCI+QXVyYTwvZGl2PlxuICA8YnI+XG4gIDxicj5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlxuICAgIDxwPkluIDE5MzBzLCBXYWx0ZXIgQmVuamFtaW4gaW50cm9kdWNlZCB0aGUgY29uY2VwdCBvZiA8ZW0+YXVyYTwvZW0+IGluIFRoZSBXb3JrIG9mIEFydCBpbiB0aGUgQWdlIG9mIE1lY2hhbmljYWwgUmVwcm9kdWN0aW9uLiBcbiAgQXVyYSBpcyB0aGUgPGVtPmhlcmUgYW5kIG5vdzwvZW0+IHRoYXQgd29yayBwb3NzZXNzZXMgYmVjYXVzZSBvZiBpdHMgdW5pcXVlIGhpc3Rvcnkgb2YgcHJvZHVjdGlvbiBhbmQgdHJhbnNtaXNzaW5vd29uLiA8L3A+XG4gIDxwPkFSIGFwcGxpY2F0aW9ucyBhcmUgbm90IHBlcmZlY3QgcmVwcm9kdWN0aXZlIHRlY2hub2xvZ2llcywgYXMgc29tZSBkcmF3IG9uIHRoZSBwaHlzaWNhbCBhbmQgY3VsdHVyYWwgdW5pcXVlc25lc3MsIDxlbT50aGUgaGVyZSBhbmQgbm93PC9lbT4gb2YgcGFydGljdWxhciBwbGFjZXMgPC9wPlxuICA8L2Rpdj4gXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgLy8gICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgPFRpdGxlIG1zZz1cIkN5YmVyc2lja25lc3MgYW5kIHRoZSBuZWdhdHRpb24gb2YgcHJlc2VuY2VcIiAvPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+XG4gICBUaGUgdGVybSBjeWJlcnNpY2tuZXNzLCBvciB2aXN1YWxseSBpbmR1Y2VkIG1vdGlvbiBzaWNrbmVzcywgaGFzIGJlZW4gY29pbmVkIHRvIGRlc2NyaWJlIHN5bXB0b21zIGluY2x1ZGluZyBoZWFkYWNoZSwgbmF1c2VhLCBleWUgc3RyYWluLCBkaXp6aW5lc3MsIGZhdGlndWUsIG9yIGV2ZW4gdm9taXRpbmcgdGhhdCBtYXkgb2NjdXIgZHVyaW5nIG9yIGFmdGVyIGV4cG9zdXJlIHRvIGEgdmlydHVhbCBlbnZpcm9ubWVudC4gQ3liZXJzaWNrbmVzcyBpcyB2aXNjZXJhbCBldmlkZW5jZSB0aGF0IFZSIGlzIG5vdCB0aGUgbWVkaXVtIHRvIGVuZCBhbGwgbWVkaWEuIEN5YmVyc2lja25lc3MgcmVtaW5kcyB0aGUgc3VzY2VwdGlibGUgdXNlciBvZiB0aGUgbWVkaXVtIGluIGEgcG93ZXJmdWwgd2F5LiBOYXVzZWEgcmVwbGFjZXMgYXN0b25pc2htZW50LiAgXG4gIDwvZGl2PiBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgIC8vICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8VGl0bGUgbXNnPVwiUHJlc2VuY2UgYW5kIEVtcGF0aHlcIiAvPlxuICA8YnIvPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+UmVzZWFyY2hlcnMgaGF2ZSBsb25nIHB1cnN1ZWQgdGhlIGlkZWEgb2YgZW1vdGlvbmFsIHJlYWN0aW9ucyBzdWNoIGFzIGVtcGF0aHkgYXMgYSB0ZXN0IG9mIHByZXNlbmNlLiBcbiBWUiBpcyAgdW5kZXJzdG9vZCBhcyBnZXR0aW5nIHVzIGNsb3NlciB0byB0aGUgYXV0aGVudGljIG9yIHRoZSByZWFsLiBCdXQgZm9yZ2V0dGluZyB0aGUgbWVkaXVtIGlzIG5vdCBuZWNlc3NhcnkgZm9yIGEgc2Vuc2Ugb2YgcHJlc2VuY2UuIFByZXNlbmNlIGNhbiBiZSB1bmRlcnN0b29kIGluIGEgbW9yZSBudWFuY2VkIHdheSBhcyBhIGxpbWluYWwgem9uZSBiZXR3ZWVuIGZvcmdldHRpbmcgYW5kIGFja25vd2xlZGdpbmcgVlIgYXMgYSBtZWRpdW0uXG48L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8IS0tIDxUaXRsZSBtc2c9XCJQcmVzZW5jZSBhbmQgRW1wYXRoeVwiIC8+IC0tPlxuICA8ZGl2IGNsYXNzPVwiaGVhZGxpbmVcIj5QcmVzZW5jZSBhbmQgRW1wYXRoeTwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgIC8vICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC80NmQ3NzkzZmE3YWIyNGFkLnBuZ1wiIiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0L2JlYjYxOGZmZTM3NjliYjYucG5nXCIiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvMWU0YmRlMzEyMzI1MTk1Zi5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDwhLS0gPFRpdGxlIG1zZz1cIlBpdCBFeHBlcmltZW50XCIgLz4gLS0+XG4gIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi9yaWdodGFycm93LnBuZ1wiIHdpZHRoPVwiOTBcIiBzdHlsZT1cImZsb2F0OiByaWdodFwiPlxuXHQ8ZGl2IGNsYXNzPVwicG9zdGVydGl0bGVcIj5QcmVzZW5jZSBhbmQgRW1wYXRoeTwvZGl2PlxuICA8YnIgLz5cbiAgICA8YnIgLz5cbiAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1Jvb202L3VwYXJyb3cucG5nXCIgd2lkdGg9XCI5MFwiIHN0eWxlPVwiZmxvYXQ6IHJpZ2h0XCI+XG5cdDxkaXYgY2xhc3M9XCJwb3N0ZXJ0aXRsZVwiPk1lYXN1cmluZyBQcmVzZW5jZTwvZGl2PlxuICAgIDxiciAvPlxuICAgICAgPGJyIC8+XG4gICAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1Jvb202L3VyYXJyb3cucG5nXCIgd2lkdGg9XCIxMjBcIiAgc3R5bGU9XCJmbG9hdDogcmlnaHRcIj5cblx0PGRpdiBjbGFzcz1cInBvc3RlcnRpdGxlXCI+QXVyYTwvZGl2PlxuICAgXG5cblxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAvLyAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC80OTA1NzU3Mzc0OTIzMjU5LnBuZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1Jvb202L2xmYXJyb3cucG5nXCIgd2lkdGg9XCIyMFwiIHN0eWxlPVwiZmxvYXQ6IGxlZnQ7IG1hcmdpbjogMTBweFwiPlxuICA8VGl0bGUgbXNnPVwiVWx0aW1hdGUgRW1wYXRoeSBNYWNoaW5lXCIgLz5cbiAgPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPjM2MDxzcGFuPiYjMTc2Ozwvc3Bhbj4gZmlsbSBDbG91ZHMgT3ZlciBTaWRyYSBjcmVhdGVkIGJ5IENocmlzIE1pbGsgYW5kIEdhYm8gQXJvcmEgc2hvd3MgdGhlIGxpZmUgb2YgU3lyaWFuIHJlZnVnZWVzIGluIFphJ2F0YXJpIGNhbXAgaW4gSm9yZGFuLiBUaGUgY2FtZXJhIGZvbGxvd3MgMTIteWVhciBvbGQgU2lkcmEgaW4gaGVyIGV2ZXJ5ZGF5IGxpZmUsIGFsbG93aW5nIHRoZSB1c2VycyB0byBiZSBwcmVzZW50IHdpdGggU2lkcmEuIDwvZGl2PlxuICA8YnIgLz5cbiAgPGJsb2NrcXVvdGUgY2xhc3M9XCJzcXVhcmVvZmZcIj5cIldoZW4geW914oCZcmUgaW5zaWRlIG9mIHRoZSBoZWFkc2V0IC4gLiAuIHlvdSBzZWUgZnVsbCAzNjAgZGVncmVlcywgaW4gYWxsIGRpcmVjdGlvbnMuIEFuZCB3aGVuIHlvdeKAmXJlIHNpdHRpbmcgdGhlcmUgaW4gaGVyIHJvb20sIHdhdGNoaW5nIGhlciwgeW91J3JlIG5vdCB3YXRjaGluZyBpdCB0aHJvdWdoIGEgdGVsZXZpc2lvbiBzY3JlZW4sIHlvdeKAmXJlIG5vdCB3YXRjaGluZyBpdCB0aHJvdWdoIGEgd2luZG93LCB5b3XigJlyZSBzaXR0aW5nIHRoZXJlIHdpdGggaGVyLiBXaGVuIHlvdSBsb29rIGRvd24sIHlvdSdyZSBzaXR0aW5nIG9uIHRoZSBzYW1lIGdyb3VuZCB0aGF0IHNoZeKAmXMgc2l0dGluZyBvbi4gQW5kIGJlY2F1c2Ugb2YgdGhhdCwgeW91IGZlZWwgaGVyIGh1bWFuaXR5IGluIGEgZGVlcGVyIHdheS4gWW91IGVtcGF0aGl6ZSB3aXRoIGhlciBpbiBhIGRlZXBlciB3YXkuIChNaWxrIDIwMTUpXCI8L2Jsb2NrcXVvdGU+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAvLyAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0L2I0NjRkYmU5MGQ2MTMzYWIuanBnXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICAgIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi9jbG91ZG92ZXJzaWRyYS5qcGdcIiB3aWR0aD1cIjcwMFwiID5cbiAgPCEtLSA8VGl0bGUgbXNnPVwiVWx0aW1hdGUgRW1wYXRoeSBNYWNoaW5lXCIgLz4gLS0+XG5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAvLyAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICAgIDwhLS0gPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1Jvb202L3J0YXJyb3cucG5nXCIgd2lkdGg9XCI0MDBcIiA+IC0tPlxuICA8VGl0bGUgbXNnPVwiVGhlIGZ1dHVyZSBvZiBuZXdzP1wiIC8+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5Ob25uaWUgZGUgbGEgUGXDsWEncyA8YSBocmVmPVwiaHR0cHM6Ly9lbWJlZC50ZWQuY29tL3RhbGtzL25vbm55X2RlX2xhX3BlbmFfdGhlX2Z1dHVyZV9vZl9uZXdzX3ZpcnR1YWxfcmVhbGl0eVwiIHRhcmdldD1cIl9ibGFua1wiPlRlZCBUYWxrPC9hPiBjYWxsZWQgJ1RoZSBmdXR1cmUgb2YgbmV3cz8nJyAgaW50cm9kdWNlcyBhIG5ldyBmb3JtIG9mIGpvdXJuYWxpc20gd2hlcmUgVmlydHVhbCBSZWFsaXR5IHRlY2hub2xvZ3kgaXMgdXNlZCB0byBwdXQgYXVkaWVuY2UgaW5zaWRlIHRoZSBzdG9yaWVzLiBJbiBoZXIgd29yaywgc2hlIGNyZWF0ZWQgVlIgc3RvcmllcyBhYm91dCBpbXByaXNvbm1lbnQgaW4gR3VhbnRhbmFtbyBhbmQgaHVuZ2VyIGluIExvcyBBbmdlbGVzIHRvIGluZHVjZSBlbXBhdGh5IGluIHRoZSBhdWRpZW5jZS48L2Rpdj4gXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC9iMzkzM2ZmMzU5Zjk0OWJhLnBuZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTYvbm9ubmllLnBuZ1wiIHdpZHRoPVwiNzAwXCIgPlxuXG4gIDwhLS0gPFRpdGxlIG1zZz1cIlRoZSBmdXR1cmUgb2YgbmV3cz9cIiAvPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+Tm9ubmllIGRlIGxhIFBlw7FhJ3MgPGEgaHJlZj1cImh0dHBzOi8vZW1iZWQudGVkLmNvbS90YWxrcy9ub25ueV9kZV9sYV9wZW5hX3RoZV9mdXR1cmVfb2ZfbmV3c192aXJ0dWFsX3JlYWxpdHlcIiB0YXJnZXQ9XCJfYmxhbmtcIj5UZWQgVGFsazwvYT4gY2FsbGVkICdUaGUgZnV0dXJlIG9mIG5ld3M/JycgIGludHJvZHVjZXMgYSBuZXcgZm9ybSBvZiBqb3VybmFsaXNtIHdoZXJlIFZpcnR1YWwgUmVhbGl0eSB0ZWNobm9sb2d5IGlzIHVzZWQgdG8gcHV0IGF1ZGllbmNlIGluc2lkZSB0aGUgc3Rvcmllcy4gSW4gaGVyIHdvcmssIHNoZSBjcmVhdGVkIFZSIHN0b3JpZXMgYWJvdXQgaW1wcmlzb25tZW50IGluIEd1YW50YW5hbW8gYW5kIGh1bmdlciBpbiBMb3MgQW5nZWxlcyB0byBpbmR1Y2UgZW1wYXRoeSBpbiB0aGUgYXVkaWVuY2UuPC9kaXY+ICAtLT5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAvLyAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICAgIDxUaXRsZSBtc2c9XCJQaXQgRXhwZXJpbWVudFwiIC8+XG4gIFx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlRoZSBwaXQgZXhwZXJpbWVudCBpcyBhIHZpcnR1YWwgZXhwZXJpZW1lbnQgb2Z0ZW4gdXNlZCB0byBldmFsdWF0ZSB0aGUgc2VuY2Ugb2YgcHJlc2VuY2UuIFRoZSB1c2VyIGlzIGdpdmVuIGEgdGFzayB0byBncmFiIGFuIG9iamVjdCBvbiBwbGFuayBhbmQgdGFrZSBpdCB0byB0aGUgb3RoZXIgc2lkZSwgY3Jvc3NpbmcgdGhlIHBpdC4gPC9kaXY+XG5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvMjE3NmRjNjZmNWEwMjU0Ni5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi9waXRWUi5wbmdcIiB3aWR0aD1cIjQzNlwiID5cbiAgPCEtLSA8VGl0bGUgbXNnPVwiUGl0IEV4cGVyaW1lbnRcIiAvPiAtLT5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8IS0tIDxUaXRsZSBtc2c9XCJQcmVzZW5jZVwiIC8+IC0tPlxuICA8ZGl2IGNsYXNzPVwicG9zdGVydGl0bGVcIj5QcmVzZW5jZTwvZGl2PlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+UHJlc2VuY2UgaXMgYSBraW5kIG9mIGFic2VuY2UsIHRoZSBhYnNlbmNlIG9mIG1lZGlhdGlvbi4gSWYgdGhlIHVzZXJzIGNhbiBmb3JnZXQgdGhhdCB0aGUgbWVkaXVtIGlzIHRoZXJlLCB0aGVuIHRoZXkgZmVlbCBwcmVzZW5jZS4gPC9kaXY+XG4gIFx0PCEtLSA8ZGl2IGNsYXNzPVwicG9zdGVydGl0bGVcIj5QcmVzZW5jZSBpcyBhIGtpbmQgb2YgYWJzZW5jZSwgdGhlIGFic2VuY2Ugb2YgbWVkaWF0aW9uLiBJZiB0aGUgdXNlcnMgY2FuIGZvcmdldCB0aGF0IHRoZSBtZWRpdW0gaXMgdGhlcmUsIHRoZW4gdGhleSBmZWVsIHByZXNlbmNlLiA8L2Rpdj4gLS0+XG4gICAgXHQ8IS0tIDxkaXYgY2xhc3M9XCJoZWFkbGluZVwiPlByZXNlbmNlIGlzIHRoZSBhYnNlbmNlIG9mIG1lZGlhdGlvbi4gSWYgdGhlIHVzZXJzIGNhbiBmb3JnZXQgdGhhdCB0aGUgbWVkaXVtIGlzIHRoZXJlLCB0aGVuIHRoZXkgZmVlbCBwcmVzZW5jZS4gPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+UHJlc2VuY2UgaXMgYSBraW5kIG9mIGFic2VuY2UsIHRoZSBhYnNlbmNlIG9mIG1lZGlhdGlvbi4gSWYgdGhlIHVzZXJzIGNhbiBmb3JnZXQgdGhhdCB0aGUgbWVkaXVtIGlzIHRoZXJlLCB0aGVuIHRoZXkgZmVlbCBwcmVzZW5jZS4gPC9kaXY+IC0tPlxuICAgICAgPGJyIC8+XG4gICAgICA8YnIgLz5cbiAgICAgIFx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiIHN0eWxlPVwiZm9udC1zdHlsZTppdGFsaWNcIj5cIlZSIGFuZCBBUiBjYW5ub3QgZGVjZWl2ZSB0aGVpciB1c2VycyBpbnRvIGJlbGlldmluZyB0aGF0IHRoZXkgYXJlIGhhdmluZyBhIG5vbi1tZWRpYXRlZCBleHBlcmllbmNlLiBCdXQgdGhhdCBpcyBub3QgbmVjZXNzYXJ5IGZvciBhIHNlbnNlIG9mIHByZXNlbmNlLlwiPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuICBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDxUaXRsZSBtc2c9XCJUcmVlaHVnZ2VyOiBXYXdvbmFcIiAvPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+VHJlZWh1Z2dlcjogV2F3b25hIFZSIGV4cGVyaWVuY2UgdHJhbnNwb3J0cyB0aGUgdXNlcnMgdG8gdGhlIHJlZCBnaWFudCBTZXF1b2lhIHRyZWVzIGZyb20gdGhlIFNlcXVvaWEgTmF0aW9uYWwgUGFyay4gSXQgcHJvdmlkZXMgYSBzZW5zZSBvZiBpbnRpbWFjeSB3aXRoIHRoZSB0cmVlIC0gd2l0aCBpdHMgYmFyaywgd2l0aCB0aGUgY2VsbHMgdGhhdCBtYWtlIHVwIGl0cyBiZWluZy4gVGhlIHZpdmlkbmVzcyBvZiB0aGUgd29yayBpbGx1c3RyYXRlcyA8ZW0+cHJlc2VuY2U8L2VtPi4gPC9kaXY+XG4gIDwhLS0gSW4gdGhpcyBleHBlcmllbmNlLCB1c2VycyBmaW5kIHRoZW1zZWx2ZXMgb24gdGhlIHRocmVzaG9sZCBvZiBmb3JnZXR0aW5nIHRoYXQgd2UgYXJlIGhhdmluZyBhIFZSIGV4cGVyaWVuY2UuIEJlaW5nIG9uIHRoYXQgdGhyZXNob2xkIGlzIGEgc2VuY2Ugb2YgcHJlc2VuY2UgaW4gYSByZWFsaXR5IG1lZGl1bS4gLS0+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzI3M2RlYzQ3ZWM3NjIzMGQucG5nXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICAgIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi90cmVlaHVnZ2VyLnBuZ1wiIHdpZHRoPVwiODAwXCIgPlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgLy8gdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDxUaXRsZSBtc2c9XCJCYWNrIHRvIHRoZSBtYWluIGV4aGliaXRpb25cIiAvPlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgLy8gdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDwhLS0gPFRpdGxlIG1zZz1cIlRoZSBmdXR1cmUgb2YgbmV3cz9cIiAvPiAtLT5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlBhcnRoZW5vbiBtb2RlbCBleHBsYW5hdGlvbjwvZGl2PiBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvYTdkMTI0NGM0YjIzYjdiMC5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gICAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1Jvb202L3RlcnJhY290dGEuanBnXCIgd2lkdGg9XCI4MDBcIiA+XG5cbiAgPCEtLSA8VGl0bGUgbXNnPVwiVGhlIGZ1dHVyZSBvZiBuZXdzP1wiIC8+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5Ob25uaWUgZGUgbGEgUGXDsWEncyA8YSBocmVmPVwiaHR0cHM6Ly9lbWJlZC50ZWQuY29tL3RhbGtzL25vbm55X2RlX2xhX3BlbmFfdGhlX2Z1dHVyZV9vZl9uZXdzX3ZpcnR1YWxfcmVhbGl0eVwiIHRhcmdldD1cIl9ibGFua1wiPlRlZCBUYWxrPC9hPiBjYWxsZWQgJ1RoZSBmdXR1cmUgb2YgbmV3cz8nJyAgaW50cm9kdWNlcyBhIG5ldyBmb3JtIG9mIGpvdXJuYWxpc20gd2hlcmUgVmlydHVhbCBSZWFsaXR5IHRlY2hub2xvZ3kgaXMgdXNlZCB0byBwdXQgYXVkaWVuY2UgaW5zaWRlIHRoZSBzdG9yaWVzLiBJbiBoZXIgd29yaywgc2hlIGNyZWF0ZWQgVlIgc3RvcmllcyBhYm91dCBpbXByaXNvbm1lbnQgaW4gR3VhbnRhbmFtbyBhbmQgaHVuZ2VyIGluIExvcyBBbmdlbGVzIHRvIGluZHVjZSBlbXBhdGh5IGluIHRoZSBhdWRpZW5jZS48L2Rpdj4gIC0tPlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgIC8vICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxUaXRsZSBtc2c9XCJUZXJyYWNvdHRhIFdhcnJpb3JzIEFSXCIgLz5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlwiVGhlIEZyYW5rbGluIEluc3RpdHV0ZSBpcyB1c2luZyBBUiB0byBlbmhhbmNlIHRoZWlyIFRlcnJhY290dGEgV2FycmlvciBleGhpYml0aW9uIHdoaWNoIHdlcmUgZGlzcGxheWVkIGluIFBoaWxhZGVscGhpYSB1bnRpbCBNYXJjaCAyMDE4LiBUaGUgbXVzZXVt4oCZcyBhcHAsIHBvd2VyZWQgYnkgV2lraXR1ZGUgdGVjaG5vbG9neSwgYWxsb3dzIHZpc2l0b3JzIHRvIHVzZSB0aGVpciBzbWFydHBob25lIHRvIHNjYW4gaXRlbXMgYW5kIHZpc3VhbGl6ZSByaWNoIEFSIGNvbnRlbnQgdG8gbGVhcm4gZXZlbiBtb3JlIGFib3V0IHRoZSBpbnRyaWd1aW5nIGhpc3RvcnkgYmVoaW5kIHRoZSBtYWduaWZpY2VudCBjbGF5IHNvbGRpZXJzLlwiPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0L2IyYzc3MDA5NjQ0YTdkNDUuanBnXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICAgIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi90cmVlaHVnZ2VyMi5qcGdcIiB3aWR0aD1cIjYwMFwiID5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAvLyAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8VGl0bGUgbXNnPVwiUGl0IEV4cGVyaW1lbnRcIiAvPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+VGhyb3VnaCB0aGUgdmlydHVhbCBwaXQgZXhwZXJpbWVudCwgc3ViamVjdHMgZXhwZXJpZW5jZSBhIGhpZ2hlciBzZW5zZSBvZiBwcmVzZW5jZS4gPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8VGl0bGUgbXNnPVwiUGl0IEV4cGVyaW1lbnQgSW5zdHJ1Y3Rpb25cIiAvPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+VHJ5IHdhbGtpbmcgYWNyb3NzIHRoZSBwaXQgd2l0aG91dCBsb3NpbmcgYmFsYW5jZSBvciBmYWxsaW5nLjwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8VGl0bGUgbXNnPVwiVmVyeSBjYXJlZnVsbHkgc3RyZXRjaCB5b3VyIGFybXMgb3V0IGZvciBiYWxhbmNlLlwiIC8+XG5cdDwhLS0gPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPiBGaXJzdCBwZXJzb24gc2hvb3RlciBnYW1lcyBzdWNoIGFzICA8YSBocmVmPVwiaHR0cHM6Ly93d3cuaGFsZi1saWZlLmNvbS9lbi9hbHl4L1wiIHRhcmdldD1cIl9ibGFua1wiPkhhbGZMaWZlOiBBbHl4IDwvYT4gaGF2ZSBsb25nIHVzZWQgMy1EIGdyYXBoaWNzIHRvIGNyZWF0ZSBhbiBpbW1lcnNpdmUgZXhwZXJpZW5jZSBmb3IgbWlsbGlvbnMgb2YgcGxheWVycy4gQW5kIGZvciBkZWNhZGVzLCBcbiAgICBwbGF5ZXJzIG9uIGNvbXB1dGVycyBhbmQgZ2FtZSBjb25zb2xlcyBoYXZlIHllYXJuZWQgZm9yIHRydWUgVlIgc28gdGhhdCB0aGV5IGNvdWxkIGZhbGwgdGhyb3VnaCB0aGUgc2NyZWVuIGludG8gdGhlIHdvcmxkcyBvbiB0aGUgb3RoZXIgc2lkZS48L2Rpdj4gIC0tPlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8VGl0bGUgbXNnPVwiV2hhdCBkbyB5b3Ugc2VlIG9uIHRoZSBmbG9vciByaWdodCBub3c/XCIgLz5cblx0PCEtLSA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+IEZpcnN0IHBlcnNvbiBzaG9vdGVyIGdhbWVzIHN1Y2ggYXMgIDxhIGhyZWY9XCJodHRwczovL3d3dy5oYWxmLWxpZmUuY29tL2VuL2FseXgvXCIgdGFyZ2V0PVwiX2JsYW5rXCI+SGFsZkxpZmU6IEFseXggPC9hPiBoYXZlIGxvbmcgdXNlZCAzLUQgZ3JhcGhpY3MgdG8gY3JlYXRlIGFuIGltbWVyc2l2ZSBleHBlcmllbmNlIGZvciBtaWxsaW9ucyBvZiBwbGF5ZXJzLiBBbmQgZm9yIGRlY2FkZXMsIFxuICAgIHBsYXllcnMgb24gY29tcHV0ZXJzIGFuZCBnYW1lIGNvbnNvbGVzIGhhdmUgeWVhcm5lZCBmb3IgdHJ1ZSBWUiBzbyB0aGF0IHRoZXkgY291bGQgZmFsbCB0aHJvdWdoIHRoZSBzY3JlZW4gaW50byB0aGUgd29ybGRzIG9uIHRoZSBvdGhlciBzaWRlLjwvZGl2PiAgLS0+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDwhLS0gPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1Jvb201L0FseXgtc3BsYXNoLnBuZ1wiIHdpZHRoPVwiNDAwXCIgPiAtLT5cbjxUaXRsZSBtc2c9XCJXZWxjb21lIHRvIFJlYWxpdHkgTWVkaWEhXCIgLz5cbjxicj48YnI+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj4gPGk+UmVhbGl0eSBNZWRpYTwvaT4gaXMgYSBwcm9qZWN0IGVuY29tcGFzc2luZyB0aHJlZSB3cml0aW5nIHNwYWNlcywgdGhyZWUgdGVjaG5vbG9naWVzIGZvciByZXByZXNlbnRpbmcgaWRlYXM6IHByaW50LCB0aGUgd2ViLCBhbmQgaW1tZXJzaXZlIFZSLiBUaGUgcHJpbnRlZCBwYWdlIGlzIGEgd3JpdGluZyBzcGFjZSB3aXRoIGEgdHJhZGl0aW9uIGRhdGluZyBiYWNrIHRvIHRoZSBmaWZ0ZWVudGggY2VudHVyeSAoaW4gRXVyb3BlLCBtdWNoIGVhcmxpZXIgaW4gQ2hpbmEpLiBPYnZpb3VzbHkgdGhlIHdlYiBoYXMgYSBmYXIgc2hvcnRlciB0cmFkaXRpb24sIGJlZ2lubmluZyBhcm91bmQgMTk5MC4gQnV0IGluIHRoZSB0aGlydHkgeWVhciBzaW5jZSBUaW0gQmVybmVycy1MZWUgbGF1bmNoZWQgdGhlIGZpcnN0IHdlYiBzZXJ2ZXIsIHRoZSB3ZWIgaGFzIGdyb3duIHRvIHJpdmFsIHByaW50IGZvciBtYW55IGtpbmRzIG9mIGNvbW11bmljYXRpb24uIFRoZSB0ZWNobm9sb2dpZXMgZm9yIGNyZWF0aW5nIDNEIGdyYXBoaWMgc3BhY2VzIGluIFZSIChhbmQgQVIpIGFjdHVhbGx5IHByZWRhdGUgdGhlIHdlYi4gQnV0IG9ubHkgaW4gdGhlIHBhc3QgMTAgeWVhcnMgaGF2ZSBBUiBhbmQgVlIgYmVjb21lIHdpZGVseSBhdmFpbGFibGUgbWVkaWEuIFRoZSBnb2FsIG9mIFJlYWxpdHlNZWRpYSBpcyB0byBkZW1vbnN0cmF0ZSB0aGUgcG90ZW50aWFsIHJhbmdlIG9mIEFSIGFuZCBWUiBhcyBjb21tdW5pY2F0aXZlIGZvcm1zLlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCw0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC83YTI0YTZkMzA5ZDQ1M2YyLmpwZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPFRpdGxlIG1zZz1cIlJlYWxpdHkgTWVkaWFcIiAvPlxuICA8IS0tIDxkaXYgc3R5bGU9XCJ3aWR0aDphdXRvXCI+PC9kaXY+IC0tPlxuICA8YnIgLz5cbiAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL09uYm9hcmRpbmcvcmVhbGl0eU1lZGlhQm9vay5qcGdcIiB3aWR0aD1cIjMwMFwiIHN0eWxlPVwiZmxvYXQ6bGVmdDsgbWFyZ2luLXJpZ2h0OjIwcHhcIj5cblxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+PGRpdiBzdHlsZT1cIm1hcmdpbi1sZWZ0OjMwcHhcIj5QdWJsaXNoZWQgYnkgPGEgaHJlZj1cImh0dHBzOi8vbWl0cHJlc3MubWl0LmVkdS9ib29rcy9yZWFsaXR5LW1lZGlhXCI+TUlUIFByZXNzPC9hPjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwib2JsaXF1ZVwiPkJ5IEpheSBEYXZpZCBCb2x0ZXIsIE1hcmlhIEVuZ2JlcmcgYW5kIEJsYWlyIE1hY0ludHlyZTwvZGl2PiBcbiAgPGJyPlxuICA8ZGl2IGNsYXNzPVwicXVvdGVcIj5Ib3cgYXVnbWVudGVkIHJlYWxpdHkgYW5kIHZpcnR1YWwgcmVhbGl0eSBhcmUgdGFraW5nIHRoZWlyIHBsYWNlcyBpbiBjb250ZW1wb3JhcnkgbWVkaWEgY3VsdHVyZSBhbG9uZ3NpZGUgZmlsbSBhbmQgdGVsZXZpc2lvbi48L2Rpdj48L2Rpdj5cblxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCw0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxUaXRsZSBtc2c9XCJCb29rOiBSZWFsaXR5IE1lZGlhXCIgLz5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiIHN0eWxlPVwid2lkdGg6MzgwcHhcIj5QdWJsaXNoZWQgYnkgPGEgaHJlZj1cImh0dHBzOi8vbWl0cHJlc3MubWl0LmVkdS9ib29rcy9yZWFsaXR5LW1lZGlhXCI+TUlUIFByZXNzPC9hPjwvZGl2PlxuICA8YnI+XG4gIDxkaXYgY2xhc3M9XCJvYmxpcXVlIHNxdWFyZW9mZlwiPkJ5IEpheSBEYXZpZCBCb2x0ZXIsIE1hcmlhIEVuZ2JlcmcgYW5kIEJsYWlyIE1hY0ludHlyZTwvZGl2PiBcbiAgPGJyPlxuICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmIHF1b3RlXCI+XCJIb3cgYXVnbWVudGVkIHJlYWxpdHkgYW5kIHZpcnR1YWwgcmVhbGl0eSBhcmUgdGFraW5nIHRoZWlyIHBsYWNlcyBpbiBjb250ZW1wb3JhcnkgbWVkaWEgY3VsdHVyZSBhbG9uZ3NpZGUgZmlsbSBhbmQgdGVsZXZpc2lvbi5cIiA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvNWIxNGRhOTZlMjg4OWZmMi5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9PbmJvYXJkaW5nL01vemlsbGFIdWJzLmpwZ1wiIHdpZHRoPVwiNDAwXCIgPlxuICA8YnI+PGJyPlxuICA8VGl0bGUgbXNnPVwiVGhlIEh1YnMgUGxhdGZvcm1cIiAvPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+KlJlYWxpdHltZWRpYSogaXMgYnVpbHQgb24gdG9wIG9mIE1vemlsbGEncyBvcGVuLXNvdXJjZSBwbGF0Zm9ybS4gQW4gZXh0ZW5zaXZlIGd1aWRlIHRvIHVzaW5nIE1vemlsbGEgSHVicyBpcyBhdmFpbGFibGUgYXQgPGEgaHJlZj1cImh0dHBzOi8vaHVicy5tb3ppbGxhLmNvbS9kb2NzL2ludHJvLWh1YnMuaHRtbFwiIHRhcmdldD1cImJsYW5rXCI+aW4gdGhlIEh1YnMgdXNlciBkb2N1bWVudGF0aW9uPC9hPi4gSGVyZSBhcmUgdGhlIGhpZ2hsaWdodHM6XG4gIDxicj48YnI+XG5CZWZvcmUgZW50ZXJpbmcsIHlvdSBhcmUgaW4gdGhlIHJvb20ncyBsb2JieS4gRnJvbSBoZXJlLCB5b3UgY2FuIHNlZSBhbmQgaGVhciB3aGF0J3MgZ29pbmcgb24gaW5zaWRlIHRoZSByb29tLCBidXQgeW91IGNhbiBvbmx5IGludGVyYWN0IHdpdGggb3RoZXJzIHVzaW5nIHRleHQgY2hhdC4gXG48YnI+PGJyPlxuPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5cbiAgICAgIDxicj5cbiAgICAgIDxicj5cbiAgICAgIDxicj5cbjxkaXYgY2xhc3M9XCJrZXlQb2ludFwiPlRvIGVudGVyIHRoZSByb29tOjwvZGl2PlxuPGJyPlxuLSBPbiBhIGRlc2t0b3Agb3IgbW9iaWxlIGRldmljZSwgZm9sbG93IHRoZSBwcm9tcHRzIHRvIHNlbGVjdCBhIG5hbWUvYXZhdGFyIGFuZCBlbmFibGUgdGhlIG1pYy5cbjxicj5cbi0gT24gYSBWUiBoZWFkc2V0LCBpZiB5b3Ugb3BlbmVkIHRoZSBVUkwgb24geW91ciBkZXNrdG9wIG9yIHNtYXJ0cGhvbmUsIGNob29zZSBcIkVudGVyIG9uIFN0YW5kYWxvbmUgVlJcIiB0byBjcmVhdGUgYSBjb2RlIHRoYXQgbWFrZXMgaXQgZWFzeSB0byBvcGVuIG9uIHlvdXIgc3RhbmRhbG9uZSBoZWFkc2V0LiBPcGVuIHRoZSBicm93c2VyIGluIHlvdXIgVlIgaGVhZHNldCwgbmF2aWdhdGUgdG8gaHVicy5saW5rIGFuZCBlbnRlciB0aGUgY29kZS5cbjxicj48YnI+XG48ZGl2IGNsYXNzPVwia2V5UG9pbnRcIj5UbyBuYXZpZ2F0ZSBpbiBIdWJzOjwvZGl2PiAgXG48YnI+XG4tIE9uIGRlc2t0b3AgdXNlIHlvdXIgV0FTRCBvciBhcnJvdyBrZXlzIHRvIG1vdmUgYXJvdW5kLiBZb3UgY2FuIGFsc28gcHJlc3MgeW91ciByaWdodCBtb3VzZSBidXR0b24gdG8gdGVsZXBvcnQgdG8gYSBkaWZmZXJlbnQgbG9jYXRpb24uIFJvdGF0ZSB5b3VyIHZpZXcgdXNpbmcgdGhlIFEgYW5kIEUga2V5cywgb3IgaG9sZCBkb3duIHlvdXIgbGVmdCBtb3VzZSBidXR0b24gYW5kIGRyYWcuXG48YnI+XG4tIEZvciBWUiBhbmQgbW9iaWxlIGNvbnRyb2xzLCBzZWUgdGhlIGxpc3Qgb2YgPGEgaHJlZj1cImh0dHBzOi8vaHVicy5tb3ppbGxhLmNvbS9kb2NzL2h1YnMtY29udHJvbHMuaHRtbFwiIHRhcmdldD1cImJsYW5rXCI+SHVicyBjb250cm9scy48L2E+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvNWQ0MmJjNmIyYTA3NGNjZC5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG5cbjxUaXRsZSBtc2c9XCJGZWF0dXJlcyBpbiBIdWJzXCIgLz5cbjxicj5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPiBUaGUgZmlndXJlIGJlbG93IGluZGljYXRlcyBob3cgdG8gbXV0ZSB5b3VyIG1pY3JvcGhvbmUsIHRha2UgcGhvdG9zLCBzaGFyZSB5b3VyIHNjcmVlbiwgY3JlYXRlIG1lZGlhIG9iamVjdHMsIGFuZCBzbyBvbjogPC9kaXY+IFxuICAgIDxicj48YnI+XG4gICAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL09uYm9hcmRpbmcvaHVicy11c2VyLWludGVyZmFjZS5wbmdcIiB3aWR0aD1cIjQwMFwiID5cblxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cblxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuPCEtLSA8VGl0bGUgbXNnPVwiSG93IHRvIFVzZSB0aGUgQXVkaW8gUGFkc1wiIC8+IC0tPlxuPFRpdGxlIG1zZz1cIlN0YW5kaW5nIG9uIHRoZSBBdWRpbyBQYWRzIHdpbGwgc3RhcnQgdGhlIG5hcnJhdGlvbiBhYm91dCB0aGUgcm9vbSBvciB0aGUgc291bmQgb2YgdGhlIHZpZGVvIGNsaXAuXCIgLz5cblxuPGJyPjxicj5cblx0PCEtLSA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+U3RhbmRpbmcgb24gdGhlIEF1ZGlvIFBhZHMgd2lsbCBzdGFydCB0aGUgbmFycmF0aW9uIGFib3V0IHRoZSByb29tIG9yIHRoZSBzb3VuZCBvZiB0aGUgdmlkZW8gY2xpcC48L2Rpdj4gIC0tPlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC84MmE5MTFkMjg5Y2QyODM2LnBuZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbjxUaXRsZSBtc2c9XCJPdGhlciB3YXlzIHRvIHVzZSB0aGUgcm9vbVwiIC8+XG48YnI+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5cbiAgICA8ZGl2IGNsYXNzPVwia2V5UG9pbnRcIj5WaXNpdCB0aGUgZXhoaWJpdCB3aXRoIGZyaWVuZHM8L2Rpdj5cbiAgICBTaGFyaW5nIHRoZSBVUkwgb2YgdGhlIHJvb20geW91IGFyZSBjdXJyZW50bHkgaW4gd2lsbCBhbGxvdyBvdGhlcnMgdG8gam9pbiB5b3VyIGV4cGVyaWVuY2UuXG4gICAgPGJyIC8+XG4gICAgPGJyIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwia2V5UG9pbnRcIj5GYXZvcml0ZSB5b3VyIHJvb208L2Rpdj5cbiAgICAgIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9PbmJvYXJkaW5nL2Zhdm9yaXRlLnBuZ1wiIHdpZHRoPVwiNDAwXCIgPlxuICAgICAgPGJyIC8+XG4gICBTZXQgeW91ciByb29tIGFzIGEgZmF2b3JpdGUgdW5kZXIgdGhlICdtb3JlJyBtZW51LiBUaGVuLCB5b3UgY2FuIGVhc2lseSByZXZpc2l0IHRoZSByb29tIGZyb20gdGhlIGxpc3QgaW4gdGhlICdmYXZvcml0ZSByb29tcycuXG4gIDwvZGl2PiBcbiAgXG4gICAgXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgLy90aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvMDEzYjc1NGFmOWViY2QzMi5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG48IS0tIDxUaXRsZSBtc2c9XCJIZXJlIGlzIGEgbWFwLCB3aGljaCB5b3Ugd2lsbCBhbHNvIGZpbmQgcG9zdGVkIHRocm91Z2ggdGhlIGdhbGxlcmllc1wiIC8+ICAgLS0+XG48YnI+XG48ZGl2IGNsYXNzPVwia2V5UG9pbnRcIj5IZXJlIGlzIGEgbWFwLCB3aGljaCB5b3Ugd2lsbCBhbHNvIGZpbmQgcG9zdGVkIHRocm91Z2ggdGhlIGdhbGxlcmllczwvZGl2PlxuPGJyIC8+XG4gIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9PbmJvYXJkaW5nL01hcF90cmFuc3BhcmVudC5wbmdcIiB3aWR0aD1cIjQwMFwiPlxuXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgLy90aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+XG48YnI+PGJyPjxicj48YnI+PGJyPlxuRWFjaCBnYWxsZXJ5IGluIHRoaXMg4oCcaW1tZXJzaXZlIGJvb2vigJ0gY29ycmVzcG9uZHMgdG8gb25lIG9yIG1vcmUgY2hhcHRlcnMgaW4gdGhlIHByaW50ZWQgYm9vayBhbmQgaWxsdXN0cmF0ZXMgdGhlIHRoZW1lcyBvZiB0aGUgcHJpbnRlZCBjaGFwdGVyKHMpLiAoU2VlIHRoZSBtYXAgb24gdGhlIGZhciB3YWxsIGZvciB0aGUgbmFtZXMvdGhlbWVzIG9mIHRoZSBnYWxsZXJpZXMuKSBGb3IgZXhhbXBsZSwgdGhlIGdhbGxlcnkgZW50aXRsZWQg4oCcUHJlc2VuY2XigJ0gaWxsdXN0cmF0ZXMgYm90aCBwcmVzZW5jZSBhbmQgdGhlIHJlbGF0ZWQgY29uY2VwdCBvZiBhdXJhIGFuZCBob3cgY29tcHV0ZXIgc2NpZW50aXN0cyBhcyB3ZWxsIGFzIGZpbG1tYWtlcnMgYW5kIGRlc2lnbmVycyBoYXZlIHRyaWVkIHRvIGV2b2tlIHRoZXNlIHJlYWN0aW9ucyBpbiB2aXNpdG9ycyB0byB0aGVpciBpbW1lcnNpdmUgYXBwbGljYXRpb25zLiBcbiA8L2Rpdj4gXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgLy90aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuPFRpdGxlIG1zZz1cIlJldHVybiBiYWNrIHRvIHRoZSB3ZWJzaXRlXCIgLz4gIFxuPCEtLSA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCIgc3R5bGU9XCJmb250LXNpemU6NDVweFwiPlJldHVybiBiYWNrIHRvIHRoZSB3ZWJzaXRlPC9kaXY+IC0tPlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIC8vdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCJdLCJuYW1lcyI6WyJIdWJzQXBwIiwiZXRoZXJlYWwuY3JlYXRlTGF5b3V0U3lzdGVtIiwiV2ViTGF5ZXIzRCIsIlN0b3JlIiwiSHVic0FwcFByb3RvIiwiQXBwIiwiaW5pdCJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQkFBZTs7Ozs7Ozs7O0FDV2Y7Ozs7Ozs7QUFGYztBQUtaO0FBQ0Y7QUFDQSxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0gvQjs7OztBQUxjO0FBTWQsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBQztBQUM3QixJQUFJLElBQUksR0FBRyxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxHQUFHLG1EQUFrRDs7Ozs7Ozs7Ozs7OztNQ2I5RSxNQUFNO0lBQ3ZCLGFBQWEsQ0FBZ0I7SUFDN0IsYUFBYSxDQUF5QjtJQUV0QyxLQUFLLENBQVE7SUFDYixNQUFNLENBQVE7SUFFZCxNQUFNLENBQUs7SUFDWCxPQUFPLENBQXFDO0lBRTVDLFlBQWEsR0FBYyxFQUFFLEtBQWEsRUFBRSxNQUFjLEVBQUUsZ0JBQW9CLEVBQUU7UUFDOUUsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3ZELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN2RCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtRQUVwQixJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUE7S0FDOUM7SUFFRCxLQUFLO0tBQ0o7OztJQUlELGtCQUFrQjtRQUNkLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFDRCxrQkFBa0IsQ0FBQyxNQUFVO1FBQ3pCLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7OztTQ3JCVyxrQkFBa0I7SUFDOUJBLFNBQU8sQ0FBQyxrQkFBa0IsRUFBRSxDQUFBO0FBQ2hDLENBQUM7QUFFRDtTQUVnQixVQUFVLENBQUMsSUFBWSxFQUFFLFNBQWlCO0lBQ3ZEQSxTQUFPLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQTtBQUN0QyxDQUFDO0FBRUQsU0FBUyxVQUFVLENBQUMsTUFBK0IsRUFBRSxNQUErQjtJQUNoRixNQUFNLENBQUMsaUJBQWlCLEVBQUUsQ0FBQTs7OztJQUsxQixNQUFNLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDeEIsTUFBTSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBRTFCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztJQUMxQixNQUFNLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFFeEIsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDOzs7Ozs7Ozs7SUFjOUIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTs7SUFFL0UsTUFBTSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBRSxNQUFNLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUUsQ0FBQztJQUN6RSxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUE7SUFDckIsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ2xDLENBQUM7TUFFb0JBLFNBQVEsU0FBUSxNQUFNO0lBQ3ZDLE9BQU8sTUFBTSxDQUF1QjtJQUNwQyxPQUFPLGNBQWMsR0FBRyxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFBO0lBQ3JELE9BQU8sWUFBWSxDQUEwQjtJQUU3QyxVQUFVLENBQVM7SUFDbkIsYUFBYSxDQUFTO0lBQ3RCLFdBQVcsQ0FBUztJQUNwQixRQUFRLENBQVM7SUFFVCxVQUFVLENBQVE7SUFDbEIsU0FBUyxDQUFpQjtJQUVsQyxJQUFJLENBR0g7Ozs7Ozs7SUFTRCxVQUFVLENBQXdCO0lBQ2xDLFdBQVcsR0FBWSxLQUFLLENBQUE7SUFFNUIsT0FBTyxDQUFTO0lBRWhCLE9BQU8sa0JBQWtCO1FBQ3JCLElBQUksS0FBSyxHQUFVLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBRXBDLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDOzs7UUFLNUMsSUFBSSxDQUFDLFlBQVksR0FBSSxRQUFRLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFZLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBNEIsQ0FBQzs7O1FBSTNILElBQUksQ0FBQyxNQUFNLEdBQUdDLEVBQTJCLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUMvRixNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7Ozs7OztLQU9qQztJQUVELE9BQU8sVUFBVSxDQUFDLElBQVksRUFBRSxTQUFpQjtRQUM3QyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUU3QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNwQixJQUFJLENBQUMsWUFBWSxHQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQVksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUE0QixDQUFDO1NBQzlIO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZO1lBQUUsT0FBTztRQUUvQixVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7UUFFbEQsSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUE7U0FDN0M7UUFFRCxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQ0QsU0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUNyRCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxrQ0FBa0MsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUE7O1FBR2hHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQTtLQUN0QztJQUVELFlBQWEsR0FBYyxFQUFFLEtBQWEsRUFBRSxNQUFjLEVBQUUsU0FBYyxFQUFFLEVBQUUsZ0JBQW9CLEVBQUU7UUFHaEcsSUFBSSxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7O1lBRXhFLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFBO1lBQ3BCLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFBO1NBQ3pCO2FBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLE1BQU0sTUFBTSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFOztZQUVuRixJQUFJLE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUU7Z0JBQ2xDLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxJQUFJLE1BQU0sQ0FBQTtnQkFDeEMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUE7YUFDdkI7WUFDRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3BDLEtBQUssR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxJQUFJLE1BQU0sQ0FBQTtnQkFDekMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUE7YUFDekI7U0FFSjtRQUNELEtBQUssQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQTtRQUN4QyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUV4QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFFckMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUE7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQTs7O1FBR3RDLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxHQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxHQUFDLElBQUksRUFBQyxDQUFBOzs7UUFJckQsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBOzs7S0FJL0M7SUFFRCxLQUFLLENBQUMsV0FBcUI7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxXQUFXLEtBQUssSUFBSSxDQUFBO1FBRXRDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUE7O1FBR3BHLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDdEMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsK0RBQStELENBQUMsQ0FBQTtRQUN2RixDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQTtRQUNuQyxDQUFDLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBQyxXQUFXLENBQUMsQ0FBQTtRQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFBOztRQUc3RCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUlFLEVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUMvQyxXQUFXLEVBQUUsSUFBSTtZQUNqQixhQUFhLEVBQUUsV0FBVztnQkFDMUIsQ0FBQyxLQUFLO29CQUNGLE1BQU0sT0FBTyxHQUFHRixTQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtvQkFDaEQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFBO29CQUM5QixPQUFPLENBQUMsUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFBO2lCQUMxQztnQkFDRCxDQUFDLEtBQUssUUFBTztZQUNiLFlBQVksRUFBRSxDQUFDLEtBQUs7Z0JBQ2hCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQTtpQkFBRTthQUNqRDtZQUNELGVBQWUsRUFBRSxLQUFLLENBQUMsWUFBWTtZQUNuQyxpQkFBaUIsRUFBRSxDQUFDO1NBQ3ZCLENBQUMsQ0FBQztLQUNOO0lBRUQsaUJBQWlCLENBQUMsYUFBNEIsRUFBRSxhQUE4QjtRQUMxRSxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztLQUN0Qzs7Ozs7Ozs7Ozs7SUFjRCxnQkFBZ0IsQ0FBQyxVQUFjO1FBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFBO0tBQzFCO0lBRUQsT0FBTzs7Ozs7Ozs7O1FBU0gsT0FBTyxDQUFDLEdBQUcsQ0FBRSxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFBO1FBQzdFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQTtLQUNuQjs7SUFHRCxhQUFhLENBQUMsVUFBYztRQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUE7S0FDdEU7O0lBR0QsT0FBTyxDQUFDLEdBQStCO1FBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQUUsT0FBTTtTQUFFO1FBRW5DLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUE7UUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQy9CLElBQUksQ0FBQyxVQUFXLENBQUMsaUJBQWlCLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBO1FBQ3JFLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDeEQsSUFBSSxHQUFHLEVBQUU7WUFDUCxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFBO1lBQ2xCLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUE7WUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDMUM7S0FDSjtJQUVELFNBQVMsQ0FBQyxHQUFPOztLQUVoQjtJQUVELE9BQU8sQ0FBRSxHQUFPOztLQUVmO0lBRUQsSUFBSTs7S0FFSDtJQUVELEtBQUs7O0tBRUo7SUFFRCxPQUFPOztLQUVOO0lBRUQsSUFBSSxDQUFDLElBQVk7UUFDYixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FFcEI7YUFBTTtZQUNILElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUE7WUFDbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUE7WUFDeEIsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxFQUFFO2dCQUN6QyxXQUFXLEdBQUcsSUFBSSxDQUFBOztnQkFFbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQzthQUNqRDtZQUVELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNoQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQTtnQkFDdEIsV0FBVyxHQUFHLElBQUksQ0FBQTthQUNyQjtZQUNELElBQUksV0FBVyxFQUFFO2dCQUNiLElBQUksQ0FBQyxVQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDN0I7U0FDSjtLQUNKOzs7TUM5UlFHLE9BQUs7SUFDZCxNQUFNLENBQU07SUFDWixLQUFLLENBQU07SUFDWCxHQUFHLENBQVE7SUFDWCxZQUFZLEdBQVc7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7WUFDbkIsS0FBSyxFQUFFLENBQUM7U0FDWCxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtRQUNkLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtLQUNyQztJQUVELFNBQVM7UUFDTCxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEVBQUU7WUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDckM7S0FDSjtJQUVELGdCQUFnQixDQUFDLFVBQWdCOzs7UUFHN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQTtLQUN2Qzs7O0FDMUJMLE1BQU1ILFNBQVEsU0FBUUksU0FBWTtJQUM5QixNQUFNLENBQU87SUFFYixZQUFhLFNBQWMsRUFBRTtRQUN6QixLQUFLLENBQUNDLFNBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFBOzs7UUFJNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJRixPQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUUxQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztLQUN6QjtJQUVELGdCQUFnQixDQUFDLFVBQXNCO1FBQ25DLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFBO0tBQzNDO0lBRUQsYUFBYTtRQUNULE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7S0FDNUI7Q0FDSjtJQUVHRyxNQUFJLEdBQUcsVUFBVSxTQUFjLEVBQUU7SUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSU4sU0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQzdCLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNYLE9BQU8sR0FBRyxDQUFBO0FBQ2Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQkE7Ozs7Ozs7QUFGYztBQUtaO0FBQ0Y7QUFDQSxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZwQzs7OztBQU5jO0FBT2QsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01DYmxCLEtBQUs7SUFDZCxNQUFNLENBQU07SUFDWixLQUFLLENBQU07SUFDWCxHQUFHLENBQVE7SUFFWCxZQUFZLEdBQVc7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7WUFDbkIsS0FBSyxFQUFFLEtBQUs7U0FDZixDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtRQUNkLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtLQUNyQztJQUVELFFBQVEsQ0FBQyxDQUFVO1FBQ2YsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUU7WUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1NBQ3pCO0tBQ0o7OztBQ25CTCxNQUFNQSxTQUFRLFNBQVFJLFNBQVk7SUFDOUIsTUFBTSxDQUFPO0lBRWIsWUFBYSxTQUFjLEVBQUU7UUFDekIsS0FBSyxDQUFDQyxRQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUM1QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUUxQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7S0FDN0M7SUFFRCxJQUFJLENBQStCO0lBQ25DLFVBQVUsR0FBbUIsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDaEQsTUFBTSxHQUFlLElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxDQUFBO0lBRXJDLEtBQUs7UUFDRCxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBRWpCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVcsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWixPQUFPLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUE7WUFDdkMsT0FBTTtTQUNUO1FBRUQsSUFBSSxPQUFPLEdBQUdMLFNBQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNsRCxPQUFPLENBQUMsUUFBUSxHQUFHO1lBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUE7WUFDakQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBQ3BDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNuRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtnQkFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUUsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFBO2FBQ3BDO2lCQUFNO2dCQUNILElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFFLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQTthQUNwQztZQUNELElBQUksQ0FBQyxJQUFLLENBQUMsTUFBTSxFQUFFLENBQUE7U0FDdEIsQ0FBQTtLQUNKO0NBQ0o7SUFFR00sTUFBSSxHQUFHLFVBQVUsU0FBYyxFQUFFO0lBQ2pDLElBQUksR0FBRyxHQUFHLElBQUlOLFNBQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUM3QixHQUFHLENBQUMsS0FBSyxFQUFFLENBQUE7SUFHWCxPQUFPLEdBQUcsQ0FBQTtBQUNkOzs7Ozs7O0FDOUNjO0FBS1o7QUFDRjtBQUNjLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBQzs7Ozs7Ozs7Ozs7OztBQ0NwQzs7OztBQU5jO0FBT2QsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBQztBQUM3QixJQUFJLElBQUksR0FBRyxNQUFNLElBQUksTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxHQUFHLGVBQWM7Ozs7Ozs7Ozs7O0FDWHJFLE1BQU1BLFNBQVEsU0FBUUksU0FBWTtJQUM5QixZQUFhLEtBQWEsRUFBRSxNQUFjLEVBQUUsU0FBYyxFQUFFO1FBQ3hELEtBQUssQ0FBQ0MsUUFBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7S0FDcEM7Q0FDSjtJQUVHQyxNQUFJLEdBQUcsVUFBVSxTQUFjLEVBQUU7SUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSU4sU0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDdkMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ1gsT0FBTyxHQUFHLENBQUE7QUFDZDs7Ozs7OztBQ1RjO0FBS1o7QUFDRjtBQUNjLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBQzs7Ozs7Ozs7Ozs7OztBQ0NwQzs7OztBQU5jO0FBT2QsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBQztBQUM3QixJQUFJLElBQUksR0FBRyxNQUFNLElBQUksTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxHQUFHLGtCQUFpQjs7Ozs7Ozs7Ozs7QUNYeEUsTUFBTUEsU0FBUSxTQUFRSSxTQUFZO0lBQzlCLFlBQWEsS0FBYSxFQUFFLE1BQWMsRUFBRSxTQUFjLEVBQUU7UUFDeEQsS0FBSyxDQUFDQyxRQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTtLQUNwQztDQUNKO0lBRUdDLE1BQUksR0FBRyxVQUFVLFNBQWMsRUFBRTtJQUNqQyxJQUFJLEdBQUcsR0FBRyxJQUFJTixTQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN2QyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDWCxPQUFPLEdBQUcsQ0FBQTtBQUNkOztBQ2JBLG1CQUFlOzs7Ozs7Ozs7Ozs7OztBQ1FEOzs7Ozs7Ozs7Ozs7O0FDTGQsTUFBTUEsU0FBUSxTQUFRSSxTQUFZO0lBQzlCLFlBQWEsS0FBYSxFQUFFLE1BQWMsRUFBRSxTQUFjLEVBQUU7UUFDeEQsS0FBSyxDQUFDQyxRQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTs7S0FFcEM7Q0FDSjtJQUVHQyxNQUFJLEdBQUcsVUFBVSxTQUFjLEVBQUU7SUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSU4sU0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDdkMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ1gsT0FBTyxHQUFHLENBQUE7QUFDZDs7QUNkQSxtQkFBZTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2lCRDs7Ozs7Ozs7Ozs7Ozs7OztBQ2RkLE1BQU1BLFNBQVEsU0FBUUksU0FBWTtJQUM5QixZQUFhLEtBQWEsRUFBRSxNQUFjLEVBQUUsU0FBYyxFQUFFO1FBQ3hELEtBQUssQ0FBQ0MsUUFBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7S0FDN0I7Q0FDSjtJQUVHQyxNQUFJLEdBQUcsVUFBVSxTQUFjLEVBQUU7SUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSU4sU0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDdkMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ1gsT0FBTyxHQUFHLENBQUE7QUFDZDs7QUNkQSxtQkFBZTs7Ozs7Ozs7Ozs7Ozs7OztBQ1lEOzs7Ozs7Ozs7Ozs7QUNUZCxNQUFNQSxTQUFRLFNBQVFJLFNBQVk7SUFDOUIsWUFBYSxLQUFhLEVBQUUsTUFBYyxFQUFFLFNBQWMsRUFBRTtRQUN4RCxLQUFLLENBQUNDLFFBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBOztLQUVwQztDQUNKO0lBRUdDLE1BQUksR0FBRyxVQUFVLFNBQWMsRUFBRTtJQUNqQyxJQUFJLEdBQUcsR0FBRyxJQUFJTixTQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN2QyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDWCxPQUFPLEdBQUcsQ0FBQTtBQUNkOztBQ2RBLG1CQUFlOzs7Ozs7Ozs7Ozs7Ozs7QUNZRDs7Ozs7Ozs7Ozs7Ozs7O0FDVGQsTUFBTUEsU0FBUSxTQUFRSSxTQUFZO0lBQzlCLFlBQWEsS0FBYSxFQUFFLE1BQWMsRUFBRSxTQUFjLEVBQUU7UUFDeEQsS0FBSyxDQUFDQyxRQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTs7S0FFcEM7Q0FDSjtJQUVHQyxNQUFJLEdBQUcsVUFBVSxTQUFjLEVBQUU7SUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSU4sU0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDdkMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ1gsT0FBTyxHQUFHLENBQUE7QUFDZDs7QUNkQSxtQkFBZTs7Ozs7Ozs7Ozs7Ozs7OztBQ1VEOzs7Ozs7Ozs7Ozs7QUNQZCxNQUFNQSxTQUFRLFNBQVFJLFNBQVk7SUFDOUIsWUFBYSxLQUFhLEVBQUUsTUFBYyxFQUFFLFNBQWMsRUFBRTtRQUN4RCxLQUFLLENBQUNDLFFBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBOztLQUVwQztDQUNKO0lBRUdDLE1BQUksR0FBRyxVQUFVLFNBQWMsRUFBRTtJQUNqQyxJQUFJLEdBQUcsR0FBRyxJQUFJTixTQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN2QyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDWCxPQUFPLEdBQUcsQ0FBQTtBQUNkOzs7Ozs7Ozs7Ozs7Ozs7O0FDSmM7Ozs7Ozs7Ozs7OztBQ1BkLE1BQU1BLFNBQVEsU0FBUUksU0FBWTtJQUM5QixZQUFhLEtBQWEsRUFBRSxNQUFjLEVBQUUsU0FBYyxFQUFFO1FBQ3hELEtBQUssQ0FBQ0MsUUFBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7O0tBRXBDO0NBQ0o7SUFFR0MsTUFBSSxHQUFHLFVBQVUsU0FBYyxFQUFFO0lBQ2pDLElBQUksR0FBRyxHQUFHLElBQUlOLFNBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ3ZDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNYLE9BQU8sR0FBRyxDQUFBO0FBQ2Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKYzs7Ozs7Ozs7Ozs7O0FDUGQsTUFBTUEsU0FBUSxTQUFRSSxTQUFZO0lBQzlCLFlBQWEsS0FBYSxFQUFFLE1BQWMsRUFBRSxTQUFjLEVBQUU7UUFDeEQsS0FBSyxDQUFDQyxRQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTs7S0FFcEM7Q0FDSjtJQUVHQyxNQUFJLEdBQUcsVUFBVSxTQUFjLEVBQUU7SUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSU4sU0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDdkMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ1gsT0FBTyxHQUFHLENBQUE7QUFDZDs7Ozs7Ozs7Ozs7O0FDSGM7Ozs7Ozs7Ozs7OztBQ1JkLE1BQU1BLFNBQVEsU0FBUUksU0FBWTtJQUM5QixZQUFhLEtBQWEsRUFBRSxNQUFjLEVBQUUsU0FBYyxFQUFFO1FBQ3hELEtBQUssQ0FBQ0MsUUFBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7O0tBRXBDO0NBQ0o7SUFFR0MsTUFBSSxHQUFHLFVBQVUsU0FBYyxFQUFFO0lBQ2pDLElBQUksR0FBRyxHQUFHLElBQUlOLFNBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ3ZDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNYLE9BQU8sR0FBRyxDQUFBO0FBQ2Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0djOzs7Ozs7Ozs7QUNkZCxNQUFNQSxTQUFRLFNBQVFJLFNBQVk7SUFDOUIsWUFBYSxLQUFhLEVBQUUsTUFBYyxFQUFFLFNBQWMsRUFBRTtRQUN4RCxLQUFLLENBQUNDLFFBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBOztLQUVwQztDQUNKO0lBRUdDLE1BQUksR0FBRyxVQUFVLFNBQWMsRUFBRTtJQUNqQyxJQUFJLEdBQUcsR0FBRyxJQUFJTixTQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN2QyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDWCxPQUFPLEdBQUcsQ0FBQTtBQUNkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDR2M7Ozs7Ozs7Ozs7OztBQ2RkLE1BQU1BLFNBQVEsU0FBUUksU0FBWTtJQUM5QixZQUFhLEtBQWEsRUFBRSxNQUFjLEVBQUUsU0FBYyxFQUFFO1FBQ3hELEtBQUssQ0FBQ0MsUUFBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7O0tBRXBDO0NBQ0o7SUFFR0MsTUFBSSxHQUFHLFVBQVUsU0FBYyxFQUFFO0lBQ2pDLElBQUksR0FBRyxHQUFHLElBQUlOLFNBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ3ZDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNYLE9BQU8sR0FBRyxDQUFBO0FBQ2Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNDYzs7Ozs7Ozs7Ozs7O0FDWmQsTUFBTUEsU0FBUSxTQUFRSSxTQUFZO0lBQzlCLFlBQWEsS0FBYSxFQUFFLE1BQWMsRUFBRSxTQUFjLEVBQUU7UUFDeEQsS0FBSyxDQUFDQyxRQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTs7S0FFcEM7Q0FDSjtJQUVHQyxNQUFJLEdBQUcsVUFBVSxTQUFjLEVBQUU7SUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSU4sU0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDdkMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ1gsT0FBTyxHQUFHLENBQUE7QUFDZDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0NjOzs7Ozs7Ozs7Ozs7QUNaZCxNQUFNQSxTQUFRLFNBQVFJLFNBQVk7SUFDOUIsWUFBYSxLQUFhLEVBQUUsTUFBYyxFQUFFLFNBQWMsRUFBRTtRQUN4RCxLQUFLLENBQUNDLFFBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBOztLQUVwQztDQUNKO0lBRUdDLE1BQUksR0FBRyxVQUFVLFNBQWMsRUFBRTtJQUNqQyxJQUFJLEdBQUcsR0FBRyxJQUFJTixTQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN2QyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDWCxPQUFPLEdBQUcsQ0FBQTtBQUNkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQ2M7Ozs7Ozs7Ozs7OztBQ1pkLE1BQU1BLFNBQVEsU0FBUUksU0FBWTtJQUM5QixZQUFhLEtBQWEsRUFBRSxNQUFjLEVBQUUsU0FBYyxFQUFFO1FBQ3hELEtBQUssQ0FBQ0MsUUFBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7O0tBRXBDO0NBQ0o7SUFFR0MsTUFBSSxHQUFHLFVBQVUsU0FBYyxFQUFFO0lBQ2pDLElBQUksR0FBRyxHQUFHLElBQUlOLFNBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ3ZDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNYLE9BQU8sR0FBRyxDQUFBO0FBQ2Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNDYzs7Ozs7Ozs7Ozs7O0FDWmQsTUFBTUEsU0FBUSxTQUFRSSxTQUFZO0lBQzlCLFlBQWEsS0FBYSxFQUFFLE1BQWMsRUFBRSxTQUFjLEVBQUU7UUFDeEQsS0FBSyxDQUFDQyxRQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTs7S0FFcEM7Q0FDSjtJQUVHQyxNQUFJLEdBQUcsVUFBVSxTQUFjLEVBQUU7SUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSU4sU0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDdkMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ1gsT0FBTyxHQUFHLENBQUE7QUFDZDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0NjOzs7Ozs7Ozs7Ozs7QUNaZCxNQUFNQSxTQUFRLFNBQVFJLFNBQVk7SUFDOUIsWUFBYSxLQUFhLEVBQUUsTUFBYyxFQUFFLFNBQWMsRUFBRTtRQUN4RCxLQUFLLENBQUNDLFFBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBOztLQUVwQztDQUNKO0lBRUdDLE1BQUksR0FBRyxVQUFVLFNBQWMsRUFBRTtJQUNqQyxJQUFJLEdBQUcsR0FBRyxJQUFJTixTQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN2QyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDWCxPQUFPLEdBQUcsQ0FBQTtBQUNkOztBQ2RBLG1CQUFlOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNjRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1hkLE1BQU1BLFNBQVEsU0FBUUksU0FBWTtJQUM5QixZQUFhLEtBQWEsRUFBRSxNQUFjLEVBQUUsU0FBYyxFQUFFO1FBQ3hELEtBQUssQ0FBQ0MsUUFBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7S0FDN0I7Q0FDSjtJQUVHQyxNQUFJLEdBQUcsVUFBVSxTQUFjLEVBQUU7SUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSU4sU0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDdkMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ1gsT0FBTyxHQUFHLENBQUE7QUFDZDs7Ozs7Ozs7Ozs7QUNEYzs7Ozs7Ozs7Ozs7Ozs7QUNWZCxNQUFNQSxTQUFRLFNBQVFJLFNBQVk7SUFDOUIsWUFBYSxLQUFhLEVBQUUsTUFBYyxFQUFFLFNBQWMsRUFBRTtRQUN4RCxLQUFLLENBQUNDLFFBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBOztLQUVwQztDQUNKO0lBRUdDLE1BQUksR0FBRyxVQUFVLFNBQWMsRUFBRTtJQUNqQyxJQUFJLEdBQUcsR0FBRyxJQUFJTixTQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN2QyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDWCxPQUFPLEdBQUcsQ0FBQTtBQUNkOzs7Ozs7Ozs7OztBQ0hjOzs7Ozs7Ozs7Ozs7OztBQ1JkLE1BQU1BLFNBQVEsU0FBUUksU0FBWTtJQUM5QixZQUFhLEtBQWEsRUFBRSxNQUFjLEVBQUUsU0FBYyxFQUFFO1FBQ3hELEtBQUssQ0FBQ0MsUUFBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7O0tBRXBDO0NBQ0o7SUFFR0MsTUFBSSxHQUFHLFVBQVUsU0FBYyxFQUFFO0lBQ2pDLElBQUksR0FBRyxHQUFHLElBQUlOLFNBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ3ZDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNYLE9BQU8sR0FBRyxDQUFBO0FBQ2Q7Ozs7Ozs7Ozs7O0FDRmM7Ozs7Ozs7Ozs7Ozs7O0FDVGQsTUFBTUEsU0FBUSxTQUFRSSxTQUFZO0lBQzlCLFlBQWEsS0FBYSxFQUFFLE1BQWMsRUFBRSxTQUFjLEVBQUU7UUFDeEQsS0FBSyxDQUFDQyxRQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTs7S0FFcEM7Q0FDSjtJQUVHQyxNQUFJLEdBQUcsVUFBVSxTQUFjLEVBQUU7SUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSU4sU0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDdkMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ1gsT0FBTyxHQUFHLENBQUE7QUFDZDs7Ozs7Ozs7Ozs7QUNGYzs7Ozs7Ozs7Ozs7Ozs7QUNUZCxNQUFNQSxTQUFRLFNBQVFJLFNBQVk7SUFDOUIsWUFBYSxLQUFhLEVBQUUsTUFBYyxFQUFFLFNBQWMsRUFBRTtRQUN4RCxLQUFLLENBQUNDLFFBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBOztLQUVwQztDQUNKO0lBRUdDLE1BQUksR0FBRyxVQUFVLFNBQWMsRUFBRTtJQUNqQyxJQUFJLEdBQUcsR0FBRyxJQUFJTixTQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN2QyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDWCxPQUFPLEdBQUcsQ0FBQTtBQUNkOzs7Ozs7Ozs7OztBQ0RjOzs7Ozs7Ozs7Ozs7OztBQ1ZkLE1BQU1BLFNBQVEsU0FBUUksU0FBWTtJQUM5QixZQUFhLEtBQWEsRUFBRSxNQUFjLEVBQUUsU0FBYyxFQUFFO1FBQ3hELEtBQUssQ0FBQ0MsUUFBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7O0tBRXBDO0NBQ0o7SUFFR0MsTUFBSSxHQUFHLFVBQVUsU0FBYyxFQUFFO0lBQ2pDLElBQUksR0FBRyxHQUFHLElBQUlOLFNBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ3ZDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNYLE9BQU8sR0FBRyxDQUFBO0FBQ2Q7Ozs7Ozs7Ozs7QUNOYzs7Ozs7Ozs7Ozs7OztBQ0xkLE1BQU1BLFNBQVEsU0FBUUksU0FBWTtJQUM5QixZQUFhLEtBQWEsRUFBRSxNQUFjLEVBQUUsU0FBYyxFQUFFO1FBQ3hELEtBQUssQ0FBQ0MsUUFBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7O0tBRXBDO0NBQ0o7SUFFR0MsTUFBSSxHQUFHLFVBQVUsU0FBYyxFQUFFO0lBQ2pDLElBQUksR0FBRyxHQUFHLElBQUlOLFNBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ3ZDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNYLE9BQU8sR0FBRyxDQUFBO0FBQ2Q7Ozs7Ozs7Ozs7QUNOYzs7Ozs7Ozs7Ozs7OztBQ0xkLE1BQU1BLFNBQVEsU0FBUUksU0FBWTtJQUM5QixZQUFhLEtBQWEsRUFBRSxNQUFjLEVBQUUsU0FBYyxFQUFFO1FBQ3hELEtBQUssQ0FBQ0MsUUFBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7O0tBRXBDO0NBQ0o7SUFFR0MsTUFBSSxHQUFHLFVBQVUsU0FBYyxFQUFFO0lBQ2pDLElBQUksR0FBRyxHQUFHLElBQUlOLFNBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ3ZDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNYLE9BQU8sR0FBRyxDQUFBO0FBQ2Q7Ozs7Ozs7Ozs7Ozs7QUNGYzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVGQsTUFBTUEsU0FBUSxTQUFRSSxTQUFZO0lBQzlCLFlBQWEsS0FBYSxFQUFFLE1BQWMsRUFBRSxTQUFjLEVBQUU7UUFDeEQsS0FBSyxDQUFDQyxRQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTs7S0FFcEM7Q0FDSjtJQUVHQyxNQUFJLEdBQUcsVUFBVSxTQUFjLEVBQUU7SUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSU4sU0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDdkMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ1gsT0FBTyxHQUFHLENBQUE7QUFDZDs7Ozs7Ozs7O0FDS2M7Ozs7Ozs7OztBQ2hCZCxNQUFNQSxTQUFRLFNBQVFJLFNBQVk7SUFDOUIsWUFBYSxLQUFhLEVBQUUsTUFBYyxFQUFFLFNBQWMsRUFBRTtRQUN4RCxLQUFLLENBQUNDLFFBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBOztLQUVwQztDQUNKO0lBRUdDLE1BQUksR0FBRyxVQUFVLFNBQWMsRUFBRTtJQUNqQyxJQUFJLEdBQUcsR0FBRyxJQUFJTixTQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN2QyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDWCxPQUFPLEdBQUcsQ0FBQTtBQUNkOzs7Ozs7Ozs7Ozs7O0FDQWM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1hkLE1BQU1BLFNBQVEsU0FBUUksU0FBWTtJQUM5QixZQUFhLEtBQWEsRUFBRSxNQUFjLEVBQUUsU0FBYyxFQUFFO1FBQ3hELEtBQUssQ0FBQ0MsUUFBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7O0tBRXBDO0NBQ0o7SUFFR0MsTUFBSSxHQUFHLFVBQVUsU0FBYyxFQUFFO0lBQ2pDLElBQUksR0FBRyxHQUFHLElBQUlOLFNBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ3ZDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNYLE9BQU8sR0FBRyxDQUFBO0FBQ2Q7Ozs7Ozs7Ozs7Ozs7O0FDQ2M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNaZCxNQUFNQSxTQUFRLFNBQVFJLFNBQVk7SUFDOUIsWUFBYSxLQUFhLEVBQUUsTUFBYyxFQUFFLFNBQWMsRUFBRTtRQUN4RCxLQUFLLENBQUNDLFFBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBOztLQUVwQztDQUNKO0lBRUdDLE1BQUksR0FBRyxVQUFVLFNBQWMsRUFBRTtJQUNqQyxJQUFJLEdBQUcsR0FBRyxJQUFJTixTQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN2QyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDWCxPQUFPLEdBQUcsQ0FBQTtBQUNkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRmM7Ozs7Ozs7OztBQ1RkLE1BQU1BLFNBQVEsU0FBUUksU0FBWTtJQUM5QixZQUFhLEtBQWEsRUFBRSxNQUFjLEVBQUUsU0FBYyxFQUFFO1FBQ3hELEtBQUssQ0FBQ0MsUUFBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7O0tBRXBDO0NBQ0o7SUFFR0MsTUFBSSxHQUFHLFVBQVUsU0FBYyxFQUFFO0lBQ2pDLElBQUksR0FBRyxHQUFHLElBQUlOLFNBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ3ZDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNYLE9BQU8sR0FBRyxDQUFBO0FBQ2Q7O0FDZEEsbUJBQWU7O0FDQWYsaUJBQWU7O0FDQWYsaUJBQWU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN3QkQ7Ozs7Ozs7OztBQ3JCZCxNQUFNQSxTQUFRLFNBQVFJLFNBQVk7SUFDOUIsWUFBYSxLQUFhLEVBQUUsTUFBYyxFQUFFLFNBQWMsRUFBRTtRQUN4RCxLQUFLLENBQUNDLFFBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBOztLQUVwQztDQUNKO0lBRUdDLE1BQUksR0FBRyxVQUFVLFNBQWMsRUFBRTtJQUNqQyxJQUFJLEdBQUcsR0FBRyxJQUFJTixTQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN2QyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDWCxPQUFPLEdBQUcsQ0FBQTtBQUNkOztBQ2RBLG1CQUFlOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNlRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWmQsTUFBTUEsU0FBUSxTQUFRSSxTQUFZO0lBQzlCLFlBQWEsS0FBYSxFQUFFLE1BQWMsRUFBRSxTQUFjLEVBQUU7UUFDeEQsS0FBSyxDQUFDQyxRQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTs7S0FFcEM7Q0FDSjtJQUVHQyxNQUFJLEdBQUcsVUFBVSxTQUFjLEVBQUU7SUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSU4sU0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDdkMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ1gsT0FBTyxHQUFHLENBQUE7QUFDZDs7QUNkQSxtQkFBZTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2FEOzs7Ozs7Ozs7QUNWZCxNQUFNQSxTQUFRLFNBQVFJLFNBQVk7SUFDOUIsWUFBYSxLQUFhLEVBQUUsTUFBYyxFQUFFLFNBQWMsRUFBRTtRQUN4RCxLQUFLLENBQUNDLFFBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBOztLQUVwQztDQUNKO0lBRUdDLE1BQUksR0FBRyxVQUFVLFNBQWMsRUFBRTtJQUNqQyxJQUFJLEdBQUcsR0FBRyxJQUFJTixTQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN2QyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDWCxPQUFPLEdBQUcsQ0FBQTtBQUNkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0RjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVmQsTUFBTUEsU0FBUSxTQUFRSSxTQUFZO0lBQzlCLFlBQWEsS0FBYSxFQUFFLE1BQWMsRUFBRSxTQUFjLEVBQUU7UUFDeEQsS0FBSyxDQUFDQyxRQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUNqQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztLQUM3QjtDQUNKO0lBRUdDLE1BQUksR0FBRyxVQUFVLFNBQWMsRUFBRTtJQUNqQyxJQUFJLEdBQUcsR0FBRyxJQUFJTixTQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN2QyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDWCxPQUFPLEdBQUcsQ0FBQTtBQUNkOztBQ2RBLG1CQUFlOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDY0Q7Ozs7Ozs7OztBQ1hkLE1BQU1BLFNBQVEsU0FBUUksU0FBWTtJQUM5QixZQUFhLEtBQWEsRUFBRSxNQUFjLEVBQUUsU0FBYyxFQUFFO1FBQ3hELEtBQUssQ0FBQ0MsUUFBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7O0tBRXBDO0NBQ0o7SUFFR0MsTUFBSSxHQUFHLFVBQVUsU0FBYyxFQUFFO0lBQ2pDLElBQUksR0FBRyxHQUFHLElBQUlOLFNBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ3ZDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNYLE9BQU8sR0FBRyxDQUFBO0FBQ2Q7Ozs7Ozs7Ozs7Ozs7QUNEYzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVmQsTUFBTUEsU0FBUSxTQUFRSSxTQUFZO0lBQzlCLFlBQWEsS0FBYSxFQUFFLE1BQWMsRUFBRSxTQUFjLEVBQUU7UUFDeEQsS0FBSyxDQUFDQyxRQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTs7S0FFcEM7Q0FDSjtJQUVHQyxNQUFJLEdBQUcsVUFBVSxTQUFjLEVBQUU7SUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSU4sU0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDdkMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ1gsT0FBTyxHQUFHLENBQUE7QUFDZDs7QUNkQSxtQkFBZTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1lEOzs7Ozs7Ozs7QUNUZCxNQUFNQSxTQUFRLFNBQVFJLFNBQVk7SUFDOUIsWUFBYSxLQUFhLEVBQUUsTUFBYyxFQUFFLFNBQWMsRUFBRTtRQUN4RCxLQUFLLENBQUNDLFFBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBOztLQUVwQztDQUNKO0lBRUdDLE1BQUksR0FBRyxVQUFVLFNBQWMsRUFBRTtJQUNqQyxJQUFJLEdBQUcsR0FBRyxJQUFJTixTQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN2QyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDWCxPQUFPLEdBQUcsQ0FBQTtBQUNkOzs7Ozs7Ozs7QUNNYzs7Ozs7Ozs7O0FDakJkLE1BQU1BLFNBQVEsU0FBUUksU0FBWTtJQUM5QixZQUFhLEtBQWEsRUFBRSxNQUFjLEVBQUUsU0FBYyxFQUFFO1FBQ3hELEtBQUssQ0FBQ0MsUUFBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7O0tBRXBDO0NBQ0o7SUFFR0MsTUFBSSxHQUFHLFVBQVUsU0FBYyxFQUFFO0lBQ2pDLElBQUksR0FBRyxHQUFHLElBQUlOLFNBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ3ZDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNYLE9BQU8sR0FBRyxDQUFBO0FBQ2Q7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRGM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWZCxNQUFNQSxTQUFRLFNBQVFJLFNBQVk7SUFDOUIsWUFBYSxLQUFhLEVBQUUsTUFBYyxFQUFFLFNBQWMsRUFBRTtRQUN4RCxLQUFLLENBQUNDLFFBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBOztLQUVwQztDQUNKO0lBRUdDLE1BQUksR0FBRyxVQUFVLFNBQWMsRUFBRTtJQUNqQyxJQUFJLEdBQUcsR0FBRyxJQUFJTixTQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN2QyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDWCxPQUFPLEdBQUcsQ0FBQTtBQUNkOztBQ2RBLG1CQUFlOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNXRDs7Ozs7Ozs7O0FDUmQsTUFBTUEsU0FBUSxTQUFRSSxTQUFZO0lBQzlCLFlBQWEsS0FBYSxFQUFFLE1BQWMsRUFBRSxTQUFjLEVBQUU7UUFDeEQsS0FBSyxDQUFDQyxRQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTs7S0FFcEM7Q0FDSjtJQUVHQyxNQUFJLEdBQUcsVUFBVSxTQUFjLEVBQUU7SUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSU4sU0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDdkMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ1gsT0FBTyxHQUFHLENBQUE7QUFDZDs7Ozs7Ozs7Ozs7O0FDSGM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUmQsTUFBTUEsU0FBUSxTQUFRSSxTQUFZO0lBQzlCLFlBQWEsS0FBYSxFQUFFLE1BQWMsRUFBRSxTQUFjLEVBQUU7UUFDeEQsS0FBSyxDQUFDQyxRQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTs7S0FFcEM7Q0FDSjtJQUVHQyxNQUFJLEdBQUcsVUFBVSxTQUFjLEVBQUU7SUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSU4sU0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDdkMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ1gsT0FBTyxHQUFHLENBQUE7QUFDZDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZjOzs7Ozs7Ozs7QUNUZCxNQUFNQSxTQUFRLFNBQVFJLFNBQVk7SUFDOUIsWUFBYSxLQUFhLEVBQUUsTUFBYyxFQUFFLFNBQWMsRUFBRTtRQUN4RCxLQUFLLENBQUNDLFFBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBOztLQUVwQztDQUNKO0lBRUdDLE1BQUksR0FBRyxVQUFVLFNBQWMsRUFBRTtJQUNqQyxJQUFJLEdBQUcsR0FBRyxJQUFJTixTQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN2QyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDWCxPQUFPLEdBQUcsQ0FBQTtBQUNkOztBQ2RBLG1CQUFlOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDY0Q7Ozs7Ozs7OztBQ1hkLE1BQU1BLFNBQVEsU0FBUUksU0FBWTtJQUM5QixZQUFhLEtBQWEsRUFBRSxNQUFjLEVBQUUsU0FBYyxFQUFFO1FBQ3hELEtBQUssQ0FBQ0MsUUFBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7O0tBRXBDO0NBQ0o7SUFFR0MsTUFBSSxHQUFHLFVBQVUsU0FBYyxFQUFFO0lBQ2pDLElBQUksR0FBRyxHQUFHLElBQUlOLFNBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ3ZDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNYLE9BQU8sR0FBRyxDQUFBO0FBQ2Q7Ozs7Ozs7Ozs7O0FDSGM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSZCxNQUFNQSxTQUFRLFNBQVFJLFNBQVk7SUFDOUIsWUFBYSxLQUFhLEVBQUUsTUFBYyxFQUFFLFNBQWMsRUFBRTtRQUN4RCxLQUFLLENBQUNDLFFBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBOztLQUVwQztDQUNKO0lBRUdDLE1BQUksR0FBRyxVQUFVLFNBQWMsRUFBRTtJQUNqQyxJQUFJLEdBQUcsR0FBRyxJQUFJTixTQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN2QyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDWCxPQUFPLEdBQUcsQ0FBQTtBQUNkOztBQ2RBLG1CQUFlOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNXRDs7Ozs7Ozs7O0FDUmQsTUFBTUEsU0FBUSxTQUFRSSxTQUFZO0lBQzlCLFlBQWEsS0FBYSxFQUFFLE1BQWMsRUFBRSxTQUFjLEVBQUU7UUFDeEQsS0FBSyxDQUFDQyxRQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTs7S0FFcEM7Q0FDSjtJQUVHQyxNQUFJLEdBQUcsVUFBVSxTQUFjLEVBQUU7SUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSU4sU0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDdkMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ1gsT0FBTyxHQUFHLENBQUE7QUFDZDs7Ozs7Ozs7Ozs7OztBQ0ZjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNUZCxNQUFNQSxTQUFRLFNBQVFJLFNBQVk7SUFDOUIsWUFBYSxLQUFhLEVBQUUsTUFBYyxFQUFFLFNBQWMsRUFBRTtRQUN4RCxLQUFLLENBQUNDLFFBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0tBQ3BDO0NBQ0o7SUFFR0MsTUFBSSxHQUFHLFVBQVUsU0FBYyxFQUFFO0lBQ2pDLElBQUksR0FBRyxHQUFHLElBQUlOLFNBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ3ZDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNYLE9BQU8sR0FBRyxDQUFBO0FBQ2Q7Ozs7Ozs7Ozs7Ozs7QUNEYzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVGQsTUFBTUEsU0FBUSxTQUFRSSxTQUFZO0lBQzlCLFlBQWEsS0FBYSxFQUFFLE1BQWMsRUFBRSxTQUFjLEVBQUU7UUFDeEQsS0FBSyxDQUFDQyxRQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTtLQUNwQztDQUNKO0lBRUdDLE1BQUksR0FBRyxVQUFVLFNBQWMsRUFBRTtJQUNqQyxJQUFJLEdBQUcsR0FBRyxJQUFJTixTQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN2QyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDWCxPQUFPLEdBQUcsQ0FBQTtBQUNkOzs7Ozs7Ozs7Ozs7QUNBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVmQsTUFBTUEsU0FBUSxTQUFRSSxTQUFZO0lBQzlCLFlBQWEsS0FBYSxFQUFFLE1BQWMsRUFBRSxTQUFjLEVBQUU7UUFDeEQsS0FBSyxDQUFDQyxRQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTtLQUNwQztDQUNKO0lBRUdDLE1BQUksR0FBRyxVQUFVLFNBQWMsRUFBRTtJQUNqQyxJQUFJLEdBQUcsR0FBRyxJQUFJTixTQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN2QyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDWCxPQUFPLEdBQUcsQ0FBQTtBQUNkOzs7Ozs7Ozs7Ozs7QUNBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVmQsTUFBTUEsU0FBUSxTQUFRSSxTQUFZO0lBQzlCLFlBQWEsS0FBYSxFQUFFLE1BQWMsRUFBRSxTQUFjLEVBQUU7UUFDeEQsS0FBSyxDQUFDQyxRQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTtLQUNwQztDQUNKO0lBRUdDLE1BQUksR0FBRyxVQUFVLFNBQWMsRUFBRTtJQUNqQyxJQUFJLEdBQUcsR0FBRyxJQUFJTixTQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN2QyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDWCxPQUFPLEdBQUcsQ0FBQTtBQUNkOzs7Ozs7Ozs7Ozs7Ozs7O0FDQ2M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYZCxNQUFNQSxTQUFRLFNBQVFJLFNBQVk7SUFDOUIsWUFBYSxLQUFhLEVBQUUsTUFBYyxFQUFFLFNBQWMsRUFBRTtRQUN4RCxLQUFLLENBQUNDLFFBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBOztLQUVwQztDQUNKO0lBRUdDLE1BQUksR0FBRyxVQUFVLFNBQWMsRUFBRTtJQUNqQyxJQUFJLEdBQUcsR0FBRyxJQUFJTixTQUFPLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN0QyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDWCxPQUFPLEdBQUcsQ0FBQTtBQUNkOztBQ2RBLG1CQUFlOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbUJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEJkLE1BQU1BLFNBQVEsU0FBUUksU0FBWTtJQUM5QixZQUFhLEtBQWEsRUFBRSxNQUFjLEVBQUUsU0FBYyxFQUFFO1FBQ3hELEtBQUssQ0FBQ0MsUUFBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7S0FDN0I7Q0FDSjtJQUVHQyxNQUFJLEdBQUcsVUFBVSxTQUFjLEVBQUU7SUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSU4sU0FBTyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDdEMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ1gsT0FBTyxHQUFHLENBQUE7QUFDZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQ2M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWmQsTUFBTUEsU0FBUSxTQUFRSSxTQUFZO0lBQzlCLFlBQWEsS0FBYSxFQUFFLE1BQWMsRUFBRSxTQUFjLEVBQUU7UUFDeEQsS0FBSyxDQUFDQyxRQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUNqQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztLQUM3QjtDQUNKO0lBRUdDLE1BQUksR0FBRyxVQUFVLFNBQWMsRUFBRTtJQUNqQyxJQUFJLEdBQUcsR0FBRyxJQUFJTixTQUFPLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN0QyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDWCxPQUFPLEdBQUcsQ0FBQTtBQUNkOztBQ2RBLG1CQUFlOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2lCRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2RkLE1BQU1BLFNBQVEsU0FBUUksU0FBWTtJQUM5QixZQUFhLEtBQWEsRUFBRSxNQUFjLEVBQUUsU0FBYyxFQUFFO1FBQ3hELEtBQUssQ0FBQ0MsUUFBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7S0FDN0I7Q0FDSjtJQUVHQyxNQUFJLEdBQUcsVUFBVSxTQUFjLEVBQUU7SUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSU4sU0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDdkMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ1gsT0FBTyxHQUFHLENBQUE7QUFDZDs7Ozs7Ozs7O0FDV2M7Ozs7Ozs7OztBQ3RCZCxNQUFNQSxTQUFRLFNBQVFJLFNBQVk7SUFDOUIsWUFBYSxLQUFhLEVBQUUsTUFBYyxFQUFFLFNBQWMsRUFBRTtRQUN4RCxLQUFLLENBQUNDLFFBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0tBQzdCO0NBQ0o7SUFFR0MsTUFBSSxHQUFHLFVBQVUsU0FBYyxFQUFFO0lBQ2pDLElBQUksR0FBRyxHQUFHLElBQUlOLFNBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ3ZDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNYLE9BQU8sR0FBRyxDQUFBO0FBQ2Q7O0FDZEEsbUJBQWU7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2dCRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiZCxNQUFNQSxTQUFRLFNBQVFJLFNBQVk7SUFDOUIsWUFBYSxLQUFhLEVBQUUsTUFBYyxFQUFFLFNBQWMsRUFBRTtRQUN4RCxLQUFLLENBQUNDLFFBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBOztLQUVwQztDQUNKO0lBRUdDLE1BQUksR0FBRyxVQUFVLFNBQWMsRUFBRTtJQUNqQyxJQUFJLEdBQUcsR0FBRyxJQUFJTixTQUFPLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN0QyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDWCxPQUFPLEdBQUcsQ0FBQTtBQUNkOzs7Ozs7Ozs7Ozs7QUNBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1hkLE1BQU1BLFNBQVEsU0FBUUksU0FBWTtJQUM5QixZQUFhLEtBQWEsRUFBRSxNQUFjLEVBQUUsU0FBYyxFQUFFO1FBQ3hELEtBQUssQ0FBQ0MsUUFBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7O0tBRXBDO0NBQ0o7SUFFR0MsTUFBSSxHQUFHLFVBQVUsU0FBYyxFQUFFO0lBQ2pDLElBQUksR0FBRyxHQUFHLElBQUlOLFNBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ3ZDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNYLE9BQU8sR0FBRyxDQUFBO0FBQ2Q7O0FDZEEsbUJBQWU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3VCRDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQmQsTUFBTUEsU0FBUSxTQUFRSSxTQUFZO0lBQzlCLFlBQWEsS0FBYSxFQUFFLE1BQWMsRUFBRSxTQUFjLEVBQUU7UUFDeEQsS0FBSyxDQUFDQyxRQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTs7S0FFcEM7Q0FDSjtJQUVHQyxNQUFJLEdBQUcsVUFBVSxTQUFjLEVBQUU7SUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSU4sU0FBTyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDdEMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ1gsT0FBTyxHQUFHLENBQUE7QUFDZDs7QUNkQSxpQkFBZTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNlRDs7Ozs7Ozs7O0FDWmQsTUFBTUEsU0FBUSxTQUFRSSxTQUFZO0lBQzlCLFlBQWEsS0FBYSxFQUFFLE1BQWMsRUFBRSxTQUFjLEVBQUU7UUFDeEQsS0FBSyxDQUFDQyxRQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTs7S0FFcEM7Q0FDSjtJQUVHQyxNQUFJLEdBQUcsVUFBVSxTQUFjLEVBQUU7SUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSU4sU0FBTyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDdEMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ1gsT0FBTyxHQUFHLENBQUE7QUFDZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNEYzs7Ozs7Ozs7O0FDVmQsTUFBTUEsU0FBUSxTQUFRSSxTQUFZO0lBQzlCLFlBQWEsS0FBYSxFQUFFLE1BQWMsRUFBRSxTQUFjLEVBQUU7UUFDeEQsS0FBSyxDQUFDQyxRQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTs7S0FFcEM7Q0FDSjtJQUVHQyxNQUFJLEdBQUcsVUFBVSxTQUFjLEVBQUU7SUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSU4sU0FBTyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDdEMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ1gsT0FBTyxHQUFHLENBQUE7QUFDZDs7Ozs7Ozs7OztBQ0hjOzs7Ozs7Ozs7Ozs7Ozs7O0FDUmQsTUFBTSxPQUFRLFNBQVFJLFNBQVk7SUFDOUIsWUFBYSxLQUFhLEVBQUUsTUFBYyxFQUFFLFNBQWMsRUFBRTtRQUN4RCxLQUFLLENBQUNDLE1BQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBOztLQUVwQztDQUNKO0lBRUcsSUFBSSxHQUFHO0lBQ1AsSUFBSSxHQUFHLEdBQUcsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQy9CLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNYLE9BQU8sR0FBRyxDQUFBO0FBQ2Q7OyJ9
