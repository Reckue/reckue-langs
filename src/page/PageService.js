import {Logger} from "../core/Logger";
import {Store} from "../core/Store";
import {Styles} from "./render/styles/Styles";
import {Context} from "../core/Context";
import {QueueProcessor} from "./queue/QueueProcessor";
import {Menu} from "./render/menu/Menu";
import {PageManager} from "./block/manager/PageManager";

export class PageService {

    #logger;
    #styles;
    #storage;
    #manager;

    constructor() {
        this.#logger = new Logger();
        this.#storage = new Store();
        this.#styles = new Styles();
        this.#manager = new PageManager();
    }

    run = () => {
        this.#storage.appParams().then(enable => {
            this.#joinPoint(enable);
        });
    }

    /**
     * Добавляется в тег head новые css-стили.
     * Если доступен парсинг на сервере, делаем на сервере, иначе на локальной машине
     */
    #joinPoint = (enable) => {
        if (enable) {
            Context.add("menu", new Menu());
            this.#styles.append();
            this.#manager.run();
        }
    }

    /**
     * Устанавливаются настройки языка
     * Запускается бесконечный процесс парсинга и рендеринга страницы локально
     */
    #old = () => {
        Context.add("language", {sl: "en", tl: "ru"});
        const processor = new QueueProcessor();
        processor.runInfinityParsing();
        processor.runInfinityRender();
    }
}