const STORAGE_KEY = "posDict:en";

/**
 * Рантайм-словарь лемма→части речи (грамматика), из ручки Langs
 * `GET /api/1/dictionaries/en/pos` (строится из senses.pos/OEWN). Качает и
 * кэширует фоновый SW (`background/application.js`); здесь — общий доступ для
 * провайдера POS в [[KnowledgeResolver]] (POS-тег в попапе). Держим ОТДЕЛЬНО от
 * семей: грамматика — это грамматика.
 */
export class GrammarDictionary {

    private static map: Record<string, string[]> | null = null;

    /** Части речи леммы (noun/verb/…), или [] если нет / словарь не загружен. */
    static get(lemma: string): string[] {
        const map = GrammarDictionary.map;
        if (!map) {
            return [];
        }
        const value = map[lemma];
        return Array.isArray(value) ? value : [];
    }

    /** Загружает словарь из chrome.storage в память (один раз на старте). */
    static load(): Promise<void> {
        return new Promise((resolve) => {
            try {
                chrome.storage.local.get([STORAGE_KEY], (res) => {
                    GrammarDictionary.map = (res?.[STORAGE_KEY] as Record<string, string[]>) || null;
                    resolve();
                });
            } catch {
                resolve();
            }
        });
    }

    /** Перечитывает словарь при обновлении из SW (в память; пере-скан не нужен). */
    static watch(): void {
        try {
            chrome.storage.onChanged.addListener((changes, area) => {
                if (area === "local" && changes[STORAGE_KEY]) {
                    GrammarDictionary.map = (changes[STORAGE_KEY].newValue as Record<string, string[]>) || null;
                }
            });
        } catch {
            // нет chrome.storage (тесты / не-расширение) — словарь просто не грузится
        }
    }
}
