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
import { refreshAnimal, refreshCams } from './animalData.js';
import { initSidebarCarousel } from './sidebarCarousel.js';
import { hideLoader } from '../components/loader.js';
import { apiRequest } from '../utils/api.js';
import { showMessage } from '../components/message.js';
import { createTag } from '../utils/tagEl.js';
const main = document.querySelector('main');
const body = document.body;
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
        const overlay = createTag('div', ['loader-overlay']);
        const animalAbout = document.querySelector('.animal-about');
        body.append(overlay);
        if (animalAbout)
            animalAbout.innerHTML = '';
        try {
            const newAnimal = yield apiRequest(`/pets/${id}`);
            setActive(id);
            setCurrentAnimal(newAnimal);
            refreshAnimal();
        }
        catch (error) {
            refreshCams(id);
            const aboutSection = document.querySelector('.animal-about');
            if (aboutSection)
                showMessage(aboutSection, 'Error getting animal data. Please choose animal from sidebar.', 'error');
        }
        finally {
            setTimeout(() => {
                hideLoader(overlay);
                overlay.remove();
            }, 300);
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