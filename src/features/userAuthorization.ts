import {openPopup, closePopup} from '../components/popup.js';
import {drawAuthorization, drawGreet} from '../components/authorization.js';
import {drawLogin} from '../components/login.js';
import {apiRequest, createRequestOptions} from '../utils/api.js';
import {drawRegister} from '../components/register.js';
import {validateField} from '../utils/inputValidation.js';
import {authState, clearAuthState, getAuthUser} from '../state/authState.js';
import {drawUserData} from '../components/userData.js';
import {LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User} from '../types/interfaces.js';

export async function initAuthorization(): Promise<void> {
    try {
        const isAuthorized = await checkAuthorized();
        const user = getAuthUser();
        if (isAuthorized) drawGreet(user);
    } catch {
        logout();
    }
    const authBtn = document.querySelector<HTMLElement>('.authorization');
    authBtn?.addEventListener('click', showAuthorizationPopup);
}

function showAuthorizationPopup(): void {
    if (authState.user) {
        openPopup(drawUserData());
        const logoutBtn = document.querySelector<HTMLElement>('#logoutBtn');
        logoutBtn?.addEventListener('click', logout);
    } else {
        openPopup(drawAuthorization());
        const login = document.querySelector<HTMLElement>('.login');
        const register = document.querySelector<HTMLElement>('.register');

        login?.addEventListener('click', () => {
            openPopup(drawLogin());
            initInputs();
            initLoginButton();
        });

        register?.addEventListener('click', () => {
            openPopup(drawRegister());
            initInputs();
            initRegisterButton();
        });
    }
}

function initValidation(): void {
    const login = document.querySelector<HTMLInputElement>('#login');
    const password = document.querySelector<HTMLInputElement>('#pass');
    const passwordConfirm = document.querySelector<HTMLInputElement>('#confirm-pass');
    const name = document.querySelector<HTMLInputElement>('#name');
    const email = document.querySelector<HTMLInputElement>('#email');

    login?.addEventListener('blur', () => {
        if (!login.value) return;
        const validationResult = validateField(login.value, 'login');
        applyValidationResult(login, validationResult);
    });

    password?.addEventListener('blur', () => {
        if (!password.value) return;
        const validationResult = validateField(password.value, 'password');
        applyValidationResult(password, validationResult);
    });

    passwordConfirm?.addEventListener('blur', () => {
        if (!password || !passwordConfirm) return;
        const validationResult = validateField(password.value, 'passwordConfirm', passwordConfirm.value);
        applyValidationResult(passwordConfirm, validationResult);
    });

    name?.addEventListener('blur', () => {
        if (!name.value) return;
        const validationResult = validateField(name.value, 'name');
        applyValidationResult(name, validationResult);
    });

    email?.addEventListener('blur', () => {
        if (!email.value) return;
        const validationResult = validateField(email.value, 'email');
        applyValidationResult(email, validationResult);
    });
}

function initInputs(): void {
    const inputs = document.querySelectorAll<HTMLInputElement>('.popup__content input');
    const responseErr = document.querySelector<HTMLElement>('.response-error');
    inputs.forEach((input) => {
        input.addEventListener('focus', () => {
            input.value = '';
            if (responseErr) responseErr.textContent = '';
            const p = input?.nextElementSibling as HTMLParagraphElement;
            input.classList.remove('validation-error');
            p.textContent = '';
            checkFormComplete();
        });

        input.addEventListener('blur', () => {
            checkFormComplete();
        });
    });

    initValidation();
}

function applyValidationResult(input: HTMLInputElement, msg: string | null) {
    const p = input?.nextElementSibling as HTMLParagraphElement;

    if (msg !== null) {
        input.classList.add('validation-error');
        p.textContent = msg;
    } else {
        input.classList.remove('validation-error');
        p.textContent = '';
    }
}

function checkFormComplete(): void {
    const inputs = document.querySelectorAll<HTMLInputElement>('.popup__content input');
    const registerBtn = document.querySelector<HTMLDivElement>('#registerBtn');
    const loginBtn = document.querySelector<HTMLDivElement>('#loginBtn');
    let correctInput = 0;
    inputs.forEach((input) => {
        if (input.value && !input.classList.contains('validation-error')) correctInput++;
    });
    if (inputs.length === correctInput) {
        registerBtn?.classList.remove('disabled');
        loginBtn?.classList.remove('disabled');
    } else {
        registerBtn?.classList.add('disabled');
        loginBtn?.classList.add('disabled');
    }
}

function initRegisterButton(): void {
    const registerBtn = document.querySelector<HTMLDivElement>('#registerBtn');
    registerBtn?.addEventListener('click', async () => {
        if (registerBtn.classList.contains('disabled')) return;

        const login = document.querySelector<HTMLInputElement>('#login')!.value;
        const password = document.querySelector<HTMLInputElement>('#pass')!.value;
        const name = document.querySelector<HTMLInputElement>('#name')!.value;
        const email = document.querySelector<HTMLInputElement>('#email')!.value;
        const responseError = document.querySelector<HTMLParagraphElement>('p.response-error');

        try {
            await apiRequest<RegisterResponse>(
                '/auth/register',
                createRequestOptions<RegisterRequest>('POST', {login, password, name, email})
            );

            window.location.href = '../landing/index.html';
        } catch (error) {
            responseError!.textContent = (error as Error).message;
        }
    });
}

function initLoginButton(): void {
    const loginBtn = document.querySelector<HTMLDivElement>('#loginBtn');
    loginBtn?.addEventListener('click', async () => {
        if (loginBtn.classList.contains('disabled')) return;

        const login = document.querySelector<HTMLInputElement>('#login')!.value;
        const password = document.querySelector<HTMLInputElement>('#pass')!.value;
        const responseError = document.querySelector<HTMLParagraphElement>('p.response-error');

        try {
            const response = await apiRequest<LoginResponse>(
                '/auth/login',
                createRequestOptions<LoginRequest>('POST', {login, password})
            );

            authState.token = response.access_token;
            authState.user = response.user;

            localStorage.setItem('token', response.access_token);
            window.location.href = '../animal/zoo.html';
        } catch (err) {
            responseError!.textContent = (err as Error).message;
        }
    });
}

function logout(): void {
    clearAuth();
    drawGreet(null);
    closePopup();
}

async function checkAuthorized(): Promise<boolean> {
    const token = authState.token ?? localStorage.getItem('token');
    if (!token) {
        clearAuth();
        return false;
    }
    try {
        const user = await apiRequest<User>('/auth/profile', createRequestOptions('GET', undefined, token));
        authState.user = user;
        authState.token = token;
        localStorage.setItem('token', token);
        return true;
    } catch (err) {
        clearAuth();
        return false;
    }
}

function clearAuth(): void {
    clearAuthState();
    localStorage.removeItem('token');
}
