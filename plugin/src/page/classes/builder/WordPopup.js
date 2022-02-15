class WordPopup {

    #ref;

    #left = "0";
    #top = "0";

    #width = 80;

    constructor() {
        this.#create();
    }

    #create = () => {
        this.#ref = window.document.createElement("div");
        this.#ref.style.position = "fixed";
        this.#ref.style.width = this.#width + "px";
        this.#ref.style.height = "40px";
        this.#ref.style.background = "black";
        this.#ref.style.zIndex = "100";
        this.#onMouseOn();
        this.displayOff();
        this.#updatePosition();
        const body = window.document.querySelector('body');
        body.appendChild(this.#ref);
    }

    #updatePosition = () => {
        this.#ref.style.left = this.#left;
        this.#ref.style.top = this.#top;
    }

    setPosition = (left, top) => {
        const offset = this.#width / 2;
        this.#left = `${left - offset}px`;
        this.#top = `${top}px`;
        this.#updatePosition();
    }

    displayOn = () => {
        this.#ref.style.display = "block";
    }

    displayOff = () => {
        this.#ref.style.display = "none";
    }

    #onMouseOn() {
        this.#ref.addEventListener("mouseover", () => this.displayOn());
        this.#ref.addEventListener("mouseout", () => this.displayOff());
    }
}