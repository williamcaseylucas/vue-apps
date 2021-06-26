import { p as pushScopeId, a as popScopeId, o as openBlock, c as createBlock, b as createVNode, t as toDisplayString, u as unref, F as Fragment, i as inject, d as createApp, B as Bh, r as reactive, e as readonly, f as createTextVNode } from './vendor-e2aa8d32.js';

var _imports_0 = "https://resources.realitymedia.digital/vue-apps/dist/1a6ace377133f14a.png";

pushScopeId("data-v-04cbd54a");
const _hoisted_1$3 = {
  "xr-layer": "",
  class: "fade"
};
const _hoisted_2$3 = /*#__PURE__*/createVNode("p", null, " Here's some more text just to make things not blank. ", -1 /* HOISTED */);
popScopeId();


var script$3 = {
  expose: [],
  props: {
  msg: String
},
  setup(__props) {



const shared = inject('shared');

return (_ctx, _cache) => {
  return (openBlock(), createBlock(Fragment, null, [
    createVNode("h1", _hoisted_1$3, toDisplayString(__props.msg), 1 /* TEXT */),
    _hoisted_2$3,
    createVNode("button", {
      "xr-layer": "",
      onClick: _cache[1] || (_cache[1] = (...args) => (unref(shared).increment && unref(shared).increment(...args)))
    }, "count is: " + toDisplayString(unref(shared).state.count), 1 /* TEXT */)
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$3.__scopeId = "data-v-04cbd54a";

pushScopeId("data-v-69f29b10");
const _hoisted_1$2 = { id: "top" };
const _hoisted_2$2 = /*#__PURE__*/createVNode("img", {
  alt: "Vue logo",
  src: _imports_0
}, null, -1 /* HOISTED */);
popScopeId();

var script$2 = {
  expose: [],
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1$2, [
    _hoisted_2$2,
    createVNode(script$3, { msg: "Networked Vue Component with Shared Button Count" })
  ]))
}
}

};

script$2.__scopeId = "data-v-69f29b10";

class HubsApp$2 {
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

class HubsApp$1 extends HubsApp$2 {
    constructor () {
        super(script$2, 400, 475);

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

var init$1 = function () {
    let app = new HubsApp$1();
    app.mount();
    return app
};

pushScopeId("data-v-1f52c881");
const _hoisted_1$1 = /*#__PURE__*/createVNode("p", null, [
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
const _hoisted_2$1 = /*#__PURE__*/createVNode("p", null, [
  /*#__PURE__*/createTextVNode(" Edit "),
  /*#__PURE__*/createVNode("code", null, "components/HelloWorld.vue"),
  /*#__PURE__*/createTextVNode(" to test hot module replacement while running project as \"npm run dev\". ")
], -1 /* HOISTED */);
popScopeId();


var script$1 = {
  expose: [],
  props: {
  msg: String
},
  setup(__props) {



const state = reactive({ count: 0 });

return (_ctx, _cache) => {
  return (openBlock(), createBlock(Fragment, null, [
    createVNode("h1", null, toDisplayString(__props.msg), 1 /* TEXT */),
    _hoisted_1$1,
    createVNode("button", {
      "xr-layer": "",
      onClick: _cache[1] || (_cache[1] = $event => (unref(state).count++))
    }, "count is: " + toDisplayString(unref(state).count), 1 /* TEXT */),
    _hoisted_2$1
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$1.__scopeId = "data-v-1f52c881";

pushScopeId("data-v-5f621115");
const _hoisted_1 = { id: "top" };
const _hoisted_2 = /*#__PURE__*/createVNode("img", {
  alt: "Vue logo",
  src: _imports_0
}, null, -1 /* HOISTED */);
popScopeId();

var script = {
  expose: [],
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createBlock("div", _hoisted_1, [
    _hoisted_2,
    createVNode(script$1, { msg: "Vue Component with Local Button Count" })
  ]))
}
}

};

script.__scopeId = "data-v-5f621115";

class HubsApp extends HubsApp$2 {
    constructor () {
        super(script, 500, 500);
        this.isInteractive = true;
    }
}

var init = function () {
    let app = new HubsApp();
    app.mount();
    return app
};

export { init$1 as hubsTest1, init as hubsTest2 };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHVicy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Fzc2V0cy9sb2dvLnBuZyIsIi4uLy4uL3NyYy9jb21wb25lbnRzL05ldHdvcmtlZEhlbGxvV29ybGQudnVlIiwiLi4vLi4vc3JjL2FwcHMvSHVic1Rlc3QxL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9IdWJzQXBwLmpzIiwiLi4vLi4vc3JjL2FwcHMvSHVic1Rlc3QxL3NoYXJlZC5qcyIsIi4uLy4uL3NyYy9hcHBzL0h1YnNUZXN0MS9odWJzLmpzIiwiLi4vLi4vc3JjL2NvbXBvbmVudHMvSGVsbG9Xb3JsZC52dWUiLCIuLi8uLi9zcmMvYXBwcy9IdWJzVGVzdDIvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0h1YnNUZXN0Mi9odWJzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC8xYTZhY2UzNzcxMzNmMTRhLnBuZ1wiIiwiPHRlbXBsYXRlPlxuICA8aDEgeHItbGF5ZXIgY2xhc3M9XCJmYWRlXCI+e3sgbXNnIH19PC9oMT5cbiAgPHA+XG4gICAgSGVyZSdzIHNvbWUgbW9yZSB0ZXh0IGp1c3QgdG8gbWFrZSB0aGluZ3Mgbm90IGJsYW5rLlxuICA8L3A+XG5cbiAgPGJ1dHRvbiB4ci1sYXllciBAY2xpY2s9XCJzaGFyZWQuaW5jcmVtZW50XCI+Y291bnQgaXM6IHt7IHNoYXJlZC5zdGF0ZS5jb3VudCB9fTwvYnV0dG9uPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IGRlZmluZVByb3BzLCBpbmplY3QgfSBmcm9tICd2dWUnXG5cbmRlZmluZVByb3BzKHtcbiAgbXNnOiBTdHJpbmdcbn0pXG5cbmNvbnN0IHNoYXJlZCA9IGluamVjdCgnc2hhcmVkJylcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuYSB7XG4gIGNvbG9yOiAjYjU0MmI5O1xufVxuXG4uZmFkZSB7XG4gIGNvbG9yOiAjOTgwM2E1O1xuICAvKiB0cmFuc2l0aW9uOiBjb2xvciAxczsgKi9cbn1cblxuLmZhZGU6aG92ZXIge1xuICBjb2xvcjogI2E3OGUwNjtcbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJ0b3BcIj5cbiAgICAgIDxpbWcgYWx0PVwiVnVlIGxvZ29cIiBzcmM9XCIuLi8uLi9hc3NldHMvbG9nby5wbmdcIiAvPlxuICAgICAgPFNvbWVUZXh0IG1zZz1cIk5ldHdvcmtlZCBWdWUgQ29tcG9uZW50IHdpdGggU2hhcmVkIEJ1dHRvbiBDb3VudFwiIC8+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBTb21lVGV4dCBmcm9tICcuLi8uLi9jb21wb25lbnRzL05ldHdvcmtlZEhlbGxvV29ybGQudnVlJ1xuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG48L3N0eWxlPlxuIiwiaW1wb3J0IHtjcmVhdGVBcHB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IFdlYkxheWVyM0QgfSBmcm9tIFwiZXRoZXJlYWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHVic0FwcCB7XG4gICAgY29uc3RydWN0b3IgKEFwcCwgd2lkdGgsIGhlaWdodCwgY3JlYXRlT3B0aW9ucz17fSkge1xuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc05ldHdvcmtlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU3RhdGljID0gdHJ1ZTtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0XG4gICAgICAgIHRoaXMuc2l6ZSA9IHsgd2lkdGg6IHdpZHRoLzEwMDAsIGhlaWdodDogaGVpZ2h0LzEwMDB9XG4gICAgICAgIHRoaXMudGFrZU93bmVyc2hpcCA9IHRoaXMudGFrZU93bmVyc2hpcFByb3RvLmJpbmQodGhpcylcbiAgICAgICAgdGhpcy5zZXRTaGFyZWREYXRhID0gdGhpcy5zZXRTaGFyZWREYXRhUHJvdG8uYmluZCh0aGlzKVxuXG4gICAgICAgIHRoaXMuaGVhZERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgLy90aGlzLmhlYWREaXYuc2V0QXR0cmlidXRlKFwic3R5bGVcIixcIndpZHRoOiAxMDAlO2hlaWdodDogMTAwJTtcIilcblxuICAgICAgICB0aGlzLnZ1ZUFwcCA9IGNyZWF0ZUFwcChBcHAsIGNyZWF0ZU9wdGlvbnMpXG4gICAgfVxuXG4gICAgbW91bnQoKSB7XG4gICAgICAgIHRoaXMudnVlUm9vdCA9IHRoaXMudnVlQXBwLm1vdW50KHRoaXMuaGVhZERpdik7XG4gICAgICAgIHRoaXMudnVlUm9vdC4kZWwuc2V0QXR0cmlidXRlKFwic3R5bGVcIixcIndpZHRoOiBcIiArIHRoaXMud2lkdGggKyBcInB4OyBoZWlnaHQ6IFwiICsgdGhpcy5oZWlnaHQgKyBcInB4O1wiKVxuXG4gICAgICAgIC8vIC8vIGFkZCBhIGxpbmsgdG8gdGhlIHNoYXJlZCBjc3NcbiAgICAgICAgbGV0IGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKVxuICAgICAgICBsLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0L2h1YnMuY3NzXCIpXG4gICAgICAgIGwuc2V0QXR0cmlidXRlKFwicmVsXCIsIFwic3R5bGVzaGVldFwiKVxuICAgICAgICBsLnNldEF0dHJpYnV0ZShcImNyb3Nzb3JpZ2luXCIsXCJhbm9ueW1vdXNcIilcbiAgICAgICAgdGhpcy52dWVSb290LiRlbC5pbnNlcnRCZWZvcmUobCwgdGhpcy52dWVSb290LiRlbC5maXJzdENoaWxkKVxuXG4gICAgICAgIHRoaXMud2ViTGF5ZXIzRCA9IG5ldyBXZWJMYXllcjNEKHRoaXMudnVlUm9vdC4kZWwsIHtcbiAgICAgICAgICAgIGF1dG9SZWZyZXNoOiB0cnVlLFxuICAgICAgICAgICAgb25MYXllckNyZWF0ZTogKGxheWVyKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gbm90aGluZyB5ZXRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkFmdGVyUmFzdGVyaXplKGxheWVyKSB7XG4gICAgICAgICAgICAgICAgICAgLy8gbm90aGluZyB5ZXRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZXh0dXJlRW5jb2Rpbmc6IFRIUkVFLnNSR0JFbmNvZGluZyxcbiAgICAgICAgICAgIHJlbmRlck9yZGVyT2Zmc2V0OiAwICAvLyAtMTAwMFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zb2xlLmxvZyhcInNpemU6IFwiLCB0aGlzLnNpemUpXG5cbiAgICAgICAgaWYgKHRoaXMuaXNJbnRlcmFjdGl2ZSkge1xuICAgICAgICAgICAgLy8gZm9yIGludGVyYWN0aW9uXG4gICAgICAgICAgICB0aGlzLnJheWNhc3RlciA9IG5ldyBUSFJFRS5SYXljYXN0ZXIoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0TmV0d29ya01ldGhvZHModGFrZU93bmVyc2hpcCwgc2V0U2hhcmVkRGF0YSkge1xuICAgICAgICB0aGlzLnRha2VPd25lcnNoaXAgPSB0YWtlT3duZXJzaGlwO1xuICAgICAgICB0aGlzLnNldFNoYXJlZERhdGEgPSBzZXRTaGFyZWREYXRhO1xuICAgIH1cblxuICAgIC8vIGR1bW15IGZ1bmN0aW9ucywganVzdCB0byBhdm9pZCBlcnJvcnMgaWYgdGhleSBnZXQgY2FsbGVkIGJlZm9yZVxuICAgIC8vIG5ldHdvcmtpbmcgaXMgaW5pdGlhbGl6ZWQsIG9yIGNhbGxlZCB3aGVuIG5ldHdvcmtlZCBpcyBmYWxzZVxuICAgIHRha2VPd25lcnNoaXBQcm90bygpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHNldFNoYXJlZERhdGFQcm90byhvYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gcmVjZWl2ZSBkYXRhIHVwZGF0ZXMuICBzaG91bGQgYmUgb3ZlcnJpZGRlbiBieSBzdWJjbGFzc2VzXG4gICAgdXBkYXRlU2hhcmVkRGF0YShkYXRhT2JqZWN0KSB7XG4gICAgICAgIHJhaXNlKFwidXBkYXRlRGF0YSBzaG91bGQgYmUgb3ZlcnJpZGRlbiBieSBzdWJjbGFzc2VzXCIpXG4gICAgfVxuXG4gICAgZ2V0U2l6ZSgpIHtcbiAgICAgICAgLy8gaWYgKCF0aGlzLmNvbXBTdHlsZXMpIHtcbiAgICAgICAgLy8gICAgIHRoaXMuY29tcFN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMudnVlUm9vdC4kZWwpO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIHZhciB3aWR0aCA9IHRoaXMuY29tcFN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKCd3aWR0aCcpXG4gICAgICAgIC8vIHdpZHRoID0gd2lkdGggJiYgd2lkdGgubGVuZ3RoID4gMCA/IHBhcnNlRmxvYXQod2lkdGgpIC8gMTAwMDogMVxuICAgICAgICAvLyB2YXIgaGVpZ2h0ID0gdGhpcy5jb21wU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ2hlaWdodCcpXG4gICAgICAgIC8vIGhlaWdodCA9IGhlaWdodCAmJiBoZWlnaHQubGVuZ3RoID4gMCA/IHBhcnNlRmxvYXQoaGVpZ2h0KSAvIDEwMDA6IDFcbiAgICAgICAgLy8gdGhpcy5zaXplID0geyB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0fVxuICAgICAgICBjb25zb2xlLmxvZyAoXCJkaXYgc2l6ZToge1wiICsgdGhpcy5zaXplLndpZHRoICsgXCIsIFwiICsgdGhpcy5zaXplLmhlaWdodCArIFwifVwiKVxuICAgICAgICByZXR1cm4gdGhpcy5zaXplXG4gICAgfVxuXG4gICAgLy8gcmVjZWl2ZSBkYXRhIHVwZGF0ZXMuICBzaG91bGQgYmUgb3ZlcnJpZGRlbiBieSBzdWJjbGFzc2VzXG4gICAgZ2V0U2hhcmVkRGF0YShkYXRhT2JqZWN0KSB7XG4gICAgICAgIHJhaXNlKFwiZ2V0U2hhcmVkRGF0YSBzaG91bGQgYmUgb3ZlcnJpZGRlbiBieSBzdWJjbGFzc2VzXCIpXG4gICAgfVxuICAgIFxuICAgIC8vIG92ZXJyaWRlIHRvIGNoZWNrIGZvciB5b3VyIG93biAzRCBvYmplY3RzIHRoYXQgYXJlbid0IHdlYkxheWVyc1xuICAgIGNsaWNrZWQoZXZ0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc0ludGVyYWN0aXZlKSB7IHJldHVybiB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBvYmogPSBldnQub2JqZWN0M0RcbiAgICAgICAgdGhpcy5yYXljYXN0ZXIucmF5LnNldChvYmoucG9zaXRpb24sIFxuICAgICAgICAgICAgdGhpcy53ZWJMYXllcjNELmdldFdvcmxkRGlyZWN0aW9uKG5ldyBUSFJFRS5WZWN0b3IzKCkpLm5lZ2F0ZSgpKVxuICAgICAgICBjb25zdCBoaXQgPSB0aGlzLndlYkxheWVyM0QuaGl0VGVzdCh0aGlzLnJheWNhc3Rlci5yYXkpXG4gICAgICAgIGlmIChoaXQpIHtcbiAgICAgICAgICBoaXQudGFyZ2V0LmNsaWNrKClcbiAgICAgICAgICBoaXQudGFyZ2V0LmZvY3VzKClcbiAgICAgICAgICBjb25zb2xlLmxvZygnaGl0JywgaGl0LnRhcmdldCwgaGl0LmxheWVyKVxuICAgICAgICB9ICAgXG4gICAgfVxuXG4gICAgZHJhZ1N0YXJ0KGV2dCkge1xuICAgICAgICAvLyBub3RoaW5nIGhlcmUgLi4uIHN1YmNsYXNzIHNob3VsZCBvdmVycmlkZVxuICAgIH1cblxuICAgIGRyYWdFbmQgKGV2dCkge1xuICAgICAgICAvLyBub3RoaW5nIGhlcmUgLi4uIHN1YmNsYXNzIHNob3VsZCBvdmVycmlkZVxuICAgIH1cblxuICAgIHBsYXkoKSB7XG4gICAgICAgIC8vIGlmIHdlIGNhbiBmaWd1cmUgb3V0IGhvdyB0byBwYXVzZSwgdGhlbiByZXN0YXJ0IGhlcmVcbiAgICB9XG5cbiAgICBwYXVzZSgpIHtcbiAgICAgICAgLy8gcGVyaGFwcyBmaWd1cmUgb3V0IGhvdyB0byBwYXVzZSB0aGUgVnVlIGNvbXBvbmVudD9cbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICAvLyBUT0RPOiBkZXN0cm95IHRoZSB2dWUgY29tcG9uZW50IGFuZCBhbnkgcmVzb3VyY2VzLCBldGMuLCBpdCBoYXNcbiAgICB9XG59IiwiaW1wb3J0IHsgcmVhY3RpdmUsIGluamVjdCwgcmVhZG9ubHkgfSBmcm9tIFwidnVlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3JlIHtcbiAgICBjb25zdHJ1Y3RvcihhcHApIHtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSByZWFjdGl2ZSh7XG4gICAgICAgICAgICBjb3VudDogMFxuICAgICAgICB9KVxuICAgICAgICB0aGlzLmFwcCA9IGFwcFxuICAgICAgICB0aGlzLnN0YXRlID0gcmVhZG9ubHkodGhpcy5fc3RhdGUpXG4gICAgfSAgICBcblxuICAgIGluY3JlbWVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYXBwLnRha2VPd25lcnNoaXAoKSkge1xuICAgICAgICAgICAgdGhpcy5fc3RhdGUuY291bnQrKztcbiAgICAgICAgICAgIHRoaXMuYXBwLnNldFNoYXJlZERhdGEodGhpcy5zdGF0ZSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICB1cGRhdGVTaGFyZWREYXRhKGRhdGFPYmplY3QpIHtcbiAgICAgICAgLy8gbmVlZCB0byB1cGRhdGUgdGhlIGVsZW1lbnRzIHdpdGhpbiB0aGUgc3RhdGUsIGJlY2F1c2Ugb3RoZXJ3aXNlXG4gICAgICAgIC8vIHRoZSBkYXRhIHdvbid0IGZsb3cgdG8gdGhlIGNvbXBvbmVudHNcbiAgICAgICAgdGhpcy5fc3RhdGUuY291bnQgPSBkYXRhT2JqZWN0LmNvdW50XG4gICAgfVxufVxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5pbXBvcnQgU3RvcmUgZnJvbSBcIi4vc2hhcmVkXCJcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICBzdXBlcihBcHAsIDQwMCwgNDc1KVxuXG4gICAgICAgIC8vIGNyZWF0ZSBvdXIgc2hhcmVkIGRhdGEgb2JqZWN0IHRoYXQgd2lsbFxuICAgICAgICAvLyBzaGFyZSBkYXRhIGJldHdlZW4gdnVlIGFuZCBodWJzXG4gICAgICAgIHRoaXMuc2hhcmVkID0gbmV3IFN0b3JlKHRoaXMpXG4gICAgICAgIHRoaXMudnVlQXBwLnByb3ZpZGUoJ3NoYXJlZCcsIHRoaXMuc2hhcmVkKVxuXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNOZXR3b3JrZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzU3RhdGljID0gZmFsc2U7XG5cbiAgICAgICAgY29uc29sZS5sb2cgKEpTT04uc3RyaW5naWZ5KHRoaXMuc2hhcmVkLmRhdGEpKVxuICAgIH1cbiAgICBcbiAgICB1cGRhdGVTaGFyZWREYXRhKGRhdGFPYmplY3QpIHtcbiAgICAgICAgdGhpcy5zaGFyZWQudXBkYXRlU2hhcmVkRGF0YShkYXRhT2JqZWN0KVxuICAgIH1cblxuICAgIGdldFNoYXJlZERhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNoYXJlZC5zdGF0ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXRcbiIsIjx0ZW1wbGF0ZT5cbiAgPGgxPnt7IG1zZyB9fTwvaDE+XG5cbiAgPHA+XG4gICAgPGEgaHJlZj1cImh0dHBzOi8vdml0ZWpzLmRldi9ndWlkZS9mZWF0dXJlcy5odG1sXCIgdGFyZ2V0PVwiX2JsYW5rXCI+XG4gICAgICBWaXRlIERvY3VtZW50YXRpb24gYW5kIFRoZW4gU29tZSEgXG4gICAgPC9hPlxuICAgIHxcbiAgICA8YSBocmVmPVwiaHR0cHM6Ly92My52dWVqcy5vcmcvXCIgdGFyZ2V0PVwiX2JsYW5rXCI+VnVlIDMgRG9jdW1lbnRhdGlvbjwvYT5cbiAgPC9wPlxuXG4gIDxidXR0b24geHItbGF5ZXIgQGNsaWNrPVwic3RhdGUuY291bnQrK1wiPmNvdW50IGlzOiB7eyBzdGF0ZS5jb3VudCB9fTwvYnV0dG9uPlxuICA8cD5cbiAgICBFZGl0XG4gICAgPGNvZGU+Y29tcG9uZW50cy9IZWxsb1dvcmxkLnZ1ZTwvY29kZT4gdG8gdGVzdCBob3QgbW9kdWxlIHJlcGxhY2VtZW50IHdoaWxlIHJ1bm5pbmcgcHJvamVjdCBhcyBcIm5wbSBydW4gZGV2XCIuXG4gIDwvcD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBkZWZpbmVQcm9wcywgcmVhY3RpdmUgfSBmcm9tICd2dWUnXG5cbmRlZmluZVByb3BzKHtcbiAgbXNnOiBTdHJpbmdcbn0pXG5cbmNvbnN0IHN0YXRlID0gcmVhY3RpdmUoeyBjb3VudDogMCB9KVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwidG9wXCI+XG4gICAgICA8aW1nIGFsdD1cIlZ1ZSBsb2dvXCIgc3JjPVwiLi4vLi4vYXNzZXRzL2xvZ28ucG5nXCIgLz5cbiAgICAgIDxIZWxsb1dvcmxkIG1zZz1cIlZ1ZSBDb21wb25lbnQgd2l0aCBMb2NhbCBCdXR0b24gQ291bnRcIiAvPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgSGVsbG9Xb3JsZCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0hlbGxvV29ybGQudnVlJ1xuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgc3VwZXIoQXBwLCA1MDAsIDUwMClcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiXSwibmFtZXMiOlsiSHVic0FwcCIsIldlYkxheWVyM0QiLCJIdWJzQXBwUHJvdG8iLCJBcHAiLCJpbml0Il0sIm1hcHBpbmdzIjoiOztBQUFBLGlCQUFlOzs7Ozs7Ozs7QUNXZjs7Ozs7Ozs7QUFGYztBQUtaO0FBQ0Y7QUFDQSxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1RqQjs7Ozs7Ozs7Ozs7Ozs7QUNKQyxNQUFNQSxTQUFPLENBQUM7QUFDN0IsSUFBSSxXQUFXLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsRUFBRSxFQUFFO0FBQ3ZELFFBQVEsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7QUFDbkMsUUFBUSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztBQUNqQyxRQUFRLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQzdCLFFBQVEsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFLO0FBQzFCLFFBQVEsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFNO0FBQzVCLFFBQVEsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFDO0FBQzdELFFBQVEsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQztBQUMvRCxRQUFRLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUM7QUFDL0Q7QUFDQSxRQUFRLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUM7QUFDcEQ7QUFDQTtBQUNBLFFBQVEsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsR0FBRyxFQUFFLGFBQWEsRUFBQztBQUNuRCxLQUFLO0FBQ0w7QUFDQSxJQUFJLEtBQUssR0FBRztBQUNaLFFBQVEsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdkQsUUFBUSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLGNBQWMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssRUFBQztBQUM1RztBQUNBO0FBQ0EsUUFBUSxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBQztBQUM5QyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLCtEQUErRCxFQUFDO0FBQy9GLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFDO0FBQzNDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFDO0FBQ2pELFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUM7QUFDckU7QUFDQSxRQUFRLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSUMsRUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO0FBQzNELFlBQVksV0FBVyxFQUFFLElBQUk7QUFDN0IsWUFBWSxhQUFhLEVBQUUsQ0FBQyxLQUFLLEtBQUs7QUFDdEM7QUFDQSxhQUFhO0FBQ2IsWUFBWSxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUU7QUFDcEM7QUFDQSxhQUFhO0FBQ2IsWUFBWSxlQUFlLEVBQUUsS0FBSyxDQUFDLFlBQVk7QUFDL0MsWUFBWSxpQkFBaUIsRUFBRSxDQUFDO0FBQ2hDLFNBQVMsQ0FBQyxDQUFDO0FBQ1g7QUFDQSxRQUFRLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUM7QUFDeEM7QUFDQSxRQUFRLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtBQUNoQztBQUNBLFlBQVksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLEtBQUssQ0FBQyxTQUFTLEdBQUU7QUFDbEQsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBLElBQUksaUJBQWlCLENBQUMsYUFBYSxFQUFFLGFBQWEsRUFBRTtBQUNwRCxRQUFRLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0FBQzNDLFFBQVEsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7QUFDM0MsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLElBQUksa0JBQWtCLEdBQUc7QUFDekIsUUFBUSxPQUFPLElBQUksQ0FBQztBQUNwQixLQUFLO0FBQ0wsSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLEVBQUU7QUFDL0IsUUFBUSxPQUFPLElBQUksQ0FBQztBQUNwQixLQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUksZ0JBQWdCLENBQUMsVUFBVSxFQUFFO0FBQ2pDLFFBQVEsS0FBSyxDQUFDLCtDQUErQyxFQUFDO0FBQzlELEtBQUs7QUFDTDtBQUNBLElBQUksT0FBTyxHQUFHO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsT0FBTyxDQUFDLEdBQUcsRUFBRSxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBQztBQUNyRixRQUFRLE9BQU8sSUFBSSxDQUFDLElBQUk7QUFDeEIsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJLGFBQWEsQ0FBQyxVQUFVLEVBQUU7QUFDOUIsUUFBUSxLQUFLLENBQUMsa0RBQWtELEVBQUM7QUFDakUsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUU7QUFDakIsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFLE1BQU0sRUFBRTtBQUMzQztBQUNBLFFBQVEsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLFNBQVE7QUFDaEMsUUFBUSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVE7QUFDM0MsWUFBWSxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUM7QUFDNUUsUUFBUSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBQztBQUMvRCxRQUFRLElBQUksR0FBRyxFQUFFO0FBQ2pCLFVBQVUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUU7QUFDNUIsVUFBVSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRTtBQUM1QixVQUFVLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEtBQUssRUFBQztBQUNuRCxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0EsSUFBSSxTQUFTLENBQUMsR0FBRyxFQUFFO0FBQ25CO0FBQ0EsS0FBSztBQUNMO0FBQ0EsSUFBSSxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUU7QUFDbEI7QUFDQSxLQUFLO0FBQ0w7QUFDQSxJQUFJLElBQUksR0FBRztBQUNYO0FBQ0EsS0FBSztBQUNMO0FBQ0EsSUFBSSxLQUFLLEdBQUc7QUFDWjtBQUNBLEtBQUs7QUFDTDtBQUNBLElBQUksT0FBTyxHQUFHO0FBQ2Q7QUFDQSxLQUFLO0FBQ0w7O0FDeEhlLE1BQU0sS0FBSyxDQUFDO0FBQzNCLElBQUksV0FBVyxDQUFDLEdBQUcsRUFBRTtBQUNyQixRQUFRLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO0FBQy9CLFlBQVksS0FBSyxFQUFFLENBQUM7QUFDcEIsU0FBUyxFQUFDO0FBQ1YsUUFBUSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUc7QUFDdEIsUUFBUSxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDO0FBQzFDLEtBQUs7QUFDTDtBQUNBLElBQUksU0FBUyxHQUFHO0FBQ2hCLFFBQVEsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxFQUFFO0FBQ3RDLFlBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNoQyxZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUM7QUFDOUMsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBLElBQUksZ0JBQWdCLENBQUMsVUFBVSxFQUFFO0FBQ2pDO0FBQ0E7QUFDQSxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxNQUFLO0FBQzVDLEtBQUs7QUFDTDs7QUNuQkEsTUFBTUQsU0FBTyxTQUFTRSxTQUFZLENBQUM7QUFDbkMsSUFBSSxXQUFXLENBQUMsR0FBRztBQUNuQixRQUFRLEtBQUssQ0FBQ0MsUUFBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUM7QUFDNUI7QUFDQTtBQUNBO0FBQ0EsUUFBUSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksRUFBQztBQUNyQyxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFDO0FBQ2xEO0FBQ0EsUUFBUSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztBQUNsQyxRQUFRLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0FBQ2hDLFFBQVEsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7QUFDOUI7QUFDQSxRQUFRLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFDO0FBQ3RELEtBQUs7QUFDTDtBQUNBLElBQUksZ0JBQWdCLENBQUMsVUFBVSxFQUFFO0FBQ2pDLFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUM7QUFDaEQsS0FBSztBQUNMO0FBQ0EsSUFBSSxhQUFhLEdBQUc7QUFDcEIsUUFBUSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ2pDLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDRyxJQUFDQyxNQUFJLEdBQUcsWUFBWTtBQUN2QixJQUFJLElBQUksR0FBRyxHQUFHLElBQUlKLFNBQU8sR0FBRTtBQUMzQixJQUFJLEdBQUcsQ0FBQyxLQUFLLEdBQUU7QUFDZixJQUFJLE9BQU8sR0FBRztBQUNkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2JBOzs7Ozs7OztBQUZjO0FBS1o7QUFDRjtBQUNBLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEJ0Qjs7Ozs7Ozs7Ozs7Ozs7QUNKZCxNQUFNLE9BQU8sU0FBU0UsU0FBWSxDQUFDO0FBQ25DLElBQUksV0FBVyxDQUFDLEdBQUc7QUFDbkIsUUFBUSxLQUFLLENBQUNDLE1BQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFDO0FBQzVCLFFBQVEsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7QUFDbEMsS0FBSztBQUNMLENBQUM7QUFDRDtBQUNHLElBQUMsSUFBSSxHQUFHLFlBQVk7QUFDdkIsSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJLE9BQU8sR0FBRTtBQUMzQixJQUFJLEdBQUcsQ0FBQyxLQUFLLEdBQUU7QUFDZixJQUFJLE9BQU8sR0FBRztBQUNkOzsifQ==
