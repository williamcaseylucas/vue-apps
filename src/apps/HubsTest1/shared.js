import { reactive, readonly } from "vue";

export default class Store {
    constructor(app) {
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
    
    updateSharedData(dataObject) {
        // need to update the elements within the state, because otherwise
        // the data won't flow to the components
        this._state.count = dataObject.count
    }
}
