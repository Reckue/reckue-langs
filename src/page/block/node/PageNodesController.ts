import {SeparatedNodesProvider} from "./SeparatedNodesProvider";

export class PageNodesController {

    private separatedNodesProvider: SeparatedNodesProvider;

    constructor(separatedNodesProvider: SeparatedNodesProvider) {
        this.separatedNodesProvider = separatedNodesProvider;
    }

    getSeparatedNodesFormBody = () => {
        return this.separatedNodesProvider.getSeparatedNodes(Array.from(window.document.body.childNodes));
    }
}