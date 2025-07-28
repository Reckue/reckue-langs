import {ApiStore} from "../core/ApiStore";
import {Styles} from "./render/styles/Styles";
import {Context} from "../core/Context";
import {QueueProcessor} from "./queue/QueueProcessor";
import {PopupController} from "./block/popup/controllers/PopupController";
import {PageManager} from "./block/PageManager";

export class ApiPageService {

    #styles: Styles;
    #storage: ApiStore;
    #manager: PageManager;

    constructor() {
        this.#storage = new ApiStore();
        this.#styles = new Styles();
        Context.add("menu", new PopupController());
        this.#manager = new PageManager();
    }

    run = async () => {
        try {
            // Проверяем авторизацию в API
            const isAuth = await this.#storage.ensureAuth();
            
            this.#storage.appParams().then(enable => {
                this.#joinPoint(enable, isAuth);
            });
        } catch (error) {
            // В случае ошибки API, запускаем в локальном режиме
            this.#storage.appParams().then(enable => {
                this.#joinPoint(enable, false);
            });
        }
    }

    /**
     * Добавляется в тег head новые css-стили.
     * Если доступен парсинг на сервере, делаем на сервере, иначе на локальной машине
     */
    #joinPoint = (enable: boolean, isApiAvailable: boolean) => {
        if (enable) {
            this.#styles.append();
            this.#manager.run();
            
            // Добавляем информацию о доступности API в контекст
            Context.add("apiAvailable", isApiAvailable);
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