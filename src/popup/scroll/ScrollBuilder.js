import {ContentView} from "../../core/builder/ContentView";

export class ScrollBuilder extends ContentView {

    build = () => {
        const html = require("apply-loader!pug-loader!./templates/scroll.pug");
        const scroll = this.getHTMLMapper().toElement(html);
        this.getContent().appendChild(scroll);
    }
}