var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { showLoader, hideLoader } from '../components/loader.js';
import { getPets } from '../utils/api.js';
import { setPets } from '../state/animalState.js';
import { showMessage } from '../components/message.js';
import { initMeetCarousel } from '../features/meetPetsInit.js';
import { setTestimonials } from '../state/animalState.js';
import { initTestimonials } from '../features/testimonialsInit.js';
import { getTestimonials } from '../utils/api.js';
import { initDonationStep1 } from '../features/donationStep1.js';
const meetPets = document.querySelector('.meet-pets');
const testimonials = document.querySelector('.testimonials');
function initState() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!meetPets || !testimonials)
            return;
        showLoader(meetPets);
        showLoader(testimonials);
        try {
            const petsList = yield getPets();
            hideLoader(meetPets);
            if (!petsList) {
                showMessage(meetPets, 'Something went wrong. Please, refresh the page', 'error');
            }
            else {
                setPets(petsList);
                initMeetCarousel();
            }
        }
        catch (err) {
            console.error('Error', err);
        }
        try {
            const testimonialsList = yield getTestimonials();
            hideLoader(testimonials);
            if (!testimonialsList) {
                showMessage(testimonials, 'Something went wrong. Please, refresh the page', 'error');
            }
            else {
                setTestimonials(testimonialsList);
                initTestimonials();
            }
        }
        catch (err) {
            console.error('Error', err);
        }
        initDonateBtns();
    });
}
function initDonateBtns() {
    const donateBtns = document.querySelectorAll('.donate-btn');
    console.log(donateBtns);
    donateBtns.forEach((btn) => {
        btn.addEventListener('click', initDonationStep1);
    });
}
initState();
//# sourceMappingURL=landing.js.map