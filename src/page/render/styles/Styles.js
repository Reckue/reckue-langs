import {HTMLMapper} from "../../../core/HTMLMapper";
// CSS подключается как сырой текст (webpack asset/source), раньше — через style.pug.
import css from "./style.css";

export class Styles {

    #HTMLMapper;

    constructor() {
        this.#HTMLMapper = new HTMLMapper();
    }

    append = () => {
        const styles = this.#HTMLMapper.toElement(`<style>${css}</style>`);
        window.document.querySelector("head").appendChild(styles);
    }
}