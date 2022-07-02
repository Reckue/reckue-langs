import {Context} from "../../core/Context";

export class ChangePageButtons {

    #current
    #pagesList;
    #wordbookService;
    #fillScroll;
    #filter;

    constructor(fillScroll, filter) {
        this.#wordbookService = Context.getWordbookService();
        this.#pagesList = window.document.getElementById("pages");
        this.#fillScroll = fillScroll;
        this.#filter = filter;
    }

    buildPageButtons = (page) => {
        this.#current = page;
        this.#clearPageButtonsElement();
        const countPages = this.#wordbookService.getFilteredWordbook(Context.get("filter").get()).getPages().getCount();
        if (countPages < 10) {
            countPages !== 1 && this.#renderPageButtons(0, countPages);
        } else {
            const first = this.#getFirstLimits(countPages);
            const second = this.#getSecondLimits(countPages);
            this.#buildTwoRowsPageButtons(first, second);
        }
    }

    #clearPageButtonsElement = () => {
        this.#pagesList.innerHTML = "";
    }

    #buildTwoRowsPageButtons = (first, second) => {
        this.#renderPageButtons(first[0], first[1]);
        this.#divideRows();
        this.#renderPageButtons(second[0], second[1]);
    }

    #divideRows = () => {
        const separator = window.document.createTextNode("...");
        this.#pagesList.appendChild(separator);
    }

    #getFirstLimits = (countPages) => {
        if (this.#current >= 2 && this.#current <= countPages - 5) {
            if (this.#current >= countPages - 8) {
                return [countPages - 10, countPages - 5];
            }
            return [this.#current - 2, this.#current + 3];
        }
        return [0, 5];
    }

    #getSecondLimits = (countPages) => [countPages - 5, countPages];

    #renderPageButtons = (start, end) => {
        for (let number = start; number < end; number++) {
            const page = window.document.createElement("a");
            page.target = "_blank";
            page.textContent = `${number}`;
            page.style.cursor = "pointer";
            page.addEventListener("click", () => this.#fillScroll(number));
            this.#pagesList.appendChild(page);
        }
    }
}