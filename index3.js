var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;
var __spreadValues = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a2, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    }
  return a2;
};
var __spreadProps = (a2, b2) => __defProps(a2, __getOwnPropDescs(b2));
import {W as WebApp$1} from "./WebApp.js";
import {g as ref, h as onMounted, p as pushScopeId, b as popScopeId, o as openBlock, d as createBlock, e as createVNode, w as withScopeId, r as reactive, a as readonly} from "./vendor.js";
/*!
* reveal.js 4.1.1
* https://revealjs.com
* MIT licensed
*
* Copyright (C) 2020 Hakim El Hattab, https://hakim.se
*/
const e = /registerPlugin|registerKeyboardShortcut|addKeyBinding|addEventListener/, t = /fade-(down|up|right|left|out|in-then-out|in-then-semi-out)|semi-fade-out|current-visible|shrink|grow/, i = (e2, t2) => {
  for (let i2 in t2)
    e2[i2] = t2[i2];
  return e2;
}, a = (e2, t2) => Array.from(e2.querySelectorAll(t2)), n = (e2, t2, i2) => {
  i2 ? e2.classList.add(t2) : e2.classList.remove(t2);
}, s = (e2) => {
  if (typeof e2 == "string") {
    if (e2 === "null")
      return null;
    if (e2 === "true")
      return true;
    if (e2 === "false")
      return false;
    if (e2.match(/^-?[\d\.]+$/))
      return parseFloat(e2);
  }
  return e2;
}, o = (e2, t2) => {
  e2.style.transform = t2;
}, r = (e2, t2) => {
  let i2 = e2.matches || e2.matchesSelector || e2.msMatchesSelector;
  return !(!i2 || !i2.call(e2, t2));
}, l = (e2, t2) => {
  if (typeof e2.closest == "function")
    return e2.closest(t2);
  for (; e2; ) {
    if (r(e2, t2))
      return e2;
    e2 = e2.parentNode;
  }
  return null;
}, d = (e2, t2, i2, a2 = "") => {
  let n2 = e2.querySelectorAll("." + i2);
  for (let t3 = 0; t3 < n2.length; t3++) {
    let i3 = n2[t3];
    if (i3.parentNode === e2)
      return i3;
  }
  let s2 = document.createElement(t2);
  return s2.className = i2, s2.innerHTML = a2, e2.appendChild(s2), s2;
}, c = (e2) => {
  let t2 = document.createElement("style");
  return t2.type = "text/css", e2 && e2.length > 0 && (t2.styleSheet ? t2.styleSheet.cssText = e2 : t2.appendChild(document.createTextNode(e2))), document.head.appendChild(t2), t2;
}, h = () => {
  let e2 = {};
  location.search.replace(/[A-Z0-9]+?=([\w\.%-]*)/gi, (t2) => {
    e2[t2.split("=").shift()] = t2.split("=").pop();
  });
  for (let t2 in e2) {
    let i2 = e2[t2];
    e2[t2] = s(unescape(i2));
  }
  return e2.dependencies !== void 0 && delete e2.dependencies, e2;
}, u = (e2, t2 = 0) => {
  if (e2) {
    let i2, a2 = e2.style.height;
    return e2.style.height = "0px", e2.parentNode.style.height = "auto", i2 = t2 - e2.parentNode.offsetHeight, e2.style.height = a2 + "px", e2.parentNode.style.removeProperty("height"), i2;
  }
  return t2;
}, g = navigator.userAgent, v = document.createElement("div"), p = /(iphone|ipod|ipad|android)/gi.test(g) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1, m = /chrome/i.test(g) && !/edge/i.test(g), f = /android/gi.test(g), b = "zoom" in v.style && !p && (m || /Version\/[\d\.]+.*Safari/.test(g));
var y = {};
Object.defineProperty(y, "__esModule", {value: true});
var w = Object.assign || function(e2) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var i2 = arguments[t2];
    for (var a2 in i2)
      Object.prototype.hasOwnProperty.call(i2, a2) && (e2[a2] = i2[a2]);
  }
  return e2;
}, R = y.default = function(e2) {
  if (e2) {
    var t2 = function(e3) {
      return [].slice.call(e3);
    }, i2 = 0, a2 = 1, n2 = 2, s2 = 3, o2 = [], r2 = null, l2 = "requestAnimationFrame" in e2 ? function() {
      e2.cancelAnimationFrame(r2), r2 = e2.requestAnimationFrame(function() {
        return c2(o2.filter(function(e3) {
          return e3.dirty && e3.active;
        }));
      });
    } : function() {
    }, d2 = function(e3) {
      return function() {
        o2.forEach(function(t3) {
          return t3.dirty = e3;
        }), l2();
      };
    }, c2 = function(e3) {
      e3.filter(function(e4) {
        return !e4.styleComputed;
      }).forEach(function(e4) {
        e4.styleComputed = v2(e4);
      }), e3.filter(p2).forEach(m2);
      var t3 = e3.filter(g2);
      t3.forEach(u2), t3.forEach(function(e4) {
        m2(e4), h2(e4);
      }), t3.forEach(f2);
    }, h2 = function(e3) {
      return e3.dirty = i2;
    }, u2 = function(e3) {
      e3.availableWidth = e3.element.parentNode.clientWidth, e3.currentWidth = e3.element.scrollWidth, e3.previousFontSize = e3.currentFontSize, e3.currentFontSize = Math.min(Math.max(e3.minSize, e3.availableWidth / e3.currentWidth * e3.previousFontSize), e3.maxSize), e3.whiteSpace = e3.multiLine && e3.currentFontSize === e3.minSize ? "normal" : "nowrap";
    }, g2 = function(e3) {
      return e3.dirty !== n2 || e3.dirty === n2 && e3.element.parentNode.clientWidth !== e3.availableWidth;
    }, v2 = function(t3) {
      var i3 = e2.getComputedStyle(t3.element, null);
      t3.currentFontSize = parseFloat(i3.getPropertyValue("font-size")), t3.display = i3.getPropertyValue("display"), t3.whiteSpace = i3.getPropertyValue("white-space");
    }, p2 = function(e3) {
      var t3 = false;
      return !e3.preStyleTestCompleted && (/inline-/.test(e3.display) || (t3 = true, e3.display = "inline-block"), e3.whiteSpace !== "nowrap" && (t3 = true, e3.whiteSpace = "nowrap"), e3.preStyleTestCompleted = true, t3);
    }, m2 = function(e3) {
      e3.element.style.whiteSpace = e3.whiteSpace, e3.element.style.display = e3.display, e3.element.style.fontSize = e3.currentFontSize + "px";
    }, f2 = function(e3) {
      e3.element.dispatchEvent(new CustomEvent("fit", {detail: {oldValue: e3.previousFontSize, newValue: e3.currentFontSize, scaleFactor: e3.currentFontSize / e3.previousFontSize}}));
    }, b2 = function(e3, t3) {
      return function() {
        e3.dirty = t3, e3.active && l2();
      };
    }, y2 = function(e3) {
      return function() {
        o2 = o2.filter(function(t3) {
          return t3.element !== e3.element;
        }), e3.observeMutations && e3.observer.disconnect(), e3.element.style.whiteSpace = e3.originalStyle.whiteSpace, e3.element.style.display = e3.originalStyle.display, e3.element.style.fontSize = e3.originalStyle.fontSize;
      };
    }, R2 = function(e3) {
      return function() {
        e3.active || (e3.active = true, l2());
      };
    }, A2 = function(e3) {
      return function() {
        return e3.active = false;
      };
    }, S2 = function(e3) {
      e3.observeMutations && (e3.observer = new MutationObserver(b2(e3, a2)), e3.observer.observe(e3.element, e3.observeMutations));
    }, E2 = {minSize: 16, maxSize: 512, multiLine: true, observeMutations: "MutationObserver" in e2 && {subtree: true, childList: true, characterData: true}}, k2 = null, L2 = function() {
      e2.clearTimeout(k2), k2 = e2.setTimeout(d2(n2), P2.observeWindowDelay);
    }, x2 = ["resize", "orientationchange"];
    return Object.defineProperty(P2, "observeWindow", {set: function(t3) {
      var i3 = (t3 ? "add" : "remove") + "EventListener";
      x2.forEach(function(t4) {
        e2[i3](t4, L2);
      });
    }}), P2.observeWindow = true, P2.observeWindowDelay = 100, P2.fitAll = d2(s2), P2;
  }
  function C2(e3, t3) {
    var i3 = w({}, E2, t3), a3 = e3.map(function(e4) {
      var t4 = w({}, i3, {element: e4, active: true});
      return function(e5) {
        e5.originalStyle = {whiteSpace: e5.element.style.whiteSpace, display: e5.element.style.display, fontSize: e5.element.style.fontSize}, S2(e5), e5.newbie = true, e5.dirty = true, o2.push(e5);
      }(t4), {element: e4, fit: b2(t4, s2), unfreeze: R2(t4), freeze: A2(t4), unsubscribe: y2(t4)};
    });
    return l2(), a3;
  }
  function P2(e3) {
    var i3 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return typeof e3 == "string" ? C2(t2(document.querySelectorAll(e3)), i3) : C2([e3], i3)[0];
  }
}(typeof window == "undefined" ? null : window);
class A {
  constructor(e2) {
    this.Reveal = e2, this.startEmbeddedIframe = this.startEmbeddedIframe.bind(this);
  }
  shouldPreload(e2) {
    let t2 = this.Reveal.getConfig().preloadIframes;
    return typeof t2 != "boolean" && (t2 = e2.hasAttribute("data-preload")), t2;
  }
  load(e2, t2 = {}) {
    e2.style.display = this.Reveal.getConfig().display, a(e2, "img[data-src], video[data-src], audio[data-src], iframe[data-src]").forEach((e3) => {
      (e3.tagName !== "IFRAME" || this.shouldPreload(e3)) && (e3.setAttribute("src", e3.getAttribute("data-src")), e3.setAttribute("data-lazy-loaded", ""), e3.removeAttribute("data-src"));
    }), a(e2, "video, audio").forEach((e3) => {
      let t3 = 0;
      a(e3, "source[data-src]").forEach((e4) => {
        e4.setAttribute("src", e4.getAttribute("data-src")), e4.removeAttribute("data-src"), e4.setAttribute("data-lazy-loaded", ""), t3 += 1;
      }), p && e3.tagName === "VIDEO" && e3.setAttribute("playsinline", ""), t3 > 0 && e3.load();
    });
    let i2 = e2.slideBackgroundElement;
    if (i2) {
      i2.style.display = "block";
      let a2 = e2.slideBackgroundContentElement, n2 = e2.getAttribute("data-background-iframe");
      if (i2.hasAttribute("data-loaded") === false) {
        i2.setAttribute("data-loaded", "true");
        let s3 = e2.getAttribute("data-background-image"), o2 = e2.getAttribute("data-background-video"), r2 = e2.hasAttribute("data-background-video-loop"), l2 = e2.hasAttribute("data-background-video-muted");
        if (s3)
          a2.style.backgroundImage = s3.split(",").map((e3) => `url(${encodeURI(e3.trim())})`).join(",");
        else if (o2 && !this.Reveal.isSpeakerNotes()) {
          let e3 = document.createElement("video");
          r2 && e3.setAttribute("loop", ""), l2 && (e3.muted = true), p && (e3.muted = true, e3.setAttribute("playsinline", "")), o2.split(",").forEach((t3) => {
            e3.innerHTML += '<source src="' + t3 + '">';
          }), a2.appendChild(e3);
        } else if (n2 && t2.excludeIframes !== true) {
          let e3 = document.createElement("iframe");
          e3.setAttribute("allowfullscreen", ""), e3.setAttribute("mozallowfullscreen", ""), e3.setAttribute("webkitallowfullscreen", ""), e3.setAttribute("allow", "autoplay"), e3.setAttribute("data-src", n2), e3.style.width = "100%", e3.style.height = "100%", e3.style.maxHeight = "100%", e3.style.maxWidth = "100%", a2.appendChild(e3);
        }
      }
      let s2 = a2.querySelector("iframe[data-src]");
      s2 && this.shouldPreload(i2) && !/autoplay=(1|true|yes)/gi.test(n2) && s2.getAttribute("src") !== n2 && s2.setAttribute("src", n2);
    }
    this.layout(e2);
  }
  layout(e2) {
    Array.from(e2.querySelectorAll(".r-fit-text")).forEach((e3) => {
      R(e3, {minSize: 24, maxSize: 0.8 * this.Reveal.getConfig().height, observeMutations: false, observeWindow: false});
    });
  }
  unload(e2) {
    e2.style.display = "none";
    let t2 = this.Reveal.getSlideBackground(e2);
    t2 && (t2.style.display = "none", a(t2, "iframe[src]").forEach((e3) => {
      e3.removeAttribute("src");
    })), a(e2, "video[data-lazy-loaded][src], audio[data-lazy-loaded][src], iframe[data-lazy-loaded][src]").forEach((e3) => {
      e3.setAttribute("data-src", e3.getAttribute("src")), e3.removeAttribute("src");
    }), a(e2, "video[data-lazy-loaded] source[src], audio source[src]").forEach((e3) => {
      e3.setAttribute("data-src", e3.getAttribute("src")), e3.removeAttribute("src");
    });
  }
  formatEmbeddedContent() {
    let e2 = (e3, t2, i2) => {
      a(this.Reveal.getSlidesElement(), "iframe[" + e3 + '*="' + t2 + '"]').forEach((t3) => {
        let a2 = t3.getAttribute(e3);
        a2 && a2.indexOf(i2) === -1 && t3.setAttribute(e3, a2 + (/\?/.test(a2) ? "&" : "?") + i2);
      });
    };
    e2("src", "youtube.com/embed/", "enablejsapi=1"), e2("data-src", "youtube.com/embed/", "enablejsapi=1"), e2("src", "player.vimeo.com/", "api=1"), e2("data-src", "player.vimeo.com/", "api=1");
  }
  startEmbeddedContent(e2) {
    e2 && !this.Reveal.isSpeakerNotes() && (a(e2, 'img[src$=".gif"]').forEach((e3) => {
      e3.setAttribute("src", e3.getAttribute("src"));
    }), a(e2, "video, audio").forEach((e3) => {
      if (l(e3, ".fragment") && !l(e3, ".fragment.visible"))
        return;
      let t2 = this.Reveal.getConfig().autoPlayMedia;
      if (typeof t2 != "boolean" && (t2 = e3.hasAttribute("data-autoplay") || !!l(e3, ".slide-background")), t2 && typeof e3.play == "function")
        if (e3.readyState > 1)
          this.startEmbeddedMedia({target: e3});
        else if (p) {
          let t3 = e3.play();
          t3 && typeof t3.catch == "function" && e3.controls === false && t3.catch(() => {
            e3.controls = true, e3.addEventListener("play", () => {
              e3.controls = false;
            });
          });
        } else
          e3.removeEventListener("loadeddata", this.startEmbeddedMedia), e3.addEventListener("loadeddata", this.startEmbeddedMedia);
    }), a(e2, "iframe[src]").forEach((e3) => {
      l(e3, ".fragment") && !l(e3, ".fragment.visible") || this.startEmbeddedIframe({target: e3});
    }), a(e2, "iframe[data-src]").forEach((e3) => {
      l(e3, ".fragment") && !l(e3, ".fragment.visible") || e3.getAttribute("src") !== e3.getAttribute("data-src") && (e3.removeEventListener("load", this.startEmbeddedIframe), e3.addEventListener("load", this.startEmbeddedIframe), e3.setAttribute("src", e3.getAttribute("data-src")));
    }));
  }
  startEmbeddedMedia(e2) {
    let t2 = !!l(e2.target, "html"), i2 = !!l(e2.target, ".present");
    t2 && i2 && (e2.target.currentTime = 0, e2.target.play()), e2.target.removeEventListener("loadeddata", this.startEmbeddedMedia);
  }
  startEmbeddedIframe(e2) {
    let t2 = e2.target;
    if (t2 && t2.contentWindow) {
      let i2 = !!l(e2.target, "html"), a2 = !!l(e2.target, ".present");
      if (i2 && a2) {
        let e3 = this.Reveal.getConfig().autoPlayMedia;
        typeof e3 != "boolean" && (e3 = t2.hasAttribute("data-autoplay") || !!l(t2, ".slide-background")), /youtube\.com\/embed\//.test(t2.getAttribute("src")) && e3 ? t2.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*") : /player\.vimeo\.com\//.test(t2.getAttribute("src")) && e3 ? t2.contentWindow.postMessage('{"method":"play"}', "*") : t2.contentWindow.postMessage("slide:start", "*");
      }
    }
  }
  stopEmbeddedContent(e2, t2 = {}) {
    t2 = i({unloadIframes: true}, t2), e2 && e2.parentNode && (a(e2, "video, audio").forEach((e3) => {
      e3.hasAttribute("data-ignore") || typeof e3.pause != "function" || (e3.setAttribute("data-paused-by-reveal", ""), e3.pause());
    }), a(e2, "iframe").forEach((e3) => {
      e3.contentWindow && e3.contentWindow.postMessage("slide:stop", "*"), e3.removeEventListener("load", this.startEmbeddedIframe);
    }), a(e2, 'iframe[src*="youtube.com/embed/"]').forEach((e3) => {
      !e3.hasAttribute("data-ignore") && e3.contentWindow && typeof e3.contentWindow.postMessage == "function" && e3.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
    }), a(e2, 'iframe[src*="player.vimeo.com/"]').forEach((e3) => {
      !e3.hasAttribute("data-ignore") && e3.contentWindow && typeof e3.contentWindow.postMessage == "function" && e3.contentWindow.postMessage('{"method":"pause"}', "*");
    }), t2.unloadIframes === true && a(e2, "iframe[data-src]").forEach((e3) => {
      e3.setAttribute("src", "about:blank"), e3.removeAttribute("src");
    }));
  }
}
class S {
  constructor(e2) {
    this.Reveal = e2;
  }
  render() {
    this.element = document.createElement("div"), this.element.className = "slide-number", this.Reveal.getRevealElement().appendChild(this.element);
  }
  configure(e2, t2) {
    let i2 = "none";
    e2.slideNumber && !this.Reveal.isPrintingPDF() && (e2.showSlideNumber === "all" || e2.showSlideNumber === "speaker" && this.Reveal.isSpeakerNotes()) && (i2 = "block"), this.element.style.display = i2;
  }
  update() {
    this.Reveal.getConfig().slideNumber && this.element && (this.element.innerHTML = this.getSlideNumber());
  }
  getSlideNumber(e2 = this.Reveal.getCurrentSlide()) {
    let t2, i2 = this.Reveal.getConfig(), a2 = "h.v";
    if (typeof i2.slideNumber == "function")
      t2 = i2.slideNumber(e2);
    else {
      typeof i2.slideNumber == "string" && (a2 = i2.slideNumber), /c/.test(a2) || this.Reveal.getHorizontalSlides().length !== 1 || (a2 = "c");
      let n3 = e2 && e2.dataset.visibility === "uncounted" ? 0 : 1;
      switch (t2 = [], a2) {
        case "c":
          t2.push(this.Reveal.getSlidePastCount(e2) + n3);
          break;
        case "c/t":
          t2.push(this.Reveal.getSlidePastCount(e2) + n3, "/", this.Reveal.getTotalSlides());
          break;
        default:
          let i3 = this.Reveal.getIndices(e2);
          t2.push(i3.h + n3);
          let s2 = a2 === "h/v" ? "/" : ".";
          this.Reveal.isVerticalSlide(e2) && t2.push(s2, i3.v + 1);
      }
    }
    let n2 = "#" + this.Reveal.location.getHash(e2);
    return this.formatNumber(t2[0], t2[1], t2[2], n2);
  }
  formatNumber(e2, t2, i2, a2 = "#" + this.Reveal.location.getHash()) {
    return typeof i2 != "number" || isNaN(i2) ? `<a href="${a2}">
					<span class="slide-number-a">${e2}</span>
					</a>` : `<a href="${a2}">
					<span class="slide-number-a">${e2}</span>
					<span class="slide-number-delimiter">${t2}</span>
					<span class="slide-number-b">${i2}</span>
					</a>`;
  }
}
const E = (e2) => {
  let t2 = e2.match(/^#([0-9a-f]{3})$/i);
  if (t2 && t2[1])
    return t2 = t2[1], {r: 17 * parseInt(t2.charAt(0), 16), g: 17 * parseInt(t2.charAt(1), 16), b: 17 * parseInt(t2.charAt(2), 16)};
  let i2 = e2.match(/^#([0-9a-f]{6})$/i);
  if (i2 && i2[1])
    return i2 = i2[1], {r: parseInt(i2.substr(0, 2), 16), g: parseInt(i2.substr(2, 2), 16), b: parseInt(i2.substr(4, 2), 16)};
  let a2 = e2.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
  if (a2)
    return {r: parseInt(a2[1], 10), g: parseInt(a2[2], 10), b: parseInt(a2[3], 10)};
  let n2 = e2.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\,\s*([\d]+|[\d]*.[\d]+)\s*\)$/i);
  return n2 ? {r: parseInt(n2[1], 10), g: parseInt(n2[2], 10), b: parseInt(n2[3], 10), a: parseFloat(n2[4])} : null;
};
class k {
  constructor(e2) {
    this.Reveal = e2;
  }
  render() {
    this.element = document.createElement("div"), this.element.className = "backgrounds", this.Reveal.getRevealElement().appendChild(this.element);
  }
  create() {
    this.element.innerHTML = "", this.element.classList.add("no-transition"), this.Reveal.getHorizontalSlides().forEach((e2) => {
      let t2 = this.createBackground(e2, this.element);
      a(e2, "section").forEach((e3) => {
        this.createBackground(e3, t2), t2.classList.add("stack");
      });
    }), this.Reveal.getConfig().parallaxBackgroundImage ? (this.element.style.backgroundImage = 'url("' + this.Reveal.getConfig().parallaxBackgroundImage + '")', this.element.style.backgroundSize = this.Reveal.getConfig().parallaxBackgroundSize, this.element.style.backgroundRepeat = this.Reveal.getConfig().parallaxBackgroundRepeat, this.element.style.backgroundPosition = this.Reveal.getConfig().parallaxBackgroundPosition, setTimeout(() => {
      this.Reveal.getRevealElement().classList.add("has-parallax-background");
    }, 1)) : (this.element.style.backgroundImage = "", this.Reveal.getRevealElement().classList.remove("has-parallax-background"));
  }
  createBackground(e2, t2) {
    let i2 = document.createElement("div");
    i2.className = "slide-background " + e2.className.replace(/present|past|future/, "");
    let a2 = document.createElement("div");
    return a2.className = "slide-background-content", i2.appendChild(a2), t2.appendChild(i2), e2.slideBackgroundElement = i2, e2.slideBackgroundContentElement = a2, this.sync(e2), i2;
  }
  sync(e2) {
    const t2 = e2.slideBackgroundElement, i2 = e2.slideBackgroundContentElement, a2 = {background: e2.getAttribute("data-background"), backgroundSize: e2.getAttribute("data-background-size"), backgroundImage: e2.getAttribute("data-background-image"), backgroundVideo: e2.getAttribute("data-background-video"), backgroundIframe: e2.getAttribute("data-background-iframe"), backgroundColor: e2.getAttribute("data-background-color"), backgroundRepeat: e2.getAttribute("data-background-repeat"), backgroundPosition: e2.getAttribute("data-background-position"), backgroundTransition: e2.getAttribute("data-background-transition"), backgroundOpacity: e2.getAttribute("data-background-opacity")}, n2 = e2.hasAttribute("data-preload");
    e2.classList.remove("has-dark-background"), e2.classList.remove("has-light-background"), t2.removeAttribute("data-loaded"), t2.removeAttribute("data-background-hash"), t2.removeAttribute("data-background-size"), t2.removeAttribute("data-background-transition"), t2.style.backgroundColor = "", i2.style.backgroundSize = "", i2.style.backgroundRepeat = "", i2.style.backgroundPosition = "", i2.style.backgroundImage = "", i2.style.opacity = "", i2.innerHTML = "", a2.background && (/^(http|file|\/\/)/gi.test(a2.background) || /\.(svg|png|jpg|jpeg|gif|bmp)([?#\s]|$)/gi.test(a2.background) ? e2.setAttribute("data-background-image", a2.background) : t2.style.background = a2.background), (a2.background || a2.backgroundColor || a2.backgroundImage || a2.backgroundVideo || a2.backgroundIframe) && t2.setAttribute("data-background-hash", a2.background + a2.backgroundSize + a2.backgroundImage + a2.backgroundVideo + a2.backgroundIframe + a2.backgroundColor + a2.backgroundRepeat + a2.backgroundPosition + a2.backgroundTransition + a2.backgroundOpacity), a2.backgroundSize && t2.setAttribute("data-background-size", a2.backgroundSize), a2.backgroundColor && (t2.style.backgroundColor = a2.backgroundColor), a2.backgroundTransition && t2.setAttribute("data-background-transition", a2.backgroundTransition), n2 && t2.setAttribute("data-preload", ""), a2.backgroundSize && (i2.style.backgroundSize = a2.backgroundSize), a2.backgroundRepeat && (i2.style.backgroundRepeat = a2.backgroundRepeat), a2.backgroundPosition && (i2.style.backgroundPosition = a2.backgroundPosition), a2.backgroundOpacity && (i2.style.opacity = a2.backgroundOpacity);
    let s2 = a2.backgroundColor;
    if (!s2 || !E(s2)) {
      let e3 = window.getComputedStyle(t2);
      e3 && e3.backgroundColor && (s2 = e3.backgroundColor);
    }
    if (s2) {
      const t3 = E(s2);
      t3 && t3.a !== 0 && (typeof (o2 = s2) == "string" && (o2 = E(o2)), (o2 ? (299 * o2.r + 587 * o2.g + 114 * o2.b) / 1e3 : null) < 128 ? e2.classList.add("has-dark-background") : e2.classList.add("has-light-background"));
    }
    var o2;
  }
  update(e2 = false) {
    let t2 = this.Reveal.getCurrentSlide(), i2 = this.Reveal.getIndices(), n2 = null, s2 = this.Reveal.getConfig().rtl ? "future" : "past", o2 = this.Reveal.getConfig().rtl ? "past" : "future";
    if (Array.from(this.element.childNodes).forEach((t3, r2) => {
      t3.classList.remove("past", "present", "future"), r2 < i2.h ? t3.classList.add(s2) : r2 > i2.h ? t3.classList.add(o2) : (t3.classList.add("present"), n2 = t3), (e2 || r2 === i2.h) && a(t3, ".slide-background").forEach((e3, t4) => {
        e3.classList.remove("past", "present", "future"), t4 < i2.v ? e3.classList.add("past") : t4 > i2.v ? e3.classList.add("future") : (e3.classList.add("present"), r2 === i2.h && (n2 = e3));
      });
    }), this.previousBackground && this.Reveal.slideContent.stopEmbeddedContent(this.previousBackground, {unloadIframes: !this.Reveal.slideContent.shouldPreload(this.previousBackground)}), n2) {
      this.Reveal.slideContent.startEmbeddedContent(n2);
      let e3 = n2.querySelector(".slide-background-content");
      if (e3) {
        let t4 = e3.style.backgroundImage || "";
        /\.gif/i.test(t4) && (e3.style.backgroundImage = "", window.getComputedStyle(e3).opacity, e3.style.backgroundImage = t4);
      }
      let t3 = this.previousBackground ? this.previousBackground.getAttribute("data-background-hash") : null, i3 = n2.getAttribute("data-background-hash");
      i3 && i3 === t3 && n2 !== this.previousBackground && this.element.classList.add("no-transition"), this.previousBackground = n2;
    }
    t2 && ["has-light-background", "has-dark-background"].forEach((e3) => {
      t2.classList.contains(e3) ? this.Reveal.getRevealElement().classList.add(e3) : this.Reveal.getRevealElement().classList.remove(e3);
    }, this), setTimeout(() => {
      this.element.classList.remove("no-transition");
    }, 1);
  }
  updateParallax() {
    let e2 = this.Reveal.getIndices();
    if (this.Reveal.getConfig().parallaxBackgroundImage) {
      let t2, i2, a2 = this.Reveal.getHorizontalSlides(), n2 = this.Reveal.getVerticalSlides(), s2 = this.element.style.backgroundSize.split(" ");
      s2.length === 1 ? t2 = i2 = parseInt(s2[0], 10) : (t2 = parseInt(s2[0], 10), i2 = parseInt(s2[1], 10));
      let o2, r2, l2 = this.element.offsetWidth, d2 = a2.length;
      o2 = typeof this.Reveal.getConfig().parallaxBackgroundHorizontal == "number" ? this.Reveal.getConfig().parallaxBackgroundHorizontal : d2 > 1 ? (t2 - l2) / (d2 - 1) : 0, r2 = o2 * e2.h * -1;
      let c2, h2, u2 = this.element.offsetHeight, g2 = n2.length;
      c2 = typeof this.Reveal.getConfig().parallaxBackgroundVertical == "number" ? this.Reveal.getConfig().parallaxBackgroundVertical : (i2 - u2) / (g2 - 1), h2 = g2 > 0 ? c2 * e2.v : 0, this.element.style.backgroundPosition = r2 + "px " + -h2 + "px";
    }
  }
}
let L = 0;
class x {
  constructor(e2) {
    this.Reveal = e2;
  }
  run(e2, t2) {
    this.reset();
    let i2 = this.Reveal.getSlides(), a2 = i2.indexOf(t2), n2 = i2.indexOf(e2);
    if (e2.hasAttribute("data-auto-animate") && t2.hasAttribute("data-auto-animate") && e2.getAttribute("data-auto-animate-id") === t2.getAttribute("data-auto-animate-id") && !(a2 > n2 ? t2 : e2).hasAttribute("data-auto-animate-restart")) {
      this.autoAnimateStyleSheet = this.autoAnimateStyleSheet || c();
      let i3 = this.getAutoAnimateOptions(t2);
      e2.dataset.autoAnimate = "pending", t2.dataset.autoAnimate = "pending", i3.slideDirection = a2 > n2 ? "forward" : "backward";
      let s2 = this.getAutoAnimatableElements(e2, t2).map((e3) => this.autoAnimateElements(e3.from, e3.to, e3.options || {}, i3, L++));
      if (t2.dataset.autoAnimateUnmatched !== "false" && this.Reveal.getConfig().autoAnimateUnmatched === true) {
        let e3 = 0.8 * i3.duration, a3 = 0.2 * i3.duration;
        this.getUnmatchedAutoAnimateElements(t2).forEach((e4) => {
          let t3 = this.getAutoAnimateOptions(e4, i3), a4 = "unmatched";
          t3.duration === i3.duration && t3.delay === i3.delay || (a4 = "unmatched-" + L++, s2.push(`[data-auto-animate="running"] [data-auto-animate-target="${a4}"] { transition: opacity ${t3.duration}s ease ${t3.delay}s; }`)), e4.dataset.autoAnimateTarget = a4;
        }, this), s2.push(`[data-auto-animate="running"] [data-auto-animate-target="unmatched"] { transition: opacity ${e3}s ease ${a3}s; }`);
      }
      this.autoAnimateStyleSheet.innerHTML = s2.join(""), requestAnimationFrame(() => {
        this.autoAnimateStyleSheet && (getComputedStyle(this.autoAnimateStyleSheet).fontWeight, t2.dataset.autoAnimate = "running");
      }), this.Reveal.dispatchEvent({type: "autoanimate", data: {fromSlide: e2, toSlide: t2, sheet: this.autoAnimateStyleSheet}});
    }
  }
  reset() {
    a(this.Reveal.getRevealElement(), '[data-auto-animate]:not([data-auto-animate=""])').forEach((e2) => {
      e2.dataset.autoAnimate = "";
    }), a(this.Reveal.getRevealElement(), "[data-auto-animate-target]").forEach((e2) => {
      delete e2.dataset.autoAnimateTarget;
    }), this.autoAnimateStyleSheet && this.autoAnimateStyleSheet.parentNode && (this.autoAnimateStyleSheet.parentNode.removeChild(this.autoAnimateStyleSheet), this.autoAnimateStyleSheet = null);
  }
  autoAnimateElements(e2, i2, a2, n2, s2) {
    e2.dataset.autoAnimateTarget = "", i2.dataset.autoAnimateTarget = s2;
    let o2 = this.getAutoAnimateOptions(i2, n2);
    a2.delay !== void 0 && (o2.delay = a2.delay), a2.duration !== void 0 && (o2.duration = a2.duration), a2.easing !== void 0 && (o2.easing = a2.easing);
    let r2 = this.getAutoAnimatableProperties("from", e2, a2), l2 = this.getAutoAnimatableProperties("to", i2, a2);
    if (i2.classList.contains("fragment") && (delete l2.styles.opacity, e2.classList.contains("fragment"))) {
      (e2.className.match(t) || [""])[0] === (i2.className.match(t) || [""])[0] && n2.slideDirection === "forward" && i2.classList.add("visible", "disabled");
    }
    if (a2.translate !== false || a2.scale !== false) {
      let e3 = this.Reveal.getScale(), t2 = {x: (r2.x - l2.x) / e3, y: (r2.y - l2.y) / e3, scaleX: r2.width / l2.width, scaleY: r2.height / l2.height};
      t2.x = Math.round(1e3 * t2.x) / 1e3, t2.y = Math.round(1e3 * t2.y) / 1e3, t2.scaleX = Math.round(1e3 * t2.scaleX) / 1e3, t2.scaleX = Math.round(1e3 * t2.scaleX) / 1e3;
      let i3 = a2.translate !== false && (t2.x !== 0 || t2.y !== 0), n3 = a2.scale !== false && (t2.scaleX !== 0 || t2.scaleY !== 0);
      if (i3 || n3) {
        let e4 = [];
        i3 && e4.push(`translate(${t2.x}px, ${t2.y}px)`), n3 && e4.push(`scale(${t2.scaleX}, ${t2.scaleY})`), r2.styles.transform = e4.join(" "), r2.styles["transform-origin"] = "top left", l2.styles.transform = "none";
      }
    }
    for (let e3 in l2.styles) {
      const t2 = l2.styles[e3], i3 = r2.styles[e3];
      t2 === i3 ? delete l2.styles[e3] : (t2.explicitValue === true && (l2.styles[e3] = t2.value), i3.explicitValue === true && (r2.styles[e3] = i3.value));
    }
    let d2 = "", c2 = Object.keys(l2.styles);
    if (c2.length > 0) {
      r2.styles.transition = "none", l2.styles.transition = `all ${o2.duration}s ${o2.easing} ${o2.delay}s`, l2.styles["transition-property"] = c2.join(", "), l2.styles["will-change"] = c2.join(", "), d2 = '[data-auto-animate-target="' + s2 + '"] {' + Object.keys(r2.styles).map((e3) => e3 + ": " + r2.styles[e3] + " !important;").join("") + '}[data-auto-animate="running"] [data-auto-animate-target="' + s2 + '"] {' + Object.keys(l2.styles).map((e3) => e3 + ": " + l2.styles[e3] + " !important;").join("") + "}";
    }
    return d2;
  }
  getAutoAnimateOptions(e2, t2) {
    let a2 = {easing: this.Reveal.getConfig().autoAnimateEasing, duration: this.Reveal.getConfig().autoAnimateDuration, delay: 0};
    if (a2 = i(a2, t2), e2.parentNode) {
      let t3 = l(e2.parentNode, "[data-auto-animate-target]");
      t3 && (a2 = this.getAutoAnimateOptions(t3, a2));
    }
    return e2.dataset.autoAnimateEasing && (a2.easing = e2.dataset.autoAnimateEasing), e2.dataset.autoAnimateDuration && (a2.duration = parseFloat(e2.dataset.autoAnimateDuration)), e2.dataset.autoAnimateDelay && (a2.delay = parseFloat(e2.dataset.autoAnimateDelay)), a2;
  }
  getAutoAnimatableProperties(e2, t2, i2) {
    let a2 = this.Reveal.getConfig(), n2 = {styles: []};
    if (i2.translate !== false || i2.scale !== false) {
      let e3;
      if (typeof i2.measure == "function")
        e3 = i2.measure(t2);
      else if (a2.center)
        e3 = t2.getBoundingClientRect();
      else {
        let i3 = this.Reveal.getScale();
        e3 = {x: t2.offsetLeft * i3, y: t2.offsetTop * i3, width: t2.offsetWidth * i3, height: t2.offsetHeight * i3};
      }
      n2.x = e3.x, n2.y = e3.y, n2.width = e3.width, n2.height = e3.height;
    }
    const s2 = getComputedStyle(t2);
    return (i2.styles || a2.autoAnimateStyles).forEach((t3) => {
      let i3;
      typeof t3 == "string" && (t3 = {property: t3}), i3 = t3.from !== void 0 && e2 === "from" ? {value: t3.from, explicitValue: true} : t3.to !== void 0 && e2 === "to" ? {value: t3.to, explicitValue: true} : s2[t3.property], i3 !== "" && (n2.styles[t3.property] = i3);
    }), n2;
  }
  getAutoAnimatableElements(e2, t2) {
    let i2 = (typeof this.Reveal.getConfig().autoAnimateMatcher == "function" ? this.Reveal.getConfig().autoAnimateMatcher : this.getAutoAnimatePairs).call(this, e2, t2), a2 = [];
    return i2.filter((e3, t3) => {
      if (a2.indexOf(e3.to) === -1)
        return a2.push(e3.to), true;
    });
  }
  getAutoAnimatePairs(e2, t2) {
    let i2 = [];
    const a2 = "h1, h2, h3, h4, h5, h6, p, li";
    return this.findAutoAnimateMatches(i2, e2, t2, "[data-id]", (e3) => e3.nodeName + ":::" + e3.getAttribute("data-id")), this.findAutoAnimateMatches(i2, e2, t2, a2, (e3) => e3.nodeName + ":::" + e3.innerText), this.findAutoAnimateMatches(i2, e2, t2, "img, video, iframe", (e3) => e3.nodeName + ":::" + (e3.getAttribute("src") || e3.getAttribute("data-src"))), this.findAutoAnimateMatches(i2, e2, t2, "pre", (e3) => e3.nodeName + ":::" + e3.innerText), i2.forEach((e3) => {
      r(e3.from, a2) ? e3.options = {scale: false} : r(e3.from, "pre") && (e3.options = {scale: false, styles: ["width", "height"]}, this.findAutoAnimateMatches(i2, e3.from, e3.to, ".hljs .hljs-ln-code", (e4) => e4.textContent, {scale: false, styles: [], measure: this.getLocalBoundingBox.bind(this)}), this.findAutoAnimateMatches(i2, e3.from, e3.to, ".hljs .hljs-ln-line[data-line-number]", (e4) => e4.getAttribute("data-line-number"), {scale: false, styles: ["width"], measure: this.getLocalBoundingBox.bind(this)}));
    }, this), i2;
  }
  getLocalBoundingBox(e2) {
    const t2 = this.Reveal.getScale();
    return {x: Math.round(e2.offsetLeft * t2 * 100) / 100, y: Math.round(e2.offsetTop * t2 * 100) / 100, width: Math.round(e2.offsetWidth * t2 * 100) / 100, height: Math.round(e2.offsetHeight * t2 * 100) / 100};
  }
  findAutoAnimateMatches(e2, t2, i2, a2, n2, s2) {
    let o2 = {}, r2 = {};
    [].slice.call(t2.querySelectorAll(a2)).forEach((e3, t3) => {
      const i3 = n2(e3);
      typeof i3 == "string" && i3.length && (o2[i3] = o2[i3] || [], o2[i3].push(e3));
    }), [].slice.call(i2.querySelectorAll(a2)).forEach((t3, i3) => {
      const a3 = n2(t3);
      let l2;
      if (r2[a3] = r2[a3] || [], r2[a3].push(t3), o2[a3]) {
        const e3 = r2[a3].length - 1, t4 = o2[a3].length - 1;
        o2[a3][e3] ? (l2 = o2[a3][e3], o2[a3][e3] = null) : o2[a3][t4] && (l2 = o2[a3][t4], o2[a3][t4] = null);
      }
      l2 && e2.push({from: l2, to: t3, options: s2});
    });
  }
  getUnmatchedAutoAnimateElements(e2) {
    return [].slice.call(e2.children).reduce((e3, t2) => {
      const i2 = t2.querySelector("[data-auto-animate-target]");
      return t2.hasAttribute("data-auto-animate-target") || i2 || e3.push(t2), t2.querySelector("[data-auto-animate-target]") && (e3 = e3.concat(this.getUnmatchedAutoAnimateElements(t2))), e3;
    }, []);
  }
}
class C {
  constructor(e2) {
    this.Reveal = e2;
  }
  configure(e2, t2) {
    e2.fragments === false ? this.disable() : t2.fragments === false && this.enable();
  }
  disable() {
    a(this.Reveal.getSlidesElement(), ".fragment").forEach((e2) => {
      e2.classList.add("visible"), e2.classList.remove("current-fragment");
    });
  }
  enable() {
    a(this.Reveal.getSlidesElement(), ".fragment").forEach((e2) => {
      e2.classList.remove("visible"), e2.classList.remove("current-fragment");
    });
  }
  availableRoutes() {
    let e2 = this.Reveal.getCurrentSlide();
    if (e2 && this.Reveal.getConfig().fragments) {
      let t2 = e2.querySelectorAll(".fragment:not(.disabled)"), i2 = e2.querySelectorAll(".fragment:not(.disabled):not(.visible)");
      return {prev: t2.length - i2.length > 0, next: !!i2.length};
    }
    return {prev: false, next: false};
  }
  sort(e2, t2 = false) {
    e2 = Array.from(e2);
    let i2 = [], a2 = [], n2 = [];
    e2.forEach((e3) => {
      if (e3.hasAttribute("data-fragment-index")) {
        let t3 = parseInt(e3.getAttribute("data-fragment-index"), 10);
        i2[t3] || (i2[t3] = []), i2[t3].push(e3);
      } else
        a2.push([e3]);
    }), i2 = i2.concat(a2);
    let s2 = 0;
    return i2.forEach((e3) => {
      e3.forEach((e4) => {
        n2.push(e4), e4.setAttribute("data-fragment-index", s2);
      }), s2++;
    }), t2 === true ? i2 : n2;
  }
  sortAll() {
    this.Reveal.getHorizontalSlides().forEach((e2) => {
      let t2 = a(e2, "section");
      t2.forEach((e3, t3) => {
        this.sort(e3.querySelectorAll(".fragment"));
      }, this), t2.length === 0 && this.sort(e2.querySelectorAll(".fragment"));
    });
  }
  update(e2, t2) {
    let i2 = {shown: [], hidden: []}, a2 = this.Reveal.getCurrentSlide();
    if (a2 && this.Reveal.getConfig().fragments && (t2 = t2 || this.sort(a2.querySelectorAll(".fragment"))).length) {
      let n2 = 0;
      if (typeof e2 != "number") {
        let t3 = this.sort(a2.querySelectorAll(".fragment.visible")).pop();
        t3 && (e2 = parseInt(t3.getAttribute("data-fragment-index") || 0, 10));
      }
      Array.from(t2).forEach((t3, a3) => {
        if (t3.hasAttribute("data-fragment-index") && (a3 = parseInt(t3.getAttribute("data-fragment-index"), 10)), n2 = Math.max(n2, a3), a3 <= e2) {
          let n3 = t3.classList.contains("visible");
          t3.classList.add("visible"), t3.classList.remove("current-fragment"), a3 === e2 && (this.Reveal.announceStatus(this.Reveal.getStatusText(t3)), t3.classList.add("current-fragment"), this.Reveal.slideContent.startEmbeddedContent(t3)), n3 || (i2.shown.push(t3), this.Reveal.dispatchEvent({target: t3, type: "visible", bubbles: false}));
        } else {
          let e3 = t3.classList.contains("visible");
          t3.classList.remove("visible"), t3.classList.remove("current-fragment"), e3 && (this.Reveal.slideContent.stopEmbeddedContent(t3), i2.hidden.push(t3), this.Reveal.dispatchEvent({target: t3, type: "hidden", bubbles: false}));
        }
      }), e2 = typeof e2 == "number" ? e2 : -1, e2 = Math.max(Math.min(e2, n2), -1), a2.setAttribute("data-fragment", e2);
    }
    return i2;
  }
  sync(e2 = this.Reveal.getCurrentSlide()) {
    return this.sort(e2.querySelectorAll(".fragment"));
  }
  goto(e2, t2 = 0) {
    let i2 = this.Reveal.getCurrentSlide();
    if (i2 && this.Reveal.getConfig().fragments) {
      let a2 = this.sort(i2.querySelectorAll(".fragment:not(.disabled)"));
      if (a2.length) {
        if (typeof e2 != "number") {
          let t3 = this.sort(i2.querySelectorAll(".fragment:not(.disabled).visible")).pop();
          e2 = t3 ? parseInt(t3.getAttribute("data-fragment-index") || 0, 10) : -1;
        }
        e2 += t2;
        let n2 = this.update(e2, a2);
        return n2.hidden.length && this.Reveal.dispatchEvent({type: "fragmenthidden", data: {fragment: n2.hidden[0], fragments: n2.hidden}}), n2.shown.length && this.Reveal.dispatchEvent({type: "fragmentshown", data: {fragment: n2.shown[0], fragments: n2.shown}}), this.Reveal.controls.update(), this.Reveal.progress.update(), this.Reveal.getConfig().fragmentInURL && this.Reveal.location.writeURL(), !(!n2.shown.length && !n2.hidden.length);
      }
    }
    return false;
  }
  next() {
    return this.goto(null, 1);
  }
  prev() {
    return this.goto(null, -1);
  }
}
class P {
  constructor(e2) {
    this.Reveal = e2, this.active = false, this.onSlideClicked = this.onSlideClicked.bind(this);
  }
  activate() {
    if (this.Reveal.getConfig().overview && !this.isActive()) {
      this.active = true, this.Reveal.getRevealElement().classList.add("overview"), this.Reveal.cancelAutoSlide(), this.Reveal.getSlidesElement().appendChild(this.Reveal.getBackgroundsElement()), a(this.Reveal.getRevealElement(), ".slides section").forEach((e3) => {
        e3.classList.contains("stack") || e3.addEventListener("click", this.onSlideClicked, true);
      });
      const e2 = 70, t2 = this.Reveal.getComputedSlideSize();
      this.overviewSlideWidth = t2.width + e2, this.overviewSlideHeight = t2.height + e2, this.Reveal.getConfig().rtl && (this.overviewSlideWidth = -this.overviewSlideWidth), this.Reveal.updateSlidesVisibility(), this.layout(), this.update(), this.Reveal.layout();
      const i2 = this.Reveal.getIndices();
      this.Reveal.dispatchEvent({type: "overviewshown", data: {indexh: i2.h, indexv: i2.v, currentSlide: this.Reveal.getCurrentSlide()}});
    }
  }
  layout() {
    this.Reveal.getHorizontalSlides().forEach((e2, t2) => {
      e2.setAttribute("data-index-h", t2), o(e2, "translate3d(" + t2 * this.overviewSlideWidth + "px, 0, 0)"), e2.classList.contains("stack") && a(e2, "section").forEach((e3, i2) => {
        e3.setAttribute("data-index-h", t2), e3.setAttribute("data-index-v", i2), o(e3, "translate3d(0, " + i2 * this.overviewSlideHeight + "px, 0)");
      });
    }), Array.from(this.Reveal.getBackgroundsElement().childNodes).forEach((e2, t2) => {
      o(e2, "translate3d(" + t2 * this.overviewSlideWidth + "px, 0, 0)"), a(e2, ".slide-background").forEach((e3, t3) => {
        o(e3, "translate3d(0, " + t3 * this.overviewSlideHeight + "px, 0)");
      });
    });
  }
  update() {
    const e2 = Math.min(window.innerWidth, window.innerHeight), t2 = Math.max(e2 / 5, 150) / e2, i2 = this.Reveal.getIndices();
    this.Reveal.transformSlides({overview: ["scale(" + t2 + ")", "translateX(" + -i2.h * this.overviewSlideWidth + "px)", "translateY(" + -i2.v * this.overviewSlideHeight + "px)"].join(" ")});
  }
  deactivate() {
    if (this.Reveal.getConfig().overview) {
      this.active = false, this.Reveal.getRevealElement().classList.remove("overview"), this.Reveal.getRevealElement().classList.add("overview-deactivating"), setTimeout(() => {
        this.Reveal.getRevealElement().classList.remove("overview-deactivating");
      }, 1), this.Reveal.getRevealElement().appendChild(this.Reveal.getBackgroundsElement()), a(this.Reveal.getRevealElement(), ".slides section").forEach((e3) => {
        o(e3, ""), e3.removeEventListener("click", this.onSlideClicked, true);
      }), a(this.Reveal.getBackgroundsElement(), ".slide-background").forEach((e3) => {
        o(e3, "");
      }), this.Reveal.transformSlides({overview: ""});
      const e2 = this.Reveal.getIndices();
      this.Reveal.slide(e2.h, e2.v), this.Reveal.layout(), this.Reveal.cueAutoSlide(), this.Reveal.dispatchEvent({type: "overviewhidden", data: {indexh: e2.h, indexv: e2.v, currentSlide: this.Reveal.getCurrentSlide()}});
    }
  }
  toggle(e2) {
    typeof e2 == "boolean" ? e2 ? this.activate() : this.deactivate() : this.isActive() ? this.deactivate() : this.activate();
  }
  isActive() {
    return this.active;
  }
  onSlideClicked(e2) {
    if (this.isActive()) {
      e2.preventDefault();
      let t2 = e2.target;
      for (; t2 && !t2.nodeName.match(/section/gi); )
        t2 = t2.parentNode;
      if (t2 && !t2.classList.contains("disabled") && (this.deactivate(), t2.nodeName.match(/section/gi))) {
        let e3 = parseInt(t2.getAttribute("data-index-h"), 10), i2 = parseInt(t2.getAttribute("data-index-v"), 10);
        this.Reveal.slide(e3, i2);
      }
    }
  }
}
class N {
  constructor(e2) {
    this.Reveal = e2, this.shortcuts = {}, this.bindings = {}, this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this), this.onDocumentKeyPress = this.onDocumentKeyPress.bind(this);
  }
  configure(e2, t2) {
    e2.navigationMode === "linear" ? (this.shortcuts["&#8594;  ,  &#8595;  ,  SPACE  ,  N  ,  L  ,  J"] = "Next slide", this.shortcuts["&#8592;  ,  &#8593;  ,  P  ,  H  ,  K"] = "Previous slide") : (this.shortcuts["N  ,  SPACE"] = "Next slide", this.shortcuts.P = "Previous slide", this.shortcuts["&#8592;  ,  H"] = "Navigate left", this.shortcuts["&#8594;  ,  L"] = "Navigate right", this.shortcuts["&#8593;  ,  K"] = "Navigate up", this.shortcuts["&#8595;  ,  J"] = "Navigate down"), this.shortcuts["Home  ,  Shift &#8592;"] = "First slide", this.shortcuts["End  ,  Shift &#8594;"] = "Last slide", this.shortcuts["B  ,  ."] = "Pause", this.shortcuts.F = "Fullscreen", this.shortcuts["ESC, O"] = "Slide overview";
  }
  bind() {
    document.addEventListener("keydown", this.onDocumentKeyDown, false), document.addEventListener("keypress", this.onDocumentKeyPress, false);
  }
  unbind() {
    document.removeEventListener("keydown", this.onDocumentKeyDown, false), document.removeEventListener("keypress", this.onDocumentKeyPress, false);
  }
  addKeyBinding(e2, t2) {
    typeof e2 == "object" && e2.keyCode ? this.bindings[e2.keyCode] = {callback: t2, key: e2.key, description: e2.description} : this.bindings[e2] = {callback: t2, key: null, description: null};
  }
  removeKeyBinding(e2) {
    delete this.bindings[e2];
  }
  triggerKey(e2) {
    this.onDocumentKeyDown({keyCode: e2});
  }
  registerKeyboardShortcut(e2, t2) {
    this.shortcuts[e2] = t2;
  }
  getShortcuts() {
    return this.shortcuts;
  }
  getBindings() {
    return this.bindings;
  }
  onDocumentKeyPress(e2) {
    e2.shiftKey && e2.charCode === 63 && this.Reveal.toggleHelp();
  }
  onDocumentKeyDown(e2) {
    let t2 = this.Reveal.getConfig();
    if (typeof t2.keyboardCondition == "function" && t2.keyboardCondition(e2) === false)
      return true;
    if (t2.keyboardCondition === "focused" && !this.Reveal.isFocused())
      return true;
    let i2 = e2.keyCode, a2 = !this.Reveal.isAutoSliding();
    this.Reveal.onUserInput(e2);
    let n2 = document.activeElement && document.activeElement.isContentEditable === true, s2 = document.activeElement && document.activeElement.tagName && /input|textarea/i.test(document.activeElement.tagName), o2 = document.activeElement && document.activeElement.className && /speaker-notes/i.test(document.activeElement.className), r2 = e2.shiftKey && e2.keyCode === 32, l2 = e2.shiftKey && i2 === 37, d2 = e2.shiftKey && i2 === 39, c2 = !r2 && !l2 && !d2 && (e2.shiftKey || e2.altKey || e2.ctrlKey || e2.metaKey);
    if (n2 || s2 || o2 || c2)
      return;
    let h2, u2 = [66, 86, 190, 191];
    if (typeof t2.keyboard == "object")
      for (h2 in t2.keyboard)
        t2.keyboard[h2] === "togglePause" && u2.push(parseInt(h2, 10));
    if (this.Reveal.isPaused() && u2.indexOf(i2) === -1)
      return false;
    let g2 = t2.navigationMode === "linear" || !this.Reveal.hasHorizontalSlides() || !this.Reveal.hasVerticalSlides(), v2 = false;
    if (typeof t2.keyboard == "object") {
      for (h2 in t2.keyboard)
        if (parseInt(h2, 10) === i2) {
          let i3 = t2.keyboard[h2];
          typeof i3 == "function" ? i3.apply(null, [e2]) : typeof i3 == "string" && typeof this.Reveal[i3] == "function" && this.Reveal[i3].call(), v2 = true;
        }
    }
    if (v2 === false) {
      for (h2 in this.bindings)
        if (parseInt(h2, 10) === i2) {
          let t3 = this.bindings[h2].callback;
          typeof t3 == "function" ? t3.apply(null, [e2]) : typeof t3 == "string" && typeof this.Reveal[t3] == "function" && this.Reveal[t3].call(), v2 = true;
        }
    }
    v2 === false && (v2 = true, i2 === 80 || i2 === 33 ? this.Reveal.prev() : i2 === 78 || i2 === 34 ? this.Reveal.next() : i2 === 72 || i2 === 37 ? l2 ? this.Reveal.slide(0) : !this.Reveal.overview.isActive() && g2 ? this.Reveal.prev() : this.Reveal.left() : i2 === 76 || i2 === 39 ? d2 ? this.Reveal.slide(Number.MAX_VALUE) : !this.Reveal.overview.isActive() && g2 ? this.Reveal.next() : this.Reveal.right() : i2 === 75 || i2 === 38 ? !this.Reveal.overview.isActive() && g2 ? this.Reveal.prev() : this.Reveal.up() : i2 === 74 || i2 === 40 ? !this.Reveal.overview.isActive() && g2 ? this.Reveal.next() : this.Reveal.down() : i2 === 36 ? this.Reveal.slide(0) : i2 === 35 ? this.Reveal.slide(Number.MAX_VALUE) : i2 === 32 ? (this.Reveal.overview.isActive() && this.Reveal.overview.deactivate(), e2.shiftKey ? this.Reveal.prev() : this.Reveal.next()) : i2 === 58 || i2 === 59 || i2 === 66 || i2 === 86 || i2 === 190 || i2 === 191 ? this.Reveal.togglePause() : i2 === 70 ? ((e3) => {
      let t3 = (e3 = e3 || document.documentElement).requestFullscreen || e3.webkitRequestFullscreen || e3.webkitRequestFullScreen || e3.mozRequestFullScreen || e3.msRequestFullscreen;
      t3 && t3.apply(e3);
    })(t2.embedded ? this.Reveal.getViewportElement() : document.documentElement) : i2 === 65 ? t2.autoSlideStoppable && this.Reveal.toggleAutoSlide(a2) : v2 = false), v2 ? e2.preventDefault && e2.preventDefault() : i2 !== 27 && i2 !== 79 || (this.Reveal.closeOverlay() === false && this.Reveal.overview.toggle(), e2.preventDefault && e2.preventDefault()), this.Reveal.cueAutoSlide();
  }
}
class M {
  constructor(e2) {
    this.Reveal = e2, this.writeURLTimeout = 0, this.onWindowHashChange = this.onWindowHashChange.bind(this);
  }
  bind() {
    window.addEventListener("hashchange", this.onWindowHashChange, false);
  }
  unbind() {
    window.removeEventListener("hashchange", this.onWindowHashChange, false);
  }
  readURL() {
    let e2 = this.Reveal.getConfig(), t2 = this.Reveal.getIndices(), i2 = this.Reveal.getCurrentSlide(), a2 = window.location.hash, n2 = a2.slice(2).split("/"), s2 = a2.replace(/#\/?/gi, "");
    if (!/^[0-9]*$/.test(n2[0]) && s2.length) {
      let e3, a3;
      /\/[-\d]+$/g.test(s2) && (a3 = parseInt(s2.split("/").pop(), 10), a3 = isNaN(a3) ? void 0 : a3, s2 = s2.split("/").shift());
      try {
        e3 = document.getElementById(decodeURIComponent(s2));
      } catch (e4) {
      }
      let n3 = !!i2 && i2.getAttribute("id") === s2;
      if (e3) {
        if (!n3 || a3 !== void 0) {
          let t3 = this.Reveal.getIndices(e3);
          this.Reveal.slide(t3.h, t3.v, a3);
        }
      } else
        this.Reveal.slide(t2.h || 0, t2.v || 0);
    } else {
      let i3, a3 = e2.hashOneBasedIndex ? 1 : 0, s3 = parseInt(n2[0], 10) - a3 || 0, o2 = parseInt(n2[1], 10) - a3 || 0;
      e2.fragmentInURL && (i3 = parseInt(n2[2], 10), isNaN(i3) && (i3 = void 0)), s3 === t2.h && o2 === t2.v && i3 === void 0 || this.Reveal.slide(s3, o2, i3);
    }
  }
  writeURL(e2) {
    let t2 = this.Reveal.getConfig(), i2 = this.Reveal.getCurrentSlide();
    if (clearTimeout(this.writeURLTimeout), typeof e2 == "number")
      this.writeURLTimeout = setTimeout(this.writeURL, e2);
    else if (i2) {
      let e3 = this.getHash();
      t2.history ? window.location.hash = e3 : t2.hash && (e3 === "/" ? window.history.replaceState(null, null, window.location.pathname + window.location.search) : window.history.replaceState(null, null, "#" + e3));
    }
  }
  getHash(e2) {
    let t2 = "/", i2 = e2 || this.Reveal.getCurrentSlide(), a2 = i2 ? i2.getAttribute("id") : null;
    a2 && (a2 = encodeURIComponent(a2));
    let n2 = this.Reveal.getIndices(e2);
    if (this.Reveal.getConfig().fragmentInURL || (n2.f = void 0), typeof a2 == "string" && a2.length)
      t2 = "/" + a2, n2.f >= 0 && (t2 += "/" + n2.f);
    else {
      let e3 = this.Reveal.getConfig().hashOneBasedIndex ? 1 : 0;
      (n2.h > 0 || n2.v > 0 || n2.f >= 0) && (t2 += n2.h + e3), (n2.v > 0 || n2.f >= 0) && (t2 += "/" + (n2.v + e3)), n2.f >= 0 && (t2 += "/" + n2.f);
    }
    return t2;
  }
  onWindowHashChange(e2) {
    this.readURL();
  }
}
class D {
  constructor(e2) {
    this.Reveal = e2, this.onNavigateLeftClicked = this.onNavigateLeftClicked.bind(this), this.onNavigateRightClicked = this.onNavigateRightClicked.bind(this), this.onNavigateUpClicked = this.onNavigateUpClicked.bind(this), this.onNavigateDownClicked = this.onNavigateDownClicked.bind(this), this.onNavigatePrevClicked = this.onNavigatePrevClicked.bind(this), this.onNavigateNextClicked = this.onNavigateNextClicked.bind(this);
  }
  render() {
    const e2 = this.Reveal.getConfig().rtl, t2 = this.Reveal.getRevealElement();
    this.element = document.createElement("aside"), this.element.className = "controls", this.element.innerHTML = `<button class="navigate-left" aria-label="${e2 ? "next slide" : "previous slide"}"><div class="controls-arrow"></div></button>
			<button class="navigate-right" aria-label="${e2 ? "previous slide" : "next slide"}"><div class="controls-arrow"></div></button>
			<button class="navigate-up" aria-label="above slide"><div class="controls-arrow"></div></button>
			<button class="navigate-down" aria-label="below slide"><div class="controls-arrow"></div></button>`, this.Reveal.getRevealElement().appendChild(this.element), this.controlsLeft = a(t2, ".navigate-left"), this.controlsRight = a(t2, ".navigate-right"), this.controlsUp = a(t2, ".navigate-up"), this.controlsDown = a(t2, ".navigate-down"), this.controlsPrev = a(t2, ".navigate-prev"), this.controlsNext = a(t2, ".navigate-next"), this.controlsRightArrow = this.element.querySelector(".navigate-right"), this.controlsLeftArrow = this.element.querySelector(".navigate-left"), this.controlsDownArrow = this.element.querySelector(".navigate-down");
  }
  configure(e2, t2) {
    this.element.style.display = e2.controls ? "block" : "none", this.element.setAttribute("data-controls-layout", e2.controlsLayout), this.element.setAttribute("data-controls-back-arrows", e2.controlsBackArrows);
  }
  bind() {
    let e2 = ["touchstart", "click"];
    f && (e2 = ["touchstart"]), e2.forEach((e3) => {
      this.controlsLeft.forEach((t2) => t2.addEventListener(e3, this.onNavigateLeftClicked, false)), this.controlsRight.forEach((t2) => t2.addEventListener(e3, this.onNavigateRightClicked, false)), this.controlsUp.forEach((t2) => t2.addEventListener(e3, this.onNavigateUpClicked, false)), this.controlsDown.forEach((t2) => t2.addEventListener(e3, this.onNavigateDownClicked, false)), this.controlsPrev.forEach((t2) => t2.addEventListener(e3, this.onNavigatePrevClicked, false)), this.controlsNext.forEach((t2) => t2.addEventListener(e3, this.onNavigateNextClicked, false));
    });
  }
  unbind() {
    ["touchstart", "click"].forEach((e2) => {
      this.controlsLeft.forEach((t2) => t2.removeEventListener(e2, this.onNavigateLeftClicked, false)), this.controlsRight.forEach((t2) => t2.removeEventListener(e2, this.onNavigateRightClicked, false)), this.controlsUp.forEach((t2) => t2.removeEventListener(e2, this.onNavigateUpClicked, false)), this.controlsDown.forEach((t2) => t2.removeEventListener(e2, this.onNavigateDownClicked, false)), this.controlsPrev.forEach((t2) => t2.removeEventListener(e2, this.onNavigatePrevClicked, false)), this.controlsNext.forEach((t2) => t2.removeEventListener(e2, this.onNavigateNextClicked, false));
    });
  }
  update() {
    let e2 = this.Reveal.availableRoutes();
    [...this.controlsLeft, ...this.controlsRight, ...this.controlsUp, ...this.controlsDown, ...this.controlsPrev, ...this.controlsNext].forEach((e3) => {
      e3.classList.remove("enabled", "fragmented"), e3.setAttribute("disabled", "disabled");
    }), e2.left && this.controlsLeft.forEach((e3) => {
      e3.classList.add("enabled"), e3.removeAttribute("disabled");
    }), e2.right && this.controlsRight.forEach((e3) => {
      e3.classList.add("enabled"), e3.removeAttribute("disabled");
    }), e2.up && this.controlsUp.forEach((e3) => {
      e3.classList.add("enabled"), e3.removeAttribute("disabled");
    }), e2.down && this.controlsDown.forEach((e3) => {
      e3.classList.add("enabled"), e3.removeAttribute("disabled");
    }), (e2.left || e2.up) && this.controlsPrev.forEach((e3) => {
      e3.classList.add("enabled"), e3.removeAttribute("disabled");
    }), (e2.right || e2.down) && this.controlsNext.forEach((e3) => {
      e3.classList.add("enabled"), e3.removeAttribute("disabled");
    });
    let t2 = this.Reveal.getCurrentSlide();
    if (t2) {
      let e3 = this.Reveal.fragments.availableRoutes();
      e3.prev && this.controlsPrev.forEach((e4) => {
        e4.classList.add("fragmented", "enabled"), e4.removeAttribute("disabled");
      }), e3.next && this.controlsNext.forEach((e4) => {
        e4.classList.add("fragmented", "enabled"), e4.removeAttribute("disabled");
      }), this.Reveal.isVerticalSlide(t2) ? (e3.prev && this.controlsUp.forEach((e4) => {
        e4.classList.add("fragmented", "enabled"), e4.removeAttribute("disabled");
      }), e3.next && this.controlsDown.forEach((e4) => {
        e4.classList.add("fragmented", "enabled"), e4.removeAttribute("disabled");
      })) : (e3.prev && this.controlsLeft.forEach((e4) => {
        e4.classList.add("fragmented", "enabled"), e4.removeAttribute("disabled");
      }), e3.next && this.controlsRight.forEach((e4) => {
        e4.classList.add("fragmented", "enabled"), e4.removeAttribute("disabled");
      }));
    }
    if (this.Reveal.getConfig().controlsTutorial) {
      let t3 = this.Reveal.getIndices();
      !this.Reveal.hasNavigatedVertically() && e2.down ? this.controlsDownArrow.classList.add("highlight") : (this.controlsDownArrow.classList.remove("highlight"), this.Reveal.getConfig().rtl ? !this.Reveal.hasNavigatedHorizontally() && e2.left && t3.v === 0 ? this.controlsLeftArrow.classList.add("highlight") : this.controlsLeftArrow.classList.remove("highlight") : !this.Reveal.hasNavigatedHorizontally() && e2.right && t3.v === 0 ? this.controlsRightArrow.classList.add("highlight") : this.controlsRightArrow.classList.remove("highlight"));
    }
  }
  onNavigateLeftClicked(e2) {
    e2.preventDefault(), this.Reveal.onUserInput(), this.Reveal.getConfig().navigationMode === "linear" ? this.Reveal.prev() : this.Reveal.left();
  }
  onNavigateRightClicked(e2) {
    e2.preventDefault(), this.Reveal.onUserInput(), this.Reveal.getConfig().navigationMode === "linear" ? this.Reveal.next() : this.Reveal.right();
  }
  onNavigateUpClicked(e2) {
    e2.preventDefault(), this.Reveal.onUserInput(), this.Reveal.up();
  }
  onNavigateDownClicked(e2) {
    e2.preventDefault(), this.Reveal.onUserInput(), this.Reveal.down();
  }
  onNavigatePrevClicked(e2) {
    e2.preventDefault(), this.Reveal.onUserInput(), this.Reveal.prev();
  }
  onNavigateNextClicked(e2) {
    e2.preventDefault(), this.Reveal.onUserInput(), this.Reveal.next();
  }
}
class I {
  constructor(e2) {
    this.Reveal = e2, this.onProgressClicked = this.onProgressClicked.bind(this);
  }
  render() {
    this.element = document.createElement("div"), this.element.className = "progress", this.Reveal.getRevealElement().appendChild(this.element), this.bar = document.createElement("span"), this.element.appendChild(this.bar);
  }
  configure(e2, t2) {
    this.element.style.display = e2.progress ? "block" : "none";
  }
  bind() {
    this.Reveal.getConfig().progress && this.element && this.element.addEventListener("click", this.onProgressClicked, false);
  }
  unbind() {
    this.Reveal.getConfig().progress && this.element && this.element.removeEventListener("click", this.onProgressClicked, false);
  }
  update() {
    if (this.Reveal.getConfig().progress && this.bar) {
      let e2 = this.Reveal.getProgress();
      this.Reveal.getTotalSlides() < 2 && (e2 = 0), this.bar.style.transform = "scaleX(" + e2 + ")";
    }
  }
  getMaxWidth() {
    return this.Reveal.getRevealElement().offsetWidth;
  }
  onProgressClicked(e2) {
    this.Reveal.onUserInput(e2), e2.preventDefault();
    let t2 = this.Reveal.getSlides(), i2 = t2.length, a2 = Math.floor(e2.clientX / this.getMaxWidth() * i2);
    this.Reveal.getConfig().rtl && (a2 = i2 - a2);
    let n2 = this.Reveal.getIndices(t2[a2]);
    this.Reveal.slide(n2.h, n2.v);
  }
}
class T {
  constructor(e2) {
    this.Reveal = e2, this.lastMouseWheelStep = 0, this.cursorHidden = false, this.cursorInactiveTimeout = 0, this.onDocumentCursorActive = this.onDocumentCursorActive.bind(this), this.onDocumentMouseScroll = this.onDocumentMouseScroll.bind(this);
  }
  configure(e2, t2) {
    e2.mouseWheel ? (document.addEventListener("DOMMouseScroll", this.onDocumentMouseScroll, false), document.addEventListener("mousewheel", this.onDocumentMouseScroll, false)) : (document.removeEventListener("DOMMouseScroll", this.onDocumentMouseScroll, false), document.removeEventListener("mousewheel", this.onDocumentMouseScroll, false)), e2.hideInactiveCursor ? (document.addEventListener("mousemove", this.onDocumentCursorActive, false), document.addEventListener("mousedown", this.onDocumentCursorActive, false)) : (this.showCursor(), document.removeEventListener("mousemove", this.onDocumentCursorActive, false), document.removeEventListener("mousedown", this.onDocumentCursorActive, false));
  }
  showCursor() {
    this.cursorHidden && (this.cursorHidden = false, this.Reveal.getRevealElement().style.cursor = "");
  }
  hideCursor() {
    this.cursorHidden === false && (this.cursorHidden = true, this.Reveal.getRevealElement().style.cursor = "none");
  }
  onDocumentCursorActive(e2) {
    this.showCursor(), clearTimeout(this.cursorInactiveTimeout), this.cursorInactiveTimeout = setTimeout(this.hideCursor.bind(this), this.Reveal.getConfig().hideCursorTime);
  }
  onDocumentMouseScroll(e2) {
    if (Date.now() - this.lastMouseWheelStep > 1e3) {
      this.lastMouseWheelStep = Date.now();
      let t2 = e2.detail || -e2.wheelDelta;
      t2 > 0 ? this.Reveal.next() : t2 < 0 && this.Reveal.prev();
    }
  }
}
const z = (e2, t2) => {
  const i2 = document.createElement("script");
  i2.type = "text/javascript", i2.async = false, i2.defer = false, i2.src = e2, typeof t2 == "function" && (i2.onload = i2.onreadystatechange = (e3) => {
    (e3.type === "load" || /loaded|complete/.test(i2.readyState)) && (i2.onload = i2.onreadystatechange = i2.onerror = null, t2());
  }, i2.onerror = (e3) => {
    i2.onload = i2.onreadystatechange = i2.onerror = null, t2(new Error("Failed loading script: " + i2.src + "\n" + e3));
  });
  const a2 = document.querySelector("head");
  a2.insertBefore(i2, a2.lastChild);
};
class H {
  constructor(e2) {
    this.Reveal = e2, this.state = "idle", this.registeredPlugins = {}, this.asyncDependencies = [];
  }
  load(e2, t2) {
    return this.state = "loading", e2.forEach(this.registerPlugin.bind(this)), new Promise((e3) => {
      let i2 = [], a2 = 0;
      if (t2.forEach((e4) => {
        e4.condition && !e4.condition() || (e4.async ? this.asyncDependencies.push(e4) : i2.push(e4));
      }), i2.length) {
        a2 = i2.length;
        const t3 = (t4) => {
          t4 && typeof t4.callback == "function" && t4.callback(), --a2 == 0 && this.initPlugins().then(e3);
        };
        i2.forEach((e4) => {
          typeof e4.id == "string" ? (this.registerPlugin(e4), t3(e4)) : typeof e4.src == "string" ? z(e4.src, () => t3(e4)) : (console.warn("Unrecognized plugin format", e4), t3());
        });
      } else
        this.initPlugins().then(e3);
    });
  }
  initPlugins() {
    return new Promise((e2) => {
      let t2 = Object.values(this.registeredPlugins), i2 = t2.length;
      if (i2 === 0)
        this.loadAsync().then(e2);
      else {
        let a2, n2 = () => {
          --i2 == 0 ? this.loadAsync().then(e2) : a2();
        }, s2 = 0;
        a2 = () => {
          let e3 = t2[s2++];
          if (typeof e3.init == "function") {
            let t3 = e3.init(this.Reveal);
            t3 && typeof t3.then == "function" ? t3.then(n2) : n2();
          } else
            n2();
        }, a2();
      }
    });
  }
  loadAsync() {
    return this.state = "loaded", this.asyncDependencies.length && this.asyncDependencies.forEach((e2) => {
      z(e2.src, e2.callback);
    }), Promise.resolve();
  }
  registerPlugin(e2) {
    arguments.length === 2 && typeof arguments[0] == "string" ? (e2 = arguments[1]).id = arguments[0] : typeof e2 == "function" && (e2 = e2());
    let t2 = e2.id;
    typeof t2 != "string" ? console.warn("Unrecognized plugin format; can't find plugin.id", e2) : this.registeredPlugins[t2] === void 0 ? (this.registeredPlugins[t2] = e2, this.state === "loaded" && typeof e2.init == "function" && e2.init(this.Reveal)) : console.warn('reveal.js: "' + t2 + '" plugin has already been registered');
  }
  hasPlugin(e2) {
    return !!this.registeredPlugins[e2];
  }
  getPlugin(e2) {
    return this.registeredPlugins[e2];
  }
  getRegisteredPlugins() {
    return this.registeredPlugins;
  }
}
class B {
  constructor(e2) {
    this.Reveal = e2;
  }
  async setupPDF() {
    const e2 = this.Reveal.getConfig(), t2 = a(this.Reveal.getRevealElement(), ".slides section"), i2 = e2.slideNumber && /all|print/i.test(e2.showSlideNumber), n2 = this.Reveal.getComputedSlideSize(window.innerWidth, window.innerHeight), s2 = Math.floor(n2.width * (1 + e2.margin)), o2 = Math.floor(n2.height * (1 + e2.margin)), r2 = n2.width, l2 = n2.height;
    await new Promise(requestAnimationFrame), c("@page{size:" + s2 + "px " + o2 + "px; margin: 0px;}"), c(".reveal section>img, .reveal section>video, .reveal section>iframe{max-width: " + r2 + "px; max-height:" + l2 + "px}"), document.documentElement.classList.add("print-pdf"), document.body.style.width = s2 + "px", document.body.style.height = o2 + "px", await new Promise(requestAnimationFrame), this.Reveal.layoutSlideContents(r2, l2), t2.forEach((e3) => this.Reveal.slideContent.layout(e3)), await new Promise(requestAnimationFrame);
    const d2 = t2.map((e3) => e3.scrollHeight), h2 = [], u2 = t2[0].parentNode;
    t2.forEach(function(t3, n3) {
      if (t3.classList.contains("stack") === false) {
        let c2 = (s2 - r2) / 2, u3 = (o2 - l2) / 2;
        const g2 = d2[n3];
        let v2 = Math.max(Math.ceil(g2 / o2), 1);
        v2 = Math.min(v2, e2.pdfMaxPagesPerSlide), (v2 === 1 && e2.center || t3.classList.contains("center")) && (u3 = Math.max((o2 - g2) / 2, 0));
        const p2 = document.createElement("div");
        if (h2.push(p2), p2.className = "pdf-page", p2.style.height = (o2 + e2.pdfPageHeightOffset) * v2 + "px", p2.appendChild(t3), t3.style.left = c2 + "px", t3.style.top = u3 + "px", t3.style.width = r2 + "px", t3.slideBackgroundElement && p2.insertBefore(t3.slideBackgroundElement, t3), e2.showNotes) {
          const i3 = this.Reveal.getSlideNotes(t3);
          if (i3) {
            const t4 = 8, a2 = typeof e2.showNotes == "string" ? e2.showNotes : "inline", n4 = document.createElement("div");
            n4.classList.add("speaker-notes"), n4.classList.add("speaker-notes-pdf"), n4.setAttribute("data-layout", a2), n4.innerHTML = i3, a2 === "separate-page" ? h2.push(n4) : (n4.style.left = t4 + "px", n4.style.bottom = t4 + "px", n4.style.width = s2 - 2 * t4 + "px", p2.appendChild(n4));
          }
        }
        if (i2) {
          const e3 = n3 + 1, t4 = document.createElement("div");
          t4.classList.add("slide-number"), t4.classList.add("slide-number-pdf"), t4.innerHTML = e3, p2.appendChild(t4);
        }
        if (e2.pdfSeparateFragments) {
          const e3 = this.Reveal.fragments.sort(p2.querySelectorAll(".fragment"), true);
          let t4;
          e3.forEach(function(e4) {
            t4 && t4.forEach(function(e5) {
              e5.classList.remove("current-fragment");
            }), e4.forEach(function(e5) {
              e5.classList.add("visible", "current-fragment");
            }, this);
            const i3 = p2.cloneNode(true);
            h2.push(i3), t4 = e4;
          }, this), e3.forEach(function(e4) {
            e4.forEach(function(e5) {
              e5.classList.remove("visible", "current-fragment");
            });
          });
        } else
          a(p2, ".fragment:not(.fade-out)").forEach(function(e3) {
            e3.classList.add("visible");
          });
      }
    }, this), await new Promise(requestAnimationFrame), h2.forEach((e3) => u2.appendChild(e3)), this.Reveal.dispatchEvent({type: "pdf-ready"});
  }
  isPrintingPDF() {
    return /print-pdf/gi.test(window.location.search);
  }
}
class q {
  constructor(e2) {
    this.Reveal = e2, this.touchStartX = 0, this.touchStartY = 0, this.touchStartCount = 0, this.touchCaptured = false, this.onPointerDown = this.onPointerDown.bind(this), this.onPointerMove = this.onPointerMove.bind(this), this.onPointerUp = this.onPointerUp.bind(this), this.onTouchStart = this.onTouchStart.bind(this), this.onTouchMove = this.onTouchMove.bind(this), this.onTouchEnd = this.onTouchEnd.bind(this);
  }
  bind() {
    let e2 = this.Reveal.getRevealElement();
    "onpointerdown" in window ? (e2.addEventListener("pointerdown", this.onPointerDown, false), e2.addEventListener("pointermove", this.onPointerMove, false), e2.addEventListener("pointerup", this.onPointerUp, false)) : window.navigator.msPointerEnabled ? (e2.addEventListener("MSPointerDown", this.onPointerDown, false), e2.addEventListener("MSPointerMove", this.onPointerMove, false), e2.addEventListener("MSPointerUp", this.onPointerUp, false)) : (e2.addEventListener("touchstart", this.onTouchStart, false), e2.addEventListener("touchmove", this.onTouchMove, false), e2.addEventListener("touchend", this.onTouchEnd, false));
  }
  unbind() {
    let e2 = this.Reveal.getRevealElement();
    e2.removeEventListener("pointerdown", this.onPointerDown, false), e2.removeEventListener("pointermove", this.onPointerMove, false), e2.removeEventListener("pointerup", this.onPointerUp, false), e2.removeEventListener("MSPointerDown", this.onPointerDown, false), e2.removeEventListener("MSPointerMove", this.onPointerMove, false), e2.removeEventListener("MSPointerUp", this.onPointerUp, false), e2.removeEventListener("touchstart", this.onTouchStart, false), e2.removeEventListener("touchmove", this.onTouchMove, false), e2.removeEventListener("touchend", this.onTouchEnd, false);
  }
  isSwipePrevented(e2) {
    if (r(e2, "video, audio"))
      return true;
    for (; e2 && typeof e2.hasAttribute == "function"; ) {
      if (e2.hasAttribute("data-prevent-swipe"))
        return true;
      e2 = e2.parentNode;
    }
    return false;
  }
  onTouchStart(e2) {
    if (this.isSwipePrevented(e2.target))
      return true;
    this.touchStartX = e2.touches[0].clientX, this.touchStartY = e2.touches[0].clientY, this.touchStartCount = e2.touches.length;
  }
  onTouchMove(e2) {
    if (this.isSwipePrevented(e2.target))
      return true;
    let t2 = this.Reveal.getConfig();
    if (this.touchCaptured)
      f && e2.preventDefault();
    else {
      this.Reveal.onUserInput(e2);
      let i2 = e2.touches[0].clientX, a2 = e2.touches[0].clientY;
      if (e2.touches.length === 1 && this.touchStartCount !== 2) {
        let n2 = this.Reveal.availableRoutes({includeFragments: true}), s2 = i2 - this.touchStartX, o2 = a2 - this.touchStartY;
        s2 > 40 && Math.abs(s2) > Math.abs(o2) ? (this.touchCaptured = true, t2.navigationMode === "linear" ? t2.rtl ? this.Reveal.next() : this.Reveal.prev() : this.Reveal.left()) : s2 < -40 && Math.abs(s2) > Math.abs(o2) ? (this.touchCaptured = true, t2.navigationMode === "linear" ? t2.rtl ? this.Reveal.prev() : this.Reveal.next() : this.Reveal.right()) : o2 > 40 && n2.up ? (this.touchCaptured = true, t2.navigationMode === "linear" ? this.Reveal.prev() : this.Reveal.up()) : o2 < -40 && n2.down && (this.touchCaptured = true, t2.navigationMode === "linear" ? this.Reveal.next() : this.Reveal.down()), t2.embedded ? (this.touchCaptured || this.Reveal.isVerticalSlide()) && e2.preventDefault() : e2.preventDefault();
      }
    }
  }
  onTouchEnd(e2) {
    this.touchCaptured = false;
  }
  onPointerDown(e2) {
    e2.pointerType !== e2.MSPOINTER_TYPE_TOUCH && e2.pointerType !== "touch" || (e2.touches = [{clientX: e2.clientX, clientY: e2.clientY}], this.onTouchStart(e2));
  }
  onPointerMove(e2) {
    e2.pointerType !== e2.MSPOINTER_TYPE_TOUCH && e2.pointerType !== "touch" || (e2.touches = [{clientX: e2.clientX, clientY: e2.clientY}], this.onTouchMove(e2));
  }
  onPointerUp(e2) {
    e2.pointerType !== e2.MSPOINTER_TYPE_TOUCH && e2.pointerType !== "touch" || (e2.touches = [{clientX: e2.clientX, clientY: e2.clientY}], this.onTouchEnd(e2));
  }
}
class F {
  constructor(e2) {
    this.Reveal = e2, this.onRevealPointerDown = this.onRevealPointerDown.bind(this), this.onDocumentPointerDown = this.onDocumentPointerDown.bind(this);
  }
  configure(e2, t2) {
    e2.embedded ? this.blur() : (this.focus(), this.unbind());
  }
  bind() {
    this.Reveal.getConfig().embedded && this.Reveal.getRevealElement().addEventListener("pointerdown", this.onRevealPointerDown, false);
  }
  unbind() {
    this.Reveal.getRevealElement().removeEventListener("pointerdown", this.onRevealPointerDown, false), document.removeEventListener("pointerdown", this.onDocumentPointerDown, false);
  }
  focus() {
    this.state !== "focus" && (this.Reveal.getRevealElement().classList.add("focused"), document.addEventListener("pointerdown", this.onDocumentPointerDown, false)), this.state = "focus";
  }
  blur() {
    this.state !== "blur" && (this.Reveal.getRevealElement().classList.remove("focused"), document.removeEventListener("pointerdown", this.onDocumentPointerDown, false)), this.state = "blur";
  }
  isFocused() {
    return this.state === "focus";
  }
  onRevealPointerDown(e2) {
    this.focus();
  }
  onDocumentPointerDown(e2) {
    let t2 = l(e2.target, ".reveal");
    t2 && t2 === this.Reveal.getRevealElement() || this.blur();
  }
}
class U {
  constructor(e2) {
    this.Reveal = e2;
  }
  render() {
    this.element = document.createElement("div"), this.element.className = "speaker-notes", this.element.setAttribute("data-prevent-swipe", ""), this.element.setAttribute("tabindex", "0"), this.Reveal.getRevealElement().appendChild(this.element);
  }
  configure(e2, t2) {
    e2.showNotes && this.element.setAttribute("data-layout", typeof e2.showNotes == "string" ? e2.showNotes : "inline");
  }
  update() {
    this.Reveal.getConfig().showNotes && this.element && this.Reveal.getCurrentSlide() && !this.Reveal.print.isPrintingPDF() && (this.element.innerHTML = this.getSlideNotes() || '<span class="notes-placeholder">No notes on this slide.</span>');
  }
  updateVisibility() {
    this.Reveal.getConfig().showNotes && this.hasNotes() && !this.Reveal.print.isPrintingPDF() ? this.Reveal.getRevealElement().classList.add("show-notes") : this.Reveal.getRevealElement().classList.remove("show-notes");
  }
  hasNotes() {
    return this.Reveal.getSlidesElement().querySelectorAll("[data-notes], aside.notes").length > 0;
  }
  isSpeakerNotesWindow() {
    return !!window.location.search.match(/receiver/gi);
  }
  getSlideNotes(e2 = this.Reveal.getCurrentSlide()) {
    if (e2.hasAttribute("data-notes"))
      return e2.getAttribute("data-notes");
    let t2 = e2.querySelector("aside.notes");
    return t2 ? t2.innerHTML : null;
  }
}
class O {
  constructor(e2, t2) {
    this.diameter = 100, this.diameter2 = this.diameter / 2, this.thickness = 6, this.playing = false, this.progress = 0, this.progressOffset = 1, this.container = e2, this.progressCheck = t2, this.canvas = document.createElement("canvas"), this.canvas.className = "playback", this.canvas.width = this.diameter, this.canvas.height = this.diameter, this.canvas.style.width = this.diameter2 + "px", this.canvas.style.height = this.diameter2 + "px", this.context = this.canvas.getContext("2d"), this.container.appendChild(this.canvas), this.render();
  }
  setPlaying(e2) {
    const t2 = this.playing;
    this.playing = e2, !t2 && this.playing ? this.animate() : this.render();
  }
  animate() {
    const e2 = this.progress;
    this.progress = this.progressCheck(), e2 > 0.8 && this.progress < 0.2 && (this.progressOffset = this.progress), this.render(), this.playing && requestAnimationFrame(this.animate.bind(this));
  }
  render() {
    let e2 = this.playing ? this.progress : 0, t2 = this.diameter2 - this.thickness, i2 = this.diameter2, a2 = this.diameter2, n2 = 28;
    this.progressOffset += 0.1 * (1 - this.progressOffset);
    const s2 = -Math.PI / 2 + e2 * (2 * Math.PI), o2 = -Math.PI / 2 + this.progressOffset * (2 * Math.PI);
    this.context.save(), this.context.clearRect(0, 0, this.diameter, this.diameter), this.context.beginPath(), this.context.arc(i2, a2, t2 + 4, 0, 2 * Math.PI, false), this.context.fillStyle = "rgba( 0, 0, 0, 0.4 )", this.context.fill(), this.context.beginPath(), this.context.arc(i2, a2, t2, 0, 2 * Math.PI, false), this.context.lineWidth = this.thickness, this.context.strokeStyle = "rgba( 255, 255, 255, 0.2 )", this.context.stroke(), this.playing && (this.context.beginPath(), this.context.arc(i2, a2, t2, o2, s2, false), this.context.lineWidth = this.thickness, this.context.strokeStyle = "#fff", this.context.stroke()), this.context.translate(i2 - 14, a2 - 14), this.playing ? (this.context.fillStyle = "#fff", this.context.fillRect(0, 0, 10, n2), this.context.fillRect(18, 0, 10, n2)) : (this.context.beginPath(), this.context.translate(4, 0), this.context.moveTo(0, 0), this.context.lineTo(24, 14), this.context.lineTo(0, n2), this.context.fillStyle = "#fff", this.context.fill()), this.context.restore();
  }
  on(e2, t2) {
    this.canvas.addEventListener(e2, t2, false);
  }
  off(e2, t2) {
    this.canvas.removeEventListener(e2, t2, false);
  }
  destroy() {
    this.playing = false, this.canvas.parentNode && this.container.removeChild(this.canvas);
  }
}
var W = {width: 960, height: 700, margin: 0.04, minScale: 0.2, maxScale: 2, controls: true, controlsTutorial: true, controlsLayout: "bottom-right", controlsBackArrows: "faded", progress: true, slideNumber: false, showSlideNumber: "all", hashOneBasedIndex: false, hash: false, respondToHashChanges: true, history: false, keyboard: true, keyboardCondition: null, disableLayout: false, overview: true, center: true, touch: true, loop: false, rtl: false, navigationMode: "default", shuffle: false, fragments: true, fragmentInURL: true, embedded: false, help: true, pause: true, showNotes: false, showHiddenSlides: false, autoPlayMedia: null, preloadIframes: null, autoAnimate: true, autoAnimateMatcher: null, autoAnimateEasing: "ease", autoAnimateDuration: 1, autoAnimateUnmatched: true, autoAnimateStyles: ["opacity", "color", "background-color", "padding", "font-size", "line-height", "letter-spacing", "border-width", "border-color", "border-radius", "outline", "outline-offset"], autoSlide: 0, autoSlideStoppable: true, autoSlideMethod: null, defaultTiming: null, mouseWheel: false, previewLinks: false, postMessage: true, postMessageEvents: false, focusBodyOnPageVisibilityChange: true, transition: "slide", transitionSpeed: "default", backgroundTransition: "fade", parallaxBackgroundImage: "", parallaxBackgroundSize: "", parallaxBackgroundRepeat: "", parallaxBackgroundPosition: "", parallaxBackgroundHorizontal: null, parallaxBackgroundVertical: null, pdfMaxPagesPerSlide: Number.POSITIVE_INFINITY, pdfSeparateFragments: true, pdfPageHeightOffset: -1, viewDistance: 3, mobileViewDistance: 2, display: "block", hideInactiveCursor: true, hideCursorTime: 5e3, dependencies: [], plugins: []};
function V(t2, r2) {
  arguments.length < 2 && (r2 = arguments[0], t2 = document.querySelector(".reveal"));
  const c2 = {};
  let g2, v2, m2, f2, y2, w2 = {}, R2 = false, E2 = {hasNavigatedHorizontally: false, hasNavigatedVertically: false}, L2 = [], z2 = 1, V2 = {layout: "", overview: ""}, $2 = {}, K2 = "idle", j = 0, X = 0, Y = -1, _ = false, J = new A(c2), Q = new S(c2), Z = new x(c2), G = new k(c2), ee = new C(c2), te = new P(c2), ie = new N(c2), ae = new M(c2), ne = new D(c2), se = new I(c2), oe = new T(c2), re = new H(c2), le = new B(c2), de = new F(c2), ce = new q(c2), he = new U(c2);
  function ue(e2) {
    return $2.wrapper = t2, $2.slides = t2.querySelector(".slides"), w2 = __spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, W), w2), r2), e2), h()), ge(), window.addEventListener("load", He, false), re.load(w2.plugins, w2.dependencies).then(ve), new Promise((e3) => c2.on("ready", e3));
  }
  function ge() {
    w2.embedded === true ? $2.viewport = l(t2, ".reveal-viewport") || t2 : ($2.viewport = document.body, document.documentElement.classList.add("reveal-full-page")), $2.viewport.classList.add("reveal-viewport");
  }
  function ve() {
    R2 = true, pe(), me(), Re(), we(), et(), Ae(), ae.readURL(), G.update(true), setTimeout(() => {
      $2.slides.classList.remove("no-transition"), $2.wrapper.classList.add("ready"), Ce({type: "ready", data: {indexh: g2, indexv: v2, currentSlide: f2}});
    }, 1), le.isPrintingPDF() && (Ee(), document.readyState === "complete" ? le.setupPDF() : window.addEventListener("load", () => {
      le.setupPDF();
    }));
  }
  function pe() {
    w2.showHiddenSlides || a($2.wrapper, 'section[data-visibility="hidden"]').forEach((e2) => {
      e2.parentNode.removeChild(e2);
    });
  }
  function me() {
    $2.slides.classList.add("no-transition"), p ? $2.wrapper.classList.add("no-hover") : $2.wrapper.classList.remove("no-hover"), G.render(), Q.render(), ne.render(), se.render(), he.render(), $2.pauseOverlay = d($2.wrapper, "div", "pause-overlay", w2.controls ? '<button class="resume-button">Resume presentation</button>' : null), $2.statusElement = fe(), $2.wrapper.setAttribute("role", "application");
  }
  function fe() {
    let e2 = $2.wrapper.querySelector(".aria-status");
    return e2 || (e2 = document.createElement("div"), e2.style.position = "absolute", e2.style.height = "1px", e2.style.width = "1px", e2.style.overflow = "hidden", e2.style.clip = "rect( 1px, 1px, 1px, 1px )", e2.classList.add("aria-status"), e2.setAttribute("aria-live", "polite"), e2.setAttribute("aria-atomic", "true"), $2.wrapper.appendChild(e2)), e2;
  }
  function be(e2) {
    $2.statusElement.textContent = e2;
  }
  function ye(e2) {
    let t3 = "";
    if (e2.nodeType === 3)
      t3 += e2.textContent;
    else if (e2.nodeType === 1) {
      let i2 = e2.getAttribute("aria-hidden"), a2 = window.getComputedStyle(e2).display === "none";
      i2 === "true" || a2 || Array.from(e2.childNodes).forEach((e3) => {
        t3 += ye(e3);
      });
    }
    return t3 = t3.trim(), t3 === "" ? "" : t3 + " ";
  }
  function we() {
    setInterval(() => {
      $2.wrapper.scrollTop === 0 && $2.wrapper.scrollLeft === 0 || ($2.wrapper.scrollTop = 0, $2.wrapper.scrollLeft = 0);
    }, 1e3);
  }
  function Re() {
    w2.postMessage && window.addEventListener("message", (t3) => {
      let i2 = t3.data;
      if (typeof i2 == "string" && i2.charAt(0) === "{" && i2.charAt(i2.length - 1) === "}" && (i2 = JSON.parse(i2), i2.method && typeof c2[i2.method] == "function"))
        if (e.test(i2.method) === false) {
          const e2 = c2[i2.method].apply(c2, i2.args);
          Pe("callback", {method: i2.method, result: e2});
        } else
          console.warn('reveal.js: "' + i2.method + '" is is blacklisted from the postMessage API');
    }, false);
  }
  function Ae(e2) {
    const t3 = __spreadValues({}, w2);
    if (typeof e2 == "object" && i(w2, e2), c2.isReady() === false)
      return;
    const a2 = $2.wrapper.querySelectorAll(".slides section").length;
    $2.wrapper.classList.remove(t3.transition), $2.wrapper.classList.add(w2.transition), $2.wrapper.setAttribute("data-transition-speed", w2.transitionSpeed), $2.wrapper.setAttribute("data-background-transition", w2.backgroundTransition), $2.viewport.style.setProperty("--slide-width", w2.width + "px"), $2.viewport.style.setProperty("--slide-height", w2.height + "px"), w2.shuffle && tt(), n($2.wrapper, "embedded", w2.embedded), n($2.wrapper, "rtl", w2.rtl), n($2.wrapper, "center", w2.center), w2.pause === false && je(), w2.previewLinks ? (Ne(), Me("[data-preview-link=false]")) : (Me(), Ne("[data-preview-link]:not([data-preview-link=false])")), Z.reset(), y2 && (y2.destroy(), y2 = null), a2 > 1 && w2.autoSlide && w2.autoSlideStoppable && (y2 = new O($2.wrapper, () => Math.min(Math.max((Date.now() - Y) / j, 0), 1)), y2.on("click", zt), _ = false), w2.navigationMode !== "default" ? $2.wrapper.setAttribute("data-navigation-mode", w2.navigationMode) : $2.wrapper.removeAttribute("data-navigation-mode"), he.configure(w2, t3), de.configure(w2, t3), oe.configure(w2, t3), ne.configure(w2, t3), se.configure(w2, t3), ie.configure(w2, t3), ee.configure(w2, t3), Q.configure(w2, t3), Ze();
  }
  function Se() {
    window.addEventListener("resize", Dt, false), w2.touch && ce.bind(), w2.keyboard && ie.bind(), w2.progress && se.bind(), w2.respondToHashChanges && ae.bind(), ne.bind(), de.bind(), $2.slides.addEventListener("transitionend", Mt, false), $2.pauseOverlay.addEventListener("click", je, false), w2.focusBodyOnPageVisibilityChange && document.addEventListener("visibilitychange", It, false);
  }
  function Ee() {
    ce.unbind(), de.unbind(), ie.unbind(), ne.unbind(), se.unbind(), ae.unbind(), window.removeEventListener("resize", Dt, false), $2.slides.removeEventListener("transitionend", Mt, false), $2.pauseOverlay.removeEventListener("click", je, false);
  }
  function ke(e2, i2, a2) {
    t2.addEventListener(e2, i2, a2);
  }
  function Le(e2, i2, a2) {
    t2.removeEventListener(e2, i2, a2);
  }
  function xe(e2) {
    typeof e2.layout == "string" && (V2.layout = e2.layout), typeof e2.overview == "string" && (V2.overview = e2.overview), V2.layout ? o($2.slides, V2.layout + " " + V2.overview) : o($2.slides, V2.overview);
  }
  function Ce({target: e2 = $2.wrapper, type: t3, data: a2, bubbles: n2 = true}) {
    let s2 = document.createEvent("HTMLEvents", 1, 2);
    s2.initEvent(t3, n2, true), i(s2, a2), e2.dispatchEvent(s2), e2 === $2.wrapper && Pe(t3);
  }
  function Pe(e2, t3) {
    if (w2.postMessageEvents && window.parent !== window.self) {
      let a2 = {namespace: "reveal", eventName: e2, state: bt()};
      i(a2, t3), window.parent.postMessage(JSON.stringify(a2), "*");
    }
  }
  function Ne(e2 = "a") {
    Array.from($2.wrapper.querySelectorAll(e2)).forEach((e3) => {
      /^(http|www)/gi.test(e3.getAttribute("href")) && e3.addEventListener("click", Tt, false);
    });
  }
  function Me(e2 = "a") {
    Array.from($2.wrapper.querySelectorAll(e2)).forEach((e3) => {
      /^(http|www)/gi.test(e3.getAttribute("href")) && e3.removeEventListener("click", Tt, false);
    });
  }
  function De(e2) {
    ze(), $2.overlay = document.createElement("div"), $2.overlay.classList.add("overlay"), $2.overlay.classList.add("overlay-preview"), $2.wrapper.appendChild($2.overlay), $2.overlay.innerHTML = `<header>
				<a class="close" href="#"><span class="icon"></span></a>
				<a class="external" href="${e2}" target="_blank"><span class="icon"></span></a>
			</header>
			<div class="spinner"></div>
			<div class="viewport">
				<iframe src="${e2}"></iframe>
				<small class="viewport-inner">
					<span class="x-frame-error">Unable to load iframe. This is likely due to the site's policy (x-frame-options).</span>
				</small>
			</div>`, $2.overlay.querySelector("iframe").addEventListener("load", (e3) => {
      $2.overlay.classList.add("loaded");
    }, false), $2.overlay.querySelector(".close").addEventListener("click", (e3) => {
      ze(), e3.preventDefault();
    }, false), $2.overlay.querySelector(".external").addEventListener("click", (e3) => {
      ze();
    }, false);
  }
  function Ie(e2) {
    typeof e2 == "boolean" ? e2 ? Te() : ze() : $2.overlay ? ze() : Te();
  }
  function Te() {
    if (w2.help) {
      ze(), $2.overlay = document.createElement("div"), $2.overlay.classList.add("overlay"), $2.overlay.classList.add("overlay-help"), $2.wrapper.appendChild($2.overlay);
      let e2 = '<p class="title">Keyboard Shortcuts</p><br/>', t3 = ie.getShortcuts(), i2 = ie.getBindings();
      e2 += "<table><th>KEY</th><th>ACTION</th>";
      for (let i3 in t3)
        e2 += `<tr><td>${i3}</td><td>${t3[i3]}</td></tr>`;
      for (let t4 in i2)
        i2[t4].key && i2[t4].description && (e2 += `<tr><td>${i2[t4].key}</td><td>${i2[t4].description}</td></tr>`);
      e2 += "</table>", $2.overlay.innerHTML = `
				<header>
					<a class="close" href="#"><span class="icon"></span></a>
				</header>
				<div class="viewport">
					<div class="viewport-inner">${e2}</div>
				</div>
			`, $2.overlay.querySelector(".close").addEventListener("click", (e3) => {
        ze(), e3.preventDefault();
      }, false);
    }
  }
  function ze() {
    return !!$2.overlay && ($2.overlay.parentNode.removeChild($2.overlay), $2.overlay = null, true);
  }
  function He() {
    if ($2.wrapper && !le.isPrintingPDF()) {
      if (!w2.disableLayout) {
        p && !w2.embedded && document.documentElement.style.setProperty("--vh", 0.01 * window.innerHeight + "px");
        const e2 = qe(), t3 = z2;
        Be(w2.width, w2.height), $2.slides.style.width = e2.width + "px", $2.slides.style.height = e2.height + "px", z2 = Math.min(e2.presentationWidth / e2.width, e2.presentationHeight / e2.height), z2 = Math.max(z2, w2.minScale), z2 = Math.min(z2, w2.maxScale), z2 === 1 ? ($2.slides.style.zoom = "", $2.slides.style.left = "", $2.slides.style.top = "", $2.slides.style.bottom = "", $2.slides.style.right = "", xe({layout: ""})) : z2 > 1 && b && window.devicePixelRatio < 2 ? ($2.slides.style.zoom = z2, $2.slides.style.left = "", $2.slides.style.top = "", $2.slides.style.bottom = "", $2.slides.style.right = "", xe({layout: ""})) : ($2.slides.style.zoom = "", $2.slides.style.left = "50%", $2.slides.style.top = "50%", $2.slides.style.bottom = "auto", $2.slides.style.right = "auto", xe({layout: "translate(-50%, -50%) scale(" + z2 + ")"}));
        const i2 = Array.from($2.wrapper.querySelectorAll(".slides section"));
        for (let t4 = 0, a2 = i2.length; t4 < a2; t4++) {
          const a3 = i2[t4];
          a3.style.display !== "none" && (w2.center || a3.classList.contains("center") ? a3.classList.contains("stack") ? a3.style.top = 0 : a3.style.top = Math.max((e2.height - a3.scrollHeight) / 2, 0) + "px" : a3.style.top = "");
        }
        t3 !== z2 && Ce({type: "resize", data: {oldScale: t3, scale: z2, size: e2}});
      }
      se.update(), G.updateParallax(), te.isActive() && te.update();
    }
  }
  function Be(e2, t3) {
    a($2.slides, "section > .stretch, section > .r-stretch").forEach((i2) => {
      let a2 = u(i2, t3);
      if (/(img|video)/gi.test(i2.nodeName)) {
        const t4 = i2.naturalWidth || i2.videoWidth, n2 = i2.naturalHeight || i2.videoHeight, s2 = Math.min(e2 / t4, a2 / n2);
        i2.style.width = t4 * s2 + "px", i2.style.height = n2 * s2 + "px";
      } else
        i2.style.width = e2 + "px", i2.style.height = a2 + "px";
    });
  }
  function qe(e2, t3) {
    const i2 = {width: w2.width, height: w2.height, presentationWidth: e2 || $2.wrapper.offsetWidth, presentationHeight: t3 || $2.wrapper.offsetHeight};
    return i2.presentationWidth -= i2.presentationWidth * w2.margin, i2.presentationHeight -= i2.presentationHeight * w2.margin, typeof i2.width == "string" && /%$/.test(i2.width) && (i2.width = parseInt(i2.width, 10) / 100 * i2.presentationWidth), typeof i2.height == "string" && /%$/.test(i2.height) && (i2.height = parseInt(i2.height, 10) / 100 * i2.presentationHeight), i2;
  }
  function Fe(e2, t3) {
    typeof e2 == "object" && typeof e2.setAttribute == "function" && e2.setAttribute("data-previous-indexv", t3 || 0);
  }
  function Ue(e2) {
    if (typeof e2 == "object" && typeof e2.setAttribute == "function" && e2.classList.contains("stack")) {
      const t3 = e2.hasAttribute("data-start-indexv") ? "data-start-indexv" : "data-previous-indexv";
      return parseInt(e2.getAttribute(t3) || 0, 10);
    }
    return 0;
  }
  function Oe(e2 = f2) {
    return e2 && e2.parentNode && !!e2.parentNode.nodeName.match(/section/i);
  }
  function We() {
    return !(!f2 || !Oe(f2)) && !f2.nextElementSibling;
  }
  function Ve() {
    return g2 === 0 && v2 === 0;
  }
  function $e() {
    return !!f2 && (!f2.nextElementSibling && (!Oe(f2) || !f2.parentNode.nextElementSibling));
  }
  function Ke() {
    if (w2.pause) {
      const e2 = $2.wrapper.classList.contains("paused");
      Rt(), $2.wrapper.classList.add("paused"), e2 === false && Ce({type: "paused"});
    }
  }
  function je() {
    const e2 = $2.wrapper.classList.contains("paused");
    $2.wrapper.classList.remove("paused"), wt(), e2 && Ce({type: "resumed"});
  }
  function Xe(e2) {
    typeof e2 == "boolean" ? e2 ? Ke() : je() : Ye() ? je() : Ke();
  }
  function Ye() {
    return $2.wrapper.classList.contains("paused");
  }
  function _e(e2) {
    typeof e2 == "boolean" ? e2 ? St() : At() : _ ? St() : At();
  }
  function Je() {
    return !(!j || _);
  }
  function Qe(e2, t3, i2, a2) {
    m2 = f2;
    const n2 = $2.wrapper.querySelectorAll(".slides>section");
    if (n2.length === 0)
      return;
    t3 !== void 0 || te.isActive() || (t3 = Ue(n2[e2])), m2 && m2.parentNode && m2.parentNode.classList.contains("stack") && Fe(m2.parentNode, v2);
    const s2 = L2.concat();
    L2.length = 0;
    let o2 = g2 || 0, r3 = v2 || 0;
    g2 = it(".slides>section", e2 === void 0 ? g2 : e2), v2 = it(".slides>section.present>section", t3 === void 0 ? v2 : t3);
    let l2 = g2 !== o2 || v2 !== r3;
    l2 || (m2 = null);
    let d2 = n2[g2], c3 = d2.querySelectorAll("section");
    f2 = c3[v2] || d2;
    let h2 = false;
    l2 && m2 && f2 && !te.isActive() && (m2.hasAttribute("data-auto-animate") && f2.hasAttribute("data-auto-animate") && m2.getAttribute("data-auto-animate-id") === f2.getAttribute("data-auto-animate-id") && !(g2 > o2 || v2 > r3 ? f2 : m2).hasAttribute("data-auto-animate-restart") && (h2 = true, $2.slides.classList.add("disable-slide-transitions")), K2 = "running"), at(), He(), te.isActive() && te.update(), i2 !== void 0 && ee.goto(i2), m2 && m2 !== f2 && (m2.classList.remove("present"), m2.setAttribute("aria-hidden", "true"), Ve() && setTimeout(() => {
      ht().forEach((e3) => {
        Fe(e3, 0);
      });
    }, 0));
    e:
      for (let e3 = 0, t4 = L2.length; e3 < t4; e3++) {
        for (let t5 = 0; t5 < s2.length; t5++)
          if (s2[t5] === L2[e3]) {
            s2.splice(t5, 1);
            continue e;
          }
        $2.viewport.classList.add(L2[e3]), Ce({type: L2[e3]});
      }
    for (; s2.length; )
      $2.viewport.classList.remove(s2.pop());
    l2 && Ce({type: "slidechanged", data: {indexh: g2, indexv: v2, previousSlide: m2, currentSlide: f2, origin: a2}}), !l2 && m2 || (J.stopEmbeddedContent(m2), J.startEmbeddedContent(f2)), requestAnimationFrame(() => {
      be(ye(f2));
    }), se.update(), ne.update(), he.update(), G.update(), G.updateParallax(), Q.update(), ee.update(), ae.writeURL(), wt(), h2 && (setTimeout(() => {
      $2.slides.classList.remove("disable-slide-transitions");
    }, 0), w2.autoAnimate && Z.run(m2, f2));
  }
  function Ze() {
    Ee(), Se(), He(), j = w2.autoSlide, wt(), G.create(), ae.writeURL(), ee.sortAll(), ne.update(), se.update(), at(), he.update(), he.updateVisibility(), G.update(true), Q.update(), J.formatEmbeddedContent(), w2.autoPlayMedia === false ? J.stopEmbeddedContent(f2, {unloadIframes: false}) : J.startEmbeddedContent(f2), te.isActive() && te.layout();
  }
  function Ge(e2 = f2) {
    G.sync(e2), ee.sync(e2), J.load(e2), G.update(), he.update();
  }
  function et() {
    dt().forEach((e2) => {
      a(e2, "section").forEach((e3, t3) => {
        t3 > 0 && (e3.classList.remove("present"), e3.classList.remove("past"), e3.classList.add("future"), e3.setAttribute("aria-hidden", "true"));
      });
    });
  }
  function tt(e2 = dt()) {
    e2.forEach((t3, i2) => {
      let a2 = e2[Math.floor(Math.random() * e2.length)];
      a2.parentNode === t3.parentNode && t3.parentNode.insertBefore(t3, a2);
      let n2 = t3.querySelectorAll("section");
      n2.length && tt(n2);
    });
  }
  function it(e2, t3) {
    let i2 = a($2.wrapper, e2), n2 = i2.length, s2 = le.isPrintingPDF();
    if (n2) {
      w2.loop && (t3 %= n2) < 0 && (t3 = n2 + t3), t3 = Math.max(Math.min(t3, n2 - 1), 0);
      for (let e4 = 0; e4 < n2; e4++) {
        let n3 = i2[e4], o3 = w2.rtl && !Oe(n3);
        n3.classList.remove("past"), n3.classList.remove("present"), n3.classList.remove("future"), n3.setAttribute("hidden", ""), n3.setAttribute("aria-hidden", "true"), n3.querySelector("section") && n3.classList.add("stack"), s2 ? n3.classList.add("present") : e4 < t3 ? (n3.classList.add(o3 ? "future" : "past"), w2.fragments && a(n3, ".fragment").forEach((e5) => {
          e5.classList.add("visible"), e5.classList.remove("current-fragment");
        })) : e4 > t3 && (n3.classList.add(o3 ? "past" : "future"), w2.fragments && a(n3, ".fragment.visible").forEach((e5) => {
          e5.classList.remove("visible", "current-fragment");
        }));
      }
      let e3 = i2[t3], o2 = e3.classList.contains("present");
      e3.classList.add("present"), e3.removeAttribute("hidden"), e3.removeAttribute("aria-hidden"), o2 || Ce({target: e3, type: "visible", bubbles: false});
      let r3 = e3.getAttribute("data-state");
      r3 && (L2 = L2.concat(r3.split(" ")));
    } else
      t3 = 0;
    return t3;
  }
  function at() {
    let e2, t3, i2 = dt(), n2 = i2.length;
    if (n2 && g2 !== void 0) {
      let s2 = te.isActive() ? 10 : w2.viewDistance;
      p && (s2 = te.isActive() ? 6 : w2.mobileViewDistance), le.isPrintingPDF() && (s2 = Number.MAX_VALUE);
      for (let o2 = 0; o2 < n2; o2++) {
        let r3 = i2[o2], l2 = a(r3, "section"), d2 = l2.length;
        if (e2 = Math.abs((g2 || 0) - o2) || 0, w2.loop && (e2 = Math.abs(((g2 || 0) - o2) % (n2 - s2)) || 0), e2 < s2 ? J.load(r3) : J.unload(r3), d2) {
          let i3 = Ue(r3);
          for (let a2 = 0; a2 < d2; a2++) {
            let n3 = l2[a2];
            t3 = o2 === (g2 || 0) ? Math.abs((v2 || 0) - a2) : Math.abs(a2 - i3), e2 + t3 < s2 ? J.load(n3) : J.unload(n3);
          }
        }
      }
      gt() ? $2.wrapper.classList.add("has-vertical-slides") : $2.wrapper.classList.remove("has-vertical-slides"), ut() ? $2.wrapper.classList.add("has-horizontal-slides") : $2.wrapper.classList.remove("has-horizontal-slides");
    }
  }
  function nt({includeFragments: e2 = false} = {}) {
    let t3 = $2.wrapper.querySelectorAll(".slides>section"), i2 = $2.wrapper.querySelectorAll(".slides>section.present>section"), a2 = {left: g2 > 0, right: g2 < t3.length - 1, up: v2 > 0, down: v2 < i2.length - 1};
    if (w2.loop && (t3.length > 1 && (a2.left = true, a2.right = true), i2.length > 1 && (a2.up = true, a2.down = true)), t3.length > 1 && w2.navigationMode === "linear" && (a2.right = a2.right || a2.down, a2.left = a2.left || a2.up), e2 === true) {
      let e3 = ee.availableRoutes();
      a2.left = a2.left || e3.prev, a2.up = a2.up || e3.prev, a2.down = a2.down || e3.next, a2.right = a2.right || e3.next;
    }
    if (w2.rtl) {
      let e3 = a2.left;
      a2.left = a2.right, a2.right = e3;
    }
    return a2;
  }
  function st(e2 = f2) {
    let t3 = dt(), i2 = 0;
    e:
      for (let a2 = 0; a2 < t3.length; a2++) {
        let n2 = t3[a2], s2 = n2.querySelectorAll("section");
        for (let t4 = 0; t4 < s2.length; t4++) {
          if (s2[t4] === e2)
            break e;
          s2[t4].dataset.visibility !== "uncounted" && i2++;
        }
        if (n2 === e2)
          break;
        n2.classList.contains("stack") === false && n2.dataset.visibility !== "uncounted" && i2++;
      }
    return i2;
  }
  function ot() {
    let e2 = pt(), t3 = st();
    if (f2) {
      let e3 = f2.querySelectorAll(".fragment");
      if (e3.length > 0) {
        let i2 = 0.9;
        t3 += f2.querySelectorAll(".fragment.visible").length / e3.length * i2;
      }
    }
    return Math.min(t3 / (e2 - 1), 1);
  }
  function rt(e2) {
    let t3, i2 = g2, n2 = v2;
    if (e2) {
      let t4 = Oe(e2), s2 = t4 ? e2.parentNode : e2, o2 = dt();
      i2 = Math.max(o2.indexOf(s2), 0), n2 = void 0, t4 && (n2 = Math.max(a(e2.parentNode, "section").indexOf(e2), 0));
    }
    if (!e2 && f2) {
      if (f2.querySelectorAll(".fragment").length > 0) {
        let e3 = f2.querySelector(".current-fragment");
        t3 = e3 && e3.hasAttribute("data-fragment-index") ? parseInt(e3.getAttribute("data-fragment-index"), 10) : f2.querySelectorAll(".fragment.visible").length - 1;
      }
    }
    return {h: i2, v: n2, f: t3};
  }
  function lt() {
    return a($2.wrapper, '.slides section:not(.stack):not([data-visibility="uncounted"])');
  }
  function dt() {
    return a($2.wrapper, ".slides>section");
  }
  function ct() {
    return a($2.wrapper, ".slides>section>section");
  }
  function ht() {
    return a($2.wrapper, ".slides>section.stack");
  }
  function ut() {
    return dt().length > 1;
  }
  function gt() {
    return ct().length > 1;
  }
  function vt() {
    return lt().map((e2) => {
      let t3 = {};
      for (let i2 = 0; i2 < e2.attributes.length; i2++) {
        let a2 = e2.attributes[i2];
        t3[a2.name] = a2.value;
      }
      return t3;
    });
  }
  function pt() {
    return lt().length;
  }
  function mt(e2, t3) {
    let i2 = dt()[e2], a2 = i2 && i2.querySelectorAll("section");
    return a2 && a2.length && typeof t3 == "number" ? a2 ? a2[t3] : void 0 : i2;
  }
  function ft(e2, t3) {
    let i2 = typeof e2 == "number" ? mt(e2, t3) : e2;
    if (i2)
      return i2.slideBackgroundElement;
  }
  function bt() {
    let e2 = rt();
    return {indexh: e2.h, indexv: e2.v, indexf: e2.f, paused: Ye(), overview: te.isActive()};
  }
  function yt(e2) {
    if (typeof e2 == "object") {
      Qe(s(e2.indexh), s(e2.indexv), s(e2.indexf));
      let t3 = s(e2.paused), i2 = s(e2.overview);
      typeof t3 == "boolean" && t3 !== Ye() && Xe(t3), typeof i2 == "boolean" && i2 !== te.isActive() && te.toggle(i2);
    }
  }
  function wt() {
    if (Rt(), f2 && w2.autoSlide !== false) {
      let e2 = f2.querySelector(".current-fragment");
      e2 || (e2 = f2.querySelector(".fragment"));
      let t3 = e2 ? e2.getAttribute("data-autoslide") : null, i2 = f2.parentNode ? f2.parentNode.getAttribute("data-autoslide") : null, n2 = f2.getAttribute("data-autoslide");
      t3 ? j = parseInt(t3, 10) : n2 ? j = parseInt(n2, 10) : i2 ? j = parseInt(i2, 10) : (j = w2.autoSlide, f2.querySelectorAll(".fragment").length === 0 && a(f2, "video, audio").forEach((e3) => {
        e3.hasAttribute("data-autoplay") && j && 1e3 * e3.duration / e3.playbackRate > j && (j = 1e3 * e3.duration / e3.playbackRate + 1e3);
      })), !j || _ || Ye() || te.isActive() || $e() && !ee.availableRoutes().next && w2.loop !== true || (X = setTimeout(() => {
        typeof w2.autoSlideMethod == "function" ? w2.autoSlideMethod() : Pt(), wt();
      }, j), Y = Date.now()), y2 && y2.setPlaying(X !== -1);
    }
  }
  function Rt() {
    clearTimeout(X), X = -1;
  }
  function At() {
    j && !_ && (_ = true, Ce({type: "autoslidepaused"}), clearTimeout(X), y2 && y2.setPlaying(false));
  }
  function St() {
    j && _ && (_ = false, Ce({type: "autoslideresumed"}), wt());
  }
  function Et() {
    E2.hasNavigatedHorizontally = true, w2.rtl ? (te.isActive() || ee.next() === false) && nt().left && Qe(g2 + 1, w2.navigationMode === "grid" ? v2 : void 0) : (te.isActive() || ee.prev() === false) && nt().left && Qe(g2 - 1, w2.navigationMode === "grid" ? v2 : void 0);
  }
  function kt() {
    E2.hasNavigatedHorizontally = true, w2.rtl ? (te.isActive() || ee.prev() === false) && nt().right && Qe(g2 - 1, w2.navigationMode === "grid" ? v2 : void 0) : (te.isActive() || ee.next() === false) && nt().right && Qe(g2 + 1, w2.navigationMode === "grid" ? v2 : void 0);
  }
  function Lt() {
    (te.isActive() || ee.prev() === false) && nt().up && Qe(g2, v2 - 1);
  }
  function xt() {
    E2.hasNavigatedVertically = true, (te.isActive() || ee.next() === false) && nt().down && Qe(g2, v2 + 1);
  }
  function Ct() {
    if (ee.prev() === false)
      if (nt().up)
        Lt();
      else {
        let e2;
        if (e2 = w2.rtl ? a($2.wrapper, ".slides>section.future").pop() : a($2.wrapper, ".slides>section.past").pop(), e2) {
          let t3 = e2.querySelectorAll("section").length - 1 || void 0;
          Qe(g2 - 1, t3);
        }
      }
  }
  function Pt() {
    if (E2.hasNavigatedHorizontally = true, E2.hasNavigatedVertically = true, ee.next() === false) {
      let e2 = nt();
      e2.down && e2.right && w2.loop && We() && (e2.down = false), e2.down ? xt() : w2.rtl ? Et() : kt();
    }
  }
  function Nt(e2) {
    w2.autoSlideStoppable && At();
  }
  function Mt(e2) {
    K2 === "running" && /section/gi.test(e2.target.nodeName) && (K2 = "idle", Ce({type: "slidetransitionend", data: {indexh: g2, indexv: v2, previousSlide: m2, currentSlide: f2}}));
  }
  function Dt(e2) {
    He();
  }
  function It(e2) {
    document.hidden === false && document.activeElement !== document.body && (typeof document.activeElement.blur == "function" && document.activeElement.blur(), document.body.focus());
  }
  function Tt(e2) {
    if (e2.currentTarget && e2.currentTarget.hasAttribute("href")) {
      let t3 = e2.currentTarget.getAttribute("href");
      t3 && (De(t3), e2.preventDefault());
    }
  }
  function zt(e2) {
    $e() && w2.loop === false ? (Qe(0, 0), St()) : _ ? St() : At();
  }
  const Ht = {VERSION: "4.1.1", initialize: ue, configure: Ae, sync: Ze, syncSlide: Ge, syncFragments: ee.sync.bind(ee), slide: Qe, left: Et, right: kt, up: Lt, down: xt, prev: Ct, next: Pt, navigateLeft: Et, navigateRight: kt, navigateUp: Lt, navigateDown: xt, navigatePrev: Ct, navigateNext: Pt, navigateFragment: ee.goto.bind(ee), prevFragment: ee.prev.bind(ee), nextFragment: ee.next.bind(ee), on: ke, off: Le, addEventListener: ke, removeEventListener: Le, layout: He, shuffle: tt, availableRoutes: nt, availableFragments: ee.availableRoutes.bind(ee), toggleHelp: Ie, toggleOverview: te.toggle.bind(te), togglePause: Xe, toggleAutoSlide: _e, isFirstSlide: Ve, isLastSlide: $e, isLastVerticalSlide: We, isVerticalSlide: Oe, isPaused: Ye, isAutoSliding: Je, isSpeakerNotes: he.isSpeakerNotesWindow.bind(he), isOverview: te.isActive.bind(te), isFocused: de.isFocused.bind(de), isPrintingPDF: le.isPrintingPDF.bind(le), isReady: () => R2, loadSlide: J.load.bind(J), unloadSlide: J.unload.bind(J), showPreview: De, hidePreview: ze, addEventListeners: Se, removeEventListeners: Ee, dispatchEvent: Ce, getState: bt, setState: yt, getProgress: ot, getIndices: rt, getSlidesAttributes: vt, getSlidePastCount: st, getTotalSlides: pt, getSlide: mt, getPreviousSlide: () => m2, getCurrentSlide: () => f2, getSlideBackground: ft, getSlideNotes: he.getSlideNotes.bind(he), getSlides: lt, getHorizontalSlides: dt, getVerticalSlides: ct, hasHorizontalSlides: ut, hasVerticalSlides: gt, hasNavigatedHorizontally: () => E2.hasNavigatedHorizontally, hasNavigatedVertically: () => E2.hasNavigatedVertically, addKeyBinding: ie.addKeyBinding.bind(ie), removeKeyBinding: ie.removeKeyBinding.bind(ie), triggerKey: ie.triggerKey.bind(ie), registerKeyboardShortcut: ie.registerKeyboardShortcut.bind(ie), getComputedSlideSize: qe, getScale: () => z2, getConfig: () => w2, getQueryHash: h, getRevealElement: () => t2, getSlidesElement: () => $2.slides, getViewportElement: () => $2.viewport, getBackgroundsElement: () => G.element, registerPlugin: re.registerPlugin.bind(re), hasPlugin: re.hasPlugin.bind(re), getPlugin: re.getPlugin.bind(re), getPlugins: re.getRegisteredPlugins.bind(re)};
  return i(c2, __spreadProps(__spreadValues({}, Ht), {announceStatus: be, getStatusText: ye, print: le, focus: de, progress: se, controls: ne, location: ae, overview: te, fragments: ee, slideContent: J, slideNumber: Q, onUserInput: Nt, closeOverlay: ze, updateSlidesVisibility: at, layoutSlideContents: Be, transformSlides: xe, cueAutoSlide: wt, cancelAutoSlide: Rt})), Ht;
}
let $ = V, K = [];
$.initialize = (e2) => (Object.assign($, new V(document.querySelector(".reveal"), e2)), K.map((e3) => e3($)), $.initialize()), ["configure", "on", "off", "addEventListener", "removeEventListener", "registerPlugin"].forEach((e2) => {
  $[e2] = (...t2) => {
    K.push((i2) => i2[e2].call(null, ...t2));
  };
}), $.isReady = () => false, $.VERSION = "4.1.1";
var App_vue_vue_type_style_index_0_scoped_true_lang = "\n#top[data-v-5b3776b2] {\n  font-family: Avenir, Helvetica, Arial, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-align: center;\n  color: #50312c;\n  margin-top: 30px;\n  border: 5;\n  border-radius: 10px;\n  border-color: red;\n  width: 400px; height: 300px;\n  position: absolute;\n\n  display: block;\n  background-color: white;\n}\n*[data-v-5b3776b2] {\n    box-sizing: content-box;\n}\nimg[data-v-5b3776b2] {\n    max-width: none;\n        display: inline;\n}\n";
const _sfc_main = {
  setup() {
    const root = ref(null);
    const reveal2 = ref(null);
    var deck = ref(null);
    onMounted(() => {
      deck.value = new $(reveal2.value, {
        width: 400,
        height: 300,
        controls: true,
        controlsTutorial: false,
        progress: true,
        hash: false,
        respondToHashChanges: false,
        history: false,
        keyboard: false,
        keyboardConditional: "focused",
        overview: false,
        fragments: false,
        fragmentInURL: false,
        embedded: true,
        help: false,
        pause: false,
        showNotes: false,
        previewLinks: false,
        postMessage: false,
        focusBodyOnPageVisibilityChange: false,
        transition: "none",
        backgroundTransition: "none",
        viewDistance: 2,
        mobileViewDistance: 1
      });
      deck.value.initialize();
    });
    return {
      root,
      reveal: reveal2,
      deck
    };
  }
};
const _withId = /* @__PURE__ */ withScopeId();
pushScopeId("data-v-5b3776b2");
const _hoisted_1 = {
  ref: "root",
  id: "top"
};
const _hoisted_2 = {
  ref: "reveal",
  class: "reveal"
};
const _hoisted_3 = /* @__PURE__ */ createVNode("div", {class: "slides"}, [
  /* @__PURE__ */ createVNode("section", null, "Single Horizontal Slide 1"),
  /* @__PURE__ */ createVNode("section", null, "Single Horizontal Slide 2"),
  /* @__PURE__ */ createVNode("section", null, "Single Horizontal Slide 3")
], -1);
popScopeId();
const _sfc_render = /* @__PURE__ */ _withId((_ctx, _cache, $props, $setup, $data, $options) => {
  return openBlock(), createBlock("div", _hoisted_1, [
    createVNode("div", _hoisted_2, [
      _hoisted_3
    ], 512)
  ], 512);
});
_sfc_main.render = _sfc_render;
_sfc_main.__scopeId = "data-v-5b3776b2";
class Store {
  constructor(app2) {
    this._state = reactive({
      slide: 0
    });
    this.app = app2;
    this.state = readonly(this._state);
  }
  next() {
    if (this._state.slide == 2)
      return;
    if (this.app.takeOwnership()) {
      this._state.slide++;
      this.app.setSharedData(this.state);
    }
  }
  prev() {
    if (this._state.slide == 0)
      return;
    if (this.app.takeOwnership()) {
      this._state.slide--;
      this.app.setSharedData(this.state);
    }
  }
  updateSharedData(dataObject) {
    this._state.slide = dataObject.slide;
  }
}
var reveal = '/*!\n* reveal.js 4.1.1\n* https://revealjs.com\n* MIT licensed\n*\n* Copyright (C) 2020 Hakim El Hattab, https://hakim.se\n*/\n.reveal .r-stretch,.reveal .stretch{max-width:none;max-height:none}.reveal pre.r-stretch code,.reveal pre.stretch code{height:100%;max-height:100%;box-sizing:border-box}.reveal .r-fit-text{display:inline-block;white-space:nowrap}.reveal .r-stack{display:grid}.reveal .r-stack>*{grid-area:1/1;margin:auto}.reveal .r-hstack,.reveal .r-vstack{display:flex}.reveal .r-hstack img,.reveal .r-hstack video,.reveal .r-vstack img,.reveal .r-vstack video{min-width:0;min-height:0;-o-object-fit:contain;object-fit:contain}.reveal .r-vstack{flex-direction:column;align-items:center;justify-content:center}.reveal .r-hstack{flex-direction:row;align-items:center;justify-content:center}.reveal .items-stretch{align-items:stretch}.reveal .items-start{align-items:flex-start}.reveal .items-center{align-items:center}.reveal .items-end{align-items:flex-end}.reveal .justify-between{justify-content:space-between}.reveal .justify-around{justify-content:space-around}.reveal .justify-start{justify-content:flex-start}.reveal .justify-center{justify-content:center}.reveal .justify-end{justify-content:flex-end}html.reveal-full-page{width:100%;height:100%;height:100vh;height:calc(var(--vh,1vh) * 100);overflow:hidden}.reveal-viewport{height:100%;overflow:hidden;position:relative;line-height:1;margin:0;background-color:#fff;color:#000}.reveal .slides section .fragment{opacity:0;visibility:hidden;transition:all .2s ease;will-change:opacity}.reveal .slides section .fragment.visible{opacity:1;visibility:inherit}.reveal .slides section .fragment.disabled{transition:none}.reveal .slides section .fragment.grow{opacity:1;visibility:inherit}.reveal .slides section .fragment.grow.visible{transform:scale(1.3)}.reveal .slides section .fragment.shrink{opacity:1;visibility:inherit}.reveal .slides section .fragment.shrink.visible{transform:scale(.7)}.reveal .slides section .fragment.zoom-in{transform:scale(.1)}.reveal .slides section .fragment.zoom-in.visible{transform:none}.reveal .slides section .fragment.fade-out{opacity:1;visibility:inherit}.reveal .slides section .fragment.fade-out.visible{opacity:0;visibility:hidden}.reveal .slides section .fragment.semi-fade-out{opacity:1;visibility:inherit}.reveal .slides section .fragment.semi-fade-out.visible{opacity:.5;visibility:inherit}.reveal .slides section .fragment.strike{opacity:1;visibility:inherit}.reveal .slides section .fragment.strike.visible{text-decoration:line-through}.reveal .slides section .fragment.fade-up{transform:translate(0,40px)}.reveal .slides section .fragment.fade-up.visible{transform:translate(0,0)}.reveal .slides section .fragment.fade-down{transform:translate(0,-40px)}.reveal .slides section .fragment.fade-down.visible{transform:translate(0,0)}.reveal .slides section .fragment.fade-right{transform:translate(-40px,0)}.reveal .slides section .fragment.fade-right.visible{transform:translate(0,0)}.reveal .slides section .fragment.fade-left{transform:translate(40px,0)}.reveal .slides section .fragment.fade-left.visible{transform:translate(0,0)}.reveal .slides section .fragment.current-visible,.reveal .slides section .fragment.fade-in-then-out{opacity:0;visibility:hidden}.reveal .slides section .fragment.current-visible.current-fragment,.reveal .slides section .fragment.fade-in-then-out.current-fragment{opacity:1;visibility:inherit}.reveal .slides section .fragment.fade-in-then-semi-out{opacity:0;visibility:hidden}.reveal .slides section .fragment.fade-in-then-semi-out.visible{opacity:.5;visibility:inherit}.reveal .slides section .fragment.fade-in-then-semi-out.current-fragment{opacity:1;visibility:inherit}.reveal .slides section .fragment.highlight-blue,.reveal .slides section .fragment.highlight-current-blue,.reveal .slides section .fragment.highlight-current-green,.reveal .slides section .fragment.highlight-current-red,.reveal .slides section .fragment.highlight-green,.reveal .slides section .fragment.highlight-red{opacity:1;visibility:inherit}.reveal .slides section .fragment.highlight-red.visible{color:#ff2c2d}.reveal .slides section .fragment.highlight-green.visible{color:#17ff2e}.reveal .slides section .fragment.highlight-blue.visible{color:#1b91ff}.reveal .slides section .fragment.highlight-current-red.current-fragment{color:#ff2c2d}.reveal .slides section .fragment.highlight-current-green.current-fragment{color:#17ff2e}.reveal .slides section .fragment.highlight-current-blue.current-fragment{color:#1b91ff}.reveal:after{content:"";font-style:italic}.reveal iframe{z-index:1}.reveal a{position:relative}@keyframes bounce-right{0%,10%,25%,40%,50%{transform:translateX(0)}20%{transform:translateX(10px)}30%{transform:translateX(-5px)}}@keyframes bounce-left{0%,10%,25%,40%,50%{transform:translateX(0)}20%{transform:translateX(-10px)}30%{transform:translateX(5px)}}@keyframes bounce-down{0%,10%,25%,40%,50%{transform:translateY(0)}20%{transform:translateY(10px)}30%{transform:translateY(-5px)}}.reveal .controls{display:none;position:absolute;top:auto;bottom:12px;right:12px;left:auto;z-index:11;color:#000;pointer-events:none;font-size:10px}.reveal .controls button{position:absolute;padding:0;background-color:transparent;border:0;outline:0;cursor:pointer;color:currentColor;transform:scale(.9999);transition:color .2s ease,opacity .2s ease,transform .2s ease;z-index:2;pointer-events:auto;font-size:inherit;visibility:hidden;opacity:0;-webkit-appearance:none;-webkit-tap-highlight-color:transparent}.reveal .controls .controls-arrow:after,.reveal .controls .controls-arrow:before{content:"";position:absolute;top:0;left:0;width:2.6em;height:.5em;border-radius:.25em;background-color:currentColor;transition:all .15s ease,background-color .8s ease;transform-origin:.2em 50%;will-change:transform}.reveal .controls .controls-arrow{position:relative;width:3.6em;height:3.6em}.reveal .controls .controls-arrow:before{transform:translateX(.5em) translateY(1.55em) rotate(45deg)}.reveal .controls .controls-arrow:after{transform:translateX(.5em) translateY(1.55em) rotate(-45deg)}.reveal .controls .controls-arrow:hover:before{transform:translateX(.5em) translateY(1.55em) rotate(40deg)}.reveal .controls .controls-arrow:hover:after{transform:translateX(.5em) translateY(1.55em) rotate(-40deg)}.reveal .controls .controls-arrow:active:before{transform:translateX(.5em) translateY(1.55em) rotate(36deg)}.reveal .controls .controls-arrow:active:after{transform:translateX(.5em) translateY(1.55em) rotate(-36deg)}.reveal .controls .navigate-left{right:6.4em;bottom:3.2em;transform:translateX(-10px)}.reveal .controls .navigate-left.highlight{animation:bounce-left 2s 50 both ease-out}.reveal .controls .navigate-right{right:0;bottom:3.2em;transform:translateX(10px)}.reveal .controls .navigate-right .controls-arrow{transform:rotate(180deg)}.reveal .controls .navigate-right.highlight{animation:bounce-right 2s 50 both ease-out}.reveal .controls .navigate-up{right:3.2em;bottom:6.4em;transform:translateY(-10px)}.reveal .controls .navigate-up .controls-arrow{transform:rotate(90deg)}.reveal .controls .navigate-down{right:3.2em;bottom:-1.4em;padding-bottom:1.4em;transform:translateY(10px)}.reveal .controls .navigate-down .controls-arrow{transform:rotate(-90deg)}.reveal .controls .navigate-down.highlight{animation:bounce-down 2s 50 both ease-out}.reveal .controls[data-controls-back-arrows=faded] .navigate-up.enabled{opacity:.3}.reveal .controls[data-controls-back-arrows=faded] .navigate-up.enabled:hover{opacity:1}.reveal .controls[data-controls-back-arrows=hidden] .navigate-up.enabled{opacity:0;visibility:hidden}.reveal .controls .enabled{visibility:visible;opacity:.9;cursor:pointer;transform:none}.reveal .controls .enabled.fragmented{opacity:.5}.reveal .controls .enabled.fragmented:hover,.reveal .controls .enabled:hover{opacity:1}.reveal:not(.rtl) .controls[data-controls-back-arrows=faded] .navigate-left.enabled{opacity:.3}.reveal:not(.rtl) .controls[data-controls-back-arrows=faded] .navigate-left.enabled:hover{opacity:1}.reveal:not(.rtl) .controls[data-controls-back-arrows=hidden] .navigate-left.enabled{opacity:0;visibility:hidden}.reveal.rtl .controls[data-controls-back-arrows=faded] .navigate-right.enabled{opacity:.3}.reveal.rtl .controls[data-controls-back-arrows=faded] .navigate-right.enabled:hover{opacity:1}.reveal.rtl .controls[data-controls-back-arrows=hidden] .navigate-right.enabled{opacity:0;visibility:hidden}.reveal[data-navigation-mode=linear].has-horizontal-slides .navigate-down,.reveal[data-navigation-mode=linear].has-horizontal-slides .navigate-up{display:none}.reveal:not(.has-vertical-slides) .controls .navigate-left,.reveal[data-navigation-mode=linear].has-horizontal-slides .navigate-left{bottom:1.4em;right:5.5em}.reveal:not(.has-vertical-slides) .controls .navigate-right,.reveal[data-navigation-mode=linear].has-horizontal-slides .navigate-right{bottom:1.4em;right:.5em}.reveal:not(.has-horizontal-slides) .controls .navigate-up{right:1.4em;bottom:5em}.reveal:not(.has-horizontal-slides) .controls .navigate-down{right:1.4em;bottom:.5em}.reveal.has-dark-background .controls{color:#fff}.reveal.has-light-background .controls{color:#000}.reveal.no-hover .controls .controls-arrow:active:before,.reveal.no-hover .controls .controls-arrow:hover:before{transform:translateX(.5em) translateY(1.55em) rotate(45deg)}.reveal.no-hover .controls .controls-arrow:active:after,.reveal.no-hover .controls .controls-arrow:hover:after{transform:translateX(.5em) translateY(1.55em) rotate(-45deg)}@media screen and (min-width:500px){.reveal .controls[data-controls-layout=edges]{top:0;right:0;bottom:0;left:0}.reveal .controls[data-controls-layout=edges] .navigate-down,.reveal .controls[data-controls-layout=edges] .navigate-left,.reveal .controls[data-controls-layout=edges] .navigate-right,.reveal .controls[data-controls-layout=edges] .navigate-up{bottom:auto;right:auto}.reveal .controls[data-controls-layout=edges] .navigate-left{top:50%;left:.8em;margin-top:-1.8em}.reveal .controls[data-controls-layout=edges] .navigate-right{top:50%;right:.8em;margin-top:-1.8em}.reveal .controls[data-controls-layout=edges] .navigate-up{top:.8em;left:50%;margin-left:-1.8em}.reveal .controls[data-controls-layout=edges] .navigate-down{bottom:-.3em;left:50%;margin-left:-1.8em}}.reveal .progress{position:absolute;display:none;height:3px;width:100%;bottom:0;left:0;z-index:10;background-color:rgba(0,0,0,.2);color:#fff}.reveal .progress:after{content:"";display:block;position:absolute;height:10px;width:100%;top:-10px}.reveal .progress span{display:block;height:100%;width:100%;background-color:currentColor;transition:transform .8s cubic-bezier(.26,.86,.44,.985);transform-origin:0 0;transform:scaleX(0)}.reveal .slide-number{position:absolute;display:block;right:8px;bottom:8px;z-index:31;font-family:Helvetica,sans-serif;font-size:12px;line-height:1;color:#fff;background-color:rgba(0,0,0,.4);padding:5px}.reveal .slide-number a{color:currentColor}.reveal .slide-number-delimiter{margin:0 3px}.reveal{position:relative;width:100%;height:100%;overflow:hidden;touch-action:pinch-zoom}.reveal.embedded{touch-action:pan-y}.reveal .slides{position:absolute;width:100%;height:100%;top:0;right:0;bottom:0;left:0;margin:auto;pointer-events:none;overflow:visible;z-index:1;text-align:center;perspective:600px;perspective-origin:50% 40%}.reveal .slides>section{perspective:600px}.reveal .slides>section,.reveal .slides>section>section{display:none;position:absolute;width:100%;pointer-events:auto;z-index:10;transform-style:flat;transition:transform-origin .8s cubic-bezier(.26,.86,.44,.985),transform .8s cubic-bezier(.26,.86,.44,.985),visibility .8s cubic-bezier(.26,.86,.44,.985),opacity .8s cubic-bezier(.26,.86,.44,.985)}.reveal[data-transition-speed=fast] .slides section{transition-duration:.4s}.reveal[data-transition-speed=slow] .slides section{transition-duration:1.2s}.reveal .slides section[data-transition-speed=fast]{transition-duration:.4s}.reveal .slides section[data-transition-speed=slow]{transition-duration:1.2s}.reveal .slides>section.stack{padding-top:0;padding-bottom:0;pointer-events:none;height:100%}.reveal .slides>section.present,.reveal .slides>section>section.present{display:block;z-index:11;opacity:1}.reveal .slides>section:empty,.reveal .slides>section>section:empty,.reveal .slides>section>section[data-background-interactive],.reveal .slides>section[data-background-interactive]{pointer-events:none}.reveal.center,.reveal.center .slides,.reveal.center .slides section{min-height:0!important}.reveal .slides>section:not(.present),.reveal .slides>section>section:not(.present){pointer-events:none}.reveal.overview .slides>section,.reveal.overview .slides>section>section{pointer-events:auto}.reveal .slides>section.future,.reveal .slides>section.past,.reveal .slides>section>section.future,.reveal .slides>section>section.past{opacity:0}.reveal.slide section{-webkit-backface-visibility:hidden;backface-visibility:hidden}.reveal .slides>section[data-transition=slide].past,.reveal .slides>section[data-transition~=slide-out].past,.reveal.slide .slides>section:not([data-transition]).past{transform:translate(-150%,0)}.reveal .slides>section[data-transition=slide].future,.reveal .slides>section[data-transition~=slide-in].future,.reveal.slide .slides>section:not([data-transition]).future{transform:translate(150%,0)}.reveal .slides>section>section[data-transition=slide].past,.reveal .slides>section>section[data-transition~=slide-out].past,.reveal.slide .slides>section>section:not([data-transition]).past{transform:translate(0,-150%)}.reveal .slides>section>section[data-transition=slide].future,.reveal .slides>section>section[data-transition~=slide-in].future,.reveal.slide .slides>section>section:not([data-transition]).future{transform:translate(0,150%)}.reveal.linear section{-webkit-backface-visibility:hidden;backface-visibility:hidden}.reveal .slides>section[data-transition=linear].past,.reveal .slides>section[data-transition~=linear-out].past,.reveal.linear .slides>section:not([data-transition]).past{transform:translate(-150%,0)}.reveal .slides>section[data-transition=linear].future,.reveal .slides>section[data-transition~=linear-in].future,.reveal.linear .slides>section:not([data-transition]).future{transform:translate(150%,0)}.reveal .slides>section>section[data-transition=linear].past,.reveal .slides>section>section[data-transition~=linear-out].past,.reveal.linear .slides>section>section:not([data-transition]).past{transform:translate(0,-150%)}.reveal .slides>section>section[data-transition=linear].future,.reveal .slides>section>section[data-transition~=linear-in].future,.reveal.linear .slides>section>section:not([data-transition]).future{transform:translate(0,150%)}.reveal .slides section[data-transition=default].stack,.reveal.default .slides section.stack{transform-style:preserve-3d}.reveal .slides>section[data-transition=default].past,.reveal .slides>section[data-transition~=default-out].past,.reveal.default .slides>section:not([data-transition]).past{transform:translate3d(-100%,0,0) rotateY(-90deg) translate3d(-100%,0,0)}.reveal .slides>section[data-transition=default].future,.reveal .slides>section[data-transition~=default-in].future,.reveal.default .slides>section:not([data-transition]).future{transform:translate3d(100%,0,0) rotateY(90deg) translate3d(100%,0,0)}.reveal .slides>section>section[data-transition=default].past,.reveal .slides>section>section[data-transition~=default-out].past,.reveal.default .slides>section>section:not([data-transition]).past{transform:translate3d(0,-300px,0) rotateX(70deg) translate3d(0,-300px,0)}.reveal .slides>section>section[data-transition=default].future,.reveal .slides>section>section[data-transition~=default-in].future,.reveal.default .slides>section>section:not([data-transition]).future{transform:translate3d(0,300px,0) rotateX(-70deg) translate3d(0,300px,0)}.reveal .slides section[data-transition=convex].stack,.reveal.convex .slides section.stack{transform-style:preserve-3d}.reveal .slides>section[data-transition=convex].past,.reveal .slides>section[data-transition~=convex-out].past,.reveal.convex .slides>section:not([data-transition]).past{transform:translate3d(-100%,0,0) rotateY(-90deg) translate3d(-100%,0,0)}.reveal .slides>section[data-transition=convex].future,.reveal .slides>section[data-transition~=convex-in].future,.reveal.convex .slides>section:not([data-transition]).future{transform:translate3d(100%,0,0) rotateY(90deg) translate3d(100%,0,0)}.reveal .slides>section>section[data-transition=convex].past,.reveal .slides>section>section[data-transition~=convex-out].past,.reveal.convex .slides>section>section:not([data-transition]).past{transform:translate3d(0,-300px,0) rotateX(70deg) translate3d(0,-300px,0)}.reveal .slides>section>section[data-transition=convex].future,.reveal .slides>section>section[data-transition~=convex-in].future,.reveal.convex .slides>section>section:not([data-transition]).future{transform:translate3d(0,300px,0) rotateX(-70deg) translate3d(0,300px,0)}.reveal .slides section[data-transition=concave].stack,.reveal.concave .slides section.stack{transform-style:preserve-3d}.reveal .slides>section[data-transition=concave].past,.reveal .slides>section[data-transition~=concave-out].past,.reveal.concave .slides>section:not([data-transition]).past{transform:translate3d(-100%,0,0) rotateY(90deg) translate3d(-100%,0,0)}.reveal .slides>section[data-transition=concave].future,.reveal .slides>section[data-transition~=concave-in].future,.reveal.concave .slides>section:not([data-transition]).future{transform:translate3d(100%,0,0) rotateY(-90deg) translate3d(100%,0,0)}.reveal .slides>section>section[data-transition=concave].past,.reveal .slides>section>section[data-transition~=concave-out].past,.reveal.concave .slides>section>section:not([data-transition]).past{transform:translate3d(0,-80%,0) rotateX(-70deg) translate3d(0,-80%,0)}.reveal .slides>section>section[data-transition=concave].future,.reveal .slides>section>section[data-transition~=concave-in].future,.reveal.concave .slides>section>section:not([data-transition]).future{transform:translate3d(0,80%,0) rotateX(70deg) translate3d(0,80%,0)}.reveal .slides section[data-transition=zoom],.reveal.zoom .slides section:not([data-transition]){transition-timing-function:ease}.reveal .slides>section[data-transition=zoom].past,.reveal .slides>section[data-transition~=zoom-out].past,.reveal.zoom .slides>section:not([data-transition]).past{visibility:hidden;transform:scale(16)}.reveal .slides>section[data-transition=zoom].future,.reveal .slides>section[data-transition~=zoom-in].future,.reveal.zoom .slides>section:not([data-transition]).future{visibility:hidden;transform:scale(.2)}.reveal .slides>section>section[data-transition=zoom].past,.reveal .slides>section>section[data-transition~=zoom-out].past,.reveal.zoom .slides>section>section:not([data-transition]).past{transform:scale(16)}.reveal .slides>section>section[data-transition=zoom].future,.reveal .slides>section>section[data-transition~=zoom-in].future,.reveal.zoom .slides>section>section:not([data-transition]).future{transform:scale(.2)}.reveal.cube .slides{perspective:1300px}.reveal.cube .slides section{padding:30px;min-height:700px;-webkit-backface-visibility:hidden;backface-visibility:hidden;box-sizing:border-box;transform-style:preserve-3d}.reveal.center.cube .slides section{min-height:0}.reveal.cube .slides section:not(.stack):before{content:"";position:absolute;display:block;width:100%;height:100%;left:0;top:0;background:rgba(0,0,0,.1);border-radius:4px;transform:translateZ(-20px)}.reveal.cube .slides section:not(.stack):after{content:"";position:absolute;display:block;width:90%;height:30px;left:5%;bottom:0;background:0 0;z-index:1;border-radius:4px;box-shadow:0 95px 25px rgba(0,0,0,.2);transform:translateZ(-90px) rotateX(65deg)}.reveal.cube .slides>section.stack{padding:0;background:0 0}.reveal.cube .slides>section.past{transform-origin:100% 0;transform:translate3d(-100%,0,0) rotateY(-90deg)}.reveal.cube .slides>section.future{transform-origin:0 0;transform:translate3d(100%,0,0) rotateY(90deg)}.reveal.cube .slides>section>section.past{transform-origin:0 100%;transform:translate3d(0,-100%,0) rotateX(90deg)}.reveal.cube .slides>section>section.future{transform-origin:0 0;transform:translate3d(0,100%,0) rotateX(-90deg)}.reveal.page .slides{perspective-origin:0 50%;perspective:3000px}.reveal.page .slides section{padding:30px;min-height:700px;box-sizing:border-box;transform-style:preserve-3d}.reveal.page .slides section.past{z-index:12}.reveal.page .slides section:not(.stack):before{content:"";position:absolute;display:block;width:100%;height:100%;left:0;top:0;background:rgba(0,0,0,.1);transform:translateZ(-20px)}.reveal.page .slides section:not(.stack):after{content:"";position:absolute;display:block;width:90%;height:30px;left:5%;bottom:0;background:0 0;z-index:1;border-radius:4px;box-shadow:0 95px 25px rgba(0,0,0,.2);-webkit-transform:translateZ(-90px) rotateX(65deg)}.reveal.page .slides>section.stack{padding:0;background:0 0}.reveal.page .slides>section.past{transform-origin:0 0;transform:translate3d(-40%,0,0) rotateY(-80deg)}.reveal.page .slides>section.future{transform-origin:100% 0;transform:translate3d(0,0,0)}.reveal.page .slides>section>section.past{transform-origin:0 0;transform:translate3d(0,-40%,0) rotateX(80deg)}.reveal.page .slides>section>section.future{transform-origin:0 100%;transform:translate3d(0,0,0)}.reveal .slides section[data-transition=fade],.reveal.fade .slides section:not([data-transition]),.reveal.fade .slides>section>section:not([data-transition]){transform:none;transition:opacity .5s}.reveal.fade.overview .slides section,.reveal.fade.overview .slides>section>section{transition:none}.reveal .slides section[data-transition=none],.reveal.none .slides section:not([data-transition]){transform:none;transition:none}.reveal .pause-overlay{position:absolute;top:0;left:0;width:100%;height:100%;background:#000;visibility:hidden;opacity:0;z-index:100;transition:all 1s ease}.reveal .pause-overlay .resume-button{position:absolute;bottom:20px;right:20px;color:#ccc;border-radius:2px;padding:6px 14px;border:2px solid #ccc;font-size:16px;background:0 0;cursor:pointer}.reveal .pause-overlay .resume-button:hover{color:#fff;border-color:#fff}.reveal.paused .pause-overlay{visibility:visible;opacity:1}.reveal .no-transition,.reveal .no-transition *,.reveal .slides.disable-slide-transitions section{transition:none!important}.reveal .slides.disable-slide-transitions section{transform:none!important}.reveal .backgrounds{position:absolute;width:100%;height:100%;top:0;left:0;perspective:600px}.reveal .slide-background{display:none;position:absolute;width:100%;height:100%;opacity:0;visibility:hidden;overflow:hidden;background-color:rgba(0,0,0,0);transition:all .8s cubic-bezier(.26,.86,.44,.985)}.reveal .slide-background-content{position:absolute;width:100%;height:100%;background-position:50% 50%;background-repeat:no-repeat;background-size:cover}.reveal .slide-background.stack{display:block}.reveal .slide-background.present{opacity:1;visibility:visible;z-index:2}.print-pdf .reveal .slide-background{opacity:1!important;visibility:visible!important}.reveal .slide-background video{position:absolute;width:100%;height:100%;max-width:none;max-height:none;top:0;left:0;-o-object-fit:cover;object-fit:cover}.reveal .slide-background[data-background-size=contain] video{-o-object-fit:contain;object-fit:contain}.reveal>.backgrounds .slide-background[data-background-transition=none],.reveal[data-background-transition=none]>.backgrounds .slide-background:not([data-background-transition]){transition:none}.reveal>.backgrounds .slide-background[data-background-transition=slide],.reveal[data-background-transition=slide]>.backgrounds .slide-background:not([data-background-transition]){opacity:1;-webkit-backface-visibility:hidden;backface-visibility:hidden}.reveal>.backgrounds .slide-background.past[data-background-transition=slide],.reveal[data-background-transition=slide]>.backgrounds .slide-background.past:not([data-background-transition]){transform:translate(-100%,0)}.reveal>.backgrounds .slide-background.future[data-background-transition=slide],.reveal[data-background-transition=slide]>.backgrounds .slide-background.future:not([data-background-transition]){transform:translate(100%,0)}.reveal>.backgrounds .slide-background>.slide-background.past[data-background-transition=slide],.reveal[data-background-transition=slide]>.backgrounds .slide-background>.slide-background.past:not([data-background-transition]){transform:translate(0,-100%)}.reveal>.backgrounds .slide-background>.slide-background.future[data-background-transition=slide],.reveal[data-background-transition=slide]>.backgrounds .slide-background>.slide-background.future:not([data-background-transition]){transform:translate(0,100%)}.reveal>.backgrounds .slide-background.past[data-background-transition=convex],.reveal[data-background-transition=convex]>.backgrounds .slide-background.past:not([data-background-transition]){opacity:0;transform:translate3d(-100%,0,0) rotateY(-90deg) translate3d(-100%,0,0)}.reveal>.backgrounds .slide-background.future[data-background-transition=convex],.reveal[data-background-transition=convex]>.backgrounds .slide-background.future:not([data-background-transition]){opacity:0;transform:translate3d(100%,0,0) rotateY(90deg) translate3d(100%,0,0)}.reveal>.backgrounds .slide-background>.slide-background.past[data-background-transition=convex],.reveal[data-background-transition=convex]>.backgrounds .slide-background>.slide-background.past:not([data-background-transition]){opacity:0;transform:translate3d(0,-100%,0) rotateX(90deg) translate3d(0,-100%,0)}.reveal>.backgrounds .slide-background>.slide-background.future[data-background-transition=convex],.reveal[data-background-transition=convex]>.backgrounds .slide-background>.slide-background.future:not([data-background-transition]){opacity:0;transform:translate3d(0,100%,0) rotateX(-90deg) translate3d(0,100%,0)}.reveal>.backgrounds .slide-background.past[data-background-transition=concave],.reveal[data-background-transition=concave]>.backgrounds .slide-background.past:not([data-background-transition]){opacity:0;transform:translate3d(-100%,0,0) rotateY(90deg) translate3d(-100%,0,0)}.reveal>.backgrounds .slide-background.future[data-background-transition=concave],.reveal[data-background-transition=concave]>.backgrounds .slide-background.future:not([data-background-transition]){opacity:0;transform:translate3d(100%,0,0) rotateY(-90deg) translate3d(100%,0,0)}.reveal>.backgrounds .slide-background>.slide-background.past[data-background-transition=concave],.reveal[data-background-transition=concave]>.backgrounds .slide-background>.slide-background.past:not([data-background-transition]){opacity:0;transform:translate3d(0,-100%,0) rotateX(-90deg) translate3d(0,-100%,0)}.reveal>.backgrounds .slide-background>.slide-background.future[data-background-transition=concave],.reveal[data-background-transition=concave]>.backgrounds .slide-background>.slide-background.future:not([data-background-transition]){opacity:0;transform:translate3d(0,100%,0) rotateX(90deg) translate3d(0,100%,0)}.reveal>.backgrounds .slide-background[data-background-transition=zoom],.reveal[data-background-transition=zoom]>.backgrounds .slide-background:not([data-background-transition]){transition-timing-function:ease}.reveal>.backgrounds .slide-background.past[data-background-transition=zoom],.reveal[data-background-transition=zoom]>.backgrounds .slide-background.past:not([data-background-transition]){opacity:0;visibility:hidden;transform:scale(16)}.reveal>.backgrounds .slide-background.future[data-background-transition=zoom],.reveal[data-background-transition=zoom]>.backgrounds .slide-background.future:not([data-background-transition]){opacity:0;visibility:hidden;transform:scale(.2)}.reveal>.backgrounds .slide-background>.slide-background.past[data-background-transition=zoom],.reveal[data-background-transition=zoom]>.backgrounds .slide-background>.slide-background.past:not([data-background-transition]){opacity:0;visibility:hidden;transform:scale(16)}.reveal>.backgrounds .slide-background>.slide-background.future[data-background-transition=zoom],.reveal[data-background-transition=zoom]>.backgrounds .slide-background>.slide-background.future:not([data-background-transition]){opacity:0;visibility:hidden;transform:scale(.2)}.reveal[data-transition-speed=fast]>.backgrounds .slide-background{transition-duration:.4s}.reveal[data-transition-speed=slow]>.backgrounds .slide-background{transition-duration:1.2s}.reveal [data-auto-animate-target^=unmatched]{will-change:opacity}.reveal section[data-auto-animate]:not(.stack):not([data-auto-animate=running]) [data-auto-animate-target^=unmatched]{opacity:0}.reveal.overview{perspective-origin:50% 50%;perspective:700px}.reveal.overview .slides{-moz-transform-style:preserve-3d}.reveal.overview .slides section{height:100%;top:0!important;opacity:1!important;overflow:hidden;visibility:visible!important;cursor:pointer;box-sizing:border-box}.reveal.overview .slides section.present,.reveal.overview .slides section:hover{outline:10px solid rgba(150,150,150,.4);outline-offset:10px}.reveal.overview .slides section .fragment{opacity:1;transition:none}.reveal.overview .slides section:after,.reveal.overview .slides section:before{display:none!important}.reveal.overview .slides>section.stack{padding:0;top:0!important;background:0 0;outline:0;overflow:visible}.reveal.overview .backgrounds{perspective:inherit;-moz-transform-style:preserve-3d}.reveal.overview .backgrounds .slide-background{opacity:1;visibility:visible;outline:10px solid rgba(150,150,150,.1);outline-offset:10px}.reveal.overview .backgrounds .slide-background.stack{overflow:visible}.reveal.overview .slides section,.reveal.overview-deactivating .slides section{transition:none}.reveal.overview .backgrounds .slide-background,.reveal.overview-deactivating .backgrounds .slide-background{transition:none}.reveal.rtl .slides,.reveal.rtl .slides h1,.reveal.rtl .slides h2,.reveal.rtl .slides h3,.reveal.rtl .slides h4,.reveal.rtl .slides h5,.reveal.rtl .slides h6{direction:rtl;font-family:sans-serif}.reveal.rtl code,.reveal.rtl pre{direction:ltr}.reveal.rtl ol,.reveal.rtl ul{text-align:right}.reveal.rtl .progress span{transform-origin:100% 0}.reveal.has-parallax-background .backgrounds{transition:all .8s ease}.reveal.has-parallax-background[data-transition-speed=fast] .backgrounds{transition-duration:.4s}.reveal.has-parallax-background[data-transition-speed=slow] .backgrounds{transition-duration:1.2s}.reveal>.overlay{position:absolute;top:0;left:0;width:100%;height:100%;z-index:1000;background:rgba(0,0,0,.9);transition:all .3s ease}.reveal>.overlay .spinner{position:absolute;display:block;top:50%;left:50%;width:32px;height:32px;margin:-16px 0 0 -16px;z-index:10;background-image:url(data:image/gif;base64,R0lGODlhIAAgAPMAAJmZmf%2F%2F%2F6%2Bvr8nJybW1tcDAwOjo6Nvb26ioqKOjo7Ozs%2FLy8vz8%2FAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FhpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh%2BQQJCgAAACwAAAAAIAAgAAAE5xDISWlhperN52JLhSSdRgwVo1ICQZRUsiwHpTJT4iowNS8vyW2icCF6k8HMMBkCEDskxTBDAZwuAkkqIfxIQyhBQBFvAQSDITM5VDW6XNE4KagNh6Bgwe60smQUB3d4Rz1ZBApnFASDd0hihh12BkE9kjAJVlycXIg7CQIFA6SlnJ87paqbSKiKoqusnbMdmDC2tXQlkUhziYtyWTxIfy6BE8WJt5YJvpJivxNaGmLHT0VnOgSYf0dZXS7APdpB309RnHOG5gDqXGLDaC457D1zZ%2FV%2FnmOM82XiHRLYKhKP1oZmADdEAAAh%2BQQJCgAAACwAAAAAIAAgAAAE6hDISWlZpOrNp1lGNRSdRpDUolIGw5RUYhhHukqFu8DsrEyqnWThGvAmhVlteBvojpTDDBUEIFwMFBRAmBkSgOrBFZogCASwBDEY%2FCZSg7GSE0gSCjQBMVG023xWBhklAnoEdhQEfyNqMIcKjhRsjEdnezB%2BA4k8gTwJhFuiW4dokXiloUepBAp5qaKpp6%2BHo7aWW54wl7obvEe0kRuoplCGepwSx2jJvqHEmGt6whJpGpfJCHmOoNHKaHx61WiSR92E4lbFoq%2BB6QDtuetcaBPnW6%2BO7wDHpIiK9SaVK5GgV543tzjgGcghAgAh%2BQQJCgAAACwAAAAAIAAgAAAE7hDISSkxpOrN5zFHNWRdhSiVoVLHspRUMoyUakyEe8PTPCATW9A14E0UvuAKMNAZKYUZCiBMuBakSQKG8G2FzUWox2AUtAQFcBKlVQoLgQReZhQlCIJesQXI5B0CBnUMOxMCenoCfTCEWBsJColTMANldx15BGs8B5wlCZ9Po6OJkwmRpnqkqnuSrayqfKmqpLajoiW5HJq7FL1Gr2mMMcKUMIiJgIemy7xZtJsTmsM4xHiKv5KMCXqfyUCJEonXPN2rAOIAmsfB3uPoAK%2B%2BG%2Bw48edZPK%2BM6hLJpQg484enXIdQFSS1u6UhksENEQAAIfkECQoAAAAsAAAAACAAIAAABOcQyEmpGKLqzWcZRVUQnZYg1aBSh2GUVEIQ2aQOE%2BG%2BcD4ntpWkZQj1JIiZIogDFFyHI0UxQwFugMSOFIPJftfVAEoZLBbcLEFhlQiqGp1Vd140AUklUN3eCA51C1EWMzMCezCBBmkxVIVHBWd3HHl9JQOIJSdSnJ0TDKChCwUJjoWMPaGqDKannasMo6WnM562R5YluZRwur0wpgqZE7NKUm%2BFNRPIhjBJxKZteWuIBMN4zRMIVIhffcgojwCF117i4nlLnY5ztRLsnOk%2BaV%2BoJY7V7m76PdkS4trKcdg0Zc0tTcKkRAAAIfkECQoAAAAsAAAAACAAIAAABO4QyEkpKqjqzScpRaVkXZWQEximw1BSCUEIlDohrft6cpKCk5xid5MNJTaAIkekKGQkWyKHkvhKsR7ARmitkAYDYRIbUQRQjWBwJRzChi9CRlBcY1UN4g0%2FVNB0AlcvcAYHRyZPdEQFYV8ccwR5HWxEJ02YmRMLnJ1xCYp0Y5idpQuhopmmC2KgojKasUQDk5BNAwwMOh2RtRq5uQuPZKGIJQIGwAwGf6I0JXMpC8C7kXWDBINFMxS4DKMAWVWAGYsAdNqW5uaRxkSKJOZKaU3tPOBZ4DuK2LATgJhkPJMgTwKCdFjyPHEnKxFCDhEAACH5BAkKAAAALAAAAAAgACAAAATzEMhJaVKp6s2nIkolIJ2WkBShpkVRWqqQrhLSEu9MZJKK9y1ZrqYK9WiClmvoUaF8gIQSNeF1Er4MNFn4SRSDARWroAIETg1iVwuHjYB1kYc1mwruwXKC9gmsJXliGxc%2BXiUCby9ydh1sOSdMkpMTBpaXBzsfhoc5l58Gm5yToAaZhaOUqjkDgCWNHAULCwOLaTmzswadEqggQwgHuQsHIoZCHQMMQgQGubVEcxOPFAcMDAYUA85eWARmfSRQCdcMe0zeP1AAygwLlJtPNAAL19DARdPzBOWSm1brJBi45soRAWQAAkrQIykShQ9wVhHCwCQCACH5BAkKAAAALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq%2BE71SRQeyqUToLA7VxF0JDyIQh%2FMVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiRMDjI0Fd30%2FiI2UA5GSS5UDj2l6NoqgOgN4gksEBgYFf0FDqKgHnyZ9OX8HrgYHdHpcHQULXAS2qKpENRg7eAMLC7kTBaixUYFkKAzWAAnLC7FLVxLWDBLKCwaKTULgEwbLA4hJtOkSBNqITT3xEgfLpBtzE%2FjiuL04RGEBgwWhShRgQExHBAAh%2BQQJCgAAACwAAAAAIAAgAAAE7xDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfZiCqGk5dTESJeaOAlClzsJsqwiJwiqnFrb2nS9kmIcgEsjQydLiIlHehhpejaIjzh9eomSjZR%2BipslWIRLAgMDOR2DOqKogTB9pCUJBagDBXR6XB0EBkIIsaRsGGMMAxoDBgYHTKJiUYEGDAzHC9EACcUGkIgFzgwZ0QsSBcXHiQvOwgDdEwfFs0sDzt4S6BK4xYjkDOzn0unFeBzOBijIm1Dgmg5YFQwsCMjp1oJ8LyIAACH5BAkKAAAALAAAAAAgACAAAATwEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq%2BE71SRQeyqUToLA7VxF0JDyIQh%2FMVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GGl6NoiPOH16iZKNlH6KmyWFOggHhEEvAwwMA0N9GBsEC6amhnVcEwavDAazGwIDaH1ipaYLBUTCGgQDA8NdHz0FpqgTBwsLqAbWAAnIA4FWKdMLGdYGEgraigbT0OITBcg5QwPT4xLrROZL6AuQAPUS7bxLpoWidY0JtxLHKhwwMJBTHgPKdEQAACH5BAkKAAAALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq%2BE71SRQeyqUToLA7VxF0JDyIQh%2FMVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GAULDJCRiXo1CpGXDJOUjY%2BYip9DhToJA4RBLwMLCwVDfRgbBAaqqoZ1XBMHswsHtxtFaH1iqaoGNgAIxRpbFAgfPQSqpbgGBqUD1wBXeCYp1AYZ19JJOYgH1KwA4UBvQwXUBxPqVD9L3sbp2BNk2xvvFPJd%2BMFCN6HAAIKgNggY0KtEBAAh%2BQQJCgAAACwAAAAAIAAgAAAE6BDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfYIDMaAFdTESJeaEDAIMxYFqrOUaNW4E4ObYcCXaiBVEgULe0NJaxxtYksjh2NLkZISgDgJhHthkpU4mW6blRiYmZOlh4JWkDqILwUGBnE6TYEbCgevr0N1gH4At7gHiRpFaLNrrq8HNgAJA70AWxQIH1%2BvsYMDAzZQPC9VCNkDWUhGkuE5PxJNwiUK4UfLzOlD4WvzAHaoG9nxPi5d%2BjYUqfAhhykOFwJWiAAAIfkECQoAAAAsAAAAACAAIAAABPAQyElpUqnqzaciSoVkXVUMFaFSwlpOCcMYlErAavhOMnNLNo8KsZsMZItJEIDIFSkLGQoQTNhIsFehRww2CQLKF0tYGKYSg%2BygsZIuNqJksKgbfgIGepNo2cIUB3V1B3IvNiBYNQaDSTtfhhx0CwVPI0UJe0%2Bbm4g5VgcGoqOcnjmjqDSdnhgEoamcsZuXO1aWQy8KAwOAuTYYGwi7w5h%2BKr0SJ8MFihpNbx%2B4Erq7BYBuzsdiH1jCAzoSfl0rVirNbRXlBBlLX%2BBP0XJLAPGzTkAuAOqb0WT5AH7OcdCm5B8TgRwSRKIHQtaLCwg1RAAAOwAAAAAAAAAAAA%3D%3D);visibility:visible;opacity:.6;transition:all .3s ease}.reveal>.overlay header{position:absolute;left:0;top:0;width:100%;padding:5px;z-index:2;box-sizing:border-box}.reveal>.overlay header a{display:inline-block;width:40px;height:40px;line-height:36px;padding:0 10px;float:right;opacity:.6;box-sizing:border-box}.reveal>.overlay header a:hover{opacity:1}.reveal>.overlay header a .icon{display:inline-block;width:20px;height:20px;background-position:50% 50%;background-size:100%;background-repeat:no-repeat}.reveal>.overlay header a.close .icon{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABkklEQVRYR8WX4VHDMAxG6wnoJrABZQPYBCaBTWAD2g1gE5gg6OOsXuxIlr40d81dfrSJ9V4c2VLK7spHuTJ/5wpM07QXuXc5X0opX2tEJcadjHuV80li/FgxTIEK/5QBCICBD6xEhSMGHgQPgBgLiYVAB1dpSqKDawxTohFw4JSEA3clzgIBPCURwE2JucBR7rhPJJv5OpJwDX+SfDjgx1wACQeJG1aChP9K/IMmdZ8DtESV1WyP3Bt4MwM6sj4NMxMYiqUWHQu4KYA/SYkIjOsm3BXYWMKFDwU2khjCQ4ELJUJ4SmClRArOCmSXGuKma0fYD5CbzHxFpCSGAhfAVSSUGDUk2BWZaff2g6GE15BsBQ9nwmpIGDiyHQddwNTMKkbZaf9fajXQca1EX44puJZUsnY0ObGmITE3GVLCbEhQUjGVt146j6oasWN+49Vph2w1pZ5EansNZqKBm1txbU57iRRcZ86RWMDdWtBJUHBHwoQPi1GV+JCbntmvok7iTX4/Up9mgyTc/FJYDTcndgH/AA5A/CHsyEkVAAAAAElFTkSuQmCC)}.reveal>.overlay header a.external .icon{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAcElEQVRYR+2WSQoAIQwEzf8f7XiOMkUQxUPlGkM3hVmiQfQR9GYnH1SsAQlI4DiBqkCMoNb9y2e90IAEJPAcgdznU9+engMaeJ7Azh5Y1U67gAho4DqBqmB1buAf0MB1AlVBek83ZPkmJMGc1wAR+AAqod/B97TRpQAAAABJRU5ErkJggg==)}.reveal>.overlay .viewport{position:absolute;display:flex;top:50px;right:0;bottom:0;left:0}.reveal>.overlay.overlay-preview .viewport iframe{width:100%;height:100%;max-width:100%;max-height:100%;border:0;opacity:0;visibility:hidden;transition:all .3s ease}.reveal>.overlay.overlay-preview.loaded .viewport iframe{opacity:1;visibility:visible}.reveal>.overlay.overlay-preview.loaded .viewport-inner{position:absolute;z-index:-1;left:0;top:45%;width:100%;text-align:center;letter-spacing:normal}.reveal>.overlay.overlay-preview .x-frame-error{opacity:0;transition:opacity .3s ease .3s}.reveal>.overlay.overlay-preview.loaded .x-frame-error{opacity:1}.reveal>.overlay.overlay-preview.loaded .spinner{opacity:0;visibility:hidden;transform:scale(.2)}.reveal>.overlay.overlay-help .viewport{overflow:auto;color:#fff}.reveal>.overlay.overlay-help .viewport .viewport-inner{width:600px;margin:auto;padding:20px 20px 80px 20px;text-align:center;letter-spacing:normal}.reveal>.overlay.overlay-help .viewport .viewport-inner .title{font-size:20px}.reveal>.overlay.overlay-help .viewport .viewport-inner table{border:1px solid #fff;border-collapse:collapse;font-size:16px}.reveal>.overlay.overlay-help .viewport .viewport-inner table td,.reveal>.overlay.overlay-help .viewport .viewport-inner table th{width:200px;padding:14px;border:1px solid #fff;vertical-align:middle}.reveal>.overlay.overlay-help .viewport .viewport-inner table th{padding-top:20px;padding-bottom:20px}.reveal .playback{position:absolute;left:15px;bottom:20px;z-index:30;cursor:pointer;transition:all .4s ease;-webkit-tap-highlight-color:transparent}.reveal.overview .playback{opacity:0;visibility:hidden}.reveal .hljs{min-height:100%}.reveal .hljs table{margin:initial}.reveal .hljs-ln-code,.reveal .hljs-ln-numbers{padding:0;border:0}.reveal .hljs-ln-numbers{opacity:.6;padding-right:.75em;text-align:right;vertical-align:top}.reveal .hljs.has-highlights tr:not(.highlight-line){opacity:.4}.reveal .hljs:not(:first-child).fragment{position:absolute;top:0;left:0;width:100%;box-sizing:border-box}.reveal pre[data-auto-animate-target]{overflow:hidden}.reveal pre[data-auto-animate-target] code{height:100%}.reveal .roll{display:inline-block;line-height:1.2;overflow:hidden;vertical-align:top;perspective:400px;perspective-origin:50% 50%}.reveal .roll:hover{background:0 0;text-shadow:none}.reveal .roll span{display:block;position:relative;padding:0 2px;pointer-events:none;transition:all .4s ease;transform-origin:50% 0;transform-style:preserve-3d;-webkit-backface-visibility:hidden;backface-visibility:hidden}.reveal .roll:hover span{background:rgba(0,0,0,.5);transform:translate3d(0,0,-45px) rotateX(90deg)}.reveal .roll span:after{content:attr(data-title);display:block;position:absolute;left:0;top:0;padding:0 2px;-webkit-backface-visibility:hidden;backface-visibility:hidden;transform-origin:50% 0;transform:translate3d(0,110%,0) rotateX(-90deg)}.reveal aside.notes{display:none}.reveal .speaker-notes{display:none;position:absolute;width:33.3333333333%;height:100%;top:0;left:100%;padding:14px 18px 14px 18px;z-index:1;font-size:18px;line-height:1.4;border:1px solid rgba(0,0,0,.05);color:#222;background-color:#f5f5f5;overflow:auto;box-sizing:border-box;text-align:left;font-family:Helvetica,sans-serif;-webkit-overflow-scrolling:touch}.reveal .speaker-notes .notes-placeholder{color:#ccc;font-style:italic}.reveal .speaker-notes:focus{outline:0}.reveal .speaker-notes:before{content:"Speaker notes";display:block;margin-bottom:10px;opacity:.5}.reveal.show-notes{max-width:75%;overflow:visible}.reveal.show-notes .speaker-notes{display:block}@media screen and (min-width:1600px){.reveal .speaker-notes{font-size:20px}}@media screen and (max-width:1024px){.reveal.show-notes{border-left:0;max-width:none;max-height:70%;max-height:70vh;overflow:visible}.reveal.show-notes .speaker-notes{top:100%;left:0;width:100%;height:42.8571428571%;height:30vh;border:0}}@media screen and (max-width:600px){.reveal.show-notes{max-height:60%;max-height:60vh}.reveal.show-notes .speaker-notes{top:100%;height:66.6666666667%;height:40vh}.reveal .speaker-notes{font-size:14px}}.zoomed .reveal *,.zoomed .reveal :after,.zoomed .reveal :before{-webkit-backface-visibility:visible!important;backface-visibility:visible!important}.zoomed .reveal .controls,.zoomed .reveal .progress{opacity:0}.zoomed .reveal .roll span{background:0 0}.zoomed .reveal .roll span:after{visibility:hidden}html.print-pdf *{-webkit-print-color-adjust:exact}html.print-pdf{width:100%;height:100%;overflow:visible}html.print-pdf body{margin:0 auto!important;border:0;padding:0;float:none!important;overflow:visible}html.print-pdf .nestedarrow,html.print-pdf .reveal .controls,html.print-pdf .reveal .playback,html.print-pdf .reveal .progress,html.print-pdf .reveal.overview,html.print-pdf .state-background{display:none!important}html.print-pdf .reveal pre code{overflow:hidden!important;font-family:Courier,"Courier New",monospace!important}html.print-pdf .reveal{width:auto!important;height:auto!important;overflow:hidden!important}html.print-pdf .reveal .slides{position:static;width:100%!important;height:auto!important;zoom:1!important;pointer-events:initial;left:auto;top:auto;margin:0!important;padding:0!important;overflow:visible;display:block;perspective:none;perspective-origin:50% 50%}html.print-pdf .reveal .slides .pdf-page{position:relative;overflow:hidden;z-index:1;page-break-after:always}html.print-pdf .reveal .slides section{visibility:visible!important;display:block!important;position:absolute!important;margin:0!important;padding:0!important;box-sizing:border-box!important;min-height:1px;opacity:1!important;transform-style:flat!important;transform:none!important}html.print-pdf .reveal section.stack{position:relative!important;margin:0!important;padding:0!important;page-break-after:avoid!important;height:auto!important;min-height:auto!important}html.print-pdf .reveal img{box-shadow:none}html.print-pdf .reveal .backgrounds{display:none}html.print-pdf .reveal .slide-background{display:block!important;position:absolute;top:0;left:0;width:100%;height:100%;z-index:auto!important}html.print-pdf .reveal.show-notes{max-width:none;max-height:none}html.print-pdf .reveal .speaker-notes-pdf{display:block;width:100%;height:auto;max-height:none;top:auto;right:auto;bottom:auto;left:auto;z-index:100}html.print-pdf .reveal .speaker-notes-pdf[data-layout=separate-page]{position:relative;color:inherit;background-color:transparent;padding:20px;page-break-after:always;border:0}html.print-pdf .reveal .slide-number-pdf{display:block;position:absolute;font-size:14px}html.print-pdf .aria-status{display:none}@media print{html:not(.print-pdf){background:#fff;width:auto;height:auto;overflow:visible}html:not(.print-pdf) body{background:#fff;font-size:20pt;width:auto;height:auto;border:0;margin:0 5%;padding:0;overflow:visible;float:none!important}html:not(.print-pdf) .controls,html:not(.print-pdf) .fork-reveal,html:not(.print-pdf) .nestedarrow,html:not(.print-pdf) .reveal .backgrounds,html:not(.print-pdf) .reveal .progress,html:not(.print-pdf) .reveal .slide-number,html:not(.print-pdf) .share-reveal,html:not(.print-pdf) .state-background{display:none!important}html:not(.print-pdf) body,html:not(.print-pdf) li,html:not(.print-pdf) p,html:not(.print-pdf) td{font-size:20pt!important;color:#000}html:not(.print-pdf) h1,html:not(.print-pdf) h2,html:not(.print-pdf) h3,html:not(.print-pdf) h4,html:not(.print-pdf) h5,html:not(.print-pdf) h6{color:#000!important;height:auto;line-height:normal;text-align:left;letter-spacing:normal}html:not(.print-pdf) h1{font-size:28pt!important}html:not(.print-pdf) h2{font-size:24pt!important}html:not(.print-pdf) h3{font-size:22pt!important}html:not(.print-pdf) h4{font-size:22pt!important;font-variant:small-caps}html:not(.print-pdf) h5{font-size:21pt!important}html:not(.print-pdf) h6{font-size:20pt!important;font-style:italic}html:not(.print-pdf) a:link,html:not(.print-pdf) a:visited{color:#000!important;font-weight:700;text-decoration:underline}html:not(.print-pdf) div,html:not(.print-pdf) ol,html:not(.print-pdf) p,html:not(.print-pdf) ul{visibility:visible;position:static;width:auto;height:auto;display:block;overflow:visible;margin:0;text-align:left!important}html:not(.print-pdf) .reveal pre,html:not(.print-pdf) .reveal table{margin-left:0;margin-right:0}html:not(.print-pdf) .reveal pre code{padding:20px}html:not(.print-pdf) .reveal blockquote{margin:20px 0}html:not(.print-pdf) .reveal .slides{position:static!important;width:auto!important;height:auto!important;left:0!important;top:0!important;margin-left:0!important;margin-top:0!important;padding:0!important;zoom:1!important;transform:none!important;overflow:visible!important;display:block!important;text-align:left!important;perspective:none;perspective-origin:50% 50%}html:not(.print-pdf) .reveal .slides section{visibility:visible!important;position:static!important;width:auto!important;height:auto!important;display:block!important;overflow:visible!important;left:0!important;top:0!important;margin-left:0!important;margin-top:0!important;padding:60px 20px!important;z-index:auto!important;opacity:1!important;page-break-after:always!important;transform-style:flat!important;transform:none!important;transition:none!important}html:not(.print-pdf) .reveal .slides section.stack{padding:0!important}html:not(.print-pdf) .reveal section:last-of-type{page-break-after:avoid!important}html:not(.print-pdf) .reveal section .fragment{opacity:1!important;visibility:visible!important;transform:none!important}html:not(.print-pdf) .reveal section img{display:block;margin:15px 0;background:#fff;border:1px solid #666;box-shadow:none}html:not(.print-pdf) .reveal section small{font-size:.8em}html:not(.print-pdf) .reveal .hljs{max-height:100%;white-space:pre-wrap;word-wrap:break-word;word-break:break-word;font-size:15pt}html:not(.print-pdf) .reveal .hljs .hljs-ln-numbers{white-space:nowrap}html:not(.print-pdf) .reveal .hljs td{font-size:inherit!important;color:inherit!important}}';
var white = "/**\n * White theme for reveal.js. This is the opposite of the 'black' theme.\n *\n * By Hakim El Hattab, http://hakim.se\n */\n@font-face {\n    font-family: 'Source Sans Pro';\n    src: url('__VITE_ASSET__dce8869d__');\n    src: url('__VITE_ASSET__dce8869d__$_?#iefix__') format('embedded-opentype'),\n         url('__VITE_ASSET__d4eaa48b__') format('woff'),\n         url('__VITE_ASSET__c1865d89__') format('truetype');\n    font-weight: normal;\n    font-style: normal;\n}\n@font-face {\n    font-family: 'Source Sans Pro';\n    src: url('__VITE_ASSET__ad4b0799__');\n    src: url('__VITE_ASSET__ad4b0799__$_?#iefix__') format('embedded-opentype'),\n         url('__VITE_ASSET__05d3615f__') format('woff'),\n         url('__VITE_ASSET__d13268af__') format('truetype');\n    font-weight: normal;\n    font-style: italic;\n}\n@font-face {\n    font-family: 'Source Sans Pro';\n    src: url('__VITE_ASSET__ebb8918d__');\n    src: url('__VITE_ASSET__ebb8918d__$_?#iefix__') format('embedded-opentype'),\n         url('__VITE_ASSET__b0abd273__') format('woff'),\n         url('__VITE_ASSET__a53e2723__') format('truetype');\n    font-weight: 600;\n    font-style: normal;\n}\n@font-face {\n    font-family: 'Source Sans Pro';\n    src: url('__VITE_ASSET__dfe0b47a__');\n    src: url('__VITE_ASSET__dfe0b47a__$_?#iefix__') format('embedded-opentype'),\n         url('__VITE_ASSET__7225cacc__') format('woff'),\n         url('__VITE_ASSET__e8ec22b6__') format('truetype');\n    font-weight: 600;\n    font-style: italic;\n}\nsection.has-dark-background, section.has-dark-background h1, section.has-dark-background h2, section.has-dark-background h3, section.has-dark-background h4, section.has-dark-background h5, section.has-dark-background h6 {\n  color: #fff;\n}\n/*********************************************\n * GLOBAL STYLES\n *********************************************/\n:root {\n  --r-background-color: #fff;\n  --r-main-font: Source Sans Pro, Helvetica, sans-serif;\n  --r-main-font-size: 42px;\n  --r-main-color: #222;\n  --r-block-margin: 20px;\n  --r-heading-margin: 0 0 20px 0;\n  --r-heading-font: Source Sans Pro, Helvetica, sans-serif;\n  --r-heading-color: #222;\n  --r-heading-line-height: 1.2;\n  --r-heading-letter-spacing: normal;\n  --r-heading-text-transform: uppercase;\n  --r-heading-text-shadow: none;\n  --r-heading-font-weight: 600;\n  --r-heading1-text-shadow: none;\n  --r-heading1-size: 2.5em;\n  --r-heading2-size: 1.6em;\n  --r-heading3-size: 1.3em;\n  --r-heading4-size: 1em;\n  --r-code-font: monospace;\n  --r-link-color: #2a76dd;\n  --r-link-color-dark: #1a53a1;\n  --r-link-color-hover: #6ca0e8;\n  --r-selection-background-color: #98bdef;\n  --r-selection-color: #fff;\n}\n.reveal-viewport {\n  background: #fff;\n  background-color: var(--r-background-color);\n}\n.reveal {\n  font-family: var(--r-main-font);\n  font-size: var(--r-main-font-size);\n  font-weight: normal;\n  color: var(--r-main-color);\n}\n.reveal ::selection {\n  color: var(--r-selection-color);\n  background: var(--r-selection-background-color);\n  text-shadow: none;\n}\n.reveal ::-moz-selection {\n  color: var(--r-selection-color);\n  background: var(--r-selection-background-color);\n  text-shadow: none;\n}\n.reveal .slides section,\n.reveal .slides section > section {\n  line-height: 1.3;\n  font-weight: inherit;\n}\n/*********************************************\n * HEADERS\n *********************************************/\n.reveal h1,\n.reveal h2,\n.reveal h3,\n.reveal h4,\n.reveal h5,\n.reveal h6 {\n  margin: var(--r-heading-margin);\n  color: var(--r-heading-color);\n  font-family: var(--r-heading-font);\n  font-weight: var(--r-heading-font-weight);\n  line-height: var(--r-heading-line-height);\n  letter-spacing: var(--r-heading-letter-spacing);\n  text-transform: var(--r-heading-text-transform);\n  text-shadow: var(--r-heading-text-shadow);\n  word-wrap: break-word;\n}\n.reveal h1 {\n  font-size: var(--r-heading1-size);\n}\n.reveal h2 {\n  font-size: var(--r-heading2-size);\n}\n.reveal h3 {\n  font-size: var(--r-heading3-size);\n}\n.reveal h4 {\n  font-size: var(--r-heading4-size);\n}\n.reveal h1 {\n  text-shadow: var(--r-heading1-text-shadow);\n}\n/*********************************************\n * OTHER\n *********************************************/\n.reveal p {\n  margin: var(--r-block-margin) 0;\n  line-height: 1.3;\n}\n/* Remove trailing margins after titles */\n.reveal h1:last-child,\n.reveal h2:last-child,\n.reveal h3:last-child,\n.reveal h4:last-child,\n.reveal h5:last-child,\n.reveal h6:last-child {\n  margin-bottom: 0;\n}\n/* Ensure certain elements are never larger than the slide itself */\n.reveal img,\n.reveal video,\n.reveal iframe {\n  max-width: 95%;\n  max-height: 95%;\n}\n.reveal strong,\n.reveal b {\n  font-weight: bold;\n}\n.reveal em {\n  font-style: italic;\n}\n.reveal ol,\n.reveal dl,\n.reveal ul {\n  display: inline-block;\n  text-align: left;\n  margin: 0 0 0 1em;\n}\n.reveal ol {\n  list-style-type: decimal;\n}\n.reveal ul {\n  list-style-type: disc;\n}\n.reveal ul ul {\n  list-style-type: square;\n}\n.reveal ul ul ul {\n  list-style-type: circle;\n}\n.reveal ul ul,\n.reveal ul ol,\n.reveal ol ol,\n.reveal ol ul {\n  display: block;\n  margin-left: 40px;\n}\n.reveal dt {\n  font-weight: bold;\n}\n.reveal dd {\n  margin-left: 40px;\n}\n.reveal blockquote {\n  display: block;\n  position: relative;\n  width: 70%;\n  margin: var(--r-block-margin) auto;\n  padding: 5px;\n  font-style: italic;\n  background: rgba(255, 255, 255, 0.05);\n  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);\n}\n.reveal blockquote p:first-child,\n.reveal blockquote p:last-child {\n  display: inline-block;\n}\n.reveal q {\n  font-style: italic;\n}\n.reveal pre {\n  display: block;\n  position: relative;\n  width: 90%;\n  margin: var(--r-block-margin) auto;\n  text-align: left;\n  font-size: 0.55em;\n  font-family: var(--r-code-font);\n  line-height: 1.2em;\n  word-wrap: break-word;\n  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);\n}\n.reveal code {\n  font-family: var(--r-code-font);\n  text-transform: none;\n  tab-size: 2;\n}\n.reveal pre code {\n  display: block;\n  padding: 5px;\n  overflow: auto;\n  max-height: 400px;\n  word-wrap: normal;\n}\n.reveal .code-wrapper {\n  white-space: normal;\n}\n.reveal .code-wrapper code {\n  white-space: pre;\n}\n.reveal table {\n  margin: auto;\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n.reveal table th {\n  font-weight: bold;\n}\n.reveal table th,\n.reveal table td {\n  text-align: left;\n  padding: 0.2em 0.5em 0.2em 0.5em;\n  border-bottom: 1px solid;\n}\n.reveal table th[align=center],\n.reveal table td[align=center] {\n  text-align: center;\n}\n.reveal table th[align=right],\n.reveal table td[align=right] {\n  text-align: right;\n}\n.reveal table tbody tr:last-child th,\n.reveal table tbody tr:last-child td {\n  border-bottom: none;\n}\n.reveal sup {\n  vertical-align: super;\n  font-size: smaller;\n}\n.reveal sub {\n  vertical-align: sub;\n  font-size: smaller;\n}\n.reveal small {\n  display: inline-block;\n  font-size: 0.6em;\n  line-height: 1.2em;\n  vertical-align: top;\n}\n.reveal small * {\n  vertical-align: top;\n}\n.reveal img {\n  margin: var(--r-block-margin) 0;\n}\n/*********************************************\n * LINKS\n *********************************************/\n.reveal a {\n  color: var(--r-link-color);\n  text-decoration: none;\n  transition: color 0.15s ease;\n}\n.reveal a:hover {\n  color: var(--r-link-color-hover);\n  text-shadow: none;\n  border: none;\n}\n.reveal .roll span:after {\n  color: #fff;\n  background: var(--r-link-color-dark);\n}\n/*********************************************\n * Frame helper\n *********************************************/\n.reveal .r-frame {\n  border: 4px solid var(--r-main-color);\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);\n}\n.reveal a .r-frame {\n  transition: all 0.15s linear;\n}\n.reveal a:hover .r-frame {\n  border-color: var(--r-link-color);\n  box-shadow: 0 0 20px rgba(0, 0, 0, 0.55);\n}\n/*********************************************\n * NAVIGATION CONTROLS\n *********************************************/\n.reveal .controls {\n  color: var(--r-link-color);\n}\n/*********************************************\n * PROGRESS BAR\n *********************************************/\n.reveal .progress {\n  background: rgba(0, 0, 0, 0.2);\n  color: var(--r-link-color);\n}\n/*********************************************\n * PRINT BACKGROUND\n *********************************************/\n@media print {\n  .backgrounds {\n    background-color: var(--r-background-color);\n  }\n}";
class WebApp extends WebApp$1 {
  constructor() {
    super(_sfc_main);
    this.shared = new Store(this);
    this.vueApp.provide("shared", this.shared);
    console.log(JSON.stringify(this.shared.data));
  }
}
let app = new WebApp();
app.mount();
app.vueRoot.$el.style.border = "solid 0.1em";
