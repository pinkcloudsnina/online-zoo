import {createTag} from '../utils/tagEl.js';

export function drawAuthorization(): HTMLElement {
    const container = createTag('div');
    const login = createTag('div', ['login']);
    login.textContent = 'Login';

    const register = createTag('div', ['register']);
    register.textContent = 'Register';

    container.append(login, register);
    return container;
}
