import {drawDonationResult} from '../components/donationResult.js';
import {
    drawCardItems,
    drawDonationStep3,
    drawMonthItems,
    drawYearItems,
    showSaveCardCheck,
} from '../components/donationStep3.js';
import {openPopup} from '../components/popup.js';
import {getAuthUser} from '../state/authState.js';
import {DonationState, getDonationState} from '../state/donationState.js';
import {DonationRequest} from '../types/interfaces.js';
import {sendDonationRequest} from '../utils/api.js';
import {validateField} from '../utils/inputValidation.js';
import {initDonationStep2} from './donationStep2.js';

export function initDonationStep3() {
    const currentUser = getAuthUser();
    openPopup(drawDonationStep3());
    drawMonthItems();
    drawYearItems();
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
        }
        drawCardItems(savedCards);
    }
    initDropdowns();
    initTextInputs();
    checkCompleteBtn();
    initCompleteBtn();
    initPrevStepBtn();
}

function initTextInputs() {
    const inputCard = document.querySelector<HTMLInputElement>('#card-num');
    const inputCVV = document.querySelector<HTMLInputElement>('#cvv');

    inputCard?.addEventListener('blur', () => {
        const p = inputCard.nextElementSibling;
        if (inputCard.value) {
            const validationMsg = validateField(inputCard.value, 'card');
            if (!validationMsg) {
                inputCard.classList.remove('validation-error');
                if (p) p.textContent = '';
            } else {
                inputCard.classList.add('validation-error');
                if (p) p.textContent = validationMsg;
            }
        }
        checkCompleteBtn();
    });

    inputCVV?.addEventListener('blur', () => {
        const p = inputCVV.nextElementSibling;
        if (inputCVV.value) {
            const validationMsg = validateField(inputCVV.value, 'cvv');
            if (!validationMsg) {
                inputCVV.classList.remove('validation-error');
                if (p) p.textContent = '';
            } else {
                inputCVV.classList.add('validation-error');
                if (p) p.textContent = validationMsg;
            }
        }
        checkCompleteBtn();
    });
}

function initDropdowns(): void {
    document.querySelectorAll('.dropdown').forEach((dropdown) => {
        const toggle = dropdown.querySelector<HTMLElement>('.dropdown__toggle');
        const items = dropdown.querySelectorAll<HTMLElement>('.dropdown__item');
        const label = dropdown.querySelector<HTMLElement>('.dropdown__label');
        const hiddenInput = dropdown.querySelector<HTMLInputElement>('input[type="hidden"]');

        toggle?.addEventListener('click', () => {
            dropdown.classList.toggle('open');
        });

        items.forEach((item) => {
            item.addEventListener('click', () => {
                if (label) label.textContent = item.textContent;
                const dropdownValue = item.dataset.value;
                if (dropdownValue && hiddenInput) {
                    hiddenInput.value = dropdownValue;
                    checkDate();
                    checkCompleteBtn();
                }
                dropdown.classList.remove('open');

                if (dropdown.classList.contains('card-select') && dropdownValue) {
                    const cardInput = document.querySelector<HTMLInputElement>('#card-num');
                    if (cardInput) cardInput.value = dropdownValue;
                }
            });
        });

        document.addEventListener('click', (e) => {
            const target = e.target as Node;
            if (!dropdown.contains(target)) {
                dropdown.classList.remove('open');
            }
        });
    });
}

function checkDate() {
    const year = document.querySelector<HTMLInputElement>('#year');
    const month = document.querySelector<HTMLInputElement>('#month');
    const p = document.querySelector<HTMLParagraphElement>('.date-error');
    if (year?.value && month?.value) {
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();

        const inputMonth = parseInt(month.value);
        const inputYear = parseInt(year.value);

        if (inputYear > currentYear) {
            if (p) p.textContent = '';

            month.classList.remove('validation-error');
            year.classList.remove('validation-error');
            return;
        }
        if (inputYear === currentYear && inputMonth >= currentMonth) {
            if (p) p.textContent = '';
            month.classList.remove('validation-error');
            year.classList.remove('validation-error');
        } else {
            if (p) p.textContent = 'Date expired';
            month.classList.add('validation-error');
            year.classList.add('validation-error');
        }
    }
}

function checkCompleteBtn(): void {
    const completeBtn = document.querySelector<HTMLElement>('.complete-btn');
    const requiredFields = Array.from(
        document.querySelectorAll<HTMLInputElement>('.popup input[type="text"],.popup input[type="hidden"]')
    );

    const hasError = requiredFields.some((element) => {
        if (!element.value || element.classList.contains('validation-error')) return true;
        else return false;
    });

    if (hasError) completeBtn?.classList.add('disabled');
    else completeBtn?.classList.remove('disabled');
}

function initCompleteBtn(): void {
    const completeBtn = document.querySelector<HTMLElement>('.complete-btn');

    completeBtn?.addEventListener('click', async () => {
        if (completeBtn.classList.contains('disabled')) return;

        saveCurrCard();

        try {
            const donationRequest = getDonationRequestFromState(getDonationState());

            const donation = await sendDonationRequest(donationRequest);

            const result = donation;

            openPopup(drawDonationResult('success', result.message));
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
        amount: state.amount,
        petId: state.petId,
    };
}

function initPrevStepBtn() {
    const prevStepBtn = document.querySelector<HTMLElement>('.prev-step');
    prevStepBtn?.addEventListener('click', initDonationStep2);
}
