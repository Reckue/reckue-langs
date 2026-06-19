import {HitTester} from "./HitTester";
import {HighlightStore} from "../highlight/HighlightStore";
import {WordMatcher} from "../word/WordMatcher";
import {Popup} from "./Popup";
import {Hint} from "./Hint";
import {WordbookService} from "../../core/words/WordbookService";

const DEFAULT_LEVEL = "beginner";

/**
 * Клик-жест: Ctrl+Click по тексту / Ctrl+Shift+Click по ссылкам → сохранение
 * нового слова и попап смены уровня. После сохранения/смены переподсвечиваем
 * ТОЛЬКО задетую ноду (store.apply), а не всю страницу.
 */
export class ClickController {

    private readonly hit: HitTester;
    private readonly store: HighlightStore;
    private readonly matcher: WordMatcher;
    private readonly service: WordbookService;
    private readonly popup: Popup;
    private readonly hint: Hint;
    private readonly refresh: () => void;

    constructor(hit: HitTester, store: HighlightStore, matcher: WordMatcher,
                service: WordbookService, popup: Popup, hint: Hint, refresh: () => void) {
        this.hit = hit;
        this.store = store;
        this.matcher = matcher;
        this.service = service;
        this.popup = popup;
        this.hint = hint;
        this.refresh = refresh;
    }

    attach = () => {
        document.addEventListener("click", (event: MouseEvent) => {
            if (this.popup.contains(event.target as Node)) {
                return;
            }
            const ctrl = event.ctrlKey || event.metaKey;
            const hit = this.hit.at(event.clientX, event.clientY);
            if (!hit) {
                this.popup.hide();
                return;
            }
            const gesture = hit.isLink ? (ctrl && event.shiftKey) : ctrl;
            if (!gesture) {
                this.popup.hide();
                return;
            }
            event.preventDefault();
            event.stopPropagation();

            const word = hit.word.toLowerCase();
            if (!this.matcher.has(word)) {
                this.save(hit.node, word, DEFAULT_LEVEL);
            }
            this.hint.hide();
            const level = this.service.getWordbookCache().get(word) ?? DEFAULT_LEVEL;
            this.popup.show(word, level, event.clientX, event.clientY, (next) => this.save(hit.node, word, next));
        });
    };

    private save = (node: Text, word: string, level: string) => {
        this.service.set([{word, level}]);
        // Перекрашиваем все вхождения слова и его форм по всей странице, а не
        // только кликнутую ноду.
        this.refresh();
    };
}
