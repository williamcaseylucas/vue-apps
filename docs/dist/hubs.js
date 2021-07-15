import { r as reactive, c as createBlock, t as toDisplayString, o as openBlock, a as createVNode, p as pushScopeId, b as popScopeId, d as createApp, B as Bh } from './vendor-c9511f13.js';

var _imports_0$4 = "https://jay-vue-apps.ngrok.io/vue-apps/dist/3eaf0854d7dca418.png";

var script$f = {
  expose: [],
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

script$f.__scopeId = "data-v-4679d783";
script$f.__file = "src/components/CenterTitle.vue";

pushScopeId("data-v-30c04150");
const _hoisted_1$e = { id: "top" };
const _hoisted_2$e = /*#__PURE__*/createVNode("img", {
  src: _imports_0$4,
  width: "250"
}, null, -1 /* HOISTED */);
const _hoisted_3$1 = /*#__PURE__*/createVNode("div", { class: "displaytext" }, "AR allows us to extend our physical reality; VR creates for us a different reality.", -1 /* HOISTED */);
popScopeId();

var script$e = {
  expose: [],
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

script$e.__scopeId = "data-v-30c04150";
script$e.__file = "src/apps/Center_Map/App.vue";

class HubsApp$f {
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
        l.setAttribute("href", "https://jay-vue-apps.ngrok.io/vue-apps/dist/hubs.css");
        l.setAttribute("rel", "stylesheet");
        l.setAttribute("crossorigin","anonymous");
        this.vueRoot.$el.insertBefore(l, this.vueRoot.$el.firstChild);

        this.webLayer3D = new Bh(this.vueRoot.$el, {
            autoRefresh: true,
            onLayerCreate: (layer) => {
                // nothing yet
            },
            onAfterRasterize(layer) {
                   // nothing yet
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

    // receive data updates.  should be overridden by subclasses
    updateSharedData(dataObject) {
        raise("updateData should be overridden by subclasses");
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
}

class HubsApp$e extends HubsApp$f {
    constructor (width, height) {
        super(script$e, width, height);
        this.isInteractive = true;
    }
}

var init$e = function () {
    let app = new HubsApp$e(300, 475);
    app.mount();
    return app
};

var _imports_0$3 = "https://jay-vue-apps.ngrok.io/vue-apps/dist/559ce5ae9afccf63.jpg";

pushScopeId("data-v-f076d152");
const _hoisted_1$d = { id: "top" };
const _hoisted_2$d = { class: "spacer" };
const _hoisted_3 = /*#__PURE__*/createVNode("img", {
  src: _imports_0$3,
  width: "250"
}, null, -1 /* HOISTED */);
const _hoisted_4 = /*#__PURE__*/createVNode("div", { class: "squareoff" }, " Each reality medium mediates and remediates. It offers a new representation of the world that we implicitly compare to our experience of the world in itself, but also through other media.", -1 /* HOISTED */);
popScopeId();

var script$d = {
  expose: [],
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

script$d.__scopeId = "data-v-f076d152";
script$d.__file = "src/apps/Center1_Intro/App.vue";

class HubsApp$d extends HubsApp$f {
    constructor (width, height) {
        super(script$d, width, height);
        this.isInteractive = true;
    }
}

var init$d = function () {
    let app = new HubsApp$d(300, 475);
    app.mount();
    return app
};

var _imports_0$2 = "https://jay-vue-apps.ngrok.io/vue-apps/dist/4af656311c609b90.jpg";

pushScopeId("data-v-0f40d740");
const _hoisted_1$c = { id: "top" };
const _hoisted_2$c = /*#__PURE__*/createVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createVNode("img", {
    src: _imports_0$2,
    width: "250"
  }),
  /*#__PURE__*/createVNode("div", { class: "squareoff" }, "Film became one of the most important reality media of the twentieth century, and in some ways, it is a forerunner of virtual reality.")
], -1 /* HOISTED */);
popScopeId();

var script$c = {
  expose: [],
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$c, [
    createVNode(script$f, { msg: "The LaCiotat Effect" }),
    _hoisted_2$c
  ]))
}
}

};

script$c.__scopeId = "data-v-0f40d740";
script$c.__file = "src/apps/Center2_History/App.vue";

class HubsApp$c extends HubsApp$f {
    constructor (width, height) {
        super(width, height, script$c);
        this.isInteractive = true;
    }
}

var init$c = function () {
    let app = new HubsApp$c(300, 475);
    app.mount();
    return app
};

var _imports_0$1 = "https://jay-vue-apps.ngrok.io/vue-apps/dist/175aa02d2f25839c.jpg";

pushScopeId("data-v-8c90c200");
const _hoisted_1$b = { id: "top" };
const _hoisted_2$b = /*#__PURE__*/createVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createVNode("img", {
    src: _imports_0$1,
    width: "200"
  }),
  /*#__PURE__*/createVNode("div", { class: "squareoff" }, "3-D computer graphics help to construct the visual realities of AR and VR, that is photorealism. The uncanny valley.")
], -1 /* HOISTED */);
popScopeId();

var script$b = {
  expose: [],
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$b, [
    createVNode(script$f, { msg: "3-D Graphics & Tracking" }),
    _hoisted_2$b
  ]))
}
}

};

script$b.__scopeId = "data-v-8c90c200";
script$b.__file = "src/apps/Center3_3D-Tracking/App.vue";

class HubsApp$b extends HubsApp$f {
    constructor (width, height) {
        super(script$b, width, height);
        this.isInteractive = true;
    }
}

var init$b = function () {
    let app = new HubsApp$b(300, 475);
    app.mount();
    return app
};

var _imports_0 = "https://jay-vue-apps.ngrok.io/vue-apps/dist/dc05c04546a69e64.png";

pushScopeId("data-v-14b9943e");
const _hoisted_1$a = { id: "top" };
const _hoisted_2$a = /*#__PURE__*/createVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createVNode("img", {
    src: _imports_0,
    width: "250"
  }),
  /*#__PURE__*/createVNode("div", { class: "squareoff" }, "Presence in VR is usually conceived of as forgetting that the medium is there. The idea is that if the user can be enticed into behaving as if she were not aware of all the complex technology, then she feels presence.")
], -1 /* HOISTED */);
popScopeId();

var script$a = {
  expose: [],
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$a, [
    createVNode(script$f, { msg: "Presence" }),
    _hoisted_2$a
  ]))
}
}

};

script$a.__scopeId = "data-v-14b9943e";
script$a.__file = "src/apps/Center4_Presence/App.vue";

class HubsApp$a extends HubsApp$f {
    constructor (width, height) {
        super(width, height, script$a);
        this.isInteractive = true;
    }
}

var init$a = function () {
    let app = new HubsApp$a(300, 475);
    app.mount();
    return app
};

pushScopeId("data-v-794b8015");
const _hoisted_1$9 = { id: "top" };
const _hoisted_2$9 = /*#__PURE__*/createVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createVNode("img", {
    src: _imports_0,
    width: "250"
  }),
  /*#__PURE__*/createVNode("div", { class: "squareoff" }, "Reality media applications often function as additions to established genres. Most current AR and VR applications behave like applications or artifacts that we know from earlier media.")
], -1 /* HOISTED */);
popScopeId();

var script$9 = {
  expose: [],
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$9, [
    createVNode(script$f, { msg: "Genres" }),
    _hoisted_2$9
  ]))
}
}

};

script$9.__scopeId = "data-v-794b8015";
script$9.__file = "src/apps/Center5_Genres/App.vue";

class HubsApp$9 extends HubsApp$f {
    constructor (width, height) {
        super(width, height, script$9);
        this.isInteractive = true;
    }
}

var init$9 = function () {
    let app = new HubsApp$9(300, 475);
    app.mount();
    return app
};

pushScopeId("data-v-cbf6bd32");
const _hoisted_1$8 = { id: "top" };
const _hoisted_2$8 = /*#__PURE__*/createVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createVNode("img", {
    src: _imports_0,
    width: "250"
  }),
  /*#__PURE__*/createVNode("div", { class: "squareoff" }, "VR will continue to construct special realities, apart from the everyday. VR worlds will continue to be metaphoric worlds.")
], -1 /* HOISTED */);
popScopeId();

var script$8 = {
  expose: [],
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$8, [
    createVNode(script$f, { msg: "The Future of AR & VR" }),
    _hoisted_2$8
  ]))
}
}

};

script$8.__scopeId = "data-v-cbf6bd32";
script$8.__file = "src/apps/Center6_Future/App.vue";

class HubsApp$8 extends HubsApp$f {
    constructor (width, height) {
        super(width, height, script$8);
        this.isInteractive = true;
    }
}

var init$8 = function () {
    let app = new HubsApp$8(300, 475);
    app.mount();
    return app
};

pushScopeId("data-v-a8a18f8e");
const _hoisted_1$7 = { id: "top" };
const _hoisted_2$7 = /*#__PURE__*/createVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createVNode("div", { class: "squareoff" }, "Pervasive, always-on AR applications have the potential to provide companies or government authorities even more information and with more precision than our current mobile applications do, both by aggregating our habits as consumers and by identifying us as individuals.")
], -1 /* HOISTED */);
popScopeId();

var script$7 = {
  expose: [],
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$7, [
    createVNode(script$f, { msg: "Privacy and Public Space" }),
    _hoisted_2$7
  ]))
}
}

};

script$7.__scopeId = "data-v-a8a18f8e";
script$7.__file = "src/apps/Center7_Privacy/App.vue";

class HubsApp$7 extends HubsApp$f {
    constructor (width, height) {
        super(width, height, script$7);
        this.isInteractive = true;
    }
}

var init$7 = function () {
    let app = new HubsApp$7(300, 475);
    app.mount();
    return app
};

pushScopeId("data-v-09767ab8");
const _hoisted_1$6 = { id: "top" };
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
  expose: [],
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$6, [
    createVNode(script$f, { msg: "AR & VR as reality media" }),
    _hoisted_2$6
  ]))
}
}

};

script$6.__scopeId = "data-v-09767ab8";
script$6.__file = "src/apps/Monolith1_Intro/App.vue";

class HubsApp$6 extends HubsApp$f {
    constructor (width, height) {
        super(script$6,width, height);
        this.isInteractive = true;
    }
}

var init$6 = function () {
    let app = new HubsApp$6(300, 475);
    app.mount();
    return app
};

pushScopeId("data-v-27f1333e");
const _hoisted_1$5 = { id: "top" };
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
  expose: [],
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$5, [
    createVNode(script$f, { msg: "The History of Reality Media" }),
    _hoisted_2$5
  ]))
}
}

};

script$5.__scopeId = "data-v-27f1333e";
script$5.__file = "src/apps/Monolith2_History/App.vue";

class HubsApp$5 extends HubsApp$f {
    constructor (width, height) {
        super(width, height, script$5);
        this.isInteractive = true;
    }
}

var init$5 = function () {
    let app = new HubsApp$5(300, 475);
    app.mount();
    return app
};

pushScopeId("data-v-b72094be");
const _hoisted_1$4 = { id: "top" };
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
  expose: [],
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$4, [
    createVNode(script$f, { msg: "3-D & Tracking" }),
    _hoisted_2$4
  ]))
}
}

};

script$4.__scopeId = "data-v-b72094be";
script$4.__file = "src/apps/Monolith3_3D-Tracking/App.vue";

class HubsApp$4 extends HubsApp$f {
    constructor (width, height) {
        super(width, height, script$4);
        this.isInteractive = true;
    }
}

var init$4 = function () {
    let app = new HubsApp$4(300, 475);
    app.mount();
    return app
};

pushScopeId("data-v-9ca2ea40");
const _hoisted_1$3 = { id: "top" };
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
  expose: [],
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$3, [
    createVNode(script$f, { msg: "Presence" }),
    _hoisted_2$3
  ]))
}
}

};

script$3.__scopeId = "data-v-9ca2ea40";
script$3.__file = "src/apps/Monolith4_Presence/App.vue";

class HubsApp$3 extends HubsApp$f {
    constructor (width, height) {
        super(width, height, script$3);
        this.isInteractive = true;
    }
}

var init$3 = function () {
    let app = new HubsApp$3(300, 475);
    app.mount();
    return app
};

pushScopeId("data-v-2dd608d4");
const _hoisted_1$2 = { id: "top" };
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
  expose: [],
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$2, [
    createVNode(script$f, { msg: "Genres" }),
    _hoisted_2$2
  ]))
}
}

};

script$2.__scopeId = "data-v-2dd608d4";
script$2.__file = "src/apps/Monolith5_Genres/App.vue";

class HubsApp$2 extends HubsApp$f {
    constructor (width, height) {
        super(width, height, script$2);
        this.isInteractive = true;
    }
}

var init$2 = function () {
    let app = new HubsApp$2(300, 475);
    app.mount();
    return app
};

pushScopeId("data-v-4e8f2a26");
const _hoisted_1$1 = { id: "top" };
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
  expose: [],
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$1, [
    createVNode(script$f, { msg: "Future" }),
    _hoisted_2$1
  ]))
}
}

};

script$1.__scopeId = "data-v-4e8f2a26";
script$1.__file = "src/apps/Monolith6_Future/App.vue";

class HubsApp$1 extends HubsApp$f {
    constructor (width, height) {
        super(width, height, script$1);
        this.isInteractive = true;
    }
}

var init$1 = function () {
    let app = new HubsApp$1(300, 475);
    app.mount();
    return app
};

pushScopeId("data-v-ef14714c");
const _hoisted_1 = { id: "top" };
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
  expose: [],
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1, [
    createVNode(script$f, { msg: "Privacy" }),
    _hoisted_2
  ]))
}
}

};

script.__scopeId = "data-v-ef14714c";
script.__file = "src/apps/Monolith7_Privacy/App.vue";

class HubsApp extends HubsApp$f {
    constructor (width, height) {
        super(width, height, script);
        this.isInteractive = true;
    }
}

var init = function () {
    let app = new HubsApp(300, 475);
    app.mount();
    return app
};

export { init$d as Center1, init$c as Center2, init$b as Center3, init$a as Center4, init$9 as Center5, init$8 as Center6, init$7 as Center7, init$e as Map, init$6 as Monolith1, init$5 as Monolith2, init$4 as Monolith3, init$3 as Monolith4, init$2 as Monolith5, init$1 as Monolith6, init as Monolith7 };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHVicy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvcm90dW5kYS1tYXAucG5nIiwiLi4vLi4vc3JjL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyX01hcC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvSHVic0FwcC5qcyIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcl9NYXAvaHVicy5qcyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL2xhY2lvdGF0LVZSLmpwZyIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjFfSW50cm8vQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjFfSW50cm8vaHVicy5qcyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL2xhY2lvdGF0LmpwZyIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjJfSGlzdG9yeS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyMl9IaXN0b3J5L2h1YnMuanMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy91bmNhbm55LmpwZyIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjNfM0QtVHJhY2tpbmcvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjNfM0QtVHJhY2tpbmcvaHVicy5qcyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL3BhcnRoZW5vbi5wbmciLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXI0X1ByZXNlbmNlL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXI0X1ByZXNlbmNlL2h1YnMuanMiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXI1X0dlbnJlcy9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyNV9HZW5yZXMvaHVicy5qcyIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjZfRnV0dXJlL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXI2X0Z1dHVyZS9odWJzLmpzIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyN19Qcml2YWN5L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXI3X1ByaXZhY3kvaHVicy5qcyIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoMV9JbnRyby9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGgxX0ludHJvL2h1YnMuanMiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDJfSGlzdG9yeS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGgyX0hpc3RvcnkvaHVicy5qcyIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoM18zRC1UcmFja2luZy9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGgzXzNELVRyYWNraW5nL2h1YnMuanMiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDRfUHJlc2VuY2UvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoNF9QcmVzZW5jZS9odWJzLmpzIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGg1X0dlbnJlcy9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGg1X0dlbnJlcy9odWJzLmpzIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGg2X0Z1dHVyZS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGg2X0Z1dHVyZS9odWJzLmpzIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGg3X1ByaXZhY3kvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoN19Qcml2YWN5L2h1YnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL2pheS12dWUtYXBwcy5uZ3Jvay5pby92dWUtYXBwcy9kaXN0LzNlYWYwODU0ZDdkY2E0MTgucG5nXCIiLCI8dGVtcGxhdGU+XG4gIDxoMj57eyBtc2cgfX08L2gyPlxuXG4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgZGVmaW5lUHJvcHMsIHJlYWN0aXZlIH0gZnJvbSAndnVlJ1xuXG5kZWZpbmVQcm9wcyh7XG4gIG1zZzogU3RyaW5nXG59KVxuXG5jb25zdCBzdGF0ZSA9IHJlYWN0aXZlKHsgY291bnQ6IDAgfSlcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuYSB7XG4gIGNvbG9yOiAjNDJiOTgzO1xufVxuXG4qIHtcbiAgICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcbiAgICBsaW5lLWhlaWdodCA6IG5vcm1hbDtcbn1cblxucCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgbWFyZ2luLWJsb2NrLXN0YXJ0OiAxZW07XG4gICAgbWFyZ2luLWJsb2NrLWVuZDogMWVtO1xuICAgIG1hcmdpbi1pbmxpbmUtc3RhcnQ6IDBweDtcbiAgICBtYXJnaW4taW5saW5lLWVuZDogMHB4O1xufVxuXG5oMSB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgZm9udC1zaXplOiAyZW07XG4gICAgbWFyZ2luLWJsb2NrLXN0YXJ0OiAwLjY3ZW07XG4gICAgbWFyZ2luLWJsb2NrLWVuZDogMC42N2VtO1xuICAgIG1hcmdpbi1pbmxpbmUtc3RhcnQ6IDBweDtcbiAgICBtYXJnaW4taW5saW5lLWVuZDogMHB4O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG5idXR0b24ge1xuICAgIC8qIHdpZHRoOiAxMDBweDtcbiAgICBoZWlnaHQ6IDMwcHg7ICovXG4gICAgYXBwZWFyYW5jZTogYXV0bztcbiAgICAtd2Via2l0LXdyaXRpbmctbW9kZTogaG9yaXpvbnRhbC10YiAhaW1wb3J0YW50O1xuICAgIHRleHQtcmVuZGVyaW5nOiBhdXRvO1xuICAgIGNvbG9yOiAtaW50ZXJuYWwtbGlnaHQtZGFyayhibGFjaywgd2hpdGUpO1xuICAgIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XG4gICAgd29yZC1zcGFjaW5nOiBub3JtYWw7XG4gICAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gICAgdGV4dC1pbmRlbnQ6IDBweDtcbiAgICB0ZXh0LXNoYWRvdzogbm9uZTtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAtaW50ZXJuYWwtbGlnaHQtZGFyayhyZ2IoMjM5LCAyMzksIDIzOSksIHJnYig1OSwgNTksIDU5KSk7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBtYXJnaW46IDBlbTtcbiAgICBmb250OiA0MDAgMTMuMzMzM3B4IEFyaWFsO1xuICAgIHBhZGRpbmc6IDFweCA2cHg7XG4gICAgYm9yZGVyLXdpZHRoOiAycHg7XG4gICAgYm9yZGVyLXN0eWxlOiBvdXRzZXQ7XG4gICAgYm9yZGVyLWNvbG9yOiAtaW50ZXJuYWwtbGlnaHQtZGFyayhyZ2IoMTE4LCAxMTgsIDExOCksIHJnYigxMzMsIDEzMywgMTMzKSk7XG4gICAgYm9yZGVyLWltYWdlOiBpbml0aWFsO1xuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbn1cblxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInRvcFwiPlxuICA8VGl0bGUgbXNnPVwiUmVhbGl0eSBNZWRpYVwiIC8+XG5cdDxpbWcgc3JjPVwiLi4vLi4vYXNzZXRzL2ltYWdlcy9yb3R1bmRhLW1hcC5wbmdcIiB3aWR0aD1cIjI1MFwiID5cblx0PGRpdiBjbGFzcz1cImRpc3BsYXl0ZXh0XCI+QVIgYWxsb3dzIHVzIHRvIGV4dGVuZCBvdXIgcGh5c2ljYWwgcmVhbGl0eTsgVlIgY3JlYXRlcyBmb3IgdXMgYSBkaWZmZXJlbnQgcmVhbGl0eS48L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IHtjcmVhdGVBcHB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IFdlYkxheWVyM0QgfSBmcm9tIFwiZXRoZXJlYWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHVic0FwcCB7XG4gICAgY29uc3RydWN0b3IgKEFwcCwgd2lkdGgsIGhlaWdodCwgY3JlYXRlT3B0aW9ucz17fSkge1xuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc05ldHdvcmtlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU3RhdGljID0gdHJ1ZTtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0XG4gICAgICAgIHRoaXMuc2l6ZSA9IHsgd2lkdGg6IHdpZHRoLzEwMDAsIGhlaWdodDogaGVpZ2h0LzEwMDB9XG4gICAgICAgIHRoaXMudGFrZU93bmVyc2hpcCA9IHRoaXMudGFrZU93bmVyc2hpcFByb3RvLmJpbmQodGhpcylcbiAgICAgICAgdGhpcy5zZXRTaGFyZWREYXRhID0gdGhpcy5zZXRTaGFyZWREYXRhUHJvdG8uYmluZCh0aGlzKVxuXG4gICAgICAgIHRoaXMuaGVhZERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgLy90aGlzLmhlYWREaXYuc2V0QXR0cmlidXRlKFwic3R5bGVcIixcIndpZHRoOiAxMDAlO2hlaWdodDogMTAwJTtcIilcblxuICAgICAgICB0aGlzLnZ1ZUFwcCA9IGNyZWF0ZUFwcChBcHAsIGNyZWF0ZU9wdGlvbnMpXG4gICAgfVxuXG4gICAgbW91bnQoKSB7XG4gICAgICAgIHRoaXMudnVlUm9vdCA9IHRoaXMudnVlQXBwLm1vdW50KHRoaXMuaGVhZERpdik7XG4gICAgICAgIHRoaXMudnVlUm9vdC4kZWwuc2V0QXR0cmlidXRlKFwic3R5bGVcIixcIndpZHRoOiBcIiArIHRoaXMud2lkdGggKyBcInB4OyBoZWlnaHQ6IFwiICsgdGhpcy5oZWlnaHQgKyBcInB4O1wiKVxuXG4gICAgICAgIC8vIC8vIGFkZCBhIGxpbmsgdG8gdGhlIHNoYXJlZCBjc3NcbiAgICAgICAgbGV0IGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKVxuICAgICAgICBsLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0L2h1YnMuY3NzXCIpXG4gICAgICAgIGwuc2V0QXR0cmlidXRlKFwicmVsXCIsIFwic3R5bGVzaGVldFwiKVxuICAgICAgICBsLnNldEF0dHJpYnV0ZShcImNyb3Nzb3JpZ2luXCIsXCJhbm9ueW1vdXNcIilcbiAgICAgICAgdGhpcy52dWVSb290LiRlbC5pbnNlcnRCZWZvcmUobCwgdGhpcy52dWVSb290LiRlbC5maXJzdENoaWxkKVxuXG4gICAgICAgIHRoaXMud2ViTGF5ZXIzRCA9IG5ldyBXZWJMYXllcjNEKHRoaXMudnVlUm9vdC4kZWwsIHtcbiAgICAgICAgICAgIGF1dG9SZWZyZXNoOiB0cnVlLFxuICAgICAgICAgICAgb25MYXllckNyZWF0ZTogKGxheWVyKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gbm90aGluZyB5ZXRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkFmdGVyUmFzdGVyaXplKGxheWVyKSB7XG4gICAgICAgICAgICAgICAgICAgLy8gbm90aGluZyB5ZXRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZXh0dXJlRW5jb2Rpbmc6IFRIUkVFLnNSR0JFbmNvZGluZyxcbiAgICAgICAgICAgIHJlbmRlck9yZGVyT2Zmc2V0OiAwICAvLyAtMTAwMFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zb2xlLmxvZyhcInNpemU6IFwiLCB0aGlzLnNpemUpXG5cbiAgICAgICAgaWYgKHRoaXMuaXNJbnRlcmFjdGl2ZSkge1xuICAgICAgICAgICAgLy8gZm9yIGludGVyYWN0aW9uXG4gICAgICAgICAgICB0aGlzLnJheWNhc3RlciA9IG5ldyBUSFJFRS5SYXljYXN0ZXIoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0TmV0d29ya01ldGhvZHModGFrZU93bmVyc2hpcCwgc2V0U2hhcmVkRGF0YSkge1xuICAgICAgICB0aGlzLnRha2VPd25lcnNoaXAgPSB0YWtlT3duZXJzaGlwO1xuICAgICAgICB0aGlzLnNldFNoYXJlZERhdGEgPSBzZXRTaGFyZWREYXRhO1xuICAgIH1cblxuICAgIC8vIGR1bW15IGZ1bmN0aW9ucywganVzdCB0byBhdm9pZCBlcnJvcnMgaWYgdGhleSBnZXQgY2FsbGVkIGJlZm9yZVxuICAgIC8vIG5ldHdvcmtpbmcgaXMgaW5pdGlhbGl6ZWQsIG9yIGNhbGxlZCB3aGVuIG5ldHdvcmtlZCBpcyBmYWxzZVxuICAgIHRha2VPd25lcnNoaXBQcm90bygpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHNldFNoYXJlZERhdGFQcm90byhvYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gcmVjZWl2ZSBkYXRhIHVwZGF0ZXMuICBzaG91bGQgYmUgb3ZlcnJpZGRlbiBieSBzdWJjbGFzc2VzXG4gICAgdXBkYXRlU2hhcmVkRGF0YShkYXRhT2JqZWN0KSB7XG4gICAgICAgIHJhaXNlKFwidXBkYXRlRGF0YSBzaG91bGQgYmUgb3ZlcnJpZGRlbiBieSBzdWJjbGFzc2VzXCIpXG4gICAgfVxuXG4gICAgZ2V0U2l6ZSgpIHtcbiAgICAgICAgLy8gaWYgKCF0aGlzLmNvbXBTdHlsZXMpIHtcbiAgICAgICAgLy8gICAgIHRoaXMuY29tcFN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMudnVlUm9vdC4kZWwpO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIHZhciB3aWR0aCA9IHRoaXMuY29tcFN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKCd3aWR0aCcpXG4gICAgICAgIC8vIHdpZHRoID0gd2lkdGggJiYgd2lkdGgubGVuZ3RoID4gMCA/IHBhcnNlRmxvYXQod2lkdGgpIC8gMTAwMDogMVxuICAgICAgICAvLyB2YXIgaGVpZ2h0ID0gdGhpcy5jb21wU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ2hlaWdodCcpXG4gICAgICAgIC8vIGhlaWdodCA9IGhlaWdodCAmJiBoZWlnaHQubGVuZ3RoID4gMCA/IHBhcnNlRmxvYXQoaGVpZ2h0KSAvIDEwMDA6IDFcbiAgICAgICAgLy8gdGhpcy5zaXplID0geyB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0fVxuICAgICAgICBjb25zb2xlLmxvZyAoXCJkaXYgc2l6ZToge1wiICsgdGhpcy5zaXplLndpZHRoICsgXCIsIFwiICsgdGhpcy5zaXplLmhlaWdodCArIFwifVwiKVxuICAgICAgICByZXR1cm4gdGhpcy5zaXplXG4gICAgfVxuXG4gICAgLy8gcmVjZWl2ZSBkYXRhIHVwZGF0ZXMuICBzaG91bGQgYmUgb3ZlcnJpZGRlbiBieSBzdWJjbGFzc2VzXG4gICAgZ2V0U2hhcmVkRGF0YShkYXRhT2JqZWN0KSB7XG4gICAgICAgIHJhaXNlKFwiZ2V0U2hhcmVkRGF0YSBzaG91bGQgYmUgb3ZlcnJpZGRlbiBieSBzdWJjbGFzc2VzXCIpXG4gICAgfVxuICAgIFxuICAgIC8vIG92ZXJyaWRlIHRvIGNoZWNrIGZvciB5b3VyIG93biAzRCBvYmplY3RzIHRoYXQgYXJlbid0IHdlYkxheWVyc1xuICAgIGNsaWNrZWQoZXZ0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc0ludGVyYWN0aXZlKSB7IHJldHVybiB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBvYmogPSBldnQub2JqZWN0M0RcbiAgICAgICAgdGhpcy5yYXljYXN0ZXIucmF5LnNldChvYmoucG9zaXRpb24sIFxuICAgICAgICAgICAgdGhpcy53ZWJMYXllcjNELmdldFdvcmxkRGlyZWN0aW9uKG5ldyBUSFJFRS5WZWN0b3IzKCkpLm5lZ2F0ZSgpKVxuICAgICAgICBjb25zdCBoaXQgPSB0aGlzLndlYkxheWVyM0QuaGl0VGVzdCh0aGlzLnJheWNhc3Rlci5yYXkpXG4gICAgICAgIGlmIChoaXQpIHtcbiAgICAgICAgICBoaXQudGFyZ2V0LmNsaWNrKClcbiAgICAgICAgICBoaXQudGFyZ2V0LmZvY3VzKClcbiAgICAgICAgICBjb25zb2xlLmxvZygnaGl0JywgaGl0LnRhcmdldCwgaGl0LmxheWVyKVxuICAgICAgICB9ICAgXG4gICAgfVxuXG4gICAgZHJhZ1N0YXJ0KGV2dCkge1xuICAgICAgICAvLyBub3RoaW5nIGhlcmUgLi4uIHN1YmNsYXNzIHNob3VsZCBvdmVycmlkZVxuICAgIH1cblxuICAgIGRyYWdFbmQgKGV2dCkge1xuICAgICAgICAvLyBub3RoaW5nIGhlcmUgLi4uIHN1YmNsYXNzIHNob3VsZCBvdmVycmlkZVxuICAgIH1cblxuICAgIHBsYXkoKSB7XG4gICAgICAgIC8vIGlmIHdlIGNhbiBmaWd1cmUgb3V0IGhvdyB0byBwYXVzZSwgdGhlbiByZXN0YXJ0IGhlcmVcbiAgICB9XG5cbiAgICBwYXVzZSgpIHtcbiAgICAgICAgLy8gcGVyaGFwcyBmaWd1cmUgb3V0IGhvdyB0byBwYXVzZSB0aGUgVnVlIGNvbXBvbmVudD9cbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICAvLyBUT0RPOiBkZXN0cm95IHRoZSB2dWUgY29tcG9uZW50IGFuZCBhbnkgcmVzb3VyY2VzLCBldGMuLCBpdCBoYXNcbiAgICB9XG59IiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9qYXktdnVlLWFwcHMubmdyb2suaW8vdnVlLWFwcHMvZGlzdC81NTljZTVhZTlhZmNjZjYzLmpwZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwidG9wXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPFRpdGxlIG1zZz1cIkFSICYgVlIgYXMgcmVhbGl0eSBtZWRpYVwiIC8+XG5cdDxpbWcgc3JjPVwiLi4vLi4vYXNzZXRzL2ltYWdlcy9sYWNpb3RhdC1WUi5qcGdcIiB3aWR0aD1cIjI1MFwiID5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPiBFYWNoIHJlYWxpdHkgbWVkaXVtIG1lZGlhdGVzIGFuZCByZW1lZGlhdGVzLiBJdCBvZmZlcnMgYSBuZXcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHdvcmxkIHRoYXQgd2UgaW1wbGljaXRseSBjb21wYXJlIFxuXHRcdHRvIG91ciBleHBlcmllbmNlIG9mIHRoZSB3b3JsZCBpbiBpdHNlbGYsIGJ1dCBhbHNvIHRocm91Z2ggb3RoZXIgbWVkaWEuPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0KVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1KVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL2pheS12dWUtYXBwcy5uZ3Jvay5pby92dWUtYXBwcy9kaXN0LzRhZjY1NjMxMWM2MDliOTAuanBnXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJ0b3BcIj5cbiAgICA8VGl0bGUgbXNnPVwiVGhlIExhQ2lvdGF0IEVmZmVjdFwiIC8+XG4gICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuXHQgIDxpbWcgc3JjPVwiLi4vLi4vYXNzZXRzL2ltYWdlcy9sYWNpb3RhdC5qcGdcIiB3aWR0aD1cIjI1MFwiPlxuXHQgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5GaWxtIGJlY2FtZSBvbmUgb2YgdGhlIG1vc3QgaW1wb3J0YW50IHJlYWxpdHkgXG4gICAgICBtZWRpYSBvZiB0aGUgdHdlbnRpZXRoIGNlbnR1cnksIGFuZCBpbiBzb21lIHdheXMsIGl0IGlzIGEgZm9yZXJ1bm5lciBcbiAgICAgIG9mIHZpcnR1YWwgcmVhbGl0eS48L2Rpdj4gIFxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT4gIFxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKHdpZHRoLCBoZWlnaHQsIEFwcClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9qYXktdnVlLWFwcHMubmdyb2suaW8vdnVlLWFwcHMvZGlzdC8xNzVhYTAyZDJmMjU4MzljLmpwZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwidG9wXCI+XG4gICAgPFRpdGxlIG1zZz1cIjMtRCBHcmFwaGljcyAmIFRyYWNraW5nXCIgLz5cblx0PGRpdiBjbGFzcz1cInNwYWNlclwiPlxuXHQ8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWFnZXMvdW5jYW5ueS5qcGdcIiB3aWR0aD1cIjIwMFwiPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+My1EIGNvbXB1dGVyIGdyYXBoaWNzIGhlbHAgdG8gY29uc3RydWN0IHRoZSB2aXN1YWwgXG5cdFx0cmVhbGl0aWVzIG9mIEFSIGFuZCBWUiwgdGhhdCBpcyBwaG90b3JlYWxpc20uIFRoZSB1bmNhbm55IHZhbGxleS48L2Rpdj5cblx0PC9kaXY+XG5cdDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vamF5LXZ1ZS1hcHBzLm5ncm9rLmlvL3Z1ZS1hcHBzL2Rpc3QvZGMwNWMwNDU0NmE2OWU2NC5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInRvcFwiPlxuICAgIDxUaXRsZSBtc2c9XCJQcmVzZW5jZVwiIC8+XG5cdCAgPGRpdiBjbGFzcz1cInNwYWNlclwiPiBcblx0ICA8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWFnZXMvcGFydGhlbm9uLnBuZ1wiIHdpZHRoPVwiMjUwXCI+XG5cdCAgPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlByZXNlbmNlIGluIFZSIGlzIHVzdWFsbHkgY29uY2VpdmVkIG9mIGFzIGZvcmdldHRpbmcgdGhhdCB0aGUgbWVkaXVtIGlzIHRoZXJlLiBUaGUgaWRlYSBpcyB0aGF0IGlmIHRoZSB1c2VyIGNhbiBiZSBlbnRpY2VkIGludG8gYmVoYXZpbmcgYXMgaWYgc2hlIHdlcmUgbm90IGF3YXJlIG9mIGFsbCB0aGUgY29tcGxleCB0ZWNobm9sb2d5LCB0aGVuIHNoZSBmZWVscyBwcmVzZW5jZS48L2Rpdj4gIFxuICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIod2lkdGgsIGhlaWdodCwgQXBwKVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1KVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwidG9wXCI+XG4gICAgPFRpdGxlIG1zZz1cIkdlbnJlc1wiIC8+XG4gICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPiBcblx0ICA8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWFnZXMvcGFydGhlbm9uLnBuZ1wiIHdpZHRoPVwiMjUwXCI+XG5cdCAgPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlJlYWxpdHkgbWVkaWEgYXBwbGljYXRpb25zIG9mdGVuIGZ1bmN0aW9uIGFzIGFkZGl0aW9ucyB0byBlc3RhYmxpc2hlZCBnZW5yZXMuIE1vc3QgY3VycmVudCBBUiBhbmQgVlIgYXBwbGljYXRpb25zIGJlaGF2ZSBsaWtlIGFwcGxpY2F0aW9ucyBvciBhcnRpZmFjdHMgdGhhdCB3ZSBrbm93IGZyb20gZWFybGllciBtZWRpYS48L2Rpdj4gIFxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcih3aWR0aCwgaGVpZ2h0LCBBcHApXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJ0b3BcIj5cbiAgICA8VGl0bGUgbXNnPVwiVGhlIEZ1dHVyZSBvZiBBUiAmIFZSXCIgLz5cbiAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG5cdCAgPGltZyBzcmM9XCIuLi8uLi9hc3NldHMvaW1hZ2VzL3BhcnRoZW5vbi5wbmdcIiB3aWR0aD1cIjI1MFwiPlxuXHQgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5WUiB3aWxsIGNvbnRpbnVlIHRvIGNvbnN0cnVjdCBzcGVjaWFsIHJlYWxpdGllcywgYXBhcnQgZnJvbSB0aGUgZXZlcnlkYXkuIFZSIHdvcmxkcyB3aWxsIGNvbnRpbnVlIHRvIGJlIG1ldGFwaG9yaWMgd29ybGRzLjwvZGl2PiAgXG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKHdpZHRoLCBoZWlnaHQsIEFwcClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInRvcFwiPlxuICAgIDxUaXRsZSBtc2c9XCJQcml2YWN5IGFuZCBQdWJsaWMgU3BhY2VcIiAvPlxuICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cblx0ICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+UGVydmFzaXZlLCBhbHdheXMtb24gQVIgYXBwbGljYXRpb25zIGhhdmUgdGhlIHBvdGVudGlhbCB0byBwcm92aWRlIGNvbXBhbmllcyBvciBnb3Zlcm5tZW50IGF1dGhvcml0aWVzIFxuICAgICAgZXZlbiBtb3JlIGluZm9ybWF0aW9uIGFuZCB3aXRoIG1vcmUgcHJlY2lzaW9uIHRoYW4gb3VyIGN1cnJlbnQgbW9iaWxlIGFwcGxpY2F0aW9ucyBkbywgXG4gICAgICBib3RoIGJ5IGFnZ3JlZ2F0aW5nIG91ciBoYWJpdHMgYXMgY29uc3VtZXJzIGFuZCBieSBpZGVudGlmeWluZyB1cyBhcyBpbmRpdmlkdWFscy48L2Rpdj4gIFxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcih3aWR0aCwgaGVpZ2h0LCBBcHApXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJ0b3BcIj5cbiAgICBcbiAgICA8VGl0bGUgbXNnPVwiQVIgJiBWUiBhcyByZWFsaXR5IG1lZGlhXCIgLz5cbiAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZmx1c2hsZWZ0XCI+XG4gICAgICA8YnI+XG4gICAgICA8aDM+IFNvbWUgb2YgdGhlIGtleSBkaWZmZXJlbmNlcyBiZXR3ZWVuIOKAnGNsYXNzaWPigJ0gVlIgYW5kIEFSPC9oMz5cbiAgICAgIDxicj5cbiAgICAgIDxoMz4gRXh0ZW5kZWQgcmVhbGl0eSAoWFIpIGFuZCB0aGUgaW1tZXJzaXZlIHdlYiA8L2gzPlxuICAgICAgPGJyPlxuICAgICAgPGgzPiBXaGVyZSBBUiBhbmQgVlIgZml0IG9uIE1pbGdyYW0gYW5kIEtpc2hpbm/igJlzIHZpcnR1YWxpdHkgY29udGludXVtPC9oMz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLHdpZHRoLCBoZWlnaHQpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJ0b3BcIj5cbiAgICA8VGl0bGUgbXNnPVwiVGhlIEhpc3Rvcnkgb2YgUmVhbGl0eSBNZWRpYVwiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbHVzaGxlZnRcIj5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFNvbWUgb2YgdGhlIGtleSBkaWZmZXJlbmNlcyBiZXR3ZWVuIOKAnGNsYXNzaWPigJ0gVlIgYW5kIEFSPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IEV4dGVuZGVkIHJlYWxpdHkgKFhSKSBhbmQgdGhlIGltbWVyc2l2ZSB3ZWIgPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFdoZXJlIEFSIGFuZCBWUiBmaXQgb24gTWlsZ3JhbSBhbmQgS2lzaGlub+KAmXMgdmlydHVhbGl0eSBjb250aW51dW08L2gzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PiBcbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKHdpZHRoLCBoZWlnaHQsIEFwcClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInRvcFwiPlxuICAgIDxUaXRsZSBtc2c9XCIzLUQgJiBUcmFja2luZ1wiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbHVzaGxlZnRcIj5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFNvbWUgb2YgdGhlIGtleSBkaWZmZXJlbmNlcyBiZXR3ZWVuIOKAnGNsYXNzaWPigJ0gVlIgYW5kIEFSPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IEV4dGVuZGVkIHJlYWxpdHkgKFhSKSBhbmQgdGhlIGltbWVyc2l2ZSB3ZWIgPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFdoZXJlIEFSIGFuZCBWUiBmaXQgb24gTWlsZ3JhbSBhbmQgS2lzaGlub+KAmXMgdmlydHVhbGl0eSBjb250aW51dW08L2gzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PiAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKHdpZHRoLCBoZWlnaHQsIEFwcClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInRvcFwiPlxuICAgIDxUaXRsZSBtc2c9XCJQcmVzZW5jZVwiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbHVzaGxlZnRcIj5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFNvbWUgb2YgdGhlIGtleSBkaWZmZXJlbmNlcyBiZXR3ZWVuIOKAnGNsYXNzaWPigJ0gVlIgYW5kIEFSPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IEV4dGVuZGVkIHJlYWxpdHkgKFhSKSBhbmQgdGhlIGltbWVyc2l2ZSB3ZWIgPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFdoZXJlIEFSIGFuZCBWUiBmaXQgb24gTWlsZ3JhbSBhbmQgS2lzaGlub+KAmXMgdmlydHVhbGl0eSBjb250aW51dW08L2gzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PiAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKHdpZHRoLCBoZWlnaHQsIEFwcClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInRvcFwiPlxuICAgIDxUaXRsZSBtc2c9XCJHZW5yZXNcIiAvPlxuICAgICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmx1c2hsZWZ0XCI+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBTb21lIG9mIHRoZSBrZXkgZGlmZmVyZW5jZXMgYmV0d2VlbiDigJxjbGFzc2lj4oCdIFZSIGFuZCBBUjwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBFeHRlbmRlZCByZWFsaXR5IChYUikgYW5kIHRoZSBpbW1lcnNpdmUgd2ViIDwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBXaGVyZSBBUiBhbmQgVlIgZml0IG9uIE1pbGdyYW0gYW5kIEtpc2hpbm/igJlzIHZpcnR1YWxpdHkgY29udGludXVtPC9oMz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj4gICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcih3aWR0aCwgaGVpZ2h0LCBBcHApXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJ0b3BcIj5cbiAgICA8VGl0bGUgbXNnPVwiRnV0dXJlXCIgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsdXNobGVmdFwiPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gU29tZSBvZiB0aGUga2V5IGRpZmZlcmVuY2VzIGJldHdlZW4g4oCcY2xhc3NpY+KAnSBWUiBhbmQgQVI8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gRXh0ZW5kZWQgcmVhbGl0eSAoWFIpIGFuZCB0aGUgaW1tZXJzaXZlIHdlYiA8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gV2hlcmUgQVIgYW5kIFZSIGZpdCBvbiBNaWxncmFtIGFuZCBLaXNoaW5v4oCZcyB2aXJ0dWFsaXR5IGNvbnRpbnV1bTwvaDM+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+ICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIod2lkdGgsIGhlaWdodCwgQXBwKVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1KVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwidG9wXCI+XG4gICAgPFRpdGxlIG1zZz1cIlByaXZhY3lcIiAvPlxuICAgICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmx1c2hsZWZ0XCI+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBTb21lIG9mIHRoZSBrZXkgZGlmZmVyZW5jZXMgYmV0d2VlbiDigJxjbGFzc2lj4oCdIFZSIGFuZCBBUjwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBFeHRlbmRlZCByZWFsaXR5IChYUikgYW5kIHRoZSBpbW1lcnNpdmUgd2ViIDwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBXaGVyZSBBUiBhbmQgVlIgZml0IG9uIE1pbGdyYW0gYW5kIEtpc2hpbm/igJlzIHZpcnR1YWxpdHkgY29udGludXVtPC9oMz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj4gICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcih3aWR0aCwgaGVpZ2h0LCBBcHApXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiXSwibmFtZXMiOlsiSHVic0FwcCIsIldlYkxheWVyM0QiLCJIdWJzQXBwUHJvdG8iLCJBcHAiLCJpbml0Il0sIm1hcHBpbmdzIjoiOztBQUFBLG1CQUFlOzs7Ozs7OztBQ01EO0FBS1o7QUFDRjtBQUNjLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTHRCOzs7Ozs7Ozs7Ozs7Ozs7O0FDTEMsTUFBTUEsU0FBTyxDQUFDO0FBQzdCLElBQUksV0FBVyxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLEVBQUUsRUFBRTtBQUN2RCxRQUFRLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO0FBQ25DLFFBQVEsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7QUFDakMsUUFBUSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztBQUM3QixRQUFRLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBSztBQUMxQixRQUFRLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTTtBQUM1QixRQUFRLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBQztBQUM3RCxRQUFRLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUM7QUFDL0QsUUFBUSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDO0FBQy9EO0FBQ0EsUUFBUSxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFDO0FBQ3BEO0FBQ0E7QUFDQSxRQUFRLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLEdBQUcsRUFBRSxhQUFhLEVBQUM7QUFDbkQsS0FBSztBQUNMO0FBQ0EsSUFBSSxLQUFLLEdBQUc7QUFDWixRQUFRLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3ZELFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFjLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLEVBQUM7QUFDNUc7QUFDQTtBQUNBLFFBQVEsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUM7QUFDOUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxzREFBK0QsRUFBQztBQUMvRixRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBQztBQUMzQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBQztBQUNqRCxRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFDO0FBQ3JFO0FBQ0EsUUFBUSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUlDLEVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUMzRCxZQUFZLFdBQVcsRUFBRSxJQUFJO0FBQzdCLFlBQVksYUFBYSxFQUFFLENBQUMsS0FBSyxLQUFLO0FBQ3RDO0FBQ0EsYUFBYTtBQUNiLFlBQVksZ0JBQWdCLENBQUMsS0FBSyxFQUFFO0FBQ3BDO0FBQ0EsYUFBYTtBQUNiLFlBQVksZUFBZSxFQUFFLEtBQUssQ0FBQyxZQUFZO0FBQy9DLFlBQVksaUJBQWlCLEVBQUUsQ0FBQztBQUNoQyxTQUFTLENBQUMsQ0FBQztBQUNYO0FBQ0EsUUFBUSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFDO0FBQ3hDO0FBQ0EsUUFBUSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7QUFDaEM7QUFDQSxZQUFZLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxLQUFLLENBQUMsU0FBUyxHQUFFO0FBQ2xELFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQSxJQUFJLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxhQUFhLEVBQUU7QUFDcEQsUUFBUSxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztBQUMzQyxRQUFRLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0FBQzNDLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxJQUFJLGtCQUFrQixHQUFHO0FBQ3pCLFFBQVEsT0FBTyxJQUFJLENBQUM7QUFDcEIsS0FBSztBQUNMLElBQUksa0JBQWtCLENBQUMsTUFBTSxFQUFFO0FBQy9CLFFBQVEsT0FBTyxJQUFJLENBQUM7QUFDcEIsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJLGdCQUFnQixDQUFDLFVBQVUsRUFBRTtBQUNqQyxRQUFRLEtBQUssQ0FBQywrQ0FBK0MsRUFBQztBQUM5RCxLQUFLO0FBQ0w7QUFDQSxJQUFJLE9BQU8sR0FBRztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLE9BQU8sQ0FBQyxHQUFHLEVBQUUsYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUM7QUFDckYsUUFBUSxPQUFPLElBQUksQ0FBQyxJQUFJO0FBQ3hCLEtBQUs7QUFDTDtBQUNBO0FBQ0EsSUFBSSxhQUFhLENBQUMsVUFBVSxFQUFFO0FBQzlCLFFBQVEsS0FBSyxDQUFDLGtEQUFrRCxFQUFDO0FBQ2pFLEtBQUs7QUFDTDtBQUNBO0FBQ0EsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFO0FBQ2pCLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRSxNQUFNLEVBQUU7QUFDM0M7QUFDQSxRQUFRLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxTQUFRO0FBQ2hDLFFBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRO0FBQzNDLFlBQVksSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFDO0FBQzVFLFFBQVEsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUM7QUFDL0QsUUFBUSxJQUFJLEdBQUcsRUFBRTtBQUNqQixVQUFVLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFFO0FBQzVCLFVBQVUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUU7QUFDNUIsVUFBVSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQUM7QUFDbkQsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBLElBQUksU0FBUyxDQUFDLEdBQUcsRUFBRTtBQUNuQjtBQUNBLEtBQUs7QUFDTDtBQUNBLElBQUksT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFO0FBQ2xCO0FBQ0EsS0FBSztBQUNMO0FBQ0EsSUFBSSxJQUFJLEdBQUc7QUFDWDtBQUNBLEtBQUs7QUFDTDtBQUNBLElBQUksS0FBSyxHQUFHO0FBQ1o7QUFDQSxLQUFLO0FBQ0w7QUFDQSxJQUFJLE9BQU8sR0FBRztBQUNkO0FBQ0EsS0FBSztBQUNMOztBQ3ZIQSxNQUFNRCxTQUFPLFNBQVNFLFNBQVksQ0FBQztBQUNuQyxJQUFJLFdBQVcsQ0FBQyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUU7QUFDaEMsUUFBUSxLQUFLLENBQUNDLFFBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDO0FBQ2pDLFFBQVEsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7QUFDbEMsS0FBSztBQUNMLENBQUM7QUFDRDtBQUNHLElBQUNDLE1BQUksR0FBRyxZQUFZO0FBQ3ZCLElBQUksSUFBSSxHQUFHLEdBQUcsSUFBSUosU0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUM7QUFDbkMsSUFBSSxHQUFHLENBQUMsS0FBSyxHQUFFO0FBQ2YsSUFBSSxPQUFPLEdBQUc7QUFDZDs7QUNkQSxtQkFBZTs7Ozs7Ozs7Ozs7Ozs7O0FDV0Q7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1JkLE1BQU1BLFNBQU8sU0FBU0UsU0FBWSxDQUFDO0FBQ25DLElBQUksV0FBVyxDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRTtBQUNoQyxRQUFRLEtBQUssQ0FBQ0MsUUFBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUM7QUFDakMsUUFBUSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztBQUNsQyxLQUFLO0FBQ0wsQ0FBQztBQUNEO0FBQ0csSUFBQ0MsTUFBSSxHQUFHLFlBQVk7QUFDdkIsSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJSixTQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBQztBQUNuQyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEdBQUU7QUFDZixJQUFJLE9BQU8sR0FBRztBQUNkOztBQ2RBLG1CQUFlOzs7Ozs7Ozs7Ozs7Ozs7O0FDWUQ7Ozs7Ozs7Ozs7Ozs7OztBQ1RkLE1BQU1BLFNBQU8sU0FBU0UsU0FBWSxDQUFDO0FBQ25DLElBQUksV0FBVyxDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRTtBQUNoQyxRQUFRLEtBQUssQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFQyxRQUFHLEVBQUM7QUFDakMsUUFBUSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztBQUNsQyxLQUFLO0FBQ0wsQ0FBQztBQUNEO0FBQ0csSUFBQ0MsTUFBSSxHQUFHLFlBQVk7QUFDdkIsSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJSixTQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBQztBQUNuQyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEdBQUU7QUFDZixJQUFJLE9BQU8sR0FBRztBQUNkOztBQ2RBLG1CQUFlOzs7Ozs7Ozs7Ozs7Ozs7O0FDWUQ7Ozs7Ozs7Ozs7Ozs7OztBQ1RkLE1BQU1BLFNBQU8sU0FBU0UsU0FBWSxDQUFDO0FBQ25DLElBQUksV0FBVyxDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRTtBQUNoQyxRQUFRLEtBQUssQ0FBQ0MsUUFBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUM7QUFDakMsUUFBUSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztBQUNsQyxLQUFLO0FBQ0wsQ0FBQztBQUNEO0FBQ0csSUFBQ0MsTUFBSSxHQUFHLFlBQVk7QUFDdkIsSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJSixTQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBQztBQUNuQyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEdBQUU7QUFDZixJQUFJLE9BQU8sR0FBRztBQUNkOztBQ2RBLGlCQUFlOzs7Ozs7Ozs7Ozs7Ozs7O0FDVUQ7Ozs7Ozs7Ozs7Ozs7OztBQ1BkLE1BQU1BLFNBQU8sU0FBU0UsU0FBWSxDQUFDO0FBQ25DLElBQUksV0FBVyxDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRTtBQUNoQyxRQUFRLEtBQUssQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFQyxRQUFHLEVBQUM7QUFDakMsUUFBUSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztBQUNsQyxLQUFLO0FBQ0wsQ0FBQztBQUNEO0FBQ0csSUFBQ0MsTUFBSSxHQUFHLFlBQVk7QUFDdkIsSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJSixTQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBQztBQUNuQyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEdBQUU7QUFDZixJQUFJLE9BQU8sR0FBRztBQUNkOzs7Ozs7Ozs7Ozs7Ozs7O0FDSmM7Ozs7Ozs7Ozs7Ozs7OztBQ1BkLE1BQU1BLFNBQU8sU0FBU0UsU0FBWSxDQUFDO0FBQ25DLElBQUksV0FBVyxDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRTtBQUNoQyxRQUFRLEtBQUssQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFQyxRQUFHLEVBQUM7QUFDakMsUUFBUSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztBQUNsQyxLQUFLO0FBQ0wsQ0FBQztBQUNEO0FBQ0csSUFBQ0MsTUFBSSxHQUFHLFlBQVk7QUFDdkIsSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJSixTQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBQztBQUNuQyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEdBQUU7QUFDZixJQUFJLE9BQU8sR0FBRztBQUNkOzs7Ozs7Ozs7Ozs7Ozs7O0FDSmM7Ozs7Ozs7Ozs7Ozs7OztBQ1BkLE1BQU1BLFNBQU8sU0FBU0UsU0FBWSxDQUFDO0FBQ25DLElBQUksV0FBVyxDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRTtBQUNoQyxRQUFRLEtBQUssQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFQyxRQUFHLEVBQUM7QUFDakMsUUFBUSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztBQUNsQyxLQUFLO0FBQ0wsQ0FBQztBQUNEO0FBQ0csSUFBQ0MsTUFBSSxHQUFHLFlBQVk7QUFDdkIsSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJSixTQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBQztBQUNuQyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEdBQUU7QUFDZixJQUFJLE9BQU8sR0FBRztBQUNkOzs7Ozs7Ozs7Ozs7QUNIYzs7Ozs7Ozs7Ozs7Ozs7O0FDUmQsTUFBTUEsU0FBTyxTQUFTRSxTQUFZLENBQUM7QUFDbkMsSUFBSSxXQUFXLENBQUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFO0FBQ2hDLFFBQVEsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUVDLFFBQUcsRUFBQztBQUNqQyxRQUFRLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBQ2xDLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDRyxJQUFDQyxNQUFJLEdBQUcsWUFBWTtBQUN2QixJQUFJLElBQUksR0FBRyxHQUFHLElBQUlKLFNBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFDO0FBQ25DLElBQUksR0FBRyxDQUFDLEtBQUssR0FBRTtBQUNmLElBQUksT0FBTyxHQUFHO0FBQ2Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNHYzs7Ozs7Ozs7Ozs7Ozs7O0FDZGQsTUFBTUEsU0FBTyxTQUFTRSxTQUFZLENBQUM7QUFDbkMsSUFBSSxXQUFXLENBQUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFO0FBQ2hDLFFBQVEsS0FBSyxDQUFDQyxRQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBQztBQUNoQyxRQUFRLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBQ2xDLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDRyxJQUFDQyxNQUFJLEdBQUcsWUFBWTtBQUN2QixJQUFJLElBQUksR0FBRyxHQUFHLElBQUlKLFNBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFDO0FBQ25DLElBQUksR0FBRyxDQUFDLEtBQUssR0FBRTtBQUNmLElBQUksT0FBTyxHQUFHO0FBQ2Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNHYzs7Ozs7Ozs7Ozs7Ozs7O0FDZGQsTUFBTUEsU0FBTyxTQUFTRSxTQUFZLENBQUM7QUFDbkMsSUFBSSxXQUFXLENBQUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFO0FBQ2hDLFFBQVEsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUVDLFFBQUcsRUFBQztBQUNqQyxRQUFRLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBQ2xDLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDRyxJQUFDQyxNQUFJLEdBQUcsWUFBWTtBQUN2QixJQUFJLElBQUksR0FBRyxHQUFHLElBQUlKLFNBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFDO0FBQ25DLElBQUksR0FBRyxDQUFDLEtBQUssR0FBRTtBQUNmLElBQUksT0FBTyxHQUFHO0FBQ2Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNDYzs7Ozs7Ozs7Ozs7Ozs7O0FDWmQsTUFBTUEsU0FBTyxTQUFTRSxTQUFZLENBQUM7QUFDbkMsSUFBSSxXQUFXLENBQUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFO0FBQ2hDLFFBQVEsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUVDLFFBQUcsRUFBQztBQUNqQyxRQUFRLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBQ2xDLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDRyxJQUFDQyxNQUFJLEdBQUcsWUFBWTtBQUN2QixJQUFJLElBQUksR0FBRyxHQUFHLElBQUlKLFNBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFDO0FBQ25DLElBQUksR0FBRyxDQUFDLEtBQUssR0FBRTtBQUNmLElBQUksT0FBTyxHQUFHO0FBQ2Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNDYzs7Ozs7Ozs7Ozs7Ozs7O0FDWmQsTUFBTUEsU0FBTyxTQUFTRSxTQUFZLENBQUM7QUFDbkMsSUFBSSxXQUFXLENBQUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFO0FBQ2hDLFFBQVEsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUVDLFFBQUcsRUFBQztBQUNqQyxRQUFRLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBQ2xDLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDRyxJQUFDQyxNQUFJLEdBQUcsWUFBWTtBQUN2QixJQUFJLElBQUksR0FBRyxHQUFHLElBQUlKLFNBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFDO0FBQ25DLElBQUksR0FBRyxDQUFDLEtBQUssR0FBRTtBQUNmLElBQUksT0FBTyxHQUFHO0FBQ2Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNDYzs7Ozs7Ozs7Ozs7Ozs7O0FDWmQsTUFBTUEsU0FBTyxTQUFTRSxTQUFZLENBQUM7QUFDbkMsSUFBSSxXQUFXLENBQUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFO0FBQ2hDLFFBQVEsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUVDLFFBQUcsRUFBQztBQUNqQyxRQUFRLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBQ2xDLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDRyxJQUFDQyxNQUFJLEdBQUcsWUFBWTtBQUN2QixJQUFJLElBQUksR0FBRyxHQUFHLElBQUlKLFNBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFDO0FBQ25DLElBQUksR0FBRyxDQUFDLEtBQUssR0FBRTtBQUNmLElBQUksT0FBTyxHQUFHO0FBQ2Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNDYzs7Ozs7Ozs7Ozs7Ozs7O0FDWmQsTUFBTUEsU0FBTyxTQUFTRSxTQUFZLENBQUM7QUFDbkMsSUFBSSxXQUFXLENBQUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFO0FBQ2hDLFFBQVEsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUVDLFFBQUcsRUFBQztBQUNqQyxRQUFRLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBQ2xDLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDRyxJQUFDQyxNQUFJLEdBQUcsWUFBWTtBQUN2QixJQUFJLElBQUksR0FBRyxHQUFHLElBQUlKLFNBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFDO0FBQ25DLElBQUksR0FBRyxDQUFDLEtBQUssR0FBRTtBQUNmLElBQUksT0FBTyxHQUFHO0FBQ2Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNDYzs7Ozs7Ozs7Ozs7Ozs7O0FDWmQsTUFBTSxPQUFPLFNBQVNFLFNBQVksQ0FBQztBQUNuQyxJQUFJLFdBQVcsQ0FBQyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUU7QUFDaEMsUUFBUSxLQUFLLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRUMsTUFBRyxFQUFDO0FBQ2pDLFFBQVEsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7QUFDbEMsS0FBSztBQUNMLENBQUM7QUFDRDtBQUNHLElBQUMsSUFBSSxHQUFHLFlBQVk7QUFDdkIsSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFDO0FBQ25DLElBQUksR0FBRyxDQUFDLEtBQUssR0FBRTtBQUNmLElBQUksT0FBTyxHQUFHO0FBQ2Q7Ozs7In0=
