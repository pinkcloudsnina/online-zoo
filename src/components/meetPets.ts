import {Pet} from '../types/interfaces.js';
import {createTag} from '../utils/tagEl.js';

export function drawMeetPets(pets: Pet[]): void {
    drawStaticContent();
    drawCards(pets);
}

function drawStaticContent() {
    const container = document.querySelector<HTMLElement>('.meet-pets');
    if (!container) return;

    container.insertAdjacentHTML(
        'afterbegin',
        `
  <h2 class="align--center">meet some our Pets </h2>
        <div class="container">
          <p class="subheader align--center">Do you have a special place in your heart for animals? Who are your favorites? Perhaps you'd like to donate
to special ones or all our pets? We think it's important for you to choose how your donation is used. </p>
        </div>

        <div class="carousel__controls">
          <div class="controls controls-prev controls--dark">
            <div class="prev"></div>
          </div>
          <div class="controls controls-next controls--dark">
            <div class="next"></div>
          </div>
        </div>
        <div class="carousel">
          
          </div>
        </div>
        <a href="../favs/favourite.html" class="btn btn--transparent-dark"><span class="btn__text">choose your favourite</span></a>`
    );
}

function drawCards(pets: Pet[]) {
    const carousel = document.querySelector<HTMLElement>('.carousel');
    const track = createTag('div', ['carousel__list']);
    for (const pet of pets) {
        const card = createTag('div', ['carousel__animal']);
        card.insertAdjacentHTML(
            'afterbegin',
            `
        <div class="animal-name"> ${pet.name}</div>
                <img src="../../assets/images/animal-info/about-${pet.id}.jpg" alt="${pet.commonName}">
                <h3 class="animal-title header--white">${pet.commonName}</h3>
                <p class="paragraph--white align--center"> ${pet.description} </p>
                <div class="btn btn--transparent-orange"><span class="btn__text">view live cam</span> </div>
        `
        );
        track?.append(card);
    }
    carousel?.append(track);
}
