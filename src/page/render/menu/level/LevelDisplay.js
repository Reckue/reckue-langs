import {BaseBlock} from "../BaseBlock";
import {Levels} from "../../../../enum/Levels";
import {enumForEach} from "../../../../../popup/js/enum";
import {Context} from "../../../../core/Context";

//TODO:: Перенести в класс или в контекст!
export const POPUP_WIDTH = 100;

export class LevelDisplay extends BaseBlock {

    #wordbookService;
    #display;

    #word;

    constructor(parent, word) {
        super(parent);
        this.#wordbookService = Context.getWordbookService();
        this.#word = word;
    }

    updateLevel = () => {
        const level = this.#wordbookService.getWordbook().get(this.#word);
        this.#renderLevelDisplay(Levels[level.toUpperCase()].number);
    }

    setWord = (word) => {
        this.#word = word;
    }

    /**
     * Далее создаём некст (Большее на 1) и пробуем менять уровень.
     *
     * @param current - текущее число.
     */
    #increaseLevel = (current) => {
        const next = current + 1;
        this.#changeLevel(next);
    }

    /**
     * Делаем проверку что не 0. Чем немного упрощаем сложность алгоритма.
     * (При current = 0, мы не заходим в цикл для провеки уровней)
     *
     * Далее создаём некст (Меньшее на 1) и меняем уровень.
     *
     * Потенциально можно не заходить в matchConcurrence, но нужно точно убедиться что этим мы не сломем логику.
     * Потенциально это мало что даст. Преждевременна оптимизация корень всех зол.
     *
     * @param current - текущее число.
     */
    #decreaseLevel = (current) => {
        if (current > 0) {
            const next = current - 1;
            //TODO:: Потенциально стоит поменять (не заходить в matchConcurrence).
            this.#changeLevel(next);
        }
    }

    /**
     * Делаем проверку, что уровень можно менять.
     *
     * Если можно, то вызываем функцию которая перерендерит дисплей по pug шаблону.
     * Также выгрузим render функцию из контекста. (Эта функция заменит цвет слов на странице в соотвествии с их новым уровнем).
     * И под конец выгрузим изменения в storage и cache. После чего они сохранятся и после перезагрузки страницы.
     *
     * @param next - Число обозначающее уровень после изменений
     */
    #changeLevel = (next) => {
        this.#matchConcurrence(next, (next, level) => {
            this.#renderLevelDisplay(next)
            const render = Context.get("render");
            render(this.#word, level.name);
            this.#wordbookService.set([{word: this.#word, level: level.name}]);
        });
    }

    /**
     * Если находим соответствие в массиве уровней, тогда меняем везде current на next.
     *
     * current - текущее число обозначающее уровень
     * @param next - Число обозначающее уровень после изменений
     * @param doChange - Функция которая заменит уровень
     */
    #matchConcurrence = (next, doChange) => {
        enumForEach(Levels, (level) => (level.number === next) && doChange(next, level));
    }

    /**
     * Заполняем display из pug шаблона.
     * Полностью заменяем старые элементы на новые.
     * Также отвязываем старую ссылку дисплея в родительском классе.
     * После возвращаем EventListener's на кнопки + и - (Уровни).
     *
     * Метод вызывается в самом начале и при каждом изменении уровня.
     *
     * @param number - текущее число обозначающее уровень
     */
    #renderLevelDisplay = (number) => {
        const pug = require("pug-loader!./display.pug");
        this.#display = this.mapper().toElement(pug(this.#buildOptions(number)));
        this.getRef().replaceWith(this.#display);
        this.setRef(this.#display);
        this.#setupControllers(number);
    }

    /**
     * Добавляем click событие на новые кнопки + и - (Уровень)
     * Для корректной работы нужен заполненный display
     */
    #setupControllers = (current) => {
        const controllers = this.#display.getElementsByClassName("wb-level-controller");
        controllers[0].addEventListener("click", () => this.#increaseLevel(current));
        controllers[1].addEventListener("click", () => this.#decreaseLevel(current));
    }

    /**
     * Заполняем
     * @param number
     * @returns {{number, width: string}}
     */
    #buildOptions = (number) => {
        return {
            number: number,
            width: POPUP_WIDTH + "px"
        }
    }
}