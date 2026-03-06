const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.navigation');
const navLinks = document.querySelectorAll('.nav__list a');

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

window.addEventListener('DOMContentLoaded', () => {
    nav.classList.remove('is-open');
    menuToggle.classList.remove('menu-toggle-x');
});

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        menuToggle.classList.remove('menu-toggle-x');
    });
});
