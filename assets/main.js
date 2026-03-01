const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.navigation');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('menu-toggle-x');
    nav.classList.toggle('is-open');
});

window.addEventListener('resize', () => {
    if (window.innerWidth >= 1200) {
        nav.classList.remove('is-open');
        menuToggle.classList.remove('menu-toggle-x');
    }
});
