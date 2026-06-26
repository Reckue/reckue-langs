import {levelHex} from "../../core/enum/Levels";
import {KnowledgeUnit, UnitMember} from "../../core/words/KnowledgeUnit";
import {markUi} from "../ui/Ui";
import {LevelPips} from "./LevelPips";

const MARGIN = 8;
const GAP = 10;
const ARROW = 8;

/**
 * Попап единицы знания. Голова — инфинитив (лемма) с собственным уровнем, под ней
 * строка кликнутой формы (если она ≠ лемме). Ниже — члены словообразовательной
 * семьи, у КАЖДОГО свой кликабельный контрол уровня ([[LevelPips]]): клик
 * сохраняет уровень этого слова (см. onLevel). Несохранённые члены показаны
 * приглушённо с пустыми пипсами — их тоже можно «прокликать», добавив в словарь.
 * Данные — из [[KnowledgeResolver]] (см. ClickController).
 */
export class Popup {

    private el: HTMLElement | null = null;
    private headWord: HTMLElement | null = null;
    private pos: HTMLElement | null = null;
    private form: HTMLElement | null = null;
    private headPips: LevelPips | null = null;
    private sections: HTMLElement | null = null;
    private familyLabel: HTMLElement | null = null;
    private members: HTMLElement | null = null;
    private arrow: HTMLElement | null = null;

    private lemma = "";
    private onLevel: ((word: string, level: string) => void) | null = null;

    contains = (node: Node | null): boolean => {
        return !!(this.el && node && this.el.contains(node));
    };

    /**
     * unit — единица знания (голова-лемма + члены семьи: сохранённые и ещё нет).
     * surface — кликнутая словоформа (нижний регистр) для строки «форма».
     * onLevel(word, level) — сохранить уровень конкретного слова (головы или члена).
     */
    show = (unit: KnowledgeUnit, surface: string, anchor: DOMRect, onLevel: (word: string, level: string) => void) => {
        this.onLevel = onLevel;
        this.lemma = unit.lemma;
        if (!this.el) {
            this.build();
        }
        const el = this.el as HTMLElement;
        const level = unit.level ?? "beginner";

        (this.headWord as HTMLElement).textContent = unit.lemma;
        this.setPos(unit.pos);
        this.setForm(surface, unit.lemma);
        this.headPips?.set(unit.level);

        this.renderMembers(unit.members);

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

    /** POS-тег грамматики рядом с леммой (verb · noun); скрыт, если POS нет. */
    private setPos = (pos: string[]) => {
        const el = this.pos as HTMLElement;
        if (pos && pos.length) {
            el.textContent = pos.join(" · ");
            el.style.display = "inline-block";
        } else {
            el.style.display = "none";
        }
    };

    /** Строка «форма: <слово>» — только когда кликнутая форма ≠ лемме. */
    private setForm = (surface: string, lemma: string) => {
        const form = this.form as HTMLElement;
        if (surface && surface !== lemma) {
            form.textContent = "";
            const word = document.createElement("span");
            word.textContent = surface;
            word.style.color = "#666";
            form.append("форма: ", word);
            form.style.display = "block";
        } else {
            form.style.display = "none";
        }
    };

    /** Строит строки членов семьи (каждая — слово + свои пипсы уровня). */
    private renderMembers = (members: UnitMember[]) => {
        const box = this.members as HTMLElement;
        box.textContent = "";
        members.forEach((member) => {
            box.appendChild(this.memberRow(member.word, member.level));
        });
        const has = members.length > 0;
        (this.familyLabel as HTMLElement).style.display = has ? "block" : "none";
        (this.sections as HTMLElement).style.display = has ? "block" : "none";
    };

    /** Одна строка: слово слева (приглушено, если не сохранено) + пипсы справа. */
    private memberRow = (word: string, level: string | undefined): HTMLElement => {
        const row = document.createElement("div");
        Object.assign(row.style, {
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: "10px", padding: "5px 0"
        });

        const label = document.createElement("span");
        label.textContent = word;
        Object.assign(label.style, {
            fontWeight: "500", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            color: level ? "#1a1a1a" : "#9a9a9a"
        });

        const pips = new LevelPips((next) => this.onLevel && this.onLevel(word, next));
        pips.set(level);

        row.append(label, pips.el);
        return row;
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
            minWidth: "230px",
            maxWidth: "320px",
            background: "#ffffff",
            color: "#1a1a1a",
            border: "1px solid rgba(0,0,0,.08)",
            borderRadius: "12px",
            padding: "14px 16px 14px",
            font: "13px system-ui, sans-serif",
            zIndex: "2147483647",
            boxShadow: "0 8px 28px rgba(0,0,0,.28)"
        });

        const arrow = document.createElement("div");
        Object.assign(arrow.style, {position: "absolute", width: "0", height: "0"});

        // Голова: лемма крупно + POS-тег (грамматика) рядом, отдельно от семьи.
        const head = document.createElement("div");
        Object.assign(head.style, {display: "flex", alignItems: "baseline", gap: "8px", overflow: "hidden"});
        const headWord = document.createElement("span");
        Object.assign(headWord.style, {
            fontWeight: "500", fontSize: "18px",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
        });
        const pos = document.createElement("span");
        Object.assign(pos.style, {
            display: "none", fontSize: "10.5px", color: "#7a7a7a", background: "#f1f1f1",
            borderRadius: "4px", padding: "1px 6px", whiteSpace: "nowrap", flex: "none"
        });
        head.append(headWord, pos);

        const form = document.createElement("div");
        Object.assign(form.style, {
            display: "none", fontSize: "11.5px", color: "#9a9a9a", marginTop: "2px"
        });

        // Уровень самой леммы — строка справа от слова не нужна; кладём отдельной
        // строкой «уровень … пипсы», чтобы голова читалась крупно.
        const headRow = document.createElement("div");
        Object.assign(headRow.style, {
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: "10px", marginTop: "10px"
        });
        const caption = document.createElement("span");
        caption.textContent = "уровень";
        Object.assign(caption.style, {fontSize: "11px", color: "#888"});
        const headPips = new LevelPips((next) => {
            (this.el as HTMLElement).style.borderTop = `4px solid ${levelHex(next)}`;
            this.onLevel && this.onLevel(this.lemma, next);
        });
        headRow.append(caption, headPips.el);

        const sections = document.createElement("div");
        Object.assign(sections.style, {
            display: "none", marginTop: "12px", paddingTop: "10px", borderTop: "1px solid #efefef"
        });
        const familyLabel = document.createElement("div");
        familyLabel.textContent = "семья";
        Object.assign(familyLabel.style, {
            fontSize: "10.5px", letterSpacing: ".03em", textTransform: "uppercase",
            color: "#aaa", marginBottom: "2px"
        });
        const members = document.createElement("div");
        sections.append(familyLabel, members);

        el.append(arrow, head, form, headRow, sections);
        document.body.appendChild(el);

        this.el = el;
        this.headWord = headWord;
        this.pos = pos;
        this.form = form;
        this.headPips = headPips;
        this.sections = sections;
        this.familyLabel = familyLabel;
        this.members = members;
        this.arrow = arrow;
    };
}
