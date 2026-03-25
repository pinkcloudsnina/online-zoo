export function initCarousel(container: HTMLElement) {
    const prev = container.querySelector<HTMLElement>('.controls-prev');
    const next = container.querySelector<HTMLElement>('.controls-next');
    const track = container.querySelector<HTMLElement>('.carousel__list');
    const carousel = container.querySelector<HTMLElement>('.carousel');

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
