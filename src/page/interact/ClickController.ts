import {HitTester} from "./HitTester";
import {WordMatcher} from "../word/WordMatcher";
import {Inflector} from "../word/Inflector";
import {Popup} from "./Popup";
import {Hint} from "./Hint";
import {WordbookService} from "../../core/words/WordbookService";

const DEFAULT_LEVEL = "beginner";

// Элементы, по которым обычный клик в быстром режиме НЕ перехватываем, чтобы не
// ломать навигацию/ввод на странице (ссылки/кнопки/поля и т.п. остаются на Ctrl).
const INTERACTIVE = "a, button, input, textarea, select, label, summary," +
    " [role='button'], [role='link'], [contenteditable]:not([contenteditable='false'])";

/**
 * Клик-жест: сохранение слова и попап смены уровня.
 *  - обычный режим: Ctrl+Click по тексту, Ctrl+Shift+Click по ссылкам;
 *  - быстрый режим (настройка fastMode): обычный клик по неинтерактивному тексту,
 *    без Ctrl. Ctrl-жесты продолжают работать.
 * После сохранения/смены уровня пере-сканируем всю страницу (см. refresh).
 */
export class ClickController {

    private readonly hit: HitTester;
    private readonly matcher: WordMatcher;
    private readonly service: WordbookService;
    private readonly popup: Popup;
    private readonly hint: Hint;
    private readonly refresh: () => void;
    private readonly inflector = new Inflector();
    private fast = false;

    constructor(hit: HitTester, matcher: WordMatcher,
                service: WordbookService, popup: Popup, hint: Hint, refresh: () => void) {
        this.hit = hit;
        this.matcher = matcher;
        this.service = service;
        this.popup = popup;
        this.hint = hint;
        this.refresh = refresh;
    }

    attach = () => {
        chrome.storage.local.get(["fastMode"], (s) => (this.fast = !!s.fastMode));
        chrome.storage.onChanged.addListener((changes, area) => {
            if (area === "local" && changes.fastMode) {
                this.fast = !!changes.fastMode.newValue;
            }
        });

        document.addEventListener("click", (event: MouseEvent) => {
            if (this.popup.contains(event.target as Node)) {
                return;
            }
            const hit = this.hit.at(event.clientX, event.clientY);
            if (!hit) {
                this.popup.hide();
                return;
            }
            const ctrl = event.ctrlKey || event.metaKey;
            const plain = this.fast && !this.isInteractive(hit.node);
            const gesture = plain || (hit.isLink ? (ctrl && event.shiftKey) : ctrl);
            if (!gesture) {
                this.popup.hide();
                return;
            }
            event.preventDefault();
            event.stopPropagation();

            // Сохраняем лемму, а не словоформу: клик по "views"/"fixed" кладёт в
            // словарь "view"/"fix", и подсвечивается всё семейство форм.
            const word = this.inflector.lemma(hit.word.toLowerCase());
            if (!this.matcher.has(word)) {
                this.save(word, DEFAULT_LEVEL);
            }
            this.hint.hide();
            const level = this.service.getWordbookCache().get(word) ?? DEFAULT_LEVEL;
            const anchor = hit.range.getBoundingClientRect();
            this.popup.show(word, level, anchor, (next) => this.save(word, next));
        });
    };

    private isInteractive = (node: Text): boolean => {
        const el = node.parentElement;
        return !!(el && el.closest(INTERACTIVE));
    };

    private save = (word: string, level: string) => {
        this.service.set([{word, level}]);
        // Перекрашиваем все вхождения слова и его форм по всей странице.
        this.refresh();
    };
}
