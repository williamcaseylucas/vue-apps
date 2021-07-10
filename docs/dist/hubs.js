import { p as pushScopeId, a as popScopeId, o as openBlock, c as createBlock, b as createVNode, t as toDisplayString, u as unref, F as Fragment, i as inject, d as createApp, B as Bh, r as reactive, e as readonly, f as createTextVNode } from './vendor-e2aa8d32.js';

var _imports_0$5 = "https://jay-vue-apps.ngrok.io/vue-apps/dist/1a6ace377133f14a.png";

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

var _imports_0$4 = "https://jay-vue-apps.ngrok.io/vue-apps/dist/175aa02d2f25839c.jpg";

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
const _hoisted_2$5 = /*#__PURE__*/createVNode("h2", null, " 3-D Graphics and the Construction of Visual Reality", -1 /* HOISTED */);
const _hoisted_3$5 = /*#__PURE__*/createVNode("img", {
  src: _imports_0$4,
  width: "200"
}, null, -1 /* HOISTED */);
const _hoisted_4$1 = /*#__PURE__*/createVNode("div", { class: "displaytext" }, "3-D computer graphics help to construct the visual realities of AR and VR, in particular photorealism. The uncanny valley.", -1 /* HOISTED */);
popScopeId();

var script$5 = {
  expose: [],
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$5, [
    _hoisted_2$5,
    _hoisted_3$5,
    _hoisted_4$1
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

var _imports_0$3 = "https://jay-vue-apps.ngrok.io/vue-apps/dist/f745ec5bfeddf3d8.jpg";

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

var _imports_0$2 = "https://jay-vue-apps.ngrok.io/vue-apps/dist/4af656311c609b90.jpg";

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
    let app = new HubsApp$2(300, 475);
    app.mount();
    return app
};

var _imports_0$1 = "https://jay-vue-apps.ngrok.io/vue-apps/dist/1512f6d41540cd79.jpg";

pushScopeId("data-v-20a66922");
const _hoisted_1$1 = { id: "top" };
const _hoisted_2$1 = /*#__PURE__*/createVNode("img", {
  src: _imports_0$1,
  width: "300"
}, null, -1 /* HOISTED */);
const _hoisted_3$1 = /*#__PURE__*/createVNode("div", { class: "displaytext" }, "Historically, each reality medium mediates and remediates. It offers a new representation of the world that we implicitly compare to our experience of the world in itself, but also through other media.", -1 /* HOISTED */);
popScopeId();

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
    let app = new HubsApp$1(300, 475);
    app.mount();
    return app
};

var _imports_0 = "https://jay-vue-apps.ngrok.io/vue-apps/dist/559ce5ae9afccf63.jpg";

pushScopeId("data-v-3cb6b80c");
const _hoisted_1 = { id: "top" };
const _hoisted_2 = /*#__PURE__*/createVNode("img", {
  src: _imports_0,
  width: "300"
}, null, -1 /* HOISTED */);
const _hoisted_3 = /*#__PURE__*/createVNode("div", { class: "displaytext" }, "Each reality medium mediates and remediates. It offers a new representation of the world that we implicitly compare to our experience of the world in itself, but also through other media.", -1 /* HOISTED */);
popScopeId();

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
    let app = new HubsApp(300, 475);
    app.mount();
    return app
};

export { init$4 as ARVR, init$3 as Center1, init$2 as Center2, init$1 as History, init as Intro, init$7 as hubsTest1, init$6 as hubsTest2, init$5 as my3D };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHVicy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Fzc2V0cy9sb2dvLnBuZyIsIi4uLy4uL3NyYy9jb21wb25lbnRzL05ldHdvcmtlZEhlbGxvV29ybGQudnVlIiwiLi4vLi4vc3JjL2FwcHMvSHVic1Rlc3QxL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9IdWJzQXBwLmpzIiwiLi4vLi4vc3JjL2FwcHMvSHVic1Rlc3QxL3NoYXJlZC5qcyIsIi4uLy4uL3NyYy9hcHBzL0h1YnNUZXN0MS9odWJzLmpzIiwiLi4vLi4vc3JjL2NvbXBvbmVudHMvSGVsbG9Xb3JsZC52dWUiLCIuLi8uLi9zcmMvYXBwcy9IdWJzVGVzdDIvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0h1YnNUZXN0Mi9odWJzLmpzIiwiLi4vLi4vc3JjL2Fzc2V0cy91bmNhbm55LmpwZyIsIi4uLy4uL3NyYy9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzLzNEL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy8zRC9odWJzLmpzIiwiLi4vLi4vc3JjL2Fzc2V0cy9taWxncmFtLmpwZyIsIi4uLy4uL3NyYy9hcHBzL0FSLVZSL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9BUi1WUi9odWJzLmpzIiwiLi4vLi4vc3JjL2Fzc2V0cy90cmFpbi5qcGciLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXIxL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXIxL2h1YnMuanMiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXIyL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXIyL2h1YnMuanMiLCIuLi8uLi9zcmMvYXNzZXRzL3Bhbm8uanBnIiwiLi4vLi4vc3JjL2FwcHMvSGlzdG9yeS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvSGlzdG9yeS9odWJzLmpzIiwiLi4vLi4vc3JjL2Fzc2V0cy9sYWNpb3RhdC5qcGciLCIuLi8uLi9zcmMvYXBwcy9JbnRyby9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvSW50cm8vaHVicy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vamF5LXZ1ZS1hcHBzLm5ncm9rLmlvL3Z1ZS1hcHBzL2Rpc3QvMWE2YWNlMzc3MTMzZjE0YS5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGgxIHhyLWxheWVyIGNsYXNzPVwiZmFkZVwiPnt7IG1zZyB9fTwvaDE+XG4gIDxwPlxuICAgIEhlcmUncyBzb21lIG1vcmUgdGV4dCBqdXN0IHRvIG1ha2UgdGhpbmdzIG5vdCBibGFuay5cbiAgPC9wPlxuXG4gIDxidXR0b24geHItbGF5ZXIgQGNsaWNrPVwic2hhcmVkLmluY3JlbWVudFwiPmNvdW50IGlzOiB7eyBzaGFyZWQuc3RhdGUuY291bnQgfX08L2J1dHRvbj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBkZWZpbmVQcm9wcywgaW5qZWN0IH0gZnJvbSAndnVlJ1xuXG5kZWZpbmVQcm9wcyh7XG4gIG1zZzogU3RyaW5nXG59KVxuXG5jb25zdCBzaGFyZWQgPSBpbmplY3QoJ3NoYXJlZCcpXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbmEge1xuICBjb2xvcjogI2I1NDJiOTtcbn1cblxuLmZhZGUge1xuICBjb2xvcjogIzk4MDNhNTtcbiAgLyogdHJhbnNpdGlvbjogY29sb3IgMXM7ICovXG59XG5cbi5mYWRlOmhvdmVyIHtcbiAgY29sb3I6ICNhNzhlMDY7XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwidG9wXCI+XG4gICAgICA8aW1nIGFsdD1cIlZ1ZSBsb2dvXCIgc3JjPVwiLi4vLi4vYXNzZXRzL2xvZ28ucG5nXCIgLz5cbiAgICAgIDxTb21lVGV4dCBtc2c9XCJOZXR3b3JrZWQgVnVlIENvbXBvbmVudCB3aXRoIFNoYXJlZCBCdXR0b24gQ291bnRcIiAvPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgU29tZVRleHQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9OZXR3b3JrZWRIZWxsb1dvcmxkLnZ1ZSdcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuPC9zdHlsZT5cbiIsImltcG9ydCB7Y3JlYXRlQXBwfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyBXZWJMYXllcjNEIH0gZnJvbSBcImV0aGVyZWFsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh1YnNBcHAge1xuICAgIGNvbnN0cnVjdG9yIChBcHAsIHdpZHRoLCBoZWlnaHQsIGNyZWF0ZU9wdGlvbnM9e30pIHtcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNOZXR3b3JrZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1N0YXRpYyA9IHRydWU7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aFxuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodFxuICAgICAgICB0aGlzLnNpemUgPSB7IHdpZHRoOiB3aWR0aC8xMDAwLCBoZWlnaHQ6IGhlaWdodC8xMDAwfVxuICAgICAgICB0aGlzLnRha2VPd25lcnNoaXAgPSB0aGlzLnRha2VPd25lcnNoaXBQcm90by5iaW5kKHRoaXMpXG4gICAgICAgIHRoaXMuc2V0U2hhcmVkRGF0YSA9IHRoaXMuc2V0U2hhcmVkRGF0YVByb3RvLmJpbmQodGhpcylcblxuICAgICAgICB0aGlzLmhlYWREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICAgIC8vdGhpcy5oZWFkRGl2LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsXCJ3aWR0aDogMTAwJTtoZWlnaHQ6IDEwMCU7XCIpXG5cbiAgICAgICAgdGhpcy52dWVBcHAgPSBjcmVhdGVBcHAoQXBwLCBjcmVhdGVPcHRpb25zKVxuICAgIH1cblxuICAgIG1vdW50KCkge1xuICAgICAgICB0aGlzLnZ1ZVJvb3QgPSB0aGlzLnZ1ZUFwcC5tb3VudCh0aGlzLmhlYWREaXYpO1xuICAgICAgICB0aGlzLnZ1ZVJvb3QuJGVsLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsXCJ3aWR0aDogXCIgKyB0aGlzLndpZHRoICsgXCJweDsgaGVpZ2h0OiBcIiArIHRoaXMuaGVpZ2h0ICsgXCJweDtcIilcblxuICAgICAgICAvLyAvLyBhZGQgYSBsaW5rIHRvIHRoZSBzaGFyZWQgY3NzXG4gICAgICAgIGxldCBsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIilcbiAgICAgICAgbC5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC9odWJzLmNzc1wiKVxuICAgICAgICBsLnNldEF0dHJpYnV0ZShcInJlbFwiLCBcInN0eWxlc2hlZXRcIilcbiAgICAgICAgbC5zZXRBdHRyaWJ1dGUoXCJjcm9zc29yaWdpblwiLFwiYW5vbnltb3VzXCIpXG4gICAgICAgIHRoaXMudnVlUm9vdC4kZWwuaW5zZXJ0QmVmb3JlKGwsIHRoaXMudnVlUm9vdC4kZWwuZmlyc3RDaGlsZClcblxuICAgICAgICB0aGlzLndlYkxheWVyM0QgPSBuZXcgV2ViTGF5ZXIzRCh0aGlzLnZ1ZVJvb3QuJGVsLCB7XG4gICAgICAgICAgICBhdXRvUmVmcmVzaDogdHJ1ZSxcbiAgICAgICAgICAgIG9uTGF5ZXJDcmVhdGU6IChsYXllcikgPT4ge1xuICAgICAgICAgICAgICAgIC8vIG5vdGhpbmcgeWV0XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25BZnRlclJhc3Rlcml6ZShsYXllcikge1xuICAgICAgICAgICAgICAgICAgIC8vIG5vdGhpbmcgeWV0XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGV4dHVyZUVuY29kaW5nOiBUSFJFRS5zUkdCRW5jb2RpbmcsXG4gICAgICAgICAgICByZW5kZXJPcmRlck9mZnNldDogMCAgLy8gLTEwMDBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJzaXplOiBcIiwgdGhpcy5zaXplKVxuXG4gICAgICAgIGlmICh0aGlzLmlzSW50ZXJhY3RpdmUpIHtcbiAgICAgICAgICAgIC8vIGZvciBpbnRlcmFjdGlvblxuICAgICAgICAgICAgdGhpcy5yYXljYXN0ZXIgPSBuZXcgVEhSRUUuUmF5Y2FzdGVyKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldE5ldHdvcmtNZXRob2RzKHRha2VPd25lcnNoaXAsIHNldFNoYXJlZERhdGEpIHtcbiAgICAgICAgdGhpcy50YWtlT3duZXJzaGlwID0gdGFrZU93bmVyc2hpcDtcbiAgICAgICAgdGhpcy5zZXRTaGFyZWREYXRhID0gc2V0U2hhcmVkRGF0YTtcbiAgICB9XG5cbiAgICAvLyBkdW1teSBmdW5jdGlvbnMsIGp1c3QgdG8gYXZvaWQgZXJyb3JzIGlmIHRoZXkgZ2V0IGNhbGxlZCBiZWZvcmVcbiAgICAvLyBuZXR3b3JraW5nIGlzIGluaXRpYWxpemVkLCBvciBjYWxsZWQgd2hlbiBuZXR3b3JrZWQgaXMgZmFsc2VcbiAgICB0YWtlT3duZXJzaGlwUHJvdG8oKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBzZXRTaGFyZWREYXRhUHJvdG8ob2JqZWN0KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIHJlY2VpdmUgZGF0YSB1cGRhdGVzLiAgc2hvdWxkIGJlIG92ZXJyaWRkZW4gYnkgc3ViY2xhc3Nlc1xuICAgIHVwZGF0ZVNoYXJlZERhdGEoZGF0YU9iamVjdCkge1xuICAgICAgICByYWlzZShcInVwZGF0ZURhdGEgc2hvdWxkIGJlIG92ZXJyaWRkZW4gYnkgc3ViY2xhc3Nlc1wiKVxuICAgIH1cblxuICAgIGdldFNpemUoKSB7XG4gICAgICAgIC8vIGlmICghdGhpcy5jb21wU3R5bGVzKSB7XG4gICAgICAgIC8vICAgICB0aGlzLmNvbXBTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLnZ1ZVJvb3QuJGVsKTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyB2YXIgd2lkdGggPSB0aGlzLmNvbXBTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnd2lkdGgnKVxuICAgICAgICAvLyB3aWR0aCA9IHdpZHRoICYmIHdpZHRoLmxlbmd0aCA+IDAgPyBwYXJzZUZsb2F0KHdpZHRoKSAvIDEwMDA6IDFcbiAgICAgICAgLy8gdmFyIGhlaWdodCA9IHRoaXMuY29tcFN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKCdoZWlnaHQnKVxuICAgICAgICAvLyBoZWlnaHQgPSBoZWlnaHQgJiYgaGVpZ2h0Lmxlbmd0aCA+IDAgPyBwYXJzZUZsb2F0KGhlaWdodCkgLyAxMDAwOiAxXG4gICAgICAgIC8vIHRoaXMuc2l6ZSA9IHsgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodH1cbiAgICAgICAgY29uc29sZS5sb2cgKFwiZGl2IHNpemU6IHtcIiArIHRoaXMuc2l6ZS53aWR0aCArIFwiLCBcIiArIHRoaXMuc2l6ZS5oZWlnaHQgKyBcIn1cIilcbiAgICAgICAgcmV0dXJuIHRoaXMuc2l6ZVxuICAgIH1cblxuICAgIC8vIHJlY2VpdmUgZGF0YSB1cGRhdGVzLiAgc2hvdWxkIGJlIG92ZXJyaWRkZW4gYnkgc3ViY2xhc3Nlc1xuICAgIGdldFNoYXJlZERhdGEoZGF0YU9iamVjdCkge1xuICAgICAgICByYWlzZShcImdldFNoYXJlZERhdGEgc2hvdWxkIGJlIG92ZXJyaWRkZW4gYnkgc3ViY2xhc3Nlc1wiKVxuICAgIH1cbiAgICBcbiAgICAvLyBvdmVycmlkZSB0byBjaGVjayBmb3IgeW91ciBvd24gM0Qgb2JqZWN0cyB0aGF0IGFyZW4ndCB3ZWJMYXllcnNcbiAgICBjbGlja2VkKGV2dCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNJbnRlcmFjdGl2ZSkgeyByZXR1cm4gfVxuICAgICAgICBcbiAgICAgICAgY29uc3Qgb2JqID0gZXZ0Lm9iamVjdDNEXG4gICAgICAgIHRoaXMucmF5Y2FzdGVyLnJheS5zZXQob2JqLnBvc2l0aW9uLCBcbiAgICAgICAgICAgIHRoaXMud2ViTGF5ZXIzRC5nZXRXb3JsZERpcmVjdGlvbihuZXcgVEhSRUUuVmVjdG9yMygpKS5uZWdhdGUoKSlcbiAgICAgICAgY29uc3QgaGl0ID0gdGhpcy53ZWJMYXllcjNELmhpdFRlc3QodGhpcy5yYXljYXN0ZXIucmF5KVxuICAgICAgICBpZiAoaGl0KSB7XG4gICAgICAgICAgaGl0LnRhcmdldC5jbGljaygpXG4gICAgICAgICAgaGl0LnRhcmdldC5mb2N1cygpXG4gICAgICAgICAgY29uc29sZS5sb2coJ2hpdCcsIGhpdC50YXJnZXQsIGhpdC5sYXllcilcbiAgICAgICAgfSAgIFxuICAgIH1cblxuICAgIGRyYWdTdGFydChldnQpIHtcbiAgICAgICAgLy8gbm90aGluZyBoZXJlIC4uLiBzdWJjbGFzcyBzaG91bGQgb3ZlcnJpZGVcbiAgICB9XG5cbiAgICBkcmFnRW5kIChldnQpIHtcbiAgICAgICAgLy8gbm90aGluZyBoZXJlIC4uLiBzdWJjbGFzcyBzaG91bGQgb3ZlcnJpZGVcbiAgICB9XG5cbiAgICBwbGF5KCkge1xuICAgICAgICAvLyBpZiB3ZSBjYW4gZmlndXJlIG91dCBob3cgdG8gcGF1c2UsIHRoZW4gcmVzdGFydCBoZXJlXG4gICAgfVxuXG4gICAgcGF1c2UoKSB7XG4gICAgICAgIC8vIHBlcmhhcHMgZmlndXJlIG91dCBob3cgdG8gcGF1c2UgdGhlIFZ1ZSBjb21wb25lbnQ/XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgLy8gVE9ETzogZGVzdHJveSB0aGUgdnVlIGNvbXBvbmVudCBhbmQgYW55IHJlc291cmNlcywgZXRjLiwgaXQgaGFzXG4gICAgfVxufSIsImltcG9ydCB7IHJlYWN0aXZlLCBpbmplY3QsIHJlYWRvbmx5IH0gZnJvbSBcInZ1ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yZSB7XG4gICAgY29uc3RydWN0b3IoYXBwKSB7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gcmVhY3RpdmUoe1xuICAgICAgICAgICAgY291bnQ6IDBcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5hcHAgPSBhcHBcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHJlYWRvbmx5KHRoaXMuX3N0YXRlKVxuICAgIH0gICAgXG5cbiAgICBpbmNyZW1lbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLmFwcC50YWtlT3duZXJzaGlwKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlLmNvdW50Kys7XG4gICAgICAgICAgICB0aGlzLmFwcC5zZXRTaGFyZWREYXRhKHRoaXMuc3RhdGUpXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgdXBkYXRlU2hhcmVkRGF0YShkYXRhT2JqZWN0KSB7XG4gICAgICAgIC8vIG5lZWQgdG8gdXBkYXRlIHRoZSBlbGVtZW50cyB3aXRoaW4gdGhlIHN0YXRlLCBiZWNhdXNlIG90aGVyd2lzZVxuICAgICAgICAvLyB0aGUgZGF0YSB3b24ndCBmbG93IHRvIHRoZSBjb21wb25lbnRzXG4gICAgICAgIHRoaXMuX3N0YXRlLmNvdW50ID0gZGF0YU9iamVjdC5jb3VudFxuICAgIH1cbn1cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuaW1wb3J0IFN0b3JlIGZyb20gXCIuL3NoYXJlZFwiXG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgc3VwZXIoQXBwLCA0MDAsIDQ3NSlcblxuICAgICAgICAvLyBjcmVhdGUgb3VyIHNoYXJlZCBkYXRhIG9iamVjdCB0aGF0IHdpbGxcbiAgICAgICAgLy8gc2hhcmUgZGF0YSBiZXR3ZWVuIHZ1ZSBhbmQgaHVic1xuICAgICAgICB0aGlzLnNoYXJlZCA9IG5ldyBTdG9yZSh0aGlzKVxuICAgICAgICB0aGlzLnZ1ZUFwcC5wcm92aWRlKCdzaGFyZWQnLCB0aGlzLnNoYXJlZClcblxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzTmV0d29ya2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc1N0YXRpYyA9IGZhbHNlO1xuXG4gICAgICAgIGNvbnNvbGUubG9nIChKU09OLnN0cmluZ2lmeSh0aGlzLnNoYXJlZC5kYXRhKSlcbiAgICB9XG4gICAgXG4gICAgdXBkYXRlU2hhcmVkRGF0YShkYXRhT2JqZWN0KSB7XG4gICAgICAgIHRoaXMuc2hhcmVkLnVwZGF0ZVNoYXJlZERhdGEoZGF0YU9iamVjdClcbiAgICB9XG5cbiAgICBnZXRTaGFyZWREYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWQuc3RhdGU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0XG4iLCI8dGVtcGxhdGU+XG4gIDxoMT57eyBtc2cgfX08L2gxPlxuXG4gIDxwPlxuICAgIDxhIGhyZWY9XCJodHRwczovL3ZpdGVqcy5kZXYvZ3VpZGUvZmVhdHVyZXMuaHRtbFwiIHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgVml0ZSBEb2N1bWVudGF0aW9uIGFuZCBUaGVuIFNvbWUhIFxuICAgIDwvYT5cbiAgICB8XG4gICAgPGEgaHJlZj1cImh0dHBzOi8vdjMudnVlanMub3JnL1wiIHRhcmdldD1cIl9ibGFua1wiPlZ1ZSAzIERvY3VtZW50YXRpb248L2E+XG4gIDwvcD5cblxuICA8YnV0dG9uIHhyLWxheWVyIEBjbGljaz1cInN0YXRlLmNvdW50KytcIj5jb3VudCBpczoge3sgc3RhdGUuY291bnQgfX08L2J1dHRvbj5cbiAgPHA+XG4gICAgRWRpdFxuICAgIDxjb2RlPmNvbXBvbmVudHMvSGVsbG9Xb3JsZC52dWU8L2NvZGU+IHRvIHRlc3QgaG90IG1vZHVsZSByZXBsYWNlbWVudCB3aGlsZSBydW5uaW5nIHByb2plY3QgYXMgXCJucG0gcnVuIGRldlwiLlxuICA8L3A+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgZGVmaW5lUHJvcHMsIHJlYWN0aXZlIH0gZnJvbSAndnVlJ1xuXG5kZWZpbmVQcm9wcyh7XG4gIG1zZzogU3RyaW5nXG59KVxuXG5jb25zdCBzdGF0ZSA9IHJlYWN0aXZlKHsgY291bnQ6IDAgfSlcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInRvcFwiPlxuICAgICAgPGltZyBhbHQ9XCJWdWUgbG9nb1wiIHNyYz1cIi4uLy4uL2Fzc2V0cy9sb2dvLnBuZ1wiIC8+XG4gICAgICA8SGVsbG9Xb3JsZCBtc2c9XCJWdWUgQ29tcG9uZW50IHdpdGggTG9jYWwgQnV0dG9uIENvdW50XCIgLz5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IEhlbGxvV29ybGQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9IZWxsb1dvcmxkLnZ1ZSdcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHN1cGVyKEFwcCwgNTAwLCA1MDApXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL2pheS12dWUtYXBwcy5uZ3Jvay5pby92dWUtYXBwcy9kaXN0LzE3NWFhMDJkMmYyNTgzOWMuanBnXCIiLCI8dGVtcGxhdGU+XG4gIDxoMj57eyBtc2cgfX08L2gyPlxuXG4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgZGVmaW5lUHJvcHMsIHJlYWN0aXZlIH0gZnJvbSAndnVlJ1xuXG5kZWZpbmVQcm9wcyh7XG4gIG1zZzogU3RyaW5nXG59KVxuXG5jb25zdCBzdGF0ZSA9IHJlYWN0aXZlKHsgY291bnQ6IDAgfSlcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuYSB7XG4gIGNvbG9yOiAjNDJiOTgzO1xufVxuXG4qIHtcbiAgICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcbiAgICBsaW5lLWhlaWdodCA6IG5vcm1hbDtcbn1cblxucCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgbWFyZ2luLWJsb2NrLXN0YXJ0OiAxZW07XG4gICAgbWFyZ2luLWJsb2NrLWVuZDogMWVtO1xuICAgIG1hcmdpbi1pbmxpbmUtc3RhcnQ6IDBweDtcbiAgICBtYXJnaW4taW5saW5lLWVuZDogMHB4O1xufVxuXG5oMSB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgZm9udC1zaXplOiAyZW07XG4gICAgbWFyZ2luLWJsb2NrLXN0YXJ0OiAwLjY3ZW07XG4gICAgbWFyZ2luLWJsb2NrLWVuZDogMC42N2VtO1xuICAgIG1hcmdpbi1pbmxpbmUtc3RhcnQ6IDBweDtcbiAgICBtYXJnaW4taW5saW5lLWVuZDogMHB4O1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG5idXR0b24ge1xuICAgIC8qIHdpZHRoOiAxMDBweDtcbiAgICBoZWlnaHQ6IDMwcHg7ICovXG4gICAgYXBwZWFyYW5jZTogYXV0bztcbiAgICAtd2Via2l0LXdyaXRpbmctbW9kZTogaG9yaXpvbnRhbC10YiAhaW1wb3J0YW50O1xuICAgIHRleHQtcmVuZGVyaW5nOiBhdXRvO1xuICAgIGNvbG9yOiAtaW50ZXJuYWwtbGlnaHQtZGFyayhibGFjaywgd2hpdGUpO1xuICAgIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XG4gICAgd29yZC1zcGFjaW5nOiBub3JtYWw7XG4gICAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gICAgdGV4dC1pbmRlbnQ6IDBweDtcbiAgICB0ZXh0LXNoYWRvdzogbm9uZTtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAtaW50ZXJuYWwtbGlnaHQtZGFyayhyZ2IoMjM5LCAyMzksIDIzOSksIHJnYig1OSwgNTksIDU5KSk7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBtYXJnaW46IDBlbTtcbiAgICBmb250OiA0MDAgMTMuMzMzM3B4IEFyaWFsO1xuICAgIHBhZGRpbmc6IDFweCA2cHg7XG4gICAgYm9yZGVyLXdpZHRoOiAycHg7XG4gICAgYm9yZGVyLXN0eWxlOiBvdXRzZXQ7XG4gICAgYm9yZGVyLWNvbG9yOiAtaW50ZXJuYWwtbGlnaHQtZGFyayhyZ2IoMTE4LCAxMTgsIDExOCksIHJnYigxMzMsIDEzMywgMTMzKSk7XG4gICAgYm9yZGVyLWltYWdlOiBpbml0aWFsO1xuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbn1cblxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInRvcFwiPlxuICAgIDxoMj4gMy1EIEdyYXBoaWNzIGFuZCB0aGUgQ29uc3RydWN0aW9uIG9mIFZpc3VhbCBSZWFsaXR5PC9oMj5cblx0PGltZyBzcmM9XCIuLi8uLi9hc3NldHMvdW5jYW5ueS5qcGdcIiB3aWR0aD1cIjIwMFwiPlxuXHQ8ZGl2IGNsYXNzPVwiZGlzcGxheXRleHRcIj4zLUQgY29tcHV0ZXIgZ3JhcGhpY3MgaGVscCB0byBjb25zdHJ1Y3QgdGhlIHZpc3VhbCByZWFsaXRpZXMgb2YgQVIgYW5kIFZSLCBpbiBwYXJ0aWN1bGFyIHBob3RvcmVhbGlzbS4gVGhlIHVuY2FubnkgdmFsbGV5LjwvZGl2PlxuXHQ8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cblxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vamF5LXZ1ZS1hcHBzLm5ncm9rLmlvL3Z1ZS1hcHBzL2Rpc3QvZjc0NWVjNWJmZWRkZjNkOC5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInRvcFwiPlxuICAgIDxUaXRsZSBtc2c9XCJXaGF0IGFyZSBBUiAmIFZSXCIgLz5cbiAgICA8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9taWxncmFtLmpwZ1wiIHdpZHRoPVwiMzAwXCI+XG4gICAgPGRpdiBjbGFzcz1cImRpc3BsYXl0ZXh0XCIgPlNvbWUgb2YgdGhlIGtleSBkaWZmZXJlbmNlcyBiZXR3ZWVuIOKAnGNsYXNzaWPigJ0gVlIgYW5kIEFSLiBFeHRlbmRlZCByZWFsaXR5IChYUikgYW5kIHRoZSBpbW1lcnNpdmUgd2ViLiBXaGVyZSBBUiBhbmQgVlIgZml0IG9uIE1pbGdyYW0gYW5kIEtpc2hpbm/igJlzIHZpcnR1YWxpdHkgY29udGludXVtLjwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcihBcHAsd2lkdGgsIGhlaWdodClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9qYXktdnVlLWFwcHMubmdyb2suaW8vdnVlLWFwcHMvZGlzdC80YWY2NTYzMTFjNjA5YjkwLmpwZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwidG9wXCI+XG4gIDxUaXRsZSBtc2c9XCJUaGUgTGFDaW90YXQgRWZmZWN0XCIgLz5cblx0PGltZyBzcmM9XCIuLi8uLi9hc3NldHMvdHJhaW4uanBnXCIgd2lkdGg9XCIzMDBcIiA+XG5cdDxkaXY+RmlsbSBiZWNhbWUgb25lIG9mIHRoZSBtb3N0IGltcG9ydGFudCByZWFsaXR5IG1lZGlhIG9mIFxuXHR0aGUgdHdlbnRpZXRoIGNlbnR1cnksIGFuZCBpbiBzb21lIHdheXMsIGl0IGlzIGEgZm9yZXJ1bm5lciBvZiB2aXJ0dWFsIHJlYWxpdHkuPC9kaXY+XG5cdCAgPGRpdiBjbGFzcz1cImRpc3BsYXl0ZXh0XCI+QVIgYWxsb3dzIHVzIHRvIGV4dGVuZCBvdXIgcGh5c2ljYWwgcmVhbGl0eTsgVlIgY3JlYXRlcyBmb3IgdXMgYSBkaWZmZXJlbnQgcmVhbGl0eS48L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0KVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1KVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwidG9wXCI+XG4gICAgPFRpdGxlIG1zZz1cIlRoZSBMYUNpb3RhdCBFZmZlY3RcIiAvPlxuXHQgIDxpbWcgc3JjPVwiLi4vLi4vYXNzZXRzL3RyYWluLmpwZ1wiIHdpZHRoPVwiMzAwXCI+XG5cdCAgPGRpdiBjbGFzcz1cImRpc3BsYXl0ZXh0XCI+RmlsbSBiZWNhbWUgb25lIG9mIHRoZSBtb3N0IGltcG9ydGFudCByZWFsaXR5IG1lZGlhIG9mIHRoZSB0d2VudGlldGggY2VudHVyeSwgYW5kIGluIHNvbWUgd2F5cywgaXQgaXMgYSBmb3JlcnVubmVyIG9mIHZpcnR1YWwgcmVhbGl0eS48L2Rpdj4gIFxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKHdpZHRoLCBoZWlnaHQsIEFwcClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSlcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9qYXktdnVlLWFwcHMubmdyb2suaW8vdnVlLWFwcHMvZGlzdC8xNTEyZjZkNDE1NDBjZDc5LmpwZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwidG9wXCI+XG4gICAgPFRpdGxlIG1zZz1cIlRoZSBIaXN0b3J5IG9mIFJlYWxpdHkgTWVkaWFcIiAvPlxuICAgIDxpbWcgc3JjPVwiLi4vLi4vYXNzZXRzL3Bhbm8uanBnXCIgd2lkdGg9XCIzMDBcIi8+XG4gICAgPGRpdiBjbGFzcz1cImRpc3BsYXl0ZXh0XCI+SGlzdG9yaWNhbGx5LCBlYWNoIHJlYWxpdHkgbWVkaXVtIG1lZGlhdGVzIGFuZCByZW1lZGlhdGVzLiBJdCBvZmZlcnMgYSBuZXcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHdvcmxkIHRoYXQgd2UgaW1wbGljaXRseSBjb21wYXJlIHRvIG91ciBleHBlcmllbmNlIG9mIHRoZSB3b3JsZCBpbiBpdHNlbGYsIGJ1dCBhbHNvIHRocm91Z2ggb3RoZXIgbWVkaWEuPC9kaXY+IFxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIod2lkdGgsIGhlaWdodCwgQXBwKVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1KVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL2pheS12dWUtYXBwcy5uZ3Jvay5pby92dWUtYXBwcy9kaXN0LzU1OWNlNWFlOWFmY2NmNjMuanBnXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJ0b3BcIj5cbiAgICA8VGl0bGUgbXNnPVwiV2hhdCBBcmUgUmVhbGl0eSBNZWRpYT9cIiAvPlxuICAgIDxpbWcgc3JjPVwiLi4vLi4vYXNzZXRzL2xhY2lvdGF0LmpwZ1wiIHdpZHRoPVwiMzAwXCI+XG4gICAgPGRpdiBjbGFzcz1cImRpc3BsYXl0ZXh0XCI+RWFjaCByZWFsaXR5IG1lZGl1bSBtZWRpYXRlcyBhbmQgcmVtZWRpYXRlcy4gSXQgb2ZmZXJzIGEgbmV3IHJlcHJlc2VudGF0aW9uIG9mIHRoZSB3b3JsZCB0aGF0IHdlIGltcGxpY2l0bHkgY29tcGFyZSB0byBvdXIgZXhwZXJpZW5jZSBvZiB0aGUgd29ybGQgaW4gaXRzZWxmLCBidXQgYWxzbyB0aHJvdWdoIG90aGVyIG1lZGlhLjwvZGl2PiBcbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIod2lkdGgsIGhlaWdodCwgQXBwKVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1KVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0Il0sIm5hbWVzIjpbIkh1YnNBcHAiLCJXZWJMYXllcjNEIiwiSHVic0FwcFByb3RvIiwiQXBwIiwiaW5pdCJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQkFBZTs7Ozs7Ozs7O0FDV2Y7Ozs7Ozs7O0FBRmM7QUFLWjtBQUNGO0FBQ0EsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVGpCOzs7Ozs7Ozs7Ozs7Ozs7QUNKQyxNQUFNQSxTQUFPLENBQUM7QUFDN0IsSUFBSSxXQUFXLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsRUFBRSxFQUFFO0FBQ3ZELFFBQVEsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7QUFDbkMsUUFBUSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztBQUNqQyxRQUFRLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQzdCLFFBQVEsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFLO0FBQzFCLFFBQVEsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFNO0FBQzVCLFFBQVEsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFDO0FBQzdELFFBQVEsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQztBQUMvRCxRQUFRLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUM7QUFDL0Q7QUFDQSxRQUFRLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUM7QUFDcEQ7QUFDQTtBQUNBLFFBQVEsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsR0FBRyxFQUFFLGFBQWEsRUFBQztBQUNuRCxLQUFLO0FBQ0w7QUFD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
