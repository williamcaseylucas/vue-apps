import {V as Vector2, f as Vector3, Q as Quaternion, B as Box2, l as lru, s as sha256, M as Matrix4, R as ResizeObserver$1, _ as _THREE} from "./vendor.js";
Object.freeze(new Vector2(0, 0));
Object.freeze(new Vector2(1, 1));
Object.freeze(new Vector3(0, 0, 0));
Object.freeze(new Vector3(1, 0, 0));
Object.freeze(new Vector3(0, 1, 0));
Object.freeze(new Vector3(0, 0, 1));
Object.freeze(new Vector3(1, 1, 1));
Object.freeze(new Quaternion());
({
  RIGHT: Object.freeze(new Vector3(1, 0, 0)),
  UP: Object.freeze(new Vector3(0, 1, 0)),
  NEAR: Object.freeze(new Vector3(0, 0, 1)),
  LEFT: Object.freeze(new Vector3(-1, 0, 0)),
  DOWN: Object.freeze(new Vector3(0, -1, 0)),
  FAR: Object.freeze(new Vector3(0, 0, -1))
});
new Vector3();
(() => {
  const _2PI = Math.PI * 2;
  const V_0012 = new Vector3(0, 0, 1);
  const twist = new Quaternion();
  const swing = new Quaternion();
  const swingAxis = new Vector3();
  const out = new Quaternion();
  return function randomQuaternion2(twistScale = 1, swingScale = 1) {
    var twistMagnitude = (Math.random() - 0.5) * _2PI * twistScale;
    var swingDirection = Math.random() * _2PI;
    var swingMagnitude = Math.random() * Math.PI * swingScale;
    swingAxis.set(1, 0, 0).applyAxisAngle(V_0012, swingDirection);
    twist.setFromAxisAngle(V_0012, twistMagnitude);
    swing.setFromAxisAngle(swingAxis, swingMagnitude);
    return out.multiplyQuaternions(swing, twist);
  };
})();
(() => {
  const vec = new Vector3();
  return function extractRotationAboutAxis2(rot, direction, out) {
    const rotAxis = vec.set(rot.x, rot.y, rot.z);
    const dotProd = direction.dot(rotAxis);
    const projection = vec.copy(direction).multiplyScalar(dotProd);
    const twist = out.set(projection.x, projection.y, projection.z, rot.w).normalize();
    if (dotProd < 0) {
      twist.x = -twist.x;
      twist.y = -twist.y;
      twist.z = -twist.z;
      twist.w = -twist.w;
    }
    return twist;
  };
})();
new Box2();
new Box2();
new Vector2();
new Vector2();
new Vector3();
new Vector3();
new Vector3();
new Vector3();
new Vector3();
new Vector3();
new Vector3();
new Vector3();
function traverseChildElements(node, each, bind, level = 0) {
  level++;
  for (let child = node.firstChild; child; child = child.nextSibling) {
    if (child.nodeType === Node.ELEMENT_NODE) {
      const el = child;
      if (each.call(bind, el, level)) {
        traverseChildElements(el, each, bind, level);
      }
    }
  }
}
function addCSSRule(sheet, selector, rules, index) {
  if ("insertRule" in sheet) {
    sheet.insertRule(selector + "{" + rules + "}", index);
  } else if ("addRule" in sheet) {
    sheet.addRule(selector, rules, index);
  }
}
class Bounds {
  constructor() {
    this.left = 0;
    this.top = 0;
    this.width = 0;
    this.height = 0;
  }
  copy(rect) {
    this.top = rect.top;
    this.left = rect.left;
    this.width = rect.width;
    this.height = rect.height;
    return this;
  }
}
class Edges {
  constructor() {
    this.left = 0;
    this.top = 0;
    this.right = 0;
    this.bottom = 0;
  }
  copy(rect) {
    this.top = rect.top;
    this.left = rect.left;
    this.right = rect.right;
    this.bottom = rect.bottom;
    return this;
  }
}
function getBounds(element, bounds = new Bounds(), referenceElement) {
  const doc = element.ownerDocument;
  const defaultView = element.ownerDocument.defaultView;
  const docEl = doc.documentElement;
  const body = doc.body;
  if (element === docEl) {
    return getDocumentBounds(doc, bounds);
  }
  if (referenceElement === element) {
    bounds.left = 0;
    bounds.top = 0;
    bounds.width = element.offsetWidth;
    bounds.height = element.offsetHeight;
    return;
  }
  let el = element;
  let computedStyle;
  let offsetParent = el.offsetParent;
  let prevComputedStyle = defaultView.getComputedStyle(el, null);
  let top = el.offsetTop;
  let left = el.offsetLeft;
  if (offsetParent && referenceElement && offsetParent.contains(referenceElement) && offsetParent !== referenceElement) {
    getBounds(referenceElement, bounds, offsetParent);
    left -= bounds.left;
    top -= bounds.top;
  }
  while ((el = el.parentNode) && el !== body && el !== docEl && el !== referenceElement) {
    if (prevComputedStyle.position === "fixed") {
      break;
    }
    computedStyle = defaultView.getComputedStyle(el, null);
    top -= el.scrollTop;
    left -= el.scrollLeft;
    if (el === offsetParent) {
      top += el.offsetTop;
      left += el.offsetLeft;
      top += parseFloat(computedStyle.borderTopWidth) || 0;
      left += parseFloat(computedStyle.borderLeftWidth) || 0;
      offsetParent = el.offsetParent;
    }
    prevComputedStyle = computedStyle;
  }
  if (prevComputedStyle.position === "fixed") {
    top += Math.max(docEl.scrollTop, body.scrollTop);
    left += Math.max(docEl.scrollLeft, body.scrollLeft);
  }
  bounds.left = left;
  bounds.top = top;
  bounds.width = element.offsetWidth;
  bounds.height = element.offsetHeight;
  return bounds;
}
function getMargin(element, margin) {
  let style = getComputedStyle(element);
  margin.left = parseFloat(style.marginLeft) || 0;
  margin.right = parseFloat(style.marginRight) || 0;
  margin.top = parseFloat(style.marginTop) || 0;
  margin.bottom = parseFloat(style.marginBottom) || 0;
}
function getBorder(element, border) {
  let style = getComputedStyle(element);
  border.left = parseFloat(style.borderLeftWidth) || 0;
  border.right = parseFloat(style.borderRightWidth) || 0;
  border.top = parseFloat(style.borderTopWidth) || 0;
  border.bottom = parseFloat(style.borderBottomWidth) || 0;
}
function getPadding(element, padding) {
  let style = getComputedStyle(element);
  padding.left = parseFloat(style.paddingLeft) || 0;
  padding.right = parseFloat(style.paddingRight) || 0;
  padding.top = parseFloat(style.paddingTop) || 0;
  padding.bottom = parseFloat(style.paddingBottom) || 0;
}
function getViewportBounds(bounds) {
  if (!viewportTester.parentNode)
    document.documentElement.append(viewportTester);
  bounds.left = pageXOffset;
  bounds.top = pageYOffset;
  bounds.width = viewportTester.offsetWidth;
  bounds.height = viewportTester.offsetHeight;
  return bounds;
}
const viewportTester = document.createElement("div");
viewportTester.id = "VIEWPORT";
viewportTester.style.position = "fixed";
viewportTester.style.width = "100vw";
viewportTester.style.height = "100vh";
viewportTester.style.visibility = "hidden";
viewportTester.style.pointerEvents = "none";
function getDocumentBounds(document2, bounds) {
  const documentElement = document2.documentElement;
  const body = document2.body;
  const documentElementStyle = getComputedStyle(documentElement);
  const bodyStyle = getComputedStyle(body);
  bounds.top = body.offsetTop + parseFloat(documentElementStyle.marginTop) || 0 + parseFloat(bodyStyle.marginTop) || 0;
  bounds.left = body.offsetLeft + parseFloat(documentElementStyle.marginLeft) || 0 + parseFloat(bodyStyle.marginLeft) || 0;
  bounds.width = Math.max(Math.max(body.scrollWidth, documentElement.scrollWidth), Math.max(body.offsetWidth, documentElement.offsetWidth), Math.max(body.clientWidth, documentElement.clientWidth));
  bounds.height = Math.max(Math.max(body.scrollHeight, documentElement.scrollHeight), Math.max(body.offsetHeight, documentElement.offsetHeight), Math.max(body.clientHeight, documentElement.clientHeight));
  return bounds;
}
function DOM(html) {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;
  const el = wrapper.firstElementChild;
  wrapper.removeChild(el);
  return el;
}
const _WebLayer = class {
  constructor(element, eventCallback) {
    this.element = element;
    this.eventCallback = eventCallback;
    this.needsRefresh = true;
    this.needsRemoval = false;
    this.psuedoStates = {
      hover: false,
      active: false,
      focus: false,
      target: false
    };
    this.svgImage = new Image();
    this.bounds = new Bounds();
    this.padding = new Edges();
    this.margin = new Edges();
    this.border = new Edges();
    this.childLayers = [];
    this.cachedBounds = new Map();
    this.cachedMargin = new Map();
    this._dynamicAttributes = "";
    this._svgDocument = "";
    this._rasterizingDocument = "";
    this._svgSrc = "";
    this._hashingCanvas = document.createElement("canvas");
    WebRenderer.layers.set(element, this);
    this.id = element.getAttribute(WebRenderer.ELEMENT_UID_ATTRIBUTE) || WebRenderer.generateElementUID();
    element.setAttribute(WebRenderer.ELEMENT_UID_ATTRIBUTE, this.id);
    element.setAttribute(WebRenderer.LAYER_ATTRIBUTE, "");
    this.parentLayer = WebRenderer.getClosestLayer(this.element.parentElement);
    this.eventCallback("layercreated", {target: element});
    _WebLayer.cachedCanvases.limit = WebRenderer.layers.size * _WebLayer.DEFAULT_CACHE_SIZE;
    this._hashingCanvas.width = 8;
    this._hashingCanvas.height = 8;
  }
  set canvas(val) {
    if (this._canvas !== val) {
      this._canvas = val;
      if (this.eventCallback)
        this.eventCallback("layerpainted", {target: this.element});
    }
  }
  get canvas() {
    return this._canvas;
  }
  get depth() {
    let depth = 0;
    let layer = this;
    while (layer.parentLayer) {
      layer = layer.parentLayer;
      depth++;
    }
    return depth;
  }
  get rootLayer() {
    let rootLayer = this;
    while (rootLayer.parentLayer)
      rootLayer = rootLayer.parentLayer;
    return rootLayer;
  }
  traverseParentLayers(each) {
    const parentLayer = this.parentLayer;
    if (parentLayer) {
      parentLayer.traverseParentLayers(each);
      each(parentLayer);
    }
  }
  traverseLayers(each) {
    each(this);
    this.traverseChildLayers(each);
  }
  traverseChildLayers(each) {
    for (const child of this.childLayers) {
      child.traverseLayers(each);
    }
  }
  refresh() {
    getBounds(this.element, this.bounds, this.parentLayer && this.parentLayer.element);
    this.needsRefresh = false;
    this._updateParentAndChildLayers();
    WebRenderer.addToSerializeQueue(this);
  }
  _updateParentAndChildLayers() {
    const element = this.element;
    const childLayers = this.childLayers;
    const oldChildLayers = childLayers.slice();
    const previousParentLayer = this.parentLayer;
    this.parentLayer = WebRenderer.getClosestLayer(this.element.parentElement);
    if (previousParentLayer !== this.parentLayer) {
      this.parentLayer && this.parentLayer.childLayers.push(this);
      this.eventCallback("layermoved", {target: element});
    }
    childLayers.length = 0;
    traverseChildElements(element, this._tryConvertElementToWebLayer, this);
    for (const child of oldChildLayers) {
      const parentLayer = WebRenderer.getClosestLayer(child.element.parentElement);
      if (!parentLayer) {
        child.needsRemoval = true;
        childLayers.push(child);
      }
    }
  }
  _tryConvertElementToWebLayer(n) {
    if (this.needsRemoval)
      return false;
    const el = n;
    const styles = getComputedStyle(el);
    const id = el.getAttribute(WebRenderer.ELEMENT_UID_ATTRIBUTE);
    if (!id) {
      el.setAttribute(WebRenderer.ELEMENT_UID_ATTRIBUTE, WebRenderer.generateElementUID());
    }
    const isLayer = el.hasAttribute(WebRenderer.LAYER_ATTRIBUTE);
    if (isLayer || el.nodeName === "VIDEO" || styles.transform !== "none") {
      let child = WebRenderer.layers.get(el);
      if (!child) {
        child = new _WebLayer(el, this.eventCallback);
      }
      this.childLayers.push(child);
      return false;
    }
    return true;
  }
  async serialize() {
    if (this.element.nodeName === "VIDEO")
      return;
    let {width, height} = this.bounds;
    if (width * height > 0) {
      getPadding(this.element, this.padding);
      getMargin(this.element, this.margin);
      getBorder(this.element, this.border);
      width += Math.max(this.margin.left, 0) + Math.max(this.margin.right, 0);
      height += Math.max(this.margin.top, 0) + Math.max(this.margin.bottom, 0);
      const elementAttribute = WebRenderer.attributeHTML(WebRenderer.ELEMENT_UID_ATTRIBUTE, "" + this.id);
      const layerElement = this.element;
      const needsInlineBlock = getComputedStyle(layerElement).display === "inline";
      WebRenderer.updateInputAttributes(layerElement);
      const layerHTML = WebRenderer.serializer.serializeToString(layerElement).replace(elementAttribute, `${elementAttribute} ${WebRenderer.RENDERING_ATTRIBUTE}="" ${needsInlineBlock ? `${WebRenderer.RENDERING_INLINE_ATTRIBUTE}="" ` : " "} ` + WebRenderer.getPsuedoAttributes(this.psuedoStates));
      const parentsHTML = this._getParentsHTML(layerElement);
      parentsHTML[0] = parentsHTML[0].replace("html", "html " + WebRenderer.RENDERING_DOCUMENT_ATTRIBUTE + '="" ');
      const [svgPageCSS] = await Promise.all([
        WebRenderer.getEmbeddedPageCSS(),
        WebRenderer.embedExternalResources(this.element)
      ]);
      const docString = '<svg width="' + width + '" height="' + height + '" xmlns="http://www.w3.org/2000/svg"><defs><style type="text/css"><![CDATA[a[href]{color:#0000EE;text-decoration:underline;}' + svgPageCSS.join("") + ']]></style></defs><foreignObject x="0" y="0" width="' + width + '" height="' + height + '">' + parentsHTML[0] + layerHTML + parentsHTML[1] + "</foreignObject></svg>";
      const svgDoc = this._svgDocument = docString;
      const canvasHash = _WebLayer.canvasHashes.get(svgDoc);
      if (canvasHash && _WebLayer.cachedCanvases.has(canvasHash)) {
        this.canvas = _WebLayer.cachedCanvases.get(canvasHash);
        return;
      }
      this.cachedBounds.set(svgDoc, new Bounds().copy(this.bounds));
      this.cachedMargin.set(svgDoc, new Edges().copy(this.margin));
      WebRenderer.addToRasterizeQueue(this);
    }
  }
  async rasterize() {
    return new Promise((resolve) => {
      this.svgImage.onload = () => {
        WebRenderer.addToRenderQueue(this);
        resolve();
      };
      this._rasterizingDocument = this._svgDocument;
      this.svgImage.src = this._svgSrc = "data:image/svg+xml;utf8," + encodeURIComponent(this._svgDocument);
      if (this.svgImage.complete && this.svgImage.currentSrc === this.svgImage.src) {
        WebRenderer.addToRenderQueue(this);
        this.svgImage.onload = null;
        resolve();
      }
    });
  }
  render() {
    const svgDoc = this._rasterizingDocument;
    if (!this.cachedBounds.has(svgDoc) || !this.cachedMargin.has(svgDoc)) {
      this.needsRefresh = true;
      return;
    }
    if (!this.svgImage.complete) {
      WebRenderer.addToRenderQueue(this);
      return;
    }
    let {width, height} = this.cachedBounds.get(svgDoc);
    let {left, top} = this.cachedMargin.get(svgDoc);
    const hashingCanvas = this._hashingCanvas;
    let hw = hashingCanvas.width;
    let hh = hashingCanvas.height;
    const hctx = hashingCanvas.getContext("2d");
    hctx.clearRect(0, 0, hw, hh);
    hctx.imageSmoothingEnabled = false;
    hctx.drawImage(this.svgImage, left, top, width, height, 0, 0, hw, hh);
    const hashData = hctx.getImageData(0, 0, hw, hh).data;
    const newHash = WebRenderer.arrayBufferToBase64(sha256.exports.hash(new Uint8Array(hashData))) + "?w=" + width + ";h=" + height;
    _WebLayer.canvasHashes.set(svgDoc, newHash);
    const blankRetryCount = _WebLayer.blankRetryCounts.get(svgDoc) || 0;
    if (WebRenderer.isBlankImage(hashData) && blankRetryCount < 10) {
      _WebLayer.blankRetryCounts.set(svgDoc, blankRetryCount + 1);
      setTimeout(() => WebRenderer.addToRenderQueue(this), 500);
      return;
    }
    if (_WebLayer.cachedCanvases.has(newHash)) {
      this.canvas = _WebLayer.cachedCanvases.get(newHash);
      return;
    }
    const pixelRatio = this.pixelRatio || parseFloat(this.element.getAttribute(WebRenderer.PIXEL_RATIO_ATTRIBUTE)) || window.devicePixelRatio;
    const newCanvas = _WebLayer.cachedCanvases.size === _WebLayer.cachedCanvases.limit ? _WebLayer.cachedCanvases.shift()[1] : document.createElement("canvas");
    let w = newCanvas.width = width * pixelRatio;
    let h = newCanvas.height = height * pixelRatio;
    const ctx = newCanvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(this.svgImage, left, top, width, height, 0, 0, w, h);
    _WebLayer.cachedCanvases.set(newHash, newCanvas);
    this.canvas = newCanvas;
  }
  _getParentsHTML(element) {
    const opens = [];
    const closes = [];
    let parent = element.parentElement;
    do {
      let tag = parent.tagName.toLowerCase();
      let attributes = " ";
      for (const a of parent.attributes) {
        if (a.name === "style")
          continue;
        attributes += `${a.name}="${a.value}" `;
      }
      const open = "<" + tag + (tag === "html" ? ` xmlns="http://www.w3.org/1999/xhtml" style="--x-width:${this.bounds.width}px;--x-height:${this.bounds.height}px;--x-inline-top:${this.border.top + this.margin.top + this.padding.top}px" ` : "") + attributes + `${WebRenderer.RENDERING_PARENT_ATTRIBUTE}=""  >`;
      opens.unshift(open);
      const close = "</" + tag + ">";
      closes.push(close);
      if (tag == "html")
        break;
    } while (parent = parent.parentElement);
    return [opens.join(""), closes.join("")];
  }
};
let WebLayer = _WebLayer;
WebLayer.DEFAULT_CACHE_SIZE = 4;
WebLayer.blankRetryCounts = new Map();
WebLayer.canvasHashes = new lru.LRUMap(1e3);
WebLayer.cachedCanvases = new lru.LRUMap(_WebLayer.DEFAULT_CACHE_SIZE);
const ResizeObserver = self.ResizeObserver || ResizeObserver$1;
function ensureElementIsInDocument(element) {
  const document2 = element.ownerDocument;
  if (document2.contains(element)) {
    return element;
  }
  const container = document2.createElement("div");
  container.setAttribute(WebRenderer.RENDERING_CONTAINER_ATTRIBUTE, "");
  container.style.position = "fixed";
  container.style.width = "100%";
  container.style.height = "100%";
  container.style.top = "-100000px";
  container.style["contain"] = "strict";
  container.appendChild(element);
  document2.documentElement.appendChild(container);
  return element;
}
const scratchMat1 = new Matrix4();
const scratchMat2 = new Matrix4();
const textDecoder = new TextDecoder();
const _WebRenderer = class {
  static get ELEMENT_UID_ATTRIBUTE() {
    return this.ATTRIBUTE_PREFIX + "-uid";
  }
  static get HOVER_ATTRIBUTE() {
    return this.ATTRIBUTE_PREFIX + "-hover";
  }
  static get ACTIVE_ATTRIBUTE() {
    return this.ATTRIBUTE_PREFIX + "-active";
  }
  static get FOCUS_ATTRIBUTE() {
    return this.ATTRIBUTE_PREFIX + "-focus";
  }
  static get TARGET_ATTRIBUTE() {
    return this.ATTRIBUTE_PREFIX + "-target";
  }
  static get LAYER_ATTRIBUTE() {
    return this.ATTRIBUTE_PREFIX + "-layer";
  }
  static get PIXEL_RATIO_ATTRIBUTE() {
    return this.ATTRIBUTE_PREFIX + "-pixel-ratio";
  }
  static get RENDERING_ATTRIBUTE() {
    return this.ATTRIBUTE_PREFIX + "-rendering";
  }
  static get RENDERING_PARENT_ATTRIBUTE() {
    return this.ATTRIBUTE_PREFIX + "-rendering-parent";
  }
  static get RENDERING_CONTAINER_ATTRIBUTE() {
    return this.ATTRIBUTE_PREFIX + "-rendering-container";
  }
  static get RENDERING_INLINE_ATTRIBUTE() {
    return this.ATTRIBUTE_PREFIX + "-rendering-inline";
  }
  static get RENDERING_DOCUMENT_ATTRIBUTE() {
    return this.ATTRIBUTE_PREFIX + "-rendering-document";
  }
  static generateElementUID() {
    return "" + this._nextUID++;
  }
  static getPsuedoAttributes(states) {
    return `${states.hover ? `${this.HOVER_ATTRIBUTE}="" ` : " "}${states.focus ? `${this.FOCUS_ATTRIBUTE}="" ` : " "}${states.active ? `${this.ACTIVE_ATTRIBUTE}="" ` : " "}${states.target ? `${this.TARGET_ATTRIBUTE}="" ` : " "}`;
  }
  static _init() {
    if (this._didInit)
      return;
    this._didInit = true;
    const style = document.createElement("style");
    document.head.append(style);
    const sheet = style.sheet;
    let i = 0;
    addCSSRule(sheet, `[${_WebRenderer.RENDERING_DOCUMENT_ATTRIBUTE}] *`, "transform: none !important;", i++);
    addCSSRule(sheet, `[${_WebRenderer.RENDERING_ATTRIBUTE}], [${_WebRenderer.RENDERING_ATTRIBUTE}] *`, "visibility: visible !important;", i++);
    addCSSRule(sheet, `[${_WebRenderer.RENDERING_ATTRIBUTE}] [${_WebRenderer.LAYER_ATTRIBUTE}], [${_WebRenderer.RENDERING_ATTRIBUTE}] [${_WebRenderer.LAYER_ATTRIBUTE}] *`, "visibility: hidden !important;", i++);
    addCSSRule(sheet, `[${_WebRenderer.RENDERING_ATTRIBUTE}]`, "position: relative; top: 0 !important; left: 0 !important; float: none; box-sizing:border-box; width:var(--x-width); height:var(--x-height);", i++);
    addCSSRule(sheet, `[${_WebRenderer.RENDERING_INLINE_ATTRIBUTE}]`, "top: var(--x-inline-top) !important; width:auto !important", i++);
    addCSSRule(sheet, `[${_WebRenderer.RENDERING_PARENT_ATTRIBUTE}]`, "transform: none !important; left: 0 !important; top: 0 !important; margin: 0 !important; border:0 !important; border-radius:0 !important; height:100% !important; padding:0 !important; position:static !important; text-align:left !important; display:block !important; background: rgba(0,0,0,0) none !important; box-shadow:none !important", i++);
    addCSSRule(sheet, `[${_WebRenderer.RENDERING_PARENT_ATTRIBUTE}]::before, [${_WebRenderer.RENDERING_PARENT_ATTRIBUTE}]::after`, "content:none !important; box-shadow:none !important;", i++);
    let previousHash = "";
    const onHashChange = () => {
      if (previousHash != window.location.hash) {
        if (window.location.hash) {
          try {
            this.targetElement = document.querySelector(window.location.hash);
          } catch {
          }
        }
      }
      previousHash = window.location.hash;
    };
    window.addEventListener("hashchange", onHashChange, false);
    onHashChange();
    window.addEventListener("focusin", (evt) => {
      this.focusElement = evt.target;
    }, false);
    window.addEventListener("focusout", (evt) => {
      this.focusElement = null;
    }, false);
    const setNeedsRefreshOnAllLayers = () => {
      for (const [e, l] of this.layers)
        l.needsRefresh = true;
    };
    window.addEventListener("load", (event) => {
      setNeedsRefreshOnAllLayers();
    });
    const setNeedsRefreshOnStyleLoad = (node) => {
      var nodeName = node.nodeName.toUpperCase();
      if (STYLE_NODES.indexOf(nodeName) !== -1)
        node.addEventListener("load", setNeedsRefreshOnAllLayers);
    };
    const STYLE_NODES = ["STYLE", "LINK"];
    this.documentObserver = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (STYLE_NODES.indexOf(m.target.nodeName.toUpperCase()) !== -1) {
          setNeedsRefreshOnAllLayers();
          this.embeddedPageCSS.delete(m.target);
        }
        for (const node of m.addedNodes)
          setNeedsRefreshOnStyleLoad(node);
      }
    });
    this.documentObserver.observe(document, {
      childList: true,
      attributes: true,
      characterData: true,
      subtree: true,
      attributeOldValue: true,
      characterDataOldValue: true
    });
  }
  static addToSerializeQueue(layer) {
    if (this.serializeQueue.indexOf(layer) === -1)
      this.serializeQueue.push(layer);
  }
  static addToRasterizeQueue(layer) {
    if (this.rasterizeQueue.indexOf(layer) === -1)
      this.rasterizeQueue.push(layer);
  }
  static addToRenderQueue(layer) {
    if (this.renderQueue.indexOf(layer) === -1)
      this.renderQueue.push(layer);
  }
  static _runTasks() {
    _WebRenderer.tasksPending = false;
    const serializeQueue = _WebRenderer.serializeQueue;
    const rasterizeQueue = _WebRenderer.rasterizeQueue;
    const renderQueue = _WebRenderer.renderQueue;
    const maxSyncTime = _WebRenderer.TASK_SYNC_MAX_TIME / 2;
    let startTime = performance.now();
    while (renderQueue.length && performance.now() - startTime < maxSyncTime) {
      renderQueue.shift().render();
    }
    startTime = performance.now();
    while (serializeQueue.length && performance.now() - startTime < maxSyncTime) {
      serializeQueue.shift().serialize();
    }
    if (rasterizeQueue.length && _WebRenderer.rasterizeTaskCount < _WebRenderer.TASK_ASYNC_MAX_COUNT) {
      _WebRenderer.rasterizeTaskCount++;
      rasterizeQueue.shift().rasterize().then(() => {
        _WebRenderer.rasterizeTaskCount--;
      });
    }
  }
  static scheduleTasksIfNeeded() {
    if (this.tasksPending || _WebRenderer.serializeQueue.length === 0 && _WebRenderer.renderQueue.length === 0 && (_WebRenderer.rasterizeQueue.length === 0 || _WebRenderer.rasterizeTaskCount === _WebRenderer.TASK_ASYNC_MAX_COUNT))
      return;
    this.tasksPending = true;
    _WebRenderer.scheduleIdle(_WebRenderer._runTasks);
  }
  static scheduleIdle(cb) {
    setTimeout(cb, 1);
  }
  static setLayerNeedsRefresh(layer) {
    layer.needsRefresh = true;
  }
  static createLayerTree(element, eventCallback) {
    if (_WebRenderer.getClosestLayer(element))
      throw new Error("A root WebLayer for the given element already exists");
    _WebRenderer._init();
    ensureElementIsInDocument(element);
    const observer = new MutationObserver(_WebRenderer._handleMutations);
    this.mutationObservers.set(element, observer);
    this.startMutationObserver(element);
    const resizeObserver = new ResizeObserver((records) => {
      for (const record of records) {
        const layer2 = this.getClosestLayer(record.target);
        layer2.traverseLayers(_WebRenderer.setLayerNeedsRefresh);
        layer2.traverseParentLayers(_WebRenderer.setLayerNeedsRefresh);
      }
    });
    resizeObserver.observe(element);
    this.resizeObservers.set(element, resizeObserver);
    element.addEventListener("input", this._triggerRefresh, {capture: true});
    element.addEventListener("keydown", this._triggerRefresh, {capture: true});
    element.addEventListener("submit", this._triggerRefresh, {capture: true});
    element.addEventListener("change", this._triggerRefresh, {capture: true});
    element.addEventListener("focus", this._triggerRefresh, {capture: true});
    element.addEventListener("blur", this._triggerRefresh, {capture: true});
    element.addEventListener("transitionend", this._triggerRefresh, {capture: true});
    const layer = new WebLayer(element, eventCallback);
    this.rootLayers.set(element, layer);
    return layer;
  }
  static disposeLayer(layer) {
    if (this.rootLayers.has(layer.element)) {
      this.rootLayers.delete(layer.element);
      const observer = this.mutationObservers.get(layer.element);
      observer.disconnect();
      this.mutationObservers.delete(layer.element);
      const resizeObserver = this.resizeObservers.get(layer.element);
      resizeObserver.disconnect();
      this.resizeObservers.delete(layer.element);
      layer.element.removeEventListener("input", this._triggerRefresh, {capture: true});
      layer.element.removeEventListener("keydown", this._triggerRefresh, {capture: true});
      layer.element.removeEventListener("submit", this._triggerRefresh, {capture: true});
      layer.element.removeEventListener("change", this._triggerRefresh, {capture: true});
      layer.element.removeEventListener("focus", this._triggerRefresh, {capture: true});
      layer.element.removeEventListener("blur", this._triggerRefresh, {capture: true});
      layer.element.removeEventListener("transitionend", this._triggerRefresh, {capture: true});
    }
  }
  static getClosestLayer(element) {
    const closestLayerElement = element && element.closest(`[${_WebRenderer.LAYER_ATTRIBUTE}]`);
    return this.layers.get(closestLayerElement);
  }
  static getCSSTransformForElement(element, out = new Matrix4()) {
    const styles = getComputedStyle(element);
    var transformcss = styles["transform"];
    if (transformcss.indexOf("matrix(") == 0) {
      out.identity();
      var mat = transformcss.substring(7, transformcss.length - 1).split(", ").map(parseFloat);
      out.elements[0] = mat[0];
      out.elements[1] = mat[1];
      out.elements[4] = mat[2];
      out.elements[5] = mat[3];
      out.elements[12] = mat[4];
      out.elements[13] = mat[5];
    } else if (transformcss.indexOf("matrix3d(") == 0) {
      var mat = transformcss.substring(9, transformcss.length - 1).split(", ").map(parseFloat);
      out.fromArray(mat);
    } else {
      return out.identity();
    }
    var origincss = styles.transformOrigin.split(" ").map(parseFloat);
    var ox = origincss[0];
    var oy = origincss[1];
    var oz = origincss[2] || 0;
    var T1 = scratchMat1.identity().makeTranslation(-ox, -oy, -oz);
    var T2 = scratchMat2.identity().makeTranslation(ox, oy, oz);
    return out.premultiply(T2).multiply(T1);
  }
  static async embedExternalResources(element) {
    const promises = [];
    const elements = element.querySelectorAll("*");
    for (const element2 of elements) {
      const link = element2.getAttributeNS("http://www.w3.org/1999/xlink", "href");
      if (link) {
        promises.push(_WebRenderer.getDataURL(link).then((dataURL) => {
          element2.removeAttributeNS("http://www.w3.org/1999/xlink", "href");
          element2.setAttribute("href", dataURL);
        }));
      }
      const imgElement = element2;
      if (element2.tagName == "IMG" && imgElement.src.substr(0, 4) != "data") {
        promises.push(_WebRenderer.getDataURL(imgElement.src).then((dataURL) => {
          element2.setAttribute("src", dataURL);
        }));
      }
      if (element2.namespaceURI == "http://www.w3.org/1999/xhtml" && element2.hasAttribute("style")) {
        const style = element2.getAttribute("style") || "";
        promises.push(_WebRenderer.generateEmbeddedCSS(window.location.href, style).then((css) => {
          if (style != css)
            element2.setAttribute("style", css);
        }));
      }
    }
    const styles = element.querySelectorAll("style");
    for (const style of styles) {
      promises.push(_WebRenderer.generateEmbeddedCSS(window.location.href, style.innerHTML).then((css) => {
        if (style.innerHTML != css)
          style.innerHTML = css;
      }));
    }
    return Promise.all(promises);
  }
  static pauseMutationObservers() {
    const mutationObservers = _WebRenderer.mutationObservers.values();
    for (const m of mutationObservers) {
      _WebRenderer._handleMutations(m.takeRecords());
      m.disconnect();
    }
  }
  static resumeMutationObservers() {
    for (const [e] of _WebRenderer.mutationObservers) {
      this.startMutationObserver(e);
    }
  }
  static startMutationObserver(element) {
    const observer = _WebRenderer.mutationObservers.get(element);
    observer.observe(element, {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
      characterDataOldValue: true,
      attributeOldValue: true
    });
  }
  static _addDynamicPseudoClassRulesToPage() {
    const sheets = document.styleSheets;
    for (let i = 0; i < sheets.length; i++) {
      try {
        const sheet = sheets[i];
        const rules = sheet.cssRules;
        if (!rules)
          continue;
        const newRules = [];
        for (var j = 0; j < rules.length; j++) {
          if (rules[j].cssText.indexOf(":hover") > -1) {
            newRules.push(rules[j].cssText.replace(new RegExp(":hover", "g"), `[${_WebRenderer.HOVER_ATTRIBUTE}]`));
          }
          if (rules[j].cssText.indexOf(":active") > -1) {
            newRules.push(rules[j].cssText.replace(new RegExp(":active", "g"), `[${_WebRenderer.ACTIVE_ATTRIBUTE}]`));
          }
          if (rules[j].cssText.indexOf(":focus") > -1) {
            newRules.push(rules[j].cssText.replace(new RegExp(":focus", "g"), `[${_WebRenderer.FOCUS_ATTRIBUTE}]`));
          }
          if (rules[j].cssText.indexOf(":target") > -1) {
            newRules.push(rules[j].cssText.replace(new RegExp(":target", "g"), `[${_WebRenderer.TARGET_ATTRIBUTE}]`));
          }
          var idx = newRules.indexOf(rules[j].cssText);
          if (idx > -1) {
            newRules.splice(idx, 1);
          }
        }
        for (var j = 0; j < newRules.length; j++) {
          sheet.insertRule(newRules[j]);
        }
      } catch (e) {
      }
    }
  }
  static arrayBufferToBase64(bytes) {
    var binary = "";
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
  static attributeCSS(name, value) {
    return value ? `[${name}]=${value}` : `[${name}]`;
  }
  static attributeHTML(name, value) {
    return value ? `${name}="${value}"` : `${name}=""`;
  }
  static async generateEmbeddedCSS(url, css) {
    let found;
    const promises = [];
    css = css.replace(new RegExp(":hover", "g"), this.attributeCSS(this.HOVER_ATTRIBUTE));
    css = css.replace(new RegExp(":active", "g"), this.attributeCSS(this.ACTIVE_ATTRIBUTE));
    css = css.replace(new RegExp(":focus", "g"), this.attributeCSS(this.FOCUS_ATTRIBUTE));
    css = css.replace(new RegExp(":target", "g"), this.attributeCSS(this.TARGET_ATTRIBUTE));
    const regEx = RegExp(/url\((?!['"]?(?:data):)['"]?([^'"\)]*)['"]?\)/gi);
    while (found = regEx.exec(css)) {
      const resourceURL = found[1];
      promises.push(this.getDataURL(new URL(resourceURL, url).href).then((dataURL) => {
        css = css.replace(resourceURL, dataURL);
      }));
    }
    await Promise.all(promises);
    return css;
  }
  static async getURL(url) {
    url = new URL(url, window.location.href).href;
    return new Promise((resolve) => {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "arraybuffer";
      xhr.onload = () => {
        resolve(xhr);
      };
      xhr.onerror = () => {
        resolve(xhr);
      };
      xhr.send();
    });
  }
  static async getEmbeddedPageCSS() {
    const embedded = this.embeddedPageCSS;
    const styleElements = Array.from(document.querySelectorAll("style, link[type='text/css'], link[rel='stylesheet']"));
    let foundNewStyles = false;
    for (const element of styleElements) {
      if (!embedded.has(element)) {
        foundNewStyles = true;
        if (element.tagName == "STYLE") {
          const sheet = element.sheet;
          let cssText = "";
          for (const rule of sheet.cssRules) {
            cssText += rule.cssText + "\n";
          }
          embedded.set(element, this.generateEmbeddedCSS(window.location.href, cssText));
        } else {
          embedded.set(element, this.getURL(element.getAttribute("href")).then((xhr) => {
            if (!xhr.response)
              return "";
            this._addDynamicPseudoClassRulesToPage();
            var css = textDecoder.decode(xhr.response);
            return this.generateEmbeddedCSS(window.location.href, css);
          }));
        }
      }
    }
    if (foundNewStyles)
      this._addDynamicPseudoClassRulesToPage();
    return Promise.all(embedded.values());
  }
  static async getDataURL(url) {
    var _a;
    const xhr = await this.getURL(url);
    const arr = new Uint8Array(xhr.response);
    const contentType = (_a = xhr.getResponseHeader("Content-Type")) == null ? void 0 : _a.split(";")[0];
    if (contentType == "text/css") {
      let css = textDecoder.decode(arr);
      css = await this.generateEmbeddedCSS(url, css);
      const base64 = window.btoa(css);
      if (base64.length > 0) {
        return "data:" + contentType + ";base64," + base64;
      } else {
        return "";
      }
    } else {
      return "data:" + contentType + ";base64," + this.arrayBufferToBase64(arr);
    }
  }
  static updateInputAttributes(element) {
    if (element.matches("input"))
      this._updateInputAttribute(element);
    for (const e of element.getElementsByTagName("input"))
      this._updateInputAttribute(e);
  }
  static _updateInputAttribute(inputElement) {
    if (inputElement.hasAttribute("checked")) {
      if (!inputElement.checked)
        inputElement.removeAttribute("checked");
    } else {
      if (inputElement.checked)
        inputElement.setAttribute("checked", "");
    }
    if (inputElement.getAttribute("value") !== inputElement.value) {
      inputElement.setAttribute("value", inputElement.value);
    }
  }
  static isBlankImage(imageData) {
    const pixelBuffer = new Uint32Array(imageData.buffer);
    return !pixelBuffer.some((color) => color !== 0);
  }
};
let WebRenderer = _WebRenderer;
WebRenderer.ATTRIBUTE_PREFIX = "xr";
WebRenderer._nextUID = 0;
WebRenderer.serializer = new XMLSerializer();
WebRenderer.rootLayers = new Map();
WebRenderer.layers = new Map();
WebRenderer.mutationObservers = new Map();
WebRenderer.resizeObservers = new Map();
WebRenderer.serializeQueue = [];
WebRenderer.rasterizeQueue = [];
WebRenderer.renderQueue = [];
WebRenderer.focusElement = null;
WebRenderer.activeElement = null;
WebRenderer.targetElement = null;
WebRenderer._didInit = false;
WebRenderer.TASK_ASYNC_MAX_COUNT = 2;
WebRenderer.TASK_SYNC_MAX_TIME = 200;
WebRenderer.rasterizeTaskCount = 0;
WebRenderer.tasksPending = false;
WebRenderer._handleMutations = (records) => {
  for (const record of records) {
    if (record.type === "attributes") {
      const target2 = record.target;
      if (target2.getAttribute(record.attributeName) === record.oldValue) {
        continue;
      }
    }
    if (record.type === "characterData") {
      const target2 = record.target;
      if (target2.data === record.oldValue) {
        continue;
      }
    }
    const target = record.target.nodeType === Node.ELEMENT_NODE ? record.target : record.target.parentElement;
    if (!target)
      continue;
    const layer = _WebRenderer.getClosestLayer(target);
    if (!layer)
      continue;
    if (record.type === "attributes" && record.attributeName === "class") {
      const oldClasses = record.oldValue ? record.oldValue : "";
      const currentClasses = record.target.className;
      if (oldClasses === currentClasses)
        continue;
    }
    layer.parentLayer ? layer.parentLayer.traverseChildLayers(_WebRenderer.setLayerNeedsRefresh) : layer.traverseLayers(_WebRenderer.setLayerNeedsRefresh);
  }
};
WebRenderer._triggerRefresh = async (e) => {
  const layer = _WebRenderer.getClosestLayer(e.target);
  if (layer) {
    layer.parentLayer ? layer.parentLayer.traverseChildLayers(_WebRenderer.setLayerNeedsRefresh) : layer.traverseLayers(_WebRenderer.setLayerNeedsRefresh);
  }
};
WebRenderer.embeddedPageCSS = new Map();
if (self.THREE) {
  var THREE = self.THREE;
} else {
  var THREE = _THREE;
}
const scratchVector = new THREE.Vector3();
const scratchVector2 = new THREE.Vector3();
const scratchBounds = new Bounds();
const scratchBounds2 = new Bounds();
class WebLayer3DBase extends THREE.Group {
  constructor(elementOrHTML, options = {}) {
    super();
    this.options = options;
    this.textures = new Map();
    this.textureNeedsUpdate = false;
    this.contentMesh = new THREE.Mesh(WebLayer3D.GEOMETRY, new THREE.MeshBasicMaterial({
      transparent: true,
      alphaTest: 1e-3,
      opacity: 1
    }));
    this._boundsMesh = new THREE.Mesh(WebLayer3D.GEOMETRY, new THREE.MeshBasicMaterial({
      visible: false
    }));
    this.cursor = new THREE.Object3D();
    this.depthMaterial = new THREE.MeshDepthMaterial({
      depthPacking: THREE.RGBADepthPacking,
      alphaTest: 0.01
    });
    this.domLayout = new THREE.Object3D();
    this.domSize = new THREE.Vector3(1, 1, 1);
    this.childWebLayers = [];
    this.shouldApplyDOMLayout = "auto";
    this._doUpdate = () => {
      this.updateLayout();
      this.updateContent();
      if (this.needsRefresh && this.options.autoRefresh)
        this.refresh();
      WebRenderer.scheduleTasksIfNeeded();
    };
    const element = this.element = typeof elementOrHTML === "string" ? DOM(elementOrHTML) : elementOrHTML;
    this.name = element.id;
    this._webLayer = WebRenderer.getClosestLayer(element);
    this.add(this.contentMesh);
    this.add(this._boundsMesh);
    this.cursor.visible = false;
    this.contentMesh.visible = false;
    this.contentMesh["customDepthMaterial"] = this.depthMaterial;
    WebLayer3D.layersByElement.set(this.element, this);
    WebLayer3D.layersByMesh.set(this.contentMesh, this);
  }
  get currentTexture() {
    if (this._webLayer.element.tagName === "VIDEO") {
      const video = this._webLayer.element;
      let t2 = this.textures.get(video);
      if (!t2) {
        t2 = new THREE.VideoTexture(video);
        t2.wrapS = THREE.ClampToEdgeWrapping;
        t2.wrapT = THREE.ClampToEdgeWrapping;
        t2.minFilter = THREE.LinearFilter;
        this.textures.set(video, t2);
      }
      return t2;
    }
    const canvas = this._webLayer.canvas;
    let t = this.textures.get(canvas);
    if (!t) {
      t = new THREE.Texture(canvas);
      t.needsUpdate = true;
      t.wrapS = THREE.ClampToEdgeWrapping;
      t.wrapT = THREE.ClampToEdgeWrapping;
      t.minFilter = THREE.LinearFilter;
      this.textures.set(canvas, t);
    } else if (this.textureNeedsUpdate) {
      this.textureNeedsUpdate = false;
      t.needsUpdate = true;
    }
    return t;
  }
  get pseudoStates() {
    return this._webLayer.psuedoStates;
  }
  get depth() {
    return this._webLayer.depth;
  }
  get index() {
    return this.parentWebLayer ? this.parentWebLayer.childWebLayers.indexOf(this) : 0;
  }
  get needsRefresh() {
    return this._webLayer.needsRefresh;
  }
  setNeedsRefresh() {
    this._webLayer.traverseLayers(WebRenderer.setLayerNeedsRefresh);
  }
  get needsRemoval() {
    return this._webLayer.needsRemoval;
  }
  get bounds() {
    return this._webLayer.bounds;
  }
  get parentWebLayer() {
    return this._webLayer.parentLayer && WebLayer3D.layersByElement.get(this._webLayer.parentLayer.element);
  }
  refresh(recurse = false) {
    this._webLayer.refresh();
    this.childWebLayers.length = 0;
    for (const c of this._webLayer.childLayers) {
      const child = WebLayer3D.getClosestLayerForElement(c.element);
      if (!child)
        continue;
      this.childWebLayers.push(child);
      if (recurse)
        child.refresh(recurse);
    }
    this._refreshVideoBounds();
    this._refreshDOMLayout();
  }
  updateLayout() {
    this.position.copy(this.domLayout.position);
    this.quaternion.copy(this.domLayout.quaternion);
    this.scale.copy(this.domLayout.scale);
    this.contentMesh.scale.copy(this.domSize);
    this._boundsMesh.scale.copy(this.domSize);
    const mesh = this.contentMesh;
    const mat = mesh.material;
    const isHidden = mat.opacity < 5e-3;
    if (isHidden)
      mesh.visible = false;
    else if (mesh.material.map)
      mesh.visible = true;
    if (this.needsRemoval && isHidden) {
      if (this.parent)
        this.parent.remove(this);
      this.dispose();
    }
  }
  updateContent() {
    const mesh = this.contentMesh;
    const texture = this.currentTexture;
    const material = mesh.material;
    if (texture.image && material.map !== texture) {
      material.map = texture;
      this.depthMaterial["map"] = texture;
      this.depthMaterial.needsUpdate = true;
      material.depthWrite = false;
      this.renderOrder = this.depth + this.index * 1e-3;
      material.needsUpdate = true;
    }
  }
  update(recurse = false) {
    if (recurse)
      this.traverseLayersPreOrder(this._doUpdate);
    else
      this._doUpdate();
  }
  querySelector(selector) {
    const element = this.element.querySelector(selector);
    if (element) {
      return WebLayer3D.layersByElement.get(element);
    }
    return void 0;
  }
  traverseLayerAncestors(each) {
    const parentLayer = this.parentWebLayer;
    if (parentLayer) {
      parentLayer.traverseLayerAncestors(each);
      each(parentLayer);
    }
  }
  traverseLayersPreOrder(each) {
    if (each(this) === false)
      return false;
    for (const child of this.childWebLayers) {
      if (child.traverseLayersPreOrder(each) === false)
        return false;
    }
    return true;
  }
  traverseLayersPostOrder(each) {
    for (const child of this.childWebLayers) {
      if (child.traverseLayersPostOrder(each) === false)
        return false;
    }
    return each(this) || true;
  }
  dispose() {
    for (const t of this.textures.values()) {
      t.dispose();
    }
    this.contentMesh.geometry.dispose();
    this._boundsMesh.geometry.dispose();
    WebRenderer.disposeLayer(this._webLayer);
    for (const child of this.childWebLayers)
      child.dispose();
  }
  _refreshVideoBounds() {
    if (this.element.nodeName === "VIDEO") {
      const video = this.element;
      const texture = this.currentTexture;
      const computedStyle = getComputedStyle(this.element);
      const {objectFit} = computedStyle;
      const {width: viewWidth, height: viewHeight} = this.bounds;
      const {videoWidth, videoHeight} = video;
      const videoRatio = videoWidth / videoHeight;
      const viewRatio = viewWidth / viewHeight;
      texture.center.set(0.5, 0.5);
      switch (objectFit) {
        case "none":
          texture.repeat.set(viewWidth / videoWidth, viewHeight / videoHeight).clampScalar(0, 1);
          break;
        case "contain":
        case "scale-down":
          texture.repeat.set(1, 1);
          if (viewRatio > videoRatio) {
            const width = this.bounds.height * videoRatio || 0;
            this.bounds.left += (this.bounds.width - width) / 2;
            this.bounds.width = width;
          } else {
            const height = this.bounds.width / videoRatio || 0;
            this.bounds.top += (this.bounds.height - height) / 2;
            this.bounds.height = height;
          }
          break;
        case "cover":
          texture.repeat.set(viewWidth / videoWidth, viewHeight / videoHeight);
          if (viewRatio < videoRatio) {
            const width = this.bounds.height * videoRatio || 0;
            this.bounds.left += (this.bounds.width - width) / 2;
            this.bounds.width = width;
          } else {
            const height = this.bounds.width / videoRatio || 0;
            this.bounds.top += (this.bounds.height - height) / 2;
            this.bounds.height = height;
          }
          break;
        default:
        case "fill":
          texture.repeat.set(1, 1);
          break;
      }
    }
  }
  _refreshDOMLayout() {
    if (this.needsRemoval) {
      return;
    }
    this.domLayout.position.set(0, 0, 0);
    this.domLayout.scale.set(1, 1, 1);
    this.domLayout.quaternion.set(0, 0, 0, 1);
    const bounds = this.bounds;
    const width = bounds.width;
    const height = bounds.height;
    const pixelSize = 1 / WebLayer3D.DEFAULT_PIXELS_PER_UNIT;
    this.domSize.set(Math.max(pixelSize * width, 1e-5), Math.max(pixelSize * height, 1e-5), 1);
    if (!WebLayer3D.shouldApplyDOMLayout(this))
      return;
    const parentBounds = this.parentWebLayer instanceof WebLayer3DBase ? this.parentWebLayer.bounds : getViewportBounds(scratchBounds);
    const parentWidth = parentBounds.width;
    const parentHeight = parentBounds.height;
    const leftEdge = -parentWidth / 2 + width / 2;
    const topEdge = parentHeight / 2 - height / 2;
    this.options.layerSeparation || WebLayer3D.DEFAULT_LAYER_SEPARATION;
    this.domLayout.position.set(pixelSize * (leftEdge + bounds.left), pixelSize * (topEdge - bounds.top), 0);
  }
}
const _WebLayer3D = class extends WebLayer3DBase {
  constructor(elementOrHTML, options = {}) {
    super(elementOrHTML, options);
    this.options = options;
    this._interactionRays = [];
    this._raycaster = new THREE.Raycaster();
    this._hitIntersections = [];
    this._previousHoverLayers = new Set();
    this._contentMeshes = [];
    this._prepareHitTest = (layer) => {
      if (layer.pseudoStates.hover)
        this._previousHoverLayers.add(layer);
      layer.cursor.visible = false;
      layer.pseudoStates.hover = false;
      this._contentMeshes.push(layer.contentMesh);
    };
    this._webLayer = WebRenderer.createLayerTree(this.element, (event, {target}) => {
      var _a, _b;
      if (event === "layercreated") {
        if (target === this.element)
          return;
        const layer = new WebLayer3DBase(target, this.options);
        (_a = layer.parentWebLayer) == null ? void 0 : _a.add(layer);
        if (this.options.onLayerCreate)
          this.options.onLayerCreate(layer);
      } else if (event === "layerpainted") {
        const layer = WebRenderer.layers.get(target);
        const layer3D = _WebLayer3D.layersByElement.get(layer.element);
        layer3D.textureNeedsUpdate = true;
      } else if (event === "layermoved") {
        const layer = _WebLayer3D.layersByElement.get(target);
        (_b = layer.parentWebLayer) == null ? void 0 : _b.add(layer);
      }
    });
    if (this.options.onLayerCreate)
      this.options.onLayerCreate(this);
    this.refresh(true);
  }
  static computeNaturalDistance(projection, renderer) {
    let projectionMatrix = projection;
    if (projection.isCamera) {
      projectionMatrix = projection.projectionMatrix;
    }
    const pixelRatio = renderer.getPixelRatio();
    const widthPixels = renderer.domElement.width / pixelRatio;
    const width = _WebLayer3D.DEFAULT_PIXELS_PER_UNIT * widthPixels;
    const horizontalFOV = getFovs(projectionMatrix).horizontal;
    const naturalDistance = width / 2 / Math.tan(horizontalFOV / 2);
    return naturalDistance;
  }
  static shouldApplyDOMLayout(layer) {
    const should = layer.shouldApplyDOMLayout;
    if (should === "always" || should === true)
      return true;
    if (should === "never" || should === false)
      return false;
    if (should === "auto" && layer.parentWebLayer && layer.parent === layer.parentWebLayer)
      return true;
    return false;
  }
  get parentWebLayer() {
    return super.parentWebLayer;
  }
  get interactionRays() {
    return this._interactionRays;
  }
  set interactionRays(rays) {
    this._interactionRays = rays;
  }
  update(recurse = false) {
    this._updateInteractions();
    super.update(recurse);
  }
  _intersectionGetGroupOrder(i) {
    let o = i.object;
    while (o.parent && !o.isGroup) {
      o = o.parent;
    }
    i.groupOrder = o.renderOrder;
  }
  _intersectionSort(a, b) {
    if (a.groupOrder !== b.groupOrder) {
      return b.groupOrder - a.groupOrder;
    } else if (a.object.renderOrder !== b.object.renderOrder) {
      return b.object.renderOrder - a.object.renderOrder;
    } else {
      return a.distance - b.distance;
    }
  }
  _updateInteractions() {
    const prevHover = this._previousHoverLayers;
    prevHover.clear();
    this._contentMeshes.length = 0;
    this.traverseLayersPreOrder(this._prepareHitTest);
    for (const ray of this._interactionRays) {
      if (ray instanceof THREE.Ray)
        this._raycaster.ray.copy(ray);
      else
        this._raycaster.ray.set(ray.getWorldPosition(scratchVector), ray.getWorldDirection(scratchVector2));
      this._hitIntersections.length = 0;
      const intersections = this._raycaster.intersectObjects(this._contentMeshes, false, this._hitIntersections);
      intersections.forEach(this._intersectionGetGroupOrder);
      intersections.sort(this._intersectionSort);
      const intersection = intersections[0];
      if (intersection) {
        const layer = intersection.object.parent;
        layer.cursor.position.copy(intersection.point);
        layer.cursor.visible = true;
        layer.pseudoStates.hover = true;
        if (!prevHover.has(layer)) {
          layer.setNeedsRefresh();
        }
      }
    }
    for (const layer of prevHover) {
      if (!layer.pseudoStates.hover) {
        layer.setNeedsRefresh();
      }
    }
  }
  static getLayerForQuery(selector) {
    const element = document.querySelector(selector);
    return _WebLayer3D.layersByElement.get(element);
  }
  static getClosestLayerForElement(element) {
    const closestLayerElement = element && element.closest(`[${WebRenderer.LAYER_ATTRIBUTE}]`);
    return _WebLayer3D.layersByElement.get(closestLayerElement);
  }
  hitTest(ray) {
    const raycaster = this._raycaster;
    const intersections = this._hitIntersections;
    const meshMap = _WebLayer3D.layersByMesh;
    raycaster.ray.copy(ray);
    intersections.length = 0;
    raycaster.intersectObject(this, true, intersections);
    intersections.forEach(this._intersectionGetGroupOrder);
    intersections.sort(this._intersectionSort);
    for (const intersection of intersections) {
      const layer = meshMap.get(intersection.object);
      if (!layer)
        continue;
      const layerBoundingRect = getBounds(layer.element, scratchBounds);
      if (!layerBoundingRect.width || !layerBoundingRect.height)
        continue;
      let target = layer.element;
      const clientX = intersection.uv.x * layerBoundingRect.width;
      const clientY = (1 - intersection.uv.y) * layerBoundingRect.height;
      traverseChildElements(layer.element, (el) => {
        if (!target.contains(el))
          return false;
        const elementBoundingRect = getBounds(el, scratchBounds2);
        const offsetLeft = elementBoundingRect.left - layerBoundingRect.left;
        const offsetTop = elementBoundingRect.top - layerBoundingRect.top;
        const {width, height} = elementBoundingRect;
        const offsetRight = offsetLeft + width;
        const offsetBottom = offsetTop + height;
        if (clientX > offsetLeft && clientX < offsetRight && clientY > offsetTop && clientY < offsetBottom) {
          target = el;
          return true;
        }
        return false;
      });
      return {layer, intersection, target};
    }
    return void 0;
  }
};
let WebLayer3D = _WebLayer3D;
WebLayer3D.layersByElement = new WeakMap();
WebLayer3D.layersByMesh = new WeakMap();
WebLayer3D.DEFAULT_LAYER_SEPARATION = 1e-3;
WebLayer3D.DEFAULT_PIXELS_PER_UNIT = 1e3;
WebLayer3D.GEOMETRY = new THREE.PlaneGeometry(1, 1, 2, 2);
class CameraFOVs {
  constructor() {
    this.top = 0;
    this.left = 0;
    this.bottom = 0;
    this.right = 0;
    this.horizontal = 0;
    this.vertical = 0;
  }
}
const _fovs = new CameraFOVs();
const _getFovsMatrix = new THREE.Matrix4();
const _getFovsVector = new THREE.Vector3();
const FORWARD = new THREE.Vector3(0, 0, -1);
function getFovs(projectionMatrix) {
  const out = _fovs;
  const invProjection = _getFovsMatrix.getInverse(projectionMatrix);
  const vec = _getFovsVector;
  out.left = vec.set(-1, 0, -1).applyMatrix4(invProjection).angleTo(FORWARD);
  out.right = vec.set(1, 0, -1).applyMatrix4(invProjection).angleTo(FORWARD);
  out.top = vec.set(0, 1, -1).applyMatrix4(invProjection).angleTo(FORWARD);
  out.bottom = vec.set(0, -1, -1).applyMatrix4(invProjection).angleTo(FORWARD);
  out.horizontal = out.right + out.left;
  out.vertical = out.top + out.bottom;
  return out;
}
export {WebLayer3D as W};
