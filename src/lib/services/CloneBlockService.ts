import {CloneBlockController} from "../controllers/CloneBlockController";
import {StylesProvider} from "../provider/StylesProvider";
import {ComputedStylesController} from "../controllers/ComputedStylesController";
import {CloneBlockModel} from "../models/CloneBlockModel";
import {AttributeStylesService} from "./AttributeStylesService";
import {SizeModel} from "../models/SizeModel";

export class CloneBlockService {

    private readonly ELEMENT_TYPE_NAME = "div";

    private readonly cloneBlockController: CloneBlockController;
    private readonly computedStylesController: ComputedStylesController;
    private readonly attributeStylesService: AttributeStylesService;
    private readonly stylesProvider: StylesProvider;

    constructor() {
        this.cloneBlockController = new CloneBlockController(this.ELEMENT_TYPE_NAME);
        this.computedStylesController = new ComputedStylesController();
        this.stylesProvider = new StylesProvider();
        this.attributeStylesService = new AttributeStylesService(
            this.cloneBlockController,
            this.stylesProvider
        );
        this.cloneBlockController.setAttributeStylesService(this.attributeStylesService);
    }

    getSize = (ref: HTMLElement, text: string, refSize: SizeModel): CloneBlockModel => {
        const computedStyles = this.computedStylesController.getComputedStyles(ref);
        //this.elementExactSizeController.fillCloneStyles(computedStyles);
        this.cloneBlockController.fillCloneContent(ref.innerHTML, text);

        const sizes = this.cloneBlockController.executeInAppendTiming([
            () => {
                return this.cloneBlockController.getParameterizedSize(
                    computedStyles,
                    this.stylesProvider.getWidthHeightBlockAttributes(refSize)
                );
            },
            () => {
                return this.cloneBlockController.getParameterizedSize(
                    computedStyles,
                    this.stylesProvider.getWidthHeightInlineAttributes()
                );
            }
        ]);

        return new CloneBlockModel(sizes[0], sizes[1]);
    }
}