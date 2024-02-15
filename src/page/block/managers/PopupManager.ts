import {Context} from "../../../core/Context";
import {Menu} from "../controllers/menu/Menu";

export class PopupManager {

    #popupController: Menu;

    constructor(popupName: string) {
        this.#popupController = Context.get(popupName);
    }

    updatePopup = (word: string, netGraph: object) => {
        const ref = this.#popupController.getRef();
        this.#popupController.displayOn();
        this.#popupController.setContent(word, netGraph);
        this.#popupController.setPosition(
            window.innerWidth - ref.offsetWidth,
            window.innerHeight - ref.offsetHeight - 20
        );
    }
}