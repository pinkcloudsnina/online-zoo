import {openAnimalMap} from '../features/mapPopup.js';
import {initSidebar} from '../features/animalSidebar.js';
import {initAnimal} from '../features/animalData.js';

const showMapBtn = document.querySelector<HTMLElement>('.animal-profile .btn');

showMapBtn?.addEventListener('click', () => {
    openAnimalMap(1);
});

function initState(): void {
    initSidebar();
    initAnimal();
}

initState();
