import {Builder} from "../../../../popup/builder/Builder";

export class BaseBlock extends Builder {

    #ref;

    constructor(parent) {
        super();
        const html = require("apply-loader!pug-loader!./templates/container.pug");
        this.#ref = this.getHTMLMapper().toElement(html);
        parent.appendChild(this.#ref);
    }

    setRef = (ref) => {
        this.#ref = ref;
    }

    getRef = () => {
        return this.#ref;
    }
}