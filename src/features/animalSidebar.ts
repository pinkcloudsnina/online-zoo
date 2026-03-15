import {getAnimalCameras, setCurrentAnimal} from '../state/animalState.js';
import {renderSidebar} from '../components/sidebar.js';
import {refreshAnimal} from './animalData.js';
import {initSidebarCarousel} from './sidebarCarousel.js';
import {hideLoader, showLoader} from '../components/loader.js';
import {getAnimalInfo} from '../utils/api.js';
import {hideMessage, showMessage} from '../components/message.js';
import {createTag} from '../utils/tagEl.js';

const main = document.querySelector<HTMLElement>('main');
const body = document.body;

export async function initSidebar(): Promise<void> {
    renderSidebar(getAnimalCameras());

    const toggleSidebarBtn = document.querySelector<HTMLElement>('.toggle-btn');
    toggleSidebarBtn?.addEventListener('click', toggleSidebar);

    const animalCams = document.querySelectorAll<HTMLLIElement>('.animal-logo');
    animalCams.forEach((animalCam) =>
        animalCam.addEventListener('click', () => {
            let chosenId: number;

            if (animalCam.dataset.petId) {
                chosenId = +animalCam.dataset.petId;
                chooseAnimalCam(chosenId);
            }
        })
    );
    setActive(1);
    initSidebarCarousel();
}

export function toggleSidebar(): void {
    const aside = document.querySelector<HTMLElement>('aside');
    aside?.classList.toggle('expanded');
}

export async function chooseAnimalCam(id: number): Promise<void> {
    const overlay = createTag('div', ['loader-overlay']);
    const animalAbout = document.querySelector<HTMLElement>('.animal-about');
    body.append(overlay);

    if (animalAbout) animalAbout.innerHTML = '';
    hideMessage(main!);
    showLoader(overlay);

    try {
        const newAnimal = await getAnimalInfo(id);
        setTimeout(() => {
            hideLoader(overlay);
            overlay.remove();
        }, 300);

        setActive(id);
        if (newAnimal) {
            setCurrentAnimal(newAnimal);
            refreshAnimal(id);
        }
        if (!newAnimal) {
            const aboutSection = document.querySelector<HTMLElement>('.animal-about');
            if (aboutSection)
                showMessage(aboutSection, 'Error getting animal data. Please choose animal from sidebar.', 'error');
        }
    } catch (err) {
        console.error('Unknown Error', err);
    }
}

function setActive(id: number): void {
    const currentActive = document.querySelector<HTMLLIElement>('.animal-logo.active');
    const newActive = document.querySelector<HTMLLIElement>(`.animal-logo[data-pet-id="${id}"]`);
    if (currentActive) currentActive.classList.remove('active');
    if (newActive) newActive.classList.add('active');
}
