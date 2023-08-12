import {enumForEach} from "../../core/enum";
import {NavbarButtons} from "../../enum/NavbarButtons";
import {selectByClass} from "../deprecated/html";
import {ContentBuilder} from "../builder/ContentBuilder";

export class NavbarBuilder extends ContentBuilder {

    #navbar;

    constructor() {
        super();
        this.#navbar = selectByClass('navbar');
    }

    buildButtons = () => {
        const getHtml = require("pug-loader!./nav-button.pug");
        enumForEach(NavbarButtons, (buttonInfo) => {
            const html = getHtml({buttonInfo});
            const button = this.getHTMLMapper().toElement(html);
            this.#navbar.appendChild(button);
        });
    }

    setContentVisibility = (className, disabled) => {
        const entry = this.getContent().getElementsByClassName(className)[0];
        entry.style.visibility = this.#getVisibility(disabled);
        entry.style.transform = this.#getTranslate(disabled);
    };

    #getVisibility = (disabled) => {
        return disabled ? 'visible' : 'hidden';
    }

    #getTranslate = (disabled) => {
        return disabled ? 'translate(0px)' : 'translate(-400px)';
    }
}