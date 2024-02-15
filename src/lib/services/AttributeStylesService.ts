import {StylesProvider} from "../provider/StylesProvider";
import {ElementExactSizeController} from "../controllers/ElementExactSizeController";

export class AttributeStylesService {

    private readonly stylesProvider: StylesProvider;
    private readonly elementExactSizeController: ElementExactSizeController;

    constructor(elementExactSizeController: ElementExactSizeController, stylesProvider: StylesProvider) {
        this.stylesProvider = stylesProvider;
        this.elementExactSizeController = elementExactSizeController;
    }

    fillCloneAttributeStyles = (computedStyles: CSSStyleDeclaration, widthHeightAttributes: string) => {

        const fontSize = computedStyles["fontSize"];
        const fontFamily = computedStyles["fontFamily"];

        const attributeStyles = this.stylesProvider.buildAttributeStyles(
            fontSize,
            fontFamily,
            widthHeightAttributes
        );

        this.elementExactSizeController.appendAttributeStyles(
            attributeStyles
        );
    }
}