import {WordbookService} from "../../core/words/WordbookService";
import {Wordbooks, WordbookMeta} from "../../core/words/Wordbooks";
import {Languages} from "../../core/words/Languages";
import {detectScript} from "../../core/words/Script";

/**
 * Раскладка кликнутого слова по языковым словарям (Фаза 1).
 *
 * Слой 0 — активный язык как приор: слово той же письменности, что активный
 * словарь, уходит в активный (общий случай — пользователь читает на изучаемом
 * языке). Слой 1 — письменность (Script): слово другого алфавита уходит в словарь
 * своего языка, если он заведён. Разведение языков ВНУТРИ одной письменности
 * (латиница) здесь не делается — это поздние фазы; при неоднозначности дефолтим.
 *
 * Слова чужих словарей пишем лениво: сервис нужного словаря грузится при первом
 * обращении и кешируется, чтобы не грузить все словари на старте.
 */
export class LanguageRouter {

    readonly #active: WordbookService;
    readonly #activeId: string;
    #list: WordbookMeta[] | null = null;
    #activeScripts: string[] = [];
    readonly #cache = new Map<string, Promise<WordbookService>>();

    constructor(active: WordbookService) {
        this.#active = active;
        this.#activeId = active.getId();
    }

    // Подтянуть реестр словарей и письменности активного языка. До init всё
    // уходит в активный словарь (роутер ещё не знает про другие словари).
    init = (): Promise<void> =>
        Wordbooks.load().then(({list}) => {
            this.#list = list;
            const lang = list.find((w) => w.id === this.#activeId)?.lang;
            this.#activeScripts = lang ? Languages.scriptsOf(lang) : [];
        });

    getActiveId = (): string => this.#activeId;

    // id словаря, куда сохранить слово (синхронно — горячий путь клика).
    targetId = (word: string): string => {
        if (!this.#list) {
            return this.#activeId;
        }
        const script = detectScript(word);
        if (!script || this.#activeScripts.includes(script)) {
            // нет букв известного скрипта, либо письменность активного языка → активный
            return this.#activeId;
        }
        const candidates = this.#list.filter(
            (w) => w.lang && Languages.scriptsOf(w.lang).includes(script)
        );
        if (candidates.length === 0) {
            // язык этой письменности не заведён → дефолт на активный
            return this.#activeId;
        }
        // ровно один словарь этой письменности → он; несколько (неоднозначность
        // языков одной письменности) → первый, до поздних фаз с моделью
        return candidates[0].id;
    };

    // Сервис словаря по id: активный отдаём сразу, чужой грузим лениво и кешируем.
    getService = (id: string): Promise<WordbookService> => {
        if (id === this.#activeId) {
            return Promise.resolve(this.#active);
        }
        const cached = this.#cache.get(id);
        if (cached) {
            return cached;
        }
        const loading = WordbookService.load(id);
        this.#cache.set(id, loading);
        return loading;
    };
}
