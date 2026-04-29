export function createTag<T extends keyof HTMLElementTagNameMap>(
    tag: T,
    className?: string[]
): HTMLElementTagNameMap[T] {
    const element = document.createElement(tag);
    if (className) element.classList.add(...className);
    return element;
}
