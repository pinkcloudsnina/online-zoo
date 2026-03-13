import type {Animal, Pet} from '../types/Animal.js';
import type {Camera} from '../types/Camera.js';

export interface AnimalState {
    animalCams: Camera[];
    currentAnimal: Animal | null;
    petsList: Pet[];
}

const state: AnimalState = {
    animalCams: [],
    currentAnimal: null,
    petsList: [],
};

export function setCurrentAnimal(animal: Animal): void {
    state.currentAnimal = animal;
}

export function setAnimalCameras(cameras: Camera[]): void {
    state.animalCams = cameras;
}

export function setPets(pets: Pet[]): void {
    state.petsList = pets;
}

export function getCurrentAnimal(): Animal | null {
    return state.currentAnimal;
}

export function getAnimalCameras(): Camera[] {
    return state.animalCams;
}

export function getPetsList(): Pet[] {
    return state.petsList;
}
