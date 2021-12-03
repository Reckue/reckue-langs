const editLatestNodesToRebuildPage = (editableNodes) => {
    editableNodes.forEach((node) => {
        window.console.log("Reckue language app: Rebuilding page...");
        node.tag.textContent = node.text.length;
    })
}