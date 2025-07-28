import {ApiApp} from "./core/ApiApp.js";
import {ApiPopupService} from "./popup/ApiPopupService.js";

const service = new ApiPopupService();
const app = new ApiApp(service);
app.start();