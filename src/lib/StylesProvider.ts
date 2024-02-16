import {SizeModel} from "./SizeModel";

export class StylesProvider {

    private readonly HIDDEN_STYLES = "left:0;top:0;position:absolute;z-index:100";

    getWidthHeightBlockAttributes = (size: SizeModel) => `width:${size.width}px;height:auto`;

    buildMainAttributeStyles = (fontSize: string, fontFamily: string) => {
        return `${this.HIDDEN_STYLES};
                font-size:${fontSize};
                font-family:${fontFamily};`;
    }

    buildAttributeStyles = (mainAttributeStyles: string, widthHeightAttributes: string) : string => {
        return `${mainAttributeStyles}${widthHeightAttributes}`;
    }
}