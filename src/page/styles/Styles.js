export class Styles {

    append = () => {
        const html = require("apply-loader!styles-loader!./style.pug");
        const template = window.document.createElement("div");
        template.innerHTML = html.trim();
        window.document.querySelector("head").appendChild(template.firstChild);
    }
}