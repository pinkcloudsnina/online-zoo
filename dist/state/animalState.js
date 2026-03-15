const state = {
    animalCams: [],
    currentAnimal: null,
    petsList: [],
    testimonialsList: [],
};
export function setCurrentAnimal(animal) {
    state.currentAnimal = animal;
}
export function setAnimalCameras(cameras) {
    state.animalCams = cameras;
}
export function setPets(pets) {
    state.petsList = pets;
}
export function setTestimonials(testimonials) {
    state.testimonialsList = testimonials;
}
export function getCurrentAnimal() {
    return state.currentAnimal;
}
export function getAnimalCameras() {
    return state.animalCams;
}
export function getPetsList() {
    return state.petsList;
}
export function getTestimonialsList() {
    return state.testimonialsList;
}
//# sourceMappingURL=animalState.js.map