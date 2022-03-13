import {Wordbook} from "./src/wordbook/Wordbook";
import {App} from "./src/App";

const wordbook = new Wordbook();
const app = new App(wordbook);
app.start();