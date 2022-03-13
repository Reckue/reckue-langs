import {Parser} from "./Parser";
import {DOMBuilder} from "./builder/DOMBuilder";
import {Logger} from "./Logger";
import {Store} from "./Store";

const IS_SERVER_SIDE_PARSING_ENABLE = false;

export class App {

    #logger;
    #storage;
    #wordbook;

    constructor(wordbook) {
        this.#logger = new Logger();
        this.#storage = new Store();
        this.#wordbook = wordbook;
        this.#wordbook.loadWordbooks();
    }

    start = () => {
        const timeout = this.#wordbook.getLoadTimeout();
        setTimeout(this.#logic, timeout);
    }

    #logic = () => {
        this.#storage.isAppEnable().then(enable => {
            this.#joinPoint(enable, this.#server, this.#local);
        });
    }

    #server = () => {
        //TODO:: Use google docs as storage
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

    #joinPoint = (enable, serverLogic, localLogic) => {
        this.#logger.log(`Reach join point with app.enable=${enable}`);
        if (enable) {
            this.#logger.log(`isServerSideParsingEnable=${IS_SERVER_SIDE_PARSING_ENABLE}`);
            IS_SERVER_SIDE_PARSING_ENABLE ? serverLogic() : localLogic();
        }
    }
}