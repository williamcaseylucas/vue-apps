import { createApp } from 'vue'
import { createStore } from 'vuex'

import App from './AppText.vue'

// Create a new store instance.
const store = createStore({
      state () {
        return {
          count: 0
        }
      },
      mutations: {
          setCount (state, count) {
            state.count = count;  
          }
      },
      actions: {
          increment (context) {
             context.commit('setCount', context.state.count+1)
          }
      }
  })

let app = createApp(App)
app.use(store)
app.mount('#app')

app.$el.style.border = "solid 0.1em"