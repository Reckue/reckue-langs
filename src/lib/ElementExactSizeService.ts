import {ElementExactSizeController} from "./ElementExactSizeController";
import {StylesProvider} from "./StylesProvider";

export class ElementExactSizeService {

    private readonly ELEMENT_TYPE_NAME = "div";

    private readonly elementExactSizeController: ElementExactSizeController;
    private readonly stylesProvider: StylesProvider;

    constructor() {
        this.elementExactSizeController = new ElementExactSizeController(this.ELEMENT_TYPE_NAME);
    }

    getSize = () => {

    }

    #fillCloneAttributeStyles = (computedStyles: CSSStyleDeclaration, widthHeightAttributes: string) => {

        const fontSize = computedStyles["fontSize"];
        const fontFamily = computedStyles["fontFamily"];

        const mainAttributeStyles = this.stylesProvider.buildMainAttributeStyles(
            fontSize,
            fontFamily
        );

        const attributeStyles = this.stylesProvider.buildAttributeStyles(
            mainAttributeStyles,
            widthHeightAttributes
        );

        this.elementExactSizeController.appendAttributeStyles(
            attributeStyles
        );
    }
}