import {Context} from "../../core/Context";
import {HighlightPoc} from "../highlight/HighlightPoc";

export class PageManager {

    run = () => {
        // PoC: подсветка слов словаря через CSS Custom Highlight API + клик -> сохранение/попап.
        const service = Context.getWordbookService();
        if (!service) {
            return;
        }
        new HighlightPoc(service).run();
    }
}
