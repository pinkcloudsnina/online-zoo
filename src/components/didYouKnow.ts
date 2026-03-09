import {Animal} from '../types/Animal.js';
import {createTag} from '../utils/tagEl.js';

export function drawDidYouKnow(animal: Animal | null): void {
    if (!animal) return;
    const section = document.querySelector<HTMLElement>('.animal-about');
    if (section) section.innerHTML = '';
    const container = createTag('div', ['container']);
    const content = createTag('div', ['did-you-know']);
    const header = createTag('h2', ['center', 'align--center']);
    const p = createTag('p', ['align--center']);
    p.textContent = animal.description;
    content.append(header, p);
    container.append(content);
    if (section) section.append(container);
}
