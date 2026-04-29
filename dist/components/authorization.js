import { createTag } from '../utils/tagEl.js';
export function drawAuthorization(handlers) {
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
export function drawGreet(user) {
    const userGreet = document.querySelector('.authorization .user');
    if (userGreet)
        userGreet.textContent = user ? user.name : '';
}
//# sourceMappingURL=authorization.js.map