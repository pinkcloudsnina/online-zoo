import {drawDonationStep1} from '../components/donationStep1.js';
import {openPopup} from '../components/popup.js';
import {
    clearDonationState,
    getDonationAmount,
    getDonationPet,
    setDonationAmount,
    setDonationPet,
} from '../state/donationState.js';
import {highlightNode} from '../utils/highlightChosen.js';
import {validateInput, validateValueError, ValidationType} from '../utils/inputValidation.js';
import {Pet} from '../types/interfaces.js';
import {initDonationStep2} from './donationStep2.js';
import {apiRequest} from '../utils/api.js';
import {initDropdowns} from './dropdown.js';
import {initNextStepBtn} from './donation.js';

export async function initDonationStep1() {
    clearDonationState();
    const pets = await apiRequest<Pet[]>('/pets');
    const step1 = drawDonationStep1(pets, {
        initDropdowns: (container) => initDropdowns(container, handleDropdownChange),
    });
    openPopup(step1);
    initDonationAmountBtns();
    initNextStepBtn(initDonationStep2);
}

function handleDropdownChange(id: string, value: string) {
    if (id === 'for-pet') {
        choosePet(value);
        enableNextBtn();
    }
}

function choosePet(value: string): void {
    setDonationPet(parseInt(value));
    enableNextBtn();
}

function initDonationAmountBtns(): void {
    const amountBtns = document.querySelectorAll<HTMLDivElement>('.choose-amount .btn');
    const customBtn = document.querySelector<HTMLElement>('.custom-amount-btn');
    const inputCustom = document.querySelector<HTMLInputElement>('.custom-amount input');
    const p = document.querySelector<HTMLParagraphElement>('p.validation-error');

    amountBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('active')) {
                btn.classList.remove('active');
                setDonationAmount(null);
                if (btn.classList.contains('custom-amount-btn')) {
                    if (inputCustom) inputCustom.value = '';
                }
            } else {
                highlightNode(amountBtns, btn, 'active');
                if (btn.classList.contains('custom-amount-btn')) {
                    if (inputCustom) {
                        const amount = inputCustom.value;
                        setDonationAmount(amount);
                    }
                } else {
                    if (inputCustom) inputCustom.value = '';
                    const amount = btn.dataset.donationAmount || '';
                    setDonationAmount(amount);
                }
            }
            enableNextBtn();
        });
    });

    inputCustom?.addEventListener('click', () => {
        if (customBtn) highlightNode(amountBtns, customBtn, 'active');
        setDonationAmount(null);
        if (inputCustom) inputCustom.value = '';
        if (p) p.textContent = '';
        enableNextBtn();
    });

    inputCustom?.addEventListener('input', () => {
        if (p) p.textContent = '';

        const validationType = inputCustom.dataset.validate as ValidationType;
        validateInput(inputCustom, validationType);
        setDonationAmount(inputCustom.value);
        enableNextBtn();
    });
}

function enableNextBtn(): void {
    const nextStepBtn = document.querySelector<HTMLElement>('.next-step');

    if (validateDonationStep1()) {
        nextStepBtn?.classList.remove('disabled');
    } else nextStepBtn?.classList.add('disabled');
}

function validateDonationStep1(): boolean {
    const donationAmount = getDonationAmount();
    const donationPet = getDonationPet();
    const isAmountValid = donationAmount != null && !validateValueError(donationAmount.toString(), 'amount');
    const isPetSelected = donationPet != null;

    return isAmountValid && isPetSelected;
}
