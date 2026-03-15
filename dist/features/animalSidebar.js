var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getAnimalCameras, setCurrentAnimal } from '../state/animalState.js';
import { renderSidebar } from '../components/sidebar.js';
import { refreshAnimal } from './animalData.js';
import { initSidebarCarousel } from './sidebarCarousel.js';
import { hideLoader, showLoader } from '../components/loader.js';
import { getAnimalInfo } from '../utils/api.js';
import { hideMessage, showMessage } from '../components/message.js';
const main = document.querySelector('main');
export function initSidebar() {
    return __awaiter(this, void 0, void 0, function* () {
        renderSidebar(getAnimalCameras());
        const toggleSidebarBtn = document.querySelector('.toggle-btn');
        toggleSidebarBtn === null || toggleSidebarBtn === void 0 ? void 0 : toggleSidebarBtn.addEventListener('click', toggleSidebar);
        const animalCams = document.querySelectorAll('.animal-logo');
        animalCams.forEach((animalCam) => animalCam.addEventListener('click', () => {
            let chosenId;
            if (animalCam.dataset.petId) {
                chosenId = +animalCam.dataset.petId;
                chooseAnimalCam(chosenId);
            }
        }));
        setActive(1);
        initSidebarCarousel();
    });
}
export function toggleSidebar() {
    const aside = document.querySelector('aside');
    aside === null || aside === void 0 ? void 0 : aside.classList.toggle('expanded');
}
export function chooseAnimalCam(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const animalAbout = document.querySelector('.animal-about');
        if (!animalAbout)
            return;
        animalAbout.innerHTML = '';
        hideMessage(main);
        showLoader(animalAbout);
        try {
            const newAnimal = yield getAnimalInfo(id);
            hideLoader(animalAbout);
            setActive(id);
            if (newAnimal) {
                setCurrentAnimal(newAnimal);
                refreshAnimal(id);
            }
            if (!newAnimal) {
                const aboutSection = document.querySelector('.animal-about');
                if (aboutSection)
                    showMessage(aboutSection, 'Error getting animal data. Please choose animal from sidebar.', 'error');
            }
        }
        catch (err) {
            console.error('Unknown Error', err);
        }
    });
}
function setActive(id) {
    const currentActive = document.querySelector('.animal-logo.active');
    const newActive = document.querySelector(`.animal-logo[data-pet-id="${id}"]`);
    if (currentActive)
        currentActive.classList.remove('active');
    if (newActive)
        newActive.classList.add('active');
}
//# sourceMappingURL=animalSidebar.js.map