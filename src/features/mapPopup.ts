import {getAnimalInfo} from '../utils/api.js';
import {Animal} from '../types/Animal.js';
import {parseCoordinate} from '../utils/coordinates.js';
import {renderMap} from '../components/map.js';
import {openPopup} from '../components/popup.js';

export async function openAnimalMap(id: number): Promise<void> {
    const animal: Animal | null = await getAnimalInfo(id);
    if (!animal) {
        console.error('Animal not found');
        return;
    }

    const lat = parseCoordinate(animal.latitude);
    const lng = parseCoordinate(animal.longitude);

    if (isNaN(lat) || isNaN(lng)) {
        console.error('Invalid coordinates');
        return;
    }

    const mapContainer = document.createElement('div');
    mapContainer.id = 'map';

    openPopup(mapContainer);
    renderMap('map', lat, lng);
}
