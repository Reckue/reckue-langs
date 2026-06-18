import {useMemo, useState} from "preact/hooks";
import {Levels} from "../../core/enum/Levels.js";

const LEVEL_NAMES: string[] = Object.keys(Levels).map((key) => (Levels as any)[key].name);

interface WordbookViewProps {
    service: any;
}

interface PaginationProps {
    page: number;
    pageCount: number;
    onPage: (page: number) => void;
}

/**
 * Окно номеров страниц: если страниц мало — показываем все,
 * иначе — первые несколько, разделитель и последние несколько.
 */
function pageWindow(page: number, pageCount: number): number[] {
    if (pageCount <= 1) {
        return [];
    }
    if (pageCount < 10) {
        return Array.from({length: pageCount}, (_, i) => i);
    }
    const around = new Set<number>([0, 1, pageCount - 2, pageCount - 1, page, page - 1, page + 1]);
    return Array.from(around).filter((n) => n >= 0 && n < pageCount).sort((a, b) => a - b);
}

function Pagination({page, pageCount, onPage}: PaginationProps) {
    const numbers = pageWindow(page, pageCount);
    if (numbers.length === 0) {
        return null;
    }
    return (
        <div id="pages">
            {numbers.map((number, index) => (
                <>
                    {index > 0 && number - numbers[index - 1] > 1 ? <span>...</span> : null}
                    <a class={number === page ? "page active" : "page"} onClick={() => onPage(number)}>
                        {number}
                    </a>
                </>
            ))}
        </div>
    );
}

export function WordbookView({service}: WordbookViewProps) {
    const [filter, setFilter] = useState("");
    const [page, setPage] = useState(0);
    // Счётчик-ревизия: меняем его, чтобы пересчитать словарь после правок.
    const [revision, setRevision] = useState(0);

    const filtered = useMemo(
        () => service.getFilteredWordbook(filter),
        [service, filter, revision]
    );
    const pageCount: number = filtered.getPages().getCount() || 0;
    const words = Array.from(filtered.getPage(page).entries()) as [string, string][];

    const changeLevel = (word: string, level: string) => {
        service.set([{word, level}]);
        setRevision((r) => r + 1);
    };

    const changeWord = (oldWord: string, newWord: string) => {
        const level = service.getWordbookCache().get(oldWord);
        service.remove(oldWord);
        service.set([{word: newWord, level}]);
        setPage(0);
        setRevision((r) => r + 1);
    };

    const onFilter = (event: Event) => {
        setFilter((event.target as HTMLInputElement).value);
        setPage(0);
    };

    return (
        <div class="wordbook">
            <div class="header">
                <div class="filter">
                    <input id="filter-terms" placeholder="Search or filter words..."
                           value={filter} onInput={onFilter}/>
                </div>
            </div>
            <div class="words" id="words">
                {words.map(([word, level]) => (
                    <div class="word" key={word}>
                        <input class="clear" value={word}
                               onChange={(e) => {
                                   const next = (e.target as HTMLInputElement).value;
                                   if (next && next !== word) {
                                       changeWord(word, next);
                                   }
                               }}/>
                        <select class="level" value={level}
                                onChange={(e) => changeLevel(word, (e.target as HTMLSelectElement).value)}>
                            {LEVEL_NAMES.map((name) => <option value={name}>{name}</option>)}
                        </select>
                    </div>
                ))}
            </div>
            <Pagination page={page} pageCount={pageCount} onPage={setPage}/>
        </div>
    );
}
