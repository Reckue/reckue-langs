import {PageNodesController} from "../controllers/PageNodesController";
import {SeparatedNodesProvider} from "../providers/SeparatedNodesProvider";

export class TextNodesManager {

    private nodesController: PageNodesController;
    private readonly separatedNodesProvider: SeparatedNodesProvider;

    constructor() {
        this.separatedNodesProvider = new SeparatedNodesProvider();
        this.nodesController = new PageNodesController(this.separatedNodesProvider);
    }

    findAllTextNodes = () => {
        const separatedNodes = this.nodesController.getSeparatedNodesFormBody();
        separatedNodes.parentNodes.forEach((node) => {
            this.separatedNodesProvider.getSeparatedNodes(Array.from(node.childNodes));
        })
    }
}