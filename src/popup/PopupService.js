import {Settings} from "./Settings";
import {Navbar} from "./Navbar";

export class PopupService {

    #settings;
    #navbar;

    constructor() {
        this.#navbar = new Settings();
        this.#navbar = new Navbar();
    }

    run = () => {
        this.#settings.init();
        this.#navbar.init();
    }
}