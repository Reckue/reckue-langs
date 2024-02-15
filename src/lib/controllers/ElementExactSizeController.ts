import {SizeModel} from "../models/SizeModel";
import {AttributeStylesService} from "../services/AttributeStylesService";

export class ElementExactSizeController {

    private cloneRef: HTMLElement;
    private attributeStylesService: AttributeStylesService;

    constructor(tagName: string) {
        this.cloneRef = document.createElement(tagName);
    }

    executeInAppendTiming = (executeList: Array<Function>): Array<SizeModel> => {
        parent.document.body.appendChild(this.cloneRef);

        const result: Array<SizeModel> = executeList.map((execute) => execute());

        parent.document.body.removeChild(this.cloneRef);

        return result;
    }

    setAttributeStylesService(attributeStylesService: AttributeStylesService) {
        this.attributeStylesService = attributeStylesService;
    }

    getParameterizedSize = (computedStyles: CSSStyleDeclaration, attributes: string) => {
        this.attributeStylesService.fillCloneAttributeStyles(
            computedStyles,
            attributes
        );
        return this.buildSize();
    }

    appendAttributeStyles = (attributeStyles: string) => {
        this.cloneRef.setAttribute('style', attributeStyles);
    }

    fillCloneContent(html: string, text: string) {
        //this.#ref.innerHTML
        this.cloneRef.innerHTML = html;
        this.cloneRef.innerText = text;
    }

    // fillCloneStyles = (computedStyles: CSSStyleDeclaration) => {
    //     this.cloneRef.style = computedStyles;
    // }

    buildSize = () => {
        return new SizeModel(this.cloneRef.offsetWidth, this.cloneRef.offsetHeight);
    }
}