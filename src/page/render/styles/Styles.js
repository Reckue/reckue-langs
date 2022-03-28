import {HTMLMapper} from "../../../core/HTMLMapper";

export class Styles {

    #HTMLMapper;

    constructor() {
        this.#HTMLMapper = new HTMLMapper();
    }

    append = () => {
        const html = require("apply-loader!pug-loader!./style.pug");
        const styles = this.#HTMLMapper.toElement(html);
        window.document.querySelector("head").appendChild(styles);
    }
}