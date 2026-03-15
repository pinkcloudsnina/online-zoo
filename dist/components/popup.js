const popup = document.querySelector('.popup');
const overlay = document.querySelector('.overlay');
const popupClose = document.querySelector('.popup__close');
const popupContent = document.querySelector('.popup__content');
export function openPopup(content) {
    if (!popup || !popupContent)
        return;
    popupContent.innerHTML = '';
    popupContent.append(content);
    popup.classList.add('popup-open');
}
export function closePopup() {
    popup === null || popup === void 0 ? void 0 : popup.classList.remove('popup-open');
}
popupClose === null || popupClose === void 0 ? void 0 : popupClose.addEventListener('click', closePopup);
overlay === null || overlay === void 0 ? void 0 : overlay.addEventListener('click', closePopup);
//# sourceMappingURL=popup.js.map