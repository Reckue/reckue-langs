import {Levels} from "../../core/enum/Levels";
import {WordMatch} from "../word/WordMatcher";

type StyleRoot = Document | ShadowRoot;

interface Entry {
    range: Range;
    level: string;
}

/**
 * Терминальный слой рендера (бывш. DOMBuilder из 0.5.0, но без переписывания DOM).
 * Владеет по одному CSS Highlight на уровень и индексом Node→Range[]. Highlight'ы
 * регистрируются в CSS.highlights один раз и дальше мутируются точечно (add/delete) —
 * это и даёт инкрементальность: на изменение одной ноды не пересобираем всю страницу.
 * ::highlight-стили инжектятся в каждый root (включая shadow) через adoptedStyleSheets.
 */
export class HighlightStore {

    private sheet: CSSStyleSheet | null = null;
    private readonly styled = new WeakSet<StyleRoot>();
    private readonly levels = new Map<string, any>();
    private hover: any = null;
    private readonly index = new Map<Text, Entry[]>();
    private readonly background: boolean;
    private readonly ns: string;

    /**
     * background=false (страница): уровни красятся цветом текста + подчёркиванием.
     * background=true (reader/PDF): текстовый слой PDF.js прозрачный поверх canvas,
     * цвет текста не виден — поэтому уровни рисуются фоновой заливкой, как hover.
     *
     * namespace — префикс имён CSS Highlight'ов. По умолчанию "reckue-" (движок
     * страницы). Reader держит ВТОРОЙ store под "reckue-stitch-" для слов,
     * сшитых через несколько нод (перенос/буквица), чтобы не конфликтовать с
     * по-нодовой подсветкой в CSS.highlights.
     */
    constructor(opts: { background?: boolean, namespace?: string } = {}) {
        this.background = !!opts.background;
        this.ns = opts.namespace ?? "reckue-";
    }

    static supported = (): boolean => {
        const css = (window as any).CSS;
        return !!(css && css.highlights && typeof (window as any).Highlight !== "undefined");
    };

    init = (root: StyleRoot) => {
        this.ensureSheet();
        this.ensureStyles(root);
        const highlights = (window as any).CSS.highlights;
        const Ctor = (window as any).Highlight;
        Object.keys(Levels).forEach((key) => {
            const name = (Levels as any)[key].name;
            const highlight = new Ctor();
            this.levels.set(name, highlight);
            highlights.set(`${this.ns}${name}`, highlight);
        });
        this.hover = new Ctor();
        highlights.set(`${this.ns}hover`, this.hover);
    };

    ensureStyles = (root: StyleRoot) => {
        if (!this.sheet || this.styled.has(root)) {
            return;
        }
        try {
            (root as any).adoptedStyleSheets = [...(root as any).adoptedStyleSheets, this.sheet];
            this.styled.add(root);
        } catch (e) {
            // некоторые roots не поддерживают adoptedStyleSheets — пропускаем
        }
    };

    apply = (node: Text, matches: WordMatch[]) => {
        this.remove(node);
        if (!matches.length) {
            return;
        }
        const entries: Entry[] = [];
        for (const match of matches) {
            const highlight = this.levels.get(match.level);
            if (!highlight) {
                continue;
            }
            const range = document.createRange();
            range.setStart(node, match.start);
            range.setEnd(node, match.end);
            highlight.add(range);
            entries.push({range, level: match.level});
        }
        if (entries.length) {
            this.index.set(node, entries);
        }
    };

    remove = (node: Text) => {
        const entries = this.index.get(node);
        if (!entries) {
            return;
        }
        for (const entry of entries) {
            const highlight = this.levels.get(entry.level);
            highlight && highlight.delete(entry.range);
        }
        this.index.delete(node);
    };

    /**
     * Loose-режим (используется reader-сшивателем): добавить произвольный Range на
     * уровень, без индекса Node→Range. Range может пересекать несколько text-нод —
     * Highlight API красит обе физические части (напр. оба фрагмента переноса).
     */
    addRange = (range: Range, level: string) => {
        const highlight = this.levels.get(level);
        highlight && highlight.add(range);
    };

    /** Стереть все loose-Range'и (перед пересборкой сшивки). */
    clearAll = () => {
        this.levels.forEach((highlight) => highlight.clear());
        this.index.clear();
    };

    setHover = (range: Range) => {
        if (this.hover) {
            this.hover.clear();
            this.hover.add(range);
        }
    };

    clearHover = () => {
        this.hover && this.hover.clear();
    };

    private ensureSheet = () => {
        if (this.sheet) {
            return;
        }
        const rules = Object.keys(Levels).map((key) => {
            const level = (Levels as any)[key];
            // 40 = ~25% альфа в 8-значном hex; заливка читаема поверх растра PDF.
            return this.background
                ? `::highlight(${this.ns}${level.name}) { background-color: ${level.hex}40; }`
                : `::highlight(${this.ns}${level.name}) { color: ${level.hex}; }`;
        });
        rules.push(`::highlight(${this.ns}hover) { background-color: rgba(30, 129, 198, .25); }`);
        this.sheet = new CSSStyleSheet();
        this.sheet.replaceSync(rules.join("\n"));
    };
}
