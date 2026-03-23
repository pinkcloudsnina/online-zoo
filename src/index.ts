import {initMenu} from './components/menu.js';
import {initAuthorization} from './features/userAuthorization.js';

document.addEventListener('DOMContentLoaded', (): void => {
    initMenu();
    initAuthorization();
});
