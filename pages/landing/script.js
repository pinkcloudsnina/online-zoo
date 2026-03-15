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
