import {App} from "./core/App";
import {PageService} from "./page/PageService";
import {Context} from "./core/Context";

const service = new PageService();
const app = new App(service);
app.start();