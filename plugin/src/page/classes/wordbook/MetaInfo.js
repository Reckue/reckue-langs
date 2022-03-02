class MetaInfo {

    #wbs = [];

    debug = () => {
        window.console.log(this.#wbs);
    }

    report = (name, size) => {
        let info = this.#search(name);
        if (info === null) {
            info = new WBInfo(name, size);
            this.#wbs.push(info)
        }
    }

    #search = (name) => {
        this.#wbs.forEach(info => {
            if (info.name === name) {
                return info;
            }
        });
        return null;
    }
}