type CarouselSettings = {
    step: number;
    colsToMove: number;
    rows: number;
};

export function initCarousel(container: HTMLElement) {
    const prev = container.querySelector<HTMLElement>('.controls-prev');
    const next = container.querySelector<HTMLElement>('.controls-next');
    const carousel = container.querySelector<HTMLElement>('.carousel');
    const track = container.querySelector<HTMLElement>('.carousel__list');

    if (!track || !carousel) return;

    const carouselState = {
        settings: getCarouselSettings(track),
        intervalId: null,
    };

    prev?.addEventListener('click', () => {
        shiftPrev(track, carouselState.settings);
    });

    next?.addEventListener('click', () => {
        shiftNext(track, carouselState.settings);
    });

    window.addEventListener('resize', () => {
        carouselState.settings = getCarouselSettings(track);
    });

    track.addEventListener('mouseenter', () => stopAutoSlide(carouselState));

    track.addEventListener('mouseleave', () => startAutoSlide(track, carouselState));

    startAutoSlide(track, carouselState);
}

function shiftNext(track: HTMLElement, settings: CarouselSettings) {
    track.style.transform = `translateX(-${settings.step}px)`;
    track.addEventListener(
        'transitionend',
        () => {
            track.style.transition = 'none';

            for (let i = 0; i < settings.rows * settings.colsToMove; i++) {
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
}

function shiftPrev(
    track: HTMLElement,
    settings: {
        step: number;
        colsToMove: number;
        rows: number;
    }
) {
    track.style.transition = 'none';
    for (let i = 0; i < settings.rows * settings.colsToMove; i++) {
        const el = track.lastElementChild;
        if (el) track.prepend(el);
    }

    track.style.transform = `translateX(-${settings.step}px)`;

    setTimeout(() => {
        track.style.transition = 'transform .35s ease';
        track.style.transform = 'translateX(0)';
    }, 0);
}

function getCarouselSettings(track: HTMLElement): CarouselSettings {
    const BREAKPOINT = 1200;
    const width = window.innerWidth;
    const card = track.children[0] as HTMLElement;
    const cardWidth = card.offsetWidth;
    const colsToMove = 1;
    let rows = width < BREAKPOINT ? 1 : 2;
    const gap = parseInt(getComputedStyle(track).gap);
    const step = colsToMove * (cardWidth + gap);

    return {step, colsToMove, rows};
}

function startAutoSlide(track: HTMLElement, state: {settings: CarouselSettings; intervalId: number | null}) {
    if (state.intervalId) return;

    state.intervalId = window.setInterval(() => {
        shiftNext(track, state.settings);
    }, 3000);
}

function stopAutoSlide(state: {settings: CarouselSettings; intervalId: number | null}) {
    if (!state.intervalId) return;
    window.clearInterval(state.intervalId);
    state.intervalId = null;
}
