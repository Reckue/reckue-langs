export class HTMLMapper {

    toElement = (html: string): HTMLElement => {
        const template = window.document.createElement("div");
        template.innerHTML = html.trim();
        return <HTMLElement> template.firstChild;
    }
}