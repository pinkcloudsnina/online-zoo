export function initCarousel(container) {
    const prev = container.querySelector('.controls-prev');
    const next = container.querySelector('.controls-next');
    const carousel = container.querySelector('.carousel');
    const track = container.querySelector('.carousel__list');
    if (!track || !carousel)
        return;
    const carouselState = {
        settings: getCarouselSettings(track),
        intervalId: null,
    };
    prev === null || prev === void 0 ? void 0 : prev.addEventListener('click', () => {
        shiftPrev(track, carouselState.settings);
    });
    next === null || next === void 0 ? void 0 : next.addEventListener('click', () => {
        shiftNext(track, carouselState.settings);
    });
    window.addEventListener('resize', () => {
        carouselState.settings = getCarouselSettings(track);
    });
    track.addEventListener('mouseenter', () => stopAutoSlide(carouselState));
    track.addEventListener('mouseleave', () => startAutoSlide(track, carouselState));
    startAutoSlide(track, carouselState);
}
function shiftNext(track, settings) {
    track.style.transform = `translateX(-${settings.step}px)`;
    track.addEventListener('transitionend', () => {
        track.style.transition = 'none';
        for (let i = 0; i < settings.rows * settings.colsToMove; i++) {
            const el = track.firstElementChild;
            if (el)
                track.appendChild(el);
        }
        track.style.transform = 'translateX(0)';
        setTimeout(() => {
            track.style.transition = 'transform .35s ease';
        }, 0);
    }, { once: true });
}
function shiftPrev(track, settings) {
    track.style.transition = 'none';
    for (let i = 0; i < settings.rows * settings.colsToMove; i++) {
        const el = track.lastElementChild;
        if (el)
            track.prepend(el);
    }
    track.style.transform = `translateX(-${settings.step}px)`;
    setTimeout(() => {
        track.style.transition = 'transform .35s ease';
        track.style.transform = 'translateX(0)';
    }, 0);
}
function getCarouselSettings(track) {
    const BREAKPOINT = 1200;
    const width = window.innerWidth;
    const card = track.children[0];
    const cardWidth = card.offsetWidth;
    const colsToMove = 1;
    let rows = width < BREAKPOINT ? 1 : 2;
    const gap = parseInt(getComputedStyle(track).gap);
    const step = colsToMove * (cardWidth + gap);
    return { step, colsToMove, rows };
}
function startAutoSlide(track, state) {
    if (state.intervalId)
        return;
    state.intervalId = window.setInterval(() => {
        shiftNext(track, state.settings);
    }, 3000);
}
function stopAutoSlide(state) {
    if (!state.intervalId)
        return;
    window.clearInterval(state.intervalId);
    state.intervalId = null;
}
//# sourceMappingURL=carousel.js.map