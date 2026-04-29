var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { drawDonationStep1 } from '../components/donationStep1.js';
import { openPopup } from '../components/popup.js';
import { clearDonationState, getDonationAmount, getDonationPet, setDonationAmount, setDonationPet, } from '../state/donationState.js';
import { highlightNode } from '../utils/highlightChosen.js';
import { validateInput, validateValueError } from '../utils/inputValidation.js';
import { initDonationStep2 } from './donationStep2.js';
import { apiRequest } from '../utils/api.js';
import { initDropdowns } from './dropdown.js';
import { initNextStepBtn } from './donation.js';
export function initDonationStep1() {
    return __awaiter(this, void 0, void 0, function* () {
        clearDonationState();
        const pets = yield apiRequest('/pets');
        const step1 = drawDonationStep1(pets, {
            initDropdowns: (container) => initDropdowns(container, handleDropdownChange),
        });
        openPopup(step1);
        initDonationAmountBtns();
        initNextStepBtn(initDonationStep2);
    });
}
function handleDropdownChange(id, value) {
    if (id === 'for-pet') {
        choosePet(value);
        enableNextBtn();
    }
}
function choosePet(value) {
    setDonationPet(parseInt(value));
    enableNextBtn();
}
function initDonationAmountBtns() {
    const amountBtns = document.querySelectorAll('.choose-amount .btn');
    const customBtn = document.querySelector('.custom-amount-btn');
    const inputCustom = document.querySelector('.custom-amount input');
    const p = document.querySelector('p.validation-error');
    amountBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('active')) {
                btn.classList.remove('active');
                setDonationAmount(null);
                if (btn.classList.contains('custom-amount-btn')) {
                    if (inputCustom)
                        inputCustom.value = '';
                }
            }
            else {
                highlightNode(amountBtns, btn, 'active');
                if (btn.classList.contains('custom-amount-btn')) {
                    if (inputCustom) {
                        const amount = inputCustom.value;
                        setDonationAmount(amount);
                    }
                }
                else {
                    if (inputCustom)
                        inputCustom.value = '';
                    const amount = btn.dataset.donationAmount || '';
                    setDonationAmount(amount);
                }
            }
            enableNextBtn();
        });
    });
    inputCustom === null || inputCustom === void 0 ? void 0 : inputCustom.addEventListener('click', () => {
        if (customBtn)
            highlightNode(amountBtns, customBtn, 'active');
        setDonationAmount(null);
        if (inputCustom)
            inputCustom.value = '';
        if (p)
            p.textContent = '';
        enableNextBtn();
    });
    inputCustom === null || inputCustom === void 0 ? void 0 : inputCustom.addEventListener('input', () => {
        if (p)
            p.textContent = '';
        const validationType = inputCustom.dataset.validate;
        validateInput(inputCustom, validationType);
        setDonationAmount(inputCustom.value);
        enableNextBtn();
    });
}
function enableNextBtn() {
    const nextStepBtn = document.querySelector('.next-step');
    if (validateDonationStep1()) {
        nextStepBtn === null || nextStepBtn === void 0 ? void 0 : nextStepBtn.classList.remove('disabled');
    }
    else
        nextStepBtn === null || nextStepBtn === void 0 ? void 0 : nextStepBtn.classList.add('disabled');
}
function validateDonationStep1() {
    const donationAmount = getDonationAmount();
    const donationPet = getDonationPet();
    const isAmountValid = donationAmount != null && !validateValueError(donationAmount.toString(), 'amount');
    const isPetSelected = donationPet != null;
    return isAmountValid && isPetSelected;
}
//# sourceMappingURL=donationStep1.js.map