import { drawTestimonials } from '../components/testimonials.js';
import { getTestimonialsList } from '../state/animalState.js';
export function initTestimonials() {
    const testimonialsList = getTestimonialsList();
    drawTestimonials(testimonialsList);
    initCarousel();
}
function initCarousel() {
    const track = document.querySelector('.testimonials__list');
    const carousel = document.querySelector('.testimonials__container');
    if (!track || !carousel)
        return;
    requestAnimationFrame(() => {
        const card = track.children[0];
        if (!card)
            return;
        const cardWidth = card.getBoundingClientRect().width;
        const gap = parseInt(getComputedStyle(track).gap || '0');
        const rows = 2;
        const colsToMove = 1;
        const step = colsToMove * (cardWidth + gap);
        initControls(track, step, rows, colsToMove);
    });
}
function initControls(track, step, rows, colsToMove) {
    const prev = document.querySelector('.testimonials__container .controls-prev');
    const next = document.querySelector('.testimonials__container .controls-next');
    prev === null || prev === void 0 ? void 0 : prev.addEventListener('click', () => {
        track.style.transition = 'none';
        for (let i = 0; i < rows * colsToMove; i++) {
            const el = track.lastElementChild;
            if (el)
                track.prepend(el);
        }
        track.style.transform = `translateX(-${step}px)`;
        setTimeout(() => {
            track.style.transition = 'transform .35s ease';
            track.style.transform = 'translateX(0)';
        }, 0);
    });
    next === null || next === void 0 ? void 0 : next.addEventListener('click', () => {
        track.style.transition = 'transform .35s';
        track.style.transform = `translateX(-${step}px)`;
        track.addEventListener('transitionend', () => {
            track.style.transition = 'none';
            for (let i = 0; i < rows * colsToMove; i++) {
                const el = track.firstElementChild;
                if (el)
                    track.appendChild(el);
            }
            track.style.transform = 'translateX(0)';
            setTimeout(() => {
                track.style.transition = 'transform .35s';
            }, 0);
        }, { once: true });
    });
}
//# sourceMappingURL=testimonialsInit.js.map