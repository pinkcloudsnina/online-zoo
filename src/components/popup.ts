const popup = document.querySelector<HTMLElement>('.popup');
const overlay = document.querySelector<HTMLElement>('.overlay');
const popupClose = document.querySelector<HTMLElement>('.popup__close');
const popupContent = document.querySelector<HTMLElement>('.popup__content');

export function openPopup(content: HTMLElement): void {
    if (!popup || !popupContent) return;
    popupContent.innerHTML = '';
    popupContent.append(content);
    popup.classList.add('popup-open');
}

function closePopup(): void {
    popup?.classList.remove('popup-open');
}

popupClose?.addEventListener('click', closePopup);
overlay?.addEventListener('click', closePopup);
