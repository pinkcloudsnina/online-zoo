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
import { setPets } from '../state/animalState.js';
import { showMessage } from '../components/message.js';
import { initMeetPets } from '../features/meetPetsInit.js';
import { setTestimonials } from '../state/animalState.js';
import { initTestimonials } from '../features/testimonialsInit.js';
import { apiRequest } from '../utils/api.js';
import { initDonateBtns } from '../features/donation.js';
const meetPets = document.querySelector('.meet-pets');
const testimonials = document.querySelector('.testimonials');
function initState() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!meetPets || !testimonials)
            return;
        showLoader(meetPets);
        showLoader(testimonials);
        const [petsRes, testimonialsRes] = yield Promise.allSettled([
            apiRequest('/pets'),
            apiRequest('/feedback'),
        ]);
        if (petsRes.status === 'fulfilled') {
            setPets(petsRes.value);
            initMeetPets(meetPets);
        }
        else {
            showMessage(meetPets, 'Something went wrong. Please, refresh the page', 'error');
        }
        if (testimonialsRes.status === 'fulfilled') {
            setTestimonials(testimonialsRes.value);
            initTestimonials(testimonials);
        }
        else {
            showMessage(testimonials, 'Something went wrong. Please, refresh the page', 'error');
        }
        hideLoader(meetPets);
        hideLoader(testimonials);
        initDonateBtns();
    });
}
initState();
//# sourceMappingURL=landing.js.map