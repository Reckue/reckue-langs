import {Store} from "../core/Store";
import {Styles} from "./render/styles/Styles";
import {Context} from "../core/Context";
import {QueueProcessor} from "./queue/QueueProcessor";
import {PopupController} from "./block/controllers/PopupController";
import {PageManager} from "./block/managers/PageManager";

export class PageService {

    #styles: Styles;
    #storage: Store;
    #manager: PageManager;

    constructor() {
        this.#storage = new Store();
        this.#styles = new Styles();
        Context.add("menu", new PopupController());
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