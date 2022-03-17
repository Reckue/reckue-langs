import {App} from "./src/core/App";
import {RebuildPageService} from "./src/RebuildPageService";

const service = new RebuildPageService();
const app = new App(service);
app.start();