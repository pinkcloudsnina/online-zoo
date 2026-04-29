import {Animal} from '../types/interfaces.js';
import {createTag} from '../utils/tagEl.js';
import {toCamelCase} from '../utils/toCamelCase.js';

export function drawAnimalInfo(animal: Animal | null): void {
    if (!animal) return;
    const section = document.querySelector<HTMLElement>('.animal-about');
    const animalInfo = createTag('div', ['animal-info']);
    const img = createTag('img');
    img.src = `../../assets/images/animal-info/about-${animal.id}.jpg`;
    img.alt = `${animal.commonName}`;

    const profile = createTag('div', ['animal-profile']);
    const list = createTag('ul');
    const descriptionTitles: string[] = ['Common name', 'Scientific name', 'Type', 'Size', 'Diet', 'Habitat', 'Range'];
    descriptionTitles.forEach((title: string) => {
        const liElement = createTag('li');
        const description = createTag('strong');
        description.textContent = `${title}:`;
        liElement.append(description);

        const key = toCamelCase(title) as keyof typeof animal;
        const value = animal[key];
        liElement.append(document.createTextNode(String(value)));
        list.append(liElement);
    });
    profile.append(list);

    const viewMapBtn = createTag('div', ['btn', 'btn--transparent-orange']);
    const btnText = createTag('span', ['btn__text']);
    btnText.textContent = 'view map';
    viewMapBtn.append(btnText);
    profile.append(viewMapBtn);

    const detailedDescription = createTag('p');
    detailedDescription.textContent = animal.detailedDescription;

    animalInfo.append(img, profile, detailedDescription);

    section?.append(animalInfo);
}
