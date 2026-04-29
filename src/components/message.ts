import {createTag} from '../utils/tagEl.js';

export function showMessage(container: HTMLElement, msg: string, description: 'error' | 'success' | 'info'): void {
    const msgContainer = createTag('div', ['info-msg', `${description}`]);
    msgContainer.textContent = msg;
    container.append(msgContainer);
}

export function hideMessage(container: HTMLElement): void {
    const msgContainer = container.querySelector<HTMLElement>('.info-msg');
    msgContainer?.remove();
}
