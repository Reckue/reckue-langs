import {ContentBuilder} from "../builder/ContentBuilder";


export class SettingsBuilder extends ContentBuilder {

    #levers;

    buildSettingsContentStructure = () => {
        const templateLoader = require("pug-loader!./template/settings.pug");
        const html = templateLoader();
        const settings = this.getHTMLMapper().toElement(html);
        this.getContent().appendChild(settings);
        const block = this.getContent().getElementsByClassName("block")[0];
        this.appendSlider(block, {id: "russian", title: "Russian"})
        this.appendSlider(block, {id: "korean", title: "Korean"})
        this.appendSlider(block, {id: "english", title: "English"})
        this.appendSlider(block, {id: "china", title: "China"})

    }

    appendSlider = (parent, language) => {
        const templateLoader = require("pug-loader!./template/slider.pug");
        const html = templateLoader({language});
        const slider = this.getHTMLMapper().toElement(html);
        parent.appendChild(slider);
    }
    loadLevers = () => {
        this.#levers = window.document.getElementsByClassName('lever');
    }

    setupAppEnableLever = (changeEnable) => {
        this.#setupLever(this.#levers[0], changeEnable, "enable");
    }

    renderAppEnableLever = (enable) => {
        this.renderLever(this.#levers[0], enable);
    };

    setupRussianEnableLever = (changeEnable) => {
        this.#setupLever(this.#levers[1], changeEnable, "russian");
    }

    renderRussianEnableLever = (enable) => {
        this.renderLever(this.#levers[1], enable);
    };

    setupKoreanEnableLever = (changeEnable) => {
        this.#setupLever(this.#levers[2], changeEnable, "korean");
    }

    renderKoreanEnableLever = (enable) => {
        this.renderLever(this.#levers[2], enable);
    };

    setupEnglishEnableLever = (changeEnable) => {
        this.#setupLever(this.#levers[3], changeEnable, "english");
    }

    renderEnglishEnableLever = (enable) => {
        this.renderLever(this.#levers[3], enable);
    };

    setupChinaEnableLever = (changeEnable) => {
        this.#setupLever(this.#levers[4], changeEnable, "china");
    }

    renderChinaEnableLever = (enable) => {
        this.renderLever(this.#levers[4], enable);
    };

    #setupLever = (lever, changeEnable, name) => {
        lever.addEventListener('click', () => changeEnable(lever, name));
    }

    renderLever = (lever, enable) => {
        lever.style.justifyContent = enable ? 'flex-end' : 'flex-start';
        lever.style.background = enable ? '#c2d7bf' : '#ffffff';
    }

}
