import {Levels} from "../../core/enum/Levels";
import {markUi} from "../ui/Ui";

/** Интерактивный попап смены уровня слова. */
export class Popup {

    private el: HTMLElement | null = null;
    private label: HTMLElement | null = null;
    private select: HTMLSelectElement | null = null;
    private onChange: ((level: string) => void) | null = null;

    contains = (node: Node | null): boolean => {
        return !!(this.el && node && this.el.contains(node));
    };

    show = (word: string, level: string, x: number, y: number, onChange: (level: string) => void) => {
        this.onChange = onChange;
        if (!this.el) {
            this.build();
        }
        (this.label as HTMLElement).textContent = word;
        if (this.select) {
            this.select.value = level;
        }
        const el = this.el as HTMLElement;
        el.style.borderLeft = `3px solid ${this.hex(level)}`;
        el.style.left = `${x}px`;
        el.style.top = `${y + 14}px`;
        el.style.display = "flex";
    };

    hide = () => {
        if (this.el) {
            this.el.style.display = "none";
        }
    };

    private build = () => {
        const el = document.createElement("div");
        markUi(el);
        Object.assign(el.style, {
            position: "fixed",
            display: "none",
            alignItems: "center",
            gap: "8px",
            background: "#ffffff",
            color: "#111111",
            border: "1px solid #cccccc",
            borderRadius: "6px",
            padding: "6px 10px",
            font: "12px system-ui, sans-serif",
            zIndex: "2147483647",
            boxShadow: "0 2px 8px rgba(0,0,0,.2)"
        });

        const label = document.createElement("span");
        label.style.fontWeight = "600";

        const select = document.createElement("select");
        Object.keys(Levels).forEach((key) => {
            const name = (Levels as any)[key].name;
            const option = document.createElement("option");
            option.value = name;
            option.textContent = name;
            select.appendChild(option);
        });
        select.addEventListener("change", () => {
            el.style.borderLeft = `3px solid ${this.hex(select.value)}`;
            this.onChange && this.onChange(select.value);
        });

        el.appendChild(label);
        el.appendChild(select);
        document.body.appendChild(el);

        this.el = el;
        this.label = label;
        this.select = select;
    };

    private hex = (level: string): string => {
        const found = Object.keys(Levels)
            .map((key) => (Levels as any)[key])
            .find((entry) => entry.name === level);
        return found ? found.hex : "#1e81c6";
    };
}
