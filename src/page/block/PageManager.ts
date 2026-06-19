import {CacheManager} from "./cache/CacheManager";
import {PopupManager} from "./popup/PopupManager";
import {HighlightingService} from "./highlighting/HighlightingService";
import {CloneBlockService} from "../../lib/services/CloneBlockService";
import {IndexService} from "./IndexService";
import {NodeManager} from "./NodeManager";
import {Context} from "../../core/Context";
import {HighlightPoc} from "../highlight/HighlightPoc";


export class PageManager {

    private readonly cacheManager: CacheManager;
    private readonly popupManager: PopupManager;
    private readonly highlightingService: HighlightingService;
    private cloneBlockService : CloneBlockService;
    private indexService: IndexService;
    private nodeManager: NodeManager

    constructor() {
        this.cacheManager = new CacheManager();
        this.popupManager = new PopupManager("menu");
        this.highlightingService = new HighlightingService();
        this.cloneBlockService = new CloneBlockService();
        this.indexService = new IndexService();
        this.nodeManager = new NodeManager();
    }

    run = () => {
        // PoC: подсветка слов словаря через CSS Custom Highlight API + клик -> попап.
        const service = Context.getWordbookService();
        const cache: Map<string, string> = service ? service.getWordbookCache() : new Map();
        new HighlightPoc(cache).run();
    }
 // => [div#root, div.page-wrapper.document-page, ...]

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