import {HitTester} from "./HitTester";
import {WordMatcher} from "../word/WordMatcher";
import {Inflector} from "../word/Inflector";
import {LemmaDictionary} from "../word/LemmaDictionary";
import {FamilyDictionary} from "../word/FamilyDictionary";
import {GrammarDictionary} from "../word/GrammarDictionary";
import {Popup} from "./Popup";
import {Hint} from "./Hint";
import {WordbookService} from "../../core/words/WordbookService";
import {KnowledgeResolver} from "../../core/words/KnowledgeResolver";
import {RelationProviders} from "../../core/words/KnowledgeUnit";
import {LanguageRouter} from "../word/LanguageRouter";

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
        // Семья — только лексические деривации. Выкидываем инфлексии-двойники:
        // родственник, который лемматизируется обратно в голову (running→run) —
        // это грамматическая форма, не член семьи (граница «семьи это семьи»).
        familyOf: (lemma) => FamilyDictionary.get(lemma).filter((r) => LemmaDictionary.get(r) !== lemma),
        constructionsOf: () => [],
        // Грамматика (части речи) — ОТДЕЛЬНО от семьи.
        posOf: (lemma) => GrammarDictionary.get(lemma)
    };
    private readonly resolver = new KnowledgeResolver(this.providers);
    // Раскладка слов по языковым словарям (активный приор + письменность).
    private readonly router: LanguageRouter;
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
        this.router = new LanguageRouter(service);
    }

    attach = () => {
        this.router.init();
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
            this.hint.hide();
            const anchor = hit.range.getBoundingClientRect();

            // Раскладка по языковым словарям: слово письменности активного языка
            // (общий случай) идёт в активный словарь — синхронный путь как раньше.
            // Слово другого алфавита уходит в словарь своего языка (если заведён).
            const targetId = this.router.targetId(word);
            if (targetId === this.router.getActiveId()) {
                if (!this.matcher.has(word)) {
                    this.save(word, DEFAULT_LEVEL);
                }
                // Единица знания: голова-лемма + (позже) семья/конструкции. Строим после
                // save, чтобы cache уже содержал уровень кликнутого слова. onLevel
                // получает само слово (голова-лемма ИЛИ член семьи) — каждое со
                // своими пипсами уровня в попапе.
                const unit = this.resolver.unitFor(word, this.service.getWordbookCache());
                this.popup.show(unit, surface, anchor, (w, next) => this.save(w, next));
            } else {
                this.saveForeign(targetId, word, surface, anchor);
            }
        });
    };

    // Слово чужого языка: лениво грузим его словарь и пишем туда. Подсветку
    // активной страницы не трогаем — слово в другом алфавите, его словарь не активен.
    private saveForeign = (id: string, word: string, surface: string, anchor: DOMRect) => {
        this.router.getService(id).then((service) => {
            if (!service.getWordbookCache().get(word)) {
                service.set([{word, level: DEFAULT_LEVEL}]);
            }
            const unit = this.resolver.unitFor(word, service.getWordbookCache());
            this.popup.show(unit, surface, anchor, (w, next) => service.set([{word: w, level: next}]));
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
