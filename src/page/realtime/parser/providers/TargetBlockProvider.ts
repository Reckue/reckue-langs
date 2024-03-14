import { CoordinateBlockModel } from "../models/CoordinateBlockModel";

export class TargetBlockProvider {

    setupBlock = (event: MouseEvent) => {
        const block = new CoordinateBlockModel();
        const target = <HTMLElement> event.target;
        block.width = target.offsetWidth;
        block.height = target.offsetHeight;
        block.x = target.offsetLeft;
        block.y = target.offsetTop;
        let parent = <HTMLElement> target.offsetParent;
        while (parent && parent.offsetParent) {
            parent = <HTMLElement>parent.offsetParent;
            block.x += parent.offsetLeft;
            block.y += parent.offsetTop;
        }

        return block;
    }

}