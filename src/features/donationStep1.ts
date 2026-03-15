import {drawDonationStep1, drawListItems} from '../components/donationStep1.js';
import {openPopup} from '../components/popup.js';
import {clearDonationState, setDonationAmount, setDonationAnimal} from '../state/donationState.js';
import {highlightNode} from '../utils/highlightChosen.js';
import {validateField} from '../utils/inputValidation.js';
import {getPetsList} from '../state/animalState.js';
import {Pet} from '../types/interfaces.js';
import {initDonationStep2} from './donationStep2.js';

export function initDonationStep1() {
    const pets = getPetsList();

    clearDonationState();

    openPopup(drawDonationStep1());
    initDonationBtns();
    if (pets.length >= 1) drawListItems(pets);
    initDropdown(getPetsList());
    initNextStepBtn();
}

function initDonationBtns(): void {
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
                        const amount = parseInt(inputCustom.value);
                        setDonationAmount(amount);
                    }
                } else {
                    if (inputCustom) inputCustom.value = '';
                    const amount = Number(btn.dataset.donationAmount);
                    setDonationAmount(amount);
                }
            }
            checkNextBtn();
        });
    });

    inputCustom?.addEventListener('click', () => {
        if (customBtn) highlightNode(amountBtns, customBtn, 'active');
        setDonationAmount(null);
        if (inputCustom) inputCustom.value = '';
        if (p) p.textContent = '';
        checkNextBtn();
    });

    inputCustom?.addEventListener('blur', () => {
        if (inputCustom.value) {
            const validationMsg = validateField(inputCustom.value, 'amount');
            if (!validationMsg) {
                inputCustom.classList.remove('validation-error');
                if (p) p.textContent = '';
                setDonationAmount(parseFloat(inputCustom.value));
                checkNextBtn();
            } else {
                inputCustom.classList.add('validation-error');
                if (p) p.textContent = validationMsg;
            }
        } else {
            customBtn?.classList.remove('active');
            setDonationAmount(null);
        }
        checkNextBtn();
    });
}

function initDropdown(pets: Pet[]): void {
    const p = document.querySelector<HTMLElement>('.choose-pet .error');
    if (pets.length === 0) {
        if (p) p.textContent = 'Error getting pet data. Please refresh page';
    }

    document.querySelectorAll('.dropdown').forEach((dropdown) => {
        const toggle = dropdown.querySelector<HTMLElement>('.dropdown__toggle');
        const list = dropdown.querySelector<HTMLElement>('.dropdown__list');
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
                    setDonationAnimal(parseInt(dropdownValue));
                    hiddenInput.value = dropdownValue;
                    checkNextBtn();
                }
                dropdown.classList.remove('open');
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

function checkNextBtn(): void {
    const donationAmount = document.querySelector<HTMLElement>('.choose-amount .btn.active');
    const customAmount = document.querySelector<HTMLInputElement>('#other-amount-input');
    const petChoice = document.querySelector<HTMLInputElement>('#for-pet');
    const nextStepBtn = document.querySelector<HTMLElement>('.next-step');
    if (donationAmount && petChoice?.value) {
        if (donationAmount.classList.contains('custom-amount-btn') && !customAmount)
            nextStepBtn?.classList.add('disabled');

        nextStepBtn?.classList.remove('disabled');
    } else nextStepBtn?.classList.add('disabled');
}

function initNextStepBtn(): void {
    const nextStepBtn = document.querySelector<HTMLElement>('.next-step');
    nextStepBtn?.addEventListener('click', () => {
        if (nextStepBtn?.classList.contains('disabled')) return;
        initDonationStep2();
    });
}
