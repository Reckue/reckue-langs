import {Parser} from "./parser/Parser";
import {DOMBuilder} from "./parser/DOMBuilder";
import {Logger} from "../core/Logger";
import {Store} from "../core/Store";
import {Styles} from "./styles/Styles";

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
        this.#storage.isAppEnable().then(enable => {
            this.#joinPoint(enable, this.#server, this.#local);
        });
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