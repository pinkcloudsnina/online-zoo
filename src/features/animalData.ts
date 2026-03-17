import {getCurrentAnimal} from '../state/animalState.js';
import {drawDidYouKnow} from '../components/didYouKnow.js';
import {drawAnimalInfo} from '../components/animalInfo.js';
import {openAnimalMap} from '../features/mapPopup.js';
import {drawPlayerContainer} from '../components/player.js';
import {drawCams} from '../components/cameras.js';
import {drawQuickDonation} from '../components/quickDonation.js';
import {initDonationStep1} from './donationStep1.js';
import {getAnimalCamsData} from '../state/animalCams.js';

export async function refreshAnimal(id = 1): Promise<void> {
    const currentAnimal = getCurrentAnimal();
    if (!currentAnimal) return;

    refreshCams(id);

    drawQuickDonation();

    drawDidYouKnow(currentAnimal);
    drawAnimalInfo(currentAnimal);

    initDonateBtns();

    const showMapBtn = document.querySelector<HTMLElement>('.animal-profile .btn');

    showMapBtn?.addEventListener('click', () => {
        openAnimalMap(currentAnimal);
    });
}

function initDonateBtns() {
    const donateBtns = document.querySelectorAll<HTMLDivElement>('.donate-btn');

    donateBtns.forEach((btn) => {
        btn.addEventListener('click', initDonationStep1);
    });
}

export function refreshCams(id: number): void {
    const animalCams = getAnimalCamsData(id);
    if (animalCams && animalCams.cameras[0]) {
        drawPlayerContainer(animalCams.petName, animalCams.commonName, animalCams.cameras[0]);
        drawCams(animalCams.cameras);
    }
}
