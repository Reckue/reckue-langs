export class TextProvider {

    getText = (event: MouseEvent) => {
        if (!event.target) {
            throw new DOMException();
        }
        return (<HTMLElement> event.target).innerText;
    }
}