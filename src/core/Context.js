import {Logger} from "../Logger";

const context = new Map();
const logger = new Logger();

export class Context {

    static add = (name, bean) => {
        context.set(name, bean);
        logger.log(`Set bean with name ${name}`);
    }

    static get = (beanName) => {
        logger.log(`Trying get bean with name ${beanName}`);
        return context.get(beanName);
    }

    static getWordbook = () => {
        const wordbook = Context.get("wordbook");
        if (wordbook) {
            logger.log(`Successfully get wordbook from context!`);
            return wordbook;
        }
    }
}