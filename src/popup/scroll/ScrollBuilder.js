import {ContentBuilder} from "../builder/ContentBuilder";

export class ScrollBuilder extends ContentBuilder {

    build = () => {
        const html = require("apply-loader!pug-loader!./templates/scroll.pug");
        const scroll = this.getHTMLMapper().toElement(html);
        this.getContent().appendChild(scroll);
    }
}