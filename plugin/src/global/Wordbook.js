// // TODO:: USE CASE (Примерный)
// //  new Wordbook() -> updateCache() - При создании объекта заполняем кэш
// //  add(any) -> updateStorage() - То есть при добавлении чего-то в кэш обновляем updateStorage сразу
// //  updateCache() -> add(mocks) -> updateStorage -> getWordbook() - Так будет на практике.
//
// class Wordbook {
//
//     #cache = new Map();
//
//     updateCache = () => {
//         //TODO:: Выгрузка данных из storage в cache.
//         // cache - мапа. В MetaInfo хранятся массивы. Нужен маппинг.
//         // Если cache не пустой, то желательно сохранить данные в нём и добавить сверху новые.
//     }
//
//     updateStorage = () => {
//         //TODO:: Выгрузка данных из кэша в storage.
//         // Предаврительно чистим сам storage. Мапим cache в лист (или список листов).
//         // Плюс тут нужна защита от дурака. Чтобы случайно не затереть данные пустым cache.
//     }
//
//     getWordbook = () => {
//         return this.#cache;
//     }
//
//     add = (...bundle) => {
//         //TODO:: bundle - связка из слова и уровня.
//         // {word: "word", level: "Advanced"}
//         // Метод добавления в мапу 1 и более связки. То есть 1 связку тоже добавляем через этот метод.
//     }
//
//     #clearStorage = () => {
//         chrome.storage.local.clear();
//     }
// }