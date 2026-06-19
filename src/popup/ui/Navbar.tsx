export type Tab = "wordbook" | "settings";

interface NavbarProps {
    tab: Tab;
    onTab: (tab: Tab) => void;
}

/**
 * Перезапускает парсинг активной вкладки. MV3: используем chrome.scripting
 * (chrome.tabs.executeScript удалён в Manifest V3).
 */
function refreshPage(): void {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const tabId = tabs[0]?.id;
        if (tabId != null) {
            chrome.scripting.executeScript({
                target: {tabId},
                files: ["dist/page/page.js"]
            });
        }
    });
}

export function Navbar({tab, onTab}: NavbarProps) {
    return (
        <nav class="navbar">
            <button class="nav-button" disabled={tab === "wordbook"} onClick={() => onTab("wordbook")}>
                Wordbook
            </button>
            <button class="nav-button" disabled={tab === "settings"} onClick={() => onTab("settings")}>
                Settings
            </button>
            <button class="refresh-btn" onClick={refreshPage}>↺ page</button>
        </nav>
    );
}
