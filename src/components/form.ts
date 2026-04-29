export function resetInputError(input: HTMLInputElement) {
    const inputErrorMsg = input.nextElementSibling as HTMLParagraphElement;
    input.classList.remove('validation-error');
    inputErrorMsg.textContent = '';
}

export function applyValidationResult(input: HTMLInputElement, msg: string | null) {
    const p = input?.nextElementSibling as HTMLParagraphElement;

    if (msg !== null) {
        input.classList.add('validation-error');
        p.textContent = msg;
    } else {
        input.classList.remove('validation-error');
        p.textContent = '';
    }
}
