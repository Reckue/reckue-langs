chrome.storage.local.set({enable: true, russian: true, english: true, china: false, korean: true});

// Перехват PDF: редиректим навигацию на *.pdf (web и file://) в свой вьювер на
// PDF.js (dist/reader), т.к. нативный вьювер Chrome контент-скрипту недоступен.
// Правило динамическое (а не статический ruleset), чтобы подставить полный URL
// вьювера через chrome.runtime.getURL — id расширения в статике недоступен.
// Исходный адрес уходит в ?file=<url> (целиком, \\0 = вся совпавшая строка).
const PDF_REDIRECT_RULE_ID = 1;

function registerPdfRedirect() {
    const target = chrome.runtime.getURL("dist/reader/index.html");
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [PDF_REDIRECT_RULE_ID],
        addRules: [{
            id: PDF_REDIRECT_RULE_ID,
            priority: 1,
            action: {
                type: "redirect",
                redirect: {regexSubstitution: target + "?file=\\0"}
            },
            condition: {
                regexFilter: "^(https?|file)://[^?#]+\\.pdf([?#].*)?$",
                resourceTypes: ["main_frame"]
            }
        }]
    }).catch((e) => console.warn("Reckue: не удалось зарегистрировать PDF-редирект", e));
}

chrome.runtime.onInstalled.addListener(registerPdfRedirect);
chrome.runtime.onStartup.addListener(registerPdfRedirect);

// --- Словарь лемм (словоформа→лемма) -----------------------------------------
// Качаем michmech-словарь через ручку Langs и кэшируем в chrome.storage; контент-
// скрипт берёт его для лемматизации (см. src/page/word/LemmaDictionary.ts). Это
// download справочных данных — пользовательские данные наружу не уходят.
// Формат строк ручки: "лемма<TAB>форма" (CRLF, BOM в первой строке); строим
// карту форма→лемма, отбрасывая числовые/нелатинские записи (1→first и т.п.).
const LEMMA_LANG = "en";
const LEMMA_KEY = "lemmaDict:" + LEMMA_LANG;
const LEMMA_ETAG_KEY = "lemmaEtag:" + LEMMA_LANG;
const LEMMA_URL = "https://api.reckue.com/api/1/dictionaries/" + LEMMA_LANG + "/lemmas";
const LEMMA_ALPHA = /^[a-z]+$/;

function parseLemmaDict(text) {
    const map = Object.create(null);
    const lines = text.split("\n");
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (i === 0) {
            line = line.replace(/^﻿/, "");
        }
        if (line.charCodeAt(line.length - 1) === 13) {
            line = line.slice(0, -1);
        }
        const tab = line.indexOf("\t");
        if (tab < 1) {
            continue;
        }
        const lemma = line.slice(0, tab).toLowerCase();
        const form = line.slice(tab + 1).toLowerCase();
        if (form === lemma || !LEMMA_ALPHA.test(lemma) || !LEMMA_ALPHA.test(form)) {
            continue;
        }
        map[form] = lemma;
    }
    return map;
}

async function syncLemmaDict() {
    try {
        const stored = await chrome.storage.local.get([LEMMA_ETAG_KEY, LEMMA_KEY]);
        const headers = {};
        if (stored[LEMMA_ETAG_KEY] && stored[LEMMA_KEY]) {
            headers["If-None-Match"] = stored[LEMMA_ETAG_KEY];
        }
        const res = await fetch(LEMMA_URL, {headers});
        if (res.status === 304) {
            return;
        }
        if (!res.ok) {
            console.warn("Reckue: словарь лемм — HTTP", res.status);
            return;
        }
        const map = parseLemmaDict(await res.text());
        await chrome.storage.local.set({
            [LEMMA_KEY]: map,
            [LEMMA_ETAG_KEY]: res.headers.get("ETag") || ""
        });
        console.log("Reckue: словарь лемм обновлён,", Object.keys(map).length, "форм");
    } catch (e) {
        console.warn("Reckue: не удалось загрузить словарь лемм", e);
    }
}

chrome.runtime.onInstalled.addListener(syncLemmaDict);
chrome.runtime.onStartup.addListener(syncLemmaDict);

// --- Словарь семей (лемма→словообразовательные родственники) ------------------
// Качаем бандл из ручки Langs (строится из word_derivations/OEWN) и кэшируем;
// контент-скрипт берёт его для секции «семья» в попапе (см. FamilyDictionary.ts).
// Формат строк: "лемма<TAB>родственник1,родственник2" (уже lowercase, без BOM).
const FAMILY_KEY = "familyDict:" + LEMMA_LANG;
const FAMILY_ETAG_KEY = "familyEtag:" + LEMMA_LANG;
const FAMILY_URL = "https://api.reckue.com/api/1/dictionaries/" + LEMMA_LANG + "/families";

function parseFamilyDict(text) {
    const map = Object.create(null);
    const lines = text.split("\n");
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (line.charCodeAt(line.length - 1) === 13) {
            line = line.slice(0, -1);
        }
        const tab = line.indexOf("\t");
        if (tab < 1) {
            continue;
        }
        const lemma = line.slice(0, tab);
        const rest = line.slice(tab + 1);
        if (!rest) {
            continue;
        }
        map[lemma] = rest.split(",");
    }
    return map;
}

async function syncFamilyDict() {
    try {
        const stored = await chrome.storage.local.get([FAMILY_ETAG_KEY, FAMILY_KEY]);
        const headers = {};
        if (stored[FAMILY_ETAG_KEY] && stored[FAMILY_KEY]) {
            headers["If-None-Match"] = stored[FAMILY_ETAG_KEY];
        }
        const res = await fetch(FAMILY_URL, {headers});
        if (res.status === 304) {
            return;
        }
        if (!res.ok) {
            console.warn("Reckue: словарь семей — HTTP", res.status);
            return;
        }
        const map = parseFamilyDict(await res.text());
        await chrome.storage.local.set({
            [FAMILY_KEY]: map,
            [FAMILY_ETAG_KEY]: res.headers.get("ETag") || ""
        });
        console.log("Reckue: словарь семей обновлён,", Object.keys(map).length, "лемм");
    } catch (e) {
        console.warn("Reckue: не удалось загрузить словарь семей", e);
    }
}

chrome.runtime.onInstalled.addListener(syncFamilyDict);
chrome.runtime.onStartup.addListener(syncFamilyDict);