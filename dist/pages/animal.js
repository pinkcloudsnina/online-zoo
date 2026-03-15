var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { initSidebar } from '../features/animalSidebar.js';
import { refreshAnimal } from '../features/animalData.js';
import { showLoader, hideLoader } from '../components/loader.js';
import { getAnimalInfo, getCamerasInfo } from '../utils/api.js';
import { setAnimalCameras } from '../state/animalState.js';
import { showMessage } from '../components/message.js';
import { setCurrentAnimal } from '../state/animalState.js';
import { showTitle } from '../components/player.js';
import { initDonationStep1 } from '../features/donationStep1.js';
const main = document.querySelector('main');
function initState() {
    return __awaiter(this, void 0, void 0, function* () {
        showTitle();
        showLoader(main);
        try {
            const [camerasResult, animalResult] = yield Promise.all([getCamerasInfo(), getAnimalInfo(1)]);
            hideLoader(main);
            if (!camerasResult || !animalResult) {
                showMessage(main, 'Something went wrong. Please, refresh the page', 'error');
            }
            if (camerasResult && animalResult) {
                const cameras = camerasResult;
                setAnimalCameras(cameras);
                initSidebar();
                const animal = animalResult;
                setCurrentAnimal(animal);
                refreshAnimal(1);
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
//# sourceMappingURL=animal.js.map