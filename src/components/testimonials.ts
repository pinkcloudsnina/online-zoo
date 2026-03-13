import {Testimonial} from '../types/interfaces.js';
import {createTag} from '../utils/tagEl.js';

export function drawTestimonials(testimonials: Testimonial[]): void {
    drawStaticContent();
    drawCards(testimonials);
}

function drawStaticContent() {
    const container = document.querySelector<HTMLElement>('.testimonials');
    if (!container) return;

    container.insertAdjacentHTML(
        'afterbegin',
        `
       <div class="container">
          <h2 class="header--white">
            what our users think
          </h2>
          <p class="paragraph--white">We are continuously striving to improve the experiences of our future guests.
            Below you can leave your own
            feedback, or simply view feedback from past clients. </p>

          <div class="testimonials__container">
            <div class="testimonials__list">

            </div>

            <div class="controls--circle">
              <div class="control active"></div>
              <div class="control"></div>
              <div class="control"></div>
              <div class="control"></div>
            </div>
            <div class="carousel__controls">

              <div class="controls controls-prev controls--light">
                <div class="prev"></div>
              </div>
              <div class="controls controls-next controls--light">
                <div class="next"></div>
              </div>
            </div>
          </div>
          <div class="btn btn--transparent-light"><span class="btn__text">leave feedback</span></div>
        </div>`
    );
}

function drawCards(testimonials: Testimonial[]) {
    const track = document.querySelector<HTMLElement>('.testimonials__list');

    for (const el of testimonials) {
        const card = createTag('div', ['testimonial__element']);
        card.insertAdjacentHTML(
            'afterbegin',
            `
               <div class="quotes">“</div>
                <h3>${el.city}, ${el.month} ${el.year}</h3>
                <p>${el.text}</p>
                <div class="author">${el.name}</div>    
         `
        );
        track?.append(card);
    }
}
