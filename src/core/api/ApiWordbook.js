export class ApiWordbook {
    #cache;
    #pageSize;
    
    constructor(pageSize = 50) {
        this.#cache = new Map();
        this.#pageSize = pageSize;
    }
    
    remove = (word) => {
        this.#cache.delete(word);
    }
    
    set = (list) => {
        list.forEach((bundle) => {
            this.#cache.set(bundle.word, bundle.level);
        });
        return this;
    }
    
    get = () => {
        return this.#cache;
    }
    
    getPage = (page) => {
        const result = new Map();
        const startIndex = page * this.#pageSize;
        const endIndex = startIndex + this.#pageSize;
        
        let index = 0;
        this.#cache.forEach((level, word) => {
            if (index >= startIndex && index < endIndex) {
                result.set(word, level);
            }
            index++;
        });
        
        return result;
    }
    
    getPagesCount = () => {
        return Math.ceil(this.#cache.size / this.#pageSize);
    }
    
    // Метод для совместимости с существующим кодом
    getPages = () => {
        return {
            getCount: () => this.getPagesCount()
        };
    }
    
    getSize = () => {
        return this.#cache.size;
    }
    
    clear = () => {
        this.#cache.clear();
    }
    
    has = (word) => {
        return this.#cache.has(word);
    }
    
    getLevel = (word) => {
        return this.#cache.get(word);
    }
}
