import { reactive, readonly } from "vue";
import VueApp from "../../VueApp";

export interface data {
    count: number
}

export class Store {
    _state: data
    state: data
    app: VueApp
    constructor(app: VueApp) {
        this._state = reactive({
            count: 0
        })
        this.app = app
        this.state = readonly(this._state)
    }    

    increment() {
        if (this.app.takeOwnership()) {
            this._state.count++;
            this.app.setSharedData(this.state)
        }
    }
    
    updateSharedData(dataObject: data) {
        // need to update the elements within the state, because otherwise
        // the data won't flow to the components
        this._state.count = dataObject.count
    }
}