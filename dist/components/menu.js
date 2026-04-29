export function initMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.navigation');
    const navLinks = document.querySelectorAll('.nav__list a');
    if (!menuToggle || !nav)
        return;
    function hideMenu() {
        if (!menuToggle || !nav)
            return;
        nav.classList.remove('is-open');
        menuToggle.classList.remove('menu-toggle-x');
    }
    menuToggle.addEventListener('click', () => {
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
//# sourceMappingURL=menu.js.map