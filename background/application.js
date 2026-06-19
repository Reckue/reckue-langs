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