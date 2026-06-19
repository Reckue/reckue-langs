import {LEVEL_COUNT, levelAt, levelHex, levelNumber} from "../../core/enum/Levels";

/**
 * Слайдер уровня (как в reckue langs): серый трек + цветная заливка по уровню +
 * число 1..5. Клик/перетаскивание по треку выставляет уровень. Vanilla, инлайн-
 * стили — в тон остальному page-UI. Используется в [[Popup]].
 */
export class LevelSlider {

    readonly el: HTMLElement;
    readonly #track: HTMLElement;
    readonly #fill: HTMLElement;
    readonly #value: HTMLElement;
    readonly #onChange: (name: string) => void;
    #dragging = false;
    #position = 0;

    constructor(onChange: (name: string) => void) {
        this.#onChange = onChange;

        const el = document.createElement("div");
        Object.assign(el.style, {
            display: "flex", alignItems: "center", gap: "8px",
            width: "120px", height: "20px", cursor: "pointer", userSelect: "none"
        });

        const track = document.createElement("div");
        Object.assign(track.style, {
            position: "relative", flex: "1", height: "6px",
            background: "#e0e0e0", borderRadius: "3px", overflow: "hidden"
        });

        const fill = document.createElement("div");
        Object.assign(fill.style, {
            position: "absolute", top: "0", left: "0", height: "100%",
            width: "0%", borderRadius: "3px", transition: "width .1s ease, background-color .1s ease"
        });
        track.appendChild(fill);

        const value = document.createElement("div");
        Object.assign(value.style, {
            fontSize: "12px", fontWeight: "600", minWidth: "10px", textAlign: "center", color: "#383838"
        });

        el.append(track, value);

        track.addEventListener("pointerdown", this.#onDown);
        window.addEventListener("pointermove", this.#onMove);
        window.addEventListener("pointerup", this.#onUp);

        this.el = el;
        this.#track = track;
        this.#fill = fill;
        this.#value = value;
    }

    set = (name: string) => {
        this.#render(levelNumber(name));
    };

    #render = (position: number) => {
        const clamped = Math.max(0, Math.min(LEVEL_COUNT, position));
        this.#position = clamped;
        this.#fill.style.width = `${(clamped / LEVEL_COUNT) * 100}%`;
        this.#value.textContent = clamped ? String(clamped) : "–";
        if (clamped) {
            this.#fill.style.backgroundColor = levelHex(levelAt(clamped).name);
        }
    };

    #positionFrom = (clientX: number): number => {
        const rect = this.#track.getBoundingClientRect();
        const ratio = (clientX - rect.left) / rect.width;
        return Math.max(1, Math.min(LEVEL_COUNT, Math.ceil(ratio * LEVEL_COUNT)));
    };

    #onDown = (event: PointerEvent) => {
        this.#dragging = true;
        this.#render(this.#positionFrom(event.clientX));
    };

    #onMove = (event: PointerEvent) => {
        if (this.#dragging) {
            this.#render(this.#positionFrom(event.clientX));
        }
    };

    // Коммит уровня на отпускании, а не на каждый move: onChange запускает
    // пере-сканирование страницы — во время перетаскивания это было бы дорого.
    #onUp = () => {
        if (!this.#dragging) {
            return;
        }
        this.#dragging = false;
        if (this.#position) {
            this.#onChange(levelAt(this.#position).name);
        }
    };
}
