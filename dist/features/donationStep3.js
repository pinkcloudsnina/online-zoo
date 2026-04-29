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
import { drawCardsDropdownContainer, drawDonationStep3, drawDropdownItems, highlightDateErr, showSaveCardCheck, } from '../components/donationStep3.js';
import { openPopup } from '../components/popup.js';
import { getAuthUser } from '../state/authState.js';
import { getCardMonth, getCardState, getCardYear, getDonationState, setCardDate, setCardNum, } from '../state/donationState.js';
import { apiRequest, createRequestOptions } from '../utils/api.js';
import { validateInput, validateValueError } from '../utils/inputValidation.js';
import { initPrevStepBtn } from './donation.js';
import { initDonationStep2 } from './donationStep2.js';
import { initDropdowns } from './dropdown.js';
import { initDonationStats } from './fav-stats.js';
import { fieldInput } from './form.js';
export function initDonationStep3() {
    const currentUser = getAuthUser();
    openPopup(drawDonationStep3({
        onInput: (el) => fieldInput(el, enableCompleteBtn),
    }));
    if (currentUser) {
        showSaveCardCheck();
        drawCardsDropdown();
    }
    const popup = document.querySelector('.popup');
    if (popup)
        initDropdowns(popup, handleDropdownChange);
    initCompleteBtn();
    initPrevStepBtn(initDonationStep2);
}
function handleDropdownChange(id, value) {
    if (id === 'month' || id === 'year') {
        setCardDate(id, parseInt(value));
        isDateValid(getCardYear(), getCardMonth());
    }
    if (id === 'dropdownSelectedCard') {
        const cardInput = document.querySelector('#card-num');
        if (cardInput) {
            const validateRule = cardInput.dataset.validate;
            setCardNum(value);
            cardInput.value = value;
            if (validateRule)
                validateInput(cardInput, validateRule);
        }
    }
    enableCompleteBtn();
}
function isDateValid(year, month) {
    if (!year || !month) {
        return false;
    }
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    const isValid = year > currentYear || (year === currentYear && month >= currentMonth);
    highlightDateErr(!isValid);
    return isValid;
}
function initCompleteBtn() {
    const completeBtn = document.querySelector('.complete-btn');
    completeBtn === null || completeBtn === void 0 ? void 0 : completeBtn.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
        if (completeBtn.classList.contains('disabled'))
            return;
        const currUser = getAuthUser();
        if (currUser === null || currUser === void 0 ? void 0 : currUser.name)
            saveCurrCard();
        try {
            const donationRequest = getDonationRequestFromState(getDonationState());
            const donation = yield apiRequest('/donations', createRequestOptions('POST', donationRequest));
            const result = donation;
            openPopup(drawDonationResult('success', result.message));
            saveDonationDetails(donationRequest.petId, donationRequest.amount);
            const path = window.location.pathname;
            console.log(path);
            initDonationStats();
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
        amount: parseFloat(state.amount),
        petId: state.petId,
    };
}
function enableCompleteBtn() {
    const completeBtn = document.querySelector('.complete-btn');
    if (validateDonationStep3()) {
        completeBtn === null || completeBtn === void 0 ? void 0 : completeBtn.classList.remove('disabled');
    }
    else
        completeBtn === null || completeBtn === void 0 ? void 0 : completeBtn.classList.add('disabled');
}
function validateDonationStep3() {
    const cardDetails = getCardState();
    const isNumValid = cardDetails.cardNum != null && !validateValueError(cardDetails.cardNum, 'card');
    const isCVVValid = cardDetails.cvv != null && !validateValueError(cardDetails.cvv.toString(), 'cvv');
    return isNumValid && isCVVValid && isDateValid(cardDetails.date.year, cardDetails.date.month);
}
function saveDonationDetails(pet, sum) {
    const donationList = JSON.parse(localStorage.getItem('donations') || '[]');
    donationList.push({ time: new Date(), petId: pet, amount: sum });
    const renewedDonations = JSON.stringify(donationList);
    localStorage.setItem('donations', renewedDonations);
}
function drawCardsDropdown() {
    const savedCardsString = localStorage.getItem('savedCards');
    let savedCardsList = [];
    drawCardsDropdownContainer();
    if (savedCardsString) {
        try {
            const savedCards = JSON.parse(savedCardsString);
            savedCardsList = savedCards.map((card) => {
                return { label: `${card.slice(0, 4)} **** **** ${card.slice(-4)}`, value: card };
            });
        }
        catch (_a) {
            savedCardsList = [];
        }
        console.log(savedCardsList);
        const dropdownContainer = document.querySelector('.card-select');
        if (dropdownContainer)
            drawDropdownItems(dropdownContainer, savedCardsList);
    }
}
//# sourceMappingURL=donationStep3.js.map