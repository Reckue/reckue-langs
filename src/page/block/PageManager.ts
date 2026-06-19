import {CacheManager} from "./cache/CacheManager";
import {PopupManager} from "./popup/PopupManager";
import {HighlightingService} from "./highlighting/HighlightingService";
import {CloneBlockService} from "../../lib/services/CloneBlockService";
import {IndexService} from "./IndexService";
import {NodeManager} from "./NodeManager";


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
        const body = document.querySelector('body');

        const textNodeArray: Array<Node> = this.nodeManager.getTextNodes(body);

        // TODO: измерение блоков и рендер слов — следующий этап.
        // Прежний замер через клон-элемент (cloneBlockService.getSize) вызывал layout
        // thrashing и выполнялся только ради debug-логов, поэтому убран. При реализации
        // рендера измерять батчем: все чтения (offsetWidth/getComputedStyle) отдельно
        // от записей в DOM, и кешировать getComputedStyle по шрифту блока.
        void textNodeArray;
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