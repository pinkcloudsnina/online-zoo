import {applyValidationResult} from '../components/form.js';

export type ValidationType = 'login' | 'password' | 'passwordConfirm' | 'name' | 'email' | 'amount' | 'card' | 'cvv';

//returns null if no validation problems were found

export function validateValueError(value: string, type: ValidationType, extra?: string): string | null {
    const problems: string[] = [];

    switch (type) {
        case 'login':
            if (value.length < 3) problems.push('have at least 3 characters');
            if (!/^[a-zA-Z]/.test(value)) problems.push('start with a letter');
            if (!/^[a-zA-Z]+$/.test(value)) problems.push('contain only English letters');
            break;

        case 'password':
            if (value.length < 6) problems.push('have at least 6 characters');
            if (!/[!@#$%^&*()_+\-=[\]{};:'",.<>?/|\\`~]/.test(value))
                problems.push('contain at least 1 special character');
            break;

        case 'passwordConfirm':
            if (value !== extra) problems.push('match');
            break;

        case 'name':
            if (value.length < 3) problems.push('have at least 3 characters');
            if (!/^[a-zA-Z]+$/.test(value)) problems.push('contain only English letters');
            break;

        case 'email':
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) problems.push('contain valid email');
            break;

        case 'amount':
            if (/e/i.test(value)) problems.push('be not scientific');
            else if (parseFloat(value) <= 0) problems.push('be more than 0');
            else if (!/^[0-9]*\.?[0-9]+$/.test(value)) problems.push('be numeric');
            break;

        case 'card':
            value = value.split(' ').join('');
            if (value.length !== 16) problems.push('have 16 digits');
            if (!/^[0-9]*\.?[0-9]+$/.test(value)) problems.push('be numeric');
            break;

        case 'cvv':
            if (value.length !== 3) problems.push('have 3 digits');
            if (!/^[0-9]*\.?[0-9]+$/.test(value)) problems.push('be numeric');
            break;
    }

    return problems.length !== 0 ? `Field should: ${problems.join(', ')}` : null;
}

//extra if need to validate 2 inputs (for password and passwordConfirm)
export function validateInput(
    input: HTMLInputElement,
    validationType: ValidationType,
    extra?: HTMLInputElement
): boolean {
    if (input.value.length > 0) {
        const validationResult = validateValueError(input.value, validationType, extra?.value);
        applyValidationResult(input, validationResult);
        return validationResult ? false : true;
    }
    return false;
}
