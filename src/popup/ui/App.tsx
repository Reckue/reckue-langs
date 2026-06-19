import {useState} from "preact/hooks";
import {Navbar, Tab} from "./Navbar";
import {WordbookView} from "./WordbookView";
import {SettingsView} from "./SettingsView";
import {InfoBar} from "./InfoBar";

interface AppProps {
    service: any;
}

export function App({service}: AppProps) {
    const [tab, setTab] = useState<Tab>("wordbook");
    return (
        <div class="wrapper">
            <Navbar tab={tab} onTab={setTab}/>
            <div id="content" class="content">
                {tab === "wordbook"
                    ? <WordbookView service={service}/>
                    : <SettingsView/>}
            </div>
            <InfoBar/>
        </div>
    );
}
