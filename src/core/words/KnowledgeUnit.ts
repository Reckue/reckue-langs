/** Как сохранённое слово относится к голове своей единицы знания. */
export type Relation = "lemma" | "derivation" | "construction";

export interface UnitMember {
    word: string;
    level?: string;         // имя уровня (core/enum/Levels); undefined = ещё не сохранено
    relation: Relation;
}

/**
 * Единица знания — группировка над плоским словарём (word→level). Голова — лемма
 * (инфинитив); под ней сохранённые члены семьи (деривации) и связанные
 * конструкции. В storage НЕ хранится: вычисляется [[KnowledgeResolver]] из словаря
 * + провайдеров связей. Источник истины остаётся плоским словарём.
 */
export interface KnowledgeUnit {
    lemma: string;
    level?: string;                 // уровень самой леммы, если она сохранена
    members: UnitMember[];          // деривации: decision, decisive, indecisive
    constructions: UnitMember[];    // многословные: look forward to, decide on
}

/**
 * Источники связей. Инжектятся, чтобы ядро не зависело от контент-скрипта:
 * `lemmaOf` приходит из словаря инфлексий (page/word/LemmaDictionary), а
 * `familyOf`/`constructionsOf` подключатся позже с данными word_derivations.
 */
export interface RelationProviders {
    /** Лемма (инфинитив) для словоформы; undefined, если это не инфлексия. */
    lemmaOf: (word: string) => string | undefined;
    /** Леммы-члены семьи (деривации) для данной леммы. */
    familyOf: (lemma: string) => string[];
    /** Связанные конструкции (многословные) для леммы. */
    constructionsOf: (lemma: string) => string[];
}

/** Заглушка без связей: каждое слово — юнит-одиночка (пока нет данных семей). */
export const NO_RELATIONS: RelationProviders = {
    lemmaOf: () => undefined,
    familyOf: () => [],
    constructionsOf: () => []
};
