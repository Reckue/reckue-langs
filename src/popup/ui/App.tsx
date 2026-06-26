import {useEffect, useMemo, useState} from "preact/hooks";
import {Navbar, Tab} from "./Navbar";
import {WordbookView} from "./WordbookView";
import {WordbookPicker} from "./WordbookPicker";
import {SettingsView} from "./SettingsView";
import {InfoBar} from "./InfoBar";
import {WordbookService} from "../../core/words/WordbookService";
import {Wordbooks, WordbookMeta} from "../../core/words/Wordbooks";
import {Languages} from "../../core/words/Languages";

export function App() {
    const [tab, setTab] = useState<Tab>("wordbook");
    const [list, setList] = useState<WordbookMeta[]>([]);
    const [activeId, setActiveId] = useState("");
    const [service, setService] = useState<WordbookService | null>(null);

    // Первичная загрузка: реестр словарей + активный словарь.
    useEffect(() => {
        Wordbooks.load().then(({list, activeId}) => {
            setList(list);
            setActiveId(activeId);
            WordbookService.load(activeId).then(setService);
        });
    }, []);

    // Языки, для которых ещё нет словаря — их предлагаем создать.
    const addable = useMemo(() => {
        const used = new Set(list.map((w) => w.lang).filter(Boolean));
        return Languages.list()
            .filter((l) => !used.has(l.code))
            .map((l) => ({code: l.code, name: Languages.name(l.code)}))
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [list]);

    const select = (id: string) => {
        if (id === activeId) {
            return;
        }
        setActiveId(id);
        setService(null);
        Wordbooks.setActive(id);
        WordbookService.load(id).then(setService);
    };

    const create = (lang: string) => {
        Wordbooks.create(lang).then((meta) => {
            setList((l) => (l.some((w) => w.id === meta.id) ? l : [...l, meta]));
            setActiveId(meta.id);
            setService(null);
            WordbookService.load(meta.id).then(setService);
        });
    };

    return (
        <div class="wrapper">
            <Navbar tab={tab} onTab={setTab}/>
            <div id="content" class="content">
                {tab === "wordbook"
                    ? (
                        <>
                            <WordbookPicker list={list} activeId={activeId} languages={addable}
                                            onSelect={select} onCreate={create}/>
                            {service ? <WordbookView key={activeId} service={service}/> : null}
                        </>
                    )
                    : <SettingsView/>}
            </div>
            <InfoBar/>
        </div>
    );
}
