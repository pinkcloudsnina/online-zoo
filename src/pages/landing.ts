import {showLoader, hideLoader} from '../components/loader.js';
import {setPets} from '../state/animalState.js';
import {showMessage} from '../components/message.js';
import {initMeetCarousel} from '../features/meetPetsInit.js';
import {setTestimonials} from '../state/animalState.js';
import {initTestimonials} from '../features/testimonialsInit.js';
import {apiRequest} from '../utils/api.js';
import {Pet, Testimonial} from '../types/interfaces.js';
import {initDonateBtns} from '../features/donation.js';

const meetPets = document.querySelector<HTMLElement>('.meet-pets');
const testimonials = document.querySelector<HTMLElement>('.testimonials');

async function initState(): Promise<void> {
    if (!meetPets || !testimonials) return;

    showLoader(meetPets);
    showLoader(testimonials);

    const [petsRes, testimonialsRes] = await Promise.allSettled([
        apiRequest<Pet[]>('/pets'),
        apiRequest<Testimonial[]>('/feedback'),
    ]);
    if (petsRes.status === 'fulfilled') {
        setPets(petsRes.value);
        initMeetCarousel();
    } else {
        showMessage(meetPets, 'Something went wrong. Please, refresh the page', 'error');
    }

    if (testimonialsRes.status === 'fulfilled') {
        setTestimonials(testimonialsRes.value);
        initTestimonials();
    } else {
        showMessage(testimonials, 'Something went wrong. Please, refresh the page', 'error');
    }

    hideLoader(meetPets);
    hideLoader(testimonials);

    initDonateBtns();
}

initState();
