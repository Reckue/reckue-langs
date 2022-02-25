class Container {

    #ref;

    constructor(parent) {
        this.#ref = window.document.createElement("div");
        this.#ref.style.textAlign = "center";
        parent.appendChild(this.#ref);
    }

    getRef = () => {
        return this.#ref;
    }

    setStyle = (name, value) => {
        this.#ref.style[name] = value;
    }
}