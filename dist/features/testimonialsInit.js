import { drawTestimonials } from '../components/testimonials.js';
import { getTestimonialsList } from '../state/animalState.js';
import { initCarousel } from './carousel.js';
export function initTestimonials(container) {
    const testimonialsList = getTestimonialsList();
    drawTestimonials(testimonialsList);
    initCarousel(container);
}
//# sourceMappingURL=testimonialsInit.js.map