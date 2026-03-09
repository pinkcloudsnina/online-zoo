import {openAnimalMap} from '../features/mapPopup.js';

const button = document.querySelector<HTMLElement>('.animal-profile .btn');
console.log(button);

button?.addEventListener('click', () => {
    openAnimalMap(1);
});
