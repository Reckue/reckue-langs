import {App} from "./core/App";
import {PopupService} from "./popup/PopupService";

const service = new PopupService();
const app = new App(service);

// Запускаем приложение асинхронно
app.start().catch(error => {
    console.error('Failed to start popup app:', error);
});