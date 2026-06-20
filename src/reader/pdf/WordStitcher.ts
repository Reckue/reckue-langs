import {WordMatcher} from "../../page/word/WordMatcher";
import {HighlightStore} from "../../page/highlight/HighlightStore";
import {WORD_TOKEN, WORD_CHAR} from "../../page/word/Word";

interface Owner {
    node: Text;
    offset: number;
}

// Покрытие одной ноды сшитым словом: [start, end) — смещения внутри ноды,
// word — полная поверхностная форма (для клика «сохранить целое слово»).
interface Coverage {
    start: number;
    end: number;
    word: string;
}

/**
 * Reader-сшивка слов, разорванных текстовым слоем PDF.js на несколько спанов.
 *
 * Движок страницы матчит словарь строго внутри одной text-ноды, а PDF кладёт
 * каждый «text item» отдельным спаном. Поэтому слово, физически разбитое на два
 * спана, для по-нодового матчера невидимо. Два случая:
 *   - перенос по слогам: "mem-" / "brane" на соседних строках;
 *   - буквица (drop cap): крупная первая буква "S" + остаток "IGNALING".
 *
 * Здесь текст страницы собирается в одну логическую строку (с картой
 * символ→нода), разрывы склеиваются эвристикой по геометрии, и для слов из
 * словаря, пересекающих границу нод, рисуется Range через несколько нод во
 * ВТОРОЙ HighlightStore ("reckue-stitch-"). Одно-нодовые слова не трогаем —
 * их уже красит движок (иначе двойная заливка).
 */
export class WordStitcher {

    readonly #matcher: WordMatcher;
    readonly #store: HighlightStore;
    readonly #layers: HTMLElement[] = [];
    // node → сшитые слова, покрывающие её фрагменты. Заполняется для ВСЕХ
    // мульти-нодовых токенов (а не только известных), чтобы клик по фрагменту
    // переносного/буквичного слова сохранял слово целиком, даже если его ещё нет
    // в словаре. См. wordAt.
    readonly #words = new Map<Text, Coverage[]>();

    constructor(matcher: WordMatcher, store: HighlightStore) {
        this.#matcher = matcher;
        this.#store = store;
    }

    /** Новый текстовый слой страницы готов — обработать (инкрементально). */
    add = (layer: HTMLElement) => {
        this.#layers.push(layer);
        this.#process(layer);
    };

    /** Словарь изменился — пересобрать сшивку по всем известным страницам. */
    refresh = () => {
        this.#store.clearAll();
        this.#words.clear();
        this.#layers.forEach(this.#process);
    };

    /** Перекладка (зум) — старые ноды выброшены, начать с чистого листа. */
    reset = () => {
        this.#store.clearAll();
        this.#words.clear();
        this.#layers.length = 0;
    };

    /**
     * Слово под кликом (для ClickController): если (node, offset) попадает во
     * фрагмент сшитого слова — вернуть полную поверхностную форму, иначе undefined.
     * Тогда клик по "brane"/"mem-" сохранит/сменит уровень целого "membrane".
     */
    wordAt = (node: Text, offset: number): string | undefined => {
        const list = this.#words.get(node);
        if (!list) {
            return undefined;
        }
        for (const cov of list) {
            if (offset >= cov.start && offset < cov.end) {
                return cov.word;
            }
        }
        return undefined;
    };

    #process = (layer: HTMLElement) => {
        const nodes = this.#textNodes(layer);
        if (nodes.length < 2) {
            return;
        }

        // Логическая строка страницы + карта «индекс символа → нода/смещение».
        // Разделители между нодами (пробел) получают owner=null; на границах
        // склейки разделитель не вставляется (а для переноса снимается дефис).
        let logical = "";
        const owner: (Owner | null)[] = [];
        let prev: Text | null = null;
        for (const node of nodes) {
            const text = node.nodeValue ?? "";
            if (prev) {
                const kind = this.#glue(prev, node);
                if (kind === "hyphen") {
                    // снять хвостовой пробел и висячий дефис прошлой ноды
                    while (logical.length && /\s/.test(logical[logical.length - 1])) {
                        logical = logical.slice(0, -1);
                        owner.pop();
                    }
                    while (logical.length && /[-\u00AD]$/.test(logical)) {
                        logical = logical.slice(0, -1);
                        owner.pop();
                    }
                } else if (kind !== "drop") {
                    logical += " ";
                    owner.push(null);
                }
            }
            for (let i = 0; i < text.length; i++) {
                logical += text[i];
                owner.push({node, offset: i});
            }
            prev = node;
        }

        for (const match of logical.matchAll(WORD_TOKEN)) {
            if (match.index === undefined) {
                continue;
            }
            const span = owner.slice(match.index, match.index + match[0].length) as Owner[];
            const a = span[0];
            const b = span[span.length - 1];
            if (!a || !b || a.node === b.node) {
                continue;                                   // одно-нодовое — отдаёт движок
            }
            // Карта для клика: записываем покрытие каждой ноды (включая средние
            // при разрыве на 3+ части) — независимо от наличия в словаре.
            this.#record(span, match[0]);

            // Подсветка — только известные слова, мульти-нодовым Range'ом.
            const level = this.#matcher.level(match[0]);
            if (level) {
                const range = document.createRange();
                range.setStart(a.node, a.offset);
                range.setEnd(b.node, b.offset + 1);
                this.#store.addRange(range, level);
            }
        }
    };

    // Разбить токен по нодам и записать покрытие [min, max+1) каждой в #words.
    #record = (span: Owner[], word: string) => {
        let node = span[0].node;
        let min = span[0].offset;
        let max = span[0].offset;
        const flush = () => {
            const list = this.#words.get(node) ?? [];
            list.push({start: min, end: max + 1, word});
            this.#words.set(node, list);
        };
        for (let i = 1; i < span.length; i++) {
            const o = span[i];
            if (o.node === node) {
                max = o.offset;
            } else {
                flush();
                node = o.node;
                min = o.offset;
                max = o.offset;
            }
        }
        flush();
    };

    #textNodes = (layer: HTMLElement): Text[] => {
        const out: Text[] = [];
        const walker = document.createTreeWalker(layer, NodeFilter.SHOW_TEXT);
        let node: Node | null;
        while ((node = walker.nextNode())) {
            const text = node as Text;
            if (text.nodeValue && text.nodeValue.trim()) {
                out.push(text);
            }
        }
        return out;
    };

    /**
     * Нужно ли склеить prev и node без разделителя:
     *  - "hyphen": prev оканчивается дефисом и node начинается ниже (перенос строки);
     *  - "drop":   prev — одна крупная буква, node примыкает справа на той же строке.
     */
    #glue = (prev: Text, node: Text): "hyphen" | "drop" | null => {
        const a = (prev.nodeValue ?? "").replace(/\s+$/, "");
        const b = (node.nodeValue ?? "").replace(/^\s+/, "");
        if (!a || !b || !WORD_CHAR.test(b[0])) {
            return null;
        }
        const ra = this.#rect(prev);
        const rb = this.#rect(node);
        if (!ra || !rb) {
            return null;
        }
        const last = a[a.length - 1];
        if ((last === "-" || last === "\u00AD")
            && a.length >= 2 && WORD_CHAR.test(a[a.length - 2])
            && rb.top >= ra.top + ra.height * 0.5) {
            return "hyphen";
        }
        if (a.length === 1 && WORD_CHAR.test(a)
            && ra.height > rb.height * 1.4
            && rb.left >= ra.left && (rb.left - ra.right) < rb.height
            && rb.top < ra.bottom && rb.bottom > ra.top) {
            return "drop";
        }
        return null;
    };

    #rect = (node: Text): DOMRect | null => {
        const range = document.createRange();
        range.selectNodeContents(node);
        const rects = range.getClientRects();
        return rects.length ? rects[0] : null;
    };
}
