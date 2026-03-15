import { drawMeetPets } from '../components/meetPets.js';
import { getPetsList } from '../state/animalState.js';
export function initMeetCarousel() {
    const pets = getPetsList();
    drawMeetPets(pets);
    initCarousel();
}
function initCarousel() {
    const prev = document.querySelector('.meet-pets .controls-prev');
    const next = document.querySelector('.meet-pets .controls-next');
    const track = document.querySelector('.meet-pets .carousel__list');
    const carousel = document.querySelector('.meet-pets .carousel');
    if (!track || !carousel)
        return;
    const card = track.children[0];
    const cardWidth = card.offsetWidth;
    const rows = 2;
    const colsToMove = 1;
    const gap = parseInt(getComputedStyle(track).gap);
    const step = colsToMove * (cardWidth + gap);
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
                track.style.transition = 'transform .35s ease';
            }, 0);
        }, { once: true });
    });
}
//# sourceMappingURL=meetPetsInit.js.map