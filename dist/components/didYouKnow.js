import { createTag } from '../utils/tagEl.js';
const main = document.querySelector('main');
export function drawDidYouKnow(animal) {
    if (!animal)
        return;
    let section = document.querySelector('.animal-about');
    if (section)
        section.innerHTML = '';
    else
        section = createTag('section', ['animal-about']);
    if (section)
        section.innerHTML = '';
    const container = createTag('div', ['container']);
    const content = createTag('div', ['did-you-know']);
    const header = createTag('h2', ['center', 'align--center']);
    const p = createTag('p', ['align--center']);
    p.textContent = animal.description;
    content.append(header, p);
    container.append(content);
    section.append(container);
    main === null || main === void 0 ? void 0 : main.append(section);
}
//# sourceMappingURL=didYouKnow.js.map