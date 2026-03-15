var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { drawDonationStep1, drawListItems } from '../components/donationStep1.js';
import { openPopup } from '../components/popup.js';
import { clearDonationState, setDonationAmount, setDonationAnimal } from '../state/donationState.js';
import { highlightNode } from '../utils/highlightChosen.js';
import { validateField } from '../utils/inputValidation.js';
import { getPetsList, setPets } from '../state/animalState.js';
import { initDonationStep2 } from './donationStep2.js';
import { getPets } from '../utils/api.js';
export function initDonationStep1() {
    return __awaiter(this, void 0, void 0, function* () {
        const pets = yield getPets();
        clearDonationState();
        openPopup(drawDonationStep1());
        initDonationBtns();
        if (pets && pets.length >= 1) {
            drawListItems(pets);
            setPets(pets);
        }
        initDropdown(getPetsList());
        initNextStepBtn();
    });
}
function initDonationBtns() {
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
                        const amount = parseInt(inputCustom.value);
                        setDonationAmount(amount);
                    }
                }
                else {
                    if (inputCustom)
                        inputCustom.value = '';
                    const amount = Number(btn.dataset.donationAmount);
                    setDonationAmount(amount);
                }
            }
            checkNextBtn();
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
        checkNextBtn();
    });
    inputCustom === null || inputCustom === void 0 ? void 0 : inputCustom.addEventListener('blur', () => {
        if (inputCustom.value) {
            const validationMsg = validateField(inputCustom.value, 'amount');
            if (!validationMsg) {
                inputCustom.classList.remove('validation-error');
                if (p)
                    p.textContent = '';
                setDonationAmount(parseFloat(inputCustom.value));
                checkNextBtn();
            }
            else {
                inputCustom.classList.add('validation-error');
                if (p)
                    p.textContent = validationMsg;
            }
        }
        else {
            customBtn === null || customBtn === void 0 ? void 0 : customBtn.classList.remove('active');
            setDonationAmount(null);
        }
        checkNextBtn();
    });
}
function initDropdown(pets) {
    const p = document.querySelector('.choose-pet .error');
    if (pets.length === 0) {
        if (p)
            p.textContent = 'Error getting pet data. Please refresh page';
    }
    document.querySelectorAll('.dropdown').forEach((dropdown) => {
        const toggle = dropdown.querySelector('.dropdown__toggle');
        const list = dropdown.querySelector('.dropdown__list');
        const items = dropdown.querySelectorAll('.dropdown__item');
        const label = dropdown.querySelector('.dropdown__label');
        const hiddenInput = dropdown.querySelector('input[type="hidden"]');
        toggle === null || toggle === void 0 ? void 0 : toggle.addEventListener('click', () => {
            dropdown.classList.toggle('open');
        });
        items.forEach((item) => {
            item.addEventListener('click', () => {
                if (label)
                    label.textContent = item.textContent;
                const dropdownValue = item.dataset.value;
                if (dropdownValue && hiddenInput) {
                    setDonationAnimal(parseInt(dropdownValue));
                    hiddenInput.value = dropdownValue;
                    checkNextBtn();
                }
                dropdown.classList.remove('open');
            });
        });
        document.addEventListener('click', (e) => {
            const target = e.target;
            if (!dropdown.contains(target)) {
                dropdown.classList.remove('open');
            }
        });
    });
}
function checkNextBtn() {
    const donationAmount = document.querySelector('.choose-amount .btn.active');
    const customAmount = document.querySelector('#other-amount-input');
    const petChoice = document.querySelector('#for-pet');
    const nextStepBtn = document.querySelector('.next-step');
    if (donationAmount && (petChoice === null || petChoice === void 0 ? void 0 : petChoice.value)) {
        if (donationAmount.classList.contains('custom-amount-btn') && !customAmount)
            nextStepBtn === null || nextStepBtn === void 0 ? void 0 : nextStepBtn.classList.add('disabled');
        nextStepBtn === null || nextStepBtn === void 0 ? void 0 : nextStepBtn.classList.remove('disabled');
    }
    else
        nextStepBtn === null || nextStepBtn === void 0 ? void 0 : nextStepBtn.classList.add('disabled');
}
function initNextStepBtn() {
    const nextStepBtn = document.querySelector('.next-step');
    nextStepBtn === null || nextStepBtn === void 0 ? void 0 : nextStepBtn.addEventListener('click', () => {
        if (nextStepBtn === null || nextStepBtn === void 0 ? void 0 : nextStepBtn.classList.contains('disabled'))
            return;
        initDonationStep2();
    });
}
//# sourceMappingURL=donationStep1.js.map