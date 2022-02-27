const WORD_POPUP_WIDTH = 100;

class LevelContainer extends Container {

    #realWordRef

    #plus;
    #minus;
    #number;

    constructor(parent) {
        super(parent);
        this.#initStyles();
        this.#createLevelDisplay();
        this.#registerButtons();
    }

    setLevel = (level) => {
        this.#number.getRef().textContent = Levels[level.toUpperCase()].number;
    }

    setRealWordRef = (ref) => {
        this.#realWordRef = ref;
    }

    #registerButtons = () => {
        this.#plus.getRef().addEventListener("click", () => this.#increaseLevel());
        this.#minus.getRef().addEventListener("click", () => this.#decreaseLevel());
    }

    #increaseLevel = () => {
        const current = parseInt(this.#number.getRef().textContent);
        const next = current + 1;
        this.#changeLevel(next);
    }

    #decreaseLevel = () => {
        const current = parseInt(this.#number.getRef().textContent);
        if (current > 0) {
            const next = current - 1;
            this.#changeLevel(next);
        }
    }

    #changeLevel = (next) => {
        enumForEach(Levels, (level) => {
            if (level.number === next) {
                this.#number.getRef().textContent = next;
                colorResolver(this.#realWordRef, level.name);
                //TODO:: wordbook.set(word, new-level);
            }
        });
    }

    #initStyles = () => {
        this.setStyle("marginTop", "16px");
        this.setStyle("width", WORD_POPUP_WIDTH + "px");
        this.setStyle("height", "30px");
        this.setStyle("display", "flex");
        this.setStyle("flexDirection", "row");
        this.setStyle("justifyContent", "space-around");
        this.setStyle("alignItems", "center");
        this.setStyle("fontFamily", "Impact, serif");
    }

    #createLevelDisplay = () => {
        this.#plus = new Container(this.getRef());
        this.#plus.getRef().textContent = "+";
        this.#plus.setStyle("cursor", "pointer");

        this.#number = new Container(this.getRef());
        this.#number.getRef().textContent = "0";
        this.#number.setStyle("color", "#444");

        this.#minus = new Container(this.getRef());
        this.#minus.getRef().textContent = "-";
        this.#minus.setStyle("cursor", "pointer");
    }
}