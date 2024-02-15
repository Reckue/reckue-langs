import {FocusBlockModel} from "../../realtime/blocks/FocusBlockModel";
import {BlockHighlighting} from "../../realtime/highlighting/BlockHighlighting";
import {TextBlocks} from "../../realtime/blocks/TextBlocks";
import {CacheModel} from "./CacheModel";
import {Parser} from "../../realtime/parser/Parser";
import {Context} from "../../../core/Context";
import {CacheProvider} from "./CacheProvider";



export class PageManager {

    #cacheProvider;

    constructor() {
        this.#cacheProvider = new CacheProvider();
    }

    run = () => {
        addEventListener("click", this.onclick);
        addEventListener("mousemove", this.onmousemove);
        addEventListener("scroll", this.onmousemove);
    }

    onclick = (event) => {
        let cache = this.#cacheProvider.getCache(event);
        if (cache) {
            const positions = cache.getTextBlocks().getPositions();
            let counter = 0;
            while (positions[counter] && positions[counter].y < event.offsetY) {
                counter++;
            }
            const parser = new Parser(event, cache.getTextBlocks());
            const word = parser.getWord();
            const popup = Context.get("menu");
            const ref = window.document.querySelector(".page-popup-menu");
            const netGraph = parser.getNetGraph();
            popup.displayOn();
            popup.setContent(word, netGraph);
            popup.setPosition(window.innerWidth - ref.offsetWidth, window.innerHeight - ref.offsetHeight - 20);
        }
    }

    onmousemove = (event) => {
        this.#cacheProvider.validateNoneBlackListElement(event, () => {
            let cache = this.#cacheProvider.getOrUpdateCache(event);

            const highlighting = new BlockHighlighting(
                cache.getFocusBlock(),
                cache.getTextBlocks()
            );

            highlighting.draw();

            this.onclick(event);
        });
    }
}