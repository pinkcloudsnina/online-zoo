export function initMenu(): void {
    const menuToggle = document.querySelector<HTMLElement>('.menu-toggle');
    const nav = document.querySelector<HTMLElement>('.navigation');
    const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav__list a');

    if (!menuToggle || !nav) return;

    function hideMenu(): void {
        if (!menuToggle || !nav) return;
        nav.classList.remove('is-open');
        menuToggle.classList.remove('menu-toggle-x');
    }

    menuToggle.addEventListener('click', (): void => {
        menuToggle.classList.toggle('menu-toggle-x');
        nav.classList.toggle('is-open');
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1200) {
            hideMenu();
        }
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', hideMenu);
    });

    hideMenu();
}
