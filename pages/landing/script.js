const popupBtns = document.querySelectorAll('.popup-btn');
const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('.popup__close');
const overlay = document.querySelector('.overlay');

const donationBtns = document.querySelectorAll('.donations__list .btn');
const content = document.querySelectorAll('.popup__content > div');
let currentContent = 0;

popupBtns.forEach((btn) => btn.addEventListener('click', showPopup));

donationBtns.forEach((btn) => btn.addEventListener('click', nextContent));

closeBtn.addEventListener('click', closePopup);

function showPopup() {
    if (window.innerWidth < 640) {
        currentContent = 1;
    }
    popup.classList.add('shown');
    content[currentContent].classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePopup() {
    popup.classList.remove('shown');
    content[currentContent].classList.remove('active');
    document.body.style.overflow = '';
}

function nextContent() {
    if (currentContent < content.length) {
        content[currentContent].classList.remove('active');
        currentContent++;
        content[currentContent].classList.add('active');
    }
}

function prevContent() {
    if (currentContent > 0) {
        content[currentContent].classList.remove('active');
        currentContent--;
        content[currentContent].classList.add('active');
    }
}

overlay.addEventListener('click', () => {
    currentContent = 0;
    content.forEach((el) => el.classList.remove('active'));
    closePopup();
});

document.querySelectorAll('.dropdown').forEach((dropdown) => {
    const toggle = dropdown.querySelector('.dropdown__toggle');
    const list = dropdown.querySelector('.dropdown__list');
    const items = dropdown.querySelectorAll('.dropdown__item');
    const label = dropdown.querySelector('.dropdown__label');
    const hiddenInput = dropdown.querySelector('input[type="hidden"]');

    toggle.addEventListener('click', () => {
        dropdown.classList.toggle('open');
    });

    items.forEach((item) => {
        item.addEventListener('click', () => {
            label.textContent = item.textContent;
            hiddenInput.value = item.dataset.value;
            dropdown.classList.remove('open');
        });
    });

    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
        }
    });
});

const nextBtns = document.querySelectorAll('.next-step');
const prevBtns = document.querySelectorAll('.prev-step');
nextBtns.forEach((btn) => btn.addEventListener('click', nextContent));
const completeBtn = document.querySelector('.complete');

prevBtns.forEach((btn) => btn.addEventListener('click', prevContent));

completeBtn.addEventListener('click', () => {
    currentContent = 0;
    content.forEach((el) => el.classList.remove('active'));
    closePopup();
});
