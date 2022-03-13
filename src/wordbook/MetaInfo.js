import {WBInfo} from "./WBInfo";

export class MetaInfo {

    #storageMeta = [];

    debug = () => {
        window.console.log(this.#storageMeta);
    }

    report = (name, size) => {
        let info = this.#search(name);
        if (info === null) {
            info = new WBInfo(name, size);
            this.#storageMeta.push(info)
        } else {
            const index = this.#storageMeta.indexOf(info);
            const updated = new WBInfo(name, size);
            this.#storageMeta.splice(index, 1, updated);
        }
    }

    getLength = () => {
        return this.#storageMeta.length;
    }

    #search = (name) => {
        this.#storageMeta.forEach(info => {
            if (info.name === name) {
                return info;
            }
        });
        return null;
    }
}