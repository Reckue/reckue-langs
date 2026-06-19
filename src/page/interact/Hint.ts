import {markUi} from "../ui/Ui";

/** Подсказка-жест под наведённым словом. */
export class Hint {

    private el: HTMLElement | null = null;

    show = (range: Range, link: boolean, fast: boolean) => {
        const rect = range.getBoundingClientRect();
        if (!this.el) {
            this.el = this.build();
        }
        this.el.textContent = link ? "ctrl + shift + click" : (fast ? "click" : "ctrl + click");
        this.el.style.left = `${rect.left}px`;
        this.el.style.top = `${rect.bottom + 4}px`;
        this.el.style.display = "block";
    };

    hide = () => {
        if (this.el) {
            this.el.style.display = "none";
        }
    };

    private build = (): HTMLElement => {
        const el = document.createElement("div");
        markUi(el);
        Object.assign(el.style, {
            position: "fixed",
            background: "#111111",
            color: "#ffffff",
            borderRadius: "4px",
            padding: "2px 6px",
            font: "11px system-ui, sans-serif",
            whiteSpace: "nowrap",
            zIndex: "2147483647",
            pointerEvents: "none"
        });
        document.body.appendChild(el);
        return el;
    };
}
