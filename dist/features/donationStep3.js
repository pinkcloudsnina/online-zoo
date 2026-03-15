var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { drawDonationResult } from '../components/donationResult.js';
import { drawCardItems, drawDonationStep3, drawMonthItems, drawYearItems, showSaveCardCheck, } from '../components/donationStep3.js';
import { openPopup } from '../components/popup.js';
import { getAuthUser } from '../state/authState.js';
import { getDonationState } from '../state/donationState.js';
import { sendDonationRequest } from '../utils/api.js';
import { validateField } from '../utils/inputValidation.js';
import { initDonationStep2 } from './donationStep2.js';
export function initDonationStep3() {
    const currentUser = getAuthUser();
    openPopup(drawDonationStep3());
    drawMonthItems();
    drawYearItems();
    if (currentUser) {
        showSaveCardCheck();
        const savedCardsString = localStorage.getItem('savedCards');
        let savedCards = [];
        if (savedCardsString) {
            try {
                savedCards = JSON.parse(savedCardsString);
            }
            catch (_a) {
                savedCards = [];
            }
            drawCardItems(savedCards);
        }
    }
    initDropdowns();
    initTextInputs();
    checkCompleteBtn();
    initCompleteBtn();
    initPrevStepBtn();
}
function initTextInputs() {
    const inputCard = document.querySelector('#card-num');
    const inputCVV = document.querySelector('#cvv');
    inputCard === null || inputCard === void 0 ? void 0 : inputCard.addEventListener('blur', () => {
        const p = inputCard.nextElementSibling;
        if (inputCard.value) {
            const validationMsg = validateField(inputCard.value, 'card');
            if (!validationMsg) {
                inputCard.classList.remove('validation-error');
                if (p)
                    p.textContent = '';
            }
            else {
                inputCard.classList.add('validation-error');
                if (p)
                    p.textContent = validationMsg;
            }
        }
        checkCompleteBtn();
    });
    inputCVV === null || inputCVV === void 0 ? void 0 : inputCVV.addEventListener('blur', () => {
        const p = inputCVV.nextElementSibling;
        if (inputCVV.value) {
            const validationMsg = validateField(inputCVV.value, 'cvv');
            if (!validationMsg) {
                inputCVV.classList.remove('validation-error');
                if (p)
                    p.textContent = '';
            }
            else {
                inputCVV.classList.add('validation-error');
                if (p)
                    p.textContent = validationMsg;
            }
        }
        checkCompleteBtn();
    });
}
function initDropdowns() {
    document.querySelectorAll('.dropdown').forEach((dropdown) => {
        const toggle = dropdown.querySelector('.dropdown__toggle');
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
                    hiddenInput.value = dropdownValue;
                    checkDate();
                    checkCompleteBtn();
                }
                dropdown.classList.remove('open');
                if (dropdown.classList.contains('card-select') && dropdownValue) {
                    const cardInput = document.querySelector('#card-num');
                    if (cardInput)
                        cardInput.value = dropdownValue;
                }
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
function checkDate() {
    const year = document.querySelector('#year');
    const month = document.querySelector('#month');
    const p = document.querySelector('.date-error');
    if ((year === null || year === void 0 ? void 0 : year.value) && (month === null || month === void 0 ? void 0 : month.value)) {
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();
        const inputMonth = parseInt(month.value);
        const inputYear = parseInt(year.value);
        if (inputYear > currentYear) {
            if (p)
                p.textContent = '';
            month.classList.remove('validation-error');
            year.classList.remove('validation-error');
            return;
        }
        if (inputYear === currentYear && inputMonth >= currentMonth) {
            if (p)
                p.textContent = '';
            month.classList.remove('validation-error');
            year.classList.remove('validation-error');
        }
        else {
            if (p)
                p.textContent = 'Date expired';
            month.classList.add('validation-error');
            year.classList.add('validation-error');
        }
    }
}
function checkCompleteBtn() {
    const completeBtn = document.querySelector('.complete-btn');
    const requiredFields = Array.from(document.querySelectorAll('.popup input[type="text"],.month-select input[type="hidden"], .year-select input[type="hidden"]'));
    const hasError = requiredFields.some((element) => {
        if (!element.value || element.classList.contains('validation-error'))
            return true;
        else
            return false;
    });
    if (hasError)
        completeBtn === null || completeBtn === void 0 ? void 0 : completeBtn.classList.add('disabled');
    else
        completeBtn === null || completeBtn === void 0 ? void 0 : completeBtn.classList.remove('disabled');
}
function initCompleteBtn() {
    const completeBtn = document.querySelector('.complete-btn');
    completeBtn === null || completeBtn === void 0 ? void 0 : completeBtn.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
        if (completeBtn.classList.contains('disabled'))
            return;
        saveCurrCard();
        try {
            const donationRequest = getDonationRequestFromState(getDonationState());
            const donation = yield sendDonationRequest(donationRequest);
            const result = donation;
            openPopup(drawDonationResult('success', result.message));
        }
        catch (error) {
            console.error('Donation error:', error);
            openPopup(drawDonationResult('error', 'Something went wrong. Please, try again later.'));
        }
    }));
}
function saveCurrCard() {
    var _a, _b;
    console.log('saving card');
    const currCard = (_a = document.querySelector('#card-num')) === null || _a === void 0 ? void 0 : _a.value;
    const saveCardDetails = (_b = document.querySelector('#save-card')) === null || _b === void 0 ? void 0 : _b.checked;
    console.log(saveCardDetails);
    if (currCard && saveCardDetails) {
        const savedCardsString = localStorage.getItem('savedCards');
        let savedCards = [];
        if (savedCardsString) {
            try {
                savedCards = JSON.parse(savedCardsString);
            }
            catch (_c) {
                savedCards = [];
            }
        }
        if (savedCards.indexOf(currCard) === -1) {
            savedCards.push(currCard);
        }
        localStorage.setItem('savedCards', JSON.stringify(savedCards));
    }
}
function getDonationRequestFromState(state) {
    if (!state.name || !state.email || state.amount === null || state.petId === null) {
        throw new Error('All donation data must be filled');
    }
    return {
        name: state.name,
        email: state.email,
        amount: state.amount,
        petId: state.petId,
    };
}
function initPrevStepBtn() {
    const prevStepBtn = document.querySelector('.prev-step');
    prevStepBtn === null || prevStepBtn === void 0 ? void 0 : prevStepBtn.addEventListener('click', initDonationStep2);
}
//# sourceMappingURL=donationStep3.js.map