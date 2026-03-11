type ValidationType = 'login' | 'password' | 'passwordConfirm' | 'name' | 'email';

export function validateField(value: string, type: ValidationType, extra?: string): string | null {
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
    }

    return problems.length !== 0 ? `Field should: ${problems.join(', ')}` : null;
}
