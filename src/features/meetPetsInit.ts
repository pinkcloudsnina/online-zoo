import {drawMeetPets} from '../components/meetPets.js';
import {getPetsList} from '../state/animalState.js';
import {Pet} from '../types/interfaces.js';
import {initCarousel} from './carousel.js';

export function initMeetPets(container: HTMLElement) {
    const pets: Pet[] = getPetsList();
    drawMeetPets(pets);
    initCarousel(container);
}
