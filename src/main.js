import { createApp } from 'vue'
import App from './apps/AppText.vue'

import hubs from './hubs.js'
import hubs2 from './hubs2.js'

createApp(App).mount('#app')

console.log("hubs width" + hubs.width)
console.log("hubs2 width" + hubs2.width)