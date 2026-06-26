import {render} from "preact";
import {App} from "./popup/ui/App";

/**
 * Точка входа попапа. App сам поднимает реестр словарей и активный словарь из
 * chrome.storage (грузится кусками), переключает активный словарь и рендерит UI.
 */
const root = document.getElementById("root") as HTMLElement;
render(<App/>, root);
