// Бесплатный on-device детектор языка (CLD2) через chrome.i18n.detectLanguage.
// Доступен в content script без permissions и без бандла. Слаб на одиночном слове,
// поэтому зовём на «слово + контекст соседей» и доверяем только при уверенности.
export interface Detected {
    lang: string;       // первичный subtag (en, de, pt …)
    percentage: number; // 0..100 — уверенность по топ-языку
    reliable: boolean;  // флаг надёжности от CLD2
}

export function detectLanguage(text: string): Promise<Detected | null> {
    const i18n = (typeof chrome !== "undefined" ? chrome.i18n : undefined) as any;
    if (!i18n || typeof i18n.detectLanguage !== "function") {
        return Promise.resolve(null);
    }
    return new Promise((resolve) => {
        try {
            i18n.detectLanguage(text, (res: any) => {
                const top = res && res.languages && res.languages[0];
                if (!top || !top.language || top.language === "und") {
                    resolve(null);
                    return;
                }
                resolve({
                    lang: String(top.language).split("-")[0],
                    percentage: typeof top.percentage === "number" ? top.percentage : 0,
                    reliable: !!res.isReliable
                });
            });
        } catch {
            resolve(null);
        }
    });
}
