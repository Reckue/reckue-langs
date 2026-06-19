import {render} from "preact";
import {App} from "./popup/ui/App";
import {WordbookService} from "./core/words/WordbookService";

/**
 * Точка входа попапа. Поднимаем словарь из chrome.storage (грузится кусками),
 * и только после полной загрузки рендерим Preact-приложение.
 */
const service = new WordbookService();
const root = document.getElementById("root") as HTMLElement;

service.executeAfter(() => {
    render(<App service={service}/>, root);
});
service.loadWordbooks();
