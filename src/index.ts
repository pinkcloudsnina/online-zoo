import {initMenu} from './components/menu.js';
import {initDonationStep1} from './features/donationStep1.js';
import {initAuthorization, initLogged} from './features/userAuthorization.js';

document.addEventListener('DOMContentLoaded', (): void => {
    initMenu();
    initLogged();
    initAuthorization();
});
