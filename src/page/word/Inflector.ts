import {LemmaDictionary} from "./LemmaDictionary";

const LATIN_LOWER = /^[a-z]+$/;
const DOUBLED_CONSONANT = /([bcdfghjklmnpqrstvwxz])\1$/;

/**
 * Лемматизация для матчинга и сохранения. Источник истины — словарь форм
 * [[LemmaDictionary]] (michmech, грузится из Langs): он покрывает неправильные
 * формы (went→go, children→child) и выпадение немой "e" (making→make), чего
 * правила не умеют. Если формы нет в словаре (не загружен / OOV) — падаем на
 * регулярные английские правила ниже.
 */
export class Inflector {

    bases = (word: string): string[] => {
        const fromDict = LemmaDictionary.get(word);
        if (fromDict) {
            return fromDict === word ? [] : [fromDict];
        }
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

    /**
     * Одна каноническая база для СОХРАНЕНИЯ (клик по слову). В отличие от bases()
     * (все кандидаты для матчинга) — возвращает ровно одну форму, чтобы в словарь
     * легла лемма, а не словоформа: кликнул "views"/"fixed" — хранится "view"/"fix",
     * и подсвечивается всё семейство.
     *
     * Сначала смотрит в [[LemmaDictionary]] (точная лемма, включая неправильные
     * формы и e-drop). Если формы нет в словаре — правила ниже: покрывают
     * регулярные -s/-ies/-ed/-ing, но не различают e-drop и неправильные формы.
     */
    lemma = (word: string): string => {
        const fromDict = LemmaDictionary.get(word);
        if (fromDict) {
            return fromDict;
        }
        // OOV (формы нет в словаре). Правила дают кандидатов (bases уже умеет и
        // e-restoration «make», и undouble «run»), но СОХРАНЯЕМ лишь того, кто
        // подтверждён словарём как реальная лемма. Иначе не режем и возвращаем
        // слово как есть — консервативно: лучше форма, чем огрызок «mak»/«thi».
        // Это же чинит недо-срез: «used»→«use», «makes»→«make».
        for (const base of this.bases(word)) {
            if (LemmaDictionary.isLemma(base)) {
                return base;
            }
        }
        return word;
    };

    private undouble = (stem: string): string => {
        return DOUBLED_CONSONANT.test(stem) ? stem.slice(0, -1) : stem;
    };
}
