export function initSidebarCarousel(): void {
    const list = document.querySelector<HTMLUListElement>('.sidebarCarousel ul');
    const next = document.querySelector<HTMLElement>('.down');
    if (!list || !next) return;
    const elHeight = (list.children[0] as HTMLElement).offsetHeight;

    next.addEventListener('click', () => {
        list.style.transition = 'transform 0.5s ';
        list.style.transform = `translateY(-${elHeight}px)`;

        list.addEventListener(
            'transitionend',
            () => {
                const first = list.firstElementChild;
                if (first) list.append(first);
                list.style.transition = 'none';
                list.style.transform = 'translateY(0)';
            },
            {once: true}
        );
    });
}
