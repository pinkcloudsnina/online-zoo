import { openPopup } from '../components/popup.js';
import { drawDonationStep2 } from '../components/donationStep2.js';
import { initDonationStep1 } from './donationStep1.js';
import { getAuthUser } from '../state/authState.js';
import { setDonationUserName, setDonationUserEmail, getDonationName, getDonationEmail } from '../state/donationState.js';
import { initDonationStep3 } from './donationStep3.js';
import { initPrevStepBtn, initNextStepBtn } from './donation.js';
import { fieldInput } from './form.js';
import { validateValueError } from '../utils/inputValidation.js';
export function initDonationStep2() {
    openPopup(drawDonationStep2({ onInput: (el) => fieldInput(el, enableNextBtn) }));
    preFillData();
    initPrevStepBtn(initDonationStep1);
    initNextStepBtn(initDonationStep3);
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
        enableNextBtn();
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
function enableNextBtn() {
    const nextStepBtn = document.querySelector('.next-step');
    if (validateDonationStep2()) {
        nextStepBtn === null || nextStepBtn === void 0 ? void 0 : nextStepBtn.classList.remove('disabled');
    }
    else
        nextStepBtn === null || nextStepBtn === void 0 ? void 0 : nextStepBtn.classList.add('disabled');
}
function validateDonationStep2() {
    const donaterName = getDonationName();
    const donaterEmail = getDonationEmail();
    const isNameValid = donaterName != null && !validateValueError(donaterName, 'name');
    const isEmailValid = donaterEmail != null && !validateValueError(donaterEmail, 'email');
    return isNameValid && isEmailValid;
}
//# sourceMappingURL=donationStep2.js.map