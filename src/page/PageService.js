import {Parser} from "./parser/Parser";
import {DOMBuilder} from "./render/DOMBuilder";
import {Logger} from "../core/Logger";
import {Store} from "../core/Store";
import {Styles} from "./render/styles/Styles";
import {Context} from "../core/Context";

const IS_SERVER_SIDE_PARSING_ENABLE = false;

export class PageService {

    #context;
    #logger;
    #styles;
    #storage;

    constructor() {
        this.#context = new Context();
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
        const textBlocks = parser.parsePage();
        const words = parser.textBlocksParsing(textBlocks);
        const lang = {sl: "en", tl: "ru"};
        const builder = new DOMBuilder(lang);
        builder.rebuildPage(words);
    }

    #server = () => {
        //TODO:: Use google docs as storage
    }
}