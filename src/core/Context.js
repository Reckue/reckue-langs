const context = new Map();

export class Context {

    /**
    * bean - компонент\класс из Java
     */
    static add = (name, bean) => {
        context.set(name, bean);
    }

    static get = (beanName) => {
        return context.get(beanName);
    }

    static getWordbookService = () => {
        const wordbook = Context.get("wordbook");
        if (wordbook) {
            return wordbook;
        }
    }
}