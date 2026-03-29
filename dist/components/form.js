export function resetInputError(input) {
    const inputErrorMsg = input.nextElementSibling;
    input.classList.remove('validation-error');
    inputErrorMsg.textContent = '';
}
export function applyValidationResult(input, msg) {
    const p = input === null || input === void 0 ? void 0 : input.nextElementSibling;
    if (msg !== null) {
        input.classList.add('validation-error');
        p.textContent = msg;
    }
    else {
        input.classList.remove('validation-error');
        p.textContent = '';
    }
}
//# sourceMappingURL=form.js.map