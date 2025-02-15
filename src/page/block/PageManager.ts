import {BlockHighlighting} from "../realtime/highlighting/BlockHighlighting";
import {CacheManager} from "./cache/CacheManager";
import {PopupManager} from "./popup/PopupManager";
import {CacheModel} from "./cache/models/CacheModel";
import {wordService} from "../realtime/parser/services/WordService";
import {HighlightingService} from "./highlighting/HighlightingService";
import { CloneBlockModel } from "../../lib/models/CloneBlockModel";
import { CloneBlockService } from "../../lib/services/CloneBlockService";
import { getSize } from "../realtime/parser/services/BlockService";
import { TextBlockModel } from "../realtime/blocks/TextBlockModel";
import { TextBlocks } from "../realtime/blocks/TextBlocks";
import { CursorModel } from "../realtime/parser/models/CursorModel";
import { ParserService } from "../realtime/parser/services/ParserService";
import { IndexService } from "./IndexService";


export class PageManager {

    private readonly cacheManager: CacheManager;
    private readonly popupManager: PopupManager;
    private readonly highlightingService: HighlightingService;
    private cloneBlockService : CloneBlockService;
    private indexService: IndexService;

    constructor() {
        this.cacheManager = new CacheManager();
        this.popupManager = new PopupManager("menu");
        this.highlightingService = new HighlightingService();
        this.cloneBlockService = new CloneBlockService();
        this.indexService = new IndexService()
    }

    run = () => {
        // addEventListener("click", this.onclick);
        // addEventListener("mousemove", this.onmousemove);
        // addEventListener("scroll", this.onmousemove);
        //last child dom element
        const span = document.querySelector('.hgKElc')
        const sentence = span.querySelector('b')
        const text = sentence.innerText
        const wordsArray = text.split(' ')
        const textToSpan = (text: string) => {
            sentence.innerHTML = sentence.innerHTML.replace(text, `<span id="1">${text}</span>`)
            sentence.style.border = "1px solid black";
        }
        // 0,5,0 манифест либо раньше
        wordsArray.map((text) => textToSpan(text))
        console.log(wordsArray)

    }
    // const nodes = span.childNodes
    // for (let i = 0; i < nodes.length; i++) {
    //   const item = nodes[i];
    //     if (item.innerHTML == undefined) {
    //         const split = item.textContent.split(' ')
    //         console.log(split)
    //     }
    // }
    // onclick = (event: MouseEvent) => {
    //     let cache: CacheModel = this.cacheManager.getCache(event);
    //     if (cache) {
    //     }
    // }

    // onmousemove = (event: MouseEvent) => {
    //     this.cacheManager.validateNoneBlackListElement(event, () => {
    //         // let cache: CacheModel = this.cacheManager.getOrUpdateCache(event);

    //         const blockInnerText = (<HTMLElement> event.target).innerText

    //         const index = new IndexService().getIndex(event, blockInnerText)
            
    //         const parser = new ParserService();
    //         const word = parser.getWord(index, blockInnerText);
    //         console.log(word)

    //         // const highlighting = new BlockHighlighting(
    //         //     cache.focusBlock,
    //         //     cache.textBlocks
    //         // );

    //         // highlighting.draw();

    //         this.onclick(event);
    //     });
    // }
}