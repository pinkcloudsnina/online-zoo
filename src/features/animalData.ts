import {setCurrentAnimal, getCurrentAnimal} from '../state/animalState.js';
import {getAnimalInfo} from '../utils/api.js';
import {Animal} from '../types/Animal.js';
import {drawDidYouKnow} from '../components/didYouKnow.js';
import {drawAnimalInfo} from '../components/animalInfo.js';
import {openAnimalMap} from '../features/mapPopup.js';

export async function refreshAnimal(id = 1): Promise<void> {
    const animal: Animal | null = await getAnimalInfo(id);

    if (!animal) return;

    setCurrentAnimal(animal);

    const currentAnimal = getCurrentAnimal();
    if (!currentAnimal) return;

    drawDidYouKnow(currentAnimal);
    drawAnimalInfo(currentAnimal);

    const showMapBtn = document.querySelector<HTMLElement>('.animal-profile .btn');

    showMapBtn?.addEventListener('click', () => {
        openAnimalMap(currentAnimal);
    });
}
