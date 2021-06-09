import { reactive, inject, readonly } from "vue";

export default class Store {
    constructor(app) {
        this._state = reactive({
            slide: 0
        })
        this.app = app
        this.state = readonly(this._state)
    }    

    next() {
        if (this._state.slide == 2) return
        if (this.app.takeOwnership()) {
            this._state.slide++;
            this.app.setSharedData(this.state)
        }
    }

    prev() {
        if (this._state.slide == 0) return

        if (this.app.takeOwnership()) {
            this._state.slide--;
            this.app.setSharedData(this.state)
        }
    }
    
    updateSharedData(dataObject) {
        // need to update the elements within the state, because otherwise
        // the data won't flow to the components
        this._state.slide = dataObject.slide
    }
}
