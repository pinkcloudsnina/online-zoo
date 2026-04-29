import { createTag } from '../utils/tagEl.js';
function drawPlaceholder() {
    const container = createTag('div', ['placeholder']);
    const innerContainer = createTag('div', ['inner-container']);
    innerContainer.style.transition = 'transform .5s';
    for (let i = 1; i < 6; i++) {
        const el = createTag('div', ['placeholder-icon']);
        el.style.mask = `url(../../assets/icons/placeholder/${i}.svg) no-repeat center`;
        el.style.maskSize = `contain`;
        innerContainer.append(el);
    }
    container.append(innerContainer);
    setInterval(() => animatePlaceholder(innerContainer), 2000);
    return container;
}
function animatePlaceholder(track) {
    if (!track)
        return;
    track.style.transform = 'translateX(-50px)';
    track.addEventListener('transitionend', () => {
        track.style.transition = 'none';
        if (track.firstElementChild)
            track.appendChild(track.firstElementChild);
        track.style.transform = 'translateX(0)';
        requestAnimationFrame(() => {
            track.style.transition = 'transform .5s';
        });
    }, { once: true });
}
export function showPlaceholder(container) {
    const placeholder = document.querySelector('placeholder');
    if (placeholder)
        placeholder.style.opacity = '1';
    container.append(drawPlaceholder());
}
export function hidePlaceholder(container) {
    const placeholder = document.querySelector('placeholder');
    if (placeholder)
        placeholder.style.opacity = '0';
}
//# sourceMappingURL=placeholder.js.map