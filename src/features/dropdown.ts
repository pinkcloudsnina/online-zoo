export function initDropdowns(container: HTMLElement, onChange?: (id: string, value: string) => void): void {
    const dropdowns = container.querySelectorAll('.dropdown');

    dropdowns.forEach((dropdown) => {
        const toggle = dropdown.querySelector<HTMLElement>('.dropdown__toggle');
        const items = dropdown.querySelectorAll<HTMLElement>('.dropdown__item');
        const label = dropdown.querySelector<HTMLElement>('.dropdown__label');
        const hiddenInput = dropdown.querySelector<HTMLInputElement>('input[type="hidden"]');

        toggle?.addEventListener('click', () => {
            dropdown.classList.toggle('open');
        });

        items.forEach((item) => {
            item.addEventListener('click', () => {
                if (label) label.textContent = item.textContent;
                const value = item.dataset.value;
                if (value && hiddenInput) {
                    hiddenInput.value = value;
                    onChange?.(hiddenInput.id, value);
                }
                dropdown.classList.remove('open');
            });
        });

        document.addEventListener('click', (e) => {
            const target = e.target as Node;
            if (!dropdown.contains(target)) {
                dropdown.classList.remove('open');
            }
        });
    });
}
