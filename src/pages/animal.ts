import {initSidebar} from '../features/animalSidebar.js';
import {refreshAnimal} from '../features/animalData.js';
import {showLoader, hideLoader} from '../components/loader.js';
import {apiRequest} from '../utils/api.js';
import {getCurrentAnimal, setAnimalCameras} from '../state/animalState.js';
import {showMessage} from '../components/message.js';
import {Camera} from '../types/interfaces.js';
import {Animal} from '../types/interfaces.js';
import {setCurrentAnimal} from '../state/animalState.js';
import {showTitle} from '../components/player.js';
import {initDonationStep1} from '../features/donationStep1.js';

const main = document.querySelector<HTMLElement>('main');

async function initState(): Promise<void> {
    showTitle();
    showLoader(main!);

    try {
        const [camerasResult, animalResult] = await Promise.all([
            apiRequest<Camera[]>(`/cameras`),
            apiRequest<Animal>(`/pets/1`),
        ]);

        setAnimalCameras(camerasResult);
        setCurrentAnimal(animalResult);
        refreshAnimal();
        initSidebar();
    } catch (err) {
        showMessage(main!, 'Something went wrong. Please, refresh the page', 'error');
    } finally {
        hideLoader(main!);
    }
    initDonateBtns();
}

function initDonateBtns() {
    const donateBtns = document.querySelectorAll<HTMLDivElement>('.donate-btn');
    donateBtns.forEach((btn) => {
        btn.addEventListener('click', initDonationStep1);
    });
}

initState();
