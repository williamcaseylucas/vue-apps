import { p as pushScopeId, a as popScopeId, o as openBlock, c as createBlock, b as createVNode, t as toDisplayString, u as unref, F as Fragment, i as inject, d as createApp, B as Bh, r as reactive, e as readonly, f as createTextVNode } from './vendor-27506e4b.js';

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
        super.updateSharedData(dataObject);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHVicy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Fzc2V0cy9sb2dvLnBuZyIsIi4uLy4uL3NyYy9jb21wb25lbnRzL05ldHdvcmtlZEhlbGxvV29ybGQudnVlIiwiLi4vLi4vc3JjL2FwcHMvSHVic1Rlc3QxL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9IdWJzQXBwLmpzIiwiLi4vLi4vc3JjL2FwcHMvSHVic1Rlc3QxL3NoYXJlZC5qcyIsIi4uLy4uL3NyYy9hcHBzL0h1YnNUZXN0MS9odWJzLmpzIiwiLi4vLi4vc3JjL2NvbXBvbmVudHMvSGVsbG9Xb3JsZC52dWUiLCIuLi8uLi9zcmMvYXBwcy9IdWJzVGVzdDIvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0h1YnNUZXN0Mi9odWJzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC8xYTZhY2UzNzcxMzNmMTRhLnBuZ1wiIiwiPHRlbXBsYXRlPlxuICA8aDEgeHItbGF5ZXIgY2xhc3M9XCJmYWRlXCI+e3sgbXNnIH19PC9oMT5cbiAgPHA+XG4gICAgSGVyZSdzIHNvbWUgbW9yZSB0ZXh0IGp1c3QgdG8gbWFrZSB0aGluZ3Mgbm90IGJsYW5rLlxuICA8L3A+XG5cbiAgPGJ1dHRvbiB4ci1sYXllciBAY2xpY2s9XCJzaGFyZWQuaW5jcmVtZW50XCI+Y291bnQgaXM6IHt7IHNoYXJlZC5zdGF0ZS5jb3VudCB9fTwvYnV0dG9uPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IGRlZmluZVByb3BzLCBpbmplY3QgfSBmcm9tICd2dWUnXG5cbmRlZmluZVByb3BzKHtcbiAgbXNnOiBTdHJpbmdcbn0pXG5cbmNvbnN0IHNoYXJlZCA9IGluamVjdCgnc2hhcmVkJylcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuYSB7XG4gIGNvbG9yOiAjYjU0MmI5O1xufVxuXG4uZmFkZSB7XG4gIGNvbG9yOiAjOTgwM2E1O1xuICAvKiB0cmFuc2l0aW9uOiBjb2xvciAxczsgKi9cbn1cblxuLmZhZGU6aG92ZXIge1xuICBjb2xvcjogI2E3OGUwNjtcbn1cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJ0b3BcIj5cbiAgICAgIDxpbWcgYWx0PVwiVnVlIGxvZ29cIiBzcmM9XCIuLi8uLi9hc3NldHMvbG9nby5wbmdcIiAvPlxuICAgICAgPFNvbWVUZXh0IG1zZz1cIk5ldHdvcmtlZCBWdWUgQ29tcG9uZW50IHdpdGggU2hhcmVkIEJ1dHRvbiBDb3VudFwiIC8+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBTb21lVGV4dCBmcm9tICcuLi8uLi9jb21wb25lbnRzL05ldHdvcmtlZEhlbGxvV29ybGQudnVlJ1xuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG48L3N0eWxlPlxuIiwiaW1wb3J0IHtjcmVhdGVBcHB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IFdlYkxheWVyM0QgfSBmcm9tIFwiZXRoZXJlYWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHVic0FwcCB7XG4gICAgY29uc3RydWN0b3IgKEFwcCwgd2lkdGgsIGhlaWdodCwgY3JlYXRlT3B0aW9ucz17fSkge1xuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc05ldHdvcmtlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU3RhdGljID0gdHJ1ZTtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0XG4gICAgICAgIHRoaXMuc2l6ZSA9IHsgd2lkdGg6IHdpZHRoLzEwMDAsIGhlaWdodDogaGVpZ2h0LzEwMDB9XG4gICAgICAgIHRoaXMudGFrZU93bmVyc2hpcCA9IHRoaXMudGFrZU93bmVyc2hpcFByb3RvLmJpbmQodGhpcylcbiAgICAgICAgdGhpcy5zZXRTaGFyZWREYXRhID0gdGhpcy5zZXRTaGFyZWREYXRhUHJvdG8uYmluZCh0aGlzKVxuXG4gICAgICAgIHRoaXMuaGVhZERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgLy90aGlzLmhlYWREaXYuc2V0QXR0cmlidXRlKFwic3R5bGVcIixcIndpZHRoOiAxMDAlO2hlaWdodDogMTAwJTtcIilcblxuICAgICAgICB0aGlzLnZ1ZUFwcCA9IGNyZWF0ZUFwcChBcHAsIGNyZWF0ZU9wdGlvbnMpXG4gICAgfVxuXG4gICAgbW91bnQoKSB7XG4gICAgICAgIHRoaXMudnVlUm9vdCA9IHRoaXMudnVlQXBwLm1vdW50KHRoaXMuaGVhZERpdik7XG4gICAgICAgIHRoaXMudnVlUm9vdC4kZWwuc2V0QXR0cmlidXRlKFwic3R5bGVcIixcIndpZHRoOiBcIiArIHRoaXMud2lkdGggKyBcInB4OyBoZWlnaHQ6IFwiICsgdGhpcy5oZWlnaHQgKyBcInB4O1wiKVxuXG4gICAgICAgIC8vIC8vIGFkZCBhIGxpbmsgdG8gdGhlIHNoYXJlZCBjc3NcbiAgICAgICAgbGV0IGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKVxuICAgICAgICBsLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0L2h1YnMuY3NzXCIpXG4gICAgICAgIGwuc2V0QXR0cmlidXRlKFwicmVsXCIsIFwic3R5bGVzaGVldFwiKVxuICAgICAgICBsLnNldEF0dHJpYnV0ZShcImNyb3Nzb3JpZ2luXCIsXCJhbm9ueW1vdXNcIilcbiAgICAgICAgdGhpcy52dWVSb290LiRlbC5pbnNlcnRCZWZvcmUobCwgdGhpcy52dWVSb290LiRlbC5maXJzdENoaWxkKVxuXG4gICAgICAgIHRoaXMud2ViTGF5ZXIzRCA9IG5ldyBXZWJMYXllcjNEKHRoaXMudnVlUm9vdC4kZWwsIHtcbiAgICAgICAgICAgIGF1dG9SZWZyZXNoOiB0cnVlLFxuICAgICAgICAgICAgb25MYXllckNyZWF0ZTogKGxheWVyKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gbm90aGluZyB5ZXRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkxheWVyUGFpbnQ6IChsYXllcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU3RhdGljKSB7IHRoaXMubmVlZHNVcGRhdGUgPSB0cnVlIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZXh0dXJlRW5jb2Rpbmc6IFRIUkVFLnNSR0JFbmNvZGluZyxcbiAgICAgICAgICAgIHJlbmRlck9yZGVyT2Zmc2V0OiAwICAvLyAtMTAwMFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zb2xlLmxvZyhcInNpemU6IFwiLCB0aGlzLnNpemUpXG5cbiAgICAgICAgaWYgKHRoaXMuaXNJbnRlcmFjdGl2ZSkge1xuICAgICAgICAgICAgLy8gZm9yIGludGVyYWN0aW9uXG4gICAgICAgICAgICB0aGlzLnJheWNhc3RlciA9IG5ldyBUSFJFRS5SYXljYXN0ZXIoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0TmV0d29ya01ldGhvZHModGFrZU93bmVyc2hpcCwgc2V0U2hhcmVkRGF0YSkge1xuICAgICAgICB0aGlzLnRha2VPd25lcnNoaXAgPSB0YWtlT3duZXJzaGlwO1xuICAgICAgICB0aGlzLnNldFNoYXJlZERhdGEgPSBzZXRTaGFyZWREYXRhO1xuICAgIH1cblxuICAgIC8vIGR1bW15IGZ1bmN0aW9ucywganVzdCB0byBhdm9pZCBlcnJvcnMgaWYgdGhleSBnZXQgY2FsbGVkIGJlZm9yZVxuICAgIC8vIG5ldHdvcmtpbmcgaXMgaW5pdGlhbGl6ZWQsIG9yIGNhbGxlZCB3aGVuIG5ldHdvcmtlZCBpcyBmYWxzZVxuICAgIHRha2VPd25lcnNoaXBQcm90bygpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHNldFNoYXJlZERhdGFQcm90byhvYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gcmVjZWl2ZSBkYXRhIHVwZGF0ZXMuICBzaG91bGQgYmUgb3ZlcnJpZGRlbiBieSBzdWJjbGFzc2VzLCBhbHNvIHJlcXVlc3RzXG4gICAgLy8gdXBkYXRlIG5leHQgdGlja1xuICAgIHVwZGF0ZVNoYXJlZERhdGEoZGF0YU9iamVjdCkge1xuICAgICAgICB0aGlzLm5lZWRzVXBkYXRlID0gdHJ1ZVxuICAgIH1cblxuICAgIGdldFNpemUoKSB7XG4gICAgICAgIC8vIGlmICghdGhpcy5jb21wU3R5bGVzKSB7XG4gICAgICAgIC8vICAgICB0aGlzLmNvbXBTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLnZ1ZVJvb3QuJGVsKTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyB2YXIgd2lkdGggPSB0aGlzLmNvbXBTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnd2lkdGgnKVxuICAgICAgICAvLyB3aWR0aCA9IHdpZHRoICYmIHdpZHRoLmxlbmd0aCA+IDAgPyBwYXJzZUZsb2F0KHdpZHRoKSAvIDEwMDA6IDFcbiAgICAgICAgLy8gdmFyIGhlaWdodCA9IHRoaXMuY29tcFN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKCdoZWlnaHQnKVxuICAgICAgICAvLyBoZWlnaHQgPSBoZWlnaHQgJiYgaGVpZ2h0Lmxlbmd0aCA+IDAgPyBwYXJzZUZsb2F0KGhlaWdodCkgLyAxMDAwOiAxXG4gICAgICAgIC8vIHRoaXMuc2l6ZSA9IHsgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodH1cbiAgICAgICAgY29uc29sZS5sb2cgKFwiZGl2IHNpemU6IHtcIiArIHRoaXMuc2l6ZS53aWR0aCArIFwiLCBcIiArIHRoaXMuc2l6ZS5oZWlnaHQgKyBcIn1cIilcbiAgICAgICAgcmV0dXJuIHRoaXMuc2l6ZVxuICAgIH1cblxuICAgIC8vIHJlY2VpdmUgZGF0YSB1cGRhdGVzLiAgc2hvdWxkIGJlIG92ZXJyaWRkZW4gYnkgc3ViY2xhc3Nlc1xuICAgIGdldFNoYXJlZERhdGEoZGF0YU9iamVjdCkge1xuICAgICAgICByYWlzZShcImdldFNoYXJlZERhdGEgc2hvdWxkIGJlIG92ZXJyaWRkZW4gYnkgc3ViY2xhc3Nlc1wiKVxuICAgIH1cbiAgICBcbiAgICAvLyBvdmVycmlkZSB0byBjaGVjayBmb3IgeW91ciBvd24gM0Qgb2JqZWN0cyB0aGF0IGFyZW4ndCB3ZWJMYXllcnNcbiAgICBjbGlja2VkKGV2dCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNJbnRlcmFjdGl2ZSkgeyByZXR1cm4gfVxuICAgICAgICBcbiAgICAgICAgY29uc3Qgb2JqID0gZXZ0Lm9iamVjdDNEXG4gICAgICAgIHRoaXMucmF5Y2FzdGVyLnJheS5zZXQob2JqLnBvc2l0aW9uLCBcbiAgICAgICAgICAgIHRoaXMud2ViTGF5ZXIzRC5nZXRXb3JsZERpcmVjdGlvbihuZXcgVEhSRUUuVmVjdG9yMygpKS5uZWdhdGUoKSlcbiAgICAgICAgY29uc3QgaGl0ID0gdGhpcy53ZWJMYXllcjNELmhpdFRlc3QodGhpcy5yYXljYXN0ZXIucmF5KVxuICAgICAgICBpZiAoaGl0KSB7XG4gICAgICAgICAgaGl0LnRhcmdldC5jbGljaygpXG4gICAgICAgICAgaGl0LnRhcmdldC5mb2N1cygpXG4gICAgICAgICAgY29uc29sZS5sb2coJ2hpdCcsIGhpdC50YXJnZXQsIGhpdC5sYXllcilcbiAgICAgICAgfSAgIFxuICAgIH1cblxuICAgIGRyYWdTdGFydChldnQpIHtcbiAgICAgICAgLy8gbm90aGluZyBoZXJlIC4uLiBzdWJjbGFzcyBzaG91bGQgb3ZlcnJpZGVcbiAgICB9XG5cbiAgICBkcmFnRW5kIChldnQpIHtcbiAgICAgICAgLy8gbm90aGluZyBoZXJlIC4uLiBzdWJjbGFzcyBzaG91bGQgb3ZlcnJpZGVcbiAgICB9XG5cbiAgICBwbGF5KCkge1xuICAgICAgICAvLyBpZiB3ZSBjYW4gZmlndXJlIG91dCBob3cgdG8gcGF1c2UsIHRoZW4gcmVzdGFydCBoZXJlXG4gICAgfVxuXG4gICAgcGF1c2UoKSB7XG4gICAgICAgIC8vIHBlcmhhcHMgZmlndXJlIG91dCBob3cgdG8gcGF1c2UgdGhlIFZ1ZSBjb21wb25lbnQ/XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgLy8gVE9ETzogZGVzdHJveSB0aGUgdnVlIGNvbXBvbmVudCBhbmQgYW55IHJlc291cmNlcywgZXRjLiwgaXQgaGFzXG4gICAgfVxuXG4gICAgdGljayh0aW1lKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1N0YXRpYyB8fCB0aGlzLm5lZWRzVXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLndlYkxheWVyM0QudXBkYXRlKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubmVlZHNVcGRhdGUgPSBmYWxzZVxuICAgIH1cbn0iLCJpbXBvcnQgeyByZWFjdGl2ZSwgaW5qZWN0LCByZWFkb25seSB9IGZyb20gXCJ2dWVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcmUge1xuICAgIGNvbnN0cnVjdG9yKGFwcCkge1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IHJlYWN0aXZlKHtcbiAgICAgICAgICAgIGNvdW50OiAwXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuYXBwID0gYXBwXG4gICAgICAgIHRoaXMuc3RhdGUgPSByZWFkb25seSh0aGlzLl9zdGF0ZSlcbiAgICB9ICAgIFxuXG4gICAgaW5jcmVtZW50KCkge1xuICAgICAgICBpZiAodGhpcy5hcHAudGFrZU93bmVyc2hpcCgpKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZS5jb3VudCsrO1xuICAgICAgICAgICAgdGhpcy5hcHAuc2V0U2hhcmVkRGF0YSh0aGlzLnN0YXRlKVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZVNoYXJlZERhdGEoZGF0YU9iamVjdCkge1xuICAgICAgICAvLyBuZWVkIHRvIHVwZGF0ZSB0aGUgZWxlbWVudHMgd2l0aGluIHRoZSBzdGF0ZSwgYmVjYXVzZSBvdGhlcndpc2VcbiAgICAgICAgLy8gdGhlIGRhdGEgd29uJ3QgZmxvdyB0byB0aGUgY29tcG9uZW50c1xuICAgICAgICB0aGlzLl9zdGF0ZS5jb3VudCA9IGRhdGFPYmplY3QuY291bnRcbiAgICB9XG59XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcbmltcG9ydCBTdG9yZSBmcm9tIFwiLi9zaGFyZWRcIlxuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHN1cGVyKEFwcCwgNDAwLCA0NzUpXG5cbiAgICAgICAgLy8gY3JlYXRlIG91ciBzaGFyZWQgZGF0YSBvYmplY3QgdGhhdCB3aWxsXG4gICAgICAgIC8vIHNoYXJlIGRhdGEgYmV0d2VlbiB2dWUgYW5kIGh1YnNcbiAgICAgICAgdGhpcy5zaGFyZWQgPSBuZXcgU3RvcmUodGhpcylcbiAgICAgICAgdGhpcy52dWVBcHAucHJvdmlkZSgnc2hhcmVkJywgdGhpcy5zaGFyZWQpXG5cbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc05ldHdvcmtlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNTdGF0aWMgPSBmYWxzZTtcblxuICAgICAgICBjb25zb2xlLmxvZyAoSlNPTi5zdHJpbmdpZnkodGhpcy5zaGFyZWQuZGF0YSkpXG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZVNoYXJlZERhdGEoZGF0YU9iamVjdCkge1xuICAgICAgICBzdXBlci51cGRhdGVTaGFyZWREYXRhKGRhdGFPYmplY3QpXG4gICAgICAgIHRoaXMuc2hhcmVkLnVwZGF0ZVNoYXJlZERhdGEoZGF0YU9iamVjdClcbiAgICB9XG5cbiAgICBnZXRTaGFyZWREYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWQuc3RhdGU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0XG4iLCI8dGVtcGxhdGU+XG4gIDxoMT57eyBtc2cgfX08L2gxPlxuXG4gIDxwPlxuICAgIDxhIGhyZWY9XCJodHRwczovL3ZpdGVqcy5kZXYvZ3VpZGUvZmVhdHVyZXMuaHRtbFwiIHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgVml0ZSBEb2N1bWVudGF0aW9uIGFuZCBUaGVuIFNvbWUhIFxuICAgIDwvYT5cbiAgICB8XG4gICAgPGEgaHJlZj1cImh0dHBzOi8vdjMudnVlanMub3JnL1wiIHRhcmdldD1cIl9ibGFua1wiPlZ1ZSAzIERvY3VtZW50YXRpb248L2E+XG4gIDwvcD5cblxuICA8YnV0dG9uIHhyLWxheWVyIEBjbGljaz1cInN0YXRlLmNvdW50KytcIj5jb3VudCBpczoge3sgc3RhdGUuY291bnQgfX08L2J1dHRvbj5cbiAgPHA+XG4gICAgRWRpdFxuICAgIDxjb2RlPmNvbXBvbmVudHMvSGVsbG9Xb3JsZC52dWU8L2NvZGU+IHRvIHRlc3QgaG90IG1vZHVsZSByZXBsYWNlbWVudCB3aGlsZSBydW5uaW5nIHByb2plY3QgYXMgXCJucG0gcnVuIGRldlwiLlxuICA8L3A+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgZGVmaW5lUHJvcHMsIHJlYWN0aXZlIH0gZnJvbSAndnVlJ1xuXG5kZWZpbmVQcm9wcyh7XG4gIG1zZzogU3RyaW5nXG59KVxuXG5jb25zdCBzdGF0ZSA9IHJlYWN0aXZlKHsgY291bnQ6IDAgfSlcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInRvcFwiPlxuICAgICAgPGltZyBhbHQ9XCJWdWUgbG9nb1wiIHNyYz1cIi4uLy4uL2Fzc2V0cy9sb2dvLnBuZ1wiIC8+XG4gICAgICA8SGVsbG9Xb3JsZCBtc2c9XCJWdWUgQ29tcG9uZW50IHdpdGggTG9jYWwgQnV0dG9uIENvdW50XCIgLz5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IEhlbGxvV29ybGQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9IZWxsb1dvcmxkLnZ1ZSdcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHN1cGVyKEFwcCwgNTAwLCA1MDApXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0Il0sIm5hbWVzIjpbIkh1YnNBcHAiLCJXZWJMYXllcjNEIiwiSHVic0FwcFByb3RvIiwiQXBwIiwiaW5pdCJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQkFBZTs7Ozs7Ozs7O0FDV2Y7Ozs7Ozs7O0FBRmM7QUFLWjtBQUNGO0FBQ0EsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNUakI7Ozs7Ozs7Ozs7Ozs7O0FDSkMsTUFBTUEsU0FBTyxDQUFDO0FBQzdCLElBQUksV0FBVyxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLEVBQUUsRUFBRTtBQUN2RCxRQUFRLElBQUksQ0FB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
