import {User} from '../types/interfaces.js';
import {createTag} from '../utils/tagEl.js';

export function drawAuthorization(): HTMLElement {
    const container = createTag('div', ['auth']);
    const login = createTag('div', ['login']);
    login.textContent = 'Login';

    const register = createTag('div', ['register']);
    register.textContent = 'Register';

    container.append(login, register);
    return container;
}

export function drawGreet(user: User | null): void {
    const userGreet = document.querySelector<HTMLSpanElement>('.authorization .user');
    if (userGreet) userGreet.textContent = user ? user.name : '';
}
