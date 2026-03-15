import { createTag } from '../utils/tagEl.js';
export function showMessage(container, msg, description) {
    const msgContainer = createTag('div', ['info-msg', `${description}`]);
    msgContainer.textContent = msg;
    container.append(msgContainer);
}
export function hideMessage(container) {
    const msgContainer = container.querySelector('.info-msg');
    msgContainer === null || msgContainer === void 0 ? void 0 : msgContainer.remove();
}
//# sourceMappingURL=message.js.map