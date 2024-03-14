export class ComputedStylesController {
    getComputedStyles = (ref: HTMLElement) => {
        return window.getComputedStyle(ref);
    }
}