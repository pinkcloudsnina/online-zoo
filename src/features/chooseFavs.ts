import {drawChoosePets} from '../components/chooseFav.js';
import {getPetsList} from '../state/animalState.js';
import {initCarousel} from './carousel.js';

export function initChoosePets(container: HTMLElement): void {
    const petsList = getPetsList();
    drawChoosePets(petsList, {onLike: toggleFav});
    presetSelected();
    initCarousel(container);
}

function toggleFav(id: number): void {
    const selectedPets = getFavs();
    const isSelected = selectedPets.includes(id);

    const updatedPets = isSelected ? selectedPets.filter((el) => el !== id) : [...selectedPets, id];

    setFavs(updatedPets);
    updateSelected(id, !isSelected);
}

function getFavs(): number[] {
    const selectedPets = JSON.parse(localStorage.getItem('favourite') || '[]');
    return selectedPets;
}

function setFavs(newList: number[]): void {
    localStorage.setItem('favourite', JSON.stringify(newList));
}

function updateSelected(id: number, isSelected: boolean): void {
    const currentLike = document.querySelector<HTMLElement>(`[data-pet="${id}"]`);
    if (!currentLike) return;
    currentLike.classList.toggle('selected', isSelected);
}

function presetSelected(): void {
    const selectedPets = getFavs();
    for (const petId of selectedPets) {
        updateSelected(petId, true);
    }
}
