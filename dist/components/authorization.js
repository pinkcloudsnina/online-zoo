import { createTag } from '../utils/tagEl.js';
export function drawAuthorization() {
    const container = createTag('div', ['auth']);
    const login = createTag('div', ['login']);
    login.textContent = 'Login';
    const register = createTag('div', ['register']);
    register.textContent = 'Register';
    container.append(login, register);
    return container;
}
//# sourceMappingURL=authorization.js.map