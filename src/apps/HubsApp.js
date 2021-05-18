export class HubsApp {
    constructor (styles, width, height) {
        this.headDiv = document.createElement("div")
        this.styleDiv  = document.createElement("div");
        this.appDiv  = document.createElement("div")
        this.shadow  = this.headDiv.attachShadow({mode: 'open'});
    
        this.styleDiv.appendChild(styles)
        this.styleDiv.appendChild(this.appDiv)
        this.shadow.appendChild(this.styleDiv)
    
        this.width = width
        this.height = height
    }
}