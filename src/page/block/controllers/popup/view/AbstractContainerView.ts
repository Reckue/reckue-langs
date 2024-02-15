import {AbstractView} from "../../../../../core/builder/AbstractView";

export abstract class AbstractContainerView extends AbstractView {

    #ref;

    protected constructor(parent: HTMLElement) {
        super();
        const html = require("apply-loader!pug-loader!../templates/container.pug");
        this.#ref = this.getHTMLMapper().toElement(html);
        parent.appendChild(this.#ref);
    }

    setRef = (ref: HTMLElement) => {
        this.#ref = ref;
    }

    getRef = (): HTMLElement => {
        return this.#ref;
    }
}