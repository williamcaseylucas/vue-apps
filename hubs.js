import hubsTest1 from './src/apps/HubsTest1/hubs.js'
import hubsTest2 from './src/apps/HubsTest2/hubs.js'

var myStylesheets = ['https://blairhome.ngrok.io/test-vue-app/dist/hubs.css'];
var styles = document.createElement('style')

async function loadStyles(stylesheets) {
    let arr = await Promise.all(stylesheets.map(url => fetch(url)))
    arr = await Promise.all(arr.map(url => url.text()))
    styles.textContent = arr.reduce(
        (prev, fileContents) => prev + fileContents, ''
    )
    //document.head.appendChild(style);
    // Do whatever now
}

await loadStyles(myStylesheets)

export {styles, hubsTest1, hubsTest2}