import { initMenu } from './components/menu.js';
import { initTheme } from './features/theme.js';
import { initAuthorization } from './features/userAuthorization.js';
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMenu();
    initAuthorization();
});
//# sourceMappingURL=index.js.map