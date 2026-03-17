import {createTag} from '../utils/tagEl.js';

const main = document.querySelector<HTMLElement>('main');

export function drawCams(cameras: {link: string; img: string}[]): void {
    let container = document.querySelector<HTMLElement>('.cams');

    if (!container) {
        container = createTag('section', ['cams']);
        main!.append(container);
    } else container.innerHTML = '';

    container.insertAdjacentHTML(
        'afterbegin',
        `<h2 class="header--black">More live views</h2>
        <div class="views__carousel">
          <div class="controls">
            <div class="prev"></div>
          </div>
          <div class="view__list">
          </div>
          <div class="controls">
            <div class="next"></div>
          </div>
        </div>

        <div class="btn btn--orange donate-btn"><span class="btn__text">donate now</span></div>`
    );

    addCamData(cameras);
}

function addCamData(cameras: {link: string; img: string}[]): void {
    let viewList = document.querySelector<HTMLElement>('.views__carousel .view__list');
    if (!viewList) return;
    cameras.forEach((cam, idx) => {
        const camEl = createTag('div', ['view__element']);
        camEl.insertAdjacentHTML(
            'afterbegin',
            `
              <a href="${cam.link}" target="_blank">
                <img src="${cam.img}" alt="camera preview">
              </a>
              <div class="badge badge--transparent">cam ${idx + 1}</div>
              <div class="play-btn"></div>`
        );
        viewList.append(camEl);
    });
}
