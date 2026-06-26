import {useEffect, useState} from "preact/hooks";
import {Navbar, Tab} from "./Navbar";
import {WordbookView} from "./WordbookView";
import {WordbookPicker} from "./WordbookPicker";
import {SettingsView} from "./SettingsView";
import {InfoBar} from "./InfoBar";
import {WordbookService} from "../../core/words/WordbookService";
import {Wordbooks, WordbookMeta} from "../../core/words/Wordbooks";

// Поднять словарь из storage (грузится кусками) и отдать готовый сервис.
function loadService(id: string): Promise<WordbookService> {
    return new Promise((resolve) => {
        const service = new WordbookService(id);
        service.executeAfter(() => resolve(service));
        service.loadWordbooks();
    });
}

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
            loadService(activeId).then(setService);
        });
    }, []);

    const select = (id: string) => {
        if (id === activeId) {
            return;
        }
        setActiveId(id);
        setService(null);
        Wordbooks.setActive(id);
        loadService(id).then(setService);
    };

    const create = (title: string) => {
        Wordbooks.create(title).then((meta) => {
            setList((l) => [...l, meta]);
            setActiveId(meta.id);
            setService(null);
            loadService(meta.id).then(setService);
        });
    };

    return (
        <div class="wrapper">
            <Navbar tab={tab} onTab={setTab}/>
            <div id="content" class="content">
                {tab === "wordbook"
                    ? (
                        <>
                            <WordbookPicker list={list} activeId={activeId} onSelect={select} onCreate={create}/>
                            {service ? <WordbookView key={activeId} service={service}/> : null}
                        </>
                    )
                    : <SettingsView/>}
            </div>
            <InfoBar/>
        </div>
    );
}
