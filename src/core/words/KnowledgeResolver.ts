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

    /** Все единицы знания из словаря (для попапа-словаря). */
    units(cache: Map<string, string>): KnowledgeUnit[] {
        const claimed = new Set<string>();
        const units: KnowledgeUnit[] = [];

        cache.forEach((_level, word) => {
            if (claimed.has(word)) {
                return;
            }
            const unit = this.build(word, cache, claimed);
            units.push(unit);
        });

        return units;
    }

    /** Единица знания для конкретного слова (для клик-попапа над словом). */
    unitFor(word: string, cache: Map<string, string>): KnowledgeUnit {
        const lemma = this.providers.lemmaOf(word) ?? word;
        return this.build(lemma, cache, new Set<string>());
    }

    /** Строит юнит с головой-леммой, подвешивая сохранённые семью и конструкции. */
    private build(lemma: string, cache: Map<string, string>, claimed: Set<string>): KnowledgeUnit {
        claimed.add(lemma);
        const members = this.savedMembers(this.providers.familyOf(lemma), lemma, cache, claimed, "derivation");
        const constructions = this.savedMembers(this.providers.constructionsOf(lemma), lemma, cache, claimed, "construction");
        return {
            lemma,
            level: cache.get(lemma),
            members,
            constructions
        };
    }

    /** Из списка кандидатов оставляет только сохранённые (и ещё не занятые) слова. */
    private savedMembers(
        candidates: string[],
        head: string,
        cache: Map<string, string>,
        claimed: Set<string>,
        relation: UnitMember["relation"]
    ): UnitMember[] {
        const members: UnitMember[] = [];
        for (const word of candidates) {
            const level = cache.get(word);
            if (word === head || level === undefined || claimed.has(word)) {
                continue;
            }
            claimed.add(word);
            members.push({word, level, relation});
        }
        return members;
    }
}
