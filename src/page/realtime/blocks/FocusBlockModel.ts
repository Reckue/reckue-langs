import { PosModel } from "../../../lib/models/PosModel";
import { SizeModel } from "../../../lib/models/SizeModel";

export class FocusBlockModel {

    private ref: HTMLElement;
    private size: SizeModel;
    private position: PosModel;

    private rect;

    constructor(event: MouseEvent) {
        this.ref =  <HTMLElement> event.target;
        this.rect = this.ref.getBoundingClientRect();
        this.setupSize();
        this.setupPosition();
    }

    getRef = () => {
        return this.ref;
    }

    getSize = () => {
        return this.size;
    }

    getPosition = () => {
        return this.position;
    }

    private setupPosition = () => {
        const x = this.rect.x + window.scrollX;
        const y = this.rect.y + window.scrollY;
        this.position = {x, y}
    }

    private setupSize = () => {
        const width = this.rect.width;
        const height = this.rect.height;
        this.size = {width, height}
    }
}