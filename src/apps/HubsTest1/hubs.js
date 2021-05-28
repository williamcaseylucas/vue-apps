import App from "./AppTest1.vue";
import { HubsApp } from "../HubsApp";
import { createStore } from 'vuex'

export class HubsTest1 extends HubsApp {
    constructor (width, height) {
        super(width, height, App)
        this.isInteractive = true;
        this.isNetworked = true;
        
        let app = this; // so we can reference it in the methods below
        // Create a new store instance.
        this.store = createStore({
            state: { 
                count: 0
            },
            mutations: {
                setCount (state, count) {
                  state.count = count;  
                }
            },
            actions: {
                increment (context) {
                    if (app.takeOwnership()) {
                        console.log (JSON.stringify(context.state))
                        context.commit('setCount', context.state.count+1)
                        console.log (JSON.stringify(context.state))

                        app.setSharedData(context.state)
                    }
                }
            }
        })
        console.log (JSON.stringify(this.store.state))

        this.vueApp.use(this.store)
    }
    
    updateSharedData(dataObject) {
        // need to update the elements within the store, because otherwise
        // the data won't flow to the components
        this.store.commit("setCount", dataObject.count)
    }

    getSharedData() {
        return this.store.state;
    }
}

var init = function () {
    let app = new HubsTest1(2, 2.25)
    app.mount()
    return app
}

export default init
