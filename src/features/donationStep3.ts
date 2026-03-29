import {drawDonationResult} from '../components/donationResult.js';
import {drawCardItems, drawDonationStep3, highlightDateErr, showSaveCardCheck} from '../components/donationStep3.js';
import {openPopup} from '../components/popup.js';
import {getAuthUser} from '../state/authState.js';
import {
    DonationState,
    getCardMonth,
    getCardState,
    getCardYear,
    getDonationState,
    setCardDate,
} from '../state/donationState.js';
import {DonationRequest, DonationResponse, DonationStats} from '../types/interfaces.js';
import {apiRequest, createRequestOptions} from '../utils/api.js';
import {validateValueError} from '../utils/inputValidation.js';
import {initPrevStepBtn} from './donation.js';
import {initDonationStep2} from './donationStep2.js';
import {initDropdowns} from './dropdown.js';
import {initDonationStats} from './fav-stats.js';
import {fieldInput} from './form.js';

export function initDonationStep3() {
    const currentUser = getAuthUser();
    openPopup(
        drawDonationStep3({
            initDropdowns: (container) => initDropdowns(container, handleDropdownChange),
            onInput: (el) => fieldInput(el, enableCompleteBtn),
        })
    );

    initCompleteBtn();
    initPrevStepBtn(initDonationStep2);

    if (currentUser) {
        showSaveCardCheck();
        const savedCardsString = localStorage.getItem('savedCards');
        let savedCards: string[] = [];
        if (savedCardsString) {
            try {
                savedCards = JSON.parse(savedCardsString);
            } catch {
                savedCards = [];
            }
            drawCardItems(savedCards);
        }
    }
}

function handleDropdownChange(id: string, value: string) {
    if (id === 'month' || id === 'year') {
        setCardDate(id, parseInt(value));
        isDateValid(getCardYear(), getCardMonth());
    }
    enableCompleteBtn();
}

function isDateValid(year: number | null, month: number | null): boolean {
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

function initCompleteBtn(): void {
    const completeBtn = document.querySelector<HTMLElement>('.complete-btn');

    completeBtn?.addEventListener('click', async () => {
        if (completeBtn.classList.contains('disabled')) return;
        const currUser = getAuthUser();
        if (currUser?.name) saveCurrCard();

        try {
            const donationRequest = getDonationRequestFromState(getDonationState());

            const donation = await apiRequest<DonationResponse>(
                '/donations',
                createRequestOptions<DonationRequest>('POST', donationRequest)
            );

            const result = donation;

            openPopup(drawDonationResult('success', result.message));
            saveDonationDetails(donationRequest.petId, donationRequest.amount);
            const path = window.location.pathname;
            console.log(path);

            initDonationStats();
        } catch (error) {
            console.error('Donation error:', error);
            openPopup(drawDonationResult('error', 'Something went wrong. Please, try again later.'));
        }
    });
}

function saveCurrCard(): void {
    console.log('saving card');

    const currCard = document.querySelector<HTMLInputElement>('#card-num')?.value;
    const saveCardDetails = document.querySelector<HTMLInputElement>('#save-card')?.checked;

    console.log(saveCardDetails);

    if (currCard && saveCardDetails) {
        const savedCardsString = localStorage.getItem('savedCards');
        let savedCards: string[] = [];

        if (savedCardsString) {
            try {
                savedCards = JSON.parse(savedCardsString);
            } catch {
                savedCards = [];
            }
        }
        if (savedCards.indexOf(currCard) === -1) {
            savedCards.push(currCard);
        }

        localStorage.setItem('savedCards', JSON.stringify(savedCards));
    }
}

function getDonationRequestFromState(state: DonationState): DonationRequest {
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

function enableCompleteBtn(): void {
    const completeBtn = document.querySelector<HTMLElement>('.complete-btn');
    if (validateDonationStep3()) {
        completeBtn?.classList.remove('disabled');
    } else completeBtn?.classList.add('disabled');
}

function validateDonationStep3(): boolean {
    const cardDetails = getCardState();
    const isNumValid = cardDetails.cardNum != null && !validateValueError(cardDetails.cardNum, 'card');
    const isCVVValid = cardDetails.cvv != null && !validateValueError(cardDetails.cvv.toString(), 'cvv');

    return isNumValid && isCVVValid && isDateValid(cardDetails.date.year, cardDetails.date.month);
}

function saveDonationDetails(pet: number, sum: number): void {
    const donationList: DonationStats[] = JSON.parse(localStorage.getItem('donations') || '[]');
    donationList.push({time: new Date(), petId: pet, amount: sum});
    const renewedDonations = JSON.stringify(donationList);
    localStorage.setItem('donations', renewedDonations);
}
