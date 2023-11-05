import {Logger} from "../core/Logger";
import {Store} from "../core/Store";
import {Styles} from "./render/styles/Styles";
import {Context} from "../core/Context";
import {QueueProcessor} from "./queue/QueueProcessor";

const IS_SERVER_SIDE_PARSING_ENABLE = false;

export class PageService {

    #logger;
    #styles;
    #storage;

    constructor() {
        this.#logger = new Logger();
        this.#storage = new Store();
        this.#styles = new Styles();
    }

    run = () => {
        this.#storage.appParams().then(enable => {
            this.#joinPoint(enable, this.#server, this.#local);
        });
    }

    /**
     * Добавляется в тег head новые css-стили.
     * Если доступен парсинг на сервере, делаем на сервере, иначе на локальной машине
     */
    #joinPoint = (enable, serverLogic, localLogic) => {
        this.#logger.log(`Reach join point with app.enable=${enable}`);
        if (enable) {
            this.#styles.append();
            this.#logger.log(`isServerSideParsingEnable=${IS_SERVER_SIDE_PARSING_ENABLE}`);
            IS_SERVER_SIDE_PARSING_ENABLE ? serverLogic() : localLogic();
        }
    }

    /**
     * Устанавливаются настройки языка
     * Запускается бесконечный процесс парсинга и рендеринга страницы локально
     */
    #local = () => {
        Context.add("language", {sl: "en", tl: "ru"});
        const processor = new QueueProcessor();
        processor.runInfinityParsing();
        processor.runInfinityRender();
    }

    /**
     * Запускается бесконечный процесс парсинга и рендеринга страницы на сервере
     */

    #server = () => {
        //TODO:: Use google docs as storage
    }
}