export class HubsApp {
    constructor (styles, width, height) {
        this.headDiv = document.createElement("div")
        this.styleDiv  = document.createElement("div");
        this.appDiv  = document.createElement("div")
        this.shadow  = this.headDiv.attachShadow({mode: 'open'});
    
        this.headDiv.style.position = "absolute";
        this.headDiv.style.left = -10000+'px';
        this.headDiv.style.top = 0+'px';
        
        var style = document.createElement('style')
        style.textContent = styles;

        this.styleDiv.appendChild(style)
        this.styleDiv.appendChild(this.appDiv)
        this.shadow.appendChild(this.styleDiv)
    
        document.body.appendChild(this.headDiv)

        this.width = width
        this.height = height
    }
}