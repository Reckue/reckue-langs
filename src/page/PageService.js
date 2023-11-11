import {Logger} from "../core/Logger";
import {Store} from "../core/Store";
import {Styles} from "./render/styles/Styles";
import {Context} from "../core/Context";
import {QueueProcessor} from "./queue/QueueProcessor";
import {Menu} from "./render/menu/Menu";
import {Parser} from "./realtime/parser/Parser";

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
        this.#storage.appParams().then(enable => {
            this.#joinPoint(enable, this.#server, this.#local);
        });
    }

    #joinPoint = (enable, serverLogic, localLogic) => {
        Context.add("menu", new Menu());
        Context.add("language", {sl: "en", tl: "ru"});
        this.#styles.append();
        addEventListener("mousemove", serverLogic);
        // this.#logger.log(`Reach join point with app.enable=${enable}`);
        // if (enable) {
        //     this.#styles.append();
        //     this.#logger.log(`isServerSideParsingEnable=${IS_SERVER_SIDE_PARSING_ENABLE}`);
        //     IS_SERVER_SIDE_PARSING_ENABLE ? serverLogic() : localLogic();
        // }
    }

    #local = () => {
        Context.add("language", {sl: "en", tl: "ru"});
        const processor = new QueueProcessor();
        processor.runInfinityParsing();
        processor.runInfinityRender();
    }

    #draw;

    #server = (event) => {
        console.log(event)
        const parser = new Parser(event);
        const word = parser.getWord();
        const popup = Context.get("menu");
        const ref = window.document.querySelector(".page-popup-menu");
        const width = ref.offsetWidth
        const height = ref.offsetHeight
        const netGraph = parser.getNetGraph();
        popup.displayOn();
        popup.setContent(word, netGraph);
        popup.setPosition(window.innerWidth - width, window.innerHeight - height);

        if (this.#draw) {
            window.document.body.removeChild(this.#draw);
        }
        this.#draw = window.document.createElement("div");
        this.#draw.style.left = `${netGraph.block.x}px`;
        this.#draw.style.top = `${netGraph.block.y}px`;
        this.#draw.style.width = `${netGraph.block.width}px`;
        this.#draw.style.height = `${netGraph.block.height}px`;
        this.#draw.style.position = "absolute";
        this.#draw.style.background = "red";
        this.#draw.style.zIndex = "1000";
        this.#draw.style.opacity = "0.25";
        this.#draw.style.pointerEvents = "none";
        window.document.body.appendChild(this.#draw);

        //Context.get("wordbook").set([{word: word[0], level: Levels.BEGINNER.name}]);
    }
}