import type {Animal, Pet} from '../types/interfaces.js';
import type {Camera, Testimonial} from '../types/interfaces.js';

export interface AnimalState {
    animalCams: Camera[];
    currentAnimal: Animal | null;
    petsList: Pet[];
    testimonialsList: Testimonial[];
}

const state: AnimalState = {
    animalCams: [],
    currentAnimal: null,
    petsList: [],
    testimonialsList: [],
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

export function setTestimonials(testimonials: Testimonial[]): void {
    state.testimonialsList = testimonials;
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

export function getTestimonialsList(): Testimonial[] {
    return state.testimonialsList;
}
