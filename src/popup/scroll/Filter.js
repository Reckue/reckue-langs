export class Filter {

    #filter;
    #buildPageButtons;
    #fillScroll;

    constructor(buildPageButtons, fillScroll) {
        this.#filter = "";
        this.#buildPageButtons = buildPageButtons;
        this.#fillScroll = fillScroll;
        this.#setupInput();
    }

    #setupInput = () => {
        const filterInput = window.document.getElementById("filter-terms");
        filterInput.addEventListener("change", (e) => {
            this.#filter = e.target.value;
            this.#buildPageButtons(0);
            this.#fillScroll(0);
        });
    }

    get = () => {
        return this.#filter;
    }
}