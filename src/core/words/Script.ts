// Детерминированное определение ПИСЬМЕННОСТИ строки по Unicode (не эвристика, не
// словарь): codepoint → Script по стандарту. Это слой 1 раскладки слов по языкам —
// он различает языки на разных алфавитах бесплатно. Разведение языков ВНУТРИ одной
// письменности (латиница en/de/fr…) сюда не входит — это задача поздних фаз.

// Письменности, которые реально встречаются в словах. Порядок не важен — выбираем
// по числу совпавших символов. Hiragana/Katakana держим отдельно от Han, чтобы
// каной отличать японский от китайского.
const SCRIPTS = [
    "Latin", "Cyrillic", "Greek", "Han", "Hiragana", "Katakana",
    "Hangul", "Arabic", "Hebrew", "Devanagari", "Thai", "Armenian", "Georgian"
];

const TESTERS = SCRIPTS.map((script) => ({script, re: new RegExp(`\\p{Script=${script}}`, "gu")}));

/**
 * Доминирующая письменность строки (по числу символов своего скрипта) или null,
 * если букв ни одного известного скрипта нет (числа/пунктуация/эмодзи).
 */
export function detectScript(text: string): string | null {
    let best: string | null = null;
    let bestCount = 0;
    for (const {script, re} of TESTERS) {
        const matched = text.match(re);
        const count = matched ? matched.length : 0;
        if (count > bestCount) {
            bestCount = count;
            best = script;
        }
    }
    return best;
}
