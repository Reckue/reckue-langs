import {App} from "./core/App";
import {PopupService} from "./popup/PopupService";

const service = new PopupService();
const app = new App(service);
console.log('run popup')
app.start();