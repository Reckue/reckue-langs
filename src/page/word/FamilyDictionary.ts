const STORAGE_KEY = "familyDict:en";

/**
 * Рантайм-словарь лемма→словообразовательные родственники (из ручки Langs
 * `GET /api/1/dictionaries/en/families`, строится из word_derivations/OEWN).
 * Качает и кэширует его фоновый SW (`background/application.js`); здесь — общий
 * доступ для провайдера семьи в [[KnowledgeResolver]] (см. ClickController).
 *
 * Пока словарь не загружен — семья пустая (секция в попапе просто не показывается).
 */
export class FamilyDictionary {

    private static map: Record<string, string[]> | null = null;

    /** Родственники леммы (деривации), или [] если их нет / словарь не загружен. */
    static get(lemma: string): string[] {
        const map = FamilyDictionary.map;
        if (!map) {
            return [];
        }
        const value = map[lemma];
        // Гард от прото-ключей после round-trip через chrome.storage.
        return Array.isArray(value) ? value : [];
    }

    /** Загружает словарь из chrome.storage в память (один раз на старте). */
    static load(): Promise<void> {
        return new Promise((resolve) => {
            try {
                chrome.storage.local.get([STORAGE_KEY], (res) => {
                    FamilyDictionary.map = (res?.[STORAGE_KEY] as Record<string, string[]>) || null;
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
                    FamilyDictionary.map = (changes[STORAGE_KEY].newValue as Record<string, string[]>) || null;
                }
            });
        } catch {
            // нет chrome.storage (тесты / не-расширение) — словарь просто не грузится
        }
    }
}
