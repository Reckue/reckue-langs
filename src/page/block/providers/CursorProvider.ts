import { CursorModel } from "../../realtime/parser/models/CursorModel";

export class CursorProvider {
    cursor: CursorModel;

    setupCursor = (event: MouseEvent) => {
        this.cursor = new CursorModel();
        this.cursor.x = event.offsetX;
        this.cursor.y = event.offsetY;
        return this.cursor
    }

}