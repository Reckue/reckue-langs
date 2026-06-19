import {levelHex} from "../../core/enum/Levels";
import {markUi} from "../ui/Ui";
import {LevelSlider} from "./LevelSlider";

/** Интерактивный попап смены уровня слова: слово + слайдер уровня (как в reckue langs). */
export class Popup {

    private el: HTMLElement | null = null;
    private label: HTMLElement | null = null;
    private slider: LevelSlider | null = null;
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
        this.slider?.set(level);
        const el = this.el as HTMLElement;
        el.style.borderLeft = `3px solid ${levelHex(level)}`;
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
            gap: "10px",
            maxWidth: "320px",
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
        Object.assign(label.style, {
            fontWeight: "600",
            maxWidth: "160px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
        });

        const slider = new LevelSlider((level) => {
            el.style.borderLeft = `3px solid ${levelHex(level)}`;
            this.onChange && this.onChange(level);
        });

        el.append(label, slider.el);
        document.body.appendChild(el);

        this.el = el;
        this.label = label;
        this.slider = slider;
    };
}
