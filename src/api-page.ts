import {ApiApp} from "./core/ApiApp";
import {ApiPageService} from "./page/ApiPageService";

const service = new ApiPageService();
const app = new ApiApp(service);
app.start();