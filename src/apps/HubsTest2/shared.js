import { reactive, readonly } from "vue";

export default class Store {
    constructor(app) {
        this._state = reactive({
            close: 0
        })
        this.app = app
        this.state = readonly(this._state)
    }    

    setClose(c) {
        if (this._state.close != c) {
            this._state.close = c;
        }
    } 
}
