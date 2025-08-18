import {App} from "./core/App";
import {PageService} from "./page/PageService";

const service = new PageService();
const app = new App(service);

// Запускаем приложение асинхронно
app.start().catch(error => {
    console.error('Failed to start page app:', error);
});