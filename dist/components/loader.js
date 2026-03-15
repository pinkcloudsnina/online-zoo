import { createTag } from '../utils/tagEl.js';
function drawLoader() {
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
export function showLoader(container) {
    container.append(drawLoader());
}
export function hideLoader(container) {
    const loader = container.querySelector(`.loader`);
    loader === null || loader === void 0 ? void 0 : loader.remove();
}
//# sourceMappingURL=loader.js.map