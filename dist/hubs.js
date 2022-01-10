import { p as pushScopeId, a as popScopeId, i as inject, c as createElementBlock, b as createBaseVNode, t as toDisplayString, u as unref, F as Fragment, o as openBlock, d as createVNode, e as createCommentVNode, f as createApp, j as jh, k as kh, r as reactive, g as readonly, h as createTextVNode, n as normalizeClass, l as createStaticVNode } from './vendor-426aefc4.js';

var _imports_0$w = "https://resources.realitymedia.digital/vue-apps/dist/1a6ace377133f14a.png";

pushScopeId("data-v-0a280960");
const _hoisted_1$1k = {
  "xr-layer": "",
  class: "fade"
};
const _hoisted_2$1i = /*#__PURE__*/createBaseVNode("p", null, " Here's some more text just to make things not blank. ", -1 /* HOISTED */);
popScopeId();


var script$1m = {
  props: {
  msg: String
},
  setup(__props) {



const shared = inject('shared');

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("h1", _hoisted_1$1k, toDisplayString(__props.msg), 1 /* TEXT */),
    _hoisted_2$1i,
    createBaseVNode("button", {
      "xr-layer": "",
      onClick: _cache[0] || (_cache[0] = (...args) => (unref(shared).increment && unref(shared).increment(...args)))
    }, "count is: " + toDisplayString(unref(shared).state.count), 1 /* TEXT */)
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$1m.__scopeId = "data-v-0a280960";

const _hoisted_1$1j = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$1h = /*#__PURE__*/createBaseVNode("img", {
  alt: "Vue logo",
  src: _imports_0$w
}, null, -1 /* HOISTED */);


var script$1l = {
  setup(__props) {

let params = inject("params");
var mesg = params && params.mesg ? params.mesg : "Networked Vue Component with Shared Button Count";

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$1j, [
    _hoisted_2$1h,
    createVNode(script$1m, { msg: unref(mesg) }, null, 8 /* PROPS */, ["msg"]),
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
    HubsApp$1j.initializeEthereal();
}
//THREE.Object3D.DefaultMatrixAutoUpdate = true;
function systemTick(time, deltaTime) {
    HubsApp$1j.systemTick(time, deltaTime);
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
class HubsApp$1j extends VueApp {
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
        scene.renderer.getSize(HubsApp$1j.system.viewResolution);
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
                    const adapter = HubsApp$1j.system.getAdapter(layer);
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

class HubsApp$1i extends HubsApp$1j {
    shared;
    constructor(params = {}) {
        super(script$1l, 400, 475, params);
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
var init$1i = function (params = {}) {
    let app = new HubsApp$1i(params);
    app.mount();
    return app;
};

pushScopeId("data-v-b474cdac");
const _hoisted_1$1i = {
  "xr-layer": "",
  class: "fade"
};
const _hoisted_2$1g = /*#__PURE__*/createBaseVNode("p", null, [
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


var script$1k = {
  props: {
  msg: String
},
  setup(__props) {



const state = reactive({ count: 0 });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("h1", _hoisted_1$1i, toDisplayString(__props.msg), 1 /* TEXT */),
    _hoisted_2$1g,
    createBaseVNode("button", {
      "xr-layer": "",
      onClick: _cache[0] || (_cache[0] = $event => (unref(state).count++))
    }, "count is: " + toDisplayString(unref(state).count), 1 /* TEXT */)
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$1k.__scopeId = "data-v-b474cdac";

pushScopeId("data-v-91ee6202");
const _hoisted_1$1h = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$1f = /*#__PURE__*/createBaseVNode("img", {
  alt: "Vue logo",
  src: _imports_0$w
}, null, -1 /* HOISTED */);
const _hoisted_3$y = /*#__PURE__*/createTextVNode(" Edit code in ");
const _hoisted_4$s = /*#__PURE__*/createBaseVNode("code", null, "src/apps", -1 /* HOISTED */);
const _hoisted_5$i = /*#__PURE__*/createTextVNode(" to test hot module replacement while running project as \"npm run dev\". ");
const _hoisted_6$a = [
  _hoisted_3$y,
  _hoisted_4$s,
  _hoisted_5$i
];
popScopeId();


var script$1j = {
  setup(__props) {

const shared = inject('shared');

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$1h, [
      _hoisted_2$1f,
      createVNode(script$1k, { msg: "Vue Component with Local Button Count" }),
      createBaseVNode("p", {
        id: "edit",
        class: normalizeClass({ upclose: unref(shared).state.close }),
        "xr-layer": ""
      }, _hoisted_6$a, 2 /* CLASS */)
    ])
  ]))
}
}

};

script$1j.__scopeId = "data-v-91ee6202";

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

class HubsApp$1h extends HubsApp$1j {
    shared;
    constructor(params = {}) {
        super(script$1j, 500, 500, params);
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
        let adapter = HubsApp$1h.system.getAdapter(this.docs);
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
var init$1h = function (params = {}) {
    let app = new HubsApp$1h(params);
    app.mount();
    return app;
};

var script$1i = {
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

const _hoisted_1$1g = {
  id: "room",
  class: "darkwall"
};


var script$1h = {
  setup(__props) {

let params = inject("params");
var mesg = params && params.message ? params.message : "PORTAL TITLE";

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$1g, [
    createVNode(script$1i, { msg: unref(mesg) }, null, 8 /* PROPS */, ["msg"])
  ]))
}
}

};

class HubsApp$1g extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$1h, width, height, params);
    }
}
var init$1g = function (params = {}) {
    let app = new HubsApp$1g(300, 100, params);
    app.mount();
    return app;
};

var script$1g = {
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

const _hoisted_1$1f = {
  id: "room",
  class: "darkwall"
};


var script$1f = {
  setup(__props) {

let params = inject("params");
var mesg = params && params.message ? params.message : "PORTAL SUBTITLE";

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$1f, [
    createVNode(script$1g, { msg: unref(mesg) }, null, 8 /* PROPS */, ["msg"])
  ]))
}
}

};

class HubsApp$1f extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$1f, width, height, params);
    }
}
var init$1f = function (params = {}) {
    let app = new HubsApp$1f(300, 100, params);
    app.mount();
    return app;
};

var _imports_0$v = "https://resources.realitymedia.digital/vue-apps/dist/38d6d7a1e02fc2f9.png";

const _hoisted_1$1e = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$1e = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$v,
  width: "250"
}, null, -1 /* HOISTED */);
const _hoisted_3$x = /*#__PURE__*/createBaseVNode("div", { class: "displaytext" }, "AR allows us to extend our physical reality; VR creates for us a different reality.", -1 /* HOISTED */);

var script$1e = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$1e, [
    createVNode(script$1i, { msg: "Reality Media" }),
    _hoisted_2$1e,
    _hoisted_3$x
  ]))
}
}

};

class HubsApp$1e extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$1e, width, height, params);
        //this.isInteractive = true;
    }
}
var init$1e = function (params = {}) {
    let app = new HubsApp$1e(300, 475, params);
    app.mount();
    return app;
};

var _imports_0$u = "https://resources.realitymedia.digital/vue-apps/dist/7af7b95b35fd7616.jpg";

const _hoisted_1$1d = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$1d = { class: "spacer" };
const _hoisted_3$w = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$u,
  width: "250"
}, null, -1 /* HOISTED */);
const _hoisted_4$r = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, " Each reality medium mediates and remediates. It offers a new representation of the world that we implicitly compare to our experience of the world in itself, but also through other media.", -1 /* HOISTED */);
const _hoisted_5$h = /*#__PURE__*/createBaseVNode("p", null, [
  /*#__PURE__*/createBaseVNode("a", {
    href: "https://realitymedia.digital",
    target: "_blank"
  }, " Start at the reality media site. "),
  /*#__PURE__*/createTextVNode(" | ")
], -1 /* HOISTED */);

var script$1d = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$1d, [
    createBaseVNode("div", _hoisted_2$1d, [
      createVNode(script$1i, { msg: "AR & VR as reality media" }),
      _hoisted_3$w,
      _hoisted_4$r
    ]),
    _hoisted_5$h
  ]))
}
}

};

class HubsApp$1d extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$1d, width, height, params);
        this.isInteractive = true;
    }
}
var init$1d = function (params = {}) {
    let app = new HubsApp$1d(300, 475, params);
    app.mount();
    return app;
};

var _imports_0$t = "https://resources.realitymedia.digital/vue-apps/dist/7ab3d86afd48dbfb.jpg";

const _hoisted_1$1c = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$1c = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$t,
    width: "250"
  }),
  /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Film became one of the most important reality media of the twentieth century, and in some ways, it is a forerunner of virtual reality.")
], -1 /* HOISTED */);

var script$1c = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$1c, [
    createVNode(script$1i, { msg: "The LaCiotat Effect" }),
    _hoisted_2$1c
  ]))
}
}

};

class HubsApp$1c extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$1c, width, height, params);
        //this.isInteractive = true;
    }
}
var init$1c = function (params = {}) {
    let app = new HubsApp$1c(300, 475, params);
    app.mount();
    return app;
};

var _imports_0$s = "https://resources.realitymedia.digital/vue-apps/dist/91fdfa811e752dc8.jpg";

const _hoisted_1$1b = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$1b = { class: "spacer" };
const _hoisted_3$v = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$s,
  width: "200"
}, null, -1 /* HOISTED */);
const _hoisted_4$q = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "3-D computer graphics help to construct the visual realities of AR and VR, that is photorealism. The uncanny valley.", -1 /* HOISTED */);

var script$1b = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$1b, [
    createBaseVNode("div", _hoisted_2$1b, [
      createVNode(script$1i, { msg: "3-D Graphics & Tracking" }),
      _hoisted_3$v,
      _hoisted_4$q
    ])
  ]))
}
}

};

class HubsApp$1b extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$1b, width, height, params);
        // this.isInteractive = true;
    }
}
var init$1b = function (params = {}) {
    let app = new HubsApp$1b(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$1a = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$1a = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createCommentVNode("<img src=\"../../assets/images/parthenon.png\" width=\"250\">"),
  /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Presence in VR is usually conceived of as forgetting that the medium is there. The idea is that if the user can be enticed into behaving as if she were not aware of all the complex technology, then she feels presence.")
], -1 /* HOISTED */);

var script$1a = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$1a, [
    createVNode(script$1i, { msg: "Presence" }),
    _hoisted_2$1a
  ]))
}
}

};

class HubsApp$1a extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$1a, width, height, params);
        //this.isInteractive = true;
    }
}
var init$1a = function (params = {}) {
    let app = new HubsApp$1a(300, 475, params);
    app.mount();
    return app;
};

var _imports_0$r = "https://resources.realitymedia.digital/vue-apps/dist/dc05c04546a69e64.png";

const _hoisted_1$19 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$19 = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$r,
    width: "250"
  }),
  /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Reality media applications often function as additions to established genres. Most current AR and VR applications behave like applications or artifacts that we know from earlier media.")
], -1 /* HOISTED */);

var script$19 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$19, [
    createVNode(script$1i, { msg: "Genres" }),
    _hoisted_2$19
  ]))
}
}

};

class HubsApp$19 extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$19, width, height, params);
        //this.isInteractive = true;
    }
}
var init$19 = function (params = {}) {
    let app = new HubsApp$19(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$18 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$18 = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$r,
    width: "250"
  }),
  /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "VR will continue to construct special realities, apart from the everyday. VR worlds will continue to be metaphoric worlds.")
], -1 /* HOISTED */);

var script$18 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$18, [
    createVNode(script$1i, { msg: "The Future of AR & VR" }),
    _hoisted_2$18
  ]))
}
}

};

class HubsApp$18 extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$18, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$18 = function (params = {}) {
    let app = new HubsApp$18(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$17 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$17 = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Pervasive, always-on AR applications have the potential to provide companies or government authorities even more information and with more precision than our current mobile applications do, both by aggregating our habits as consumers and by identifying us as individuals.")
], -1 /* HOISTED */);

var script$17 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$17, [
    createVNode(script$1i, { msg: "Privacy and Public Space" }),
    _hoisted_2$17
  ]))
}
}

};

class HubsApp$17 extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$17, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$17 = function (params = {}) {
    let app = new HubsApp$17(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$16 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$16 = /*#__PURE__*/createBaseVNode("div", { class: "postertitle" }, "AR & VR as reality media", -1 /* HOISTED */);
const _hoisted_3$u = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);
const _hoisted_4$p = [
  _hoisted_2$16,
  _hoisted_3$u
];

var script$16 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$16, _hoisted_4$p))
}
}

};

class HubsApp$16 extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$16, width, height, params);
        // this.isInteractive = true;
    }
}
var init$16 = function (params = {}) {
    let app = new HubsApp$16(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$15 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$15 = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$15 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$15, [
    createVNode(script$1i, { msg: "The History of Reality Media" }),
    _hoisted_2$15
  ]))
}
}

};

class HubsApp$15 extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$15, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$15 = function (params = {}) {
    let app = new HubsApp$15(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$14 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$14 = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$14 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$14, [
    createVNode(script$1i, { msg: "3-D & Tracking" }),
    _hoisted_2$14
  ]))
}
}

};

class HubsApp$14 extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$14, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$14 = function (params = {}) {
    let app = new HubsApp$14(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$13 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$13 = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$13 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$13, [
    createVNode(script$1i, { msg: "Presence" }),
    _hoisted_2$13
  ]))
}
}

};

class HubsApp$13 extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$13, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$13 = function (params = {}) {
    let app = new HubsApp$13(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$12 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$12 = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$12 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$12, [
    createVNode(script$1i, { msg: "Genres" }),
    _hoisted_2$12
  ]))
}
}

};

class HubsApp$12 extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$12, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$12 = function (params = {}) {
    let app = new HubsApp$12(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$11 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$11 = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$11 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$11, [
    createVNode(script$1i, { msg: "Future" }),
    _hoisted_2$11
  ]))
}
}

};

class HubsApp$11 extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$11, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$11 = function (params = {}) {
    let app = new HubsApp$11(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$10 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$10 = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$10 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$10, [
    createVNode(script$1i, { msg: "Privacy" }),
    _hoisted_2$10
  ]))
}
}

};

class HubsApp$10 extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$10, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$10 = function (params = {}) {
    let app = new HubsApp$10(300, 475, params);
    app.mount();
    return app;
};

var _imports_0$q = "https://resources.realitymedia.digital/vue-apps/dist/190994370aebe395.png";

const _hoisted_1$$ = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$$ = { class: "spacer" };
const _hoisted_3$t = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$q,
  width: "400"
}, null, -1 /* HOISTED */);
const _hoisted_4$o = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$g = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_6$9 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createTextVNode(" First person shooter games such as "),
  /*#__PURE__*/createBaseVNode("a", {
    href: "https://www.half-life.com/en/alyx/",
    target: "_blank"
  }, "HalfLife: Alyx "),
  /*#__PURE__*/createTextVNode(" have long used 3-D graphics to create an immersive experience for millions of players. And for decades, players on computers and game consoles have yearned for true VR so that they could fall through the screen into the worlds on the other side.")
], -1 /* HOISTED */);

var script$$ = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$$, [
      createBaseVNode("div", _hoisted_2$$, [
        _hoisted_3$t,
        _hoisted_4$o,
        _hoisted_5$g,
        createVNode(script$1i, { msg: "HalfLife: Alyx" }),
        _hoisted_6$9
      ])
    ])
  ]))
}
}

};

class HubsApp$$ extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$$, width, height, params);
        this.isInteractive = true;
    }
}
var init$$ = function (params = {}) {
    let app = new HubsApp$$(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$_ = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$_ = { class: "spacer" };
const _hoisted_3$s = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Pokemon Go (2016) is perhaps still the best-known AR game. The Pokemon franchise was already decades old, and this was certainly part of the answer for the AR game’s surprising impact. It was the first Pokemon game on a mobile phone and the first free Pokemon game on any platform. ", -1 /* HOISTED */);

var script$_ = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$_, [
    createBaseVNode("div", _hoisted_2$_, [
      createVNode(script$1i, { msg: "Pokemon Go" }),
      _hoisted_3$s
    ])
  ]))
}
}

};

class HubsApp$_ extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$_, width, height, params);
        //     this.isInteractive = true;
    }
}
var init$_ = function (params = {}) {
    let app = new HubsApp$_(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$Z = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$Z = { class: "spacer" };
const _hoisted_3$r = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Beat Saber is a VR rhythm game with a little Star Wars thrown in. The player uses lightsabers to keep the beat. ", -1 /* HOISTED */);

var script$Z = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$Z, [
    createBaseVNode("div", _hoisted_2$Z, [
      createVNode(script$1i, { msg: "Beat Saber" }),
      _hoisted_3$r
    ])
  ]))
}
}

};

class HubsApp$Z extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$Z, width, height, params);
        // this.isInteractive = true;
    }
}
var init$Z = function (params = {}) {
    let app = new HubsApp$Z(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$Y = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$Y = { class: "spacer" };
const _hoisted_3$q = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "In this AR version of the transmedia franchise GPS is used to determine your location in the world. Your location and the zombies appear in an enhanced Google Maps map on the phone screen. ", -1 /* HOISTED */);

var script$Y = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$Y, [
    createBaseVNode("div", _hoisted_2$Y, [
      createVNode(script$1i, { msg: "Walking Dead: Our World" }),
      _hoisted_3$q
    ])
  ]))
}
}

};

class HubsApp$Y extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$Y, width, height, params);
        // this.isInteractive = true;
    }
}
var init$Y = function (params = {}) {
    let app = new HubsApp$Y(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$X = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$X = { class: "spacer" };
const _hoisted_3$p = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Like video games and 360-degree video, VR art emphasizes immersion as the feature that makes the experience unique, as in a VR work by Christian Lemmerz entitled La Apparizione (2017). ", -1 /* HOISTED */);

var script$X = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$X, [
    createBaseVNode("div", _hoisted_2$X, [
      createVNode(script$1i, { msg: "La Apparizione" }),
      _hoisted_3$p
    ])
  ]))
}
}

};

class HubsApp$X extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$X, width, height, params);
        //this.isInteractive = true;
    }
}
var init$X = function (params = {}) {
    let app = new HubsApp$X(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$W = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$W = { class: "spacer" };
const _hoisted_3$o = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Minecraft VR is a fully immersive, headset version of the sandbox game that already runs on computers, game consoles, and mobile devices. It is called a \"sandbox game\" because it provides an independent environment in which players can make their own structures and objects out of virtual, LEGO-like blocks. ", -1 /* HOISTED */);

var script$W = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$W, [
    createBaseVNode("div", _hoisted_2$W, [
      createVNode(script$1i, { msg: "Minecraft VR" }),
      _hoisted_3$o
    ])
  ]))
}
}

};

class HubsApp$W extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$W, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$W = function (params = {}) {
    let app = new HubsApp$W(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$V = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$V = { class: "spacer headline" };

var script$V = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$V, [
    createBaseVNode("div", _hoisted_2$V, [
      createVNode(script$1i, { msg: "AR & VR GAMES" })
    ])
  ]))
}
}

};

class HubsApp$V extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$V, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$V = function (params = {}) {
    let app = new HubsApp$V(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$U = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$U = { class: "spacer headline" };

var script$U = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$U, [
    createBaseVNode("div", _hoisted_2$U, [
      createVNode(script$1i, { msg: "AR & VR ART" })
    ])
  ]))
}
}

};

class HubsApp$U extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$U, width, height, params);
        //        this.isInteractive = true;
    }
}
var init$U = function (params = {}) {
    let app = new HubsApp$U(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$T = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$T = { class: "spacer" };
const _hoisted_3$n = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$n = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$f = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Presence is the absence of mediation. If the users can forget that the medium is there, then they feel presence. ", -1 /* HOISTED */);

var script$T = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$T, [
      createBaseVNode("div", _hoisted_2$T, [
        _hoisted_3$n,
        _hoisted_4$n,
        createVNode(script$1i, { msg: "Presence" }),
        _hoisted_5$f
      ])
    ])
  ]))
}
}

};

class HubsApp$T extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$T, width, height, params);
        //this.isInteractive = true;
    }
}
var init$T = function (params = {}) {
    let app = new HubsApp$T(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$S = /*#__PURE__*/createStaticVNode("<div id=\"room\" class=\"darkwall\"><div class=\"spacer\"><br><br><!-- &lt;Title msg=&quot;Aura&quot; /&gt; --><div class=\"headline\">Aura</div><br><br><div class=\"squareoff\"><p>In 1930s, Walter Benjamin introduced the concept of <em>aura</em> in The Work of Art in the Age of Mechanical Reproduction. Aura is the <em>here and now</em> that work possesses because of its unique history of production and transmissinowon. </p><p>AR applications are not perfect reproductive technologies, as some draw on the physical and cultural uniquesness, <em>the here and now</em> of particular places </p></div></div></div>", 1);
const _hoisted_2$S = [
  _hoisted_1$S
];

var script$S = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$S))
}
}

};

class HubsApp$S extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$S, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$S = function (params = {}) {
    let app = new HubsApp$S(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$R = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$R = { class: "spacer" };
const _hoisted_3$m = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$m = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$e = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "\"Casa Batlló, one of the masterpieces of Antoni Gaudí, can be experienced with the mobile AR, which visualizes the reconstructed interior and the design inspirations through 3D animations.\"", -1 /* HOISTED */);

var script$R = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$R, [
      createBaseVNode("div", _hoisted_2$R, [
        createVNode(script$1i, { msg: "Gaudí's Casa Batlló with AR" }),
        _hoisted_3$m,
        _hoisted_4$m,
        _hoisted_5$e
      ])
    ])
  ]))
}
}

};

class HubsApp$R extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$R, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$R = function (params = {}) {
    let app = new HubsApp$R(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$p = "https://resources.realitymedia.digital/vue-apps/dist/b9a307db3b6157e0.jpg";

const _hoisted_1$Q = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$p,
    class: "full"
  })
], -1 /* HOISTED */);
const _hoisted_2$Q = [
  _hoisted_1$Q
];

var script$Q = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$Q))
}
}

};

class HubsApp$Q extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$Q, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$Q = function (params = {}) {
    let app = new HubsApp$Q(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$P = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$P = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createTextVNode(" The term cybersickness, or visually induced motion sickness, has been coined to describe symptoms including headache, nausea, eye strain, dizziness, fatigue, or even vomiting that may occur during or after exposure to a virtual environment. Cybersickness is visceral evidence that VR is not the medium to end all media. Cybersickness reminds the susceptible user of the medium in a powerful way. Nausea replaces astonishment. ")
], -1 /* HOISTED */);

var script$P = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$P, [
      createVNode(script$1i, { msg: "Cybersickness and the negattion of presence" }),
      _hoisted_2$P
    ])
  ]))
}
}

};

class HubsApp$P extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$P, width, height, params);
        //    this.isInteractive = true;
    }
}
var init$P = function (params = {}) {
    let app = new HubsApp$P(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$o = "https://resources.realitymedia.digital/vue-apps/dist/b92c5f5aa0792665.jpg";

const _hoisted_1$O = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$o,
    class: "full"
  })
], -1 /* HOISTED */);
const _hoisted_2$O = [
  _hoisted_1$O
];

var script$O = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$O))
}
}

};

class HubsApp$O extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$O, width, height, params);
        //    this.isInteractive = true;
    }
}
var init$O = function (params = {}) {
    let app = new HubsApp$O(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$N = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$N = { class: "spacer" };
const _hoisted_3$l = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$l = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$d = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_6$8 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Researchers have long pursued the idea of emotional reactions such as empathy as a test of presence. VR is understood as getting us closer to the authentic or the real. But forgetting the medium is not necessary for a sense of presence. Presence can be understood in a more nuanced way as a liminal zone between forgetting and acknowledging VR as a medium. ", -1 /* HOISTED */);

var script$N = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$N, [
      createBaseVNode("div", _hoisted_2$N, [
        _hoisted_3$l,
        _hoisted_4$l,
        createVNode(script$1i, { msg: "Presence and Empathy" }),
        _hoisted_5$d,
        _hoisted_6$8
      ])
    ])
  ]))
}
}

};

class HubsApp$N extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$N, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$N = function (params = {}) {
    let app = new HubsApp$N(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$M = /*#__PURE__*/createBaseVNode("div", {
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
const _hoisted_2$M = [
  _hoisted_1$M
];

var script$M = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$M))
}
}

};

class HubsApp$M extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$M, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$M = function (params = {}) {
    let app = new HubsApp$M(600, 475, params);
    app.mount();
    return app;
};

var _imports_1$1 = "https://resources.realitymedia.digital/vue-apps/dist/beb618ffe3769bb6.png";

var _imports_1 = "https://resources.realitymedia.digital/vue-apps/dist/bf21f3442d3fa84d.png";

const _hoisted_1$L = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("div", {
      class: "largerText",
      style: {"font-weight":"bold","text-align":"left"}
    }, "1. What is Presence?"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_1$1,
      width: "50",
      style: {"float":"right"}
    }),
    /*#__PURE__*/createBaseVNode("div", {
      class: "postertitle",
      style: {"text-align":"left"}
    }, "2. Manifestations of Presence"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_1,
      width: "50",
      style: {"float":"right"}
    }),
    /*#__PURE__*/createBaseVNode("div", {
      class: "postertitle",
      style: {"text-align":"left"}
    }, "3. Aura, Place and Space ")
  ])
], -1 /* HOISTED */);
const _hoisted_2$L = [
  _hoisted_1$L
];

var script$L = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$L))
}
}

};

class HubsApp$L extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$L, width, height, params);
        //     this.isInteractive = true;
    }
}
var init$L = function (params = {}) {
    let app = new HubsApp$L(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$n = "https://resources.realitymedia.digital/vue-apps/dist/46d7793fa7ab24ad.png";

const _hoisted_1$K = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("div", { style: {"font-size":"2.4rem","font-weight":"bold","text-align":"left"} }, "2. Manifestations of Presence"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$n,
      width: "50",
      style: {"float":"right"}
    }),
    /*#__PURE__*/createBaseVNode("div", {
      class: "postertitle",
      style: {"text-align":"left"}
    }, "1. What is Presence?"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_1$1,
      width: "50",
      style: {"float":"right"}
    }),
    /*#__PURE__*/createBaseVNode("div", {
      class: "postertitle",
      style: {"text-align":"left"}
    }, "3. Aura, Place and Space ")
  ])
], -1 /* HOISTED */);
const _hoisted_2$K = [
  _hoisted_1$K
];

var script$K = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$K))
}
}

};

class HubsApp$K extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$K, width, height, params);
        //     this.isInteractive = true;
    }
}
var init$K = function (params = {}) {
    let app = new HubsApp$K(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$m = "https://resources.realitymedia.digital/vue-apps/dist/f89cb4e350469b14.png";

const _hoisted_1$J = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("div", {
      class: "largerText",
      style: {"font-size":"2.8rem","font-weight":"bold","text-align":"left"}
    }, "3. Aura, Place and Space "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$m,
      width: "50",
      style: {"float":"right"}
    }),
    /*#__PURE__*/createBaseVNode("div", {
      class: "postertitle",
      style: {"text-align":"left"}
    }, "1. What is Presence?"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_1$1,
      width: "50",
      style: {"float":"right"}
    }),
    /*#__PURE__*/createBaseVNode("div", {
      class: "postertitle",
      style: {"text-align":"left"}
    }, "2. Manifestations of Presence")
  ])
], -1 /* HOISTED */);
const _hoisted_2$J = [
  _hoisted_1$J
];

var script$J = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$J))
}
}

};

class HubsApp$J extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$J, width, height, params);
        //     this.isInteractive = true;
    }
}
var init$J = function (params = {}) {
    let app = new HubsApp$J(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$l = "https://resources.realitymedia.digital/vue-apps/dist/4905757374923259.png";

const _hoisted_1$I = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$I = { class: "spacer" };
const _hoisted_3$k = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$k = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$c = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$l,
  width: "20",
  style: {"float":"left","margin":"10px"}
}, null, -1 /* HOISTED */);
const _hoisted_6$7 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_7$5 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_8$1 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createTextVNode("360"),
  /*#__PURE__*/createBaseVNode("span", null, "°"),
  /*#__PURE__*/createTextVNode(" film Clouds Over Sidra created by Chris Milk and Gabo Arora shows the life of Syrian refugees in Za'atari camp in Jordan. The camera follows 12-year old Sidra in her everyday life, allowing the users to be present with Sidra. ")
], -1 /* HOISTED */);
const _hoisted_9$1 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_10 = /*#__PURE__*/createBaseVNode("blockquote", { class: "squareoff" }, "\"When you’re inside of the headset . . . you see full 360 degrees, in all directions. And when you’re sitting there in her room, watching her, you're not watching it through a television screen, you’re not watching it through a window, you’re sitting there with her. When you look down, you're sitting on the same ground that she’s sitting on. And because of that, you feel her humanity in a deeper way. You empathize with her in a deeper way. (Milk 2015)\"", -1 /* HOISTED */);

var script$I = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$I, [
      createBaseVNode("div", _hoisted_2$I, [
        _hoisted_3$k,
        _hoisted_4$k,
        _hoisted_5$c,
        createVNode(script$1i, { msg: "Ultimate Empathy Machine" }),
        _hoisted_6$7,
        _hoisted_7$5,
        _hoisted_8$1,
        _hoisted_9$1,
        _hoisted_10
      ])
    ])
  ]))
}
}

};

class HubsApp$I extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$I, width, height, params);
        //    this.isInteractive = true;
    }
}
var init$I = function (params = {}) {
    let app = new HubsApp$I(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$k = "https://resources.realitymedia.digital/vue-apps/dist/b464dbe90d6133ab.jpg";

const _hoisted_1$H = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$k,
    style: {"width":"100%"}
  })
], -1 /* HOISTED */);
const _hoisted_2$H = [
  _hoisted_1$H
];

var script$H = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$H))
}
}

};

class HubsApp$H extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$H, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$H = function (params = {}) {
    let app = new HubsApp$H(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$j = "https://resources.realitymedia.digital/vue-apps/dist/1393d7e62ef7aa8a.jpg";

const _hoisted_1$G = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$j,
    class: "full"
  })
], -1 /* HOISTED */);
const _hoisted_2$G = [
  _hoisted_1$G
];

var script$G = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$G))
}
}

};

class HubsApp$G extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$G, width, height, params);
        //   this.isInteractive = true;
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
const _hoisted_2$F = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_3$j = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$j = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createTextVNode("Nonnie de la Peña's "),
  /*#__PURE__*/createBaseVNode("a", {
    href: "https://embed.ted.com/talks/nonny_de_la_pena_the_future_of_news_virtual_reality",
    target: "_blank"
  }, "Ted Talk"),
  /*#__PURE__*/createTextVNode(" called 'The future of news?'' introduces a new form of journalism where Virtual Reality technology is used to put audience inside the stories. In her work, she created VR stories about imprisonment in Guantanamo and hunger in Los Angeles to induce empathy in the audience.")
], -1 /* HOISTED */);

var script$F = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$F, [
      createVNode(script$1i, { msg: "The future of news?" }),
      _hoisted_2$F,
      _hoisted_3$j,
      _hoisted_4$j
    ])
  ]))
}
}

};

class HubsApp$F extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$F, width, height, params);
        this.isInteractive = true;
    }
}
var init$F = function (params = {}) {
    let app = new HubsApp$F(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$i = "https://resources.realitymedia.digital/vue-apps/dist/b3933ff359f949ba.png";

const _hoisted_1$E = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$i,
    style: {"width":"100%"}
  })
], -1 /* HOISTED */);
const _hoisted_2$E = [
  _hoisted_1$E
];

var script$E = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$E))
}
}

};

class HubsApp$E extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$E, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$E = function (params = {}) {
    let app = new HubsApp$E(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$D = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "The pit experiment is a virtual experiement often used to evaluate the sence of presence. The user is given a task to grab an object on plank and take it to the other side, crossing the pit. ")
], -1 /* HOISTED */);
const _hoisted_2$D = [
  _hoisted_1$D
];

var script$D = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$D))
}
}

};

class HubsApp$D extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$D, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$D = function (params = {}) {
    let app = new HubsApp$D(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$h = "https://resources.realitymedia.digital/vue-apps/dist/2176dc66f5a02546.png";

const _hoisted_1$C = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$h,
    class: "full"
  })
], -1 /* HOISTED */);
const _hoisted_2$C = [
  _hoisted_1$C
];

var script$C = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$C))
}
}

};

class HubsApp$C extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$C, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$C = function (params = {}) {
    let app = new HubsApp$C(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$B = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
    /*#__PURE__*/createBaseVNode("div", { style: {"font-weight":"bold"} }, "Presence in AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createTextVNode(" This experiment was inspired by the VR \"pit\" experiment described on the wall to your right. The subjects wore AR headsets instead of VR ones. They could see the room around them, but the pit itself was still virtual. Would the subjects would feel the same measurable anxiety in AR as in VR? The subjects filled out a questionnaire after the experience and indicated that they did have a feeling of presence, but in this case, unlike in the VR experiment, the physiological data (heart rate etc.) did not indicate a response. "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createTextVNode(" Gandy, Maribeth, et al. 2010. “Experiences with an AR Evaluation Test Bed: Presence, Performance, and Physiological Measurement.” In 2010 IEEE International Symposium on Mixed and Augmented Reality, 127–36. Seoul, Korea (South): IEEE. https://doi.org/10.1109/ISMAR.2010.5643560. ")
  ])
], -1 /* HOISTED */);
const _hoisted_2$B = [
  _hoisted_1$B
];

var script$B = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$B))
}
}

};

class HubsApp$B extends HubsApp$1j {
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

var _imports_0$g = "https://resources.realitymedia.digital/vue-apps/dist/dedcb7f162af5eae.jpg";

const _hoisted_1$A = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$g,
    class: "full"
  })
], -1 /* HOISTED */);
const _hoisted_2$A = [
  _hoisted_1$A
];

var script$A = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$A))
}
}

};

class HubsApp$A extends HubsApp$1j {
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

const _hoisted_1$z = /*#__PURE__*/createStaticVNode("<div id=\"room\" class=\"darkwall\"><div class=\"postertitle\">Presence</div><div class=\"squareoff\">Presence is a kind of absence, the absence of mediation. If the users can forget that the medium is there, then they feel presence. <br><br> To look further, Lombard and Ditton&#39;s classification of presence is useful. They grouped definitions of presence into two categories, which are <br><br><div class=\"keyPoint\"> (1) individual perception of the world <br> (2) social interaction and engagement with others</div><br><br> The first category includes presence as transportation, as immersion and as realism. </div><br><br><div class=\"squareoff\" style=\"font-style:italic;\">&quot;VR and AR cannot deceive their users into believing that they are having a non-mediated experience. But that is not necessary for a sense of presence.&quot;</div></div>", 1);
const _hoisted_2$z = [
  _hoisted_1$z
];

var script$z = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$z))
}
}

};

class HubsApp$z extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$z, width, height, params);
        //  this.isInteractive = true;
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
const _hoisted_3$i = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$i = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$b = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_6$6 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_7$4 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createTextVNode("Treehugger: Wawona VR experience transports the users to the red giant Sequoia trees from the Sequoia National Park. It provides a sense of intimacy with the tree - with its bark, with the cells that make up its being. The vividness of the work illustrates "),
  /*#__PURE__*/createBaseVNode("em", null, "presence"),
  /*#__PURE__*/createTextVNode(". ")
], -1 /* HOISTED */);

var script$y = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$y, [
      createBaseVNode("div", _hoisted_2$y, [
        _hoisted_3$i,
        _hoisted_4$i,
        createVNode(script$1i, { msg: "Treehugger: Wawona" }),
        _hoisted_5$b,
        _hoisted_6$6,
        _hoisted_7$4,
        createCommentVNode(" In this experience, users find themselves on the threshold of forgetting that we are having a VR experience. Being on that threshold is a sence of presence in a reality medium. ")
      ])
    ])
  ]))
}
}

};

class HubsApp$y extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$y, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$y = function (params = {}) {
    let app = new HubsApp$y(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$f = "https://resources.realitymedia.digital/vue-apps/dist/273dec47ec76230d.png";

const _hoisted_1$x = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$f,
      style: {"width":"450px"}
    })
  ])
], -1 /* HOISTED */);
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

class HubsApp$x extends HubsApp$1j {
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

const _hoisted_1$w = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$w = { class: "spacer" };
const _hoisted_3$h = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$h = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);

var script$w = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$w, [
      createBaseVNode("div", _hoisted_2$w, [
        _hoisted_3$h,
        _hoisted_4$h,
        createVNode(script$1i, { msg: "Back to the main exhibition" })
      ])
    ])
  ]))
}
}

};

class HubsApp$w extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$w, width, height, params);
        // this.isInteractive = true;
    }
}
var init$w = function (params = {}) {
    let app = new HubsApp$w(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$e = "https://resources.realitymedia.digital/vue-apps/dist/900c5c33cb50b0df.png";

const _hoisted_1$v = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$e,
    class: "full"
  })
], -1 /* HOISTED */);
const _hoisted_2$v = [
  _hoisted_1$v
];

var script$v = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$v))
}
}

};

class HubsApp$v extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$v, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$v = function (params = {}) {
    let app = new HubsApp$v(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$d = "https://resources.realitymedia.digital/vue-apps/dist/86eb12e74d9f7d2e.png";

const _hoisted_1$u = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$d,
    class: "full"
  })
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

class HubsApp$u extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$u, width, height, params);
        //    this.isInteractive = true;
    }
}
var init$u = function (params = {}) {
    let app = new HubsApp$u(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$t = /*#__PURE__*/createBaseVNode("div", {
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

class HubsApp$t extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$t, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$t = function (params = {}) {
    let app = new HubsApp$t(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$c = "https://resources.realitymedia.digital/vue-apps/dist/a7d1244c4b23b7b0.jpg";

const _hoisted_1$s = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$c,
    class: "full"
  })
], -1 /* HOISTED */);
const _hoisted_2$s = [
  _hoisted_1$s
];

var script$s = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$s))
}
}

};

class HubsApp$s extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$s, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$s = function (params = {}) {
    let app = new HubsApp$s(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$r = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$r = { class: "spacer" };
const _hoisted_3$g = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$g = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$a = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "\"The Franklin Institute is using AR to enhance their Terracotta Warrior exhibition which were displayed in Philadelphia until March 2018. The museum’s app, powered by Wikitude technology, allows visitors to use their smartphone to scan items and visualize rich AR content to learn even more about the intriguing history behind the magnificent clay soldiers.\"", -1 /* HOISTED */);

var script$r = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$r, [
      createBaseVNode("div", _hoisted_2$r, [
        createVNode(script$1i, { msg: "Terracotta Warriors AR" }),
        _hoisted_3$g,
        _hoisted_4$g,
        _hoisted_5$a
      ])
    ])
  ]))
}
}

};

class HubsApp$r extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$r, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$r = function (params = {}) {
    let app = new HubsApp$r(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$q = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createCommentVNode("<img src=\"../../../assets/images/Room6/treehugger2.jpg\" width=\"600\" >")
  ])
], -1 /* HOISTED */);
const _hoisted_2$q = [
  _hoisted_1$q
];

var script$q = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$q))
}
}

};

class HubsApp$q extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$q, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$q = function (params = {}) {
    let app = new HubsApp$q(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$p = { id: "room" };
const _hoisted_2$p = { class: "spacer" };
const _hoisted_3$f = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$f = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$9 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_6$5 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_7$3 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createTextVNode("Measuring the amount of presence or the sense of being there, is one of the few ways to assess the quality of a virtual space. This virtual pit experiment is a space that measures the presence by measuring changes in physiological reactions in users such as changes in heart rate. In this virtual room, feel whether your heart is beating faster or your hands get sweaty as if you are in a real space. "),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createTextVNode(" Meehan, M., Insko, B., Whitton, M., & Brooks Jr, F. P. (2002). Physiological measures of presence in stressful virtual environments. Acm transactions on graphics (tog), 21(3), 645-652. "),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("br")
], -1 /* HOISTED */);

var script$p = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$p, [
      createBaseVNode("div", _hoisted_2$p, [
        _hoisted_3$f,
        _hoisted_4$f,
        createVNode(script$1i, { msg: "Pit Experiment" }),
        _hoisted_5$9,
        _hoisted_6$5,
        _hoisted_7$3
      ])
    ])
  ]))
}
}

};

class HubsApp$p extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$p, width, height, params);
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
const _hoisted_4$e = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$8 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_6$4 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_7$2 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createTextVNode("1. Pick up a virtual book in this room and place it in the designated area on the far side of the Pit room. "),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createTextVNode(" 2. Pick up a blue ball and drop it on a blue target on the floor of the Pit room. "),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createTextVNode(" Head-Mounted Display devices such as Oculus are recommended for this experiment. ")
], -1 /* HOISTED */);
const _hoisted_8 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_9 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);

var script$o = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$o, [
      createBaseVNode("div", _hoisted_2$o, [
        _hoisted_3$e,
        _hoisted_4$e,
        createVNode(script$1i, { msg: "Instructions" }),
        _hoisted_5$8,
        _hoisted_6$4,
        _hoisted_7$2,
        _hoisted_8,
        _hoisted_9
      ])
    ])
  ]))
}
}

};

class HubsApp$o extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$o, width, height, params);
    }
}
var init$o = function (params = {}) {
    let app = new HubsApp$o(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$n = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$n = { class: "spacer" };
const _hoisted_3$d = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$d = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);

var script$n = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$n, [
      createBaseVNode("div", _hoisted_2$n, [
        _hoisted_3$d,
        _hoisted_4$d,
        createVNode(script$1i, { msg: "Very carefully stretch your arms out for balance." })
      ])
    ])
  ]))
}
}

};

class HubsApp$n extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$n, width, height, params);
    }
}
var init$n = function (params = {}) {
    let app = new HubsApp$n(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$m = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$m = { class: "spacer" };
const _hoisted_3$c = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$c = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);

var script$m = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$m, [
      createBaseVNode("div", _hoisted_2$m, [
        _hoisted_3$c,
        _hoisted_4$c,
        createVNode(script$1i, { msg: "Does this experiment make you sweat or your heart beat faster?" })
      ])
    ])
  ]))
}
}

};

class HubsApp$m extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$m, width, height, params);
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
const _hoisted_3$b = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$b = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);

var script$l = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$l, [
      createBaseVNode("div", _hoisted_2$l, [
        _hoisted_3$b,
        _hoisted_4$b,
        createVNode(script$1i, { msg: "Presence Gallery" })
      ])
    ])
  ]))
}
}

};

class HubsApp$l extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$l, width, height, params);
    }
}
var init$l = function (params = {}) {
    let app = new HubsApp$l(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$k = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$k = { class: "spacer" };
const _hoisted_3$a = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$a = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$7 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createBaseVNode("i", null, "Reality Media"),
  /*#__PURE__*/createTextVNode(" is a project encompassing three writing spaces, three technologies for representing ideas: print, the web, and immersive VR. The printed page is a writing space with a tradition dating back to the fifteenth century (in Europe, much earlier in China). Obviously the web has a far shorter tradition, beginning around 1990. But in the thirty year since Tim Berners-Lee launched the first web server, the web has grown to rival print for many kinds of communication. The technologies for creating 3D graphic spaces in VR (and AR) actually predate the web. But only in the past 10 years have AR and VR become widely available media. The goal of RealityMedia is to demonstrate the potential range of AR and VR as communicative forms. ")
], -1 /* HOISTED */);

var script$k = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$k, [
      createBaseVNode("div", _hoisted_2$k, [
        createVNode(script$1i, { msg: "Welcome to Reality Media!" }),
        _hoisted_3$a,
        _hoisted_4$a,
        _hoisted_5$7
      ])
    ])
  ]))
}
}

};

class HubsApp$k extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$k, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$k = function (params = {}) {
    let app = new HubsApp$k(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$b = "https://resources.realitymedia.digital/vue-apps/dist/7a24a6d309d453f2.jpg";

const _hoisted_1$j = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$j = { class: "spacer" };
const _hoisted_3$9 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$9 = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$b,
  width: "280",
  style: {"float":"left","margin-right":"20px"}
}, null, -1 /* HOISTED */);
const _hoisted_5$6 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createBaseVNode("div", { style: {"margin-left":"30px"} }, [
    /*#__PURE__*/createTextVNode("Published by "),
    /*#__PURE__*/createBaseVNode("a", { href: "https://mitpress.mit.edu/books/reality-media" }, "MIT Press")
  ]),
  /*#__PURE__*/createBaseVNode("div", { class: "oblique" }, "By Jay David Bolter, Maria Engberg and Blair MacIntyre"),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("div", { class: "quote" }, "How augmented reality and virtual reality are taking their places in contemporary media culture alongside film and television.")
], -1 /* HOISTED */);

var script$j = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$j, [
      createBaseVNode("div", _hoisted_2$j, [
        createVNode(script$1i, { msg: "Reality Media" }),
        _hoisted_3$9,
        _hoisted_4$9,
        _hoisted_5$6
      ])
    ])
  ]))
}
}

};

class HubsApp$j extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$j, width, height, params);
        this.isInteractive = true;
    }
}
var init$j = function (params = {}) {
    let app = new HubsApp$j(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$i = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$i = { class: "spacer" };
const _hoisted_3$8 = /*#__PURE__*/createBaseVNode("div", {
  class: "squareoff",
  style: {"width":"380px"}
}, [
  /*#__PURE__*/createTextVNode("Published by "),
  /*#__PURE__*/createBaseVNode("a", { href: "https://mitpress.mit.edu/books/reality-media" }, "MIT Press")
], -1 /* HOISTED */);
const _hoisted_4$8 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$5 = /*#__PURE__*/createBaseVNode("div", { class: "oblique squareoff" }, "By Jay David Bolter, Maria Engberg and Blair MacIntyre", -1 /* HOISTED */);
const _hoisted_6$3 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_7$1 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff quote" }, "\"How augmented reality and virtual reality are taking their places in contemporary media culture alongside film and television.\" ", -1 /* HOISTED */);

var script$i = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$i, [
      createBaseVNode("div", _hoisted_2$i, [
        createVNode(script$1i, { msg: "Book: Reality Media" }),
        _hoisted_3$8,
        _hoisted_4$8,
        _hoisted_5$5,
        _hoisted_6$3,
        _hoisted_7$1
      ])
    ])
  ]))
}
}

};

class HubsApp$i extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$i, width, height, params);
        this.isInteractive = true;
    }
}
var init$i = function (params = {}) {
    let app = new HubsApp$i(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$a = "https://resources.realitymedia.digital/vue-apps/dist/5b14da96e2889ff2.jpg";

const _hoisted_1$h = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$h = { class: "spacer" };
const _hoisted_3$7 = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$a,
  width: "400"
}, null, -1 /* HOISTED */);
const _hoisted_4$7 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$4 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_6$2 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
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

var script$h = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$h, [
      createBaseVNode("div", _hoisted_2$h, [
        _hoisted_3$7,
        _hoisted_4$7,
        _hoisted_5$4,
        createVNode(script$1i, { msg: "The Hubs Platform" }),
        _hoisted_6$2
      ])
    ])
  ]))
}
}

};

class HubsApp$h extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$h, width, height, params);
        this.isInteractive = true;
    }
}
var init$h = function (params = {}) {
    let app = new HubsApp$h(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$g = /*#__PURE__*/createStaticVNode("<div id=\"room\" class=\"darkwall\"><div class=\"spacer\"><div class=\"squareoff\"><br><br><br><div class=\"keyPoint\">To enter the room:</div><br> - On a desktop or mobile device, follow the prompts to select a name/avatar and enable the mic. <br> - On a VR headset, if you opened the URL on your desktop or smartphone, choose &quot;Enter on Standalone VR&quot; to create a code that makes it easy to open on your standalone headset. Open the browser in your VR headset, navigate to hubs.link and enter the code. <br><br><div class=\"keyPoint\">To navigate in Hubs:</div><br> - On desktop use your WASD or arrow keys to move around. You can also press your right mouse button to teleport to a different location. Rotate your view using the Q and E keys, or hold down your left mouse button and drag. <br> - For VR and mobile controls, see the list of <a href=\"https://hubs.mozilla.com/docs/hubs-controls.html\" target=\"blank\">Hubs controls.</a></div></div></div>", 1);
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

class HubsApp$g extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$g, width, height, params);
        this.isInteractive = true;
    }
}
var init$g = function (params = {}) {
    let app = new HubsApp$g(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$9 = "https://resources.realitymedia.digital/vue-apps/dist/5d42bc6b2a074ccd.png";

const _hoisted_1$f = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$f = { class: "spacer" };
const _hoisted_3$6 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$6 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, " The figure below indicates how to mute your microphone, take photos, share your screen, create media objects, and so on: ", -1 /* HOISTED */);
const _hoisted_5$3 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_6$1 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_7 = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$9,
  width: "400"
}, null, -1 /* HOISTED */);

var script$f = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$f, [
      createBaseVNode("div", _hoisted_2$f, [
        createVNode(script$1i, { msg: "Features in Hubs" }),
        _hoisted_3$6,
        _hoisted_4$6,
        _hoisted_5$3,
        _hoisted_6$1,
        _hoisted_7
      ])
    ])
  ]))
}
}

};

class HubsApp$f extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$f, width, height, params);
        //  this.isInteractive = true;
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
const _hoisted_3$5 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$5 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);

var script$e = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$e, [
      createBaseVNode("div", _hoisted_2$e, [
        createVNode(script$1i, { msg: "Standing on the Audio Pads will start the narration about the room or the sound of the video clip." }),
        _hoisted_3$5,
        _hoisted_4$5
      ])
    ])
  ]))
}
}

};

class HubsApp$e extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$e, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$e = function (params = {}) {
    let app = new HubsApp$e(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$8 = "https://resources.realitymedia.digital/vue-apps/dist/82a911d289cd2836.png";

const _hoisted_1$d = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$d = { class: "spacer" };
const _hoisted_3$4 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$4 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "keyPoint" }, "Visit the exhibit with friends"),
  /*#__PURE__*/createTextVNode(" Sharing the URL of the room you are currently in will allow others to join your experience. "),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("div", { class: "keyPoint" }, "Favorite your room"),
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$8,
    width: "400"
  }),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createTextVNode(" Set your room as a favorite under the 'more' menu. Then, you can easily revisit the room from the list in the 'favorite rooms'. ")
], -1 /* HOISTED */);

var script$d = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$d, [
      createBaseVNode("div", _hoisted_2$d, [
        createVNode(script$1i, { msg: "Other ways to use the room" }),
        _hoisted_3$4,
        _hoisted_4$4
      ])
    ])
  ]))
}
}

};

class HubsApp$d extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$d, width, height, params);
        //this.isInteractive = true;
    }
}
var init$d = function (params = {}) {
    let app = new HubsApp$d(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$7 = "https://resources.realitymedia.digital/vue-apps/dist/013b754af9ebcd32.png";

const _hoisted_1$c = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("div", { class: "keyPoint" }, "Here is a map, which you will also find posted through the galleries"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$7,
      width: "400"
    })
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

class HubsApp$c extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$c, width, height, params);
        //this.isInteractive = true;
    }
}
var init$c = function (params = {}) {
    let app = new HubsApp$c(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$b = /*#__PURE__*/createBaseVNode("div", {
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

class HubsApp$b extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$b, width, height, params);
        //this.isInteractive = true;
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
const _hoisted_3$3 = { href: "https://realitymedia.digital/" };
const _hoisted_4$3 = /*#__PURE__*/createBaseVNode("iframe", {
  class: "webIframe",
  src: "https://realitymedia.digital/",
  title: "realitymedia website",
  width: "1024",
  height: "768",
  style: {"-webkit-transform":"scale(0.5)"}
}, null, -1 /* HOISTED */);

var script$a = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$a, [
      createBaseVNode("div", _hoisted_2$a, [
        createBaseVNode("a", _hoisted_3$3, [
          createVNode(script$1i, { msg: "Click here to return back to the website" })
        ]),
        _hoisted_4$3
      ])
    ])
  ]))
}
}

};

class HubsApp$a extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$a, width, height, params);
        //this.isInteractive = true;
    }
}
var init$a = function () {
    let app = new HubsApp$a(600, 475);
    app.mount();
    return app;
};

var _imports_0$6 = "https://resources.realitymedia.digital/vue-apps/dist/56a868a533e19312.jpg";

const _hoisted_1$9 = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$6,
      width: "400"
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

class HubsApp$9 extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$9, width, height, params);
        //this.isInteractive = true;
    }
}
var init$9 = function (params = {}) {
    let app = new HubsApp$9(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$5 = "https://resources.realitymedia.digital/vue-apps/dist/af587fad0d60df12.jpg";

const _hoisted_1$8 = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$5,
      width: "400"
    })
  ])
], -1 /* HOISTED */);
const _hoisted_2$8 = [
  _hoisted_1$8
];

var script$8 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$8))
}
}

};

class HubsApp$8 extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$8, width, height, params);
        //this.isInteractive = true;
    }
}
var init$8 = function (params = {}) {
    let app = new HubsApp$8(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$4 = "https://resources.realitymedia.digital/vue-apps/dist/478bac09ec86f1f0.jpg";

const _hoisted_1$7 = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$4,
      width: "400"
    })
  ])
], -1 /* HOISTED */);
const _hoisted_2$7 = [
  _hoisted_1$7
];

var script$7 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$7))
}
}

};

class HubsApp$7 extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$7, width, height, params);
        //this.isInteractive = true;
    }
}
var init$7 = function (params = {}) {
    let app = new HubsApp$7(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$3 = "https://resources.realitymedia.digital/vue-apps/dist/59bf2c99f5a219c7.png";

const _hoisted_1$6 = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$3,
      width: "400"
    })
  ])
], -1 /* HOISTED */);
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

class HubsApp$6 extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$6, width, height, params);
        //this.isInteractive = true;
    }
}
var init$6 = function (params = {}) {
    let app = new HubsApp$6(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$2 = "https://resources.realitymedia.digital/vue-apps/dist/02780848b584f501.jpg";

const _hoisted_1$5 = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$2,
      width: "400"
    })
  ])
], -1 /* HOISTED */);
const _hoisted_2$5 = [
  _hoisted_1$5
];

var script$5 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$5))
}
}

};

class HubsApp$5 extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$5, width, height, params);
        //this.isInteractive = true;
    }
}
var init$5 = function (params = {}) {
    let app = new HubsApp$5(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$1 = "https://resources.realitymedia.digital/vue-apps/dist/4d13871f7b21598b.jpg";

const _hoisted_1$4 = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$1,
      width: "400"
    })
  ])
], -1 /* HOISTED */);
const _hoisted_2$4 = [
  _hoisted_1$4
];

var script$4 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$4))
}
}

};

class HubsApp$4 extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$4, width, height, params);
        //this.isInteractive = true;
    }
}
var init$4 = function (params = {}) {
    let app = new HubsApp$4(600, 475, params);
    app.mount();
    return app;
};

var _imports_0 = "https://resources.realitymedia.digital/vue-apps/dist/c7eaf0a5d9ea316f.jpg";

const _hoisted_1$3 = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0,
      width: "400"
    })
  ])
], -1 /* HOISTED */);
const _hoisted_2$3 = [
  _hoisted_1$3
];

var script$3 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$3))
}
}

};

class HubsApp$3 extends HubsApp$1j {
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

const _hoisted_1$2 = { id: "room" };
const _hoisted_2$2 = { class: "spacer" };
const _hoisted_3$2 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$2 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$2 = { class: "squareoff" };



var script$2 = {
  setup(__props) {

let params = inject("params");
var title = params && params.parameter1 ? params.parameter1 : "How to Use the Audio Pads";
var body = params && params.parameter2 ? params.parameter2 : "start the narrations about the room you are currently in";


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$2, [
      createBaseVNode("div", _hoisted_2$2, [
        createVNode(script$1i, { msg: unref(title) }, null, 8 /* PROPS */, ["msg"]),
        _hoisted_3$2,
        _hoisted_4$2,
        createBaseVNode("div", _hoisted_5$2, "Standing on the Audio Pads will " + toDisplayString(unref(body)), 1 /* TEXT */)
      ])
    ])
  ]))
}
}

};

class HubsApp$2 extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$2, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$2 = function (params = {}) {
    let app = new HubsApp$2(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$1 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$1 = { class: "spacer" };
const _hoisted_3$1 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$1 = { class: "squareoff labelTitle" };
const _hoisted_5$1 = { class: "squareoff" };
const _hoisted_6 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);



var script$1 = {
  setup(__props) {

let params = inject("params");
var title = params && params.parameter1 ? params.parameter1 : " ";
var body = params && params.parameter2 ? params.parameter2 : " ";


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$1, [
      createBaseVNode("div", _hoisted_2$1, [
        _hoisted_3$1,
        createCommentVNode("<Title v-bind:msg=\"title\" />"),
        createBaseVNode("div", _hoisted_4$1, toDisplayString(unref(title)), 1 /* TEXT */),
        createBaseVNode("div", _hoisted_5$1, toDisplayString(unref(body)), 1 /* TEXT */),
        _hoisted_6
      ])
    ])
  ]))
}
}

};

class HubsApp$1 extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script$1, width, height, params);
        //  this.isInteractive = true;
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
const _hoisted_3 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4 = { class: "squareoff titleStyle" };
const _hoisted_5 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);



var script = {
  setup(__props) {

let params = inject("params");
var title = params && params.parameter1 ? params.parameter1 : " ";


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1, [
      createBaseVNode("div", _hoisted_2, [
        _hoisted_3,
        createCommentVNode("<Title v-bind:msg=\"title\" />"),
        createBaseVNode("div", _hoisted_4, toDisplayString(unref(title)), 1 /* TEXT */),
        _hoisted_5
      ])
    ])
  ]))
}
}

};

class HubsApp extends HubsApp$1j {
    constructor(width, height, params = {}) {
        super(script, width, height, params);
        //  this.isInteractive = true;
    }
}
var init = function (params = {}) {
    let app = new HubsApp(600, 475, params);
    app.mount();
    return app;
};

export { init$9 as ARVR_monolith, init$T as ARandPresence, init$$ as Alyx, init$X as Apparizione, init$U as ArtBanner, init$2 as AudioPad, init$e as AudioText, init$S as Aura, init$a as Back, init$Z as BeatSaber, init$1d as Center1, init$1c as Center2, init$1b as Center3, init$1a as Center4, init$19 as Center5, init$18 as Center6, init$17 as Center7, init$N as Empathy, init$M as Empathy_title, init$w as Exit, init$3 as Future_monolith, init$V as GamesBanner, init$R as Gaudi, init$Q as Gaudi_pic, init$5 as Genres_monolith, init$7 as Graphics_monolith, init$8 as History_monolith, init$f as HubsFeatures, init$h as HubsPlatform, init$g as HubsPlatform2, init$1 as Label, init$v as Laciotat, init$1e as Map, init$I as Milk, init$H as Milk_pic, init$G as Milk_pic2, init$W as Minecraft, init$j as MitPress, init$i as MitText, init$16 as Monolith1, init$15 as Monolith2, init$14 as Monolith3, init$13 as Monolith4, init$12 as Monolith5, init$11 as Monolith6, init$10 as Monolith7, init$F as Nonnie, init$E as Nonnie_pic, init$b as Overview, init$t as Parthenon, init$p as Pit, init$D as PitExperiment, init$o as PitInstruction, init$B as Pit_AR, init$A as Pit_AR_pic, init$C as Pit_pic, init$u as PlaceandSpace, init$_ as Pokemon, init$1f as PortalSubtitle, init$1g as PortalTitle, init$z as Presence, init$L as Presence_map, init$K as Presence_map2, init$J as Presence_map3, init$6 as Presence_monolith, init$4 as Privacy_monolith, init$d as Sharing, init$r as Terracotta, init$s as TerracottaPic, init as Title, init$y as Treehugger, init$x as Treehugger_pic, init$q as Treehuggerpic2, init$Y as WalkingDead, init$k as Welcome, init$P as cybersickness, init$O as cybersickness_pic, init$1i as hubsTest1, init$1h as hubsTest2, initializeEthereal, init$n as pitSign1, init$m as pitSign2, init$l as pit_portal_title, init$c as rotundaMap, systemTick };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHVicy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Fzc2V0cy9sb2dvLnBuZyIsIi4uLy4uL3NyYy9jb21wb25lbnRzL05ldHdvcmtlZEhlbGxvV29ybGQudnVlIiwiLi4vLi4vc3JjL2FwcHMvVGVzdGluZy9IdWJzVGVzdDEvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Z1ZUFwcC50cyIsIi4uLy4uL3NyYy9hcHBzL0h1YnNBcHAudHMiLCIuLi8uLi9zcmMvYXBwcy9UZXN0aW5nL0h1YnNUZXN0MS9zaGFyZWQudHMiLCIuLi8uLi9zcmMvYXBwcy9UZXN0aW5nL0h1YnNUZXN0MS9odWJzLnRzIiwiLi4vLi4vc3JjL2NvbXBvbmVudHMvSGVsbG9Xb3JsZC52dWUiLCIuLi8uLi9zcmMvYXBwcy9UZXN0aW5nL0h1YnNUZXN0Mi9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvVGVzdGluZy9IdWJzVGVzdDIvc2hhcmVkLnRzIiwiLi4vLi4vc3JjL2FwcHMvVGVzdGluZy9IdWJzVGVzdDIvaHVicy50cyIsIi4uLy4uL3NyYy9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1BvcnRhbC9Qb3J0YWxUaXRsZS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUG9ydGFsL1BvcnRhbFRpdGxlL2h1YnMudHMiLCIuLi8uLi9zcmMvY29tcG9uZW50cy9DZW50ZXJTdWJ0aXRsZS52dWUiLCIuLi8uLi9zcmMvYXBwcy9Qb3J0YWwvUG9ydGFsU3VidGl0bGUvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1BvcnRhbC9Qb3J0YWxTdWJ0aXRsZS9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvcm90dW5kYS1tYXAucG5nIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyX01hcC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyX01hcC9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvbGFjaW90YXQtVlIuanBnIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyMV9JbnRyby9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyMV9JbnRyby9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvbGFjaW90YXQuanBnIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyMl9IaXN0b3J5L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXIyX0hpc3RvcnkvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL3VuY2FubnkuanBnIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyM18zRC1UcmFja2luZy9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyM18zRC1UcmFja2luZy9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyNF9QcmVzZW5jZS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyNF9QcmVzZW5jZS9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvcGFydGhlbm9uLnBuZyIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjVfR2VucmVzL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXI1X0dlbnJlcy9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyNl9GdXR1cmUvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjZfRnV0dXJlL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXI3X1ByaXZhY3kvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjdfUHJpdmFjeS9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGgxX0ludHJvL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDFfSW50cm8vaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoMl9IaXN0b3J5L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDJfSGlzdG9yeS9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGgzXzNELVRyYWNraW5nL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDNfM0QtVHJhY2tpbmcvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoNF9QcmVzZW5jZS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGg0X1ByZXNlbmNlL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDVfR2VucmVzL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDVfR2VucmVzL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDZfRnV0dXJlL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDZfRnV0dXJlL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDdfUHJpdmFjeS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGg3X1ByaXZhY3kvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb201L0FseXgtc3BsYXNoLnBuZyIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L0FseXgvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L0FseXgvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L1Bva2Vtb24vQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L1Bva2Vtb24vaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L0JlYXRTYWJlci9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvQmVhdFNhYmVyL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNS9XYWxraW5nRGVhZC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvV2Fsa2luZ0RlYWQvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L0FwcGFyaXppb25lL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNS9BcHBhcml6aW9uZS9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvTWluZWNyYWZ0L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNS9NaW5lY3JhZnQvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L0dhbWVzQmFubmVyL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNS9HYW1lc0Jhbm5lci9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvQXJ0QmFubmVyL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNS9BcnRCYW5uZXIvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0FSYW5kUHJlc2VuY2UvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0FSYW5kUHJlc2VuY2UvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0F1cmEvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0F1cmEvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0dhdWRpL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9HYXVkaS9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvUm9vbTYvQ2FzYS1iYXRsbG8uanBnIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvR2F1ZGlfcGljL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9HYXVkaV9waWMvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L2N5YmVyc2lja25lc3MvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L2N5YmVyc2lja25lc3MvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L1JpZGVWUi5qcGciLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9jeWJlcnNpY2tuZXNzX3BpYy9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvY3liZXJzaWNrbmVzc19waWMvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0VtcGF0aHkvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0VtcGF0aHkvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0VtcGF0aHlfdGl0bGUvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0VtcGF0aHlfdGl0bGUvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L3VwYXJyb3cucG5nIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvUm9vbTYvdXJhcnJvdy5wbmciLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9Sb29tNl9tYXAvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1Jvb202X21hcC9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvUm9vbTYvcmlnaHRhcnJvdy5wbmciLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9Sb29tNl9tYXBfMi9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvUm9vbTZfbWFwXzIvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L3VsYXJyb3cucG5nIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvUm9vbTZfbWFwXzMvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1Jvb202X21hcF8zL2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9Sb29tNi9sZmFycm93LnBuZyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L01pbGsvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L01pbGsvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L2Nsb3Vkb3ZlcnNpZHJhLmpwZyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L01pbGtfcGljL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9NaWxrX3BpYy9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvUm9vbTYvY2xvdWRvdmVyc2lkcmEyLmpwZyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L01pbGtfcGljMi9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvTWlsa19waWMyL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9Ob25uaWUvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L05vbm5pZS9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvUm9vbTYvbm9ubmllLnBuZyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L05vbm5pZV9waWMvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L05vbm5pZV9waWMvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1BpdEV4cGVyaW1lbnQvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1BpdEV4cGVyaW1lbnQvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L3BpdFZSLnBuZyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1BpdF9waWMvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1BpdF9waWMvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1BpdF9BUi9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvUGl0X0FSL2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9Sb29tNi9waXRBUi5qcGciLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QaXRfQVJfcGljL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QaXRfQVJfcGljL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QcmVzZW5jZS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvUHJlc2VuY2UvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1RyZWVodWdnZXIvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1RyZWVodWdnZXIvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L3RyZWVodWdnZXIucG5nIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvVHJlZWh1Z2dlcl9waWMvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1RyZWVodWdnZXJfcGljL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9FeGl0L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9FeGl0L2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9Sb29tNi9MYWNpb3RhdC5wbmciLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9MYWNpb3RhdC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvTGFjaW90YXQvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L1NwYWNlQW5kUGxhY2UucG5nIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvUGxhY2VhbmRTcGFjZS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvUGxhY2VhbmRTcGFjZS9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvUGFydGhlbm9uL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QYXJ0aGVub24vaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L3RlcnJhY290dGEuanBnIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvVGVycmFjb3R0YVBpYy9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvVGVycmFjb3R0YVBpYy9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvVGVycmFjb3R0YS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvVGVycmFjb3R0YS9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvVHJlZWh1Z2dlclBpYzIvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1RyZWVodWdnZXJQaWMyL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tX1BpdC9QaXQvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb21fUGl0L1BpdC9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbV9QaXQvUGl0SW5zdHJ1Y3Rpb24vQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb21fUGl0L1BpdEluc3RydWN0aW9uL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tX1BpdC9waXRTaWduMS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbV9QaXQvcGl0U2lnbjEvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb21fUGl0L3BpdFNpZ24yL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tX1BpdC9waXRTaWduMi9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbV9QaXQvcGl0X3BvcnRhbF90aXRsZS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbV9QaXQvcGl0X3BvcnRhbF90aXRsZS9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9XZWxjb21lL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL1dlbGNvbWUvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL09uYm9hcmRpbmcvcmVhbGl0eU1lZGlhQm9vay5qcGciLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL01pdFByZXNzL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL01pdFByZXNzL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL01pdFRleHQvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvTWl0VGV4dC9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvT25ib2FyZGluZy9Nb3ppbGxhSHVicy5qcGciLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL0h1YnNQbGF0Zm9ybS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9IdWJzUGxhdGZvcm0vaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvSHVic1BsYXRmb3JtMi9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9IdWJzUGxhdGZvcm0yL2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9PbmJvYXJkaW5nL2h1YnMtdXNlci1pbnRlcmZhY2UucG5nIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9IdWJzRmVhdHVyZXMvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvSHVic0ZlYXR1cmVzL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL0F1ZGlvVGV4dC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9BdWRpb1RleHQvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL09uYm9hcmRpbmcvZmF2b3JpdGUucG5nIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9TaGFyaW5nL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL1NoYXJpbmcvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL09uYm9hcmRpbmcvTWFwX3RyYW5zcGFyZW50LnBuZyIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvcm90dW5kYU1hcC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9yb3R1bmRhTWFwL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL092ZXJ2aWV3L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL092ZXJ2aWV3L2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL0JhY2svQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvQmFjay9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvUm90dW5kYS8xLW1pbmVjcmFmdC1hci5qcGciLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL0FSVlJfbW9ub2xpdGgvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvQVJWUl9tb25vbGl0aC9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvUm90dW5kYS8yLWJydW5lbGxlc2NoaS5qcGciLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL0hpc3RvcnlfbW9ub2xpdGgvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvSGlzdG9yeV9tb25vbGl0aC9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvUm90dW5kYS8zLXpha2ktbGl6YXJkLmpwZyIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvR3JhcGhpY3NfbW9ub2xpdGgvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvR3JhcGhpY3NfbW9ub2xpdGgvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1JvdHVuZGEvNS1wcm9tYWNob3MucG5nIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9QcmVzZW5jZV9tb25vbGl0aC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9QcmVzZW5jZV9tb25vbGl0aC9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvUm90dW5kYS82LWdlbnJlcy5qcGciLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL0dlbnJlc19tb25vbGl0aC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9HZW5yZXNfbW9ub2xpdGgvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1JvdHVuZGEvOS1wcml2YWN5LmpwZyIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvUHJpdmFjeV9tb25vbGl0aC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9Qcml2YWN5X21vbm9saXRoL2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9Sb3R1bmRhLzEwLWZ1dHVyZS5qcGciLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL0Z1dHVyZV9tb25vbGl0aC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9GdXR1cmVfbW9ub2xpdGgvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL0F1ZGlvUGFkL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9BdWRpb1BhZC9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvTGFiZWwvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0xhYmVsL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9UaXRsZS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvVGl0bGUvaHVicy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvMWE2YWNlMzc3MTMzZjE0YS5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGgxIHhyLWxheWVyIGNsYXNzPVwiZmFkZVwiPnt7IG1zZyB9fTwvaDE+XG4gIDxwPlxuICAgIEhlcmUncyBzb21lIG1vcmUgdGV4dCBqdXN0IHRvIG1ha2UgdGhpbmdzIG5vdCBibGFuay5cbiAgPC9wPlxuXG4gIDxidXR0b24geHItbGF5ZXIgQGNsaWNrPVwic2hhcmVkLmluY3JlbWVudFwiPmNvdW50IGlzOiB7eyBzaGFyZWQuc3RhdGUuY291bnQgfX08L2J1dHRvbj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBpbmplY3QgfSBmcm9tICd2dWUnXG5cbmRlZmluZVByb3BzKHtcbiAgbXNnOiBTdHJpbmdcbn0pXG5cbmNvbnN0IHNoYXJlZCA9IGluamVjdCgnc2hhcmVkJylcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuYSB7XG4gIGNvbG9yOiAjYjU0MmI5O1xufVxuXG4uZmFkZSB7XG4gIGNvbG9yOiAjOTgwM2E1O1xuICAvKiB0cmFuc2l0aW9uOiBjb2xvciAxczsgKi9cbn1cblxuLmZhZGU6aG92ZXIge1xuICBjb2xvcjogI2E3OGUwNjtcbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICAgICAgPGltZyBhbHQ9XCJWdWUgbG9nb1wiIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9sb2dvLnBuZ1wiIC8+XG4gICAgICA8U29tZVRleHQgdi1iaW5kOm1zZz1cIm1lc2dcIiAvPlxuICAgICAgPCEtLSA8U29tZVRleHQgbXNnPVwiTmV0d29ya2VkIFZ1ZSBDb21wb25lbnQgd2l0aCBTaGFyZWQgQnV0dG9uIENvdW50XCIgLz4gLS0+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IGluamVjdCB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBTb21lVGV4dCBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL05ldHdvcmtlZEhlbGxvV29ybGQudnVlJ1xuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcblxubGV0IHBhcmFtcyA9IGluamVjdChcInBhcmFtc1wiKVxudmFyIG1lc2cgPSBwYXJhbXMgJiYgcGFyYW1zLm1lc2cgPyBwYXJhbXMubWVzZyA6IFwiTmV0d29ya2VkIFZ1ZSBDb21wb25lbnQgd2l0aCBTaGFyZWQgQnV0dG9uIENvdW50XCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuPC9zdHlsZT5cbiIsImltcG9ydCB7IGNyZWF0ZUFwcCwgQXBwLCBDb21wb25lbnQsIENvbXBvbmVudFB1YmxpY0luc3RhbmNlIH0gZnJvbSBcInZ1ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWdWVBcHAge1xuICAgIHRha2VPd25lcnNoaXA6ICAoKSA9PiBib29sZWFuXG4gICAgc2V0U2hhcmVkRGF0YTogKG9iamVjdDoge30pID0+IGJvb2xlYW5cblxuICAgIHdpZHRoOiBudW1iZXJcbiAgICBoZWlnaHQ6IG51bWJlclxuXG4gICAgdnVlQXBwOiBBcHBcbiAgICB2dWVSb290OiBDb21wb25lbnRQdWJsaWNJbnN0YW5jZSB8IHVuZGVmaW5lZFxuXG4gICAgY29uc3RydWN0b3IgKEFwcDogQ29tcG9uZW50LCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgY3JlYXRlT3B0aW9uczogYW55ID17fSkge1xuICAgICAgICB0aGlzLnRha2VPd25lcnNoaXAgPSB0aGlzLnRha2VPd25lcnNoaXBQcm90by5iaW5kKHRoaXMpXG4gICAgICAgIHRoaXMuc2V0U2hhcmVkRGF0YSA9IHRoaXMuc2V0U2hhcmVkRGF0YVByb3RvLmJpbmQodGhpcylcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0XG5cbiAgICAgICAgdGhpcy52dWVBcHAgPSBjcmVhdGVBcHAoQXBwLCBjcmVhdGVPcHRpb25zKVxuICAgIH1cblxuICAgIG1vdW50KCkge1xuICAgIH1cblxuICAgIC8vIGR1bW15IGZ1bmN0aW9ucywganVzdCB0byBsZXQgdXMgdXNlIHRoZSBzYW1lXG4gICAgLy8gZGF0YSBzdG9yZSB3aXRoIGh1YnMgYW5kIHRoZSB3ZWIgdGVzdGluZyBzZXR1cFxuICAgIHRha2VPd25lcnNoaXBQcm90bygpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHNldFNoYXJlZERhdGFQcm90byhvYmplY3Q6IHt9KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBjcmVhdGVBcHAsIEFwcCwgQ29tcG9uZW50LCBDb21wb25lbnRQdWJsaWNJbnN0YW5jZSB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IFNjZW5lLCBFbnRpdHkgfSBmcm9tICdhZnJhbWUnXG5pbXBvcnQgeyBFdGhlcmVhbExheW91dFN5c3RlbSwgV2ViTGF5ZXIzRCB9IGZyb20gXCJldGhlcmVhbFwiO1xuaW1wb3J0IFZ1ZUFwcCAgZnJvbSBcIi4vVnVlQXBwXCJcblxuLy8gY3JlYXRlIGluaXQgbWV0aG9kIGZvciBldGhlcmVhbFxuaW1wb3J0ICogYXMgZXRoZXJlYWwgZnJvbSAnZXRoZXJlYWwnXG5pbXBvcnQgeyBjcmVhdGVQcmludGVyLCBUaGlzRXhwcmVzc2lvbiwgVGhyb3dTdGF0ZW1lbnQgfSBmcm9tIFwibm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQvbGliL3R5cGVzY3JpcHRcIjtcbmltcG9ydCB7IGNyZWF0ZSB9IGZyb20gXCJtYXRoanNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemVFdGhlcmVhbCgpIHtcbiAgICBIdWJzQXBwLmluaXRpYWxpemVFdGhlcmVhbCgpXG59XG5cbi8vVEhSRUUuT2JqZWN0M0QuRGVmYXVsdE1hdHJpeEF1dG9VcGRhdGUgPSB0cnVlO1xuXG5leHBvcnQgZnVuY3Rpb24gc3lzdGVtVGljayh0aW1lOiBudW1iZXIsIGRlbHRhVGltZTogbnVtYmVyKSB7XG4gICBIdWJzQXBwLnN5c3RlbVRpY2sodGltZSwgZGVsdGFUaW1lKVxufVxuXG5mdW5jdGlvbiBjb3B5Q2FtZXJhKHNvdXJjZTogVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEsIHRhcmdldDogVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEpIHtcbiAgICBzb3VyY2UudXBkYXRlTWF0cml4V29ybGQoKVxuICAgIC8vbGV0IG9sZE5hbWUgPSB0YXJnZXQubmFtZVxuICAgIC8vdGFyZ2V0LmNvcHkoc291cmNlLCBmYWxzZSlcbiAgICAvL3RhcmdldC5uYW1lID0gb2xkTmFtZVxuXG4gICAgdGFyZ2V0LmZvdiA9IHNvdXJjZS5mb3Y7XG4gICAgdGFyZ2V0Lnpvb20gPSBzb3VyY2Uuem9vbTtcblxuICAgIHRhcmdldC5uZWFyID0gc291cmNlLm5lYXI7XG4gICAgdGFyZ2V0LmZhciA9IHNvdXJjZS5mYXI7XG5cbiAgICB0YXJnZXQuYXNwZWN0ID0gc291cmNlLmFzcGVjdDtcblxuICAgIC8vIHRhcmdldC5tYXRyaXhXb3JsZEludmVyc2UuY29weSggc291cmNlLm1hdHJpeFdvcmxkSW52ZXJzZSApO1xuICAgIC8vIHRhcmdldC5wcm9qZWN0aW9uTWF0cml4LmNvcHkoIHNvdXJjZS5wcm9qZWN0aW9uTWF0cml4ICk7XG4gICAgLy8gdGFyZ2V0LnByb2plY3Rpb25NYXRyaXhJbnZlcnNlLmNvcHkoIHNvdXJjZS5wcm9qZWN0aW9uTWF0cml4SW52ZXJzZSApO1xuXG4gICAgLy8gdGFyZ2V0LnVwLmNvcHkoIHNvdXJjZS51cCApO1xuXG4gICAgLy8gdGFyZ2V0Lm1hdHJpeC5jb3B5KCBzb3VyY2UubWF0cml4ICk7XG4gICAgLy8gdGFyZ2V0Lm1hdHJpeFdvcmxkLmNvcHkoIHNvdXJjZS5tYXRyaXhXb3JsZCApO1xuXG4gICAgLy8gdGFyZ2V0Lm1hdHJpeEF1dG9VcGRhdGUgPSBzb3VyY2UubWF0cml4QXV0b1VwZGF0ZTtcbiAgICAvLyB0YXJnZXQubWF0cml4V29ybGROZWVkc1VwZGF0ZSA9IHNvdXJjZS5tYXRyaXhXb3JsZE5lZWRzVXBkYXRlO1xuXG4gICAgc291cmNlLm1hdHJpeFdvcmxkLmRlY29tcG9zZSggdGFyZ2V0LnBvc2l0aW9uLCB0YXJnZXQucXVhdGVybmlvbiwgdGFyZ2V0LnNjYWxlKVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB0YXJnZXQucm90YXRpb24uc2V0RnJvbVF1YXRlcm5pb24oIHRhcmdldC5xdWF0ZXJuaW9uLCB1bmRlZmluZWQsIGZhbHNlICk7XG4gICAgdGFyZ2V0LnVwZGF0ZU1hdHJpeCgpXG4gICAgdGFyZ2V0LnVwZGF0ZU1hdHJpeFdvcmxkKHRydWUpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBWdWVBcHAge1xuICAgIHN0YXRpYyBzeXN0ZW06IEV0aGVyZWFsTGF5b3V0U3lzdGVtO1xuICAgIHN0YXRpYyBldGhlcmVhbENhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSgpXG4gICAgc3RhdGljIHBsYXllckNhbWVyYTogVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmE7XG5cbiAgICBpc0V0aGVyZWFsOiBib29sZWFuXG4gICAgaXNJbnRlcmFjdGl2ZTogYm9vbGVhblxuICAgIGlzTmV0d29ya2VkOiBib29sZWFuXG4gICAgaXNTdGF0aWM6IGJvb2xlYW5cblxuICAgIHByaXZhdGUgdXBkYXRlVGltZTogbnVtYmVyXG4gICAgcHJpdmF0ZSByYXljYXN0ZXI6IFRIUkVFLlJheWNhc3RlclxuXG4gICAgc2l6ZToge1xuICAgICAgICB3aWR0aDogbnVtYmVyLFxuICAgICAgICBoZWlnaHQ6IG51bWJlclxuICAgIH1cblxuICAgIC8vdGFrZU93bmVyc2hpcDogICgpID0+IGJvb2xlYW5cbiAgICAvL3NldFNoYXJlZERhdGE6IChvYmplY3Q6IHt9KSA9PiBib29sZWFuXG4gICAgLy93aWR0aDogbnVtYmVyXG4gICAgLy9oZWlnaHQ6IG51bWJlclxuICAgIC8vdnVlQXBwOiBBcHBcbiAgICAvL3Z1ZVJvb3Q6IENvbXBvbmVudFB1YmxpY0luc3RhbmNlIHwgdW5kZWZpbmVkIFxuXG4gICAgd2ViTGF5ZXIzRDogV2ViTGF5ZXIzRCB8IHVuZGVmaW5lZFxuICAgIG5lZWRzVXBkYXRlOiBib29sZWFuID0gZmFsc2VcblxuICAgIGhlYWREaXY6IEVsZW1lbnRcblxuICAgIHN0YXRpYyBpbml0aWFsaXplRXRoZXJlYWwoKSB7XG4gICAgICAgIGxldCBzY2VuZTogU2NlbmUgPSB3aW5kb3cuQVBQLnNjZW5lO1xuXG4gICAgICAgIHRoaXMuZXRoZXJlYWxDYW1lcmEubWF0cml4QXV0b1VwZGF0ZSA9IHRydWU7XG4gICAgICAgIC8vdGhpcy5ldGhlcmVhbENhbWVyYS52aXNpYmxlID0gZmFsc2U7XG5cbiAgICAgICAgLy9zY2VuZS5zZXRPYmplY3QzRChcImV0aGVyZWFsQ2FtZXJhXCIsIHRoaXMuZXRoZXJlYWxDYW1lcmEpXG5cbiAgICAgICAgdGhpcy5wbGF5ZXJDYW1lcmEgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWV3aW5nLWNhbWVyYVwiKSBhcyBFbnRpdHkpLmdldE9iamVjdDNEKFwiY2FtZXJhXCIpIGFzIFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhO1xuXG4gICAgICAgIC8vIGp1c3QgaW4gY2FzZSBcInZpZXdpbmctY2FtZXJhXCIgaXNuJ3Qgc2V0IHVwIHlldCAuLi4gd2hpY2ggaXQgXG4gICAgICAgIC8vIHNob3VsZCBiZSwgYnV0IGp1c3QgdG8gYmUgY2FyZWZ1bFxuICAgICAgICB0aGlzLnN5c3RlbSA9IGV0aGVyZWFsLmNyZWF0ZUxheW91dFN5c3RlbSh0aGlzLnBsYXllckNhbWVyYSA/IHRoaXMucGxheWVyQ2FtZXJhIDogc2NlbmUuY2FtZXJhKVxuICAgICAgICB3aW5kb3cuZXRoU3lzdGVtID0gdGhpcy5zeXN0ZW1cblxuICAgICAgICAvLyBjYW4gY3VzdG9taXplIGVhc2luZyBldGNcbiAgICAgICAgLy8gc3lzdGVtLnRyYW5zaXRpb24uZHVyYXRpb24gPSAxLjVcbiAgICAgICAgLy8gc3lzdGVtLnRyYW5zaXRpb24uZGVsYXkgPSAwXG4gICAgICAgIC8vIHN5c3RlbS50cmFuc2l0aW9uLm1heFdhaXQgPSA0XG4gICAgICAgIC8vIHN5c3RlbS50cmFuc2l0aW9uLmVhc2luZyA9IGV0aGVyZWFsLmVhc2luZy5lYXNlT3V0XG4gICAgfVxuXG4gICAgc3RhdGljIHN5c3RlbVRpY2sodGltZTogbnVtYmVyLCBkZWx0YVRpbWU6IG51bWJlcikge1xuICAgICAgICBsZXQgc2NlbmUgPSB3aW5kb3cuQVBQLnNjZW5lO1xuXG4gICAgICAgIGlmICghdGhpcy5wbGF5ZXJDYW1lcmEpIHtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQ2FtZXJhID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlld2luZy1jYW1lcmFcIikgYXMgRW50aXR5KS5nZXRPYmplY3QzRChcImNhbWVyYVwiKSBhcyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKCF0aGlzLnBsYXllckNhbWVyYSkgcmV0dXJuO1xuICAgIFxuICAgICAgICBjb3B5Q2FtZXJhKHRoaXMucGxheWVyQ2FtZXJhLCB0aGlzLmV0aGVyZWFsQ2FtZXJhKVxuXG4gICAgICAgIGlmICh0aGlzLmV0aGVyZWFsQ2FtZXJhICE9IHRoaXMuc3lzdGVtLnZpZXdOb2RlKSB7XG4gICAgICAgICAgICB0aGlzLnN5c3RlbS52aWV3Tm9kZSA9IHRoaXMuZXRoZXJlYWxDYW1lcmFcbiAgICAgICAgfVxuXG4gICAgICAgIHNjZW5lLnJlbmRlcmVyLmdldFNpemUoSHVic0FwcC5zeXN0ZW0udmlld1Jlc29sdXRpb24pXG4gICAgICAgIHRoaXMuc3lzdGVtLnZpZXdGcnVzdHVtLnNldEZyb21QZXJzcGVjdGl2ZVByb2plY3Rpb25NYXRyaXgodGhpcy5ldGhlcmVhbENhbWVyYS5wcm9qZWN0aW9uTWF0cml4KVxuXG4gICAgICAgIC8vIHRpY2sgbWV0aG9kIGZvciBldGhlcmVhbFxuICAgICAgICB0aGlzLnN5c3RlbS51cGRhdGUoZGVsdGFUaW1lLCB0aW1lKVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yIChBcHA6IENvbXBvbmVudCwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30sIGNyZWF0ZU9wdGlvbnM6IGFueSA9e30pIHtcbiAgICAgICAgXG5cbiAgICAgICAgaWYgKHBhcmFtcy53aWR0aCAmJiBwYXJhbXMuaGVpZ2h0ICYmIHBhcmFtcy53aWR0aCA+IDAgJiYgcGFyYW1zLmhlaWdodCA+IDApIHtcbiAgICAgICAgICAgIC8vIHJlc2V0IGJvdGhcbiAgICAgICAgICAgIHdpZHRoID0gcGFyYW1zLndpZHRoICAgXG4gICAgICAgICAgICBoZWlnaHQgPSBwYXJhbXMuaGVpZ2h0XG4gICAgICAgIH0gZWxzZSBpZiAoKHBhcmFtcy53aWR0aCAmJiBwYXJhbXMud2lkdGggPiAwKSB8fCAocGFyYW1zLmhlaWdodCAmJiBwYXJhbXMuaGVpZ2h0ID4gMCkpIHtcbiAgICAgICAgICAgIC8vIHNldCBvbmUgYW5kIHNjYWxlIHRoZSBvdGhlclxuICAgICAgICAgICAgaWYgKHBhcmFtcy53aWR0aCAmJiBwYXJhbXMud2lkdGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gKHBhcmFtcy53aWR0aCAvIHdpZHRoKSAqIGhlaWdodCAgICBcbiAgICAgICAgICAgICAgICB3aWR0aCA9IHBhcmFtcy53aWR0aCAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhcmFtcy5oZWlnaHQgJiYgcGFyYW1zLmhlaWdodCA+IDApIHtcbiAgICAgICAgICAgICAgICB3aWR0aCA9IChwYXJhbXMuaGVpZ2h0IC8gaGVpZ2h0KSAqIGhlaWdodFxuICAgICAgICAgICAgICAgIGhlaWdodCA9IHBhcmFtcy5oZWlnaHRcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgY3JlYXRlT3B0aW9ucylcbiAgICAgICAgdGhpcy5pc0V0aGVyZWFsID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy52dWVBcHAucHJvdmlkZSgncGFyYW1zJywgcGFyYW1zKVxuXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTmV0d29ya2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTdGF0aWMgPSB0cnVlO1xuICAgICAgICB0aGlzLnVwZGF0ZVRpbWUgPSAxMDBcbiAgICAgICAgdGhpcy5yYXljYXN0ZXIgPSBuZXcgVEhSRUUuUmF5Y2FzdGVyKClcbiAgICAgICAgLy90aGlzLndpZHRoID0gd2lkdGhcbiAgICAgICAgLy90aGlzLmhlaWdodCA9IGhlaWdodFxuICAgICAgICB0aGlzLnNpemUgPSB7IHdpZHRoOiB3aWR0aC8xMDAwLCBoZWlnaHQ6IGhlaWdodC8xMDAwfVxuICAgICAgICAvL3RoaXMudGFrZU93bmVyc2hpcCA9IHRoaXMudGFrZU93bmVyc2hpcFByb3RvLmJpbmQodGhpcylcbiAgICAgICAgLy90aGlzLnNldFNoYXJlZERhdGEgPSB0aGlzLnNldFNoYXJlZERhdGFQcm90by5iaW5kKHRoaXMpXG5cbiAgICAgICAgdGhpcy5oZWFkRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgICAvL3RoaXMuaGVhZERpdi5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLFwid2lkdGg6IDEwMCU7aGVpZ2h0OiAxMDAlO1wiKVxuXG4gICAgICAgIC8vdGhpcy52dWVBcHAgPSBjcmVhdGVBcHAoQXBwLCBjcmVhdGVPcHRpb25zKVxuICAgIH1cblxuICAgIG1vdW50KHVzZUV0aGVyZWFsPzogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmlzRXRoZXJlYWwgPSB1c2VFdGhlcmVhbCA9PT0gdHJ1ZVxuICAgICAgICBcbiAgICAgICAgdGhpcy52dWVSb290ID0gdGhpcy52dWVBcHAubW91bnQodGhpcy5oZWFkRGl2KTtcbiAgICAgICAgdGhpcy52dWVSb290LiRlbC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLFwid2lkdGg6IFwiICsgdGhpcy53aWR0aCArIFwicHg7IGhlaWdodDogXCIgKyB0aGlzLmhlaWdodCArIFwicHg7XCIpXG5cbiAgICAgICAgLy8gLy8gYWRkIGEgbGluayB0byB0aGUgc2hhcmVkIGNzc1xuICAgICAgICBsZXQgbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpXG4gICAgICAgIGwuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvaHVicy5jc3NcIilcbiAgICAgICAgbC5zZXRBdHRyaWJ1dGUoXCJyZWxcIiwgXCJzdHlsZXNoZWV0XCIpXG4gICAgICAgIGwuc2V0QXR0cmlidXRlKFwiY3Jvc3NvcmlnaW5cIixcImFub255bW91c1wiKVxuICAgICAgICB0aGlzLnZ1ZVJvb3QuJGVsLmluc2VydEJlZm9yZShsLCB0aGlzLnZ1ZVJvb3QuJGVsLmZpcnN0Q2hpbGQpXG5cbiAgICAgICAgLy8gbW92ZSB0aGlzIGludG8gbWV0aG9kXG4gICAgICAgIHRoaXMud2ViTGF5ZXIzRCA9IG5ldyBXZWJMYXllcjNEKHRoaXMudnVlUm9vdC4kZWwsIHtcbiAgICAgICAgICAgIGF1dG9SZWZyZXNoOiB0cnVlLFxuICAgICAgICAgICAgb25MYXllckNyZWF0ZTogdXNlRXRoZXJlYWwgPyBcbiAgICAgICAgICAgIChsYXllcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFkYXB0ZXIgPSBIdWJzQXBwLnN5c3RlbS5nZXRBZGFwdGVyKGxheWVyKVxuICAgICAgICAgICAgICAgIGFkYXB0ZXIub3BhY2l0eS5lbmFibGVkID0gdHJ1ZVxuICAgICAgICAgICAgICAgIGFkYXB0ZXIub25VcGRhdGUgPSAoKSA9PiBsYXllci51cGRhdGUoKVxuICAgICAgICAgICAgfSA6XG4gICAgICAgICAgICAobGF5ZXIpID0+IHt9LFxuICAgICAgICAgICAgb25MYXllclBhaW50OiAobGF5ZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1N0YXRpYykgeyB0aGlzLm5lZWRzVXBkYXRlID0gdHJ1ZSB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGV4dHVyZUVuY29kaW5nOiBUSFJFRS5zUkdCRW5jb2RpbmcsXG4gICAgICAgICAgICByZW5kZXJPcmRlck9mZnNldDogMFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXROZXR3b3JrTWV0aG9kcyh0YWtlT3duZXJzaGlwOiAoKSA9PiBib29sZWFuLCBzZXRTaGFyZWREYXRhOiAoe30pID0+IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy50YWtlT3duZXJzaGlwID0gdGFrZU93bmVyc2hpcDtcbiAgICAgICAgdGhpcy5zZXRTaGFyZWREYXRhID0gc2V0U2hhcmVkRGF0YTtcbiAgICB9XG5cbiAgICAvLyBkdW1teSBmdW5jdGlvbnMsIGp1c3QgdG8gYXZvaWQgZXJyb3JzIGlmIHRoZXkgZ2V0IGNhbGxlZCBiZWZvcmVcbiAgICAvLyBuZXR3b3JraW5nIGlzIGluaXRpYWxpemVkLCBvciBjYWxsZWQgd2hlbiBuZXR3b3JrZWQgaXMgZmFsc2VcbiAgICAvLyB0YWtlT3duZXJzaGlwUHJvdG8oKTogYm9vbGVhbiB7XG4gICAgLy8gICAgIHJldHVybiB0cnVlO1xuICAgIC8vIH1cblxuICAgIC8vIHNldFNoYXJlZERhdGFQcm90byhvYmplY3Q6IHt9KSB7XG4gICAgLy8gICAgIHJldHVybiB0cnVlO1xuICAgIC8vIH1cblxuICAgIC8vIHJlY2VpdmUgZGF0YSB1cGRhdGVzLiAgc2hvdWxkIGJlIG92ZXJyaWRkZW4gYnkgc3ViY2xhc3NlcywgYWxzbyByZXF1ZXN0c1xuICAgIC8vIHVwZGF0ZSBuZXh0IHRpY2tcbiAgICB1cGRhdGVTaGFyZWREYXRhKGRhdGFPYmplY3Q6IHt9KSB7XG4gICAgICAgIHRoaXMubmVlZHNVcGRhdGUgPSB0cnVlXG4gICAgfVxuXG4gICAgZ2V0U2l6ZSgpIHtcbiAgICAgICAgLy8gaWYgKCF0aGlzLmNvbXBTdHlsZXMpIHtcbiAgICAgICAgLy8gICAgIHRoaXMuY29tcFN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMudnVlUm9vdC4kZWwpO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIHZhciB3aWR0aCA9IHRoaXMuY29tcFN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKCd3aWR0aCcpXG4gICAgICAgIC8vIHdpZHRoID0gd2lkdGggJiYgd2lkdGgubGVuZ3RoID4gMCA/IHBhcnNlRmxvYXQod2lkdGgpIC8gMTAwMDogMVxuICAgICAgICAvLyB2YXIgaGVpZ2h0ID0gdGhpcy5jb21wU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ2hlaWdodCcpXG4gICAgICAgIC8vIGhlaWdodCA9IGhlaWdodCAmJiBoZWlnaHQubGVuZ3RoID4gMCA/IHBhcnNlRmxvYXQoaGVpZ2h0KSAvIDEwMDA6IDFcbiAgICAgICAgLy8gdGhpcy5zaXplID0geyB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0fVxuICAgICAgICBjb25zb2xlLmxvZyAoXCJkaXYgc2l6ZToge1wiICsgdGhpcy5zaXplLndpZHRoICsgXCIsIFwiICsgdGhpcy5zaXplLmhlaWdodCArIFwifVwiKVxuICAgICAgICByZXR1cm4gdGhpcy5zaXplXG4gICAgfVxuXG4gICAgLy8gcmVjZWl2ZSBkYXRhIHVwZGF0ZXMuICBzaG91bGQgYmUgb3ZlcnJpZGRlbiBieSBzdWJjbGFzc2VzXG4gICAgZ2V0U2hhcmVkRGF0YShkYXRhT2JqZWN0OiB7fSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJnZXRTaGFyZWREYXRhIHNob3VsZCBiZSBvdmVycmlkZGVuIGJ5IHN1YmNsYXNzZXNcIilcbiAgICB9XG4gICAgXG4gICAgLy8gb3ZlcnJpZGUgdG8gY2hlY2sgZm9yIHlvdXIgb3duIDNEIG9iamVjdHMgdGhhdCBhcmVuJ3Qgd2ViTGF5ZXJzXG4gICAgY2xpY2tlZChldnQ6IHtvYmplY3QzRDogVEhSRUUuT2JqZWN0M0R9KSB7XG4gICAgICAgIGlmICghdGhpcy5pc0ludGVyYWN0aXZlKSB7IHJldHVybiB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBvYmogPSBldnQub2JqZWN0M0RcbiAgICAgICAgdGhpcy5yYXljYXN0ZXIucmF5LnNldChvYmoucG9zaXRpb24sIFxuICAgICAgICAgICAgdGhpcy53ZWJMYXllcjNEIS5nZXRXb3JsZERpcmVjdGlvbihuZXcgVEhSRUUuVmVjdG9yMygpKS5uZWdhdGUoKSlcbiAgICAgICAgY29uc3QgaGl0ID0gdGhpcy53ZWJMYXllcjNEIS5oaXRUZXN0KHRoaXMucmF5Y2FzdGVyLnJheSlcbiAgICAgICAgaWYgKGhpdCkge1xuICAgICAgICAgIGhpdC50YXJnZXQuY2xpY2soKVxuICAgICAgICAgIGhpdC50YXJnZXQuZm9jdXMoKVxuICAgICAgICAgIGNvbnNvbGUubG9nKCdoaXQnLCBoaXQudGFyZ2V0LCBoaXQubGF5ZXIpXG4gICAgICAgIH0gICBcbiAgICB9XG5cbiAgICBkcmFnU3RhcnQoZXZ0OiB7fSkge1xuICAgICAgICAvLyBub3RoaW5nIGhlcmUgLi4uIHN1YmNsYXNzIHNob3VsZCBvdmVycmlkZVxuICAgIH1cblxuICAgIGRyYWdFbmQgKGV2dDoge30pIHtcbiAgICAgICAgLy8gbm90aGluZyBoZXJlIC4uLiBzdWJjbGFzcyBzaG91bGQgb3ZlcnJpZGVcbiAgICB9XG5cbiAgICBwbGF5KCkge1xuICAgICAgICAvLyBpZiB3ZSBjYW4gZmlndXJlIG91dCBob3cgdG8gcGF1c2UsIHRoZW4gcmVzdGFydCBoZXJlXG4gICAgfVxuXG4gICAgcGF1c2UoKSB7XG4gICAgICAgIC8vIHBlcmhhcHMgZmlndXJlIG91dCBob3cgdG8gcGF1c2UgdGhlIFZ1ZSBjb21wb25lbnQ/XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgLy8gVE9ETzogZGVzdHJveSB0aGUgdnVlIGNvbXBvbmVudCBhbmQgYW55IHJlc291cmNlcywgZXRjLiwgaXQgaGFzXG4gICAgfVxuXG4gICAgdGljayh0aW1lOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFdGhlcmVhbCkge1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgbmVlZHNVcGRhdGUgPSB0aGlzLm5lZWRzVXBkYXRlXG4gICAgICAgICAgICB0aGlzLm5lZWRzVXBkYXRlID0gZmFsc2VcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU3RhdGljICYmIHRoaXMudXBkYXRlVGltZSA8IHRpbWUpIHtcbiAgICAgICAgICAgICAgICBuZWVkc1VwZGF0ZSA9IHRydWVcbiAgICAgICAgICAgICAgICAvLyB3YWl0IGEgYml0IGFuZCBkbyBpdCBhZ2Fpbi4gIE1heSBnZXQgcmlkIG9mIHRoaXMgc29tZSBkYXksIHdlJ2xsIHNlZVxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVGltZSA9IE1hdGgucmFuZG9tKCkgKiAyMDAwICsgMTAwMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzU3RhdGljKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUaW1lID0gdGltZVxuICAgICAgICAgICAgICAgIG5lZWRzVXBkYXRlID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5lZWRzVXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53ZWJMYXllcjNEIS51cGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgeyByZWFjdGl2ZSwgcmVhZG9ubHkgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgVnVlQXBwIGZyb20gXCIuLi8uLi9WdWVBcHBcIjtcblxuZXhwb3J0IGludGVyZmFjZSBkYXRhIHtcbiAgICBjb3VudDogbnVtYmVyXG59XG5cbmV4cG9ydCBjbGFzcyBTdG9yZSB7XG4gICAgX3N0YXRlOiBkYXRhXG4gICAgc3RhdGU6IGRhdGFcbiAgICBhcHA6IFZ1ZUFwcFxuICAgIGNvbnN0cnVjdG9yKGFwcDogVnVlQXBwKSB7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gcmVhY3RpdmUoe1xuICAgICAgICAgICAgY291bnQ6IDBcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5hcHAgPSBhcHBcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHJlYWRvbmx5KHRoaXMuX3N0YXRlKVxuICAgIH0gICAgXG5cbiAgICBpbmNyZW1lbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLmFwcC50YWtlT3duZXJzaGlwKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlLmNvdW50Kys7XG4gICAgICAgICAgICB0aGlzLmFwcC5zZXRTaGFyZWREYXRhKHRoaXMuc3RhdGUpXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgdXBkYXRlU2hhcmVkRGF0YShkYXRhT2JqZWN0OiBkYXRhKSB7XG4gICAgICAgIC8vIG5lZWQgdG8gdXBkYXRlIHRoZSBlbGVtZW50cyB3aXRoaW4gdGhlIHN0YXRlLCBiZWNhdXNlIG90aGVyd2lzZVxuICAgICAgICAvLyB0aGUgZGF0YSB3b24ndCBmbG93IHRvIHRoZSBjb21wb25lbnRzXG4gICAgICAgIHRoaXMuX3N0YXRlLmNvdW50ID0gZGF0YU9iamVjdC5jb3VudFxuICAgIH1cbn0iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcbmltcG9ydCB7ZGF0YSBhcyBTaGFyZWREYXRhLCBTdG9yZX0gZnJvbSBcIi4vc2hhcmVkXCJcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgc2hhcmVkOiBTdG9yZVxuICAgIFxuICAgIGNvbnN0cnVjdG9yIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgNDAwLCA0NzUsIHBhcmFtcylcblxuICAgICAgICAvLyBjcmVhdGUgb3VyIHNoYXJlZCBkYXRhIG9iamVjdCB0aGF0IHdpbGxcbiAgICAgICAgLy8gc2hhcmUgZGF0YSBiZXR3ZWVuIHZ1ZSBhbmQgaHVic1xuICAgICAgICB0aGlzLnNoYXJlZCA9IG5ldyBTdG9yZSh0aGlzKVxuICAgICAgICB0aGlzLnZ1ZUFwcC5wcm92aWRlKCdzaGFyZWQnLCB0aGlzLnNoYXJlZClcblxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzTmV0d29ya2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc1N0YXRpYyA9IGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICB1cGRhdGVTaGFyZWREYXRhKGRhdGFPYmplY3Q6IFNoYXJlZERhdGEpIHtcbiAgICAgICAgc3VwZXIudXBkYXRlU2hhcmVkRGF0YShkYXRhT2JqZWN0KVxuICAgICAgICB0aGlzLnNoYXJlZC51cGRhdGVTaGFyZWREYXRhKGRhdGFPYmplY3QpXG4gICAgfVxuXG4gICAgZ2V0U2hhcmVkRGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkLnN0YXRlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcChwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXRcbiIsIjx0ZW1wbGF0ZT5cbiAgPGgxIHhyLWxheWVyIGNsYXNzPVwiZmFkZVwiPnt7IG1zZyB9fTwvaDE+XG5cbiAgPHA+XG4gICAgPGEgaHJlZj1cImh0dHBzOi8vdml0ZWpzLmRldi9ndWlkZS9mZWF0dXJlcy5odG1sXCIgdGFyZ2V0PVwiX2JsYW5rXCI+XG4gICAgICBWaXRlIERvY3VtZW50YXRpb24gYW5kIFRoZW4gU29tZSEgXG4gICAgPC9hPlxuICAgIHxcbiAgICA8YSBocmVmPVwiaHR0cHM6Ly92My52dWVqcy5vcmcvXCIgdGFyZ2V0PVwiX2JsYW5rXCI+VnVlIDMgRG9jdW1lbnRhdGlvbjwvYT5cbiAgPC9wPlxuXG4gIDxidXR0b24geHItbGF5ZXIgQGNsaWNrPVwic3RhdGUuY291bnQrK1wiPmNvdW50IGlzOiB7eyBzdGF0ZS5jb3VudCB9fTwvYnV0dG9uPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlYWN0aXZlIH0gZnJvbSAndnVlJ1xuXG5kZWZpbmVQcm9wcyh7XG4gIG1zZzogU3RyaW5nXG59KVxuXG5jb25zdCBzdGF0ZSA9IHJlYWN0aXZlKHsgY291bnQ6IDAgfSlcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuYSB7XG4gIGNvbG9yOiAjYjU0MmI5O1xufVxuXG4uZmFkZSB7XG4gIGNvbG9yOiAjOTgwM2E1O1xuICAvKiB0cmFuc2l0aW9uOiBjb2xvciAxczsgKi9cbn1cblxuLmZhZGU6aG92ZXIge1xuICBjb2xvcjogIzA2YTcxYjtcbn1cbjwvc3R5bGU+XG5cbiIsIjx0ZW1wbGF0ZT5cbjxkaXY+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICAgICAgPGltZyBhbHQ9XCJWdWUgbG9nb1wiIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9sb2dvLnBuZ1wiIC8+XG4gICAgICA8SGVsbG9Xb3JsZCBtc2c9XCJWdWUgQ29tcG9uZW50IHdpdGggTG9jYWwgQnV0dG9uIENvdW50XCIgLz5cbiAgICAgIDxwIGlkPVwiZWRpdFwiIHYtYmluZDpjbGFzcz1cInsgdXBjbG9zZTogc2hhcmVkLnN0YXRlLmNsb3NlIH1cIiB4ci1sYXllcj5cbiAgICAgICAgRWRpdCBjb2RlIGluIDxjb2RlPnNyYy9hcHBzPC9jb2RlPiB0byB0ZXN0IGhvdCBtb2R1bGUgcmVwbGFjZW1lbnQgd2hpbGUgcnVubmluZyBwcm9qZWN0IGFzIFwibnBtIHJ1biBkZXZcIi5cbiAgICAgIDwvcD5cblxuICA8L2Rpdj5cbjwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBIZWxsb1dvcmxkIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvSGVsbG9Xb3JsZC52dWUnXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuXG5pbXBvcnQgeyBpbmplY3QgfSBmcm9tICd2dWUnXG5cbmNvbnN0IHNoYXJlZCA9IGluamVjdCgnc2hhcmVkJylcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuI2VkaXQge1xuICBjb2xvcjogI2JlYTdkMTtcbn1cblxuI2VkaXQudXBjbG9zZSB7XG4gIGNvbG9yOiAjY2MwYTBhO1xufVxuPC9zdHlsZT5cbiIsImltcG9ydCB7IHJlYWN0aXZlLCByZWFkb25seSB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCBWdWVBcHAgZnJvbSBcIi4uLy4uL1Z1ZUFwcFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIGRhdGEge1xuICAgIGNsb3NlOiBib29sZWFuXG59XG5cbmV4cG9ydCBjbGFzcyBTdG9yZSB7XG4gICAgX3N0YXRlOiBkYXRhXG4gICAgc3RhdGU6IGRhdGFcbiAgICBhcHA6IFZ1ZUFwcFxuXG4gICAgY29uc3RydWN0b3IoYXBwOiBWdWVBcHApIHtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSByZWFjdGl2ZSh7XG4gICAgICAgICAgICBjbG9zZTogZmFsc2VcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5hcHAgPSBhcHBcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHJlYWRvbmx5KHRoaXMuX3N0YXRlKVxuICAgIH0gICAgXG5cbiAgICBzZXRDbG9zZShjOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZS5jbG9zZSAhPSBjKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZS5jbG9zZSA9IGM7XG4gICAgICAgIH1cbiAgICB9IFxufVxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5pbXBvcnQge2RhdGEgYXMgU2hhcmVkRGF0YSwgU3RvcmV9IGZyb20gXCIuL3NoYXJlZFwiXG5pbXBvcnQgeyBXZWJMYXllcjNEQ29udGVudCB9IGZyb20gXCJldGhlcmVhbFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBzaGFyZWQ6IFN0b3JlXG4gICAgXG4gICAgY29uc3RydWN0b3IgKHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCA1MDAsIDUwMCwgcGFyYW1zKVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuc2hhcmVkID0gbmV3IFN0b3JlKHRoaXMpXG4gICAgICAgIHRoaXMudnVlQXBwLnByb3ZpZGUoJ3NoYXJlZCcsIHRoaXMuc2hhcmVkKVxuICAgIH1cblxuICAgIGRvY3M6IFdlYkxheWVyM0RDb250ZW50IHwgdW5kZWZpbmVkXG4gICAgYm91bmRzU2l6ZTogVEhSRUUuVmVjdG9yMyAgPSBuZXcgVEhSRUUuVmVjdG9yMygpXG4gICAgYm91bmRzOiBUSFJFRS5Cb3gzID0gbmV3IFRIUkVFLkJveDMoKVxuXG4gICAgbW91bnQgKCkge1xuICAgICAgICBzdXBlci5tb3VudCh0cnVlKSAvLyB1c2UgZXRoZXJlYWxcblxuICAgICAgICB0aGlzLmRvY3MgPSB0aGlzLndlYkxheWVyM0QhLnF1ZXJ5U2VsZWN0b3IoJyNlZGl0JylcbiAgICAgICAgaWYgKCF0aGlzLmRvY3MpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIlZ1ZSBhcHAgbmVlZHMgI2VkaXQgZGl2XCIpXG4gICAgICAgICAgICByZXR1cm4gXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBhZGFwdGVyID0gSHVic0FwcC5zeXN0ZW0uZ2V0QWRhcHRlcih0aGlzLmRvY3MpIFxuICAgICAgICBhZGFwdGVyLm9uVXBkYXRlID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ib3VuZHMgPSBhZGFwdGVyLm1ldHJpY3MudGFyZ2V0LnZpc3VhbEJvdW5kc1xuICAgICAgICAgICAgdGhpcy5ib3VuZHMuZ2V0U2l6ZSh0aGlzLmJvdW5kc1NpemUpXG4gICAgICAgICAgICB2YXIgc2l6ZSA9IE1hdGguc3FydCh0aGlzLmJvdW5kc1NpemUueCAqIHRoaXMuYm91bmRzU2l6ZS54ICsgdGhpcy5ib3VuZHNTaXplLnkgKiB0aGlzLmJvdW5kc1NpemUueSlcbiAgICAgICAgICAgIGlmICh0aGlzLnNoYXJlZC5zdGF0ZS5jbG9zZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hhcmVkLnNldENsb3NlIChzaXplIDwgMjEwKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNoYXJlZC5zZXRDbG9zZSAoc2l6ZSA8IDE5MClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZG9jcyEudXBkYXRlKClcbiAgICAgICAgfVxuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcChwYXJhbXMpXG4gICAgYXBwLm1vdW50KCkgXG5cbiAgICBcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxoMj57eyBtc2cgfX08L2gyPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IGRlZmluZVByb3BzLCByZWFjdGl2ZSB9IGZyb20gJ3Z1ZSdcblxuZGVmaW5lUHJvcHMoe1xuICBtc2c6IFN0cmluZ1xufSlcblxuY29uc3Qgc3RhdGUgPSByZWFjdGl2ZSh7IGNvdW50OiAwIH0pXG48L3NjcmlwdD4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8VGl0bGUgdi1iaW5kOm1zZz1cIm1lc2dcIiAvPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBpbmplY3QgfSBmcm9tICd2dWUnXG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG5cbmxldCBwYXJhbXMgPSBpbmplY3QoXCJwYXJhbXNcIilcbnZhciBtZXNnID0gcGFyYW1zICYmIHBhcmFtcy5tZXNzYWdlID8gcGFyYW1zLm1lc3NhZ2UgOiBcIlBPUlRBTCBUSVRMRVwiXG48L3NjcmlwdD5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgMTAwLCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxoND57eyBtc2cgfX08L2g0PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IGRlZmluZVByb3BzLCByZWFjdGl2ZSB9IGZyb20gJ3Z1ZSdcblxuZGVmaW5lUHJvcHMoe1xuICBtc2c6IFN0cmluZ1xufSlcblxuY29uc3Qgc3RhdGUgPSByZWFjdGl2ZSh7IGNvdW50OiAwIH0pXG48L3NjcmlwdD4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8VGl0bGUgdi1iaW5kOm1zZz1cIm1lc2dcIiAvPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBpbmplY3QgfSBmcm9tICd2dWUnXG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJTdWJ0aXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG5cbmxldCBwYXJhbXMgPSBpbmplY3QoXCJwYXJhbXNcIilcbnZhciBtZXNnID0gcGFyYW1zICYmIHBhcmFtcy5tZXNzYWdlID8gcGFyYW1zLm1lc3NhZ2UgOiBcIlBPUlRBTCBTVUJUSVRMRVwiXG48L3NjcmlwdD5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgMTAwLCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvMzhkNmQ3YTFlMDJmYzJmOS5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxUaXRsZSBtc2c9XCJSZWFsaXR5IE1lZGlhXCIgLz5cblx0PGltZyBzcmM9XCIuLi8uLi9hc3NldHMvaW1hZ2VzL3JvdHVuZGEtbWFwLnBuZ1wiIHdpZHRoPVwiMjUwXCIgPlxuXHQ8ZGl2IGNsYXNzPVwiZGlzcGxheXRleHRcIj5BUiBhbGxvd3MgdXMgdG8gZXh0ZW5kIG91ciBwaHlzaWNhbCByZWFsaXR5OyBWUiBjcmVhdGVzIGZvciB1cyBhIGRpZmZlcmVudCByZWFsaXR5LjwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgICAvL3RoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvN2FmN2I5NWIzNWZkNzYxNi5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPFRpdGxlIG1zZz1cIkFSICZhbXA7IFZSIGFzIHJlYWxpdHkgbWVkaWFcIiAvPlxuXHQ8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWFnZXMvbGFjaW90YXQtVlIuanBnXCIgd2lkdGg9XCIyNTBcIiA+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj4gRWFjaCByZWFsaXR5IG1lZGl1bSBtZWRpYXRlcyBhbmQgcmVtZWRpYXRlcy4gSXQgb2ZmZXJzIGEgbmV3IHJlcHJlc2VudGF0aW9uIG9mIHRoZSB3b3JsZCB0aGF0IHdlIGltcGxpY2l0bHkgY29tcGFyZSBcblx0XHR0byBvdXIgZXhwZXJpZW5jZSBvZiB0aGUgd29ybGQgaW4gaXRzZWxmLCBidXQgYWxzbyB0aHJvdWdoIG90aGVyIG1lZGlhLjwvZGl2PiBcbiAgPC9kaXY+XG4gICA8cD5cbiAgICA8YSBocmVmPVwiaHR0cHM6Ly9yZWFsaXR5bWVkaWEuZGlnaXRhbFwiIHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgU3RhcnQgYXQgdGhlIHJlYWxpdHkgbWVkaWEgc2l0ZS4gXG4gICAgPC9hPlxuICAgIHxcbiAgPC9wPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvN2FiM2Q4NmFmZDQ4ZGJmYi5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gICAgPFRpdGxlIG1zZz1cIlRoZSBMYUNpb3RhdCBFZmZlY3RcIiAvPlxuICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cblx0ICA8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWFnZXMvbGFjaW90YXQuanBnXCIgd2lkdGg9XCIyNTBcIj5cblx0ICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+RmlsbSBiZWNhbWUgb25lIG9mIHRoZSBtb3N0IGltcG9ydGFudCByZWFsaXR5IFxuICAgICAgbWVkaWEgb2YgdGhlIHR3ZW50aWV0aCBjZW50dXJ5LCBhbmQgaW4gc29tZSB3YXlzLCBpdCBpcyBhIGZvcmVydW5uZXIgXG4gICAgICBvZiB2aXJ0dWFsIHJlYWxpdHkuPC9kaXY+ICBcbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+ICBcbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIC8vdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC85MWZkZmE4MTFlNzUyZGM4LmpwZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cblx0PGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICAgIDxUaXRsZSBtc2c9XCIzLUQgR3JhcGhpY3MgJmFtcDsgVHJhY2tpbmdcIiAvPlxuXHQ8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWFnZXMvdW5jYW5ueS5qcGdcIiB3aWR0aD1cIjIwMFwiPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+My1EIGNvbXB1dGVyIGdyYXBoaWNzIGhlbHAgdG8gY29uc3RydWN0IHRoZSB2aXN1YWwgXG5cdFx0cmVhbGl0aWVzIG9mIEFSIGFuZCBWUiwgdGhhdCBpcyBwaG90b3JlYWxpc20uIFRoZSB1bmNhbm55IHZhbGxleS48L2Rpdj5cblx0PC9kaXY+XG5cdDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgIC8vIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICAgIDxUaXRsZSBtc2c9XCJQcmVzZW5jZVwiIC8+XG5cdCAgPGRpdiBjbGFzcz1cInNwYWNlclwiPiBcblx0ICA8IS0tPGltZyBzcmM9XCIuLi8uLi9hc3NldHMvaW1hZ2VzL3BhcnRoZW5vbi5wbmdcIiB3aWR0aD1cIjI1MFwiPi0tPlxuXHQgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5QcmVzZW5jZSBpbiBWUiBpcyB1c3VhbGx5IGNvbmNlaXZlZCBvZiBhcyBmb3JnZXR0aW5nIHRoYXQgdGhlIG1lZGl1bSBpcyB0aGVyZS4gVGhlIGlkZWEgaXMgdGhhdCBpZiB0aGUgdXNlciBjYW4gYmUgZW50aWNlZCBpbnRvIGJlaGF2aW5nIGFzIGlmIHNoZSB3ZXJlIG5vdCBhd2FyZSBvZiBhbGwgdGhlIGNvbXBsZXggdGVjaG5vbG9neSwgdGhlbiBzaGUgZmVlbHMgcHJlc2VuY2UuPC9kaXY+ICBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgLy90aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0L2RjMDVjMDQ1NDZhNjllNjQucG5nXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICAgIDxUaXRsZSBtc2c9XCJHZW5yZXNcIiAvPlxuICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj4gXG5cdCAgPGltZyBzcmM9XCIuLi8uLi9hc3NldHMvaW1hZ2VzL3BhcnRoZW5vbi5wbmdcIiB3aWR0aD1cIjI1MFwiPlxuXHQgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5SZWFsaXR5IG1lZGlhIGFwcGxpY2F0aW9ucyBvZnRlbiBmdW5jdGlvbiBhcyBhZGRpdGlvbnMgdG8gZXN0YWJsaXNoZWQgZ2VucmVzLiBNb3N0IGN1cnJlbnQgQVIgYW5kIFZSIGFwcGxpY2F0aW9ucyBiZWhhdmUgbGlrZSBhcHBsaWNhdGlvbnMgb3IgYXJ0aWZhY3RzIHRoYXQgd2Uga25vdyBmcm9tIGVhcmxpZXIgbWVkaWEuPC9kaXY+ICBcbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgICAvL3RoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICAgIDxUaXRsZSBtc2c9XCJUaGUgRnV0dXJlIG9mIEFSICZhbXA7IFZSXCIgLz5cbiAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG5cdCAgPGltZyBzcmM9XCIuLi8uLi9hc3NldHMvaW1hZ2VzL3BhcnRoZW5vbi5wbmdcIiB3aWR0aD1cIjI1MFwiPlxuXHQgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5WUiB3aWxsIGNvbnRpbnVlIHRvIGNvbnN0cnVjdCBzcGVjaWFsIHJlYWxpdGllcywgYXBhcnQgZnJvbSB0aGUgZXZlcnlkYXkuIFZSIHdvcmxkcyB3aWxsIGNvbnRpbnVlIHRvIGJlIG1ldGFwaG9yaWMgd29ybGRzLjwvZGl2PiAgXG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgICA8VGl0bGUgbXNnPVwiUHJpdmFjeSBhbmQgUHVibGljIFNwYWNlXCIgLz5cbiAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG5cdCAgPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlBlcnZhc2l2ZSwgYWx3YXlzLW9uIEFSIGFwcGxpY2F0aW9ucyBoYXZlIHRoZSBwb3RlbnRpYWwgdG8gcHJvdmlkZSBjb21wYW5pZXMgb3IgZ292ZXJubWVudCBhdXRob3JpdGllcyBcbiAgICAgIGV2ZW4gbW9yZSBpbmZvcm1hdGlvbiBhbmQgd2l0aCBtb3JlIHByZWNpc2lvbiB0aGFuIG91ciBjdXJyZW50IG1vYmlsZSBhcHBsaWNhdGlvbnMgZG8sIFxuICAgICAgYm90aCBieSBhZ2dyZWdhdGluZyBvdXIgaGFiaXRzIGFzIGNvbnN1bWVycyBhbmQgYnkgaWRlbnRpZnlpbmcgdXMgYXMgaW5kaXZpZHVhbHMuPC9kaXY+ICBcbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAvLyAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICAgIFxuICAgIDxkaXYgY2xhc3M9XCJwb3N0ZXJ0aXRsZVwiPkFSICZhbXA7IFZSIGFzIHJlYWxpdHkgbWVkaWE8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZmx1c2hsZWZ0XCI+XG4gICAgICA8YnI+XG4gICAgICA8aDM+IFNvbWUgb2YgdGhlIGtleSBkaWZmZXJlbmNlcyBiZXR3ZWVuIOKAnGNsYXNzaWPigJ0gVlIgYW5kIEFSPC9oMz5cbiAgICAgIDxicj5cbiAgICAgIDxoMz4gRXh0ZW5kZWQgcmVhbGl0eSAoWFIpIGFuZCB0aGUgaW1tZXJzaXZlIHdlYiA8L2gzPlxuICAgICAgPGJyPlxuICAgICAgPGgzPiBXaGVyZSBBUiBhbmQgVlIgZml0IG9uIE1pbGdyYW0gYW5kIEtpc2hpbm/igJlzIHZpcnR1YWxpdHkgY29udGludXVtPC9oMz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgIC8vIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICAgIDxUaXRsZSBtc2c9XCJUaGUgSGlzdG9yeSBvZiBSZWFsaXR5IE1lZGlhXCIgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsdXNobGVmdFwiPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gU29tZSBvZiB0aGUga2V5IGRpZmZlcmVuY2VzIGJldHdlZW4g4oCcY2xhc3NpY+KAnSBWUiBhbmQgQVI8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gRXh0ZW5kZWQgcmVhbGl0eSAoWFIpIGFuZCB0aGUgaW1tZXJzaXZlIHdlYiA8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gV2hlcmUgQVIgYW5kIFZSIGZpdCBvbiBNaWxncmFtIGFuZCBLaXNoaW5v4oCZcyB2aXJ0dWFsaXR5IGNvbnRpbnV1bTwvaDM+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+IFxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICAgIDxUaXRsZSBtc2c9XCIzLUQgJmFtcDsgVHJhY2tpbmdcIiAvPlxuICAgICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmx1c2hsZWZ0XCI+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBTb21lIG9mIHRoZSBrZXkgZGlmZmVyZW5jZXMgYmV0d2VlbiDigJxjbGFzc2lj4oCdIFZSIGFuZCBBUjwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBFeHRlbmRlZCByZWFsaXR5IChYUikgYW5kIHRoZSBpbW1lcnNpdmUgd2ViIDwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBXaGVyZSBBUiBhbmQgVlIgZml0IG9uIE1pbGdyYW0gYW5kIEtpc2hpbm/igJlzIHZpcnR1YWxpdHkgY29udGludXVtPC9oMz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj4gICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gICAgPFRpdGxlIG1zZz1cIlByZXNlbmNlXCIgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsdXNobGVmdFwiPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gU29tZSBvZiB0aGUga2V5IGRpZmZlcmVuY2VzIGJldHdlZW4g4oCcY2xhc3NpY+KAnSBWUiBhbmQgQVI8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gRXh0ZW5kZWQgcmVhbGl0eSAoWFIpIGFuZCB0aGUgaW1tZXJzaXZlIHdlYiA8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gV2hlcmUgQVIgYW5kIFZSIGZpdCBvbiBNaWxncmFtIGFuZCBLaXNoaW5v4oCZcyB2aXJ0dWFsaXR5IGNvbnRpbnV1bTwvaDM+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+ICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICAgIDxUaXRsZSBtc2c9XCJHZW5yZXNcIiAvPlxuICAgICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmx1c2hsZWZ0XCI+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBTb21lIG9mIHRoZSBrZXkgZGlmZmVyZW5jZXMgYmV0d2VlbiDigJxjbGFzc2lj4oCdIFZSIGFuZCBBUjwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBFeHRlbmRlZCByZWFsaXR5IChYUikgYW5kIHRoZSBpbW1lcnNpdmUgd2ViIDwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBXaGVyZSBBUiBhbmQgVlIgZml0IG9uIE1pbGdyYW0gYW5kIEtpc2hpbm/igJlzIHZpcnR1YWxpdHkgY29udGludXVtPC9oMz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj4gICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gICAgPFRpdGxlIG1zZz1cIkZ1dHVyZVwiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbHVzaGxlZnRcIj5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFNvbWUgb2YgdGhlIGtleSBkaWZmZXJlbmNlcyBiZXR3ZWVuIOKAnGNsYXNzaWPigJ0gVlIgYW5kIEFSPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IEV4dGVuZGVkIHJlYWxpdHkgKFhSKSBhbmQgdGhlIGltbWVyc2l2ZSB3ZWIgPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFdoZXJlIEFSIGFuZCBWUiBmaXQgb24gTWlsZ3JhbSBhbmQgS2lzaGlub+KAmXMgdmlydHVhbGl0eSBjb250aW51dW08L2gzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PiAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgICA8VGl0bGUgbXNnPVwiUHJpdmFjeVwiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbHVzaGxlZnRcIj5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFNvbWUgb2YgdGhlIGtleSBkaWZmZXJlbmNlcyBiZXR3ZWVuIOKAnGNsYXNzaWPigJ0gVlIgYW5kIEFSPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IEV4dGVuZGVkIHJlYWxpdHkgKFhSKSBhbmQgdGhlIGltbWVyc2l2ZSB3ZWIgPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFdoZXJlIEFSIGFuZCBWUiBmaXQgb24gTWlsZ3JhbSBhbmQgS2lzaGlub+KAmXMgdmlydHVhbGl0eSBjb250aW51dW08L2gzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PiAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzE5MDk5NDM3MGFlYmUzOTUucG5nXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTUvQWx5eC1zcGxhc2gucG5nXCIgd2lkdGg9XCI0MDBcIiA+XG4gIDxicj48YnI+XG4gIDxUaXRsZSBtc2c9XCJIYWxmTGlmZTogQWx5eFwiIC8+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj4gRmlyc3QgcGVyc29uIHNob290ZXIgZ2FtZXMgc3VjaCBhcyAgPGEgaHJlZj1cImh0dHBzOi8vd3d3LmhhbGYtbGlmZS5jb20vZW4vYWx5eC9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5IYWxmTGlmZTogQWx5eCA8L2E+IGhhdmUgbG9uZyB1c2VkIDMtRCBncmFwaGljcyB0byBjcmVhdGUgYW4gaW1tZXJzaXZlIGV4cGVyaWVuY2UgZm9yIG1pbGxpb25zIG9mIHBsYXllcnMuIEFuZCBmb3IgZGVjYWRlcywgXG4gICAgcGxheWVycyBvbiBjb21wdXRlcnMgYW5kIGdhbWUgY29uc29sZXMgaGF2ZSB5ZWFybmVkIGZvciB0cnVlIFZSIHNvIHRoYXQgdGhleSBjb3VsZCBmYWxsIHRocm91Z2ggdGhlIHNjcmVlbiBpbnRvIHRoZSB3b3JsZHMgb24gdGhlIG90aGVyIHNpZGUuPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxUaXRsZSBtc2c9XCJQb2tlbW9uIEdvXCIgLz5cblx0ICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+UG9rZW1vbiBHbyAoMjAxNikgaXMgcGVyaGFwcyBzdGlsbCB0aGUgYmVzdC1rbm93biBBUiBnYW1lLiBcbiAgICAgIFRoZSBQb2tlbW9uIGZyYW5jaGlzZSB3YXMgYWxyZWFkeSBkZWNhZGVzIG9sZCwgYW5kIHRoaXMgd2FzIGNlcnRhaW5seSBwYXJ0IG9mIHRoZSBcbiAgICAgIGFuc3dlciBmb3IgdGhlIEFSIGdhbWXigJlzIHN1cnByaXNpbmcgaW1wYWN0LiBcbiAgICAgIEl0IHdhcyB0aGUgZmlyc3QgUG9rZW1vbiBnYW1lIG9uIGEgbW9iaWxlIHBob25lIGFuZCB0aGUgZmlyc3QgZnJlZSBQb2tlbW9uIGdhbWUgb24gYW55IHBsYXRmb3JtLlxuICAgIDwvZGl2PiBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgIC8vICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8VGl0bGUgbXNnPVwiQmVhdCBTYWJlclwiIC8+XG5cdCAgPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPkJlYXQgU2FiZXIgaXMgYSBWUiByaHl0aG0gZ2FtZSBcbiAgICAgIHdpdGggYSBsaXR0bGUgU3RhciBXYXJzIHRocm93biBpbi4gVGhlIHBsYXllciB1c2VzIGxpZ2h0c2FiZXJzIHRvIGtlZXAgdGhlIGJlYXQuIFxuICAgIDwvZGl2PiBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAvLyB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8VGl0bGUgbXNnPVwiV2Fsa2luZyBEZWFkOiBPdXIgV29ybGRcIiAvPlxuXHQgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5JbiB0aGlzIEFSIHZlcnNpb24gb2YgdGhlIHRyYW5zbWVkaWEgZnJhbmNoaXNlXG4gICAgICBHUFMgaXMgdXNlZCB0byBkZXRlcm1pbmUgeW91ciBsb2NhdGlvbiBpbiB0aGUgd29ybGQuIFlvdXIgbG9jYXRpb24gXG4gICAgICBhbmQgdGhlIHpvbWJpZXMgYXBwZWFyIGluIGFuIGVuaGFuY2VkIEdvb2dsZSBNYXBzIG1hcCBvbiB0aGUgcGhvbmUgc2NyZWVuLlxuICAgIDwvZGl2PiBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAvLyB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8VGl0bGUgbXNnPVwiTGEgQXBwYXJpemlvbmVcIiAvPlxuXHQgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5MaWtlIHZpZGVvIGdhbWVzIGFuZCAzNjAtZGVncmVlIHZpZGVvLCBcbiAgICAgIFZSIGFydCBlbXBoYXNpemVzIGltbWVyc2lvbiBhcyB0aGUgZmVhdHVyZSB0aGF0IG1ha2VzIHRoZSBleHBlcmllbmNlIFxuICAgICAgdW5pcXVlLCBhcyBpbiBhIFZSIHdvcmsgYnkgQ2hyaXN0aWFuIExlbW1lcnogZW50aXRsZWQgTGEgQXBwYXJpemlvbmUgKDIwMTcpLlxuICAgIDwvZGl2PiBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgLy90aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8VGl0bGUgbXNnPVwiTWluZWNyYWZ0IFZSXCIgLz5cblx0ICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+TWluZWNyYWZ0IFZSIGlzIGEgZnVsbHkgaW1tZXJzaXZlLCBcbiAgICAgIGhlYWRzZXQgdmVyc2lvbiBvZiB0aGUgc2FuZGJveCBnYW1lIHRoYXQgYWxyZWFkeSBydW5zIG9uIGNvbXB1dGVycywgZ2FtZSBjb25zb2xlcywgYW5kIG1vYmlsZSBkZXZpY2VzLiBcbiAgICAgIEl0IGlzIGNhbGxlZCBhIFwic2FuZGJveCBnYW1lXCIgYmVjYXVzZSBpdCBwcm92aWRlcyBhbiBpbmRlcGVuZGVudCBlbnZpcm9ubWVudCBpbiB3aGljaCBcbiAgICAgIHBsYXllcnMgY2FuIG1ha2UgdGhlaXIgb3duIHN0cnVjdHVyZXMgYW5kIG9iamVjdHMgb3V0IG9mIHZpcnR1YWwsIExFR08tbGlrZSBibG9ja3MuXG4gICAgPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyIGhlYWRsaW5lXCI+XG4gIDxUaXRsZSBtc2c9XCJBUiAmYW1wOyBWUiBHQU1FU1wiIC8+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXIgaGVhZGxpbmVcIj5cbiAgPFRpdGxlIG1zZz1cIkFSICZhbXA7IFZSIEFSVFwiIC8+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4vLyAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDxUaXRsZSBtc2c9XCJQcmVzZW5jZVwiIC8+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5QcmVzZW5jZSBpcyB0aGUgYWJzZW5jZSBvZiBtZWRpYXRpb24uIElmIHRoZSB1c2VycyBjYW4gZm9yZ2V0IHRoYXQgdGhlIG1lZGl1bSBpcyB0aGVyZSwgdGhlbiB0aGV5IGZlZWwgcHJlc2VuY2UuIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIC8vdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDwhLS0gPFRpdGxlIG1zZz1cIkF1cmFcIiAvPiAtLT5cbiAgPGRpdiBjbGFzcz1cImhlYWRsaW5lXCI+QXVyYTwvZGl2PlxuICA8YnI+XG4gIDxicj5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlxuICAgIDxwPkluIDE5MzBzLCBXYWx0ZXIgQmVuamFtaW4gaW50cm9kdWNlZCB0aGUgY29uY2VwdCBvZiA8ZW0+YXVyYTwvZW0+IGluIFRoZSBXb3JrIG9mIEFydCBpbiB0aGUgQWdlIG9mIE1lY2hhbmljYWwgUmVwcm9kdWN0aW9uLiBcbiAgQXVyYSBpcyB0aGUgPGVtPmhlcmUgYW5kIG5vdzwvZW0+IHRoYXQgd29yayBwb3NzZXNzZXMgYmVjYXVzZSBvZiBpdHMgdW5pcXVlIGhpc3Rvcnkgb2YgcHJvZHVjdGlvbiBhbmQgdHJhbnNtaXNzaW5vd29uLiA8L3A+XG4gIDxwPkFSIGFwcGxpY2F0aW9ucyBhcmUgbm90IHBlcmZlY3QgcmVwcm9kdWN0aXZlIHRlY2hub2xvZ2llcywgYXMgc29tZSBkcmF3IG9uIHRoZSBwaHlzaWNhbCBhbmQgY3VsdHVyYWwgdW5pcXVlc25lc3MsIDxlbT50aGUgaGVyZSBhbmQgbm93PC9lbT4gb2YgcGFydGljdWxhciBwbGFjZXMgPC9wPlxuICA8L2Rpdj4gXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgLy8gICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPFRpdGxlIG1zZz1cIkdhdWTDrSdzIENhc2EgQmF0bGzDsyB3aXRoIEFSXCIgLz5cbiAgPGJyPjxicj5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlwiQ2FzYSBCYXRsbMOzLCBvbmUgb2YgdGhlIG1hc3RlcnBpZWNlcyBvZiBBbnRvbmkgR2F1ZMOtLCBjYW4gYmUgZXhwZXJpZW5jZWQgd2l0aCB0aGUgbW9iaWxlIEFSLCB3aGljaCB2aXN1YWxpemVzIHRoZSByZWNvbnN0cnVjdGVkIGludGVyaW9yIGFuZCB0aGUgZGVzaWduIGluc3BpcmF0aW9ucyB0aHJvdWdoIDNEIGFuaW1hdGlvbnMuXCI8L2Rpdj5cbiAgPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgLy8gICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0L2I5YTMwN2RiM2I2MTU3ZTAuanBnXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cblxuICAgIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi9DYXNhLWJhdGxsby5qcGdcIiBjbGFzcz1cImZ1bGxcIj5cblxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgLy8gICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG5cbiAgPFRpdGxlIG1zZz1cIkN5YmVyc2lja25lc3MgYW5kIHRoZSBuZWdhdHRpb24gb2YgcHJlc2VuY2VcIiAvPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+XG4gIDxicj48YnI+XG4gICBUaGUgdGVybSBjeWJlcnNpY2tuZXNzLCBvciB2aXN1YWxseSBpbmR1Y2VkIG1vdGlvbiBzaWNrbmVzcywgaGFzIGJlZW4gY29pbmVkIHRvIGRlc2NyaWJlIHN5bXB0b21zIGluY2x1ZGluZyBoZWFkYWNoZSwgbmF1c2VhLCBleWUgc3RyYWluLCBkaXp6aW5lc3MsIGZhdGlndWUsIG9yIGV2ZW4gdm9taXRpbmcgdGhhdCBtYXkgb2NjdXIgZHVyaW5nIG9yIGFmdGVyIGV4cG9zdXJlIHRvIGEgdmlydHVhbCBlbnZpcm9ubWVudC4gQ3liZXJzaWNrbmVzcyBpcyB2aXNjZXJhbCBldmlkZW5jZSB0aGF0IFZSIGlzIG5vdCB0aGUgbWVkaXVtIHRvIGVuZCBhbGwgbWVkaWEuIEN5YmVyc2lja25lc3MgcmVtaW5kcyB0aGUgc3VzY2VwdGlibGUgdXNlciBvZiB0aGUgbWVkaXVtIGluIGEgcG93ZXJmdWwgd2F5LiBOYXVzZWEgcmVwbGFjZXMgYXN0b25pc2htZW50LiAgXG5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgIC8vICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvYjkyYzVmNWFhMDc5MjY2NS5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICAgIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi9SaWRlVlIuanBnXCIgY2xhc3M9XCJmdWxsXCI+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgIC8vICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8VGl0bGUgbXNnPVwiUHJlc2VuY2UgYW5kIEVtcGF0aHlcIiAvPlxuICA8YnIvPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+UmVzZWFyY2hlcnMgaGF2ZSBsb25nIHB1cnN1ZWQgdGhlIGlkZWEgb2YgZW1vdGlvbmFsIHJlYWN0aW9ucyBzdWNoIGFzIGVtcGF0aHkgYXMgYSB0ZXN0IG9mIHByZXNlbmNlLiBcbiBWUiBpcyAgdW5kZXJzdG9vZCBhcyBnZXR0aW5nIHVzIGNsb3NlciB0byB0aGUgYXV0aGVudGljIG9yIHRoZSByZWFsLiBCdXQgZm9yZ2V0dGluZyB0aGUgbWVkaXVtIGlzIG5vdCBuZWNlc3NhcnkgZm9yIGEgc2Vuc2Ugb2YgcHJlc2VuY2UuIFByZXNlbmNlIGNhbiBiZSB1bmRlcnN0b29kIGluIGEgbW9yZSBudWFuY2VkIHdheSBhcyBhIGxpbWluYWwgem9uZSBiZXR3ZWVuIGZvcmdldHRpbmcgYW5kIGFja25vd2xlZGdpbmcgVlIgYXMgYSBtZWRpdW0uXG48L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8IS0tIDxUaXRsZSBtc2c9XCJQcmVzZW5jZSBhbmQgRW1wYXRoeVwiIC8+IC0tPlxuICA8ZGl2IGNsYXNzPVwiaGVhZGxpbmVcIj5QcmVzZW5jZSBhbmQgRW1wYXRoeTwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgIC8vICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC9iZWI2MThmZmUzNzY5YmI2LnBuZ1wiIiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0L2JmMjFmMzQ0MmQzZmE4NGQucG5nXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8ZGl2IGNsYXNzPVwibGFyZ2VyVGV4dFwiIHN0eWxlPVwiZm9udC13ZWlnaHQ6Ym9sZDt0ZXh0LWFsaWduOmxlZnRcIj4xLiBXaGF0IGlzIFByZXNlbmNlPzwvZGl2PlxuICAgIDxiciAvPlxuICAgIDxiciAvPlxuICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTYvdXBhcnJvdy5wbmdcIiB3aWR0aD1cIjUwXCIgc3R5bGU9XCJmbG9hdDogcmlnaHRcIj5cblx0PGRpdiBjbGFzcz1cInBvc3RlcnRpdGxlXCIgc3R5bGU9XCJ0ZXh0LWFsaWduOmxlZnRcIj4yLiBNYW5pZmVzdGF0aW9ucyBvZiBQcmVzZW5jZTwvZGl2PlxuICAgIDxiciAvPlxuICAgICAgPGJyIC8+XG4gICAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1Jvb202L3VyYXJyb3cucG5nXCIgd2lkdGg9XCI1MFwiICBzdHlsZT1cImZsb2F0OiByaWdodFwiPlxuXHQ8ZGl2IGNsYXNzPVwicG9zdGVydGl0bGVcIiBzdHlsZT1cInRleHQtYWxpZ246bGVmdFwiPjMuIEF1cmEsIFBsYWNlIGFuZCBTcGFjZSA8L2Rpdj5cbiAgIFxuXG5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgLy8gICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvNDZkNzc5M2ZhN2FiMjRhZC5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxkaXYgc3R5bGU9XCJmb250LXNpemU6Mi40cmVtOyBmb250LXdlaWdodDpib2xkO3RleHQtYWxpZ246bGVmdFwiPjIuIE1hbmlmZXN0YXRpb25zIG9mIFByZXNlbmNlPC9kaXY+XG4gICAgPGJyIC8+XG4gICAgPGJyPlxuICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTYvcmlnaHRhcnJvdy5wbmdcIiB3aWR0aD1cIjUwXCIgc3R5bGU9XCJmbG9hdDogcmlnaHRcIj5cblx0PGRpdiBjbGFzcz1cInBvc3RlcnRpdGxlXCIgc3R5bGU9XCJ0ZXh0LWFsaWduOmxlZnRcIj4xLiBXaGF0IGlzIFByZXNlbmNlPzwvZGl2PlxuICAgIDxiciAvPlxuICAgICAgPGJyIC8+XG4gICAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1Jvb202L3VwYXJyb3cucG5nXCIgd2lkdGg9XCI1MFwiICBzdHlsZT1cImZsb2F0OiByaWdodFwiPlxuXHQ8ZGl2IGNsYXNzPVwicG9zdGVydGl0bGVcIiBzdHlsZT1cInRleHQtYWxpZ246bGVmdFwiPjMuIEF1cmEsIFBsYWNlIGFuZCBTcGFjZSA8L2Rpdj5cbiAgIFxuXG5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgLy8gICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvZjg5Y2I0ZTM1MDQ2OWIxNC5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxkaXYgY2xhc3M9XCJsYXJnZXJUZXh0XCIgc3R5bGU9XCJmb250LXNpemU6Mi44cmVtO2ZvbnQtd2VpZ2h0OmJvbGQ7dGV4dC1hbGlnbjpsZWZ0XCI+My4gQXVyYSwgUGxhY2UgYW5kIFNwYWNlIDwvZGl2PlxuICA8YnI+PGJyPlxuICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTYvdWxhcnJvdy5wbmdcIiB3aWR0aD1cIjUwXCIgc3R5bGU9XCJmbG9hdDogcmlnaHRcIj5cblx0PGRpdiBjbGFzcz1cInBvc3RlcnRpdGxlXCIgc3R5bGU9XCJ0ZXh0LWFsaWduOmxlZnRcIj4xLiBXaGF0IGlzIFByZXNlbmNlPzwvZGl2PlxuICAgIDxiciAvPlxuICAgICAgPGJyIC8+XG4gICAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1Jvb202L3VwYXJyb3cucG5nXCIgd2lkdGg9XCI1MFwiICBzdHlsZT1cImZsb2F0OiByaWdodFwiPlxuXHQ8ZGl2IGNsYXNzPVwicG9zdGVydGl0bGVcIiBzdHlsZT1cInRleHQtYWxpZ246bGVmdFwiPjIuIE1hbmlmZXN0YXRpb25zIG9mIFByZXNlbmNlPC9kaXY+XG4gICBcblxuXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgIC8vICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzQ5MDU3NTczNzQ5MjMyNTkucG5nXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTYvbGZhcnJvdy5wbmdcIiB3aWR0aD1cIjIwXCIgc3R5bGU9XCJmbG9hdDogbGVmdDsgbWFyZ2luOiAxMHB4XCI+XG4gIDxUaXRsZSBtc2c9XCJVbHRpbWF0ZSBFbXBhdGh5IE1hY2hpbmVcIiAvPlxuICA8YnI+PGJyPlxuICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+MzYwPHNwYW4+JiMxNzY7PC9zcGFuPiBmaWxtIENsb3VkcyBPdmVyIFNpZHJhIGNyZWF0ZWQgYnkgQ2hyaXMgTWlsayBhbmQgR2FibyBBcm9yYSBzaG93cyB0aGUgbGlmZSBvZiBTeXJpYW4gcmVmdWdlZXMgaW4gWmEnYXRhcmkgY2FtcCBpbiBKb3JkYW4uIFRoZSBjYW1lcmEgZm9sbG93cyAxMi15ZWFyIG9sZCBTaWRyYSBpbiBoZXIgZXZlcnlkYXkgbGlmZSwgYWxsb3dpbmcgdGhlIHVzZXJzIHRvIGJlIHByZXNlbnQgd2l0aCBTaWRyYS4gPC9kaXY+XG4gIDxiciAvPlxuICA8YmxvY2txdW90ZSBjbGFzcz1cInNxdWFyZW9mZlwiPlwiV2hlbiB5b3XigJlyZSBpbnNpZGUgb2YgdGhlIGhlYWRzZXQgLiAuIC4geW91IHNlZSBmdWxsIDM2MCBkZWdyZWVzLCBpbiBhbGwgZGlyZWN0aW9ucy4gQW5kIHdoZW4geW914oCZcmUgc2l0dGluZyB0aGVyZSBpbiBoZXIgcm9vbSwgd2F0Y2hpbmcgaGVyLCB5b3UncmUgbm90IHdhdGNoaW5nIGl0IHRocm91Z2ggYSB0ZWxldmlzaW9uIHNjcmVlbiwgeW914oCZcmUgbm90IHdhdGNoaW5nIGl0IHRocm91Z2ggYSB3aW5kb3csIHlvdeKAmXJlIHNpdHRpbmcgdGhlcmUgd2l0aCBoZXIuIFdoZW4geW91IGxvb2sgZG93biwgeW91J3JlIHNpdHRpbmcgb24gdGhlIHNhbWUgZ3JvdW5kIHRoYXQgc2hl4oCZcyBzaXR0aW5nIG9uLiBBbmQgYmVjYXVzZSBvZiB0aGF0LCB5b3UgZmVlbCBoZXIgaHVtYW5pdHkgaW4gYSBkZWVwZXIgd2F5LiBZb3UgZW1wYXRoaXplIHdpdGggaGVyIGluIGEgZGVlcGVyIHdheS4gKE1pbGsgMjAxNSlcIjwvYmxvY2txdW90ZT5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgIC8vICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvYjQ2NGRiZTkwZDYxMzNhYi5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuXG4gICAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1Jvb202L2Nsb3Vkb3ZlcnNpZHJhLmpwZ1wiIHN0eWxlPVwid2lkdGg6MTAwJVwiPlxuXG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAvLyAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvMTM5M2Q3ZTYyZWY3YWE4YS5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICAgIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi9jbG91ZG92ZXJzaWRyYTIuanBnXCIgY2xhc3M9XCJmdWxsXCI+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAvLyAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPFRpdGxlIG1zZz1cIlRoZSBmdXR1cmUgb2YgbmV3cz9cIiAvPlxuICA8YnI+XG4gIDxicj5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPk5vbm5pZSBkZSBsYSBQZcOxYSdzIDxhIGhyZWY9XCJodHRwczovL2VtYmVkLnRlZC5jb20vdGFsa3Mvbm9ubnlfZGVfbGFfcGVuYV90aGVfZnV0dXJlX29mX25ld3NfdmlydHVhbF9yZWFsaXR5XCIgdGFyZ2V0PVwiX2JsYW5rXCI+VGVkIFRhbGs8L2E+IGNhbGxlZCAnVGhlIGZ1dHVyZSBvZiBuZXdzPycnICBpbnRyb2R1Y2VzIGEgbmV3IGZvcm0gb2Ygam91cm5hbGlzbSB3aGVyZSBWaXJ0dWFsIFJlYWxpdHkgdGVjaG5vbG9neSBpcyB1c2VkIHRvIHB1dCBhdWRpZW5jZSBpbnNpZGUgdGhlIHN0b3JpZXMuIEluIGhlciB3b3JrLCBzaGUgY3JlYXRlZCBWUiBzdG9yaWVzIGFib3V0IGltcHJpc29ubWVudCBpbiBHdWFudGFuYW1vIGFuZCBodW5nZXIgaW4gTG9zIEFuZ2VsZXMgdG8gaW5kdWNlIGVtcGF0aHkgaW4gdGhlIGF1ZGllbmNlLjwvZGl2PiBcbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvYjM5MzNmZjM1OWY5NDliYS5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTYvbm9ubmllLnBuZ1wiIHN0eWxlPVwid2lkdGg6MTAwJVwiID5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgIC8vICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuXG4gIFx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlRoZSBwaXQgZXhwZXJpbWVudCBpcyBhIHZpcnR1YWwgZXhwZXJpZW1lbnQgb2Z0ZW4gdXNlZCB0byBldmFsdWF0ZSB0aGUgc2VuY2Ugb2YgcHJlc2VuY2UuIFRoZSB1c2VyIGlzIGdpdmVuIGEgdGFzayB0byBncmFiIGFuIG9iamVjdCBvbiBwbGFuayBhbmQgdGFrZSBpdCB0byB0aGUgb3RoZXIgc2lkZSwgY3Jvc3NpbmcgdGhlIHBpdC4gPC9kaXY+XG5cbiAgPC9kaXY+XG5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzIxNzZkYzY2ZjVhMDI1NDYucG5nXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1Jvb202L3BpdFZSLnBuZ1wiIGNsYXNzPVwiZnVsbFwiID5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuXG4gIFx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlxuPGRpdiBzdHlsZT1cImZvbnQtd2VpZ2h0OmJvbGRcIj5QcmVzZW5jZSBpbiBBUjwvZGl2Pjxicj5cblRoaXMgZXhwZXJpbWVudCB3YXMgaW5zcGlyZWQgYnkgdGhlIFZSIFwicGl0XCIgZXhwZXJpbWVudCBkZXNjcmliZWQgb24gdGhlIHdhbGwgdG8geW91ciByaWdodC4gVGhlIHN1YmplY3RzIHdvcmUgQVIgaGVhZHNldHMgaW5zdGVhZCBvZiBWUiBvbmVzLiBUaGV5IGNvdWxkIHNlZSB0aGUgcm9vbSBhcm91bmQgdGhlbSwgYnV0IHRoZSBwaXQgaXRzZWxmIHdhcyBzdGlsbCB2aXJ0dWFsLiBXb3VsZCB0aGUgc3ViamVjdHMgd291bGQgZmVlbCB0aGUgc2FtZSBtZWFzdXJhYmxlIGFueGlldHkgaW4gQVIgYXMgaW4gVlI/IFRoZSBzdWJqZWN0cyBmaWxsZWQgb3V0IGEgcXVlc3Rpb25uYWlyZSBhZnRlciB0aGUgZXhwZXJpZW5jZSBhbmQgaW5kaWNhdGVkIHRoYXQgdGhleSBkaWQgaGF2ZSBhIGZlZWxpbmcgb2YgcHJlc2VuY2UsIGJ1dCBpbiB0aGlzIGNhc2UsIHVubGlrZSBpbiB0aGUgVlIgZXhwZXJpbWVudCwgdGhlIHBoeXNpb2xvZ2ljYWwgZGF0YSAoaGVhcnQgcmF0ZSBldGMuKSBkaWQgbm90IGluZGljYXRlIGEgcmVzcG9uc2UuXG48YnI+PGJyPlxuR2FuZHksIE1hcmliZXRoLCBldCBhbC4gMjAxMC4g4oCcRXhwZXJpZW5jZXMgd2l0aCBhbiBBUiBFdmFsdWF0aW9uIFRlc3QgQmVkOiBQcmVzZW5jZSwgUGVyZm9ybWFuY2UsIGFuZCBQaHlzaW9sb2dpY2FsIE1lYXN1cmVtZW50LuKAnSBJbiAyMDEwIElFRUUgSW50ZXJuYXRpb25hbCBTeW1wb3NpdW0gb24gTWl4ZWQgYW5kIEF1Z21lbnRlZCBSZWFsaXR5LCAxMjfigJMzNi4gU2VvdWwsIEtvcmVhIChTb3V0aCk6IElFRUUuIGh0dHBzOi8vZG9pLm9yZy8xMC4xMTA5L0lTTUFSLjIwMTAuNTY0MzU2MC5cblxuIDwvZGl2PlxuXG4gIDwvZGl2PlxuXG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC9kZWRjYjdmMTYyYWY1ZWFlLmpwZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi9waXRBUi5qcGdcIiBjbGFzcz1cImZ1bGxcIiA+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInBvc3RlcnRpdGxlXCI+UHJlc2VuY2U8L2Rpdj5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlByZXNlbmNlIGlzIGEga2luZCBvZiBhYnNlbmNlLCB0aGUgYWJzZW5jZSBvZiBtZWRpYXRpb24uIElmIHRoZSB1c2VycyBjYW4gZm9yZ2V0IHRoYXQgdGhlIG1lZGl1bSBpcyB0aGVyZSwgdGhlbiB0aGV5IGZlZWwgcHJlc2VuY2UuIFxuICA8YnI+XG4gIDxicj5cbiAgVG8gbG9vayBmdXJ0aGVyLCBMb21iYXJkIGFuZCBEaXR0b24ncyBjbGFzc2lmaWNhdGlvbiBvZiBwcmVzZW5jZSBpcyB1c2VmdWwuIFRoZXkgZ3JvdXBlZCBkZWZpbml0aW9ucyBvZiBwcmVzZW5jZSBpbnRvIHR3byBjYXRlZ29yaWVzLCB3aGljaCBhcmVcbiAgPGJyPlxuICA8YnI+XG4gIDxkaXYgY2xhc3M9XCJrZXlQb2ludFwiPiBcbiAgKDEpIGluZGl2aWR1YWwgcGVyY2VwdGlvbiBvZiB0aGUgd29ybGRcbiAgPGJyPlxuICAoMikgc29jaWFsIGludGVyYWN0aW9uIGFuZCBlbmdhZ2VtZW50IHdpdGggb3RoZXJzPC9kaXY+XG4gIDxicj5cbiAgPGJyPlxuICBUaGUgZmlyc3QgY2F0ZWdvcnkgaW5jbHVkZXMgcHJlc2VuY2UgYXMgdHJhbnNwb3J0YXRpb24sIGFzIGltbWVyc2lvbiBhbmQgYXMgcmVhbGlzbS5cbiAgPC9kaXY+XG4gIDxicj5cbiAgPGJyPlxuICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCIgc3R5bGU9XCJmb250LXN0eWxlOml0YWxpY1wiPlwiVlIgYW5kIEFSIGNhbm5vdCBkZWNlaXZlIHRoZWlyIHVzZXJzIGludG8gYmVsaWV2aW5nIHRoYXQgdGhleSBhcmUgaGF2aW5nIGEgbm9uLW1lZGlhdGVkIGV4cGVyaWVuY2UuIEJ1dCB0aGF0IGlzIG5vdCBuZWNlc3NhcnkgZm9yIGEgc2Vuc2Ugb2YgcHJlc2VuY2UuXCI8L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPC9kaXY+IFxuICBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDxUaXRsZSBtc2c9XCJUcmVlaHVnZ2VyOiBXYXdvbmFcIiAvPlxuICA8YnI+PGJyPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+VHJlZWh1Z2dlcjogV2F3b25hIFZSIGV4cGVyaWVuY2UgdHJhbnNwb3J0cyB0aGUgdXNlcnMgdG8gdGhlIHJlZCBnaWFudCBTZXF1b2lhIHRyZWVzIGZyb20gdGhlIFNlcXVvaWEgTmF0aW9uYWwgUGFyay4gSXQgcHJvdmlkZXMgYSBzZW5zZSBvZiBpbnRpbWFjeSB3aXRoIHRoZSB0cmVlIC0gd2l0aCBpdHMgYmFyaywgd2l0aCB0aGUgY2VsbHMgdGhhdCBtYWtlIHVwIGl0cyBiZWluZy4gVGhlIHZpdmlkbmVzcyBvZiB0aGUgd29yayBpbGx1c3RyYXRlcyA8ZW0+cHJlc2VuY2U8L2VtPi4gPC9kaXY+XG4gIDwhLS0gSW4gdGhpcyBleHBlcmllbmNlLCB1c2VycyBmaW5kIHRoZW1zZWx2ZXMgb24gdGhlIHRocmVzaG9sZCBvZiBmb3JnZXR0aW5nIHRoYXQgd2UgYXJlIGhhdmluZyBhIFZSIGV4cGVyaWVuY2UuIEJlaW5nIG9uIHRoYXQgdGhyZXNob2xkIGlzIGEgc2VuY2Ugb2YgcHJlc2VuY2UgaW4gYSByZWFsaXR5IG1lZGl1bS4gLS0+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzI3M2RlYzQ3ZWM3NjIzMGQucG5nXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICAgIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi90cmVlaHVnZ2VyLnBuZ1wiIHN0eWxlPVwid2lkdGg6NDUwcHhcIiA+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAvLyB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgPFRpdGxlIG1zZz1cIkJhY2sgdG8gdGhlIG1haW4gZXhoaWJpdGlvblwiIC8+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAvLyB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzkwMGM1YzMzY2I1MGIwZGYucG5nXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTYvTGFjaW90YXQucG5nXCIgY2xhc3M9XCJmdWxsXCI+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAvLyAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvODZlYjEyZTc0ZDlmN2QyZS5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICAgIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi9TcGFjZUFuZFBsYWNlLnBuZ1wiIGNsYXNzPVwiZnVsbFwiPlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAvLyAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgPCEtLSA8VGl0bGUgbXNnPVwiVGhlIGZ1dHVyZSBvZiBuZXdzP1wiIC8+IC0tPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+UGFydGhlbm9uIG1vZGVsIGV4cGxhbmF0aW9uPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC9hN2QxMjQ0YzRiMjNiN2IwLmpwZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi90ZXJyYWNvdHRhLmpwZ1wiIGNsYXNzPVwiZnVsbFwiID5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgIC8vICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxUaXRsZSBtc2c9XCJUZXJyYWNvdHRhIFdhcnJpb3JzIEFSXCIgLz5cbiAgPGJyPjxicj5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlwiVGhlIEZyYW5rbGluIEluc3RpdHV0ZSBpcyB1c2luZyBBUiB0byBlbmhhbmNlIHRoZWlyIFRlcnJhY290dGEgV2FycmlvciBleGhpYml0aW9uIHdoaWNoIHdlcmUgZGlzcGxheWVkIGluIFBoaWxhZGVscGhpYSB1bnRpbCBNYXJjaCAyMDE4LiBUaGUgbXVzZXVt4oCZcyBhcHAsIHBvd2VyZWQgYnkgV2lraXR1ZGUgdGVjaG5vbG9neSwgYWxsb3dzIHZpc2l0b3JzIHRvIHVzZSB0aGVpciBzbWFydHBob25lIHRvIHNjYW4gaXRlbXMgYW5kIHZpc3VhbGl6ZSByaWNoIEFSIGNvbnRlbnQgdG8gbGVhcm4gZXZlbiBtb3JlIGFib3V0IHRoZSBpbnRyaWd1aW5nIGhpc3RvcnkgYmVoaW5kIHRoZSBtYWduaWZpY2VudCBjbGF5IHNvbGRpZXJzLlwiPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgICA8IS0tPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1Jvb202L3RyZWVodWdnZXIyLmpwZ1wiIHdpZHRoPVwiNjAwXCIgPi0tPlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgIC8vICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgPFRpdGxlIG1zZz1cIlBpdCBFeHBlcmltZW50XCIgLz5cbiAgPGJyPlxuICA8YnI+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5NZWFzdXJpbmcgdGhlIGFtb3VudCBvZiBwcmVzZW5jZSBvciB0aGUgc2Vuc2Ugb2YgYmVpbmcgdGhlcmUsIGlzIG9uZSBvZiB0aGUgZmV3IHdheXMgdG8gYXNzZXNzIHRoZSBxdWFsaXR5IG9mIGEgdmlydHVhbCBzcGFjZS4gVGhpcyB2aXJ0dWFsIHBpdCBleHBlcmltZW50IGlzIGEgc3BhY2UgdGhhdCBtZWFzdXJlcyB0aGUgcHJlc2VuY2UgYnkgbWVhc3VyaW5nIGNoYW5nZXMgaW4gcGh5c2lvbG9naWNhbCByZWFjdGlvbnMgaW4gdXNlcnMgc3VjaCBhcyBjaGFuZ2VzIGluIGhlYXJ0IHJhdGUuIEluIHRoaXMgdmlydHVhbCByb29tLCBmZWVsIHdoZXRoZXIgeW91ciBoZWFydCBpcyBiZWF0aW5nIGZhc3RlciBvciB5b3VyIGhhbmRzIGdldCBzd2VhdHkgYXMgaWYgeW91IGFyZSBpbiBhIHJlYWwgc3BhY2UuICBcbiAgICA8YnI+XG4gICAgPGJyPlxuICAgIDxicj5cbiAgTWVlaGFuLCBNLiwgSW5za28sIEIuLCBXaGl0dG9uLCBNLiwgJiBCcm9va3MgSnIsIEYuIFAuICgyMDAyKS4gUGh5c2lvbG9naWNhbCBtZWFzdXJlcyBvZiBwcmVzZW5jZSBpbiBzdHJlc3NmdWwgdmlydHVhbCBlbnZpcm9ubWVudHMuIEFjbSB0cmFuc2FjdGlvbnMgb24gZ3JhcGhpY3MgKHRvZyksIDIxKDMpLCA2NDUtNjUyLiBcbiAgPGJyPlxuICA8YnI+XG4gIDwvZGl2PiBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8VGl0bGUgbXNnPVwiSW5zdHJ1Y3Rpb25zXCIgLz5cbiAgPGJyPlxuICA8YnI+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj4xLiBQaWNrIHVwIGEgdmlydHVhbCBib29rIGluIHRoaXMgcm9vbSBhbmQgcGxhY2UgaXQgaW4gdGhlIGRlc2lnbmF0ZWQgYXJlYSBvbiB0aGUgZmFyIHNpZGUgb2YgdGhlIFBpdCByb29tLlxuICA8YnI+XG4gIDxicj5cbjIuIFBpY2sgdXAgYSBibHVlIGJhbGwgYW5kIGRyb3AgaXQgb24gYSBibHVlIHRhcmdldCBvbiB0aGUgZmxvb3Igb2YgdGhlIFBpdCByb29tLlxuPGJyPlxuPGJyPlxuPGJyPlxuPGJyPlxuSGVhZC1Nb3VudGVkIERpc3BsYXkgZGV2aWNlcyBzdWNoIGFzIE9jdWx1cyBhcmUgcmVjb21tZW5kZWQgZm9yIHRoaXMgZXhwZXJpbWVudC4gPC9kaXY+XG48YnI+XG48YnI+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDxUaXRsZSBtc2c9XCJWZXJ5IGNhcmVmdWxseSBzdHJldGNoIHlvdXIgYXJtcyBvdXQgZm9yIGJhbGFuY2UuXCIgLz5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgPFRpdGxlIG1zZz1cIkRvZXMgdGhpcyBleHBlcmltZW50IG1ha2UgeW91IHN3ZWF0IG9yIHlvdXIgaGVhcnQgYmVhdCBmYXN0ZXI/XCIgLz5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgPFRpdGxlIG1zZz1cIlByZXNlbmNlIEdhbGxlcnlcIiAvPlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuICA8L2Rpdj5cbiAgXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbjxUaXRsZSBtc2c9XCJXZWxjb21lIHRvIFJlYWxpdHkgTWVkaWEhXCIgLz5cbjxicj48YnI+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj4gPGk+UmVhbGl0eSBNZWRpYTwvaT4gaXMgYSBwcm9qZWN0IGVuY29tcGFzc2luZyB0aHJlZSB3cml0aW5nIHNwYWNlcywgdGhyZWUgdGVjaG5vbG9naWVzIGZvciByZXByZXNlbnRpbmcgaWRlYXM6IHByaW50LCB0aGUgd2ViLCBhbmQgaW1tZXJzaXZlIFZSLiBUaGUgcHJpbnRlZCBwYWdlIGlzIGEgd3JpdGluZyBzcGFjZSB3aXRoIGEgdHJhZGl0aW9uIGRhdGluZyBiYWNrIHRvIHRoZSBmaWZ0ZWVudGggY2VudHVyeSAoaW4gRXVyb3BlLCBtdWNoIGVhcmxpZXIgaW4gQ2hpbmEpLiBPYnZpb3VzbHkgdGhlIHdlYiBoYXMgYSBmYXIgc2hvcnRlciB0cmFkaXRpb24sIGJlZ2lubmluZyBhcm91bmQgMTk5MC4gQnV0IGluIHRoZSB0aGlydHkgeWVhciBzaW5jZSBUaW0gQmVybmVycy1MZWUgbGF1bmNoZWQgdGhlIGZpcnN0IHdlYiBzZXJ2ZXIsIHRoZSB3ZWIgaGFzIGdyb3duIHRvIHJpdmFsIHByaW50IGZvciBtYW55IGtpbmRzIG9mIGNvbW11bmljYXRpb24uIFRoZSB0ZWNobm9sb2dpZXMgZm9yIGNyZWF0aW5nIDNEIGdyYXBoaWMgc3BhY2VzIGluIFZSIChhbmQgQVIpIGFjdHVhbGx5IHByZWRhdGUgdGhlIHdlYi4gQnV0IG9ubHkgaW4gdGhlIHBhc3QgMTAgeWVhcnMgaGF2ZSBBUiBhbmQgVlIgYmVjb21lIHdpZGVseSBhdmFpbGFibGUgbWVkaWEuIFRoZSBnb2FsIG9mIFJlYWxpdHlNZWRpYSBpcyB0byBkZW1vbnN0cmF0ZSB0aGUgcG90ZW50aWFsIHJhbmdlIG9mIEFSIGFuZCBWUiBhcyBjb21tdW5pY2F0aXZlIGZvcm1zLlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCw0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC83YTI0YTZkMzA5ZDQ1M2YyLmpwZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPFRpdGxlIG1zZz1cIlJlYWxpdHkgTWVkaWFcIiAvPlxuICA8YnIgLz5cbiAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL09uYm9hcmRpbmcvcmVhbGl0eU1lZGlhQm9vay5qcGdcIiB3aWR0aD1cIjI4MFwiIHN0eWxlPVwiZmxvYXQ6bGVmdDsgbWFyZ2luLXJpZ2h0OjIwcHhcIj5cblxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+PGRpdiBzdHlsZT1cIm1hcmdpbi1sZWZ0OjMwcHhcIj5QdWJsaXNoZWQgYnkgPGEgaHJlZj1cImh0dHBzOi8vbWl0cHJlc3MubWl0LmVkdS9ib29rcy9yZWFsaXR5LW1lZGlhXCI+TUlUIFByZXNzPC9hPjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwib2JsaXF1ZVwiPkJ5IEpheSBEYXZpZCBCb2x0ZXIsIE1hcmlhIEVuZ2JlcmcgYW5kIEJsYWlyIE1hY0ludHlyZTwvZGl2PiBcbiAgPGJyPlxuICA8ZGl2IGNsYXNzPVwicXVvdGVcIj5Ib3cgYXVnbWVudGVkIHJlYWxpdHkgYW5kIHZpcnR1YWwgcmVhbGl0eSBhcmUgdGFraW5nIHRoZWlyIHBsYWNlcyBpbiBjb250ZW1wb3JhcnkgbWVkaWEgY3VsdHVyZSBhbG9uZ3NpZGUgZmlsbSBhbmQgdGVsZXZpc2lvbi48L2Rpdj48L2Rpdj5cblxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCw0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxUaXRsZSBtc2c9XCJCb29rOiBSZWFsaXR5IE1lZGlhXCIgLz5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiIHN0eWxlPVwid2lkdGg6MzgwcHhcIj5QdWJsaXNoZWQgYnkgPGEgaHJlZj1cImh0dHBzOi8vbWl0cHJlc3MubWl0LmVkdS9ib29rcy9yZWFsaXR5LW1lZGlhXCI+TUlUIFByZXNzPC9hPjwvZGl2PlxuICA8YnI+XG4gIDxkaXYgY2xhc3M9XCJvYmxpcXVlIHNxdWFyZW9mZlwiPkJ5IEpheSBEYXZpZCBCb2x0ZXIsIE1hcmlhIEVuZ2JlcmcgYW5kIEJsYWlyIE1hY0ludHlyZTwvZGl2PiBcbiAgPGJyPlxuICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmIHF1b3RlXCI+XCJIb3cgYXVnbWVudGVkIHJlYWxpdHkgYW5kIHZpcnR1YWwgcmVhbGl0eSBhcmUgdGFraW5nIHRoZWlyIHBsYWNlcyBpbiBjb250ZW1wb3JhcnkgbWVkaWEgY3VsdHVyZSBhbG9uZ3NpZGUgZmlsbSBhbmQgdGVsZXZpc2lvbi5cIiA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvNWIxNGRhOTZlMjg4OWZmMi5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9PbmJvYXJkaW5nL01vemlsbGFIdWJzLmpwZ1wiIHdpZHRoPVwiNDAwXCIgPlxuICA8YnI+PGJyPlxuICA8VGl0bGUgbXNnPVwiVGhlIEh1YnMgUGxhdGZvcm1cIiAvPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+KlJlYWxpdHltZWRpYSogaXMgYnVpbHQgb24gdG9wIG9mIE1vemlsbGEncyBvcGVuLXNvdXJjZSBwbGF0Zm9ybS4gQW4gZXh0ZW5zaXZlIGd1aWRlIHRvIHVzaW5nIE1vemlsbGEgSHVicyBpcyBhdmFpbGFibGUgYXQgPGEgaHJlZj1cImh0dHBzOi8vaHVicy5tb3ppbGxhLmNvbS9kb2NzL2ludHJvLWh1YnMuaHRtbFwiIHRhcmdldD1cImJsYW5rXCI+aW4gdGhlIEh1YnMgdXNlciBkb2N1bWVudGF0aW9uPC9hPi4gSGVyZSBhcmUgdGhlIGhpZ2hsaWdodHM6XG4gIDxicj48YnI+XG5CZWZvcmUgZW50ZXJpbmcsIHlvdSBhcmUgaW4gdGhlIHJvb20ncyBsb2JieS4gRnJvbSBoZXJlLCB5b3UgY2FuIHNlZSBhbmQgaGVhciB3aGF0J3MgZ29pbmcgb24gaW5zaWRlIHRoZSByb29tLCBidXQgeW91IGNhbiBvbmx5IGludGVyYWN0IHdpdGggb3RoZXJzIHVzaW5nIHRleHQgY2hhdC4gXG48YnI+PGJyPlxuPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5cbiAgICAgIDxicj5cbiAgICAgIDxicj5cbiAgICAgIDxicj5cbjxkaXYgY2xhc3M9XCJrZXlQb2ludFwiPlRvIGVudGVyIHRoZSByb29tOjwvZGl2PlxuPGJyPlxuLSBPbiBhIGRlc2t0b3Agb3IgbW9iaWxlIGRldmljZSwgZm9sbG93IHRoZSBwcm9tcHRzIHRvIHNlbGVjdCBhIG5hbWUvYXZhdGFyIGFuZCBlbmFibGUgdGhlIG1pYy5cbjxicj5cbi0gT24gYSBWUiBoZWFkc2V0LCBpZiB5b3Ugb3BlbmVkIHRoZSBVUkwgb24geW91ciBkZXNrdG9wIG9yIHNtYXJ0cGhvbmUsIGNob29zZSBcIkVudGVyIG9uIFN0YW5kYWxvbmUgVlJcIiB0byBjcmVhdGUgYSBjb2RlIHRoYXQgbWFrZXMgaXQgZWFzeSB0byBvcGVuIG9uIHlvdXIgc3RhbmRhbG9uZSBoZWFkc2V0LiBPcGVuIHRoZSBicm93c2VyIGluIHlvdXIgVlIgaGVhZHNldCwgbmF2aWdhdGUgdG8gaHVicy5saW5rIGFuZCBlbnRlciB0aGUgY29kZS5cbjxicj48YnI+XG48ZGl2IGNsYXNzPVwia2V5UG9pbnRcIj5UbyBuYXZpZ2F0ZSBpbiBIdWJzOjwvZGl2PiAgXG48YnI+XG4tIE9uIGRlc2t0b3AgdXNlIHlvdXIgV0FTRCBvciBhcnJvdyBrZXlzIHRvIG1vdmUgYXJvdW5kLiBZb3UgY2FuIGFsc28gcHJlc3MgeW91ciByaWdodCBtb3VzZSBidXR0b24gdG8gdGVsZXBvcnQgdG8gYSBkaWZmZXJlbnQgbG9jYXRpb24uIFJvdGF0ZSB5b3VyIHZpZXcgdXNpbmcgdGhlIFEgYW5kIEUga2V5cywgb3IgaG9sZCBkb3duIHlvdXIgbGVmdCBtb3VzZSBidXR0b24gYW5kIGRyYWcuXG48YnI+XG4tIEZvciBWUiBhbmQgbW9iaWxlIGNvbnRyb2xzLCBzZWUgdGhlIGxpc3Qgb2YgPGEgaHJlZj1cImh0dHBzOi8vaHVicy5tb3ppbGxhLmNvbS9kb2NzL2h1YnMtY29udHJvbHMuaHRtbFwiIHRhcmdldD1cImJsYW5rXCI+SHVicyBjb250cm9scy48L2E+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvNWQ0MmJjNmIyYTA3NGNjZC5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG5cbjxUaXRsZSBtc2c9XCJGZWF0dXJlcyBpbiBIdWJzXCIgLz5cbjxicj5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPiBUaGUgZmlndXJlIGJlbG93IGluZGljYXRlcyBob3cgdG8gbXV0ZSB5b3VyIG1pY3JvcGhvbmUsIHRha2UgcGhvdG9zLCBzaGFyZSB5b3VyIHNjcmVlbiwgY3JlYXRlIG1lZGlhIG9iamVjdHMsIGFuZCBzbyBvbjogPC9kaXY+IFxuICAgIDxicj48YnI+XG4gICAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL09uYm9hcmRpbmcvaHVicy11c2VyLWludGVyZmFjZS5wbmdcIiB3aWR0aD1cIjQwMFwiID5cblxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cblxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuPFRpdGxlIG1zZz1cIlN0YW5kaW5nIG9uIHRoZSBBdWRpbyBQYWRzIHdpbGwgc3RhcnQgdGhlIG5hcnJhdGlvbiBhYm91dCB0aGUgcm9vbSBvciB0aGUgc291bmQgb2YgdGhlIHZpZGVvIGNsaXAuXCIgLz5cblxuPGJyPjxicj5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvODJhOTExZDI4OWNkMjgzNi5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG48VGl0bGUgbXNnPVwiT3RoZXIgd2F5cyB0byB1c2UgdGhlIHJvb21cIiAvPlxuPGJyPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+XG4gICAgPGRpdiBjbGFzcz1cImtleVBvaW50XCI+VmlzaXQgdGhlIGV4aGliaXQgd2l0aCBmcmllbmRzPC9kaXY+XG4gICAgU2hhcmluZyB0aGUgVVJMIG9mIHRoZSByb29tIHlvdSBhcmUgY3VycmVudGx5IGluIHdpbGwgYWxsb3cgb3RoZXJzIHRvIGpvaW4geW91ciBleHBlcmllbmNlLlxuICAgIDxiciAvPlxuICAgIDxiciAvPlxuICAgICAgPGRpdiBjbGFzcz1cImtleVBvaW50XCI+RmF2b3JpdGUgeW91ciByb29tPC9kaXY+XG4gICAgIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9PbmJvYXJkaW5nL2Zhdm9yaXRlLnBuZ1wiIHdpZHRoPVwiNDAwXCIgPlxuICAgICAgPGJyIC8+XG4gICBTZXQgeW91ciByb29tIGFzIGEgZmF2b3JpdGUgdW5kZXIgdGhlICdtb3JlJyBtZW51LiBUaGVuLCB5b3UgY2FuIGVhc2lseSByZXZpc2l0IHRoZSByb29tIGZyb20gdGhlIGxpc3QgaW4gdGhlICdmYXZvcml0ZSByb29tcycuXG4gIDwvZGl2PiBcbiAgXG4gICAgXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgLy90aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvMDEzYjc1NGFmOWViY2QzMi5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG48YnI+XG48ZGl2IGNsYXNzPVwia2V5UG9pbnRcIj5IZXJlIGlzIGEgbWFwLCB3aGljaCB5b3Ugd2lsbCBhbHNvIGZpbmQgcG9zdGVkIHRocm91Z2ggdGhlIGdhbGxlcmllczwvZGl2PlxuPGJyIC8+XG4gIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9PbmJvYXJkaW5nL01hcF90cmFuc3BhcmVudC5wbmdcIiB3aWR0aD1cIjQwMFwiPlxuXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgLy90aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+XG48YnI+PGJyPjxicj48YnI+PGJyPlxuRWFjaCBnYWxsZXJ5IGluIHRoaXMg4oCcaW1tZXJzaXZlIGJvb2vigJ0gY29ycmVzcG9uZHMgdG8gb25lIG9yIG1vcmUgY2hhcHRlcnMgaW4gdGhlIHByaW50ZWQgYm9vayBhbmQgaWxsdXN0cmF0ZXMgdGhlIHRoZW1lcyBvZiB0aGUgcHJpbnRlZCBjaGFwdGVyKHMpLiAoU2VlIHRoZSBtYXAgb24gdGhlIGZhciB3YWxsIGZvciB0aGUgbmFtZXMvdGhlbWVzIG9mIHRoZSBnYWxsZXJpZXMuKSBGb3IgZXhhbXBsZSwgdGhlIGdhbGxlcnkgZW50aXRsZWQg4oCcUHJlc2VuY2XigJ0gaWxsdXN0cmF0ZXMgYm90aCBwcmVzZW5jZSBhbmQgdGhlIHJlbGF0ZWQgY29uY2VwdCBvZiBhdXJhIGFuZCBob3cgY29tcHV0ZXIgc2NpZW50aXN0cyBhcyB3ZWxsIGFzIGZpbG1tYWtlcnMgYW5kIGRlc2lnbmVycyBoYXZlIHRyaWVkIHRvIGV2b2tlIHRoZXNlIHJlYWN0aW9ucyBpbiB2aXNpdG9ycyB0byB0aGVpciBpbW1lcnNpdmUgYXBwbGljYXRpb25zLiBcbiA8L2Rpdj4gXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgLy90aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuPGEgaHJlZj1cImh0dHBzOi8vcmVhbGl0eW1lZGlhLmRpZ2l0YWwvXCI+PFRpdGxlIG1zZz1cIkNsaWNrIGhlcmUgdG8gcmV0dXJuIGJhY2sgdG8gdGhlIHdlYnNpdGVcIiAvPjwvYT5cbjxpZnJhbWUgY2xhc3M9XCJ3ZWJJZnJhbWVcIiBzcmM9XCJodHRwczovL3JlYWxpdHltZWRpYS5kaWdpdGFsL1wiIHRpdGxlPVwicmVhbGl0eW1lZGlhIHdlYnNpdGVcIiB3aWR0aD1cIjEwMjRcIiBoZWlnaHQ9XCI3NjhcIiBzdHlsZT1cIi13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDAuNSk7LW1vei10cmFuc2Zvcm0tc2NhbGUoMC41KTtcIj48L2lmcmFtZT4gIFxuXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgLy90aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1KVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzU2YTg2OGE1MzNlMTkzMTIuanBnXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm90dW5kYS8xLW1pbmVjcmFmdC1hci5qcGdcIiB3aWR0aD1cIjQwMFwiPlxuXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgLy90aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvYWY1ODdmYWQwZDYwZGYxMi5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb3R1bmRhLzItYnJ1bmVsbGVzY2hpLmpwZ1wiIHdpZHRoPVwiNDAwXCI+XG5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgICAvL3RoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCw0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC80NzhiYWMwOWVjODZmMWYwLmpwZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1JvdHVuZGEvMy16YWtpLWxpemFyZC5qcGdcIiB3aWR0aD1cIjQwMFwiPlxuXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgLy90aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvNTliZjJjOTlmNWEyMTljNy5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb3R1bmRhLzUtcHJvbWFjaG9zLnBuZ1wiIHdpZHRoPVwiNDAwXCI+XG5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgICAvL3RoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCw0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC8wMjc4MDg0OGI1ODRmNTAxLmpwZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1JvdHVuZGEvNi1nZW5yZXMuanBnXCIgd2lkdGg9XCI0MDBcIj5cblxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIC8vdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzRkMTM4NzFmN2IyMTU5OGIuanBnXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm90dW5kYS85LXByaXZhY3kuanBnXCIgd2lkdGg9XCI0MDBcIj5cblxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIC8vdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0L2M3ZWFmMGE1ZDllYTMxNmYuanBnXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm90dW5kYS8xMC1mdXR1cmUuanBnXCIgd2lkdGg9XCI0MDBcIj5cblxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIC8vdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuPFRpdGxlIHYtYmluZDptc2c9XCJ0aXRsZVwiIC8+XG48YnI+PGJyPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+U3RhbmRpbmcgb24gdGhlIEF1ZGlvIFBhZHMgd2lsbCB7eyBib2R5IH19PC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBpbmplY3QgfSBmcm9tICd2dWUnXG5cblxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuXG5cbmxldCBwYXJhbXMgPSBpbmplY3QoXCJwYXJhbXNcIilcbnZhciB0aXRsZSA9IHBhcmFtcyAmJiBwYXJhbXMucGFyYW1ldGVyMSA/IHBhcmFtcy5wYXJhbWV0ZXIxIDogXCJIb3cgdG8gVXNlIHRoZSBBdWRpbyBQYWRzXCJcbnZhciBib2R5ID0gcGFyYW1zICYmIHBhcmFtcy5wYXJhbWV0ZXIyID8gcGFyYW1zLnBhcmFtZXRlcjIgOiBcInN0YXJ0IHRoZSBuYXJyYXRpb25zIGFib3V0IHRoZSByb29tIHlvdSBhcmUgY3VycmVudGx5IGluXCJcblxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+XG48IS0tPFRpdGxlIHYtYmluZDptc2c9XCJ0aXRsZVwiIC8+LS0+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmYgbGFiZWxUaXRsZSBcIj57eyB0aXRsZSB9fTwvZGl2PiBcblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPnt7IGJvZHkgfX08L2Rpdj4gXG48YnI+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IGluamVjdCB9IGZyb20gJ3Z1ZSdcblxuXG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG5cblxubGV0IHBhcmFtcyA9IGluamVjdChcInBhcmFtc1wiKVxudmFyIHRpdGxlID0gcGFyYW1zICYmIHBhcmFtcy5wYXJhbWV0ZXIxID8gcGFyYW1zLnBhcmFtZXRlcjEgOiBcIiBcIlxudmFyIGJvZHkgPSBwYXJhbXMgJiYgcGFyYW1zLnBhcmFtZXRlcjIgPyBwYXJhbXMucGFyYW1ldGVyMiA6IFwiIFwiXG5cbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPlxuPCEtLTxUaXRsZSB2LWJpbmQ6bXNnPVwidGl0bGVcIiAvPi0tPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmIHRpdGxlU3R5bGUgXCI+e3sgdGl0bGUgfX08L2Rpdj4gXG4gIDxicj5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgaW5qZWN0IH0gZnJvbSAndnVlJ1xuXG5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcblxuXG5sZXQgcGFyYW1zID0gaW5qZWN0KFwicGFyYW1zXCIpXG52YXIgdGl0bGUgPSBwYXJhbXMgJiYgcGFyYW1zLnBhcmFtZXRlcjEgPyBwYXJhbXMucGFyYW1ldGVyMSA6IFwiIFwiXG5cbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0Il0sIm5hbWVzIjpbIkh1YnNBcHAiLCJldGhlcmVhbC5jcmVhdGVMYXlvdXRTeXN0ZW0iLCJXZWJMYXllcjNEIiwiU3RvcmUiLCJIdWJzQXBwUHJvdG8iLCJBcHAiLCJpbml0Il0sIm1hcHBpbmdzIjoiOztBQUFBLG1CQUFlOzs7Ozs7Ozs7QUNXZjs7Ozs7OztBQUZjO0FBS1o7QUFDRjtBQUNBLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSC9COzs7O0FBTGM7QUFNZCxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFDO0FBQzdCLElBQUksSUFBSSxHQUFHLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEdBQUcsbURBQWtEOzs7Ozs7Ozs7Ozs7O01DYjlFLE1BQU07SUFDdkIsYUFBYSxDQUFnQjtJQUM3QixhQUFhLENBQXlCO0lBRXRDLEtBQUssQ0FBUTtJQUNiLE1BQU0sQ0FBUTtJQUVkLE1BQU0sQ0FBSztJQUNYLE9BQU8sQ0FBcUM7SUFFNUMsWUFBYSxHQUFjLEVBQUUsS0FBYSxFQUFFLE1BQWMsRUFBRSxnQkFBb0IsRUFBRTtRQUM5RSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDdkQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3ZELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1FBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO1FBRXBCLElBQUksQ0FBQyxNQUFNLEdBQUcs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
