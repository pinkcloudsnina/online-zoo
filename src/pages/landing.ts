import {showLoader, hideLoader} from '../components/loader.js';
import {getPets} from '../utils/api.js';
import {setPets} from '../state/animalState.js';
import {showMessage} from '../components/message.js';
import {initMeetCarousel} from '../features/meetPetsInit.js';
import {setTestimonials} from '../state/animalState.js';
import {initTestimonials} from '../features/testimonialsInit.js';
import {getTestimonials} from '../utils/api.js';
import {initDonationStep1} from '../features/donationStep1.js';

const meetPets = document.querySelector<HTMLElement>('.meet-pets');
const testimonials = document.querySelector<HTMLElement>('.testimonials');

async function initState(): Promise<void> {
    if (!meetPets || !testimonials) return;

    showLoader(meetPets);
    showLoader(testimonials);

    try {
        const petsList = await getPets();
        hideLoader(meetPets);
        if (!petsList) {
            showMessage(meetPets, 'Something went wrong. Please, refresh the page', 'error');
        } else {
            setPets(petsList);
            initMeetCarousel();
        }
    } catch (err) {
        console.error('Error', err);
    }

    try {
        const testimonialsList = await getTestimonials();
        hideLoader(testimonials);
        if (!testimonialsList) {
            showMessage(testimonials, 'Something went wrong. Please, refresh the page', 'error');
        } else {
            setTestimonials(testimonialsList);
            initTestimonials();
        }
    } catch (err) {
        console.error('Error', err);
    }
    initDonateBtns();
}

function initDonateBtns() {
    const donateBtns = document.querySelectorAll<HTMLDivElement>('.donate-btn');
    console.log(donateBtns);

    donateBtns.forEach((btn) => {
        btn.addEventListener('click', initDonationStep1);
    });
}

initState();
