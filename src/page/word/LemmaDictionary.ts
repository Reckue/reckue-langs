const STORAGE_KEY = "lemmaDict:en";

/**
 * Рантайм-словарь словоформа→лемма (michmech, из ручки Langs
 * `GET /api/1/dictionaries/en/lemmas`). Качает и кэширует его фоновый SW
 * (`background/application.js`); здесь — общий доступ для [[Inflector]].
 *
 * Пока словарь не загружен (первый запуск до ответа SW), лемматизация падает на
 * правила Inflector'а. Когда SW обновит словарь в storage — [[watch]] перечитает
 * карту и инициирует пере-скан, чтобы подсветка подхватила неправильные формы.
 */
export class LemmaDictionary {

    private static map: Record<string, string> | null = null;
    // Множество известных лемм (= значения карты форма→лемма). Строится лениво,
    // сбрасывается при обновлении словаря. Нужно Inflector'у, чтобы НЕ сохранять
    // огрызок (mak): правило режет, только если результат — реальная лемма.
    private static lemmaSet: Set<string> | null = null;

    /** Лемма для словоформы, или undefined если формы нет в словаре. */
    static get(word: string): string | undefined {
        const map = LemmaDictionary.map;
        if (!map) {
            return undefined;
        }
        const value = map[word];
        // Гард от прото-ключей (toString/constructor и т.п.) после round-trip
        // через chrome.storage — карта приходит с обычным прототипом.
        return typeof value === "string" ? value : undefined;
    }

    /** Известна ли словарю такая лемма (база) — т.е. встречается ли как значение. */
    static isLemma(word: string): boolean {
        const map = LemmaDictionary.map;
        if (!map) {
            return false;
        }
        if (!LemmaDictionary.lemmaSet) {
            LemmaDictionary.lemmaSet = new Set(Object.values(map));
        }
        return LemmaDictionary.lemmaSet.has(word);
    }

    /** Загружен ли словарь (для миграции, которая без словаря не должна запускаться). */
    static loaded(): boolean {
        return LemmaDictionary.map !== null;
    }

    /** Загружает словарь из chrome.storage в память (один раз на старте). */
    static load(): Promise<void> {
        return new Promise((resolve) => {
            try {
                chrome.storage.local.get([STORAGE_KEY], (res) => {
                    LemmaDictionary.map = (res?.[STORAGE_KEY] as Record<string, string>) || null;
                    LemmaDictionary.lemmaSet = null;
                    resolve();
                });
            } catch {
                resolve();
            }
        });
    }

    /** Перечитывает словарь при его обновлении из SW и зовёт onUpdate. */
    static watch(onUpdate: () => void): void {
        try {
            chrome.storage.onChanged.addListener((changes, area) => {
                if (area === "local" && changes[STORAGE_KEY]) {
                    LemmaDictionary.map = (changes[STORAGE_KEY].newValue as Record<string, string>) || null;
                    LemmaDictionary.lemmaSet = null;
                    onUpdate();
                }
            });
        } catch {
            // нет chrome.storage (тесты / не-расширение) — словарь просто не грузится
        }
    }
}
