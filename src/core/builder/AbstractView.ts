import {HTMLMapper} from "../HTMLMapper";

export abstract class AbstractView {

    private readonly HTMLMapper;

    protected constructor() {
        this.HTMLMapper = new HTMLMapper();
    }

    protected getHTMLMapper = () => {
        return this.HTMLMapper;
    }
}