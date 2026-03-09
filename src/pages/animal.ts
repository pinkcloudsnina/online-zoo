import {initSidebar} from '../features/animalSidebar.js';
import {refreshAnimal} from '../features/animalData.js';

function initState(): void {
    initSidebar();
    refreshAnimal();
}

initState();
