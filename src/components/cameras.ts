import {createTag} from '../utils/tagEl.js';

const main = document.querySelector<HTMLElement>('main');

export function drawCams(): void {
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
            <div class="view__element active">
              <a href="https://www.youtube.com/watch?v=3szkFHfr6sA" target="_blank">
                <img src="../../assets/images/animalsCams/1/cam-1.jpg" alt="panda">
              </a>
              <div class="badge badge--transparent">cam 1</div>
              <div class="play-btn"></div>
            </div>
            <div class="view__element">
              <a href="https://www.youtube.com/watch?v=ZwChSexiPgQ" target="_blank"><img
                  src="../../assets/images/animalsCams/1/cam-2.jpg" alt="panda"></a>

              <div class="badge badge--transparent">cam 2</div>
              <div class="play-btn"></div>
            </div>
            <div class="view__element">
              <a href="https://www.youtube.com/watch?v=5ZDG6op_qqg" target="_blank"><img
                  src="../../assets/images/animalsCams/1/cam-3.jpg" alt="panda"></a>
              <div class="badge badge--transparent">cam 2</div>
              <div class="play-btn"></div>
            </div>
          </div>
          <div class="controls">
            <div class="next"></div>
          </div>
        </div>

        <div class="btn btn--orange"><span class="btn__text">donate now</span></div>`
    );
}
