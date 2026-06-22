import {LemmaDictionary} from "./LemmaDictionary";
import {WordbookService} from "../../core/words/WordbookService";
import {levelAt, levelNumber} from "../../core/enum/Levels";

const FLAG = "lemmaMigratedV1";

/**
 * Разовая миграция словаря: схлопывает сохранённые СЛОВОФОРМЫ в их леммы по
 * данным [[LemmaDictionary]] (disorders→disorder, ran→run, children→child).
 *
 * Консервативно: трогаем только формы, которые словарь ТОЧНО знает как инфлексии
 * (эвристику-правила к чужим данным НЕ применяем — риск ложного схлопа). Семьи
 * слов (decision/decisive) словарь инфлексий не содержит → остаются раздельно.
 *
 * При коллизии форма+лемма лемма получает МАКСИМАЛЬНЫЙ уровень из своих форм
 * («знаешь в одной форме — знаешь слово»), поэтому артефакт вроде disorders=red
 * не тянет disorder=green вниз. Идемпотентно, один раз (флаг в storage), только
 * в top-фрейме и только когда словарь загружен.
 */
export class LemmaMigration {

    static run(service: WordbookService): Promise<void> {
        return new Promise((resolve) => {
            if (window.top !== window.self || !LemmaDictionary.loaded()) {
                resolve();
                return;
            }
            try {
                chrome.storage.local.get([FLAG], (res) => {
                    if (res && res[FLAG]) {
                        resolve();
                        return;
                    }
                    LemmaMigration.collapse(service);
                    chrome.storage.local.set({[FLAG]: true}, () => resolve());
                });
            } catch {
                resolve();
            }
        });
    }

    private static collapse(service: WordbookService): void {
        const cache = service.getWordbookCache();
        const targetNum = new Map<string, number>();   // лемма → макс. уровень (число)
        const removals: string[] = [];

        cache.forEach((level, word) => {
            const lemma = LemmaDictionary.get(word);
            if (!lemma || lemma === word) {
                return;
            }
            removals.push(word);
            const existing = targetNum.has(lemma)
                ? (targetNum.get(lemma) as number)
                : levelNumber(cache.get(lemma) ?? "");
            targetNum.set(lemma, Math.max(existing, levelNumber(level)));
        });

        if (removals.length === 0) {
            return;
        }

        const updates = [...targetNum].map(([word, num]) => ({word, level: levelAt(num).name}));
        service.set(updates);
        removals.forEach((word) => service.remove(word));
    }
}
