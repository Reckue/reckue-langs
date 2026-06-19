import {HitTester} from "./HitTester";
import {HighlightStore} from "../highlight/HighlightStore";
import {Hint} from "./Hint";

/**
 * Наведение: подсветка слова под курсором + подсказка-жест.
 * mousemove throttle'ится через requestAnimationFrame, на скрытой вкладке глохнет.
 */
export class HoverController {

    private last: { node: Text, start: number, end: number } | null = null;
    private enabled = true;

    private readonly hit: HitTester;
    private readonly store: HighlightStore;
    private readonly hint: Hint;

    constructor(hit: HitTester, store: HighlightStore, hint: Hint) {
        this.hit = hit;
        this.store = store;
        this.hint = hint;
    }

    attach = () => {
        let pending = false;
        let mx = 0;
        let my = 0;
        document.addEventListener("mousemove", (event: MouseEvent) => {
            mx = event.clientX;
            my = event.clientY;
            if (pending || !this.enabled) {
                return;
            }
            pending = true;
            requestAnimationFrame(() => {
                pending = false;
                this.handle(mx, my);
            });
        });
    };

    setEnabled = (on: boolean) => {
        this.enabled = on;
        if (!on) {
            this.last = null;
            this.clear();
        }
    };

    private handle = (x: number, y: number) => {
        const hit = this.hit.at(x, y);
        if (!hit) {
            if (this.last) {
                this.last = null;
                this.clear();
            }
            return;
        }
        if (this.last && this.last.node === hit.node && this.last.start === hit.start && this.last.end === hit.end) {
            return;
        }
        this.last = {node: hit.node, start: hit.start, end: hit.end};
        this.store.setHover(hit.range);
        this.hint.show(hit.range, hit.isLink);
    };

    private clear = () => {
        this.store.clearHover();
        this.hint.hide();
    };
}
