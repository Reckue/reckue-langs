export class Logger {
    log = (massage) => {
        window.console.log("Reckue language app: " + massage);
    }

    /**
     * Считывает всю информацию о ноде и её родителе, пишет её в консоль.
     * Рекомендуется для использования в методе pushLastNode, после запонения листа.
     *
     * @param node - Вся нужная информация для дебага содержится в этой ноде.
     */
    #debugNode = (node) => {
        window.console.log(node.textContent);
        window.console.log(node.toString());
        window.console.log(node.parentNode.toString());
        window.console.log(node.parentNode.nodeName);
        window.console.log(node.parentNode.role);
    }
}