var loaded = false;

let loadStyles = function () {
    if (loaded) return;

    loaded = true;

    // var css = "@import url('../../../node_modules/reveal.js/dist/reveal.css');\n@import url('../../../node_modules/reveal.js/dist/theme/white.css');\n";

    // var link = document.createElement('link');
    // link.rel = "stylesheet";
    // link.type = "text/css";
    // link.href = "https://resources.realitymedia.digital/vue-apps/dist/public/reveal.css";
    // document.head.appendChild(link);

    // link = document.createElement('link');
    // link.rel = "stylesheet";
    // link.type = "text/css";
    // link.href = "https://resources.realitymedia.digital/vue-apps/dist/public/theme/white.css";
    // document.head.appendChild(link);

    // // var style = document.createElement('style');
    // style.type = 'text/css';

    // document.head.appendChild(style);

    // style.appendChild(document.createTextNode(css));  
}

export default loadStyles;