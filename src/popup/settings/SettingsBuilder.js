import {ContentBuilder} from "../builder/ContentBuilder";

export class SettingsBuilder extends ContentBuilder {

    #lever;

    buildSettingsContentStructure = () => {
        const html = require("apply-loader!pug-loader!./settings.pug");
        const settings = this.getHTMLMapper().toElement(html);
        this.getContent().appendChild(settings);
    }

    setupAppEnableLever = (changeEnable) => {
        this.#lever = window.document.getElementsByClassName('lever')[0];
        this.#lever.addEventListener('click', () => changeEnable());
    }

    renderEnableLever = (enable) => {
        this.#lever.style.justifyContent = enable ? 'flex-start' : 'flex-end';
        this.#lever.style.background = enable ? '#c2d7bf' : '#d7d7d7';
    };
}