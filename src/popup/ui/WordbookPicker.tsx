import {useState} from "preact/hooks";
import {WordbookMeta} from "../../core/words/Wordbooks";

interface WordbookPickerProps {
    list: WordbookMeta[];
    activeId: string;
    onSelect: (id: string) => void;
    onCreate: (title: string) => void;
}

/**
 * Выбор активного словаря (по одному на язык) и создание нового. Активный
 * словарь определяет, куда сохраняются и где подсвечиваются слова.
 */
export function WordbookPicker({list, activeId, onSelect, onCreate}: WordbookPickerProps) {
    const [creating, setCreating] = useState(false);
    const [title, setTitle] = useState("");

    const submit = () => {
        const next = title.trim();
        setTitle("");
        setCreating(false);
        if (next) {
            onCreate(next);
        }
    };

    return (
        <div class="wordbook-picker">
            {creating
                ? (
                    <>
                        <input class="wb-name" autofocus placeholder="Language name…" value={title}
                               onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
                               onKeyDown={(e) => {
                                   if (e.key === "Enter") {
                                       submit();
                                   } else if (e.key === "Escape") {
                                       setTitle("");
                                       setCreating(false);
                                   }
                               }}/>
                        <button class="wb-add" onClick={submit}>Add</button>
                    </>
                )
                : (
                    <>
                        <select class="wb-select" value={activeId}
                                onChange={(e) => onSelect((e.target as HTMLSelectElement).value)}>
                            {list.map((w) => <option value={w.id}>{w.title}</option>)}
                        </select>
                        <button class="wb-new" onClick={() => setCreating(true)}>+ New</button>
                    </>
                )}
        </div>
    );
}
