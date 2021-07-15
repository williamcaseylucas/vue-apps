import { p as pushScopeId, a as popScopeId, o as openBlock, c as createBlock, b as createVNode, t as toDisplayString, u as unref, F as Fragment, i as inject, d as createApp, B as Bh, r as reactive, e as readonly, f as createTextVNode } from './vendor-a655b448.js';

var _imports_0$5 = "https://resources.realitymedia.digital/vue-apps/dist/1a6ace377133f14a.png";

pushScopeId("data-v-04cbd54a");
const _hoisted_1$i = {
  "xr-layer": "",
  class: "fade"
};
const _hoisted_2$i = /*#__PURE__*/createVNode("p", null, " Here's some more text just to make things not blank. ", -1 /* HOISTED */);
popScopeId();


var script$j = {
  props: {
  msg: String
},
  setup(__props) {



const shared = inject('shared');

return (_ctx, _cache) => {
  return (openBlock(), createBlock(Fragment, null, [
    createVNode("h1", _hoisted_1$i, toDisplayString(__props.msg), 1 /* TEXT */),
    _hoisted_2$i,
    createVNode("button", {
      "xr-layer": "",
      onClick: _cache[1] || (_cache[1] = (...args) => (unref(shared).increment && unref(shared).increment(...args)))
    }, "count is: " + toDisplayString(unref(shared).state.count), 1 /* TEXT */)
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$j.__scopeId = "data-v-04cbd54a";

pushScopeId("data-v-69f29b10");
const _hoisted_1$h = { id: "top" };
const _hoisted_2$h = /*#__PURE__*/createVNode("img", {
  alt: "Vue logo",
  src: _imports_0$5
}, null, -1 /* HOISTED */);
popScopeId();

var script$i = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$h, [
    _hoisted_2$h,
    createVNode(script$j, { msg: "Networked Vue Component with Shared Button Count" })
  ]))
}
}

};

script$i.__scopeId = "data-v-69f29b10";

class HubsApp$h {
    constructor (App, width, height, createOptions={}) {
        this.isInteractive = false;
        this.isNetworked = false;
        this.isStatic = true;
        this.width = width;
        this.height = height;
        this.size = { width: width/1000, height: height/1000};
        this.takeOwnership = this.takeOwnershipProto.bind(this);
        this.setSharedData = this.setSharedDataProto.bind(this);

        this.headDiv = document.createElement("div");
        //this.headDiv.setAttribute("style","width: 100%;height: 100%;")

        this.vueApp = createApp(App, createOptions);
    }

    mount() {
        this.vueRoot = this.vueApp.mount(this.headDiv);
        this.vueRoot.$el.setAttribute("style","width: " + this.width + "px; height: " + this.height + "px;");

        // // add a link to the shared css
        let l = document.createElement("link");
        l.setAttribute("href", "https://resources.realitymedia.digital/vue-apps/dist/hubs.css");
        l.setAttribute("rel", "stylesheet");
        l.setAttribute("crossorigin","anonymous");
        this.vueRoot.$el.insertBefore(l, this.vueRoot.$el.firstChild);

        this.webLayer3D = new Bh(this.vueRoot.$el, {
            autoRefresh: true,
            onLayerCreate: (layer) => {
                // nothing yet
            },
            onLayerPaint: (layer) => {
                if (this.isStatic) { this.needsUpdate = true; }
            },
            textureEncoding: THREE.sRGBEncoding,
            renderOrderOffset: 0  // -1000
        });

        console.log("size: ", this.size);

        if (this.isInteractive) {
            // for interaction
            this.raycaster = new THREE.Raycaster();
        }
    }

    setNetworkMethods(takeOwnership, setSharedData) {
        this.takeOwnership = takeOwnership;
        this.setSharedData = setSharedData;
    }

    // dummy functions, just to avoid errors if they get called before
    // networking is initialized, or called when networked is false
    takeOwnershipProto() {
        return true;
    }
    setSharedDataProto(object) {
        return true;
    }

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
        console.log ("div size: {" + this.size.width + ", " + this.size.height + "}");
        return this.size
    }

    // receive data updates.  should be overridden by subclasses
    getSharedData(dataObject) {
        raise("getSharedData should be overridden by subclasses");
    }
    
    // override to check for your own 3D objects that aren't webLayers
    clicked(evt) {
        if (!this.isInteractive) { return }
        
        const obj = evt.object3D;
        this.raycaster.ray.set(obj.position, 
            this.webLayer3D.getWorldDirection(new THREE.Vector3()).negate());
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

    dragEnd (evt) {
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
        if (!this.isStatic || this.needsUpdate) {
            this.webLayer3D.update(true);
        }
        this.needsUpdate = false;
    }
}

class Store {
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
    constructor () {
        super(script$i, 400, 475);

        // create our shared data object that will
        // share data between vue and hubs
        this.shared = new Store(this);
        this.vueApp.provide('shared', this.shared);

        this.isInteractive = true;
        this.isNetworked = true;
        this.isStatic = false;

        console.log (JSON.stringify(this.shared.data));
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
    return app
};

pushScopeId("data-v-1f52c881");
const _hoisted_1$g = /*#__PURE__*/createVNode("p", null, [
  /*#__PURE__*/createVNode("a", {
    href: "https://vitejs.dev/guide/features.html",
    target: "_blank"
  }, " Vite Documentation and Then Some! "),
  /*#__PURE__*/createTextVNode(" | "),
  /*#__PURE__*/createVNode("a", {
    href: "https://v3.vuejs.org/",
    target: "_blank"
  }, "Vue 3 Documentation")
], -1 /* HOISTED */);
const _hoisted_2$g = /*#__PURE__*/createVNode("p", null, [
  /*#__PURE__*/createTextVNode(" Edit "),
  /*#__PURE__*/createVNode("code", null, "components/HelloWorld.vue"),
  /*#__PURE__*/createTextVNode(" to test hot module replacement while running project as \"npm run dev\". ")
], -1 /* HOISTED */);
popScopeId();


var script$h = {
  props: {
  msg: String
},
  setup(__props) {



const state = reactive({ count: 0 });

return (_ctx, _cache) => {
  return (openBlock(), createBlock(Fragment, null, [
    createVNode("h1", null, toDisplayString(__props.msg), 1 /* TEXT */),
    _hoisted_1$g,
    createVNode("button", {
      "xr-layer": "",
      onClick: _cache[1] || (_cache[1] = $event => (unref(state).count++))
    }, "count is: " + toDisplayString(unref(state).count), 1 /* TEXT */),
    _hoisted_2$g
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$h.__scopeId = "data-v-1f52c881";

pushScopeId("data-v-5f621115");
const _hoisted_1$f = { id: "top" };
const _hoisted_2$f = /*#__PURE__*/createVNode("img", {
  alt: "Vue logo",
  src: _imports_0$5
}, null, -1 /* HOISTED */);
popScopeId();

var script$g = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$f, [
    _hoisted_2$f,
    createVNode(script$h, { msg: "Vue Component with Local Button Count" })
  ]))
}
}

};

script$g.__scopeId = "data-v-5f621115";

class HubsApp$f extends HubsApp$h {
    constructor () {
        super(script$g, 500, 500);
        this.isInteractive = true;
    }
}

var init$f = function () {
    let app = new HubsApp$f();
    app.mount();
    return app
};

var _imports_0$4 = "https://resources.realitymedia.digital/vue-apps/dist/38d6d7a1e02fc2f9.png";

var script$f = {
  props: {
  msg: String
},
  setup(__props) {



reactive({ count: 0 });

return (_ctx, _cache) => {
  return (openBlock(), createBlock("h2", null, toDisplayString(__props.msg), 1 /* TEXT */))
}
}

};

script$f.__scopeId = "data-v-ecd9120c";

pushScopeId("data-v-8d87697e");
const _hoisted_1$e = { id: "room" };
const _hoisted_2$e = /*#__PURE__*/createVNode("img", {
  src: _imports_0$4,
  width: "250"
}, null, -1 /* HOISTED */);
const _hoisted_3$1 = /*#__PURE__*/createVNode("div", { class: "displaytext" }, "AR allows us to extend our physical reality; VR creates for us a different reality.", -1 /* HOISTED */);
popScopeId();

var script$e = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$e, [
    createVNode(script$f, { msg: "Reality Media" }),
    _hoisted_2$e,
    _hoisted_3$1
  ]))
}
}

};

script$e.__scopeId = "data-v-8d87697e";

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

pushScopeId("data-v-0170e120");
const _hoisted_1$d = { id: "room" };
const _hoisted_2$d = { class: "spacer" };
const _hoisted_3 = /*#__PURE__*/createVNode("img", {
  src: _imports_0$3,
  width: "250"
}, null, -1 /* HOISTED */);
const _hoisted_4 = /*#__PURE__*/createVNode("div", { class: "squareoff" }, " Each reality medium mediates and remediates. It offers a new representation of the world that we implicitly compare to our experience of the world in itself, but also through other media.", -1 /* HOISTED */);
popScopeId();

var script$d = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$d, [
    createVNode("div", _hoisted_2$d, [
      createVNode(script$f, { msg: "AR & VR as reality media" }),
      _hoisted_3,
      _hoisted_4
    ])
  ]))
}
}

};

script$d.__scopeId = "data-v-0170e120";

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

pushScopeId("data-v-3be69672");
const _hoisted_1$c = { id: "room" };
const _hoisted_2$c = /*#__PURE__*/createVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createVNode("img", {
    src: _imports_0$2,
    width: "250"
  }),
  /*#__PURE__*/createVNode("div", { class: "squareoff" }, "Film became one of the most important reality media of the twentieth century, and in some ways, it is a forerunner of virtual reality.")
], -1 /* HOISTED */);
popScopeId();

var script$c = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$c, [
    createVNode(script$f, { msg: "The LaCiotat Effect" }),
    _hoisted_2$c
  ]))
}
}

};

script$c.__scopeId = "data-v-3be69672";

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

pushScopeId("data-v-159d5322");
const _hoisted_1$b = { id: "room" };
const _hoisted_2$b = /*#__PURE__*/createVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createVNode("img", {
    src: _imports_0$1,
    width: "200"
  }),
  /*#__PURE__*/createVNode("div", { class: "squareoff" }, "3-D computer graphics help to construct the visual realities of AR and VR, that is photorealism. The uncanny valley.")
], -1 /* HOISTED */);
popScopeId();

var script$b = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$b, [
    createVNode(script$f, { msg: "3-D Graphics & Tracking" }),
    _hoisted_2$b
  ]))
}
}

};

script$b.__scopeId = "data-v-159d5322";

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

pushScopeId("data-v-34f6b838");
const _hoisted_1$a = { id: "room" };
const _hoisted_2$a = /*#__PURE__*/createVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createVNode("img", {
    src: _imports_0,
    width: "250"
  }),
  /*#__PURE__*/createVNode("div", { class: "squareoff" }, "Presence in VR is usually conceived of as forgetting that the medium is there. The idea is that if the user can be enticed into behaving as if she were not aware of all the complex technology, then she feels presence.")
], -1 /* HOISTED */);
popScopeId();

var script$a = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$a, [
    createVNode(script$f, { msg: "Presence" }),
    _hoisted_2$a
  ]))
}
}

};

script$a.__scopeId = "data-v-34f6b838";

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

pushScopeId("data-v-16c4152e");
const _hoisted_1$9 = { id: "room" };
const _hoisted_2$9 = /*#__PURE__*/createVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createVNode("img", {
    src: _imports_0,
    width: "250"
  }),
  /*#__PURE__*/createVNode("div", { class: "squareoff" }, "Reality media applications often function as additions to established genres. Most current AR and VR applications behave like applications or artifacts that we know from earlier media.")
], -1 /* HOISTED */);
popScopeId();

var script$9 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$9, [
    createVNode(script$f, { msg: "Genres" }),
    _hoisted_2$9
  ]))
}
}

};

script$9.__scopeId = "data-v-16c4152e";

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

pushScopeId("data-v-582b11ea");
const _hoisted_1$8 = { id: "room" };
const _hoisted_2$8 = /*#__PURE__*/createVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createVNode("img", {
    src: _imports_0,
    width: "250"
  }),
  /*#__PURE__*/createVNode("div", { class: "squareoff" }, "VR will continue to construct special realities, apart from the everyday. VR worlds will continue to be metaphoric worlds.")
], -1 /* HOISTED */);
popScopeId();

var script$8 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$8, [
    createVNode(script$f, { msg: "The Future of AR & VR" }),
    _hoisted_2$8
  ]))
}
}

};

script$8.__scopeId = "data-v-582b11ea";

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

pushScopeId("data-v-c984aa94");
const _hoisted_1$7 = { id: "room" };
const _hoisted_2$7 = /*#__PURE__*/createVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createVNode("div", { class: "squareoff" }, "Pervasive, always-on AR applications have the potential to provide companies or government authorities even more information and with more precision than our current mobile applications do, both by aggregating our habits as consumers and by identifying us as individuals.")
], -1 /* HOISTED */);
popScopeId();

var script$7 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$7, [
    createVNode(script$f, { msg: "Privacy and Public Space" }),
    _hoisted_2$7
  ]))
}
}

};

script$7.__scopeId = "data-v-c984aa94";

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

pushScopeId("data-v-18bd95af");
const _hoisted_1$6 = { id: "room" };
const _hoisted_2$6 = /*#__PURE__*/createVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createVNode("br"),
    /*#__PURE__*/createVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createVNode("br"),
    /*#__PURE__*/createVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createVNode("br"),
    /*#__PURE__*/createVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);
popScopeId();

var script$6 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$6, [
    createVNode(script$f, { msg: "AR & VR as reality media" }),
    _hoisted_2$6
  ]))
}
}

};

script$6.__scopeId = "data-v-18bd95af";

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

pushScopeId("data-v-3f1c2a71");
const _hoisted_1$5 = { id: "room" };
const _hoisted_2$5 = /*#__PURE__*/createVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createVNode("br"),
    /*#__PURE__*/createVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createVNode("br"),
    /*#__PURE__*/createVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createVNode("br"),
    /*#__PURE__*/createVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);
popScopeId();

var script$5 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$5, [
    createVNode(script$f, { msg: "The History of Reality Media" }),
    _hoisted_2$5
  ]))
}
}

};

script$5.__scopeId = "data-v-3f1c2a71";

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

pushScopeId("data-v-2e476500");
const _hoisted_1$4 = { id: "room" };
const _hoisted_2$4 = /*#__PURE__*/createVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createVNode("br"),
    /*#__PURE__*/createVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createVNode("br"),
    /*#__PURE__*/createVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createVNode("br"),
    /*#__PURE__*/createVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);
popScopeId();

var script$4 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$4, [
    createVNode(script$f, { msg: "3-D & Tracking" }),
    _hoisted_2$4
  ]))
}
}

};

script$4.__scopeId = "data-v-2e476500";

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

pushScopeId("data-v-1db75fda");
const _hoisted_1$3 = { id: "room" };
const _hoisted_2$3 = /*#__PURE__*/createVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createVNode("br"),
    /*#__PURE__*/createVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createVNode("br"),
    /*#__PURE__*/createVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createVNode("br"),
    /*#__PURE__*/createVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);
popScopeId();

var script$3 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$3, [
    createVNode(script$f, { msg: "Presence" }),
    _hoisted_2$3
  ]))
}
}

};

script$3.__scopeId = "data-v-1db75fda";

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

pushScopeId("data-v-21d95f5c");
const _hoisted_1$2 = { id: "room" };
const _hoisted_2$2 = /*#__PURE__*/createVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createVNode("br"),
    /*#__PURE__*/createVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createVNode("br"),
    /*#__PURE__*/createVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createVNode("br"),
    /*#__PURE__*/createVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);
popScopeId();

var script$2 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$2, [
    createVNode(script$f, { msg: "Genres" }),
    _hoisted_2$2
  ]))
}
}

};

script$2.__scopeId = "data-v-21d95f5c";

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

pushScopeId("data-v-1fbed8a1");
const _hoisted_1$1 = { id: "room" };
const _hoisted_2$1 = /*#__PURE__*/createVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createVNode("br"),
    /*#__PURE__*/createVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createVNode("br"),
    /*#__PURE__*/createVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createVNode("br"),
    /*#__PURE__*/createVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);
popScopeId();

var script$1 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$1, [
    createVNode(script$f, { msg: "Future" }),
    _hoisted_2$1
  ]))
}
}

};

script$1.__scopeId = "data-v-1fbed8a1";

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

pushScopeId("data-v-1230663c");
const _hoisted_1 = { id: "room" };
const _hoisted_2 = /*#__PURE__*/createVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createVNode("br"),
    /*#__PURE__*/createVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createVNode("br"),
    /*#__PURE__*/createVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createVNode("br"),
    /*#__PURE__*/createVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);
popScopeId();

var script = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1, [
    createVNode(script$f, { msg: "Privacy" }),
    _hoisted_2
  ]))
}
}

};

script.__scopeId = "data-v-1230663c";

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

export { init$d as Center1, init$c as Center2, init$b as Center3, init$a as Center4, init$9 as Center5, init$8 as Center6, init$7 as Center7, init$e as Map, init$6 as Monolith1, init$5 as Monolith2, init$4 as Monolith3, init$3 as Monolith4, init$2 as Monolith5, init$1 as Monolith6, init as Monolith7, init$g as hubsTest1, init$f as hubsTest2 };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHVicy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Fzc2V0cy9sb2dvLnBuZyIsIi4uLy4uL3NyYy9jb21wb25lbnRzL05ldHdvcmtlZEhlbGxvV29ybGQudnVlIiwiLi4vLi4vc3JjL2FwcHMvSHVic1Rlc3QxL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9IdWJzQXBwLmpzIiwiLi4vLi4vc3JjL2FwcHMvSHVic1Rlc3QxL3NoYXJlZC5qcyIsIi4uLy4uL3NyYy9hcHBzL0h1YnNUZXN0MS9odWJzLmpzIiwiLi4vLi4vc3JjL2NvbXBvbmVudHMvSGVsbG9Xb3JsZC52dWUiLCIuLi8uLi9zcmMvYXBwcy9IdWJzVGVzdDIvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0h1YnNUZXN0Mi9odWJzLmpzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvcm90dW5kYS1tYXAucG5nIiwiLi4vLi4vc3JjL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyX01hcC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyX01hcC9odWJzLmpzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvbGFjaW90YXQtVlIuanBnIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyMV9JbnRyby9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyMV9JbnRyby9odWJzLmpzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvbGFjaW90YXQuanBnIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyMl9IaXN0b3J5L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXIyX0hpc3RvcnkvaHVicy5qcyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL3VuY2FubnkuanBnIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyM18zRC1UcmFja2luZy9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyM18zRC1UcmFja2luZy9odWJzLmpzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvcGFydGhlbm9uLnBuZyIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjRfUHJlc2VuY2UvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjRfUHJlc2VuY2UvaHVicy5qcyIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjVfR2VucmVzL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXI1X0dlbnJlcy9odWJzLmpzIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyNl9GdXR1cmUvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjZfRnV0dXJlL2h1YnMuanMiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXI3X1ByaXZhY3kvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjdfUHJpdmFjeS9odWJzLmpzIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGgxX0ludHJvL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDFfSW50cm8vaHVicy5qcyIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoMl9IaXN0b3J5L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDJfSGlzdG9yeS9odWJzLmpzIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGgzXzNELVRyYWNraW5nL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDNfM0QtVHJhY2tpbmcvaHVicy5qcyIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoNF9QcmVzZW5jZS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGg0X1ByZXNlbmNlL2h1YnMuanMiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDVfR2VucmVzL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDVfR2VucmVzL2h1YnMuanMiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDZfRnV0dXJlL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDZfRnV0dXJlL2h1YnMuanMiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDdfUHJpdmFjeS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGg3X1ByaXZhY3kvaHVicy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvMWE2YWNlMzc3MTMzZjE0YS5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGgxIHhyLWxheWVyIGNsYXNzPVwiZmFkZVwiPnt7IG1zZyB9fTwvaDE+XG4gIDxwPlxuICAgIEhlcmUncyBzb21lIG1vcmUgdGV4dCBqdXN0IHRvIG1ha2UgdGhpbmdzIG5vdCBibGFuay5cbiAgPC9wPlxuXG4gIDxidXR0b24geHItbGF5ZXIgQGNsaWNrPVwic2hhcmVkLmluY3JlbWVudFwiPmNvdW50IGlzOiB7eyBzaGFyZWQuc3RhdGUuY291bnQgfX08L2J1dHRvbj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBkZWZpbmVQcm9wcywgaW5qZWN0IH0gZnJvbSAndnVlJ1xuXG5kZWZpbmVQcm9wcyh7XG4gIG1zZzogU3RyaW5nXG59KVxuXG5jb25zdCBzaGFyZWQgPSBpbmplY3QoJ3NoYXJlZCcpXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbmEge1xuICBjb2xvcjogI2I1NDJiOTtcbn1cblxuLmZhZGUge1xuICBjb2xvcjogIzk4MDNhNTtcbiAgLyogdHJhbnNpdGlvbjogY29sb3IgMXM7ICovXG59XG5cbi5mYWRlOmhvdmVyIHtcbiAgY29sb3I6ICNhNzhlMDY7XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwidG9wXCI+XG4gICAgICA8aW1nIGFsdD1cIlZ1ZSBsb2dvXCIgc3JjPVwiLi4vLi4vYXNzZXRzL2xvZ28ucG5nXCIgLz5cbiAgICAgIDxTb21lVGV4dCBtc2c9XCJOZXR3b3JrZWQgVnVlIENvbXBvbmVudCB3aXRoIFNoYXJlZCBCdXR0b24gQ291bnRcIiAvPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgU29tZVRleHQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9OZXR3b3JrZWRIZWxsb1dvcmxkLnZ1ZSdcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuPC9zdHlsZT5cbiIsImltcG9ydCB7Y3JlYXRlQXBwfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyBXZWJMYXllcjNEIH0gZnJvbSBcImV0aGVyZWFsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh1YnNBcHAge1xuICAgIGNvbnN0cnVjdG9yIChBcHAsIHdpZHRoLCBoZWlnaHQsIGNyZWF0ZU9wdGlvbnM9e30pIHtcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNOZXR3b3JrZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1N0YXRpYyA9IHRydWU7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aFxuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodFxuICAgICAgICB0aGlzLnNpemUgPSB7IHdpZHRoOiB3aWR0aC8xMDAwLCBoZWlnaHQ6IGhlaWdodC8xMDAwfVxuICAgICAgICB0aGlzLnRha2VPd25lcnNoaXAgPSB0aGlzLnRha2VPd25lcnNoaXBQcm90by5iaW5kKHRoaXMpXG4gICAgICAgIHRoaXMuc2V0U2hhcmVkRGF0YSA9IHRoaXMuc2V0U2hhcmVkRGF0YVByb3RvLmJpbmQodGhpcylcblxuICAgICAgICB0aGlzLmhlYWREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICAgIC8vdGhpcy5oZWFkRGl2LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsXCJ3aWR0aDogMTAwJTtoZWlnaHQ6IDEwMCU7XCIpXG5cbiAgICAgICAgdGhpcy52dWVBcHAgPSBjcmVhdGVBcHAoQXBwLCBjcmVhdGVPcHRpb25zKVxuICAgIH1cblxuICAgIG1vdW50KCkge1xuICAgICAgICB0aGlzLnZ1ZVJvb3QgPSB0aGlzLnZ1ZUFwcC5tb3VudCh0aGlzLmhlYWREaXYpO1xuICAgICAgICB0aGlzLnZ1ZVJvb3QuJGVsLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsXCJ3aWR0aDogXCIgKyB0aGlzLndpZHRoICsgXCJweDsgaGVpZ2h0OiBcIiArIHRoaXMuaGVpZ2h0ICsgXCJweDtcIilcblxuICAgICAgICAvLyAvLyBhZGQgYSBsaW5rIHRvIHRoZSBzaGFyZWQgY3NzXG4gICAgICAgIGxldCBsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIilcbiAgICAgICAgbC5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC9odWJzLmNzc1wiKVxuICAgICAgICBsLnNldEF0dHJpYnV0ZShcInJlbFwiLCBcInN0eWxlc2hlZXRcIilcbiAgICAgICAgbC5zZXRBdHRyaWJ1dGUoXCJjcm9zc29yaWdpblwiLFwiYW5vbnltb3VzXCIpXG4gICAgICAgIHRoaXMudnVlUm9vdC4kZWwuaW5zZXJ0QmVmb3JlKGwsIHRoaXMudnVlUm9vdC4kZWwuZmlyc3RDaGlsZClcblxuICAgICAgICB0aGlzLndlYkxheWVyM0QgPSBuZXcgV2ViTGF5ZXIzRCh0aGlzLnZ1ZVJvb3QuJGVsLCB7XG4gICAgICAgICAgICBhdXRvUmVmcmVzaDogdHJ1ZSxcbiAgICAgICAgICAgIG9uTGF5ZXJDcmVhdGU6IChsYXllcikgPT4ge1xuICAgICAgICAgICAgICAgIC8vIG5vdGhpbmcgeWV0XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25MYXllclBhaW50OiAobGF5ZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1N0YXRpYykgeyB0aGlzLm5lZWRzVXBkYXRlID0gdHJ1ZSB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGV4dHVyZUVuY29kaW5nOiBUSFJFRS5zUkdCRW5jb2RpbmcsXG4gICAgICAgICAgICByZW5kZXJPcmRlck9mZnNldDogMCAgLy8gLTEwMDBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJzaXplOiBcIiwgdGhpcy5zaXplKVxuXG4gICAgICAgIGlmICh0aGlzLmlzSW50ZXJhY3RpdmUpIHtcbiAgICAgICAgICAgIC8vIGZvciBpbnRlcmFjdGlvblxuICAgICAgICAgICAgdGhpcy5yYXljYXN0ZXIgPSBuZXcgVEhSRUUuUmF5Y2FzdGVyKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldE5ldHdvcmtNZXRob2RzKHRha2VPd25lcnNoaXAsIHNldFNoYXJlZERhdGEpIHtcbiAgICAgICAgdGhpcy50YWtlT3duZXJzaGlwID0gdGFrZU93bmVyc2hpcDtcbiAgICAgICAgdGhpcy5zZXRTaGFyZWREYXRhID0gc2V0U2hhcmVkRGF0YTtcbiAgICB9XG5cbiAgICAvLyBkdW1teSBmdW5jdGlvbnMsIGp1c3QgdG8gYXZvaWQgZXJyb3JzIGlmIHRoZXkgZ2V0IGNhbGxlZCBiZWZvcmVcbiAgICAvLyBuZXR3b3JraW5nIGlzIGluaXRpYWxpemVkLCBvciBjYWxsZWQgd2hlbiBuZXR3b3JrZWQgaXMgZmFsc2VcbiAgICB0YWtlT3duZXJzaGlwUHJvdG8oKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBzZXRTaGFyZWREYXRhUHJvdG8ob2JqZWN0KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIHJlY2VpdmUgZGF0YSB1cGRhdGVzLiAgc2hvdWxkIGJlIG92ZXJyaWRkZW4gYnkgc3ViY2xhc3NlcywgYWxzbyByZXF1ZXN0c1xuICAgIC8vIHVwZGF0ZSBuZXh0IHRpY2tcbiAgICB1cGRhdGVTaGFyZWREYXRhKGRhdGFPYmplY3QpIHtcbiAgICAgICAgdGhpcy5uZWVkc1VwZGF0ZSA9IHRydWVcbiAgICB9XG5cbiAgICBnZXRTaXplKCkge1xuICAgICAgICAvLyBpZiAoIXRoaXMuY29tcFN0eWxlcykge1xuICAgICAgICAvLyAgICAgdGhpcy5jb21wU3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy52dWVSb290LiRlbCk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gdmFyIHdpZHRoID0gdGhpcy5jb21wU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ3dpZHRoJylcbiAgICAgICAgLy8gd2lkdGggPSB3aWR0aCAmJiB3aWR0aC5sZW5ndGggPiAwID8gcGFyc2VGbG9hdCh3aWR0aCkgLyAxMDAwOiAxXG4gICAgICAgIC8vIHZhciBoZWlnaHQgPSB0aGlzLmNvbXBTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnaGVpZ2h0JylcbiAgICAgICAgLy8gaGVpZ2h0ID0gaGVpZ2h0ICYmIGhlaWdodC5sZW5ndGggPiAwID8gcGFyc2VGbG9hdChoZWlnaHQpIC8gMTAwMDogMVxuICAgICAgICAvLyB0aGlzLnNpemUgPSB7IHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHR9XG4gICAgICAgIGNvbnNvbGUubG9nIChcImRpdiBzaXplOiB7XCIgKyB0aGlzLnNpemUud2lkdGggKyBcIiwgXCIgKyB0aGlzLnNpemUuaGVpZ2h0ICsgXCJ9XCIpXG4gICAgICAgIHJldHVybiB0aGlzLnNpemVcbiAgICB9XG5cbiAgICAvLyByZWNlaXZlIGRhdGEgdXBkYXRlcy4gIHNob3VsZCBiZSBvdmVycmlkZGVuIGJ5IHN1YmNsYXNzZXNcbiAgICBnZXRTaGFyZWREYXRhKGRhdGFPYmplY3QpIHtcbiAgICAgICAgcmFpc2UoXCJnZXRTaGFyZWREYXRhIHNob3VsZCBiZSBvdmVycmlkZGVuIGJ5IHN1YmNsYXNzZXNcIilcbiAgICB9XG4gICAgXG4gICAgLy8gb3ZlcnJpZGUgdG8gY2hlY2sgZm9yIHlvdXIgb3duIDNEIG9iamVjdHMgdGhhdCBhcmVuJ3Qgd2ViTGF5ZXJzXG4gICAgY2xpY2tlZChldnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzSW50ZXJhY3RpdmUpIHsgcmV0dXJuIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG9iaiA9IGV2dC5vYmplY3QzRFxuICAgICAgICB0aGlzLnJheWNhc3Rlci5yYXkuc2V0KG9iai5wb3NpdGlvbiwgXG4gICAgICAgICAgICB0aGlzLndlYkxheWVyM0QuZ2V0V29ybGREaXJlY3Rpb24obmV3IFRIUkVFLlZlY3RvcjMoKSkubmVnYXRlKCkpXG4gICAgICAgIGNvbnN0IGhpdCA9IHRoaXMud2ViTGF5ZXIzRC5oaXRUZXN0KHRoaXMucmF5Y2FzdGVyLnJheSlcbiAgICAgICAgaWYgKGhpdCkge1xuICAgICAgICAgIGhpdC50YXJnZXQuY2xpY2soKVxuICAgICAgICAgIGhpdC50YXJnZXQuZm9jdXMoKVxuICAgICAgICAgIGNvbnNvbGUubG9nKCdoaXQnLCBoaXQudGFyZ2V0LCBoaXQubGF5ZXIpXG4gICAgICAgIH0gICBcbiAgICB9XG5cbiAgICBkcmFnU3RhcnQoZXZ0KSB7XG4gICAgICAgIC8vIG5vdGhpbmcgaGVyZSAuLi4gc3ViY2xhc3Mgc2hvdWxkIG92ZXJyaWRlXG4gICAgfVxuXG4gICAgZHJhZ0VuZCAoZXZ0KSB7XG4gICAgICAgIC8vIG5vdGhpbmcgaGVyZSAuLi4gc3ViY2xhc3Mgc2hvdWxkIG92ZXJyaWRlXG4gICAgfVxuXG4gICAgcGxheSgpIHtcbiAgICAgICAgLy8gaWYgd2UgY2FuIGZpZ3VyZSBvdXQgaG93IHRvIHBhdXNlLCB0aGVuIHJlc3RhcnQgaGVyZVxuICAgIH1cblxuICAgIHBhdXNlKCkge1xuICAgICAgICAvLyBwZXJoYXBzIGZpZ3VyZSBvdXQgaG93IHRvIHBhdXNlIHRoZSBWdWUgY29tcG9uZW50P1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIC8vIFRPRE86IGRlc3Ryb3kgdGhlIHZ1ZSBjb21wb25lbnQgYW5kIGFueSByZXNvdXJjZXMsIGV0Yy4sIGl0IGhhc1xuICAgIH1cblxuICAgIHRpY2sodGltZSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNTdGF0aWMgfHwgdGhpcy5uZWVkc1VwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy53ZWJMYXllcjNELnVwZGF0ZSh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5lZWRzVXBkYXRlID0gZmFsc2VcbiAgICB9XG59IiwiaW1wb3J0IHsgcmVhY3RpdmUsIGluamVjdCwgcmVhZG9ubHkgfSBmcm9tIFwidnVlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3JlIHtcbiAgICBjb25zdHJ1Y3RvcihhcHApIHtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSByZWFjdGl2ZSh7XG4gICAgICAgICAgICBjb3VudDogMFxuICAgICAgICB9KVxuICAgICAgICB0aGlzLmFwcCA9IGFwcFxuICAgICAgICB0aGlzLnN0YXRlID0gcmVhZG9ubHkodGhpcy5fc3RhdGUpXG4gICAgfSAgICBcblxuICAgIGluY3JlbWVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYXBwLnRha2VPd25lcnNoaXAoKSkge1xuICAgICAgICAgICAgdGhpcy5fc3RhdGUuY291bnQrKztcbiAgICAgICAgICAgIHRoaXMuYXBwLnNldFNoYXJlZERhdGEodGhpcy5zdGF0ZSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICB1cGRhdGVTaGFyZWREYXRhKGRhdGFPYmplY3QpIHtcbiAgICAgICAgLy8gbmVlZCB0byB1cGRhdGUgdGhlIGVsZW1lbnRzIHdpdGhpbiB0aGUgc3RhdGUsIGJlY2F1c2Ugb3RoZXJ3aXNlXG4gICAgICAgIC8vIHRoZSBkYXRhIHdvbid0IGZsb3cgdG8gdGhlIGNvbXBvbmVudHNcbiAgICAgICAgdGhpcy5fc3RhdGUuY291bnQgPSBkYXRhT2JqZWN0LmNvdW50XG4gICAgfVxufVxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4vc2hhcmVkXCJcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICBzdXBlcihBcHAsIDQwMCwgNDc1KVxuXG4gICAgICAgIC8vIGNyZWF0ZSBvdXIgc2hhcmVkIGRhdGEgb2JqZWN0IHRoYXQgd2lsbFxuICAgICAgICAvLyBzaGFyZSBkYXRhIGJldHdlZW4gdnVlIGFuZCBodWJzXG4gICAgICAgIHRoaXMuc2hhcmVkID0gbmV3IFN0b3JlKHRoaXMpXG4gICAgICAgIHRoaXMudnVlQXBwLnByb3ZpZGUoJ3NoYXJlZCcsIHRoaXMuc2hhcmVkKVxuXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNOZXR3b3JrZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzU3RhdGljID0gZmFsc2U7XG5cbiAgICAgICAgY29uc29sZS5sb2cgKEpTT04uc3RyaW5naWZ5KHRoaXMuc2hhcmVkLmRhdGEpKVxuICAgIH1cbiAgICBcbiAgICB1cGRhdGVTaGFyZWREYXRhKGRhdGFPYmplY3QpIHtcbiAgICAgICAgc3VwZXIudXBkYXRlU2hhcmVkRGF0YShkYXRhT2JqZWN0KVxuICAgICAgICB0aGlzLnNoYXJlZC51cGRhdGVTaGFyZWREYXRhKGRhdGFPYmplY3QpXG4gICAgfVxuXG4gICAgZ2V0U2hhcmVkRGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkLnN0YXRlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKClcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdFxuIiwiPHRlbXBsYXRlPlxuICA8aDE+e3sgbXNnIH19PC9oMT5cblxuICA8cD5cbiAgICA8YSBocmVmPVwiaHR0cHM6Ly92aXRlanMuZGV2L2d1aWRlL2ZlYXR1cmVzLmh0bWxcIiB0YXJnZXQ9XCJfYmxhbmtcIj5cbiAgICAgIFZpdGUgRG9jdW1lbnRhdGlvbiBhbmQgVGhlbiBTb21lISBcbiAgICA8L2E+XG4gICAgfFxuICAgIDxhIGhyZWY9XCJodHRwczovL3YzLnZ1ZWpzLm9yZy9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5WdWUgMyBEb2N1bWVudGF0aW9uPC9hPlxuICA8L3A+XG5cbiAgPGJ1dHRvbiB4ci1sYXllciBAY2xpY2s9XCJzdGF0ZS5jb3VudCsrXCI+Y291bnQgaXM6IHt7IHN0YXRlLmNvdW50IH19PC9idXR0b24+XG4gIDxwPlxuICAgIEVkaXRcbiAgICA8Y29kZT5jb21wb25lbnRzL0hlbGxvV29ybGQudnVlPC9jb2RlPiB0byB0ZXN0IGhvdCBtb2R1bGUgcmVwbGFjZW1lbnQgd2hpbGUgcnVubmluZyBwcm9qZWN0IGFzIFwibnBtIHJ1biBkZXZcIi5cbiAgPC9wPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IGRlZmluZVByb3BzLCByZWFjdGl2ZSB9IGZyb20gJ3Z1ZSdcblxuZGVmaW5lUHJvcHMoe1xuICBtc2c6IFN0cmluZ1xufSlcblxuY29uc3Qgc3RhdGUgPSByZWFjdGl2ZSh7IGNvdW50OiAwIH0pXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJ0b3BcIj5cbiAgICAgIDxpbWcgYWx0PVwiVnVlIGxvZ29cIiBzcmM9XCIuLi8uLi9hc3NldHMvbG9nby5wbmdcIiAvPlxuICAgICAgPEhlbGxvV29ybGQgbXNnPVwiVnVlIENvbXBvbmVudCB3aXRoIExvY2FsIEJ1dHRvbiBDb3VudFwiIC8+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBIZWxsb1dvcmxkIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSGVsbG9Xb3JsZC52dWUnXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICBzdXBlcihBcHAsIDUwMCwgNTAwKVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKClcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC8zOGQ2ZDdhMWUwMmZjMmY5LnBuZ1wiIiwiPHRlbXBsYXRlPlxuICA8aDI+e3sgbXNnIH19PC9oMj5cblxuIFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IGRlZmluZVByb3BzLCByZWFjdGl2ZSB9IGZyb20gJ3Z1ZSdcblxuZGVmaW5lUHJvcHMoe1xuICBtc2c6IFN0cmluZ1xufSlcblxuY29uc3Qgc3RhdGUgPSByZWFjdGl2ZSh7IGNvdW50OiAwIH0pXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbmEge1xuICBjb2xvcjogIzQyYjk4Mztcbn1cblxuKiB7XG4gICAgYm94LXNpemluZzogY29udGVudC1ib3g7XG4gICAgbGluZS1oZWlnaHQgOiBub3JtYWw7XG59XG5cbnAge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIG1hcmdpbi1ibG9jay1zdGFydDogMWVtO1xuICAgIG1hcmdpbi1ibG9jay1lbmQ6IDFlbTtcbiAgICBtYXJnaW4taW5saW5lLXN0YXJ0OiAwcHg7XG4gICAgbWFyZ2luLWlubGluZS1lbmQ6IDBweDtcbn1cblxuaDEge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIGZvbnQtc2l6ZTogMmVtO1xuICAgIG1hcmdpbi1ibG9jay1zdGFydDogMC42N2VtO1xuICAgIG1hcmdpbi1ibG9jay1lbmQ6IDAuNjdlbTtcbiAgICBtYXJnaW4taW5saW5lLXN0YXJ0OiAwcHg7XG4gICAgbWFyZ2luLWlubGluZS1lbmQ6IDBweDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuYnV0dG9uIHtcbiAgICAvKiB3aWR0aDogMTAwcHg7XG4gICAgaGVpZ2h0OiAzMHB4OyAqL1xuICAgIGFwcGVhcmFuY2U6IGF1dG87XG4gICAgLXdlYmtpdC13cml0aW5nLW1vZGU6IGhvcml6b250YWwtdGIgIWltcG9ydGFudDtcbiAgICB0ZXh0LXJlbmRlcmluZzogYXV0bztcbiAgICBjb2xvcjogLWludGVybmFsLWxpZ2h0LWRhcmsoYmxhY2ssIHdoaXRlKTtcbiAgICBsZXR0ZXItc3BhY2luZzogbm9ybWFsO1xuICAgIHdvcmQtc3BhY2luZzogbm9ybWFsO1xuICAgIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICAgIHRleHQtaW5kZW50OiAwcHg7XG4gICAgdGV4dC1zaGFkb3c6IG5vbmU7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogLWludGVybmFsLWxpZ2h0LWRhcmsocmdiKDIzOSwgMjM5LCAyMzkpLCByZ2IoNTksIDU5LCA1OSkpO1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgbWFyZ2luOiAwZW07XG4gICAgZm9udDogNDAwIDEzLjMzMzNweCBBcmlhbDtcbiAgICBwYWRkaW5nOiAxcHggNnB4O1xuICAgIGJvcmRlci13aWR0aDogMnB4O1xuICAgIGJvcmRlci1zdHlsZTogb3V0c2V0O1xuICAgIGJvcmRlci1jb2xvcjogLWludGVybmFsLWxpZ2h0LWRhcmsocmdiKDExOCwgMTE4LCAxMTgpLCByZ2IoMTMzLCAxMzMsIDEzMykpO1xuICAgIGJvcmRlci1pbWFnZTogaW5pdGlhbDtcbiAgICBib3JkZXItcmFkaXVzOiAycHg7XG59XG5cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxUaXRsZSBtc2c9XCJSZWFsaXR5IE1lZGlhXCIgLz5cblx0PGltZyBzcmM9XCIuLi8uLi9hc3NldHMvaW1hZ2VzL3JvdHVuZGEtbWFwLnBuZ1wiIHdpZHRoPVwiMjUwXCIgPlxuXHQ8ZGl2IGNsYXNzPVwiZGlzcGxheXRleHRcIj5BUiBhbGxvd3MgdXMgdG8gZXh0ZW5kIG91ciBwaHlzaWNhbCByZWFsaXR5OyBWUiBjcmVhdGVzIGZvciB1cyBhIGRpZmZlcmVudCByZWFsaXR5LjwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0KVxuICAgICAgICAvLyB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1KVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzdhZjdiOTViMzVmZDc2MTYuanBnXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPFRpdGxlIG1zZz1cIkFSICYgVlIgYXMgcmVhbGl0eSBtZWRpYVwiIC8+XG5cdDxpbWcgc3JjPVwiLi4vLi4vYXNzZXRzL2ltYWdlcy9sYWNpb3RhdC1WUi5qcGdcIiB3aWR0aD1cIjI1MFwiID5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPiBFYWNoIHJlYWxpdHkgbWVkaXVtIG1lZGlhdGVzIGFuZCByZW1lZGlhdGVzLiBJdCBvZmZlcnMgYSBuZXcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHdvcmxkIHRoYXQgd2UgaW1wbGljaXRseSBjb21wYXJlIFxuXHRcdHRvIG91ciBleHBlcmllbmNlIG9mIHRoZSB3b3JsZCBpbiBpdHNlbGYsIGJ1dCBhbHNvIHRocm91Z2ggb3RoZXIgbWVkaWEuPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0KVxuICAgICAgICAvLyB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1KVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzdhYjNkODZhZmQ0OGRiZmIuanBnXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gICAgPFRpdGxlIG1zZz1cIlRoZSBMYUNpb3RhdCBFZmZlY3RcIiAvPlxuICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cblx0ICA8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWFnZXMvbGFjaW90YXQuanBnXCIgd2lkdGg9XCIyNTBcIj5cblx0ICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+RmlsbSBiZWNhbWUgb25lIG9mIHRoZSBtb3N0IGltcG9ydGFudCByZWFsaXR5IFxuICAgICAgbWVkaWEgb2YgdGhlIHR3ZW50aWV0aCBjZW50dXJ5LCBhbmQgaW4gc29tZSB3YXlzLCBpdCBpcyBhIGZvcmVydW5uZXIgXG4gICAgICBvZiB2aXJ0dWFsIHJlYWxpdHkuPC9kaXY+ICBcbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+ICBcbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcihBcHAsd2lkdGgsaGVpZ2h0KVxuICAgICAgICAvLyB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1KVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzkxZmRmYTgxMWU3NTJkYzguanBnXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gICAgPFRpdGxlIG1zZz1cIjMtRCBHcmFwaGljcyAmIFRyYWNraW5nXCIgLz5cblx0PGRpdiBjbGFzcz1cInNwYWNlclwiPlxuXHQ8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWFnZXMvdW5jYW5ueS5qcGdcIiB3aWR0aD1cIjIwMFwiPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+My1EIGNvbXB1dGVyIGdyYXBoaWNzIGhlbHAgdG8gY29uc3RydWN0IHRoZSB2aXN1YWwgXG5cdFx0cmVhbGl0aWVzIG9mIEFSIGFuZCBWUiwgdGhhdCBpcyBwaG90b3JlYWxpc20uIFRoZSB1bmNhbm55IHZhbGxleS48L2Rpdj5cblx0PC9kaXY+XG5cdDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0KVxuICAgICAgICAvLy8vIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvZGMwNWMwNDU0NmE2OWU2NC5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgICA8VGl0bGUgbXNnPVwiUHJlc2VuY2VcIiAvPlxuXHQgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj4gXG5cdCAgPGltZyBzcmM9XCIuLi8uLi9hc3NldHMvaW1hZ2VzL3BhcnRoZW5vbi5wbmdcIiB3aWR0aD1cIjI1MFwiPlxuXHQgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5QcmVzZW5jZSBpbiBWUiBpcyB1c3VhbGx5IGNvbmNlaXZlZCBvZiBhcyBmb3JnZXR0aW5nIHRoYXQgdGhlIG1lZGl1bSBpcyB0aGVyZS4gVGhlIGlkZWEgaXMgdGhhdCBpZiB0aGUgdXNlciBjYW4gYmUgZW50aWNlZCBpbnRvIGJlaGF2aW5nIGFzIGlmIHNoZSB3ZXJlIG5vdCBhd2FyZSBvZiBhbGwgdGhlIGNvbXBsZXggdGVjaG5vbG9neSwgdGhlbiBzaGUgZmVlbHMgcHJlc2VuY2UuPC9kaXY+ICBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCx3aWR0aCxoZWlnaHQpXG4gICAgICAgIC8vIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gICAgPFRpdGxlIG1zZz1cIkdlbnJlc1wiIC8+XG4gICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPiBcblx0ICA8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWFnZXMvcGFydGhlbm9uLnBuZ1wiIHdpZHRoPVwiMjUwXCI+XG5cdCAgPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlJlYWxpdHkgbWVkaWEgYXBwbGljYXRpb25zIG9mdGVuIGZ1bmN0aW9uIGFzIGFkZGl0aW9ucyB0byBlc3RhYmxpc2hlZCBnZW5yZXMuIE1vc3QgY3VycmVudCBBUiBhbmQgVlIgYXBwbGljYXRpb25zIGJlaGF2ZSBsaWtlIGFwcGxpY2F0aW9ucyBvciBhcnRpZmFjdHMgdGhhdCB3ZSBrbm93IGZyb20gZWFybGllciBtZWRpYS48L2Rpdj4gIFxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcihBcHAsd2lkdGgsaGVpZ2h0KVxuICAgICAgICAvLyB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1KVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICAgIDxUaXRsZSBtc2c9XCJUaGUgRnV0dXJlIG9mIEFSICYgVlJcIiAvPlxuICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cblx0ICA8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWFnZXMvcGFydGhlbm9uLnBuZ1wiIHdpZHRoPVwiMjUwXCI+XG5cdCAgPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlZSIHdpbGwgY29udGludWUgdG8gY29uc3RydWN0IHNwZWNpYWwgcmVhbGl0aWVzLCBhcGFydCBmcm9tIHRoZSBldmVyeWRheS4gVlIgd29ybGRzIHdpbGwgY29udGludWUgdG8gYmUgbWV0YXBob3JpYyB3b3JsZHMuPC9kaXY+ICBcbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLHdpZHRoLGhlaWdodClcbiAgICAgICAgLy8gdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgICA8VGl0bGUgbXNnPVwiUHJpdmFjeSBhbmQgUHVibGljIFNwYWNlXCIgLz5cbiAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG5cdCAgPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlBlcnZhc2l2ZSwgYWx3YXlzLW9uIEFSIGFwcGxpY2F0aW9ucyBoYXZlIHRoZSBwb3RlbnRpYWwgdG8gcHJvdmlkZSBjb21wYW5pZXMgb3IgZ292ZXJubWVudCBhdXRob3JpdGllcyBcbiAgICAgIGV2ZW4gbW9yZSBpbmZvcm1hdGlvbiBhbmQgd2l0aCBtb3JlIHByZWNpc2lvbiB0aGFuIG91ciBjdXJyZW50IG1vYmlsZSBhcHBsaWNhdGlvbnMgZG8sIFxuICAgICAgYm90aCBieSBhZ2dyZWdhdGluZyBvdXIgaGFiaXRzIGFzIGNvbnN1bWVycyBhbmQgYnkgaWRlbnRpZnlpbmcgdXMgYXMgaW5kaXZpZHVhbHMuPC9kaXY+ICBcbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLHdpZHRoLGhlaWdodClcbiAgICAgICAgLy8gdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgICBcbiAgICA8VGl0bGUgbXNnPVwiQVIgJiBWUiBhcyByZWFsaXR5IG1lZGlhXCIgLz5cbiAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZmx1c2hsZWZ0XCI+XG4gICAgICA8YnI+XG4gICAgICA8aDM+IFNvbWUgb2YgdGhlIGtleSBkaWZmZXJlbmNlcyBiZXR3ZWVuIOKAnGNsYXNzaWPigJ0gVlIgYW5kIEFSPC9oMz5cbiAgICAgIDxicj5cbiAgICAgIDxoMz4gRXh0ZW5kZWQgcmVhbGl0eSAoWFIpIGFuZCB0aGUgaW1tZXJzaXZlIHdlYiA8L2gzPlxuICAgICAgPGJyPlxuICAgICAgPGgzPiBXaGVyZSBBUiBhbmQgVlIgZml0IG9uIE1pbGdyYW0gYW5kIEtpc2hpbm/igJlzIHZpcnR1YWxpdHkgY29udGludXVtPC9oMz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLHdpZHRoLCBoZWlnaHQpXG4gICAgICAgIC8vIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gICAgPFRpdGxlIG1zZz1cIlRoZSBIaXN0b3J5IG9mIFJlYWxpdHkgTWVkaWFcIiAvPlxuICAgICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmx1c2hsZWZ0XCI+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBTb21lIG9mIHRoZSBrZXkgZGlmZmVyZW5jZXMgYmV0d2VlbiDigJxjbGFzc2lj4oCdIFZSIGFuZCBBUjwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBFeHRlbmRlZCByZWFsaXR5IChYUikgYW5kIHRoZSBpbW1lcnNpdmUgd2ViIDwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBXaGVyZSBBUiBhbmQgVlIgZml0IG9uIE1pbGdyYW0gYW5kIEtpc2hpbm/igJlzIHZpcnR1YWxpdHkgY29udGludXVtPC9oMz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj4gXG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcihBcHAsd2lkdGgsaGVpZ2h0KVxuICAgICAgICAvLyB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1KVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICAgIDxUaXRsZSBtc2c9XCIzLUQgJiBUcmFja2luZ1wiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbHVzaGxlZnRcIj5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFNvbWUgb2YgdGhlIGtleSBkaWZmZXJlbmNlcyBiZXR3ZWVuIOKAnGNsYXNzaWPigJ0gVlIgYW5kIEFSPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IEV4dGVuZGVkIHJlYWxpdHkgKFhSKSBhbmQgdGhlIGltbWVyc2l2ZSB3ZWIgPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFdoZXJlIEFSIGFuZCBWUiBmaXQgb24gTWlsZ3JhbSBhbmQgS2lzaGlub+KAmXMgdmlydHVhbGl0eSBjb250aW51dW08L2gzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PiAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCx3aWR0aCxoZWlnaHQpXG4gICAgICAgIC8vIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCI+XG4gICAgPFRpdGxlIG1zZz1cIlByZXNlbmNlXCIgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsdXNobGVmdFwiPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gU29tZSBvZiB0aGUga2V5IGRpZmZlcmVuY2VzIGJldHdlZW4g4oCcY2xhc3NpY+KAnSBWUiBhbmQgQVI8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gRXh0ZW5kZWQgcmVhbGl0eSAoWFIpIGFuZCB0aGUgaW1tZXJzaXZlIHdlYiA8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gV2hlcmUgQVIgYW5kIFZSIGZpdCBvbiBNaWxncmFtIGFuZCBLaXNoaW5v4oCZcyB2aXJ0dWFsaXR5IGNvbnRpbnV1bTwvaDM+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+ICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLHdpZHRoLGhlaWdodClcbiAgICAgICAgLy8gdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgICA8VGl0bGUgbXNnPVwiR2VucmVzXCIgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsdXNobGVmdFwiPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gU29tZSBvZiB0aGUga2V5IGRpZmZlcmVuY2VzIGJldHdlZW4g4oCcY2xhc3NpY+KAnSBWUiBhbmQgQVI8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gRXh0ZW5kZWQgcmVhbGl0eSAoWFIpIGFuZCB0aGUgaW1tZXJzaXZlIHdlYiA8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gV2hlcmUgQVIgYW5kIFZSIGZpdCBvbiBNaWxncmFtIGFuZCBLaXNoaW5v4oCZcyB2aXJ0dWFsaXR5IGNvbnRpbnV1bTwvaDM+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+ICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLHdpZHRoLGhlaWdodClcbiAgICAgICAgLy8gdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgICA8VGl0bGUgbXNnPVwiRnV0dXJlXCIgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsdXNobGVmdFwiPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gU29tZSBvZiB0aGUga2V5IGRpZmZlcmVuY2VzIGJldHdlZW4g4oCcY2xhc3NpY+KAnSBWUiBhbmQgQVI8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gRXh0ZW5kZWQgcmVhbGl0eSAoWFIpIGFuZCB0aGUgaW1tZXJzaXZlIHdlYiA8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gV2hlcmUgQVIgYW5kIFZSIGZpdCBvbiBNaWxncmFtIGFuZCBLaXNoaW5v4oCZcyB2aXJ0dWFsaXR5IGNvbnRpbnV1bTwvaDM+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+ICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLHdpZHRoLGhlaWdodClcbiAgICAgICAgLy8gdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgICA8VGl0bGUgbXNnPVwiUHJpdmFjeVwiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbHVzaGxlZnRcIj5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFNvbWUgb2YgdGhlIGtleSBkaWZmZXJlbmNlcyBiZXR3ZWVuIOKAnGNsYXNzaWPigJ0gVlIgYW5kIEFSPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IEV4dGVuZGVkIHJlYWxpdHkgKFhSKSBhbmQgdGhlIGltbWVyc2l2ZSB3ZWIgPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFdoZXJlIEFSIGFuZCBWUiBmaXQgb24gTWlsZ3JhbSBhbmQgS2lzaGlub+KAmXMgdmlydHVhbGl0eSBjb250aW51dW08L2gzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PiAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCx3aWR0aCxoZWlnaHQpXG4gICAgICAgIC8vIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiXSwibmFtZXMiOlsiSHVic0FwcCIsIldlYkxheWVyM0QiLCJIdWJzQXBwUHJvdG8iLCJBcHAiLCJpbml0Il0sIm1hcHBpbmdzIjoiOztBQUFBLG1CQUFlOzs7Ozs7Ozs7QUNXZjs7Ozs7OztBQUZjO0FBS1o7QUFDRjtBQUNBLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNUakI7Ozs7Ozs7Ozs7Ozs7O0FDSkMsTUFBTUEsU0FBTyxDQUFDO0FBQzdCLElBQUksV0FBVyxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLEVBQUUsRUFBRTtBQUN2RCxRQUFRLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO0FBQ25DLFFBQVEs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
