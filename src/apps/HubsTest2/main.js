import { createApp } from 'vue'
import App from './AppTest2.vue'

let app = createApp(App)
app.mount('#app')

app.$el.style.border = "solid 0.1em"