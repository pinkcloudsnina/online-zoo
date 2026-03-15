import {openPopup, closePopup} from '../components/popup.js';
import {drawAuthorization} from '../components/authorization.js';
import {drawLogin} from '../components/login.js';
import {sendLoginRequest, sendRegisterRequest, sendProfileRequest} from '../utils/api.js';
import {drawRegister} from '../components/register.js';
import {validateField} from '../utils/inputValidation.js';
import {authState} from '../state/authState.js';
import {drawUserData} from '../components/userData.js';

export async function initAuthorization(): Promise<void> {
    try {
        const response = await sendProfileRequest();
        authState.user = response;
    } catch {
        logout();
    }
    const loginBtn = document.querySelector<HTMLElement>('.authorization');
    loginBtn?.addEventListener('click', showAuthorizationPopup);
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
        const validationResult = validateField(login.value, 'login');
        applyValidationResult(login, validationResult);
    });

    password?.addEventListener('blur', () => {
        const validationResult = validateField(password.value, 'password');
        applyValidationResult(password, validationResult);
    });

    passwordConfirm?.addEventListener('blur', () => {
        if (!password || !passwordConfirm) return;
        const validationResult = validateField(password.value, 'passwordConfirm', passwordConfirm.value);
        applyValidationResult(passwordConfirm, validationResult);
    });

    name?.addEventListener('blur', () => {
        const validationResult = validateField(name.value, 'name');
        applyValidationResult(name, validationResult);
    });

    email?.addEventListener('blur', () => {
        const validationResult = validateField(email.value, 'email');
        applyValidationResult(email, validationResult);
    });
}

function initInputs(): void {
    const inputs = document.querySelectorAll<HTMLInputElement>('.popup__content input');
    inputs.forEach((input) => {
        input.addEventListener('focus', () => {
            input.value = '';
            const p = input?.nextElementSibling as HTMLParagraphElement;
            input.classList.remove('validation-error');
            p.textContent = '';
        });

        input.addEventListener('input', checkFormComplete);
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
        if (input.value.length !== 0 && !input.classList.contains('validation-error')) correctInput++;
    });
    if (inputs.length === correctInput) {
        registerBtn?.classList.remove('inactive');
        registerBtn?.classList.add('active');

        loginBtn?.classList.remove('inactive');
        loginBtn?.classList.add('active');
    } else {
        registerBtn?.classList.remove('active');
        registerBtn?.classList.add('inactive');

        loginBtn?.classList.remove('active');
        loginBtn?.classList.add('inactive');
    }
}

function initRegisterButton(): void {
    const registerBtn = document.querySelector<HTMLDivElement>('#registerBtn');
    registerBtn?.addEventListener('click', async () => {
        if (registerBtn.classList.contains('inactive')) return;

        const login = document.querySelector<HTMLInputElement>('#login')!.value;
        const password = document.querySelector<HTMLInputElement>('#pass')!.value;
        const name = document.querySelector<HTMLInputElement>('#name')!.value;
        const email = document.querySelector<HTMLInputElement>('#email')!.value;
        const responseError = document.querySelector<HTMLParagraphElement>('p.response-error');

        try {
            await sendRegisterRequest({login, password, name, email});

            window.location.href = '../landing/index.html';
        } catch (error) {
            responseError!.textContent = (error as Error).message;
        }
    });
}

function initLoginButton(): void {
    const loginBtn = document.querySelector<HTMLDivElement>('#loginBtn');
    loginBtn?.addEventListener('click', async () => {
        if (loginBtn.classList.contains('inactive')) return;

        const login = document.querySelector<HTMLInputElement>('#login')!.value;
        const password = document.querySelector<HTMLInputElement>('#pass')!.value;
        const responseError = document.querySelector<HTMLParagraphElement>('p.response-error');

        try {
            const response = await sendLoginRequest({login, password});

            authState.token = response.data.access_token;
            authState.user = response.data.user;

            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            window.location.href = '../animal/panda.html';
        } catch (error) {
            responseError!.textContent = (error as Error).message;
        }
    });
}

export async function initLogged(): Promise<void> {
    const userGreet = document.querySelector<HTMLSpanElement>('.authorization .user');

    const token = localStorage.getItem('token');
    if (!token) {
        if (userGreet) userGreet.textContent = '';
        return;
    }

    authState.token = token;

    try {
        const user = await sendProfileRequest();

        authState.user = user;
        localStorage.setItem('user', JSON.stringify(user));
        if (userGreet) userGreet.textContent = user.name;
    } catch (error) {
        console.error('Auth check failed:', error);

        authState.token = null;
        authState.user = null;

        localStorage.removeItem('token');
        localStorage.removeItem('user');

        if (userGreet) userGreet.textContent = '';
    }
}

function logout(): void {
    authState.token = null;
    authState.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    closePopup();
    initLogged();
}
