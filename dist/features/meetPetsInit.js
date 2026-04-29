import { drawMeetPets } from '../components/meetPets.js';
import { getPetsList } from '../state/animalState.js';
import { initCarousel } from './carousel.js';
export function initMeetPets(container) {
    const pets = getPetsList();
    drawMeetPets(pets);
    initCarousel(container);
}
//# sourceMappingURL=meetPetsInit.js.map