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

    /**
     * background=false (страница): уровни красятся цветом текста + подчёркиванием.
     * background=true (reader/PDF): текстовый слой PDF.js прозрачный поверх canvas,
     * цвет текста не виден — поэтому уровни рисуются фоновой заливкой, как hover.
     */
    constructor(opts: { background?: boolean } = {}) {
        this.background = !!opts.background;
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
            highlights.set(`reckue-${name}`, highlight);
        });
        this.hover = new Ctor();
        highlights.set("reckue-hover", this.hover);
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
                ? `::highlight(reckue-${level.name}) { background-color: ${level.hex}40; }`
                : `::highlight(reckue-${level.name}) {`
                    + ` color: ${level.hex};`
                    + ` text-decoration: underline; text-decoration-color: ${level.hex};`
                    + ` }`;
        });
        rules.push("::highlight(reckue-hover) { background-color: rgba(30, 129, 198, .25); }");
        this.sheet = new CSSStyleSheet();
        this.sheet.replaceSync(rules.join("\n"));
    };
}
