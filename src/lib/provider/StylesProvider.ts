import {SizeModel} from "../models/SizeModel";

export class StylesProvider {

    private readonly HIDDEN_STYLES = "left:0;top:0;position:absolute;z-index:100";

    buildAttributeStyles = (fontSize: string, fontFamily: string, widthHeightAttributes: string) : string => {
        const mainAttributeStyles = `${this.HIDDEN_STYLES};font-size:${fontSize};font-family:${fontFamily};`;
        return `${mainAttributeStyles}${widthHeightAttributes}`;
    }

    getWidthHeightInlineAttributes = () => "height:auto;width:auto";

    getWidthHeightBlockAttributes = (size: SizeModel) => `width:${size.width}px;height:auto`;
}