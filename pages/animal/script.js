const toggle = document.querySelector('.toggle-btn');
const aside = document.querySelector('aside');

toggle.addEventListener('click', () => {
    console.log('toggle');

    aside.classList.toggle('expanded');
});
