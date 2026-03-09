import type {Animal} from '../types/Animal.js';
import type {Camera} from '../types/Camera.js';

export interface AnimalState {
    animalCams: Camera[];
    currentAnimal: Animal | null;
}

const state: AnimalState = {
    animalCams: [],
    currentAnimal: null,
};

export function setCurrentAnimal(animal: Animal): void {
    state.currentAnimal = animal;
}

export function setAnimalCameras(cameras: Camera[]): void {
    state.animalCams = cameras;
}

export function getCurrentAnimal(): Animal | null {
    return state.currentAnimal;
}

export function getAnimalCameras(): Camera[] {
    return state.animalCams;
}
