import {App} from "./core/App";
import {PageService} from "./page/PageService";
import {Context} from "./core/Context";

// Could be used for debug
const context = new Context();
const service = new PageService();
const app = new App(service);
app.start();