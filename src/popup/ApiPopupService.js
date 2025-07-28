import {SettingsService} from "./settings/SettingsService";
import {NavbarBuilder} from "./navbar/NavbarBuilder";
import {WordbookScroll} from "./scroll/WordbookScroll";
import {Context} from "../core/Context";
import {SettingsBuilder} from "./settings/SettingsBuilder";
import {NavButtons} from "./navbar/NavButtons";
import {ScrollBuilder} from "./scroll/ScrollBuilder";
import {InfoBarBuilder} from "./info/InfoBarBuilder";
import {ApiStore} from "../core/ApiStore";

export class ApiPopupService {

    #navbarBuilder;
    #settingsBuilder;
    #scrollBuilder;
    #infoBarBuilder;
    #apiStore;

    constructor() {
        this.#settingsBuilder = new SettingsBuilder();
        this.#navbarBuilder = new NavbarBuilder();
        this.#scrollBuilder = new ScrollBuilder();
        this.#infoBarBuilder = new InfoBarBuilder();
        this.#apiStore = new ApiStore();
    }

    run = async () => {
        try {
            // Проверяем авторизацию в API
            const isAuth = await this.#apiStore.ensureAuth();
            Context.add("apiAvailable", isAuth);
            
            if (isAuth) {
                // Получаем информацию о пользователе
                const user = await this.#apiStore.getCurrentUser();
                Context.add("currentUser", user);
            }
        } catch (error) {
            Context.add("apiAvailable", false);
        }

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