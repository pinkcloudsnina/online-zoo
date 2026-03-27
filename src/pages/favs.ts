import {showLoader, hideLoader} from '../components/loader.js';
import {getPetsList, setPets} from '../state/animalState.js';
import {showMessage} from '../components/message.js';
import {apiRequest} from '../utils/api.js';
import {Pet} from '../types/interfaces.js';
import {initDonateBtns} from '../features/donation.js';
import {initChoosePets} from '../features/chooseFavs.js';

const chooseCarousel = document.querySelector<HTMLElement>('.choose-carousel');

async function initState(): Promise<void> {
    if (!chooseCarousel) return;
    showLoader(chooseCarousel);

    try {
        const petsList = getPetsList();
        if (!petsList || petsList.length === 0) {
            const pets = await apiRequest<Pet[]>('/pets');
            if (pets) {
                setPets(pets);
            }
        }
        initChoosePets(chooseCarousel);
    } catch (err) {
        showMessage(chooseCarousel, 'Something went wrong. Please, refresh the page', 'error');
    } finally {
        hideLoader(chooseCarousel);
    }

    initDonateBtns();
}

initState();
