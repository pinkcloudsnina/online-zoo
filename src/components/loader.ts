import {createTag} from '../utils/tagEl.js';

function drawLoader(): HTMLDivElement {
    const container = createTag('div', ['loader']);

    const el = createTag('div', ['loader-icon']);
    /*
    const random = Math.floor(Math.random() * 5) + 1;
    el.style.mask = `url(../../assets/icons/loader/${random}.svg) no-repeat center`;
    el.style.maskSize = 'contain';
    */
    container.append(el);

    return container;
}

export function showLoader(container: HTMLElement): void {
    container.append(drawLoader());
}

export function hideLoader(container: HTMLElement): void {
    const loader = container.querySelector<HTMLDivElement>(`.loader`);
    loader?.remove();
}
