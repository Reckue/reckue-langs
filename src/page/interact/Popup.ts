import {levelHex} from "../../core/enum/Levels";
import {markUi} from "../ui/Ui";
import {LevelSlider} from "./LevelSlider";

const MARGIN = 8;
const GAP = 10;
const ARROW = 8;

/**
 * Попап смены уровня слова: заметная карточка со словом и слайдером уровня
 * (как в reckue langs), центрированная под/над словом, с цветной стрелкой-
 * указателем на само слово.
 */
export class Popup {

    private el: HTMLElement | null = null;
    private label: HTMLElement | null = null;
    private arrow: HTMLElement | null = null;
    private slider: LevelSlider | null = null;
    private onChange: ((level: string) => void) | null = null;

    contains = (node: Node | null): boolean => {
        return !!(this.el && node && this.el.contains(node));
    };

    show = (word: string, level: string, anchor: DOMRect, onChange: (level: string) => void) => {
        this.onChange = onChange;
        if (!this.el) {
            this.build();
        }
        const el = this.el as HTMLElement;
        (this.label as HTMLElement).textContent = word;
        this.slider?.set(level);
        el.style.borderTop = `4px solid ${levelHex(level)}`;
        el.style.visibility = "hidden";
        el.style.display = "block";
        this.place(anchor, levelHex(level));
        el.style.visibility = "visible";
    };

    hide = () => {
        if (this.el) {
            this.el.style.display = "none";
        }
    };

    /** Центрируем по слову, кладём под него (или над, если снизу не влезает), и наводим стрелку. */
    private place = (anchor: DOMRect, color: string) => {
        const el = this.el as HTMLElement;
        const arrow = this.arrow as HTMLElement;
        const rect = el.getBoundingClientRect();
        const cx = anchor.left + anchor.width / 2;

        let left = cx - rect.width / 2;
        left = Math.max(MARGIN, Math.min(left, window.innerWidth - rect.width - MARGIN));

        const below = anchor.bottom + GAP;
        const onTop = below + rect.height <= window.innerHeight - MARGIN;
        let top = onTop ? below : anchor.top - rect.height - GAP;
        top = Math.max(MARGIN, Math.min(top, window.innerHeight - rect.height - MARGIN));

        el.style.left = `${left}px`;
        el.style.top = `${top}px`;

        // Стрелка указывает на центр слова, но не вылезает за края карточки.
        let ax = cx - left;
        ax = Math.max(14, Math.min(ax, rect.width - 14));
        Object.assign(arrow.style, {
            left: `${ax - ARROW}px`,
            borderLeft: `${ARROW}px solid transparent`,
            borderRight: `${ARROW}px solid transparent`,
            borderTop: onTop ? "none" : `${ARROW}px solid ${color}`,
            borderBottom: onTop ? `${ARROW}px solid ${color}` : "none",
            top: onTop ? `${-ARROW}px` : "",
            bottom: onTop ? "" : `${-ARROW}px`
        });
    };

    private build = () => {
        const el = document.createElement("div");
        markUi(el);
        Object.assign(el.style, {
            position: "fixed",
            display: "none",
            boxSizing: "border-box",
            minWidth: "180px",
            maxWidth: "320px",
            background: "#ffffff",
            color: "#1a1a1a",
            border: "1px solid rgba(0,0,0,.08)",
            borderRadius: "12px",
            padding: "12px 16px",
            font: "13px system-ui, sans-serif",
            zIndex: "2147483647",
            boxShadow: "0 8px 28px rgba(0,0,0,.28)"
        });

        const arrow = document.createElement("div");
        Object.assign(arrow.style, {position: "absolute", width: "0", height: "0"});

        const label = document.createElement("div");
        Object.assign(label.style, {
            fontWeight: "700", fontSize: "15px", marginBottom: "10px", textAlign: "center",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
        });

        const row = document.createElement("div");
        Object.assign(row.style, {display: "flex", alignItems: "center", gap: "8px"});

        const caption = document.createElement("span");
        caption.textContent = "Уровень";
        Object.assign(caption.style, {fontSize: "11px", color: "#888", whiteSpace: "nowrap"});

        const slider = new LevelSlider((next) => {
            el.style.borderTop = `4px solid ${levelHex(next)}`;
            this.onChange && this.onChange(next);
        });

        row.append(caption, slider.el);
        el.append(arrow, label, row);
        document.body.appendChild(el);

        this.el = el;
        this.label = label;
        this.arrow = arrow;
        this.slider = slider;
    };
}
