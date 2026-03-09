import {getCamerasInfo} from '../utils/api.js';
import {setAnimalCameras, getAnimalCameras} from '../state/animalState.js';
import {renderSidebar} from '../components/sidebar.js';
import {Camera} from '../types/Camera.js';
import {refreshAnimal} from './animalData.js';

export async function initSidebar(): Promise<void> {
    const cameras: Camera[] | null = (await getCamerasInfo()) ?? [];
    setAnimalCameras(cameras);
    renderSidebar(getAnimalCameras());

    const toggleSidebarBtn = document.querySelector<HTMLElement>('.toggle-btn');
    toggleSidebarBtn?.addEventListener('click', toggleSidebar);

    const animalCams = document.querySelectorAll<HTMLLIElement>('.animal-logo');
    animalCams.forEach((animalCam) =>
        animalCam.addEventListener('click', () => {
            let chosenId: number;
            console.log(animalCam.dataset);

            if (animalCam.dataset.petId) {
                chosenId = +animalCam.dataset.petId;
                chooseAnimalCam(chosenId);
            }
        })
    );
}

export function toggleSidebar(): void {
    const aside = document.querySelector<HTMLElement>('aside');
    aside?.classList.toggle('expanded');
}

export function chooseAnimalCam(id: number): void {
    refreshAnimal(id);
}
