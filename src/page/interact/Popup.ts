import {levelHex} from "../../core/enum/Levels";
import {KnowledgeUnit, UnitMember} from "../../core/words/KnowledgeUnit";
import {markUi} from "../ui/Ui";
import {LevelSlider} from "./LevelSlider";

const MARGIN = 8;
const GAP = 10;
const ARROW = 8;

/**
 * Попап единицы знания: голова — инфинитив (лемма), под ней тихая строка
 * кликнутой формы (если она ≠ лемме), слайдер уровня и раскрывающиеся секции
 * семьи/конструкций. Секции рендерятся только при наличии сохранённых членов —
 * пока нет word_derivations, они пусты и скрыты, и попап выглядит как карточка
 * слова с уровнем. Данные приходят из [[KnowledgeResolver]] (см. ClickController).
 */
export class Popup {

    private el: HTMLElement | null = null;
    private head: HTMLElement | null = null;
    private form: HTMLElement | null = null;
    private sections: HTMLElement | null = null;
    private family: HTMLElement | null = null;
    private familyChips: HTMLElement | null = null;
    private constructions: HTMLElement | null = null;
    private constructionChips: HTMLElement | null = null;
    private arrow: HTMLElement | null = null;
    private slider: LevelSlider | null = null;
    private onChange: ((level: string) => void) | null = null;

    contains = (node: Node | null): boolean => {
        return !!(this.el && node && this.el.contains(node));
    };

    /**
     * unit — единица знания (голова-лемма + сохранённые члены/конструкции).
     * surface — кликнутая словоформа в нижнем регистре (для строки «форма»).
     */
    show = (unit: KnowledgeUnit, surface: string, anchor: DOMRect, onChange: (level: string) => void) => {
        this.onChange = onChange;
        if (!this.el) {
            this.build();
        }
        const el = this.el as HTMLElement;
        const level = unit.level ?? "beginner";

        (this.head as HTMLElement).textContent = unit.lemma;
        this.setForm(surface, unit.lemma);
        this.slider?.set(level);

        const hasFamily = this.renderChips(this.familyChips as HTMLElement, unit.members);
        const hasConstr = this.renderChips(this.constructionChips as HTMLElement, unit.constructions);
        (this.family as HTMLElement).style.display = hasFamily ? "block" : "none";
        (this.constructions as HTMLElement).style.display = hasConstr ? "block" : "none";
        (this.sections as HTMLElement).style.display = hasFamily || hasConstr ? "block" : "none";

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

    /** Строка «ты выделил <форма> · форма» — только когда кликнутая форма ≠ лемме. */
    private setForm = (surface: string, lemma: string) => {
        const form = this.form as HTMLElement;
        if (surface && surface !== lemma) {
            form.textContent = "";
            const word = document.createElement("span");
            word.textContent = surface;
            word.style.color = "#666";
            form.append("ты выделил ", word, " · форма");
            form.style.display = "block";
        } else {
            form.style.display = "none";
        }
    };

    /** Заполняет контейнер чипами членов (цветная точка уровня + слово); вернёт, были ли члены. */
    private renderChips = (container: HTMLElement, members: UnitMember[]): boolean => {
        container.textContent = "";
        members.forEach((member) => {
            const chip = document.createElement("span");
            Object.assign(chip.style, {
                display: "inline-flex", alignItems: "center", gap: "5px",
                background: "#f4f4f4", borderRadius: "7px", padding: "3px 8px", fontSize: "12px"
            });
            const dot = document.createElement("span");
            Object.assign(dot.style, {
                width: "7px", height: "7px", borderRadius: "50%", background: levelHex(member.level)
            });
            chip.append(dot, document.createTextNode(member.word));
            container.appendChild(chip);
        });
        return members.length > 0;
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
            minWidth: "200px",
            maxWidth: "320px",
            background: "#ffffff",
            color: "#1a1a1a",
            border: "1px solid rgba(0,0,0,.08)",
            borderRadius: "12px",
            padding: "14px 16px 16px",
            font: "13px system-ui, sans-serif",
            zIndex: "2147483647",
            boxShadow: "0 8px 28px rgba(0,0,0,.28)"
        });

        const arrow = document.createElement("div");
        Object.assign(arrow.style, {position: "absolute", width: "0", height: "0"});

        const head = document.createElement("div");
        Object.assign(head.style, {
            fontWeight: "500", fontSize: "19px", textAlign: "center",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
        });

        const form = document.createElement("div");
        Object.assign(form.style, {
            display: "none", fontSize: "11.5px", color: "#9a9a9a", textAlign: "center", marginTop: "2px"
        });

        const row = document.createElement("div");
        Object.assign(row.style, {display: "flex", alignItems: "center", gap: "8px", marginTop: "12px"});

        const caption = document.createElement("span");
        caption.textContent = "уровень";
        Object.assign(caption.style, {fontSize: "11px", color: "#888", whiteSpace: "nowrap"});

        const slider = new LevelSlider((next) => {
            el.style.borderTop = `4px solid ${levelHex(next)}`;
            this.onChange && this.onChange(next);
        });
        row.append(caption, slider.el);

        const sections = document.createElement("div");
        Object.assign(sections.style, {
            display: "none", marginTop: "14px", paddingTop: "12px", borderTop: "1px solid #efefef"
        });
        const [family, familyChips] = this.buildSection("семья");
        const [constructions, constructionChips] = this.buildSection("конструкции");
        (constructions.style.marginTop = "12px");
        sections.append(family, constructions);

        el.append(arrow, head, form, row, sections);
        document.body.appendChild(el);

        this.el = el;
        this.head = head;
        this.form = form;
        this.sections = sections;
        this.family = family;
        this.familyChips = familyChips;
        this.constructions = constructions;
        this.constructionChips = constructionChips;
        this.arrow = arrow;
        this.slider = slider;
    };

    /** Блок секции: заголовок-капс + контейнер чипов. Вернёт [блок, контейнер чипов]. */
    private buildSection = (title: string): [HTMLElement, HTMLElement] => {
        const block = document.createElement("div");
        block.style.display = "none";

        const label = document.createElement("div");
        label.textContent = title;
        Object.assign(label.style, {
            fontSize: "10.5px", letterSpacing: ".03em", textTransform: "uppercase",
            color: "#aaa", marginBottom: "7px"
        });

        const chips = document.createElement("div");
        Object.assign(chips.style, {display: "flex", flexWrap: "wrap", gap: "6px"});

        block.append(label, chips);
        return [block, chips];
    };
}
