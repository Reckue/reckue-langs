import {Parser} from "./page/Parser";
import {DOMBuilder} from "./page/DOMBuilder";
import {Logger} from "./Logger";
import {Store} from "./core/Store";

const IS_SERVER_SIDE_PARSING_ENABLE = false;

export class RebuildPageService {

    #logger;
    #storage;
    #wordbook;

    constructor() {
        this.#logger = new Logger();
        this.#storage = new Store();
    }

    setWordbook = (wordbook) => {
        this.#wordbook = wordbook;
    }

    run = () => {
        this.#storage.isAppEnable().then(enable => {
            this.#joinPoint(enable, this.#server, this.#local);
        });
    }

    #joinPoint = (enable, serverLogic, localLogic) => {
        this.#logger.log(`Reach join point with app.enable=${enable}`);
        if (enable) {
            this.#logger.log(`isServerSideParsingEnable=${IS_SERVER_SIDE_PARSING_ENABLE}`);
            IS_SERVER_SIDE_PARSING_ENABLE ? serverLogic() : localLogic();
        }
    }

    #local = () => {
        const parser = new Parser(this.#wordbook);
        const textNodesList = parser.parsePage();
        const parsedTextNodesList = parser.textParsing(textNodesList);
        // Возможность выгрузить текущий wordbook в файл.
        // saveFile(mapToString(wordbook));
        const lang = {sl: "en", tl: "ru"};
        const builder = new DOMBuilder(lang, this.#wordbook);
        builder.rebuildPage(parsedTextNodesList);
    }

    #server = () => {
        //TODO:: Use google docs as storage
    }
}