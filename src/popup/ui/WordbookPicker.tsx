import {useState} from "preact/hooks";
import {WordbookMeta} from "../../core/words/Wordbooks";

interface AddableLang {
    code: string;
    name: string;
}

interface WordbookPickerProps {
    list: WordbookMeta[];
    activeId: string;
    languages: AddableLang[];
    onSelect: (id: string) => void;
    onCreate: (lang: string) => void;
}

/**
 * Выбор активного словаря (= изучаемого языка) и создание словаря под новый язык.
 * Активный язык — приор для раскладки кликнутых слов по языковым словарям.
 */
export function WordbookPicker({list, activeId, languages, onSelect, onCreate}: WordbookPickerProps) {
    const [creating, setCreating] = useState(false);
    const [lang, setLang] = useState("");

    const start = () => {
        setLang(languages[0]?.code ?? "");
        setCreating(true);
    };

    const submit = () => {
        setCreating(false);
        if (lang) {
            onCreate(lang);
        }
    };

    return (
        <div class="wordbook-picker">
            {creating
                ? (
                    <>
                        <select class="wb-name" value={lang}
                                onChange={(e) => setLang((e.target as HTMLSelectElement).value)}>
                            {languages.map((l) => <option value={l.code}>{l.name}</option>)}
                        </select>
                        <button class="wb-add" disabled={!lang} onClick={submit}>Add</button>
                        <button class="wb-add" onClick={() => setCreating(false)}>✕</button>
                    </>
                )
                : (
                    <>
                        <select class="wb-select" value={activeId}
                                onChange={(e) => onSelect((e.target as HTMLSelectElement).value)}>
                            {list.map((w) => <option value={w.id}>{w.title}</option>)}
                        </select>
                        <button class="wb-new" disabled={!languages.length} onClick={start}>+ New</button>
                    </>
                )}
        </div>
    );
}
