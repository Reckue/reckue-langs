import {Context} from "../../../core/Context";
import {PopupController} from "../controllers/popup/PopupController";

export class PopupManager {

    #popupController: PopupController;

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