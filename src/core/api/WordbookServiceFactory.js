import {WordbookService} from '../words/WordbookService.js';
import {ApiWordbookAdapter} from './ApiWordbookAdapter.js';
import {Logger} from '../Logger.js';

export class WordbookServiceFactory {
    #logger;
    #useApi;
    
    constructor(useApi = false) {
        this.#logger = new Logger();
        this.#useApi = useApi;
    }
    
    createService() {
        if (this.#useApi) {
            this.#logger.log('Creating API-based wordbook service');
            return new ApiWordbookAdapter();
        } else {
            this.#logger.log('Creating local storage wordbook service');
            return new WordbookService();
        }
    }
    
    setUseApi(useApi) {
        this.#useApi = useApi;
        this.#logger.log(`API mode changed to: ${useApi}`);
    }
    
    isApiMode() {
        return this.#useApi;
    }
}