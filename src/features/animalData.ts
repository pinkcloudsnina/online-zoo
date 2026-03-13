import {getCurrentAnimal, getPetsList} from '../state/animalState.js';
import {drawDidYouKnow} from '../components/didYouKnow.js';
import {drawAnimalInfo} from '../components/animalInfo.js';
import {openAnimalMap} from '../features/mapPopup.js';
import {drawPlayerContainer} from '../components/player.js';
import {drawCams} from '../components/cameras.js';
import {drawQuickDonation} from '../components/quickDonation.js';

export async function refreshAnimal(id = 1): Promise<void> {
    const currentAnimal = getCurrentAnimal();
    if (!currentAnimal) return;

    drawPlayerContainer();
    drawCams();
    drawQuickDonation();

    drawDidYouKnow(currentAnimal);
    drawAnimalInfo(currentAnimal);

    const showMapBtn = document.querySelector<HTMLElement>('.animal-profile .btn');

    showMapBtn?.addEventListener('click', () => {
        openAnimalMap(currentAnimal);
    });
}
