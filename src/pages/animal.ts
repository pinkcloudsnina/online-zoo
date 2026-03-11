import {initSidebar} from '../features/animalSidebar.js';
import {refreshAnimal} from '../features/animalData.js';
import {initAuthorization, initLogged} from '../features/userAuthorization.js';

function initState(): void {
    initLogged();
    initAuthorization();
    initSidebar();
    refreshAnimal();
}

initState();
