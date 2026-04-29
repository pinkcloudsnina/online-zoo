import {createTag} from '../utils/tagEl.js';

const main = document.querySelector<HTMLElement>('main');

export function showTitle(): void {
    const container = createTag('section', ['player-container']);
    const header = createTag('h1');
    header.textContent = 'live cams';
    container.append(header);
    main?.append(container);
}

export function drawPlayerContainer(name: string, animal: string, cam: {link: string; img: string}): void {
    let container = document.querySelector<HTMLElement>('.player-container');

    if (!container) {
        container = createTag('section', ['player-container']);
        main!.append(container);
    } else container.innerHTML = '';

    container.insertAdjacentHTML(
        'beforeend',
        `<h1>live ${animal} cameras</h1>
        <div class="btn btn--orange donate-btn"><span class="btn__text">donate now</span></div>
        <div class="player">
          <a href="${cam.link}" target="_blank">
            <img src="${cam.img}" alt="${animal}">
            <div class="title">${name}, ${animal} cam </div>
            <div class="logo"></div>
            <div class="play-btn"></div>
          </a>
        </div>`
    );
}
