import {Store} from "../core/Store.js";
import {Styles} from "./render/styles/Styles.js";
import {Context} from "../core/Context.js";
import {QueueProcessor} from "./queue/QueueProcessor.js";
import {Menu} from "./block/controllers/menu/Menu.js";
import {PageManager} from "./block/managers/PageManager.js";

export class PageService {

    #styles: Styles;
    #storage: Store;
    #manager: PageManager;

    constructor() {
        this.#storage = new Store();
        this.#styles = new Styles();
        Context.add("menu", new Menu());
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
    #joinPoint = (enable: boolean) => {
        if (enable) {
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