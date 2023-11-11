/**
 * Функция для создания html тэга
 *
 * @param name - название тэга
 * @returns {*} - готовый html тэг, пока не привязаный ни к чему.
 */
export const create = (name) => document.createElement(name);

/**
 * Добавляет атрибут class для тэга,
 * по нему будут прописаны определённые css стили.
 *
 * @param element - тэг для которого нужно добавть класс
 * @param className - имя класса
 */
export const addClass = (element, className) => {
    element.classList.add(className);
}

/**
 * Добавляет EventListener для элемента
 *
 * @param element - тэг эвенты которого будем слушать
 * @param eventType - тип требуемого эвента, на который будем реагировать
 * @param callback - функция которая будет выполнена.
 */
export const addListener = (element, eventType, callback) => {
    element.addEventListener(eventType, event => {
        callback(event);
    });
}

export const selectByClass = (className, index) => {
    if (index !== undefined) {
        return window.document.getElementsByClassName(className)[index];
    }
    return selectByClass(className,0);
};