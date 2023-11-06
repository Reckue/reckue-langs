import {Logger} from "../core/Logger";
import {Store} from "../core/Store";
import {Styles} from "./render/styles/Styles";
import {Context} from "../core/Context";
import {QueueProcessor} from "./queue/QueueProcessor";
import {Levels} from "../enum/Levels";

const IS_SERVER_SIDE_PARSING_ENABLE = false;

export class PageService {

    #logger;
    #styles;
    #storage;

    constructor() {
        this.#logger = new Logger();
        this.#storage = new Store();
        this.#styles = new Styles();
    }

    run = () => {
        this.#storage.appParams().then(enable => {
            this.#joinPoint(enable, this.#server, this.#local);
        });
    }

    #joinPoint = (enable, serverLogic, localLogic) => {
        addEventListener("click", serverLogic);
        this.#logger.log(`Reach join point with app.enable=${enable}`);
        if (enable) {
            this.#styles.append();
            this.#logger.log(`isServerSideParsingEnable=${IS_SERVER_SIDE_PARSING_ENABLE}`);
            IS_SERVER_SIDE_PARSING_ENABLE ? serverLogic() : localLogic();
        }
    }

    #local = () => {
        Context.add("language", {sl: "en", tl: "ru"});
        const processor = new QueueProcessor();
        processor.runInfinityParsing();
        processor.runInfinityRender();
    }

    #server = (event) => {
        const text = event.target.innerText;
        const lines = text.split("\n");
        const counter = [0]
        for (let symbol of text) {
            if (symbol === "\n") {
                counter[0]++;
            }
        }
        const line = Math.floor(event.offsetY / (event.target.offsetHeight / counter[0]));
        const textOffset = this.inlineSize(event.target, lines[line]).width;
        let offset;
        if (textOffset < event.target.offsetWidth) {
            offset = event.offsetX / textOffset;
        } else {
            offset = event.offsetX / event.target.offsetWidth;
        }

        const one = 1 / lines[line].length;
        const index = Math.floor(offset / one);
        const word = [""];
        this.nextSymbol(word, lines[line], index);
        this.prevSymbol(word, lines[line], index - 1);

        Context.get("wordbook").set([{word: word[0], level: Levels.BEGINNER.name}]);
    }

    nextSymbol = (word, text, index) => {
        let symbol = text[index];
        if(this.goNextCondition(symbol)) {
            word[0] = word[0] + symbol;
            this.nextSymbol(word, text, index + 1);
        }
    }

    prevSymbol = (word, text, index) => {
        let symbol = text[index];
        if(this.goNextCondition(symbol)) {
            word[0] = symbol + word[0];
            this.prevSymbol(word, text, index - 1);
        }
    }

    goNextCondition = (symbol) => {
        return symbol
            && symbol !== " "
            && symbol !== "."
            && symbol !== ","
            && symbol !== "“"
            && symbol !== "”"
            && symbol !== "!"
            && symbol !== "?";
    }

    inlineSize = (el, text) => {
        // дополнительные стили для клона, что бы мир не заметил чуда, и размеры отображались корректно
        // let hiddenStyle = "left:10000px;top:-10000px;height:auto;width:auto;position:absolute";
        let hiddenStyle = "left:0;top:0;height:auto;width:auto;position:absolute;z-index:100";

        // создаем box элемент
        // для клонирования содержимого из нашего исходного inline блока
        let clone = document.createElement('div');

        // в обязательном порядке копируем стили с исходного элемента,
        // что бы размеры соответствовали исходнику.


        let pointer = el;
        let fontSize = null;
        while (pointer && !fontSize) {
            fontSize = window.getComputedStyle(pointer).fontSize;
            pointer = pointer.parentElement;
        }

        let fontFamily = null;
        while (pointer && !fontFamily) {
            fontFamily = window.getComputedStyle(pointer).fontFamily;
            pointer = pointer.parentElement;
        }

        for (let i in el.style) {
            try {
                if ((el.style[i] != '') && (el.style[i].indexOf(":") > 0)) {
                    clone.style[i] = el.style[i];
                }
            } catch (e) {}
        }

        hiddenStyle += ";font-size:" + fontSize + ";font-family:" + fontFamily;

        // устанавливаем стили у клона, дабы он не мозолил глаз.
        // Учитываем, что IE не позволяет напрямую устанавливать значение аттрибута style
        document.all ? clone.style.setAttribute('cssText', hiddenStyle) : clone.setAttribute('style', hiddenStyle);

        // Переносим содержимое. Аккуратно.
        clone.innerHTML = el.innerHTML

        clone.innerText = text;

        // Добавляем клон в корневой документ.
        // Так, на всякий пожарный в parent, а то вдруг элемент внутри iframe?
        parent.document.body.appendChild(clone);

        // Забиваем заветное.
        let rect = {height:clone.offsetHeight, width:clone.offsetWidth};

        // ...и тут же удаляем
        parent.document.body.removeChild(clone);

        // Вот собственно говоря и все.
        return rect;
    }
}