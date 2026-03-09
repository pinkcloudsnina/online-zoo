import {Camera} from '../types/Camera.js';

export function renderSidebar(cameras: Camera[]): void {
    const aside = document.querySelector<HTMLElement>('aside');

    if (!aside || cameras.length === 0) return;

    aside.innerHTML = '';
    aside?.append(createSidebar(cameras));
}

function createSidebar(cameras: Camera[]): HTMLElement {
    const SVG_NS = 'http://www.w3.org/2000/svg';

    const list = createTag('ul', 'side-navigation');
    const toggleBtn = createTag('li', 'toggle-btn');
    const badge = createTag('div', 'badge');
    badge.textContent = 'live';
    const toggleIcon = document.createElementNS(SVG_NS, 'svg');
    const toggleIconUse = document.createElementNS(SVG_NS, 'use');
    toggleIcon.classList.add('btn__icon');
    toggleIconUse.setAttribute('href', '#icon-fforward');
    const carousel = createTag('li', 'sidebarCarousel');
    const carouselList = createTag('ul');
    cameras.forEach((camera) => {
        carouselList.append(renderSidebarElement(camera));
    });
    const carouselSlideBtn = createTag('li', 'down');
    const carouselSlideBtnIcon = createTag('span', 'btn__icon');

    toggleIcon.append(toggleIconUse);
    toggleBtn.append(badge, toggleIcon);

    carousel.append(carouselList);

    carouselSlideBtn.append(carouselSlideBtnIcon);
    list.append(toggleBtn, carousel, carouselSlideBtn);

    return list;
}

function renderSidebarElement(cameraData: Camera): HTMLLIElement {
    const sideEl: HTMLLIElement = document.createElement('li');
    sideEl.classList.add('animal-logo');
    sideEl.dataset.petId = cameraData.petId.toString();
    const content: HTMLElement = document.createElement('div');
    const logo: HTMLElement = document.createElement('div');
    logo.classList.add('bg-circle');
    const logoImg: HTMLImageElement = document.createElement('img');
    logoImg.src = `../../assets/icons/sidebar/sidebar-${cameraData.petId}.svg`;
    logoImg.alt = `pet logo`;
    const p: HTMLElement = document.createElement('p');
    p.textContent = cameraData.text;
    logo.append(logoImg);
    content.append(logo);
    content.append(p);
    sideEl.append(content);

    return sideEl;
}

function createTag<T extends keyof HTMLElementTagNameMap>(tag: T, className?: string): HTMLElementTagNameMap[T] {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
}
