import {drawTestimonials} from '../components/testimonials.js';
import {getTestimonialsList} from '../state/animalState.js';
import {initCarousel} from './carousel.js';

export function initTestimonials(container: HTMLElement): void {
    const testimonialsList = getTestimonialsList();
    drawTestimonials(testimonialsList);
    initCarousel(container);
}
