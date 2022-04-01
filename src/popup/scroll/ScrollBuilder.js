import {ContentBuilder} from "../builder/ContentBuilder";

export class ScrollBuilder extends ContentBuilder {

    build = () => {
        const html = require("apply-loader!pug-loader!./scroll.pug");
        const settings = this.getHTMLMapper().toElement(html);
        this.getContent().appendChild(settings);
    }
}