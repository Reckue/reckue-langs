import {SeparatedNodesModel} from "../managers/models/SeparatedNodesModel";

export class SeparatedNodesProvider {

    getSeparatedNodes = (childNodes: Array<Node>) => {
        const nodes = new SeparatedNodesModel();

        childNodes.forEach((node) => {
            if (node.nodeName === "#text") {
                nodes.textNodes.push(node);
            } else {
                nodes.parentNodes.push(<HTMLElement> node);
            }
        })

        return nodes;
    }
}