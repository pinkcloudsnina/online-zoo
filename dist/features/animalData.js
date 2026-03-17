var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getCurrentAnimal } from '../state/animalState.js';
import { drawDidYouKnow } from '../components/didYouKnow.js';
import { drawAnimalInfo } from '../components/animalInfo.js';
import { openAnimalMap } from '../features/mapPopup.js';
import { drawPlayerContainer } from '../components/player.js';
import { drawCams } from '../components/cameras.js';
import { drawQuickDonation } from '../components/quickDonation.js';
import { initDonationStep1 } from './donationStep1.js';
import { getAnimalCamsData } from '../state/animalCams.js';
export function refreshAnimal() {
    return __awaiter(this, arguments, void 0, function* (id = 1) {
        const currentAnimal = getCurrentAnimal();
        if (!currentAnimal)
            return;
        refreshCams(id);
        drawQuickDonation();
        drawDidYouKnow(currentAnimal);
        drawAnimalInfo(currentAnimal);
        initDonateBtns();
        const showMapBtn = document.querySelector('.animal-profile .btn');
        showMapBtn === null || showMapBtn === void 0 ? void 0 : showMapBtn.addEventListener('click', () => {
            openAnimalMap(currentAnimal);
        });
    });
}
function initDonateBtns() {
    const donateBtns = document.querySelectorAll('.donate-btn');
    donateBtns.forEach((btn) => {
        btn.addEventListener('click', initDonationStep1);
    });
}
export function refreshCams(id) {
    const animalCams = getAnimalCamsData(id);
    if (animalCams && animalCams.cameras[0]) {
        drawPlayerContainer(animalCams.petName, animalCams.commonName, animalCams.cameras[0]);
        drawCams(animalCams.cameras);
    }
}
//# sourceMappingURL=animalData.js.map