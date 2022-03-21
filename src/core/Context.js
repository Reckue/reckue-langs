const context = new Map();

export class Context {

    static add = (name, bean) => {
        context.set(name, bean);
    }

    static get = (beanName) => {
        return context.get(beanName);
    }

    static getWordbook = () => {
        const wordbook = Context.get("wordbook");
        if (wordbook) {
            return wordbook;
        }
    }
}