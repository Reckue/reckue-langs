import {KnowledgeUnit, RelationProviders, UnitMember} from "./KnowledgeUnit";

/**
 * Собирает единицы знания над плоским словарём (word→level) по провайдерам связей.
 * Источник истины — словарь; юниты вычисляются и не хранятся.
 *
 * Сейчас провайдеры семей/конструкций возвращают пусто → каждое сохранённое слово
 * становится юнитом-одиночкой (голова = слово). Когда подключим word_derivations,
 * та же логика начнёт подвешивать членов семьи под лемму без изменений потребителей.
 */
export class KnowledgeResolver {

    constructor(private readonly providers: RelationProviders) {
    }

    /** Все единицы знания из словаря (для вью-словаря) — только сохранённые члены. */
    units(cache: Map<string, string>): KnowledgeUnit[] {
        const claimed = new Set<string>();
        const units: KnowledgeUnit[] = [];

        cache.forEach((_level, word) => {
            if (claimed.has(word)) {
                return;
            }
            const unit = this.build(word, cache, claimed, false);
            units.push(unit);
        });

        return units;
    }

    /**
     * Единица знания для конкретного слова (клик-попап). Семья показывается
     * ПОЛНОСТЬЮ: и сохранённые члены (со своим уровнем), и ещё не выученные
     * (level=undefined) — чтобы пользователь видел всё словообразовательное гнездо.
     */
    unitFor(word: string, cache: Map<string, string>): KnowledgeUnit {
        const lemma = this.providers.lemmaOf(word) ?? word;
        return this.build(lemma, cache, new Set<string>(), true);
    }

    /** Строит юнит с головой-леммой, подвешивая членов семьи и конструкции. */
    private build(lemma: string, cache: Map<string, string>, claimed: Set<string>, includeUnsaved: boolean): KnowledgeUnit {
        claimed.add(lemma);
        const members = this.members(this.providers.familyOf(lemma), lemma, cache, claimed, "derivation", includeUnsaved);
        const constructions = this.members(this.providers.constructionsOf(lemma), lemma, cache, claimed, "construction", includeUnsaved);
        return {
            lemma,
            level: cache.get(lemma),
            pos: this.providers.posOf(lemma),
            members,
            constructions
        };
    }

    /**
     * Кандидаты → члены юнита. includeUnsaved=false оставляет только сохранённые
     * (для вью-словаря); true берёт всех, сохранённые — первыми (для попапа).
     */
    private members(
        candidates: string[],
        head: string,
        cache: Map<string, string>,
        claimed: Set<string>,
        relation: UnitMember["relation"],
        includeUnsaved: boolean
    ): UnitMember[] {
        const saved: UnitMember[] = [];
        const unsaved: UnitMember[] = [];
        for (const word of candidates) {
            if (word === head || claimed.has(word)) {
                continue;
            }
            const level = cache.get(word);
            if (level === undefined) {
                if (!includeUnsaved) {
                    continue;
                }
                claimed.add(word);
                unsaved.push({word, relation});
            } else {
                claimed.add(word);
                saved.push({word, level, relation});
            }
        }
        return saved.concat(unsaved);
    }
}
