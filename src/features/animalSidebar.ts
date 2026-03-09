import {getCamerasInfo} from '../utils/api.js';
import {setAnimalCameras, getAnimalCameras} from '../state/animalState.js';
import {renderSidebar} from '../components/sidebar.js';
import {Camera} from '../types/Camera.js';

export async function initSidebar(): Promise<void> {
    const cameras: Camera[] | null = (await getCamerasInfo()) ?? [];
    setAnimalCameras(cameras);
    renderSidebar(getAnimalCameras());

    const toggleSidebarBtn = document.querySelector<HTMLElement>('.toggle-btn');
    toggleSidebarBtn?.addEventListener('click', toggleSidebar);
}

export function toggleSidebar(): void {
    const aside = document.querySelector<HTMLElement>('aside');
    aside?.classList.toggle('expanded');
}
