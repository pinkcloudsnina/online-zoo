import {Animal} from '../types/Animal.js';
import {createTag} from '../utils/tagEl.js';

const main = document.querySelector('main');

export function drawDidYouKnow(animal: Animal | null): void {
    if (!animal) return;

    let section = document.querySelector<HTMLElement>('.animal-about');
    if (section) section.innerHTML = '';
    else section = createTag('div', ['animal-about']);

    if (section) section.innerHTML = '';
    const container = createTag('div', ['container']);
    const content = createTag('div', ['did-you-know']);
    const header = createTag('h2', ['center', 'align--center']);
    const p = createTag('p', ['align--center']);
    p.textContent = animal.description;
    content.append(header, p);
    container.append(content);
    section.append(container);
    main?.append(section);
}
