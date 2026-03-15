export function highlightNode(nodeList: NodeListOf<HTMLElement>, node: HTMLElement, className: string): void {
    nodeList.forEach((el) => el.classList.remove(`${className}`));
    node.classList.add(`${className}`);
}
