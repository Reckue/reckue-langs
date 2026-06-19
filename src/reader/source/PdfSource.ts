export type PdfSourceDescriptor =
    | { url: string; withCredentials: boolean }
    | { data: Uint8Array };

/**
 * Откуда берём байты PDF:
 *  - ?file=<original-url> в адресе вьювера (после DNR-редиректа веб/локального PDF);
 *  - локальный файл, выбранный пользователем (кнопка/drag&drop).
 *
 * file= парсим срезом, а не URLSearchParams: исходный URL может содержать
 * собственные ?a=1&b=2, и парсер обрезал бы его по первому &.
 */
export class PdfSource {

    static fromQuery = (): PdfSourceDescriptor | null => {
        const marker = "?file=";
        const idx = location.href.indexOf(marker);
        if (idx < 0) {
            return null;
        }
        let url = location.href.slice(idx + marker.length);
        if (url.includes("%")) {
            try {
                url = decodeURIComponent(url);
            } catch {
                // оставляем как есть, если это не валидный percent-encoding
            }
        }
        return {url, withCredentials: true};
    };

    static fromFile = async (file: File): Promise<PdfSourceDescriptor> => {
        const buffer = await file.arrayBuffer();
        return {data: new Uint8Array(buffer)};
    };
}
