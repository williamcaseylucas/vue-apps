import { reactive, readonly } from "vue";
import VueApp from "../VueApp";

export interface data {
    close: number
}

export class Store {
    _state: data
    state: data
    app: VueApp

    constructor(app: VueApp) {
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
