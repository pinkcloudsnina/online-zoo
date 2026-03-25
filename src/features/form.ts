import {setCardNum, setCVV, setDonationUserEmail, setDonationUserName} from '../state/donationState.js';
import {validateInput, ValidationType} from '../utils/inputValidation.js';

export function enableBtnIfComplete(inputs: NodeListOf<HTMLInputElement>, btn: HTMLElement): void {
    let correctInput = 0;
    inputs.forEach((input) => {
        if (input.value && !input.classList.contains('validation-error')) correctInput++;
    });
    if (inputs.length === correctInput) {
        btn?.classList.remove('disabled');
    } else {
        btn?.classList.add('disabled');
    }
}

export function fieldInput(fieldInput: HTMLInputElement, activateNextBtn: () => void) {
    const validationType = fieldInput.dataset.validate as ValidationType;
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
