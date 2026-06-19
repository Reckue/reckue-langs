const context = new Map<string, any>();

export class Context {

    /**
    * bean - компонент\класс из Java
     */
    static add = (name: string, bean: any) => {
        context.set(name, bean);
    }

    static get = (beanName: string) => {
        return context.get(beanName);
    }

    static getWordbookService = () => {
        const wordbook = Context.get("wordbook");
        if (wordbook) {
            return wordbook;
        }
    }
}
