import {addListener, selectByClass} from "../deprecated/html";
import {NavbarBuilder} from "./NavbarBuilder";
import {enumForEach} from "../../core/enum";

export class NavButtons {

    #builder;
    #navbar;
    #refresh;
    #content;
    #buttons;

    constructor() {
        this.#builder = new NavbarBuilder();
        this.#navbar = selectByClass('navbar');
    }

    onClickNavButtons = () => {
        this.#loadButtons();
        addListener(this.#refresh, "click", this.#callParser);
        enumForEach(this.#buttons,button => addListener(button, "click", this.#onClick))
    }

    #loadButtons = () => {
        this.#refresh = selectByClass('refresh-btn');
        this.#buttons = this.#navbar.getElementsByClassName('nav-button');
        this.#content = selectByClass('content');
    }

    #onClick = (event) => {
        enumForEach(this.#buttons,button => button.disabled = false);
        event.target.disabled = true;
        this.checkButtonsAndSetContentVisibility();
    };

    checkButtonsAndSetContentVisibility = () => {
        enumForEach(this.#buttons,button => {
            const className = button.innerText.toLowerCase();
            this.#builder.setContentVisibility(className, button.disabled);
        });
    };

    #callParser = () => {
        window.console.log(chrome.tabs);
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.executeScript(tabs[0].id, {file: './page/page.js'});
        });
    };
}