import { initMenu } from './components/menu.js';
import { initAuthorization, initLogged } from './features/userAuthorization.js';
document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    initLogged();
    initAuthorization();
});
//# sourceMappingURL=index.js.map