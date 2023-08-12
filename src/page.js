import {App} from "./core/App";
import {PageService} from "./page/PageService";

const service = new PageService();
const app = new App(service);
app.start();