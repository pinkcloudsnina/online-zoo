import {openPopup} from '../components/popup.js';
import {drawDonationStep2} from '../components/donationStep2.js';
import {initDonationStep1} from './donationStep1.js';
import {getAuthUser} from '../state/authState.js';
import {validateField} from '../utils/inputValidation.js';
import {setDonationUserName, setDonationUserEmail, getDonationState} from '../state/donationState.js';
import {initDonationStep3} from './donationStep3.js';

export function initDonationStep2() {
    openPopup(drawDonationStep2());
    preFillData();
    initPrevStepBtn();
    initNextStepBtn();

    const nameInput = document.querySelector<HTMLInputElement>('#billingName');
    const emailInput = document.querySelector<HTMLInputElement>('#billingEmail');

    nameInput?.addEventListener('blur', () => {
        const p = nameInput.nextElementSibling;
        if (nameInput.value) {
            const validationMsg = validateField(nameInput.value, 'name');

            if (!validationMsg) {
                nameInput.classList.remove('validation-error');
                if (p) p.textContent = '';
                setDonationUserName(nameInput.value);
            } else {
                nameInput.classList.add('validation-error');
                if (p) p.textContent = validationMsg;
            }
        }
        checkNextBtn();
    });

    emailInput?.addEventListener('blur', () => {
        const p = emailInput.nextElementSibling;
        if (emailInput.value) {
            const validationMsg = validateField(emailInput.value, 'email');

            if (!validationMsg) {
                emailInput.classList.remove('validation-error');
                if (p) p.textContent = '';
                setDonationUserEmail(emailInput.value);
            } else {
                emailInput.classList.add('validation-error');
                if (p) p.textContent = validationMsg;
            }
        }
        checkNextBtn();
    });
}

function preFillData(): void {
    const nameInput = document.querySelector<HTMLInputElement>('#billingName');
    const emailInput = document.querySelector<HTMLInputElement>('#billingEmail');
    const currentUser = getAuthUser();
    if (currentUser) {
        if (nameInput) nameInput.value = currentUser.name;
        if (emailInput) emailInput.value = currentUser.email;
        setDonationUserName(currentUser.name);
        setDonationUserEmail(currentUser.email);
        checkNextBtn();
    } else {
        if (nameInput) nameInput.value = '';
        if (emailInput) emailInput.value = '';
        setDonationUserName(null);
        setDonationUserEmail(null);
    }
}

function checkNextBtn(): void {
    const nameInput = document.querySelector<HTMLInputElement>('#billingName');
    const emailInput = document.querySelector<HTMLInputElement>('#billingEmail');
    const nextStepBtn = document.querySelector<HTMLElement>('.next-step');

    if (nameInput?.classList.contains('validation-error') || emailInput?.classList.contains('validation-error')) {
        nextStepBtn?.classList.add('disabled');

        return;
    }
    if (nameInput?.value && emailInput?.value) {
        nextStepBtn?.classList.remove('disabled');
    } else nextStepBtn?.classList.add('disabled');
}

function initNextStepBtn(): void {
    const nextStepBtn = document.querySelector<HTMLElement>('.next-step');
    nextStepBtn?.addEventListener('click', () => {
        if (nextStepBtn?.classList.contains('disabled')) return;
        initDonationStep3();
    });
}

function initPrevStepBtn() {
    const prevStepBtn = document.querySelector<HTMLElement>('.prev-step');
    prevStepBtn?.addEventListener('click', initDonationStep1);
}
