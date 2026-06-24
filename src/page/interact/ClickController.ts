import {HitTester} from "./HitTester";
import {WordMatcher} from "../word/WordMatcher";
import {Inflector} from "../word/Inflector";
import {LemmaDictionary} from "../word/LemmaDictionary";
import {FamilyDictionary} from "../word/FamilyDictionary";
import {Popup} from "./Popup";
import {Hint} from "./Hint";
import {WordbookService} from "../../core/words/WordbookService";
import {KnowledgeResolver} from "../../core/words/KnowledgeResolver";
import {RelationProviders} from "../../core/words/KnowledgeUnit";

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
    private readonly resolveWord?: (node: Text, offset: number) => string | undefined;
    private readonly inflector = new Inflector();
    // Связи единицы знания: лемму формы знаем уже сейчас (словарь лемм), а
    // семья/конструкции включатся, когда подъедет word_derivations с бэкенда.
    private readonly providers: RelationProviders = {
        lemmaOf: (word) => LemmaDictionary.get(word),
        familyOf: (lemma) => FamilyDictionary.get(lemma),
        constructionsOf: () => []
    };
    private readonly resolver = new KnowledgeResolver(this.providers);
    private fast = false;

    /**
     * resolveWord (опционально, reader): по (node, offset) возвращает полное слово,
     * если клик попал во фрагмент сшитого слова (перенос/буквица в PDF). Тогда
     * сохраняется/меняет уровень целое слово, а не его фрагмент.
     */
    constructor(hit: HitTester, matcher: WordMatcher,
                service: WordbookService, popup: Popup, hint: Hint, refresh: () => void,
                resolveWord?: (node: Text, offset: number) => string | undefined) {
        this.hit = hit;
        this.matcher = matcher;
        this.service = service;
        this.popup = popup;
        this.hint = hint;
        this.refresh = refresh;
        this.resolveWord = resolveWord;
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
            // словарь "view"/"fix", и подсвечивается всё семейство форм. В reader
            // resolveWord сперва достраивает фрагмент сшитого слова до целого.
            const surface = ((this.resolveWord && this.resolveWord(hit.node, hit.start)) ?? hit.word).toLowerCase();
            const word = this.inflector.lemma(surface);
            if (!this.matcher.has(word)) {
                this.save(word, DEFAULT_LEVEL);
            }
            this.hint.hide();
            // Единица знания: голова-лемма + (позже) семья/конструкции. Строим после
            // save, чтобы cache уже содержал уровень кликнутого слова.
            const unit = this.resolver.unitFor(word, this.service.getWordbookCache());
            const anchor = hit.range.getBoundingClientRect();
            this.popup.show(unit, surface, anchor, (next) => this.save(word, next));
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
