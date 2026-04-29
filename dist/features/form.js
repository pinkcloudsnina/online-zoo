import { setCardNum, setCVV, setDonationUserEmail, setDonationUserName } from '../state/donationState.js';
import { validateInput } from '../utils/inputValidation.js';
export function enableBtnIfComplete(inputs, btn) {
    let correctInput = 0;
    inputs.forEach((input) => {
        if (input.value && !input.classList.contains('validation-error'))
            correctInput++;
    });
    if (inputs.length === correctInput) {
        btn === null || btn === void 0 ? void 0 : btn.classList.remove('disabled');
    }
    else {
        btn === null || btn === void 0 ? void 0 : btn.classList.add('disabled');
    }
}
export function fieldInput(fieldInput, activateNextBtn) {
    const validationType = fieldInput.dataset.validate;
    if (validationType) {
        validateInput(fieldInput, validationType);
        switch (validationType) {
            case 'name':
                setDonationUserName(fieldInput.value);
                break;
            case 'email':
                setDonationUserEmail(fieldInput.value);
                break;
            case 'card':
                setCardNum(fieldInput.value);
                break;
            case 'cvv':
                setCVV(fieldInput.value);
                break;
        }
    }
    activateNextBtn();
}
//# sourceMappingURL=form.js.map