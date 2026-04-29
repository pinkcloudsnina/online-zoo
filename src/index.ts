import {initMenu} from './components/menu.js';
import {initTheme} from './features/theme.js';
import {initAuthorization} from './features/userAuthorization.js';

document.addEventListener('DOMContentLoaded', (): void => {
    initTheme();
    initMenu();
    initAuthorization();
});
