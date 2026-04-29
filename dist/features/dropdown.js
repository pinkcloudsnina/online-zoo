export function initDropdowns(container, onChange) {
    const dropdowns = container.querySelectorAll('.dropdown');
    dropdowns.forEach((dropdown) => {
        const toggle = dropdown.querySelector('.dropdown__toggle');
        const items = dropdown.querySelectorAll('.dropdown__item');
        const label = dropdown.querySelector('.dropdown__label');
        const hiddenInput = dropdown.querySelector('input[type="hidden"]');
        toggle === null || toggle === void 0 ? void 0 : toggle.addEventListener('click', () => {
            dropdown.classList.toggle('open');
        });
        items.forEach((item) => {
            item.addEventListener('click', () => {
                if (label)
                    label.textContent = item.textContent;
                const value = item.dataset.value;
                if (value && hiddenInput) {
                    hiddenInput.value = value;
                    onChange === null || onChange === void 0 ? void 0 : onChange(hiddenInput.id, value);
                }
                dropdown.classList.remove('open');
            });
        });
        document.addEventListener('click', (e) => {
            const target = e.target;
            if (!dropdown.contains(target)) {
                dropdown.classList.remove('open');
            }
        });
    });
}
//# sourceMappingURL=dropdown.js.map