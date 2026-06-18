export function InfoBar() {
    const version = chrome.runtime.getManifest().version;
    return <div class="infobar">Version {version}</div>;
}
