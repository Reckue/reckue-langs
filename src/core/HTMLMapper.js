export class HTMLMapper {

    toElement = (html) => {
        const template = window.document.createElement("div");
        template.innerHTML = html.trim();
        return template.firstChild;
    }
}