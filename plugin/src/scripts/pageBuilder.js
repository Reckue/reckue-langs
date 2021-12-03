const editLatestNodesToRebuildPage = (editableNodes) => {
    editableNodes.forEach((node) => {
        node.tag.textContent = node.text.length;
    })
}