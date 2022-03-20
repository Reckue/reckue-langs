import {App} from "./src/core/App";
import {RebuildPageService} from "./src/RebuildPageService";
import {Context} from "./src/core/Context";

const context = new Context();
const service = new RebuildPageService();
const app = new App(service);
app.start();