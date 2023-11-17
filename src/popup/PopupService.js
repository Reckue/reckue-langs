import {SettingsService} from "./settings/SettingsService";
import {NavbarBuilder} from "./navbar/NavbarBuilder";
import {WordbookScroll} from "./scroll/WordbookScroll";
import {Context} from "../core/Context";
import {SettingsBuilder} from "./settings/SettingsBuilder";
import {NavButtons} from "./navbar/NavButtons";
import {ScrollBuilder} from "./scroll/ScrollBuilder";
import {InfoBarBuilder} from "./info/InfoBarBuilder";

export class PopupService {

    #navbarBuilder;
    #settingsBuilder;
    #scrollBuilder;
    #infoBarBuilder;

    constructor() {
        this.#settingsBuilder = new SettingsBuilder();
        this.#navbarBuilder = new NavbarBuilder();
        this.#scrollBuilder = new ScrollBuilder();
        this.#infoBarBuilder = new InfoBarBuilder();
    }

    run = () => {
        this.#buildPopupDOM();
        const settings = new SettingsService();
        settings.fillSettings();
        const scroll = new WordbookScroll();
        scroll.fillScroll(0);
        this.#setupNavButtons();
    }

    #buildPopupDOM = () => {
        this.#navbarBuilder.buildButtons();
        this.#settingsBuilder.buildSettingsContentStructure();
        this.#scrollBuilder.build();
    }

    #setupNavButtons = () => {
        const navButtons = new NavButtons();
        navButtons.onClickNavButtons();
        navButtons.checkButtonsAndSetContentVisibility();
    }
}