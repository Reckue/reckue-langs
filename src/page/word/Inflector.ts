const LATIN_LOWER = /^[a-z]+$/;
const DOUBLED_CONSONANT = /([bcdfghjklmnpqrstvwxz])\1$/;

/**
 * Лёгкая лемматизация для матчинга: по словоформе со страницы возвращает
 * вероятные базовые формы, чтобы сохранённое "run" подсвечивало "runs"/"running",
 * а "study" — "studies". Только ДОБАВЛЯЕТ кандидатов для поиска; что хранится в
 * словаре — не меняет.
 *
 * Намеренно ограничено регулярными английскими формами и латиницей (кириллицу/CJK
 * не трогаем — там правила другие). Это эвристика без словаря: дёшево для
 * контент-скрипта, но не покрывает неправильные формы (went→go) и другие языки.
 * Полноценная мультиязычная лемматизация — отдельная задача (нужен словарь форм).
 */
export class Inflector {

    bases = (word: string): string[] => {
        if (!LATIN_LOWER.test(word) || word.length <= 3) {
            return [];
        }
        const out = new Set<string>();
        const add = (base: string) => {
            if (base.length >= 3 && base !== word) {
                out.add(base);
            }
        };

        // множественное / 3-е лицо
        if (word.endsWith("ies")) {
            add(word.slice(0, -3) + "y");            // studies → study
        }
        if (word.endsWith("es")) {
            add(word.slice(0, -2));                  // boxes → box
        }
        if (word.endsWith("s") && !word.endsWith("ss")) {
            add(word.slice(0, -1));                  // runs → run, cats → cat
        }

        // прошедшее
        if (word.endsWith("ied")) {
            add(word.slice(0, -3) + "y");            // tried → try
        }
        if (word.endsWith("ed")) {
            add(word.slice(0, -2));                  // walked → walk
            add(word.slice(0, -1));                  // used → use
            add(this.undouble(word.slice(0, -2)));   // stopped → stop
        }

        // герундий
        if (word.endsWith("ing")) {
            const stem = word.slice(0, -3);
            add(stem);                               // walking → walk
            add(stem + "e");                         // making → make
            add(this.undouble(stem));                // running → run
        }

        return [...out];
    };

    private undouble = (stem: string): string => {
        return DOUBLED_CONSONANT.test(stem) ? stem.slice(0, -1) : stem;
    };
}
