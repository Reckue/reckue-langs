import {Languages} from "./Languages";

export interface WordbookMeta {
    id: string;
    title: string;
    // Язык словаря (ISO 639-1). Определяет письменность словаря и куда раскладывать
    // кликнутые слова. У legacy-дефолта языка нет — раскладка для него выключена.
    lang?: string;
}

// Реестр словарей и активный словарь живут в chrome.storage.local.
const LIST_KEY = "wordbookList";
const ACTIVE_KEY = "activeWordbook";

// Дефолтный словарь (id "") хранится в legacy-ключах wordbook0, wordbook1…,
// чтобы уже накопленные слова не потерялись при переходе на много словарей.
const DEFAULT: WordbookMeta = {id: "", title: "Default"};

// id из названия: слаг + числовой суффикс при коллизии.
function uniqueId(title: string, list: WordbookMeta[]): string {
    const base = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "wb";
    let id = base;
    let n = 1;
    while (list.some((w) => w.id === id)) {
        id = `${base}-${n++}`;
    }
    return id;
}

/**
 * Несколько словарей (по одному на язык). Каждый словарь хранит свои куски в
 * storage под собственным префиксом ключа; активный словарь определяет, куда
 * попадают новые слова и какой словарь грузится на странице/в попапе.
 */
export class Wordbooks {

    // Префикс ключей куска в storage. Дефолт (id "") → legacy "wordbook"
    // (wordbook0, wordbook1…), именованный словарь → "wordbook_<id>_"
    // (wordbook_english_0…). Оба начинаются с "wordbook", поэтому слушатели
    // chrome.storage в page/reader продолжают срабатывать.
    static keyPrefix = (id: string): string =>
        id ? `wordbook_${id}_` : "wordbook";

    static load = (): Promise<{list: WordbookMeta[]; activeId: string}> =>
        new Promise((resolve) => {
            chrome.storage.local.get([LIST_KEY, ACTIVE_KEY], (s) => {
                const stored = s[LIST_KEY] as WordbookMeta[] | undefined;
                const list = stored && stored.length ? stored : [DEFAULT];
                const active = s[ACTIVE_KEY] as string | undefined;
                const activeId = list.some((w) => w.id === active) ? active! : list[0].id;
                resolve({list, activeId});
            });
        });

    static getActiveId = (): Promise<string> =>
        Wordbooks.load().then((r) => r.activeId);

    static setActive = (id: string): Promise<void> =>
        new Promise((resolve) => chrome.storage.local.set({[ACTIVE_KEY]: id}, () => resolve()));

    // Создать словарь под язык и сделать его активным. Один язык — один словарь:
    // если словарь языка уже есть, просто активируем его.
    static create = (lang: string): Promise<WordbookMeta> =>
        Wordbooks.load().then(({list}) => {
            const existing = list.find((w) => w.lang === lang);
            if (existing) {
                return new Promise<WordbookMeta>((resolve) =>
                    chrome.storage.local.set({[ACTIVE_KEY]: existing.id}, () => resolve(existing)));
            }
            const meta: WordbookMeta = {id: uniqueId(lang, list), title: Languages.name(lang), lang};
            const next = [...list, meta];
            return new Promise<WordbookMeta>((resolve) =>
                chrome.storage.local.set({[LIST_KEY]: next, [ACTIVE_KEY]: meta.id}, () => resolve(meta)));
        });
}
