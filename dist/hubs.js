import { p as pushScopeId, a as popScopeId, i as inject, c as createElementBlock, b as createBaseVNode, t as toDisplayString, u as unref, F as Fragment, o as openBlock, d as createVNode, e as createCommentVNode, f as createApp, j as jh, k as kh, r as reactive, g as readonly, h as createTextVNode, n as normalizeClass, l as createStaticVNode } from './vendor-426aefc4.js';

var _imports_0$q = "https://resources.realitymedia.digital/vue-apps/dist/1a6ace377133f14a.png";

pushScopeId("data-v-0a280960");
const _hoisted_1$19 = {
  "xr-layer": "",
  class: "fade"
};
const _hoisted_2$17 = /*#__PURE__*/createBaseVNode("p", null, " Here's some more text just to make things not blank. ", -1 /* HOISTED */);
popScopeId();


var script$1b = {
  props: {
  msg: String
},
  setup(__props) {



const shared = inject('shared');

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("h1", _hoisted_1$19, toDisplayString(__props.msg), 1 /* TEXT */),
    _hoisted_2$17,
    createBaseVNode("button", {
      "xr-layer": "",
      onClick: _cache[0] || (_cache[0] = (...args) => (unref(shared).increment && unref(shared).increment(...args)))
    }, "count is: " + toDisplayString(unref(shared).state.count), 1 /* TEXT */)
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$1b.__scopeId = "data-v-0a280960";

const _hoisted_1$18 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$16 = /*#__PURE__*/createBaseVNode("img", {
  alt: "Vue logo",
  src: _imports_0$q
}, null, -1 /* HOISTED */);


var script$1a = {
  setup(__props) {

let params = inject("params");
var mesg = params && params.mesg ? params.mesg : "Networked Vue Component with Shared Button Count";

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$18, [
    _hoisted_2$16,
    createVNode(script$1b, { msg: unref(mesg) }, null, 8 /* PROPS */, ["msg"]),
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
    HubsApp$18.initializeEthereal();
}
//THREE.Object3D.DefaultMatrixAutoUpdate = true;
function systemTick(time, deltaTime) {
    HubsApp$18.systemTick(time, deltaTime);
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
class HubsApp$18 extends VueApp {
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
        scene.renderer.getSize(HubsApp$18.system.viewResolution);
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
                    const adapter = HubsApp$18.system.getAdapter(layer);
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

class HubsApp$17 extends HubsApp$18 {
    shared;
    constructor(params = {}) {
        super(script$1a, 400, 475, params);
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
var init$17 = function (params = {}) {
    let app = new HubsApp$17(params);
    app.mount();
    return app;
};

pushScopeId("data-v-b474cdac");
const _hoisted_1$17 = {
  "xr-layer": "",
  class: "fade"
};
const _hoisted_2$15 = /*#__PURE__*/createBaseVNode("p", null, [
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


var script$19 = {
  props: {
  msg: String
},
  setup(__props) {



const state = reactive({ count: 0 });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("h1", _hoisted_1$17, toDisplayString(__props.msg), 1 /* TEXT */),
    _hoisted_2$15,
    createBaseVNode("button", {
      "xr-layer": "",
      onClick: _cache[0] || (_cache[0] = $event => (unref(state).count++))
    }, "count is: " + toDisplayString(unref(state).count), 1 /* TEXT */)
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$19.__scopeId = "data-v-b474cdac";

pushScopeId("data-v-91ee6202");
const _hoisted_1$16 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$14 = /*#__PURE__*/createBaseVNode("img", {
  alt: "Vue logo",
  src: _imports_0$q
}, null, -1 /* HOISTED */);
const _hoisted_3$y = /*#__PURE__*/createTextVNode(" Edit code in ");
const _hoisted_4$s = /*#__PURE__*/createBaseVNode("code", null, "src/apps", -1 /* HOISTED */);
const _hoisted_5$j = /*#__PURE__*/createTextVNode(" to test hot module replacement while running project as \"npm run dev\". ");
const _hoisted_6$c = [
  _hoisted_3$y,
  _hoisted_4$s,
  _hoisted_5$j
];
popScopeId();


var script$18 = {
  setup(__props) {

const shared = inject('shared');

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$16, [
      _hoisted_2$14,
      createVNode(script$19, { msg: "Vue Component with Local Button Count" }),
      createBaseVNode("p", {
        id: "edit",
        class: normalizeClass({ upclose: unref(shared).state.close }),
        "xr-layer": ""
      }, _hoisted_6$c, 2 /* CLASS */)
    ])
  ]))
}
}

};

script$18.__scopeId = "data-v-91ee6202";

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

class HubsApp$16 extends HubsApp$18 {
    shared;
    constructor(params = {}) {
        super(script$18, 500, 500, params);
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
        let adapter = HubsApp$16.system.getAdapter(this.docs);
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
var init$16 = function (params = {}) {
    let app = new HubsApp$16(params);
    app.mount();
    return app;
};

var script$17 = {
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

const _hoisted_1$15 = {
  id: "room",
  class: "darkwall"
};


var script$16 = {
  setup(__props) {

let params = inject("params");
var mesg = params && params.message ? params.message : "PORTAL TITLE";

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$15, [
    createVNode(script$17, { msg: unref(mesg) }, null, 8 /* PROPS */, ["msg"])
  ]))
}
}

};

class HubsApp$15 extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$16, width, height, params);
    }
}
var init$15 = function (params = {}) {
    let app = new HubsApp$15(300, 100, params);
    app.mount();
    return app;
};

var script$15 = {
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

const _hoisted_1$14 = {
  id: "room",
  class: "darkwall"
};


var script$14 = {
  setup(__props) {

let params = inject("params");
var mesg = params && params.message ? params.message : "PORTAL SUBTITLE";

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$14, [
    createVNode(script$15, { msg: unref(mesg) }, null, 8 /* PROPS */, ["msg"])
  ]))
}
}

};

class HubsApp$14 extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$14, width, height, params);
    }
}
var init$14 = function (params = {}) {
    let app = new HubsApp$14(300, 100, params);
    app.mount();
    return app;
};

var _imports_0$p = "https://resources.realitymedia.digital/vue-apps/dist/38d6d7a1e02fc2f9.png";

const _hoisted_1$13 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$13 = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$p,
  width: "250"
}, null, -1 /* HOISTED */);
const _hoisted_3$x = /*#__PURE__*/createBaseVNode("div", { class: "displaytext" }, "AR allows us to extend our physical reality; VR creates for us a different reality.", -1 /* HOISTED */);

var script$13 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$13, [
    createVNode(script$17, { msg: "Reality Media" }),
    _hoisted_2$13,
    _hoisted_3$x
  ]))
}
}

};

class HubsApp$13 extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$13, width, height, params);
        //this.isInteractive = true;
    }
}
var init$13 = function (params = {}) {
    let app = new HubsApp$13(300, 475, params);
    app.mount();
    return app;
};

var _imports_0$o = "https://resources.realitymedia.digital/vue-apps/dist/7af7b95b35fd7616.jpg";

const _hoisted_1$12 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$12 = { class: "spacer" };
const _hoisted_3$w = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$o,
  width: "250"
}, null, -1 /* HOISTED */);
const _hoisted_4$r = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, " Each reality medium mediates and remediates. It offers a new representation of the world that we implicitly compare to our experience of the world in itself, but also through other media.", -1 /* HOISTED */);
const _hoisted_5$i = /*#__PURE__*/createBaseVNode("p", null, [
  /*#__PURE__*/createBaseVNode("a", {
    href: "https://realitymedia.digital",
    target: "_blank"
  }, " Start at the reality media site. "),
  /*#__PURE__*/createTextVNode(" | ")
], -1 /* HOISTED */);

var script$12 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$12, [
    createBaseVNode("div", _hoisted_2$12, [
      createVNode(script$17, { msg: "AR & VR as reality media" }),
      _hoisted_3$w,
      _hoisted_4$r
    ]),
    _hoisted_5$i
  ]))
}
}

};

class HubsApp$12 extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$12, width, height, params);
        this.isInteractive = true;
    }
}
var init$12 = function (params = {}) {
    let app = new HubsApp$12(300, 475, params);
    app.mount();
    return app;
};

var _imports_0$n = "https://resources.realitymedia.digital/vue-apps/dist/7ab3d86afd48dbfb.jpg";

const _hoisted_1$11 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$11 = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$n,
    width: "250"
  }),
  /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Film became one of the most important reality media of the twentieth century, and in some ways, it is a forerunner of virtual reality.")
], -1 /* HOISTED */);

var script$11 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$11, [
    createVNode(script$17, { msg: "The LaCiotat Effect" }),
    _hoisted_2$11
  ]))
}
}

};

class HubsApp$11 extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$11, width, height, params);
        //this.isInteractive = true;
    }
}
var init$11 = function (params = {}) {
    let app = new HubsApp$11(300, 475, params);
    app.mount();
    return app;
};

var _imports_0$m = "https://resources.realitymedia.digital/vue-apps/dist/91fdfa811e752dc8.jpg";

const _hoisted_1$10 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$10 = { class: "spacer" };
const _hoisted_3$v = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$m,
  width: "200"
}, null, -1 /* HOISTED */);
const _hoisted_4$q = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "3-D computer graphics help to construct the visual realities of AR and VR, that is photorealism. The uncanny valley.", -1 /* HOISTED */);

var script$10 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$10, [
    createBaseVNode("div", _hoisted_2$10, [
      createVNode(script$17, { msg: "3-D Graphics & Tracking" }),
      _hoisted_3$v,
      _hoisted_4$q
    ])
  ]))
}
}

};

class HubsApp$10 extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$10, width, height, params);
        // this.isInteractive = true;
    }
}
var init$10 = function (params = {}) {
    let app = new HubsApp$10(300, 475, params);
    app.mount();
    return app;
};

var _imports_0$l = "https://resources.realitymedia.digital/vue-apps/dist/dc05c04546a69e64.png";

const _hoisted_1$$ = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$$ = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$l,
    width: "250"
  }),
  /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Presence in VR is usually conceived of as forgetting that the medium is there. The idea is that if the user can be enticed into behaving as if she were not aware of all the complex technology, then she feels presence.")
], -1 /* HOISTED */);

var script$$ = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$$, [
    createVNode(script$17, { msg: "Presence" }),
    _hoisted_2$$
  ]))
}
}

};

class HubsApp$$ extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$$, width, height, params);
        //this.isInteractive = true;
    }
}
var init$$ = function (params = {}) {
    let app = new HubsApp$$(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$_ = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$_ = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$l,
    width: "250"
  }),
  /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Reality media applications often function as additions to established genres. Most current AR and VR applications behave like applications or artifacts that we know from earlier media.")
], -1 /* HOISTED */);

var script$_ = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$_, [
    createVNode(script$17, { msg: "Genres" }),
    _hoisted_2$_
  ]))
}
}

};

class HubsApp$_ extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$_, width, height, params);
        //this.isInteractive = true;
    }
}
var init$_ = function (params = {}) {
    let app = new HubsApp$_(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$Z = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$Z = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$l,
    width: "250"
  }),
  /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "VR will continue to construct special realities, apart from the everyday. VR worlds will continue to be metaphoric worlds.")
], -1 /* HOISTED */);

var script$Z = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$Z, [
    createVNode(script$17, { msg: "The Future of AR & VR" }),
    _hoisted_2$Z
  ]))
}
}

};

class HubsApp$Z extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$Z, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$Z = function (params = {}) {
    let app = new HubsApp$Z(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$Y = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$Y = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Pervasive, always-on AR applications have the potential to provide companies or government authorities even more information and with more precision than our current mobile applications do, both by aggregating our habits as consumers and by identifying us as individuals.")
], -1 /* HOISTED */);

var script$Y = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$Y, [
    createVNode(script$17, { msg: "Privacy and Public Space" }),
    _hoisted_2$Y
  ]))
}
}

};

class HubsApp$Y extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$Y, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$Y = function (params = {}) {
    let app = new HubsApp$Y(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$X = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$X = /*#__PURE__*/createBaseVNode("div", { class: "postertitle" }, "AR & VR as reality media", -1 /* HOISTED */);
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
  _hoisted_2$X,
  _hoisted_3$u
];

var script$X = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$X, _hoisted_4$p))
}
}

};

class HubsApp$X extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$X, width, height, params);
        // this.isInteractive = true;
    }
}
var init$X = function (params = {}) {
    let app = new HubsApp$X(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$W = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$W = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$W = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$W, [
    createVNode(script$17, { msg: "The History of Reality Media" }),
    _hoisted_2$W
  ]))
}
}

};

class HubsApp$W extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$W, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$W = function (params = {}) {
    let app = new HubsApp$W(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$V = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$V = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$V = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$V, [
    createVNode(script$17, { msg: "3-D & Tracking" }),
    _hoisted_2$V
  ]))
}
}

};

class HubsApp$V extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$V, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$V = function (params = {}) {
    let app = new HubsApp$V(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$U = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$U = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$U = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$U, [
    createVNode(script$17, { msg: "Presence" }),
    _hoisted_2$U
  ]))
}
}

};

class HubsApp$U extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$U, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$U = function (params = {}) {
    let app = new HubsApp$U(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$T = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$T = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$T = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$T, [
    createVNode(script$17, { msg: "Genres" }),
    _hoisted_2$T
  ]))
}
}

};

class HubsApp$T extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$T, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$T = function (params = {}) {
    let app = new HubsApp$T(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$S = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$S = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$S = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$S, [
    createVNode(script$17, { msg: "Future" }),
    _hoisted_2$S
  ]))
}
}

};

class HubsApp$S extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$S, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$S = function (params = {}) {
    let app = new HubsApp$S(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$R = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$R = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$R = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$R, [
    createVNode(script$17, { msg: "Privacy" }),
    _hoisted_2$R
  ]))
}
}

};

class HubsApp$R extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$R, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$R = function (params = {}) {
    let app = new HubsApp$R(300, 475, params);
    app.mount();
    return app;
};

var _imports_0$k = "https://resources.realitymedia.digital/vue-apps/dist/190994370aebe395.png";

const _hoisted_1$Q = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$Q = { class: "spacer" };
const _hoisted_3$t = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$k,
  width: "400"
}, null, -1 /* HOISTED */);
const _hoisted_4$o = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$h = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_6$b = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createTextVNode(" First person shooter games such as "),
  /*#__PURE__*/createBaseVNode("a", {
    href: "https://www.half-life.com/en/alyx/",
    target: "_blank"
  }, "HalfLife: Alyx "),
  /*#__PURE__*/createTextVNode(" have long used 3-D graphics to create an immersive experience for millions of players. And for decades, players on computers and game consoles have yearned for true VR so that they could fall through the screen into the worlds on the other side.")
], -1 /* HOISTED */);

var script$Q = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$Q, [
      createBaseVNode("div", _hoisted_2$Q, [
        _hoisted_3$t,
        _hoisted_4$o,
        _hoisted_5$h,
        createVNode(script$17, { msg: "HalfLife: Alyx" }),
        _hoisted_6$b
      ])
    ])
  ]))
}
}

};

class HubsApp$Q extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$Q, width, height, params);
        this.isInteractive = true;
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
const _hoisted_2$P = { class: "spacer" };
const _hoisted_3$s = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Pokemon Go (2016) is perhaps still the best-known AR game. The Pokemon franchise was already decades old, and this was certainly part of the answer for the AR game’s surprising impact. It was the first Pokemon game on a mobile phone and the first free Pokemon game on any platform. ", -1 /* HOISTED */);

var script$P = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$P, [
    createBaseVNode("div", _hoisted_2$P, [
      createVNode(script$17, { msg: "Pokemon Go" }),
      _hoisted_3$s
    ])
  ]))
}
}

};

class HubsApp$P extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$P, width, height, params);
        //     this.isInteractive = true;
    }
}
var init$P = function (params = {}) {
    let app = new HubsApp$P(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$O = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$O = { class: "spacer" };
const _hoisted_3$r = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Beat Saber is a VR rhythm game with a little Star Wars thrown in. The player uses lightsabers to keep the beat. ", -1 /* HOISTED */);

var script$O = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$O, [
    createBaseVNode("div", _hoisted_2$O, [
      createVNode(script$17, { msg: "Beat Saber" }),
      _hoisted_3$r
    ])
  ]))
}
}

};

class HubsApp$O extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$O, width, height, params);
        // this.isInteractive = true;
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
const _hoisted_3$q = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "In this AR version of the transmedia franchise GPS is used to determine your location in the world. Your location and the zombies appear in an enhanced Google Maps map on the phone screen. ", -1 /* HOISTED */);

var script$N = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$N, [
    createBaseVNode("div", _hoisted_2$N, [
      createVNode(script$17, { msg: "Walking Dead: Our World" }),
      _hoisted_3$q
    ])
  ]))
}
}

};

class HubsApp$N extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$N, width, height, params);
        // this.isInteractive = true;
    }
}
var init$N = function (params = {}) {
    let app = new HubsApp$N(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$M = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$M = { class: "spacer" };
const _hoisted_3$p = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Like video games and 360-degree video, VR art emphasizes immersion as the feature that makes the experience unique, as in a VR work by Christian Lemmerz entitled La Apparizione (2017). ", -1 /* HOISTED */);

var script$M = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$M, [
    createBaseVNode("div", _hoisted_2$M, [
      createVNode(script$17, { msg: "La Apparizione" }),
      _hoisted_3$p
    ])
  ]))
}
}

};

class HubsApp$M extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$M, width, height, params);
        //this.isInteractive = true;
    }
}
var init$M = function (params = {}) {
    let app = new HubsApp$M(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$L = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$L = { class: "spacer" };
const _hoisted_3$o = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Minecraft VR is a fully immersive, headset version of the sandbox game that already runs on computers, game consoles, and mobile devices. It is called a \"sandbox game\" because it provides an independent environment in which players can make their own structures and objects out of virtual, LEGO-like blocks. ", -1 /* HOISTED */);

var script$L = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$L, [
    createBaseVNode("div", _hoisted_2$L, [
      createVNode(script$17, { msg: "Minecraft VR" }),
      _hoisted_3$o
    ])
  ]))
}
}

};

class HubsApp$L extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$L, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$L = function (params = {}) {
    let app = new HubsApp$L(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$K = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$K = { class: "spacer headline" };

var script$K = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$K, [
    createBaseVNode("div", _hoisted_2$K, [
      createVNode(script$17, { msg: "AR & VR GAMES" })
    ])
  ]))
}
}

};

class HubsApp$K extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$K, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$K = function (params = {}) {
    let app = new HubsApp$K(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$J = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$J = { class: "spacer headline" };

var script$J = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$J, [
    createBaseVNode("div", _hoisted_2$J, [
      createVNode(script$17, { msg: "AR & VR ART" })
    ])
  ]))
}
}

};

class HubsApp$J extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$J, width, height, params);
        //        this.isInteractive = true;
    }
}
var init$J = function (params = {}) {
    let app = new HubsApp$J(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$I = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$I = { class: "spacer" };
const _hoisted_3$n = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$n = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$g = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Presence is the absence of mediation. If the users can forget that the medium is there, then they feel presence. ", -1 /* HOISTED */);

var script$I = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$I, [
      createBaseVNode("div", _hoisted_2$I, [
        _hoisted_3$n,
        _hoisted_4$n,
        createVNode(script$17, { msg: "Presence" }),
        _hoisted_5$g
      ])
    ])
  ]))
}
}

};

class HubsApp$I extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$I, width, height, params);
        //this.isInteractive = true;
    }
}
var init$I = function (params = {}) {
    let app = new HubsApp$I(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$H = /*#__PURE__*/createStaticVNode("<div id=\"room\" class=\"darkwall\"><div class=\"spacer\"><br><br><!-- &lt;Title msg=&quot;Aura&quot; /&gt; --><div class=\"headline\">Aura</div><br><br><div class=\"squareoff\"><p>In 1930s, Walter Benjamin introduced the concept of <em>aura</em> in The Work of Art in the Age of Mechanical Reproduction. Aura is the <em>here and now</em> that work possesses because of its unique history of production and transmissinowon. </p><p>AR applications are not perfect reproductive technologies, as some draw on the physical and cultural uniquesness, <em>the here and now</em> of particular places </p></div></div></div>", 1);
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

class HubsApp$H extends HubsApp$18 {
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

const _hoisted_1$G = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$G = { class: "spacer" };
const _hoisted_3$m = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$m = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$f = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createTextVNode(" The term cybersickness, or visually induced motion sickness, has been coined to describe symptoms including headache, nausea, eye strain, dizziness, fatigue, or even vomiting that may occur during or after exposure to a virtual environment. Cybersickness is visceral evidence that VR is not the medium to end all media. Cybersickness reminds the susceptible user of the medium in a powerful way. Nausea replaces astonishment. ")
], -1 /* HOISTED */);

var script$G = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$G, [
      createBaseVNode("div", _hoisted_2$G, [
        _hoisted_3$m,
        _hoisted_4$m,
        createVNode(script$17, { msg: "Cybersickness and the negattion of presence" }),
        _hoisted_5$f
      ])
    ])
  ]))
}
}

};

class HubsApp$G extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$G, width, height, params);
        //    this.isInteractive = true;
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
const _hoisted_3$l = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$l = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$e = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_6$a = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Researchers have long pursued the idea of emotional reactions such as empathy as a test of presence. VR is understood as getting us closer to the authentic or the real. But forgetting the medium is not necessary for a sense of presence. Presence can be understood in a more nuanced way as a liminal zone between forgetting and acknowledging VR as a medium. ", -1 /* HOISTED */);

var script$F = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$F, [
      createBaseVNode("div", _hoisted_2$F, [
        _hoisted_3$l,
        _hoisted_4$l,
        createVNode(script$17, { msg: "Presence and Empathy" }),
        _hoisted_5$e,
        _hoisted_6$a
      ])
    ])
  ]))
}
}

};

class HubsApp$F extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$F, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$F = function (params = {}) {
    let app = new HubsApp$F(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$E = /*#__PURE__*/createBaseVNode("div", {
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

class HubsApp$E extends HubsApp$18 {
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

var _imports_0$j = "https://resources.realitymedia.digital/vue-apps/dist/46d7793fa7ab24ad.png";

var _imports_1 = "https://resources.realitymedia.digital/vue-apps/dist/beb618ffe3769bb6.png";

var _imports_2 = "https://resources.realitymedia.digital/vue-apps/dist/1e4bde312325195f.png";

const _hoisted_1$D = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createCommentVNode(" <Title msg=\"Pit Experiment\" /> "),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$j,
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

class HubsApp$D extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$D, width, height, params);
        //     this.isInteractive = true;
    }
}
var init$D = function (params = {}) {
    let app = new HubsApp$D(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$i = "https://resources.realitymedia.digital/vue-apps/dist/4905757374923259.png";

const _hoisted_1$C = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$C = { class: "spacer" };
const _hoisted_3$k = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$k = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$d = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$i,
  width: "20",
  style: {"float":"left","margin":"10px"}
}, null, -1 /* HOISTED */);
const _hoisted_6$9 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_7$7 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_8$1 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createTextVNode("360"),
  /*#__PURE__*/createBaseVNode("span", null, "°"),
  /*#__PURE__*/createTextVNode(" film Clouds Over Sidra created by Chris Milk and Gabo Arora shows the life of Syrian refugees in Za'atari camp in Jordan. The camera follows 12-year old Sidra in her everyday life, allowing the users to be present with Sidra. ")
], -1 /* HOISTED */);
const _hoisted_9$1 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_10 = /*#__PURE__*/createBaseVNode("blockquote", { class: "squareoff" }, "\"When you’re inside of the headset . . . you see full 360 degrees, in all directions. And when you’re sitting there in her room, watching her, you're not watching it through a television screen, you’re not watching it through a window, you’re sitting there with her. When you look down, you're sitting on the same ground that she’s sitting on. And because of that, you feel her humanity in a deeper way. You empathize with her in a deeper way. (Milk 2015)\"", -1 /* HOISTED */);

var script$C = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$C, [
      createBaseVNode("div", _hoisted_2$C, [
        _hoisted_3$k,
        _hoisted_4$k,
        _hoisted_5$d,
        createVNode(script$17, { msg: "Ultimate Empathy Machine" }),
        _hoisted_6$9,
        _hoisted_7$7,
        _hoisted_8$1,
        _hoisted_9$1,
        _hoisted_10
      ])
    ])
  ]))
}
}

};

class HubsApp$C extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$C, width, height, params);
        //    this.isInteractive = true;
    }
}
var init$C = function (params = {}) {
    let app = new HubsApp$C(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$h = "https://resources.realitymedia.digital/vue-apps/dist/b464dbe90d6133ab.jpg";

const _hoisted_1$B = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$h,
      style: {"width":"100%"}
    })
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

class HubsApp$B extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$B, width, height, params);
        //   this.isInteractive = true;
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
const _hoisted_2$A = { class: "spacer" };
const _hoisted_3$j = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$j = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$c = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_6$8 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_7$6 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createTextVNode("Nonnie de la Peña's "),
  /*#__PURE__*/createBaseVNode("a", {
    href: "https://embed.ted.com/talks/nonny_de_la_pena_the_future_of_news_virtual_reality",
    target: "_blank"
  }, "Ted Talk"),
  /*#__PURE__*/createTextVNode(" called 'The future of news?'' introduces a new form of journalism where Virtual Reality technology is used to put audience inside the stories. In her work, she created VR stories about imprisonment in Guantanamo and hunger in Los Angeles to induce empathy in the audience.")
], -1 /* HOISTED */);

var script$A = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$A, [
      createBaseVNode("div", _hoisted_2$A, [
        _hoisted_3$j,
        _hoisted_4$j,
        createCommentVNode(" <img src=\"../../../assets/images/Room6/rtarrow.png\" width=\"400\" > "),
        createVNode(script$17, { msg: "The future of news?" }),
        _hoisted_5$c,
        _hoisted_6$8,
        _hoisted_7$6
      ])
    ])
  ]))
}
}

};

class HubsApp$A extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$A, width, height, params);
        this.isInteractive = true;
    }
}
var init$A = function (params = {}) {
    let app = new HubsApp$A(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$g = "https://resources.realitymedia.digital/vue-apps/dist/b3933ff359f949ba.png";

const _hoisted_1$z = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$g,
      style: {"width":"100%"}
    })
  ])
], -1 /* HOISTED */);
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

class HubsApp$z extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$z, width, height, params);
        //   this.isInteractive = true;
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
const _hoisted_6$7 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_7$5 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "The pit experiment is a virtual experiement often used to evaluate the sence of presence. The user is given a task to grab an object on plank and take it to the other side, crossing the pit. ", -1 /* HOISTED */);

var script$y = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$y, [
      createBaseVNode("div", _hoisted_2$y, [
        _hoisted_3$i,
        _hoisted_4$i,
        createVNode(script$17, { msg: "Pit Experiment" }),
        _hoisted_5$b,
        _hoisted_6$7,
        _hoisted_7$5
      ])
    ])
  ]))
}
}

};

class HubsApp$y extends HubsApp$18 {
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

var _imports_0$f = "https://resources.realitymedia.digital/vue-apps/dist/2176dc66f5a02546.png";

const _hoisted_1$x = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$f,
      width: "436"
    }),
    /*#__PURE__*/createCommentVNode(" <Title msg=\"Pit Experiment\" /> ")
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

class HubsApp$x extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$x, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$x = function (params = {}) {
    let app = new HubsApp$x(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$w = /*#__PURE__*/createStaticVNode("<div id=\"room\" class=\"darkwall\"><div class=\"spacer\"><br><br><!-- &lt;Title msg=&quot;Presence&quot; /&gt; --><div class=\"postertitle\">Presence</div><div class=\"squareoff\">Presence is a kind of absence, the absence of mediation. If the users can forget that the medium is there, then they feel presence. </div><!-- &lt;div class=&quot;postertitle&quot;&gt;Presence is a kind of absence, the absence of mediation. If the users can forget that the medium is there, then they feel presence. &lt;/div&gt; --><!-- &lt;div class=&quot;headline&quot;&gt;Presence is the absence of mediation. If the users can forget that the medium is there, then they feel presence. &lt;/div&gt;\n      &lt;div class=&quot;squareoff&quot;&gt;Presence is a kind of absence, the absence of mediation. If the users can forget that the medium is there, then they feel presence. &lt;/div&gt; --><br><br><div class=\"squareoff\" style=\"font-style:italic;\">&quot;VR and AR cannot deceive their users into believing that they are having a non-mediated experience. But that is not necessary for a sense of presence.&quot;</div></div></div>", 1);
const _hoisted_2$w = [
  _hoisted_1$w
];

var script$w = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$w))
}
}

};

class HubsApp$w extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$w, width, height, params);
        //  this.isInteractive = true;
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
const _hoisted_4$h = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$a = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_6$6 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_7$4 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createTextVNode("Treehugger: Wawona VR experience transports the users to the red giant Sequoia trees from the Sequoia National Park. It provides a sense of intimacy with the tree - with its bark, with the cells that make up its being. The vividness of the work illustrates "),
  /*#__PURE__*/createBaseVNode("em", null, "presence"),
  /*#__PURE__*/createTextVNode(". ")
], -1 /* HOISTED */);

var script$v = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$v, [
      createBaseVNode("div", _hoisted_2$v, [
        _hoisted_3$h,
        _hoisted_4$h,
        createVNode(script$17, { msg: "Treehugger: Wawona" }),
        _hoisted_5$a,
        _hoisted_6$6,
        _hoisted_7$4,
        createCommentVNode(" In this experience, users find themselves on the threshold of forgetting that we are having a VR experience. Being on that threshold is a sence of presence in a reality medium. ")
      ])
    ])
  ]))
}
}

};

class HubsApp$v extends HubsApp$18 {
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

var _imports_0$e = "https://resources.realitymedia.digital/vue-apps/dist/273dec47ec76230d.png";

const _hoisted_1$u = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$e,
      style: {"width":"450px"}
    })
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

class HubsApp$u extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$u, width, height, params);
        // this.isInteractive = true;
    }
}
var init$u = function (params = {}) {
    let app = new HubsApp$u(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$t = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$t = { class: "spacer" };
const _hoisted_3$g = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$g = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);

var script$t = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$t, [
      createBaseVNode("div", _hoisted_2$t, [
        _hoisted_3$g,
        _hoisted_4$g,
        createVNode(script$17, { msg: "Back to the main exhibition" })
      ])
    ])
  ]))
}
}

};

class HubsApp$t extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$t, width, height, params);
        // this.isInteractive = true;
    }
}
var init$t = function (params = {}) {
    let app = new HubsApp$t(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$s = /*#__PURE__*/createBaseVNode("div", {
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

class HubsApp$s extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$s, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$s = function (params = {}) {
    let app = new HubsApp$s(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$d = "https://resources.realitymedia.digital/vue-apps/dist/a7d1244c4b23b7b0.jpg";

const _hoisted_1$r = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$d,
      width: "800"
    }),
    /*#__PURE__*/createCommentVNode(" <Title msg=\"The future of news?\" />\n\t<div class=\"squareoff\">Nonnie de la Peña's <a href=\"https://embed.ted.com/talks/nonny_de_la_pena_the_future_of_news_virtual_reality\" target=\"_blank\">Ted Talk</a> called 'The future of news?''  introduces a new form of journalism where Virtual Reality technology is used to put audience inside the stories. In her work, she created VR stories about imprisonment in Guantanamo and hunger in Los Angeles to induce empathy in the audience.</div>  ")
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

class HubsApp$r extends HubsApp$18 {
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
const _hoisted_4$f = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$9 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "\"The Franklin Institute is using AR to enhance their Terracotta Warrior exhibition which were displayed in Philadelphia until March 2018. The museum’s app, powered by Wikitude technology, allows visitors to use their smartphone to scan items and visualize rich AR content to learn even more about the intriguing history behind the magnificent clay soldiers.\"", -1 /* HOISTED */);

var script$q = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$q, [
      createBaseVNode("div", _hoisted_2$q, [
        createVNode(script$17, { msg: "Terracotta Warriors AR" }),
        _hoisted_3$f,
        _hoisted_4$f,
        _hoisted_5$9
      ])
    ])
  ]))
}
}

};

class HubsApp$q extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$q, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$q = function (params = {}) {
    let app = new HubsApp$q(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$c = "https://resources.realitymedia.digital/vue-apps/dist/b2c77009644a7d45.jpg";

const _hoisted_1$p = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$c,
      width: "600"
    })
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

class HubsApp$p extends HubsApp$18 {
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
const _hoisted_4$e = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$8 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
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

var script$o = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$o, [
      createBaseVNode("div", _hoisted_2$o, [
        _hoisted_3$e,
        _hoisted_4$e,
        createVNode(script$17, { msg: "Pit Experiment" }),
        _hoisted_5$8,
        _hoisted_6$5,
        _hoisted_7$3
      ])
    ])
  ]))
}
}

};

class HubsApp$o extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$o, width, height, params);
    }
}
var init$o = function (params = {}) {
    let app = new HubsApp$o(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$n = { id: "room" };
const _hoisted_2$n = { class: "spacer" };
const _hoisted_3$d = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$d = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$7 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
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

var script$n = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$n, [
      createBaseVNode("div", _hoisted_2$n, [
        _hoisted_3$d,
        _hoisted_4$d,
        createVNode(script$17, { msg: "Instructions" }),
        _hoisted_5$7,
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

class HubsApp$n extends HubsApp$18 {
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
        createVNode(script$17, { msg: "Very carefully stretch your arms out for balance." })
      ])
    ])
  ]))
}
}

};

class HubsApp$m extends HubsApp$18 {
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
        createVNode(script$17, { msg: "Does this experiment make you sweat or your heart beat faster?" })
      ])
    ])
  ]))
}
}

};

class HubsApp$l extends HubsApp$18 {
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

var script$k = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$k, [
      createBaseVNode("div", _hoisted_2$k, [
        _hoisted_3$a,
        _hoisted_4$a,
        createVNode(script$17, { msg: "Presence Gallery" })
      ])
    ])
  ]))
}
}

};

class HubsApp$k extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$k, width, height, params);
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
const _hoisted_3$9 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$9 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$6 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createBaseVNode("i", null, "Reality Media"),
  /*#__PURE__*/createTextVNode(" is a project encompassing three writing spaces, three technologies for representing ideas: print, the web, and immersive VR. The printed page is a writing space with a tradition dating back to the fifteenth century (in Europe, much earlier in China). Obviously the web has a far shorter tradition, beginning around 1990. But in the thirty year since Tim Berners-Lee launched the first web server, the web has grown to rival print for many kinds of communication. The technologies for creating 3D graphic spaces in VR (and AR) actually predate the web. But only in the past 10 years have AR and VR become widely available media. The goal of RealityMedia is to demonstrate the potential range of AR and VR as communicative forms. ")
], -1 /* HOISTED */);

var script$j = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$j, [
      createBaseVNode("div", _hoisted_2$j, [
        createVNode(script$17, { msg: "Welcome to Reality Media!" }),
        _hoisted_3$9,
        _hoisted_4$9,
        _hoisted_5$6
      ])
    ])
  ]))
}
}

};

class HubsApp$j extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$j, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$j = function (params = {}) {
    let app = new HubsApp$j(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$b = "https://resources.realitymedia.digital/vue-apps/dist/7a24a6d309d453f2.jpg";

const _hoisted_1$i = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$i = { class: "spacer" };
const _hoisted_3$8 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$8 = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$b,
  width: "280",
  style: {"float":"left","margin-right":"20px"}
}, null, -1 /* HOISTED */);
const _hoisted_5$5 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createBaseVNode("div", { style: {"margin-left":"30px"} }, [
    /*#__PURE__*/createTextVNode("Published by "),
    /*#__PURE__*/createBaseVNode("a", { href: "https://mitpress.mit.edu/books/reality-media" }, "MIT Press")
  ]),
  /*#__PURE__*/createBaseVNode("div", { class: "oblique" }, "By Jay David Bolter, Maria Engberg and Blair MacIntyre"),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("div", { class: "quote" }, "How augmented reality and virtual reality are taking their places in contemporary media culture alongside film and television.")
], -1 /* HOISTED */);

var script$i = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$i, [
      createBaseVNode("div", _hoisted_2$i, [
        createVNode(script$17, { msg: "Reality Media" }),
        _hoisted_3$8,
        _hoisted_4$8,
        _hoisted_5$5
      ])
    ])
  ]))
}
}

};

class HubsApp$i extends HubsApp$18 {
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

const _hoisted_1$h = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$h = { class: "spacer" };
const _hoisted_3$7 = /*#__PURE__*/createBaseVNode("div", {
  class: "squareoff",
  style: {"width":"380px"}
}, [
  /*#__PURE__*/createTextVNode("Published by "),
  /*#__PURE__*/createBaseVNode("a", { href: "https://mitpress.mit.edu/books/reality-media" }, "MIT Press")
], -1 /* HOISTED */);
const _hoisted_4$7 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$4 = /*#__PURE__*/createBaseVNode("div", { class: "oblique squareoff" }, "By Jay David Bolter, Maria Engberg and Blair MacIntyre", -1 /* HOISTED */);
const _hoisted_6$3 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_7$1 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff quote" }, "\"How augmented reality and virtual reality are taking their places in contemporary media culture alongside film and television.\" ", -1 /* HOISTED */);

var script$h = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$h, [
      createBaseVNode("div", _hoisted_2$h, [
        createVNode(script$17, { msg: "Book: Reality Media" }),
        _hoisted_3$7,
        _hoisted_4$7,
        _hoisted_5$4,
        _hoisted_6$3,
        _hoisted_7$1
      ])
    ])
  ]))
}
}

};

class HubsApp$h extends HubsApp$18 {
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

var _imports_0$a = "https://resources.realitymedia.digital/vue-apps/dist/5b14da96e2889ff2.jpg";

const _hoisted_1$g = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$g = { class: "spacer" };
const _hoisted_3$6 = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$a,
  width: "400"
}, null, -1 /* HOISTED */);
const _hoisted_4$6 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$3 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
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

var script$g = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$g, [
      createBaseVNode("div", _hoisted_2$g, [
        _hoisted_3$6,
        _hoisted_4$6,
        _hoisted_5$3,
        createVNode(script$17, { msg: "The Hubs Platform" }),
        _hoisted_6$2
      ])
    ])
  ]))
}
}

};

class HubsApp$g extends HubsApp$18 {
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

const _hoisted_1$f = /*#__PURE__*/createStaticVNode("<div id=\"room\" class=\"darkwall\"><div class=\"spacer\"><div class=\"squareoff\"><br><br><br><div class=\"keyPoint\">To enter the room:</div><br> - On a desktop or mobile device, follow the prompts to select a name/avatar and enable the mic. <br> - On a VR headset, if you opened the URL on your desktop or smartphone, choose &quot;Enter on Standalone VR&quot; to create a code that makes it easy to open on your standalone headset. Open the browser in your VR headset, navigate to hubs.link and enter the code. <br><br><div class=\"keyPoint\">To navigate in Hubs:</div><br> - On desktop use your WASD or arrow keys to move around. You can also press your right mouse button to teleport to a different location. Rotate your view using the Q and E keys, or hold down your left mouse button and drag. <br> - For VR and mobile controls, see the list of <a href=\"https://hubs.mozilla.com/docs/hubs-controls.html\" target=\"blank\">Hubs controls.</a></div></div></div>", 1);
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

class HubsApp$f extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$f, width, height, params);
        this.isInteractive = true;
    }
}
var init$f = function (params = {}) {
    let app = new HubsApp$f(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$9 = "https://resources.realitymedia.digital/vue-apps/dist/5d42bc6b2a074ccd.png";

const _hoisted_1$e = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$e = { class: "spacer" };
const _hoisted_3$5 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$5 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, " The figure below indicates how to mute your microphone, take photos, share your screen, create media objects, and so on: ", -1 /* HOISTED */);
const _hoisted_5$2 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_6$1 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_7 = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$9,
  width: "400"
}, null, -1 /* HOISTED */);

var script$e = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$e, [
      createBaseVNode("div", _hoisted_2$e, [
        createVNode(script$17, { msg: "Features in Hubs" }),
        _hoisted_3$5,
        _hoisted_4$5,
        _hoisted_5$2,
        _hoisted_6$1,
        _hoisted_7
      ])
    ])
  ]))
}
}

};

class HubsApp$e extends HubsApp$18 {
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

const _hoisted_1$d = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$d = { class: "spacer" };
const _hoisted_3$4 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$4 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);

var script$d = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$d, [
      createBaseVNode("div", _hoisted_2$d, [
        createVNode(script$17, { msg: "Standing on the Audio Pads will start the narration about the room or the sound of the video clip." }),
        _hoisted_3$4,
        _hoisted_4$4
      ])
    ])
  ]))
}
}

};

class HubsApp$d extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$d, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$d = function (params = {}) {
    let app = new HubsApp$d(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$8 = "https://resources.realitymedia.digital/vue-apps/dist/82a911d289cd2836.png";

const _hoisted_1$c = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$c = { class: "spacer" };
const _hoisted_3$3 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$3 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
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

var script$c = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$c, [
      createBaseVNode("div", _hoisted_2$c, [
        createVNode(script$17, { msg: "Other ways to use the room" }),
        _hoisted_3$3,
        _hoisted_4$3
      ])
    ])
  ]))
}
}

};

class HubsApp$c extends HubsApp$18 {
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

var _imports_0$7 = "https://resources.realitymedia.digital/vue-apps/dist/013b754af9ebcd32.png";

const _hoisted_1$b = /*#__PURE__*/createBaseVNode("div", {
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

class HubsApp$b extends HubsApp$18 {
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

const _hoisted_1$a = /*#__PURE__*/createBaseVNode("div", {
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
const _hoisted_2$a = [
  _hoisted_1$a
];

var script$a = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$a))
}
}

};

class HubsApp$a extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$a, width, height, params);
        //this.isInteractive = true;
    }
}
var init$a = function (params = {}) {
    let app = new HubsApp$a(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$9 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$9 = { class: "spacer" };
const _hoisted_3$2 = { href: "https://realitymedia.digital/" };
const _hoisted_4$2 = /*#__PURE__*/createBaseVNode("iframe", {
  class: "webIframe",
  src: "https://realitymedia.digital/",
  title: "realitymedia website",
  width: "1024",
  height: "768",
  style: {"-webkit-transform":"scale(0.5)"}
}, null, -1 /* HOISTED */);

var script$9 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$9, [
      createBaseVNode("div", _hoisted_2$9, [
        createBaseVNode("a", _hoisted_3$2, [
          createVNode(script$17, { msg: "Click here to return back to the website" })
        ]),
        _hoisted_4$2
      ])
    ])
  ]))
}
}

};

class HubsApp$9 extends HubsApp$18 {
    constructor(width, height, params = {}) {
        super(script$9, width, height, params);
        //this.isInteractive = true;
    }
}
var init$9 = function () {
    let app = new HubsApp$9(600, 475);
    app.mount();
    return app;
};

var _imports_0$6 = "https://resources.realitymedia.digital/vue-apps/dist/56a868a533e19312.jpg";

const _hoisted_1$8 = /*#__PURE__*/createBaseVNode("div", {
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

class HubsApp$8 extends HubsApp$18 {
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

var _imports_0$5 = "https://resources.realitymedia.digital/vue-apps/dist/af587fad0d60df12.jpg";

const _hoisted_1$7 = /*#__PURE__*/createBaseVNode("div", {
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

class HubsApp$7 extends HubsApp$18 {
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

var _imports_0$4 = "https://resources.realitymedia.digital/vue-apps/dist/478bac09ec86f1f0.jpg";

const _hoisted_1$6 = /*#__PURE__*/createBaseVNode("div", {
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

class HubsApp$6 extends HubsApp$18 {
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

var _imports_0$3 = "https://resources.realitymedia.digital/vue-apps/dist/59bf2c99f5a219c7.png";

const _hoisted_1$5 = /*#__PURE__*/createBaseVNode("div", {
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

class HubsApp$5 extends HubsApp$18 {
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

var _imports_0$2 = "https://resources.realitymedia.digital/vue-apps/dist/02780848b584f501.jpg";

const _hoisted_1$4 = /*#__PURE__*/createBaseVNode("div", {
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

class HubsApp$4 extends HubsApp$18 {
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

var _imports_0$1 = "https://resources.realitymedia.digital/vue-apps/dist/4d13871f7b21598b.jpg";

const _hoisted_1$3 = /*#__PURE__*/createBaseVNode("div", {
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

class HubsApp$3 extends HubsApp$18 {
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

var _imports_0 = "https://resources.realitymedia.digital/vue-apps/dist/c7eaf0a5d9ea316f.jpg";

const _hoisted_1$2 = /*#__PURE__*/createBaseVNode("div", {
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

class HubsApp$2 extends HubsApp$18 {
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

const _hoisted_1$1 = { id: "room" };
const _hoisted_2$1 = { class: "spacer" };
const _hoisted_3$1 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$1 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$1 = { class: "squareoff" };



var script$1 = {
  setup(__props) {

let params = inject("params");
var title = params && params.parameter1 ? params.parameter1 : "How to Use the Audio Pads";
var body = params && params.parameter2 ? params.parameter2 : "start the narrations about the room you are currently in";


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$1, [
      createBaseVNode("div", _hoisted_2$1, [
        createVNode(script$17, { msg: unref(title) }, null, 8 /* PROPS */, ["msg"]),
        _hoisted_3$1,
        _hoisted_4$1,
        createBaseVNode("div", _hoisted_5$1, "Standing on the Audio Pads will " + toDisplayString(unref(body)), 1 /* TEXT */)
      ])
    ])
  ]))
}
}

};

class HubsApp$1 extends HubsApp$18 {
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

const _hoisted_1 = { id: "room" };
const _hoisted_2 = { class: "spacer" };
const _hoisted_3 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4 = { class: "squareoff labelTitle" };
const _hoisted_5 = { class: "squareoff" };
const _hoisted_6 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);



var script = {
  setup(__props) {

let params = inject("params");
var title = params && params.parameter1 ? params.parameter1 : " ";
var body = params && params.parameter2 ? params.parameter2 : " ";


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1, [
      createBaseVNode("div", _hoisted_2, [
        _hoisted_3,
        createCommentVNode("<Title v-bind:msg=\"title\" />"),
        createBaseVNode("div", _hoisted_4, toDisplayString(unref(title)), 1 /* TEXT */),
        createBaseVNode("div", _hoisted_5, toDisplayString(unref(body)), 1 /* TEXT */),
        _hoisted_6
      ])
    ])
  ]))
}
}

};

class HubsApp extends HubsApp$18 {
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

export { init$8 as ARVR_monolith, init$I as ARandPresence, init$Q as Alyx, init$M as Apparizione, init$J as ArtBanner, init$1 as AudioPad, init$d as AudioText, init$H as Aura, init$9 as Back, init$O as BeatSaber, init$12 as Center1, init$11 as Center2, init$10 as Center3, init$$ as Center4, init$_ as Center5, init$Z as Center6, init$Y as Center7, init$F as Empathy, init$E as Empathy_title, init$t as Exit, init$2 as Future_monolith, init$K as GamesBanner, init$4 as Genres_monolith, init$6 as Graphics_monolith, init$7 as History_monolith, init$e as HubsFeatures, init$g as HubsPlatform, init$f as HubsPlatform2, init as Label, init$13 as Map, init$C as Milk, init$B as Milk_pic, init$L as Minecraft, init$i as MitPress, init$h as MitText, init$X as Monolith1, init$W as Monolith2, init$V as Monolith3, init$U as Monolith4, init$T as Monolith5, init$S as Monolith6, init$R as Monolith7, init$A as Nonnie, init$z as Nonnie_pic, init$a as Overview, init$s as Parthenon, init$o as Pit, init$y as PitExperiment, init$n as PitInstruction, init$x as Pit_pic, init$P as Pokemon, init$14 as PortalSubtitle, init$15 as PortalTitle, init$w as Presence, init$D as Presence_map, init$5 as Presence_monolith, init$3 as Privacy_monolith, init$c as Sharing, init$q as Terracotta, init$r as TerracottaPic, init$v as Treehugger, init$u as Treehugger_pic, init$p as Treehuggerpic2, init$N as WalkingDead, init$j as Welcome, init$G as cybersickness, init$17 as hubsTest1, init$16 as hubsTest2, initializeEthereal, init$m as pitSign1, init$l as pitSign2, init$k as pit_portal_title, init$b as rotundaMap, systemTick };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHVicy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Fzc2V0cy9sb2dvLnBuZyIsIi4uLy4uL3NyYy9jb21wb25lbnRzL05ldHdvcmtlZEhlbGxvV29ybGQudnVlIiwiLi4vLi4vc3JjL2FwcHMvVGVzdGluZy9IdWJzVGVzdDEvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Z1ZUFwcC50cyIsIi4uLy4uL3NyYy9hcHBzL0h1YnNBcHAudHMiLCIuLi8uLi9zcmMvYXBwcy9UZXN0aW5nL0h1YnNUZXN0MS9zaGFyZWQudHMiLCIuLi8uLi9zcmMvYXBwcy9UZXN0aW5nL0h1YnNUZXN0MS9odWJzLnRzIiwiLi4vLi4vc3JjL2NvbXBvbmVudHMvSGVsbG9Xb3JsZC52dWUiLCIuLi8uLi9zcmMvYXBwcy9UZXN0aW5nL0h1YnNUZXN0Mi9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvVGVzdGluZy9IdWJzVGVzdDIvc2hhcmVkLnRzIiwiLi4vLi4vc3JjL2FwcHMvVGVzdGluZy9IdWJzVGVzdDIvaHVicy50cyIsIi4uLy4uL3NyYy9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1BvcnRhbC9Qb3J0YWxUaXRsZS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUG9ydGFsL1BvcnRhbFRpdGxlL2h1YnMudHMiLCIuLi8uLi9zcmMvY29tcG9uZW50cy9DZW50ZXJTdWJ0aXRsZS52dWUiLCIuLi8uLi9zcmMvYXBwcy9Qb3J0YWwvUG9ydGFsU3VidGl0bGUvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1BvcnRhbC9Qb3J0YWxTdWJ0aXRsZS9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvcm90dW5kYS1tYXAucG5nIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyX01hcC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyX01hcC9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvbGFjaW90YXQtVlIuanBnIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyMV9JbnRyby9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyMV9JbnRyby9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvbGFjaW90YXQuanBnIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyMl9IaXN0b3J5L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXIyX0hpc3RvcnkvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL3VuY2FubnkuanBnIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyM18zRC1UcmFja2luZy9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyM18zRC1UcmFja2luZy9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvcGFydGhlbm9uLnBuZyIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjRfUHJlc2VuY2UvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjRfUHJlc2VuY2UvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjVfR2VucmVzL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXI1X0dlbnJlcy9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyNl9GdXR1cmUvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjZfRnV0dXJlL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXI3X1ByaXZhY3kvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjdfUHJpdmFjeS9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGgxX0ludHJvL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDFfSW50cm8vaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoMl9IaXN0b3J5L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDJfSGlzdG9yeS9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGgzXzNELVRyYWNraW5nL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDNfM0QtVHJhY2tpbmcvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoNF9QcmVzZW5jZS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGg0X1ByZXNlbmNlL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDVfR2VucmVzL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDVfR2VucmVzL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDZfRnV0dXJlL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDZfRnV0dXJlL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDdfUHJpdmFjeS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGg3X1ByaXZhY3kvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb201L0FseXgtc3BsYXNoLnBuZyIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L0FseXgvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L0FseXgvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L1Bva2Vtb24vQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L1Bva2Vtb24vaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L0JlYXRTYWJlci9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvQmVhdFNhYmVyL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNS9XYWxraW5nRGVhZC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvV2Fsa2luZ0RlYWQvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L0FwcGFyaXppb25lL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNS9BcHBhcml6aW9uZS9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvTWluZWNyYWZ0L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNS9NaW5lY3JhZnQvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L0dhbWVzQmFubmVyL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNS9HYW1lc0Jhbm5lci9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvQXJ0QmFubmVyL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNS9BcnRCYW5uZXIvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0FSYW5kUHJlc2VuY2UvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0FSYW5kUHJlc2VuY2UvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0F1cmEvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0F1cmEvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L2N5YmVyc2lja25lc3MvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L2N5YmVyc2lja25lc3MvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0VtcGF0aHkvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0VtcGF0aHkvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0VtcGF0aHlfdGl0bGUvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0VtcGF0aHlfdGl0bGUvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L3JpZ2h0YXJyb3cucG5nIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvUm9vbTYvdXBhcnJvdy5wbmciLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9Sb29tNi91cmFycm93LnBuZyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L21hcC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvbWFwL2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9Sb29tNi9sZmFycm93LnBuZyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L01pbGsvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L01pbGsvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L2Nsb3Vkb3ZlcnNpZHJhLmpwZyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L01pbGtfcGljL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9NaWxrX3BpYy9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvTm9ubmllL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9Ob25uaWUvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L25vbm5pZS5wbmciLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9Ob25uaWVfcGljL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9Ob25uaWVfcGljL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QaXRFeHBlcmltZW50L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QaXRFeHBlcmltZW50L2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9Sb29tNi9waXRWUi5wbmciLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QaXRfcGljL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QaXRfcGljL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QcmVzZW5jZS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvUHJlc2VuY2UvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1RyZWVodWdnZXIvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1RyZWVodWdnZXIvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L3RyZWVodWdnZXIucG5nIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvVHJlZWh1Z2dlcl9waWMvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1RyZWVodWdnZXJfcGljL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9FeGl0L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9FeGl0L2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QYXJ0aGVub24vQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1BhcnRoZW5vbi9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvUm9vbTYvdGVycmFjb3R0YS5qcGciLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9UZXJyYWNvdHRhUGljL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9UZXJyYWNvdHRhUGljL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9UZXJyYWNvdHRhL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9UZXJyYWNvdHRhL2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9Sb29tNi90cmVlaHVnZ2VyMi5qcGciLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9UcmVlaHVnZ2VyUGljMi9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvVHJlZWh1Z2dlclBpYzIvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb21fUGl0L1BpdC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbV9QaXQvUGl0L2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tX1BpdC9QaXRJbnN0cnVjdGlvbi9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbV9QaXQvUGl0SW5zdHJ1Y3Rpb24vaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb21fUGl0L3BpdFNpZ24xL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tX1BpdC9waXRTaWduMS9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbV9QaXQvcGl0U2lnbjIvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb21fUGl0L3BpdFNpZ24yL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tX1BpdC9waXRfcG9ydGFsX3RpdGxlL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tX1BpdC9waXRfcG9ydGFsX3RpdGxlL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL1dlbGNvbWUvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvV2VsY29tZS9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvT25ib2FyZGluZy9yZWFsaXR5TWVkaWFCb29rLmpwZyIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvTWl0UHJlc3MvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvTWl0UHJlc3MvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvTWl0VGV4dC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9NaXRUZXh0L2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9PbmJvYXJkaW5nL01vemlsbGFIdWJzLmpwZyIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvSHVic1BsYXRmb3JtL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL0h1YnNQbGF0Zm9ybS9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9IdWJzUGxhdGZvcm0yL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL0h1YnNQbGF0Zm9ybTIvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL09uYm9hcmRpbmcvaHVicy11c2VyLWludGVyZmFjZS5wbmciLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL0h1YnNGZWF0dXJlcy9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9IdWJzRmVhdHVyZXMvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvQXVkaW9UZXh0L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL0F1ZGlvVGV4dC9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvT25ib2FyZGluZy9mYXZvcml0ZS5wbmciLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL1NoYXJpbmcvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvU2hhcmluZy9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvT25ib2FyZGluZy9NYXBfdHJhbnNwYXJlbnQucG5nIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9yb3R1bmRhTWFwL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL3JvdHVuZGFNYXAvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvT3ZlcnZpZXcvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvT3ZlcnZpZXcvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvQmFjay9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9CYWNrL2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9Sb3R1bmRhLzEtbWluZWNyYWZ0LWFyLmpwZyIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvQVJWUl9tb25vbGl0aC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9BUlZSX21vbm9saXRoL2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9Sb3R1bmRhLzItYnJ1bmVsbGVzY2hpLmpwZyIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvSGlzdG9yeV9tb25vbGl0aC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9IaXN0b3J5X21vbm9saXRoL2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9Sb3R1bmRhLzMtemFraS1saXphcmQuanBnIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9HcmFwaGljc19tb25vbGl0aC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9HcmFwaGljc19tb25vbGl0aC9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvUm90dW5kYS81LXByb21hY2hvcy5wbmciLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL1ByZXNlbmNlX21vbm9saXRoL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL1ByZXNlbmNlX21vbm9saXRoL2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9Sb3R1bmRhLzYtZ2VucmVzLmpwZyIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvR2VucmVzX21vbm9saXRoL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL0dlbnJlc19tb25vbGl0aC9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvUm90dW5kYS85LXByaXZhY3kuanBnIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9Qcml2YWN5X21vbm9saXRoL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL1ByaXZhY3lfbW9ub2xpdGgvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1JvdHVuZGEvMTAtZnV0dXJlLmpwZyIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvRnV0dXJlX21vbm9saXRoL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL0Z1dHVyZV9tb25vbGl0aC9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvQXVkaW9QYWQvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0F1ZGlvUGFkL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9MYWJlbC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvTGFiZWwvaHVicy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvMWE2YWNlMzc3MTMzZjE0YS5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGgxIHhyLWxheWVyIGNsYXNzPVwiZmFkZVwiPnt7IG1zZyB9fTwvaDE+XG4gIDxwPlxuICAgIEhlcmUncyBzb21lIG1vcmUgdGV4dCBqdXN0IHRvIG1ha2UgdGhpbmdzIG5vdCBibGFuay5cbiAgPC9wPlxuXG4gIDxidXR0b24geHItbGF5ZXIgQGNsaWNrPVwic2hhcmVkLmluY3JlbWVudFwiPmNvdW50IGlzOiB7eyBzaGFyZWQuc3RhdGUuY291bnQgfX08L2J1dHRvbj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBpbmplY3QgfSBmcm9tICd2dWUnXG5cbmRlZmluZVByb3BzKHtcbiAgbXNnOiBTdHJpbmdcbn0pXG5cbmNvbnN0IHNoYXJlZCA9IGluamVjdCgnc2hhcmVkJylcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuYSB7XG4gIGNvbG9yOiAjYjU0MmI5O1xufVxuXG4uZmFkZSB7XG4gIGNvbG9yOiAjOTgwM2E1O1xuICAvKiB0cmFuc2l0aW9uOiBjb2xvciAxczsgKi9cbn1cblxuLmZhZGU6aG92ZXIge1xuICBjb2xvcjogI2E3OGUwNjtcbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICAgICAgPGltZyBhbHQ9XCJWdWUgbG9nb1wiIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9sb2dvLnBuZ1wiIC8+XG4gICAgICA8U29tZVRleHQgdi1iaW5kOm1zZz1cIm1lc2dcIiAvPlxuICAgICAgPCEtLSA8U29tZVRleHQgbXNnPVwiTmV0d29ya2VkIFZ1ZSBDb21wb25lbnQgd2l0aCBTaGFyZWQgQnV0dG9uIENvdW50XCIgLz4gLS0+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IGluamVjdCB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBTb21lVGV4dCBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL05ldHdvcmtlZEhlbGxvV29ybGQudnVlJ1xuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcblxubGV0IHBhcmFtcyA9IGluamVjdChcInBhcmFtc1wiKVxudmFyIG1lc2cgPSBwYXJhbXMgJiYgcGFyYW1zLm1lc2cgPyBwYXJhbXMubWVzZyA6IFwiTmV0d29ya2VkIFZ1ZSBDb21wb25lbnQgd2l0aCBTaGFyZWQgQnV0dG9uIENvdW50XCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuPC9zdHlsZT5cbiIsImltcG9ydCB7IGNyZWF0ZUFwcCwgQXBwLCBDb21wb25lbnQsIENvbXBvbmVudFB1YmxpY0luc3RhbmNlIH0gZnJvbSBcInZ1ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWdWVBcHAge1xuICAgIHRha2VPd25lcnNoaXA6ICAoKSA9PiBib29sZWFuXG4gICAgc2V0U2hhcmVkRGF0YTogKG9iamVjdDoge30pID0+IGJvb2xlYW5cblxuICAgIHdpZHRoOiBudW1iZXJcbiAgICBoZWlnaHQ6IG51bWJlclxuXG4gICAgdnVlQXBwOiBBcHBcbiAgICB2dWVSb290OiBDb21wb25lbnRQdWJsaWNJbnN0YW5jZSB8IHVuZGVmaW5lZFxuXG4gICAgY29uc3RydWN0b3IgKEFwcDogQ29tcG9uZW50LCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgY3JlYXRlT3B0aW9uczogYW55ID17fSkge1xuICAgICAgICB0aGlzLnRha2VPd25lcnNoaXAgPSB0aGlzLnRha2VPd25lcnNoaXBQcm90by5iaW5kKHRoaXMpXG4gICAgICAgIHRoaXMuc2V0U2hhcmVkRGF0YSA9IHRoaXMuc2V0U2hhcmVkRGF0YVByb3RvLmJpbmQodGhpcylcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0XG5cbiAgICAgICAgdGhpcy52dWVBcHAgPSBjcmVhdGVBcHAoQXBwLCBjcmVhdGVPcHRpb25zKVxuICAgIH1cblxuICAgIG1vdW50KCkge1xuICAgIH1cblxuICAgIC8vIGR1bW15IGZ1bmN0aW9ucywganVzdCB0byBsZXQgdXMgdXNlIHRoZSBzYW1lXG4gICAgLy8gZGF0YSBzdG9yZSB3aXRoIGh1YnMgYW5kIHRoZSB3ZWIgdGVzdGluZyBzZXR1cFxuICAgIHRha2VPd25lcnNoaXBQcm90bygpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHNldFNoYXJlZERhdGFQcm90byhvYmplY3Q6IHt9KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBjcmVhdGVBcHAsIEFwcCwgQ29tcG9uZW50LCBDb21wb25lbnRQdWJsaWNJbnN0YW5jZSB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IFNjZW5lLCBFbnRpdHkgfSBmcm9tICdhZnJhbWUnXG5pbXBvcnQgeyBFdGhlcmVhbExheW91dFN5c3RlbSwgV2ViTGF5ZXIzRCB9IGZyb20gXCJldGhlcmVhbFwiO1xuaW1wb3J0IFZ1ZUFwcCAgZnJvbSBcIi4vVnVlQXBwXCJcblxuLy8gY3JlYXRlIGluaXQgbWV0aG9kIGZvciBldGhlcmVhbFxuaW1wb3J0ICogYXMgZXRoZXJlYWwgZnJvbSAnZXRoZXJlYWwnXG5pbXBvcnQgeyBjcmVhdGVQcmludGVyLCBUaGlzRXhwcmVzc2lvbiwgVGhyb3dTdGF0ZW1lbnQgfSBmcm9tIFwibm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQvbGliL3R5cGVzY3JpcHRcIjtcbmltcG9ydCB7IGNyZWF0ZSB9IGZyb20gXCJtYXRoanNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemVFdGhlcmVhbCgpIHtcbiAgICBIdWJzQXBwLmluaXRpYWxpemVFdGhlcmVhbCgpXG59XG5cbi8vVEhSRUUuT2JqZWN0M0QuRGVmYXVsdE1hdHJpeEF1dG9VcGRhdGUgPSB0cnVlO1xuXG5leHBvcnQgZnVuY3Rpb24gc3lzdGVtVGljayh0aW1lOiBudW1iZXIsIGRlbHRhVGltZTogbnVtYmVyKSB7XG4gICBIdWJzQXBwLnN5c3RlbVRpY2sodGltZSwgZGVsdGFUaW1lKVxufVxuXG5mdW5jdGlvbiBjb3B5Q2FtZXJhKHNvdXJjZTogVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEsIHRhcmdldDogVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEpIHtcbiAgICBzb3VyY2UudXBkYXRlTWF0cml4V29ybGQoKVxuICAgIC8vbGV0IG9sZE5hbWUgPSB0YXJnZXQubmFtZVxuICAgIC8vdGFyZ2V0LmNvcHkoc291cmNlLCBmYWxzZSlcbiAgICAvL3RhcmdldC5uYW1lID0gb2xkTmFtZVxuXG4gICAgdGFyZ2V0LmZvdiA9IHNvdXJjZS5mb3Y7XG4gICAgdGFyZ2V0Lnpvb20gPSBzb3VyY2Uuem9vbTtcblxuICAgIHRhcmdldC5uZWFyID0gc291cmNlLm5lYXI7XG4gICAgdGFyZ2V0LmZhciA9IHNvdXJjZS5mYXI7XG5cbiAgICB0YXJnZXQuYXNwZWN0ID0gc291cmNlLmFzcGVjdDtcblxuICAgIC8vIHRhcmdldC5tYXRyaXhXb3JsZEludmVyc2UuY29weSggc291cmNlLm1hdHJpeFdvcmxkSW52ZXJzZSApO1xuICAgIC8vIHRhcmdldC5wcm9qZWN0aW9uTWF0cml4LmNvcHkoIHNvdXJjZS5wcm9qZWN0aW9uTWF0cml4ICk7XG4gICAgLy8gdGFyZ2V0LnByb2plY3Rpb25NYXRyaXhJbnZlcnNlLmNvcHkoIHNvdXJjZS5wcm9qZWN0aW9uTWF0cml4SW52ZXJzZSApO1xuXG4gICAgLy8gdGFyZ2V0LnVwLmNvcHkoIHNvdXJjZS51cCApO1xuXG4gICAgLy8gdGFyZ2V0Lm1hdHJpeC5jb3B5KCBzb3VyY2UubWF0cml4ICk7XG4gICAgLy8gdGFyZ2V0Lm1hdHJpeFdvcmxkLmNvcHkoIHNvdXJjZS5tYXRyaXhXb3JsZCApO1xuXG4gICAgLy8gdGFyZ2V0Lm1hdHJpeEF1dG9VcGRhdGUgPSBzb3VyY2UubWF0cml4QXV0b1VwZGF0ZTtcbiAgICAvLyB0YXJnZXQubWF0cml4V29ybGROZWVkc1VwZGF0ZSA9IHNvdXJjZS5tYXRyaXhXb3JsZE5lZWRzVXBkYXRlO1xuXG4gICAgc291cmNlLm1hdHJpeFdvcmxkLmRlY29tcG9zZSggdGFyZ2V0LnBvc2l0aW9uLCB0YXJnZXQucXVhdGVybmlvbiwgdGFyZ2V0LnNjYWxlKVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB0YXJnZXQucm90YXRpb24uc2V0RnJvbVF1YXRlcm5pb24oIHRhcmdldC5xdWF0ZXJuaW9uLCB1bmRlZmluZWQsIGZhbHNlICk7XG4gICAgdGFyZ2V0LnVwZGF0ZU1hdHJpeCgpXG4gICAgdGFyZ2V0LnVwZGF0ZU1hdHJpeFdvcmxkKHRydWUpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBWdWVBcHAge1xuICAgIHN0YXRpYyBzeXN0ZW06IEV0aGVyZWFsTGF5b3V0U3lzdGVtO1xuICAgIHN0YXRpYyBldGhlcmVhbENhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSgpXG4gICAgc3RhdGljIHBsYXllckNhbWVyYTogVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmE7XG5cbiAgICBpc0V0aGVyZWFsOiBib29sZWFuXG4gICAgaXNJbnRlcmFjdGl2ZTogYm9vbGVhblxuICAgIGlzTmV0d29ya2VkOiBib29sZWFuXG4gICAgaXNTdGF0aWM6IGJvb2xlYW5cblxuICAgIHByaXZhdGUgdXBkYXRlVGltZTogbnVtYmVyXG4gICAgcHJpdmF0ZSByYXljYXN0ZXI6IFRIUkVFLlJheWNhc3RlclxuXG4gICAgc2l6ZToge1xuICAgICAgICB3aWR0aDogbnVtYmVyLFxuICAgICAgICBoZWlnaHQ6IG51bWJlclxuICAgIH1cblxuICAgIC8vdGFrZU93bmVyc2hpcDogICgpID0+IGJvb2xlYW5cbiAgICAvL3NldFNoYXJlZERhdGE6IChvYmplY3Q6IHt9KSA9PiBib29sZWFuXG4gICAgLy93aWR0aDogbnVtYmVyXG4gICAgLy9oZWlnaHQ6IG51bWJlclxuICAgIC8vdnVlQXBwOiBBcHBcbiAgICAvL3Z1ZVJvb3Q6IENvbXBvbmVudFB1YmxpY0luc3RhbmNlIHwgdW5kZWZpbmVkIFxuXG4gICAgd2ViTGF5ZXIzRDogV2ViTGF5ZXIzRCB8IHVuZGVmaW5lZFxuICAgIG5lZWRzVXBkYXRlOiBib29sZWFuID0gZmFsc2VcblxuICAgIGhlYWREaXY6IEVsZW1lbnRcblxuICAgIHN0YXRpYyBpbml0aWFsaXplRXRoZXJlYWwoKSB7XG4gICAgICAgIGxldCBzY2VuZTogU2NlbmUgPSB3aW5kb3cuQVBQLnNjZW5lO1xuXG4gICAgICAgIHRoaXMuZXRoZXJlYWxDYW1lcmEubWF0cml4QXV0b1VwZGF0ZSA9IHRydWU7XG4gICAgICAgIC8vdGhpcy5ldGhlcmVhbENhbWVyYS52aXNpYmxlID0gZmFsc2U7XG5cbiAgICAgICAgLy9zY2VuZS5zZXRPYmplY3QzRChcImV0aGVyZWFsQ2FtZXJhXCIsIHRoaXMuZXRoZXJlYWxDYW1lcmEpXG5cbiAgICAgICAgdGhpcy5wbGF5ZXJDYW1lcmEgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWV3aW5nLWNhbWVyYVwiKSBhcyBFbnRpdHkpLmdldE9iamVjdDNEKFwiY2FtZXJhXCIpIGFzIFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhO1xuXG4gICAgICAgIC8vIGp1c3QgaW4gY2FzZSBcInZpZXdpbmctY2FtZXJhXCIgaXNuJ3Qgc2V0IHVwIHlldCAuLi4gd2hpY2ggaXQgXG4gICAgICAgIC8vIHNob3VsZCBiZSwgYnV0IGp1c3QgdG8gYmUgY2FyZWZ1bFxuICAgICAgICB0aGlzLnN5c3RlbSA9IGV0aGVyZWFsLmNyZWF0ZUxheW91dFN5c3RlbSh0aGlzLnBsYXllckNhbWVyYSA/IHRoaXMucGxheWVyQ2FtZXJhIDogc2NlbmUuY2FtZXJhKVxuICAgICAgICB3aW5kb3cuZXRoU3lzdGVtID0gdGhpcy5zeXN0ZW1cblxuICAgICAgICAvLyBjYW4gY3VzdG9taXplIGVhc2luZyBldGNcbiAgICAgICAgLy8gc3lzdGVtLnRyYW5zaXRpb24uZHVyYXRpb24gPSAxLjVcbiAgICAgICAgLy8gc3lzdGVtLnRyYW5zaXRpb24uZGVsYXkgPSAwXG4gICAgICAgIC8vIHN5c3RlbS50cmFuc2l0aW9uLm1heFdhaXQgPSA0XG4gICAgICAgIC8vIHN5c3RlbS50cmFuc2l0aW9uLmVhc2luZyA9IGV0aGVyZWFsLmVhc2luZy5lYXNlT3V0XG4gICAgfVxuXG4gICAgc3RhdGljIHN5c3RlbVRpY2sodGltZTogbnVtYmVyLCBkZWx0YVRpbWU6IG51bWJlcikge1xuICAgICAgICBsZXQgc2NlbmUgPSB3aW5kb3cuQVBQLnNjZW5lO1xuXG4gICAgICAgIGlmICghdGhpcy5wbGF5ZXJDYW1lcmEpIHtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQ2FtZXJhID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlld2luZy1jYW1lcmFcIikgYXMgRW50aXR5KS5nZXRPYmplY3QzRChcImNhbWVyYVwiKSBhcyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKCF0aGlzLnBsYXllckNhbWVyYSkgcmV0dXJuO1xuICAgIFxuICAgICAgICBjb3B5Q2FtZXJhKHRoaXMucGxheWVyQ2FtZXJhLCB0aGlzLmV0aGVyZWFsQ2FtZXJhKVxuXG4gICAgICAgIGlmICh0aGlzLmV0aGVyZWFsQ2FtZXJhICE9IHRoaXMuc3lzdGVtLnZpZXdOb2RlKSB7XG4gICAgICAgICAgICB0aGlzLnN5c3RlbS52aWV3Tm9kZSA9IHRoaXMuZXRoZXJlYWxDYW1lcmFcbiAgICAgICAgfVxuXG4gICAgICAgIHNjZW5lLnJlbmRlcmVyLmdldFNpemUoSHVic0FwcC5zeXN0ZW0udmlld1Jlc29sdXRpb24pXG4gICAgICAgIHRoaXMuc3lzdGVtLnZpZXdGcnVzdHVtLnNldEZyb21QZXJzcGVjdGl2ZVByb2plY3Rpb25NYXRyaXgodGhpcy5ldGhlcmVhbENhbWVyYS5wcm9qZWN0aW9uTWF0cml4KVxuXG4gICAgICAgIC8vIHRpY2sgbWV0aG9kIGZvciBldGhlcmVhbFxuICAgICAgICB0aGlzLnN5c3RlbS51cGRhdGUoZGVsdGFUaW1lLCB0aW1lKVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yIChBcHA6IENvbXBvbmVudCwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30sIGNyZWF0ZU9wdGlvbnM6IGFueSA9e30pIHtcbiAgICAgICAgXG5cbiAgICAgICAgaWYgKHBhcmFtcy53aWR0aCAmJiBwYXJhbXMuaGVpZ2h0ICYmIHBhcmFtcy53aWR0aCA+IDAgJiYgcGFyYW1zLmhlaWdodCA+IDApIHtcbiAgICAgICAgICAgIC8vIHJlc2V0IGJvdGhcbiAgICAgICAgICAgIHdpZHRoID0gcGFyYW1zLndpZHRoICAgXG4gICAgICAgICAgICBoZWlnaHQgPSBwYXJhbXMuaGVpZ2h0XG4gICAgICAgIH0gZWxzZSBpZiAoKHBhcmFtcy53aWR0aCAmJiBwYXJhbXMud2lkdGggPiAwKSB8fCAocGFyYW1zLmhlaWdodCAmJiBwYXJhbXMuaGVpZ2h0ID4gMCkpIHtcbiAgICAgICAgICAgIC8vIHNldCBvbmUgYW5kIHNjYWxlIHRoZSBvdGhlclxuICAgICAgICAgICAgaWYgKHBhcmFtcy53aWR0aCAmJiBwYXJhbXMud2lkdGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gKHBhcmFtcy53aWR0aCAvIHdpZHRoKSAqIGhlaWdodCAgICBcbiAgICAgICAgICAgICAgICB3aWR0aCA9IHBhcmFtcy53aWR0aCAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhcmFtcy5oZWlnaHQgJiYgcGFyYW1zLmhlaWdodCA+IDApIHtcbiAgICAgICAgICAgICAgICB3aWR0aCA9IChwYXJhbXMuaGVpZ2h0IC8gaGVpZ2h0KSAqIGhlaWdodFxuICAgICAgICAgICAgICAgIGhlaWdodCA9IHBhcmFtcy5oZWlnaHRcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgY3JlYXRlT3B0aW9ucylcbiAgICAgICAgdGhpcy5pc0V0aGVyZWFsID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy52dWVBcHAucHJvdmlkZSgncGFyYW1zJywgcGFyYW1zKVxuXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTmV0d29ya2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTdGF0aWMgPSB0cnVlO1xuICAgICAgICB0aGlzLnVwZGF0ZVRpbWUgPSAxMDBcbiAgICAgICAgdGhpcy5yYXljYXN0ZXIgPSBuZXcgVEhSRUUuUmF5Y2FzdGVyKClcbiAgICAgICAgLy90aGlzLndpZHRoID0gd2lkdGhcbiAgICAgICAgLy90aGlzLmhlaWdodCA9IGhlaWdodFxuICAgICAgICB0aGlzLnNpemUgPSB7IHdpZHRoOiB3aWR0aC8xMDAwLCBoZWlnaHQ6IGhlaWdodC8xMDAwfVxuICAgICAgICAvL3RoaXMudGFrZU93bmVyc2hpcCA9IHRoaXMudGFrZU93bmVyc2hpcFByb3RvLmJpbmQodGhpcylcbiAgICAgICAgLy90aGlzLnNldFNoYXJlZERhdGEgPSB0aGlzLnNldFNoYXJlZERhdGFQcm90by5iaW5kKHRoaXMpXG5cbiAgICAgICAgdGhpcy5oZWFkRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgICAvL3RoaXMuaGVhZERpdi5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLFwid2lkdGg6IDEwMCU7aGVpZ2h0OiAxMDAlO1wiKVxuXG4gICAgICAgIC8vdGhpcy52dWVBcHAgPSBjcmVhdGVBcHAoQXBwLCBjcmVhdGVPcHRpb25zKVxuICAgIH1cblxuICAgIG1vdW50KHVzZUV0aGVyZWFsPzogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmlzRXRoZXJlYWwgPSB1c2VFdGhlcmVhbCA9PT0gdHJ1ZVxuICAgICAgICBcbiAgICAgICAgdGhpcy52dWVSb290ID0gdGhpcy52dWVBcHAubW91bnQodGhpcy5oZWFkRGl2KTtcbiAgICAgICAgdGhpcy52dWVSb290LiRlbC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLFwid2lkdGg6IFwiICsgdGhpcy53aWR0aCArIFwicHg7IGhlaWdodDogXCIgKyB0aGlzLmhlaWdodCArIFwicHg7XCIpXG5cbiAgICAgICAgLy8gLy8gYWRkIGEgbGluayB0byB0aGUgc2hhcmVkIGNzc1xuICAgICAgICBsZXQgbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpXG4gICAgICAgIGwuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvaHVicy5jc3NcIilcbiAgICAgICAgbC5zZXRBdHRyaWJ1dGUoXCJyZWxcIiwgXCJzdHlsZXNoZWV0XCIpXG4gICAgICAgIGwuc2V0QXR0cmlidXRlKFwiY3Jvc3NvcmlnaW5cIixcImFub255bW91c1wiKVxuICAgICAgICB0aGlzLnZ1ZVJvb3QuJGVsLmluc2VydEJlZm9yZShsLCB0aGlzLnZ1ZVJvb3QuJGVsLmZpcnN0Q2hpbGQpXG5cbiAgICAgICAgLy8gbW92ZSB0aGlzIGludG8gbWV0aG9kXG4gICAgICAgIHRoaXMud2ViTGF5ZXIzRCA9IG5ldyBXZWJMYXllcjNEKHRoaXMudnVlUm9vdC4kZWwsIHtcbiAgICAgICAgICAgIGF1dG9SZWZyZXNoOiB0cnVlLFxuICAgICAgICAgICAgb25MYXllckNyZWF0ZTogdXNlRXRoZXJlYWwgPyBcbiAgICAgICAgICAgIChsYXllcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFkYXB0ZXIgPSBIdWJzQXBwLnN5c3RlbS5nZXRBZGFwdGVyKGxheWVyKVxuICAgICAgICAgICAgICAgIGFkYXB0ZXIub3BhY2l0eS5lbmFibGVkID0gdHJ1ZVxuICAgICAgICAgICAgICAgIGFkYXB0ZXIub25VcGRhdGUgPSAoKSA9PiBsYXllci51cGRhdGUoKVxuICAgICAgICAgICAgfSA6XG4gICAgICAgICAgICAobGF5ZXIpID0+IHt9LFxuICAgICAgICAgICAgb25MYXllclBhaW50OiAobGF5ZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1N0YXRpYykgeyB0aGlzLm5lZWRzVXBkYXRlID0gdHJ1ZSB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGV4dHVyZUVuY29kaW5nOiBUSFJFRS5zUkdCRW5jb2RpbmcsXG4gICAgICAgICAgICByZW5kZXJPcmRlck9mZnNldDogMFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXROZXR3b3JrTWV0aG9kcyh0YWtlT3duZXJzaGlwOiAoKSA9PiBib29sZWFuLCBzZXRTaGFyZWREYXRhOiAoe30pID0+IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy50YWtlT3duZXJzaGlwID0gdGFrZU93bmVyc2hpcDtcbiAgICAgICAgdGhpcy5zZXRTaGFyZWREYXRhID0gc2V0U2hhcmVkRGF0YTtcbiAgICB9XG5cbiAgICAvLyBkdW1teSBmdW5jdGlvbnMsIGp1c3QgdG8gYXZvaWQgZXJyb3JzIGlmIHRoZXkgZ2V0IGNhbGxlZCBiZWZvcmVcbiAgICAvLyBuZXR3b3JraW5nIGlzIGluaXRpYWxpemVkLCBvciBjYWxsZWQgd2hlbiBuZXR3b3JrZWQgaXMgZmFsc2VcbiAgICAvLyB0YWtlT3duZXJzaGlwUHJvdG8oKTogYm9vbGVhbiB7XG4gICAgLy8gICAgIHJldHVybiB0cnVlO1xuICAgIC8vIH1cblxuICAgIC8vIHNldFNoYXJlZERhdGFQcm90byhvYmplY3Q6IHt9KSB7XG4gICAgLy8gICAgIHJldHVybiB0cnVlO1xuICAgIC8vIH1cblxuICAgIC8vIHJlY2VpdmUgZGF0YSB1cGRhdGVzLiAgc2hvdWxkIGJlIG92ZXJyaWRkZW4gYnkgc3ViY2xhc3NlcywgYWxzbyByZXF1ZXN0c1xuICAgIC8vIHVwZGF0ZSBuZXh0IHRpY2tcbiAgICB1cGRhdGVTaGFyZWREYXRhKGRhdGFPYmplY3Q6IHt9KSB7XG4gICAgICAgIHRoaXMubmVlZHNVcGRhdGUgPSB0cnVlXG4gICAgfVxuXG4gICAgZ2V0U2l6ZSgpIHtcbiAgICAgICAgLy8gaWYgKCF0aGlzLmNvbXBTdHlsZXMpIHtcbiAgICAgICAgLy8gICAgIHRoaXMuY29tcFN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMudnVlUm9vdC4kZWwpO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIHZhciB3aWR0aCA9IHRoaXMuY29tcFN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKCd3aWR0aCcpXG4gICAgICAgIC8vIHdpZHRoID0gd2lkdGggJiYgd2lkdGgubGVuZ3RoID4gMCA/IHBhcnNlRmxvYXQod2lkdGgpIC8gMTAwMDogMVxuICAgICAgICAvLyB2YXIgaGVpZ2h0ID0gdGhpcy5jb21wU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ2hlaWdodCcpXG4gICAgICAgIC8vIGhlaWdodCA9IGhlaWdodCAmJiBoZWlnaHQubGVuZ3RoID4gMCA/IHBhcnNlRmxvYXQoaGVpZ2h0KSAvIDEwMDA6IDFcbiAgICAgICAgLy8gdGhpcy5zaXplID0geyB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0fVxuICAgICAgICBjb25zb2xlLmxvZyAoXCJkaXYgc2l6ZToge1wiICsgdGhpcy5zaXplLndpZHRoICsgXCIsIFwiICsgdGhpcy5zaXplLmhlaWdodCArIFwifVwiKVxuICAgICAgICByZXR1cm4gdGhpcy5zaXplXG4gICAgfVxuXG4gICAgLy8gcmVjZWl2ZSBkYXRhIHVwZGF0ZXMuICBzaG91bGQgYmUgb3ZlcnJpZGRlbiBieSBzdWJjbGFzc2VzXG4gICAgZ2V0U2hhcmVkRGF0YShkYXRhT2JqZWN0OiB7fSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJnZXRTaGFyZWREYXRhIHNob3VsZCBiZSBvdmVycmlkZGVuIGJ5IHN1YmNsYXNzZXNcIilcbiAgICB9XG4gICAgXG4gICAgLy8gb3ZlcnJpZGUgdG8gY2hlY2sgZm9yIHlvdXIgb3duIDNEIG9iamVjdHMgdGhhdCBhcmVuJ3Qgd2ViTGF5ZXJzXG4gICAgY2xpY2tlZChldnQ6IHtvYmplY3QzRDogVEhSRUUuT2JqZWN0M0R9KSB7XG4gICAgICAgIGlmICghdGhpcy5pc0ludGVyYWN0aXZlKSB7IHJldHVybiB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBvYmogPSBldnQub2JqZWN0M0RcbiAgICAgICAgdGhpcy5yYXljYXN0ZXIucmF5LnNldChvYmoucG9zaXRpb24sIFxuICAgICAgICAgICAgdGhpcy53ZWJMYXllcjNEIS5nZXRXb3JsZERpcmVjdGlvbihuZXcgVEhSRUUuVmVjdG9yMygpKS5uZWdhdGUoKSlcbiAgICAgICAgY29uc3QgaGl0ID0gdGhpcy53ZWJMYXllcjNEIS5oaXRUZXN0KHRoaXMucmF5Y2FzdGVyLnJheSlcbiAgICAgICAgaWYgKGhpdCkge1xuICAgICAgICAgIGhpdC50YXJnZXQuY2xpY2soKVxuICAgICAgICAgIGhpdC50YXJnZXQuZm9jdXMoKVxuICAgICAgICAgIGNvbnNvbGUubG9nKCdoaXQnLCBoaXQudGFyZ2V0LCBoaXQubGF5ZXIpXG4gICAgICAgIH0gICBcbiAgICB9XG5cbiAgICBkcmFnU3RhcnQoZXZ0OiB7fSkge1xuICAgICAgICAvLyBub3RoaW5nIGhlcmUgLi4uIHN1YmNsYXNzIHNob3VsZCBvdmVycmlkZVxuICAgIH1cblxuICAgIGRyYWdFbmQgKGV2dDoge30pIHtcbiAgICAgICAgLy8gbm90aGluZyBoZXJlIC4uLiBzdWJjbGFzcyBzaG91bGQgb3ZlcnJpZGVcbiAgICB9XG5cbiAgICBwbGF5KCkge1xuICAgICAgICAvLyBpZiB3ZSBjYW4gZmlndXJlIG91dCBob3cgdG8gcGF1c2UsIHRoZW4gcmVzdGFydCBoZXJlXG4gICAgfVxuXG4gICAgcGF1c2UoKSB7XG4gICAgICAgIC8vIHBlcmhhcHMgZmlndXJlIG91dCBob3cgdG8gcGF1c2UgdGhlIFZ1ZSBjb21wb25lbnQ/XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgLy8gVE9ETzogZGVzdHJveSB0aGUgdnVlIGNvbXBvbmVudCBhbmQgYW55IHJlc291cmNlcywgZXRjLiwgaXQgaGFzXG4gICAgfVxuXG4gICAgdGljayh0aW1lOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFdGhlcmVhbCkge1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgbmVlZHNVcGRhdGUgPSB0aGlzLm5lZWRzVXBkYXRlXG4gICAgICAgICAgICB0aGlzLm5lZWRzVXBkYXRlID0gZmFsc2VcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU3RhdGljICYmIHRoaXMudXBkYXRlVGltZSA8IHRpbWUpIHtcbiAgICAgICAgICAgICAgICBuZWVkc1VwZGF0ZSA9IHRydWVcbiAgICAgICAgICAgICAgICAvLyB3YWl0IGEgYml0IGFuZCBkbyBpdCBhZ2Fpbi4gIE1heSBnZXQgcmlkIG9mIHRoaXMgc29tZSBkYXksIHdlJ2xsIHNlZVxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVGltZSA9IE1hdGgucmFuZG9tKCkgKiAyMDAwICsgMTAwMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzU3RhdGljKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUaW1lID0gdGltZVxuICAgICAgICAgICAgICAgIG5lZWRzVXBkYXRlID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5lZWRzVXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53ZWJMYXllcjNEIS51cGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgeyByZWFjdGl2ZSwgcmVhZG9ubHkgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgVnVlQXBwIGZyb20gXCIuLi8uLi9WdWVBcHBcIjtcblxuZXhwb3J0IGludGVyZmFjZSBkYXRhIHtcbiAgICBjb3VudDogbnVtYmVyXG59XG5cbmV4cG9ydCBjbGFzcyBTdG9yZSB7XG4gICAgX3N0YXRlOiBkYXRhXG4gICAgc3RhdGU6IGRhdGFcbiAgICBhcHA6IFZ1ZUFwcFxuICAgIGNvbnN0cnVjdG9yKGFwcDogVnVlQXBwKSB7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gcmVhY3RpdmUoe1xuICAgICAgICAgICAgY291bnQ6IDBcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5hcHAgPSBhcHBcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHJlYWRvbmx5KHRoaXMuX3N0YXRlKVxuICAgIH0gICAgXG5cbiAgICBpbmNyZW1lbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLmFwcC50YWtlT3duZXJzaGlwKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlLmNvdW50Kys7XG4gICAgICAgICAgICB0aGlzLmFwcC5zZXRTaGFyZWREYXRhKHRoaXMuc3RhdGUpXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgdXBkYXRlU2hhcmVkRGF0YShkYXRhT2JqZWN0OiBkYXRhKSB7XG4gICAgICAgIC8vIG5lZWQgdG8gdXBkYXRlIHRoZSBlbGVtZW50cyB3aXRoaW4gdGhlIHN0YXRlLCBiZWNhdXNlIG90aGVyd2lzZVxuICAgICAgICAvLyB0aGUgZGF0YSB3b24ndCBmbG93IHRvIHRoZSBjb21wb25lbnRzXG4gICAgICAgIHRoaXMuX3N0YXRlLmNvdW50ID0gZGF0YU9iamVjdC5jb3VudFxuICAgIH1cbn0iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcbmltcG9ydCB7ZGF0YSBhcyBTaGFyZWREYXRhLCBTdG9yZX0gZnJvbSBcIi4vc2hhcmVkXCJcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgc2hhcmVkOiBTdG9yZVxuICAgIFxuICAgIGNvbnN0cnVjdG9yIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgNDAwLCA0NzUsIHBhcmFtcylcblxuICAgICAgICAvLyBjcmVhdGUgb3VyIHNoYXJlZCBkYXRhIG9iamVjdCB0aGF0IHdpbGxcbiAgICAgICAgLy8gc2hhcmUgZGF0YSBiZXR3ZWVuIHZ1ZSBhbmQgaHVic1xuICAgICAgICB0aGlzLnNoYXJlZCA9IG5ldyBTdG9yZSh0aGlzKVxuICAgICAgICB0aGlzLnZ1ZUFwcC5wcm92aWRlKCdzaGFyZWQnLCB0aGlzLnNoYXJlZClcblxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzTmV0d29ya2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc1N0YXRpYyA9IGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICB1cGRhdGVTaGFyZWREYXRhKGRhdGFPYmplY3Q6IFNoYXJlZERhdGEpIHtcbiAgICAgICAgc3VwZXIudXBkYXRlU2hhcmVkRGF0YShkYXRhT2JqZWN0KVxuICAgICAgICB0aGlzLnNoYXJlZC51cGRhdGVTaGFyZWREYXRhKGRhdGFPYmplY3QpXG4gICAgfVxuXG4gICAgZ2V0U2hhcmVkRGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkLnN0YXRlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcChwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXRcbiIsIjx0ZW1wbGF0ZT5cbiAgPGgxIHhyLWxheWVyIGNsYXNzPVwiZmFkZVwiPnt7IG1zZyB9fTwvaDE+XG5cbiAgPHA+XG4gICAgPGEgaHJlZj1cImh0dHBzOi8vdml0ZWpzLmRldi9ndWlkZS9mZWF0dXJlcy5odG1sXCIgdGFyZ2V0PVwiX2JsYW5rXCI+XG4gICAgICBWaXRlIERvY3VtZW50YXRpb24gYW5kIFRoZW4gU29tZSEgXG4gICAgPC9hPlxuICAgIHxcbiAgICA8YSBocmVmPVwiaHR0cHM6Ly92My52dWVqcy5vcmcvXCIgdGFyZ2V0PVwiX2JsYW5rXCI+VnVlIDMgRG9jdW1lbnRhdGlvbjwvYT5cbiAgPC9wPlxuXG4gIDxidXR0b24geHItbGF5ZXIgQGNsaWNrPVwic3RhdGUuY291bnQrK1wiPmNvdW50IGlzOiB7eyBzdGF0ZS5jb3VudCB9fTwvYnV0dG9uPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlYWN0aXZlIH0gZnJvbSAndnVlJ1xuXG5kZWZpbmVQcm9wcyh7XG4gIG1zZzogU3RyaW5nXG59KVxuXG5jb25zdCBzdGF0ZSA9IHJlYWN0aXZlKHsgY291bnQ6IDAgfSlcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuYSB7XG4gIGNvbG9yOiAjYjU0MmI5O1xufVxuXG4uZmFkZSB7XG4gIGNvbG9yOiAjOTgwM2E1O1xuICAvKiB0cmFuc2l0aW9uOiBjb2xvciAxczsgKi9cbn1cblxuLmZhZGU6aG92ZXIge1xuICBjb2xvcjogIzA2YTcxYjtcbn1cbjwvc3R5bGU+XG5cbiIsIjx0ZW1wbGF0ZT5cbjxkaXY+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICAgICAgPGltZyBhbHQ9XCJWdWUgbG9nb1wiIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9sb2dvLnBuZ1wiIC8+XG4gICAgICA8SGVsbG9Xb3JsZCBtc2c9XCJWdWUgQ29tcG9uZW50IHdpdGggTG9jYWwgQnV0dG9uIENvdW50XCIgLz5cbiAgICAgIDxwIGlkPVwiZWRpdFwiIHYtYmluZDpjbGFzcz1cInsgdXBjbG9zZTogc2hhcmVkLnN0YXRlLmNsb3NlIH1cIiB4ci1sYXllcj5cbiAgICAgICAgRWRpdCBjb2RlIGluIDxjb2RlPnNyYy9hcHBzPC9jb2RlPiB0byB0ZXN0IGhvdCBtb2R1bGUgcmVwbGFjZW1lbnQgd2hpbGUgcnVubmluZyBwcm9qZWN0IGFzIFwibnBtIHJ1biBkZXZcIi5cbiAgICAgIDwvcD5cblxuICA8L2Rpdj5cbjwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBIZWxsb1dvcmxkIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvSGVsbG9Xb3JsZC52dWUnXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuXG5pbXBvcnQgeyBpbmplY3QgfSBmcm9tICd2dWUnXG5cbmNvbnN0IHNoYXJlZCA9IGluamVjdCgnc2hhcmVkJylcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuI2VkaXQge1xuICBjb2xvcjogI2JlYTdkMTtcbn1cblxuI2VkaXQudXBjbG9zZSB7XG4gIGNvbG9yOiAjY2MwYTBhO1xufVxuPC9zdHlsZT5cbiIsImltcG9ydCB7IHJlYWN0aXZlLCByZWFkb25seSB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCBWdWVBcHAgZnJvbSBcIi4uLy4uL1Z1ZUFwcFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIGRhdGEge1xuICAgIGNsb3NlOiBib29sZWFuXG59XG5cbmV4cG9ydCBjbGFzcyBTdG9yZSB7XG4gICAgX3N0YXRlOiBkYXRhXG4gICAgc3RhdGU6IGRhdGFcbiAgICBhcHA6IFZ1ZUFwcFxuXG4gICAgY29uc3RydWN0b3IoYXBwOiBWdWVBcHApIHtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSByZWFjdGl2ZSh7XG4gICAgICAgICAgICBjbG9zZTogZmFsc2VcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5hcHAgPSBhcHBcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHJlYWRvbmx5KHRoaXMuX3N0YXRlKVxuICAgIH0gICAgXG5cbiAgICBzZXRDbG9zZShjOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZS5jbG9zZSAhPSBjKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZS5jbG9zZSA9IGM7XG4gICAgICAgIH1cbiAgICB9IFxufVxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5pbXBvcnQge2RhdGEgYXMgU2hhcmVkRGF0YSwgU3RvcmV9IGZyb20gXCIuL3NoYXJlZFwiXG5pbXBvcnQgeyBXZWJMYXllcjNEQ29udGVudCB9IGZyb20gXCJldGhlcmVhbFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBzaGFyZWQ6IFN0b3JlXG4gICAgXG4gICAgY29uc3RydWN0b3IgKHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCA1MDAsIDUwMCwgcGFyYW1zKVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuc2hhcmVkID0gbmV3IFN0b3JlKHRoaXMpXG4gICAgICAgIHRoaXMudnVlQXBwLnByb3ZpZGUoJ3NoYXJlZCcsIHRoaXMuc2hhcmVkKVxuICAgIH1cblxuICAgIGRvY3M6IFdlYkxheWVyM0RDb250ZW50IHwgdW5kZWZpbmVkXG4gICAgYm91bmRzU2l6ZTogVEhSRUUuVmVjdG9yMyAgPSBuZXcgVEhSRUUuVmVjdG9yMygpXG4gICAgYm91bmRzOiBUSFJFRS5Cb3gzID0gbmV3IFRIUkVFLkJveDMoKVxuXG4gICAgbW91bnQgKCkge1xuICAgICAgICBzdXBlci5tb3VudCh0cnVlKSAvLyB1c2UgZXRoZXJlYWxcblxuICAgICAgICB0aGlzLmRvY3MgPSB0aGlzLndlYkxheWVyM0QhLnF1ZXJ5U2VsZWN0b3IoJyNlZGl0JylcbiAgICAgICAgaWYgKCF0aGlzLmRvY3MpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIlZ1ZSBhcHAgbmVlZHMgI2VkaXQgZGl2XCIpXG4gICAgICAgICAgICByZXR1cm4gXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBhZGFwdGVyID0gSHVic0FwcC5zeXN0ZW0uZ2V0QWRhcHRlcih0aGlzLmRvY3MpIFxuICAgICAgICBhZGFwdGVyLm9uVXBkYXRlID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ib3VuZHMgPSBhZGFwdGVyLm1ldHJpY3MudGFyZ2V0LnZpc3VhbEJvdW5kc1xuICAgICAgICAgICAgdGhpcy5ib3VuZHMuZ2V0U2l6ZSh0aGlzLmJvdW5kc1NpemUpXG4gICAgICAgICAgICB2YXIgc2l6ZSA9IE1hdGguc3FydCh0aGlzLmJvdW5kc1NpemUueCAqIHRoaXMuYm91bmRzU2l6ZS54ICsgdGhpcy5ib3VuZHNTaXplLnkgKiB0aGlzLmJvdW5kc1NpemUueSlcbiAgICAgICAgICAgIGlmICh0aGlzLnNoYXJlZC5zdGF0ZS5jbG9zZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hhcmVkLnNldENsb3NlIChzaXplIDwgMjEwKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNoYXJlZC5zZXRDbG9zZSAoc2l6ZSA8IDE5MClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZG9jcyEudXBkYXRlKClcbiAgICAgICAgfVxuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcChwYXJhbXMpXG4gICAgYXBwLm1vdW50KCkgXG5cbiAgICBcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxoMj57eyBtc2cgfX08L2gyPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IGRlZmluZVByb3BzLCByZWFjdGl2ZSB9IGZyb20gJ3Z1ZSdcblxuZGVmaW5lUHJvcHMoe1xuICBtc2c6IFN0cmluZ1xufSlcblxuY29uc3Qgc3RhdGUgPSByZWFjdGl2ZSh7IGNvdW50OiAwIH0pXG48L3NjcmlwdD4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8VGl0bGUgdi1iaW5kOm1zZz1cIm1lc2dcIiAvPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBpbmplY3QgfSBmcm9tICd2dWUnXG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG5cbmxldCBwYXJhbXMgPSBpbmplY3QoXCJwYXJhbXNcIilcbnZhciBtZXNnID0gcGFyYW1zICYmIHBhcmFtcy5tZXNzYWdlID8gcGFyYW1zLm1lc3NhZ2UgOiBcIlBPUlRBTCBUSVRMRVwiXG48L3NjcmlwdD5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgMTAwLCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxoND57eyBtc2cgfX08L2g0PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IGRlZmluZVByb3BzLCByZWFjdGl2ZSB9IGZyb20gJ3Z1ZSdcblxuZGVmaW5lUHJvcHMoe1xuICBtc2c6IFN0cmluZ1xufSlcblxuY29uc3Qgc3RhdGUgPSByZWFjdGl2ZSh7IGNvdW50OiAwIH0pXG48L3NjcmlwdD4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8VGl0bGUgdi1iaW5kOm1zZz1cIm1lc2dcIiAvPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBpbmplY3QgfSBmcm9tICd2dWUnXG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJTdWJ0aXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG5cbmxldCBwYXJhbXMgPSBpbmplY3QoXCJwYXJhbXNcIilcbnZhciBtZXNnID0gcGFyYW1zICYmIHBhcmFtcy5tZXNzYWdlID8gcGFyYW1zLm1lc3NhZ2UgOiBcIlBPUlRBTCBTVUJUSVRMRVwiXG48L3NjcmlwdD5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgMTAwLCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvMzhkNmQ3YTFlMDJmYzJmOS5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxUaXRsZSBtc2c9XCJSZWFsaXR5IE1lZGlhXCIgLz5cblx0PGltZyBzcmM9XCIuLi8uLi9hc3NldHMvaW1hZ2VzL3JvdHVuZGEtbWFwLnBuZ1wiIHdpZHRoPVwiMjUwXCIgPlxuXHQ8ZGl2IGNsYXNzPVwiZGlzcGxheXRleHRcIj5BUiBhbGxvd3MgdXMgdG8gZXh0ZW5kIG91ciBwaHlzaWNhbCByZWFsaXR5OyBWUiBjcmVhdGVzIGZvciB1cyBhIGRpZmZlcmVudCByZWFsaXR5LjwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgICAvL3RoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvN2FmN2I5NWIzNWZkNzYxNi5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPFRpdGxlIG1zZz1cIkFSICZhbXA7IFZSIGFzIHJlYWxpdHkgbWVkaWFcIiAvPlxuXHQ8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWFnZXMvbGFjaW90YXQtVlIuanBnXCIgd2lkdGg9XCIyNTBcIiA+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj4gRWFjaCByZWFsaXR5IG1lZGl1bSBtZWRpYXRlcyBhbmQgcmVtZWRpYXRlcy4gSXQgb2ZmZXJzIGEgbmV3IHJlcHJlc2VudGF0aW9uIG9mIHRoZSB3b3JsZCB0aGF0IHdlIGltcGxpY2l0bHkgY29tcGFyZSBcblx0XHR0byBvdXIgZXhwZXJpZW5jZSBvZiB0aGUgd29ybGQgaW4gaXRzZWxmLCBidXQgYWxzbyB0aHJvdWdoIG90aGVyIG1lZGlhLjwvZGl2PiBcbiAgPC9kaXY+XG4gICA8cD5cbiAgICA8YSBocmVmPVwiaHR0cHM6Ly9yZWFsaXR5bWVkaWEuZGlnaXRhbFwiIHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgU3RhcnQgYXQgdGhlIHJlYWxpdHkgbWVkaWEgc2l0ZS4gXG4gICAgPC9hPlxuICAgIHxcbiAgPC9wPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvN2FiM2Q4NmFmZDQ4ZGJmYi5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gICAgPFRpdGxlIG1zZz1cIlRoZSBMYUNpb3RhdCBFZmZlY3RcIiAvPlxuICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cblx0ICA8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWFnZXMvbGFjaW90YXQuanBnXCIgd2lkdGg9XCIyNTBcIj5cblx0ICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+RmlsbSBiZWNhbWUgb25lIG9mIHRoZSBtb3N0IGltcG9ydGFudCByZWFsaXR5IFxuICAgICAgbWVkaWEgb2YgdGhlIHR3ZW50aWV0aCBjZW50dXJ5LCBhbmQgaW4gc29tZSB3YXlzLCBpdCBpcyBhIGZvcmVydW5uZXIgXG4gICAgICBvZiB2aXJ0dWFsIHJlYWxpdHkuPC9kaXY+ICBcbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+ICBcbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIC8vdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC85MWZkZmE4MTFlNzUyZGM4LmpwZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cblx0PGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICAgIDxUaXRsZSBtc2c9XCIzLUQgR3JhcGhpY3MgJmFtcDsgVHJhY2tpbmdcIiAvPlxuXHQ8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWFnZXMvdW5jYW5ueS5qcGdcIiB3aWR0aD1cIjIwMFwiPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+My1EIGNvbXB1dGVyIGdyYXBoaWNzIGhlbHAgdG8gY29uc3RydWN0IHRoZSB2aXN1YWwgXG5cdFx0cmVhbGl0aWVzIG9mIEFSIGFuZCBWUiwgdGhhdCBpcyBwaG90b3JlYWxpc20uIFRoZSB1bmNhbm55IHZhbGxleS48L2Rpdj5cblx0PC9kaXY+XG5cdDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgIC8vIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvZGMwNWMwNDU0NmE2OWU2NC5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gICAgPFRpdGxlIG1zZz1cIlByZXNlbmNlXCIgLz5cblx0ICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+IFxuXHQgIDxpbWcgc3JjPVwiLi4vLi4vYXNzZXRzL2ltYWdlcy9wYXJ0aGVub24ucG5nXCIgd2lkdGg9XCIyNTBcIj5cblx0ICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+UHJlc2VuY2UgaW4gVlIgaXMgdXN1YWxseSBjb25jZWl2ZWQgb2YgYXMgZm9yZ2V0dGluZyB0aGF0IHRoZSBtZWRpdW0gaXMgdGhlcmUuIFRoZSBpZGVhIGlzIHRoYXQgaWYgdGhlIHVzZXIgY2FuIGJlIGVudGljZWQgaW50byBiZWhhdmluZyBhcyBpZiBzaGUgd2VyZSBub3QgYXdhcmUgb2YgYWxsIHRoZSBjb21wbGV4IHRlY2hub2xvZ3ksIHRoZW4gc2hlIGZlZWxzIHByZXNlbmNlLjwvZGl2PiAgXG4gIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIC8vdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gICAgPFRpdGxlIG1zZz1cIkdlbnJlc1wiIC8+XG4gICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPiBcblx0ICA8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWFnZXMvcGFydGhlbm9uLnBuZ1wiIHdpZHRoPVwiMjUwXCI+XG5cdCAgPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlJlYWxpdHkgbWVkaWEgYXBwbGljYXRpb25zIG9mdGVuIGZ1bmN0aW9uIGFzIGFkZGl0aW9ucyB0byBlc3RhYmxpc2hlZCBnZW5yZXMuIE1vc3QgY3VycmVudCBBUiBhbmQgVlIgYXBwbGljYXRpb25zIGJlaGF2ZSBsaWtlIGFwcGxpY2F0aW9ucyBvciBhcnRpZmFjdHMgdGhhdCB3ZSBrbm93IGZyb20gZWFybGllciBtZWRpYS48L2Rpdj4gIFxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIC8vdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gICAgPFRpdGxlIG1zZz1cIlRoZSBGdXR1cmUgb2YgQVIgJmFtcDsgVlJcIiAvPlxuICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cblx0ICA8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWFnZXMvcGFydGhlbm9uLnBuZ1wiIHdpZHRoPVwiMjUwXCI+XG5cdCAgPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlZSIHdpbGwgY29udGludWUgdG8gY29uc3RydWN0IHNwZWNpYWwgcmVhbGl0aWVzLCBhcGFydCBmcm9tIHRoZSBldmVyeWRheS4gVlIgd29ybGRzIHdpbGwgY29udGludWUgdG8gYmUgbWV0YXBob3JpYyB3b3JsZHMuPC9kaXY+ICBcbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICAgIDxUaXRsZSBtc2c9XCJQcml2YWN5IGFuZCBQdWJsaWMgU3BhY2VcIiAvPlxuICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cblx0ICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+UGVydmFzaXZlLCBhbHdheXMtb24gQVIgYXBwbGljYXRpb25zIGhhdmUgdGhlIHBvdGVudGlhbCB0byBwcm92aWRlIGNvbXBhbmllcyBvciBnb3Zlcm5tZW50IGF1dGhvcml0aWVzIFxuICAgICAgZXZlbiBtb3JlIGluZm9ybWF0aW9uIGFuZCB3aXRoIG1vcmUgcHJlY2lzaW9uIHRoYW4gb3VyIGN1cnJlbnQgbW9iaWxlIGFwcGxpY2F0aW9ucyBkbywgXG4gICAgICBib3RoIGJ5IGFnZ3JlZ2F0aW5nIG91ciBoYWJpdHMgYXMgY29uc3VtZXJzIGFuZCBieSBpZGVudGlmeWluZyB1cyBhcyBpbmRpdmlkdWFscy48L2Rpdj4gIFxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgIC8vICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gICAgXG4gICAgPGRpdiBjbGFzcz1cInBvc3RlcnRpdGxlXCI+QVIgJmFtcDsgVlIgYXMgcmVhbGl0eSBtZWRpYTwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJmbHVzaGxlZnRcIj5cbiAgICAgIDxicj5cbiAgICAgIDxoMz4gU29tZSBvZiB0aGUga2V5IGRpZmZlcmVuY2VzIGJldHdlZW4g4oCcY2xhc3NpY+KAnSBWUiBhbmQgQVI8L2gzPlxuICAgICAgPGJyPlxuICAgICAgPGgzPiBFeHRlbmRlZCByZWFsaXR5IChYUikgYW5kIHRoZSBpbW1lcnNpdmUgd2ViIDwvaDM+XG4gICAgICA8YnI+XG4gICAgICA8aDM+IFdoZXJlIEFSIGFuZCBWUiBmaXQgb24gTWlsZ3JhbSBhbmQgS2lzaGlub+KAmXMgdmlydHVhbGl0eSBjb250aW51dW08L2gzPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgLy8gdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gICAgPFRpdGxlIG1zZz1cIlRoZSBIaXN0b3J5IG9mIFJlYWxpdHkgTWVkaWFcIiAvPlxuICAgICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmx1c2hsZWZ0XCI+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBTb21lIG9mIHRoZSBrZXkgZGlmZmVyZW5jZXMgYmV0d2VlbiDigJxjbGFzc2lj4oCdIFZSIGFuZCBBUjwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBFeHRlbmRlZCByZWFsaXR5IChYUikgYW5kIHRoZSBpbW1lcnNpdmUgd2ViIDwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBXaGVyZSBBUiBhbmQgVlIgZml0IG9uIE1pbGdyYW0gYW5kIEtpc2hpbm/igJlzIHZpcnR1YWxpdHkgY29udGludXVtPC9oMz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj4gXG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gICAgPFRpdGxlIG1zZz1cIjMtRCAmYW1wOyBUcmFja2luZ1wiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbHVzaGxlZnRcIj5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFNvbWUgb2YgdGhlIGtleSBkaWZmZXJlbmNlcyBiZXR3ZWVuIOKAnGNsYXNzaWPigJ0gVlIgYW5kIEFSPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IEV4dGVuZGVkIHJlYWxpdHkgKFhSKSBhbmQgdGhlIGltbWVyc2l2ZSB3ZWIgPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFdoZXJlIEFSIGFuZCBWUiBmaXQgb24gTWlsZ3JhbSBhbmQgS2lzaGlub+KAmXMgdmlydHVhbGl0eSBjb250aW51dW08L2gzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PiAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgICA8VGl0bGUgbXNnPVwiUHJlc2VuY2VcIiAvPlxuICAgICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmx1c2hsZWZ0XCI+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBTb21lIG9mIHRoZSBrZXkgZGlmZmVyZW5jZXMgYmV0d2VlbiDigJxjbGFzc2lj4oCdIFZSIGFuZCBBUjwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBFeHRlbmRlZCByZWFsaXR5IChYUikgYW5kIHRoZSBpbW1lcnNpdmUgd2ViIDwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBXaGVyZSBBUiBhbmQgVlIgZml0IG9uIE1pbGdyYW0gYW5kIEtpc2hpbm/igJlzIHZpcnR1YWxpdHkgY29udGludXVtPC9oMz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj4gICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gICAgPFRpdGxlIG1zZz1cIkdlbnJlc1wiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbHVzaGxlZnRcIj5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFNvbWUgb2YgdGhlIGtleSBkaWZmZXJlbmNlcyBiZXR3ZWVuIOKAnGNsYXNzaWPigJ0gVlIgYW5kIEFSPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IEV4dGVuZGVkIHJlYWxpdHkgKFhSKSBhbmQgdGhlIGltbWVyc2l2ZSB3ZWIgPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFdoZXJlIEFSIGFuZCBWUiBmaXQgb24gTWlsZ3JhbSBhbmQgS2lzaGlub+KAmXMgdmlydHVhbGl0eSBjb250aW51dW08L2gzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PiAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgICA8VGl0bGUgbXNnPVwiRnV0dXJlXCIgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsdXNobGVmdFwiPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gU29tZSBvZiB0aGUga2V5IGRpZmZlcmVuY2VzIGJldHdlZW4g4oCcY2xhc3NpY+KAnSBWUiBhbmQgQVI8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gRXh0ZW5kZWQgcmVhbGl0eSAoWFIpIGFuZCB0aGUgaW1tZXJzaXZlIHdlYiA8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gV2hlcmUgQVIgYW5kIFZSIGZpdCBvbiBNaWxncmFtIGFuZCBLaXNoaW5v4oCZcyB2aXJ0dWFsaXR5IGNvbnRpbnV1bTwvaDM+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+ICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICAgIDxUaXRsZSBtc2c9XCJQcml2YWN5XCIgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsdXNobGVmdFwiPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gU29tZSBvZiB0aGUga2V5IGRpZmZlcmVuY2VzIGJldHdlZW4g4oCcY2xhc3NpY+KAnSBWUiBhbmQgQVI8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gRXh0ZW5kZWQgcmVhbGl0eSAoWFIpIGFuZCB0aGUgaW1tZXJzaXZlIHdlYiA8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gV2hlcmUgQVIgYW5kIFZSIGZpdCBvbiBNaWxncmFtIGFuZCBLaXNoaW5v4oCZcyB2aXJ0dWFsaXR5IGNvbnRpbnV1bTwvaDM+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+ICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvMTkwOTk0MzcwYWViZTM5NS5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNS9BbHl4LXNwbGFzaC5wbmdcIiB3aWR0aD1cIjQwMFwiID5cbiAgPGJyPjxicj5cbiAgPFRpdGxlIG1zZz1cIkhhbGZMaWZlOiBBbHl4XCIgLz5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPiBGaXJzdCBwZXJzb24gc2hvb3RlciBnYW1lcyBzdWNoIGFzICA8YSBocmVmPVwiaHR0cHM6Ly93d3cuaGFsZi1saWZlLmNvbS9lbi9hbHl4L1wiIHRhcmdldD1cIl9ibGFua1wiPkhhbGZMaWZlOiBBbHl4IDwvYT4gaGF2ZSBsb25nIHVzZWQgMy1EIGdyYXBoaWNzIHRvIGNyZWF0ZSBhbiBpbW1lcnNpdmUgZXhwZXJpZW5jZSBmb3IgbWlsbGlvbnMgb2YgcGxheWVycy4gQW5kIGZvciBkZWNhZGVzLCBcbiAgICBwbGF5ZXJzIG9uIGNvbXB1dGVycyBhbmQgZ2FtZSBjb25zb2xlcyBoYXZlIHllYXJuZWQgZm9yIHRydWUgVlIgc28gdGhhdCB0aGV5IGNvdWxkIGZhbGwgdGhyb3VnaCB0aGUgc2NyZWVuIGludG8gdGhlIHdvcmxkcyBvbiB0aGUgb3RoZXIgc2lkZS48L2Rpdj4gXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPFRpdGxlIG1zZz1cIlBva2Vtb24gR29cIiAvPlxuXHQgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5Qb2tlbW9uIEdvICgyMDE2KSBpcyBwZXJoYXBzIHN0aWxsIHRoZSBiZXN0LWtub3duIEFSIGdhbWUuIFxuICAgICAgVGhlIFBva2Vtb24gZnJhbmNoaXNlIHdhcyBhbHJlYWR5IGRlY2FkZXMgb2xkLCBhbmQgdGhpcyB3YXMgY2VydGFpbmx5IHBhcnQgb2YgdGhlIFxuICAgICAgYW5zd2VyIGZvciB0aGUgQVIgZ2FtZeKAmXMgc3VycHJpc2luZyBpbXBhY3QuIFxuICAgICAgSXQgd2FzIHRoZSBmaXJzdCBQb2tlbW9uIGdhbWUgb24gYSBtb2JpbGUgcGhvbmUgYW5kIHRoZSBmaXJzdCBmcmVlIFBva2Vtb24gZ2FtZSBvbiBhbnkgcGxhdGZvcm0uXG4gICAgPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgLy8gICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxUaXRsZSBtc2c9XCJCZWF0IFNhYmVyXCIgLz5cblx0ICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+QmVhdCBTYWJlciBpcyBhIFZSIHJoeXRobSBnYW1lIFxuICAgICAgd2l0aCBhIGxpdHRsZSBTdGFyIFdhcnMgdGhyb3duIGluLiBUaGUgcGxheWVyIHVzZXMgbGlnaHRzYWJlcnMgdG8ga2VlcCB0aGUgYmVhdC4gXG4gICAgPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgIC8vIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxUaXRsZSBtc2c9XCJXYWxraW5nIERlYWQ6IE91ciBXb3JsZFwiIC8+XG5cdCAgPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPkluIHRoaXMgQVIgdmVyc2lvbiBvZiB0aGUgdHJhbnNtZWRpYSBmcmFuY2hpc2VcbiAgICAgIEdQUyBpcyB1c2VkIHRvIGRldGVybWluZSB5b3VyIGxvY2F0aW9uIGluIHRoZSB3b3JsZC4gWW91ciBsb2NhdGlvbiBcbiAgICAgIGFuZCB0aGUgem9tYmllcyBhcHBlYXIgaW4gYW4gZW5oYW5jZWQgR29vZ2xlIE1hcHMgbWFwIG9uIHRoZSBwaG9uZSBzY3JlZW4uXG4gICAgPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgIC8vIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxUaXRsZSBtc2c9XCJMYSBBcHBhcml6aW9uZVwiIC8+XG5cdCAgPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPkxpa2UgdmlkZW8gZ2FtZXMgYW5kIDM2MC1kZWdyZWUgdmlkZW8sIFxuICAgICAgVlIgYXJ0IGVtcGhhc2l6ZXMgaW1tZXJzaW9uIGFzIHRoZSBmZWF0dXJlIHRoYXQgbWFrZXMgdGhlIGV4cGVyaWVuY2UgXG4gICAgICB1bmlxdWUsIGFzIGluIGEgVlIgd29yayBieSBDaHJpc3RpYW4gTGVtbWVyeiBlbnRpdGxlZCBMYSBBcHBhcml6aW9uZSAoMjAxNykuXG4gICAgPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgICAvL3RoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxUaXRsZSBtc2c9XCJNaW5lY3JhZnQgVlJcIiAvPlxuXHQgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5NaW5lY3JhZnQgVlIgaXMgYSBmdWxseSBpbW1lcnNpdmUsIFxuICAgICAgaGVhZHNldCB2ZXJzaW9uIG9mIHRoZSBzYW5kYm94IGdhbWUgdGhhdCBhbHJlYWR5IHJ1bnMgb24gY29tcHV0ZXJzLCBnYW1lIGNvbnNvbGVzLCBhbmQgbW9iaWxlIGRldmljZXMuIFxuICAgICAgSXQgaXMgY2FsbGVkIGEgXCJzYW5kYm94IGdhbWVcIiBiZWNhdXNlIGl0IHByb3ZpZGVzIGFuIGluZGVwZW5kZW50IGVudmlyb25tZW50IGluIHdoaWNoIFxuICAgICAgcGxheWVycyBjYW4gbWFrZSB0aGVpciBvd24gc3RydWN0dXJlcyBhbmQgb2JqZWN0cyBvdXQgb2YgdmlydHVhbCwgTEVHTy1saWtlIGJsb2Nrcy5cbiAgICA8L2Rpdj4gXG4gIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXIgaGVhZGxpbmVcIj5cbiAgPFRpdGxlIG1zZz1cIkFSICZhbXA7IFZSIEdBTUVTXCIgLz5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlciBoZWFkbGluZVwiPlxuICA8VGl0bGUgbXNnPVwiQVIgJmFtcDsgVlIgQVJUXCIgLz5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbi8vICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgPFRpdGxlIG1zZz1cIlByZXNlbmNlXCIgLz5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlByZXNlbmNlIGlzIHRoZSBhYnNlbmNlIG9mIG1lZGlhdGlvbi4gSWYgdGhlIHVzZXJzIGNhbiBmb3JnZXQgdGhhdCB0aGUgbWVkaXVtIGlzIHRoZXJlLCB0aGVuIHRoZXkgZmVlbCBwcmVzZW5jZS4gPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgLy90aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgPCEtLSA8VGl0bGUgbXNnPVwiQXVyYVwiIC8+IC0tPlxuICA8ZGl2IGNsYXNzPVwiaGVhZGxpbmVcIj5BdXJhPC9kaXY+XG4gIDxicj5cbiAgPGJyPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+XG4gICAgPHA+SW4gMTkzMHMsIFdhbHRlciBCZW5qYW1pbiBpbnRyb2R1Y2VkIHRoZSBjb25jZXB0IG9mIDxlbT5hdXJhPC9lbT4gaW4gVGhlIFdvcmsgb2YgQXJ0IGluIHRoZSBBZ2Ugb2YgTWVjaGFuaWNhbCBSZXByb2R1Y3Rpb24uIFxuICBBdXJhIGlzIHRoZSA8ZW0+aGVyZSBhbmQgbm93PC9lbT4gdGhhdCB3b3JrIHBvc3Nlc3NlcyBiZWNhdXNlIG9mIGl0cyB1bmlxdWUgaGlzdG9yeSBvZiBwcm9kdWN0aW9uIGFuZCB0cmFuc21pc3Npbm93b24uIDwvcD5cbiAgPHA+QVIgYXBwbGljYXRpb25zIGFyZSBub3QgcGVyZmVjdCByZXByb2R1Y3RpdmUgdGVjaG5vbG9naWVzLCBhcyBzb21lIGRyYXcgb24gdGhlIHBoeXNpY2FsIGFuZCBjdWx0dXJhbCB1bmlxdWVzbmVzcywgPGVtPnRoZSBoZXJlIGFuZCBub3c8L2VtPiBvZiBwYXJ0aWN1bGFyIHBsYWNlcyA8L3A+XG4gIDwvZGl2PiBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAvLyAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8VGl0bGUgbXNnPVwiQ3liZXJzaWNrbmVzcyBhbmQgdGhlIG5lZ2F0dGlvbiBvZiBwcmVzZW5jZVwiIC8+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5cbiAgPGJyPjxicj5cbiAgIFRoZSB0ZXJtIGN5YmVyc2lja25lc3MsIG9yIHZpc3VhbGx5IGluZHVjZWQgbW90aW9uIHNpY2tuZXNzLCBoYXMgYmVlbiBjb2luZWQgdG8gZGVzY3JpYmUgc3ltcHRvbXMgaW5jbHVkaW5nIGhlYWRhY2hlLCBuYXVzZWEsIGV5ZSBzdHJhaW4sIGRpenppbmVzcywgZmF0aWd1ZSwgb3IgZXZlbiB2b21pdGluZyB0aGF0IG1heSBvY2N1ciBkdXJpbmcgb3IgYWZ0ZXIgZXhwb3N1cmUgdG8gYSB2aXJ0dWFsIGVudmlyb25tZW50LiBDeWJlcnNpY2tuZXNzIGlzIHZpc2NlcmFsIGV2aWRlbmNlIHRoYXQgVlIgaXMgbm90IHRoZSBtZWRpdW0gdG8gZW5kIGFsbCBtZWRpYS4gQ3liZXJzaWNrbmVzcyByZW1pbmRzIHRoZSBzdXNjZXB0aWJsZSB1c2VyIG9mIHRoZSBtZWRpdW0gaW4gYSBwb3dlcmZ1bCB3YXkuIE5hdXNlYSByZXBsYWNlcyBhc3RvbmlzaG1lbnQuICBcbiAgPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgLy8gICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDxUaXRsZSBtc2c9XCJQcmVzZW5jZSBhbmQgRW1wYXRoeVwiIC8+XG4gIDxici8+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5SZXNlYXJjaGVycyBoYXZlIGxvbmcgcHVyc3VlZCB0aGUgaWRlYSBvZiBlbW90aW9uYWwgcmVhY3Rpb25zIHN1Y2ggYXMgZW1wYXRoeSBhcyBhIHRlc3Qgb2YgcHJlc2VuY2UuIFxuIFZSIGlzICB1bmRlcnN0b29kIGFzIGdldHRpbmcgdXMgY2xvc2VyIHRvIHRoZSBhdXRoZW50aWMgb3IgdGhlIHJlYWwuIEJ1dCBmb3JnZXR0aW5nIHRoZSBtZWRpdW0gaXMgbm90IG5lY2Vzc2FyeSBmb3IgYSBzZW5zZSBvZiBwcmVzZW5jZS4gUHJlc2VuY2UgY2FuIGJlIHVuZGVyc3Rvb2QgaW4gYSBtb3JlIG51YW5jZWQgd2F5IGFzIGEgbGltaW5hbCB6b25lIGJldHdlZW4gZm9yZ2V0dGluZyBhbmQgYWNrbm93bGVkZ2luZyBWUiBhcyBhIG1lZGl1bS5cbjwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDwhLS0gPFRpdGxlIG1zZz1cIlByZXNlbmNlIGFuZCBFbXBhdGh5XCIgLz4gLS0+XG4gIDxkaXYgY2xhc3M9XCJoZWFkbGluZVwiPlByZXNlbmNlIGFuZCBFbXBhdGh5PC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgLy8gICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzQ2ZDc3OTNmYTdhYjI0YWQucG5nXCIiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvYmViNjE4ZmZlMzc2OWJiNi5wbmdcIiIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC8xZTRiZGUzMTIzMjUxOTVmLnBuZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgPCEtLSA8VGl0bGUgbXNnPVwiUGl0IEV4cGVyaW1lbnRcIiAvPiAtLT5cbiAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1Jvb202L3JpZ2h0YXJyb3cucG5nXCIgd2lkdGg9XCI5MFwiIHN0eWxlPVwiZmxvYXQ6IHJpZ2h0XCI+XG5cdDxkaXYgY2xhc3M9XCJwb3N0ZXJ0aXRsZVwiPlByZXNlbmNlIGFuZCBFbXBhdGh5PC9kaXY+XG4gIDxiciAvPlxuICAgIDxiciAvPlxuICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTYvdXBhcnJvdy5wbmdcIiB3aWR0aD1cIjkwXCIgc3R5bGU9XCJmbG9hdDogcmlnaHRcIj5cblx0PGRpdiBjbGFzcz1cInBvc3RlcnRpdGxlXCI+TWVhc3VyaW5nIFByZXNlbmNlPC9kaXY+XG4gICAgPGJyIC8+XG4gICAgICA8YnIgLz5cbiAgICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTYvdXJhcnJvdy5wbmdcIiB3aWR0aD1cIjEyMFwiICBzdHlsZT1cImZsb2F0OiByaWdodFwiPlxuXHQ8ZGl2IGNsYXNzPVwicG9zdGVydGl0bGVcIj5BdXJhPC9kaXY+XG4gICBcblxuXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgIC8vICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzQ5MDU3NTczNzQ5MjMyNTkucG5nXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTYvbGZhcnJvdy5wbmdcIiB3aWR0aD1cIjIwXCIgc3R5bGU9XCJmbG9hdDogbGVmdDsgbWFyZ2luOiAxMHB4XCI+XG4gIDxUaXRsZSBtc2c9XCJVbHRpbWF0ZSBFbXBhdGh5IE1hY2hpbmVcIiAvPlxuICA8YnI+PGJyPlxuICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+MzYwPHNwYW4+JiMxNzY7PC9zcGFuPiBmaWxtIENsb3VkcyBPdmVyIFNpZHJhIGNyZWF0ZWQgYnkgQ2hyaXMgTWlsayBhbmQgR2FibyBBcm9yYSBzaG93cyB0aGUgbGlmZSBvZiBTeXJpYW4gcmVmdWdlZXMgaW4gWmEnYXRhcmkgY2FtcCBpbiBKb3JkYW4uIFRoZSBjYW1lcmEgZm9sbG93cyAxMi15ZWFyIG9sZCBTaWRyYSBpbiBoZXIgZXZlcnlkYXkgbGlmZSwgYWxsb3dpbmcgdGhlIHVzZXJzIHRvIGJlIHByZXNlbnQgd2l0aCBTaWRyYS4gPC9kaXY+XG4gIDxiciAvPlxuICA8YmxvY2txdW90ZSBjbGFzcz1cInNxdWFyZW9mZlwiPlwiV2hlbiB5b3XigJlyZSBpbnNpZGUgb2YgdGhlIGhlYWRzZXQgLiAuIC4geW91IHNlZSBmdWxsIDM2MCBkZWdyZWVzLCBpbiBhbGwgZGlyZWN0aW9ucy4gQW5kIHdoZW4geW914oCZcmUgc2l0dGluZyB0aGVyZSBpbiBoZXIgcm9vbSwgd2F0Y2hpbmcgaGVyLCB5b3UncmUgbm90IHdhdGNoaW5nIGl0IHRocm91Z2ggYSB0ZWxldmlzaW9uIHNjcmVlbiwgeW914oCZcmUgbm90IHdhdGNoaW5nIGl0IHRocm91Z2ggYSB3aW5kb3csIHlvdeKAmXJlIHNpdHRpbmcgdGhlcmUgd2l0aCBoZXIuIFdoZW4geW91IGxvb2sgZG93biwgeW91J3JlIHNpdHRpbmcgb24gdGhlIHNhbWUgZ3JvdW5kIHRoYXQgc2hl4oCZcyBzaXR0aW5nIG9uLiBBbmQgYmVjYXVzZSBvZiB0aGF0LCB5b3UgZmVlbCBoZXIgaHVtYW5pdHkgaW4gYSBkZWVwZXIgd2F5LiBZb3UgZW1wYXRoaXplIHdpdGggaGVyIGluIGEgZGVlcGVyIHdheS4gKE1pbGsgMjAxNSlcIjwvYmxvY2txdW90ZT5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgIC8vICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvYjQ2NGRiZTkwZDYxMzNhYi5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1Jvb202L2Nsb3Vkb3ZlcnNpZHJhLmpwZ1wiIHN0eWxlPVwid2lkdGg6MTAwJVwiPlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgIC8vICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gICAgPCEtLSA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTYvcnRhcnJvdy5wbmdcIiB3aWR0aD1cIjQwMFwiID4gLS0+XG4gIDxUaXRsZSBtc2c9XCJUaGUgZnV0dXJlIG9mIG5ld3M/XCIgLz5cbiAgPGJyPlxuICA8YnI+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5Ob25uaWUgZGUgbGEgUGXDsWEncyA8YSBocmVmPVwiaHR0cHM6Ly9lbWJlZC50ZWQuY29tL3RhbGtzL25vbm55X2RlX2xhX3BlbmFfdGhlX2Z1dHVyZV9vZl9uZXdzX3ZpcnR1YWxfcmVhbGl0eVwiIHRhcmdldD1cIl9ibGFua1wiPlRlZCBUYWxrPC9hPiBjYWxsZWQgJ1RoZSBmdXR1cmUgb2YgbmV3cz8nJyAgaW50cm9kdWNlcyBhIG5ldyBmb3JtIG9mIGpvdXJuYWxpc20gd2hlcmUgVmlydHVhbCBSZWFsaXR5IHRlY2hub2xvZ3kgaXMgdXNlZCB0byBwdXQgYXVkaWVuY2UgaW5zaWRlIHRoZSBzdG9yaWVzLiBJbiBoZXIgd29yaywgc2hlIGNyZWF0ZWQgVlIgc3RvcmllcyBhYm91dCBpbXByaXNvbm1lbnQgaW4gR3VhbnRhbmFtbyBhbmQgaHVuZ2VyIGluIExvcyBBbmdlbGVzIHRvIGluZHVjZSBlbXBhdGh5IGluIHRoZSBhdWRpZW5jZS48L2Rpdj4gXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC9iMzkzM2ZmMzU5Zjk0OWJhLnBuZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTYvbm9ubmllLnBuZ1wiIHN0eWxlPVwid2lkdGg6MTAwJVwiID5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAvLyAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICAgIDxUaXRsZSBtc2c9XCJQaXQgRXhwZXJpbWVudFwiIC8+XG4gICAgPGJyPjxicj5cbiAgXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+VGhlIHBpdCBleHBlcmltZW50IGlzIGEgdmlydHVhbCBleHBlcmllbWVudCBvZnRlbiB1c2VkIHRvIGV2YWx1YXRlIHRoZSBzZW5jZSBvZiBwcmVzZW5jZS4gVGhlIHVzZXIgaXMgZ2l2ZW4gYSB0YXNrIHRvIGdyYWIgYW4gb2JqZWN0IG9uIHBsYW5rIGFuZCB0YWtlIGl0IHRvIHRoZSBvdGhlciBzaWRlLCBjcm9zc2luZyB0aGUgcGl0LiA8L2Rpdj5cblxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC8yMTc2ZGM2NmY1YTAyNTQ2LnBuZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1Jvb202L3BpdFZSLnBuZ1wiIHdpZHRoPVwiNDM2XCIgPlxuICA8IS0tIDxUaXRsZSBtc2c9XCJQaXQgRXhwZXJpbWVudFwiIC8+IC0tPlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDwhLS0gPFRpdGxlIG1zZz1cIlByZXNlbmNlXCIgLz4gLS0+XG4gIDxkaXYgY2xhc3M9XCJwb3N0ZXJ0aXRsZVwiPlByZXNlbmNlPC9kaXY+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5QcmVzZW5jZSBpcyBhIGtpbmQgb2YgYWJzZW5jZSwgdGhlIGFic2VuY2Ugb2YgbWVkaWF0aW9uLiBJZiB0aGUgdXNlcnMgY2FuIGZvcmdldCB0aGF0IHRoZSBtZWRpdW0gaXMgdGhlcmUsIHRoZW4gdGhleSBmZWVsIHByZXNlbmNlLiA8L2Rpdj5cbiAgXHQ8IS0tIDxkaXYgY2xhc3M9XCJwb3N0ZXJ0aXRsZVwiPlByZXNlbmNlIGlzIGEga2luZCBvZiBhYnNlbmNlLCB0aGUgYWJzZW5jZSBvZiBtZWRpYXRpb24uIElmIHRoZSB1c2VycyBjYW4gZm9yZ2V0IHRoYXQgdGhlIG1lZGl1bSBpcyB0aGVyZSwgdGhlbiB0aGV5IGZlZWwgcHJlc2VuY2UuIDwvZGl2PiAtLT5cbiAgICBcdDwhLS0gPGRpdiBjbGFzcz1cImhlYWRsaW5lXCI+UHJlc2VuY2UgaXMgdGhlIGFic2VuY2Ugb2YgbWVkaWF0aW9uLiBJZiB0aGUgdXNlcnMgY2FuIGZvcmdldCB0aGF0IHRoZSBtZWRpdW0gaXMgdGhlcmUsIHRoZW4gdGhleSBmZWVsIHByZXNlbmNlLiA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5QcmVzZW5jZSBpcyBhIGtpbmQgb2YgYWJzZW5jZSwgdGhlIGFic2VuY2Ugb2YgbWVkaWF0aW9uLiBJZiB0aGUgdXNlcnMgY2FuIGZvcmdldCB0aGF0IHRoZSBtZWRpdW0gaXMgdGhlcmUsIHRoZW4gdGhleSBmZWVsIHByZXNlbmNlLiA8L2Rpdj4gLS0+XG4gICAgICA8YnIgLz5cbiAgICAgIDxiciAvPlxuICAgICAgXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCIgc3R5bGU9XCJmb250LXN0eWxlOml0YWxpY1wiPlwiVlIgYW5kIEFSIGNhbm5vdCBkZWNlaXZlIHRoZWlyIHVzZXJzIGludG8gYmVsaWV2aW5nIHRoYXQgdGhleSBhcmUgaGF2aW5nIGEgbm9uLW1lZGlhdGVkIGV4cGVyaWVuY2UuIEJ1dCB0aGF0IGlzIG5vdCBuZWNlc3NhcnkgZm9yIGEgc2Vuc2Ugb2YgcHJlc2VuY2UuXCI8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG4gIFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgPFRpdGxlIG1zZz1cIlRyZWVodWdnZXI6IFdhd29uYVwiIC8+XG4gIDxicj48YnI+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5UcmVlaHVnZ2VyOiBXYXdvbmEgVlIgZXhwZXJpZW5jZSB0cmFuc3BvcnRzIHRoZSB1c2VycyB0byB0aGUgcmVkIGdpYW50IFNlcXVvaWEgdHJlZXMgZnJvbSB0aGUgU2VxdW9pYSBOYXRpb25hbCBQYXJrLiBJdCBwcm92aWRlcyBhIHNlbnNlIG9mIGludGltYWN5IHdpdGggdGhlIHRyZWUgLSB3aXRoIGl0cyBiYXJrLCB3aXRoIHRoZSBjZWxscyB0aGF0IG1ha2UgdXAgaXRzIGJlaW5nLiBUaGUgdml2aWRuZXNzIG9mIHRoZSB3b3JrIGlsbHVzdHJhdGVzIDxlbT5wcmVzZW5jZTwvZW0+LiA8L2Rpdj5cbiAgPCEtLSBJbiB0aGlzIGV4cGVyaWVuY2UsIHVzZXJzIGZpbmQgdGhlbXNlbHZlcyBvbiB0aGUgdGhyZXNob2xkIG9mIGZvcmdldHRpbmcgdGhhdCB3ZSBhcmUgaGF2aW5nIGEgVlIgZXhwZXJpZW5jZS4gQmVpbmcgb24gdGhhdCB0aHJlc2hvbGQgaXMgYSBzZW5jZSBvZiBwcmVzZW5jZSBpbiBhIHJlYWxpdHkgbWVkaXVtLiAtLT5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvMjczZGVjNDdlYzc2MjMwZC5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1Jvb202L3RyZWVodWdnZXIucG5nXCIgc3R5bGU9XCJ3aWR0aDo0NTBweFwiID5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgIC8vIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8VGl0bGUgbXNnPVwiQmFjayB0byB0aGUgbWFpbiBleGhpYml0aW9uXCIgLz5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgIC8vIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8IS0tIDxUaXRsZSBtc2c9XCJUaGUgZnV0dXJlIG9mIG5ld3M/XCIgLz4gLS0+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5QYXJ0aGVub24gbW9kZWwgZXhwbGFuYXRpb248L2Rpdj4gXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0L2E3ZDEyNDRjNGIyM2I3YjAuanBnXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICAgIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi90ZXJyYWNvdHRhLmpwZ1wiIHdpZHRoPVwiODAwXCIgPlxuXG4gIDwhLS0gPFRpdGxlIG1zZz1cIlRoZSBmdXR1cmUgb2YgbmV3cz9cIiAvPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+Tm9ubmllIGRlIGxhIFBlw7FhJ3MgPGEgaHJlZj1cImh0dHBzOi8vZW1iZWQudGVkLmNvbS90YWxrcy9ub25ueV9kZV9sYV9wZW5hX3RoZV9mdXR1cmVfb2ZfbmV3c192aXJ0dWFsX3JlYWxpdHlcIiB0YXJnZXQ9XCJfYmxhbmtcIj5UZWQgVGFsazwvYT4gY2FsbGVkICdUaGUgZnV0dXJlIG9mIG5ld3M/JycgIGludHJvZHVjZXMgYSBuZXcgZm9ybSBvZiBqb3VybmFsaXNtIHdoZXJlIFZpcnR1YWwgUmVhbGl0eSB0ZWNobm9sb2d5IGlzIHVzZWQgdG8gcHV0IGF1ZGllbmNlIGluc2lkZSB0aGUgc3Rvcmllcy4gSW4gaGVyIHdvcmssIHNoZSBjcmVhdGVkIFZSIHN0b3JpZXMgYWJvdXQgaW1wcmlzb25tZW50IGluIEd1YW50YW5hbW8gYW5kIGh1bmdlciBpbiBMb3MgQW5nZWxlcyB0byBpbmR1Y2UgZW1wYXRoeSBpbiB0aGUgYXVkaWVuY2UuPC9kaXY+ICAtLT5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAvLyAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8VGl0bGUgbXNnPVwiVGVycmFjb3R0YSBXYXJyaW9ycyBBUlwiIC8+XG4gIDxicj48YnI+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5cIlRoZSBGcmFua2xpbiBJbnN0aXR1dGUgaXMgdXNpbmcgQVIgdG8gZW5oYW5jZSB0aGVpciBUZXJyYWNvdHRhIFdhcnJpb3IgZXhoaWJpdGlvbiB3aGljaCB3ZXJlIGRpc3BsYXllZCBpbiBQaGlsYWRlbHBoaWEgdW50aWwgTWFyY2ggMjAxOC4gVGhlIG11c2V1beKAmXMgYXBwLCBwb3dlcmVkIGJ5IFdpa2l0dWRlIHRlY2hub2xvZ3ksIGFsbG93cyB2aXNpdG9ycyB0byB1c2UgdGhlaXIgc21hcnRwaG9uZSB0byBzY2FuIGl0ZW1zIGFuZCB2aXN1YWxpemUgcmljaCBBUiBjb250ZW50IHRvIGxlYXJuIGV2ZW4gbW9yZSBhYm91dCB0aGUgaW50cmlndWluZyBoaXN0b3J5IGJlaGluZCB0aGUgbWFnbmlmaWNlbnQgY2xheSBzb2xkaWVycy5cIjwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC9iMmM3NzAwOTY0NGE3ZDQ1LmpwZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTYvdHJlZWh1Z2dlcjIuanBnXCIgd2lkdGg9XCI2MDBcIiA+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgLy8gICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8VGl0bGUgbXNnPVwiUGl0IEV4cGVyaW1lbnRcIiAvPlxuICA8YnI+XG4gIDxicj5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPk1lYXN1cmluZyB0aGUgYW1vdW50IG9mIHByZXNlbmNlIG9yIHRoZSBzZW5zZSBvZiBiZWluZyB0aGVyZSwgaXMgb25lIG9mIHRoZSBmZXcgd2F5cyB0byBhc3Nlc3MgdGhlIHF1YWxpdHkgb2YgYSB2aXJ0dWFsIHNwYWNlLiBUaGlzIHZpcnR1YWwgcGl0IGV4cGVyaW1lbnQgaXMgYSBzcGFjZSB0aGF0IG1lYXN1cmVzIHRoZSBwcmVzZW5jZSBieSBtZWFzdXJpbmcgY2hhbmdlcyBpbiBwaHlzaW9sb2dpY2FsIHJlYWN0aW9ucyBpbiB1c2VycyBzdWNoIGFzIGNoYW5nZXMgaW4gaGVhcnQgcmF0ZS4gSW4gdGhpcyB2aXJ0dWFsIHJvb20sIGZlZWwgd2hldGhlciB5b3VyIGhlYXJ0IGlzIGJlYXRpbmcgZmFzdGVyIG9yIHlvdXIgaGFuZHMgZ2V0IHN3ZWF0eSBhcyBpZiB5b3UgYXJlIGluIGEgcmVhbCBzcGFjZS4gIFxuICAgIDxicj5cbiAgICA8YnI+XG4gICAgPGJyPlxuICBNZWVoYW4sIE0uLCBJbnNrbywgQi4sIFdoaXR0b24sIE0uLCAmIEJyb29rcyBKciwgRi4gUC4gKDIwMDIpLiBQaHlzaW9sb2dpY2FsIG1lYXN1cmVzIG9mIHByZXNlbmNlIGluIHN0cmVzc2Z1bCB2aXJ0dWFsIGVudmlyb25tZW50cy4gQWNtIHRyYW5zYWN0aW9ucyBvbiBncmFwaGljcyAodG9nKSwgMjEoMyksIDY0NS02NTIuIFxuICA8YnI+XG4gIDxicj5cbiAgPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDxUaXRsZSBtc2c9XCJJbnN0cnVjdGlvbnNcIiAvPlxuICA8YnI+XG4gIDxicj5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPjEuIFBpY2sgdXAgYSB2aXJ0dWFsIGJvb2sgaW4gdGhpcyByb29tIGFuZCBwbGFjZSBpdCBpbiB0aGUgZGVzaWduYXRlZCBhcmVhIG9uIHRoZSBmYXIgc2lkZSBvZiB0aGUgUGl0IHJvb20uXG4gIDxicj5cbiAgPGJyPlxuMi4gUGljayB1cCBhIGJsdWUgYmFsbCBhbmQgZHJvcCBpdCBvbiBhIGJsdWUgdGFyZ2V0IG9uIHRoZSBmbG9vciBvZiB0aGUgUGl0IHJvb20uXG48YnI+XG48YnI+XG48YnI+XG48YnI+XG5IZWFkLU1vdW50ZWQgRGlzcGxheSBkZXZpY2VzIHN1Y2ggYXMgT2N1bHVzIGFyZSByZWNvbW1lbmRlZCBmb3IgdGhpcyBleHBlcmltZW50LiA8L2Rpdj5cbjxicj5cbjxicj5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgPFRpdGxlIG1zZz1cIlZlcnkgY2FyZWZ1bGx5IHN0cmV0Y2ggeW91ciBhcm1zIG91dCBmb3IgYmFsYW5jZS5cIiAvPlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8VGl0bGUgbXNnPVwiRG9lcyB0aGlzIGV4cGVyaW1lbnQgbWFrZSB5b3Ugc3dlYXQgb3IgeW91ciBoZWFydCBiZWF0IGZhc3Rlcj9cIiAvPlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8VGl0bGUgbXNnPVwiUHJlc2VuY2UgR2FsbGVyeVwiIC8+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG4gIDwvZGl2PlxuICBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuPFRpdGxlIG1zZz1cIldlbGNvbWUgdG8gUmVhbGl0eSBNZWRpYSFcIiAvPlxuPGJyPjxicj5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPiA8aT5SZWFsaXR5IE1lZGlhPC9pPiBpcyBhIHByb2plY3QgZW5jb21wYXNzaW5nIHRocmVlIHdyaXRpbmcgc3BhY2VzLCB0aHJlZSB0ZWNobm9sb2dpZXMgZm9yIHJlcHJlc2VudGluZyBpZGVhczogcHJpbnQsIHRoZSB3ZWIsIGFuZCBpbW1lcnNpdmUgVlIuIFRoZSBwcmludGVkIHBhZ2UgaXMgYSB3cml0aW5nIHNwYWNlIHdpdGggYSB0cmFkaXRpb24gZGF0aW5nIGJhY2sgdG8gdGhlIGZpZnRlZW50aCBjZW50dXJ5IChpbiBFdXJvcGUsIG11Y2ggZWFybGllciBpbiBDaGluYSkuIE9idmlvdXNseSB0aGUgd2ViIGhhcyBhIGZhciBzaG9ydGVyIHRyYWRpdGlvbiwgYmVnaW5uaW5nIGFyb3VuZCAxOTkwLiBCdXQgaW4gdGhlIHRoaXJ0eSB5ZWFyIHNpbmNlIFRpbSBCZXJuZXJzLUxlZSBsYXVuY2hlZCB0aGUgZmlyc3Qgd2ViIHNlcnZlciwgdGhlIHdlYiBoYXMgZ3Jvd24gdG8gcml2YWwgcHJpbnQgZm9yIG1hbnkga2luZHMgb2YgY29tbXVuaWNhdGlvbi4gVGhlIHRlY2hub2xvZ2llcyBmb3IgY3JlYXRpbmcgM0QgZ3JhcGhpYyBzcGFjZXMgaW4gVlIgKGFuZCBBUikgYWN0dWFsbHkgcHJlZGF0ZSB0aGUgd2ViLiBCdXQgb25seSBpbiB0aGUgcGFzdCAxMCB5ZWFycyBoYXZlIEFSIGFuZCBWUiBiZWNvbWUgd2lkZWx5IGF2YWlsYWJsZSBtZWRpYS4gVGhlIGdvYWwgb2YgUmVhbGl0eU1lZGlhIGlzIHRvIGRlbW9uc3RyYXRlIHRoZSBwb3RlbnRpYWwgcmFuZ2Ugb2YgQVIgYW5kIFZSIGFzIGNvbW11bmljYXRpdmUgZm9ybXMuXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzdhMjRhNmQzMDlkNDUzZjIuanBnXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8VGl0bGUgbXNnPVwiUmVhbGl0eSBNZWRpYVwiIC8+XG4gIDxiciAvPlxuICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvT25ib2FyZGluZy9yZWFsaXR5TWVkaWFCb29rLmpwZ1wiIHdpZHRoPVwiMjgwXCIgc3R5bGU9XCJmbG9hdDpsZWZ0OyBtYXJnaW4tcmlnaHQ6MjBweFwiPlxuXG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj48ZGl2IHN0eWxlPVwibWFyZ2luLWxlZnQ6MzBweFwiPlB1Ymxpc2hlZCBieSA8YSBocmVmPVwiaHR0cHM6Ly9taXRwcmVzcy5taXQuZWR1L2Jvb2tzL3JlYWxpdHktbWVkaWFcIj5NSVQgUHJlc3M8L2E+PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJvYmxpcXVlXCI+QnkgSmF5IERhdmlkIEJvbHRlciwgTWFyaWEgRW5nYmVyZyBhbmQgQmxhaXIgTWFjSW50eXJlPC9kaXY+IFxuICA8YnI+XG4gIDxkaXYgY2xhc3M9XCJxdW90ZVwiPkhvdyBhdWdtZW50ZWQgcmVhbGl0eSBhbmQgdmlydHVhbCByZWFsaXR5IGFyZSB0YWtpbmcgdGhlaXIgcGxhY2VzIGluIGNvbnRlbXBvcmFyeSBtZWRpYSBjdWx0dXJlIGFsb25nc2lkZSBmaWxtIGFuZCB0ZWxldmlzaW9uLjwvZGl2PjwvZGl2PlxuXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPFRpdGxlIG1zZz1cIkJvb2s6IFJlYWxpdHkgTWVkaWFcIiAvPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCIgc3R5bGU9XCJ3aWR0aDozODBweFwiPlB1Ymxpc2hlZCBieSA8YSBocmVmPVwiaHR0cHM6Ly9taXRwcmVzcy5taXQuZWR1L2Jvb2tzL3JlYWxpdHktbWVkaWFcIj5NSVQgUHJlc3M8L2E+PC9kaXY+XG4gIDxicj5cbiAgPGRpdiBjbGFzcz1cIm9ibGlxdWUgc3F1YXJlb2ZmXCI+QnkgSmF5IERhdmlkIEJvbHRlciwgTWFyaWEgRW5nYmVyZyBhbmQgQmxhaXIgTWFjSW50eXJlPC9kaXY+IFxuICA8YnI+XG4gIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmYgcXVvdGVcIj5cIkhvdyBhdWdtZW50ZWQgcmVhbGl0eSBhbmQgdmlydHVhbCByZWFsaXR5IGFyZSB0YWtpbmcgdGhlaXIgcGxhY2VzIGluIGNvbnRlbXBvcmFyeSBtZWRpYSBjdWx0dXJlIGFsb25nc2lkZSBmaWxtIGFuZCB0ZWxldmlzaW9uLlwiIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCw0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC81YjE0ZGE5NmUyODg5ZmYyLmpwZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL09uYm9hcmRpbmcvTW96aWxsYUh1YnMuanBnXCIgd2lkdGg9XCI0MDBcIiA+XG4gIDxicj48YnI+XG4gIDxUaXRsZSBtc2c9XCJUaGUgSHVicyBQbGF0Zm9ybVwiIC8+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj4qUmVhbGl0eW1lZGlhKiBpcyBidWlsdCBvbiB0b3Agb2YgTW96aWxsYSdzIG9wZW4tc291cmNlIHBsYXRmb3JtLiBBbiBleHRlbnNpdmUgZ3VpZGUgdG8gdXNpbmcgTW96aWxsYSBIdWJzIGlzIGF2YWlsYWJsZSBhdCA8YSBocmVmPVwiaHR0cHM6Ly9odWJzLm1vemlsbGEuY29tL2RvY3MvaW50cm8taHVicy5odG1sXCIgdGFyZ2V0PVwiYmxhbmtcIj5pbiB0aGUgSHVicyB1c2VyIGRvY3VtZW50YXRpb248L2E+LiBIZXJlIGFyZSB0aGUgaGlnaGxpZ2h0czpcbiAgPGJyPjxicj5cbkJlZm9yZSBlbnRlcmluZywgeW91IGFyZSBpbiB0aGUgcm9vbSdzIGxvYmJ5LiBGcm9tIGhlcmUsIHlvdSBjYW4gc2VlIGFuZCBoZWFyIHdoYXQncyBnb2luZyBvbiBpbnNpZGUgdGhlIHJvb20sIGJ1dCB5b3UgY2FuIG9ubHkgaW50ZXJhY3Qgd2l0aCBvdGhlcnMgdXNpbmcgdGV4dCBjaGF0LiBcbjxicj48YnI+XG48L2Rpdj4gXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlxuICAgICAgPGJyPlxuICAgICAgPGJyPlxuICAgICAgPGJyPlxuPGRpdiBjbGFzcz1cImtleVBvaW50XCI+VG8gZW50ZXIgdGhlIHJvb206PC9kaXY+XG48YnI+XG4tIE9uIGEgZGVza3RvcCBvciBtb2JpbGUgZGV2aWNlLCBmb2xsb3cgdGhlIHByb21wdHMgdG8gc2VsZWN0IGEgbmFtZS9hdmF0YXIgYW5kIGVuYWJsZSB0aGUgbWljLlxuPGJyPlxuLSBPbiBhIFZSIGhlYWRzZXQsIGlmIHlvdSBvcGVuZWQgdGhlIFVSTCBvbiB5b3VyIGRlc2t0b3Agb3Igc21hcnRwaG9uZSwgY2hvb3NlIFwiRW50ZXIgb24gU3RhbmRhbG9uZSBWUlwiIHRvIGNyZWF0ZSBhIGNvZGUgdGhhdCBtYWtlcyBpdCBlYXN5IHRvIG9wZW4gb24geW91ciBzdGFuZGFsb25lIGhlYWRzZXQuIE9wZW4gdGhlIGJyb3dzZXIgaW4geW91ciBWUiBoZWFkc2V0LCBuYXZpZ2F0ZSB0byBodWJzLmxpbmsgYW5kIGVudGVyIHRoZSBjb2RlLlxuPGJyPjxicj5cbjxkaXYgY2xhc3M9XCJrZXlQb2ludFwiPlRvIG5hdmlnYXRlIGluIEh1YnM6PC9kaXY+ICBcbjxicj5cbi0gT24gZGVza3RvcCB1c2UgeW91ciBXQVNEIG9yIGFycm93IGtleXMgdG8gbW92ZSBhcm91bmQuIFlvdSBjYW4gYWxzbyBwcmVzcyB5b3VyIHJpZ2h0IG1vdXNlIGJ1dHRvbiB0byB0ZWxlcG9ydCB0byBhIGRpZmZlcmVudCBsb2NhdGlvbi4gUm90YXRlIHlvdXIgdmlldyB1c2luZyB0aGUgUSBhbmQgRSBrZXlzLCBvciBob2xkIGRvd24geW91ciBsZWZ0IG1vdXNlIGJ1dHRvbiBhbmQgZHJhZy5cbjxicj5cbi0gRm9yIFZSIGFuZCBtb2JpbGUgY29udHJvbHMsIHNlZSB0aGUgbGlzdCBvZiA8YSBocmVmPVwiaHR0cHM6Ly9odWJzLm1vemlsbGEuY29tL2RvY3MvaHVicy1jb250cm9scy5odG1sXCIgdGFyZ2V0PVwiYmxhbmtcIj5IdWJzIGNvbnRyb2xzLjwvYT5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cblxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC81ZDQyYmM2YjJhMDc0Y2NkLnBuZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cblxuPFRpdGxlIG1zZz1cIkZlYXR1cmVzIGluIEh1YnNcIiAvPlxuPGJyPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+IFRoZSBmaWd1cmUgYmVsb3cgaW5kaWNhdGVzIGhvdyB0byBtdXRlIHlvdXIgbWljcm9waG9uZSwgdGFrZSBwaG90b3MsIHNoYXJlIHlvdXIgc2NyZWVuLCBjcmVhdGUgbWVkaWEgb2JqZWN0cywgYW5kIHNvIG9uOiA8L2Rpdj4gXG4gICAgPGJyPjxicj5cbiAgICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvT25ib2FyZGluZy9odWJzLXVzZXItaW50ZXJmYWNlLnBuZ1wiIHdpZHRoPVwiNDAwXCIgPlxuXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuXG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCw0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG48VGl0bGUgbXNnPVwiU3RhbmRpbmcgb24gdGhlIEF1ZGlvIFBhZHMgd2lsbCBzdGFydCB0aGUgbmFycmF0aW9uIGFib3V0IHRoZSByb29tIG9yIHRoZSBzb3VuZCBvZiB0aGUgdmlkZW8gY2xpcC5cIiAvPlxuXG48YnI+PGJyPlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC84MmE5MTFkMjg5Y2QyODM2LnBuZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbjxUaXRsZSBtc2c9XCJPdGhlciB3YXlzIHRvIHVzZSB0aGUgcm9vbVwiIC8+XG48YnI+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5cbiAgICA8ZGl2IGNsYXNzPVwia2V5UG9pbnRcIj5WaXNpdCB0aGUgZXhoaWJpdCB3aXRoIGZyaWVuZHM8L2Rpdj5cbiAgICBTaGFyaW5nIHRoZSBVUkwgb2YgdGhlIHJvb20geW91IGFyZSBjdXJyZW50bHkgaW4gd2lsbCBhbGxvdyBvdGhlcnMgdG8gam9pbiB5b3VyIGV4cGVyaWVuY2UuXG4gICAgPGJyIC8+XG4gICAgPGJyIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwia2V5UG9pbnRcIj5GYXZvcml0ZSB5b3VyIHJvb208L2Rpdj5cbiAgICAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL09uYm9hcmRpbmcvZmF2b3JpdGUucG5nXCIgd2lkdGg9XCI0MDBcIiA+XG4gICAgICA8YnIgLz5cbiAgIFNldCB5b3VyIHJvb20gYXMgYSBmYXZvcml0ZSB1bmRlciB0aGUgJ21vcmUnIG1lbnUuIFRoZW4sIHlvdSBjYW4gZWFzaWx5IHJldmlzaXQgdGhlIHJvb20gZnJvbSB0aGUgbGlzdCBpbiB0aGUgJ2Zhdm9yaXRlIHJvb21zJy5cbiAgPC9kaXY+IFxuICBcbiAgICBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgICAvL3RoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCw0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC8wMTNiNzU0YWY5ZWJjZDMyLnBuZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbjxicj5cbjxkaXYgY2xhc3M9XCJrZXlQb2ludFwiPkhlcmUgaXMgYSBtYXAsIHdoaWNoIHlvdSB3aWxsIGFsc28gZmluZCBwb3N0ZWQgdGhyb3VnaCB0aGUgZ2FsbGVyaWVzPC9kaXY+XG48YnIgLz5cbiAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL09uYm9hcmRpbmcvTWFwX3RyYW5zcGFyZW50LnBuZ1wiIHdpZHRoPVwiNDAwXCI+XG5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgICAvL3RoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCw0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5cbjxicj48YnI+PGJyPjxicj48YnI+XG5FYWNoIGdhbGxlcnkgaW4gdGhpcyDigJxpbW1lcnNpdmUgYm9va+KAnSBjb3JyZXNwb25kcyB0byBvbmUgb3IgbW9yZSBjaGFwdGVycyBpbiB0aGUgcHJpbnRlZCBib29rIGFuZCBpbGx1c3RyYXRlcyB0aGUgdGhlbWVzIG9mIHRoZSBwcmludGVkIGNoYXB0ZXIocykuIChTZWUgdGhlIG1hcCBvbiB0aGUgZmFyIHdhbGwgZm9yIHRoZSBuYW1lcy90aGVtZXMgb2YgdGhlIGdhbGxlcmllcy4pIEZvciBleGFtcGxlLCB0aGUgZ2FsbGVyeSBlbnRpdGxlZCDigJxQcmVzZW5jZeKAnSBpbGx1c3RyYXRlcyBib3RoIHByZXNlbmNlIGFuZCB0aGUgcmVsYXRlZCBjb25jZXB0IG9mIGF1cmEgYW5kIGhvdyBjb21wdXRlciBzY2llbnRpc3RzIGFzIHdlbGwgYXMgZmlsbW1ha2VycyBhbmQgZGVzaWduZXJzIGhhdmUgdHJpZWQgdG8gZXZva2UgdGhlc2UgcmVhY3Rpb25zIGluIHZpc2l0b3JzIHRvIHRoZWlyIGltbWVyc2l2ZSBhcHBsaWNhdGlvbnMuIFxuIDwvZGl2PiBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgICAvL3RoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCw0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG48YSBocmVmPVwiaHR0cHM6Ly9yZWFsaXR5bWVkaWEuZGlnaXRhbC9cIj48VGl0bGUgbXNnPVwiQ2xpY2sgaGVyZSB0byByZXR1cm4gYmFjayB0byB0aGUgd2Vic2l0ZVwiIC8+PC9hPlxuPGlmcmFtZSBjbGFzcz1cIndlYklmcmFtZVwiIHNyYz1cImh0dHBzOi8vcmVhbGl0eW1lZGlhLmRpZ2l0YWwvXCIgdGl0bGU9XCJyZWFsaXR5bWVkaWEgd2Vic2l0ZVwiIHdpZHRoPVwiMTAyNFwiIGhlaWdodD1cIjc2OFwiIHN0eWxlPVwiLXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMC41KTstbW96LXRyYW5zZm9ybS1zY2FsZSgwLjUpO1wiPjwvaWZyYW1lPiAgXG5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgICAvL3RoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvNTZhODY4YTUzM2UxOTMxMi5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb3R1bmRhLzEtbWluZWNyYWZ0LWFyLmpwZ1wiIHdpZHRoPVwiNDAwXCI+XG5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgICAvL3RoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCw0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC9hZjU4N2ZhZDBkNjBkZjEyLmpwZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1JvdHVuZGEvMi1icnVuZWxsZXNjaGkuanBnXCIgd2lkdGg9XCI0MDBcIj5cblxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIC8vdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzQ3OGJhYzA5ZWM4NmYxZjAuanBnXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm90dW5kYS8zLXpha2ktbGl6YXJkLmpwZ1wiIHdpZHRoPVwiNDAwXCI+XG5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgICAvL3RoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCw0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC81OWJmMmM5OWY1YTIxOWM3LnBuZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1JvdHVuZGEvNS1wcm9tYWNob3MucG5nXCIgd2lkdGg9XCI0MDBcIj5cblxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIC8vdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzAyNzgwODQ4YjU4NGY1MDEuanBnXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm90dW5kYS82LWdlbnJlcy5qcGdcIiB3aWR0aD1cIjQwMFwiPlxuXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgLy90aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvNGQxMzg3MWY3YjIxNTk4Yi5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb3R1bmRhLzktcHJpdmFjeS5qcGdcIiB3aWR0aD1cIjQwMFwiPlxuXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgLy90aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvYzdlYWYwYTVkOWVhMzE2Zi5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb3R1bmRhLzEwLWZ1dHVyZS5qcGdcIiB3aWR0aD1cIjQwMFwiPlxuXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgLy90aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG48VGl0bGUgdi1iaW5kOm1zZz1cInRpdGxlXCIgLz5cbjxicj48YnI+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5TdGFuZGluZyBvbiB0aGUgQXVkaW8gUGFkcyB3aWxsIHt7IGJvZHkgfX08L2Rpdj4gXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IGluamVjdCB9IGZyb20gJ3Z1ZSdcblxuXG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG5cblxubGV0IHBhcmFtcyA9IGluamVjdChcInBhcmFtc1wiKVxudmFyIHRpdGxlID0gcGFyYW1zICYmIHBhcmFtcy5wYXJhbWV0ZXIxID8gcGFyYW1zLnBhcmFtZXRlcjEgOiBcIkhvdyB0byBVc2UgdGhlIEF1ZGlvIFBhZHNcIlxudmFyIGJvZHkgPSBwYXJhbXMgJiYgcGFyYW1zLnBhcmFtZXRlcjIgPyBwYXJhbXMucGFyYW1ldGVyMiA6IFwic3RhcnQgdGhlIG5hcnJhdGlvbnMgYWJvdXQgdGhlIHJvb20geW91IGFyZSBjdXJyZW50bHkgaW5cIlxuXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPlxuPCEtLTxUaXRsZSB2LWJpbmQ6bXNnPVwidGl0bGVcIiAvPi0tPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmIGxhYmVsVGl0bGUgXCI+e3sgdGl0bGUgfX08L2Rpdj4gXG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj57eyBib2R5IH19PC9kaXY+IFxuPGJyPlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBpbmplY3QgfSBmcm9tICd2dWUnXG5cblxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuXG5cbmxldCBwYXJhbXMgPSBpbmplY3QoXCJwYXJhbXNcIilcbnZhciB0aXRsZSA9IHBhcmFtcyAmJiBwYXJhbXMucGFyYW1ldGVyMSA/IHBhcmFtcy5wYXJhbWV0ZXIxIDogXCIgXCJcbnZhciBib2R5ID0gcGFyYW1zICYmIHBhcmFtcy5wYXJhbWV0ZXIyID8gcGFyYW1zLnBhcmFtZXRlcjIgOiBcIiBcIlxuXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCJdLCJuYW1lcyI6WyJIdWJzQXBwIiwiZXRoZXJlYWwuY3JlYXRlTGF5b3V0U3lzdGVtIiwiV2ViTGF5ZXIzRCIsIlN0b3JlIiwiSHVic0FwcFByb3RvIiwiQXBwIiwiaW5pdCJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQkFBZTs7Ozs7Ozs7O0FDV2Y7Ozs7Ozs7QUFGYztBQUtaO0FBQ0Y7QUFDQSxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0gvQjs7OztBQUxjO0FBTWQsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBQztBQUM3QixJQUFJLElBQUksR0FBRyxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxHQUFHLG1EQUFrRDs7Ozs7Ozs7Ozs7OztNQ2I5RSxNQUFNO0lBQ3ZCLGFBQWEsQ0FBZ0I7SUFDN0IsYUFBYSxDQUF5QjtJQUV0QyxLQUFLLENBQVE7SUFDYixNQUFNLENBQVE7SUFFZCxNQUFNLENBQUs7SUFDWCxPQUFPLENBQXFDO0lBRTVDLFlBQWEsR0FBYyxFQUFFLEtBQWEsRUFBRSxNQUFjLEVBQUUsZ0JBQW9CLEVBQUU7UUFDOUUsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3ZELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJ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
