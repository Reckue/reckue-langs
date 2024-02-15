import {ElementExactSizeController} from "../controllers/ElementExactSizeController";
import {StylesProvider} from "../provider/StylesProvider";
import {ComputedStylesController} from "../controllers/ComputedStylesController";
import {ExactSizesModel} from "../models/ExactSizesModel";
import {AttributeStylesService} from "./AttributeStylesService";
import {SizeModel} from "../models/SizeModel";

export class ElementExactSizeService {

    private readonly ELEMENT_TYPE_NAME = "div";

    private readonly elementExactSizeController: ElementExactSizeController;
    private readonly computedStylesController: ComputedStylesController;
    private readonly attributeStylesService: AttributeStylesService;
    private readonly stylesProvider: StylesProvider;

    constructor() {
        this.elementExactSizeController = new ElementExactSizeController(this.ELEMENT_TYPE_NAME);
        this.computedStylesController = new ComputedStylesController();
        this.stylesProvider = new StylesProvider();
        this.attributeStylesService = new AttributeStylesService(
            this.elementExactSizeController,
            this.stylesProvider
        );
        this.elementExactSizeController.setAttributeStylesService(this.attributeStylesService);
    }

    getSize = (ref: HTMLElement, text: string, refSize: SizeModel): ExactSizesModel => {
        const computedStyles = this.computedStylesController.getComputedStyles(ref);
        //this.elementExactSizeController.fillCloneStyles(computedStyles);
        this.elementExactSizeController.fillCloneContent(ref.innerHTML, text);

        const sizes = this.elementExactSizeController.executeInAppendTiming([
            () => {
                return this.elementExactSizeController.getParameterizedSize(
                    computedStyles,
                    this.stylesProvider.getWidthHeightBlockAttributes(refSize)
                );
            },
            () => {
                return this.elementExactSizeController.getParameterizedSize(
                    computedStyles,
                    this.stylesProvider.getWidthHeightInlineAttributes()
                );
            }
        ]);

        return new ExactSizesModel(sizes[0], sizes[1]);
    }
}