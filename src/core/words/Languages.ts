// Реестр поддерживаемых языков: код (ISO 639-1) → письменности, которыми язык
// пишется. Это конфиг-метаданные (не словарь слов): нужны, чтобы (а) предлагать
// языки при создании словаря и (б) сопоставлять письменность кликнутого слова с
// языком его словаря. Большинство языков — один скрипт; японский — несколько.
export interface LangMeta {
    code: string;
    scripts: string[];
}

export const LANGUAGES: LangMeta[] = [
    {code: "en", scripts: ["Latin"]},
    {code: "de", scripts: ["Latin"]},
    {code: "fr", scripts: ["Latin"]},
    {code: "es", scripts: ["Latin"]},
    {code: "it", scripts: ["Latin"]},
    {code: "pt", scripts: ["Latin"]},
    {code: "nl", scripts: ["Latin"]},
    {code: "pl", scripts: ["Latin"]},
    {code: "sv", scripts: ["Latin"]},
    {code: "da", scripts: ["Latin"]},
    {code: "nb", scripts: ["Latin"]},
    {code: "fi", scripts: ["Latin"]},
    {code: "cs", scripts: ["Latin"]},
    {code: "ro", scripts: ["Latin"]},
    {code: "hu", scripts: ["Latin"]},
    {code: "tr", scripts: ["Latin"]},
    {code: "vi", scripts: ["Latin"]},
    {code: "id", scripts: ["Latin"]},
    {code: "ru", scripts: ["Cyrillic"]},
    {code: "uk", scripts: ["Cyrillic"]},
    {code: "bg", scripts: ["Cyrillic"]},
    {code: "sr", scripts: ["Cyrillic"]},
    {code: "be", scripts: ["Cyrillic"]},
    {code: "kk", scripts: ["Cyrillic"]},
    {code: "mk", scripts: ["Cyrillic"]},
    {code: "el", scripts: ["Greek"]},
    {code: "zh", scripts: ["Han"]},
    {code: "ja", scripts: ["Han", "Hiragana", "Katakana"]},
    {code: "ko", scripts: ["Hangul"]},
    {code: "ar", scripts: ["Arabic"]},
    {code: "fa", scripts: ["Arabic"]},
    {code: "ur", scripts: ["Arabic"]},
    {code: "he", scripts: ["Hebrew"]},
    {code: "hi", scripts: ["Devanagari"]},
    {code: "mr", scripts: ["Devanagari"]},
    {code: "th", scripts: ["Thai"]},
    {code: "hy", scripts: ["Armenian"]},
    {code: "ka", scripts: ["Georgian"]}
];

const byCode = new Map(LANGUAGES.map((l) => [l.code, l]));

// Человекочитаемое имя языка через Intl (без своей таблицы на сотни строк).
function langName(code: string, locale?: string): string {
    try {
        const loc = locale || (typeof navigator !== "undefined" ? navigator.language : "en");
        return new Intl.DisplayNames([loc], {type: "language"}).of(code) || code;
    } catch {
        return code;
    }
}

export const Languages = {
    list: (): LangMeta[] => LANGUAGES,
    scriptsOf: (code: string): string[] => byCode.get(code)?.scripts ?? [],
    name: langName
};
