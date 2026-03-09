import {Animal} from '../types/Animal.js';
import {parseCoordinate} from '../utils/coordinates.js';
import {renderMap} from '../components/map.js';
import {openPopup} from '../components/popup.js';

export function openAnimalMap(currAnimal: Animal): void {
    if (!currAnimal) {
        console.error('Animal not found');
        return;
    }

    const lat = parseCoordinate(currAnimal.latitude);
    const lng = parseCoordinate(currAnimal.longitude);

    if (isNaN(lat) || isNaN(lng)) {
        console.error('Invalid coordinates');
        return;
    }

    const mapContainer = document.createElement('div');
    mapContainer.id = 'map';

    openPopup(mapContainer);
    renderMap('map', lat, lng);
}
