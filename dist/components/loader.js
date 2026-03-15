import { createTag } from '../utils/tagEl.js';
function drawLoader() {
    const container = createTag('div', ['loader']);
    const track = createTag('div', ['inner-container']);
    track.style.transition = 'transform .3s';
    for (let i = 1; i < 6; i++) {
        const el = createTag('div', ['loader-icon']);
        el.style.mask = `url(../../assets/icons/loader/${i}.svg) no-repeat center`;
        el.style.maskSize = `contain`;
        track.append(el);
    }
    container.append(track);
    const step = 40;
    const startOffset = 0;
    track.style.transform = `translateX(${startOffset}px)`;
    setInterval(() => {
        track.style.transition = 'transform 0.3s';
        track.style.transform = `translateX(${startOffset - step}px)`;
        track.addEventListener('transitionend', () => {
            track.appendChild(track.firstElementChild);
            track.style.transition = 'none';
            track.style.transform = `translateX(${startOffset}px)`;
        }, { once: true });
    }, 1000);
    return container;
}
export function showLoader(container) {
    container.append(drawLoader());
}
export function hideLoader(container) {
    const loader = container.querySelector(`.loader`);
    loader === null || loader === void 0 ? void 0 : loader.remove();
}
//# sourceMappingURL=loader.js.map