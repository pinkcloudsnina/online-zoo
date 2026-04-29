import { drawChoosePets } from '../components/chooseFav.js';
import { getPetsList } from '../state/animalState.js';
import { initCarousel } from './carousel.js';
import { initDonationStats } from './fav-stats.js';
export function initChoosePets(container) {
    const petsList = getPetsList();
    drawChoosePets(petsList, { onLike: toggleFav });
    presetSelected();
    initCarousel(container);
}
function toggleFav(id) {
    const selectedPets = getFavs();
    const isSelected = selectedPets.includes(id);
    const updatedPets = isSelected ? selectedPets.filter((el) => el !== id) : [...selectedPets, id];
    setFavs(updatedPets);
    updateSelected(id, !isSelected);
    initDonationStats();
}
export function getFavs() {
    const selectedPets = JSON.parse(localStorage.getItem('favourite') || '[]');
    return selectedPets;
}
function setFavs(newList) {
    localStorage.setItem('favourite', JSON.stringify(newList));
}
function updateSelected(id, isSelected) {
    const currentLike = document.querySelector(`[data-pet="${id}"]`);
    if (!currentLike)
        return;
    currentLike.classList.toggle('selected', isSelected);
}
function presetSelected() {
    const selectedPets = getFavs();
    for (const petId of selectedPets) {
        updateSelected(petId, true);
    }
}
//# sourceMappingURL=chooseFavs.js.map