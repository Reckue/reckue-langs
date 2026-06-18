import {useEffect, useState} from "preact/hooks";

const LANGUAGES = [
    {id: "russian", title: "Russian"},
    {id: "korean", title: "Korean"},
    {id: "english", title: "English"},
    {id: "china", title: "China"}
];

const KEYS = ["enable", "russian", "english", "china", "korean"];

type Settings = Record<string, boolean>;

interface LeverProps {
    label: string;
    on: boolean;
    onToggle: () => void;
}

function Lever({label, on, onToggle}: LeverProps) {
    return (
        <div class="enable" onClick={onToggle}>
            <span>{label}:</span>
            <div class="lever" style={{
                justifyContent: on ? "flex-end" : "flex-start",
                background: on ? "#c2d7bf" : "#ffffff"
            }}>
                <div class="slider">|||</div>
            </div>
        </div>
    );
}

export function SettingsView() {
    const [settings, setSettings] = useState<Settings>({});

    useEffect(() => {
        chrome.storage.local.get(KEYS, (stored) => setSettings(stored as Settings));
    }, []);

    const toggle = (key: string) => {
        const next = {...settings, [key]: !settings[key]};
        setSettings(next);
        chrome.storage.local.set({[key]: next[key]});
    };

    return (
        <div class="settings">
            <Lever label="Enable" on={!!settings.enable} onToggle={() => toggle("enable")}/>
            <div class="block">
                <div class="title">Languages</div>
                {LANGUAGES.map((lang) => (
                    <Lever key={lang.id} label={lang.title} on={!!settings[lang.id]}
                           onToggle={() => toggle(lang.id)}/>
                ))}
            </div>
        </div>
    );
}
