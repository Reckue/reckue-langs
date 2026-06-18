import {AbstractView} from "../../../../core/builder/AbstractView";

export abstract class AbstractContainerView extends AbstractView {

    #ref;

    protected constructor(parent: HTMLElement) {
        super();
        this.#ref = this.getHTMLMapper().toElement('<div class="menu-container"></div>');
        parent.appendChild(this.#ref);
    }

    setRef = (ref: HTMLElement) => {
        this.#ref = ref;
    }

    getRef = (): HTMLElement => {
        return this.#ref;
    }
}