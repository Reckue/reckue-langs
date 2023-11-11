export class Queue {

    #inProgress;
    #elements;

    constructor() {
        this.#inProgress = false;
        this.#elements = new Set();
    }

    /**
     * Добавляет элемент страницы в коллекцию для дальнейшей работы с ним
     */
    queueUp = (element) => {
        this.#elements.add(element); 
    }

    /**
     * Ставим статус запуска работы функции true.
     * Выполняем с каждым элементом коллекции некоторые действия.
     * После чего очищаем коллекцию для оптимизации.
     * После чего меняем статус работы функции на false, дабы обозначить завершение работы функции.
     */
    takeTurns = (func) => {
        this.#inProgress = true;
        this.#elements.forEach((element) => func(element));
        this.#elements.clear();
        this.#inProgress = false;
    }

    /**
     * Проверка, пустая ли коллекция элементов
     */
    isEmpty = () => {
        return this.#elements.size === 0;
    }

    /**
     * Проверка, какой статус выполнения
     */
    isActive = () => {
        return this.#inProgress;
    }
}