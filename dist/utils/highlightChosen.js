export function highlightNode(nodeList, node, className) {
    nodeList.forEach((el) => el.classList.remove(`${className}`));
    node.classList.add(`${className}`);
}
//# sourceMappingURL=highlightChosen.js.map