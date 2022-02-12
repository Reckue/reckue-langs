/**
 * Обёртка над классической записью чтобы не писать каждый раз Object.entries(...).forEach((...) => {...})
 * Вытаскивает entry из массива value, где 0 элемент это ключь енама, а 1 значение это объект - содержимое
 * После передаёт entry в callback функцию, которая и будет являться обработчиком цыкла forEach.
 *
 * @param Enum - enum который нужно распарсить
 * @param callback - функция обрабатывающая входящие в enum объекты.
 */
export const enumForEach = (Enum, callback) => {
    Object.entries(Enum).forEach((value) => {
        const entry = value[1];
        callback(entry);
    });
}