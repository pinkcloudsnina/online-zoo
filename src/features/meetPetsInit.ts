import {drawMeetPets} from '../components/meetPets.js';
import {getPetsList} from '../state/animalState.js';
import {Pet} from '../types/interfaces.js';

export function initMeetCarousel() {
    const pets: Pet[] = getPetsList();

    drawMeetPets(pets);
    initCarousel();
}

function initCarousel() {
    const prev = document.querySelector<HTMLElement>('.meet-pets .controls-prev');
    const next = document.querySelector<HTMLElement>('.meet-pets .controls-next');
    const track = document.querySelector<HTMLDivElement>('.meet-pets .carousel__list');
    const carousel = document.querySelector<HTMLElement>('.meet-pets .carousel');

    if (!track || !carousel) return;

    const card = track.children[0] as HTMLElement;
    const cardWidth = card.offsetWidth;
    const rows = 2;
    const colsToMove = 1;
    const gap = parseInt(getComputedStyle(track).gap);
    const step = colsToMove * (cardWidth + gap);

    prev?.addEventListener('click', () => {
        track.style.transition = 'none';

        for (let i = 0; i < rows * colsToMove; i++) {
            const el = track.lastElementChild;
            if (el) track.prepend(el);
        }

        track.style.transform = `translateX(-${step}px)`;

        setTimeout(() => {
            track.style.transition = 'transform .35s ease';
            track.style.transform = 'translateX(0)';
        }, 0);
    });

    next?.addEventListener('click', () => {
        track.style.transform = `translateX(-${step}px)`;

        track.addEventListener(
            'transitionend',
            () => {
                track.style.transition = 'none';

                for (let i = 0; i < rows * colsToMove; i++) {
                    const el = track.firstElementChild;
                    if (el) track.appendChild(el);
                }

                track.style.transform = 'translateX(0)';

                setTimeout(() => {
                    track.style.transition = 'transform .35s ease';
                }, 0);
            },
            {once: true}
        );
    });
}
