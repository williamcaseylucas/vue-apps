import { p as pushScopeId, a as popScopeId, o as openBlock, c as createBlock, b as createVNode, t as toDisplayString, u as unref, F as Fragment, i as inject, d as createApp, B as Bh, r as reactive, e as readonly, f as createTextVNode } from './vendor-e2aa8d32.js';

var _imports_0$5 = "https://jayhome.ngrok.io/vue-apps/dist/1a6ace377133f14a.png";

pushScopeId("data-v-36bd408d");
const _hoisted_1$9 = {
  "xr-layer": "",
  class: "fade"
};
const _hoisted_2$9 = /*#__PURE__*/createVNode("p", null, " Here's some more text just to make things not blank. ", -1 /* HOISTED */);
popScopeId();


var script$a = {
  expose: [],
  props: {
  msg: String
},
  setup(__props) {



const shared = inject('shared');

return (_ctx, _cache) => {
  return (openBlock(), createBlock(Fragment, null, [
    createVNode("h1", _hoisted_1$9, toDisplayString(__props.msg), 1 /* TEXT */),
    _hoisted_2$9,
    createVNode("button", {
      "xr-layer": "",
      onClick: _cache[1] || (_cache[1] = (...args) => (unref(shared).increment && unref(shared).increment(...args)))
    }, "count is: " + toDisplayString(unref(shared).state.count), 1 /* TEXT */)
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$a.__scopeId = "data-v-36bd408d";
script$a.__file = "src/components/NetworkedHelloWorld.vue";

pushScopeId("data-v-2e228cef");
const _hoisted_1$8 = { id: "top" };
const _hoisted_2$8 = /*#__PURE__*/createVNode("img", {
  alt: "Vue logo",
  src: _imports_0$5
}, null, -1 /* HOISTED */);
popScopeId();

var script$9 = {
  expose: [],
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$8, [
    _hoisted_2$8,
    createVNode(script$a, { msg: "Networked Vue Component with Shared Button Count" })
  ]))
}
}

};

script$9.__scopeId = "data-v-2e228cef";
script$9.__file = "src/apps/HubsTest1/App.vue";

class HubsApp$8 {
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
        l.setAttribute("href", "https://jayhome.ngrok.io/vue-apps/dist/hubs.css");
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

class HubsApp$7 extends HubsApp$8 {
    constructor () {
        super(script$9, 400, 475);

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
        this.shared.updateSharedData(dataObject);
    }

    getSharedData() {
        return this.shared.state;
    }
}

var init$7 = function () {
    let app = new HubsApp$7();
    app.mount();
    return app
};

pushScopeId("data-v-469af010");
const _hoisted_1$7 = /*#__PURE__*/createVNode("p", null, [
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
const _hoisted_2$7 = /*#__PURE__*/createVNode("p", null, [
  /*#__PURE__*/createTextVNode(" Edit "),
  /*#__PURE__*/createVNode("code", null, "components/HelloWorld.vue"),
  /*#__PURE__*/createTextVNode(" to test hot module replacement while running project as \"npm run dev\". ")
], -1 /* HOISTED */);
popScopeId();


var script$8 = {
  expose: [],
  props: {
  msg: String
},
  setup(__props) {



const state = reactive({ count: 0 });

return (_ctx, _cache) => {
  return (openBlock(), createBlock(Fragment, null, [
    createVNode("h1", null, toDisplayString(__props.msg), 1 /* TEXT */),
    _hoisted_1$7,
    createVNode("button", {
      "xr-layer": "",
      onClick: _cache[1] || (_cache[1] = $event => (unref(state).count++))
    }, "count is: " + toDisplayString(unref(state).count), 1 /* TEXT */),
    _hoisted_2$7
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$8.__scopeId = "data-v-469af010";
script$8.__file = "src/components/HelloWorld.vue";

pushScopeId("data-v-7b320820");
const _hoisted_1$6 = { id: "top" };
const _hoisted_2$6 = /*#__PURE__*/createVNode("img", {
  alt: "Vue logo",
  src: _imports_0$5
}, null, -1 /* HOISTED */);
popScopeId();

var script$7 = {
  expose: [],
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$6, [
    _hoisted_2$6,
    createVNode(script$8, { msg: "Vue Component with Local Button Count" })
  ]))
}
}

};

script$7.__scopeId = "data-v-7b320820";
script$7.__file = "src/apps/HubsTest2/App.vue";

class HubsApp$6 extends HubsApp$8 {
    constructor () {
        super(script$7, 500, 500);
        this.isInteractive = true;
    }
}

var init$6 = function () {
    let app = new HubsApp$6();
    app.mount();
    return app
};

var _imports_0$4 = "https://jayhome.ngrok.io/vue-apps/dist/175aa02d2f25839c.jpg";

var script$6 = {
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

script$6.__scopeId = "data-v-4679d783";
script$6.__file = "src/components/CenterTitle.vue";

pushScopeId("data-v-907f7f52");
const _hoisted_1$5 = { id: "top" };
const _hoisted_2$5 = /*#__PURE__*/createVNode("img", {
  src: _imports_0$4,
  width: "300"
}, null, -1 /* HOISTED */);
const _hoisted_3$5 = /*#__PURE__*/createVNode("div", { class: "displaytext" }, "3-D computer graphics help to construct the visual realities of AR and VR, in particular photorealism. The uncanny valley.", -1 /* HOISTED */);
popScopeId();

var script$5 = {
  expose: [],
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$5, [
    createVNode(script$6, { msg: "3-D Graphics and the Construction of Visual Reality" }),
    _hoisted_2$5,
    _hoisted_3$5
  ]))
}
}

};

script$5.__scopeId = "data-v-907f7f52";
script$5.__file = "src/apps/3D/App.vue";

class HubsApp$5 extends HubsApp$8 {
    constructor (width, height) {
        super(script$5, width, height);
        this.isInteractive = true;
    }
}

var init$5 = function () {
    let app = new HubsApp$5(300, 475);
    app.mount();
    return app
};

var _imports_0$3 = "https://jayhome.ngrok.io/vue-apps/dist/f745ec5bfeddf3d8.jpg";

pushScopeId("data-v-723058f4");
const _hoisted_1$4 = { id: "top" };
const _hoisted_2$4 = /*#__PURE__*/createVNode("img", {
  src: _imports_0$3,
  width: "300"
}, null, -1 /* HOISTED */);
const _hoisted_3$4 = /*#__PURE__*/createVNode("div", { class: "displaytext" }, "Some of the key differences between “classic” VR and AR. Extended reality (XR) and the immersive web. Where AR and VR fit on Milgram and Kishino’s virtuality continuum.", -1 /* HOISTED */);
popScopeId();

var script$4 = {
  expose: [],
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$4, [
    createVNode(script$6, { msg: "What are AR & VR" }),
    _hoisted_2$4,
    _hoisted_3$4
  ]))
}
}

};

script$4.__scopeId = "data-v-723058f4";
script$4.__file = "src/apps/AR-VR/App.vue";

class HubsApp$4 extends HubsApp$8 {
    constructor (width, height) {
        super(script$4,width, height);
        this.isInteractive = true;
    }
}

var init$4 = function () {
    let app = new HubsApp$4(300, 475);
    app.mount();
    return app
};

var _imports_0$2 = "https://jayhome.ngrok.io/vue-apps/dist/4af656311c609b90.jpg";

pushScopeId("data-v-a9ae49ec");
const _hoisted_1$3 = { id: "top" };
const _hoisted_2$3 = /*#__PURE__*/createVNode("img", {
  src: _imports_0$2,
  width: "300"
}, null, -1 /* HOISTED */);
const _hoisted_3$3 = /*#__PURE__*/createVNode("div", null, "Film became one of the most important reality media of the twentieth century, and in some ways, it is a forerunner of virtual reality.", -1 /* HOISTED */);
const _hoisted_4 = /*#__PURE__*/createVNode("div", { class: "displaytext" }, "AR allows us to extend our physical reality; VR creates for us a different reality.", -1 /* HOISTED */);
popScopeId();

var script$3 = {
  expose: [],
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$3, [
    createVNode(script$6, { msg: "The LaCiotat Effect" }),
    _hoisted_2$3,
    _hoisted_3$3,
    _hoisted_4
  ]))
}
}

};

script$3.__scopeId = "data-v-a9ae49ec";
script$3.__file = "src/apps/Center1/App.vue";

class HubsApp$3 extends HubsApp$8 {
    constructor (width, height) {
        super(script$3, width, height);
        this.isInteractive = true;
    }
}

var init$3 = function () {
    let app = new HubsApp$3(300, 475);
    app.mount();
    return app
};

pushScopeId("data-v-3f6d4a0b");
const _hoisted_1$2 = { id: "top" };
const _hoisted_2$2 = /*#__PURE__*/createVNode("img", {
  src: _imports_0$2,
  width: "300"
}, null, -1 /* HOISTED */);
const _hoisted_3$2 = /*#__PURE__*/createVNode("div", { class: "displaytext" }, "Film became one of the most important reality media of the twentieth century, and in some ways, it is a forerunner of virtual reality.", -1 /* HOISTED */);
popScopeId();

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md

var script$2 = {
  expose: [],
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$2, [
    createVNode(script$6, { msg: "The LaCiotat Effect" }),
    _hoisted_2$2,
    _hoisted_3$2
  ]))
}
}

};

script$2.__scopeId = "data-v-3f6d4a0b";
script$2.__file = "src/apps/Center2/App.vue";

class HubsApp$2 extends HubsApp$8 {
    constructor (width, height) {
        super(width, height, script$2);
        this.isInteractive = true;
    }
}

var init$2 = function () {
    let app = new HubsApp$2(2.5, 2.5);
    app.mount();
    return app
};

var _imports_0$1 = "https://jayhome.ngrok.io/vue-apps/dist/1512f6d41540cd79.jpg";

pushScopeId("data-v-20a66922");
const _hoisted_1$1 = { id: "top" };
const _hoisted_2$1 = /*#__PURE__*/createVNode("img", {
  src: _imports_0$1,
  width: "300"
}, null, -1 /* HOISTED */);
const _hoisted_3$1 = /*#__PURE__*/createVNode("div", { class: "displaytext" }, "Historically, each reality medium mediates and remediates. It offers a new representation of the world that we implicitly compare to our experience of the world in itself, but also through other media.", -1 /* HOISTED */);
popScopeId();

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md

var script$1 = {
  expose: [],
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$1, [
    createVNode(script$6, { msg: "The History of Reality Media" }),
    _hoisted_2$1,
    _hoisted_3$1
  ]))
}
}

};

script$1.__scopeId = "data-v-20a66922";
script$1.__file = "src/apps/History/App.vue";

class HubsApp$1 extends HubsApp$8 {
    constructor (width, height) {
        super(width, height, script$1);
        this.isInteractive = true;
    }
}

var init$1 = function () {
    let app = new HubsApp$1(2.5, 2.5);
    app.mount();
    return app
};

var _imports_0 = "https://jayhome.ngrok.io/vue-apps/dist/559ce5ae9afccf63.jpg";

pushScopeId("data-v-3cb6b80c");
const _hoisted_1 = { id: "top" };
const _hoisted_2 = /*#__PURE__*/createVNode("img", {
  src: _imports_0,
  width: "300"
}, null, -1 /* HOISTED */);
const _hoisted_3 = /*#__PURE__*/createVNode("div", { class: "displaytext" }, "Each reality medium mediates and remediates. It offers a new representation of the world that we implicitly compare to our experience of the world in itself, but also through other media.", -1 /* HOISTED */);
popScopeId();

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md

var script = {
  expose: [],
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1, [
    createVNode(script$6, { msg: "What Are Reality Media?" }),
    _hoisted_2,
    _hoisted_3
  ]))
}
}

};

script.__scopeId = "data-v-3cb6b80c";
script.__file = "src/apps/Intro/App.vue";

class HubsApp extends HubsApp$8 {
    constructor (width, height) {
        super(width, height, script);
        this.isInteractive = true;
    }
}

var init = function () {
    let app = new HubsApp(2.5, 2.5);
    app.mount();
    return app
};

export { init$4 as ARVR, init$3 as Center1, init$2 as Center2, init$1 as History, init as Intro, init$7 as hubsTest1, init$6 as hubsTest2, init$5 as my3D };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHVicy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Fzc2V0cy9sb2dvLnBuZyIsIi4uLy4uL3NyYy9jb21wb25lbnRzL05ldHdvcmtlZEhlbGxvV29ybGQudnVlIiwiLi4vLi4vc3JjL2FwcHMvSHVic1Rlc3QxL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9IdWJzQXBwLmpzIiwiLi4vLi4vc3JjL2FwcHMvSHVic1Rlc3QxL3NoYXJlZC5qcyIsIi4uLy4uL3NyYy9hcHBzL0h1YnNUZXN0MS9odWJzLmpzIiwiLi4vLi4vc3JjL2NvbXBvbmVudHMvSGVsbG9Xb3JsZC52dWUiLCIuLi8uLi9zcmMvYXBwcy9IdWJzVGVzdDIvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0h1YnNUZXN0Mi9odWJzLmpzIiwiLi4vLi4vc3JjL2Fzc2V0cy91bmNhbm55LmpwZyIsIi4uLy4uL3NyYy9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzLzNEL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy8zRC9odWJzLmpzIiwiLi4vLi4vc3JjL2Fzc2V0cy9taWxncmFtLmpwZyIsIi4uLy4uL3NyYy9hcHBzL0FSLVZSL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9BUi1WUi9odWJzLmpzIiwiLi4vLi4vc3JjL2Fzc2V0cy90cmFpbi5qcGciLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXIxL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXIxL2h1YnMuanMiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXIyL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXIyL2h1YnMuanMiLCIuLi8uLi9zcmMvYXNzZXRzL3Bhbm8uanBnIiwiLi4vLi4vc3JjL2FwcHMvSGlzdG9yeS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvSGlzdG9yeS9odWJzLmpzIiwiLi4vLi4vc3JjL2Fzc2V0cy9sYWNpb3RhdC5qcGciLCIuLi8uLi9zcmMvYXBwcy9JbnRyby9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvSW50cm8vaHVicy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vamF5aG9tZS5uZ3Jvay5pby92dWUtYXBwcy9kaXN0LzFhNmFjZTM3NzEzM2YxNGEucG5nXCIiLCI8dGVtcGxhdGU+XG4gIDxoMSB4ci1sYXllciBjbGFzcz1cImZhZGVcIj57eyBtc2cgfX08L2gxPlxuICA8cD5cbiAgICBIZXJlJ3Mgc29tZSBtb3JlIHRleHQganVzdCB0byBtYWtlIHRoaW5ncyBub3QgYmxhbmsuXG4gIDwvcD5cblxuICA8YnV0dG9uIHhyLWxheWVyIEBjbGljaz1cInNoYXJlZC5pbmNyZW1lbnRcIj5jb3VudCBpczoge3sgc2hhcmVkLnN0YXRlLmNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgZGVmaW5lUHJvcHMsIGluamVjdCB9IGZyb20gJ3Z1ZSdcblxuZGVmaW5lUHJvcHMoe1xuICBtc2c6IFN0cmluZ1xufSlcblxuY29uc3Qgc2hhcmVkID0gaW5qZWN0KCdzaGFyZWQnKVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5hIHtcbiAgY29sb3I6ICNiNTQyYjk7XG59XG5cbi5mYWRlIHtcbiAgY29sb3I6ICM5ODAzYTU7XG4gIC8qIHRyYW5zaXRpb246IGNvbG9yIDFzOyAqL1xufVxuXG4uZmFkZTpob3ZlciB7XG4gIGNvbG9yOiAjYTc4ZTA2O1xufVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInRvcFwiPlxuICAgICAgPGltZyBhbHQ9XCJWdWUgbG9nb1wiIHNyYz1cIi4uLy4uL2Fzc2V0cy9sb2dvLnBuZ1wiIC8+XG4gICAgICA8U29tZVRleHQgbXNnPVwiTmV0d29ya2VkIFZ1ZSBDb21wb25lbnQgd2l0aCBTaGFyZWQgQnV0dG9uIENvdW50XCIgLz5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFNvbWVUZXh0IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvTmV0d29ya2VkSGVsbG9Xb3JsZC52dWUnXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbjwvc3R5bGU+XG4iLCJpbXBvcnQge2NyZWF0ZUFwcH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgV2ViTGF5ZXIzRCB9IGZyb20gXCJldGhlcmVhbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWJzQXBwIHtcbiAgICBjb25zdHJ1Y3RvciAoQXBwLCB3aWR0aCwgaGVpZ2h0LCBjcmVhdGVPcHRpb25zPXt9KSB7XG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTmV0d29ya2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTdGF0aWMgPSB0cnVlO1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGhcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHRcbiAgICAgICAgdGhpcy5zaXplID0geyB3aWR0aDogd2lkdGgvMTAwMCwgaGVpZ2h0OiBoZWlnaHQvMTAwMH1cbiAgICAgICAgdGhpcy50YWtlT3duZXJzaGlwID0gdGhpcy50YWtlT3duZXJzaGlwUHJvdG8uYmluZCh0aGlzKVxuICAgICAgICB0aGlzLnNldFNoYXJlZERhdGEgPSB0aGlzLnNldFNoYXJlZERhdGFQcm90by5iaW5kKHRoaXMpXG5cbiAgICAgICAgdGhpcy5oZWFkRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgICAvL3RoaXMuaGVhZERpdi5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLFwid2lkdGg6IDEwMCU7aGVpZ2h0OiAxMDAlO1wiKVxuXG4gICAgICAgIHRoaXMudnVlQXBwID0gY3JlYXRlQXBwKEFwcCwgY3JlYXRlT3B0aW9ucylcbiAgICB9XG5cbiAgICBtb3VudCgpIHtcbiAgICAgICAgdGhpcy52dWVSb290ID0gdGhpcy52dWVBcHAubW91bnQodGhpcy5oZWFkRGl2KTtcbiAgICAgICAgdGhpcy52dWVSb290LiRlbC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLFwid2lkdGg6IFwiICsgdGhpcy53aWR0aCArIFwicHg7IGhlaWdodDogXCIgKyB0aGlzLmhlaWdodCArIFwicHg7XCIpXG5cbiAgICAgICAgLy8gLy8gYWRkIGEgbGluayB0byB0aGUgc2hhcmVkIGNzc1xuICAgICAgICBsZXQgbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpXG4gICAgICAgIGwuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvaHVicy5jc3NcIilcbiAgICAgICAgbC5zZXRBdHRyaWJ1dGUoXCJyZWxcIiwgXCJzdHlsZXNoZWV0XCIpXG4gICAgICAgIGwuc2V0QXR0cmlidXRlKFwiY3Jvc3NvcmlnaW5cIixcImFub255bW91c1wiKVxuICAgICAgICB0aGlzLnZ1ZVJvb3QuJGVsLmluc2VydEJlZm9yZShsLCB0aGlzLnZ1ZVJvb3QuJGVsLmZpcnN0Q2hpbGQpXG5cbiAgICAgICAgdGhpcy53ZWJMYXllcjNEID0gbmV3IFdlYkxheWVyM0QodGhpcy52dWVSb290LiRlbCwge1xuICAgICAgICAgICAgYXV0b1JlZnJlc2g6IHRydWUsXG4gICAgICAgICAgICBvbkxheWVyQ3JlYXRlOiAobGF5ZXIpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBub3RoaW5nIHlldFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uQWZ0ZXJSYXN0ZXJpemUobGF5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAvLyBub3RoaW5nIHlldFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRleHR1cmVFbmNvZGluZzogVEhSRUUuc1JHQkVuY29kaW5nLFxuICAgICAgICAgICAgcmVuZGVyT3JkZXJPZmZzZXQ6IDAgIC8vIC0xMDAwXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2l6ZTogXCIsIHRoaXMuc2l6ZSlcblxuICAgICAgICBpZiAodGhpcy5pc0ludGVyYWN0aXZlKSB7XG4gICAgICAgICAgICAvLyBmb3IgaW50ZXJhY3Rpb25cbiAgICAgICAgICAgIHRoaXMucmF5Y2FzdGVyID0gbmV3IFRIUkVFLlJheWNhc3RlcigpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXROZXR3b3JrTWV0aG9kcyh0YWtlT3duZXJzaGlwLCBzZXRTaGFyZWREYXRhKSB7XG4gICAgICAgIHRoaXMudGFrZU93bmVyc2hpcCA9IHRha2VPd25lcnNoaXA7XG4gICAgICAgIHRoaXMuc2V0U2hhcmVkRGF0YSA9IHNldFNoYXJlZERhdGE7XG4gICAgfVxuXG4gICAgLy8gZHVtbXkgZnVuY3Rpb25zLCBqdXN0IHRvIGF2b2lkIGVycm9ycyBpZiB0aGV5IGdldCBjYWxsZWQgYmVmb3JlXG4gICAgLy8gbmV0d29ya2luZyBpcyBpbml0aWFsaXplZCwgb3IgY2FsbGVkIHdoZW4gbmV0d29ya2VkIGlzIGZhbHNlXG4gICAgdGFrZU93bmVyc2hpcFByb3RvKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgc2V0U2hhcmVkRGF0YVByb3RvKG9iamVjdCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyByZWNlaXZlIGRhdGEgdXBkYXRlcy4gIHNob3VsZCBiZSBvdmVycmlkZGVuIGJ5IHN1YmNsYXNzZXNcbiAgICB1cGRhdGVTaGFyZWREYXRhKGRhdGFPYmplY3QpIHtcbiAgICAgICAgcmFpc2UoXCJ1cGRhdGVEYXRhIHNob3VsZCBiZSBvdmVycmlkZGVuIGJ5IHN1YmNsYXNzZXNcIilcbiAgICB9XG5cbiAgICBnZXRTaXplKCkge1xuICAgICAgICAvLyBpZiAoIXRoaXMuY29tcFN0eWxlcykge1xuICAgICAgICAvLyAgICAgdGhpcy5jb21wU3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy52dWVSb290LiRlbCk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gdmFyIHdpZHRoID0gdGhpcy5jb21wU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ3dpZHRoJylcbiAgICAgICAgLy8gd2lkdGggPSB3aWR0aCAmJiB3aWR0aC5sZW5ndGggPiAwID8gcGFyc2VGbG9hdCh3aWR0aCkgLyAxMDAwOiAxXG4gICAgICAgIC8vIHZhciBoZWlnaHQgPSB0aGlzLmNvbXBTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnaGVpZ2h0JylcbiAgICAgICAgLy8gaGVpZ2h0ID0gaGVpZ2h0ICYmIGhlaWdodC5sZW5ndGggPiAwID8gcGFyc2VGbG9hdChoZWlnaHQpIC8gMTAwMDogMVxuICAgICAgICAvLyB0aGlzLnNpemUgPSB7IHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHR9XG4gICAgICAgIGNvbnNvbGUubG9nIChcImRpdiBzaXplOiB7XCIgKyB0aGlzLnNpemUud2lkdGggKyBcIiwgXCIgKyB0aGlzLnNpemUuaGVpZ2h0ICsgXCJ9XCIpXG4gICAgICAgIHJldHVybiB0aGlzLnNpemVcbiAgICB9XG5cbiAgICAvLyByZWNlaXZlIGRhdGEgdXBkYXRlcy4gIHNob3VsZCBiZSBvdmVycmlkZGVuIGJ5IHN1YmNsYXNzZXNcbiAgICBnZXRTaGFyZWREYXRhKGRhdGFPYmplY3QpIHtcbiAgICAgICAgcmFpc2UoXCJnZXRTaGFyZWREYXRhIHNob3VsZCBiZSBvdmVycmlkZGVuIGJ5IHN1YmNsYXNzZXNcIilcbiAgICB9XG4gICAgXG4gICAgLy8gb3ZlcnJpZGUgdG8gY2hlY2sgZm9yIHlvdXIgb3duIDNEIG9iamVjdHMgdGhhdCBhcmVuJ3Qgd2ViTGF5ZXJzXG4gICAgY2xpY2tlZChldnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzSW50ZXJhY3RpdmUpIHsgcmV0dXJuIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG9iaiA9IGV2dC5vYmplY3QzRFxuICAgICAgICB0aGlzLnJheWNhc3Rlci5yYXkuc2V0KG9iai5wb3NpdGlvbiwgXG4gICAgICAgICAgICB0aGlzLndlYkxheWVyM0QuZ2V0V29ybGREaXJlY3Rpb24obmV3IFRIUkVFLlZlY3RvcjMoKSkubmVnYXRlKCkpXG4gICAgICAgIGNvbnN0IGhpdCA9IHRoaXMud2ViTGF5ZXIzRC5oaXRUZXN0KHRoaXMucmF5Y2FzdGVyLnJheSlcbiAgICAgICAgaWYgKGhpdCkge1xuICAgICAgICAgIGhpdC50YXJnZXQuY2xpY2soKVxuICAgICAgICAgIGhpdC50YXJnZXQuZm9jdXMoKVxuICAgICAgICAgIGNvbnNvbGUubG9nKCdoaXQnLCBoaXQudGFyZ2V0LCBoaXQubGF5ZXIpXG4gICAgICAgIH0gICBcbiAgICB9XG5cbiAgICBkcmFnU3RhcnQoZXZ0KSB7XG4gICAgICAgIC8vIG5vdGhpbmcgaGVyZSAuLi4gc3ViY2xhc3Mgc2hvdWxkIG92ZXJyaWRlXG4gICAgfVxuXG4gICAgZHJhZ0VuZCAoZXZ0KSB7XG4gICAgICAgIC8vIG5vdGhpbmcgaGVyZSAuLi4gc3ViY2xhc3Mgc2hvdWxkIG92ZXJyaWRlXG4gICAgfVxuXG4gICAgcGxheSgpIHtcbiAgICAgICAgLy8gaWYgd2UgY2FuIGZpZ3VyZSBvdXQgaG93IHRvIHBhdXNlLCB0aGVuIHJlc3RhcnQgaGVyZVxuICAgIH1cblxuICAgIHBhdXNlKCkge1xuICAgICAgICAvLyBwZXJoYXBzIGZpZ3VyZSBvdXQgaG93IHRvIHBhdXNlIHRoZSBWdWUgY29tcG9uZW50P1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIC8vIFRPRE86IGRlc3Ryb3kgdGhlIHZ1ZSBjb21wb25lbnQgYW5kIGFueSByZXNvdXJjZXMsIGV0Yy4sIGl0IGhhc1xuICAgIH1cbn0iLCJpbXBvcnQgeyByZWFjdGl2ZSwgaW5qZWN0LCByZWFkb25seSB9IGZyb20gXCJ2dWVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcmUge1xuICAgIGNvbnN0cnVjdG9yKGFwcCkge1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IHJlYWN0aXZlKHtcbiAgICAgICAgICAgIGNvdW50OiAwXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuYXBwID0gYXBwXG4gICAgICAgIHRoaXMuc3RhdGUgPSByZWFkb25seSh0aGlzLl9zdGF0ZSlcbiAgICB9ICAgIFxuXG4gICAgaW5jcmVtZW50KCkge1xuICAgICAgICBpZiAodGhpcy5hcHAudGFrZU93bmVyc2hpcCgpKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZS5jb3VudCsrO1xuICAgICAgICAgICAgdGhpcy5hcHAuc2V0U2hhcmVkRGF0YSh0aGlzLnN0YXRlKVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZVNoYXJlZERhdGEoZGF0YU9iamVjdCkge1xuICAgICAgICAvLyBuZWVkIHRvIHVwZGF0ZSB0aGUgZWxlbWVudHMgd2l0aGluIHRoZSBzdGF0ZSwgYmVjYXVzZSBvdGhlcndpc2VcbiAgICAgICAgLy8gdGhlIGRhdGEgd29uJ3QgZmxvdyB0byB0aGUgY29tcG9uZW50c1xuICAgICAgICB0aGlzLl9zdGF0ZS5jb3VudCA9IGRhdGFPYmplY3QuY291bnRcbiAgICB9XG59XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcbmltcG9ydCBTdG9yZSBmcm9tIFwiLi9zaGFyZWRcIlxuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHN1cGVyKEFwcCwgNDAwLCA0NzUpXG5cbiAgICAgICAgLy8gY3JlYXRlIG91ciBzaGFyZWQgZGF0YSBvYmplY3QgdGhhdCB3aWxsXG4gICAgICAgIC8vIHNoYXJlIGRhdGEgYmV0d2VlbiB2dWUgYW5kIGh1YnNcbiAgICAgICAgdGhpcy5zaGFyZWQgPSBuZXcgU3RvcmUodGhpcylcbiAgICAgICAgdGhpcy52dWVBcHAucHJvdmlkZSgnc2hhcmVkJywgdGhpcy5zaGFyZWQpXG5cbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc05ldHdvcmtlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNTdGF0aWMgPSBmYWxzZTtcblxuICAgICAgICBjb25zb2xlLmxvZyAoSlNPTi5zdHJpbmdpZnkodGhpcy5zaGFyZWQuZGF0YSkpXG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZVNoYXJlZERhdGEoZGF0YU9iamVjdCkge1xuICAgICAgICB0aGlzLnNoYXJlZC51cGRhdGVTaGFyZWREYXRhKGRhdGFPYmplY3QpXG4gICAgfVxuXG4gICAgZ2V0U2hhcmVkRGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkLnN0YXRlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKClcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdFxuIiwiPHRlbXBsYXRlPlxuICA8aDE+e3sgbXNnIH19PC9oMT5cblxuICA8cD5cbiAgICA8YSBocmVmPVwiaHR0cHM6Ly92aXRlanMuZGV2L2d1aWRlL2ZlYXR1cmVzLmh0bWxcIiB0YXJnZXQ9XCJfYmxhbmtcIj5cbiAgICAgIFZpdGUgRG9jdW1lbnRhdGlvbiBhbmQgVGhlbiBTb21lISBcbiAgICA8L2E+XG4gICAgfFxuICAgIDxhIGhyZWY9XCJodHRwczovL3YzLnZ1ZWpzLm9yZy9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5WdWUgMyBEb2N1bWVudGF0aW9uPC9hPlxuICA8L3A+XG5cbiAgPGJ1dHRvbiB4ci1sYXllciBAY2xpY2s9XCJzdGF0ZS5jb3VudCsrXCI+Y291bnQgaXM6IHt7IHN0YXRlLmNvdW50IH19PC9idXR0b24+XG4gIDxwPlxuICAgIEVkaXRcbiAgICA8Y29kZT5jb21wb25lbnRzL0hlbGxvV29ybGQudnVlPC9jb2RlPiB0byB0ZXN0IGhvdCBtb2R1bGUgcmVwbGFjZW1lbnQgd2hpbGUgcnVubmluZyBwcm9qZWN0IGFzIFwibnBtIHJ1biBkZXZcIi5cbiAgPC9wPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IGRlZmluZVByb3BzLCByZWFjdGl2ZSB9IGZyb20gJ3Z1ZSdcblxuZGVmaW5lUHJvcHMoe1xuICBtc2c6IFN0cmluZ1xufSlcblxuY29uc3Qgc3RhdGUgPSByZWFjdGl2ZSh7IGNvdW50OiAwIH0pXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJ0b3BcIj5cbiAgICAgIDxpbWcgYWx0PVwiVnVlIGxvZ29cIiBzcmM9XCIuLi8uLi9hc3NldHMvbG9nby5wbmdcIiAvPlxuICAgICAgPEhlbGxvV29ybGQgbXNnPVwiVnVlIENvbXBvbmVudCB3aXRoIExvY2FsIEJ1dHRvbiBDb3VudFwiIC8+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBIZWxsb1dvcmxkIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSGVsbG9Xb3JsZC52dWUnXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICBzdXBlcihBcHAsIDUwMCwgNTAwKVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKClcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9qYXlob21lLm5ncm9rLmlvL3Z1ZS1hcHBzL2Rpc3QvMTc1YWEwMmQyZjI1ODM5Yy5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGgyPnt7IG1zZyB9fTwvaDI+XG5cbiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBkZWZpbmVQcm9wcywgcmVhY3RpdmUgfSBmcm9tICd2dWUnXG5cbmRlZmluZVByb3BzKHtcbiAgbXNnOiBTdHJpbmdcbn0pXG5cbmNvbnN0IHN0YXRlID0gcmVhY3RpdmUoeyBjb3VudDogMCB9KVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5hIHtcbiAgY29sb3I6ICM0MmI5ODM7XG59XG5cbioge1xuICAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xuICAgIGxpbmUtaGVpZ2h0IDogbm9ybWFsO1xufVxuXG5wIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBtYXJnaW4tYmxvY2stc3RhcnQ6IDFlbTtcbiAgICBtYXJnaW4tYmxvY2stZW5kOiAxZW07XG4gICAgbWFyZ2luLWlubGluZS1zdGFydDogMHB4O1xuICAgIG1hcmdpbi1pbmxpbmUtZW5kOiAwcHg7XG59XG5cbmgxIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBmb250LXNpemU6IDJlbTtcbiAgICBtYXJnaW4tYmxvY2stc3RhcnQ6IDAuNjdlbTtcbiAgICBtYXJnaW4tYmxvY2stZW5kOiAwLjY3ZW07XG4gICAgbWFyZ2luLWlubGluZS1zdGFydDogMHB4O1xuICAgIG1hcmdpbi1pbmxpbmUtZW5kOiAwcHg7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbmJ1dHRvbiB7XG4gICAgLyogd2lkdGg6IDEwMHB4O1xuICAgIGhlaWdodDogMzBweDsgKi9cbiAgICBhcHBlYXJhbmNlOiBhdXRvO1xuICAgIC13ZWJraXQtd3JpdGluZy1tb2RlOiBob3Jpem9udGFsLXRiICFpbXBvcnRhbnQ7XG4gICAgdGV4dC1yZW5kZXJpbmc6IGF1dG87XG4gICAgY29sb3I6IC1pbnRlcm5hbC1saWdodC1kYXJrKGJsYWNrLCB3aGl0ZSk7XG4gICAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcbiAgICB3b3JkLXNwYWNpbmc6IG5vcm1hbDtcbiAgICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgICB0ZXh0LWluZGVudDogMHB4O1xuICAgIHRleHQtc2hhZG93OiBub25lO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgIGJhY2tncm91bmQtY29sb3I6IC1pbnRlcm5hbC1saWdodC1kYXJrKHJnYigyMzksIDIzOSwgMjM5KSwgcmdiKDU5LCA1OSwgNTkpKTtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIG1hcmdpbjogMGVtO1xuICAgIGZvbnQ6IDQwMCAxMy4zMzMzcHggQXJpYWw7XG4gICAgcGFkZGluZzogMXB4IDZweDtcbiAgICBib3JkZXItd2lkdGg6IDJweDtcbiAgICBib3JkZXItc3R5bGU6IG91dHNldDtcbiAgICBib3JkZXItY29sb3I6IC1pbnRlcm5hbC1saWdodC1kYXJrKHJnYigxMTgsIDExOCwgMTE4KSwgcmdiKDEzMywgMTMzLCAxMzMpKTtcbiAgICBib3JkZXItaW1hZ2U6IGluaXRpYWw7XG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xufVxuXG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwidG9wXCI+XG4gICAgPFRpdGxlIG1zZz1cIjMtRCBHcmFwaGljcyBhbmQgdGhlIENvbnN0cnVjdGlvbiBvZiBWaXN1YWwgUmVhbGl0eVwiLz5cblx0PGltZyBzcmM9XCIuLi8uLi9hc3NldHMvdW5jYW5ueS5qcGdcIiB3aWR0aD1cIjMwMFwiPlxuXHQ8ZGl2IGNsYXNzPVwiZGlzcGxheXRleHRcIj4zLUQgY29tcHV0ZXIgZ3JhcGhpY3MgaGVscCB0byBjb25zdHJ1Y3QgdGhlIHZpc3VhbCByZWFsaXRpZXMgb2YgQVIgYW5kIFZSLCBpbiBwYXJ0aWN1bGFyIHBob3RvcmVhbGlzbS4gVGhlIHVuY2FubnkgdmFsbGV5LjwvZGl2PlxuXHQ8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9qYXlob21lLm5ncm9rLmlvL3Z1ZS1hcHBzL2Rpc3QvZjc0NWVjNWJmZWRkZjNkOC5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInRvcFwiPlxuICAgIDxUaXRsZSBtc2c9XCJXaGF0IGFyZSBBUiAmIFZSXCIgLz5cbiAgICA8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9taWxncmFtLmpwZ1wiIHdpZHRoPVwiMzAwXCI+XG4gICAgPGRpdiBjbGFzcz1cImRpc3BsYXl0ZXh0XCIgPlNvbWUgb2YgdGhlIGtleSBkaWZmZXJlbmNlcyBiZXR3ZWVuIOKAnGNsYXNzaWPigJ0gVlIgYW5kIEFSLiBFeHRlbmRlZCByZWFsaXR5IChYUikgYW5kIHRoZSBpbW1lcnNpdmUgd2ViLiBXaGVyZSBBUiBhbmQgVlIgZml0IG9uIE1pbGdyYW0gYW5kIEtpc2hpbm/igJlzIHZpcnR1YWxpdHkgY29udGludXVtLjwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcihBcHAsd2lkdGgsIGhlaWdodClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9qYXlob21lLm5ncm9rLmlvL3Z1ZS1hcHBzL2Rpc3QvNGFmNjU2MzExYzYwOWI5MC5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInRvcFwiPlxuICA8VGl0bGUgbXNnPVwiVGhlIExhQ2lvdGF0IEVmZmVjdFwiIC8+XG5cdDxpbWcgc3JjPVwiLi4vLi4vYXNzZXRzL3RyYWluLmpwZ1wiIHdpZHRoPVwiMzAwXCIgPlxuXHQ8ZGl2PkZpbG0gYmVjYW1lIG9uZSBvZiB0aGUgbW9zdCBpbXBvcnRhbnQgcmVhbGl0eSBtZWRpYSBvZiBcblx0dGhlIHR3ZW50aWV0aCBjZW50dXJ5LCBhbmQgaW4gc29tZSB3YXlzLCBpdCBpcyBhIGZvcmVydW5uZXIgb2YgdmlydHVhbCByZWFsaXR5LjwvZGl2PlxuXHQgIDxkaXYgY2xhc3M9XCJkaXNwbGF5dGV4dFwiPkFSIGFsbG93cyB1cyB0byBleHRlbmQgb3VyIHBoeXNpY2FsIHJlYWxpdHk7IFZSIGNyZWF0ZXMgZm9yIHVzIGEgZGlmZmVyZW50IHJlYWxpdHkuPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInRvcFwiPlxuICAgIDxUaXRsZSBtc2c9XCJUaGUgTGFDaW90YXQgRWZmZWN0XCIgLz5cblx0ICA8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy90cmFpbi5qcGdcIiB3aWR0aD1cIjMwMFwiPlxuXHQgIDxkaXYgY2xhc3M9XCJkaXNwbGF5dGV4dFwiPkZpbG0gYmVjYW1lIG9uZSBvZiB0aGUgbW9zdCBpbXBvcnRhbnQgcmVhbGl0eSBtZWRpYSBvZiB0aGUgdHdlbnRpZXRoIGNlbnR1cnksIGFuZCBpbiBzb21lIHdheXMsIGl0IGlzIGEgZm9yZXJ1bm5lciBvZiB2aXJ0dWFsIHJlYWxpdHkuPC9kaXY+ICBcbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG4vLyBUaGlzIHN0YXJ0ZXIgdGVtcGxhdGUgaXMgdXNpbmcgVnVlIDMgZXhwZXJpbWVudGFsIDxzY3JpcHQgc2V0dXA+IFNGQ3Ncbi8vIENoZWNrIG91dCBodHRwczovL2dpdGh1Yi5jb20vdnVlanMvcmZjcy9ibG9iL3NjcmlwdC1zZXR1cC0yL2FjdGl2ZS1yZmNzLzAwMDAtc2NyaXB0LXNldHVwLm1kXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbiN0b3Age1xuICBmb250LWZhbWlseTogQXZlbmlyLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcbiAgdGV4dC1hbGlnbjoganVzdGlmeTtcbiAgY29sb3I6ICM1MDMxMmM7XG4gIG1hcmdpbi10b3A6IDMwcHg7XG5cbiAgd2lkdGg6IDMwMHB4OyBoZWlnaHQ6IDIwMHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG5cbiAgZGlzcGxheTogYmxvY2s7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xufVxuXG5cbioge1xuICAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xufVxuaW1nIHtcbiAgICBtYXgtd2lkdGg6IG5vbmU7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZTtcbn1cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIod2lkdGgsIGhlaWdodCwgQXBwKVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDIuNSwgMi41KVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL2pheWhvbWUubmdyb2suaW8vdnVlLWFwcHMvZGlzdC8xNTEyZjZkNDE1NDBjZDc5LmpwZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwidG9wXCI+XG4gICAgPFRpdGxlIG1zZz1cIlRoZSBIaXN0b3J5IG9mIFJlYWxpdHkgTWVkaWFcIiAvPlxuICAgIDxpbWcgc3JjPVwiLi4vLi4vYXNzZXRzL3Bhbm8uanBnXCIgd2lkdGg9XCIzMDBcIi8+XG4gICAgPGRpdiBjbGFzcz1cImRpc3BsYXl0ZXh0XCI+SGlzdG9yaWNhbGx5LCBlYWNoIHJlYWxpdHkgbWVkaXVtIG1lZGlhdGVzIGFuZCByZW1lZGlhdGVzLiBJdCBvZmZlcnMgYSBuZXcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHdvcmxkIHRoYXQgd2UgaW1wbGljaXRseSBjb21wYXJlIHRvIG91ciBleHBlcmllbmNlIG9mIHRoZSB3b3JsZCBpbiBpdHNlbGYsIGJ1dCBhbHNvIHRocm91Z2ggb3RoZXIgbWVkaWEuPC9kaXY+IFxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbi8vIFRoaXMgc3RhcnRlciB0ZW1wbGF0ZSBpcyB1c2luZyBWdWUgMyBleHBlcmltZW50YWwgPHNjcmlwdCBzZXR1cD4gU0ZDc1xuLy8gQ2hlY2sgb3V0IGh0dHBzOi8vZ2l0aHViLmNvbS92dWVqcy9yZmNzL2Jsb2Ivc2NyaXB0LXNldHVwLTIvYWN0aXZlLXJmY3MvMDAwMC1zY3JpcHQtc2V0dXAubWRcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuI3RvcCB7XG4gIGZvbnQtZmFtaWx5OiBBdmVuaXIsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7XG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xuICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xuICBjb2xvcjogIzUwMzEyYztcbiAgbWFyZ2luLXRvcDogMzBweDtcblxuICB3aWR0aDogMzAwcHg7IGhlaWdodDogMjAwcHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcblxuICBkaXNwbGF5OiBibG9jaztcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG5cblxuKiB7XG4gICAgYm94LXNpemluZzogY29udGVudC1ib3g7XG59XG5pbWcge1xuICAgIG1heC13aWR0aDogNDAwcHg7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZTtcbn1cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIod2lkdGgsIGhlaWdodCwgQXBwKVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDIuNSwgMi41KVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL2pheWhvbWUubmdyb2suaW8vdnVlLWFwcHMvZGlzdC81NTljZTVhZTlhZmNjZjYzLmpwZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwidG9wXCI+XG4gICAgPFRpdGxlIG1zZz1cIldoYXQgQXJlIFJlYWxpdHkgTWVkaWE/XCIgLz5cbiAgICA8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9sYWNpb3RhdC5qcGdcIiB3aWR0aD1cIjMwMFwiPlxuICAgIDxkaXYgY2xhc3M9XCJkaXNwbGF5dGV4dFwiPkVhY2ggcmVhbGl0eSBtZWRpdW0gbWVkaWF0ZXMgYW5kIHJlbWVkaWF0ZXMuIEl0IG9mZmVycyBhIG5ldyByZXByZXNlbnRhdGlvbiBvZiB0aGUgd29ybGQgdGhhdCB3ZSBpbXBsaWNpdGx5IGNvbXBhcmUgdG8gb3VyIGV4cGVyaWVuY2Ugb2YgdGhlIHdvcmxkIGluIGl0c2VsZiwgYnV0IGFsc28gdGhyb3VnaCBvdGhlciBtZWRpYS48L2Rpdj4gXG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuLy8gVGhpcyBzdGFydGVyIHRlbXBsYXRlIGlzIHVzaW5nIFZ1ZSAzIGV4cGVyaW1lbnRhbCA8c2NyaXB0IHNldHVwPiBTRkNzXG4vLyBDaGVjayBvdXQgaHR0cHM6Ly9naXRodWIuY29tL3Z1ZWpzL3JmY3MvYmxvYi9zY3JpcHQtc2V0dXAtMi9hY3RpdmUtcmZjcy8wMDAwLXNjcmlwdC1zZXR1cC5tZFxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG4jdG9wIHtcbiAgZm9udC1mYW1pbHk6IEF2ZW5pciwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XG4gIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XG4gIHRleHQtYWxpZ246IGp1c3RpZnk7XG4gIGNvbG9yOiAjNTAzMTJjO1xuICBtYXJnaW4tdG9wOiAzMHB4O1xuXG4gIHdpZHRoOiAzMDBweDsgaGVpZ2h0OiAyMDBweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuXG4gIGRpc3BsYXk6IGJsb2NrO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cblxuXG4qIHtcbiAgICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcbn1cbmltZyB7XG4gICAgbWF4LXdpZHRoOiBub25lO1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmU7XG59XG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKHdpZHRoLCBoZWlnaHQsIEFwcClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgyLjUsIDIuNSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCJdLCJuYW1lcyI6WyJIdWJzQXBwIiwiV2ViTGF5ZXIzRCIsIkh1YnNBcHBQcm90byIsIkFwcCIsImluaXQiXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQWU7Ozs7Ozs7OztBQ1dmOzs7Ozs7OztBQUZjO0FBS1o7QUFDRjtBQUNBLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1RqQjs7Ozs7Ozs7Ozs7Ozs7O0FDSkMsTUFBTUEsU0FBTyxDQUFDO0FBQzdCLElBQUksV0FBVyxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLEVBQUUsRUFBRTtBQUN2RCxRQUFRLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO0FBQ25DLFFBQVEsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7QUFDakMsUUFBUSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztBQUM3QixRQUFRLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBSztBQUMxQixRQUFRLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTTtBQUM1QixRQUFRLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBQztBQUM3RCxRQUFRLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUM7QUFDL0QsUUFBUSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDO0FBQy9EO0FBQ0EsUUFBUSxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFDO0FBQ3BEO0FBQ0E7QUFDQSxRQUFRLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLEdBQUcsRUFBRSxhQUFhLEVBQUM7QUFDbkQsS0FBSztBQUNMO0FBQ0EsSUFBSSxLQUFLLEdBQUc7QUFDWixRQUFRLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3ZELFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFjLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLEVBQUM7QUFDNUc7QUFDQTtBQUNBLFFBQVEsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUM7QUFDOUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxpREFBK0QsRUFBQztBQUMvRixRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBQztBQUMzQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBQztBQUNqRCxRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFDO0FBQ3JFO0FBQ0EsUUFBUSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUlDLEVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUMzRCxZQUFZLFdBQVcsRUFBRSxJQUFJO0FBQzdCLFlBQVksYUFBYSxFQUFFLENBQUMsS0FBSyxLQUFLO0FBQ3RDO0FBQ0EsYUFBYTtBQUNiLFlBQVksZ0JBQWdCLENBQUMsS0FBSyxFQUFFO0FBQ3BDO0FBQ0EsYUFBYTtBQUNiLFlBQVksZUFBZSxFQUFFLEtBQUssQ0FBQyxZQUFZO0FBQy9DLFlBQVksaUJBQWlCLEVBQUUsQ0FBQztBQUNoQyxTQUFTLENBQUMsQ0FBQztBQUNYO0FBQ0EsUUFBUSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFDO0FBQ3hDO0FBQ0EsUUFBUSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7QUFDaEM7QUFDQSxZQUFZLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxLQUFLLENBQUMsU0FBUyxHQUFFO0FBQ2xELFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQSxJQUFJLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxhQUFhLEVBQUU7QUFDcEQsUUFBUSxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztBQUMzQyxRQUFRLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0FBQzNDLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxJQUFJLGtCQUFrQixHQUFHO0FBQ3pCLFFBQVEsT0FBTyxJQUFJLENBQUM7QUFDcEIsS0FBSztBQUNMLElBQUksa0JBQWtCLENBQUMsTUFBTSxFQUFFO0FBQy9CLFFBQVEsT0FBTyxJQUFJLENBQUM7QUFDcEIsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJLGdCQUFnQixDQUFDLFVBQVUsRUFBRTtBQUNqQyxRQUFRLEtBQUssQ0FBQywrQ0FBK0MsRUFBQztBQUM5RCxLQUFLO0FBQ0w7QUFDQSxJQUFJLE9BQU8sR0FBRztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLE9BQU8sQ0FBQyxHQUFHLEVBQUUsYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUM7QUFDckYsUUFBUSxPQUFPLElBQUksQ0FBQyxJQUFJO0FBQ3hCLEtBQUs7QUFDTDtBQUNBO0FBQ0EsSUFBSSxhQUFhLENBQUMsVUFBVSxFQUFFO0FBQzlCLFFBQVEsS0FBSyxDQUFDLGtEQUFrRCxFQUFDO0FBQ2pFLEtBQUs7QUFDTDtBQUNBO0FBQ0EsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFO0FBQ2pCLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRSxNQUFNLEVBQUU7QUFDM0M7QUFDQSxRQUFRLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxTQUFRO0FBQ2hDLFFBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRO0FBQzNDLFlBQVksSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFDO0FBQzVFLFFBQVEsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUM7QUFDL0QsUUFBUSxJQUFJLEdBQUcsRUFBRTtBQUNqQixVQUFVLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFFO0FBQzVCLFVBQVUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUU7QUFDNUIsVUFBVSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQUM7QUFDbkQsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBLElBQUksU0FBUyxDQUFDLEdBQUcsRUFBRTtBQUNuQjtBQUNBLEtBQUs7QUFDTDtBQUNBLElBQUksT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFO0FBQ2xCO0FBQ0EsS0FBSztBQUNMO0FBQ0EsSUFBSSxJQUFJLEdBQUc7QUFDWDtBQUNBLEtBQUs7QUFDTDtBQUNBLElBQUksS0FBSyxHQUFHO0FBQ1o7QUFDQSxLQUFLO0FBQ0w7QUFDQSxJQUFJLE9BQU8sR0FBRztBQUNkO0FBQ0EsS0FBSztBQUNMOztBQ3hIZSxNQUFNLEtBQUssQ0FBQztBQUMzQixJQUFJLFdBQVcsQ0FBQyxHQUFHLEVBQUU7QUFDckIsUUFBUSxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztBQUMvQixZQUFZLEtBQUssRUFBRSxDQUFDO0FBQ3BCLFNBQVMsRUFBQztBQUNWLFFBQVEsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFHO0FBQ3RCLFFBQVEsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQztBQUMxQyxLQUFLO0FBQ0w7QUFDQSxJQUFJLFNBQVMsR0FBRztBQUNoQixRQUFRLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsRUFBRTtBQUN0QyxZQUFZLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDaEMsWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFDO0FBQzlDLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQSxJQUFJLGdCQUFnQixDQUFDLFVBQVUsRUFBRTtBQUNqQztBQUNBO0FBQ0EsUUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsTUFBSztBQUM1QyxLQUFLO0FBQ0w7O0FDbkJBLE1BQU1ELFNBQU8sU0FBU0UsU0FBWSxDQUFDO0FBQ25DLElBQUksV0FBVyxDQUFDLEdBQUc7QUFDbkIsUUFBUSxLQUFLLENBQUNDLFFBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFDO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLFFBQVEsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUM7QUFDckMsUUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBQztBQUNsRDtBQUNBLFFBQVEsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7QUFDbEMsUUFBUSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztBQUNoQyxRQUFRLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0FBQzlCO0FBQ0EsUUFBUSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQztBQUN0RCxLQUFLO0FBQ0w7QUFDQSxJQUFJLGdCQUFnQixDQUFDLFVBQVUsRUFBRTtBQUNqQyxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFDO0FBQ2hELEtBQUs7QUFDTDtBQUNBLElBQUksYUFBYSxHQUFHO0FBQ3BCLFFBQVEsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUNqQyxLQUFLO0FBQ0wsQ0FBQztBQUNEO0FBQ0csSUFBQ0MsTUFBSSxHQUFHLFlBQVk7QUFDdkIsSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJSixTQUFPLEdBQUU7QUFDM0IsSUFBSSxHQUFHLENBQUMsS0FBSyxHQUFFO0FBQ2YsSUFBSSxPQUFPLEdBQUc7QUFDZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiQTs7Ozs7Ozs7QUFGYztBQUtaO0FBQ0Y7QUFDQSxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQnRCOzs7Ozs7Ozs7Ozs7Ozs7QUNKZCxNQUFNQSxTQUFPLFNBQVNFLFNBQVksQ0FBQztBQUNuQyxJQUFJLFdBQVcsQ0FBQyxHQUFHO0FBQ25CLFFBQVEsS0FBSyxDQUFDQyxRQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBQztBQUM1QixRQUFRLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBQ2xDLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDRyxJQUFDQyxNQUFJLEdBQUcsWUFBWTtBQUN2QixJQUFJLElBQUksR0FBRyxHQUFHLElBQUlKLFNBQU8sR0FBRTtBQUMzQixJQUFJLEdBQUcsQ0FBQyxLQUFLLEdBQUU7QUFDZixJQUFJLE9BQU8sR0FBRztBQUNkOztBQ2RBLG1CQUFlOzs7Ozs7OztBQ01EO0FBS1o7QUFDRjtBQUNjLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTHRCOzs7Ozs7Ozs7Ozs7Ozs7O0FDTGQsTUFBTUEsU0FBTyxTQUFTRSxTQUFZLENBQUM7QUFDbkMsSUFBSSxXQUFXLENBQUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFO0FBQ2hDLFFBQVEsS0FBSyxDQUFDQyxRQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQztBQUNqQyxRQUFRLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBQ2xDLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDRyxJQUFDQyxNQUFJLEdBQUcsWUFBWTtBQUN2QixJQUFJLElBQUksR0FBRyxHQUFHLElBQUlKLFNBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFDO0FBQ25DLElBQUksR0FBRyxDQUFDLEtBQUssR0FBRTtBQUNmLElBQUksT0FBTyxHQUFHO0FBQ2Q7O0FDZEEsbUJBQWU7Ozs7Ozs7Ozs7Ozs7O0FDUUQ7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMZCxNQUFNQSxTQUFPLFNBQVNFLFNBQVksQ0FBQztBQUNuQyxJQUFJLFdBQVcsQ0FBQyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUU7QUFDaEMsUUFBUSxLQUFLLENBQUNDLFFBQUcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFDO0FBQ2hDLFFBQVEsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7QUFDbEMsS0FBSztBQUNMLENBQUM7QUFDRDtBQUNHLElBQUNDLE1BQUksR0FBRyxZQUFZO0FBQ3ZCLElBQUksSUFBSSxHQUFHLEdBQUcsSUFBSUosU0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUM7QUFDbkMsSUFBSSxHQUFHLENBQUMsS0FBSyxHQUFFO0FBQ2YsSUFBSSxPQUFPLEdBQUc7QUFDZDs7QUNkQSxtQkFBZTs7Ozs7Ozs7Ozs7Ozs7O0FDVUQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUGQsTUFBTUEsU0FBTyxTQUFTRSxTQUFZLENBQUM7QUFDbkMsSUFBSSxXQUFXLENBQUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFO0FBQ2hDLFFBQVEsS0FBSyxDQUFDQyxRQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQztBQUNqQyxRQUFRLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBQ2xDLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDRyxJQUFDQyxNQUFJLEdBQUcsWUFBWTtBQUN2QixJQUFJLElBQUksR0FBRyxHQUFHLElBQUlKLFNBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFDO0FBQ25DLElBQUksR0FBRyxDQUFDLEtBQUssR0FBRTtBQUNmLElBQUksT0FBTyxHQUFHO0FBQ2Q7Ozs7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7Ozs7O0FBSmM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMZCxNQUFNQSxTQUFPLFNBQVNFLFNBQVksQ0FBQztBQUNuQyxJQUFJLFdBQVcsQ0FBQyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUU7QUFDaEMsUUFBUSxLQUFLLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRUMsUUFBRyxFQUFDO0FBQ2pDLFFBQVEsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7QUFDbEMsS0FBSztBQUNMLENBQUM7QUFDRDtBQUNHLElBQUNDLE1BQUksR0FBRyxZQUFZO0FBQ3ZCLElBQUksSUFBSSxHQUFHLEdBQUcsSUFBSUosU0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUM7QUFDbkMsSUFBSSxHQUFHLENBQUMsS0FBSyxHQUFFO0FBQ2YsSUFBSSxPQUFPLEdBQUc7QUFDZDs7QUNkQSxtQkFBZTs7Ozs7Ozs7OztBQ1VmO0FBQ0E7QUFDQTs7Ozs7QUFKYzs7Ozs7Ozs7Ozs7Ozs7OztBQ0xkLE1BQU1BLFNBQU8sU0FBU0UsU0FBWSxDQUFDO0FBQ25DLElBQUksV0FBVyxDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRTtBQUNoQyxRQUFRLEtBQUssQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFQyxRQUFHLEVBQUM7QUFDakMsUUFBUSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztBQUNsQyxLQUFLO0FBQ0wsQ0FBQztBQUNEO0FBQ0csSUFBQ0MsTUFBSSxHQUFHLFlBQVk7QUFDdkIsSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJSixTQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBQztBQUNuQyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEdBQUU7QUFDZixJQUFJLE9BQU8sR0FBRztBQUNkOztBQ2RBLGlCQUFlOzs7Ozs7Ozs7O0FDVWY7QUFDQTtBQUNBOzs7OztBQUpjOzs7Ozs7Ozs7Ozs7Ozs7O0FDTGQsTUFBTSxPQUFPLFNBQVNFLFNBQVksQ0FBQztBQUNuQyxJQUFJLFdBQVcsQ0FBQyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUU7QUFDaEMsUUFBUSxLQUFLLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRUMsTUFBRyxFQUFDO0FBQ2pDLFFBQVEsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7QUFDbEMsS0FBSztBQUNMLENBQUM7QUFDRDtBQUNHLElBQUMsSUFBSSxHQUFHLFlBQVk7QUFDdkIsSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFDO0FBQ25DLElBQUksR0FBRyxDQUFDLEtBQUssR0FBRTtBQUNmLElBQUksT0FBTyxHQUFHO0FBQ2Q7Ozs7In0=
