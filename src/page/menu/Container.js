export class Container {

    #ref;

    constructor(parent) {
        const html = require("apply-loader!pug-loader!./div.pug");
        const template = window.document.createElement("div");
        template.innerHTML = html.trim();
        window.document.querySelector("head").appendChild(template.firstChild);
        this.#ref = template.lastChild;

        parent.appendChild(this.#ref);
    }

    getRef = () => {
        return this.#ref;
    }

    setStyle = (name, value) => {
        this.#ref.style[name] = value;
    }
}