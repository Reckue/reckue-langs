import {App} from "./core/App.js";
import {PopupService} from "./popup/PopupService.js";

const service = new PopupService();
const app = new App(service);
app.start();