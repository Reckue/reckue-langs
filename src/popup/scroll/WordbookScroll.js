import {Context} from "../../core/Context";
import {enumForEach} from "../../core/enum";
import {addClass, create} from "../deprecated/html";
import {Levels} from "../../enum/Levels";
import {Wordbook} from "../../core/words/Wordbook";

export class WordbookScroll {

    #wordbookService;
    #pages;
    #current;

    constructor() {
        this.#wordbookService = Context.getWordbookService();
        this.#pages = window.document.getElementById("pages");
    }

    buildPageButtons = () => {
        const countPages = Math.ceil(this.#wordbookService.getWordbook().size / 100);
        if (countPages < 10) {
            this.renderPageButtons(0, countPages);
        } else {
            this.renderPageButtons(0, 5);
            this.#pages.appendChild(window.document.createTextNode("..."));
            this.renderPageButtons(countPages - 5, countPages);
        }
    }

    renderPageButtons = (start, end) => {
        for (let number = start; number < end; number++) {
            const page = window.document.createElement("a");
            page.target = "_blank";
            page.textContent = `${number}`;
            page.style.cursor = "pointer";
            page.addEventListener("click", () => this.fillScroll(number));
            this.#pages.appendChild(page);
        }
    }

    fillScroll = (page) => {
        this.#current = page;
        this.#clearScroll();
        this.buildPageButtons();
        this.#wordbookService.getPart(page).then(loaded => {
            const wordbook = new Wordbook();
            wordbook.set(loaded);
            const cache = wordbook.get();
            cache.forEach((level, word) => this.#displayWord(word, level));
        });
    }

    #displayWord = (word, level) => {
        const wordbook = this.#getWordbookElement();
        const row = this.#buildRow(word, level);
        wordbook.appendChild(row);
    }

    #clearScroll = () => {
        this.#getWordbookElement().innerHTML = "";
        this.#pages.innerHTML = "";
    }

    #getWordbookElement = () => window.document.getElementsByClassName('words')[0];

    #buildRow = (word, level) => {
        const row = create('div');
        row.textContent = word;
        this.#configureSelect(row, level);
        return row;
    };

    #configureSelect = (row, level) => {
        const select = create('select');
        addClass(select,'level');
        row.appendChild(select);
        this.#addOptions(select, level);
        return select;
    };

    #addOptions = (select, selected) => {
        enumForEach(Levels, (level) => {
            this.#configureOption(select, level.name, selected);
        });
    }

    #configureOption = (select, value, selected) => {
        const option = document.createElement('option');
        option.value = value;
        option.innerText = value;
        option.selected = selected === value;
        select.appendChild(option)
    };

    #configureColumn = (content, className, parent) => {
        const span = create('span');
        span.innerText = content;
        span.classList.add(className);
        parent.appendChild(span);
    };
}