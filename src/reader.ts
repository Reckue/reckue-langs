import {App} from "./core/App";
import {ReaderService} from "./reader/ReaderService";

const service = new ReaderService();
const app = new App(service);
app.start();
