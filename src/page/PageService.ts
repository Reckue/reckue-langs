import {Store} from "../core/Store";
import {Styles} from "./render/styles/Styles";
import {PageManager} from "./PageManager";

export class PageService {

    #styles: Styles;
    #storage: Store;
    #manager: PageManager;

    constructor() {
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
    #joinPoint = (enable: boolean) => {
        if (enable) {
            this.#styles.append();
            this.#manager.run();
        }
    }
}