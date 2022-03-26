export class Container {

    #ref;

    constructor(parent) {
        const html = require("apply-loader!styles-loader!./div.pug");
        const template = window.document.createElement("div");
        template.innerHTML = html.trim();
        this.#ref = template.firstChild;

        parent.appendChild(this.#ref);
    }

    getRef = () => {
        return this.#ref;
    }

    setStyle = (name, value) => {
        this.#ref.style[name] = value;
    }
}