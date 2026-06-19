/**
 * Маркер собственных DOM-элементов расширения (попап, подсказка).
 * По нему scanner их не подсвечивает, а MutationPipeline игнорирует их мутации,
 * чтобы реакция на собственный UI не уходила в бесконечный цикл.
 */
export const RECKUE_UI = "reckue-ui";

export const markUi = (el: HTMLElement) => {
    el.classList.add(RECKUE_UI);
};

export const isUi = (node: Node | null): boolean => {
    if (!node) {
        return false;
    }
    const el = node.nodeType === Node.ELEMENT_NODE ? (node as Element) : node.parentElement;
    return !!(el && el.closest && el.closest("." + RECKUE_UI));
};
