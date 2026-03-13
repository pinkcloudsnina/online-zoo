import {initSidebar} from '../features/animalSidebar.js';
import {refreshAnimal} from '../features/animalData.js';
import {showLoader, hideLoader} from '../components/loader.js';
import {getAnimalInfo, getCamerasInfo} from '../utils/api.js';
import {setAnimalCameras} from '../state/animalState.js';
import {showMessage} from '../components/message.js';
import {Camera} from '../types/interfaces.js';
import {Animal} from '../types/interfaces.js';
import {setCurrentAnimal} from '../state/animalState.js';
import {showTitle} from '../components/player.js';

const main = document.querySelector<HTMLElement>('main');

async function initState(): Promise<void> {
    showTitle();

    showLoader(main!);

    try {
        const [camerasResult, animalResult] = await Promise.all([getCamerasInfo(), getAnimalInfo(1)]);

        hideLoader(main!);

        if (!camerasResult || !animalResult) {
            showMessage(main!, 'Something went wrong. Please, refresh the page', 'error');
        }

        if (camerasResult && animalResult) {
            const cameras: Camera[] = camerasResult;
            setAnimalCameras(cameras);
            initSidebar();

            const animal: Animal = animalResult;
            setCurrentAnimal(animal);
            refreshAnimal(1);
        }
    } catch (err) {
        console.error('Error', err);
    }
}

initState();
