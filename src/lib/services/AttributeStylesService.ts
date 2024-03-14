import {StylesProvider} from "../provider/StylesProvider";
import {CloneBlockController as CloneBlockController} from "../controllers/CloneBlockController";

export class AttributeStylesService {

    private readonly stylesProvider: StylesProvider;
    private readonly elementExactSizeController: CloneBlockController;

    constructor(cloneBlockController: CloneBlockController, stylesProvider: StylesProvider) {
        this.stylesProvider = stylesProvider;
        this.elementExactSizeController = cloneBlockController;
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