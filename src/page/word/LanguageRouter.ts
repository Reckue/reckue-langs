import {WordbookService} from "../../core/words/WordbookService";
import {Wordbooks, WordbookMeta} from "../../core/words/Wordbooks";
import {Languages} from "../../core/words/Languages";
import {detectScript} from "../../core/words/Script";
import {detectLanguage} from "./I18nDetect";

// Порог уверенности детекта: ниже — дефолтим на активный словарь (приор), чтобы
// не раскладывать слово не туда. CLD2 даёт проценты по топ-языкам.
const CONFIDENCE = 50;

/**
 * Раскладка кликнутого слова по языковым словарям (Фазы 1–2).
 *
 * Слой 0 — активный язык как приор. Слой 1 — письменность (Script): слово другого
 * алфавита уходит в словарь своего языка. Слой 2 — несколько словарей ОДНОЙ
 * письменности (латиница en/de/fr…): различаем chrome.i18n.detectLanguage() по
 * «слову + контексту соседей» с порогом уверенности; при сомнении — активный.
 *
 * Чужие словари грузим лениво: сервис нужного словаря поднимается при первом
 * обращении и кешируется, чтобы не грузить все словари на старте.
 */
export class LanguageRouter {

    readonly #active: WordbookService;
    readonly #activeId: string;
    #list: WordbookMeta[] | null = null;
    readonly #cache = new Map<string, Promise<WordbookService>>();

    constructor(active: WordbookService) {
        this.#active = active;
        this.#activeId = active.getId();
    }

    // Подтянуть реестр словарей. До init всё уходит в активный словарь.
    init = (): Promise<void> =>
        Wordbooks.load().then(({list}) => {
            this.#list = list;
        });

    getActiveId = (): string => this.#activeId;

    /**
     * id словаря, куда сохранить слово. Async, потому что разведение языков одной
     * письменности идёт через chrome.i18n (callback). Общий случай (один словарь
     * на письменность слова) резолвится сразу, без детекта.
     */
    resolveTarget = (word: string, context: string): Promise<string> => {
        if (!this.#list) {
            return Promise.resolve(this.#activeId);
        }
        const script = detectScript(word);
        if (!script) {
            // нет букв известного скрипта (числа/пунктуация) → активный
            return Promise.resolve(this.#activeId);
        }
        const pool = this.#list.filter(
            (w) => w.lang && Languages.scriptsOf(w.lang).includes(script)
        );
        if (pool.length === 0) {
            // язык этой письменности не заведён → дефолт на активный
            return Promise.resolve(this.#activeId);
        }
        if (pool.length === 1) {
            // ровно один словарь этой письменности → он (детерминированно)
            return Promise.resolve(pool[0].id);
        }
        // несколько словарей одной письменности → разводим детектом
        return this.#disambiguate(word, context, pool);
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

    // chrome.i18n по «слову + контексту»: язык из топа, если он уверенный И входит
    // в словари-кандидаты. Иначе приор — активный словарь (если он этой
    // письменности), либо первый кандидат.
    #disambiguate = (word: string, context: string, pool: WordbookMeta[]): Promise<string> => {
        const fallback = pool.find((w) => w.id === this.#activeId)?.id ?? pool[0].id;
        return detectLanguage(context || word).then((res) => {
            if (res && res.reliable && res.percentage >= CONFIDENCE) {
                const match = pool.find((w) => w.lang === res.lang);
                if (match) {
                    return match.id;
                }
            }
            return fallback;
        });
    };
}
