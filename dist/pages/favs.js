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
import { getPetsList, setPets } from '../state/animalState.js';
import { showMessage } from '../components/message.js';
import { apiRequest } from '../utils/api.js';
import { initDonateBtns } from '../features/donation.js';
import { initChoosePets } from '../features/chooseFavs.js';
import { initDonationStats } from '../features/fav-stats.js';
const chooseCarousel = document.querySelector('.choose-carousel');
function initState() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!chooseCarousel)
            return;
        showLoader(chooseCarousel);
        try {
            const petsList = getPetsList();
            if (!petsList || petsList.length === 0) {
                const pets = yield apiRequest('/pets');
                if (pets) {
                    setPets(pets);
                }
            }
            initChoosePets(chooseCarousel);
        }
        catch (err) {
            showMessage(chooseCarousel, 'Something went wrong. Please, refresh the page', 'error');
        }
        finally {
            hideLoader(chooseCarousel);
        }
        window.addEventListener('resize', initDonationStats);
        initDonationStats();
        initDonateBtns();
    });
}
initState();
//# sourceMappingURL=favs.js.map