import { CursorModel } from "../models/CursorModel";

export class CursorProvider {

    cursor: CursorModel;

    getCursor = (event: MouseEvent) => {
        this.cursor = new CursorModel();
        this.cursor.x = event.offsetX;
        this.cursor.y = event.offsetY;
        return this.cursor
    }
}