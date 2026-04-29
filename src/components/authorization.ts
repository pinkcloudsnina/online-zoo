import {User} from '../types/interfaces.js';
import {createTag} from '../utils/tagEl.js';

export function drawAuthorization(handlers: {onLogin: () => void; onRegister: () => void}): HTMLElement {
    const container = createTag('div', ['auth']);
    const login = createTag('div', ['login']);
    login.textContent = 'Login';
    login.addEventListener('click', handlers.onLogin);

    const register = createTag('div', ['register']);
    register.textContent = 'Register';
    container.append(login, register);
    register.addEventListener('click', handlers.onRegister);

    return container;
}

export function drawGreet(user: User | null): void {
    const userGreet = document.querySelector<HTMLSpanElement>('.authorization .user');
    if (userGreet) userGreet.textContent = user ? user.name : '';
}
