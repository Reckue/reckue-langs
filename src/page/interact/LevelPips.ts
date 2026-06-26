import {LEVEL_COUNT, levelAt, levelHex, levelNumber} from "../../core/enum/Levels";

/**
 * Дискретный контрол уровня «пипсами»: ряд из LEVEL_COUNT вертикальных делений +
 * число. Заполненные деления — в цвет текущего уровня, остальные серые; клик по
 * делению N выставляет уровень N и зовёт onChange. По одному такому контролу на
 * каждое слово в попапе (голова-лемма и члены семьи) — отсюда «уровни словам
 * прокликивать». Vanilla, инлайн-стили — в тон page-UI.
 */
export class LevelPips {

    readonly el: HTMLElement;
    readonly #pips: HTMLElement[] = [];
    readonly #num: HTMLElement;
    readonly #onChange: (name: string) => void;

    constructor(onChange: (name: string) => void) {
        this.#onChange = onChange;

        const el = document.createElement("div");
        Object.assign(el.style, {display: "flex", alignItems: "center", gap: "8px"});

        const pips = document.createElement("div");
        Object.assign(pips.style, {display: "flex", gap: "3px"});

        for (let i = 1; i <= LEVEL_COUNT; i++) {
            const hit = document.createElement("span");
            // Широкая зона клика: прозрачные поля по бокам узкого деления.
            Object.assign(hit.style, {padding: "3px 2px", cursor: "pointer", display: "block"});
            const pip = document.createElement("span");
            Object.assign(pip.style, {
                display: "block", width: "9px", height: "14px", borderRadius: "1.5px", background: "#dedbcf"
            });
            hit.appendChild(pip);
            hit.addEventListener("click", (event) => {
                event.stopPropagation();
                this.#commit(i);
            });
            this.#pips.push(pip);
            pips.appendChild(hit);
        }

        const num = document.createElement("span");
        Object.assign(num.style, {
            fontFamily: "ui-monospace, Menlo, Consolas, monospace",
            fontSize: "13px", fontWeight: "500", minWidth: "9px", textAlign: "right", color: "#bbb"
        });

        el.append(pips, num);
        this.el = el;
        this.#num = num;
    }

    /** Выставить отображаемый уровень по имени (пустой/неизвестный → ничего не залито). */
    set = (name: string | undefined) => {
        this.#render(name ? levelNumber(name) : 0);
    };

    #render = (position: number) => {
        const color = position ? levelHex(levelAt(position).name) : "#dedbcf";
        this.#pips.forEach((pip, idx) => {
            const on = idx < position;
            pip.style.background = on ? color : "#dedbcf";
            pip.style.boxShadow = on ? "inset 0 0 0 1px rgba(0,0,0,.12)" : "none";
        });
        this.#num.textContent = position ? String(position) : "–";
        this.#num.style.color = position ? "#555" : "#bbb";
    };

    #commit = (position: number) => {
        this.#render(position);
        this.#onChange(levelAt(position).name);
    };
}
