import "./vendor.js";
import "three";
var NetworkedHelloWorld_vue_vue_type_style_index_0_scoped_true_lang = "";
var top = "";
var room = "";
async function logAndFollow(id, url) {
  await window.APP.scene.systems["data-logging"].logClick(id, url);
  if (url.length > 0) {
    window.open(url, "_blank");
  }
}
window.APP.utils.followLinkClick = function(event) {
  var url = "";
  event.preventDefault();
  if (event.target instanceof HTMLElement) {
    if (event.target instanceof HTMLAnchorElement) {
      url = event.target.href;
    } else if (event.target instanceof HTMLSpanElement) {
      let child = event.target.childNodes[0];
      if (child instanceof HTMLAnchorElement) {
        url = child.href;
      }
    }
    logAndFollow(event.target.id, url);
  }
};
var HelloWorld_vue_vue_type_style_index_0_scoped_true_lang = "";
var App_vue_vue_type_style_index_0_scoped_true_lang$1 = "";
var App_vue_vue_type_style_index_0_scoped_true_lang = "";
