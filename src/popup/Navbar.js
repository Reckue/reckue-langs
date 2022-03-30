import {enumForEach} from "../../popup/js/enum";
import {addClass, create, selectByClass, addListener} from "../../popup/js/html";

export class Navbar {

    #navbar = selectByClass('navbar');
    #refresh;
    #buttons;
    #content;

    init = () => {
        enumForEach(Navbar, (buttonInfo) => {
            const button = create("button");
            button.disabled = buttonInfo.disabled;
            button.textContent = buttonInfo.title;
            const className = buttonInfo.className;
            addClass(button, className);
            this.#navbar.appendChild(button);
        });

        this.#refresh = selectByClass('refresh-btn');
        this.#buttons = this.#navbar.getElementsByClassName('nav-button');
        this.#content = selectByClass('content');

        // Привязываем к кнопке refresh событие, вызывающее парсинг текущей открытой страницы.
        addListener(this.#refresh, "click", this.#callParser);

        // Активируем выделеную кнопку, диактивируем все отстальные.
        this.#checkButtonsAndSetContentVisibility();

        // Добавляем каждой из кнопок событие, меняющее контент menu окна и активность выделеной кнопки.
        for (let button of this.#buttons) {
            addListener(button, "click", this.#onClick);
        }
    }

    #callParser = () => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.executeScript(tabs[0].id, {file: './page/start.js'});
        });
    };

    #checkButtonsAndSetContentVisibility = () => {
        for (let button of this.#buttons) {
            const className = button.innerText.toLowerCase();
            if (button.disabled) {
                this.#setContentVisibility(className, 'visible');
            } else {
                this.#setContentVisibility(className, 'hidden');
            }
        }
    };

    #setContentVisibility = (className, value) => {
        const entry = this.#content.getElementsByClassName(className)[0];
        entry.style.visibility = value;
        if (value === 'visible') {
            entry.style.transform = 'translate(0px)';
        } else {
            entry.style.transform = 'translate(-400px)';
        }
    };

    #onClick = (event) => {
        for (let button of this.#buttons) {
            button.disabled = false;
        }
        event.target.disabled = true;
        this.#checkButtonsAndSetContentVisibility();
    };
}