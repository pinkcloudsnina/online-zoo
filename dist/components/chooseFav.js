import { createTag } from '../utils/tagEl.js';
export function drawChoosePets(pets, handlers) {
    const container = document.querySelector('.choose-carousel');
    if (!container)
        return;
    container.insertAdjacentHTML('afterbegin', `        <div class="carousel__controls">
          <div class="controls controls-prev controls--dark">
            <div class="prev"></div>
          </div>
          <div class="controls controls-next controls--dark">
            <div class="next"></div>
          </div>
        </div>
        <div class="carousel">
          
          </div>`);
    const carousel = container.querySelector('.carousel');
    const track = createTag('div', ['carousel__list']);
    for (const pet of pets) {
        const card = createTag('div', ['carousel__animal']);
        card.dataset.pet = pet.id.toString();
        card.insertAdjacentHTML('afterbegin', `
                <div class="like"></div>
                <img src="../../assets/images/animal-info/about-${pet.id}.jpg" alt="${pet.commonName}">
                <h2 class="pet-name">${pet.name}</h2>
                <h3 class="animal-title header--white">${pet.commonName}</h3>
                <div class="btn btn--transparent-orange"><span class="btn__text">view live cam</span> </div>
        `);
        const likeBtn = card.querySelector('.like');
        likeBtn === null || likeBtn === void 0 ? void 0 : likeBtn.addEventListener('click', () => {
            const id = Number(card.dataset.pet);
            if (Number.isNaN(id))
                return;
            handlers.onLike(id);
        });
        track === null || track === void 0 ? void 0 : track.append(card);
    }
    carousel === null || carousel === void 0 ? void 0 : carousel.append(track);
}
//# sourceMappingURL=chooseFav.js.map