import {Logger} from "../core/Logger";
import {ApiSettingsService} from "../core/api/ApiSettingsService.js";
import {Styles} from "./render/styles/Styles";
import {Context} from "../core/Context";
import {QueueProcessor} from "./queue/QueueProcessor";

const IS_SERVER_SIDE_PARSING_ENABLE = false;

export class PageService {

    #logger;
    #styles;
    #settingsService;

    constructor() {
        this.#logger = new Logger();
        this.#settingsService = new ApiSettingsService();
        this.#styles = new Styles();
    }

    run = async () => {
        try {
            // Инициализируем API сервис настроек
            await this.#settingsService.initialize();
            
            // Добавляем настройки в контекст для использования в UnicodeLanguages
            const settings = this.#settingsService.getSettings();
            Context.add("settings", settings);
            
            const enable = this.#settingsService.isEnabled();
            this.#joinPoint(enable, this.#server, this.#local);
        } catch (error) {
            this.#logger.log(`PageService initialization failed: ${error.message}`);
            // Fallback на дефолтные настройки
            const defaultSettings = {
                enable: true, 
                russian: true, 
                english: true, 
                china: false, 
                korean: true
            };
            Context.add("settings", defaultSettings);
            // Fallback на отключенное состояние
            this.#joinPoint(false, this.#server, this.#local);
        }
    }

    #joinPoint = (enable, serverLogic, localLogic) => {
        this.#logger.log(`Reach join point with app.enable=${enable}`);
        if (enable) {
            this.#styles.append();
            this.#logger.log(`isServerSideParsingEnable=${IS_SERVER_SIDE_PARSING_ENABLE}`);
            IS_SERVER_SIDE_PARSING_ENABLE ? serverLogic() : localLogic();
        }
    }

    #local = () => {
        Context.add("language", {sl: "en", tl: "ru"});
        const processor = new QueueProcessor();
        processor.runInfinityParsing();
        processor.runInfinityRender();
    }

    #server = () => {
        //TODO:: Use google docs as storage
    }
}