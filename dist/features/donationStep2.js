import { openPopup } from '../components/popup.js';
import { drawDonationStep2 } from '../components/donationStep2.js';
import { initDonationStep1 } from './donationStep1.js';
import { getAuthUser } from '../state/authState.js';
import { validateField } from '../utils/inputValidation.js';
import { setDonationUserName, setDonationUserEmail } from '../state/donationState.js';
import { initDonationStep3 } from './donationStep3.js';
export function initDonationStep2() {
    openPopup(drawDonationStep2());
    preFillData();
    initPrevStepBtn();
    initNextStepBtn();
    const nameInput = document.querySelector('#billingName');
    const emailInput = document.querySelector('#billingEmail');
    nameInput === null || nameInput === void 0 ? void 0 : nameInput.addEventListener('blur', () => {
        const p = nameInput.nextElementSibling;
        if (nameInput.value) {
            const validationMsg = validateField(nameInput.value, 'name');
            if (!validationMsg) {
                nameInput.classList.remove('validation-error');
                if (p)
                    p.textContent = '';
                setDonationUserName(nameInput.value);
            }
            else {
                nameInput.classList.add('validation-error');
                if (p)
                    p.textContent = validationMsg;
            }
        }
        checkNextBtn();
    });
    emailInput === null || emailInput === void 0 ? void 0 : emailInput.addEventListener('blur', () => {
        const p = emailInput.nextElementSibling;
        if (emailInput.value) {
            const validationMsg = validateField(emailInput.value, 'email');
            if (!validationMsg) {
                emailInput.classList.remove('validation-error');
                if (p)
                    p.textContent = '';
                setDonationUserEmail(emailInput.value);
            }
            else {
                emailInput.classList.add('validation-error');
                if (p)
                    p.textContent = validationMsg;
            }
        }
        checkNextBtn();
    });
}
function preFillData() {
    const nameInput = document.querySelector('#billingName');
    const emailInput = document.querySelector('#billingEmail');
    const currentUser = getAuthUser();
    if (currentUser) {
        if (nameInput)
            nameInput.value = currentUser.name;
        if (emailInput)
            emailInput.value = currentUser.email;
        setDonationUserName(currentUser.name);
        setDonationUserEmail(currentUser.email);
        checkNextBtn();
    }
    else {
        if (nameInput)
            nameInput.value = '';
        if (emailInput)
            emailInput.value = '';
        setDonationUserName(null);
        setDonationUserEmail(null);
    }
}
function checkNextBtn() {
    const nameInput = document.querySelector('#billingName');
    const emailInput = document.querySelector('#billingEmail');
    const nextStepBtn = document.querySelector('.next-step');
    if ((nameInput === null || nameInput === void 0 ? void 0 : nameInput.classList.contains('validation-error')) || (emailInput === null || emailInput === void 0 ? void 0 : emailInput.classList.contains('validation-error'))) {
        nextStepBtn === null || nextStepBtn === void 0 ? void 0 : nextStepBtn.classList.add('disabled');
        return;
    }
    if ((nameInput === null || nameInput === void 0 ? void 0 : nameInput.value) && (emailInput === null || emailInput === void 0 ? void 0 : emailInput.value)) {
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
        initDonationStep3();
    });
}
function initPrevStepBtn() {
    const prevStepBtn = document.querySelector('.prev-step');
    prevStepBtn === null || prevStepBtn === void 0 ? void 0 : prevStepBtn.addEventListener('click', initDonationStep1);
}
//# sourceMappingURL=donationStep2.js.map