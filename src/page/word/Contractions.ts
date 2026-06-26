import {WORD_TOKEN, APOS} from "./Word";

export interface Segment {
    start: number;   // смещение сегмента в surface
    end: number;
    word: string;    // «эффективное» словарное слово (lowercase): it / is / not
}

// Раскрытие хвоста сокращения: физический кусок → полное слово.
//  's → is (по умолчанию; притяжательное/has сюда же, осознанное упрощение),
//  'd → would (а не had — выбран частотный вариант).
const SUFFIX: Record<string, string> = {
    s: "is", m: "am", re: "are", ll: "will", ve: "have", d: "would", t: "not"
};

// Сокращения, где левая часть нерегулярна (общее правило n't ниже даёт огрызок):
// won't→wo, can't→ca, shan't→sha. Плюс 's-формы, которые НЕ «is» (let's→let us).
const FULL: Record<string, [string, string]> = {
    "won't": ["will", "not"],
    "can't": ["can", "not"],
    "shan't": ["shall", "not"],
    "ain't": ["are", "not"],
    "let's": ["let", "us"],
    "y'all": ["you", "all"]
};

const runs = (surface: string): { start: number, end: number, text: string }[] => {
    const out: { start: number, end: number, text: string }[] = [];
    for (const m of surface.matchAll(WORD_TOKEN)) {
        if (m.index !== undefined) {
            out.push({start: m.index, end: m.index + m[0].length, text: m[0]});
        }
    }
    return out;
};

/**
 * Разложить surface (буквенное слово, возможно с внутренним апострофом) на
 * физические сегменты с «эффективным» словарным словом для каждого.
 *  - без апострофа / одиночный прогон → один сегмент, слово = оно само;
 *  - it's → [it, is], don't → [do, not], can't → [can, not].
 * start/end — смещения в surface, чтобы подсветить именно физический кусок.
 */
export const segments = (surface: string): Segment[] => {
    const parts = runs(surface);
    if (parts.length <= 1 || !APOS.test(surface)) {
        return parts.map((p) => ({start: p.start, end: p.end, word: p.text.toLowerCase()}));
    }
    const lower = parts.map((p) => p.text.toLowerCase());
    const eff = [...lower];
    const norm = surface.toLowerCase().replace(/[’]/g, "'");
    const full = FULL[norm];
    if (full) {
        eff[0] = full[0];
        eff[eff.length - 1] = full[1];
    } else {
        for (let i = 1; i < eff.length; i++) {
            eff[i] = SUFFIX[lower[i]] ?? lower[i];
        }
        // Регулярное n't: левая часть оканчивается на «n», которое уходит в not
        // (don→do, isn→is, wouldn→would). Нерегулярные — в FULL выше.
        const last = lower.length - 1;
        if (lower[last] === "t" && eff[0].length > 1 && eff[0].endsWith("n")) {
            eff[0] = eff[0].slice(0, -1);
        }
    }
    return parts.map((p, i) => ({start: p.start, end: p.end, word: eff[i]}));
};

/**
 * Сегмент под смещением offset внутри surface (клик/наведение по части слова).
 * Возвращает первый сегмент, чей конец достигает offset (на апострофе-границе —
 * левый сегмент).
 */
export const segmentAt = (surface: string, offset: number): Segment | null => {
    const segs = segments(surface);
    for (const s of segs) {
        if (offset <= s.end) {
            return s;
        }
    }
    return segs.length ? segs[segs.length - 1] : null;
};
