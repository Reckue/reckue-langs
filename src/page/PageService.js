import {Parser} from "./parser/Parser";
import {DOMBuilder} from "./parser/DOMBuilder";
import {Logger} from "../core/Logger";
import {Store} from "../core/Store";
import {Context} from "../core/Context";

const IS_SERVER_SIDE_PARSING_ENABLE = false;

export class PageService {

    #logger;
    #storage;

    constructor() {
        this.#logger = new Logger();
        this.#storage = new Store();
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
        const parser = new Parser();
        const textNodesList = parser.parsePage();
        const parsedTextNodesList = parser.textParsing(textNodesList);
        // Возможность выгрузить текущий wordbook в файл.
        // saveFile(mapToString(wordbook));
        const lang = {sl: "en", tl: "ru"};
        const builder = new DOMBuilder(lang);
        builder.rebuildPage(parsedTextNodesList);
    }

    #server = () => {
        //TODO:: Use google docs as storage
    }
}