import {ApiWordbookAdapter} from './ApiWordbookAdapter.js';
import {Logger} from '../Logger.js';

export class WordbookServiceFactory {
    #logger;
    
    constructor() {
        this.#logger = new Logger();
    }
    
    createService() {
        this.#logger.log('Creating API-based wordbook service');
        return new ApiWordbookAdapter();
    }
}