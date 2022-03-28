import {HTMLMapper} from "../../core/HTMLMapper";

export class BaseBlock {

    #HTMLMapper;
    #ref;

    constructor(parent) {
        this.#HTMLMapper = new HTMLMapper();
        const html = require("apply-loader!pug-loader!./container.pug");
        this.#ref = this.#HTMLMapper.toElement(html);
        parent.appendChild(this.#ref);
    }

    setRef = (ref) => {
        this.#ref = ref;
    }

    getRef = () => {
        return this.#ref;
    }

    setStyle = (name, value) => {
        this.#ref.style[name] = value;
    }

    mapper = () => {
        return this.#HTMLMapper;
    }
}